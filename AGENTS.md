# Repository Instructions

- Keep source code, comments, documentation, API names, and errors in English.
- Follow the active contract in `roadmaps/nodriver-complete-reimplementation.md`.
- Implement the smallest mechanism that makes the current assertion pass.
- Do not inspect or translate Zendriver source. Use its public documentation and black-box behavior only.
- The Node runtime must not add production npm dependencies without a contract change.
- Use strict TypeScript and preserve complete public typing.
- Do not use Playwright, Puppeteer, Selenium, ChromeDriver, chrome-remote-interface, or a driver subprocess.
- Use `rtk` for shell commands and `apply_patch` for hand-written file edits.

## Browser Test Isolation

- Never run more than one nodriver-managed Chromium instance at a time across the entire repository, including parallel agents and backend/mode matrices.
- Reuse one Chromium instance when a test can exercise multiple runtimes or connection modes against it; otherwise run browser cases strictly serially.
- Browser tests must use headless mode by default. A headful run requires an explicit user request for that specific run.
- Tests and implementation code must never activate a browser window, bring it to the front, request application focus, or otherwise steal desktop focus. Do not call `Browser.activate`, `Page.bringToFront`, window-focus helpers, or OS-level focus commands from tests.
- If a behavior cannot be verified without stealing focus, stop and report that limitation instead of running the test.
- Before starting a browser test, check that no nodriver-managed Chromium process is already running. After the test, verify that its process and temporary profile are gone.
