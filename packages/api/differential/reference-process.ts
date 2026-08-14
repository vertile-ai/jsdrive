import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";

const OUTPUT_LIMIT_BYTES = 1_048_576;
const TERM_GRACE_MS = 1_000;
const KILL_GRACE_MS = 2_000;
const PROFILE_PREFIX = "nodriver-differential-zendriver-";

export interface ReferenceProcessResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly childPid: number;
  readonly processGroupId: number;
  readonly processStopped: true;
}

export class ReferenceProcessError extends Error {
  public constructor(
    message: string,
    public readonly childPid?: number,
    public readonly processGroupId?: number,
    public readonly processStopped = false,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ReferenceProcessError";
  }
}

export async function runBoundedReferenceProcess(
  executable: string,
  args: readonly string[],
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<ReferenceProcessResult> {
  if (process.platform === "win32") {
    throw new ReferenceProcessError("The differential reference process requires POSIX process-group cleanup", undefined, undefined, true);
  }
  if (signal?.aborted === true) {
    throw new ReferenceProcessError(abortMessage(signal.reason), undefined, undefined, true, { cause: signal.reason });
  }

  const child = spawn(executable, args, {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  const childPid = child.pid;
  if (childPid === undefined) {
    const cause = await new Promise<unknown>((resolveError) => child.once("error", resolveError));
    throw new ReferenceProcessError(`Failed to start differential reference process: ${String(cause)}`, undefined, undefined, true, { cause });
  }
  const processGroupId = childPid;
  const stdoutChunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  let capturedBytes = 0;
  let rejectOutput: (error: Error) => void = () => {};
  const outputFailure = new Promise<never>((_resolve, reject) => { rejectOutput = reject; });
  let outputFailed = false;

  const capture = (chunks: Buffer[], chunk: Buffer): void => {
    const remaining = Math.max(0, OUTPUT_LIMIT_BYTES - capturedBytes);
    if (remaining > 0) chunks.push(chunk.subarray(0, remaining));
    capturedBytes += chunk.length;
    if (capturedBytes > OUTPUT_LIMIT_BYTES && !outputFailed) {
      outputFailed = true;
      rejectOutput(new ReferenceProcessError(
        `Differential reference process exceeded ${OUTPUT_LIMIT_BYTES} captured output bytes`,
        childPid,
        processGroupId,
      ));
    }
  };
  child.stdout.on("data", (chunk: Buffer) => capture(stdoutChunks, chunk));
  child.stderr.on("data", (chunk: Buffer) => capture(stderrChunks, chunk));

  const withCapturedStderr = (message: string): string => {
    const stderr = Buffer.concat(stderrChunks).toString("utf8").trim();
    return stderr === "" ? message : `${message}\nCaptured stderr:\n${stderr}`;
  };

  const closed = new Promise<{ readonly code: number | null; readonly signal: NodeJS.Signals | null }>((resolveClose, rejectClose) => {
    child.once("error", rejectClose);
    child.once("close", (code, signal) => resolveClose({ code, signal }));
  });
  let rejectAbort: (error: ReferenceProcessError) => void = () => {};
  const abortFailure = new Promise<never>((_resolve, reject) => { rejectAbort = reject; });
  let receivedAbort: ReferenceProcessError | undefined;
  const abort = (): void => {
    receivedAbort ??= new ReferenceProcessError(
      abortMessage(signal?.reason),
      childPid,
      processGroupId,
    );
    rejectAbort(receivedAbort);
  };
  signal?.addEventListener("abort", abort, { once: true });

  let timeout: NodeJS.Timeout | undefined;
  const timedOut = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => reject(new ReferenceProcessError(
      withCapturedStderr(`Differential reference process timed out after ${timeoutMs}ms`),
      childPid,
      processGroupId,
    )), timeoutMs);
  });

  try {
    let exit: { readonly code: number | null; readonly signal: NodeJS.Signals | null };
    try {
      exit = await Promise.race([closed, timedOut, outputFailure, abortFailure]);
    } catch (error) {
      await terminateProcessGroup(processGroupId, error);
      await closed.catch(() => undefined);
      const failure = error === receivedAbort
        ? new ReferenceProcessError(
          withCapturedStderr(abortMessage(signal?.reason)),
          childPid,
          processGroupId,
        )
        : asReferenceProcessError(error, childPid, processGroupId);
      throw stoppedReferenceProcessError(failure, childPid, processGroupId);
    }

    const stdout = Buffer.concat(stdoutChunks).toString("utf8");
    const stderr = Buffer.concat(stderrChunks).toString("utf8");
    if (exit.code !== 0 || exit.signal !== null) {
      const failure = new ReferenceProcessError(
        exit.signal === null
          ? `Differential reference process exited with status ${String(exit.code)}${stderr.trim() === "" ? "" : `: ${stderr.trim()}`}`
          : `Differential reference process was terminated by ${exit.signal}`,
        childPid,
        processGroupId,
      );
      await terminateProcessGroup(processGroupId, failure);
      throw stoppedReferenceProcessError(failure, childPid, processGroupId);
    }

    const processGroupExited = await waitForProcessGroupExit(processGroupId, 250);
    if (receivedAbort !== undefined) {
      await terminateProcessGroup(processGroupId, receivedAbort);
      await closed.catch(() => undefined);
      const failure = new ReferenceProcessError(
        withCapturedStderr(abortMessage(signal?.reason)),
        childPid,
        processGroupId,
      );
      throw stoppedReferenceProcessError(failure, childPid, processGroupId);
    }
    if (!processGroupExited) {
      const failure = new ReferenceProcessError(
        `Differential reference process exited while process group ${processGroupId} still had descendants`,
        childPid,
        processGroupId,
      );
      await terminateProcessGroup(processGroupId, failure);
      throw stoppedReferenceProcessError(failure, childPid, processGroupId);
    }
    return { stdout, stderr, childPid, processGroupId, processStopped: true };
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}

function abortMessage(reason: unknown): string {
  const detail = reason instanceof Error ? reason.message : String(reason ?? "abort requested");
  return `Differential reference process aborted: ${detail}`;
}

export async function removeOwnedDifferentialProfile(profile: string): Promise<void> {
  const resolvedProfile = resolve(profile);
  const resolvedRoot = resolve(tmpdir());
  if (dirname(resolvedProfile) !== resolvedRoot || !basename(resolvedProfile).startsWith(PROFILE_PREFIX)) {
    throw new Error(`Refusing to remove non-differential profile: ${profile}`);
  }
  await rm(resolvedProfile, { recursive: true, force: true });
}

async function terminateProcessGroup(processGroupId: number, originalError: unknown): Promise<void> {
  signalProcessGroup(processGroupId, "SIGTERM");
  if (await waitForProcessGroupExit(processGroupId, TERM_GRACE_MS)) return;
  signalProcessGroup(processGroupId, "SIGKILL");
  if (await waitForProcessGroupExit(processGroupId, KILL_GRACE_MS)) return;
  throw new ReferenceProcessError(
    `Differential reference process group ${processGroupId} remained after SIGKILL`,
    processGroupId,
    processGroupId,
    false,
    { cause: originalError },
  );
}

function signalProcessGroup(processGroupId: number, signal: NodeJS.Signals): void {
  try {
    process.kill(-processGroupId, signal);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
  }
}

async function waitForProcessGroupExit(processGroupId: number, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (processGroupExists(processGroupId)) {
    if (Date.now() >= deadline) return false;
    await new Promise<void>((resolveWait) => setTimeout(resolveWait, 25));
  }
  return true;
}

function processGroupExists(processGroupId: number): boolean {
  try {
    process.kill(-processGroupId, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    if ((error as NodeJS.ErrnoException).code === "EPERM") return true;
    throw error;
  }
}

function asReferenceProcessError(error: unknown, childPid: number, processGroupId: number): ReferenceProcessError {
  if (error instanceof ReferenceProcessError) return error;
  return new ReferenceProcessError(
    `Differential reference process failed: ${error instanceof Error ? error.message : String(error)}`,
    childPid,
    processGroupId,
    false,
    { cause: error },
  );
}

function stoppedReferenceProcessError(
  error: ReferenceProcessError,
  childPid: number,
  processGroupId: number,
): ReferenceProcessError {
  return new ReferenceProcessError(error.message, childPid, processGroupId, true, { cause: error });
}
