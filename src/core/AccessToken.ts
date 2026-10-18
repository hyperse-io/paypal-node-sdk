/**
 * Documentation
 *
 * @see {@link https://github.com/paypal/Checkout-NodeJS-SDK/blob/develop/lib/core/access_token.js}
 */

export interface AccessTokenOptions {
  /**
   * The access token
   */
  access_token: string;

  /**
   * The duration of the token in seconds
   */
  expires_in: number;

  /**
   * The token type
   */
  token_type: string;

  /**
   * The refresh token if any to refresh the current token
   */
  refresh_token?: string;
}

/**
 * A small amount of time to loosen the token expiration algorithm
 */
const EXPIRATION_THRESHOLD = 500;

/**
 * An OAuth2 access token
 *
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/AccessToken.ts}
 */

export class AccessToken {
  private _accessToken: string;
  private _tokenType: string;
  private _expiresIn: number;
  private _dateCreated: number;

  constructor(options: AccessTokenOptions) {
    this._accessToken = options.access_token;
    this._tokenType = options.token_type;

    const expiresIn = Number(options.expires_in);

    // A missing/invalid `expires_in` used to produce `NaN`, and
    // `Date.now() > NaN` is always false, so the token looked immortal and was
    // never refreshed. Treat it as already expired instead.
    this._expiresIn = Number.isFinite(expiresIn) ? expiresIn * 1000 : 0;
    this._dateCreated = Date.now();
  }

  /**
   * Get the expiration status of the token
   * @return - True if the token is expired otherwise false
   */
  isExpired() {
    if (this._expiresIn <= 0) {
      return true;
    }

    return (
      Date.now() > this._dateCreated + this._expiresIn - EXPIRATION_THRESHOLD
    );
  }

  /**
   * Get the value of an Authorization header with the current access token
   * @return The Authorization header value
   */
  authorizationString() {
    return `${this._tokenType} ${this._accessToken}`;
  }
}
