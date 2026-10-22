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
// Contract (plan §4): the LAST stdout line is one JSON object {ok, labels, added[], moved[], findings[]}. Exit 0 pass,
// 2 usage (a --repo that is not a sandbox worktree), 3 stage-error (the state, the board or the company's tool failed).

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F } from "./lib/proc.mjs";
import { sandboxOf, commitPaths } from "./lib/commit-file.mjs";
import { domainOf } from "./events-export.mjs";

export const BOARD = "company/ops/board.json";
export const COMMIT_MSG = "meta: board mirror (chief-of-staff code step)";
const USAGE = "usage: board-mirror.mjs [--live=<dir>] --repo=<integration worktree> --run=<name> [--commit]";
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
export const tagOf = (run, o) => `[meta:${run}] ${o.id}`;
export const titleOf = (run, o) => `${tagOf(run, o)}: ${String(o.title || o.task || o.id).replace(/\s+/g, " ").slice(0, 140)}${o.slug ? ` (${o.slug})` : ""}`;

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "board-mirror", findings: [F.env("usage", message)], usage: USAGE } });
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
