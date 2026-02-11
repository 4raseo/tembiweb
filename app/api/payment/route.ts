import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Xendit } from 'xendit-node';
import { roomData } from '@/data/roomData';

const prisma = new PrismaClient();
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

const ADDONS_PRICE = {
  breakfast: 50000, 
  extrabed: 150000   
};

// Fungsi Helper untuk membuat ID Pendek (Format: INV-XXXXXX)
function generateShortId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INV-${result}`;
}

// FUNGSI GET (Sama seperti sebelumnya)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    return NextResponse.json({ booking });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { roomSlug, checkIn, checkOut, adults, children, booker, addons } = await request.json();

    if (!roomSlug || !checkIn || !checkOut || !booker) {
      return NextResponse.json({ message: 'Missing required data' }, { status: 400 });
    }
    
    const room = roomData.find(r => r.slug === roomSlug);
    if (!room) return NextResponse.json({ message: 'Room not found' }, { status: 404 });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Double Booking Check
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomSlug: roomSlug,
        status: { in: ['PENDING', 'PAID'] },
        AND: [ { checkInDate: { lt: checkOutDate } }, { checkOutDate: { gt: checkInDate } } ]
      },
    });

    if (conflictingBooking) {
      return NextResponse.json({ message: 'Room is unavailable.' }, { status: 409 });
    }

    const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    // Hitung Harga
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

    // Generate Short ID
    const shortId = generateShortId();

    // Simpan ke Database (UPDATE: Masukkan ID Manual & Addons)
    const booking = await prisma.booking.create({
      data: {
        id: shortId, // Pakai ID Pendek kita
        roomId: room.id.toString(),
        roomSlug: room.slug,
        roomName: room.name,
        roomPrice: room.price,
        
        basePrice: basePrice, 
        serviceFee: serviceFee,
        tourismTax: tourismTax,
        totalPrice: totalAmount,
        
        // Simpan jumlah addons
        breakfastCount: breakfastCount,
        extraBedCount: extraBedCount,

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
        status: 'PENDING',
      },
    });

    // Buat Invoice Xendit
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
        { name: 'Service Fee (5%)', quantity: 1, price: serviceFee, category: 'Fee' },
        { name: 'Tourism Tax', quantity: duration, price: 30000, category: 'Tax' }
      );

      const xenditInvoice = await Invoice.createInvoice({
        data: {
          externalId: booking.id, // ID Pendek dikirim ke Xendit
          amount: totalAmount,
          payerEmail: booker.email,
          description: `Booking ${booking.id} - ${room.name}`,
          customer: {
            givenNames: booker.name,
            email: booker.email,
            mobileNumber: booker.phone,
          },
          items: invoiceItems,
          successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${booking.id}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${booking.id}`,
          currency: 'IDR',
          invoiceDuration: 86400,
        },
      });

      await prisma.booking.update({
        where: { id: booking.id },
        data: { xenditInvoiceId: xenditInvoice.id, xenditInvoiceUrl: xenditInvoice.invoiceUrl },
      });

      return NextResponse.json({ success: true, bookingId: booking.id, invoiceUrl: xenditInvoice.invoiceUrl });

    } catch (error) {
      await prisma.booking.delete({ where: { id: booking.id } });
      throw error;
    }
  } catch (error: any) {
    console.error('Payment API Error:', error);
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
