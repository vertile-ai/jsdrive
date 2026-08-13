/** Minimal HTTP facade exposed by Chrome's remote-debugging endpoint. */
export class HTTPApi {
  public readonly host: string;
  public readonly port: number;
  public readonly api: string;

  public constructor(addr: readonly [string, number] | { readonly host: string; readonly port: number }) {
    if ("host" in addr) {
      this.host = addr.host;
      this.port = addr.port;
    } else {
      this.host = addr[0];
      this.port = addr[1];
    }
    this.api = `http://${this.host}:${this.port}`;
  }

  public get(endpoint: string): Promise<unknown> { return this._request(endpoint); }

  public post(endpoint: string, data: Readonly<Record<string, string>>): Promise<unknown> {
    return this._request(endpoint, "post", data);
  }

  /** Public for parity diagnostics; callers normally use get/post. */
  public async _request(
    endpoint: string,
    method = "get",
    data?: Readonly<Record<string, string>>,
  ): Promise<unknown> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const url = endpoint.length === 0 ? `${this.api}/json` : `${this.api}/json/${normalizedEndpoint}`;
    if (data !== undefined && Object.keys(data).length > 0 && method.toLowerCase() === "get") {
      throw new TypeError("get requests cannot contain data");
    }
    const response = await fetch(url, {
      method: method.toUpperCase(),
      ...(data === undefined || Object.keys(data).length === 0 ? {} : {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }),
    });
    if (!response.ok) throw new Error(`${method.toUpperCase()} ${url} returned HTTP ${response.status}`);
    return response.json();
  }
}
