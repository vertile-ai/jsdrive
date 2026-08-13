import { accessSync, constants, existsSync, mkdtempSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, normalize } from "node:path";
import type { DomainPolicy, RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import type { ConnectionMode } from "./browser.js";

export type BrowserType = "auto" | "chrome" | "chromium" | "brave";
export type PathLike = string | URL;

export interface BrowserConfig {
  readonly userDataDir?: PathLike;
  readonly headless?: boolean;
  readonly userAgent?: string;
  readonly executable?: string;
  /** Zendriver-compatible spelling for `executable`. */
  readonly browserExecutablePath?: PathLike;
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
  /** Connection probe delay in seconds, matching Zendriver's public Config. */
  readonly browserConnectionTimeout?: number;
  /** Maximum connection probes, matching Zendriver's public Config. */
  readonly browserConnectionMaxTries?: number;
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
  public browserConnectionTimeout: number;
  public browserConnectionMaxTries: number;
  public readonly extensions: string[];
  public connectionMode: ConnectionMode;
  public domainPolicy: DomainPolicy;
  public backend: RuntimeBackendFactory | undefined;

  public constructor(options?: BrowserConfig | Config);
  /** @internal Used to expose resolved launch state without marking a temporary profile as custom. */
  public constructor(options: BrowserConfig | Config, launch: { readonly userDataDir: string; readonly port: number; readonly host?: string });
  public constructor(
    options: BrowserConfig | Config = {},
    launch?: { readonly userDataDir: string; readonly port: number; readonly host?: string },
  ) {
    this.#usesCustomDataDir = options instanceof Config ? options.usesCustomDataDir : options.userDataDir !== undefined;
    this.#userDataDir = launch?.userDataDir ?? toPathString(options instanceof Config ? options.#userDataDir : options.userDataDir);
    this.headless = options.headless ?? false;
    this.userAgent = options.userAgent;
    this.executable = toPathString(options.browserExecutablePath) ?? options.executable;
    this.browser = options.browser ?? "auto";
    this.browserArgs = [...(options.browserArgs ?? (options instanceof Config ? [] : options.args ?? []))];
    this.sandbox = options.sandbox ?? true;
    this.lang = options.lang;
    this.host = launch?.host ?? options.host ?? "127.0.0.1";
    this.port = launch?.port ?? options.port;
    this.expert = options.expert ?? false;
    this.autodiscoverTargets = options.autodiscoverTargets ?? true;
    this.disableWebgl = options.disableWebgl ?? false;
    this.disableWebrtc = options.disableWebrtc ?? true;
    this.browserConnectionTimeout = options.browserConnectionTimeout
      ?? (options instanceof Config ? options.browserConnectionTimeout : (options.connectionTimeoutMs === undefined ? 0.25 : options.connectionTimeoutMs / 1_000));
    this.browserConnectionMaxTries = options.browserConnectionMaxTries
      ?? (options instanceof Config ? options.browserConnectionMaxTries : options.connectionTries ?? 10);
    this.connectionTries = options.connectionTries ?? this.browserConnectionMaxTries;
    this.connectionTimeoutMs = options.connectionTimeoutMs
      ?? (options instanceof Config ? options.connectionTimeoutMs : options.timeoutMs ?? 10_000);
    this.extensions = [...(options.extensions ?? [])];
    this.connectionMode = options.connectionMode ?? "direct";
    this.domainPolicy = options.domainPolicy ?? "manual";
    this.backend = options.backend;
  }

  public get userDataDir(): string | undefined {
    // Zendriver resolves an automatic profile lazily. Browser.start uses the
    // internal value before this getter is touched so a Config remains a
    // reusable template for multiple browser instances.
    if (this.#userDataDir === undefined) {
      this.#userDataDir = tempProfileDir();
      this.#usesCustomDataDir = false;
    }
    return this.#userDataDir;
  }
  /** @internal Return the configured value without allocating an automatic profile. */
  public get configuredUserDataDir(): string | undefined { return this.#userDataDir; }
  public set userDataDir(value: PathLike | undefined) {
    this.#userDataDir = toPathString(value);
    this.#usesCustomDataDir = this.#userDataDir !== undefined;
  }
  public get usesCustomDataDir(): boolean { return this.#usesCustomDataDir; }
  public get browserExecutablePath(): string | undefined { return this.executable; }
  public set browserExecutablePath(value: PathLike | undefined) { this.executable = toPathString(value); }
  public addArgument(argument: string): void {
    if (/(?:headless|data[-_]dir|no[-_]sandbox|lang)/i.test(argument)) {
      throw new TypeError(`Use the corresponding Config property instead of ${argument}`);
    }
    this.browserArgs.push(argument);
  }
  public addExtension(path: PathLike): void {
    const source = toPathString(path);
    if (source === undefined || !existsSync(source)) {
      const error = new Error(`could not find anything here: ${source ?? "undefined"}`) as Error & { code?: string };
      error.code = "ENOENT";
      throw error;
    }
    const stats = statSync(source);
    if (stats.isDirectory()) {
      let extension = source;
      for (const entry of readdirSync(source, { withFileTypes: true, recursive: true })) {
        if (entry.name.startsWith("manifest.")) {
          const parent = entry.parentPath ?? source;
          extension = parent;
        }
      }
      this.extensions.push(extension);
      return;
    }
    const extraction = mkdtempSync(join(tmpdir(), "extension_"));
    let archive = source;
    let temporaryArchive: string | undefined;
    try {
      const bytes = readFileSync(source);
      if (bytes.subarray(0, 4).toString("ascii") === "Cr24") {
        const version = bytes.readUInt32LE(4);
        const offset = version === 2 ? 16 + bytes.readUInt32LE(8) + bytes.readUInt32LE(12) : 12 + bytes.readUInt32LE(8);
        temporaryArchive = join(extraction, ".extension.zip");
        writeFileSync(temporaryArchive, bytes.subarray(offset));
        archive = temporaryArchive;
      }
      execFileSync("unzip", ["-q", archive, "-d", extraction], { stdio: "ignore" });
    } catch (error) {
      throw new Error(`could not unpack extension: ${source}`, { cause: error });
    } finally {
      if (temporaryArchive !== undefined) unlinkSync(temporaryArchive);
    }
    this.extensions.push(extraction);
  }
  /** Idiomatic equivalent of Zendriver's callable Config object. */
  public toBrowserArgs(): readonly string[] { return [...this.browserArgs]; }
  public toString(): string {
    return `${this.constructor.name}\n${[
      ["headless", this.headless], ["userAgent", this.userAgent], ["executable", this.executable],
      ["browser", this.browser], ["browserArgs", this.browserArgs], ["sandbox", this.sandbox],
      ["lang", this.lang], ["host", this.host], ["port", this.port], ["expert", this.expert],
      ["autodiscoverTargets", this.autodiscoverTargets], ["disableWebgl", this.disableWebgl],
      ["disableWebrtc", this.disableWebrtc], ["browserConnectionTimeout", this.browserConnectionTimeout],
      ["browserConnectionMaxTries", this.browserConnectionMaxTries], ["extensions", this.extensions],
    ].filter(([, value]) => value !== undefined && value !== false && value !== "")
      .map(([key, value]) => `\t${key} = ${String(value)}`).join("\n")}`;
  }
}

/** Return the shortest executable candidate, as Zendriver's helper does. */
export function findBinary(candidates: readonly PathLike[]): string | undefined {
  const valid = candidates.map(toPathString).filter((candidate): candidate is string => {
    if (candidate === undefined) return false;
    try {
      accessSync(candidate, constants.X_OK);
      return statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
  return valid.length === 0 ? undefined : valid.reduce((shortest, candidate) => candidate.length < shortest.length ? candidate : shortest);
}

/** Find an installed Chrome-family executable or throw a descriptive error. */
export function findExecutable(browser: BrowserType = "auto"): string {
  const candidates = browserCandidates(browser);
  const winner = findBinary(candidates);
  if (winner !== undefined) return normalize(winner);
  throw new Error("Could not find a valid browser binary; pass browserExecutablePath/executable explicitly");
}

/** Whether this process has root/administrator privileges. */
export function isRoot(): boolean {
  if (process.platform === "win32") return false;
  return typeof process.getuid === "function" && process.getuid() === 0;
}

/** Create and return an isolated temporary browser profile directory. */
export function tempProfileDir(): string { return normalize(mkdtempSync(join(tmpdir(), "uc_"))); }

// Python spellings remain available as explicit aliases for callers porting
// small Zendriver utilities; the declarations above are the idiomatic TS API.
export const find_binary = findBinary;
export const find_executable = findExecutable;
export const is_root = isRoot;
export const temp_profile_dir = tempProfileDir;

function toPathString(value: PathLike | undefined): string | undefined {
  if (value === undefined) return undefined;
  return value instanceof URL ? value.pathname : value;
}

function browserCandidates(browser: BrowserType): readonly string[] {
  const common = process.platform === "darwin"
    ? [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      ]
    : process.platform === "win32"
      ? [
          `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env.LOCALAPPDATA ?? ""}\\Chromium\\Application\\chrome.exe`,
          `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
        ]
      : [
          "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/brave-browser",
          "/opt/google/chrome/chrome", "/snap/bin/chromium",
        ];
  const matches = browser === "auto" ? common : common.filter((candidate) => candidate.toLowerCase().includes(browser));
  return matches;
}
