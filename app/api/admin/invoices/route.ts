// app/api/admin/invoices/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk mengambil semua data booking
export async function GET(request: Request) {
  try {
    // --- PENTING: AUTENTIKASI & OTORISASI ADMIN HARUS DITAMBAHKAN DI SINI ---
    // Misalnya, periksa sesi pengguna untuk memastikan dia adalah admin.
    // Tanpa ini, endpoint ini akan dapat diakses publik.

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // Optional: filter berdasarkan status
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    // Siapkan kondisi query (filter)
    const where: any = {};
    if (status) {
        where.status = status;
    }

    // Ambil semua booking dengan field yang relevan untuk list invoice
    const bookings = await prisma.booking.findMany({
      where: where,
      select: {
        id: true,
        roomName: true,
        customerName: true,
        customerEmail: true,
        totalPrice: true,
        status: true,
        checkInDate: true,
        checkOutDate: true,
        duration: true,
        xenditInvoiceId: true,
        xenditInvoiceUrl: true, // URL invoice Xendit
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc', // Urutkan dari yang terbaru
      },
      take: limit,
      skip: offset,
    });

    // Ambil total count untuk pagination (opsional)
    const totalCount = await prisma.booking.count({ where: where });

    return NextResponse.json({ 
      success: true,
      data: bookings,
      total: totalCount
    });

  } catch (error: any) {
    console.error('Failed to fetch all bookings:', error);
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
