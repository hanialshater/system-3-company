#!/usr/bin/env node
// board-mirror.mjs: every System 3 Meta order as an item on the company's work board (plan 2026-10-21-m4-m7-plan.md
// §M7 exit criterion 4: "Every Meta order has a board item. Code ran `company board add`/`board move` as
// chief-of-staff (tools/company.mjs is protected; it is run, not edited). `company check` shows no board errors"; and
// P7.5: Meta orders = ext:W-* items = board items with an owner in the spec).
//
//   node board-mirror.mjs --live=<dir> --repo=<integration worktree> --run=<name> [--commit]
//        --live: the Meta live dir (default META_LIVE_DIR; the state is META_STATE or state.json there)
//        --repo: the run's integration worktree, a linked worktree on a meta/* branch (lib/commit-file.mjs), never
//                the main checkout: the board written is that worktree's company/ops/board.json
//        --run: the run's name (m7); every mirrored item's title starts `[meta:<run>] <O>: `, which is how the
//               mirror finds its own items again (idempotent with no store of its own: the board is the record)
//        --commit: commit company/ops/board.json alone when it changed ("meta: board mirror (chief-of-staff code step)")
//
// For each order of the state with no item: `node tools/company.mjs board add "<title>" --owner=<role> --state=<s>
// [--domain=<d>]` (the company's own syntax: the title is the arguments that do not start with --, its id is the
// "added W-n" line). For each item whose state differs from the order's: `node tools/company.mjs board move <W> <s>`.
// The last line's `labels` {<O>: ["ext:W-n"]} goes back on Meta's tracker items (supervisor.mjs applyExportLabels).
//
// Board state (company check's list: backlog, next, doing, review, done, dropped) from the order's stage: a stage an
// agent or code builds in (build, test1, qa, walk; a ritual's run) is doing; one that judges or ships the work (check,
// learner, launch, gates, ship, merge) is review; done is done; cancelled is dropped; parked is backlog (its ask says
// why); budget, or blocked behind --after, is next. Owner: a ritual's chair, else the order's builder, else its manager
// (company role ids: the spec's roles are the company's). Domain: the lesson's brief file's first part (math, cs).
//
// After its writes the mirror reads the board back with company check's own board rules (boardProblems: unique ids, a
// state from its list, an owner; copied from tools/company.mjs cmdCheck, which is protected and not exported, and kept
// in step by tests/board-mirror.test.mjs, which greps company.mjs for them): a problem is a stage-error.
//
// Identity, and the merge-time renumber (M7 exit criterion 4). An item's identity is its title tag `[meta:<run>] <O>`,
// never its W id: `company board add` gives the next id after the highest on the board it reads, so the run's
// integration branch and the company's working branch hand out the SAME W ids while both add items (both from W-2002
// on), and merging them gives `company check`'s "duplicate id". Nothing reserves a range (board add has no --id, and
// tools/company.mjs is protected), so the ids are renumbered when the branch is merged:
//   node board-mirror.mjs renumber --repo=<worktree> --run=<name> [--onto=<ref>] [--commit]
//        --onto: the board at <ref> (the company's branch being merged into) is taken as it is, and every item of this
//                run (its title tag) that <ref>'s board lacks is appended with the next free ids after <ref>'s highest:
//                the board.json to commit with the merge (git's textual conflict in board.json resolved by code)
//        no --onto: in place, after a merge that kept both sides' items: every item of this run whose id another item
//                also holds gets the next free id
//        prints {ok, renumbered: [{order, from, to}], labels: {<O>: ["ext:W-n"]}} (the new ids for Meta's tracker
//        items; the chief of staff's code step, run once per merge; it writes board.json directly because the
//        company's CLI has no renumber, and checks the result with boardProblems)
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, labels, added[], moved[], findings[]}. Exit 0 pass,
// 2 usage (a --repo that is not a sandbox worktree), 3 stage-error (the state, the board or the company's tool failed).

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F } from "./lib/proc.mjs";
import { sandboxOf, commitPaths, git } from "./lib/commit-file.mjs";
import { domainOf } from "./events-export.mjs";

export const BOARD = "company/ops/board.json";
export const COMMIT_MSG = "meta: board mirror (chief-of-staff code step)";
const USAGE = "usage: board-mirror.mjs [--live=<dir>] --repo=<integration worktree> --run=<name> [--commit] | renumber --repo=<worktree> --run=<name> [--onto=<ref>] [--commit]";
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);
const DOING = ["build", "test1", "qa", "walk", "run"], REVIEW = ["check", "learner", "launch", "gates", "ship", "merge"];

/** The board state of an order. */
export function boardState(o) {
  if (o.stage === "done") return "done";
  if (o.stage === "cancelled") return "dropped";
  if (o.stage === "parked") return "backlog";
  if (o.stage === "budget" || o.blocked) return "next";
  if (REVIEW.includes(o.stage)) return "review";
  return "doing"; // DOING, and any other stage an order works in
}
export const ownerOf = (o) => o.chair ?? o.builder ?? o.manager ?? "chief-of-staff";
/** company check's board rules (tools/company.mjs cmdCheck, "// Board"): the problems, [] when it would pass. */
export const BOARD_STATES = ["backlog", "next", "doing", "review", "done", "dropped"];
export function boardProblems(board) {
  const out = [], ids = new Set();
  for (const it of board?.items ?? []) {
    if (ids.has(it.id)) out.push(`duplicate id ${it.id}`);
    ids.add(it.id);
    if (!BOARD_STATES.includes(it.state)) out.push(`${it.id} bad state ${it.state}`);
    if (!it.owner) out.push(`${it.id} has no owner`);
  }
  return out;
}
const idNum = (id) => Number(String(id ?? "").split("-")[1]) || 0; // company.mjs board add's own reading
const W = (n) => `W-${String(n).padStart(3, "0")}`;
/** The renumber (see the header): { board, renumbered: [{order, from, to}] }. `mine(item)` → the order id, or null. */
export function renumber(board, mine, { onto = null } = {}) {
  const renumbered = [];
  if (onto) {
    const have = new Set(onto.items.map((i) => mine(i)).filter(Boolean));
    let n = onto.items.reduce((m, i) => Math.max(m, idNum(i.id)), 0);
    const items = [...onto.items];
    for (const it of board.items) {
      const o = mine(it);
      if (!o || have.has(o)) continue;
      const to = W(++n);
      if (to !== it.id) renumbered.push({ order: o, from: it.id, to });
      items.push({ ...it, id: to });
    }
    return { board: { ...onto, items }, renumbered };
  }
  let n = board.items.reduce((m, i) => Math.max(m, idNum(i.id)), 0);
  const count = new Map();
  for (const it of board.items) count.set(it.id, (count.get(it.id) ?? 0) + 1);
  const items = board.items.map((it) => {
    const o = mine(it);
    if (!o || count.get(it.id) < 2) return it;
    count.set(it.id, count.get(it.id) - 1);
    const to = W(++n);
    renumbered.push({ order: o, from: it.id, to });
    return { ...it, id: to };
  });
  return { board: { ...board, items }, renumbered };
}
export const tagOf = (run, o) => `[meta:${run}] ${o.id}`;
export const titleOf = (run, o) => `${tagOf(run, o)}: ${String(o.title || o.task || o.id).replace(/\s+/g, " ").slice(0, 140)}${o.slug ? ` (${o.slug})` : ""}`;

function renumberMain(o, usage) {
  for (const k of Object.keys(o)) if (!["repo", "run", "commit", "onto", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length > 1) return usage(`unexpected argument ${o.positional[1]}`);
  if (o.commit != null && o.commit !== true) return usage("--commit takes no value");
  if (typeof o.repo !== "string") return usage("--repo is required");
  if (typeof o.run !== "string" || !/^[\w.-]+$/.test(o.run)) return usage("--run is the run's name ([A-Za-z0-9_.-])");
  if (o.onto != null && (typeof o.onto !== "string" || !o.onto)) return usage("--onto names a ref");
  const sb = sandboxOf(path.resolve(o.repo));
  if (sb.error) return usage(`--repo: ${sb.error}`);
  const fail = (kind, m) => ({ exit: 3, out: { ok: false, stage: "board-mirror", findings: [F.env(kind, m)] } });
  let board, onto = null;
  try { board = JSON.parse(fs.readFileSync(path.join(sb.root, BOARD), "utf8")); if (!Array.isArray(board.items)) throw new Error("no items list"); }
  catch (e) { return fail("board", `cannot read ${BOARD} in ${sb.root} (a merge conflict there is resolved with --onto): ${e.message}`); }
  if (o.onto) {
    const r = git(sb.root, "show", `${o.onto}:${BOARD}`);
    if (r.status !== 0) return fail("onto", `git show ${o.onto}:${BOARD}: ${String(r.stderr).trim()}`);
    try { onto = JSON.parse(r.stdout); if (!Array.isArray(onto.items)) throw new Error("no items list"); } catch (e) { return fail("onto", `${o.onto}:${BOARD}: ${e.message}`); }
  }
  const tagRe = new RegExp(`^\\[meta:${o.run.replace(/[.]/g, "\\.")}\\] (O-\\d+)(?::|$)`);
  const mine = (it) => (typeof it.title === "string" ? tagRe.exec(it.title)?.[1] ?? null : null);
  const r = renumber(board, mine, { onto });
  const problems = boardProblems(r.board);
  if (problems.length) return fail("board-check", `the renumbered board would fail company check: ${problems.slice(0, 5).join("; ")}`);
  const changed = JSON.stringify(r.board) !== JSON.stringify(board);
  if (changed) fs.writeFileSync(path.join(sb.root, BOARD), JSON.stringify(r.board, null, 2) + "\n"); // company.mjs writeJSON's form
  const labels = Object.fromEntries(r.board.items.filter(mine).map((it) => [mine(it), [`ext:${it.id}`]]));
  const out = { ok: true, stage: "board-mirror", mode: "renumber", repo: sb.root, branch: sb.branch, onto: o.onto ?? null, renumbered: r.renumbered, labels, findings: [] };
  if (o.commit && changed) {
    const c = commitPaths(sb.root, [BOARD], `meta: board renumber for the ${o.run} merge (chief-of-staff code step)`);
    if (c.error) { out.ok = false; out.findings.push(F.env("commit", c.error)); } else out.committed = c.sha ?? null;
  }
  return { exit: out.ok ? 0 : 3, out };
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "board-mirror", findings: [F.env("usage", message)], usage: USAGE } });
  if (o.positional[0] === "renumber") return renumberMain(o, usage);
  for (const k of Object.keys(o)) if (!["live", "repo", "run", "commit", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  if (o.commit != null && o.commit !== true) return usage("--commit takes no value");
  for (const k of ["live", "repo", "run"]) if (o[k] === true || o[k] === "") return usage(`--${k} needs a value`);
  if (typeof o.repo !== "string") return usage("--repo is required (the run's integration worktree)");
  if (typeof o.run !== "string" || !/^[\w.-]+$/.test(o.run)) return usage("--run is the run's name ([A-Za-z0-9_.-])");
  const live = o.live ?? process.env.META_LIVE_DIR;
  if (!live) return usage("no Meta state: --live=<dir> or META_LIVE_DIR");
  const sb = sandboxOf(path.resolve(o.repo));
  if (sb.error) return usage(`--repo: ${sb.error}`);
  const statePath = path.resolve(live, process.env.META_STATE || "state.json");
  let st;
  try { st = JSON.parse(fs.readFileSync(statePath, "utf8"), rev); }
  catch (e) { return { exit: 3, out: { ok: false, stage: "board-mirror", findings: [F.env("state", `cannot read the Meta state ${statePath}: ${e.message}`)] } }; }
  const tool = path.join(sb.root, "tools/company.mjs");
  if (!fs.existsSync(tool)) return { exit: 3, out: { ok: false, stage: "board-mirror", findings: [F.env("tool", `no tools/company.mjs in ${sb.root}`)] } };
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  const company = (...args) => spawnSync(process.execPath, [tool, ...args], { cwd: sb.root, env, encoding: "utf8", timeout: 30_000 });
  const readBoard = () => JSON.parse(fs.readFileSync(path.join(sb.root, BOARD), "utf8"));
  let board;
  try { board = readBoard(); if (!Array.isArray(board.items)) throw new Error("no items list"); }
  catch (e) { return { exit: 3, out: { ok: false, stage: "board-mirror", findings: [F.env("board", `cannot read ${BOARD} in ${sb.root}: ${e.message}`)] } }; }
  const orders = st.engine?.orders instanceof Map ? [...st.engine.orders.values()] : [];
  const labels = {}, added = [], moved = [], findings = [];
  for (const ord of orders) {
    const tag = tagOf(o.run, ord);
    const mine = board.items.filter((i) => typeof i.title === "string" && (i.title === tag || i.title.startsWith(`${tag}:`)));
    if (mine.length > 1) findings.push(F.advisory("duplicate", `${mine.length} board items are ${ord.id}'s (${mine.map((i) => i.id).join(", ")}): the first is kept`));
    let it = mine[0] ?? null;
    const want = boardState(ord);
    if (!it) {
      const d = domainOf(ord);
      const r = company("board", "add", titleOf(o.run, ord), `--owner=${ownerOf(ord)}`, `--state=${want}`, ...(d ? [`--domain=${d}`] : []));
      const m = /^added (W-\d+)/m.exec(r.stdout);
      if (r.status !== 0 || !m) { findings.push(F.env("board-add", `company board add for ${ord.id}: exit ${r.status}: ${String(r.stdout + r.stderr).trim().slice(0, 300)}`)); break; }
      added.push({ order: ord.id, id: m[1], state: want });
      board = readBoard();
      it = board.items.find((i) => i.id === m[1]);
    } else if (it.state !== want) {
      const r = company("board", "move", it.id, want);
      if (r.status !== 0) { findings.push(F.env("board-move", `company board move ${it.id} ${want}: exit ${r.status}: ${String(r.stdout + r.stderr).trim().slice(0, 300)}`)); break; }
      moved.push({ order: ord.id, id: it.id, from: it.state, to: want });
      it.state = want;
    }
    if (it) labels[ord.id] = [`ext:${it.id}`];
  }
  // company check's board rules on the board as written (M7 exit criterion 4: `company check` shows no board errors)
  try { for (const p of boardProblems(readBoard())) findings.push(F.env("board-check", `${BOARD} would fail company check: ${p}`)); }
  catch (e) { findings.push(F.env("board", `cannot read ${BOARD} back: ${e.message}`)); }
  const out = { ok: !findings.some((f) => f.severity !== "advisory"), stage: "board-mirror", repo: sb.root, branch: sb.branch, orders: orders.length, mirrored: Object.keys(labels).length, labels, added, moved, findings };
  if (o.commit && (added.length || moved.length)) {
    const c = commitPaths(sb.root, [BOARD], COMMIT_MSG);
    if (c.error) { out.ok = false; out.findings.push(F.env("commit", c.error)); }
    else out.committed = c.sha ?? null;
  }
  return { exit: out.ok ? 0 : 3, out };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "board-mirror", findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const x of r.out.added ?? []) console.log(`added ${x.id} for ${x.order} (${x.state})`);
  for (const x of r.out.moved ?? []) console.log(`moved ${x.id} for ${x.order}: ${x.from} → ${x.to}`);
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
