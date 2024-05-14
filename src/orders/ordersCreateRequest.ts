/**
 Creates an order.
 **/

export class OrdersCreateRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Partner-Attribution-Id'?: string;
    Prefer?: string;
  };

  constructor() {
    this.path = '/v2/checkout/orders?';
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalPartnerAttributionId(payPalPartnerAttributionId) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(order) {
    this.body = order;
    return this;
  }
}
