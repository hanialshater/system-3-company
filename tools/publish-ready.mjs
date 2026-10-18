#!/usr/bin/env node
// Chief-of-staff publish loop (W-062). Not a gate: the gates live in tools/company.mjs and still run
// on every publish. This script adds the check the gate lacks until AMD-001(d) is ratified: the most
// recent learner review must say "Verdict: launch" AND name the lesson's current version.
//
//   node tools/publish-ready.mjs              list candidates and why others are held (read-only)
//   node tools/publish-ready.mjs --link       also link learner-review files into meta.json
//   node tools/publish-ready.mjs --publish    link, then run `company publish` for each candidate
//   node tools/publish-ready.mjs --help | -h  usage
//
// Linking writes learner-review files into meta.evidence.simulatedLearner (W-063 until a command
// exists). W-1319: it happens only on --link or --publish; a plain list run, --help and any unknown
// flag write nothing. Unknown flags and positionals print usage and exit 2 before any file is read.
//
// Verdict wording (W-843, evaluation-steward ruling, company/reviews/_template-learner-review.md):
// the vocabulary is exactly launch | revise | fatal, on a line that starts with "Verdict:", plus a
// line "lesson version: vN". The parser does NOT learn synonyms ("pass", "block", "launch with
// notes" in a heading named "Verdict for the current version"): translating a reviewer's word is a
// judgement, and the judge must not make it silently. A non-canonical word holds the lesson and is
// named in the reason, so the record gets re-written by its reviewer. Tests: tests/publish/.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

export const VERDICTS = ["launch", "revise", "fatal"];
const VERDICT_LINE = /^[ \t>*_#-]*Verdict:[ \t]*[*_]*[ \t]*([A-Za-z-]+)/gim;
const VERSION_LINE = /^[ \t>*_-]*lesson version:[ \t]*v(\d+)\b/gim;

// Read one learner review. Returns { verdict, version, problem }.
// verdict: "launch" | "revise" | "fatal" | null. version: N or 0 (no stamp). problem: null or why it is unreadable.
export function readReview(text) {
  const words = [...text.matchAll(VERDICT_LINE)].map((m) => m[1].toLowerCase());
  const canon = [...new Set(words.filter((w) => VERDICTS.includes(w)))];
  const other = [...new Set(words.filter((w) => !VERDICTS.includes(w)))];
  const stamps = [...new Set([...text.matchAll(VERSION_LINE)].map((m) => Number(m[1])))];
  let problem = null;
  let verdict = null;
  if (other.length) problem = `verdict wording "${other.join('", "')}" is not ${VERDICTS.join("|")}`;
  else if (canon.length > 1) problem = `conflicting verdicts (${canon.join(", ")})`;
  else if (!canon.length) problem = "verdict missing";
  else verdict = canon[0];
  let version = 0;
  if (stamps.length === 1) version = stamps[0];
  else if (stamps.length > 1) problem ??= `conflicting lesson version stamps (v${stamps.join(", v")})`;
  else problem ??= "no lesson version stamp";
  if (problem) verdict = null;
  return { verdict, version, problem };
}

// W-1596: ordering two records for the same lesson version on the same day. File mtime is NOT used:
// a fresh checkout gives every file the same mtime, and "-r2.md" sorts before ".md", so the older
// record won. Signals, strongest first; the first one that decides a pair wins:
//   1. built-from ancestry. A record that says "built from <sha>" saw that build. If one record's
//      SHA is a strict git ancestor of the other's, the record of the descendant build is newer. This
//      is the most robust signal: it is about the artifact the reviewer saw, not about naming. It
//      abstains when either SHA is missing, unknown to this clone (shallow, unmerged worktree), equal,
//      or on diverged branches.
//   2. an explicit "supersedes: <file>" line naming the other record (the reviewer's own statement).
//   3. the "-rN" suffix, only between records of the same name stem (no suffix is r1). A suffix on
//      "learner-a" says nothing about "learner-b".
// Records that no signal orders are a real tie, and the tie fails closed: the most severe verdict
// stands (unreadable > fatal > revise > launch), then filename order for a stable answer.
const BUILT_FROM = /built from[ \t`*]*([0-9a-f]{7,40})\b/i;
const SUPERSEDES = /^[ \t>*_-]*supersedes:[ \t]*(.+)$/gim;
const SEVERITY = { launch: 0, revise: 1, fatal: 2 };
export function builtFrom(text) {
  return text.match(BUILT_FROM)?.[1]?.toLowerCase() ?? null;
}
function stem(f) {
  const m = f.match(/^(.*?)(?:-r(\d+))?\.md$/);
  return m ? { base: m[1], n: m[2] ? Number(m[2]) : 1 } : { base: f, n: 1 };
}
function supersedes(r, other) {
  const name = path.basename(other.f);
  return [...r.t.matchAll(SUPERSEDES)].some((m) => m[1].includes(name) || m[1].includes(name.replace(/\.md$/, "")));
}
// Which of a and b is newer: 1 (a), -1 (b) or 0 (no signal decides). Exported for the tests.
export function newer(a, b, isAncestor = null) {
  const sa = builtFrom(a.t), sb = builtFrom(b.t);
  if (isAncestor && sa && sb && sa !== sb && !sa.startsWith(sb) && !sb.startsWith(sa)) {
    if (isAncestor(sb, sa) === true) return 1;
    if (isAncestor(sa, sb) === true) return -1;
  }
  const supA = supersedes(a, b), supB = supersedes(b, a);
  if (supA !== supB) return supA ? 1 : -1;
  const ka = stem(a.f), kb = stem(b.f);
  if (ka.base === kb.base && ka.n !== kb.n) return ka.n > kb.n ? 1 : -1;
  return 0;
}
const severity = (r) => (r.problem ? 3 : SEVERITY[r.verdict] ?? 3);

// Decide one lesson. reviews: [{ f, t }] (filename, text; an "m" mtime is ignored). opts.isAncestor:
// (x, y) => true | false | null, "is commit x a strict ancestor of y" (main passes a git-backed one;
// without it, signal 1 abstains). Returns { ready, reason, latest }.
export function decide(reviews, metaVersion = 1, opts = {}) {
  if (!reviews.length) return { ready: false, reason: "no learner review" };
  const read = reviews.map((r) => ({ ...r, ...readReview(r.t), d: r.f.slice(0, 10) }));
  // The latest review is the one for the highest lesson version, then the latest date, then W-1596's
  // ordering above. Filename order alone is not enough: "…-beginner-v2.md" sorts before "…-beginner.md".
  const top = read.reduce((t, r) => (r.version > t.version || (r.version === t.version && r.d > t.d) ? r : t));
  const group = read.filter((r) => r.version === top.version && r.d === top.d);
  const unbeaten = group.filter((r) => !group.some((o) => o !== r && newer(o, r, opts.isAncestor) > 0));
  const pool = unbeaten.length ? unbeaten : group; // a cycle of signals: treat the whole group as tied
  const latest = [...pool].sort((a, b) => severity(b) - severity(a) || a.f.localeCompare(b.f))[0];
  // Fail closed: an unreadable review dated after the chosen one may be the newer verdict, so it holds.
  const newerBad = read.find((r) => r !== latest && r.problem && r.d > latest.d);
  if (newerBad) return { ready: false, reason: `newer learner review unreadable (${newerBad.problem})`, latest };
  if (latest.problem) return { ready: false, reason: latest.problem, latest };
  if (latest.verdict !== "launch") return { ready: false, reason: `verdict ${latest.verdict}`, latest };
  if (latest.version !== metaVersion) return { ready: false, reason: "verdict is for an older version", latest };
  return { ready: true, reason: null, latest };
}

// Git-backed ancestry for decide(): true / false, or null when git cannot say (unknown commit,
// no git). Cached per pair; one `git merge-base --is-ancestor` call per uncached pair.
export function gitAncestry(cwd) {
  const cache = new Map();
  return (x, y) => {
    const k = `${x}..${y}`;
    if (cache.has(k)) return cache.get(k);
    let v = null;
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", x, y], { cwd, stdio: "ignore" });
      v = true;
    } catch (e) {
      v = e.status === 1 ? false : null;
    }
    cache.set(k, v);
    return v;
  };
}

export const USAGE = `usage: node tools/publish-ready.mjs [--link | --publish | --help]
  (no flag)   list publish candidates and why others are held; writes nothing
  --link      also link learner-review files into meta.evidence.simulatedLearner (writes meta.json)
  --publish   link, then run \`company publish\` for each candidate (the gates still run)
  --help, -h  print this and exit`;

const FLAGS = new Set(["--link", "--publish", "--help", "-h"]);

// W-1319: know every flag. Returns { help, link, publish } or { error }.
export function parseArgs(argv) {
  const bad = argv.filter((a) => !FLAGS.has(a));
  if (bad.length) return { error: `unknown argument${bad.length > 1 ? "s" : ""}: ${bad.join(" ")}` };
  const help = argv.includes("--help") || argv.includes("-h");
  const publish = argv.includes("--publish");
  return { help, publish, link: publish || argv.includes("--link") };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.error) {
    console.error(`publish-ready: ${args.error}\n${USAGE}`);
    process.exit(2);
  }
  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }
  const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const rel = (...p) => path.join(ROOT, ...p);
  const doPublish = args.publish;
  const doLink = args.link;
  const holds = fs.existsSync(rel("company/ops/publish-holds.json"))
    ? JSON.parse(fs.readFileSync(rel("company/ops/publish-holds.json"), "utf8")).holds
    : {};

  const isAncestor = gitAncestry(ROOT);
  const ready = [];
  const held = {};
  let linked = 0;
  for (const dom of fs.readdirSync(rel("src/demos"))) {
    const dd = rel("src/demos", dom);
    if (!fs.statSync(dd).isDirectory()) continue;
    for (const slug of fs.readdirSync(dd)) {
      const mp = path.join(dd, slug, "meta.json");
      if (!fs.existsSync(mp)) continue;
      const meta = JSON.parse(fs.readFileSync(mp, "utf8"));
      const rd = rel("company/reviews", slug);
      const files = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.includes("learner")).sort() : [];
      const have = meta.evidence?.simulatedLearner ?? [];
      const add = files.map((f) => `company/reviews/${slug}/${f}`).filter((p) => !have.includes(p));
      linked += add.length;
      if (doLink && add.length) {
        meta.evidence.simulatedLearner = [...have, ...add];
        fs.writeFileSync(mp, JSON.stringify(meta, null, 2) + "\n");
      }
      if (meta.status !== "review") continue;
      const why = (r) => (held[r] ??= []).push(slug);
      if (holds[slug]) { why(`hold: ${holds[slug]}`); continue; }
      const reviews = files.map((f) => ({ f, t: fs.readFileSync(path.join(rd, f), "utf8") }));
      const r = decide(reviews, meta.version ?? 1, { isAncestor });
      if (!r.ready) { why(r.reason); continue; }
      ready.push(slug);
    }
  }

  if (doLink) console.log(`linked ${linked} review file(s) as evidence`);
  else console.log(`${linked} review file(s) not yet linked as evidence (read-only run; --link writes them)`);
  for (const [r, s] of Object.entries(held)) console.log(`held (${r}): ${s.length}${s.length <= 12 ? "  " + s.join(", ") : ""}`);
  console.log(`candidates: ${ready.length}  ${ready.join(", ")}`);
  if (doPublish)
    for (const slug of ready) {
      let out;
      try {
        out = execFileSync("node", [rel("tools/company.mjs"), "publish", slug], { encoding: "utf8" });
      } catch (e) {
        out = (e.stdout ?? "") + (e.stderr ?? "");
      }
      console.log(out.trim().split("\n").filter(Boolean).slice(-3).join(" "));
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
