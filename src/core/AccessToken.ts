/**
 * A small amount of time to loosen the token expiration algorithm
 * @constant EXPIRATION_THRESHOLD
 * @type {number}
 */
const EXPIRATION_THRESHOLD = 500;

/**
 * The access token object as it was granted by the token endpoint
 */
type AccessTokenOptions = {
  /**
   * The access token
   */
  access_token: string;
  /**
   * The token type
   */
  token_type: string;
  /**
   * The duration of the token in milliseconds
   */
  expires_in: number;
  /**
   * The refresh token if any to refresh the current token
   */
  refresh_token?: string;
};

/**
 * An OAuth2 access token
 */
export class AccessToken {
  private _accessToken: string;
  private _tokenType: string;
  private _expiresIn: number;
  private _dateCreated: number;

  constructor(options: AccessTokenOptions) {
    this._accessToken = options.access_token;
    this._tokenType = options.token_type;
    this._expiresIn = options.expires_in * 1000;
    this._dateCreated = Date.now();
  }

  /**
   * Get the expiration status of the token
   * @return {boolean} - True if the token is expired otherwise false
   */
  isExpired() {
    return (
      Date.now() > this._dateCreated + this._expiresIn - EXPIRATION_THRESHOLD
    );
  }

  /**
   * Get the value of an Authorization header with the current access token
   * @return {string} - The Authorization header value
   */
  authorizationString() {
    return `${this._tokenType} ${this._accessToken}`;
  }
}
