import { type BaseHeaders } from '../core/HttpRequestBase.js';
import { type Money, type PayeeBase } from '../orders/types.js';

export interface BasePaymentHeaders extends BaseHeaders {
  'Content-Type': 'application/json';
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-disbursement_mode
export type DisbursementMode = 'DELAYED' | 'INSTANT';

// https://developer.paypal.com/docs/api/payments/v2/#definition-platform_fee
export interface PlatformFee {
  amount: Money;
  payee?: PayeeBase;
}

// https://developer.paypal.com/docs/api/payments/v2/#definition-payment_instruction
export interface PaymentInstruction {
  disbursement_mode: DisbursementMode;
  payee_pricing_tier_id: string;
  platform_fees: PlatformFee[];
}
