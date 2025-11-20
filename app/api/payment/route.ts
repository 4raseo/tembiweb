// app/api/payment/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Xendit } from 'xendit-node';
import { roomData } from '@/data/roomData';

const prisma = new PrismaClient();
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

// Static room data matching your roomData structure
// const ROOM_DATA = [
//   { id: 1, slug: 'joglo-suite', name: 'Joglo Suite', price: 1500000 },
//   { id: 2, slug: 'limasan-room', name: 'Limasan Room', price: 1200000 },
//   { id: 3, slug: 'kampung-house', name: 'Kampung House', price: 900000 },
//   { id: 4, slug: 'gladak-room', name: 'Gladak Room', price: 750000 },
// ];



export async function POST(request: Request) {
  try {
    const {
      roomSlug,
      checkIn,
      checkOut,
      adults,
      children,
      booker, // { name, email, phone, address, city, postalCode }
      paymentMethod,
    } = await request.json();

    // Validate required fields
    if (!roomSlug || !checkIn || !checkOut || !booker) {
      return NextResponse.json(
        { message: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Validate booker information
    if (!booker.name || !booker.email || !booker.phone) {
      return NextResponse.json(
        { message: 'Incomplete customer information. Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    // Find room from static data
    // const room = ROOM_DATA.find(r => r.slug === roomSlug);
    const room = roomData.find(r => r.slug === roomSlug);
    
    if (!room) {
      return NextResponse.json(
        { message: 'Room not found with the given slug' },
        { status: 404 }
      );
    }

    // Parse dates and calculate duration
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { message: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    // Calculate prices
    const basePrice = room.price * duration;
    const serviceFee = Math.round(basePrice * 0.05); // 5% service fee
    const tourismTax = 30000 * duration; // Tax per night
    const totalAmount = basePrice + serviceFee + tourismTax;

    // Create booking record in database
    const booking = await prisma.booking.create({
      data: {
        roomId: room.id.toString(),
        roomSlug: room.slug,
        roomName: room.name,
        roomPrice: room.price,
        basePrice: basePrice,
        serviceFee: serviceFee,
        tourismTax: tourismTax,
        totalPrice: totalAmount,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        duration: duration,
        adults: adults || 1,
        children: children || 0,
        customerName: booker.name,
        customerEmail: booker.email,
        customerPhone: booker.phone,
        customerAddress: booker.address || '',
        customerCity: booker.city || '',
        customerPostalCode: booker.postalCode || '',
        specialRequest: '', // Bisa ditambahkan jika ada di form
        status: 'PENDING',
      },
    });

    // Create Xendit invoice
    try {
      const { Invoice } = xenditClient;
      
      const xenditInvoice = await Invoice.createInvoice({
        data: {
          externalId: booking.id,
          amount: totalAmount,
          payerEmail: booker.email,
          description: `Booking for ${room.name} at Tembi Cultural House from ${checkInDate.toLocaleDateString('id-ID')} to ${checkOutDate.toLocaleDateString('id-ID')} (${duration} nights)`,
          customer: {
            given_names: booker.name,
            email: booker.email,
            mobile_number: booker.phone,
            addresses: booker.address ? [
              {
                city: booker.city || '',
                country: 'Indonesia',
                postal_code: booker.postalCode || '',
                street_line1: booker.address,
              }
            ] : undefined,
          },
          customerNotificationPreference: {
            invoice_created: ['email'],
            invoice_reminder: ['email'],
            invoice_paid: ['email'],
          },
          items: [
            {
              name: `${room.name} - ${duration} nights`,
              quantity: 1,
              price: basePrice,
              category: 'Accommodation',
            },
            {
              name: 'Service Fee (5%)',
              quantity: 1,
              price: serviceFee,
              category: 'Fee',
            },
            {
              name: 'Tourism Tax',
              quantity: duration,
              price: 30000,
              category: 'Tax',
            }
          ],
          successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${booking.id}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${booking.id}`,
          currency: 'IDR',
          invoiceDuration: 86400, // 24 hours in seconds
          locale: 'id', // Indonesian locale
        },
      });

      // Update booking with Xendit invoice ID and URL
      await prisma.booking.update({
        where: { id: booking.id },
        data: { 
          xenditInvoiceId: xenditInvoice.id,
          xenditInvoiceUrl: xenditInvoice.invoiceUrl,
        },
      });

      // Return success response with invoice URL
      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        invoiceUrl: xenditInvoice.invoiceUrl,
        invoiceId: xenditInvoice.id,
        message: 'Payment initiated successfully. Redirecting to payment page...'
      });

    } catch (xenditError: any) {
      // If Xendit fails, delete the booking record to maintain consistency
      await prisma.booking.delete({
        where: { id: booking.id },
      });

      console.error('Xendit invoice creation failed:', xenditError);
      
      return NextResponse.json(
        { 
          message: 'Failed to create payment invoice',
          error: xenditError.message || 'Payment gateway error'
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Payment processing failed:', error);
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check payment/booking status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        { message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        roomName: true,
        roomSlug: true,
        totalPrice: true,
        basePrice: true,
        serviceFee: true,
        tourismTax: true,
        checkInDate: true,
        checkOutDate: true,
        duration: true,
        adults: true,
        children: true,
        status: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        xenditInvoiceId: true,
        xenditInvoiceUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      booking 
    });

  } catch (error: any) {
    console.error('Failed to fetch booking:', error);
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
