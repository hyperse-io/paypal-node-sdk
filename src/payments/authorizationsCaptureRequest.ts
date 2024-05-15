import querystring from 'querystring';
import { HttpRequestBase } from '../core/HttpRequestBase.js';

type AuthorizationsCaptureRequestBody = {
  //
};
/**
 Captures an authorized payment, by ID.
 **/

export class AuthorizationsCaptureRequest extends HttpRequestBase<AuthorizationsCaptureRequestBody> {
  constructor(authorizationId) {
    super();
    this.path = '/v2/payments/authorizations/{authorization_id}/capture?';
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

  requestBody(capture: AuthorizationsCaptureRequestBody) {
    this.body = capture;
    return this;
  }
}
