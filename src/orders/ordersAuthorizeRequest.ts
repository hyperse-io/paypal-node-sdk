import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import {
  type BaseOrderHeaders,
  type PaymentSource,
} from '../types/type-order.js';

export type OrdersAuthorizeRequestBody = {
  payment_source: PaymentSource;
};

export interface OrdersAuthorizeRequestHeaders extends BaseOrderHeaders {
  'PayPal-Client-Metadata-Id'?: string;
  'PayPal-Request-Id'?: string;
  Prefer?: string;
}

/**
 * Authorizes payment for an order. The response shows authorization details.
 * @see {@link https://developer.paypal.com/api/orders/v2/#orders_authorize}
 */
export class OrdersAuthorizeRequest extends HttpRequestBase<
  OrdersAuthorizeRequestHeaders,
  OrdersAuthorizeRequestBody
> {
  constructor(orderId: string) {
    super();
    this.path = '/v2/checkout/orders/{order_id}/authorize?';
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

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}
