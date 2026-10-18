#!/usr/bin/env node
// The HQ Evaluation view's index (W-1648; batch 5 §20.3, company/personalization/batches/2026-10-17-batch-5.md).
// owner: personalization-engineer. Writes src/data/hq-personalization-eval/evaluation.json, which the page
// /hq/personalization/evaluation imports at build time (no server read of company/ at run time, no process).
//
//   node tools/hq-eval-index.mjs           rewrite the index from the committed records
//   node tools/hq-eval-index.mjs --check   rebuild in memory; exit 1 if the committed index differs
//
// Committed records only, never harness source or output: every source below is a .md record outside
// company/personalization/eval/harness/ (the script refuses a harness path). Every verdict and status is copied
// verbatim: a quote is either an exact substring, a whole line, or a markdown table's lines taken as they stand;
// the script fails if a quote is not found, and tests/hq/personalization-evaluation.test.mjs re-checks every quote
// against its file and every criterion hash against `git show <freeze commit>:<criterion>`.
// Criterion 3b (K6, readout 3b) is INVALID: the view shows INVALID first, and any rows printed under INVALID carry
// "printed under INVALID; no rule reads them" (batch 5 §21.1). The candidates' standing (v2 NO-GO, v3 not scored and
// withdrawn from the website, R4 parked) is quoted from the G record and batch 5 §21 (personalization-eval checks the
// transcription, W-1651).
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const OUT = "src/data/hq-personalization-eval/evaluation.json";
const EVAL = "company/personalization/eval";
const B5 = "company/personalization/batches/2026-10-17-batch-5.md";
const HARNESS = /^company\/personalization\/eval\/harness\//;

const text = new Map();
function read(rel) {
  if (HARNESS.test(rel) || !rel.startsWith("company/") || !rel.endsWith(".md")) throw new Error(`not a record the view may read: ${rel}`);
  if (!text.has(rel)) text.set(rel, readFileSync(path.join(ROOT, rel), "utf8"));
  return text.get(rel);
}
const fail = (m) => { throw new Error(`hq-eval-index: ${m}`); };
const lineNo = (rel, q) => read(rel).slice(0, read(rel).indexOf(q)).split("\n").length;
/** An exact substring. */
const sub = (rel, q) => { if (!read(rel).includes(q)) fail(`${rel}: quote not found: ${q.slice(0, 80)}`); return { kind: "text", path: rel, line: lineNo(rel, q), quote: q }; };
/** The whole first line that starts with `start`. */
const line = (rel, start) => { const l = read(rel).split("\n").find((x) => x.startsWith(start)); if (!l) fail(`${rel}: no line starts with ${start}`); return sub(rel, l); };
/** The first markdown table after the line that starts with `heading`, its lines as they stand. */
function table(rel, heading) {
  const ls = read(rel).split("\n");
  const h = ls.findIndex((x) => x.startsWith(heading));
  if (h < 0) fail(`${rel}: no heading ${heading}`);
  let i = h + 1;
  while (i < ls.length && !ls[i].startsWith("|")) { if (/^#{1,3} /.test(ls[i])) fail(`${rel}: no table under ${heading}`); i++; }
  const rows = [];
  while (i < ls.length && ls[i].startsWith("|")) rows.push(ls[i++]);
  const q = rows.join("\n");
  return { ...sub(rel, q), kind: "table" };
}
const sha = (b) => createHash("sha256").update(b).digest("hex");
const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

function criterion(rel, commit, sha256) {
  read(rel);
  if (!read(rel).includes(commit) || !read(rel).includes(sha256)) fail(`${rel} does not state commit ${commit} and sha256 ${sha256}`);
  const at = sha(Buffer.from(git("show", `${commit}:${rel}`), "utf8"));
  if (at !== sha256) fail(`${rel} at ${commit} hashes to ${at}, not ${sha256}`);
  return { path: rel, freezeCommit: commit, sha256, hashChecked: `sha256(git show ${commit.slice(0, 7)}:${rel}) = ${sha256}`, freezeLine: line(rel, "frozen:") };
}

export function buildIndex() {
  text.clear();
  const r3b = `${EVAL}/2026-10-17-criterion-3b-readout.md`;
  const g = "company/decisions/2026-10-17-vp-personalization-readout-3b-g.md";
  const dec1 = "company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md";
  const dec2 = "company/decisions/2026-10-17-vp-personalization-readout-2-decisions.md";
  const dec3 = "company/decisions/2026-10-17-vp-personalization-readout-3-decisions.md";
  const studies = [
    { id: "phase-a", name: "Phase A (readout 1)",
      criterion: criterion(`${EVAL}/2026-10-16-phase-a-criterion.md`, "e9909edc78a0f60914e9b89c790878ecb4b65576", "0bc2cbbd9d16e48ad19df750206eea56d876ca02a8438720b44862cbe4f325c7"),
      readout: { path: `${EVAL}/2026-10-16-phase-a-readout-1.md`, verdicts: [table(`${EVAL}/2026-10-16-phase-a-readout-1.md`, "**Per pair (criterion §2;")] },
      repro: { path: `${EVAL}/2026-10-16-phase-a-readout-1-repro.md`, status: line(`${EVAL}/2026-10-16-phase-a-readout-1-repro.md`, "**Byte-identical.**") },
      decision: { path: dec1, status: line(dec1, "status:"), glance: table(dec1, "## 0. Decisions at a glance") } },
    { id: "criterion-2", name: "Criterion 2 (readout 2)",
      criterion: criterion(`${EVAL}/2026-10-16-criterion-2.md`, "869f62505f8f4a16a7ce102a5932a1842bd73894", "8671aaaf44d4cdc1aaa89a7f901ab283fe3f0775d5ecdc3165d0be244432d3b5"),
      readout: { path: `${EVAL}/2026-10-16-criterion-2-readout.md`, verdicts: [table(`${EVAL}/2026-10-16-criterion-2-readout.md`, "## 1. Verdicts")] },
      repro: { path: `${EVAL}/2026-10-16-criterion-2-readout-repro.md`, status: line(`${EVAL}/2026-10-16-criterion-2-readout-repro.md`, "**Byte-identical.**") },
      decision: { path: dec2, status: line(dec2, "status:"), glance: table(dec2, "## 0. Decisions at a glance") } },
    { id: "criterion-3", name: "Criterion 3 (readout 3)",
      criterion: criterion(`${EVAL}/2026-10-17-criterion-3.md`, "709ca2d22af533532f337d2e7dd9ca078bc316a3", "2ed7933e4b606d79d6c2109e619ce698730aae9d6a6b7b1d908db9d905346d30"),
      readout: { path: `${EVAL}/2026-10-17-criterion-3-readout.md`, verdicts: [line(`${EVAL}/2026-10-17-criterion-3-readout.md`, "**`verdicts.rule3`"), line(`${EVAL}/2026-10-17-criterion-3-readout.md`, "**The placements agree on the reading.**")] },
      repro: { path: `${EVAL}/2026-10-17-criterion-3-readout-repro.md`, status: line(`${EVAL}/2026-10-17-criterion-3-readout-repro.md`, "**Byte-identical.**") },
      decision: { path: dec3, status: line(dec3, "status:"), glance: table(dec3, "## 0. Decisions at a glance") } },
    { id: "criterion-3b", name: "Criterion 3b (readout 3b, K6: reachable-v2)",
      criterion: criterion(`${EVAL}/2026-10-17-criterion-3b.md`, "8e96251bb652cff5d093bede0d324601fb7c624c", "3a919fc3eaab6d217f97c3c49cd604030106aa82948ef69085ebc52ecdf944e5"),
      readout: { path: r3b, verdicts: [line(r3b, "**`verdicts.pair.outcome`: INVALID.**"), line(r3b, "## Outcome: candidate+fixed vs default-order+fixed: **INVALID**")] },
      printedLabel: sub(B5, "printed under INVALID; no rule reads them").quote,
      printedRule: sub(B5, 'The HQ Evaluation view shows INVALID first, then the printed rows labelled "printed under INVALID; no rule reads them" (§20.3 quoting rule).'),
      printed: [table(r3b, "### interleave:base (base)"), table(r3b, "### first:base (one-at-a-time)")],
      repro: { path: g, status: line(g, "| 3 | **R4 not needed now. It is parked.**") },
      decision: { path: g, status: line(g, "# G on readout 3b"), glance: table(g, "## Decisions") },
      standings: [
        { candidate: "reachable-v2", quote: sub(B5, 'Record: "reachable-v2, readout 3b: INVALID (copy check V10, M3 4 of 4). NO-GO."') },
        { candidate: "reachable-v3", quote: sub(B5, '"not scored under M1; withdrawn from the website"') },
        { candidate: "reachable-v3", quote: line(g, "| 2 | **K7 not sent.**") },
        { candidate: "R4 (reproduction of readout 3b)", quote: line(B5, "- **R4 is parked, not cancelled.**") },
      ] },
  ];
  const ev = "company/personalization/evidence";
  const cp = "company/personalization/copy";
  const reviews = [
    { id: "F5b", what: "reachable-v2 vs reachable-v1: diff review, order rule check (learning-scientist-personalization)", path: `${ev}/2026-10-17-reachable-v2-diff-review.md`,
      verdict: [line(`${ev}/2026-10-17-reachable-v2-diff-review.md`, "**There is no blocking row.**"), line(`${ev}/2026-10-17-reachable-v2-diff-review.md`, "blocking 0, notes 13")],
      decision: line(B5, "## 13. ") },
    { id: "F6", what: "Is EDD-010 §6.3's moving-reason rule true against every passed card? (learning-scientist-personalization)", path: `${ev}/2026-10-17-edd010-reason-rule-truth.md`,
      verdict: [sub(`${ev}/2026-10-17-edd010-reason-rule-truth.md`, "**Blocking: 3** (B1 later:domain-estimate; B2 later:concept-known, as §6.3 passes facts; B3 domain-estimate in both directions under the Q-P5 ceiling, which falls to a note if RC rules that a non-causal juxtaposition is acceptable). **Notes: 7** (N1-N7).")],
      decision: line(B5, "## 15. ") },
    { id: "F7", what: "Are reachable-v3's emitted move reasons true? (learning-scientist-personalization)", path: `${ev}/2026-10-17-reachable-v3-reason-truth.md`,
      verdict: [sub(`${ev}/2026-10-17-reachable-v3-reason-truth.md`, "**Blocking: 0. Notes: 9 (N1-N9).**")],
      decision: line(B5, "## 17. ") },
    { id: "RC", what: "Reason-line candidates L1-L7 for reachable-v3's move keys (fact-checker, author)", path: `${cp}/2026-10-17-reason-lines-rc.md`,
      verdict: [sub(`${cp}/2026-10-17-reason-lines-rc.md`, "**PROPOSALS, not verified copy.**"), sub(`${cp}/2026-10-17-reason-lines-rc.md`, "**Blocking keys: none**")],
      decision: line(B5, "### 18.3 ") },
    { id: "fc2", what: "Second fact-check of L1-L7 (fact-checker, independent)", path: `${cp}/2026-10-17-reason-lines-fc2.md`,
      verdict: [table(`${cp}/2026-10-17-reason-lines-fc2.md`, "## 6. Statuses")],
      decision: line(B5, "## 18. ") },
    { id: "fact-check of head-of-product's copy", what: "Head-of-product's proposed copy for the personalised order (fact-checker, W-1632)", path: `${cp}/2026-10-17-hop-copy-factcheck.md`,
      verdict: [line(`${cp}/2026-10-17-hop-copy-factcheck.md`, "verified: I1")],
      decision: line(B5, "## 19. ") },
  ];
  const sections = read(B5).split("\n").filter((l) => /^## (\d+)\. /.test(l) && Number(/^## (\d+)\./.exec(l)[1]) >= 1);
  const timeline = [
    { date: "2026-10-16", what: "Readout 1 decisions", quote: line(dec1, "# ") },
    { date: "2026-10-17", what: "Readout 2 decisions", quote: line(dec2, "# ") },
    { date: "2026-10-17", what: "Readout 3 decisions", quote: line(dec3, "# ") },
    ...sections.map((l) => ({ date: "2026-10-17", what: `Batch 5 §${/^## (\d+)\./.exec(l)[1]}`, quote: sub(B5, l) })),
    { date: "2026-10-17", what: "G on readout 3b", quote: line(g, "# ") },
    { date: "2026-10-17", what: "reachable-v1 (timeline only, batch 5 §20.1 (e))", quote: line(B5, "- **`reachable-v1` is retired, unscored**") },
  ];
  if (sections.length < 20) fail(`batch 5 has ${sections.length} numbered sections from §1; expected at least 20`);
  return {
    schema: "personalization-hq-evaluation-v1",
    rule: "batch 5 §20.3 (company/personalization/batches/2026-10-17-batch-5.md)",
    note: "Committed records only, quoted verbatim with their paths; never harness source or output. Lab candidate views are not scores and never sit beside these verdicts.",
    command: "node tools/hq-eval-index.mjs",
    studies, reviews, timeline,
  };
}

const json = (o) => JSON.stringify(o, null, 1) + "\n";
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const doc = json(buildIndex());
  const abs = path.join(ROOT, OUT);
  if (process.argv.includes("--check")) {
    const old = existsSync(abs) ? readFileSync(abs, "utf8") : null;
    if (old !== doc) { console.log(`hq-eval-index --check: STALE (${OUT} differs from the records; run node tools/hq-eval-index.mjs)`); process.exit(1); }
    console.log("hq-eval-index --check: current");
  } else {
    mkdirSync(path.dirname(abs), { recursive: true });
    writeFileSync(abs, doc);
    console.log(`hq-eval-index: wrote ${OUT} (${(doc.length / 1024).toFixed(0)} KB)`);
  }
}
