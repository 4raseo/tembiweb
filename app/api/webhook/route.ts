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
  
  return true; // Simplified for now
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);
    
    console.log('Received webhook data:', JSON.stringify(data, null, 2));
    
    // Optional: Verify webhook signature in production
    const webhookToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;
    if (webhookToken) {
      const callbackToken = request.headers.get('x-callback-token');
      
      if (callbackToken !== webhookToken) {
        return NextResponse.json(
          { message: 'Unauthorized webhook' },
          { status: 401 }
        );
      }
    }

    // Handle based on status instead of event
    // Xendit payment webhooks use 'status' field
    if (data.status) {
      switch (data.status) {
        case 'PAID':
          await handlePaymentPaid(data);
          break;
        case 'EXPIRED':
          await handlePaymentExpired(data);
          break;
        case 'PENDING':
          await handlePaymentPending(data);
          break;
        default:
          console.log('Unhandled payment status:', data.status);
      }
    } else {
      console.log('Webhook data missing status field');
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

async function handlePaymentPaid(data: any) {
  const { 
    external_id, 
    id: xenditPaymentId, 
    paid_at, 
    payment_method, 
    payment_channel,
    payment_details 
  } = data;
  
  try {
    // Update booking status to PAID using only available fields
    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: {
        status: 'PAID',
        updatedAt: new Date(), // Update the timestamp
      },
    });

    console.log(`✅ Booking ${booking.id} marked as PAID`);
    console.log(`💳 Payment method: ${payment_method} - ${payment_channel} (${payment_details?.source || 'N/A'})`);
    console.log(`📅 Paid at: ${paid_at}`);
    console.log(`🆔 Xendit Payment ID: ${xenditPaymentId}`);
    
    // Additional actions after successful payment:
    // - Send confirmation email to customer
    // - Update room availability
    // - Send notification to hotel staff
    // - Generate booking confirmation PDF
    
    // Example: Send confirmation email (implement this function)
    // await sendBookingConfirmationEmail(booking);
    
  } catch (error) {
    console.error('❌ Failed to update booking status:', error);
    throw error;
  }
}

async function handlePaymentExpired(data: any) {
  const { external_id } = data;
  
  try {
    // Update booking status to EXPIRED
    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: {
        status: 'EXPIRED',
        updatedAt: new Date(),
      },
    });

    console.log(`⏰ Booking ${booking.id} marked as EXPIRED`);
    
    // Additional actions:
    // - Release the room reservation
    // - Send notification to customer about expired booking
    
  } catch (error) {
    console.error('❌ Failed to update expired booking:', error);
    throw error;
  }
}

async function handlePaymentPending(data: any) {
  const { external_id } = data;
  
  try {
    // Optionally update booking to show it's pending payment
    const booking = await prisma.booking.findUnique({
      where: { id: external_id },
    });

    console.log(`⏳ Payment pending for booking ${booking?.id}`);
    
  } catch (error) {
    console.error('❌ Failed to process pending payment:', error);
  }
}
