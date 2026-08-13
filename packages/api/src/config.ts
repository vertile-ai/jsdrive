import type { DomainPolicy, RuntimeBackendFactory } from "@nodriver/runtime-js";
import type { ConnectionMode } from "./browser.js";

export type BrowserType = "auto" | "chrome" | "chromium" | "brave";

export interface BrowserConfig {
  readonly userDataDir?: string;
  readonly headless?: boolean;
  readonly userAgent?: string;
  readonly executable?: string;
  readonly browser?: BrowserType;
  readonly browserArgs?: readonly string[];
  readonly args?: readonly string[];
  readonly sandbox?: boolean;
  readonly lang?: string;
  readonly host?: string;
  readonly port?: number;
  readonly expert?: boolean;
  readonly autodiscoverTargets?: boolean;
  readonly disableWebgl?: boolean;
  readonly disableWebrtc?: boolean;
  readonly connectionTries?: number;
  readonly connectionTimeoutMs?: number;
  readonly timeoutMs?: number;
  readonly extensions?: readonly string[];
  readonly connectionMode?: ConnectionMode;
  readonly domainPolicy?: DomainPolicy;
  readonly backend?: RuntimeBackendFactory;
}

export class Config {
  #userDataDir: string | undefined;
  #usesCustomDataDir: boolean;
  public headless: boolean;
  public userAgent: string | undefined;
  public executable: string | undefined;
  public browser: BrowserType;
  public readonly browserArgs: string[];
  public sandbox: boolean;
  public lang: string | undefined;
  public host: string;
  public port: number | undefined;
  public expert: boolean;
  public autodiscoverTargets: boolean;
  public disableWebgl: boolean;
  public disableWebrtc: boolean;
  public connectionTries: number;
  public connectionTimeoutMs: number;
  public readonly extensions: string[];
  public connectionMode: ConnectionMode;
  public domainPolicy: DomainPolicy;
  public backend: RuntimeBackendFactory | undefined;

  public constructor(options?: BrowserConfig | Config);
  /** @internal Used to expose resolved launch state without marking a temporary profile as custom. */
  public constructor(options: BrowserConfig | Config, launch: { readonly userDataDir: string; readonly port: number });
  public constructor(
    options: BrowserConfig | Config = {},
    launch?: { readonly userDataDir: string; readonly port: number },
  ) {
    this.#usesCustomDataDir = options instanceof Config ? options.usesCustomDataDir : options.userDataDir !== undefined;
    this.#userDataDir = launch?.userDataDir ?? options.userDataDir;
    this.headless = options.headless ?? true;
    this.userAgent = options.userAgent;
    this.executable = options.executable;
    this.browser = options.browser ?? "auto";
    this.browserArgs = [...(options.browserArgs ?? (options instanceof Config ? [] : options.args ?? []))];
    this.sandbox = options.sandbox ?? true;
    this.lang = options.lang;
    this.host = options.host ?? "127.0.0.1";
    this.port = launch?.port ?? options.port;
    this.expert = options.expert ?? false;
    this.autodiscoverTargets = options.autodiscoverTargets ?? true;
    this.disableWebgl = options.disableWebgl ?? false;
    this.disableWebrtc = options.disableWebrtc ?? false;
    this.connectionTries = options.connectionTries ?? 1;
    this.connectionTimeoutMs = options.connectionTimeoutMs ?? (options instanceof Config ? 10_000 : options.timeoutMs ?? 10_000);
    this.extensions = [...(options.extensions ?? [])];
    this.connectionMode = options.connectionMode ?? "direct";
    this.domainPolicy = options.domainPolicy ?? "manual";
    this.backend = options.backend;
  }

  public get userDataDir(): string | undefined { return this.#userDataDir; }
  public set userDataDir(value: string | undefined) {
    this.#userDataDir = value;
    this.#usesCustomDataDir = value !== undefined;
  }
  public get usesCustomDataDir(): boolean { return this.#usesCustomDataDir; }
  public addArgument(argument: string): this { this.browserArgs.push(argument); return this; }
  public addExtension(path: string): this { this.extensions.push(path); return this; }
}
