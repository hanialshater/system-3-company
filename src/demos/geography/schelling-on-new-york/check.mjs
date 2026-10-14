// Node check for schelling-on-new-york (not imported by the lesson; Node >= 22.18 for .ts imports).
//   node src/demos/geography/schelling-on-new-york/check.mjs
// 1. Rule identity: with an all-land 40 x 40 mask the engine's frames equal abm.ts run() (lesson one).
// 2. Real mask: MASK_HEX equals the land cells of company/domains/briefs/checks/nyc-mask-40.json, and
//    the engine's start and end frames equal the brief's check script (schelling-nyc-check.mjs with
//    MASK=nyc-mask-40.json) for seeds 1 to 50 at 30%.
// 3. The numbers the lesson quotes: seed 1, seeds 1 to 50 (D on 2 x 2 blocks, ticks), D by block
//    size, the slider's range, the seed list (3 and 36 excluded) and the region check (R2). The
//    region labels are read here from the brief's JSON for the check only; they never reach the lesson.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run, dissimilarity, likeShare, MASK, N } from "./engine.ts";
import { run as abmRun } from "../../economics/mild-preferences-sharp-divides/abm.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../..");
const maskJson = path.join(root, "company/domains/briefs/checks/nyc-mask-40.json");
const REAL = JSON.parse(fs.readFileSync(maskJson, "utf8"));
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const f2 = (v) => v.toFixed(2);
let fail = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "ok  " : "FAIL"} ${msg}`);
  if (!cond) fail++;
};

// 1. all-land mask vs abm.ts
const ones = new Uint8Array(N * N).fill(1);
for (const seed of [1, 2, 3]) {
  const mine = run(seed, 30, ones);
  const ref = abmRun(seed, 30);
  const frames = mine.frames.length === ref.frames.length && mine.frames.every((fr, t) => same(fr, ref.frames[t]));
  ok(frames, `all-land mask, seed ${seed}: ${mine.frames.length - 1} ticks vs abm.ts ${ref.frames.length - 1}, every frame identical`);
}

// 2. mask and brief script identity
const fromLabels = REAL.labels.map((l) => (l ? 1 : 0));
ok(same(Array.from(MASK), fromLabels), `MASK_HEX equals the land cells of nyc-mask-40.json (${MASK.reduce((a, b) => a + b, 0)} land cells)`);
process.env.MASK = maskJson;
const brief = await import(path.join(root, "company/domains/briefs/checks/schelling-nyc-check.mjs"));
const { m } = brief.mask();
let allSame = true;
for (let seed = 1; seed <= 50; seed++) {
  const a = run(seed, 30);
  const b = brief.sim(seed, 30, m, 0.5);
  if (!(same(a.frames[0], b.start) && same(a.frames[a.frames.length - 1], b.end) && a.frames.length - 1 === b.ticks)) {
    allSame = false;
    console.log("  differs at seed", seed);
  }
}
ok(allSame, "real mask, seeds 1-50 at 30%: start frame, end frame and ticks equal the brief's check script");

// 3. quoted numbers
const r1 = run(1, 30);
const last = (r) => r.frames[r.frames.length - 1];
const d2s = f2(dissimilarity(r1.frames[0], N, 2));
const d2e = f2(dissimilarity(last(r1), N, 2));
console.log(`seed 1 at 30%: D (2x2) ${d2s} -> ${d2e} in ${r1.frames.length - 1} ticks, settled ${r1.settled}, agents ${r1.agents}`);
ok(d2s === "0.47" && d2e === "0.76" && r1.frames.length - 1 === 7, "seed 1 reproduces the brief: 0.47 -> 0.76 in 7 ticks");
for (const k of [1, 2, 4, 8])
  console.log(`  seed 1, ${k}x${k} blocks: start ${f2(dissimilarity(r1.frames[0], N, k))}, settled ${f2(dissimilarity(last(r1), N, k))}`);
console.log(`  seed 1 like share ${f2(likeShare(r1.frames[0], N))} -> ${f2(likeShare(last(r1), N))}`);

const SEEDS = [];
for (let s = 1; s <= 50; s++) if (s !== 3 && s !== 36) SEEDS.push(s);
const range = (a) => `${f2(Math.min(...a))}-${f2(Math.max(...a))} (mean ${f2(a.reduce((x, y) => x + y, 0) / a.length)})`;
const ks = [1, 2, 4, 8];
const byK = { start: ks.map(() => []), end: ks.map(() => []) };
const tk = [];
for (const s of SEEDS) {
  const r = run(s, 30);
  ks.forEach((k, j) => {
    byK.start[j].push(dissimilarity(r.frames[0], N, k));
    byK.end[j].push(dissimilarity(last(r), N, k));
  });
  tk.push(r.frames.length - 1);
}
console.log(`\nlesson seeds (1-50 without 3 and 36, ${SEEDS.length} seeds), 30%: ticks ${Math.min(...tk)}-${Math.max(...tk)}`);
ks.forEach((k, j) => console.log(`  ${k}x${k}: start ${range(byK.start[j])} | settled ${range(byK.end[j])}`));
ok(byK.start[1].every((v) => v >= 0.395 && v < 0.535), "every lesson seed's start D on 2x2 rounds to 0.40-0.53 (option 'About 0.4 to 0.5')");

// Region check (R2): share of seeds where a region ends > 90% one group, by threshold.
const names = ["SI", "BK", "QN", "MN", "BX"];
const frac = (c, n) => {
  let a = 0, b = 0;
  for (let i = 0; i < c.length; i++) {
    if (REAL.labels[i] !== n) continue;
    if (c[i] === 1) a++;
    else if (c[i] === 2) b++;
  }
  return a + b ? Math.max(a, b) / (a + b) : 0;
};
console.log("\nslider sweep over lesson seeds: settled, ticks, D 2x2 settled, region-seeds > 90% one group");
for (let pct = 0; pct <= 60; pct += 5) {
  let settled = 0, maxT = 0, uni = 0;
  const d = [];
  for (const s of SEEDS) {
    const r = run(s, pct);
    if (r.settled) settled++;
    maxT = Math.max(maxT, r.frames.length - 1);
    d.push(dissimilarity(last(r), N, 2));
    for (const n of names) if (frac(last(r), n) > 0.9) uni++;
  }
  console.log(`  ${String(pct).padStart(2)}%: settled ${settled}/${SEEDS.length}, max ticks ${maxT}, D ${range(d)}, region-seeds ${uni}/${SEEDS.length * 5}`);
}
console.log(fail ? `\n${fail} check(s) FAILED` : "\nall checks passed");
process.exit(fail ? 1 : 0);
