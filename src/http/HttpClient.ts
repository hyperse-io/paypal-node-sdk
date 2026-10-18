import { decodeBody, encodeBody } from './encoders.js';
import { PayPalHttpError } from './errors.js';
import {
  type HttpHeaders,
  type HttpInjector,
  type HttpRequest,
  type HttpResponse,
  type HttpVerb,
  type RetryConfiguration,
} from './types.js';

/**
 * Base URL holder. Replaces `paypalhttp.Environment`, which was a five line
 * class inside a package that has not been published since 2021.
 */
export class HttpEnvironment {
  constructor(readonly baseUrl: string) {}
}

const DEFAULT_TIMEOUT = 30_000;

/**
 * Headers owned by the client. Users may not override them.
 */
const IGNORED_REQUEST_HEADERS = new Set([
  // undici only decompresses gzip/br when it manages this header itself.
  'accept-encoding',
  // Let undici compute the framing from the serialized body.
  'content-length',
  'transfer-encoding',
  // Set from `getUserAgent()` unless the caller already provided one.
  'user-agent',
]);

const DEFAULT_RETRY: Required<RetryConfiguration> = {
  maxNumberOfRetries: 0,
  httpStatusCodesToRetry: [408, 429, 500, 502, 503, 504],
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'],
  retryInterval: 100,
  backoffFactor: 2,
  maximumRetryWaitTime: 2_000,
};

export interface HttpClientOptions {
  /**
   * Request timeout in milliseconds.
   * @default 30000
   */
  timeout?: number;
  /**
   * Retry policy for transient failures.
   * @default disabled (`maxNumberOfRetries: 0`)
   */
  retry?: RetryConfiguration;
  /**
   * Custom `fetch` implementation. Defaults to the global `fetch`.
   */
  fetch?: typeof fetch;
}

/**
 * Thin `fetch` based HTTP client.
 *
 * Design notes (each one fixes a bug or design debt in `@paypal/paypalhttp`):
 * - The body is serialized *inside* the async flow, so a synchronous failure
 *   can never leave caller state (e.g. a token lock) unreleased.
 * - Header entries with `undefined` values are dropped instead of being written
 *   to Node, which used to throw `ERR_HTTP_INVALID_HEADER_VALUE`.
 * - `gzip`/`br` decompression is delegated to `fetch` (undici) instead of being
 *   hand rolled with `zlib.gunzipSync`.
 * - `AbortSignal.timeout` replaces `request.setTimeout`, and a `null` socket
 *   listener can no longer mask the real abort error.
 */
export class HttpClient {
  readonly environment: HttpEnvironment;

  protected timeout: number;
  protected retry: Required<RetryConfiguration>;

  private readonly injectors: HttpInjector[] = [];
  private readonly fetchImpl: typeof fetch | undefined;

  constructor(environment: HttpEnvironment, options: HttpClientOptions = {}) {
    this.environment = environment;
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
    this.retry = { ...DEFAULT_RETRY, ...options.retry };
    this.fetchImpl = options.fetch;
  }

  /**
   * Resolve `fetch` lazily on every request.
   *
   * Capturing `globalThis.fetch` in the constructor breaks every test harness
   * that installs its interceptor after the client is constructed (MSW's
   * `server.listen()`, nock-style patches, instrumentation, ...).
   */
  protected resolveFetch(): typeof fetch {
    const impl = this.fetchImpl ?? globalThis.fetch;

    if (typeof impl !== 'function') {
      throw new Error(
        'A global `fetch` implementation is required. Node.js >= 18 provides one natively.'
      );
    }

    return impl;
  }

  /**
   * The User-Agent sent for every request.
   */
  getUserAgent(): string {
    return 'PayPalHttp-Node HTTP/1.1';
  }

  addInjector(injector: HttpInjector): void {
    if (typeof injector !== 'function') {
      throw new Error('injector must be a function');
    }

    this.injectors.push(injector);
  }

  /**
   * Execute a request and return the parsed response.
   *
   * Rejects with {@link PayPalHttpError} for non 2xx responses.
   */
  async execute<R = any>(request: HttpRequest<any>): Promise<HttpResponse<R>> {
    await this.runInjectors(request);

    const maxAttempts = this.isRetryableMethod(request.verb)
      ? this.retry.maxNumberOfRetries + 1
      : 1;

    for (let attempt = 1; ; attempt += 1) {
      try {
        return await this.performRequest<R>(request);
      } catch (error) {
        const isRetryableStatus =
          error instanceof PayPalHttpError &&
          this.retry.httpStatusCodesToRetry.includes(error.statusCode);

        if (!isRetryableStatus || attempt >= maxAttempts) {
          throw error;
        }

        await this.sleep(this.backoffDelay(attempt));
      }
    }
  }

  protected async performRequest<R>(
    request: HttpRequest<any>
  ): Promise<HttpResponse<R>> {
    const url = this.resolveUrl(request.path);
    const headers = this.buildHeaders(request.headers);

    const fetchImpl = this.resolveFetch();

    let response: Response;

    try {
      response = await fetchImpl(url, {
        method: request.verb,
        headers,
        body: encodeBody(request.body, headers),
        signal: AbortSignal.timeout(this.timeout),
      });
    } catch (error) {
      if (isTimeoutError(error)) {
        const timeoutError = new Error(
          `Request timed out after ${this.timeout}ms: ${request.verb} ${request.path}`
        );
        // `Error` options are not in every supported lib target, so attach the
        // original abort reason manually.
        (timeoutError as Error & { cause?: unknown }).cause = error;
        throw timeoutError;
      }
      throw error;
    }

    const responseHeaders = Object.fromEntries(response.headers.entries());
    const text = await response.text();
    const contentType = responseHeaders['content-type'];

    if (!response.ok) {
      throw new PayPalHttpError({
        statusCode: response.status,
        headers: responseHeaders,
        body: text,
        result: decodeBody(text, contentType),
      });
    }

    return {
      statusCode: response.status,
      headers: responseHeaders,
      result: decodeBody<R>(text, contentType) as R,
    };
  }

  private async runInjectors(request: HttpRequest<any>): Promise<void> {
    for (const injector of this.injectors) {
      await injector(request);
    }
  }

  private resolveUrl(path: string): string {
    // Requests historically used a trailing `?` on paths without query params.
    const normalized = path.endsWith('?') ? path.slice(0, -1) : path;
    return `${this.environment.baseUrl}${normalized}`;
  }

  private buildHeaders(requestHeaders: HttpHeaders): Record<string, string> {
    const headers: Record<string, string> = {
      'User-Agent': this.getUserAgent(),
    };

    for (const [key, value] of Object.entries(requestHeaders)) {
      const normalizedKey = key.toLowerCase();

      if (value === undefined || IGNORED_REQUEST_HEADERS.has(normalizedKey)) {
        if (normalizedKey === 'user-agent' && value !== undefined) {
          headers['User-Agent'] = value;
        }
        continue;
      }

      headers[key] = value;
    }

    return headers;
  }

  private isRetryableMethod(verb: HttpVerb): boolean {
    return this.retry.httpMethodsToRetry.includes(verb);
  }

  private backoffDelay(attempt: number): number {
    const delay =
      this.retry.retryInterval * this.retry.backoffFactor ** (attempt - 1);

    return Math.min(delay, this.retry.maximumRetryWaitTime);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function isTimeoutError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as { name?: string }).name === 'TimeoutError'
  );
}
