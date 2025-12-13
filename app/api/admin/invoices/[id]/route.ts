// app/api/admin/invoices/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Ambil detail satu invoice berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching invoice', error: error.message }, { status: 500 });
  }
}

// PATCH: Update data invoice (misal: koreksi nama, ubah status manual)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Filter field apa saja yang boleh diedit demi keamanan
    const { customerName, customerEmail, customerPhone, status, specialRequest } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        customerName,
        customerEmail,
        customerPhone,
        status, // Hati-hati mengubah status manual, pastikan sinkron dengan pembayaran
        specialRequest,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Invoice updated successfully', 
      data: updatedBooking 
    });

  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating invoice', error: error.message }, { status: 500 });
  }
}
