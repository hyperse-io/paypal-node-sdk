import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

/**
 * Shows details for an order, by ID.
 */
export class OrdersGetRequest extends HttpRequestBase {
  constructor(orderId: string) {
    super();
    this.path = '/v2/checkout/orders/{order_id}?';
    this.path = this.path.replace('{order_id}', querystring.escape(orderId));
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
