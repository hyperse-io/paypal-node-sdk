import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type OrderPatchRequestBody = {
  // TODO:
};
/**
 * Updates an order. You can update an order with `CREATED` or `APPROVED` status.
 * You cannot update an order with `COMPLETED` status. The following attributes and objects are patchable:
 * @example
 * ```html
 * <ul>
 *   <li><code>intent</code>.
 *      Supported operation is <code>replace</code>.
 *   </li>
 *   <
 *   li><code>purchase_units</code>. Support
 *   ed operations are <code>add</code> and <code>replace</code>.</li>
 *   <li><code>purchase_units[].custom_id</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li>
 *   <li><code>purchase_units[].description</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li>
 *   <li><code>purchase_units[].payee.email</code>. Supported operations are <code>add</code> and <code>replace</code>.</li>
 *   <li><code>purchase_units[].shipping_address</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li>
 *   <li><code>purchase_units[].soft_descriptor</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li>
 *   <li><code>purchase_units[].amount</code>. Supported operation is <code>replace</code>.</li>
 * /ul>
 * ```
 */
export class OrdersPatchRequest extends HttpRequestBase<OrderPatchRequestBody> {
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
