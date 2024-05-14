/**
 Authorizes payment for an order. The response shows authorization details.
 **/
export class CustomersPartnerReferralsRequest {
  public path: string;
  public verb: 'POST';
  public body: any;
  public headers: {
    'Content-Type': string;
  };

  constructor() {
    this.path = '/v2/customer/partner-referrals?';
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  requestBody(customersPartnerReferralsActionRequest: any) {
    this.body = customersPartnerReferralsActionRequest;
    return this;
  }
}
