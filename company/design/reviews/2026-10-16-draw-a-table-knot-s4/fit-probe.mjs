// design-lead S4 probe for draw-a-table-knot (W-1588), record: ../2026-10-16-draw-a-table-knot-s4.md
// Run from the repo root against a running build: BASE=http://localhost:<port> node <this file> ['<css override>']
// (1) Try a height-aware board width at 360x740 / 360x640 / 390x844 for each predict option, worst readout (0_1).
// (2) Reveal variants at 390x844: last switch 4_1 vs 0_1, each predict option.
import { chromium } from "@playwright/test";
const OUT = process.env.OUT || "artifacts/design-s4"; // screenshots (not committed)
const base = (process.env.BASE || "http://localhost:3588") + "/d/draw-a-table-knot"; // a running build
const OPTS = ["The crossings in any drawing of it", "The fewest crossings any drawing of it can have", "The loops in the rope"];
const FIX = process.argv[2] || "";
const browser = await chromium.launch();
async function open(w, h, opt) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  if (FIX) await page.addStyleTag({ content: FIX });
  await page.getByRole("button", { name: OPTS[opt], exact: true }).click();
  await page.getByRole("button", { name: /Lock it in/ }).click();
  await page.waitForTimeout(300);
  return { ctx, page };
}
const geo = (page) => page.evaluate(() => {
  const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[viewBox]"), board = svg.parentElement;
  const row = stage.querySelector(".row"), now = stage.querySelector("p[aria-live]");
  const sb = stage.getBoundingClientRect();
  const nb = now.getBoundingClientRect(), rb = row.getBoundingClientRect();
  const hits = [...board.querySelectorAll("button")].map((b) => b.getBoundingClientRect());
  const hitsOverText = hits.filter((h) => (h.bottom > nb.top && h.top < nb.bottom) || (h.bottom > rb.top && h.top < rb.bottom)).length;
  return { hitsOverText, boardW: Math.round(board.getBoundingClientRect().width), stageH: Math.round(sb.height), contentH: stage.scrollHeight,
    overflow: stage.scrollHeight - stage.clientHeight, rowHiddenPx: Math.max(0, Math.round(row.getBoundingClientRect().bottom - sb.bottom)),
    nowLines: Math.round(now.getBoundingClientRect().height / parseFloat(getComputedStyle(now).lineHeight)) };
});
console.log("FIX:", FIX || "(none)");
for (const [w, h] of [[390, 844], [360, 740], [360, 640]]) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  await page.getByRole("button", { name: "Crossing 2" }).click(); // 6_1 crossing 2 -> 0_1, the longest readout
  await page.waitForTimeout(200);
  console.log(`${w}x${h} opt${o + 1} explore(0_1)`, JSON.stringify(await geo(page)));
  await ctx.close();
}
// Reveal variants at 390x844 and 360x740
for (const [w, h] of [[390, 844], [360, 740]]) for (let o = 0; o < 3; o++) for (const cr of ["Crossing 1", "Crossing 2"]) {
  const { ctx, page } = await open(w, h, o);
  await page.getByRole("button", { name: cr, exact: true }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(700);
  const m = await page.evaluate(() => {
    const stage = document.querySelector(".stage"), svg = stage.querySelector("svg[viewBox]");
    const body = document.querySelector(".card-body") || stage.parentElement;
    const bb = body.getBoundingClientRect();
    const rev = [...document.querySelectorAll("p")].filter((p) => /second number/.test(p.textContent)).pop();
    const words = (document.querySelector(".reveal") || rev.parentElement).innerText.split(/\s+/).filter(Boolean).length;
    return { stageTopCrop: Math.max(0, Math.round(bb.top - stage.getBoundingClientRect().top)), revealLastLineBelow: Math.round(rev.getBoundingClientRect().bottom - bb.bottom),
      slackPx: Math.round(bb.bottom - rev.getBoundingClientRect().bottom), bodyScroll: body.scrollHeight - body.clientHeight, picW: Math.round(svg.getBoundingClientRect().width), words };
  });
  console.log(`${w}x${h} opt${o + 1} reveal after ${cr}`, JSON.stringify(m));
  if (w === 390 && o === 1 && cr === "Crossing 2") await page.screenshot({ path: `${OUT}/reveal-390-right-loop${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
await browser.close();
