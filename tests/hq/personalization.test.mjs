// HQ simulation lab (W-1503): request parsing refuses anything but known shapes, the CLI gateway returns the
// documented documents, curves draw through the model's points, and the comparison carries the UNSCORED label.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { parseSimRequest, cliArgs, pwlAt, curvePath, policyGroups, stepLine, UNSCORED_LABEL } from "../../src/lib/hq-personalization.ts";
import { runSim, BUSY, CHILD_ENV, modelStamp } from "../../src/lib/hq-personalization-server.ts";

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

// W-1530 (company/reviews/hq/2026-10-16-w1503-review.md findings 3 and 5; lab privacy DoD §3 child env)
test("runSim hardening: minimal child env, one process in flight, meta cached on the model stamp", async () => {
  assert.deepEqual(Object.keys(CHILD_ENV), ["NODE_NO_WARNINGS"], "the CLI gets no copy of the server env");
  const a = runSim({ op: "run", persona: "wanderer", policy: "gam", seed: 4, days: 1 });
  const same = runSim({ op: "run", persona: "wanderer", policy: "gam", seed: 4, days: 1 });
  const other = await runSim({ op: "run", persona: "wanderer", policy: "random", seed: 4, days: 1 });
  assert.equal(same, a, "an identical request joins the running one");
  assert.deepEqual(other, { ok: false, error: BUSY, busy: true }, "a different request is refused while one runs");
  assert.ok((await a).ok);
  assert.ok((await runSim({ op: "run", persona: "wanderer", policy: "random", seed: 4, days: 1 })).ok, "the lock is released");
  assert.match(modelStamp(), /^\d+(\.\d+)?:\d+(\.\d+)?$/);
  const m1 = await runSim({ op: "meta" });
  const m2 = await runSim({ op: "meta" });
  assert.ok(m1.ok);
  assert.equal(m2, m1, "meta comes from the cache while the model folder is unchanged");
});

// W-1539 (company/reviews/hq/2026-10-16-d1-review.md nits N1 to N3)
test("runSim lock: released after a failed run (N3); meta never waits on the run lock (N1); busy is a flag (N2)", async () => {
  const bad = await runSim({ op: "run", persona: "a-real-learner", policy: "gam", seed: 1, days: 1 });
  assert.equal(bad.ok, false);
  assert.equal(bad.busy, undefined, "a failed run is not reported as busy");
  const next = await runSim({ op: "run", persona: "wanderer", policy: "gam", seed: 5, days: 1 });
  assert.ok(next.ok, `the lock is released after a failure: ${next.error}`);
  // A cold meta cache while a run is in flight: meta spawns its own process instead of returning BUSY.
  // A different root string for the same folder misses the meta cache (it is keyed on root and stamp).
  const coldRoot = `${process.cwd()}${path.sep}.`;
  const running = runSim({ op: "run", persona: "wanderer", policy: "random", seed: 6, days: 1 });
  const meta = await runSim({ op: "meta" }, coldRoot);
  assert.ok(meta.ok, `meta is not refused while a run is in flight: ${meta.error}`);
  assert.ok((await running).ok);
});
