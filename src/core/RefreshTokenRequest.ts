import { type AccessTokenRequestHeaders } from './AccessTokenRequest.js';
import { HttpRequestBase } from './HttpRequestBase.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';

export type RefreshTokenRequestBody = {
  code: string;
  grant_type: string;
};
/**
 * An OAuth2 refresh token request, granted from user consent.
 *
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/RefreshTokenRequest.ts}
 */

export class RefreshTokenRequest extends HttpRequestBase<
  AccessTokenRequestHeaders,
  RefreshTokenRequestBody
> {
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
