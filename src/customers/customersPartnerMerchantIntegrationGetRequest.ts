import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

/**
 Authorizes payment for an order. The response shows authorization details.
 **/
export class CustomersPartnerMerchantIntegrationGetRequest extends HttpRequestBase {
  constructor(partnerMerchantId: string, sellerMerchantId: string) {
    super();
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
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
