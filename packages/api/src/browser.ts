import { spawn, type ChildProcess } from "node:child_process";
import { access, mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Protocol } from "@nodriver/protocol";
import {
  CdpConnection,
  CdpTimeoutError,
  type DomainPolicy,
  type RuntimeBackend,
  type RuntimeBackendFactory,
} from "@nodriver/runtime-js";
import { CookieJar } from "./cookies.js";
import { Tab, TargetClosedError, TargetCrashedError } from "./tab.js";

export { Tab, TargetClosedError, TargetCrashedError } from "./tab.js";

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
  readonly backend?: RuntimeBackendFactory;
}

export interface ConnectOptions extends BrowserEndpoint {
  readonly connectionMode?: ConnectionMode;
  readonly domainPolicy?: DomainPolicy;
  readonly timeoutMs?: number;
  readonly backend?: RuntimeBackendFactory;
}

export class Browser {
  readonly #process: ChildProcess | undefined;
  readonly #sessions = new Map<string, string>();
  readonly #sessionWaiters = new Map<string, (sessionId: string) => void>();
  readonly #tabs = new Map<string, Tab>();
  readonly #targets = new Map<string, Protocol.Target.TargetInfo>();
  readonly #timeoutMs: number;
  readonly #backend: RuntimeBackendFactory;
  #closed = false;
  public readonly cookies: CookieJar;

  private constructor(
    public readonly connection: RuntimeBackend,
    public readonly endpoint: BrowserEndpoint,
    public readonly version: BrowserVersion,
    public readonly protocol: unknown,
    public readonly connectionMode: ConnectionMode,
    public readonly process: BrowserProcessMetadata | undefined,
    childProcess: ChildProcess | undefined,
    timeoutMs: number,
    backend: RuntimeBackendFactory,
  ) {
    this.#process = childProcess;
    this.#timeoutMs = timeoutMs;
    this.#backend = backend;
    this.cookies = new CookieJar(connection);
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
    return this.connection.enabledDomains;
  }

  public get webSocketUrl(): string {
    return this.version.webSocketDebuggerUrl;
  }

  public [Symbol.iterator](): Iterator<Tab> {
    return this.tabs[Symbol.iterator]();
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
      }, child, options.backend ?? CdpConnection);
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
    }, undefined, undefined, options.backend ?? CdpConnection);
  }

  public async get(url = "about:blank"): Promise<Tab> {
    return this.createTab(url);
  }

  public newTab(url = "about:blank"): Promise<Tab> {
    return this.createTab(url);
  }

  public newWindow(url = "about:blank"): Promise<Tab> {
    return this.createTab(url, { newWindow: true });
  }

  public async createTab(
    url = "about:blank",
    targetOptions: Omit<Protocol.Target.Commands.CreateTargetParams, "url"> = {},
  ): Promise<Tab> {
    const { targetId } = await this.connection.send(
      "Target.createTarget",
      { url: "about:blank", ...targetOptions },
      { timeoutMs: this.#timeoutMs },
    );
    let tab: Tab;
    if (this.connectionMode === "flattened") {
      const sessionId = this.#sessions.get(targetId) ?? await this.#waitForSession(targetId);
      tab = new Tab(targetId, this.connection, sessionId, this.connection);
    } else {
      const websocket = await this.#waitForTargetWebSocket(targetId);
      tab = new Tab(targetId, await this.#backend.connect(websocket, {
        timeoutMs: this.#timeoutMs,
        domainPolicy: this.connection.domainPolicy,
      }), undefined, this.connection, websocket);
    }
    this.#tabs.set(targetId, tab);
    const { targetInfo } = await this.connection.send("Target.getTargetInfo", { targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.set(targetId, targetInfo);
    if (url !== "about:blank") await tab.navigate(url, this.#timeoutMs);
    return tab;
  }

  public targetInfo(target: string | Tab): Protocol.Target.TargetInfo | undefined {
    return this.#targets.get(typeof target === "string" ? target : target.targetId);
  }

  public async updateTargets(): Promise<readonly Protocol.Target.TargetInfo[]> {
    const { targetInfos } = await this.connection.send("Target.getTargets", {}, { timeoutMs: this.#timeoutMs });
    this.#targets.clear();
    for (const targetInfo of targetInfos) this.#targets.set(targetInfo.targetId, targetInfo);
    return this.targets;
  }

  public testConnection(): Promise<Protocol.Browser.Commands.GetVersionResult> {
    return this.connection.send("Browser.getVersion", undefined, { timeoutMs: this.#timeoutMs });
  }

  public async grantPermissions(
    permissions: readonly Protocol.Browser.PermissionType[],
    origin?: string,
  ): Promise<void> {
    await this.connection.send("Browser.grantPermissions", {
      permissions,
      ...(origin === undefined ? {} : { origin }),
    }, { timeoutMs: this.#timeoutMs });
  }

  public grantAllPermissions(origin?: string): Promise<void> {
    return this.grantPermissions(ALL_PERMISSIONS, origin);
  }

  public wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
    return delay(milliseconds, signal);
  }

  public sleep(milliseconds: number, signal?: AbortSignal): Promise<void> {
    return this.wait(milliseconds, signal);
  }

  public async closeTab(tab: Tab): Promise<void> {
    await this.connection.send("Target.closeTarget", { targetId: tab.targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.delete(tab.targetId);
    this.#tabs.delete(tab.targetId);
    this.#sessions.delete(tab.targetId);
    tab.markClosed();
  }

  public async close(): Promise<void> {
    if (this.#closed) return;
    this.#closed = true;
    for (const tab of this.#tabs.values()) tab.close();
    this.connection.close();
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
    backend: RuntimeBackendFactory = CdpConnection,
  ): Promise<Browser> {
    const base = `http://${options.host}:${options.port}`;
    const version = await pollJson<BrowserVersion>(`${base}/json/version`, options.timeoutMs);
    const protocol = await fetchJson<unknown>(`${base}/json/protocol`);
    const connection = await backend.connect(version.webSocketDebuggerUrl, {
      timeoutMs: options.timeoutMs,
      domainPolicy: options.domainPolicy,
    });
    const browser = new Browser(
      connection,
      options,
      version,
      protocol,
      options.connectionMode,
      metadata,
      child,
      options.timeoutMs,
      backend,
    );
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

const ALL_PERMISSIONS: readonly Protocol.Browser.PermissionType[] = [
  "ar", "audioCapture", "automaticFullscreen", "backgroundFetch", "backgroundSync", "cameraPanTiltZoom",
  "capturedSurfaceControl", "clipboardReadWrite", "clipboardSanitizedWrite", "displayCapture", "durableStorage",
  "geolocation", "handTracking", "idleDetection", "keyboardLock", "localFonts", "localNetwork", "localNetworkAccess",
  "loopbackNetwork", "midi", "midiSysex", "nfc", "notifications", "paymentHandler", "periodicBackgroundSync",
  "pointerLock", "protectedMediaIdentifier", "sensors", "smartCard", "speakerSelection", "storageAccess",
  "topLevelStorageAccess", "videoCapture", "vr", "wakeLockScreen", "wakeLockSystem", "webAppInstallation",
  "webPrinting", "windowManagement",
];

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

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted === true) return Promise.reject(signal.reason);
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, ms);
    const abort = (): void => {
      clearTimeout(timeout);
      reject(signal?.reason);
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
}
