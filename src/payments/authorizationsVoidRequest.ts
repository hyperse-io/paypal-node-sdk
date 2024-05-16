import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';
import { type BasePaymentHeaders } from '../types/type-payment.js';

interface AuthorizationsVoidRequestHeaders extends BasePaymentHeaders {
  'PayPal-Auth-Assertion'?: string;
  Prefer?: string;
}
/**
 * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has been fully captured.
 * @see {@link https://developer.paypal.com/api/payments/v2/#authorizations_void}
 */
export class AuthorizationsVoidRequest extends HttpRequestBase<AuthorizationsVoidRequestHeaders> {
  constructor(authorizationId: string) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}/void?';
    this.path = this.path.replace(
      '{authorization_id}',
      querystring.escape(authorizationId)
    );
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}
