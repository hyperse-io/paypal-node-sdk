import { readFileSync } from 'fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import paypalhttp, { type HttpRequest } from '@paypal/paypalhttp';
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

/**
 * PayPal Http client
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/PayPalHttpClient.ts}
 */

export class PayPalHttpClient extends paypalhttp.HttpClient {
  private _cache: TokenCache;
  public refreshToken?: string;
  private package: { version: string };

  /**
   * @param  environment - The environment for this client
   * @param refreshToken - The refreshToken to be used to generate the access Token.
   */
  constructor(environment: PayPalEnvironment, refreshToken?: string) {
    super(environment);
    this._cache = TokenCache.cacheForEnvironment(environment, refreshToken);
    this.refreshToken = refreshToken;
    this.addInjector(this.authInjector);
    this.package = JSON.parse(
      readFileSync(getDirname(import.meta.url, '../../package.json'), 'utf8')
    );
    this.addInjector(function (req) {
      req.headers['Accept-Encoding'] = 'gzip';
      req.headers['sdk_name'] = 'Checkout SDK';
      req.headers['sdk_version'] = '1.0.2';
      req.headers['sdk_tech_stack'] = 'NodeJS ' + process.version;
      req.headers['api_integration_type'] = 'PAYPALSDK';
    });
  }
  /**
   * An injector that fetches token when the client has no token or is expired and queues calls if the token is refreshing
   * @param {Object} request - The current request for the client
   * @return {Promise.<any>} Promise that fetches a new access Token
   */
  private authInjector = (request: HttpRequest): void | Promise<void> => {
    if (request.headers.Authorization) {
      return;
    }

    if (this._cache.isValid()) {
      this._setAuthHeader(request);
    } else if (this._cache.isLocked()) {
      return this._cache.wait(request).then(() => this._setAuthHeader(request));
    } else if (!this._cache.isValid()) {
      return Promise.all([
        this._cache.wait(request),
        this.fetchAccessToken(),
      ]).then(() => this._setAuthHeader(request));
    }
  };

  /**
   * Returns the user agent for this client implementation
   * @override
   * @return {string} - The user agent string
   */
  getUserAgent() {
    return (
      'PayPalSDK/PayPal-node-SDK ' +
      this.package.version +
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
  execute<T = any>(
    request: HttpRequestBase<any, any>
  ): Promise<paypalhttp.HttpResponse<T>> {
    return super.execute(request).catch((err) => {
      if (err.statusCode === 401) {
        return this._retryRequest(request);
      }
      return Promise.reject(err);
    });
  }

  _retryRequest(request: HttpRequest) {
    const promise = this._cache.wait(request).then(() => {
      this._setAuthHeader(request);
      return super.execute(request);
    });

    if (this._cache.isLocked()) {
      return promise;
    }

    // Avoids node UnhandledPromiseRejectionWarning on access token failure.
    return Promise.race([this.fetchAccessToken(), promise]).then(() => promise);
  }

  fetchAccessToken() {
    this._cache.lock();
    return super
      .execute(
        new AccessTokenRequest(
          this.environment as PayPalEnvironment,
          this.refreshToken
        )
      )
      .then((resp) => {
        const token = new AccessToken(resp.result);

        this._cache.setToken(token);
        this._cache.notify();
        this._cache.unlock();
        return token;
      })
      .catch((err) => {
        this._cache.setToken(null);
        this._cache.notify(err);
        this._cache.unlock();
        return Promise.reject(err);
      });
  }

  /**
   * Sets the Authorization header for this request based on the client token
   * @param {Object} request - The request to modify
   * @private
   * @return {void}
   */
  _setAuthHeader(request: HttpRequest) {
    const token = this._cache.getToken();

    request.headers = request.headers || {};
    request.headers.Authorization = token?.authorizationString();
  }
}
