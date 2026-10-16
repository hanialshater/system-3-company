// design-lead S4 probe for tricolour-check, record: ../2026-10-16-tricolour-check-s4.md
// Run from the repo root against a running build: BASE=http://localhost:<port> node <this file> ['<css override>']
// Adapted from ../2026-10-16-draw-a-table-knot-s4/fit-probe.mjs. The board is a square with all stage text inside the
// SVG, so explore height does not depend on the readout; it does depend on the chip row wrapping.
// (1) Explore at 390x844 / 360x740 / 360x640, on 3_1 (seen line) and 4_1 after Check all (census line): stage window,
//     content, overflow, chip-row hidden px, board px, smallest SVG text px (floor 10, system.md W-289), label spacing.
// (2) Reveal on the QA path for each predict option at the three sizes: stage-top crop, slack, words, picture px.
// SCHEME=dark for the dark theme (default light). Screenshots go to artifacts/design-s4-tri/ (not committed).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = (process.env.BASE || "http://localhost:3611") + "/d/tricolour-check";
const OUT = "artifacts/design-s4-tri";
mkdirSync(OUT, { recursive: true });
const OPTS = ["Yes", "No", "Only with two colours"];
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
  await page.waitForTimeout(300);
  return { ctx, page };
}
const press = async (page, name) => { await page.getByRole("button", { name, exact: true }).click(); await page.waitForTimeout(150); };
const geo = (page) => page.evaluate(() => {
  const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[viewBox]"), board = svg.parentElement;
  const row = stage.querySelector(".row");
  const sb = stage.getBoundingClientRect(), bw = board.getBoundingClientRect().width;
  const texts = [...svg.querySelectorAll("text")].map((t) => parseFloat(getComputedStyle(t).fontSize) * bw / 116);
  const hits = [...board.querySelectorAll("button:not([hidden])")].map((b) => b.getBoundingClientRect());
  let minHitGap = 999;
  for (let i = 0; i < hits.length; i++) for (let j = i + 1; j < hits.length; j++)
    minHitGap = Math.min(minHitGap, Math.round(Math.hypot(hits[i].x - hits[j].x, hits[i].y - hits[j].y)));
  const rb = row ? row.getBoundingClientRect() : null;
  return { boardW: Math.round(bw), window: Math.round(stage.clientHeight), content: stage.scrollHeight, overflow: stage.scrollHeight - stage.clientHeight,
    rowLines: rb ? Math.round(rb.height / 44) : 0, rowHiddenPx: rb ? Math.max(0, Math.round(rb.bottom - sb.bottom)) : null,
    minTextPx: +Math.min(...texts).toFixed(1), labelCentreGapPx: minHitGap };
});
console.log("FIX:", FIX || "(none)", "scheme:", SCHEME);
for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  // The panel's "You said <option>" line wraps differently per option, which moves the stage window.
  const { ctx, page } = await open(w, h, o);
  await press(page, "Arc 1, colour A"); await press(page, "Arc 2, colour A");
  console.log(`${w}x${h} opt${o + 1} explore 3_1 (B,C,A)`, JSON.stringify(await geo(page)));
  if (o === 2) await page.screenshot({ path: `${OUT}/explore-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  await press(page, "Arc 1, colour A"); await press(page, "Arc 2, colour A");
  await press(page, "Plain loop"); await press(page, "Figure-eight, 4₁");
  await page.getByRole("button", { name: "Check all" }).click(); await page.waitForTimeout(150);
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => {
    const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[viewBox]");
    const body = document.querySelector(".card-body") || stage.parentElement;
    const bb = body.getBoundingClientRect();
    const rev = [...document.querySelectorAll("p")].filter((p) => /tell the two apart/.test(p.textContent)).pop();
    const words = (document.querySelector(".reveal") || rev.parentElement).innerText.split(/\s+/).filter(Boolean).length;
    return { stageTopCrop: Math.max(0, Math.round(bb.top - stage.getBoundingClientRect().top)), slackPx: Math.round(bb.bottom - rev.getBoundingClientRect().bottom),
      bodyScroll: body.scrollHeight - body.clientHeight, picW: Math.round(svg.getBoundingClientRect().width), rowShown: !!stage.querySelector(".row"), words };
  });
  console.log(`${w}x${h} opt${o + 1} reveal`, JSON.stringify(m));
  if (o === 0) await page.screenshot({ path: `${OUT}/reveal-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
await browser.close();
