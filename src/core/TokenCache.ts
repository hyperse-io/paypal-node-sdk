import { EventEmitter } from 'events';
import { type HttpRequest } from '../http/types.js';
import { type AccessToken } from './AccessToken.js';
import { type PayPalEnvironment } from './PayPalEnvironment.js';

const _cacheMap = new Map<string, TokenCache>();

/**
 * Stores token, token status and a request queue for every client
 * Documentation
 *
 * @see {@link https://github.com/hyperse-io/paypal-node-sdk/tree/main/src/core/TokenCache.ts}
 */
export class TokenCache {
  private _token: AccessToken | null;
  private _locked: boolean;
  private _requests: HttpRequest<any>[];
  private _emitter: EventEmitter;

  /**
   * Cache key is scoped by `baseUrl` as well as `clientId`: the same client id
   * can exist in both sandbox and live, and tokens are not interchangeable.
   */
  static cacheForEnvironment(
    environment: PayPalEnvironment,
    refreshToken?: string
  ) {
    let key = `${environment.baseUrl}|${environment.clientId}`;

    if (refreshToken) {
      key += `|${refreshToken}`;
    }

    let cache = _cacheMap.get(key);

    if (!cache) {
      cache = new TokenCache();
      _cacheMap.set(key, cache);
    }

    return cache;
  }

  /**
   * Drops every cached token. Mostly useful in tests and long running workers
   * that rotate credentials at runtime.
   */
  static clearAll() {
    _cacheMap.clear();
  }

  constructor() {
    this._token = null;
    this._locked = false;
    this._requests = [];
    this._emitter = new EventEmitter();
    this._emitter.setMaxListeners(0);
  }

  /**
   * Gets the current token for the client
   * @return {AccessToken|null} - The current token or null if there is none
   */
  getToken() {
    return this._token;
  }

  /**
   * Sets the token for the current client also setting its status to absent or valid if the token exist or not
   * @param {AccessToken|null} token - The current token for the client or null to remove it
   * @return {void}
   */
  setToken(token: AccessToken | null) {
    this._token = token;
  }

  lock() {
    this._locked = true;
  }

  unlock() {
    this._locked = false;
  }

  isLocked() {
    return this._locked;
  }

  isValid() {
    return this.isPresent() && !this._token?.isExpired();
  }

  isPresent() {
    return Boolean(this._token);
  }

  /**
   * Add a request to the queue and wait for the notify method to signal error or completion
   * @param {Object} request - The request to be queued
   * @return {Promise} - A promise that will resolve or rejects when the notify method is called
   * */
  wait(request: HttpRequest<any>) {
    this._requests.push(request);

    return new Promise<HttpRequest<any>>((resolve, reject) => {
      const completeHandler = (req: HttpRequest<any>) => {
        if (request === req) {
          this._emitter.removeListener('complete', completeHandler);
          this._emitter.removeListener('fail', failHandler);
          resolve(request);
        }
      };
      const failHandler = (err: unknown) => {
        this._emitter.removeListener('complete', completeHandler);
        this._emitter.removeListener('fail', failHandler);
        reject(err);
      };

      this._emitter.on('complete', completeHandler);
      this._emitter.on('fail', failHandler);
    });
  }

  /**
   * Flush the request queue resolving every call in the order they were added or rejects all calls if an error is provided
   * @param {Array} [err] - An optional error that rejects all requests instead of resolving them
   * @return {void} - void
   */
  notify(err?: unknown) {
    if (err) {
      this._emitter.emit('fail', err);
    } else {
      this._requests.forEach((request) =>
        this._emitter.emit('complete', request)
      );
    }
    this._requests = [];
    this._emitter.removeAllListeners();
  }
}
