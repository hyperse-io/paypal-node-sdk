import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type Money, type BasePaymentHeaders } from '../types/type-payment.js';

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
  /**
   * 1. return=minimal. The server returns a minimal response to optimize communication between the API caller and the server. A minimal response includes the id, status and HATEOAS links.
   * 2. return=representation. The server returns a complete resource representation, including the current state of the resource.
   * @default `return=minimal`
   */
  prefer(prefer: string) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(reauthorizeRequest: AuthorizationsReauthorizeRequestBody) {
    this.body = reauthorizeRequest;
    return this;
  }
}
