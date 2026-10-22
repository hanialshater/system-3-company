#!/usr/bin/env node
// m7-scope.mjs: the scope check that runs BEFORE an M7 code step loads or runs code from a worktree an agent can write
// (M7 review). The steps it fronts load the company's own tools from the tree they work on: rituals.mjs record and
// ship import <order worktree>/tools/lib/ritual-records.mjs, scaffold runs <order worktree>/tools/company.mjs, and
// due, events-export.mjs and board-mirror.mjs run the integration worktree's tools. None of those files is a
// protected path, so an agent's Write to one ran its own code inside code's step, with no guard: rituals.mjs's own
// scope finding ("the order changes tools/lib/ritual-records.mjs") came only after the import had run. And the
// exporters commit their whole file (events.jsonl, board.json), so an uncommitted line an agent added to it in the
// integration worktree became a chief-of-staff commit. This front checks first, then runs the sibling adapter with the
// same arguments, its stdout, stderr and exit passed through:
//
//   node m7-scope.mjs rituals.mjs scaffold|record|ship <ritual> --repo=<order worktree> --base=<sha> …
//        the order worktree changes nothing since --base outside company/rituals/records/ (tracked or untracked);
//        ship's --into is checked as below
//   node m7-scope.mjs rituals.mjs due --repo=<integration worktree> …
//   node m7-scope.mjs events-export.mjs|board-mirror.mjs --repo=<integration worktree> …
//        the integration worktree has no uncommitted change (tracked or untracked) under tools/ or in the file the
//        exporter commits (company/ops/events.jsonl, company/ops/board.json)
//
// Contract (plan §4): a refusal prints `block scope: …` (an order's worktree: exit 1, the leave or ship is refused and
// names the paths) or `environment dirty: …` (the integration worktree: exit 3, a stage-error, never a loop), then one
// JSON line {ok:false, stage:"m7-scope", findings}. Exit 2: usage. It cannot close the window between its check and
// the adapter's own read; it closes the standing hole (a file an agent left changed).

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F } from "./lib/proc.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const RECORDS = "company/rituals/records";
export const FRONTED = { "rituals.mjs": ["scaffold", "record", "ship", "due"], "events-export.mjs": null, "board-mirror.mjs": null };
export const EXPORT_FILE = { "events-export.mjs": "company/ops/events.jsonl", "board-mirror.mjs": "company/ops/board.json" };
const USAGE = "usage: m7-scope.mjs rituals.mjs scaffold|record|ship <ritual> --repo=<order wt> --base=<sha> … | rituals.mjs due --repo=<int wt> … | events-export.mjs|board-mirror.mjs --repo=<int wt> …";

const git = (repo, ...args) => spawnSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const lines = (s) => String(s ?? "").split("\n").map((x) => x.trim()).filter(Boolean);

/** Paths of `repo` changed since `base` (committed or not) or untracked (not ignored), or {error}. */
export function changedSince(repo, base) {
  const d = git(repo, "diff", "--name-only", "--no-renames", base, "--");
  if (d.status !== 0) return { error: `git diff ${base}: ${String(d.stderr).trim().slice(0, 300)}` };
  const u = git(repo, "ls-files", "--others", "--exclude-standard");
  if (u.status !== 0) return { error: `git ls-files: ${String(u.stderr).trim().slice(0, 300)}` };
  return { paths: [...new Set([...lines(d.stdout), ...lines(u.stdout)])] };
}
/** Uncommitted paths of `repo` (tracked changes against HEAD, and untracked files) under `paths`, or {error}. */
export function dirtyUnder(repo, paths) {
  const s = git(repo, "status", "--porcelain", "--untracked-files=all", "--no-renames", "--", ...paths);
  if (s.status !== 0) return { error: `git status: ${String(s.stderr).trim().slice(0, 300)}` };
  return { paths: String(s.stdout).split("\n").filter((l) => l.length > 3).map((l) => l.slice(3)) }; // "XY path": no trim
}

const refuse = (exit, finding) => ({ exit, out: { ok: false, stage: "m7-scope", findings: [finding] } });
const list = (ps) => `${ps.slice(0, 6).join(", ")}${ps.length > 6 ? ` and ${ps.length - 6} more` : ""}`;

/** The check for one fronted call; null: in scope, run the adapter. */
export function check(script, argv) {
  if (!Object.hasOwn(FRONTED, script)) return refuse(2, F.env("usage", `${script ?? ""} is not fronted here (${Object.keys(FRONTED).join(", ")})`));
  const o = parseArgs(argv);
  const sub = o.positional[0];
  if (FRONTED[script] && !FRONTED[script].includes(sub)) return refuse(2, F.env("usage", `${script} ${sub ?? ""}: one of ${FRONTED[script].join(", ")}`));
  if (typeof o.repo !== "string") return refuse(2, F.env("usage", "--repo is required"));
  const repo = path.resolve(o.repo);
  if (!fs.existsSync(repo)) return null; // the adapter reports its own missing --repo
  const clean = (wt, paths) => {
    const d = dirtyUnder(wt, paths);
    if (d.error) return refuse(3, F.env("git", d.error));
    if (d.paths.length) return refuse(3, F.env("dirty", `${wt} has uncommitted ${list(d.paths)}: code runs that worktree's tools and commits its files, so it refuses until a person has looked (the integration worktree is code's; no agent edits it)`));
    return null;
  };
  if (script !== "rituals.mjs" || sub === "due") return clean(repo, ["tools", ...(EXPORT_FILE[script] ? [EXPORT_FILE[script]] : [])]);
  if (typeof o.base !== "string") return null; // the adapter's usage error
  const ch = changedSince(repo, o.base);
  if (ch.error) return refuse(3, F.env("git", ch.error));
  const other = ch.paths.filter((p) => !p.startsWith(`${RECORDS}/`));
  if (other.length) return refuse(1, F.block("scope", `the order changes ${list(other)}: a ritual order changes only its record in ${RECORDS}/, and code loads the company's tools from this worktree, so it runs nothing here until they are undone`, "run"));
  if (sub === "ship" && typeof o.into === "string" && fs.existsSync(o.into)) return clean(path.resolve(o.into), ["tools"]);
  return null;
}

export function main(argv) {
  const [script, ...rest] = argv;
  if (!script) return { exit: 2, out: { ok: false, stage: "m7-scope", findings: [F.env("usage", USAGE)], usage: USAGE } };
  const no = check(script, rest);
  if (no) return no;
  const r = spawnSync(process.execPath, [path.join(HERE, script), ...rest], { stdio: "inherit" });
  return { exit: r.status ?? 3, passthrough: true, error: r.error ? String(r.error.message) : r.signal ? `killed by ${r.signal}` : null };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = main(process.argv.slice(2));
  if (!r.passthrough) {
    for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
    console.log(JSON.stringify(r.out));
  } else if (r.error) {
    console.log(`environment front: ${r.error}`);
    console.log(JSON.stringify({ ok: false, stage: "m7-scope", findings: [F.env("front", r.error)] }));
  }
  process.exitCode = r.exit;
}
