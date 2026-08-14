import asyncio
import importlib.metadata
import json
from pathlib import Path
import sys

import zendriver as zd


async def observe(page):
    for _ in range(100):
        ready = await page.evaluate(
            "window.__reactControlledInputFixture?.ready === true"
        )
        if ready:
            break
        await asyncio.sleep(0.05)
    else:
        raise RuntimeError("React controlled-input fixture did not become ready")
    await asyncio.sleep(0.1)
    return await page.evaluate("window.observeControlledInput()")


async def main() -> None:
    version = importlib.metadata.version("zendriver")
    if version != "0.15.5":
        raise RuntimeError(f"Expected Zendriver 0.15.5, found {version}")
    browser = await zd.start(
        headless=True,
        browser_executable_path=sys.argv[2],
    )
    profile = Path(browser.config.user_data_dir)
    observations = {}
    try:
        for operation in ("clearInput", "clearInputByDeleting", "controlledFill"):
            page = await browser.get(f"{sys.argv[1]}?operation={operation}")
            await observe(page)
            field = await page.select("#amount")
            if operation == "clearInput":
                await field.clear_input()
            elif operation == "clearInputByDeleting":
                await field.clear_input_by_deleting()
            else:
                await field.send_keys("25")
            observations[operation] = await observe(page)
    finally:
        await browser.stop()
    print(json.dumps({
        "runtime": "zendriver",
        "version": version,
        "headless": True,
        "observations": observations,
        "cleanup": {
            "stopped": browser.stopped,
            "profileRemoved": not profile.exists(),
        },
    }, sort_keys=True))


asyncio.run(main())
