// design-lead probe for the left-or-right v2 departures ruling, record: ../2026-10-17-left-or-right-v2-departures.md
// Run from the repo root against a served build of main: BASE=http://localhost:<port> node <this file> ['<css override>']
// For every predict option at 390x844 / 360x740 / 360x640, after the commit and again after Turn over:
//   need   = Turn over/Mirror bottom - readout top (px the learner must see at once)
//   window = the stage's visible height (clipped to the viewport)
//   together = need <= window (both fit, whatever the stage's scroll)
//   picW, the gap from the lowest drawn strand to the top of the control row (visual separation),
//   and whether the chip row is reachable by scrolling.
// Also, at the reveal on each ending: whether any Turn over / Mirror button exists in the DOM (D2 unmount).
import { createRequire } from "module";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const { chromium } = require("@playwright/test");
const base = (process.env.BASE || "http://localhost:3647") + "/d/left-or-right";
const OPTS = ["Yes, wiggle it", "No, never", "Only by picking it up and turning it over"];
const FIX = process.argv[2] || "";
const SCHEME = process.env.SCHEME || "light";
const SIZES = [[390, 844], [360, 740], [360, 640]];
const browser = await chromium.launch();
async function open(w, h, opt) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, colorScheme: SCHEME });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  if (FIX) await page.addStyleTag({ content: FIX });
  await page.getByRole("button", { name: OPTS[opt], exact: true }).click();
  await page.getByRole("button", { name: /Lock it in/ }).click();
  await page.waitForTimeout(400);
  return { ctx, page };
}
const geo = (page) => page.evaluate(() => {
  const st = document.querySelector("[data-testid=stage]"), s = st.getBoundingClientRect();
  const winTop = Math.max(s.top, 0), winBot = Math.min(s.bottom, innerHeight);
  const rd = st.querySelector("[role=status]").getBoundingClientRect();
  const btns = [...st.querySelectorAll("button")];
  const t = btns.find((x) => x.textContent.trim() === "Turn over").getBoundingClientRect();
  const m = btns.find((x) => x.textContent.trim() === "Mirror").getBoundingClientRect();
  const pic = st.querySelector("[role=img]").getBoundingClientRect();
  // lowest painted strand on the visible face (front or back, whichever is not hidden)
  let strandBot = -1;
  for (const p of st.querySelectorAll("svg path")) { const r = p.getBoundingClientRect(); if (r.height > 0) strandBot = Math.max(strandBot, r.bottom); }
  const rows = [...st.querySelectorAll(".row")];
  return {
    picW: Math.round(pic.width), need: Math.round(Math.max(t.bottom, m.bottom) - rd.top), window: Math.round(winBot - winTop),
    together: Math.max(t.bottom, m.bottom) - rd.top <= winBot - winTop + 0.5,
    strandToRow: Math.round(Math.min(t.top, m.top) - strandBot), picBoxToRow: Math.round(Math.min(t.top, m.top) - pic.bottom),
    rowGap: rows.length > 1 ? Math.round(rows[1].getBoundingClientRect().top - rows[0].getBoundingClientRect().bottom) : null,
    overflow: st.scrollHeight - st.clientHeight,
  };
});
console.log("FIX:", FIX || "(none)", "scheme:", SCHEME);
for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  const a = await geo(page);
  await page.getByRole("button", { name: "Turn over", exact: true }).click();
  await page.waitForTimeout(700);
  await page.evaluate(() => { document.querySelector("[data-testid=stage]").scrollTop = 0; });
  const b = await geo(page);
  console.log(`${w}x${h} opt${o + 1} fresh`, JSON.stringify(a));
  console.log(`${w}x${h} opt${o + 1} turned`, JSON.stringify(b));
  if (o === 1 && w === 360 && h === 640) {
    // smallest stage scroll that shows the controls, then: is the readout still whole?
    await page.evaluate(() => {
      const st = document.querySelector("[data-testid=stage]");
      const m = [...st.querySelectorAll("button")].find((x) => x.textContent.trim() === "Mirror");
      const over = m.getBoundingClientRect().bottom - Math.min(st.getBoundingClientRect().bottom, innerHeight);
      if (over > 0) st.scrollTop += Math.ceil(over);
    });
    const c = await page.evaluate(() => {
      const st = document.querySelector("[data-testid=stage]"), s = st.getBoundingClientRect();
      const rd = st.querySelector("[role=status]").getBoundingClientRect();
      return { scrollTop: st.scrollTop, readoutTop: Math.round(rd.top), windowTop: Math.round(Math.max(s.top, 0)), readoutWhole: rd.top >= Math.max(s.top, 0) - 0.5 };
    });
    console.log(`${w}x${h} opt${o + 1} scrolled-to-controls`, JSON.stringify(c));
    await page.screenshot({ path: `artifacts/design-v2d-lor/360x640-scrolled-${SCHEME}${FIX ? "-fix" : ""}.png` });
  }
  await ctx.close();
}
for (const steps of [["Turn over", "Mirror"], ["Turn over", "Mirror", "Figure-eight", "Mirror"]]) {
  const { ctx, page } = await open(390, 844, 1);
  for (const s of steps) { await page.getByRole("button", { name: s, exact: true }).click(); await page.waitForTimeout(700); }
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(900);
  const r = await page.evaluate(() => ({
    toggleButtonsInDom: [...document.querySelectorAll("button")].filter((x) => /^(Turn over|Mirror)$/.test(x.textContent.trim())).length,
    chipButtons: [...document.querySelectorAll("[data-testid=stage] button")].map((x) => x.textContent.trim()),
  }));
  console.log(`reveal ${steps.join(">")}`, JSON.stringify(r));
  await ctx.close();
}
await browser.close();
