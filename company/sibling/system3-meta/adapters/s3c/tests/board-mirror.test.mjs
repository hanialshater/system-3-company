// Tests for adapters/s3c/board-mirror.mjs (plan 2026-10-21-m4-m7-plan.md §M7 exit criterion 4, P7.5). A real Meta
// state (the prototype's CLI) is mirrored onto a temp company repo's board with the company's REAL tools/company.mjs
// board add/move, in an integration worktree on meta/t7 (tests/m7-fixture.mjs). The main checkout is only read.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { companyRepo, metaCli, metaState, sign, git, run } from "./m7-fixture.mjs";
import { boardState } from "../board-mirror.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "board-mirror.mjs");
const board = (repo) => JSON.parse(fs.readFileSync(path.join(repo, "company/ops/board.json"), "utf8")).items;

test("boardState: building is doing, judging and shipping is review, done is done, cancelled dropped, parked backlog, blocked next", () => {
  const s = (stage, extra = {}) => boardState({ stage, ...extra });
  assert.deepEqual(["build", "qa", "run", "check", "launch", "merge", "done", "cancelled", "parked", "budget"].map((x) => s(x)), ["doing", "doing", "doing", "review", "review", "review", "done", "dropped", "backlog", "next"]);
  assert.equal(s("build", { blocked: true }), "next");
});

test("every Meta order gets one board item through company board add (owner, domain, state), moves with its stage, and its W id comes back as ext:W-n", () => {
  const c = companyRepo();
  const live = metaState(); // O-1 lesson done, O-2 ritual done
  metaCli(live, "order", "new", "--by=chief-of-staff", "--to=cm-math", "--title=three sticks", "--task=LESSON-three-sticks-one-triangle", "--slug=three-sticks-one-triangle", "--accept=brief company/domains/briefs/math.geometry.md:30-40 · a lesson");
  metaCli(live, "order", "delegate", "O-3", "--by=cm-math", "--to=demo-builder");
  let r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7", "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual(r.json.added.map((x) => [x.order, x.id, x.state]), [["O-1", "W-002", "done"], ["O-2", "W-003", "done"], ["O-3", "W-004", "doing"]]);
  assert.deepEqual(r.json.labels, { "O-1": ["ext:W-002"], "O-2": ["ext:W-003"], "O-3": ["ext:W-004"] });
  const items = board(c.int);
  const w4 = items.find((i) => i.id === "W-004");
  assert.deepEqual([w4.title, w4.owner, w4.domain, w4.state], ["[meta:t7] O-3: three sticks (three-sticks-one-triangle)", "demo-builder", "math", "doing"]);
  assert.deepEqual([items.find((i) => i.id === "W-003").owner, items.find((i) => i.id === "W-003").domain], ["chief-of-staff", null], "a ritual's owner is its chair");
  assert.equal(git(c.int, "log", "-1", "--format=%s"), "meta: board mirror (chief-of-staff code step)");
  assert.equal(git(c.int, "status", "--porcelain"), "");
  // idempotent: nothing added or moved
  r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7", "--commit"]);
  assert.deepEqual([r.exit, r.json.added, r.json.moved, Object.keys(r.json.labels).length], [0, [], [], 3]);
  // a stage change moves it (company board move); a cancel drops it
  sign(live, "demo-builder", "O-3", "build", "src/demos/math/three-sticks-one-triangle/");
  r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7", "--commit"]);
  assert.deepEqual(r.json.moved.map((x) => [x.id, x.from, x.to]), [["W-004", "doing", "review"]]);
  metaCli(live, "order", "cancel", "O-3", "--by=chief-of-staff", "--reason=test");
  r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7"]);
  assert.deepEqual(r.json.moved.map((x) => [x.id, x.to]), [["W-004", "dropped"]]);
  assert.equal(board(c.int).find((i) => i.id === "W-004").state, "dropped");
  // P7.5: Meta orders = mirrored items = items whose owner is a spec role; company check's board rules hold
  const mine = board(c.int).filter((i) => i.title.startsWith("[meta:t7] "));
  assert.equal(mine.length, 3);
  for (const i of board(c.int)) { assert.ok(["backlog", "next", "doing", "review", "done", "dropped"].includes(i.state)); assert.ok(i.owner); }
  assert.equal(new Set(board(c.int).map((i) => i.id)).size, board(c.int).length);
  // (the labels reach Meta's tracker items through the kernel's exports: tests/m7-spec.test.mjs's dry run)
});

test("never the main checkout or a primary checkout; --run is required", () => {
  const c = companyRepo();
  const live = metaState();
  let r = run(ADAPTER, [`--live=${live}`, `--repo=${c.root}`, "--run=t7"]);
  assert.equal(r.exit, 2);
  r = run(ADAPTER, [`--live=${live}`, "--repo=/home/user/system-3-company", "--run=t7"]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /main checkout/);
  assert.equal(run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`]).exit, 2);
  assert.equal(board(c.root).length, 1, "nothing written");
});
