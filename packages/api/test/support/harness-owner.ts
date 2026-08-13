import { Browser, discoverChromeExecutable } from "../../src/index.js";
import {
  acquireHarnessLock,
  assertHeadfulAuthorized,
  pathExists,
  processExists,
  type HarnessMetadata,
} from "./persistent-harness.js";

export class PersistentHarnessOwner {
  readonly #browser: Browser;
  readonly #releaseLock: () => Promise<void>;
  public readonly metadata: HarnessMetadata;

  private constructor(browser: Browser, releaseLock: () => Promise<void>, metadata: HarnessMetadata) {
    this.#browser = browser;
    this.#releaseLock = releaseLock;
    this.metadata = metadata;
  }

  public static async start(headless: boolean, lockPath?: string, environment: NodeJS.ProcessEnv = process.env): Promise<PersistentHarnessOwner> {
    assertHeadfulAuthorized(headless, environment);
    const releaseLock = await acquireHarnessLock(lockPath);
    try {
      const browser = await Browser.start({
        executable: await discoverChromeExecutable(),
        headless,
        connectionTimeoutMs: 30_000,
      });
      const processMetadata = browser.process;
      if (processMetadata?.pid === undefined) throw new Error("Persistent Chromium did not expose owned process metadata");
      return new PersistentHarnessOwner(browser, releaseLock, {
        ...browser.endpoint,
        pid: processMetadata.pid,
        profile: processMetadata.profile,
      });
    } catch (error) {
      await releaseLock();
      throw error;
    }
  }

  public async close(): Promise<void> {
    let cleanupError: unknown;
    try {
      await this.#browser.close();
    } catch (error) {
      cleanupError = error;
    } finally {
      await this.#releaseLock();
    }
    if (processExists(this.metadata.pid)) throw new Error(`Owned Chromium PID ${this.metadata.pid} is still running after cleanup`, { cause: cleanupError });
    if (await pathExists(this.metadata.profile)) throw new Error(`Owned Chromium profile ${this.metadata.profile} still exists after cleanup`, { cause: cleanupError });
    if (cleanupError !== undefined) throw cleanupError;
  }

  public async reset(): Promise<void> {
    await this.#browser.updateTargets();
    const [kept, ...extra] = this.#browser.tabs;
    await Promise.all(extra.map(async (tab) => this.#browser.closeTab(tab)));
    if (kept === undefined) await this.#browser.get("about:blank");
    else await kept.get("about:blank");
  }
}
