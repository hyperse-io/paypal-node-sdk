import querystring from 'querystring';

/**
 Authorizes payment for an order. The response shows authorization details.
 **/
export class CustomersPartnerMerchantIntegrationGetRequest {
  public path: string;
  public verb: 'GET';
  public body: null;
  public headers: {
    'Content-Type': string;
  };

  constructor(partnerMerchantId: string, sellerMerchantId: string) {
    this.path =
      '/v1/customer/partners/{partner_merchant_id}/merchant-integrations/{seller_merchant_id}?';
    this.path = this.path.replace(
      '{partner_merchant_id}',
      querystring.escape(partnerMerchantId)
    );
    this.path = this.path.replace(
      '{seller_merchant_id}',
      querystring.escape(sellerMerchantId)
    );
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
