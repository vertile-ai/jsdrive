import asyncio
import importlib.metadata
import json
from pathlib import Path
import sys

import zendriver as zd


async def main() -> None:
    if importlib.metadata.version("zendriver") != "0.15.5":
        raise RuntimeError("Differential runner requires Zendriver 0.15.5")
    profile = Path(sys.argv[3])
    browser = None
    outcome = None
    stopped = False
    try:
        browser = await zd.start(
            headless=True,
            browser_executable_path=sys.argv[2],
            user_data_dir=profile,
        )
        page = await browser.get(sys.argv[1])
        token = await page.evaluate("qwenRuntimeToken")
        action = await page.evaluate("bootstrapProvider()", await_promise=True)
        cookies = await browser.cookies.get_all()
        local_storage = await page.evaluate("Object.fromEntries(Object.entries(localStorage))")
        outcome = {
            "qwenRuntimeToken": token,
            "lmArenaRequestHeader": action["body"]["lmArenaAuth"],
            "lmArenaLocalStorage": local_storage["lmArenaAuth"],
            "openaiCapture": action["body"]["openaiCapture"],
            "geminiSessionCookie": next(cookie.value for cookie in cookies if cookie.name == "geminiSession"),
            "grokBootstrapHeader": action["responseHeader"],
            "grokBootstrapBody": action["body"]["grokBootstrap"],
        }
    finally:
        if browser is not None:
            await browser.stop()
            stopped = browser.stopped

    if not stopped:
        raise RuntimeError("Zendriver did not stop after differential execution")
    print(json.dumps({
        "outcome": outcome,
        "cleanup": {
            "stopped": stopped,
            "profile": str(profile),
        },
    }))


asyncio.run(main())
