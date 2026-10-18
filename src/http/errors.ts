import { type HttpHeaders } from './types.js';

/**
 * Error thrown for non 2xx responses.
 *
 * Unlike the untyped `HttpError` from `@paypal/paypalhttp` (which is not even
 * declared in `@types/paypal__paypalhttp`), this class exposes the parsed
 * PayPal error body as a typed `result`.
 */
export class PayPalHttpError<T = unknown> extends Error {
  /**
   * HTTP status code of the failed response.
   */
  readonly statusCode: number;

  /**
   * Response headers, lowercased.
   */
  readonly headers: Record<string, string>;

  /**
   * Parsed response body when the `Content-Type` was understood.
   */
  readonly result: T | undefined;

  /**
   * Raw response body as text.
   */
  readonly body: string;

  /**
   * PayPal's `PayPal-Debug-Id` correlation header, when present.
   */
  readonly debugId: string | undefined;

  constructor(options: {
    statusCode: number;
    headers: HttpHeaders;
    body: string;
    result?: T;
    message?: string;
  }) {
    const normalizedHeaders = normalizeHeaders(options.headers);
    super(options.message ?? buildErrorMessage(options.body));

    this.name = 'PayPalHttpError';
    this.statusCode = options.statusCode;
    this.headers = normalizedHeaders;
    this.result = options.result;
    this.body = options.body;
    this.debugId = normalizedHeaders['paypal-debug-id'];

    // Required for `instanceof` to work when targeting ES5-ish output.
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * PayPal error name (e.g. `INVALID_REQUEST`), when the body could be parsed.
   */
  get errorName(): string | undefined {
    return (this.result as { name?: string } | undefined)?.name;
  }

  /**
   * PayPal error message, when the body could be parsed.
   */
  get errorMessage(): string | undefined {
    return (this.result as { message?: string } | undefined)?.message;
  }
}

function normalizeHeaders(headers: HttpHeaders): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      normalized[key.toLowerCase()] = value;
    }
  }

  return normalized;
}

function buildErrorMessage(body: string): string {
  if (!body) {
    return 'An unknown error occurred.';
  }

  try {
    const parsed = JSON.parse(body) as { message?: string };
    if (parsed && typeof parsed.message === 'string') {
      return parsed.message;
    }
  } catch {
    // Not JSON, fall through to the raw body.
  }

  return body;
}
