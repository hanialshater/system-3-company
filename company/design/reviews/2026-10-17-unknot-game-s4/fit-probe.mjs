// design-lead S4 probe for unknot-game, record: ../2026-10-17-unknot-game-s4.md
// Run from the repo root against a running build: BASE=http://localhost:<port> node <this file> ['<css override>']
// Adapted from ../2026-10-16-tricolour-check-s4/fit-probe.mjs. SCHEME=dark for the dark theme (default light).
// (1) Explore at 390x844 / 360x740 / 360x640 for each predict option, on the busiest frame (trefoil crossing 1
//     switched: readout + caption + tally): stage window, content, overflow, control row below the window, board px.
// (2) Reveal at the three sizes, each option, two endings: the QA path (crossings 1-3, Reset, Figure-eight) and
//     "a switch left on" (crossings 1-3, crossing 3 still switched, so the caption line is showing at the reveal).
//     Stage-top crop, slack below the last line, words, picture px.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = (process.env.BASE || "http://localhost:3622") + "/d/unknot-game";
const OUT = "artifacts/design-s4-unk";
mkdirSync(OUT, { recursive: true });
const OPTS = ["1", "2", "3"];
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
const press = async (page, name) => { await page.getByRole("button", { name, exact: true }).click(); await page.waitForTimeout(200); };
const geo = (page) => page.evaluate(() => {
  const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[role=img]"), board = svg.parentElement;
  const row = stage.querySelector(".row");
  const sb = stage.getBoundingClientRect(), rb = row.getBoundingClientRect();
  return { boardW: Math.round(board.getBoundingClientRect().width), window: Math.round(stage.clientHeight), content: stage.scrollHeight,
    overflow: stage.scrollHeight - stage.clientHeight, rowLines: Math.round(rb.height / 44), rowHiddenPx: Math.max(0, Math.round(rb.bottom - sb.bottom)) };
});
console.log("FIX:", FIX || "(none)", "scheme:", SCHEME);
for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  await press(page, "Crossing 1: switch");
  console.log(`${w}x${h} opt${o + 1} explore 3_1 c1`, JSON.stringify(await geo(page)));
  if (o === 0) await page.screenshot({ path: `${OUT}/explore-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
for (const ending of ["qa-path", "switch-left-on"]) for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  for (const c of [1, 2, 3]) await press(page, `Crossing ${c}: switch`);
  if (ending === "qa-path") { await press(page, "Reset"); await press(page, "Figure-eight"); }
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => {
    const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[role=img]");
    const body = document.querySelector(".card-body") || stage.parentElement;
    const bb = body.getBoundingClientRect();
    const rev = [...document.querySelectorAll("p")].filter((p) => /more than one/.test(p.textContent)).pop();
    const words = (document.querySelector(".reveal") || rev.parentElement).innerText.split(/\s+/).filter(Boolean).length;
    return { stageTopCrop: Math.max(0, Math.round(bb.top - stage.getBoundingClientRect().top)), slackPx: Math.round(bb.bottom - rev.getBoundingClientRect().bottom),
      bodyScroll: body.scrollHeight - body.clientHeight, picW: Math.round(svg.getBoundingClientRect().width), words };
  });
  console.log(`${w}x${h} opt${o + 1} reveal ${ending}`, JSON.stringify(m));
  if (o === 0) await page.screenshot({ path: `${OUT}/reveal-${ending}-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
await browser.close();
