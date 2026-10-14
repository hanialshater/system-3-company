// Node check for schelling-on-new-york (not imported by the lesson; Node >= 22.18 for .ts imports).
//   node src/demos/geography/schelling-on-new-york/check.mjs
// 1. Rule identity: with an all-land 40 x 40 mask the engine's frames equal abm.ts run() (lesson one).
// 2. Real mask: MASK_HEX equals the land cells of company/domains/briefs/checks/nyc-mask-40.json, and
//    the engine's start and end frames equal the brief's check script (schelling-nyc-check.mjs with
//    MASK=nyc-mask-40.json) for seeds 1 to 50 at 30%.
// 3. The numbers the lesson quotes: seed 1, seeds 1 to 50 (D on 2 x 2 blocks, ticks), D by block
//    size, the slider's range, the seed list (3 and 36 excluded) and the region check (R2). The
//    region labels are read here from the brief's JSON for the check only; they never reach the lesson.
// 4. v3: the seed list New mix cycles, no slider (fixed 30%), no region over 90% one group at 30%,
//    the 'would move' rule, the QA-path numbers (spec section 8), one-group box shares (c17) and the
//    agreement of two settled mixes (c16).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run, dissimilarity, likeShare, oneGroupBoxes, MASK, N } from "./engine.ts";
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

// v2 (cultural review 2, ruling (a)): the slider stops at 30%. Scan EVERY frame (not only the
// settled one) of every lesson seed at every setting 0 to 30% for a region (at least 10 agents)
// more than 90% one group; also count the 'would stay' readout showing 100% while squares would move.
const count = (c, n) => {
  let a = 0, b = 0;
  for (let i = 0; i < c.length; i++) {
    if (REAL.labels[i] !== n) continue;
    if (c[i] === 1) a++;
    else if (c[i] === 2) b++;
  }
  return [a, b];
};
let hits = 0, framesScanned = 0, worst = 0, worstAt = "";
let false100 = 0;
for (let pct = 0; pct <= 30; pct += 5) {
  for (const s of SEEDS) {
    const r = run(s, pct);
    r.frames.forEach((fr, t) => {
      framesScanned++;
      const stay = Math.floor((100 * (r.agents - r.movers[t])) / r.agents);
      if (stay === 100 && r.movers[t] > 0) false100++;
      for (const n of names) {
        const [a, b] = count(fr, n);
        if (a + b < 10) continue;
        const f = Math.max(a, b) / (a + b);
        if (f > worst) { worst = f; worstAt = `${n} seed ${s} ${pct}% tick ${t}`; }
        if (f > 0.9) { hits++; console.log(`  region > 90%: ${n} seed ${s} ${pct}% tick ${t} (${f2(f)})`); }
      }
    });
  }
}
console.log(`\nv2 region scan, 0-30% step 5, ${SEEDS.length} seeds, every tick: ${framesScanned} frames, worst region share ${f2(worst)} (${worstAt})`);
ok(hits === 0, "no region over 90% one group at any tick, any setting 0-30%, any lesson seed");
ok(false100 === 0, "'would stay' (integer floor) reads 100% only when no square would move, 0-30%");

// v3 (spec company/design/specs/schelling-on-new-york-v3.md; design review D1-D12; cultural pass 4).
console.log("\nv3");
// The seed list the lesson cycles through with New mix is the one scanned here: 1-50 without 3 and 36.
const demo = fs.readFileSync(path.join(here, "Demo.tsx"), "utf8");
ok(/length: 50 \}/.test(demo) && /x !== 3 && x !== 36/.test(demo) && /\(seedIx \+ 1\) % SEEDS\.length/.test(demo),
  "Demo.tsx New mix cycles seeds 1-50 without 3 and 36 (the list every scan here covers), wrapping");
ok(/const PCT = 30;/.test(demo) && !/<Slider/.test(demo), "Demo.tsx: no slider, the setting is fixed at 30% (D5)");

// No region over 90% one group at any round at 30%, for every mix New mix can reach (cultural pass 4, 4.2).
let hits30 = 0, worst30 = 0, frames30 = 0;
for (const s of SEEDS) {
  const r = run(s, 30);
  r.frames.forEach((fr) => {
    frames30++;
    for (const n of names) {
      const [a, b] = count(fr, n);
      if (a + b < 10) continue;
      const f = Math.max(a, b) / (a + b);
      worst30 = Math.max(worst30, f);
      if (f > 0.9) hits30++;
    }
  });
}
ok(hits30 === 0, `at 30%: no region over 90% one group at any round of any lesson seed (${frames30} frames, worst ${f2(worst30)})`);

// 'would move' = ceil(100 x movers / agents): 0% only when nobody would move, and 0% whenever nobody
// would move. It is 100 minus v2's 'would stay' floor, so v2's rule (100% stay only when nobody
// moves) carries over unchanged (c6).
let bad0 = 0, badStay = 0;
for (const s of SEEDS) {
  const r = run(s, 30);
  r.movers.forEach((m) => {
    const mv = Math.ceil((100 * m) / r.agents);
    if ((mv === 0) !== (m === 0)) bad0++;
    if (mv !== 100 - Math.floor((100 * (r.agents - m)) / r.agents)) badStay++;
  });
}
ok(bad0 === 0, "'would move' reads 0% exactly when nobody would move, every frame at 30%");
ok(badStay === 0, "'would move' equals 100 minus v2's 'would stay' floor at every frame (the would-stay rule holds)");

// QA path numbers (spec section 8).
const mvAt = (r, t) => Math.ceil((100 * r.movers[t]) / r.agents);
const oneAt = (fr, k) => { const b = oneGroupBoxes(fr, N, k); return [b.one.length, b.held, Math.round((100 * b.one.length) / b.held)]; };
const r2 = run(2, 30);
const D_ = (fr, k) => f2(dissimilarity(fr, N, k));
console.log(`  mix 1: would move ${r1.movers.map((m) => Math.ceil((100 * m) / r1.agents)).join(",")}%; one-group 2x2 ${oneAt(r1.frames[0], 2)} -> ${oneAt(last(r1), 2)}`);
console.log(`  mix 2: ${r2.frames.length - 1} rounds; would move ${r2.movers.map((m) => Math.ceil((100 * m) / r2.agents)).join(",")}%; 2x2 ${D_(r2.frames[0], 2)}->${D_(last(r2), 2)}, 4x4 ${D_(r2.frames[0], 4)}->${D_(last(r2), 4)}, 8x8 ${D_(r2.frames[0], 8)}->${D_(last(r2), 8)}; one-group 2x2 ${oneAt(r2.frames[0], 2)} -> ${oneAt(last(r2), 2)}, 4x4 ${oneAt(r2.frames[0], 4)}, 8x8 ${oneAt(r2.frames[0], 8)}`);
ok(mvAt(r1, 0) === 20 && mvAt(r1, 1) === 12 && mvAt(r1, 7) === 0, "mix 1: would move 20% at round 0, 12% at round 1, 0% at round 7");
ok(D_(r1.frames[1], 2) === "0.58", "mix 1 round 1: 2x2 0.58");
ok(r2.frames.length - 1 === 12 && r2.settled && D_(r2.frames[0], 2) === "0.44" && D_(last(r2), 2) === "0.76", "mix 2: 0.44 -> 0.76 in 12 rounds, settled");
ok(mvAt(r2, 0) === 21, "mix 2 round 0: would move 21%");
ok(D_(r2.frames[0], 4) === "0.24" && D_(r2.frames[0], 8) === "0.14" && D_(last(r2), 8) === "0.31", "mix 2 start: 4x4 0.24, 8x8 0.14 (settled 0.31)");
ok(oneAt(r1.frames[0], 2).join() === "72,181,40" && oneAt(last(r1), 2).join() === "135,180,75", "mix 1 one-group 2x2: 72/181 (40%) -> 135/180 (75%) (c17)");
ok(oneAt(r2.frames[0], 2).join() === "65,184,35" && oneAt(last(r2), 2).join() === "127,181,70", "mix 2 one-group 2x2: 65/184 (35%) -> 127/181 (70%) (c17)");
ok(oneAt(r2.frames[0], 4).join() === "7,58,12" && oneAt(r2.frames[0], 8).join() === "0,18,0", "mix 2 start one-group: 4x4 7/58 (12%), 8x8 0/18 (0%) (c17)");

// c17: one-group shares over the lesson seeds.
const pctR = (a) => [Math.round(100 * Math.min(...a)), Math.round(100 * Math.max(...a)), Math.round((100 * a.reduce((x, y) => x + y, 0)) / a.length)];
const og = { s2: [], s4: [], s8: [], e2: [] };
for (const s of SEEDS) {
  const r = run(s, 30);
  const sh = (fr, k) => { const b = oneGroupBoxes(fr, N, k); return b.one.length / b.held; };
  og.s2.push(sh(r.frames[0], 2)); og.s4.push(sh(r.frames[0], 4)); og.s8.push(sh(r.frames[0], 8)); og.e2.push(sh(last(r), 2));
}
console.log(`  one-group boxes over lesson seeds: start 2x2 ${pctR(og.s2)}, 4x4 ${pctR(og.s4)}, 8x8 ${pctR(og.s8)}; settled 2x2 ${pctR(og.e2)} (min,max,mean %)`);
ok(pctR(og.s2).join() === "34,47,39", "c17: start 2x2 one-group 34-47% (mean 39%)");
ok(pctR(og.s4).slice(0, 2).join() === "3,16" && pctR(og.s8).slice(0, 2).join() === "0,11", "c17: start 4x4 3-16%, 8x8 0-11%");
ok(pctR(og.e2).slice(0, 2).join() === "64,81", "c17: settled at 30%, 2x2 64-81%");
ok(og.s2.every((v, i) => v > og.s4[i] && og.s4[i] >= og.s8[i]), "every lesson seed: fewer one-group boxes in bigger boxes at the start");

// c16: two settled mixes agree on the group about half the time on the cells both fill.
const agree = (a, b) => {
  const x = last(run(a, 30)), y = last(run(b, 30));
  let t = 0, m = 0;
  for (let i = 0; i < x.length; i++) {
    const u = x[i], v = y[i];
    if ((u === 1 || u === 2) && (v === 1 || v === 2)) { t++; if (u === v) m++; }
  }
  return [m, t];
};
const ag = SEEDS.map((s, i) => { const [m, t] = agree(s, SEEDS[(i + 1) % SEEDS.length]); return m / t; });
const [m12, t12] = agree(1, 2), [m24, t24] = agree(2, 4);
console.log(`  agreement of settled mixes: 1 vs 2 ${m12}/${t12} (${f2(m12 / t12)}), 2 vs 4 ${m24}/${t24} (${f2(m24 / t24)}), consecutive ${f2(Math.min(...ag))}-${f2(Math.max(...ag))} mean ${f2(ag.reduce((x, y) => x + y, 0) / ag.length)}`);
ok(m12 === 229 && t12 === 463, "c16: mix 1 vs mix 2 agree on 229 of 463 shared cells (0.49)");
ok(f2(Math.min(...ag)) === "0.41" && f2(Math.max(...ag)) === "0.59" && f2(ag.reduce((x, y) => x + y, 0) / ag.length) === "0.51", "c16: consecutive lesson seeds agree on 0.41-0.59 of shared cells, mean 0.51");
console.log(fail ? `\n${fail} check(s) FAILED` : "\nall checks passed");
process.exit(fail ? 1 : 0);
