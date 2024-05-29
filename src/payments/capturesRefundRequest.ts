import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BasePaymentHeaders, type Money } from '../types/type-payment.js';

type CapturesRefundRequestBody = {
  /**
   * The amount to refund. To refund a portion of the captured amount, specify an amount.
   * If amount is not specified, an amount equal to captured amount - previous refunds is refunded.
   * The amount must be a positive number and in the same currency as the one in which the payment was captured.
   */
  amount: Money;
  /**
   * The API caller-provided external invoice ID for this order. The pattern is defined by an external party and supports Unicode.
   * if we not provide invoice_id, leave this field as `undefined`, do not provide empty string.
   */
  invoice_id?: string;
  /**
   * The reason for the refund.
   * Appears in both the payer's transaction history and the emails that the payer receives.
   * The pattern is defined by an external party and supports Unicode.
   */
  note_to_payer: string;
};

interface CapturesRefundRequestHeaders extends BasePaymentHeaders {
  'PayPal-Auth-Assertion'?: string;
  'PayPal-Request-Id'?: string;
  Prefer?: string;
}
/**
 * Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body.
 * For a partial refund, include an <code>amount</code> object in the JSON request body.
 * @see {@link https://developer.paypal.com/api/payments/v2/#captures_refund}
 */
export class CapturesRefundRequest extends HttpRequestBase<
  CapturesRefundRequestHeaders,
  CapturesRefundRequestBody
> {
  constructor(captureId: string) {
    super();
    this.path = '/v2/payments/captures/{capture_id}/refund?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
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

  payPalAuthAssertion(payPalAuthAssertionCode: string) {
    this.headers['PayPal-Auth-Assertion'] = payPalAuthAssertionCode;
    return this;
  }
  /**
   * 1. return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links.
   * 2. return=representation. The server returns a complete resource representation, including the current state of the resource.
   * @default `return=minimal`
   */
  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(refundRequest: CapturesRefundRequestBody) {
    this.body = refundRequest;
    return this;
  }
}
