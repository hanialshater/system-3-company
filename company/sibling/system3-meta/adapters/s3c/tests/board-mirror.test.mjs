// Tests for adapters/s3c/board-mirror.mjs (plan 2026-10-21-m4-m7-plan.md §M7 exit criterion 4, P7.5). A real Meta
// state (the prototype's CLI) is mirrored onto a temp company repo's board with the company's REAL tools/company.mjs
// board add/move, in an integration worktree on meta/t7 (tests/m7-fixture.mjs). The main checkout is only read.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { companyRepo, metaCli, metaState, sign, git, run, env0, MAIN } from "./m7-fixture.mjs";
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

test("boardProblems is company check's board rules (copied from protected tools/company.mjs, kept in step here)", async () => {
  const { boardProblems, BOARD_STATES } = await import("../board-mirror.mjs");
  const src = fs.readFileSync(path.join(MAIN, "tools/company.mjs"), "utf8");
  for (const s of ['err("company/ops/board.json", `duplicate id ${it.id}`)', 'err("company/ops/board.json", `${it.id} bad state ${it.state}`)', 'err("company/ops/board.json", `${it.id} has no owner`)', `[${BOARD_STATES.map((x) => JSON.stringify(x)).join(", ")}].includes(it.state)`]) assert.ok(src.includes(s), `company.mjs still says ${s}`);
  assert.deepEqual(boardProblems({ items: [{ id: "W-1", state: "doing", owner: "x" }, { id: "W-1", state: "wip", owner: "" }] }), ["duplicate id W-1", "W-1 bad state wip", "W-1 has no owner"]);
});

test("renumber: the company's branch and the run's both hand out W-002 on: --onto takes the company's board and appends the run's items with the next free ids; in place it renumbers only the run's duplicates", () => {
  const c = companyRepo();
  const live = metaState();
  let r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7", "--commit"]);
  assert.deepEqual(r.json.added.map((x) => x.id), ["W-002", "W-003"]);
  // meanwhile the company's main adds its own W-002 and W-003 (the same next ids)
  const main = JSON.parse(fs.readFileSync(path.join(c.root, "company/ops/board.json"), "utf8"));
  main.items.push({ id: "W-002", title: "company work", owner: "tools-lead", state: "next", domain: null, created: "2026-10-22", links: [] }, { id: "W-003", title: "more company work", owner: "cm-math", state: "backlog", domain: null, created: "2026-10-22", links: [] });
  fs.writeFileSync(path.join(c.root, "company/ops/board.json"), JSON.stringify(main, null, 2) + "\n");
  git(c.root, "commit", "-qam", "company board items");
  r = run(ADAPTER, ["renumber", `--repo=${c.int}`, "--run=t7", "--onto=main", "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual(r.json.renumbered, [{ order: "O-1", from: "W-002", to: "W-004" }, { order: "O-2", from: "W-003", to: "W-005" }]);
  assert.deepEqual(r.json.labels, { "O-1": ["ext:W-004"], "O-2": ["ext:W-005"] });
  const b = board(c.int);
  assert.deepEqual(b.map((i) => i.id), ["W-001", "W-002", "W-003", "W-004", "W-005"]);
  assert.equal(b.find((i) => i.id === "W-002").title, "company work", "the company's items keep their ids");
  assert.equal(git(c.int, "log", "-1", "--format=%s"), "meta: board renumber for the t7 merge (chief-of-staff code step)");
  // the mirror finds its items by their tag afterwards: nothing is added again
  r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7"]);
  assert.deepEqual([r.exit, r.json.added, r.json.labels], [0, [], { "O-1": ["ext:W-004"], "O-2": ["ext:W-005"] }]);
  // in place: a merge that kept both sides' W-006
  const x = JSON.parse(fs.readFileSync(path.join(c.int, "company/ops/board.json"), "utf8"));
  x.items.push({ id: "W-006", title: "company again", owner: "cm-cs", state: "next", domain: null, created: "2026-10-22", links: [] });
  x.items.find((i) => i.id === "W-005").id = "W-006";
  fs.writeFileSync(path.join(c.int, "company/ops/board.json"), JSON.stringify(x, null, 2) + "\n");
  r = run(ADAPTER, ["renumber", `--repo=${c.int}`, "--run=t7"]);
  assert.deepEqual(r.json.renumbered, [{ order: "O-2", from: "W-006", to: "W-007" }]);
  assert.equal(new Set(board(c.int).map((i) => i.id)).size, board(c.int).length);
});

test("renumber --onto (M7 finish review): a board past git's 1 MiB default buffer, read while the merge is in conflict, the run's items at the next free ids, its change to a company item kept; the commit check reads such a file", async () => {
  const { git: gitRaw, commitPaths } = await import("../lib/commit-file.mjs");
  const big = { items: Array.from({ length: 3600 }, (_, i) => ({ id: `W-${String(i + 1).padStart(3, "0")}`, title: `company item ${i + 1}: ${"a long title so the board is the company's size ".repeat(4)}`, owner: "chief-of-staff", state: "backlog", domain: null, created: "2026-10-01", links: [] })) };
  const c = companyRepo({ files: { "company/ops/board.json": JSON.stringify(big, null, 2) + "\n" } });
  assert.ok(fs.statSync(path.join(c.int, "company/ops/board.json")).size > 1024 * 1024, "past node's default maxBuffer");
  const show = gitRaw(c.int, "show", "HEAD:company/ops/board.json");
  assert.deepEqual([show.status, show.error ?? null], [0, null], "git() reads a file past 1 MiB (it died with ENOBUFS)");
  assert.deepEqual(commitPaths(c.int, ["company/ops/board.json"], "meta: nothing"), { unchanged: true }, "an unchanged big file is unchanged");
  const live = metaState();
  let r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--run=t7", "--commit"]);
  assert.deepEqual(r.json.added.map((x) => x.id), ["W-3601", "W-3602"]);
  // the run's side also closes a company item; the company's side adds its own W-3601 and changes another item
  const edit = (dir, fn, msg) => { const f = path.join(dir, "company/ops/board.json"), b = JSON.parse(fs.readFileSync(f, "utf8")); fn(b); fs.writeFileSync(f, JSON.stringify(b, null, 2) + "\n"); git(dir, "commit", "-qam", msg); };
  edit(c.int, (b) => { b.items.find((i) => i.id === "W-005").state = "done"; }, "run: close W-005");
  edit(c.root, (b) => { b.items.find((i) => i.id === "W-010").state = "doing"; b.items.push({ id: "W-3601", title: "company work", owner: "tools-lead", state: "next", domain: null, created: "2026-10-22", links: [] }); }, "company board items");
  const m = spawnSync("git", ["-C", c.int, "merge", "--no-edit", "main"], { encoding: "utf8", env: env0() });
  assert.notEqual(m.status, 0, "the textual conflict in board.json");
  assert.match(fs.readFileSync(path.join(c.int, "company/ops/board.json"), "utf8"), /^<<<<<<< /m);
  r = run(ADAPTER, ["renumber", `--repo=${c.int}`, "--run=t7", "--onto=main", "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual([r.json.from, r.json.merging, r.json.base, r.json.staged], ["HEAD", true, true, true]);
  assert.deepEqual(r.json.renumbered.filter((x) => x.order), [{ order: "O-1", from: "W-3601", to: "W-3602" }, { order: "O-2", from: "W-3602", to: "W-3603" }]);
  const b = board(c.int);
  assert.equal(b.length, 3603);
  assert.deepEqual(["W-005", "W-010", "W-3601"].map((id) => b.find((i) => i.id === id).state), ["done", "doing", "next"], "the run's close and the company's change both kept");
  assert.equal(b.find((i) => i.id === "W-3601").title, "company work");
  assert.equal(new Set(b.map((i) => i.id)).size, b.length);
  git(c.int, "commit", "-qm", "merge main (board renumbered by code)");
  assert.equal(git(c.int, "status", "--porcelain"), "");
  // run before the merge (no conflict): the same result as a plain read of --onto
  const c2 = companyRepo({ files: { "company/ops/board.json": JSON.stringify(big, null, 2) + "\n" } });
  run(ADAPTER, [`--live=${live}`, `--repo=${c2.int}`, "--run=t7", "--commit"]);
  r = run(ADAPTER, ["renumber", `--repo=${c2.int}`, "--run=t7", "--onto=main"]);
  assert.deepEqual([r.exit, r.json.from, r.json.merging], [0, "worktree", false], r.stdout);
});

test("renumber --onto keeps the run's newer state for an item onto already has (a second merge of the run); a title that is its slug is not repeated", async () => {
  const { renumber, titleOf } = await import("../board-mirror.mjs");
  const tag = /^\[meta:m7\] (O-\d+)(?::|$)/, mine = (i) => tag.exec(i.title)?.[1] ?? null;
  const it = (id, title, state, owner = "chief-of-staff") => ({ id, title, owner, state });
  const onto = { items: [it("W-2002", "company item", "doing"), it("W-2003", "[meta:m7] O-1: a", "doing")] };
  const runB = { items: [it("W-2002", "[meta:m7] O-2: b", "review"), it("W-2003", "[meta:m7] O-1: a", "done")] };
  const r = renumber(runB, mine, { onto, base: { items: [it("W-2003", "[meta:m7] O-1: a", "doing")] } });
  assert.deepEqual(r.board.items.map((i) => [i.id, i.title, i.state]), [["W-2002", "company item", "doing"], ["W-2003", "[meta:m7] O-1: a", "done"], ["W-2004", "[meta:m7] O-2: b", "review"]]);
  assert.equal(titleOf("m7", { id: "O-1", title: "push-the-frame-over", slug: "push-the-frame-over" }), "[meta:m7] O-1: push-the-frame-over");
  assert.equal(titleOf("m7", { id: "O-3", title: "three sticks", slug: "three-sticks-one-triangle" }), "[meta:m7] O-3: three sticks (three-sticks-one-triangle)");
});
