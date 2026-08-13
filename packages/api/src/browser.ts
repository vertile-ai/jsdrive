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
import { Config, type BrowserConfig } from "./config.js";
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

export interface LaunchOptions extends BrowserConfig {
  readonly executable?: string;
  readonly host?: string;
  readonly port?: number;
  readonly profile?: string;
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
  readonly #tabCreations = new Map<string, Promise<Tab>>();
  readonly #tabs = new Map<string, Tab>();
  readonly #targets = new Map<string, Protocol.Target.TargetInfo>();
  readonly #timeoutMs: number;
  readonly #backend: RuntimeBackendFactory;
  #stopped = false;
  #stopPromise: Promise<void> | undefined;
  public readonly cookies: CookieJar;

  private constructor(
    public readonly connection: RuntimeBackend,
    public readonly endpoint: BrowserEndpoint,
    public readonly version: BrowserVersion,
    public readonly protocol: unknown,
    public readonly connectionMode: ConnectionMode,
    public readonly config: Config,
    public readonly process: BrowserProcessMetadata | undefined,
    childProcess: ChildProcess | undefined,
    timeoutMs: number,
    backend: RuntimeBackendFactory,
  ) {
    this.#process = childProcess;
    this.#timeoutMs = timeoutMs;
    this.#backend = backend;
    this.cookies = new CookieJar(connection);
    childProcess?.once("exit", () => {
      this.#markStopped();
      this.connection.close();
    });
    connection.on("Target.attachedToTarget", (event) => {
      this.#targets.set(event.targetInfo.targetId, event.targetInfo);
      this.#sessions.set(event.targetInfo.targetId, event.sessionId);
      if (this.connectionMode === "flattened" && (event.targetInfo.type === "page" || event.targetInfo.type === "iframe") && !this.#tabs.has(event.targetInfo.targetId)) {
        void this.#ensureTab(event.targetInfo.targetId).catch(() => undefined);
      }
    });
    connection.on("Target.targetCreated", (event) => {
      this.#targets.set(event.targetInfo.targetId, event.targetInfo);
      if ((event.targetInfo.type === "page" || event.targetInfo.type === "iframe") && !this.#tabs.has(event.targetInfo.targetId)) {
        void this.#ensureTab(event.targetInfo.targetId).catch(() => undefined);
      }
    });
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
    return this.tabs.find((tab) => this.#targets.get(tab.targetId)?.type === "page");
  }

  public get enabledDomains(): ReadonlySet<string> {
    return this.connection.enabledDomains;
  }

  public get webSocketUrl(): string {
    return this.version.webSocketDebuggerUrl;
  }

  public get stopped(): boolean {
    return this.#stopped || (this.#process !== undefined && (this.#process.exitCode !== null || this.#process.signalCode !== null));
  }

  public [Symbol.iterator](): Iterator<Tab> {
    return this.tabs[Symbol.iterator]();
  }

  public static async start(options: LaunchOptions | Config = {}): Promise<Browser> {
    const profile = options instanceof Config ? undefined : options.userDataDir ?? options.profile;
    const requestedConfig = options instanceof Config
      ? new Config(options)
      : new Config({ ...options, ...(profile === undefined ? {} : { userDataDir: profile }) });
    const executable = requestedConfig.executable ?? await discoverChromeExecutable(requestedConfig.browser);
    const host = requestedConfig.host;
    const port = requestedConfig.port ?? await freePort(host);
    const temporaryProfile = requestedConfig.userDataDir === undefined;
    const profilePath = requestedConfig.userDataDir ?? await mkdtemp(join(tmpdir(), "nodriver-"));
    const config = new Config(requestedConfig, { userDataDir: profilePath, port });
    const args = [
      `--remote-debugging-address=${host}`,
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profilePath}`,
      "--no-first-run",
      "--no-default-browser-check",
      ...(config.headless ? ["--headless=new"] : []),
      ...(config.sandbox ? [] : ["--no-sandbox"]),
      ...(config.userAgent === undefined ? [] : [`--user-agent=${config.userAgent}`]),
      ...(config.lang === undefined ? [] : [`--lang=${config.lang}`]),
      ...(config.disableWebgl ? ["--disable-webgl"] : []),
      ...(config.disableWebrtc ? ["--force-webrtc-ip-handling-policy=disable_non_proxied_udp"] : []),
      ...(config.extensions.length === 0 ? [] : [`--load-extension=${config.extensions.join(",")}`]),
      ...config.browserArgs,
      "about:blank",
    ];
    const child = spawn(executable, args, { stdio: ["ignore", "ignore", "pipe"] });
    let browserStderr = "";
    child.stderr?.setEncoding("utf8");
    child.stderr?.on("data", (chunk: string) => {
      browserStderr = (browserStderr + chunk).slice(-65_536);
    });
    try {
      const timeoutMs = config.connectionTimeoutMs;
      const browser = await Browser.#connect({
        host,
        port,
        connectionMode: config.connectionMode,
        domainPolicy: config.domainPolicy,
        timeoutMs,
      }, {
        executable,
        arguments: args,
        ...(child.pid === undefined ? {} : { pid: child.pid }),
        profile: profilePath,
        temporaryProfile,
        host,
        port,
      }, child, config.backend ?? CdpConnection, config.autodiscoverTargets, config);
      return browser;
    } catch (error) {
      await stopChildProcess(child);
      if (temporaryProfile) await rm(profilePath, { recursive: true, force: true });
      const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      throw new Error(`Failed to start Chrome: ${detail}\nBrowser stderr:\n${browserStderr.trim() || "(empty)"}`, { cause: error });
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

  public async get(url = "about:blank", options: { readonly newTab?: boolean; readonly newWindow?: boolean } = {}): Promise<Tab> {
    if (options.newWindow === true) return this.newWindow(url);
    if (options.newTab === true) return this.newTab(url);
    const tab = this.mainTab ?? await this.createTab();
    if (url !== "about:blank" || this.mainTab === undefined) await tab.navigate(url, this.#timeoutMs);
    return tab;
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
    const { targetInfo } = await this.connection.send("Target.getTargetInfo", { targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.set(targetId, targetInfo);
    const tab = await this.#ensureTab(targetId);
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

  public async tileWindows(
    windows: readonly Tab[] = this.tabs,
    options: { readonly maxColumns?: number; readonly left?: number; readonly top?: number; readonly width?: number; readonly height?: number } = {},
  ): Promise<readonly Protocol.Browser.Bounds[]> {
    const unique = new Map<number, Tab>();
    for (const tab of windows) unique.set((await tab.getWindow()).windowId, tab);
    const items = [...unique.entries()];
    if (items.length === 0) return [];
    const columns = Math.min(options.maxColumns ?? Math.ceil(Math.sqrt(items.length)), items.length);
    const rows = Math.ceil(items.length / columns);
    const width = Math.floor((options.width ?? 1920) / columns);
    const height = Math.floor((options.height ?? 1080) / rows);
    const bounds: Protocol.Browser.Bounds[] = [];
    for (const [index, [windowId]] of items.entries()) {
      const value: Protocol.Browser.Bounds = {
        left: (options.left ?? 0) + (index % columns) * width,
        top: (options.top ?? 0) + Math.floor(index / columns) * height,
        width,
        height,
        windowState: "normal",
      };
      await this.connection.send("Browser.setWindowBounds", { windowId, bounds: value });
      bounds.push(value);
    }
    return bounds;
  }

  public async closeTab(tab: Tab): Promise<void> {
    await this.connection.send("Target.closeTarget", { targetId: tab.targetId }, { timeoutMs: this.#timeoutMs });
    this.#targets.delete(tab.targetId);
    this.#tabs.delete(tab.targetId);
    this.#sessions.delete(tab.targetId);
    tab.markClosed();
  }

  public close(): Promise<void> {
    this.#stopPromise ??= this.#stop();
    return this.#stopPromise;
  }

  public stop(): Promise<void> {
    return this.close();
  }

  async #stop(): Promise<void> {
    this.#markStopped();
    this.connection.close();
    if (this.#process !== undefined) await stopChildProcess(this.#process);
    if (this.process?.temporaryProfile === true) {
      await rm(this.process.profile, { recursive: true, force: true });
    }
  }

  #markStopped(): void {
    if (this.#stopped) return;
    this.#stopped = true;
    for (const tab of this.#tabs.values()) tab.markClosed();
    this.#tabs.clear();
  }

  static async #connect(
    options: Required<Pick<ConnectOptions, "host" | "port" | "connectionMode" | "domainPolicy" | "timeoutMs">>,
    metadata?: BrowserProcessMetadata,
    child?: ChildProcess,
    backend: RuntimeBackendFactory = CdpConnection,
    autodiscoverTargets = true,
    config = new Config({ host: options.host, port: options.port }),
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
      config,
      metadata,
      child,
      options.timeoutMs,
      backend,
    );
    if (autodiscoverTargets) await connection.send("Target.setDiscoverTargets", { discover: true }, { timeoutMs: options.timeoutMs });
    const { targetInfos } = await connection.send("Target.getTargets", {}, { timeoutMs: options.timeoutMs });
    for (const targetInfo of targetInfos) browser.#targets.set(targetInfo.targetId, targetInfo);
    if (options.connectionMode === "flattened") {
      await connection.send("Target.setAutoAttach", {
        autoAttach: true,
        waitForDebuggerOnStart: false,
        flatten: true,
      }, { timeoutMs: options.timeoutMs });
    }
    for (const targetInfo of targetInfos) {
      if (targetInfo.type !== "page" && targetInfo.type !== "iframe") continue;
      await browser.#ensureTab(targetInfo.targetId);
    }
    return browser;
  }

  #ensureTab(targetId: string): Promise<Tab> {
    const existing = this.#tabs.get(targetId);
    if (existing !== undefined) return Promise.resolve(existing);
    const pending = this.#tabCreations.get(targetId);
    if (pending !== undefined) return pending;
    const creation = this.#wrapTarget(targetId).then((tab) => {
      if (this.stopped || !this.#targets.has(targetId)) {
        tab.markClosed();
        throw new TargetClosedError(targetId);
      }
      const winner = this.#tabs.get(targetId);
      if (winner !== undefined) {
        tab.markClosed();
        return winner;
      }
      this.#tabs.set(targetId, tab);
      return tab;
    }).finally(() => this.#tabCreations.delete(targetId));
    this.#tabCreations.set(targetId, creation);
    return creation;
  }

  async #wrapTarget(targetId: string): Promise<Tab> {
    let tab: Tab;
    if (this.connectionMode === "flattened") {
      const sessionId = this.#sessions.get(targetId) ?? (await this.connection.send("Target.attachToTarget", { targetId, flatten: true }, { timeoutMs: this.#timeoutMs })).sessionId;
      this.#sessions.set(targetId, sessionId);
      tab = new Tab(
        targetId,
        this.connection,
        sessionId,
        this.connection,
        this.#targetWebSocketUrl(targetId),
        () => this.closeTab(tab),
        () => this.#frameTabs(targetId),
        () => this.#targets.get(targetId),
        (targetInfo) => this.#targets.set(targetId, targetInfo),
      );
    } else {
      const websocket = await this.#waitForTargetWebSocket(targetId);
      const targetConnection = await this.#backend.connect(websocket, {
        timeoutMs: this.#timeoutMs,
        domainPolicy: this.connection.domainPolicy,
      });
      tab = new Tab(
        targetId,
        targetConnection,
        undefined,
        this.connection,
        websocket,
        () => this.closeTab(tab),
        () => this.#frameTabs(targetId),
        () => this.#targets.get(targetId),
        (targetInfo) => this.#targets.set(targetId, targetInfo),
      );
    }
    return tab;
  }

  #frameTabs(parentTargetId: string): readonly Tab[] {
    return this.tabs.filter((tab) => {
      const info = this.#targets.get(tab.targetId);
      return info?.type === "iframe" && (info.parentId === parentTargetId || info.parentFrameId === parentTargetId);
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

  #targetWebSocketUrl(targetId: string): string {
    return `ws://${this.endpoint.host}:${this.endpoint.port}/devtools/page/${targetId}`;
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

export async function discoverChromeExecutable(browser: "auto" | "chrome" | "chromium" | "brave" = "auto"): Promise<string> {
  let candidates = process.platform === "darwin"
    ? [
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      ]
    : process.platform === "win32"
      ? [
          `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env.LOCALAPPDATA ?? ""}\\Chromium\\Application\\chrome.exe`,
          `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
        ]
      : ["/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome", "/usr/bin/brave-browser"];
  if (browser !== "auto") candidates = candidates.filter((candidate) => candidate.toLowerCase().includes(browser));
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

async function stopChildProcess(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  const exited = new Promise<void>((resolve) => child.once("exit", () => resolve()));
  child.kill();
  await exited;
}
