import querystring from 'querystring';

/**
 Authorizes payment for an order. The response shows authorization details.
 **/
export class CustomersPartnerReferralsGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(partnerReferralId) {
    this.path = '/v2/customer/partner-referrals/{partner_referral_id}?';
    this.path = this.path.replace(
      '{partner_referral_id}',
      querystring.escape(partnerReferralId)
    );
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
