import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BaseCustomerHeaders } from '../types/type-customer.js';

/**
 * Authorizes payment for an order. The response shows authorization details.
 * TODO: Define request body.
 */
export class CustomersPartnerReferralsGetRequest extends HttpRequestBase<BaseCustomerHeaders> {
  constructor(partnerReferralId: string) {
    super();
    this.path = '/v2/customer/partner-referrals/{partner_referral_id}?';
    this.path = this.path.replace(
      '{partner_referral_id}',
      querystring.escape(partnerReferralId)
    );
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
