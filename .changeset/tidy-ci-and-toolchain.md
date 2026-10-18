---
'@hyperse/paypal-node-sdk': patch
---

Modernize the TypeScript/CI toolchain and fix the examples:

- Build with TypeScript 6 by dropping the deprecated `baseUrl` from `tsconfig.build.json` (`error TS5101`)
- Pin `typescript` to `6.x` and add the missing `vite` peer required by `msw`/`vitest`
- Fix `samples` so it type-checks: use relative imports for `Common/payPalClient.js` instead of the unresolvable `samples/...` / `tests/...` paths, and return explicitly from `catch` blocks
- Align CI with the other hyperse repos: trigger on `src/**`, `tests/**`, `samples/**` and `tsconfig*.json`, run on Node `lts/*`, and build before running tests
- Release workflow: bump to `actions/checkout@v4` / `actions/setup-node@v4`, drop the duplicated test run, and pass `YARN_NPM_AUTH_TOKEN` so Yarn Berry can authenticate against npm
