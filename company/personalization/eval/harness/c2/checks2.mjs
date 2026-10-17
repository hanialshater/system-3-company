// Criterion 2 §5 tests as functions. T1-T4 and R1-R4 test arms (a failure makes the arm INVALID); T5-T9 test the judge
// (a failure stops the run; it is the eval's defect). Used by tests2.test.mjs (K1: reference arm and fixtures only, freeze
// lock) and by run2.mjs (K2: every arm under test).
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md §5
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { choose } from "../harness.mjs";
import { staticIsolation } from "../checks.mjs";
import { runEpisode2, catalog, parseArm, REFERENCE_ARM, reviewInput } from "./harness2.mjs";
import { makeLearner2, u01 } from "./learner2.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DAY = 86_400_000;
const orderOf = (comp) => JSON.stringify(comp.picks.map((p) => [p.slug, p.moved, p.reason]));

/** T1 replay (AMD-008 P1): the same episode in two separate processes gives the same hash. */
export function t1Replay2({ persona, seed, cell = "base", arm, candidate = null }) {
  const args = [join(HERE, "harness2.mjs"), "episode", `--persona=${persona}`, `--seed=${seed}`, `--cell=${cell}`, `--arm=${arm}`];
  if (candidate) args.push(`--candidate=${candidate}`);
  const run = () => spawnSync(process.execPath, args, { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  const a = run(), b = run();
  if (a.status !== 0 || b.status !== 0) return { ok: false, why: `process failed: ${a.stderr || b.stderr}` };
  const ha = a.stdout.trim(), hb = b.stdout.trim();
  return { ok: ha === hb && /^[0-9a-f]{64}$/.test(ha), a: ha, b: hb };
}

/** T2 pick replay, T3 forbidden-input invariance, T4 explanation on an order rule: phase A's checks, on criterion 2's episode. */
export function pickChecks2({ persona, seed, cell, arm, t4 = true }) {
  const cat = catalog();
  const { order } = parseArm(arm);
  const res = { t2: { ok: true, fails: [] }, t3: { ok: true, fails: [] }, t4: { ok: true, fails: [], checked: 0 } };
  const fail = (k, x) => { res[k].ok = false; if (res[k].fails.length < 5) res[k].fails.push(x); };
  runEpisode2({ persona, arm, seed, cell, cat, onPick: (input, comp, ctx) => {
    if (order === "oracle-order") return; // the judge's reference, not under test
    const o = orderOf(comp);
    const draws = ctx.draws;
    const replayRand = () => { let i = 0; return () => (i < draws.length ? draws[i++] : NaN); };
    if (orderOf(choose(order, structuredClone(input), cat, replayRand())) !== o) fail("t2", { day: ctx.day, t: ctx.t });
    for (const k of M.FORBIDDEN_INPUTS) {
      const v = [1, 7].map((val) => { const x = structuredClone(input); x[k] = val; x.fingerprint[k] = val; return orderOf(choose(order, x, cat, replayRand())); });
      if (v[0] !== v[1]) fail("t3", { input: k, day: ctx.day });
    }
    if (t4) for (const [i, p] of comp.picks.entries()) {
      if (p.reason === "due-revisit") continue;
      res.t4.checked++;
      if (!p.terms.length) { fail("t4", { why: "pick carries no terms", slug: p.slug }); continue; }
      const sum = p.terms.reduce((a, b) => a + b.value, 0);
      if (Math.abs(sum - p.score) > 1e-9) fail("t4", { why: "terms do not sum to the score", slug: p.slug });
      const slot = comp.slots?.filter((s) => s.kind === "new")[i - comp.picks.filter((q) => q.reason === "due-revisit").length];
      if (!slot) { fail("t4", { why: "no slot trace", slug: p.slug }); continue; }
      if (p.moved) {
        const best = slot.candidates.filter((c) => c.eligibleToMove).sort((a, b) => b.score - a.score)[0];
        if (!best || best.slug !== p.slug) fail("t4", { why: "moved pick is not the best eligible candidate", slug: p.slug });
        if (!(slot.margin !== null && p.score - (slot.defaultScore ?? Infinity) > M.COMPOSER.moveThreshold - 1e-12)) fail("t4", { why: "moved without beating the default card by the threshold", slug: p.slug });
      } else if (slot.defaultCard !== p.slug) fail("t4", { why: "unmoved pick is not the default card", slug: p.slug });
    }
  } });
  return res;
}

/**
 * R1-R4: the review interface checks (interface §I.4), at every session of one episode.
 *   R1 replay: decide() twice on the same input gives the same output (cross-process replay is T1).
 *   R2 no mutation: the input is deep-frozen; any write throws, and the episode fails (caught here).
 *   R3 well formed: checked by the harness at every session (an ill-formed decision throws); caught here.
 *   R4 forbidden inputs: each FORBIDDEN_INPUTS entry added to the input at two values leaves the output unchanged.
 * rule: optional override (tests); else the arm's review rule.
 */
export function reviewChecks({ persona, seed, cell, arm, rule = null }) {
  const res = { r1: { ok: true, fails: [] }, r2r3: { ok: true, fails: [] }, r4: { ok: true, fails: [] }, sessions: 0 };
  const fail = (k, x) => { res[k].ok = false; if (res[k].fails.length < 5) res[k].fails.push(x); };
  const out = (d) => JSON.stringify(d?.revisits ?? null);
  try {
    runEpisode2({ persona, arm, seed, cell, reviewOverride: rule, onReview: (input, dec, ctx) => {
      res.sessions++;
      const o = out(dec);
      let again; try { again = out(ctx.rule.decide(input)); } catch (e) { again = `throw ${e.message}`; }
      if (again !== o) fail("r1", { day: ctx.day });
      for (const k of M.FORBIDDEN_INPUTS) {
        const v = [1, 7].map((val) => { try { return out(ctx.rule.decide({ ...input, [k]: val })); } catch (e) { return `throw ${e.message}`; } });
        if (v[0] !== v[1] || v[0] !== o) fail("r4", { input: k, day: ctx.day });
      }
    } });
  } catch (e) { fail("r2r3", { why: String(e.message || e).slice(0, 200) }); }
  return res;
}

/** T5 judge isolation, static: criterion 2's judge modules import nothing and never name the rating field. */
export const JUDGE_MODULES2 = ["learner2.mjs", "scorer2.mjs", "world2.mjs"];
export function t5Static2() {
  const out = {};
  for (const f of JUDGE_MODULES2) out[f] = staticIsolation(readFileSync(join(HERE, f), "utf8"));
  out["../personas.copy.mjs"] = staticIsolation(readFileSync(join(HERE, "..", "personas.copy.mjs"), "utf8"));
  return { ok: Object.values(out).every((p) => !p.length), files: out };
}

/** T6 judge isolation, dynamic: permuting the ratings in the composer's view leaves the hidden world and the reference arm
 *  byte-identical. */
export function t6Dynamic2({ persona, seed, cellWorld }) {
  const cat = catalog();
  const slugs = cat.lessons.map((l) => l.slug);
  const sh = [...slugs];
  for (let i = sh.length - 1; i > 0; i--) { const k = Math.floor(u01(`t6|${seed}|${i}`) * (i + 1)); [sh[i], sh[k]] = [sh[k], sh[i]]; }
  const permute = Object.fromEntries(slugs.map((s, i) => [s, sh[i]]));
  const a = runEpisode2({ persona, arm: REFERENCE_ARM, seed, cell: cellWorld, cat });
  const b = runEpisode2({ persona, arm: REFERENCE_ARM, seed, cell: cellWorld, cat, permute });
  return { ok: a.worldHash === b.worldHash && a.hash === b.hash, worldHashes: [a.worldHash, b.worldHash], hashes: [a.hash, b.hash] };
}

// ---- T7 known answers on a two-concept world (A is B's prerequisite) ----
export function kaWorld(over = {}) {
  return { forgetK: 0.1, pullModifier: 0, pullScale: 1, priorKnowledge: { probability: 0, cs: 0 }, learnPrereqPenalty: 0,
    predictionFeedback: 0.1, learnRate: 0.7, slip: 0.1, guessRecall: 0.2, relearn: 0.5, revisitStrengthen: null, strengthenAt1: 0.6, strengthenAt0: 0.35,
    forgetShape: 1, kSpread: 0, revisitStopScale: 1,
    stopBeforeRevealShare: 0.5, hypercorrection: 0, novelty: 0, interest: { probability: 0.5, cs: 0.5 }, stopHazard: 0, ...over };
}
const GRAPH = { prereqsOf: (c) => (c === "probability:b" ? ["probability:a"] : []), pilotConcepts: ["probability:a", "probability:b"] };
export const KA = { A: { slug: "lesson-a", concept: "probability:a", domain: "probability" }, B: { slug: "lesson-b", concept: "probability:b", domain: "probability" } };
const mk = (s, w) => makeLearner2({ seed: s, personaId: "t7", world: w, graph: GRAPH, pullOf: () => 0.6, startTime: 0 });

/** T7a forgetting 0: a learned concept recalls with P 1 at any delay, and the final-test read counts it as 1. */
export function t7aForgetting0(seeds = 200) {
  let worst = 0, n = 0;
  for (let s = 1; s <= seeds; s++) {
    const L = mk(s, kaWorld({ forgetK: 0 })); L.beginSession(0);
    if (!L.study(KA.A, 0).learned) continue;
    n++;
    for (const d of [1, 7, 30, 365]) { worst = Math.max(worst, Math.abs(1 - L.recallProb(KA.A, d * DAY)), Math.abs(1 - L.knowledgeAt(d * DAY))); }
  }
  return { ok: n > 0 && worst <= 1e-12, worst, n };
}
/** T7b prerequisite penalty 0: the order of a prerequisite pair does not change the expected final-test read. Control: 0.4 does. */
export function t7bPrereq0(seeds = 400) {
  const K = (s, w, order) => { const L = mk(s, w); L.beginSession(0); order.forEach((x, i) => L.study(x, i)); return L.knowledgeAt(7 * DAY); };
  let gap0 = 0, gap4 = 0;
  for (let s = 1; s <= seeds; s++) {
    gap0 += K(s, kaWorld({ learnPrereqPenalty: 0 }), [KA.A, KA.B]) - K(s, kaWorld({ learnPrereqPenalty: 0 }), [KA.B, KA.A]);
    gap4 += K(s, kaWorld({ learnPrereqPenalty: 0.4 }), [KA.A, KA.B]) - K(s, kaWorld({ learnPrereqPenalty: 0.4 }), [KA.B, KA.A]);
  }
  return { ok: Math.abs(gap0 / seeds) <= 1e-3 && gap4 / seeds > 0.02, mean0: gap0 / seeds, control: gap4 / seeds };
}
/** T7c lag form (K2, F1 B2): a successful retrieval at r = 1 multiplies the rate by s1 (0.6); one at r = e^-2 (20 days
 *  at k 0.1) by s1^r x s0^(1 - r). (Guess floor 0 so that every right answer is a retrieval.) */
export function t7cLag() {
  const w = kaWorld({ forgetK: 0.1, strengthenAt1: 0.6, strengthenAt0: 0.35, guessRecall: 0 });
  const rate = (L, t0, t1) => -Math.log(L.keptAt(KA.A.concept, t1)) / ((t1 - t0) / DAY);
  const r = Math.exp(-2);
  const want = { immediate: 0.1 * 0.6, late: 0.1 * Math.pow(0.6, r) * Math.pow(0.35, 1 - r) };
  let immediate = null, late = null;
  for (let s = 1; s <= 2000 && (immediate === null || late === null); s++) {
    const L = mk(s, w); L.beginSession(0);
    if (!L.study(KA.A, 0).learned) continue;
    const tr = immediate === null ? 0 : 20 * DAY;
    if (!L.revisit(KA.A, tr).ok) continue;
    const k = rate(L, tr, tr + 5 * DAY);
    if (tr === 0) immediate = k; else late = k;
  }
  return { ok: immediate !== null && late !== null && Math.abs(immediate - want.immediate) <= 1e-9 && Math.abs(late - want.late) <= 1e-9, immediate, late, want };
}
/** T7f forgetting shape and spread (K2, F1 B1, B3): after day 7 the rate is shape x the first-week rate; kSpread 0 gives
 *  factor 1; kSpread > 0 gives a per-concept factor whose log has SD close to kSpread (median 1). */
export function t7fShapeSpread() {
  const L = mk(1, kaWorld({ forgetK: 0.1, forgetShape: 0.27, learnRate: 1, predictionFeedback: 0 })); L.beginSession(0); L.study(KA.A, 0);
  const shapeOk = Math.abs(L.keptAt(KA.A.concept, 30 * DAY) - Math.exp(-0.1 * (7 + 0.27 * 23))) <= 1e-12
    && Math.abs(L.keptAt(KA.A.concept, 5 * DAY) - Math.exp(-0.5)) <= 1e-12;
  const L0 = mk(1, kaWorld({ forgetK: 0.1, learnRate: 1, predictionFeedback: 0 })); L0.beginSession(0); L0.study(KA.A, 0);
  const noSpreadOk = Math.abs(L0.keptAt(KA.A.concept, 5 * DAY) - Math.exp(-0.5)) <= 1e-12;
  const logs = [];
  for (let s = 1; s <= 2000; s++) {
    const Ls = mk(s, kaWorld({ forgetK: 0.1, kSpread: 0.4, learnRate: 1, predictionFeedback: 0 })); Ls.beginSession(0); Ls.study(KA.A, 0);
    logs.push(Math.log(-Math.log(Ls.keptAt(KA.A.concept, DAY)) / 0.1));
  }
  const m = logs.reduce((a, b) => a + b, 0) / logs.length;
  const sdv = Math.sqrt(logs.reduce((a, b) => a + (b - m) ** 2, 0) / (logs.length - 1));
  return { ok: shapeOk && noSpreadOk && Math.abs(m) < 0.05 && Math.abs(sdv - 0.4) < 0.03, shapeOk, noSpreadOk, mean: m, sd: sdv };
}
/** T7g a right GUESS on a known concept does not strengthen (K2, F1 N5); a miss on a known concept with relearn 1 keeps mult. */
export function t7gGuessNoStrengthen(seeds = 4000) {
  const w = kaWorld({ forgetK: 0.1, guessRecall: 0.5, relearn: 1, strengthenAt1: 0.5, strengthenAt0: 0.5 });
  let guesses = 0, retrievals = 0;
  for (let s = 1; s <= seeds; s++) {
    const L = mk(s, w); L.beginSession(0);
    if (!L.study(KA.A, 0).learned) continue;
    const tr = 10 * DAY;
    const res = L.revisit(KA.A, tr);
    if (!res.ok) continue;
    const k = -Math.log(L.keptAt(KA.A.concept, tr + DAY));
    if (Math.abs(k - 0.1) <= 1e-9) guesses++;
    else if (Math.abs(k - 0.05) <= 1e-9) retrievals++;
    else return { ok: false, seed: s, k };
  }
  // P(retrieval | right) = (1 - g) r / (g + (1 - g) r), r = e^-1: about 0.42
  return { ok: guesses > 0 && retrievals > 0, guesses, retrievals };
}
/** T7h pre-history follows the episode's law (K2, F1 B5): with no prior knowledge and learnRate 0, a pre-history recall
 *  answered right is a guess and does not make the concept known; with relearn 0 nothing is known after pre-history. */
export function t7hPrehistoryLaw(seeds = 400) {
  let right = 0;
  for (let s = 1; s <= seeds; s++) {
    const L = mk(s, kaWorld({ learnRate: 0, relearn: 0, guessRecall: 0.5 }));
    const out = L.seedKnowledge2([{ slug: KA.A.slug, completedAt: -5 * DAY, predictedCorrectly: true, recalls: [{ at: -4 * DAY, correct: true }] }], { [KA.A.slug]: KA.A });
    if (out[0].recalls[0].correct) right++;
    if (L.knownCount() !== 0) return { ok: false, seed: s };
  }
  return { ok: right > 0 && right < seeds, right };
}

/** T7d reading is pure: knowledgeAt and recallProb change no state. */
export function t7dReadPure(seeds = 50) {
  for (let s = 1; s <= seeds; s++) {
    const L = mk(s, kaWorld()); L.beginSession(0); L.study(KA.A, 0); L.study(KA.B, 60_000);
    const a = L.snapshot();
    for (const d of [1, 7, 30]) { L.knowledgeAt(d * DAY); L.recallProb(KA.A, d * DAY); L.oracle.gainIfStudied(KA.B, d * DAY, 30 * DAY); }
    if (L.snapshot() !== a) return { ok: false, seed: s };
  }
  return { ok: true };
}
/** T7e a lucky guess on an unknown concept does not make it known: with relearn 0 it stays unknown. */
export function t7eLuckyGuess(seeds = 400) {
  let guessed = 0;
  for (let s = 1; s <= seeds; s++) {
    const L = mk(s, kaWorld({ relearn: 0, guessRecall: 0.5, learnRate: 0 })); L.beginSession(0);
    L.study(KA.A, 0);
    const r = L.revisit(KA.A, DAY);
    if (r.ok) { guessed++; if (L.knownCount() !== 0) return { ok: false, seed: s }; }
  }
  return { ok: guessed > 0, guessed };
}

/** T8 the read is independent of every arm: the review input carries exactly the interface's fields, and the final-test
 *  times depend on EPISODE2 only (no field of the input can reveal them beyond `now`). */
export function t8InputShape({ persona, seed, cellWorld }) {
  const keys = new Set();
  runEpisode2({ persona, arm: REFERENCE_ARM, seed, cell: cellWorld, onReview: (input) => { keys.add(JSON.stringify(Object.keys(input).sort())); } });
  const want = JSON.stringify(["dims", "fixedDue", "history", "now", "slots"]);
  return { ok: keys.size === 1 && keys.has(want), keys: [...keys] };
}
/** T9 the interface path is the baseline: a fixture that returns `fixedDue` gives the reference arm's episode, byte for byte. */
export function t9FixedCopy({ persona, seed, cellWorld }) {
  const a = runEpisode2({ persona, arm: REFERENCE_ARM, seed, cell: cellWorld });
  const b = runEpisode2({ persona, arm: "default-order+fixture-review-fixedcopy", seed, cell: cellWorld });
  return { ok: a.hash === b.hash, hashes: [a.hash, b.hash] };
}
export { reviewInput };
