import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseOrderHeaders } from './types.js';

type OrdersValidateRequestBody = Record<string, unknown>;

export interface OrdersValidateRequestHeaders extends BaseOrderHeaders {
  'PayPal-Client-Metadata-Id'?: string;
}

/**
 * Validates a payment method and checks it for contingencies.
 */
export class OrdersValidateRequest extends HttpRequestBase<
  OrdersValidateRequestHeaders,
  OrdersValidateRequestBody
> {
  constructor(orderId: string) {
    super();
    this.path = '/v2/checkout/orders/{order_id}/validate-payment-method?';
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

  requestBody(orderActionRequest: OrdersValidateRequestBody) {
    this.body = orderActionRequest;
    return this;
  }
}
