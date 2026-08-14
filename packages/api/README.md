# Guanine

`guanine` is a strict TypeScript object API over the repository's raw Chrome DevTools Protocol runtime. It has no browser-driver subprocess and supports direct page WebSockets and flattened browser sessions. The `jsdriver` compatibility package re-exports this API.

```ts
import { Browser, KeyEvents, KeyModifiers, SpecialKeys } from "guanine";

const browser = await Browser.start({ connectionMode: "flattened" });
try {
  const tab = await browser.get("http://127.0.0.1:3000");
  const input = await tab.select("input[name=query]");
  await input.sendKeys("typed 👋");
  await input.sendKeys([SpecialKeys.ArrowLeft, SpecialKeys.Backspace]);
  await input.sendKeys(KeyEvents.chord(KeyModifiers.Control, "a"));
  await (await tab.find("Submit", true)).click();
  await tab.saveScreenshot("result.png", { format: "png" });
} finally {
  await browser.close();
}
```

## Object API

- `Tab` forwards fully typed `send`, raw `sendRaw`, and typed `on` calls to its target session.
- Navigation includes `get`, `reload`, `back`, `forward`, `activate`, and `bringToFront`.
- DOM access includes iframe-aware CSS queries (`includeFrames` covers same-origin documents and cross-origin OOPIF targets), polling selectors, text best-match, XPath, generic `evaluate`, and page content.
- `WaitOptions` consistently accepts `timeoutMs`, `intervalMs`, and `AbortSignal` for polling operations.
- Storage, user-agent override, page screenshot, PDF, MHTML snapshot, scrolling, window state, and mouse input are available directly on `Tab`.
- `Browser.cookies` is a typed `CookieJar` with `getAll`, `setAll`, `clear`, and JSON `save`/`load` methods.
- Network expectations expose `ready`, `value`, `cancel`, and `reset`: create the expectation, await `ready`, perform the action, then await `value`. `reset()` returns a fresh ready object with the same configuration. Response results include the completed body plus `json()` and `bytes()` helpers.
- `tab.intercept()` returns an explicit `FetchInterception`. Await `ready`, consume paused requests with `next()`, then call `continueRequest`, `continueResponse`, `failRequest`, or `fulfillRequest`. Always close it (or use `await using`) so paused requests are continued and Fetch is disabled.
- Downloads require an explicit absolute directory or destination. Use `setDownloadPath` plus `expectDownload`, or the single-step `downloadFile(url, absoluteDestination)` helper.
- `Element` identity is its stable CDP `backendNodeId`; `refresh` updates the cached frontend `nodeId` and runtime `objectId` after DOM changes.
- Elements expose DOM data, scoped queries, JavaScript `apply`, DOM and physical mouse clicks, focus, scrolling, text/input, Unicode grapheme typing, file upload, option selection, dragging, screenshot, and DOM removal.

`click()` is a DOM click and aliases `domClick()`. Use `mouseClick()` when pointer events and physical coordinates matter.

```ts
const response = tab.expectResponse("/api/data");
await response.ready;
await tab.evaluate("fetch('/api/data')");
console.log((await response.value).json());

await using interception = tab.intercept({ url: "/api/mock", stage: "Request" });
await interception.ready;
const action = tab.evaluate("fetch('/api/mock').then(r => r.text())");
await (await interception.next()).fulfillRequest(200, {
  body: Buffer.from("mocked").toString("base64"),
});
console.log(await action);
```

## Local conformance

From the workspace root, `npm test --workspace=guanine` launches local Chrome against an HTTP fixture and runs the primary DOM, input, storage, history, window, and capture journey in both connection modes.

`npm run conformance:network` runs Cookie persistence, request/response body expectations, streaming, Fetch fulfill/rewrite/fail, and explicit-path download journeys in direct and flattened modes.

Browser suites must run through the package scripts. The persistent runner owns one Chromium for the whole phase and serializes child leases across JavaScript/native and direct/flattened cases. Tests that must own or restart Chromium run afterward through the exclusive runner. Run headless parity with `npm run test:parity:headless --workspace=guanine` (`test:parity` is an alias). Headful parity is a separate, per-run authorized command: `NODRIVER_ALLOW_HEADFUL=1 npm run test:parity:headful --workspace=guanine`.
