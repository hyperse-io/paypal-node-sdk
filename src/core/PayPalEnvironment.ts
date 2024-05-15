import paypalhttp from '@paypal/paypalhttp';

const SANDBOX = 'https://api.sandbox.paypal.com';
const LIVE = 'https://api.paypal.com';
const SANDBOX_WEB_URL = 'https://www.sandbox.paypal.com';
const LIVE_WEB_URL = 'https://www.paypal.com';

/**
 * Base class for PayPal Environments
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/PayPalEnvironment.ts}
 */
export class PayPalEnvironment extends paypalhttp.Environment {
  public clientId: string;
  public clientSecret: string;
  public webUrl: string;

  /**
   * @param clientId - The client id for this environment
   * @param clientSecret  - The client secret
   * @param baseUrl  - The base url to execute requests
   * @param webUrl -The web url to authorize user's consent
   */
  constructor(
    clientId: string,
    clientSecret: string,
    baseUrl: string,
    webUrl: string
  ) {
    super(baseUrl);
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.webUrl = webUrl;
  }

  /**
   * Authorization header string for basic authentication with the current client id and secret
   * @return - The authorization header value
   */
  authorizationString() {
    const encoded = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64');

    return `Basic ${encoded}`;
  }
}

/**
 * Sandbox Environment
 */
export class SandboxEnvironment extends PayPalEnvironment {
  constructor(clientId: string, clientSecret: string) {
    super(clientId, clientSecret, SANDBOX, SANDBOX_WEB_URL);
  }
}

/**
 * Live Environment
 */
export class LiveEnvironment extends PayPalEnvironment {
  constructor(clientId: string, clientSecret: string) {
    super(clientId, clientSecret, LIVE, LIVE_WEB_URL);
  }
}
