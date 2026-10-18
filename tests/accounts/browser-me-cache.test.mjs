// MC2 (principal review 2026-10-18 F1): with accounts off, a reload inside 5 minutes makes no second network request
// for /api/account/me; the browser answers it from its cache (the 404 says max-age=300 and the client's first ask
// uses the HTTP cache). Real Chromium, against a running build with accounts off. Skips unless both are set:
//   ACCOUNTS_BASE_URL=http://localhost:3191 ACCOUNTS_EXPECT=off ACCOUNTS_BROWSER=1 npm run test:accounts
// (PW_CHROMIUM_PATH picks the browser binary, as in playwright.config.ts.)
import test from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.ACCOUNTS_BASE_URL;
const skip = !BASE ? "set ACCOUNTS_BASE_URL to a running build" : process.env.ACCOUNTS_EXPECT !== "off" ? "ACCOUNTS_EXPECT is not off" : !process.env.ACCOUNTS_BROWSER ? "set ACCOUNTS_BROWSER=1 to run the browser check" : false;

test("34. MC2: accounts off, a reload makes no second network request for /api/account/me", { skip, timeout: 60_000 }, async () => {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined });
  try {
    const page = await browser.newPage();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Network.enable");
    const ids = new Map(); // requestId -> url
    const fromCache = new Set();
    const fromNetwork = [];
    cdp.on("Network.requestWillBeSent", (e) => ids.set(e.requestId, e.request.url));
    cdp.on("Network.requestServedFromCache", (e) => fromCache.add(e.requestId));
    cdp.on("Network.responseReceived", (e) => {
      if (!e.response.url.includes("/api/account/me")) return;
      if (e.response.fromDiskCache || e.response.fromPrefetchCache || fromCache.has(e.requestId)) fromCache.add(e.requestId);
      else fromNetwork.push({ status: e.response.status, cacheControl: e.response.headers["cache-control"] });
    });
    const meSeen = () => [...ids.values()].filter((u) => u.includes("/api/account/me")).length;
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    assert.equal(meSeen(), 1, "the first load asks once");
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    assert.equal(fromNetwork.length, 1, `only the first load reached the server: ${JSON.stringify(fromNetwork)}`);
    assert.equal(fromNetwork[0].status, 404);
    assert.match(fromNetwork[0].cacheControl ?? "", /max-age=300/);
    // Control: the counter does see a network hit (what the old cache: "no-store" first ask did on every load).
    await page.evaluate(() => fetch("/api/account/me", { cache: "no-store" }));
    await page.waitForTimeout(500);
    assert.equal(fromNetwork.length, 2, "control: a no-store ask reaches the server");
    const cookies = await page.context().cookies();
    assert.deepEqual(cookies, [], "no cookie set with accounts off");
  } finally {
    await browser.close();
  }
});
