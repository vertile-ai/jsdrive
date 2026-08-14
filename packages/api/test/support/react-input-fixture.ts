import { createServer, type Server } from "node:http";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

export interface ReactInputFixtureServer {
  readonly url: string;
  close(): Promise<void>;
}

export interface ReactInputEventObservation {
  readonly source: "native" | "react";
  readonly type: string;
  readonly value: string;
  readonly key: string | null;
  readonly inputType: string | null;
  readonly data: string | null;
  readonly isTrusted: boolean;
}

export interface ReactInputObservation {
  readonly fixture: {
    readonly reactVersion: string;
    readonly rootMode: string;
    readonly rootMarker: string | null;
    readonly reactOwnedRoot: boolean;
    readonly ready: boolean;
  };
  readonly domValue: string | null;
  readonly modelValue: string | null;
  readonly updateCount: number;
  readonly renderCount: number;
  readonly events: readonly ReactInputEventObservation[];
}

export interface ReactInputReference {
  readonly runtime: "zendriver";
  readonly version: "0.15.5";
  readonly headless: true;
  readonly cleanup: {
    readonly stopped: true;
    readonly profileRemoved: true;
  };
  readonly observations: {
    readonly clearInput: ReactInputObservation;
    readonly clearInputByDeleting: ReactInputObservation;
    readonly controlledFill: ReactInputObservation;
  };
}

export async function startReactInputFixtureServer(): Promise<ReactInputFixtureServer> {
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
  const [page, react, reactDom] = await Promise.all([
    readFile(resolve(packageRoot, "test/fixtures/react-controlled-input.html")),
    readFile(resolve(packageRoot, "../../node_modules/react/umd/react.development.js")),
    readFile(resolve(packageRoot, "../../node_modules/react-dom/umd/react-dom.development.js")),
  ]);
  const server = createServer((request, response) => {
    const asset = request.url === "/react.development.js"
      ? react
      : request.url === "/react-dom.development.js"
        ? reactDom
        : page;
    response.setHeader("content-type", request.url?.endsWith(".js") === true
      ? "text/javascript; charset=utf-8"
      : "text/html; charset=utf-8");
    response.end(asset);
  });
  await new Promise<void>((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("React fixture server did not expose an address");
  return {
    url: `http://127.0.0.1:${address.port}/`,
    close: () => closeServer(server),
  };
}

export async function readReactInputReference(): Promise<ReactInputReference> {
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
  const artifact = JSON.parse(await readFile(resolve(packageRoot, "../../parity/react-input-observations.json"), "utf8")) as {
    readonly schemaVersion?: number;
    readonly provenance?: {
      readonly fixture?: { readonly path?: string; readonly sha256?: string };
      readonly runner?: { readonly path?: string; readonly sha256?: string };
    };
    readonly fixture?: { readonly reactVersion?: string; readonly rootMode?: string; readonly initialValue?: string; readonly fillText?: string };
    readonly reference?: ReactInputReference;
  };
  if (artifact.schemaVersion !== 1
    || artifact.fixture?.reactVersion !== "18.3.1"
    || artifact.fixture.rootMode !== "createRoot"
    || artifact.fixture.initialValue !== "10"
    || artifact.fixture.fillText !== "25"
    || artifact.reference === undefined) {
    throw new Error("React input reference artifact has an invalid schema or fixture contract");
  }
  const fixturePath = "packages/api/test/fixtures/react-controlled-input.html";
  const runnerPath = "packages/api/test/input-react-zendriver.py";
  if (artifact.provenance?.fixture?.path !== fixturePath
    || artifact.provenance.runner?.path !== runnerPath
    || artifact.provenance.fixture.sha256 !== await sha256(resolve(packageRoot, "test/fixtures/react-controlled-input.html"))
    || artifact.provenance.runner.sha256 !== await sha256(resolve(packageRoot, "test/input-react-zendriver.py"))) {
    throw new Error("React input reference artifact provenance does not match its fixture and runner sources");
  }
  return artifact.reference;
}

async function sha256(path: string): Promise<string> {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

async function closeServer(server: Server): Promise<void> {
  await new Promise<void>((resolveClose, reject) => {
    server.close((error) => error === undefined ? resolveClose() : reject(error));
  });
}
