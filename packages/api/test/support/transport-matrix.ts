import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { CdpConnection } from "@vertile-ai/jsdriver-runtime-js";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import { Browser, type ConnectionMode } from "../../src/index.js";

export interface TransportQuadrant {
  readonly backend: "js" | "native";
  readonly connectionMode: ConnectionMode;
  readonly backendFactory: RuntimeBackendFactory;
}

export interface TransportMatrixOptions {
  readonly executable: string;
  readonly headless: boolean;
}

export interface TransportNotApplicableReason {
  readonly code: string;
  readonly detail: string;
}

export const TRANSPORT_QUADRANTS = [
  { backend: "js", connectionMode: "direct", backendFactory: CdpConnection },
  { backend: "js", connectionMode: "flattened", backendFactory: CdpConnection },
  { backend: "native", connectionMode: "direct", backendFactory: NativeConnection },
  { backend: "native", connectionMode: "flattened", backendFactory: NativeConnection },
] as const satisfies readonly TransportQuadrant[];

export async function runTransportMatrix(
  caseId: string,
  options: TransportMatrixOptions,
  action: (browser: Browser, quadrant: TransportQuadrant) => Promise<void>,
): Promise<void> {
  assertCaseId(caseId);
  for (const quadrant of TRANSPORT_QUADRANTS) {
    const browser = await Browser.start({
      executable: options.executable,
      headless: options.headless,
      backend: quadrant.backendFactory,
      connectionMode: quadrant.connectionMode,
    });
    try {
      await action(browser, quadrant);
    } catch (error) {
      throw new Error(
        `${caseId} failed in ${quadrant.backend}/${quadrant.connectionMode}`,
        { cause: error },
      );
    } finally {
      await browser.stop();
    }
  }
}

export function transportNotApplicable(
  caseId: string,
  reason: TransportNotApplicableReason,
): void {
  assertCaseId(caseId);
  if (reason.code.trim() === "" || reason.detail.trim() === "") {
    throw new TypeError(`${caseId} transport non-applicability requires a code and detail`);
  }
}

function assertCaseId(caseId: string): void {
  if (!/^ZDTEST-\d{4}$/.test(caseId)) throw new TypeError(`Invalid transport parity case ID: ${caseId}`);
}
