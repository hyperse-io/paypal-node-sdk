/**
 * Core HTTP type definitions used by the PayPal SDK.
 *
 * These are intentionally dependency free so that the SDK does not rely on the
 * deprecated `@paypal/paypalhttp` package (last published in 2021) nor on
 * `@types/paypal__paypalhttp` (last published in 2023).
 */

export type HttpVerb =
  'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

/**
 * Headers are stored in a plain object. `undefined` values are dropped before
 * the request is sent, so callers can safely assign optional values.
 */
export type HttpHeaders = Record<string, string | undefined>;

export interface HttpRequest<B = unknown> {
  path: string;
  verb: HttpVerb;
  body: B;
  headers: HttpHeaders;
}

export interface HttpResponse<R = unknown> {
  statusCode: number;
  headers: Record<string, string>;
  result: R;
}

export type HttpInjector = (request: HttpRequest<any>) => void | Promise<void>;

/**
 * Retry policy for transient failures.
 *
 * Disabled by default (`maxNumberOfRetries: 0`) so the SDK keeps its historical
 * behaviour. Only idempotent methods are retried by default, which prevents
 * duplicated captures/refunds.
 */
export interface RetryConfiguration {
  /**
   * Number of retries after the initial attempt.
   * @default 0
   */
  maxNumberOfRetries?: number;
  /**
   * Status codes that are considered retryable.
   * @default [408, 429, 500, 502, 503, 504]
   */
  httpStatusCodesToRetry?: number[];
  /**
   * Methods that are considered safe to retry.
   * @default ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']
   */
  httpMethodsToRetry?: HttpVerb[];
  /**
   * Base delay (in milliseconds) used by the exponential backoff.
   * @default 100
   */
  retryInterval?: number;
  /**
   * Multiplier applied on every attempt.
   * @default 2
   */
  backoffFactor?: number;
  /**
   * Upper bound (in milliseconds) for a single backoff delay.
   * @default 2000
   */
  maximumRetryWaitTime?: number;
}
