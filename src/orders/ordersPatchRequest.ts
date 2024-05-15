import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type Order,
  type BaseOrderHeaders,
  type Patch,
} from '../types/type-order.js';

type OrderPatchRequestBody = Patch[];

/**
 * Updates an order. You can update an order with `CREATED` or `APPROVED` status.
 * You cannot update an order with `COMPLETED` status. The following attributes and objects are patchable:
 * @see {@link https://developer.paypal.com/api/orders/v2/#orders_patch}
 */
export class OrdersPatchRequest extends HttpRequestBase<
  BaseOrderHeaders,
  OrderPatchRequestBody
> {
  constructor(orderId: string) {
    super();
    this.path = '/v2/checkout/orders/{order_id}?';
    this.path = this.path.replace('{order_id}', querystring.escape(orderId));
    this.verb = 'PATCH';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  requestBody(patchRequest: OrderPatchRequestBody) {
    this.body = patchRequest;
    return this;
  }
}

/**
 * The response body of the OrdersPatchRequest.
 */
export type OrdersPatchRequestResult = Order;
