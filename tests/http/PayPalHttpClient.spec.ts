import { describe, expect, it, vi } from 'vitest';
import { AccessToken } from '../../src/core/AccessToken.js';
import { SandboxEnvironment } from '../../src/core/PayPalEnvironment.js';
import { PayPalHttpClient } from '../../src/core/PayPalHttpClient.js';
import { TokenCache } from '../../src/core/TokenCache.js';

const environment = new SandboxEnvironment('client-id', 'client-secret');

function tokenResponse(expiresIn = 3600) {
  return new Response(
    JSON.stringify({
      access_token: 'token-' + Math.random().toString(36).slice(2),
      token_type: 'Bearer',
      expires_in: expiresIn,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}

describe('AccessToken', () => {
  it('treats a token without a usable expires_in as expired', () => {
    const token = new AccessToken({
      access_token: 'abc',
      token_type: 'Bearer',
      expires_in: Number.NaN,
    });

    expect(token.isExpired()).toBe(true);
  });

  it('is valid while inside its lifetime', () => {
    const token = new AccessToken({
      access_token: 'abc',
      token_type: 'Bearer',
      expires_in: 3600,
    });

    expect(token.isExpired()).toBe(false);
    expect(token.authorizationString()).toBe('Bearer abc');
  });
});

describe('PayPalHttpClient', () => {
  it('fetches a token once and reuses it across requests', async () => {
    TokenCache.clearAll();

    const handler = vi.fn(async (url: string) =>
      url.endsWith('/v1/oauth2/token')
        ? tokenResponse()
        : new Response(JSON.stringify({ id: 'ORDER-1' }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
          })
    );

    const client = new PayPalHttpClient(environment, undefined, {
      fetch: handler as unknown as typeof fetch,
    });

    await client.execute({
      path: '/v1/checkout/orders/1',
      verb: 'GET',
      body: null,
      headers: {},
    });
    await client.execute({
      path: '/v1/checkout/orders/2',
      verb: 'GET',
      body: null,
      headers: {},
    });

    const tokenCalls = handler.mock.calls.filter(([url]) =>
      String(url).endsWith('/v1/oauth2/token')
    );

    expect(tokenCalls).toHaveLength(1);
  });

  it('shares a single token between concurrent requests', async () => {
    TokenCache.clearAll();

    let tokenCalls = 0;
    const handler = vi.fn(async (url: string) => {
      if (String(url).endsWith('/v1/oauth2/token')) {
        tokenCalls += 1;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return tokenResponse();
      }
      return new Response(JSON.stringify({ id: 'ORDER' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    const client = new PayPalHttpClient(environment, undefined, {
      fetch: handler as unknown as typeof fetch,
    });

    await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        client.execute({
          path: `/v1/checkout/orders/${index}`,
          verb: 'GET',
          body: null,
          headers: {},
        })
      )
    );

    expect(tokenCalls).toBe(1);
  });

  it('unlocks the cache when the token request fails', async () => {
    TokenCache.clearAll();

    const failingClient = new PayPalHttpClient(environment, undefined, {
      fetch: (async () =>
        new Response(JSON.stringify({ message: 'nope' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        })) as unknown as typeof fetch,
    });

    await expect(
      failingClient.execute({
        path: '/v1/checkout/orders/1',
        verb: 'GET',
        body: null,
        headers: {},
      })
    ).rejects.toThrow(/nope/);

    const cache = TokenCache.cacheForEnvironment(environment);
    expect(cache.isLocked()).toBe(false);
  });

  it('does not leak the stale Authorization header after a 401 retry', async () => {
    TokenCache.clearAll();

    let attempt = 0;
    const authorizations: Array<string | undefined> = [];

    const handler = vi.fn(
      async (url: string, init: RequestInit): Promise<Response> => {
        if (String(url).endsWith('/v1/oauth2/token')) {
          attempt += 1;
          return tokenResponse();
        }

        const headers = init.headers as Record<string, string>;
        authorizations.push(headers.Authorization);

        if (attempt === 1) {
          return new Response(JSON.stringify({ message: 'expired' }), {
            status: 401,
            headers: { 'content-type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ id: 'ORDER-1' }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }
    );

    const client = new PayPalHttpClient(environment, undefined, {
      fetch: handler as unknown as typeof fetch,
    });

    const response = await client.execute<{ id: string }>({
      path: '/v1/checkout/orders/1',
      verb: 'GET',
      body: null,
      headers: {},
    });

    expect(response.result).toEqual({ id: 'ORDER-1' });
    expect(authorizations).toHaveLength(2);
    expect(authorizations[0]).not.toBe(authorizations[1]);
  });

  it('reports the package version and SDK headers', async () => {
    TokenCache.clearAll();

    const handler = vi.fn(async (_url: string, _init: RequestInit) =>
      tokenResponse()
    );

    const client = new PayPalHttpClient(environment, undefined, {
      fetch: handler as unknown as typeof fetch,
    });

    await client.fetchAccessToken();

    const headers = handler.mock.calls[0]?.[1].headers as Record<
      string,
      string
    >;

    expect(headers['sdk_name']).toBe('Checkout SDK');
    expect(headers['sdk_version']).toMatch(/^\d+\.\d+\.\d+/);
    expect(headers['api_integration_type']).toBe('PAYPALSDK');
    expect(headers.Authorization).toMatch(/^Basic /);
  });
});
