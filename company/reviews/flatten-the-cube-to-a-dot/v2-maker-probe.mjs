// Maker's loop probe for flatten-the-cube-to-a-dot v2 (demo-builder, W-2056; design review 2026-10-25 point 2).
// Walks every path the builder can reach, at 390x844 (touch) and 1280x800, normal motion:
//   skip        commit, Next, Next before any milestone: card 3 must say "Take the top off first", show the cube
//               readout 8 − 12 + 6 = 2, and keep both removal controls disabled; the reveal stays locked.
//               Then back to card 2 by the trail, take the top off, forward by the trail: card 3 is live.
//   skipSlice   Slice skipped, flatten and shrink done: the reveal stays locked (format question, W-2059).
//   hurry       "Take the top off" then Next at once (mid 700 ms flatten): card 3 is live at once.
//   early       reveal pressed 100 ms into the 2.4 s "Remove the rest" playback: stage snaps to the dot.
//   back        settled back navigation: a card's fingerprint is read until two readings 500 ms apart match
//               (ceiling 6 s), when leaving and after returning through the trail (the W-2047 settle rule).
//               The gap must exceed the longest step of any motion: at 200 ms two reads can land inside one
//               220 ms playback step and call a moving card settled (seen on the first run of this probe).
//   replay      W-2063: card 2's chip, now "Replay the flatten", plays the flatten again (picture moves at 150 ms) and ends where it was;
//               the line "The 5 regions are the cube's other 5 faces." is shown when the flatten is done.
//   caption     W-2063: card 1's change line reads "+2 corners, +3 edges, +1 face" with the note "1 corner gone, 3 new: +2 corners".
//   sr          the readout's screen-reader sentence at the end uses singular nouns for 1 (D2).
//   node company/reviews/flatten-the-cube-to-a-dot/v2-maker-probe.mjs <base-url>
import { chromium } from "@playwright/test";
const base = process.argv[2];
const url = `${base}/d/flatten-the-cube-to-a-dot`;
const VPS = { phone: { width: 390, height: 844 }, desktop: { width: 1280, height: 800 } };
const out = {};
let fails = 0;
const ok = (vp, name, pass, detail) => {
  if (!pass) fails++;
  console.log(`${pass ? "PASS" : "FAIL"}  ${vp.padEnd(7)} ${name.padEnd(10)} ${detail}`);
};
const b = await chromium.launch();
const fpNow = (p) =>
  p.evaluate(() => {
    const sc = [...document.querySelectorAll("[data-subcard-index]")].find((e) => !e.hidden);
    const svg = sc?.querySelector("svg[role=img]");
    return JSON.stringify({ idx: sc?.getAttribute("data-subcard-index"), text: sc?.innerText.replace(/\s+/g, " "), svg: svg?.outerHTML });
  });
async function settled(p, ceiling = 6000, gap = 500) {
  let prev = await fpNow(p);
  for (let t = 0; t < ceiling; t += gap) {
    await p.waitForTimeout(gap);
    const cur = await fpNow(p);
    if (cur === prev) return JSON.parse(cur);
    prev = cur;
  }
  return { ...JSON.parse(prev), unsettled: true };
}
const ctl = (p, name) => p.locator("[data-testid=stage] [data-qa=control]", { hasText: name }).first();
const trail = (p, i) => p.locator("[data-testid=stage] [data-qa=control]").nth(i);
const revealOn = (p) => p.locator("[data-testid=reveal-button]").isEnabled();
async function start(vp) {
  const ctx = await b.newContext({ viewport: VPS[vp], reducedMotion: "no-preference", hasTouch: vp === "phone", isMobile: vp === "phone" });
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  await p.goto(url, { timeout: 120000 });
  await p.waitForSelector("[data-testid=predict-option]", { timeout: 120000 });
  await p.locator("[data-testid=predict-option]").nth(0).click();
  await p.locator("[data-testid=commit-prediction]").click();
  await p.waitForTimeout(400);
  p.errors = errors;
  return p;
}
for (const vp of Object.keys(VPS)) {
  const r = (out[vp] = {});
  // skip
  let p = await start(vp);
  await ctl(p, "Next: Flatten").click();
  await ctl(p, "Next: Shrink").click();
  let c3 = await settled(p);
  const e1 = await ctl(p, "Remove an edge").isEnabled();
  const e2 = await ctl(p, "Remove the rest").isEnabled();
  r.skip = { text: c3.text, removeEdge: e1, removeRest: e2, reveal: await revealOn(p) };
  ok(vp, "skip", c3.idx === "2" && c3.text.includes("Take the top off first") && c3.text.includes("8 corners") && /8\s*−\s*12\s*\+\s*6|8 corners minus 12 edges plus 6 faces/.test(c3.text) && !e1 && !e2 && !r.skip.reveal,
    `card 3 inert: "${c3.text.slice(0, 120)}" edge=${e1} rest=${e2} reveal=${r.skip.reveal}`);
  await p.screenshot({ path: `artifacts/flat-shots/v2-${vp}-skip.png` }).catch(() => {});
  await trail(p, 1).click();
  await ctl(p, "Take the top off").click();
  await settled(p);
  await trail(p, 2).click();
  c3 = await settled(p);
  const live = await ctl(p, "Remove an edge").isEnabled();
  await ctl(p, "Remove an edge").click();
  await settled(p);
  await ctl(p, "Remove the rest").click();
  c3 = await settled(p);
  r.skipThen = { live, end: c3.text, reveal: await revealOn(p) };
  ok(vp, "skip-back", live && c3.text.includes("+ the top face = 2") && !r.skipThen.reveal, `after flattening via the trail: edge enabled=${live}, end line shown, reveal still locked (slice skipped)=${!r.skipThen.reveal}`);
  await trail(p, 0).click();
  await ctl(p, "Slice a corner").click();
  await settled(p);
  ok(vp, "skip-done", await revealOn(p), "slice done last via the trail: reveal unlocks");
  ok(vp, "errors", p.errors.length === 0, p.errors.join("; ") || "no page errors");
  await p.context().close();

  // replay + caption
  p = await start(vp);
  await ctl(p, "Slice a corner").click();
  const c1 = await settled(p);
  ok(vp, "caption", c1.text.includes("+2 corners, +3 edges, +1 face") && c1.text.includes("1 corner gone, 3 new: +2 corners"), `card 1: "${c1.text.slice(-70)}"`);
  await ctl(p, "Next: Flatten").click();
  await ctl(p, "Take the top off").click();
  const f0 = await settled(p);
  const rEn = await ctl(p, "Replay the flatten").isEnabled();
  await ctl(p, "Replay the flatten").click();
  await p.waitForTimeout(150);
  const fMid = JSON.parse(await fpNow(p));
  const f1 = await settled(p);
  ok(vp, "replay", rEn && fMid.svg !== f0.svg && f1.svg === f0.svg && f1.text === f0.text && f0.text.includes("The 5 regions are the cube's other 5 faces."),
    `Replay enabled=${rEn}, moving at 150 ms=${fMid.svg !== f0.svg}, ends as before=${f1.svg === f0.svg && f1.text === f0.text}, regions line shown`);
  await p.context().close();

  // hurry
  p = await start(vp);
  await ctl(p, "Slice a corner").click();
  await ctl(p, "Next: Flatten").click();
  await ctl(p, "Take the top off").click();
  await ctl(p, "Next: Shrink").click();
  const h = JSON.parse(await fpNow(p));
  const hEdge = await ctl(p, "Remove an edge").isEnabled();
  ok(vp, "hurry", !h.text.includes("Take the top off first") && hEdge, `Next pressed mid-flatten: card 3 live at once (edge enabled=${hEdge})`);
  // early reveal mid-playback
  await ctl(p, "Remove an edge").click();
  await settled(p);
  await ctl(p, "Remove the rest").click();
  await p.waitForTimeout(100);
  const en = await revealOn(p);
  await p.locator("[data-testid=reveal-button]").click();
  await p.waitForTimeout(150);
  const atReveal = JSON.parse(await fpNow(p));
  atReveal.text += " " + (await p.locator("[data-testid=stage]").innerText()).replace(/\s+/g, "");
  const sr = await p.evaluate(() => [...document.querySelectorAll("[data-subcard-index]:not([hidden]) [role=status]")].map((e) => e.textContent).join(" | "));
  r.early = { enabledMidPlayback: en, text: atReveal.text, sr };
  ok(vp, "early", en && atReveal.text.includes("+ the top face = 2") && atReveal.text.includes("1−0+0=1"), `reveal at 100 ms into playback; stage at reveal: end line + trace present`);
  ok(vp, "sr", /^1 corner minus 0 edges plus 0 regions equals 1/.test(sr.split(" | ").find((t) => t.startsWith("1 corner")) ?? sr), `readout sr: "${sr}"`);
  await p.context().close();

  // settled back
  p = await start(vp);
  const left = {};
  for (const name of ["Slice a corner", "Next: Flatten", "Take the top off", "Next: Shrink", "Remove an edge", "Remove the rest"]) {
    const before = await settled(p);
    await ctl(p, name).click();
    const after = await settled(p);
    if (before.idx !== after.idx) left[before.idx] = before;
  }
  const last = await settled(p);
  left[last.idx] = last;
  const back = [];
  for (const i of [1, 0, 2]) {
    await trail(p, i).click();
    const m = await settled(p);
    back.push({ card: i + 1, same: m.text === left[String(i)].text && m.svg === left[String(i)].svg, unsettled: !!m.unsettled });
  }
  r.back = back;
  ok(vp, "back", back.every((x) => x.same && !x.unsettled), back.map((x) => `card ${x.card} ${x.same ? "same" : "CHANGED"}`).join(", "));
  // the mid-shrink sr text with 1 region: "... plus 1 region"
  await p.context().close();
  p = await start(vp);
  for (const name of ["Slice a corner", "Next: Flatten", "Take the top off", "Next: Shrink"]) await ctl(p, name).click();
  await settled(p);
  const seen = [];
  for (let k = 0; k < 12; k++) {
    await ctl(p, "Remove an edge").click();
    await settled(p, 3000);
    // sr sentence, then the visible terms as "number key" pairs (read per term, so they do not run together)
    seen.push(await p.evaluate(() => {
      const st = document.querySelector("[data-subcard-index]:not([hidden]) [role=status]");
      const terms = [...st.querySelectorAll("[aria-hidden=true]")].filter((e) => e.children.length === 2).map((e) => [...e.children].map((c) => c.textContent).join(" "));
      return st.firstElementChild.textContent + " || visible: " + terms.join(", ");
    }));
  }
  // sr part ("1 corner minus ...") and visible part (number then key, concatenated: "1corner") both checked
  const bad = seen.filter((t) => /\b1 (corners|edges|regions|faces)\b/.test(t) || /\b([02-9]|1\d) (corner|edge|region|face)\b/.test(t));
  ok(vp, "sr-all", bad.length === 0, `12 hand presses, sr + visible keys; bad: ${bad.length}; with a 1 count: ${seen.filter((t) => /\b1 /.test(t)).join(" / ")}`);
  await p.context().close();
}
await b.close();
console.log(fails ? `${fails} FAIL` : "all PASS");
process.exit(fails ? 1 : 0);
