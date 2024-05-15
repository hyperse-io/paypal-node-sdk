import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type Capture,
  type BasePaymentHeaders,
} from '../types/type-payment.js';

/**
 * Shows details for a refund, by ID.
 * @see {@link https://developer.paypal.com/api/payments/v2/#refunds_get}
 */
export class RefundsGetRequest extends HttpRequestBase<BasePaymentHeaders> {
  constructor(refundId: string) {
    super();
    this.path = '/v2/payments/refunds/{refund_id}?';
    this.path = this.path.replace('{refund_id}', querystring.escape(refundId));
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}

/**
 * The response body of the RefundsGetRequest.
 */
export type RefundsGetRequestResult = Capture;
