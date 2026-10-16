// HQ simulation lab (W-1503): request parsing refuses anything but known shapes, the CLI gateway returns the
// documented documents, curves draw through the model's points, and the comparison carries the UNSCORED label.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import { parseSimRequest, cliArgs, pwlAt, curvePath, policyGroups, stepLine, UNSCORED_LABEL } from "../../src/lib/hq-personalization.ts";
import { runSim } from "../../src/lib/hq-personalization-server.ts";

const q = (o) => new URLSearchParams(o);

test("requests: only meta, run, saved and compare with bounded, id-shaped arguments", () => {
  assert.deepEqual(parseSimRequest(q({ op: "meta" })), { op: "meta" });
  assert.deepEqual(parseSimRequest(q({ op: "run", persona: "wanderer", policy: "gam", seed: "3" })), { op: "run", persona: "wanderer", policy: "gam", seed: 3, days: 7 });
  for (const bad of [
    { op: "run", persona: "wanderer;rm -rf", policy: "gam" }, { op: "run", persona: "wanderer", policy: "--x=1 " },
    { op: "run", persona: "wanderer", policy: "gam", seed: "0" }, { op: "run", persona: "wanderer", policy: "gam", seed: "1.5" },
    { op: "run", persona: "wanderer", policy: "gam", days: "99" }, { op: "compare", persona: "all", seeds: "50" },
    { op: "compare", persona: "all", set: "everything" }, { op: "saved", file: "../../etc/passwd" }, { op: "learners" },
  ]) assert.equal(typeof parseSimRequest(q(bad)), "string", JSON.stringify(bad));
  assert.deepEqual(cliArgs({ op: "run", persona: "wanderer", policy: "gam", seed: 2, days: 7 }), ["run", "--persona=wanderer", "--policy=gam", "--seed=2", "--days=7"]);
});

test("curves: pwlAt is flat outside the points and linear between; the path spans x = 0..1", () => {
  const pts = [{ x: 0.2, y: 0.1 }, { x: 0.6, y: 0.5 }];
  assert.equal(pwlAt(0, pts), 0.1);
  assert.equal(pwlAt(1, pts), 0.5);
  assert.ok(Math.abs(pwlAt(0.4, pts) - 0.3) < 1e-12);
  assert.equal(curvePath(pts, 100, 100), "M0.0,90.0 L20.0,90.0 L60.0,50.0 L100.0,50.0");
});

test("meta: personas, model curves with reasons, policies with ablations, versions", async () => {
  const r = await runSim({ op: "meta" });
  assert.ok(r.ok, r.error);
  const m = r.data;
  assert.equal(m.schema, "personalization-hq-meta-v0");
  assert.equal(m.unscored, UNSCORED_LABEL);
  assert.match(m.modelVersion, /^model-v/);
  assert.equal(m.personas.length, 6);
  for (const p of m.personas) assert.ok(p.name && p.description && p.needsAtMeans.length === 4, p.id);
  for (const c of m.model.curves) assert.ok(c.why && c.points.length >= 2, `${c.need}.${c.signal}`);
  const groups = policyGroups(m.policies).flatMap((g) => g.items);
  for (const p of ["default-order", "draft-rules", "gam", "random", "epsilon-greedy", "gam-off-repair"]) assert.ok(groups.includes(p), p);
});

test("run: a live trace with slots, every score term, the deciding constraint and simulated outcomes", async () => {
  const r = await runSim({ op: "run", persona: "struggling-repeater", policy: "gam", seed: 1, days: 2 });
  assert.ok(r.ok, r.error);
  const t = r.data;
  assert.equal(t.schema, "personalization-sim-trace-v0");
  assert.equal(t.label, UNSCORED_LABEL);
  assert.deepEqual(t.run, { persona: "struggling-repeater", policy: "gam", seed: 1, days: 2, source: "live" });
  const s = t.steps.find((x) => x.kind === "new");
  assert.ok(s.slots[0].candidates[0].terms.some((x) => x.name === "need:repair"));
  assert.ok("constraint" in s.slots[0] && Array.isArray(s.slots[0].rejected));
  assert.equal(typeof s.simulated.predictedRight, "boolean");
  assert.ok(stepLine(s).startsWith(s.served));
  const again = await runSim({ op: "run", persona: "struggling-repeater", policy: "gam", seed: 1, days: 2 });
  assert.equal(JSON.stringify(again.data.steps), JSON.stringify(t.steps), "same seed, same trace");
});

test("compare and errors: the table is labelled UNSCORED; an unknown persona is an error, not a run", async () => {
  const c = await runSim({ op: "compare", persona: "wanderer", seeds: 1, set: "main", days: 1 });
  assert.ok(c.ok, c.error);
  assert.equal(c.data.unscored, UNSCORED_LABEL);
  assert.equal(c.data.rows.length, 7);
  const bad = await runSim({ op: "run", persona: "a-real-learner", policy: "gam", seed: 1, days: 1 });
  assert.equal(bad.ok, false);
  assert.match(bad.error, /unknown persona/);
});
