import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
/**
 * Captures a payment for an order payload
 */
type OrdersCaptureRequestBody = {
  //
};

/**
 * Captures a payment for an order.
 */
export class OrdersCaptureRequest extends HttpRequestBase<OrdersCaptureRequestBody> {
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

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(orderActionRequest: OrdersCaptureRequestBody) {
    this.body = orderActionRequest;
    return this;
  }
}
