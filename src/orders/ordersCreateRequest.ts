import { HttpRequestBase } from '../core/HttpRequestBase.js';

type OrdersCreateRequestBody = {
  //
};

/**
 * Creates an order.
 */
export class OrdersCreateRequest extends HttpRequestBase<OrdersCreateRequestBody> {
  constructor() {
    super();
    this.path = '/v2/checkout/orders?';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalPartnerAttributionId(payPalPartnerAttributionId: string) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(order: OrdersCreateRequestBody) {
    this.body = order;
    return this;
  }
}
