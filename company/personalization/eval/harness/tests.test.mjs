// Harness tests (criterion §5 T1 to T7) as they can run BEFORE the freeze.
//   NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/tests.test.mjs
// owner: personalization-eval (Uma) · run: eval-c1-1016
//
// T5-T7 test the judge and must pass (batch-2 C1 "Done"). T1-T4 test policies; under the freeze lock they run here only
// on the default-order arm and on fixture policies: a positive control that must pass and a deliberate break that must
// fail, so each test is shown able to fail. No policy under test is run, scored or compared in this file. In C4 the same
// functions (checks.mjs) run on every policy under test.
import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PERSONAS } from "./personas.copy.mjs";
import { cellByName, assertScoringAllowed, criterionStatus, poolFor, catalog } from "./harness.mjs";
import { t1Replay, pickChecks, t5Static, staticIsolation, t6Dynamic, t7Forgetting0, t7Prereq0, t7Surprise0 } from "./checks.mjs";
import { simulatedRating, hiddenPull, triangularMoments, normal, makeLearner } from "./learner.mjs";
import { knownAnswerWorld } from "./checks.mjs";
import { B2, cells } from "./world-inputs.mjs";
import { judgeCell, outcome, paired, seedsFromSd, t975 } from "./scorer.mjs";

const base = cellByName("base");
const P = (id) => PERSONAS.find((p) => p.id === id);

// ---------------- T5 to T7: the judge ----------------
test("T5 judge isolation, static: judge modules import nothing and never name the rating field", () => {
  const r = t5Static();
  assert.ok(r.ok, JSON.stringify(r.files));
});
test("T5 control: the static check catches an import and a rating read", () => {
  assert.deepEqual(staticIsolation(`import * as M from "../../model/model.ts";\nexport const x = 1;`), ["imports a module"]);
  assert.deepEqual(staticIsolation(`const s = lesson.misconceptionStrength;`), ["names the rating field"]);
  assert.deepEqual(staticIsolation(`const C = await import("../../model/sim/composer.ts");`), ["imports a module"]);
});

test("T6 judge isolation, dynamic: permuted ratings and any rho leave the hidden state and default-order byte-identical", () => {
  for (const id of ["curious-newcomer", "struggling-repeater", "returning-expert"]) {
    for (const seed of [1001, 1002]) {
      const r = t6Dynamic({ persona: P(id), seed, cellWorld: base });
      assert.ok(r.ok, `${id} ${seed} ${JSON.stringify(r)}`);
    }
  }
});
test("T6 control: the world hash moves when the hidden world moves (another seed)", () => {
  const a = t6Dynamic({ persona: P("wanderer"), seed: 1001, cellWorld: base });
  const b = t6Dynamic({ persona: P("wanderer"), seed: 1003, cellWorld: base });
  assert.notEqual(a.worldHashes[0], b.worldHashes[0]);
});

test("T7a forgetting 0: a learned concept recalls with P 1 (1e-9)", () => {
  const r = t7Forgetting0();
  assert.ok(r.ok, JSON.stringify(r));
});
test("T7b prerequisite penalty 0: the order of a prerequisite pair does not change expected R (1e-9); control at 0.4 does", () => {
  const r = t7Prereq0();
  assert.ok(r.ok, JSON.stringify(r));
  assert.ok(r.controlOk, `control: ${JSON.stringify(r)}`);
});
test("T7c surprise 0: a wrong prediction does not change retention (1e-9); control at 0.15 does", () => {
  const r = t7Surprise0();
  assert.ok(r.ok, JSON.stringify(r));
  assert.ok(r.controlOk, `control: ${JSON.stringify(r)}`);
});
test("T7d ratings: rho 1 gives levels monotone in the hidden pull; rho 0 gives levels unrelated to it", () => {
  const cat = catalog();
  const xs = [], ys1 = [], ys0 = [];
  for (let seed = 1001; seed < 1011; seed++) for (const l of cat.lessons) {
    xs.push(hiddenPull(seed, l.slug, B2.pull));
    ys1.push(simulatedRating(seed, l.slug, 1, B2.pull));
    ys0.push(simulatedRating(seed, l.slug, 0, B2.pull));
  }
  for (let i = 0; i < xs.length; i++) for (let j = 0; j < 50 && i + j < xs.length; j++) {
    if (xs[i] < xs[i + j]) assert.ok(ys1[i] <= ys1[i + j], "rho 1 not monotone");
  }
  const corr = (a, b) => { const ma = a.reduce((x, y) => x + y) / a.length, mb = b.reduce((x, y) => x + y) / b.length;
    let sab = 0, saa = 0, sbb = 0; for (let i = 0; i < a.length; i++) { sab += (a[i] - ma) * (b[i] - mb); saa += (a[i] - ma) ** 2; sbb += (b[i] - mb) ** 2; } return sab / Math.sqrt(saa * sbb); };
  assert.ok(Math.abs(corr(xs, ys0)) < 0.06, `rho 0 correlation ${corr(xs, ys0)}`);
  assert.ok(corr(xs, ys1) > 0.8, `rho 1 correlation ${corr(xs, ys1)}`);
  // the continuous view has correlation rho with the hidden pull (before rounding)
  const { mean, sd } = triangularMoments(B2.pull.low, B2.pull.base, B2.pull.high);
  const z = xs.map((x) => (x - mean) / sd);
  let k = 0; const obs = [];
  for (let seed = 1001; seed < 1011; seed++) for (const l of cat.lessons) { obs.push(0.5 * z[k++] + Math.sqrt(0.75) * normal(`${seed}|world|${l.slug}|rating|0`)); }
  assert.ok(Math.abs(corr(z, obs) - 0.5) < 0.06, `rho 0.5 continuous correlation ${corr(z, obs)}`);
});

// ---------------- T1 to T4: on default-order and fixtures only (freeze lock) ----------------
test("T1 replay: default-order, two processes, identical hashes", () => {
  for (const persona of ["curious-newcomer", "lapsed-returner"]) for (const cell of ["base", "prereqPenalty-high"]) {
    const r = t1Replay({ persona, seed: 1001, cell, policy: "default-order" });
    assert.ok(r.ok, JSON.stringify(r));
  }
});
test("T1 control: a policy that uses Math.random fails replay", () => {
  const r = t1Replay({ persona: "wanderer", seed: 1001, policy: "fixture-nondeterministic" });
  assert.equal(r.ok, false);
});
test("T2/T3 on default-order: pick replay and forbidden-input invariance hold at every pick", () => {
  const r = pickChecks({ persona: P("single-subject-crammer"), seed: 1001, cell: base, policy: "default-order", t4: false });
  assert.ok(r.t2.ok && r.t3.ok, JSON.stringify(r));
});
test("T2 control: a nondeterministic policy fails pick replay", () => {
  const r = pickChecks({ persona: P("wanderer"), seed: 1001, cell: base, policy: "fixture-nondeterministic", t4: false });
  assert.equal(r.t2.ok, false);
});
test("T3 control: a policy that reads sessionCount fails forbidden-input invariance, and only on that entry", () => {
  const r = pickChecks({ persona: P("wanderer"), seed: 1001, cell: base, policy: "fixture-forbidden-reader", t4: false });
  assert.equal(r.t3.ok, false);
  assert.ok(r.t3.fails.every((f) => f.input === "sessionCount"), JSON.stringify(r.t3.fails));
});
test("T4 positive control: an explained default pick passes", () => {
  const r = pickChecks({ persona: P("wanderer"), seed: 1001, cell: base, policy: "fixture-explained-default" });
  assert.ok(r.t4.ok && r.t4.checked > 0, JSON.stringify(r.t4));
});
test("T4 control: terms that do not sum to the score fail", () => {
  const r = pickChecks({ persona: P("wanderer"), seed: 1001, cell: base, policy: "fixture-bad-explanation" });
  assert.equal(r.t4.ok, false);
});

// ---------------- the freeze lock and the counterfactual's construction ----------------
test("freeze lock: while a criterion is unfrozen, only default-order and fixtures may be scored; frozen allows all", () => {
  // C4: the real criterion is frozen from C4 on, so the lock is tested on temporary copies in both states.
  const dir = mkdtempSync(join(tmpdir(), "eval-lock-"));
  const src = readFileSync(new URL("../2026-10-16-phase-a-criterion.md", import.meta.url), "utf8");
  const draft = join(dir, "draft.md"), frozen = join(dir, "frozen.md");
  writeFileSync(draft, src.replace(/^status:.*$/m, "status: draft (unfrozen)"));
  writeFileSync(frozen, src.replace(/^status:.*$/m, "status: frozen"));
  assert.doesNotThrow(() => assertScoringAllowed(["default-order", "fixture-explained-default"], draft));
  for (const p of ["gam", "draft-rules", "random", "epsilon-greedy", "gam-no-surprise-novelty", "gam-no-breadth", "gam-surprise-on"]) {
    assert.throws(() => assertScoringAllowed([p], draft), /freeze lock/);
  }
  assert.doesNotThrow(() => assertScoringAllowed(["gam"], frozen));
  assert.ok(["missing"].indexOf(criterionStatus()) === -1, "the criterion file has a status line");
});
test("gam-surprise-on differs from gam only in the gate flag and the rating source tag", async () => {
  const M = await import("../../model/model.ts");
  const { COMPOSER_SURPRISE_ON, GAM_OFF } = await import("./harness.mjs");
  const a = structuredClone(M.COMPOSER), b = structuredClone(COMPOSER_SURPRISE_ON);
  assert.equal(M.COMPOSER.surpriseGate.active, false);
  assert.equal(b.surpriseGate.active, true);
  delete a.surpriseGate.active; delete b.surpriseGate.active; delete a.surpriseGate.why; delete b.surpriseGate.why;
  assert.deepEqual(a, b);
  assert.deepEqual(GAM_OFF["gam-surprise-on"], GAM_OFF.gam);
  const cat = catalog();
  const p0 = poolFor(cat, 1001, 0.5), p1 = poolFor(cat, 1001, 0.5, { surpriseOn: true });
  for (let i = 0; i < p0.length; i++) {
    const x = { ...p1[i] }; assert.ok(M.COMPOSER.surpriseGate.requiresStrengthSource.includes(x.strengthSource));
    delete x.strengthSource; assert.deepEqual(x, p0[i]);
  }
});

// ---------------- scorer arithmetic ----------------
test("scorer: t quantile, paired interval, S rule, judge rule on synthetic numbers", () => {
  assert.ok(Math.abs(t975(10) - 2.228139) < 1e-3 && Math.abs(t975(199) - 1.971957) < 1e-4);
  const r = paired([1, 2, 3, 4], [0, 0, 0, 0]);
  assert.ok(Math.abs(r.mean - 2.5) < 1e-12 && r.lo < 2.5 && r.hi > 2.5);
  assert.equal(seedsFromSd(0.0315, 0.01, 200, 2000), 200);
  assert.equal(seedsFromSd(0.1, 0.01, 200, 2000), 1568);
  assert.equal(seedsFromSd(1, 0.01, 200, 2000), 2000);
  const C = { deltaMin: 0.01, deltaHarm: 0.01, winsNeeded: 4, g1MaxRise: 0.05, g2MaxRelFall: 0.05, g3MaxRise: 0.02, g4MaxRelFall: 0.05 };
  const ep = (R) => ({ R, g1TopDomainShare: 0.5, g2Concepts: 50, g3PrereqFirst: 0.1, g4Gain: 40 });
  const series = (m) => Array.from({ length: 50 }, (_, i) => ep(0.7 + m + (i % 5) * 0.001));
  const ids = ["a", "b", "c", "d", "e", "f"];
  const mk = (deltas) => ({ gam: Object.fromEntries(ids.map((p, i) => [p, series(deltas[i])])), base: Object.fromEntries(ids.map((p) => [p, series(0)])), dflt: Object.fromEntries(ids.map((p) => [p, series(0)])) });
  assert.equal(judgeCell({ ...mk([0.02, 0.02, 0.02, 0.02, 0, 0]), C }).beats, true);
  assert.equal(judgeCell({ ...mk([0.02, 0.02, 0.02, 0.005, 0, 0]), C }).beats, false, "3 wins is not enough");
  assert.equal(judgeCell({ ...mk([0.02, 0.02, 0.02, 0.02, 0.02, -0.015]), C }).beats, false, "a harm of 1.5 points fails at δ_harm 0.01");
  assert.deepEqual(outcome({ invalid: false, baseBeats: true, oatBeats: { a: true, b: false } }), { verdict: "FAIL-SENSITIVE", cells: ["b"] });
  assert.equal(cells().filter((c) => c.kind === "one-at-a-time").length, 9, "8 B2/exit-row cells + learnRate-low (C4, C2 F2)");
  assert.ok(cells().some((c) => c.name === "learnRate-low" && c.world.learnRate === 0.35));
  assert.equal(cells().filter((c) => c.kind === "corner").length, 16);
});

// ---------------- C4 answers to the C2 fidelity review (company/personalization/evidence/2026-10-16-simulator-fidelity-review.md) ----------------
const DAYMS = 86_400_000;
test("C2 F1: recall decays the increment above the guess floor: P(t) = g + (1 - g)·exp(-k·t)", () => {
  const g1 = { prereqsOf: () => [], pilotConcepts: ["probability:a"] };
  const A1 = { slug: "lesson-a", concept: "probability:a", domain: "probability" };
  let checked = 0;
  for (let s = 1; s <= 50; s++) {
    const L = makeLearner({ seed: s, personaId: "f1", world: knownAnswerWorld({ forgetK: 0.2, stopHazard: 0 }), graph: g1, pullOf: () => 0 });
    if (!L.study(A1, 0).learned) continue;
    checked++;
    for (const d of [1, 7, 30]) assert.ok(Math.abs(L.recallProb(A1, d * DAYMS) - (0.2 + 0.8 * Math.exp(-0.2 * d))) < 1e-12);
  }
  assert.ok(checked > 0);
});
test("C2 F3: the novelty boost depends on the order (domain switch from the previous completed card), not on 'concept unseen'", () => {
  const g2 = { prereqsOf: () => [], pilotConcepts: ["probability:a", "probability:b", "cs:c"] };
  const pa = { slug: "pa", concept: "probability:a", domain: "probability" };
  const pb = { slug: "pb", concept: "probability:b", domain: "probability" };
  const cc = { slug: "cc", concept: "cs:c", domain: "cs" };
  let sameDiffers = 0, switchDiffers = 0;
  for (let s = 1; s <= 400; s++) {
    const run = (nov, first) => { const L = makeLearner({ seed: s, personaId: "f3", world: knownAnswerWorld({ novelty: nov, learnRate: 0.5 }), graph: g2, pullOf: () => 0 });
      L.study(first, 0); return L.study(pb, 120_000).learned; };
    if (run(0, pa) !== run(0.5, pa)) sameDiffers++;     // same domain before: no boost, whatever the benefit
    if (run(0, cc) !== run(0.5, cc)) switchDiffers++;   // domain switch: the boost applies
  }
  assert.equal(sameDiffers, 0);
  assert.ok(switchDiffers > 0);
});
