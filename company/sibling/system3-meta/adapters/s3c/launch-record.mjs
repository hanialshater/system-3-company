#!/usr/bin/env node
// launch-record.mjs: the System 3 Meta post-check for the launch stage (plan 2026-10-21-m4-m7-plan.md §2 stage 7
// "launch": "evidence company/rituals/records/<date>-launch-review-<slug>.md with `go`; code post-check that the
// decision line and objection list exist"; §3 K12 post-checks on human stages). It runs at `room leave` of the
// head-of-product's session, before `advance`, in the order worktree. It writes nothing.
//
//   node launch-record.mjs <slug> [<record>] [--repo=<path>]
//        <record>: the leave's evidence (the spec passes ${evidence}), repo-relative; without it, the newest
//        company/rituals/records/<date>-launch-review-<slug>.md
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 pass, 1 revise (findings;
// park:true on a no-go), 2 usage, 3 stage-error (the repo is not a company checkout). Non-advisory findings are also
// printed as "<severity> <kind>: <message>" lines, as the sibling adapters do.
//
// What the record must hold (read from company/rituals/templates/launch-review.md, the template `company ritual
// launch-review` writes, and the records in company/rituals/records/):
//   1. The path is exactly company/rituals/records/<YYYY-MM-DD>-launch-review-<slug>.md (plan §2 row 7) and the file
//      exists inside the repo. ${evidence} is the agent's text, so it is checked as a path, never trusted.
//   2. A decision. The template's section is "## Decision" whose first line is "go / no-go / go with conditions.
//      Signed: head-of-product."; a filled record replaces it with one of the three. A `Decision: <x>` line anywhere
//      counts too. Rules:
//        - the template line left as is ("go / no-go / …") is unfilled: refuse (route launch, fixed in-session);
//        - two decision lines that disagree: refuse;
//        - `go` passes;
//        - `go with conditions` refuses: in Meta the ship stage runs on the next tick and no code reads a record's
//          conditions (r8/r9 held their go open on preconditions that release-manager checked by hand). The chair
//          either meets the conditions first and writes go, or writes no-go;
//        - `no-go` is the chair's ruling, not a defect a builder session can fix: exit 1 with park:true, route park
//          (plan §3 K8), so the order waits for the orderer instead of looping.
//   3. An objection list (CLAUDE.md: "Objections travel with decisions"; template "## Open objections travelling with
//      this launch"; a heading naming objections, or an `Objections:` line). It must have at least one entry: a list
//      item or a table row below the header. An empty table is the template unfilled; "none raised" is an entry.
//   4. It is about this lesson as it stands: it names the slug, and `v<meta.version>` (the company's current-version
//      rule, tools/lib/readiness.mjs; a revise loop bumps the version, so a record from an earlier loop names an
//      older one and is refused until the chair re-reads the lesson).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_REPO, F, parseArgs, SLUG_RE, findLesson } from "./lib/proc.mjs";

export const RECORDS_DIR = "company/rituals/records";
export const recordRe = (slug) => new RegExp(`^${RECORDS_DIR}/\\d{4}-\\d{2}-\\d{2}-launch-review-${slug}\\.md$`);
const USAGE = "usage: launch-record.mjs <slug> [<company/rituals/records/<date>-launch-review-<slug>.md>] [--repo=<path>]";
const L = (kind, message) => F.block(kind, message, "launch");

/** Lines of the section under the first heading matching `re`, up to the next heading of any level. null: no heading. */
function section(lines, re) {
  const i = lines.findIndex((l) => /^#{1,6}\s/.test(l) && re.test(l));
  if (i < 0) return null;
  const end = lines.findIndex((l, j) => j > i && /^#{1,6}\s/.test(l));
  return lines.slice(i + 1, end < 0 ? lines.length : end);
}
const plain = (l) => l.replace(/[*_`]/g, "").replace(/^\s*(?:[-+]|\d+\.)\s+/, "").trim();
const DECISION = /^(?:decision\s*:\s*)?(go with conditions|no-go|go)\b(.*)$/i;

/** The decision values in record text: [{value, line, unfilled}]. */
export function decisions(text) {
  const lines = text.split("\n");
  const out = [];
  const take = (raw) => {
    const m = plain(raw).match(DECISION);
    if (!m) return false;
    out.push({ value: m[1].toLowerCase(), line: raw.trim(), unfilled: /^\s*\/\s*(?:no-go|go)\b/i.test(m[2]) });
    return true;
  };
  const sec = section(lines, /^#{1,6}\s+decision\b/i);
  if (sec) {
    const first = sec.find((l) => l.trim());
    if (first && !take(first)) out.push({ value: null, line: first.trim(), unfilled: false });
  }
  for (const l of lines) if (/^\s*(?:[-*]\s+)?(?:\*\*)?decision(?:\*\*)?\s*:/i.test(l)) take(l);
  // the same line seen twice (a "Decision: go" line that is also the section's first line) counts once
  return out.filter((d, i) => out.findIndex((e) => e.line === d.line) === i);
}

/** Entries of the objection list: null when there is no list at all, else the entry lines. */
export function objections(text) {
  const lines = text.split("\n");
  let body = section(lines, /objections?\b/i);
  if (body == null) {
    const i = lines.findIndex((l) => /^\s*(?:\*\*)?objections(?:\*\*)?\s*:/i.test(l));
    if (i < 0) return null;
    const inline = lines[i].replace(/^\s*(?:\*\*)?objections(?:\*\*)?\s*:\s*/i, "").trim();
    const end = lines.findIndex((l, j) => j > i && /^#{1,6}\s/.test(l));
    body = [...(inline ? [`- ${inline}`] : []), ...lines.slice(i + 1, end < 0 ? lines.length : end)];
  }
  const entries = [];
  let tableRow = 0;
  for (const l of body) {
    const t = l.trim();
    if (!t.startsWith("|")) { tableRow = 0; if (/^(?:[-*+]|\d+\.)\s+\S/.test(t)) entries.push(t); continue; }
    tableRow++;
    if (tableRow === 1 || /^\|[\s:|-]*$/.test(t)) continue; // the header and the |---| rule
    if (t.split("|").slice(1, -1).some((c) => c.trim())) entries.push(t);
  }
  return entries;
}

/** Pure: judge record `rel` (repo-relative) with text `text` for lesson `slug` at meta.version `version`. */
export function judge(slug, rel, text, version) {
  const findings = [];
  const ds = decisions(text);
  const base = { stage: "launch", slug, record: rel, metaVersion: version };
  if (!ds.length) findings.push(L("decision", `${rel} has no decision: a "## Decision" section whose first line is go, no-go or go with conditions (or a "Decision: go" line)`));
  else if (ds.some((d) => d.unfilled)) findings.push(L("decision", `${rel}: the decision line is the template's ("go / no-go / go with conditions"); write the one decision`));
  else if (ds.some((d) => d.value == null)) findings.push(L("decision", `${rel}: the "## Decision" section's first line is not go, no-go or go with conditions: "${ds.find((d) => d.value == null).line.slice(0, 80)}"`));
  else if (new Set(ds.map((d) => d.value)).size > 1) findings.push(L("decision", `${rel} has conflicting decisions: ${ds.map((d) => `"${d.line.slice(0, 60)}"`).join(", ")}`));
  const decision = ds.length && !findings.length ? ds[0].value : null;
  if (decision === "go with conditions") findings.push(L("decision", `${rel}: "go with conditions": the ship stage runs next and no code reads conditions; meet them first and write go, or write no-go`));
  const obj = objections(text);
  if (obj == null) findings.push(L("objections", `${rel} has no Objections section ("## Open objections travelling with this launch", as the template has it)`));
  else if (!obj.length) findings.push(L("objections", `${rel}: the Objections section is empty; objections travel with decisions (CLAUDE.md), so list each one with its owner, or write "none raised" as an entry`));
  if (!new RegExp(`(^|[^a-z0-9-])${slug}([^a-z0-9-]|$)`, "m").test(text)) findings.push(L("slug", `${rel} does not name the lesson ${slug}`));
  if (version != null && !new RegExp(`\\bv${version}\\b`).test(text)) findings.push(L("version", `${rel} does not name the lesson's current version v${version} (meta.json): a launch decision is for the version as it stands`));
  if (decision === "no-go" && !findings.length) {
    const f = { severity: "block", kind: "no-go", route: "park", message: `${rel}: Decision: no-go (head-of-product); park the order and ask the orderer (plan §3 K8)` };
    return { exit: 1, out: { ok: false, ...base, decision, objections: obj?.length ?? 0, park: true, route: "park", findings: [f] } };
  }
  const ok = !findings.length;
  return { exit: ok ? 0 : 1, out: { ok, ...base, decision, objections: obj?.length ?? 0, park: false, ...(ok ? {} : { route: "launch" }), findings } };
}

/** The record to judge: `given` checked as a repo path, else the newest dated record for slug. {rel} or {finding}. */
export function locate(repo, slug, given) {
  if (given != null) {
    const g = String(given).trim();
    if (!g || path.isAbsolute(g)) return { finding: L("record", `the evidence must be the repo-relative record ${RECORDS_DIR}/<date>-launch-review-${slug}.md, not ${JSON.stringify(g)}`) };
    const rel = path.posix.normalize(g.replace(/\\/g, "/").replace(/\/+$/, ""));
    if (!recordRe(slug).test(rel)) return { finding: L("record", `the evidence ${JSON.stringify(g)} is not ${RECORDS_DIR}/<YYYY-MM-DD>-launch-review-${slug}.md`) };
    const abs = path.join(repo, rel);
    let st = null;
    try { st = fs.lstatSync(abs); } catch {}
    if (!st) return { finding: L("record", `no ${rel}: write the launch review there (template company/rituals/templates/launch-review.md)`) };
    if (!st.isFile()) return { finding: L("record", `${rel} is not a regular file`) };
    return { rel };
  }
  const dir = path.join(repo, RECORDS_DIR);
  const re = recordRe(slug);
  const names = fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => `${RECORDS_DIR}/${f}`).filter((f) => re.test(f) && fs.lstatSync(path.join(repo, f)).isFile()).sort() : [];
  if (!names.length) return { finding: L("record", `no ${RECORDS_DIR}/<date>-launch-review-${slug}.md`) };
  return { rel: names.at(-1) };
}

export function run(repo, slug, given) {
  const at = locate(repo, slug, given);
  if (at.finding) return { exit: 1, out: { ok: false, stage: "launch", slug, park: false, route: "launch", findings: [at.finding] } };
  const lesson = findLesson(repo, slug);
  if (!lesson?.meta) return { exit: 1, out: { ok: false, stage: "launch", slug, park: false, findings: [F.block("lesson", lesson ? `meta.json unreadable: ${lesson.parseError}` : `no lesson ${slug} under src/demos/*/`)] } };
  return judge(slug, at.rel, fs.readFileSync(path.join(repo, at.rel), "utf8"), lesson.meta.version ?? 1); // readiness(): `meta.version ?? 1`
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const [slug, given, ...extra] = o.positional;
  if (!slug || extra.length || !SLUG_RE.test(slug)) return usage("one kebab-case <slug> is required, then at most one record path");
  if (!fs.existsSync(path.join(repo, "tools/company.mjs")))
    return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} is not a System 3 Company checkout (no tools/company.mjs)` }] } };
  return run(repo, slug, given);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) if (f.severity !== "advisory") console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
