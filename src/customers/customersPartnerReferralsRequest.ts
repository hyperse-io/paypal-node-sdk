import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseCustomerHeaders } from '../types/type-customer.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type CustomersPartnerReferralsRequestBody = {};

/**
 * Authorizes payment for an order. The response shows authorization details.
 * TODO: Define request body.
 */
export class CustomersPartnerReferralsRequest extends HttpRequestBase<
  BaseCustomerHeaders,
  CustomersPartnerReferralsRequestBody
> {
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
