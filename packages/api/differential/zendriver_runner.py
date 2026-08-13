import asyncio
import importlib.metadata
import json
import sys

import zendriver as zd


async def main() -> None:
    if importlib.metadata.version("zendriver") != "0.15.5":
        raise RuntimeError("Differential runner requires Zendriver 0.15.5")
    browser = await zd.start(headless=True)
    try:
        page = await browser.get(sys.argv[1])
        token = await page.evaluate("qwenRuntimeToken")
        action = await page.evaluate("bootstrapProvider()", await_promise=True)
        cookies = await browser.cookies.get_all()
        local_storage = await page.evaluate("Object.fromEntries(Object.entries(localStorage))")
        print(json.dumps({
            "qwenRuntimeToken": token,
            "lmArenaRequestHeader": action["body"]["lmArenaAuth"],
            "lmArenaLocalStorage": local_storage["lmArenaAuth"],
            "openaiCapture": action["body"]["openaiCapture"],
            "geminiSessionCookie": next(cookie.value for cookie in cookies if cookie.name == "geminiSession"),
            "grokBootstrapHeader": action["responseHeader"],
            "grokBootstrapBody": action["body"]["grokBootstrap"],
        }))
    finally:
        await browser.stop()


asyncio.run(main())
