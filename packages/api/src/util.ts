import { createServer } from "node:net";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import { Browser, type ConnectionMode } from "./browser.js";
import { Element } from "./element.js";
import type { Tab } from "./tab.js";

export interface CdpModule {
  readonly name: string;
  command(name: string): string;
  event(name: string): string;
}

export interface UndetectedChromedriverLike {
  readonly options?: {
    readonly debugger_address?: string;
    readonly debuggerAddress?: string;
  };
}

export interface NodeEventLoop {
  queue(callback: () => void): void;
  delay(milliseconds: number): Promise<void>;
}

type TreeValue = Protocol.DOM.Node | Element;

const domainCache = new Map<string, CdpModule>();

/** Return a runtime descriptor for a typed CDP domain. */
export function cdpGetModule(domain: string | CdpModule): CdpModule {
  if (typeof domain !== "string") return domain;
  const name = cdpDomainName(domain);
  const cached = domainCache.get(name);
  if (cached !== undefined) return cached;
  const descriptor = Object.freeze({
    name,
    command: (command: string) => `${name}.${command}`,
    event: (event: string) => `${name}.${event}`,
  });
  domainCache.set(name, descriptor);
  return descriptor;
}

/** Yield the same closed circle coordinate sequence as Zendriver's helper. */
export function* circle(
  x: number,
  y: number | null = null,
  radius = 10,
  num = 10,
  direction = 0,
): Generator<readonly [number, number], void, void> {
  if (!Number.isInteger(num) || num <= 0) throw new RangeError("num must be a positive integer");
  const centerX = x - radius * 2;
  const centerY = (y ?? x) - radius * 2;
  const start = direction === 0 ? Math.PI / 2 : 0;
  const step = (Math.PI * 2) / num * (direction === 0 ? -1 : 1);
  for (let index = 0; index <= num; index += 1) {
    const angle = start + step * index;
    yield [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)];
  }
}

/** Return changed TargetInfo fields as [name, previous, current] tuples. */
export function compareTargetInfo(
  previous: Protocol.Target.TargetInfo | undefined | null,
  current: Protocol.Target.TargetInfo,
): ReadonlyArray<readonly [string, unknown, unknown]> {
  if (previous == null) return [];
  const fields = [
    ["target_id", "targetId"],
    ["type_", "type"],
    ["title", "title"],
    ["url", "url"],
    ["attached", "attached"],
    ["can_access_opener", "canAccessOpener"],
    ["opener_id", "openerId"],
    ["opener_frame_id", "openerFrameId"],
    ["parent_frame_id", "parentFrameId"],
    ["browser_context_id", "browserContextId"],
    ["subtype", "subtype"],
  ] as const;
  const changes: Array<readonly [string, unknown, unknown]> = [];
  for (const [pythonName, nodeName] of fields) {
    if (previous[nodeName] !== current[nodeName]) changes.push([pythonName, previous[nodeName], current[nodeName]]);
  }
  return changes;
}

/** Connect to Chrome already owned by an undetected-chromedriver-compatible object. */
export function createFromUndetectedChromedriver(
  driver: UndetectedChromedriverLike,
  connectionMode: ConnectionMode = "direct",
): Promise<Browser> {
  const address = driver.options?.debugger_address ?? driver.options?.debuggerAddress;
  if (address === undefined) throw new TypeError("driver.options.debugger_address is required");
  const separator = address.lastIndexOf(":");
  if (separator <= 0) throw new TypeError(`Invalid debugger address: ${address}`);
  const host = address.slice(0, separator);
  const port = Number(address.slice(separator + 1));
  if (!Number.isInteger(port) || port <= 0 || port > 65_535) throw new TypeError(`Invalid debugger address: ${address}`);
  return Browser.connect({ host, port, connectionMode });
}

/** Find the first descendant matching a predicate; the root itself is not tested. */
export function filterRecurse<T extends TreeValue>(tree: T, predicate: (node: T) => boolean): T | undefined {
  for (const child of treeChildren(tree) as readonly T[]) {
    if (predicate(child)) return child;
    const nested = filterRecurse(child, predicate);
    if (nested !== undefined) return nested;
  }
  return undefined;
}

/** Find every descendant matching a predicate; the root itself is not tested. */
export function filterRecurseAll<T extends TreeValue>(tree: T, predicate: (node: T) => boolean): readonly T[] {
  const matches: T[] = [];
  for (const child of treeChildren(tree) as readonly T[]) {
    if (predicate(child)) matches.push(child);
    matches.push(...filterRecurseAll(child, predicate));
  }
  return matches;
}

/** Allocate an unused local TCP port. */
export function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address !== "object" || address === null) {
        server.close();
        reject(new Error("Failed to allocate a local port"));
        return;
      }
      server.close((error) => error === undefined ? resolve(address.port) : reject(error));
    });
  });
}

/** Concatenate the outer HTML of a tree's direct children. */
export async function htmlFromTree(tree: TreeValue, target: Tab): Promise<string> {
  let output = "";
  for (const child of treeChildren(tree)) {
    if (child instanceof Element) output += await child.getHtml();
    else output += (await target.send("DOM.getOuterHTML", { backendNodeId: child.backendNodeId })).outerHTML;
  }
  return output;
}

/** Node's event loop is implicit; expose its two portable scheduling operations. */
export function loop(): NodeEventLoop {
  return {
    queue: (callback) => queueMicrotask(callback),
    delay: (milliseconds) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds)),
  };
}

/** Remove a node from a mutable CDP tree and return the original root. */
export function removeFromTree(tree: Protocol.DOM.Node, node: Protocol.DOM.Node): Protocol.DOM.Node {
  const mutable = tree as Protocol.DOM.Node & { children?: Protocol.DOM.Node[] };
  const children = mutable.children;
  if (children === undefined) return tree;
  const index = children.findIndex((child) => child.nodeId === node.nodeId);
  if (index >= 0) {
    children.splice(index, 1);
    return tree;
  }
  for (const child of children) removeFromTree(child, node);
  return tree;
}

export const cdp_get_module = cdpGetModule;
export const compare_target_info = compareTargetInfo;
export const create_from_undetected_chromedriver = createFromUndetectedChromedriver;
export const filter_recurse = filterRecurse;
export const filter_recurse_all = filterRecurseAll;
export const free_port = freePort;
export const html_from_tree = htmlFromTree;
export const remove_from_tree = removeFromTree;

function treeChildren(tree: TreeValue): readonly TreeValue[] {
  return tree instanceof Element ? tree.children : tree.children ?? [];
}

function cdpDomainName(value: string): string {
  const normalized = value.replace(/^zendriver\.cdp\./, "").replace(/[-_ ]+(.)/g, (_match, char: string) => char.toUpperCase());
  const lower = normalized.toLowerCase();
  if (lower === "dom") return "DOM";
  if (lower === "css") return "CSS";
  if (lower === "io") return "IO";
  return normalized.length === 0 ? normalized : `${normalized[0]?.toUpperCase()}${normalized.slice(1)}`;
}
