import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type BaseOrderHeaders,
  type PaymentSource,
} from '../types/type-order.js';
/**
 * Captures a payment for an order payload
 */
export type OrdersCaptureRequestBody = {
  payment_source: PaymentSource;
};

export interface OrdersCaptureRequestHeaders extends BaseOrderHeaders {
  'PayPal-Client-Metadata-Id'?: string;
  'PayPal-Request-Id'?: string;
  Prefer?: string;
}
/**
 * Captures a payment for an order.
 *
 * @see {@link https://developer.paypal.com/api/orders/v2/#orders_capture}
 */
export class OrdersCaptureRequest extends HttpRequestBase<
  OrdersCaptureRequestHeaders,
  OrdersCaptureRequestBody
> {
  constructor(orderId: string) {
    super();
    this.path = '/v2/checkout/orders/{order_id}/capture?';
    this.path = this.path.replace('{order_id}', querystring.escape(orderId));
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalClientMetadataId(payPalClientMetadataId: string) {
    this.headers['PayPal-Client-Metadata-Id'] = payPalClientMetadataId;
    return this;
  }

  payPalRequestId(payPalRequestId: string) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
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

  requestBody(orderActionRequest: OrdersCaptureRequestBody) {
    this.body = orderActionRequest;
    return this;
  }
}
