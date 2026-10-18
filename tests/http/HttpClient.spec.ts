import { describe, expect, it, vi } from 'vitest';
import { PayPalHttpError } from '../../src/http/errors.js';
import { HttpClient, HttpEnvironment } from '../../src/http/HttpClient.js';

const baseUrl = 'https://api.example.com';

type FetchHandler = (url: string, init: RequestInit) => Promise<Response>;

function createClient(
  handler: FetchHandler,
  options: ConstructorParameters<typeof HttpClient>[1] = {}
) {
  return new HttpClient(new HttpEnvironment(baseUrl), {
    fetch: handler as unknown as typeof fetch,
    ...options,
  });
}

function jsonResponse(body: unknown, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function jsonRequest(path: string, verb: 'GET' | 'POST' = 'GET') {
  return {
    path,
    verb,
    body: verb === 'POST' ? {} : null,
    headers: {},
  };
}

describe('HttpClient', () => {
  it('resolves paths against the environment base url', async () => {
    const handler = vi.fn<FetchHandler>(async () => jsonResponse({ ok: true }));
    const client = createClient(handler);

    await client.execute(jsonRequest('/v1/payments'));

    expect(handler).toHaveBeenCalledWith(
      `${baseUrl}/v1/payments`,
      expect.anything()
    );
  });

  it('drops a trailing question mark from paths without query params', async () => {
    const handler = vi.fn<FetchHandler>(async () => jsonResponse({}));
    const client = createClient(handler);

    await client.execute(jsonRequest('/v1/orders?'));

    expect(handler.mock.calls[0]?.[0]).toBe(`${baseUrl}/v1/orders`);
  });

  it('omits undefined header values instead of sending them', async () => {
    const handler = vi.fn<FetchHandler>(async () => jsonResponse({}));
    const client = createClient(handler);

    await client.execute({
      path: '/v1/orders',
      verb: 'GET',
      body: null,
      headers: { Authorization: undefined, 'Content-Type': 'application/json' },
    });

    const headers = handler.mock.calls[0]?.[1].headers as Record<
      string,
      string
    >;

    expect(headers).not.toHaveProperty('Authorization');
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('never forwards accept-encoding so undici can decode gzip/br', async () => {
    const handler = vi.fn<FetchHandler>(async () => jsonResponse({}));
    const client = createClient(handler);

    await client.execute({
      path: '/v1/orders',
      verb: 'GET',
      body: null,
      headers: { 'Accept-Encoding': 'gzip' },
    });

    const init = handler.mock.calls[0]?.[1];

    expect(init?.headers).not.toHaveProperty('Accept-Encoding');
    expect(init?.headers).not.toHaveProperty('accept-encoding');
  });

  it('sends the user agent set by the client', async () => {
    class CustomClient extends HttpClient {
      getUserAgent() {
        return 'custom-agent/1.0';
      }
    }

    const handler = vi.fn<FetchHandler>(async () => jsonResponse({}));
    const client = new CustomClient(new HttpEnvironment(baseUrl), {
      fetch: handler as unknown as typeof fetch,
    });

    await client.execute(jsonRequest('/v1/orders'));

    const headers = handler.mock.calls[0]?.[1].headers as Record<
      string,
      string
    >;

    expect(headers['User-Agent']).toBe('custom-agent/1.0');
  });

  it('parses JSON responses', async () => {
    const client = createClient(async () => jsonResponse({ id: 'ORDER-1' }));

    const response = await client.execute<{ id: string }>(
      jsonRequest('/v1/orders/1')
    );

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual({ id: 'ORDER-1' });
  });

  it('returns undefined for 204 no-content responses', async () => {
    const client = createClient(
      async () => new Response(null, { status: 204 })
    );

    const response = await client.execute({
      path: '/v1/orders/1',
      verb: 'DELETE',
      body: null,
      headers: {},
    });

    expect(response.statusCode).toBe(204);
    expect(response.result).toBeUndefined();
  });

  it('rejects with a typed PayPalHttpError carrying status, body and debug id', async () => {
    const client = createClient(async () =>
      jsonResponse(
        { name: 'INVALID_REQUEST', message: 'Request is not well-formed' },
        400,
        { 'paypal-debug-id': 'debug-123' }
      )
    );

    const error = await client
      .execute(jsonRequest('/v1/orders', 'POST'))
      .catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(PayPalHttpError);
    expect(error).toMatchObject({
      statusCode: 400,
      debugId: 'debug-123',
      errorName: 'INVALID_REQUEST',
      errorMessage: 'Request is not well-formed',
    });
  });

  it('times out using AbortSignal.timeout', async () => {
    const client = createClient(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener('abort', () =>
            reject(init.signal?.reason)
          );
        }),
      { timeout: 10 }
    );

    await expect(client.execute(jsonRequest('/v1/orders'))).rejects.toThrow(
      /timed out after 10ms/
    );
  });

  it('retries retryable GET responses and eventually succeeds', async () => {
    let calls = 0;
    const client = createClient(
      async () => {
        calls += 1;
        return calls === 1
          ? jsonResponse({ message: 'unavailable' }, 503)
          : jsonResponse({ id: 'ORDER-1' });
      },
      { retry: { maxNumberOfRetries: 2, retryInterval: 1 } }
    );

    const response = await client.execute<{ id: string }>(
      jsonRequest('/v1/orders/1')
    );

    expect(calls).toBe(2);
    expect(response.result).toEqual({ id: 'ORDER-1' });
  });

  it('never retries POST requests so payments are not duplicated', async () => {
    let calls = 0;
    const client = createClient(
      async () => {
        calls += 1;
        return jsonResponse({ message: 'unavailable' }, 503);
      },
      { retry: { maxNumberOfRetries: 3, retryInterval: 1 } }
    );

    await expect(
      client.execute(jsonRequest('/v1/orders', 'POST'))
    ).rejects.toBeInstanceOf(PayPalHttpError);

    expect(calls).toBe(1);
  });

  it('runs injectors in registration order before sending', async () => {
    const order: string[] = [];
    const handler: FetchHandler = async (url, init) => {
      order.push(String((init.headers as Record<string, string>)['X-Token']));
      expect(url).toBe(`${baseUrl}/v1/orders`);
      return jsonResponse({});
    };

    const client = createClient(handler);

    client.addInjector(() => {
      order.push('first');
    });
    client.addInjector((request) => {
      request.headers['X-Token'] = 'token-1';
      order.push('second');
    });

    await client.execute(jsonRequest('/v1/orders'));

    expect(order).toEqual(['first', 'second', 'token-1']);
  });

  it('rejects a non-function injector', () => {
    const client = createClient(async () => jsonResponse({}));

    expect(() =>
      client.addInjector(undefined as unknown as () => void)
    ).toThrow(/injector must be a function/);
  });
});
