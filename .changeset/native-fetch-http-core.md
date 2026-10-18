---
'@hyperse/paypal-node-sdk': minor
---

Replace the abandoned `@paypal/paypalhttp` transport with a self-contained, native `fetch` based HTTP core.

### Background

`@paypal/paypalhttp@1.0.1` was last published in 2021 and `@types/paypal__paypalhttp@1.0.3` in 2023. The runtime package is a 515 line CommonJS module built on `http`/`https`/`url.parse`/`zlib`, and its typings never declared `HttpError`, `HttpClient.addInjector`, or `HttpResponse.result` precisely. This release removes both dependencies.

### Added

- New `@hyperse/paypal-node-sdk/http` entry point exporting:
  - `HttpClient` — native `fetch` transport with injectors, timeouts and optional retries.
  - `HttpEnvironment` — base URL holder.
  - `PayPalHttpError` — typed error with `statusCode`, `headers`, `result`, `body`, `debugId`, `errorName` and `errorMessage`.
  - `HttpRequest` / `HttpResponse` / `HttpInjector` / `RetryConfiguration` types.
- `HttpClientOptions` on `PayPalHttpClient` (`timeout`, `retry`, `fetch`).
- `TokenCache.clearAll()` and a `TokenCache` cache key that is now scoped by `baseUrl` in addition to `clientId`, so sandbox and live credentials sharing one client id no longer share a token.

### Fixed

- **Token cache deadlock**: `fetchAccessToken()` now releases the cache lock in a `finally` block. Previously an error left `isLocked()` stuck at `true`, hanging every later request on `TokenCache.wait()`.
- **Stale `Authorization` on 401 retry**: the dead token is now cleared from both the cache and the request before retrying.
- **`undefined` headers**: header values that are `undefined` are dropped instead of being written to Node, which used to raise `ERR_HTTP_INVALID_HEADER_VALUE`.
- **`expires_in` NaN**: a token response without a numeric `expires_in` is treated as expired rather than immortal.
- **`sdk_version` header drift**: the header now reports the real `package.json` version instead of a hardcoded `1.0.2`.

### Changed

- `fetch` is resolved lazily per request, so test harnesses that patch `globalThis.fetch` after client construction (MSW, nock, instrumentation) keep working.
- Response decompression (`gzip`/`br`) is delegated to `fetch`/undici; `accept-encoding`, `content-length` and `transfer-encoding` are no longer forwarded.
- Requests retry only idempotent methods (`GET`, `HEAD`, `OPTIONS`, `PUT`, `DELETE`) and only when enabled via `timeout`/`retry` options; the default remains zero retries.

### Removed

- `@paypal/paypalhttp` and `@types/paypal__paypalhttp` dependencies.
