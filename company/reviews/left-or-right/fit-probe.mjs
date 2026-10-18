// Phone-fit probe for left-or-right (builder evidence): stage overflow and picture size in explore and at
// the reveal, at several phone sizes, plus a stage text-node word count at the busiest frame.
// Usage (repo root, a served build): BASE=http://localhost:<port> OUT=artifacts/fit-w1542 node company/reviews/left-or-right/fit-probe.mjs
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const { chromium } = require("@playwright/test");
const BASE = process.env.BASE || "http://localhost:3542";
const OUT = process.env.OUT || "artifacts/fit-w1542";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const sizes = [
  [390, 844],
  [360, 740],
  [375, 667],
  [1280, 800],
];
const stageInfo = (page) =>
  page.evaluate(() => {
    const st = document.querySelector("[data-testid=stage]");
    const pic = st.querySelector("[role=img]");
    const words = [];
    const walk = (n) => {
      if (n.nodeType === 3) words.push(...n.textContent.split(/\s+/).filter((w) => /\p{L}/u.test(w)));
      else if (n.nodeType === 1 && getComputedStyle(n).display !== "none" && n.getAttribute("aria-hidden") !== "true") n.childNodes.forEach(walk);
    };
    walk(st);
    return {
      clientH: st.clientHeight,
      scrollH: st.scrollHeight,
      overflowPx: st.scrollHeight - st.clientHeight,
      picW: +pic.getBoundingClientRect().width.toFixed(1),
      knotPxPerUnit: +(pic.getBoundingClientRect().width / 116).toFixed(2),
      words: words.length,
      text: words.join(" "),
    };
  });
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: w < 800, hasTouch: w < 800 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/d/left-or-right`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, `${w}x${h}-1-predict.png`) });
  await page.getByTestId("predict-option").nth(0).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(300);
  const ex = await stageInfo(page);
  const b = (t) => page.locator("[data-testid=stage] button[data-qa=control]", { hasText: t });
  await b("Turn over").click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `${w}x${h}-2-turned.png`) });
  await b("Mirror").click();
  await page.waitForTimeout(600);
  const busy = await stageInfo(page);
  await page.screenshot({ path: path.join(OUT, `${w}x${h}-3-mirrored-turned.png`) });
  await b("Figure-eight").click();
  await page.waitForTimeout(600);
  await page.getByTestId("reveal-button").click();
  await page.waitForTimeout(800);
  const rv = await stageInfo(page);
  const rev = await page.evaluate(() => {
    const st = document.querySelector("[data-testid=stage]").getBoundingClientRect();
    const r = document.querySelector("[data-testid=reveal]");
    const rb = r.getBoundingClientRect();
    return { stageTop: +st.top.toFixed(0), revealBottom: +rb.bottom.toFixed(0), vh: innerHeight, words: r.innerText.split(/\s+/).filter(Boolean).length };
  });
  await page.screenshot({ path: path.join(OUT, `${w}x${h}-4-reveal.png`) });
  console.log(JSON.stringify({ size: `${w}x${h}`, explore: { ...ex, text: undefined }, busiest: busy, reveal: { ...rv, text: undefined, ...rev } }));
  await ctx.close();
}
await browser.close();
