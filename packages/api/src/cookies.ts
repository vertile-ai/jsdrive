import { readFile, writeFile } from "node:fs/promises";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import type { RuntimeBackend } from "@vertile-ai/jsdriver-runtime-js";

export type Cookie = Protocol.Network.Cookie;
export type CookieParam = Protocol.Network.CookieParam;

export class CookieJar {
  public constructor(private readonly connection: RuntimeBackend) {}

  public async getAll(_requestsCookieFormat = false): Promise<readonly Cookie[]> {
    // requests/http.cookiejar conversion is intentionally not part of the
    // Node API; the flag is accepted so existing Zendriver-shaped calls fail
    // soft while retaining the typed CDP cookie records.
    return (await this.connection.send("Storage.getCookies", {})).cookies;
  }

  public async setAll(cookies: readonly CookieParam[]): Promise<void> {
    await this.connection.send("Storage.setCookies", { cookies });
  }

  public async clear(): Promise<void> {
    await this.connection.send("Storage.clearCookies", {});
  }

  public async save(path = ".session.dat", pattern = ".*"): Promise<void> {
    const matcher = new RegExp(pattern);
    const cookies = (await this.getAll()).filter((cookie) => matcher.test(JSON.stringify(cookie)));
    await writeFile(path, `${JSON.stringify(cookies, null, 2)}\n`, "utf8");
  }

  public async load(path = ".session.dat", pattern = ".*"): Promise<void> {
    const parsed: unknown = JSON.parse(await readFile(path, "utf8"));
    if (!Array.isArray(parsed)) throw new TypeError("Cookie file must contain a JSON array");
    const matcher = new RegExp(pattern);
    const cookies = parsed.filter((cookie) => matcher.test(JSON.stringify(cookie))).map(cookieParamFromJson);
    await this.setAll(cookies);
  }
}

function cookieParamFromJson(value: unknown): CookieParam {
  if (!isRecord(value) || typeof value.name !== "string" || typeof value.value !== "string") {
    throw new TypeError("Each cookie must contain string name and value fields");
  }
  const sameSite = value.sameSite === "Strict" || value.sameSite === "Lax" || value.sameSite === "None" ? value.sameSite : undefined;
  const priority = value.priority === "Low" || value.priority === "Medium" || value.priority === "High" ? value.priority : undefined;
  const sourceScheme = value.sourceScheme === "Unset" || value.sourceScheme === "NonSecure" || value.sourceScheme === "Secure"
    ? value.sourceScheme
    : undefined;
  const partitionKey = isRecord(value.partitionKey)
      && typeof value.partitionKey.topLevelSite === "string"
      && typeof value.partitionKey.hasCrossSiteAncestor === "boolean"
    ? { topLevelSite: value.partitionKey.topLevelSite, hasCrossSiteAncestor: value.partitionKey.hasCrossSiteAncestor }
    : undefined;
  return {
    name: value.name,
    value: value.value,
    ...optionalString(value, "url"),
    ...optionalString(value, "domain"),
    ...optionalString(value, "path"),
    ...optionalBoolean(value, "secure"),
    ...optionalBoolean(value, "httpOnly"),
    ...optionalNumber(value, "expires"),
    ...(sameSite === undefined ? {} : { sameSite }),
    ...(priority === undefined ? {} : { priority }),
    ...(sourceScheme === undefined ? {} : { sourceScheme }),
    ...optionalNumber(value, "sourcePort"),
    ...(partitionKey === undefined ? {} : { partitionKey }),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function optionalString<K extends string>(source: Record<string, unknown>, key: K): { readonly [P in K]?: string } {
  return typeof source[key] === "string" ? { [key]: source[key] } as { readonly [P in K]: string } : {};
}

function optionalBoolean<K extends string>(source: Record<string, unknown>, key: K): { readonly [P in K]?: boolean } {
  return typeof source[key] === "boolean" ? { [key]: source[key] } as { readonly [P in K]: boolean } : {};
}

function optionalNumber<K extends string>(source: Record<string, unknown>, key: K): { readonly [P in K]?: number } {
  return typeof source[key] === "number" ? { [key]: source[key] } as { readonly [P in K]: number } : {};
}
