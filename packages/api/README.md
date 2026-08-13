# @nodriver/api

`@nodriver/api` is a strict TypeScript object API over the repository's raw Chrome DevTools Protocol runtime. It has no browser-driver subprocess and supports direct page WebSockets and flattened browser sessions.

```ts
import { Browser } from "@nodriver/api";

const browser = await Browser.start({ connectionMode: "flattened" });
try {
  const tab = await browser.get("http://127.0.0.1:3000");
  const input = await tab.select("input[name=query]");
  await input.sendKeys("typed 👋");
  await (await tab.find("Submit", true)).click();
  await tab.saveScreenshot("result.png", { format: "png" });
} finally {
  await browser.close();
}
```

## Object API

- `Tab` forwards fully typed `send`, raw `sendRaw`, and typed `on` calls to its target session.
- Navigation includes `get`, `reload`, `back`, `forward`, `activate`, and `bringToFront`.
- DOM access includes CSS queries, polling selectors, text best-match, XPath, generic `evaluate`, and page content.
- `WaitOptions` consistently accepts `timeoutMs`, `intervalMs`, and `AbortSignal` for polling operations.
- Storage, user-agent override, page screenshot, PDF, MHTML snapshot, scrolling, window state, and mouse input are available directly on `Tab`.
- `Browser.cookies` is a typed `CookieJar` with `getAll`, `setAll`, `clear`, and JSON `save`/`load` methods.
- Network expectations expose `ready`, `value`, and `cancel`: create the expectation, await `ready`, perform the action, then await `value`. Response results include the completed body plus `json()` and `bytes()` helpers.
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

From the workspace root, `npm test --workspace=@nodriver/api` launches local Chrome against an HTTP fixture and runs the primary DOM, input, storage, history, window, and capture journey in both connection modes.

`npm run conformance:network` runs Cookie persistence, request/response body expectations, streaming, Fetch fulfill/rewrite/fail, and explicit-path download journeys in direct and flattened modes.
