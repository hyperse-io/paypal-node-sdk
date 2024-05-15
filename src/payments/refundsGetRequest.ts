import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

/**
 * Shows details for a refund, by ID.
 */
export class RefundsGetRequest extends HttpRequestBase {
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
