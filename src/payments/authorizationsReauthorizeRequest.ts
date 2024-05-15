import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type Money } from '../orders/types.js';
import { type BasePaymentHeaders } from './types.js';

type AuthorizationsReauthorizeRequestBody = {
  amount: Money;
};

export interface AuthorizationsReauthorizeRequestHeaders
  extends BasePaymentHeaders {
  'PayPal-Request-Id'?: string;
  Prefer?: string;
}

/**
 * Authorizations Reauthorize
 * @see {@link https://developer.paypal.com/api/payments/v2/#authorizations_reauthorize}
 */
export class AuthorizationsReauthorizeRequest extends HttpRequestBase<
  AuthorizationsReauthorizeRequestHeaders,
  AuthorizationsReauthorizeRequestBody
> {
  constructor(authorizationId: string) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}/reauthorize?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  payPalRequestId(payPalRequestId: string) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(reauthorizeRequest: AuthorizationsReauthorizeRequestBody) {
    this.body = reauthorizeRequest;
    return this;
  }
}
