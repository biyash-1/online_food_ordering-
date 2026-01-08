// lib/esewa.ts
import crypto from 'crypto';

export interface EsewaPaymentData {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

/**
 * Generate HMAC SHA256 signature for eSewa payment
 * Message format must be exactly: total_amount=X,transaction_uuid=Y,product_code=Z
 */
export function generateEsewaSignature(
  total_amount: string,
  transaction_uuid: string,
  product_code: string
): string {
  const secretKey = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
  
  // CRITICAL: Message format must match exactly
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  
  console.log('Generating signature for message:', message);
  console.log('Using secret key:', secretKey);
  
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');
  
  console.log('Generated signature:', hash);
  
  return hash;
}

/**
 * Prepare eSewa payment data
 */
export function prepareEsewaPayment(
  amount: number,
  orderId: string
): EsewaPaymentData {
  const transaction_uuid = orderId;
  const product_code = process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST';
  
  // Convert to fixed decimal string
  const amountStr = amount.toFixed(2);
  const tax_amount = '0';
  const product_service_charge = '0';
  const product_delivery_charge = '0';
  const total_amount = amountStr;
  
  const signature = generateEsewaSignature(
    total_amount,
    transaction_uuid,
    product_code
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const paymentData: EsewaPaymentData = {
    amount: amountStr,
    tax_amount,
    total_amount,
    transaction_uuid,
    product_code,
    product_service_charge,
    product_delivery_charge,
    success_url: `${baseUrl}/api/esewa/verify`,
    failure_url: `${baseUrl}/checkout/payment?status=failed`,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature,
  };

  console.log('Payment data prepared:', paymentData);
  
  return paymentData;
}

/**
 * Verify eSewa signature from response
 */
export function verifyEsewaSignature(
  transaction_code: string,
  status: string,
  total_amount: string,
  transaction_uuid: string,
  product_code: string,
  signed_field_names: string,
  signature: string
): boolean {
  const secretKey = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
  
  // Message format for verification
  const message = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
  
  console.log('Verifying signature for message:', message);
  
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');
  
  console.log('Expected signature:', expectedSignature);
  console.log('Received signature:', signature);
  
  return expectedSignature === signature;
}