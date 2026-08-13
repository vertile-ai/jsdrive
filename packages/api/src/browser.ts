import { spawn, type ChildProcess } from "node:child_process";
import { access, mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Protocol } from "@nodriver/protocol";
import { CdpConnection, CdpTimeoutError, type DomainPolicy } from "@nodriver/runtime-js";

export type ConnectionMode = "direct" | "flattened";

export interface BrowserEndpoint {
  readonly host: string;
  readonly port: number;
}

export interface BrowserProcessMetadata extends BrowserEndpoint {
  readonly executable: string;
  readonly arguments: readonly string[];
  readonly pid?: number;
  readonly profile: string;
  readonly temporaryProfile: boolean;
}

export interface BrowserVersion {
  readonly Browser: string;
  readonly "Protocol-Version": string;
  readonly "User-Agent": string;
  readonly "V8-Version": string;
  readonly "WebKit-Version": string;
  readonly webSocketDebuggerUrl: string;
}

export interface LaunchOptions {
  readonly executable?: string;
  readonly host?: string;
  readonly port?: number;
  readonly profile?: string;
  readonly headless?: boolean;
  readonly args?: readonly string[];
  readonly connectionMode?: ConnectionMode;
  readonly domainPolicy?: DomainPolicy;
  readonly timeoutMs?: number;
}

export interface ConnectOptions extends BrowserEndpoint {
  readonly connectionMode?: ConnectionMode;
  readonly domainPolicy?: DomainPolicy;
  readonly timeoutMs?: number;
}

export class TargetClosedError extends Error {
  public constructor(public readonly targetId: string) {
    super(`CDP target closed: ${targetId}`);
    this.name = "TargetClosedError";
  }
}

export class TargetCrashedError extends Error {
  public constructor(
    public readonly targetId: string,
    public readonly status: string,
    public readonly errorCode: number,
  ) {
    super(`CDP target crashed: ${targetId} (${status}, ${errorCode})`);
    this.name = "TargetCrashedError";
  }
}

export class Tab {
  #failure: TargetClosedError | TargetCrashedError | undefined;

  public constructor(
    public readonly targetId: string,
    readonly connection: CdpConnection,
    readonly sessionId?: string,
  ) {}

  public get enabledDomains(): ReadonlySet<string> {
    return this.connection.enabledDomains;
  }

  public get closed(): boolean {
    return this.#failure instanceof TargetClosedError;
  }

  public get crashed(): boolean {
    return this.#failure instanceof TargetCrashedError;
  }

  public async navigate(url: string, timeoutMs = 10_000): Promise<Protocol.Page.Commands.NavigateResult> {
    this.#assertAvailable();
    const options = this.#options(timeoutMs);
    const release = this.connection.domainPolicy === "manual"
      ? (await this.connection.enableDomain("Page", options), async () => {})
      : await this.connection.acquireDomain("Page", options);
    const load = this.#waitForLoad(timeoutMs);
    try {
      let result: Protocol.Page.Commands.NavigateResult;
      try {
        result = await this.connection.send("Page.navigate", { url }, options);
      } catch (error) {
        load.cancel();
        await load.promise;
        throw error;
      }
      if (await load.promise !== "loaded") {
        throw new CdpTimeoutError("Page load", timeoutMs);
      }
      return result;
    } finally {
      load.cancel();
      await release();
    }
  }

  public async evaluate<T = unknown>(expression: string, timeoutMs = 10_000): Promise<T> {
    this.#assertAvailable();
    const result = await this.connection.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    }, this.#options(timeoutMs));
    if (result.exceptionDetails !== undefined) {
      throw new Error(result.exceptionDetails.text);
    }
    return result.result.value as T;
  }

  public close(): void {
    if (this.sessionId === undefined) this.connection.close();
  }

  public markClosed(): void {
    this.#failure = new TargetClosedError(this.targetId);
    this.close();
  }

  public markCrashed(status: string, errorCode: number): void {
    this.#failure = new TargetCrashedError(this.targetId, status, errorCode);
  }

  #options(timeoutMs: number): { readonly timeoutMs: number; readonly sessionId?: string } {
    return this.sessionId === undefined ? { timeoutMs } : { timeoutMs, sessionId: this.sessionId };
  }

  #waitForLoad(timeoutMs: number): {
    readonly promise: Promise<"loaded" | "timed-out" | "cancelled">;
    readonly cancel: () => void;
  } {
    let finish: (result: "loaded" | "timed-out" | "cancelled") => void = () => {};
    let settled = false;
    const promise = new Promise<"loaded" | "timed-out" | "cancelled">((resolve) => { finish = resolve; });
    const complete = (result: "loaded" | "timed-out" | "cancelled"): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      off();
      finish(result);
    };
    const off = this.connection.on("Page.loadEventFired", (_params, metadata) => {
        if (metadata.sessionId !== this.sessionId) return;
        complete("loaded");
      });
    const timeout = setTimeout(() => complete("timed-out"), timeoutMs);
    return { promise, cancel: () => complete("cancelled") };
  }

  #assertAvailable(): void {
    if (this.#failure !== undefined) throw this.#failure;
  }
}

export class Browser {
  readonly #connection: CdpConnection;
  readonly #process: ChildProcess | undefined;
  readonly #sessions = new Map<string, string>();
  readonly #sessionWaiters = new Map<string, (sessionId: string) => void>();
  readonly #tabs = new Map<string, Tab>();
  readonly #targets = new Map<string, Protocol.Target.TargetInfo>();
  readonly #timeoutMs: number;
  #closed = false;

  private constructor(
    connection: CdpConnection,
    public readonly endpoint: BrowserEndpoint,
    public readonly version: BrowserVersion,
    public readonly protocol: unknown,
    public readonly connectionMode: ConnectionMode,
    public readonly process: BrowserProcessMetadata | undefined,
    childProcess: ChildProcess | undefined,
    timeoutMs: number,
  ) {
    this.#connection = connection;
    this.#process = childProcess;
    this.#timeoutMs = timeoutMs;
    connection.on("Target.attachedToTarget", (event) => {
      this.#targets.set(event.targetInfo.targetId, event.targetInfo);
      this.#sessions.set(event.targetInfo.targetId, event.sessionId);
      this.#sessionWaiters.get(event.targetInfo.targetId)?.(event.sessionId);
      this.#sessionWaiters.delete(event.targetInfo.targetId);
    });
    connection.on("Target.targetCreated", (event) => { this.#targets.set(event.targetInfo.targetId, event.targetInfo); });
    connection.on("Target.targetInfoChanged", (event) => { this.#targets.set(event.targetInfo.targetId, event.targetInfo); });
    connection.on("Target.targetDestroyed", (event) => {
      this.#targets.delete(event.targetId);
      this.#tabs.get(event.targetId)?.markClosed();
      this.#tabs.delete(event.targetId);
      this.#sessions.delete(event.targetId);
    });
    connection.on("Target.targetCrashed", (event) => {
      this.#tabs.get(event.targetId)?.markCrashed(event.status, event.errorCode);
    });
  }

  public get targets(): readonly Protocol.Target.TargetInfo[] {
    return [...this.#targets.values()];
  }

  public get tabs(): readonly Tab[] {
    return [...this.#tabs.values()];
  }

  public get mainTab(): Tab | undefined {
    return this.tabs[0];
  }

  public get enabledDomains(): ReadonlySet<string> {
    return this.#connection.enabledDomains;
  }

  public static async start(options: LaunchOptions = {}): Promise<Browser> {
    const executable = options.executable ?? await discoverChromeExecutable();
    const host = options.host ?? "127.0.0.1";
    const port = options.port ?? await freePort(host);
    const temporaryProfile = options.profile === undefined;
    const profile = options.profile ?? await mkdtemp(join(tmpdir(), "nodriver-"));
    const args = [
      `--remote-debugging-address=${host}`,
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      ...(options.headless === false ? [] : ["--headless=new"]),
      ...(options.args ?? []),
      "about:blank",
    ];
    const child = spawn(executable, args, { stdio: "ignore" });
    try {
      const timeoutMs = options.timeoutMs ?? 10_000;
      const browser = await Browser.#connect({
        host,
        port,
        connectionMode: options.connectionMode ?? "direct",
        domainPolicy: options.domainPolicy ?? "manual",
        timeoutMs,
      }, {
        executable,
        arguments: args,
        ...(child.pid === undefined ? {} : { pid: child.pid }),
        profile,
        temporaryProfile,
        host,
        port,
      }, child);
      return browser;
    } catch (error) {
      child.kill();
      if (temporaryProfile) await rm(profile, { recursive: true, force: true });
      throw error;
    }
  }

  public static connect(options: ConnectOptions): Promise<Browser> {
    return Browser.#connect({
      ...options,
      connectionMode: options.connectionMode ?? "direct",
      domainPolicy: options.domainPolicy ?? "manual",
      timeoutMs: options.timeoutMs ?? 10_000,
    });
  }

  public async get(url = "about:blank"): Promise<Tab> {
    const { targetId } = await this.#connection.send("Target.createTarget", { url: "about:blank" }, { timeoutMs: this.#timeoutMs });
    let tab: Tab;
    if (this.connectionMode === "flattened") {
      const sessionId = this.#sessions.get(targetId) ?? await this.#waitForSession(targetId);
      tab = new Tab(targetId, this.#connection, sessionId);
    } else {
      const websocket = await this.#waitForTargetWebSocket(targetId);
      tab = new Tab(targetId, await CdpConnection.connect(websocket, {
        timeoutMs: this.#timeoutMs,
        domainPolicy: this.#connection.domainPolicy,
      }));
    }
    this.#tabs.set(targetId, tab);
    const { targetInfo } = await this.#connection.send("Target.getTargetInfo", { targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.set(targetId, targetInfo);
    if (url !== "about:blank") await tab.navigate(url, this.#timeoutMs);
    return tab;
  }

  public async closeTab(tab: Tab): Promise<void> {
    await this.#connection.send("Target.closeTarget", { targetId: tab.targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.delete(tab.targetId);
    this.#tabs.delete(tab.targetId);
    this.#sessions.delete(tab.targetId);
    tab.markClosed();
  }

  public async close(): Promise<void> {
    if (this.#closed) return;
    this.#closed = true;
    for (const tab of this.#tabs.values()) tab.close();
    this.#connection.close();
    if (this.#process !== undefined) {
      this.#process.kill();
      await new Promise<void>((resolve) => {
        if (this.#process?.exitCode !== null) resolve();
        else this.#process?.once("exit", () => resolve());
      });
    }
    if (this.process?.temporaryProfile === true) {
      await rm(this.process.profile, { recursive: true, force: true });
    }
  }

  static async #connect(
    options: Required<Pick<ConnectOptions, "host" | "port" | "connectionMode" | "domainPolicy" | "timeoutMs">>,
    metadata?: BrowserProcessMetadata,
    child?: ChildProcess,
  ): Promise<Browser> {
    const base = `http://${options.host}:${options.port}`;
    const version = await pollJson<BrowserVersion>(`${base}/json/version`, options.timeoutMs);
    const protocol = await fetchJson<unknown>(`${base}/json/protocol`);
    const connection = await CdpConnection.connect(version.webSocketDebuggerUrl, {
      timeoutMs: options.timeoutMs,
      domainPolicy: options.domainPolicy,
    });
    const browser = new Browser(connection, options, version, protocol, options.connectionMode, metadata, child, options.timeoutMs);
    await connection.send("Target.setDiscoverTargets", { discover: true }, { timeoutMs: options.timeoutMs });
    const { targetInfos } = await connection.send("Target.getTargets", {}, { timeoutMs: options.timeoutMs });
    for (const targetInfo of targetInfos) browser.#targets.set(targetInfo.targetId, targetInfo);
    if (options.connectionMode === "flattened") {
      await connection.send("Target.setAutoAttach", {
        autoAttach: true,
        waitForDebuggerOnStart: false,
        flatten: true,
      }, { timeoutMs: options.timeoutMs });
    }
    return browser;
  }

  #waitForSession(targetId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.#sessionWaiters.delete(targetId);
        reject(new CdpTimeoutError(`Target session ${targetId}`, this.#timeoutMs));
      }, this.#timeoutMs);
      this.#sessionWaiters.set(targetId, (sessionId) => { clearTimeout(timeout); resolve(sessionId); });
    });
  }

  async #waitForTargetWebSocket(targetId: string): Promise<string> {
    const deadline = Date.now() + this.#timeoutMs;
    const url = `http://${this.endpoint.host}:${this.endpoint.port}/json/list`;
    while (Date.now() < deadline) {
      const targets = await fetchJson<readonly { readonly id: string; readonly webSocketDebuggerUrl?: string }[]>(url);
      const websocket = targets.find((target) => target.id === targetId)?.webSocketDebuggerUrl;
      if (websocket !== undefined) return websocket;
      await delay(50);
    }
    throw new CdpTimeoutError(`Target WebSocket ${targetId}`, this.#timeoutMs);
  }
}

export const start = Browser.start;
export const connect = Browser.connect;

export async function discoverChromeExecutable(): Promise<string> {
  const candidates = process.platform === "darwin"
    ? [
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ]
    : process.platform === "win32"
      ? [
          `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env.LOCALAPPDATA ?? ""}\\Chromium\\Application\\chrome.exe`,
        ]
      : ["/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"];
  for (const candidate of candidates) {
    try { await access(candidate); return candidate; } catch { /* Continue discovery. */ }
  }
  throw new Error("No Chrome or Chromium executable found; pass LaunchOptions.executable");
}

async function freePort(host: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, host, () => {
      const address = server.address();
      if (typeof address !== "object" || address === null) {
        server.close();
        reject(new Error("Failed to allocate a debugging port"));
        return;
      }
      server.close((error) => error === undefined ? resolve(address.port) : reject(error));
    });
  });
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

async function pollJson<T>(url: string, timeoutMs: number): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try { return await fetchJson<T>(url); } catch (error) { lastError = error; }
    await delay(50);
  }
  throw new CdpTimeoutError(`Chrome readiness at ${url}: ${String(lastError)}`, timeoutMs);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
