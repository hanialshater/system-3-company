// demo-builder v3 probe for W-1619 (cm-math-discrete ruling company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md,
// "Test"): which reveal opener each path gets, and the reveal's phone fit on that path.
// Run from the repo root against a served build:
//   BASE=http://localhost:<port> [W=390 H=844] node company/reviews/left-or-right/v3-opener-probe.mjs
// Paths (predict option 1, then the stage buttons in order, then "Show me why"):
//   mirror-then-turn  Mirror, Turn over                       -> branch opener ("Turning the mirrored trefoil over ...")
//   turn-then-mirror  Turn over, Mirror (contract order)      -> standard opener ("Turning the trefoil over ...")
//   mirror-turn-x2    Mirror, Turn over, Mirror, Turn over    -> standard opener (plain turned reached on the 4th press)
// Fit numbers come from tools/reveal-fit.mjs's own in-page measure(), read from the committed file and run unchanged,
// because reveal-fit itself only follows the QA contract path (index order, which is turn-then-mirror).
// Exit 1 if any path gets the wrong opener.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const pw = require("@playwright/test");
const BASE = (process.env.BASE || "http://localhost:3631") + "/d/left-or-right";
const W = Number(process.env.W || 390), H = Number(process.env.H || 844);
const src = fs.readFileSync("tools/reveal-fit.mjs", "utf8");
const start = src.indexOf("function measure() {");
const end = src.indexOf("\n}\n", start);
if (start < 0 || end < 0) throw new Error("measure() not found in tools/reveal-fit.mjs");
const measureSrc = src.slice(start, end + 2);
const BRANCH = "Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right.";
const STANDARD = "Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left.";
const PATHS = {
  "mirror-then-turn": [["Mirror", "Turn over"], BRANCH],
  "turn-then-mirror": [["Turn over", "Mirror"], STANDARD],
  "mirror-turn-x2": [["Mirror", "Turn over", "Mirror", "Turn over"], STANDARD],
};
const b = await pw.chromium.launch();
let bad = 0;
for (const [name, [steps, want]] of Object.entries(PATHS)) {
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(400);
  for (const s of steps) {
    await page.locator("[data-testid=stage] button", { hasText: s }).click();
    await page.waitForTimeout(700);
  }
  const seen = (await page.getByTestId("seen-line").textContent()).trim();
  await page.getByTestId("reveal-button").click();
  await page.getByTestId("reveal").waitFor();
  await page.waitForTimeout(900);
  const text = (await page.getByTestId("reveal").innerText()).replace(/\s+/g, " ").trim();
  const ok = text.includes(want) && !text.includes(want === BRANCH ? STANDARD : BRANCH);
  if (!ok) bad++;
  const m = await page.evaluate(`(${measureSrc})()`);
  console.log(
    `${W}x${H} ${name}`,
    JSON.stringify({
      opener: text.includes(BRANCH) ? "branch" : text.includes(STANDARD) ? "standard" : "none",
      ok,
      seen,
      verdict: m.verdict,
      crop: m.crop,
      hiddenBelow: m.hiddenBelow,
      namedHidden: m.namedHidden,
      phoneFit: m.phoneFit,
      revealWords: m.revealWords,
      revealLines: m.revealLines,
      spare: m.windowH - m.revealH,
      picH: m.picH,
      fitted: m.fitted,
    }),
  );
  await ctx.close();
}
await b.close();
process.exit(bad ? 1 : 0);
