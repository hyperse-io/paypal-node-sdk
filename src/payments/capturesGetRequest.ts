import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BasePaymentHeaders } from './types.js';

/**
 * Captures Get
 * Shows details for a captured payment, by ID.
 * @see {@link https://developer.paypal.com/api/payments/v2/#captures_get}
 */
export class CapturesGetRequest extends HttpRequestBase<BasePaymentHeaders> {
  constructor(captureId: string) {
    super();
    this.path = '/v2/payments/captures/{capture_id}?';
    this.path = this.path.replace(
      '{capture_id}',
      querystring.escape(captureId)
    );
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
