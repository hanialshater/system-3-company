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

// Decide one lesson. reviews: [{ f, t, m }] (filename, text, mtime). Returns { ready, reason, latest }.
export function decide(reviews, metaVersion = 1) {
  if (!reviews.length) return { ready: false, reason: "no learner review" };
  const read = reviews.map((r) => ({ ...r, ...readReview(r.t), d: r.f.slice(0, 10) }));
  // The latest review is the one for the highest lesson version, then the latest date. Filename order
  // is not enough: "…-beginner-v2.md" sorts before "…-beginner.md". Same version and day: the last written wins.
  const latest = [...read].sort((a, b) => a.version - b.version || a.d.localeCompare(b.d) || a.m - b.m).at(-1);
  // Fail closed: an unreadable review dated after the chosen one may be the newer verdict, so it holds.
  const newer = read.find((r) => r !== latest && r.problem && r.d > latest.d);
  if (newer) return { ready: false, reason: `newer learner review unreadable (${newer.problem})`, latest };
  if (latest.problem) return { ready: false, reason: latest.problem, latest };
  if (latest.verdict !== "launch") return { ready: false, reason: `verdict ${latest.verdict}`, latest };
  if (latest.version !== metaVersion) return { ready: false, reason: "verdict is for an older version", latest };
  return { ready: true, reason: null, latest };
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
      const reviews = files.map((f) => ({ f, t: fs.readFileSync(path.join(rd, f), "utf8"), m: fs.statSync(path.join(rd, f)).mtimeMs }));
      const r = decide(reviews, meta.version ?? 1);
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
