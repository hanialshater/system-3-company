// demo-builder v2 probe for W-1606 (QA findings 1 and 2, company/reviews/left-or-right/2026-10-16-qa.md).
// Run from the repo root against a served build: BASE=http://localhost:<port> node company/reviews/left-or-right/v2-w1606-probe.mjs
// (1) Readout and controls together: after the commit, at each size, is the readout fully inside the stage's
//     visible window while both Turn over and Mirror are fully inside it too? Measured at the stage's own
//     scroll top, after scrolling the stage just enough to show the controls (what tapping does), and after
//     a tap on Turn over (the browser's own scroll-into-view).
// (2) Order: Mirror then Turn over (state mirroredTurned) must unlock the reveal; the seen line must not
//     quote a "turned over" number it did not see. Also the contract order and Turn over alone.
import { createRequire } from "module";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const pw = require("@playwright/test");
const BASE = (process.env.BASE || "http://localhost:3631") + "/d/left-or-right";
const b = await pw.chromium.launch();
async function open(w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(400);
  return { ctx, page };
}
const geo = (page) =>
  page.evaluate(() => {
    const st = document.querySelector("[data-testid=stage]");
    const s = st.getBoundingClientRect();
    const win = { top: Math.max(s.top, 0), bottom: Math.min(s.bottom, innerHeight) };
    const inside = (r) => r.top >= win.top - 0.5 && r.bottom <= win.bottom + 0.5;
    const rd = st.querySelector("[role=status]").getBoundingClientRect();
    const btn = (n) => [...st.querySelectorAll("button")].find((x) => x.textContent.trim() === n).getBoundingClientRect();
    const t = btn("Turn over"), m = btn("Mirror");
    return {
      stageScrollTop: st.scrollTop,
      window: [Math.round(win.top), Math.round(win.bottom)],
      readout: [Math.round(rd.top), Math.round(rd.bottom)],
      turnOver: [Math.round(t.top), Math.round(t.bottom)],
      mirror: [Math.round(m.top), Math.round(m.bottom)],
      readoutOn: inside(rd),
      controlsOn: inside(t) && inside(m),
      together: inside(rd) && inside(t) && inside(m),
      gapPx: Math.round(Math.max(t.bottom, m.bottom) - rd.top),
      windowPx: Math.round(win.bottom - win.top),
    };
  });
for (const [w, h] of [[390, 844], [360, 740], [360, 640]]) {
  const { ctx, page } = await open(w, h);
  console.log(`${w}x${h} fresh`, JSON.stringify(await geo(page)));
  await page.evaluate(() => {
    const st = document.querySelector("[data-testid=stage]");
    const m = [...st.querySelectorAll("button")].find((x) => x.textContent.trim() === "Mirror");
    const over = m.getBoundingClientRect().bottom - Math.min(st.getBoundingClientRect().bottom, innerHeight);
    if (over > 0) st.scrollTop += over;
  });
  console.log(`${w}x${h} scrolled-to-controls`, JSON.stringify(await geo(page)));
  await page.locator("[data-testid=stage] button", { hasText: "Turn over" }).click();
  await page.waitForTimeout(600);
  console.log(`${w}x${h} after-tap`, JSON.stringify(await geo(page)));
  await ctx.close();
}
const ORDERS = { "mirror-then-turn": ["Mirror", "Turn over"], "contract-order": ["Turn over", "Mirror"], "turn-only": ["Turn over"], "mirror-only": ["Mirror"] };
for (const [name, steps] of Object.entries(ORDERS)) {
  const { ctx, page } = await open(390, 844);
  for (const s of steps) {
    await page.locator("[data-testid=stage] button", { hasText: s }).click();
    await page.waitForTimeout(700);
  }
  const btn = page.getByTestId("reveal-button");
  console.log(
    name,
    JSON.stringify({
      button: (await btn.textContent()).trim(),
      disabled: await btn.isDisabled(),
      seen: (await page.getByTestId("seen-line").textContent()).trim(),
      readout: (await page.locator("[data-testid=stage] [role=status]").textContent()).trim(),
    }),
  );
  await ctx.close();
}
await b.close();
