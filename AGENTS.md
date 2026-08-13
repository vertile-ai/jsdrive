# Repository Instructions

- Keep source code, comments, documentation, API names, and errors in English.
- Follow the active contract in `roadmaps/nodriver-complete-reimplementation.md`.
- Implement the smallest mechanism that makes the current assertion pass.
- Do not inspect or translate Zendriver source. Use its public documentation and black-box behavior only.
- The Node runtime must not add production npm dependencies without a contract change.
- Use strict TypeScript and preserve complete public typing.
- Do not use Playwright, Puppeteer, Selenium, ChromeDriver, chrome-remote-interface, or a driver subprocess.
- Use `rtk` for shell commands and `apply_patch` for hand-written file edits.
