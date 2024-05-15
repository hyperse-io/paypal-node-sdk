/**
 * Shows details for a refund, by ID.
 */
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type ReferencedPayoutsItemsRequestBody = {
  //
};

export class ReferencedPayoutsItemsRequest extends HttpRequestBase<ReferencedPayoutsItemsRequestBody> {
  constructor() {
    super();
    this.path = '/v1/payments/referenced-payouts-items?';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalPartnerAttributionId(payPalPartnerAttributionId: string) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  requestBody(order: ReferencedPayoutsItemsRequestBody) {
    this.body = order;
    return this;
  }
}
