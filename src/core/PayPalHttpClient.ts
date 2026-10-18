import { readFileSync } from 'fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PayPalHttpError } from '../http/errors.js';
import { HttpClient, type HttpClientOptions } from '../http/HttpClient.js';
import { type HttpRequest, type HttpResponse } from '../http/types.js';
import { AccessToken } from './AccessToken.js';
import { AccessTokenRequest } from './AccessTokenRequest.js';
import { type HttpRequestBase } from './HttpRequestBase.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';
import { TokenCache } from './TokenCache.js';

/**
 * Provider method to simulate __dirname veriable.
 * @param url import.meta.url
 * @param paths paths to join.
 */
const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const packageJson = JSON.parse(
  readFileSync(getDirname(import.meta.url, '../../package.json'), 'utf8')
) as { version: string };

/**
 * PayPal Http client
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/PayPalHttpClient.ts}
 */
export class PayPalHttpClient extends HttpClient {
  private _cache: TokenCache;
  public refreshToken?: string;

  /**
   * @param  environment - The environment for this client
   * @param refreshToken - The refreshToken to be used to generate the access Token.
   */
  constructor(
    environment: PayPalEnvironment,
    refreshToken?: string,
    options: HttpClientOptions = {}
  ) {
    super(environment, options);
    this._cache = TokenCache.cacheForEnvironment(environment, refreshToken);
    this.refreshToken = refreshToken;

    this.addInjector(this.authInjector);
    this.addInjector((req) => {
      req.headers['sdk_name'] = 'Checkout SDK';
      // Read from package.json instead of a hardcoded string that drifted
      // (it used to report 1.0.2 while the package was at 2.0.6).
      req.headers['sdk_version'] = packageJson.version;
      req.headers['sdk_tech_stack'] = 'NodeJS ' + process.version;
      req.headers['api_integration_type'] = 'PAYPALSDK';
    });
  }

  /**
   * An injector that fetches token when the client has no token or is expired and queues calls if the token is refreshing
   * @param request - The current request for the client
   * @return Promise that fetches a new access Token
   */
  private authInjector = (request: HttpRequest<any>): void | Promise<void> => {
    if (request.headers.Authorization) {
      return;
    }

    if (this._cache.isValid()) {
      this._setAuthHeader(request);
      return;
    }

    if (this._cache.isLocked()) {
      return this._cache.wait(request).then(() => this._setAuthHeader(request));
    }

    return Promise.all([
      this._cache.wait(request),
      this.fetchAccessToken(),
    ]).then(() => this._setAuthHeader(request));
  };

  /**
   * Returns the user agent for this client implementation
   * @override
   * @return {string} - The user agent string
   */
  getUserAgent() {
    return (
      'PayPalSDK/PayPal-node-SDK ' +
      packageJson.version +
      ' (node ' +
      process.version +
      '-' +
      process.arch +
      '-' +
      process.platform +
      '; OpenSSL ' +
      process.versions.openssl +
      ')'
    );
  }

  /**
   * Executes a request and returns a Promise
   * @param request Request Instance of HttpRequest
   * @returns
   */
  async execute<T = any>(
    request: HttpRequestBase<any, any>
  ): Promise<HttpResponse<T>> {
    try {
      return await super.execute<T>(request);
    } catch (error) {
      if (error instanceof PayPalHttpError && error.statusCode === 401) {
        return this._retryRequest<T>(request);
      }
      throw error;
    }
  }

  async _retryRequest<T = any>(
    request: HttpRequestBase<any, any>
  ): Promise<HttpResponse<T>> {
    // A 401 means the cached token is stale. Drop it *and* any header we put on
    // this request earlier, otherwise the retry would replay the dead token.
    this._cache.setToken(null);
    delete request.headers.Authorization;

    const promise = this._cache
      .wait(request)
      .then(() => this._setAuthHeader(request));

    if (this._cache.isLocked()) {
      return promise.then(() => super.execute<T>(request));
    }

    return Promise.all([this.fetchAccessToken(), promise]).then(() =>
      super.execute<T>(request)
    );
  }

  async fetchAccessToken(): Promise<AccessToken> {
    this._cache.lock();

    try {
      const response = await super.execute<AccessTokenRequestResult>(
        new AccessTokenRequest(
          this.environment as PayPalEnvironment,
          this.refreshToken
        )
      );

      const token = new AccessToken(response.result);

      this._cache.setToken(token);
      this._cache.notify();

      return token;
    } catch (error) {
      this._cache.setToken(null);
      this._cache.notify(error);
      throw error;
    } finally {
      // Always release the lock, including when the request failed
      // synchronously. Previously an error here left the cache locked forever
      // and every subsequent request hung on `TokenCache.wait()`.
      this._cache.unlock();
    }
  }

  /**
   * Sets the Authorization header for this request based on the client token
   * @param request - The request to modify
   * @private
   * @return {void}
   */
  _setAuthHeader(request: HttpRequest<any>) {
    const token = this._cache.getToken();

    if (!token) {
      // Writing `undefined` into a header makes Node throw
      // ERR_HTTP_INVALID_HEADER_VALUE. Leaving the caller's header untouched is
      // the safer behaviour; the auth injector will re-fetch on the next pass.
      return;
    }

    request.headers = request.headers ?? {};
    request.headers.Authorization = token.authorizationString();
  }
}

/**
 * Shape of the `/v1/oauth2/token` response body.
 */
type AccessTokenRequestResult = {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
};
