import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import type { Protocol } from "@nodriver/protocol";
import type { RuntimeBackendFactory } from "@nodriver/runtime-js";
import { NativeConnection } from "@nodriver/runtime-native";
import { Browser, discoverChromeExecutable, type ConnectionMode, type Element, type Tab, type TabEventHandler } from "../src/index.js";

const loginPage = `<!doctype html><html><head><title>Account tutorial</title></head><body>
<section id="login-panel">
  <label>Email <input id="loginEmail" type="email"></label>
  <label>Password <input id="loginPassword" type="password"></label>
  <button id="login-button" type="button">Login</button>
  <a id="signup-link" href="#signup">Sign up</a>
</section>
<section id="signup-panel" hidden>
  <label>Name <input id="signupName"></label>
  <label>Email <input id="signupEmail" type="email"></label>
  <label>Password <input id="signupPassword" type="password"></label>
  <button id="signup-button" type="button">Sign Up</button>
</section>
<section id="confirmation" hidden><button id="proceed" type="button">Proceed to Login</button></section>
<p id="message"></p>
<script>
  let account;
  const loginPanel = document.querySelector('#login-panel');
  const signupPanel = document.querySelector('#signup-panel');
  const confirmation = document.querySelector('#confirmation');
  document.querySelector('#signup-link').addEventListener('click', (event) => {
    event.preventDefault(); loginPanel.hidden = true; signupPanel.hidden = false;
  });
  document.querySelector('#signup-button').addEventListener('click', () => {
    account = {
      name: document.querySelector('#signupName').value,
      email: document.querySelector('#signupEmail').value,
      password: document.querySelector('#signupPassword').value,
    };
    signupPanel.hidden = true; confirmation.hidden = false;
  });
  document.querySelector('#proceed').addEventListener('click', () => {
    confirmation.hidden = true; loginPanel.hidden = false;
  });
  document.querySelector('#login-button').addEventListener('click', () => {
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    document.querySelector('#message').textContent = account && account.email === email && account.password === password
      ? 'Welcome back, ' + account.name
      : 'Login failed';
  });
</script></body></html>`;

const apiPage = `<!doctype html><html><head><title>API response tutorial</title></head><body>
<p id="status">Loading user</p>
<script>
  fetch('/user-data.json').then((response) => response.json()).then((user) => {
    document.querySelector('#status').textContent = user.name;
  });
</script></body></html>`;

const consolePage = `<!doctype html><html><head><title>CDP tutorial</title></head><body>
<button id="myButton" type="button">Log message</button>
<script>document.querySelector('#myButton').addEventListener('click', () => console.log('Button clicked!'));</script>
</body></html>`;

const scrollingPage = `<!doctype html><html><head><title>Scrolling tutorial</title>
<style>body { margin: 0; } .card { box-sizing: border-box; height: 100px; padding: 20px; }</style></head><body>
<main id="card-container"></main>
<script>
  const container = document.querySelector('#card-container');
  let count = 0;
  let loading = false;
  function appendCards() {
    for (let offset = 0; offset < 10 && count < 30; offset += 1) {
      count += 1;
      const card = document.createElement('article');
      card.className = 'card';
      card.append(document.createTextNode('Card ' + count));
      if (count === 27) {
        const note = document.createElement('span');
        note.textContent = 'Congratulations, you found the lucky card!';
        card.append(note);
      }
      container.append(card);
    }
    loading = false;
  }
  setTimeout(appendCards, 1000);
  addEventListener('scroll', () => {
    if (!loading && count > 0 && count < 30 && innerHeight + scrollY >= document.documentElement.scrollHeight - 5) {
      loading = true;
      setTimeout(appendCards, 50);
    }
  });
</script></body></html>`;

let executable = "";
let server: Server;
let baseUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((request, response) => {
    if (request.url === "/user-data.json") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ name: "Zendriver", role: "browser automation" }));
      return;
    }
    const body = request.url === "/api-request"
      ? apiPage
      : request.url === "/console"
        ? consolePage
        : request.url === "/scrollable-cards"
          ? scrollingPage
          : loginPage;
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(body);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

for (const [parameter, headless, ids] of [
  ["headless0", true, ["ZDTEST-0084", "ZDTEST-0086", "ZDTEST-0088", "ZDTEST-0090", "ZDTEST-0092", "ZDTEST-0094", "ZDTEST-0096", "ZDTEST-0098", "ZDTEST-0100"]],
  ["headless1", false, ["ZDTEST-0085", "ZDTEST-0087", "ZDTEST-0089", "ZDTEST-0091", "ZDTEST-0093", "ZDTEST-0095", "ZDTEST-0097", "ZDTEST-0099", "ZDTEST-0101"]],
] as const) {
  test(`${ids[0]} account tutorial opens the controlled login page [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/login`);
      assert.equal((await page.updateTarget()).title, "Account tutorial");
      assert.equal(new URL(page.url).pathname, "/login");
    });
  });

  test(`${ids[1]} account tutorial signs up and logs in [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/login`);
      const signUpLink = (await page.selectAll("a")).find((element) => element.text.includes("Sign up"));
      assert.ok(signUpLink);
      await signUpLink.click();
      await (await page.select("#signupName")).sendKeys("John Doe");
      await (await page.select("#signupEmail")).sendKeys("john.doe@example.com");
      await (await page.select("#signupPassword")).sendKeys("securepassword");
      const signUpButton = (await page.selectAll("button")).find((element) => element.text.includes("Sign Up"));
      assert.ok(signUpButton);
      await signUpButton.click();
      await (await page.find("Proceed to Login")).click();
      await (await page.select("#loginEmail")).sendKeys("john.doe@example.com");
      await (await page.select("#loginPassword")).sendKeys("securepassword");
      const loginButton = (await page.selectAll("button")).find((element) => element.text === "Login");
      assert.ok(loginButton);
      await loginButton.click();
      assert.match(await (await page.select("#message")).getText(), /^Welcome back/);
    });
  });

  test(`${ids[2]} API tutorial opens the request page [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/api-request`);
      assert.equal((await page.updateTarget()).title, "API response tutorial");
    });
  });

  test(`${ids[3]} API tutorial reads the matching response body [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = browser.mainTab;
      assert.ok(page);
      const expectation = page.expectResponse(".*/user-data\\.json");
      await expectation.ready;
      const responseBody = expectation.responseBody;
      await page.get(`${baseUrl}/api-request`);
      const [body, base64Encoded] = await responseBody;
      assert.equal(base64Encoded, false);
      const user = JSON.parse(body) as { readonly name: string };
      assert.equal(user.name, "Zendriver");
      await expectation.cancel();
    });
  });

  test(`${ids[4]} CDP tutorial enables Runtime through typed commands [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/console`);
      await page.send("Runtime.enable");
      await page.send("Runtime.enable");
      assert.equal(page.manuallyEnabledDomains.has("Runtime"), true);
    });
  });

  test(`${ids[5]} CDP tutorial receives the button console event [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/console`);
      await page.send("Runtime.enable");
      await page.send("Runtime.enable");
      const messages: string[] = [];
      const handler: TabEventHandler = (params): void => {
        const event = params as Protocol.Runtime.Events.ConsoleAPICalledEvent;
        messages.push(`Console message: ${event.type} - ${event.args.map((argument) => String(argument.value)).join(", ")}`);
      };
      page.addHandler("Runtime.consoleAPICalled", handler);
      page.addHandler("Runtime.consoleAPICalled", handler);
      await (await page.select("#myButton")).click();
      await waitUntil(() => messages.includes("Console message: log - Button clicked!"), 5_000);
      page.removeHandlers("Runtime.consoleAPICalled", handler);
      page.removeHandlers("Runtime.consoleAPICalled", handler);
      assert.ok(messages.includes("Console message: log - Button clicked!"));
    });
  });

  test(`${ids[6]} scrolling tutorial starts with no cards [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/scrollable-cards`);
      assert.deepEqual((await page.select("#card-container")).children, []);
    });
  });

  test(`${ids[7]} scrolling tutorial reads the first ten cards [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/scrollable-cards`);
      const cards = await waitForCards(page, 0);
      assert.deepEqual(cards.map((card) => card.text), Array.from({ length: 10 }, (_value, index) => `Card ${index + 1}`));
    });
  });

  test(`${ids[8]} scrolling tutorial finds lucky card 27 after three batches [${parameter}]`, { timeout: 120_000 }, async () => {
    await usingRuntimeMatrix(headless, async (browser) => {
      const page = await browser.get(`${baseUrl}/scrollable-cards`);
      let cards = await waitForCards(page, 0);
      const loadedCounts = [cards.length];
      let luckyCard = findLuckyCard(cards);
      while (luckyCard === undefined) {
        await page.scrollDown(1000);
        cards = await waitForCards(page, cards.length);
        loadedCounts.push(cards.length);
        luckyCard = findLuckyCard(cards);
      }
      assert.deepEqual(loadedCounts, [10, 20, 30]);
      assert.equal(cards.indexOf(luckyCard) + 1, 27);
      assert.equal(luckyCard.text, "Card 27");
    });
  });
}

async function waitForCards(page: Tab, initialCount: number): Promise<readonly Element[]> {
  let cards: readonly Element[] = [];
  await waitUntil(async () => {
    cards = (await page.select("#card-container")).children;
    return cards.length > initialCount;
  }, 5_000);
  return cards;
}

function findLuckyCard(cards: readonly Element[]): Element | undefined {
  return cards.find((card) => card.textAll.includes("Congratulations, you found the lucky card!"));
}

async function waitUntil(predicate: () => boolean | Promise<boolean>, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!await predicate() && Date.now() < deadline) await new Promise<void>((resolve) => setTimeout(resolve, 25));
  assert.equal(await predicate(), true, `condition was not met within ${timeoutMs}ms`);
}

async function usingRuntimeMatrix(headless: boolean, action: (browser: Browser) => Promise<void>): Promise<void> {
  for (const [backend, backendFactory] of [["js", undefined], ["native", NativeConnection]] satisfies readonly [string, RuntimeBackendFactory | undefined][]) {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({
        executable,
        headless,
        connectionMode,
        ...(backendFactory === undefined ? {} : { backend: backendFactory }),
      });
      try {
        await action(browser);
      } catch (error) {
        assert.fail(`${backend}/${connectionMode}: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
      } finally {
        await browser.stop();
      }
    }
  }
}
