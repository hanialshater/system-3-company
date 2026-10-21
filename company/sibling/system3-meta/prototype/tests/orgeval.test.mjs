import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { classify, evaluateRun, pack, render } from "../orgeval.mjs";

test("classify reads the finding's class heads, not its instances", () => {
  assert.deepEqual(classify("Class: Why line over the 20-word limit. Instances: no banned words found"), ["length"]);
  assert.deepEqual(classify("Class 1, numbers not written as digits (6 instances). Class 2, content outside the decided format: an intro line"), ["format", "numbers"]);
  assert.deepEqual(classify("Class: the number rule contradicts the sheet's own answers"), ["consistency"]);
  assert.deepEqual(classify("- Q1: soft body to soft belly. Only a hermit crab's belly is soft", { whole: true }), ["fact"]);
  assert.deepEqual(classify("looks fine"), ["other"]);
});

function fakeRun({ histories, memory = [], integrationChanges = null }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "orgeval-"));
  const orders = new Map(histories.map(([id, task, builder, h, findings]) => [id, { id, task, builder, stage: "done", loops: h.filter((x) => x.verdict === "revise").length, history: h, findings }]));
  if (integrationChanges) { fs.mkdirSync(path.join(dir, "shipped", "PACK"), { recursive: true }); fs.writeFileSync(path.join(dir, "shipped", "PACK", "page.md"), `# Pack\n\n## Changes\n${integrationChanges}\n`); }
  const s = { log: { events: [{ t: 0, type: "org-genesis" }, { t: 10, type: "shipped" }, { t: 1, type: "usage", tokens: 100 }] }, engine: { orders }, rooms: { memory: new Map(memory), sessions: new Map() }, data: {} };
  return { name: "r", dir, s };
}

test("a repeat counts only when the later work was built after the builder was told", () => {
  const told = (t0) => [{ stage: "build", by: "w", verdict: "pass", t: t0 }, { stage: "check", by: "reader", verdict: "revise", t: t0 + 1, findings: "Class: Why line over the 20-word limit" }];
  // both built before the first revise (the same review session): not a repeat
  const same = evaluateRun(fakeRun({ histories: [["O-1", "R1", "w", told(1)], ["O-2", "R2", "w", told(1.5)]] }));
  assert.equal(same.learning.repeatsAfterBeingTold.length, 0);
  assert.equal(same.learning.sameClassBeforeBeingTold.length, 1);
  // O-2 built after O-1's revise: a repeat after being told
  const rep = evaluateRun(fakeRun({ histories: [["O-1", "R1", "w", told(1)], ["O-2", "R2", "w", told(5)]] }));
  assert.deepEqual(rep.learning.repeatsAfterBeingTold.map((x) => [x.role, x.class, x.told_at, x.repeated_on]), [["w", "length", "O-1", ["O-2"]]]);
});

test("integration fixes and escapes count in auto-correction; the pack renders", () => {
  const run = fakeRun({ histories: [["O-1", "PACK", "w", [{ stage: "build", by: "w", verdict: "pass", t: 1 }]]], integrationChanges: "- R3 Q2: gills. Sea stars do have tiny skin gills, so it was not true\n- none other" });
  const e = evaluateRun(run, [{ class: "fact", what: "x", found_by: "fact-check" }]);
  assert.equal(e.autoCorrection.caughtBy.integration, 1);
  assert.equal(e.autoCorrection.caughtBeforeShip, 0.5);
  assert.match(render(pack({ runs: [run], escapes: { r: [{ class: "fact", what: "x", found_by: "fact-check" }] } })), /fixed at integration: fact/);
});
