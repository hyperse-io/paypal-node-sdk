import { HttpRequestBase } from '../core/HttpRequestBase.js';

type CustomersPartnerReferralsRequestBody = {
  //
};

/**
 Authorizes payment for an order. The response shows authorization details.
 **/
export class CustomersPartnerReferralsRequest extends HttpRequestBase<CustomersPartnerReferralsRequestBody> {
  constructor() {
    super();
    this.path = '/v2/customer/partner-referrals?';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  requestBody(
    customersPartnerReferralsActionRequest: CustomersPartnerReferralsRequestBody
  ) {
    this.body = customersPartnerReferralsActionRequest;
    return this;
  }
}
