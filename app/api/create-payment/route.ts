import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Xendit } from 'xendit-node';
import { format as formatDateFns } from 'date-fns';

const prisma = new PrismaClient();
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

export async function POST(request: Request) {
    try {
        const { bookingDetails, billingDetails } = await request.json();

        if (!bookingDetails || !billingDetails) {
            return NextResponse.json({ message: 'Missing booking or billing information' }, { status: 400 });
        }

        const { room, checkIn, checkOut, adults, children, total } = bookingDetails;
        const { fullName, email, phone } = billingDetails;

        if (!room || !checkIn || !checkOut || !total || !fullName || !email || !phone) {
            return NextResponse.json({ message: 'Incomplete data provided. Please fill all required fields.' }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                // strapiRoomId: room.id.toString(),
                roomName: room.name,
                roomPrice: room.price,
                totalPrice: total,
                checkInDate: new Date(checkIn),
                checkOutDate: new Date(checkOut),
                adults: adults,
                children: children || 0,
                customerName: fullName,
                customerEmail: email,
                customerPhone: phone,
                status: 'PENDING',
            },
        });

        const description = `Booking for ${room.name} (${formatDateFns(new Date(checkIn), 'dd MMM')} - ${formatDateFns(new Date(checkOut), 'dd MMM yyyy')})`;

        const { Invoice } = xenditClient;
        const xenditInvoice = await Invoice.createInvoice({
            data: {
                externalId: booking.id,
                amount: total,
                payerEmail: email,
                description: description,
                successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${booking.id}`,
                failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${booking.id}`,
            },
        });

        await prisma.booking.update({
            where: { id: booking.id },
            data: { xenditInvoiceId: xenditInvoice.id },
        });

        return NextResponse.json({ invoiceUrl: xenditInvoice.invoiceUrl });

    } catch (error: any) {
        console.error('Payment creation failed:', error);
        // Memberikan pesan error yang lebih spesifik jika memungkinkan
        const errorMessage = error.message || 'An unexpected error occurred.';
        return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
    }
}