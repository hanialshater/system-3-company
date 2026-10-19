// EDD-004 C4: phone-class draw time for draw-a-table-knot (Playwright Chromium, CDP CPU throttling 4x).
// Part A: the lesson's exact kit calls, loaded as ES modules from src/kit/knots (served by page.route).
// Usage (repo root, a build served by tools/serve.sh): BASE=http://localhost:<port> node company/reviews/draw-a-table-knot/c4-timing.mjs [rate]
// Part B: the built lesson: tap a crossing -> readout updated, wall time.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const { chromium } = require("@playwright/test");
const KIT = path.resolve("src/kit/knots"); // run from the repo root
const RATE = Number(process.argv[2] || 4);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.route("http://kit.local/**", (route) => {
  const u = new URL(route.request().url());
  if (u.pathname === "/") return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>c4</title>" });
  const f = path.join(KIT, u.pathname);
  return route.fulfill({ contentType: "text/javascript", body: fs.readFileSync(f, "utf8") });
});
await page.goto("http://kit.local/");
const cdp = await ctx.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: RATE });
const res = await page.evaluate(async () => {
  const t0 = performance.now();
  const K = await import("http://kit.local/index.mjs");
  const importMs = performance.now() - t0;
  const out = { importMs };
  const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };
  for (const n of ["6_1", "5_2"]) {
    const pd = K.knot(n).pd;
    let t = performance.now(); const L = K.layout(pd); const firstLayout = performance.now() - t;
    t = performance.now(); K.draw(pd, { layout: L, gap: 0.5 }); const firstDraw = performance.now() - t;
    t = performance.now(); K.identify(pd); const firstIdentify = performance.now() - t;
    const lay = [], dr = [], tap = [], idf = [];
    for (let r = 0; r < 20; r++) {
      t = performance.now(); K.layout(pd); lay.push(performance.now() - t);
      t = performance.now(); K.draw(pd, { layout: L, gap: 0.5 }); dr.push(performance.now() - t);
      const i = r % pd.length;
      t = performance.now(); const q = K.crossingChange(pd, i); K.draw(q, { layout: L, gap: 0.5 }); K.crossingCount(q); tap.push(performance.now() - t);
      t = performance.now(); K.identify(q); idf.push(performance.now() - t);
    }
    out[n] = {
      firstLayout, firstDraw, firstIdentify,
      layoutMedian: med(lay), layoutMax: Math.max(...lay),
      drawMedian: med(dr), drawMax: Math.max(...dr),
      tapDrawMedian: med(tap), tapDrawMax: Math.max(...tap),
      identifyMedian: med(idf), identifyMax: Math.max(...idf),
    };
  }
  return out;
});
// Part B: in-lesson tap latency.
const lesson = await ctx.newPage();
const cdp2 = await ctx.newCDPSession(lesson);
await lesson.goto("" + (process.env.BASE || "http://localhost:3539") + "/d/draw-a-table-knot");
await cdp2.send("Emulation.setCPUThrottlingRate", { rate: RATE });
await lesson.locator('[data-testid="predict-option"]').nth(0).click();
await lesson.locator('[data-testid="commit-prediction"]').click();
const taps = [];
for (let i = 0; i < 6; i++) {
  const ms = await lesson.evaluate(async (i) => {
    const b = document.querySelectorAll('[data-testid="stage"] button[aria-label^="Crossing"]')[i];
    const now = document.querySelector('[data-testid="stage"] p[aria-live]');
    const before = now.textContent + document.querySelector('[data-testid="stage"] svg').innerHTML.length;
    const t = performance.now();
    b.click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return { ms: performance.now() - t, changed: now.textContent + document.querySelector('[data-testid="stage"] svg').innerHTML.length !== before };
  }, i);
  taps.push(ms);
}
// Chip change = mount of the other knot's picture from its stored layout (layouts computed once on mount).
const chip = await lesson.evaluate(async () => {
  const b = [...document.querySelectorAll('[data-testid="stage"] button')].find((x) => x.textContent === "5₂");
  const t = performance.now(); b.click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return performance.now() - t;
});
console.log(JSON.stringify({ cpuThrottle: RATE, kit: res, lessonTapToPaintMs: taps, lessonChipToPaintMs: chip }, null, 1));
await browser.close();
