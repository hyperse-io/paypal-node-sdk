/**
 Shows details for a refund, by ID.
 **/

export class ReferencedPayoutsItemsRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
    'PayPal-Partner-Attribution-Id'?: string;
  };

  constructor() {
    this.path = '/v1/payments/referenced-payouts-items?';
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalPartnerAttributionId(payPalPartnerAttributionId: string) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  requestBody(order) {
    this.body = order;
    return this;
  }
}
