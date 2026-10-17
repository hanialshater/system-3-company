// Criterion 3 harness tests as they run BEFORE the freeze (K3).
//   NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/c3/tests3.test.mjs
// owner: personalization-eval (Uma) · run: eval-k3-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3.md §5
//
// Only the reference arm (default-order+fixed) and fixtures are run as episodes of criterion 3's world. The identity test
// (C3-ID1) runs criterion 2's own arms in criterion 2's cells and compares hashes with runEpisode2 (published in readout 2;
// no score is read). The reachable oracle and the O1 oracles are called on inputs and fakes only: never served, never scored.
import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2 } from "../c2/world2.mjs";
import { seedsFromSd } from "../c2/scorer2.mjs";
import { fixedDue } from "../c2/harness2.mjs";
import * as K from "./checks3.mjs";
import { E3, C2_VALUES, BASE_PLACEMENT } from "./world3.mjs";
import { makeLearner3 } from "./learner3.mjs";
import { defaultOrderFromDims } from "./reachable-oracle.mjs";
import { runEpisode3, allCells3, cellByName3, assertScoringAllowed3, criterionStatus3, feedDue, oracleNew, oracleRefresh, catalog, BASE_CELL, REFERENCE_ARM } from "./harness3.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const P = (id) => PERSONAS.find((p) => p.id === id);
const DAY = 86_400_000;

// ---------------- identity with criterion 2 (§9) ----------------
test("C3-ID2 the c2 harness files equal readout 2's manifest hashes (b89f259)", () => { const r = K.identityFiles(); assert.ok(r.ok, JSON.stringify(r)); });
test("C3-ID1 c2 arms at c2 cells: runEpisode3 (c2-equivalent world) equals runEpisode2, episode and world hash", () => {
  const r = K.identityC2(); assert.ok(r.ok, JSON.stringify(r)); assert.equal(r.n, 8 * 6 * 6 * 2);
});

// ---------------- the judge ----------------
test("T5c world3, learner3 and the reachable oracle import nothing; the oracle names no hidden-state handle", () => { const r = K.t5Static3(); assert.ok(r.ok, JSON.stringify(r.files)); });
test("L11 (N7): a prior-known trace starts priorAgeDays old and forgets at priorRateMult x the rate", () => {
  const graph = { prereqsOf: () => [], pilotConcepts: ["probability:a"] };
  const w = { forgetK: 0.1, pullModifier: 0, pullScale: 1, priorKnowledge: { probability: 1, cs: 0 }, learnPrereqPenalty: 0, predictionFeedback: 0, learnRate: 0.5,
    slip: 0.1, guessRecall: 0.2, relearn: 0.5, revisitStrengthen: null, strengthenAt1: 0.6, strengthenAt0: 0.35, forgetShape: 0.27, kSpread: 0, revisitStopScale: 1,
    stopBeforeRevealShare: 0.5, hypercorrection: 0, novelty: 0, interest: { probability: 0.5, cs: 0.5 }, stopHazard: 0 };
  const mk = (over) => makeLearner3({ seed: 1, personaId: "n7", world: { ...w, ...over }, graph, pullOf: () => 0.5, startTime: 0 });
  assert.ok(Math.abs(mk({}).keptAt("probability:a", 0) - 1) < 1e-12);
  assert.ok(Math.abs(mk({ priorAgeDays: 90 }).keptAt("probability:a", 0) - Math.exp(-0.1 * (7 + 0.27 * 83))) < 1e-12);
  assert.ok(Math.abs(mk({ priorRateMult: 0.25 }).keptAt("probability:a", 5 * DAY) - Math.exp(-0.1 * 0.25 * 5)) < 1e-12);
});

// ---------------- placement and price (§1.1) ----------------
test("interleave: one revisit before new card i only when i % 3 === 1, at most 12 fetched; the rest wait (reference arm)", () => {
  const cell = cellByName3(BASE_CELL);
  let unserved = 0;
  for (const p of PERSONAS) {
    const r = runEpisode3({ persona: p, arm: REFERENCE_ARM, seed: 1001, cell, keepSteps: true });
    unserved += r.extra.revisitsUnserved;
    for (let d = 0; d < 14; d++) {
      let nNew = 0, last = -1;
      for (const s of r.steps.filter((x) => x[1] === d)) {
        if (s[0] === "r") { assert.equal(nNew % 3, 1, `${p.id} day ${d}`); assert.notEqual(last, nNew); last = nNew; } else nNew++;
      }
    }
  }
  assert.ok(unserved > 0);
});
test("feedDue: Feed.tsx order (first completion), the fixed schedule's set, at most 12", () => {
  const h = [{ slug: "b", completedAt: 1 * DAY, recalls: [] }, { slug: "a", completedAt: 2 * DAY, recalls: [{ at: 3 * DAY, correct: false }] }, { slug: "c", completedAt: 0, recalls: [] }];
  assert.deepEqual(feedDue(h, 10 * DAY), ["b", "a", "c"]);
  assert.deepEqual([...feedDue(h, 10 * DAY)].sort(), [...fixedDue(h, 10 * DAY, 12)].sort());
  const many = Array.from({ length: 30 }, (_, i) => ({ slug: `s${i}`, completedAt: i, recalls: [] }));
  assert.equal(feedDue(many, 10 * DAY).length, 12);
});
test("revisit slot cost 0.5 serves at least as many cards as 1 (reference arm, revisits first)", () => {
  const c = cellByName3("first:base");
  for (const p of PERSONAS.slice(0, 3)) {
    const a = runEpisode3({ persona: p, arm: REFERENCE_ARM, seed: 1001, cell: { ...c, revisitSlotCost: 1 } }).score.cards;
    const b = runEpisode3({ persona: p, arm: REFERENCE_ARM, seed: 1001, cell: { ...c, revisitSlotCost: 0.5 } }).score.cards;
    assert.ok(b >= a, p.id);
  }
});

// ---------------- O1 oracles (§2.1), on a fake learner ----------------
test("oracle-new serves the default card when it is a refresh, else the best new; oracle-refresh never jumps a new pick", () => {
  const dimsLite = { a: { concept: "x:a" }, b: { concept: "x:b" }, c: { concept: "x:c" }, d: { concept: "x:d" } };
  const knownSet = new Set(["x:a", "x:c"]);
  const gain = { "x:a": 0.05, "x:b": 0.1, "x:c": 0.3, "x:d": 0.4 };
  const L = { keptAt: (c) => (knownSet.has(c) ? 0.5 : 0), oracle: { gainIfStudied: (l) => gain[l.concept] } };
  const inp = (done) => ({ history: done.map((slug) => ({ slug })), defaultOrder: ["a", "b", "c", "d"] });
  assert.equal(oracleNew(inp([]), L, dimsLite, 0, 1).picks[0].slug, "a");      // default's next is a refresh: served
  assert.equal(oracleNew(inp(["a"]), L, dimsLite, 0, 1).picks[0].slug, "d");   // best unknown
  assert.equal(oracleRefresh(inp([]), L, dimsLite, 0, 1).picks[0].slug, "c");  // best of {b (first new), a, c}
  assert.equal(oracleRefresh(inp(["c"]), L, dimsLite, 0, 1).picks[0].slug, "b"); // d is never jumped to
});

// ---------------- the reachable oracle's discipline (§2.2), on inputs only ----------------
test("C3-RS1-RS6: fields, replay, frozen input, time translation, forbidden fields, no state between calls", () => {
  for (const [id, seed] of [["curious-newcomer", 1001], ["returning-expert", 1002], ["lapsed-returner", 1003]]) {
    const a = K.sampleReachableInput(P(id), seed), b = K.sampleReachableInput(P("wanderer"), seed + 10);
    const r = K.reachableChecks(a.input, a.pop, b.input);
    assert.ok(r.ok, `${id} ${JSON.stringify(r)}`);
  }
});
test("C3-RS7: the default order is derived from dims alone and equals the catalogue's", () => {
  const cat = catalog();
  const s = K.sampleReachableInput(P("wanderer"), 1001);
  assert.deepEqual(defaultOrderFromDims(s.input.dims), cat.defaultOrder);
});
test("C3-RS8: its population constants do not depend on the persona", () => {
  const pops = PERSONAS.map((p) => JSON.stringify(K.sampleReachableInput(p, 1001).pop));
  assert.equal(new Set(pops).size, 1);
});

// ---------------- the freeze lock, cells, S ----------------
test("freeze lock: criterion 3 is a draft; only the reference arm and fixtures run", () => {
  assert.match(criterionStatus3(), /^draft/);
  for (const a of ["reachable+fixed", "oracle-order+fixed", "oracle-new+fixed", "oracle-refresh+fixed", "default-order+none", "default-order+oracle-review@0.3", "gam+fixed"]) assert.throws(() => assertScoringAllowed3([a]), /freeze lock/, a);
  assert.doesNotThrow(() => assertScoringAllowed3(["default-order+fixed", "default-order+fixture-review-early"]));
  const dir = mkdtempSync(join(tmpdir(), "c3lock-")); const f = join(dir, "c.md");
  writeFileSync(f, "# x\nstatus: frozen\n");
  assert.doesNotThrow(() => assertScoringAllowed3(["reachable+fixed"], f));
});
test("cells: interleave (base + 18 criterion 2 one-at-a-time + E3 rows), first (base + E3 rows); base is interleave:base; c2 values named", () => {
  const c = allCells3();
  assert.equal(BASE_PLACEMENT, "interleave");
  assert.equal(c.filter((x) => x.kind === "base").length, 2);
  const nE3 = Object.keys(C2_VALUES).reduce((a, k) => a + (E3[k].low !== E3[k].base) + (E3[k].high !== E3[k].base), 0);
  assert.equal(c.filter((x) => x.placement === "interleave").length, 1 + 18 + nE3);
  assert.equal(c.filter((x) => x.placement === "first").length, 1 + nE3);
  assert.equal(cellByName3(BASE_CELL).placement, "interleave");
  for (const k of Object.keys(C2_VALUES)) assert.equal(E3[k].base, C2_VALUES[k], `placeholder base of ${k} is criterion 2's value until E3 lands`);
});
test("S record: from the reference arm alone at interleave:base, at this E1 and E3 block", () => {
  const rec = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-17-seeds-c3-k3.json"), "utf8"));
  const h = (o) => createHash("sha256").update(JSON.stringify(o)).digest("hex");
  assert.equal(rec.e1Hash, h(E1)); assert.equal(rec.e3Hash, h(E3)); assert.equal(rec.cellName, BASE_CELL);
  assert.equal(rec.S, seedsFromSd(rec.sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap));
});
