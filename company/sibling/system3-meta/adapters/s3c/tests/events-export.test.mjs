// Tests for adapters/s3c/events-export.mjs (plan 2026-10-21-m4-m7-plan.md §M7 K21). A real Meta state (the prototype's
// CLI: one lesson order through check, learner, launch, ship and merge; one ritual order shipped) is exported into a
// temp company repo's integration worktree with the company's REAL tools/events.mjs, and read back by its REAL
// tools/rituals-due.mjs (tests/m7-fixture.mjs). The main checkout is only read.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { companyRepo, metaState, git, run } from "./m7-fixture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "events-export.mjs");
const LIVE = metaState();
const lines = (repo) => fs.readFileSync(path.join(repo, "company/ops/events.jsonl"), "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));

test("Meta's reviews, publish, merge and ritual become company events in the company's format, by its own writer, and its counters see them", () => {
  const c = companyRepo();
  const r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  const ev = lines(c.int);
  assert.deepEqual(ev.map((e) => e.type), ["verify", "review", "decision", "publish", "merge", "ritual"]);
  const by = Object.fromEntries(ev.map((e) => [e.type, e]));
  assert.deepEqual([by.verify.room, by.verify.actor, by.verify.subjects], ["fact-check", "fact-checker", ["one-metre-more-rope"]]);
  assert.deepEqual([by.review.room, by.review.actor], ["learner-review", "learner-evaluator"]);
  assert.deepEqual([by.publish.room, by.publish.actor], ["launch-room", "release-manager"]);
  assert.deepEqual([by.merge.room, by.merge.actor], ["chief-of-staff", "chief-of-staff"]);
  assert.deepEqual([by.ritual.room, by.ritual.actor, by.ritual.subjects, by.ritual.refs], ["meeting-wbr", "chief-of-staff", ["wbr"], ["company/rituals/records/2026-10-22-wbr.md"]]);
  for (const e of ev) { assert.match(e.id, /^mt-[0-9a-f]{10}$/); assert.match(e.ts, /^\d{4}-\d{2}-\d{2}T/); assert.match(e.summary, /System 3 Meta O-\d/); }
  // committed alone, on the sandbox branch, by code
  assert.equal(git(c.int, "log", "-1", "--format=%s"), "meta: events export (chief-of-staff code step)");
  assert.equal(git(c.int, "status", "--porcelain"), "");
  // the company's cadence reads them: the review would make launch-review due, and the exported publish holds it
  // (triggers.json heldByEvents: publish in launch-room, the publish loop running)
  const due = JSON.parse(run(path.join(c.int, "tools/rituals-due.mjs"), ["--json"]).stdout);
  const lr = due.find((x) => x.ritual === "launch-review");
  assert.deepEqual([lr.due, lr.heldBy], [false, `event ${by.publish.id} (publish, secondary)`]);
  // idempotent: the cursor says nothing is new; with the cursor gone, the ids are not written twice
  const again = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--commit"]);
  assert.deepEqual([again.exit, again.json.exported], [0, 0]);
  fs.rmSync(path.join(LIVE, "exports", "events-export.json"));
  const third = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--commit"]);
  assert.equal(third.exit, 0);
  assert.equal(third.json.exported, 6);
  assert.match(third.stdout, /already in the log/);
  assert.equal(lines(c.int).length, 6);
  assert.equal(third.json.committed, undefined, "nothing new: no commit");
});

test("--max carries the rest to the next run; the main checkout or any primary checkout is refused", () => {
  const c = companyRepo();
  fs.rmSync(path.join(LIVE, "exports"), { recursive: true, force: true });
  let r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--max=2"]);
  assert.deepEqual([r.exit, r.json.exported], [0, 2]);
  r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`]);
  assert.deepEqual([r.exit, r.json.exported], [0, 4]);
  assert.equal(lines(c.int).length, 6);
  r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.root}`]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /not a linked worktree/);
  r = run(ADAPTER, [`--live=${LIVE}`, "--repo=/home/user/system-3-company"]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /main checkout/);
  assert.equal(run(ADAPTER, [`--live=${LIVE}`]).exit, 2, "--repo is required");
});
