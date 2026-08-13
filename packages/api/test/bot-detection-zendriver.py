import asyncio
import importlib.metadata
import json
import sys

import zendriver as zd


URL = "https://www.browserscan.net/bot-detection"
OBSERVATION = r"""
(() => {
  const label = [...document.querySelectorAll("body *")]
    .find((element) => element.children.length === 0
      && element.textContent?.trim().replace(/:$/, "") === "Test Results");
  const lines = label?.parentElement?.innerText
    ?.split("\n").map((line) => line.trim()).filter(Boolean) ?? [];
  return {
    label: label?.textContent?.trim() ?? null,
    result: lines[1] ?? null,
    userAgent: navigator.userAgent,
    webdriver: navigator.webdriver,
  };
})()
"""


async def main() -> None:
    version = importlib.metadata.version("zendriver")
    if version != "0.15.5":
        raise RuntimeError(f"Expected Zendriver 0.15.5, found {version}")
    browser = await zd.start(
        headless=sys.argv[1] == "true",
        browser_executable_path=sys.argv[2],
    )
    try:
        page = await browser.get(URL)
        observation = None
        for _ in range(60):
            observation = await page.evaluate(OBSERVATION)
            if observation["result"] in ("Normal", "Robot"):
                break
            await asyncio.sleep(0.5)
        print(json.dumps({"runtime": "zendriver", "version": version, **observation}))
    finally:
        await browser.stop()


asyncio.run(main())
