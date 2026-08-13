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
- `Element` identity is its stable CDP `backendNodeId`; `refresh` updates the cached frontend `nodeId` and runtime `objectId` after DOM changes.
- Elements expose DOM data, scoped queries, JavaScript `apply`, DOM and physical mouse clicks, focus, scrolling, text/input, Unicode grapheme typing, file upload, option selection, dragging, screenshot, and DOM removal.

`click()` is a DOM click and aliases `domClick()`. Use `mouseClick()` when pointer events and physical coordinates matter.

## Local conformance

From the workspace root, `npm test --workspace=@nodriver/api` launches local Chrome against an HTTP fixture and runs the primary DOM, input, storage, history, window, and capture journey in both connection modes.
