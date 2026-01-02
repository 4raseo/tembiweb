// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

// ... keep your existing handlePaymentPaid and handlePaymentExpired functions ...
async function handlePaymentPaid(data: any) {
    const { external_id, paid_at, payment_method, payment_channel } = data;
    try {
        await prisma.booking.update({
            where: { id: external_id },
            data: { status: 'PAID', updatedAt: new Date() },
        });
        console.log(`✅ Booking ${external_id} PAID via ${payment_method}`);
    } catch (e) { console.error('Failed to update paid booking', e); }
}

async function handlePaymentExpired(data: any) {
     const { external_id } = data;
     try {
        await prisma.booking.update({
            where: { id: external_id },
            data: { status: 'EXPIRED', updatedAt: new Date() },
        });
     } catch (e) { console.error('Failed to update expired booking', e); }
}
