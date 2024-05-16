import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseOrderHeaders } from '../types/type-order.js';

/**
 * Shows details for an order, by ID.
 * @see {@link https://developer.paypal.com/api/orders/v2/#orders_get}
 */
export class OrdersGetRequest extends HttpRequestBase<BaseOrderHeaders> {
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
