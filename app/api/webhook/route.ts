// app/api/webhook/xendit/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Verify Xendit webhook signature
function verifyWebhookSignature(
  webhookId: string,
  webhookToken: string,
  requestBody: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', webhookToken)
    .update(`${webhookId}${requestBody}`)
    .digest('hex');
  
  // In production, compare this with the x-callback-token header from Xendit
  return true; // Simplified for now
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);
    
    // Optional: Verify webhook signature in production
    const webhookToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;
    if (webhookToken) {
      const webhookId = request.headers.get('webhook-id');
      const callbackToken = request.headers.get('x-callback-token');
      
      // Verify the webhook is from Xendit
      if (callbackToken !== webhookToken) {
        return NextResponse.json(
          { message: 'Unauthorized webhook' },
          { status: 401 }
        );
      }
    }

    // Handle different webhook events
    switch (data.event) {
      case 'invoices.paid':
        await handleInvoicePaid(data);
        break;
      case 'invoices.expired':
        await handleInvoiceExpired(data);
        break;
      default:
        console.log('Unhandled webhook event:', data.event);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed', error: error.message },
      { status: 500 }
    );
  }
}

async function handleInvoicePaid(data: any) {
  const { external_id, id: xenditInvoiceId, paid_at, payment_method, payment_channel } = data;
  
  try {
    // Update booking status to PAID
    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: {
        status: 'PAID',
        paidAt: new Date(paid_at),
        paymentMethod: `${payment_method} - ${payment_channel}`,
      },
    });

    console.log(`Booking ${booking.id} marked as PAID`);
    
    // Here you can add additional logic:
    // - Send confirmation email to customer
    // - Update room availability in your system
    // - Send notification to hotel staff
    // - Generate booking confirmation PDF
    
    // Example: Send confirmation email (you'll need to implement this)
    // await sendBookingConfirmationEmail(booking);
    
  } catch (error) {
    console.error('Failed to update booking status:', error);
    throw error;
  }
}

async function handleInvoiceExpired(data: any) {
  const { external_id } = data;
  
  try {
    // Update booking status to EXPIRED
    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: {
        status: 'EXPIRED',
      },
    });

    console.log(`Booking ${booking.id} marked as EXPIRED`);
    
    // Here you can add logic to:
    // - Release the room reservation
    // - Send notification to customer about expired booking
    
  } catch (error) {
    console.error('Failed to update expired booking:', error);
    throw error;
  }
}