// design-lead S4 probe for left-or-right, record: ../2026-10-17-left-or-right-s4.md
// Run from the repo root against a running build: BASE=http://localhost:<port> node <this file> ['<css override>']
// Adapted from ../2026-10-16-tricolour-check-s4/fit-probe.mjs. SCHEME=dark for the dark theme (default light).
// (1) Explore at 390x844 / 360x740 / 360x640, each predict option, after Turn over (seen line showing):
//     picture px (the .pic box, viewBox 116 wide) and px per unit, stage window / content / overflow, how far the
//     second control row sits below the window.
// (2) Reveal at the three sizes, each option, three endings: "qa-path" (Turn over, Mirror, Figure-eight),
//     "stay-trefoil" (Turn over, Mirror) and "eight-mirror" (qa-path, then Mirror on 4_1: the other reveal branch).
//     Stage-top crop, slack below the last line, words, picture px.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = (process.env.BASE || "http://localhost:3622") + "/d/left-or-right";
const OUT = "artifacts/design-s4-lor";
mkdirSync(OUT, { recursive: true });
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
  await page.waitForTimeout(300);
  return { ctx, page };
}
const press = async (page, name) => { await page.getByRole("button", { name, exact: true }).click(); await page.waitForTimeout(700); };
const geo = (page) => page.evaluate(() => {
  const stage = document.querySelector(".stage"), pic = stage.querySelector("[role=img]");
  const rows = [...stage.querySelectorAll(".row")], sb = stage.getBoundingClientRect();
  const pw = pic.getBoundingClientRect().width;
  return { picW: Math.round(pw), pxPerUnit: +(pw / 116).toFixed(2), window: Math.round(stage.clientHeight), content: stage.scrollHeight,
    overflow: stage.scrollHeight - stage.clientHeight, lastRowHiddenPx: Math.max(0, Math.round(rows.at(-1).getBoundingClientRect().bottom - sb.bottom)) };
});
console.log("FIX:", FIX || "(none)", "scheme:", SCHEME);
for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  await press(page, "Turn over");
  console.log(`${w}x${h} opt${o + 1} explore turned`, JSON.stringify(await geo(page)));
  if (o === 0) await page.screenshot({ path: `${OUT}/explore-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
const ENDINGS = { "qa-path": ["Turn over", "Mirror", "Figure-eight"], "stay-trefoil": ["Turn over", "Mirror"], "eight-mirror": ["Turn over", "Mirror", "Figure-eight", "Mirror"] };
for (const [ending, steps] of Object.entries(ENDINGS)) for (const [w, h] of SIZES) for (let o = 0; o < 3; o++) {
  const { ctx, page } = await open(w, h, o);
  for (const s of steps) await press(page, s);
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(900);
  const m = await page.evaluate(() => {
    const stage = document.querySelector(".stage"), pic = stage.querySelector("[role=img]");
    const body = document.querySelector(".card-body") || stage.parentElement;
    const bb = body.getBoundingClientRect();
    const rev = [...document.querySelectorAll("p")].filter((p) => /turning one over|never swaps|mirror image/.test(p.textContent) && !p.closest(".stage")).pop();
    const words = (document.querySelector(".reveal") || rev.parentElement).innerText.split(/\s+/).filter(Boolean).length;
    return { stageTopCrop: Math.max(0, Math.round(bb.top - stage.getBoundingClientRect().top)), slackPx: Math.round(bb.bottom - rev.getBoundingClientRect().bottom),
      bodyScroll: body.scrollHeight - body.clientHeight, picW: Math.round(pic.getBoundingClientRect().width), words };
  });
  console.log(`${w}x${h} opt${o + 1} reveal ${ending}`, JSON.stringify(m));
  if (o === 1) await page.screenshot({ path: `${OUT}/reveal-${ending}-${w}x${h}-${SCHEME}${FIX ? "-fix" : ""}.png` });
  await ctx.close();
}
await browser.close();
