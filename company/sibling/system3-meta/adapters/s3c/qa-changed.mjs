#!/usr/bin/env node
// qa-changed.mjs: the regression scope (plan 2026-10-21-m4-m7-plan.md §M6 "Adapters": "qa-changed.mjs wrapper (node
// tools/qa-changed.mjs --since=<ref> --format=json --feed) as the regression scope"; exit criterion 6: "The regression
// gate re-runs only qa-changed --since=<wave base> --format=json lessons"). Read-only: the company tool reads git and
// the tree, and writes nothing.
//
//   node qa-changed.mjs --since=<ref> [--repo=<path>] [--exclude=<slug>[,<slug>]] [--live=<Meta live dir>] [--feed] [--worktree]
//        --since: the wave base (M6: meta/m6 as the run started, before any order merged)
//        --repo: the checkout to read (M6: the integration worktree /home/user/s3c-wt/m6-int); default the sandbox base
//        --exclude: lessons not to list (the run's own new lessons: each passed QA in its own order)
//        --live: also exclude the slug of every order in that Meta state (the same, read from the run)
//        --feed: pass --feed, and report whether tests/qa/feed.spec.ts must run (without QA_ONLY)
//        --worktree: count uncommitted changes too (default --no-worktree: the scope is what is committed)
//
// The real tool, read before this was written (tools/qa-changed.mjs, AMD-001 era): a lesson is selected when any file
// in its import closure changed since the ref (its own folder, a shared kit or engine file it imports, a shell file
// every lesson page runs through, the QA contract), except a meta.json change in bookkeeping fields only; a
// content/domains.json change selects only the lessons whose own domain entry changed; the generated registry is not
// an import (it is regenerated from metas). `--format=json` prints {since, lessons:[{slug, why}], feed?, total}
// (pretty-printed, so the whole stdout is one JSON value); retired lessons are never listed.
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], since, lessons[], why{}, excluded[],
// feed, total}. Exit 0: nothing to re-QA (ok); 1: lessons to re-QA (one block finding each, route qa: their QA must
// run again, on the integration build); 2 usage; 3 stage-error (the tool is missing, failed or printed no JSON, or the
// ref is unknown).
//
// How the M6 run uses it (the kernel's regression gate, supervisor tick's "regression" step, runs only hidden
// acceptance tests after a ship and cannot take a cmd, so this is not wired into the flow): after each order's
// `merge` stage, and once at the run's end, the operator (or a later kernel feature) runs
//   node qa-changed.mjs --since=<meta/m6 at the run start> --repo=/home/user/s3c-wt/m6-int --live=<run live dir> --feed
// Exit 0 is the evidence for criterion 6 (no regression scope). Exit 1 lists the lessons whose QA must run again
// (QA_ONLY=<lessons> on the integration build, qa.mjs <slug> --repo=<the integration worktree>); a lesson that then
// fails is reopened only once the founder or a checker confirms the failure (criterion 6: every reopen is real).

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F, SLUG_RE, DEFAULT_REPO } from "./lib/proc.mjs";

const USAGE = "usage: qa-changed.mjs --since=<ref> [--repo=<path>] [--exclude=<slug>[,<slug>]] [--live=<dir>] [--feed] [--worktree]";
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v); // state.mjs rev

/** The slugs of every order in a Meta state (o.slug, else its task: state.mjs prepareCmd's ${slug}). */
export function runSlugs(live) {
  const st = JSON.parse(fs.readFileSync(path.join(live, process.env.META_STATE || "state.json"), "utf8"), rev);
  return [...(st.engine?.orders?.values?.() ?? [])].map((o) => o.slug ?? o.task).filter(Boolean);
}

export function scope({ repo, since, exclude = [], feed = false, worktree = false }) {
  const findings = [];
  const out = (exit, extra = {}) => ({ exit, out: { ok: exit === 0, stage: "qa-changed", repo, since, findings, ...extra } });
  const tool = path.join(repo, "tools/qa-changed.mjs");
  if (!fs.existsSync(tool)) { findings.push(F.env("repo", `${repo} has no tools/qa-changed.mjs (not a System 3 Company checkout)`)); return out(3); }
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  const ref = spawnSync("git", ["-C", repo, "rev-parse", "--verify", "-q", `${since}^{commit}`], { encoding: "utf8", env });
  if (ref.status !== 0) { findings.push(F.env("since", `--since=${since} is no commit in ${repo}`)); return out(3); }
  const args = [tool, `--since=${since}`, "--format=json", ...(feed ? ["--feed"] : []), ...(worktree ? [] : ["--no-worktree"])];
  const r = spawnSync(process.execPath, args, { cwd: repo, encoding: "utf8", env, timeout: 120_000, maxBuffer: 64 * 1024 * 1024 });
  let j;
  try { j = JSON.parse(r.stdout); } catch {}
  if (r.status !== 0 || !j || !Array.isArray(j.lessons)) { findings.push(F.env("tool", `node tools/qa-changed.mjs ${args.slice(1).join(" ")}: ${r.error?.message ?? (j ? `exit ${r.status}` : `no JSON (exit ${r.status}): ${String(r.stderr || r.stdout).trim().split("\n").slice(-2).join(" | ")}`)}`)); return out(3); }
  const ex = new Set(exclude);
  const keep = j.lessons.filter((l) => !ex.has(l.slug));
  const why = Object.fromEntries(keep.map((l) => [l.slug, l.why]));
  for (const l of keep) findings.push(F.block("regression-scope", `${l.slug}: ${l.why}: its QA runs again on the integration build`, "qa"));
  if (feed && j.feed?.run) findings.push(F.advisory("feed", `the feed spec must run (without QA_ONLY): ${j.feed.why}`));
  return out(keep.length ? 1 : 0, { lessons: keep.map((l) => l.slug), why, excluded: j.lessons.filter((l) => ex.has(l.slug)).map((l) => l.slug), feed: j.feed ?? null, total: j.total ?? null });
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "qa-changed", findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["since", "repo", "exclude", "live", "feed", "worktree", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  if (typeof o.since !== "string" || !o.since || o.since.startsWith("-")) return usage("--since=<ref> is required");
  for (const k of ["repo", "exclude", "live"]) if (o[k] === true || o[k] === "") return usage(`--${k} needs a value`);
  for (const k of ["feed", "worktree"]) if (o[k] != null && o[k] !== true) return usage(`--${k} takes no value`);
  const exclude = o.exclude ? String(o.exclude).split(",").filter(Boolean) : [];
  const badSlug = exclude.find((s) => !SLUG_RE.test(s));
  if (badSlug) return usage(`--exclude: ${badSlug} is not a lesson slug`);
  if (o.live) {
    try { exclude.push(...runSlugs(path.resolve(String(o.live)))); }
    catch (e) { return { exit: 3, out: { ok: false, stage: "qa-changed", findings: [F.env("live", `cannot read the Meta state in ${o.live}: ${e.message}`)] } }; }
  }
  return scope({ repo: path.resolve(String(o.repo ?? DEFAULT_REPO)), since: o.since, exclude, feed: !!o.feed, worktree: !!o.worktree });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "qa-changed", findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
