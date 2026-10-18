// Tests for the review-timing candidate (W-1547, batch 3 P2) against criterion 2 §I.4's four rules, its reasons,
// its numbers' source, and the byte-identity of every existing policy.
//   node --test company/personalization/model/sim/review-timing.test.mjs
// owner: learner-model-engineer (Ifeoma) · offline only · no dependencies (node:test), Node 22.18 or later.
// Inputs are synthetic histories over real pilot slugs. No learner data, no persona latent, no eval harness:
// the "smoke" sessions below apply made-up, slug-hashed outcomes, not a learner model (V5).
// N1 (no writes) and N3 (forbidden-input invariance) for this policy are in privacy-n1-n3.test.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { REVIEW_TIMING_CURVES } from "../review-timing-curves.ts";
import { REVIEW_TIMING_POLICY, explainReviewTiming } from "./review-timing.ts";
import { loadPinnedCatalog } from "./catalog-pin.mjs"; // pinned catalogue (2026-10-18 note): the golden hashes are on it
import { goldenHashes, GOLDEN_FILE } from "./policy-golden.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const cat = loadPinnedCatalog();
const DAY = 86_400_000, HOUR = 3_600_000;
const T0 = Date.UTC(2026, 9, 16, 9);
const hash = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const decide = REVIEW_TIMING_POLICY.decide;

/** §I.5 baseline, written from §I.5's text and src/kit/progress.ts only: the slugs it brings back now, in order (uncapped). */
const FIXED = [1, 3, 7, 21];
function fixedDue(history, now) {
  const due = [];
  for (const h of history) {
    const successes = h.recalls.filter((r) => r.correct).length;
    if (successes >= FIXED.length) continue;
    const last = h.recalls.length ? h.recalls[h.recalls.length - 1].at : h.completedAt;
    if (now - last >= FIXED[successes] * DAY) due.push({ slug: h.slug, last });
  }
  return due.sort((a, b) => a.last - b.last || (a.slug < b.slug ? -1 : 1)).map((d) => d.slug);
}
/** The input the harness builds (§I.3): recalls cut to the 30-day window; dims for the catalog. */
function inputAt(history, now, slots) {
  const h = history.map((x) => ({ ...x, recalls: x.recalls.filter((r) => r.at >= now - 30 * DAY).map((r) => ({ ...r })) }));
  return { now, history: h, dims: cat.dims, slots, fixedDue: fixedDue(h, now) };
}

/** Synthetic sessions: one per day at T0's clock time; revisits served from the decision with hashed outcomes. */
function sessions({ days = 45, slots = 4, newPerDay = 2, seed = "a" } = {}) {
  const history = [];
  const out = [];
  let next = 0;
  for (let day = 0; day < days; day++) {
    const now = T0 + day * DAY;
    const input = inputAt(history, now, slots);
    const decision = decide(input);
    out.push({ day, input, decision });
    let t = now;
    for (const r of decision.revisits) {
      t += 60_000;
      const h = history.find((x) => x.slug === r.slug);
      h.recalls.push({ at: t, correct: hash(`${seed}|${r.slug}|${day}`) % 3 !== 0 });
    }
    for (let k = 0; k < Math.max(0, newPerDay); k++) {
      const slug = cat.defaultOrder[next++];
      t += 120_000;
      history.push({ slug, completedAt: t, predictedCorrectly: hash(slug) % 2 === 0, recalls: [] });
    }
  }
  return out;
}

const SMOKE = [sessions(), sessions({ slots: 1, seed: "b" }), sessions({ slots: 12, newPerDay: 4, seed: "c" }), sessions({ slots: 0, seed: "d", days: 5 })];
const ALL_INPUTS = SMOKE.flat().map((s) => s.input);

// ------------------------------------------------------------------------------------------------
// Numbers come from P1's file only.
// ------------------------------------------------------------------------------------------------

test("the candidate imports P1's REVIEW_TIMING_CURVES (rtc-v1), not a stub, and holds no timing value of its own", () => {
  assert.equal(REVIEW_TIMING_CURVES.version, "rtc-v1");
  const src = readFileSync(join(here, "review-timing.ts"), "utf8");
  assert.match(src, /from "\.\.\/review-timing-curves\.ts"/);
  assert.doesNotMatch(src, /stub/i, "review-timing.ts must not mention or import a stub");
  // The only numeric literals in code (comments stripped) are the ms per day, 0 and 1 (index arithmetic).
  const code = src.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/"[^"\n]*"|`[^`\n]*`/g, '""');
  const nums = [...new Set(code.match(/\b\d[\d_]*(\.\d+)?\b/g) ?? [])].sort();
  assert.deepEqual(nums, ["0", "1", "86_400_000"], `unexpected numeric literals in the policy: ${nums.join(", ")}`);
  assert.ok(M.POLICIES.includes(REVIEW_TIMING_POLICY.name));
  assert.equal(REVIEW_TIMING_POLICY.name, "review-timing");
});

// ------------------------------------------------------------------------------------------------
// §I.4 rule 1: pure and deterministic.
// ------------------------------------------------------------------------------------------------

test("rule 1: same input, same output, in this process and in a fresh one (replay)", () => {
  const a = ALL_INPUTS.map((i) => decide(i));
  const b = ALL_INPUTS.map((i) => decide(structuredClone(i)));
  assert.deepEqual(b, a);
  // A second process, a different order of calls: no module state carried between calls.
  const fixtures = ALL_INPUTS.filter((_, k) => k % 7 === 0);
  const child = spawnSync(process.execPath, ["--input-type=module", "-e",
    `import { readFileSync } from "node:fs"; import { REVIEW_TIMING_POLICY as P } from ${JSON.stringify("file://" + join(here, "review-timing.ts"))};
     const ins = JSON.parse(readFileSync(0, "utf8")); process.stdout.write(JSON.stringify(ins.reverse().map((i) => P.decide(i)).reverse()));`],
    { input: JSON.stringify(fixtures), encoding: "utf8", maxBuffer: 64 << 20 });
  assert.equal(child.status, 0, child.stderr);
  assert.equal(child.stdout, JSON.stringify(fixtures.map((i) => decide(i))));
});

test("rule 1: the source uses no clock, random numbers, process, I/O or module-level mutable state", () => {
  const code = readFileSync(join(here, "review-timing.ts"), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
  for (const bad of [/Math\.random/, /\bDate\b/, /\bprocess\b/, /\brequire\b/, /import\s*\(/, /\bfetch\b/, /globalThis/, /localStorage/, /performance/, /crypto/])
    assert.doesNotMatch(code, bad, `review-timing.ts uses ${bad}`);
  assert.doesNotMatch(code, /^(let|var)\s/m, "module-level let/var");
  const imports = code.match(/^import .*$/gm);
  assert.deepEqual(imports, ['import type { HistoryItem, LessonDims } from "../model";',
    'import { REVIEW_TIMING_CURVES, type ReviewTimingCurves } from "../review-timing-curves.ts";']);
});

// ------------------------------------------------------------------------------------------------
// §I.4 rule 2: does not mutate its input.
// ------------------------------------------------------------------------------------------------

const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };

test("rule 2: no input mutation (deep-frozen input runs; a clone is unchanged after the call)", () => {
  for (const i of ALL_INPUTS) {
    const before = JSON.stringify(i);
    const out = decide(i);
    assert.equal(JSON.stringify(i), before);
    const frozen = deepFreeze(structuredClone({ ...i, dims: {} }));
    assert.deepEqual(decide(frozen), out, "frozen input gives a different decision");
    // The output shares no object with the input.
    for (const r of out.revisits) assert.ok(!i.history.includes(r));
  }
});

// ------------------------------------------------------------------------------------------------
// §I.4 rule 3: well formed; reasons a learner could read later.
// ------------------------------------------------------------------------------------------------

const TRAIT_OR_COMPARISON = /\b(you are|you're|always|never|usually|than|others|other learners|most|average|slow|fast|weak|strong|struggl\w*|good at|bad at|forgetful|smart|behind|ahead)\b/i;

test("rule 3: every slug in history, no slug twice, revisits.length <= slots, every reason a readable act", () => {
  let served = 0;
  for (const i of ALL_INPUTS) {
    const { revisits } = decide(i);
    const inHist = new Set(i.history.map((h) => h.slug));
    assert.ok(Array.isArray(revisits));
    assert.ok(revisits.length <= i.slots, `revisits ${revisits.length} > slots ${i.slots}`);
    assert.equal(new Set(revisits.map((r) => r.slug)).size, revisits.length, "slug twice");
    for (const r of revisits) {
      assert.deepEqual(Object.keys(r).sort(), ["reason", "slug"]);
      assert.ok(inHist.has(r.slug), `${r.slug} not in history`);
      assert.equal(typeof r.reason, "string");
      assert.match(r.reason, /^You (finished this lesson|got this right on a revisit|missed this on a revisit) (earlier today|1 day ago|\d+ days ago)\.$/, r.reason);
      assert.doesNotMatch(r.reason, TRAIT_OR_COMPARISON, r.reason);
    }
    served += revisits.length;
  }
  assert.ok(served > 50, `smoke sessions served only ${served} revisits; the checks would be vacuous`);
});

test("rule 3 edge cases: empty history, zero or bad slots, repeated completions, unknown fixedDue slugs", () => {
  assert.deepEqual(decide({ now: T0, history: [], dims: {}, slots: 3, fixedDue: [] }), { revisits: [] });
  const h = [{ slug: "a", completedAt: T0 - 5 * DAY, recalls: [] }, { slug: "b", completedAt: T0 - 4 * DAY, recalls: [] },
    { slug: "a", completedAt: T0 - 3 * DAY, recalls: [{ at: T0 - 2 * DAY, correct: false }] }];
  for (const slots of [0, -1, 1.5, NaN]) assert.deepEqual(decide({ now: T0, history: h, dims: {}, slots, fixedDue: ["a"] }).revisits, []);
  const r = decide({ now: T0, history: h, dims: {}, slots: 5, fixedDue: ["zz-not-in-history", "b", "b"] }).revisits;
  assert.deepEqual(r.map((x) => x.slug), ["b", "a"]);
});

// ------------------------------------------------------------------------------------------------
// The rule as P1 wrote it (curves header), and V4 (never later than the baseline for the same history).
// ------------------------------------------------------------------------------------------------

test("rule as written: miss -> postMissWaitDays; streak counts since the last miss; retire at retireAfterStreak", () => {
  const C = REVIEW_TIMING_CURVES;
  const at = (d) => T0 - d * DAY;
  const one = (recalls, completedDaysAgo = 60) => explainReviewTiming({ now: T0, history: [{ slug: "x", completedAt: at(completedDaysAgo), recalls }], dims: {}, slots: 4, fixedDue: [] }).rows[0];
  const miss = one([{ at: at(C.postMissWaitDays.value), correct: false }]);
  assert.equal(miss.waitDays, C.postMissWaitDays.value); assert.equal(miss.due, true);
  const fresh = one([], C.waitDays.values[0]);
  assert.equal(fresh.waitDays, C.waitDays.values[0]); assert.equal(fresh.due, true);
  const notYet = one([], C.waitDays.values[0] - 0.01);
  assert.equal(notYet.due, false);
  const rs = [{ at: at(30), correct: true }, { at: at(29), correct: false }, { at: at(20), correct: true }, { at: at(19), correct: true }];
  const s2 = one(rs);
  assert.equal(s2.streak, 2); assert.equal(s2.waitDays, C.waitDays.values[2]);
  const retired = one(Array.from({ length: C.retireAfterStreak.value }, (_, k) => ({ at: at(40 - k), correct: true })));
  assert.equal(retired.waitDays, null); assert.equal(retired.due, false);
});

test("V4: within slots, every lesson the baseline serves the candidate serves too (same history); departures reported", (t) => {
  let earlier = 0, same = 0;
  for (const run of SMOKE) for (const { input, decision } of run) {
    const base = input.fixedDue.slice(0, input.slots);
    const cand = decision.revisits.map((r) => r.slug);
    assert.deepEqual(cand.slice(0, base.length), base, `day ${input.now}: candidate does not serve the baseline's due list first`);
    same += base.length; earlier += cand.length - base.length;
  }
  assert.ok(earlier > 0, "control: the candidate never departed from the baseline; the rule's miss branch was not exercised");
  t.diagnostic(`smoke (synthetic outcomes, not a learner): ${same} revisits as the baseline, ${earlier} extra (earlier than the baseline), 0 later`);
});

test("trace: every served revisit's row says why it is due (rule, wait, elapsed) or that the baseline had it due", () => {
  for (const i of ALL_INPUTS.slice(0, 60)) {
    const tr = explainReviewTiming(i);
    assert.deepEqual(tr.decision, decide(i));
    assert.equal(tr.curvesVersion, "rtc-v1");
    for (const r of tr.rows.filter((x) => x.served !== null)) {
      assert.ok(r.due || r.inFixedDue, `${r.slug} served without being due`);
      assert.ok(r.rule.length > 10);
    }
    JSON.parse(JSON.stringify(tr));
  }
});

// ------------------------------------------------------------------------------------------------
// Existing policies: byte-identical to before the candidate existed (W-1547 do-item 5; pre-commitment 1).
// ------------------------------------------------------------------------------------------------

test("every existing policy gives byte-identical compose output and episode traces to 4e13ef1 (gam at model-v0.2.2)", () => {
  const golden = JSON.parse(readFileSync(GOLDEN_FILE, "utf8"));
  assert.equal(golden.modelVersion, "model-v0.2.2");
  assert.equal(M.MODEL_VERSION, "model-v0.2.2", "MODEL_VERSION moved; the GAM must stay as frozen");
  const now = goldenHashes(cat);
  assert.deepEqual(Object.keys(now), Object.keys(golden.hashes), "the set of ordering policies changed");
  for (const p of Object.keys(golden.hashes)) assert.deepEqual(now[p], golden.hashes[p], `${p}: output changed`);
  assert.ok(["default-order", "draft-rules", "gam", "gam-no-surprise-novelty", "gam-no-breadth", "random", "epsilon-greedy"].every((p) => p in now));
});
