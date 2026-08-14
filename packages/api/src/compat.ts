import { Browser, connect, start } from "./browser.js";
import {
  cfFindInteractiveChallenge,
  cfIsInteractiveChallengePresent,
  cfWaitForInteractiveChallenge,
  verifyCf,
} from "./cloudflare.js";
import { Config } from "./config.js";
import { Element, Position } from "./element.js";
import { BaseFetchInterception, BaseRequestExpectation, FetchInterception, RequestExpectation, ResponseExpectation } from "./network.js";
import { Tab } from "./tab.js";
import {
  cdpGetModule,
  circle,
  compareTargetInfo,
  createFromUndetectedChromedriver,
  filterRecurse,
  filterRecurseAll,
  freePort,
  htmlFromTree,
  loop,
  removeFromTree,
} from "./util.js";

export class ContraDict extends Object {
  [key: string]: unknown;

  public constructor(value: Readonly<Record<string, unknown>> | Iterable<readonly [string, unknown]> = {}) {
    super();
    const entries = Symbol.iterator in Object(value) && !isPlainRecord(value)
      ? [...value as Iterable<readonly [string, unknown]>]
      : Object.entries(value as Readonly<Record<string, unknown>>);
    for (const [key, item] of entries) this[key] = cdict(item);
  }

  public get(key: string): unknown { return this[key]; }
  public set(key: string, value: unknown): this { this[key] = cdict(value); return this; }
  public has(key: string): boolean { return Object.hasOwn(this, key); }
  public toJSON(): Readonly<Record<string, unknown>> { return { ...this }; }
}

export function cdict<T>(value: T): T extends readonly unknown[] ? readonly unknown[] : T extends object ? ContraDict : T;
export function cdict(value: unknown): unknown {
  if (value instanceof ContraDict) return value;
  if (Array.isArray(value)) return value.map(cdict);
  if (isPlainRecord(value)) return new ContraDict(value);
  return value;
}

export const cdp = new Proxy(Object.create(null) as Readonly<Record<string, ReturnType<typeof cdpGetModule>>>, {
  get: (_target, property) => cdpGetModule(String(property)),
});

export const util = Object.freeze({
  cdpGetModule,
  circle,
  compareTargetInfo,
  createFromUndetectedChromedriver,
  filterRecurse,
  filterRecurseAll,
  freePort,
  htmlFromTree,
  loop,
  removeFromTree,
});

export const core = Object.freeze({
  BaseFetchInterception,
  BaseRequestExpectation,
  Browser,
  Config,
  Element,
  FetchInterception,
  Position,
  RequestExpectation,
  ResponseExpectation,
  Tab,
  cfFindInteractiveChallenge,
  cfIsInteractiveChallengePresent,
  cfWaitForInteractiveChallenge,
  connect,
  start,
  verifyCf,
});

function isPlainRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value) as object | null;
  return prototype === Object.prototype || prototype === null;
}
