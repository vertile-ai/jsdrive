import { Browser, discoverChromeExecutable, type ConnectionMode } from "@nodriver/api";
import { CdpAbortError } from "@nodriver/runtime-js";
import { NativeConnection } from "./index.js";

const executable = await discoverChromeExecutable();

for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
  const browser = await Browser.start({
    executable,
    connectionMode,
    domainPolicy: "reference-counted",
    backend: NativeConnection,
  });
  try {
    const version = await browser.testConnection();
    const tab = await browser.get("data:text/html,<title>native</title><main id=result>native-ok</main>");
    const releaseRuntime = await tab.acquireDomain("Runtime");
    const eventPromise = new Promise<string>((resolve) => {
      const off = tab.on("Runtime.consoleAPICalled", (event) => {
        off();
        resolve(String(event.args[0]?.value));
      });
    });
    const evaluated = await tab.evaluate<number>("console.log('native-event'); 6 * 7");
    const event = await eventPromise;

    const controller = new AbortController();
    const interrupted = tab.evaluate("new Promise(() => {})", 10_000, controller.signal);
    controller.abort(new Error("native smoke cancellation"));
    let cancelled = false;
    try {
      await interrupted;
    } catch (error) {
      cancelled = error instanceof CdpAbortError;
    }
    const afterCancellation = await tab.evaluate<number>("40 + 2");
    await releaseRuntime();

    console.log(JSON.stringify({
      addon: `nodriver.${process.platform}-${process.arch}.node`,
      browser: version.product,
      connectionMode,
      evaluated,
      event,
      cancelled,
      afterCancellation,
      sessionId: tab.sessionId,
    }));
  } finally {
    await browser.close();
  }
}
