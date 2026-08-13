import { access } from "node:fs/promises";
import { Browser, TargetClosedError, type ConnectionMode } from "./browser.js";

const executable = "/Applications/Chromium.app/Contents/MacOS/Chromium";

for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
  const domainPolicy = connectionMode === "direct" ? "zendriver-compatible" : "reference-counted";
  const browser = await Browser.start({ executable, connectionMode, domainPolicy });
  const profile = browser.process?.profile;
  let evidence: Readonly<Record<string, unknown>> = {};
  try {
    const tab = await browser.get(`data:text/html,<title>${connectionMode}</title><main id=result>${connectionMode}-ok</main>`);
    const result = await tab.evaluate<string>("document.querySelector('#result')?.textContent");
    const registryContainsTab = browser.targets.some((target) => target.targetId === tab.targetId);
    const mainTabMatches = browser.mainTab === tab && browser.tabs.includes(tab);
    const enabledDomains = [...tab.enabledDomains];
    const attached = await Browser.connect({ ...browser.endpoint, connectionMode, domainPolicy });
    let attachedResult: string;
    try {
      const attachedTab = await attached.get(`data:text/html,<main id=result>${connectionMode}-attached-ok</main>`);
      attachedResult = await attachedTab.evaluate<string>("document.querySelector('#result')?.textContent");
    } finally {
      await attached.close();
    }
    evidence = {
      connectionMode,
      result,
      attachedResult,
      browser: browser.version.Browser,
      host: browser.endpoint.host,
      port: browser.endpoint.port,
      pid: browser.process?.pid,
      profile,
      domainPolicy,
      enabledDomains,
      registryContainsTab,
      mainTabMatches,
    };
    await browser.closeTab(tab);
    let targetClosedError = false;
    try { await tab.evaluate("document.title"); } catch (error) { targetClosedError = error instanceof TargetClosedError; }
    evidence = {
      ...evidence,
      targetClosedError,
      registryRemovedTab: !browser.targets.some((target) => target.targetId === tab.targetId),
      tabsRemovedTab: !browser.tabs.includes(tab),
      mainTabCleared: browser.mainTab === undefined,
    };
  } finally {
    await browser.close();
  }
  let profileRemoved = false;
  if (profile !== undefined) {
    try { await access(profile); } catch { profileRemoved = true; }
  }
  console.log(JSON.stringify({ ...evidence, profileRemoved }));
}
