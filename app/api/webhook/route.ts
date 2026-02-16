// app/api/webhook/xendit/route.ts
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

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

// export async function POST(request: Request) {
//   try {
//     const body = await request.text();
//     const data = JSON.parse(body);
    
//     console.log('Received webhook data:', JSON.stringify(data, null, 2));
    
//     // Optional: Verify webhook signature in production
//     const webhookToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;
//     if (webhookToken) {
//       const callbackToken = request.headers.get('x-callback-token');
      
//       if (callbackToken !== webhookToken) {
//         return NextResponse.json(
//           { message: 'Unauthorized webhook' },
//           { status: 401 }
//         );
//       }
//     }

//     // Handle based on status instead of event
//     // Xendit payment webhooks use 'status' field
//     if (data.status) {
//       switch (data.status) {
//         case 'PAID':
//           await handlePaymentPaid(data);
//           break;
//         case 'EXPIRED':
//           await handlePaymentExpired(data);
//           break;
//         case 'PENDING':
//           await handlePaymentPending(data);
//           break;
//         default:
//           console.log('Unhandled payment status:', data.status);
//       }
//     } else {
//       console.log('Webhook data missing status field');
//     }

//     return NextResponse.json({ received: true });

//   } catch (error: any) {
//     console.error('Webhook processing error:', error);
//     return NextResponse.json(
//       { message: 'Webhook processing failed', error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    // 1. SECURITY CHECK: Verify Xendit Token
    // Ensure this matches the variable name in your .env file
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN; 
    const callbackToken = request.headers.get('x-callback-token');

    // If a token is set in env, we MUST verify it
    if (webhookToken && callbackToken !== webhookToken) {
      console.warn('⚠️ Unauthorized webhook attempt detected');
      return NextResponse.json(
        { message: 'Unauthorized webhook' },
        { status: 401 }
      );
    }

    const body = await request.text();
    const data = JSON.parse(body);
    
    console.log(`🔔 Webhook received: ${data.status} for ${data.external_id}`);

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
        // Add other cases if needed
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
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
    // 1. Try to find the booking first to ensure it exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: external_id },
    });

    if (!existingBooking) {
      console.warn(`⚠️ Booking not found for ID: ${external_id}. Ignoring webhook.`);
      // Return cleanly so Xendit doesn't keep retrying
      return; 
    }

    // 2. Update the booking if found
    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: {
        status: 'PAID',
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Booking ${booking.id} marked as PAID`);
    
  } catch (error) {
    console.error('❌ Failed to update booking status:', error);
    // Don't throw error here, just log it. 
    // If you throw, Xendit thinks it failed and will retry sending the webhook.
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
