import type { Element } from "./element.js";
import type { Tab } from "./tab.js";

export type CloudflareChallengeElements = readonly [
  container: Element | null,
  frame: Element | null,
  response: Element | null,
];

const containerSelector = ".cf-turnstile, #challenge-stage, [data-sitekey]";
const frameSelector = "iframe[title*='Cloudflare'], iframe[src*='challenges.cloudflare.com']";
const responseSelector = "input[name^='cf-turnstile-response']";

/** Find the public DOM markers used by Cloudflare interactive challenges. */
export async function cfFindInteractiveChallenge(tab: Tab): Promise<CloudflareChallengeElements> {
  const [container, frame, response] = await Promise.all([
    tab.querySelector(containerSelector),
    tab.querySelector(frameSelector),
    tab.querySelector(responseSelector),
  ]);
  return [container, frame, response];
}

export async function cfWaitForInteractiveChallenge(tab: Tab, timeout = 5): Promise<CloudflareChallengeElements> {
  const deadline = Date.now() + timeout * 1_000;
  do {
    const elements = await cfFindInteractiveChallenge(tab);
    if (elements.some((element) => element !== null)) return elements;
    if (Date.now() >= deadline) return [null, null, null];
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
  } while (Date.now() < deadline);
  return [null, null, null];
}

export async function cfIsInteractiveChallengePresent(tab: Tab, timeout = 5): Promise<boolean> {
  return (await cfWaitForInteractiveChallenge(tab, timeout)).some((element) => element !== null);
}

/** Explicitly click a detected challenge marker; this makes no bypass claim. */
export async function verifyCf(
  tab: Tab,
  clickDelay = 5,
  timeout = 15,
  challengeSelector?: string,
  flashCorners = false,
): Promise<void> {
  if (challengeSelector !== undefined) {
    await tab.verifyCf(challengeSelector, { timeoutMs: timeout * 1_000, clickDelayMs: clickDelay * 1_000 });
    return;
  }
  const elements = await cfWaitForInteractiveChallenge(tab, timeout);
  const challenge = elements[0] ?? elements[1];
  if (challenge === null) throw new Error("Cloudflare interactive challenge was not found");
  if (flashCorners) await challenge.flash();
  await new Promise<void>((resolve) => setTimeout(resolve, clickDelay * 1_000));
  await challenge.mouseClick();
}

export const cf_find_interactive_challenge = cfFindInteractiveChallenge;
export const cf_is_interactive_challenge_present = cfIsInteractiveChallengePresent;
export const cf_wait_for_interactive_challenge = cfWaitForInteractiveChallenge;
export const verify_cf = verifyCf;
