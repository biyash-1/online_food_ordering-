// app/api/esewa/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prepareEsewaPayment } from '@/lib/esewa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount } = body;

    console.log('=== eSewa Payment Initiation ===');
    console.log('Order ID:', orderId);
    console.log('Amount:', amount);

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'Order ID and amount are required' },
        { status: 400 }
      );
    }

    // Verify environment variables
    const merchantCode = process.env.ESEWA_MERCHANT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;
    const paymentUrl = process.env.ESEWA_PAYMENT_URL;

    console.log('Environment check:');
    console.log('- Merchant Code:', merchantCode);
    console.log('- Secret Key exists:', !!secretKey);
    console.log('- Payment URL:', paymentUrl);

    if (!merchantCode || !secretKey || !paymentUrl) {
      console.error('Missing eSewa environment variables');
      return NextResponse.json(
        { error: 'eSewa configuration is incomplete' },
        { status: 500 }
      );
    }

    // Prepare payment data
    const paymentData = prepareEsewaPayment(amount, orderId);

    console.log('Payment data prepared successfully');
    console.log('Signature:', paymentData.signature);

    return NextResponse.json({
      success: true,
      paymentData,
      paymentUrl,
    });
  } catch (error) {
    console.error('eSewa initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}