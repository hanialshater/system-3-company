#!/usr/bin/env node
// Chief-of-staff publish loop (W-062). Not a gate: the gates live in tools/company.mjs and still run
// on every publish. AMD-013: this script and the gate now share one readiness policy
// (tools/lib/readiness.mjs): current-version learner and QA verdicts that pass, no active hold, and an
// unambiguous review order. The list below is readiness only; `company publish` adds the claim floor.
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
import { fileURLToPath } from "node:url";

// AMD-013: the readiness policy (verdicts, versions, holds, review order, and QA) lives in tools/lib/readiness.mjs,
// which tools/company.mjs launchGates() also calls. These names are re-exported so tests/publish/ is unchanged.
import { VERDICTS, readReview, builtFrom, newer, decide, gitAncestry, readiness, loadContext, loadHolds } from "./lib/readiness.mjs";
export { VERDICTS, readReview, builtFrom, newer, decide, gitAncestry };

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
  const holds = loadHolds(ROOT);

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
      const r = readiness(meta, loadContext(ROOT, meta, { holds, isAncestor }));
      if (!r.ready) { why(r.reasons[0]); continue; }
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

// Node resolves the module filename through symlinks, while argv can retain an alias
// (notably /var versus /private/var on macOS). Compare filesystem identities so
// direct execution still runs, while imports and unavailable argv stay inert.
function isDirectExecution() {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(fileURLToPath(import.meta.url)) === fs.realpathSync(path.resolve(process.argv[1]));
  } catch {
    return false;
  }
}

if (isDirectExecution()) main();
