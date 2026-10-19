// Criterion §5 tests T1 to T7 as functions. T1-T4 test a policy (a failure makes it INVALID); T5-T7 test the judge
// (a failure stops the run; it is the eval's defect). Used by tests.test.mjs (C1: default-order and fixtures only,
// because of the freeze lock) and by `harness.mjs run` (C4: every policy under test).
// owner: personalization-eval (Uma) · run: eval-c1-1016 · criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md §5
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../model/model.ts";
import { runEpisode, choose, catalog } from "./harness.mjs";
import { makeLearner, u01 } from "./learner.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const orderOf = (comp) => JSON.stringify(comp.picks.map((p) => [p.slug, p.moved, p.reason]));

/** T1 replay (AMD-008 P1): the same episode in two separate processes gives the same hash. */
export function t1Replay({ persona, seed, cell = "base", policy }) {
  const run = () => spawnSync(process.execPath, [join(HERE, "harness.mjs"), "episode", `--persona=${persona}`, `--seed=${seed}`, `--cell=${cell}`, `--policy=${policy}`],
    { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  const a = run(), b = run();
  if (a.status !== 0 || b.status !== 0) return { ok: false, why: `process failed: ${a.stderr || b.stderr}` };
  const ha = a.stdout.trim(), hb = b.stdout.trim();
  return { ok: ha === hb && /^[0-9a-f]{64}$/.test(ha), a: ha, b: hb };
}

/**
 * T2 pick replay, T3 forbidden-input invariance, T4 explanation: run one episode and check every pick.
 * Returns { t2: {ok, fails}, t3: {ok, fails}, t4: {ok, fails, checked} }. Fails are capped at 5 examples each.
 */
export function pickChecks({ persona, seed, cell, policy, t4 = true }) {
  const cat = catalog();
  const res = { t2: { ok: true, fails: [] }, t3: { ok: true, fails: [] }, t4: { ok: true, fails: [], checked: 0 } };
  const fail = (k, x) => { res[k].ok = false; if (res[k].fails.length < 5) res[k].fails.push(x); };
  runEpisode({ persona, policy, seed, cell, cat, onPick: (input, comp, ctx) => {
    const order = orderOf(comp);
    const draws = ctx.draws;
    const replayRand = () => { let i = 0; return () => (i < draws.length ? draws[i++] : NaN); };
    // T2: identical input (a deep copy) and the same random draws give the identical order.
    const again = choose(policy, structuredClone(input), cat, replayRand());
    if (orderOf(again) !== order) fail("t2", { day: ctx.day, t: ctx.t });
    // T3: every FORBIDDEN_INPUTS entry at two different values, on the input and on the fingerprint.
    for (const k of M.FORBIDDEN_INPUTS) {
      const variants = [1, 7].map((v) => {
        const x = structuredClone(input); x[k] = v; x.fingerprint[k] = v;
        return orderOf(choose(policy, x, cat, replayRand()));
      });
      if (variants[0] !== variants[1]) fail("t3", { input: k, day: ctx.day });
    }
    // T4: every pick with terms: terms sum to its score; a moved pick is the best eligible-to-move candidate and beat the
    // default card by more than the move threshold; an unmoved pick is the default card.
    if (t4) for (const [i, p] of comp.picks.entries()) {
      if (p.reason === "due-revisit") continue;
      res.t4.checked++;
      if (!p.terms.length) { fail("t4", { why: "pick carries no terms", slug: p.slug }); continue; }
      const sum = p.terms.reduce((a, b) => a + b.value, 0);
      if (Math.abs(sum - p.score) > 1e-9) fail("t4", { why: "terms do not sum to the score", slug: p.slug, sum, score: p.score });
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

/** T5 judge isolation, static: the judge modules import nothing and never name the rating field. */
export const JUDGE_MODULES = ["learner.mjs", "scorer.mjs", "world-inputs.mjs", "personas.copy.mjs"];
export function staticIsolation(source) {
  const code = source.split("\n").filter((l) => !/^\s*(\/\/|\*|\/\*\*)/.test(l)).join("\n");
  const problems = [];
  if (/^\s*import\s|\bimport\s*\(|\brequire\s*\(/m.test(code)) problems.push("imports a module");
  if (/misconceptionStrength|strengthSource/.test(source)) problems.push("names the rating field");
  return problems;
}
export function t5Static() {
  const out = {};
  for (const f of JUDGE_MODULES) out[f] = staticIsolation(readFileSync(join(HERE, f), "utf8"));
  return { ok: Object.values(out).every((p) => !p.length), files: out };
}

/** T6 judge isolation, dynamic: permuting the ratings in the composer's view, or changing rho, leaves the judge's
 *  hidden state and the default-order arm byte-identical. */
export function t6Dynamic({ persona, seed, cellWorld }) {
  const cat = catalog();
  const slugs = cat.lessons.map((l) => l.slug);
  const shuffled = [...slugs];
  for (let i = shuffled.length - 1; i > 0; i--) { const k = Math.floor(u01(`t6|${seed}|${i}`) * (i + 1)); [shuffled[i], shuffled[k]] = [shuffled[k], shuffled[i]]; }
  const permute = Object.fromEntries(slugs.map((s, i) => [s, shuffled[i]]));
  const a = runEpisode({ persona, policy: "default-order", seed, cell: cellWorld, cat });
  const b = runEpisode({ persona, policy: "default-order", seed, cell: cellWorld, cat, permute });
  const c = runEpisode({ persona, policy: "default-order", seed, cell: { ...cellWorld, rho: cellWorld.rho === 1 ? 0 : 1 }, cat });
  return { ok: a.worldHash === b.worldHash && a.hash === b.hash && a.worldHash === c.worldHash && a.hash === c.hash,
    worldHashes: [a.worldHash, b.worldHash, c.worldHash], episodeHashes: [a.hash, b.hash, c.hash] };
}

// ---- T7 known answers on a two-concept world (A is B's prerequisite) ----
const DAY = 86_400_000;
export function knownAnswerWorld(over = {}) {
  return { forgetK: 0.1, pullModifier: 0, pullScale: 1, priorKnowledge: { probability: 0, cs: 0 }, learnPrereqPenalty: 0,
    forgetPrereqPenalty: 0, hypercorrection: 0, novelty: 0, predictionFeedback: 0.1, learnRate: 0.7, slip: 0.1, guessRecall: 0.2,
    relearn: 0.5, revisitStrengthen: 0.5, stopBeforeRevealShare: 0.5, interest: { probability: 0.5, cs: 0.5 }, stopHazard: 0, ...over };
}
const GRAPH = { prereqsOf: (c) => (c === "probability:b" ? ["probability:a"] : []), pilotConcepts: ["probability:a", "probability:b"] };
const A = { slug: "lesson-a", concept: "probability:a", domain: "probability" };
const B = { slug: "lesson-b", concept: "probability:b", domain: "probability" };

/** (a) forgetting 0: a learned concept recalls with P 1. */
export function t7Forgetting0(seeds = 200) {
  let worst = 0, learnedN = 0;
  for (let s = 1; s <= seeds; s++) {
    const L = makeLearner({ seed: s, personaId: "t7", world: knownAnswerWorld({ forgetK: 0, hypercorrection: 0.15 }), graph: GRAPH, pullOf: () => 0.6 });
    const o = L.study(A, 0);
    if (!o.learned) continue;
    learnedN++;
    for (const d of [1, 7, 30, 365]) worst = Math.max(worst, Math.abs(1 - L.recallProb(A, d * DAY)));
  }
  return { ok: learnedN > 0 && worst <= 1e-9, worst, learnedN };
}

/** Expected R of studying `order` at 0 and 2 min, each lesson read one day after its own completion (so the order
 *  changes no lesson's retention interval; the clock offset is a timing effect, not a prerequisite effect). */
function expectedR(seed, world, order) {
  const L = makeLearner({ seed, personaId: "t7", world, graph: GRAPH, pullOf: () => 0.6 });
  const at = {};
  order.forEach((x, i) => { L.study(x, i * 120_000); at[x.slug] = i * 120_000; });
  return (L.recallProb(A, at[A.slug] + DAY) + L.recallProb(B, at[B.slug] + DAY)) / 2;
}
/** (b) prerequisite penalty 0: the order of a prerequisite pair does not change expected R. Control: at 0.4 it does. */
export function t7Prereq0(seeds = 400) {
  let worst = 0, sumAB = 0, sumBA = 0, cAB = 0, cBA = 0;
  for (let s = 1; s <= seeds; s++) {
    const w0 = knownAnswerWorld({ learnPrereqPenalty: 0 });
    const ab = expectedR(s, w0, [A, B]), ba = expectedR(s, w0, [B, A]);
    worst = Math.max(worst, Math.abs(ab - ba)); sumAB += ab; sumBA += ba;
    const w4 = knownAnswerWorld({ learnPrereqPenalty: 0.4 });
    cAB += expectedR(s, w4, [A, B]); cBA += expectedR(s, w4, [B, A]);
  }
  return { ok: worst <= 1e-9 && Math.abs(sumAB - sumBA) / seeds <= 1e-9, worst, controlGap: (cAB - cBA) / seeds, controlOk: (cAB - cBA) / seeds > 0.01 };
}

/** (c) surprise 0: a wrong prediction does not change retention. Control: at hypercorrection 0.15 it does. */
export function t7Surprise0(seeds = 200) {
  let worst = 0, control = 0;
  for (let s = 1; s <= seeds; s++) {
    for (const h of [0, 0.15]) {
      const wrong = makeLearner({ seed: s, personaId: "t7", world: knownAnswerWorld({ hypercorrection: h }), graph: GRAPH, pullOf: () => 1 });
      const right = makeLearner({ seed: s, personaId: "t7", world: knownAnswerWorld({ hypercorrection: h }), graph: GRAPH, pullOf: () => 0 });
      const ow = wrong.study(A, 0), or = right.study(A, 0);
      if (ow.predictedRight || !or.predictedRight) return { ok: false, why: "pull 1 / pull 0 did not force the prediction" };
      const d = Math.abs(wrong.recallProb(A, DAY) - right.recallProb(A, DAY));
      if (h === 0) worst = Math.max(worst, d); else control = Math.max(control, d);
    }
  }
  return { ok: worst <= 1e-9, worst, control, controlOk: control > 0.01 };
}
