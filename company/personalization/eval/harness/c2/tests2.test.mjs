// Criterion 2 harness tests as they can run BEFORE the freeze.
//   NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/c2/tests2.test.mjs
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md §5
//
// T5-T9 test the judge and must pass. T1-T4 and R1-R4 test arms; under the freeze lock they run here only on the
// reference arm and on fixtures (a positive control that passes and a deliberate break that fails). No arm under test
// (draft-rules, random, gam, the oracles, the candidate) is run, scored or compared in this file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { cellByName2, assertScoringAllowed2, criterionStatus2, runEpisode2, fixedDue, gamFingerprint, GAM_FROZEN_VERSION, REVIEW_FIXTURES, reviewInput, decisionProblems } from "./harness2.mjs";
import * as K from "./checks2.mjs";
import { E1, cells2, EPISODE2, CRITERION2 } from "./world2.mjs";
import { judgePair2, outcome2, headroom, seedsFromSd } from "./scorer2.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const base = cellByName2("base");
const P = (id) => PERSONAS.find((p) => p.id === id);
const DAY = 86_400_000;

// ---------------- the judge ----------------
test("T5 judge isolation, static: criterion 2's judge modules import nothing and never name the rating field", () => {
  const r = K.t5Static2();
  assert.ok(r.ok, JSON.stringify(r.files));
});
test("T6 judge isolation, dynamic: permuted ratings leave the hidden world and the reference arm byte-identical", () => {
  for (const id of ["curious-newcomer", "returning-expert"]) for (const seed of [1001, 1002]) assert.ok(K.t6Dynamic2({ persona: P(id), seed, cellWorld: base }).ok, `${id} ${seed}`);
});
test("T7a forgetting 0: a learned concept recalls with P 1 and the final-test read counts it as 1", () => assert.ok(K.t7aForgetting0().ok));
test("T7b prerequisite penalty 0: order of a prerequisite pair leaves the final-test read unchanged; 0.4 does not", () => { const r = K.t7bPrereq0(); assert.ok(r.ok, JSON.stringify(r)); });
test("T7c lag form (K2): a retrieval at r = 1 multiplies the rate by s1; one at r = e^-2 by s1^r s0^(1-r)", () => { const r = K.t7cLag(); assert.ok(r.ok, JSON.stringify(r)); });
test("T7f forgetting shape after day 7 and the learner x lesson spread of k (K2, F1 B1, B3)", () => { const r = K.t7fShapeSpread(); assert.ok(r.ok, JSON.stringify(r)); });
test("T7g a right guess on a known concept does not strengthen (K2, F1 N5)", () => { const r = K.t7gGuessNoStrengthen(); assert.ok(r.ok, JSON.stringify(r)); });
test("T7h pre-history follows the episode's law: a right recall can be a guess (K2, F1 B5)", () => { const r = K.t7hPrehistoryLaw(); assert.ok(r.ok, JSON.stringify(r)); });
test("T7d reading is pure: the final-test read, recall and oracle reads change no state", () => assert.ok(K.t7dReadPure().ok));
test("T7e a lucky guess on an unknown concept does not make it known (relearn 0)", () => assert.ok(K.t7eLuckyGuess().ok));
test("T8 the review input carries exactly the interface fields (nothing about the read times)", () => {
  const r = K.t8InputShape({ persona: P("wanderer"), seed: 1001, cellWorld: base });
  assert.ok(r.ok, JSON.stringify(r.keys));
});
test("T9 the interface path is the baseline: a fixture returning fixedDue reproduces the reference arm byte for byte", () => {
  for (const p of PERSONAS) assert.ok(K.t9FixedCopy({ persona: p, seed: 1001, cellWorld: base }).ok, p.id);
});
test("final-test read times depend on the episode definition only (same for every arm)", () => {
  const tLast = EPISODE2.baseTime + (EPISODE2.days - 1) * DAY + EPISODE2.sessionStartHour * 3_600_000;
  assert.deepEqual(EPISODE2.horizonsDays.map((h) => tLast + h * DAY - EPISODE2.baseTime), [14.375, 20.375, 43.375].map((d) => d * DAY));
});

// ---------------- the fixed schedule (interface §I.5) ----------------
test("fixedDue follows src/kit/progress.ts revisitDue: 1, 3, 7, 21 days after the last result; failure restarts; retire after 4", () => {
  const t0 = 1_000 * DAY;
  const h = (recalls) => [{ slug: "x", completedAt: t0, recalls }];
  assert.deepEqual(fixedDue(h([]), t0 + DAY - 1, 12), []);
  assert.deepEqual(fixedDue(h([]), t0 + DAY, 12), ["x"]);
  assert.deepEqual(fixedDue(h([{ at: t0 + DAY, correct: true }]), t0 + 3 * DAY, 12), []);
  assert.deepEqual(fixedDue(h([{ at: t0 + DAY, correct: true }]), t0 + 4 * DAY, 12), ["x"]);
  assert.deepEqual(fixedDue(h([{ at: t0 + DAY, correct: true }, { at: t0 + 4 * DAY, correct: false }]), t0 + 6 * DAY, 12), []);
  assert.deepEqual(fixedDue(h([{ at: t0 + DAY, correct: true }, { at: t0 + 4 * DAY, correct: false }]), t0 + 7 * DAY, 12), ["x"]);
  const four = [1, 4, 11, 32].map((d) => ({ at: t0 + d * DAY, correct: true }));
  assert.deepEqual(fixedDue(h(four), t0 + 400 * DAY, 12), []);
  const src = readFileSync(join(HERE, "..", "..", "..", "..", "..", "src", "kit", "progress.ts"), "utf8");
  assert.match(src, /REVISIT_SCHEDULE_DAYS = \[1, 3, 7, 21\]/, "the product schedule changed: criterion 2's baseline must follow it");
});
test("fixedDue: oldest first, capped at slots; the review input cuts recalls to 30 days and is frozen", () => {
  const t = 100 * DAY;
  const hist = [{ slug: "b", completedAt: 10 * DAY, recalls: [] }, { slug: "a", completedAt: 10 * DAY, recalls: [] }, { slug: "c", completedAt: 5 * DAY, recalls: [{ at: 50 * DAY, correct: false }] }];
  assert.deepEqual(fixedDue(hist, t, 2), ["a", "b"]);
  const inp = reviewInput(hist, t, Object.freeze({}), 12);
  assert.equal(inp.history[2].recalls.length, 0);
  assert.ok(Object.isFrozen(inp) && Object.isFrozen(inp.history) && Object.isFrozen(inp.history[0].recalls));
  assert.deepEqual(decisionProblems({ revisits: [{ slug: "a", reason: "r" }, { slug: "a", reason: "r" }] }, inp), ["slug twice: a"]);
  assert.deepEqual(decisionProblems({ revisits: [{ slug: "z", reason: "" }] }, inp), ["slug not in history: z", "no reason for z"]);
});

// ---------------- arm checks on fixtures (each shown able to fail) ----------------
test("T1 replay: the reference arm gives the same hash in two processes; a Math.random review fixture does not", () => {
  assert.ok(K.t1Replay2({ persona: "curious-newcomer", seed: 1001, arm: "default-order+fixed" }).ok);
  let failed = false;
  for (const seed of [1001, 1002, 1003]) if (!K.t1Replay2({ persona: "wanderer", seed, arm: "default-order+fixture-review-random" }).ok) failed = true;
  assert.ok(failed, "T1 could not fail");
});
test("T2/T3 on the reference arm's order rule pass", () => {
  const r = K.pickChecks2({ persona: P("wanderer"), seed: 1001, cell: base, arm: "default-order+fixed", t4: false });
  assert.ok(r.t2.ok && r.t3.ok, JSON.stringify(r));
});
test("R1-R4: the fixed-schedule copy and the every-session fixture pass; each break fails its own check only", () => {
  const rc = (f) => K.reviewChecks({ persona: P("curious-newcomer"), seed: 1001, cell: base, arm: `default-order+${f}` });
  for (const f of ["fixture-review-fixedcopy", "fixture-review-early"]) { const r = rc(f); assert.ok(r.r1.ok && r.r2r3.ok && r.r4.ok && r.sessions === EPISODE2.days, f); }
  const rnd = rc("fixture-review-random"); assert.ok(!rnd.r1.ok && rnd.r2r3.ok);
  const mut = rc("fixture-review-mutator"); assert.ok(!mut.r2r3.ok);
  const fb = rc("fixture-review-forbidden"); assert.ok(fb.r1.ok && fb.r2r3.ok && !fb.r4.ok);
  const bad = rc("fixture-review-badslug"); assert.ok(!bad.r2r3.ok);
});

// ---------------- the freeze lock ----------------
test("freeze lock: while criterion 2 is a draft, only the reference arm and fixtures run; frozen allows all", () => {
  // K2: the real file is frozen from the freeze commit on; both states are tested on temporary copies.
  assert.match(criterionStatus2(), /^frozen/);
  const dir = mkdtempSync(join(tmpdir(), "c2lock-"));
  const f = join(dir, "c.md");
  writeFileSync(f, "# x\nstatus: draft (unfrozen)\n");
  assert.doesNotThrow(() => assertScoringAllowed2(["default-order+fixed", "default-order+fixture-review-early"], f));
  for (const a of ["gam+fixed", "draft-rules+fixed", "random+fixed", "oracle-order+fixed", "default-order+oracle-review@0.5", "default-order+candidate", "default-order+none"]) assert.throws(() => assertScoringAllowed2([a], f), /freeze lock/, a);
  writeFileSync(f, "# x\nstatus: frozen\n");
  assert.doesNotThrow(() => assertScoringAllowed2(["gam+fixed", "default-order+candidate"], f));
  writeFileSync(f, "# x\nstatus: draft (unfrozen)\n");
  assert.throws(() => assertScoringAllowed2(["gam+fixed"], f), /freeze lock/);
  assert.throws(() => runEpisode2({ persona: P("wanderer"), arm: "default-order+candidate", seed: 1001, cell: base }), /candidate not loaded/);
});

// ---------------- pre-commitment 1, cells, rule ----------------
test("the GAM is model-v0.2.2 as frozen: version, gates and fingerprint pinned", () => {
  assert.equal(M.MODEL_VERSION, GAM_FROZEN_VERSION);
  assert.equal(M.COMPOSER.noveltyGate.active, false);
  assert.equal(M.COMPOSER.surpriseGate.active, false);
  assert.equal(gamFingerprint(), readFileSync(join(HERE, "gam-v0.2.2.sha256"), "utf8").trim());
});
test("cells: base, 19 one-at-a-time (every swept row at E1 low and high, revisit stop at 0.5), 8 corners", () => {
  const c = cells2();
  assert.equal(c.filter((x) => x.kind === "base").length, 1);
  assert.equal(c.filter((x) => x.kind === "one-at-a-time").length, 19);
  assert.equal(c.find((x) => x.name === "base").world.revisitStrengthen, "lag");
  assert.ok(c.find((x) => x.name === "learnRate-high").world.learnRate === 0.8);
  assert.equal(c.filter((x) => x.kind === "corner").length, 8);
  assert.ok(c.find((x) => x.name === "priorKnowledgeMean-low").world.priorKnowledgeMean === E1.priorKnowledgeMean.low);
});
test("the rule: wins need lo > 0 and mean >= δ_min; a harm blocks; headroom reads wins only; outcomes as phase A", () => {
  const mk = (k, nAll = 50) => ({ K: { 1: k, 7: k, 30: k }, nAll, nNew: 20, g1TopDomainShare: 0.5, revisitShare: 0.7, g2Concepts: 20, g3PrereqFirst: 0, g4Gain: 10 });
  const n = 60;
  const arr = (f) => Array.from({ length: n }, (_, i) => f(i));
  const a = {}, b = {}, r = {};
  for (let p = 0; p < 6; p++) {
    const gain = p < 4 ? 1.5 : 0; // +0.03 per lesson in 4 personas
    a[`p${p}`] = arr((i) => mk(10 + gain + (i % 3) * 0.01)); b[`p${p}`] = arr(() => mk(10)); r[`p${p}`] = arr(() => mk(10));
  }
  const j = judgePair2({ a, b, ref: r, C: CRITERION2, H: 7, guardrails: "review" });
  assert.equal(j.wins, 4); assert.ok(j.beats); assert.equal(headroom(j, CRITERION2), "HEADROOM");
  a.p5 = arr(() => mk(9)); // -0.02: a harm
  const j2 = judgePair2({ a, b, ref: r, C: CRITERION2, H: 7, guardrails: "none" });
  assert.ok(!j2.beats && j2.harmed.includes("p5"));
  assert.deepEqual(outcome2({ invalid: false, baseBeats: true, oatBeats: { x: true, y: false } }), { verdict: "FAIL-SENSITIVE", cells: ["y"] });
  assert.equal(seedsFromSd(0.0648443696598731, 0.01, 200, 2000), 660);
});
test("S record: computed from the reference arm alone at the E1 block as filled in K2", () => {
  const rec = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-16-seeds-c2-k2.json"), "utf8"));
  assert.equal(rec.inputsHash, createHash("sha256").update(JSON.stringify(E1)).digest("hex"));
  assert.equal(rec.S, seedsFromSd(rec.sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap));
  assert.ok(!JSON.stringify(rec).match(/"mean"|gam|draft|oracle|candidate/), "the S record holds SDs only, of the reference arm");
});

// ---------------- phase A untouched (readout 1 stays the record) ----------------
test("phase A judge and glue files are byte-identical to readout 1's manifest", () => {
  const man = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-16-readout-1", "pass", "manifest.json"), "utf8"));
  for (const f of ["harness.mjs", "learner.mjs", "scorer.mjs", "world-inputs.mjs", "personas.copy.mjs", "checks.mjs", "run.mjs", "run-worker.mjs"]) {
    assert.equal(createHash("sha256").update(readFileSync(join(HERE, "..", f))).digest("hex"), man.fileSha256[f], f);
  }
});

test("§I.7: fixedDue is computed from the full history, the policy's recalls are cut to 30 days", () => {
  const now = 100 * DAY;
  const four = [1, 3, 7, 21].reduce((acc, w, i) => [...acc, { at: (i ? acc[i - 1].at : 10 * DAY) + w * DAY, correct: true }], []); // all >= 30 days old? last at 42d
  const hist = [{ slug: "old", completedAt: 10 * DAY, recalls: four }];
  const inp = reviewInput(hist, now, Object.freeze({}), 12);
  assert.deepEqual(inp.fixedDue, [], "retired on the full history (4 successes)");
  assert.equal(inp.history[0].recalls.length, 0, "the policy sees none of them (all older than 30 days)");
});
