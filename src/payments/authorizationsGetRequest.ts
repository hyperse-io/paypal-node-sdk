import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BasePaymentHeaders } from '../types/type-payment.js';

/**
 * Shows details for an authorized payment, by ID.
 * @see {@link https://developer.paypal.com/api/payments/v2/#authorizations_get}
 */
export class AuthorizationsGetRequest extends HttpRequestBase<BasePaymentHeaders> {
  constructor(authorizationId: string) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'GET';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
