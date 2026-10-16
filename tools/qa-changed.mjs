#!/usr/bin/env node
// QA only what changed (EDD-003 stage 0, "QA cost per change proportional to changed lessons").
//
// Lists the lessons whose behaviour may have changed, and prints a QA_ONLY list for the
// computer-use contract (tests/qa/lessons.ts reads QA_ONLY; the spec itself is unchanged).
//
// A lesson is selected when any file in its import closure changed: its own folder, a shared
// engine or kit file it imports (directly or transitively, e.g. @/kit/controls, @/kit/geo,
// @/components/lifehacks/StudyLesson), or a "shell" file every lesson page runs through
// (the /d/<slug> page, DemoCard, DemoHost, layout, globals.css, configs, the QA contract itself).
//
// Usage
//   node tools/qa-changed.mjs                 since each lesson's last green QA record (default)
//   node tools/qa-changed.mjs --since=<ref>   since a git ref (e.g. origin/main, HEAD~3)
//   node tools/qa-changed.mjs --since=<base> --until=<head>   a range (CI: base...head of a PR)
//   options: --format=list|env|json|why (default why) · --no-worktree (ignore uncommitted changes)
//            --feed (also print whether the feed spec needs to run)
//
// Run the feed spec WITHOUT QA_ONLY: tests/qa/feed.spec.ts builds its "allowed" set from lessons(),
// so with QA_ONLY the chip test compares the full feed against the sample and fails (seen 2026-10-14).
//
// "Last green QA record" = the commit that last added or changed a passing
// company/reviews/<slug>/*-qa.md (written by `company qa-record`). A lesson with no green record is
// always selected. Records do not yet carry a lesson version hash (EDD-003 stage 0 asks for one via an
// amendment to qa-record); when they do, this tool should compare hashes instead of commits.
//
// Examples
//   QA_ONLY=$(node tools/qa-changed.mjs --since=origin/main --format=list) npx playwright test
//   eval "$(node tools/qa-changed.mjs --format=env)" && npx playwright test tests/qa/contract.spec.ts

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEMOS = "src/demos";
/** Generated registry files (tools/registry.mjs): regenerated from metas, and metas are lesson files. */
const GENERATED = /^src\/demos\/[^/]+\.generated\.ts$/;
const CODE_EXT = [".tsx", ".ts", ".mjs", ".js", ".jsx"];
const RESOLVE_EXT = ["", ...CODE_EXT, ".json", ".css", ...CODE_EXT.map((e) => `/index${e}`)];

/** Files every lesson page depends on besides its imports. A change to any of them re-tests every lesson. */
const SHELL_ENTRIES = ["src/app/d/[slug]/page.tsx", "src/app/layout.tsx"];
const SHELL_FILES = ["src/app/globals.css", "next.config.mjs", "package.json", "package-lock.json", "playwright.config.ts", "tsconfig.json"];
const SHELL_PREFIXES = ["tests/qa/"];
/** Entry points of the feed spec (tests/qa/feed.spec.ts): /, /d/<slug> trust sheet, /catalog. */
const FEED_ENTRIES = ["src/app/page.tsx", "src/app/catalog/page.tsx", "src/app/d/[slug]/page.tsx", "src/app/layout.tsx"];

// ------------------------------------------------------------------ args
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.length ? v.join("=") : true];
  }),
);
if (args.help || args.h) {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 26).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exit(0);
}
const format = args.format ?? "why";
const UNTIL = args.until ? String(args.until) : "HEAD";
// Uncommitted changes only make sense when comparing against the checkout itself.
const includeWorktree = !args["no-worktree"] && UNTIL === "HEAD";

const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 }).trim();
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

// ------------------------------------------------------------------ import graph
const IMPORT_RE = /(?:import|export)\s[^"'`;]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|require\(\s*["']([^"']+)["']\s*\)/g;

function resolveSpec(fromFile, spec) {
  let base;
  if (spec.startsWith("@/")) base = path.posix.join("src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.posix.join(path.posix.dirname(fromFile), spec);
  else return null; // a package: covered by package.json / package-lock.json in the shell
  for (const ext of RESOLVE_EXT) {
    const p = base + ext;
    if (exists(p) && fs.statSync(path.join(ROOT, p)).isFile()) return p;
  }
  return null;
}

const depCache = new Map();
function directDeps(file) {
  if (depCache.has(file)) return depCache.get(file);
  const deps = [];
  if (CODE_EXT.some((e) => file.endsWith(e))) {
    const src = read(file);
    for (const m of src.matchAll(IMPORT_RE)) {
      const spec = m[1] ?? m[2] ?? m[3] ?? m[4];
      const r = resolveSpec(file, spec);
      if (r && !GENERATED.test(r)) deps.push(r); // the registry is regenerated from metas; metas are lesson files
    }
  }
  depCache.set(file, deps);
  return deps;
}

function closure(entries) {
  const seen = new Set();
  const stack = [...entries];
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f) || !exists(f)) continue;
    seen.add(f);
    stack.push(...directDeps(f));
  }
  return seen;
}

// ------------------------------------------------------------------ lessons
function listLessons() {
  const out = [];
  for (const domain of fs.readdirSync(path.join(ROOT, DEMOS))) {
    const ddir = path.posix.join(DEMOS, domain);
    if (!fs.statSync(path.join(ROOT, ddir)).isDirectory()) continue;
    for (const folder of fs.readdirSync(path.join(ROOT, ddir))) {
      const dir = path.posix.join(ddir, folder);
      if (!exists(path.posix.join(dir, "meta.json"))) continue;
      const meta = JSON.parse(read(path.posix.join(dir, "meta.json")));
      if (meta.status === "retired") continue; // tests/qa/lessons.ts skips retired lessons too
      const own = fs.readdirSync(path.join(ROOT, dir), { recursive: true }).map((f) => path.posix.join(dir, String(f).split(path.sep).join("/")));
      const entries = own.filter((f) => fs.statSync(path.join(ROOT, f)).isFile());
      out.push({ slug: meta.slug, domain: meta.domain, dir, files: closure(entries) });
    }
  }
  return out;
}

// ------------------------------------------------------------------ what changed
function worktreeChanges() {
  if (!includeWorktree) return [];
  const tracked = git("diff", "--name-only", "HEAD").split("\n");
  const untracked = git("ls-files", "--others", "--exclude-standard").split("\n");
  return [...tracked, ...untracked].filter(Boolean);
}

const diffCache = new Map();
function changedSince(ref) {
  if (!diffCache.has(ref)) diffCache.set(ref, git("diff", "--name-only", `${ref}...${UNTIL}`).split("\n").filter(Boolean));
  return diffCache.get(ref);
}

/** file -> newest commit that touched it, for every QA record, from one pass over history. */
let recordCommits = null;
function recordCommit(file) {
  if (!recordCommits) {
    recordCommits = new Map();
    let commit = null;
    const log = git("log", "--format=@%H", "--name-only", "--diff-filter=AM", "--", "company/reviews/*/*-qa.md");
    for (const line of log.split("\n")) {
      if (line.startsWith("@")) commit = line.slice(1);
      else if (line && !recordCommits.has(line)) recordCommits.set(line, commit);
    }
  }
  return recordCommits.get(file) ?? null;
}

/** The commit that last added or changed a passing QA record for this slug, or null. */
function lastGreenCommit(slug) {
  const dir = path.posix.join("company/reviews", slug);
  if (!exists(dir)) return null;
  const records = fs
    .readdirSync(path.join(ROOT, dir))
    .filter((f) => /-qa\.md$/.test(f))
    .sort()
    .reverse();
  for (const f of records) {
    const p = path.posix.join(dir, f);
    if (!/result: \*\*pass\*\*/.test(read(p))) continue;
    const c = recordCommit(p);
    if (c) return c; // an uncommitted record has no anchor yet: fall through to an older one
  }
  return null;
}

/**
 * content/domains.json reaches every lesson page (name, colour), but a new subject changes no other
 * lesson. So a change to it only selects lessons whose own domain entry differs from the anchor.
 */
const DOMAINS_FILE = "content/domains.json";
const domainsAt = new Map();
function domainEntry(ref, id) {
  if (!domainsAt.has(ref)) {
    let json = null;
    try {
      json = JSON.parse(ref === "WORKTREE" ? read(DOMAINS_FILE) : git("show", `${ref}:${DOMAINS_FILE}`));
    } catch {
      json = null;
    }
    domainsAt.set(ref, json);
  }
  const d = domainsAt.get(ref);
  return d ? JSON.stringify(d.domains.find((x) => x.id === id) ?? null) : "unreadable";
}
function domainChanged(anchor, id) {
  return domainEntry(anchor, id) !== domainEntry(includeWorktree ? "WORKTREE" : UNTIL, id);
}

/**
 * Meta fields a lesson page renders inside the part the lesson contract tests (the card header; the
 * lesson body is Demo.tsx). Everything else in meta.json is bookkeeping for this purpose: evidence
 * (qa-record appends to it), status promotions (publishing is gated on green QA, so counting them would
 * be circular), claims and recall (shown only in the trust sheet and revisit card, which the feed spec
 * covers), and the brief. A meta.json change outside these fields does not select the lesson.
 */
const CONTRACT_META_FIELDS = ["slug", "title", "hook", "domain", "durationSec"];
function onlyBookkeeping(ref, file) {
  const strip = (text) => {
    try {
      const m = JSON.parse(text);
      return JSON.stringify(CONTRACT_META_FIELDS.map((k) => m[k]));
    } catch {
      return null;
    }
  };
  let before = null;
  try {
    before = strip(git("show", `${ref}:${file}`));
  } catch {
    return false; // new file at the anchor: a real change
  }
  const now = strip(includeWorktree ? (exists(file) ? read(file) : "") : git("show", `${UNTIL}:${file}`));
  return before !== null && before === now;
}

function isShellFile(f, shell) {
  if (f === DOMAINS_FILE) return false; // handled per domain, see domainChanged

  return shell.has(f) || SHELL_FILES.includes(f) || SHELL_PREFIXES.some((p) => f.startsWith(p));
}

// ------------------------------------------------------------------ main
const lessons = listLessons();
const lessonDirs = lessons.map((l) => l.dir + "/");
// The shell closure, minus lesson folders (a lesson's own files only re-test that lesson).
const shell = new Set([...closure(SHELL_ENTRIES)].filter((f) => !lessonDirs.some((d) => f.startsWith(d))));
const feedFiles = closure(FEED_ENTRIES);
const dirty = worktreeChanges();

const selected = [];
let feedChanged = false;
let feedWhy = "";
for (const l of lessons) {
  let changed;
  let anchor;
  let anchorFull;
  if (args.since) {
    anchor = String(args.since);
    changed = [...changedSince(anchor), ...dirty];
  } else {
    const c = lastGreenCommit(l.slug);
    if (!c) {
      selected.push({ slug: l.slug, why: "no green QA record" });
      continue;
    }
    anchor = c.slice(0, 9);
    anchorFull = c;
    changed = [...changedSince(c), ...dirty];
  }
  const ref = args.since ? anchor : anchorFull;
  let hit =
    changed.find((f) => l.files.has(f) && f !== DOMAINS_FILE && !(f.endsWith("/meta.json") && onlyBookkeeping(ref, f))) ??
    changed.find((f) => isShellFile(f, shell));
  if (!hit && changed.includes(DOMAINS_FILE) && domainChanged(ref, l.domain)) {
    selected.push({ slug: l.slug, why: `its domain entry (${l.domain}) in ${DOMAINS_FILE} changed since ${anchor}` });
    continue;
  }
  if (hit) {
    const kind = l.files.has(hit) ? (hit.startsWith(l.dir + "/") ? "own file" : "shared file") : "shell file";
    selected.push({ slug: l.slug, why: `${kind} ${hit} changed since ${anchor}` });
  }
}
// The feed spec has no QA record to anchor on, so without --since only uncommitted changes count.
const feedAnchored = Boolean(args.since);
{
  const changed = [...(args.since ? changedSince(String(args.since)) : []), ...dirty];
  const hit = changed.find((f) => feedFiles.has(f) || SHELL_FILES.includes(f) || SHELL_PREFIXES.some((p) => f.startsWith(p)));
  if (hit) {
    feedChanged = true;
    feedWhy = `${hit} changed`;
  } else if (!feedAnchored) feedWhy = "no committed changes checked: pass --since=<ref> for the feed";
}

const slugs = selected.map((s) => s.slug);
if (format === "list") console.log(slugs.join(","));
else if (format === "env") console.log(`QA_ONLY=${slugs.join(",")}`);
else if (format === "json")
  console.log(JSON.stringify({ since: args.since ?? "last-green-qa-record", lessons: selected, feed: args.feed ? { run: feedChanged, why: feedWhy } : undefined, total: lessons.length }, null, 2));
else {
  for (const s of selected) console.log(`${s.slug.padEnd(44)} ${s.why}`);
  console.log(`\n${selected.length} of ${lessons.length} lessons need QA.`);
  if (args.feed)
    console.log(`feed spec: ${feedChanged ? `run (${feedWhy}): npx playwright test tests/qa/feed.spec.ts, without QA_ONLY` : feedWhy || "unchanged"}`);
  if (selected.length) console.log(`QA_ONLY=${slugs.join(",")}`);
}
if (slugs.length === 0 && format !== "json") process.stderr.write("qa-changed: nothing to test (an empty QA_ONLY runs no lessons; an unset one runs all)\n");
