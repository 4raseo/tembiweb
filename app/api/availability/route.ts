import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomSlug = searchParams.get('roomSlug');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    if (!roomSlug || !checkIn || !checkOut) {
      return NextResponse.json({ available: false, message: 'Missing parameters' }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Cek apakah ada booking yang CONFIRMED (PAID/PENDING) yang bentrok
    // Logika Overlap: (ExistingStart < RequestEnd) AND (ExistingEnd > RequestStart)
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomSlug: roomSlug,
        status: {
          in: ['PENDING', 'PAID'], // Abaikan EXPIRED atau CANCELLED
        },
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } }
        ]
      },
    });

    if (conflictingBooking) {
      return NextResponse.json({ 
        available: false, 
        message: 'Kamar sudah terisi pada tanggal yang dipilih.' 
      });
    }

    return NextResponse.json({ available: true, message: 'Kamar tersedia' });

  } catch (error) {
    console.error('Availability Check Error:', error);
    return NextResponse.json({ available: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
