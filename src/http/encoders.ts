/**
 * Minimal request/response body encoding.
 *
 * The PayPal REST APIs used by this SDK only speak JSON and
 * `application/x-www-form-urlencoded` (the OAuth token endpoint). The
 * `multipart` encoder from `@paypal/paypalhttp` was never used here, so it is
 * intentionally not reimplemented.
 */

export interface BodyEncoder {
  /**
   * Returns true when this encoder can handle the given content type.
   */
  canEncode(contentType: string): boolean;
  encode(body: unknown): BodyInit;
}

const jsonEncoder: BodyEncoder = {
  canEncode: (contentType) => /^application\/json\b/i.test(contentType),
  encode: (body) => JSON.stringify(body),
};

const formEncoder: BodyEncoder = {
  canEncode: (contentType) =>
    /^application\/x-www-form-urlencoded\b/i.test(contentType),
  encode: (body) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(
      body as Record<string, unknown>
    )) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    return params.toString();
  },
};

const textEncoder: BodyEncoder = {
  canEncode: (contentType) => /^text\//i.test(contentType),
  encode: (body) => String(body),
};

const encoders: BodyEncoder[] = [jsonEncoder, formEncoder, textEncoder];

/**
 * Serialize a request body according to the request `Content-Type`.
 *
 * Returns `undefined` when there is no body to send, which lets `fetch` omit
 * `Content-Length` entirely instead of sending `0`.
 */
export function encodeBody(
  body: unknown,
  headers: Record<string, string | undefined>
): BodyInit | undefined {
  if (body === null || body === undefined) {
    return undefined;
  }

  // Already serialized by the caller.
  if (typeof body === 'string' || body instanceof Uint8Array) {
    return body as BodyInit;
  }

  const contentType = headers['content-type'] ?? headers['Content-Type'] ?? '';
  const encoder = encoders.find((candidate) =>
    candidate.canEncode(contentType)
  );

  if (!encoder) {
    // Fall back to JSON: PayPal defaults to JSON for JSON-ish endpoints and
    // this keeps behaviour predictable instead of silently dropping the body.
    return JSON.stringify(body);
  }

  return encoder.encode(body);
}

/**
 * Parse a response body. Returns `undefined` for empty bodies (e.g. 204).
 */
export function decodeBody<T>(
  body: string,
  contentType?: string
): T | undefined {
  if (!body) {
    return undefined;
  }

  const normalized = (contentType ?? '').toLowerCase();

  if (normalized === '' || normalized.includes('json')) {
    try {
      return JSON.parse(body) as T;
    } catch {
      return body as unknown as T;
    }
  }

  return body as unknown as T;
}
