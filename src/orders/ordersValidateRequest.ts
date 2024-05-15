import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type OrdersValidateRequestBody = {
  //
};

/**
 * Validates a payment method and checks it for contingencies.
 */
export class OrdersValidateRequest extends HttpRequestBase<OrdersValidateRequestBody> {
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
