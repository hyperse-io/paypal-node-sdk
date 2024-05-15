import { HttpRequestBase } from './HttpRequestBase.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';

export type AccessTokenRequestBody = {
  grant_type: string;
  refresh_token: string;
};

export type AccessTokenRequestHeaders = {
  'Content-Type': string;
  Authorization: string;
};

/**
 * An OAuth2 client credentials grant access token request
 * Documentation
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/AccessTokenRequest.ts}
 */
export class AccessTokenRequest extends HttpRequestBase<
  AccessTokenRequestHeaders,
  AccessTokenRequestBody
> {
  /**
   * @param environment  The environment for this request (sandbox or live)
   * @param refreshToken - An optional refresh token to use refreshing instead of granting
   */
  constructor(environment: PayPalEnvironment, refreshToken?: string) {
    super();
    this.body = {
      grant_type: 'client_credentials',
      refresh_token: '',
    };

    if (refreshToken) {
      this.body = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      };
    }

    this.path = '/v1/oauth2/token';
    this.verb = 'POST';
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: environment.authorizationString(),
    };
  }
}
