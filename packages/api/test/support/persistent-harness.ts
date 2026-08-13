import { randomUUID } from "node:crypto";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Browser, Config, type BrowserEndpoint, type ConnectOptions, type LaunchOptions } from "../../src/index.js";

export const HARNESS_ENDPOINT_ENV = "NODRIVER_PERSISTENT_ENDPOINT";
export const HARNESS_METADATA_ENV = "NODRIVER_PERSISTENT_METADATA";
export const HEADFUL_REQUEST_ENV = "NODRIVER_HARNESS_HEADFUL";
export const HEADFUL_AUTHORIZATION_ENV = "NODRIVER_ALLOW_HEADFUL";
export const HARNESS_PHASE_ENV = "NODRIVER_HARNESS_PHASE";
export type HarnessPhase = "headless" | "headful";

export interface HarnessMetadata extends BrowserEndpoint {
  readonly pid: number;
  readonly profile: string;
}

export function persistentEndpoint(environment: NodeJS.ProcessEnv = process.env): BrowserEndpoint {
  const value = environment[HARNESS_ENDPOINT_ENV];
  if (value === undefined) throw new Error("Persistent Chromium endpoint is unavailable; run this test through the persistent harness");
  const parsed = JSON.parse(value) as Partial<BrowserEndpoint>;
  if (typeof parsed.host !== "string" || typeof parsed.port !== "number") throw new Error("Persistent Chromium endpoint is invalid");
  return { host: parsed.host, port: parsed.port };
}

export function persistentMetadata(environment: NodeJS.ProcessEnv = process.env): HarnessMetadata {
  const value = environment[HARNESS_METADATA_ENV];
  if (value === undefined) throw new Error("Persistent Chromium metadata is unavailable");
  const parsed = JSON.parse(value) as Partial<HarnessMetadata>;
  if (typeof parsed.host !== "string" || typeof parsed.port !== "number" || typeof parsed.pid !== "number" || typeof parsed.profile !== "string") {
    throw new Error("Persistent Chromium metadata is invalid");
  }
  return { host: parsed.host, port: parsed.port, pid: parsed.pid, profile: parsed.profile };
}

export function assertHeadfulAuthorized(headless: boolean, environment: NodeJS.ProcessEnv = process.env): void {
  if (!headless && (environment[HEADFUL_REQUEST_ENV] !== "1" || environment[HEADFUL_AUTHORIZATION_ENV] !== "1")) {
    throw new Error(`Headful Chromium requires both an explicit --headful request and ${HEADFUL_AUTHORIZATION_ENV}=1`);
  }
}

export function browserCaseSkipReason(headless: boolean, environment: NodeJS.ProcessEnv = process.env): string | false {
  const phase = environment[HARNESS_PHASE_ENV];
  if (phase === "headless") return headless ? false : "Headful case is excluded from the headless harness phase";
  if (phase === "headful") return headless ? "Headless case is excluded from the headful harness phase" : false;
  if (!headless) return `Headful case requires the headful harness runner and ${HEADFUL_AUTHORIZATION_ENV}=1`;
  return false;
}

export function connectOptionsForLease(options: LaunchOptions | Config = {}, environment: NodeJS.ProcessEnv = process.env): ConnectOptions {
  const config = options instanceof Config ? options : new Config(options);
  assertHeadfulAuthorized(config.headless, environment);
  const phase = environment[HARNESS_PHASE_ENV];
  if (phase !== undefined && config.headless !== (phase === "headless")) {
    throw new Error(`A ${config.headless ? "headless" : "headful"} lease cannot run in the ${phase} harness phase`);
  }
  return {
    ...persistentEndpoint(environment),
    connectionMode: config.connectionMode,
    domainPolicy: config.domainPolicy,
    timeoutMs: config.connectionTimeoutMs,
    ...(config.backend === undefined ? {} : { backend: config.backend }),
  };
}

let leaseTail = Promise.resolve();

export async function acquireHarnessLease<T>(open: () => Promise<T>): Promise<{ readonly value: T; release(): void }> {
  const predecessor = leaseTail;
  let unlock: () => void = () => {};
  leaseTail = new Promise<void>((resolve) => { unlock = resolve; });
  await predecessor;
  try {
    const value = await open();
    let released = false;
    return {
      value,
      release: () => {
        if (released) return;
        released = true;
        unlock();
      },
    };
  } catch (error) {
    unlock();
    throw error;
  }
}

export async function acquirePersistentBrowser(
  options: LaunchOptions | Config = {},
  connect: (options: ConnectOptions) => Promise<Browser> = Browser.connect,
): Promise<Browser> {
  const lease = await acquireHarnessLease(async () => connect(connectOptionsForLease(options)));
  const browser = lease.value;
  const closeConnection = browser.close.bind(browser);
  let closePromise: Promise<void> | undefined;
  const closeLease = (): Promise<void> => {
    closePromise ??= (async () => {
      let resetError: unknown;
      try {
        await resetLease(browser);
      } catch (error) {
        resetError = error;
      }
      try {
        await closeConnection();
      } finally {
        lease.release();
      }
      if (resetError !== undefined) throw resetError;
    })();
    return closePromise;
  };
  Object.defineProperty(browser, "close", { configurable: true, value: closeLease });
  return browser;
}

export async function withPersistentBrowser<T>(
  options: LaunchOptions,
  action: (browser: Browser) => Promise<T>,
): Promise<T> {
  const browser = await acquirePersistentBrowser(options);
  try {
    return await action(browser);
  } finally {
    await browser.close();
  }
}

export async function acquireHarnessLock(lockPath = join(tmpdir(), "nodriver-persistent-harness.lock")): Promise<() => Promise<void>> {
  const token = randomUUID();
  const tokenPath = join(lockPath, "owner");
  try {
    await mkdir(lockPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") throw new Error(`A persistent Chromium harness already owns ${lockPath}`);
    throw error;
  }
  try {
    await writeFile(tokenPath, token, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    await rm(lockPath, { recursive: true, force: true });
    throw error;
  }
  return async () => {
    const currentToken = await readFile(tokenPath, "utf8");
    if (currentToken !== token) throw new Error(`Persistent harness lock ownership changed for ${lockPath}`);
    await rm(lockPath, { recursive: true, force: true });
  };
}

async function resetLease(browser: Browser): Promise<void> {
  await browser.updateTargets();
  const [kept, ...extra] = browser.tabs;
  for (const tab of extra) await browser.closeTab(tab);
  if (kept === undefined) await browser.get("about:blank");
  else await kept.get("about:blank");
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

export function processExists(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}
