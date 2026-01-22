import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Xendit } from 'xendit-node';
import { roomData } from '@/data/roomData';

const prisma = new PrismaClient();
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

// Konfigurasi Harga (Harus sama dengan frontend)
const ADDONS_PRICE = {
  breakfast: 50000, 
  extrabed: 150000   
};

// --- HANDLER POST (Untuk Membuat Booking) ---
export async function POST(request: Request) {
  try {
    const {
      roomSlug,
      checkIn,
      checkOut,
      adults,
      children,
      booker, 
      addons, // Data addons dari frontend
    } = await request.json();

    // 1. Validasi Dasar
    if (!roomSlug || !checkIn || !checkOut || !booker) {
      return NextResponse.json({ message: 'Missing required payment information' }, { status: 400 });
    }
    if (!booker.name || !booker.email || !booker.phone) {
      return NextResponse.json({ message: 'Incomplete customer information.' }, { status: 400 });
    }

    // 2. Cari Data Kamar
    const room = roomData.find(r => r.slug === roomSlug);
    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    // 3. Hitung Durasi
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
      return NextResponse.json({ message: 'Check-out date must be after check-in date' }, { status: 400 });
    }

    const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    // 4. Hitung Harga Detail (Termasuk Addons)
    const breakfastCount = addons?.breakfast || 0;
    const extraBedCount = addons?.extrabed || 0;

    const roomBasePrice = room.price * duration;
    const breakfastTotal = breakfastCount * ADDONS_PRICE.breakfast * duration;
    const extraBedTotal = extraBedCount * ADDONS_PRICE.extrabed * duration;
    const addonsTotal = breakfastTotal + extraBedTotal;

    const basePrice = roomBasePrice + addonsTotal;
    const serviceFee = Math.round(basePrice * 0.05); 
    const tourismTax = 30000 * duration; 
    
    const totalAmount = basePrice + serviceFee + tourismTax;

    // 5. Simpan ke Database
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
        
        // TODO: Uncomment when Prisma types are properly regenerated
        // breakfast: breakfastCount,
        // extraBed: extraBedCount,

        customerName: booker.name,
        customerEmail: booker.email,
        customerPhone: booker.phone,
        customerAddress: booker.address || '',
        customerCity: booker.city || '',
        customerPostalCode: booker.postalCode || '',
        status: 'PENDING',
      },
    });

    // 6. Buat Invoice Xendit
    try {
      const { Invoice } = xenditClient;
      
      const invoiceItems = [
        {
          name: `${room.name} (${duration} nights)`,
          quantity: 1,
          price: roomBasePrice,
          category: 'Accommodation',
        }
      ];

      if (breakfastCount > 0) {
        invoiceItems.push({
          name: `Breakfast (${breakfastCount} pax x ${duration} nights)`,
          quantity: 1,
          price: breakfastTotal,
          category: 'Add-ons',
        });
      }

      if (extraBedCount > 0) {
        invoiceItems.push({
          name: `Extra Bed (${extraBedCount} bed x ${duration} nights)`,
          quantity: 1,
          price: extraBedTotal,
          category: 'Add-ons',
        });
      }

      invoiceItems.push(
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
      );

      const xenditInvoice = await Invoice.createInvoice({
        data: {
          externalId: booking.id,
          amount: totalAmount,
          payerEmail: booker.email,
          description: `Booking ${room.name} at Tembi Cultural House`,
          customer: {
            givenNames: booker.name,
            email: booker.email,
            mobileNumber: booker.phone,
            addresses: booker.address ? [{
                city: booker.city || '',
                country: 'Indonesia',
                postalCode: booker.postalCode || '',
                streetLine1: booker.address,
            }] : undefined,
          },
          items: invoiceItems,
          successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${booking.id}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${booking.id}`,
          currency: 'IDR',
          invoiceDuration: 86400,
          locale: 'id',
        },
      });

      await prisma.booking.update({
        where: { id: booking.id },
        data: { 
          xenditInvoiceId: xenditInvoice.id,
          xenditInvoiceUrl: xenditInvoice.invoiceUrl,
        },
      });

      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        invoiceUrl: xenditInvoice.invoiceUrl,
        message: 'Payment initiated successfully.'
      });

    } catch (xenditError: Error | unknown) {
      await prisma.booking.delete({ where: { id: booking.id } });
      const errorMsg = xenditError instanceof Error ? xenditError.message : String(xenditError);
      console.error('Xendit Error:', xenditError);
      return NextResponse.json({ message: 'Failed to create payment invoice', error: errorMsg }, { status: 500 });
    }

  } catch (error: Error | unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Payment API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMsg }, { status: 500 });
  }
}

// --- HANDLER GET (WAJIB ADA untuk mengambil data booking by ID) ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      // Kita ambil semua field yang relevan untuk ditampilkan di halaman sukses
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
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking });

  } catch (error: Error | unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Failed to fetch booking:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMsg }, { status: 500 });
  }
}
