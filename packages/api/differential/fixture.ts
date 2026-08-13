import { createServer, type Server } from "node:http";

export interface ProviderFixture {
  readonly url: string;
  close(): Promise<void>;
}

export async function startProviderFixture(): Promise<ProviderFixture> {
  const server = createServer((request, response) => {
    if (request.url === "/openai-bootstrap") {
      response.setHeader("content-type", "application/json");
      response.setHeader("x-grok-bootstrap", "grok-response-material");
      response.end(JSON.stringify({
        openaiCapture: true,
        lmArenaAuth: request.headers["x-lmarena-auth"] ?? null,
        grokBootstrap: "ready",
      }));
      return;
    }
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(`<!doctype html><title>provider fixture</title><script>
      window.qwenRuntimeToken = "qwen-runtime-token";
      window.bootstrapProvider = async () => {
        localStorage.setItem("lmArenaAuth", "lmarena-storage-material");
        document.cookie = "geminiSession=gemini-cookie-material; SameSite=Lax";
        const response = await fetch("/openai-bootstrap", { headers: { "x-lmarena-auth": "lmarena-request-material" } });
        const result = { body: await response.json(), responseHeader: response.headers.get("x-grok-bootstrap") };
        window.providerResult = result;
        return result;
      };
    </script>`);
  });
  await listen(server);
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("Provider fixture has no address");
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => close(server),
  };
}

function listen(server: Server): Promise<void> {
  return new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
}

function close(server: Server): Promise<void> {
  return new Promise((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
}
