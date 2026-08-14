# Guanine

`guanine` is a clean-room Node.js/TypeScript browser automation runtime built directly on the Chrome DevTools Protocol (CDP). The name comes from guanine, the G nucleobase in DNA. The `jsdriver` package is a synchronized compatibility entry point to the same API.

The repository targets Node.js 22 or newer and a locally installed Chrome or Chromium. It does not download a browser.

## Install and build

```sh
npm install guanine
# or install the compatibility package
npm install jsdriver
```

For workspace development:

```sh
npm install
npm run generate
npm run build
```

The full build compiles the Rust native addon with Cargo. Use `npm run build --workspace=guanine` when only the TypeScript API is needed.

## Quick start

```ts
import { Browser, Config, KeyEvents, KeyModifiers, SpecialKeys } from "guanine";

const config = new Config({
  connectionMode: "direct",
  domainPolicy: "reference-counted",
});
config.addArgument("--window-size=1200,800");
const browser = await Browser.start(config);

try {
  // get() reuses the initial page; newTab()/newWindow() create targets.
  const tab = await browser.get("https://example.com");
  console.log(await tab.evaluate<string>("document.title"));
  await (await tab.select("a")).mouseClick();
  await (await tab.select("input")).sendKeys(["hello", SpecialKeys.Enter]);
  await (await tab.select("input")).sendKeys(KeyEvents.chord(KeyModifiers.Control, "a"));
} finally {
  await browser.close();
}
```

When using the compatibility package, change the import source to `jsdriver`;
the exported runtime and types are the same.

Pass `backend: NativeConnection` from `@vertile-ai/jsdriver-runtime-native` to use the native transport. `Browser.start()` exposes the selected executable, complete argument list, debugging endpoint, profile, and process metadata through `browser.process`.

By default, `Browser.start()` passes `--remote-debugging-address`, an allocated `--remote-debugging-port`, a temporary `--user-data-dir`, `--no-first-run`, `--no-default-browser-check`, `--headless=new`, and the initial URL `about:blank`. Other launch flags are opt-in through `Config`; extensions use Chrome's `--load-extension` flag.

## Architecture

- `@vertile-ai/jsdriver-protocol` contains generated strict TypeScript CDP types.
- `@vertile-ai/jsdriver-runtime-js` provides the Node WebSocket CDP transport.
- `@vertile-ai/jsdriver-runtime-native` provides the Rust/N-API CDP transport behind the same `RuntimeBackend` interface.
- `guanine` provides Browser, Tab, Element, input, cookies, downloads, network expectations/interception, provider primitives, and trace normalization.
- `jsdriver` re-exports `guanine` as a compatibility package with the same version.
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

The high-level native row is exercised with both direct and flattened routing across DOM selection/input, cookies, network expectations, Fetch interception, and downloads. `querySelectorAll(selector, { includeFrames: true })` and `selectAll` traverse same-origin nested documents and cross-origin OOPIF targets.

`Expectation.reset()` and `FetchInterception.reset()` cancel the current lifecycle and return a fresh, already-ready object with the same matcher/options. JavaScript callers should assign the returned object; the settled Promise fields themselves are immutable.

`Element.recordVideo(directory)` intentionally returns a typed screencast session that writes an ordered JPEG frame sequence and exposes `stop()`. The package does not bundle a video encoder. Inspector helpers return a DevTools URL instead of launching an OS process. `verifyCf(selector)` is an explicit selector wait-and-click helper and makes no CAPTCHA-bypass claim. `tileWindows()` uses CDP bounds and explicit virtual screen dimensions; it does not enumerate native monitors.

## Packages

The publishable packages are `guanine`, `jsdriver`, `@vertile-ai/jsdriver-protocol`, `@vertile-ai/jsdriver-runtime-js`, and `@vertile-ai/jsdriver-runtime-native`, versioned together. The native package contains the addon for the platform on which it was packed; consumers that need another platform build it from this workspace.

Provider compatibility helpers are site-parameterized: `extractRuntimeValue`, `captureNetworkBootstrap`, `waitForSessionMaterial`, and `runProviderPage`. They contain no site secrets or private endpoints. `CdpTraceRecorder` normalizes volatile command IDs, timestamps, target IDs, and session values before differential comparison.

## Dependencies

The Node production runtime has one external npm dependency, `ws`; the other production entries are internal workspace packages. The comparison target, Zendriver 0.15.5, declares six runtime dependencies. No Playwright, Puppeteer, Selenium, ChromeDriver, `chrome-remote-interface`, or Node driver subprocess is used.

## Verification scripts

| Command | Purpose |
| --- | --- |
| `npm run generate` | Regenerate TypeScript and Rust protocol bindings from the pinned schemas. |
| `npm run typecheck` | Type-check the strict TypeScript workspace. |
| `npm test` | Run deterministic tests and single-instance headless browser conformance journeys. |
| `npm run test:parity:headless --workspace=guanine` | Run headless parity with one persistent Chromium, followed by exclusive lifecycle and live-site cases. `test:parity` is an alias. |
| `NODRIVER_ALLOW_HEADFUL=1 npm run test:parity:headful --workspace=guanine` | Run the separately authorized headful phase. Only use this after explicit approval for that run. |
| `npm run conformance:dom` | Run DOM/input/capture conformance. |
| `npm run conformance:network` | Run cookies/network/interception/download conformance. |
| `npm run smoke:m2` | Launch Chrome with the JavaScript backend. |
| `npm run smoke:native` | Build the addon and launch Chrome with the native backend. |
| `npm run differential` | Run one provider-shaped fixture through JS/native, compare normalized outcome and outbound trace, and run Zendriver 0.15.5 outcome-only when available. |

For the optional Zendriver run, install exactly version `0.15.5` in `.tmp/zendriver-ref` (or `.tmp/zendriver-0.15.5`), or set `ZENDRIVER_PYTHON` to its Python executable. Zendriver does not expose this runtime's backend-neutral trace, so the report labels its trace `unavailable` and compares its observable outcome only.

The package test scripts own the browser lifecycle. Persistent phases start one parent-owned Chromium and give serial child tests endpoint leases; lifecycle and Zendriver comparison cases run only after that owner exits under the same exclusive lock. Run browser suites through these scripts rather than invoking compiled browser test files directly.

## Clean-room and licenses

All original code in this repository is MIT licensed. The pinned official Chrome DevTools Protocol schemas in `packages/protocol-schema` retain their BSD-3-Clause license and provenance. Zendriver code, tests, and comments are not included, copied, translated, or inspected; Zendriver is used only as an optional black-box reference through its public API and documentation.
