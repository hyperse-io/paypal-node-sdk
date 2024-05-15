import { HttpRequestBase } from './HttpRequestBase.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';

type AccessTokenRequestBody = {
  grant_type: string;
  refresh_token: string;
};

/**
 * An OAuth2 client credentials grant access token request
 */
export class AccessTokenRequest extends HttpRequestBase<AccessTokenRequestBody> {
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
