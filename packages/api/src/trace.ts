import type { TraceEntry } from "@nodriver/runtime-js";

export interface TraceSource {
  readonly trace: readonly TraceEntry[];
}

export interface NormalizedTraceEntry {
  readonly direction: "send" | "receive";
  readonly kind: "command" | "result" | "event";
  readonly method: string;
  readonly session: "browser" | "target";
}

export interface TraceDifference {
  readonly index: number;
  readonly left?: NormalizedTraceEntry;
  readonly right?: NormalizedTraceEntry;
}

export class CdpTraceRecorder {
  public constructor(private readonly source: TraceSource) {}

  public normalized(): readonly NormalizedTraceEntry[] {
    return normalizeTrace(this.source.trace);
  }

  public outbound(): readonly NormalizedTraceEntry[] {
    return this.normalized().filter(({ direction, kind }) => direction === "send" && kind === "command");
  }

  public compareOutbound(other: CdpTraceRecorder, allowedMethods: readonly string[] = []): readonly TraceDifference[] {
    return compareTraces(this.outbound(), other.outbound(), allowedMethods);
  }
}

export function hasTrace(source: unknown): source is TraceSource {
  return typeof source === "object" && source !== null && Array.isArray((source as { readonly trace?: unknown }).trace);
}

export function normalizeTrace(entries: readonly TraceEntry[]): readonly NormalizedTraceEntry[] {
  const commands = new Map<number, { readonly method: string; readonly session: "browser" | "target" }>();
  const normalized: NormalizedTraceEntry[] = [];
  for (const entry of entries) {
    const id = typeof entry.message.id === "number" ? entry.message.id : undefined;
    const session = typeof entry.message.sessionId === "string" ? "target" : "browser";
    if (entry.direction === "send" && typeof entry.message.method === "string") {
      if (id !== undefined) commands.set(id, { method: entry.message.method, session });
      normalized.push({ direction: "send", kind: "command", method: entry.message.method, session });
      continue;
    }
    if (entry.direction === "receive" && typeof entry.message.method === "string") {
      normalized.push({ direction: "receive", kind: "event", method: entry.message.method, session });
      continue;
    }
    if (entry.direction === "receive" && id !== undefined) {
      const command = commands.get(id);
      if (command !== undefined) normalized.push({ direction: "receive", kind: "result", ...command });
    }
  }
  return normalized;
}

export function compareTraces(
  left: readonly NormalizedTraceEntry[],
  right: readonly NormalizedTraceEntry[],
  allowedMethods: readonly string[] = [],
): readonly TraceDifference[] {
  const allowed = new Set(allowedMethods);
  const leftComparable = left.filter(({ method }) => !allowed.has(method));
  const rightComparable = right.filter(({ method }) => !allowed.has(method));
  const differences: TraceDifference[] = [];
  for (let index = 0; index < Math.max(leftComparable.length, rightComparable.length); index += 1) {
    const leftEntry = leftComparable[index];
    const rightEntry = rightComparable[index];
    if (JSON.stringify(leftEntry) !== JSON.stringify(rightEntry)) {
      differences.push({ index, ...(leftEntry === undefined ? {} : { left: leftEntry }), ...(rightEntry === undefined ? {} : { right: rightEntry }) });
    }
  }
  return differences;
}
