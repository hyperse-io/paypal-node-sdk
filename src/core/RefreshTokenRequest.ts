import { HttpRequestBase } from './HttpRequestBase.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';

type RefreshTokenRequestBody = {
  code: string;
  grant_type: string;
};
/**
 * An OAuth2 refresh token request, granted from user consent.
 */
export class RefreshTokenRequest extends HttpRequestBase<RefreshTokenRequestBody> {
  /**
   * @param {PayPalEnvironment} environment - The environment for this request (sandbox or live)
   * @param {string} code - The authorization code provided at the end of the user consent OAuth flow.
   */
  constructor(environment: PayPalEnvironment, code: string) {
    super();
    const body = {
      grant_type: 'authorization_code',
      code: code,
    };

    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: environment.authorizationString(),
    };

    this.path = '/v1/identity/openidconnect/tokenservice';
    this.body = body;
    this.verb = 'POST';
  }
}
