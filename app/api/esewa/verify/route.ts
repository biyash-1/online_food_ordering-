
import { NextRequest, NextResponse } from 'next/server';
import { verifyEsewaSignature } from '@/lib/esewa';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
  
    const encodedData = searchParams.get('data');
    if (!encodedData) {
      return NextResponse.redirect(
        new URL('/checkout/payment?status=failed', request.url)
      );
    }

    const decodedData = JSON.parse(
      Buffer.from(encodedData, 'base64').toString('utf-8')
    );

    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = decodedData;

    // Verify signature
    const isValid = verifyEsewaSignature(
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature
    );

    if (!isValid) {
      console.error('Invalid eSewa signature');
      return NextResponse.redirect(
        new URL('/checkout/payment?status=failed', request.url)
      );
    }

    // Verify transaction status with eSewa API
    const statusCheckUrl = `${process.env.ESEWA_STATUS_CHECK_URL}?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
    
    const statusResponse = await fetch(statusCheckUrl);
    const statusData = await statusResponse.json();

    if (statusData.status === 'COMPLETE') {
      
      
      return NextResponse.redirect(
        new URL(`/orderconfirmation?orderId=${transaction_uuid}`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL('/checkout/payment?status=failed', request.url)
      );
    }
  } catch (error) {
    console.error('eSewa verification error:', error);
    return NextResponse.redirect(
      new URL('/checkout/payment?status=failed', request.url)
    );
  }
}