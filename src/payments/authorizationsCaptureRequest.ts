import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type Money } from '../orders/types.js';
import { type PaymentInstruction, type BasePaymentHeaders } from './types.js';

type AuthorizationsCaptureRequestBody = {
  amount: Money;
  final_capture: boolean;
  invoice_id: string;
  note_to_payer: string;
  payment_instruction?: PaymentInstruction;
  soft_descriptor: string;
};

interface AuthorizationsCaptureRequestHeaders extends BasePaymentHeaders {
  'PayPal-Request-Id'?: string;
  Prefer?: string;
}

/**
 * Captures an authorized payment, by ID.
 * @see {@link https://developer.paypal.com/api/payments/v2/#authorizations_capture}
 */
export class AuthorizationsCaptureRequest extends HttpRequestBase<
  AuthorizationsCaptureRequestHeaders,
  AuthorizationsCaptureRequestBody
> {
  constructor(authorizationId) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}/capture?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalRequestId(payPalRequestId: string) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(capture: AuthorizationsCaptureRequestBody) {
    this.body = capture;
    return this;
  }
}
