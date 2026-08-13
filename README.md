# nodriver

`nodriver` is a clean-room Node.js/TypeScript browser automation runtime built directly on the Chrome DevTools Protocol (CDP). It provides strict protocol typing, browser/tab/element APIs, network interception, and interchangeable JavaScript and Rust/N-API transports without a driver subprocess.

The repository targets Node.js 22 or newer and a locally installed Chrome or Chromium. It does not download a browser.

## Install and build

```sh
npm install
npm run generate
npm run build
```

The full build compiles the Rust native addon with Cargo. Use `npm run build --workspace=@nodriver/api` when only the TypeScript API is needed.

## Quick start

```ts
import { Browser } from "@nodriver/api";

const browser = await Browser.start({
  connectionMode: "direct",
  domainPolicy: "reference-counted",
});

try {
  const tab = await browser.get("https://example.com");
  console.log(await tab.evaluate<string>("document.title"));
  await (await tab.select("a")).mouseClick();
} finally {
  await browser.close();
}
```

Pass `backend: NativeConnection` from `@nodriver/runtime-native` to use the native transport. `Browser.start()` exposes the selected executable, complete argument list, debugging endpoint, profile, and process metadata through `browser.process`.

By default, `Browser.start()` passes `--remote-debugging-address`, an allocated `--remote-debugging-port`, a temporary `--user-data-dir`, `--no-first-run`, `--no-default-browser-check`, `--headless=new`, and the initial URL `about:blank`. Setting `headless: false` omits the headless flag; `args` appends explicit caller-provided Chrome arguments.

## Architecture

- `@nodriver/protocol` contains generated strict TypeScript CDP types.
- `@nodriver/runtime-js` provides the Node WebSocket CDP transport.
- `@nodriver/runtime-native` provides the Rust/N-API CDP transport behind the same `RuntimeBackend` interface.
- `@nodriver/api` provides Browser, Tab, Element, input, cookies, downloads, network expectations/interception, provider primitives, and trace normalization.
- `crates/protocol`, `crates/cdp-core`, and `crates/node-binding` implement the generated Rust protocol, native runtime, and N-API binding.

### Connection and domain modes

`direct` opens a dedicated page WebSocket for each tab. `flattened` uses Chrome's flattened target sessions over the browser WebSocket. Both modes expose the same typed Tab API.

The domain policy controls CDP domain lifetime:

- `manual`: an API enables a domain when needed and leaves it enabled.
- `zendriver-compatible`: the first consumer enables a domain and it remains enabled.
- `reference-counted`: the domain is disabled after its last active consumer releases it.

## Feature matrix

| Capability | JavaScript backend | Native backend |
| --- | --- | --- |
| Typed and raw CDP commands/events | Yes | Yes |
| Direct and flattened target routing | Yes | Yes |
| Browser, Tab, Element, and input APIs | Yes | Yes |
| Cookies, storage, network capture/interception, downloads | Yes | Yes |
| Screenshots, PDF, snapshot, upload | Yes | Yes |
| Abort, timeout, protocol, close, and connection-loss errors | Yes | Yes |
| Normalized command/event trace | Yes | Yes |

Provider compatibility helpers are site-parameterized: `extractRuntimeValue`, `captureNetworkBootstrap`, `waitForSessionMaterial`, and `runProviderPage`. They contain no site secrets or private endpoints. `CdpTraceRecorder` normalizes volatile command IDs, timestamps, target IDs, and session values before differential comparison.

## Dependencies

The Node production runtime has one external npm dependency, `ws`; the other production entries are internal workspace packages. The comparison target, Zendriver 0.15.5, declares six runtime dependencies. No Playwright, Puppeteer, Selenium, ChromeDriver, `chrome-remote-interface`, or Node driver subprocess is used.

## Verification scripts

| Command | Purpose |
| --- | --- |
| `npm run generate` | Regenerate TypeScript and Rust protocol bindings from the pinned schemas. |
| `npm run typecheck` | Type-check the strict TypeScript workspace. |
| `npm test` | Run all deterministic tests and local browser conformance journeys. |
| `npm run conformance:dom` | Run DOM/input/capture conformance. |
| `npm run conformance:network` | Run cookies/network/interception/download conformance. |
| `npm run smoke:m2` | Launch Chrome with the JavaScript backend. |
| `npm run smoke:native` | Build the addon and launch Chrome with the native backend. |
| `npm run differential` | Run one provider-shaped fixture through JS/native, compare normalized outcome and outbound trace, and run Zendriver 0.15.5 outcome-only when available. |

For the optional Zendriver run, install exactly version `0.15.5` in `.tmp/zendriver-ref` (or `.tmp/zendriver-0.15.5`), or set `ZENDRIVER_PYTHON` to its Python executable. Zendriver does not expose this runtime's backend-neutral trace, so the report labels its trace `unavailable` and compares its observable outcome only.

## Clean-room and licenses

All original code in this repository is MIT licensed. The pinned official Chrome DevTools Protocol schemas in `packages/protocol-schema` retain their BSD-3-Clause license and provenance. Zendriver code, tests, and comments are not included, copied, translated, or inspected; Zendriver is used only as an optional black-box reference through its public API and documentation.
