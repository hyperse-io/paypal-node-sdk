import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type OrdersAuthorizeRequestBody = {
  //
};

/**
 * Authorizes payment for an order. The response shows authorization details.
 */
export class OrdersAuthorizeRequest extends HttpRequestBase<OrdersAuthorizeRequestBody> {
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

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}
