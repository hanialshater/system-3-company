#!/usr/bin/env node
// rituals.mjs: the company's ritual cadence as System 3 Meta's ritual scheduler (plan 2026-10-21-m4-m7-plan.md §M7
// K18 and exit criteria 1-2). The company decides when a ritual is due (tools/rituals-due.mjs: triggers.json, the
// committed records, company/ops/events.jsonl); Meta places one order per DUE ritual in its `ritual` flow (run by the
// chair → check by a second attendee → ship by code), and code commits the record to the run's integration branch,
// where rituals-due must then read the ritual as held. Nothing here re-implements the cadence.
//
//   node rituals.mjs due --repo=<integration worktree> --roles=<a,b,…> [--skip=<r,…>] [--budget=<tokens>]
//        [--cycle-base=<commit>] [--handoff-after=2]
//        the spec's scheduler cmd (prototype supervisor.mjs runSchedulers): runs `node <repo>/tools/rituals-due.mjs
//        --json` (the text form's DUE rows are parsed if the JSON cannot be read: parseDueText) and prints
//        {ok, due:[{ritual, reasons, chair, attendee, owner, proxyFor}], orders:[{key, title, task, slug, chair,
//        attendee, budget, accept}]} in the operating loop's order (company/ops/operating-loop.md §B: digest, retro,
//        WBR, launch review, design review, demo crit, vertical review, ops review, R&D review, then the rest).
//        --roles: the run's agent roles; --skip: rituals another flow holds (launch-review: the lesson flow's launch
//        stage writes a launch-review record per lesson, and integrate.mjs merges it).
//        --cycle-base (M7 exit criterion 5, the cycle's end): the commit the run's integration branch started from.
//        Once --handoff-after WBR records (default 2: "the cycle ends when the second WBR is held and committed") were
//        added on the branch since it, only the handoff order is placed (chaired by the chief of staff: a dated entry
//        at the top of company/ops/progress.md); once the handoff is committed there, no order, and `end` (the kernel
//        ends the scheduler, and serve settles when the work is done)
//   node rituals.mjs scaffold <ritual> --repo=<order worktree> --base=<sha> [--order=<O>] [--roles=<a,b,…>]
//        the run stage's pre-check: starts the record, once per order (a record of this ritual new since --base is
//        reused): `node tools/company.mjs ritual <ritual>` where the company's RITUALS table has it (read from that
//        command's own usage line), else a copy of company/rituals/templates/<ritual>.md ({{date}}; a `<date>` in its
//        title; {{snapshot}}: the company's short snapshot, read from `node tools/company.mjs status`: shortSnapshot),
//        else a skeleton (founder-digest and design-review have no template). A `## Decision` and an `## Objections`
//        section are appended when the template has none; a Demo Crit's Decision is the table code reads (| slug |
//        decision | reason |). With --roles, a stood-in chair (proxyFor) is named under the title and carried as an
//        objection. `handoff`: the skeleton entry at the top of company/ops/progress.md
//   node rituals.mjs record <ritual> --repo=<order worktree> --base=<sha> [--evidence=<path>] [--roles=<a,b,…>]
//        the post-check at the chair's and the attendee's leave: exactly one record of this ritual is new since
//        --base, the order changed nothing else (board.json, progress.md, events.jsonl and founder-inbox.json are
//        code's), its Decision and Objections sections hold text (not the scaffold's comments), every objection is
//        answered or carried (never "noted"), a stood-in chair is named and carried (--roles), and a Demo Crit's table
//        has one valid row per lesson judged (keep, revise or kill; a reason for revise and kill; the lesson exists).
//        `handoff`: progress.md is the base file with one entry added at its top (the progress log's heading, and
//        **Done**, **Believe**, **Next**, **Blocked** filled), and nothing else changed
//   node rituals.mjs ship <ritual> --repo=<order worktree> --base=<sha> --from-sha=<sha> --into=<integration worktree> [--order=<O>]
//        the ship stage: the record as committed at --from-sha (the order's last K7 commit) is written to the same
//        path in --into (a linked worktree on a meta/* branch: lib/commit-file.mjs) and committed alone, with the
//        repo's hooks; then `rituals-due.mjs --json` in --into must read the ritual as not DUE. A Demo Crit's last
//        line names `acts` (M7 exit criterion 6: keep → none, revise → reopen, kill → cancel, by slug in the lesson
//        flow), which the kernel applies as the crit's chair (prototype acts.mjs, K23; a lesson with no order in this
//        run is carried to the chief of staff: a published lesson from an earlier run has no order to reopen, and
//        brief.mjs refuses a built slug, so no new order is placed for it). `handoff`: the entry is put on top of
//        --into's company/ops/progress.md (as it is there now) and committed alone
//
// Chairs (plan §M7): wbr, founder-digest and retro the chief of staff; demo-crit the head of product; design-review
// design-lead's (its owner), stood in for by the head of product; every other ritual the `chair:` or `owner:` of its
// company template (ops-review principal-engineer-ops, vertical-review principal-pm-verticals, rnd-review vp-rnd,
// project-review the founder). A chair who is not in the run's org (--roles), or is a person, is stood in for by the
// chief of staff (by STAND_IN's role where one is named), and the order says so (proxyFor): the record must name it,
// and carry it as an objection. The attendee is the template's second voice where the spec has it (wbr:
// analytics-steward, its metrics owner), else the head of product for a chief of staff's ritual and the chief of staff
// for anyone else's.
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], …}. Exit 0 pass, 1 revise (findings;
// ship's route park: a different record of that name is already on --into), 2 usage, 3 stage-error (the company's
// tool failed or disagrees: still DUE after the commit).

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs, F, verdict, SLUG_RE } from "./lib/proc.mjs";
import { git as gitRaw, sandboxOf, commitPaths } from "./lib/commit-file.mjs";

export const RECORDS = "company/rituals/records";
const USAGE = "usage: rituals.mjs due --repo=<wt> --roles=<a,b> [--skip=<r,…>] [--budget=<n>] | scaffold <ritual> --repo=<wt> --base=<sha> [--order=<O>] | record <ritual> --repo=<wt> --base=<sha> [--evidence=<path>] | ship <ritual> --repo=<wt> --base=<sha> --from-sha=<sha> --into=<wt> [--order=<O>]";
/** The operating loop's order, as company/ops/operating-loop.md §B "Daily rhythm" writes it: "open SEV1/SEV2 → COE →
 *  founder digest (12 h) → retro (5 merges or incident) → WBR (24 h or 10 merges) → launch review (after each check
 *  batch) → design review, demo crit → vertical review (before work on a new founder direction) → ops review → R&D
 *  review". SEV and COE are incidents, not triggers; a ritual the loop does not name (project-review) comes after, by name. */
export const LOOP_ORDER = ["founder-digest", "retro", "wbr", "launch-review", "design-review", "demo-crit", "vertical-review", "ops-review", "rnd-review"];
/** The plan's chairs (§M7 K18). */
export const CHAIRS = { wbr: "chief-of-staff", "founder-digest": "chief-of-staff", retro: "chief-of-staff", "demo-crit": "head-of-product" };
/** The company's owner of a ritual with no template to read it from: design-review is design-lead's
 *  (company/roles/design-lead.md; triggers.json "design-review", room design-studio). */
export const OWNERS = { "design-review": "design-lead" };
/** Who stands in for an owner not in the run, where it is not the chief of staff: design review's is the head of
 *  product (the plan's chair for it; design-lead reports to the head of product). The order says so (proxyFor). */
export const STAND_IN = { "design-review": "head-of-product" };
export const ATTENDEES = { wbr: "analytics-steward" };
/** M7 exit criterion 5: the cycle's handoff, a ritual-flow order that is not a company ritual (no trigger, no record
 *  file): the chair writes a dated entry at the top of company/ops/progress.md, and code commits it. */
export const HANDOFF = "handoff";
export const PROGRESS = "company/ops/progress.md";
const COS = "chief-of-staff", HOP = "head-of-product";

const node = (repo, args, opts = {}) => {
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, args, { cwd: repo, env, encoding: "utf8", timeout: opts.timeoutMs ?? 60_000, maxBuffer: 32 * 1024 * 1024 });
};
const strip = (s) => String(s ?? "").replace(/\x1b\[[0-9;]*m/g, "");
const today = () => new Date().toISOString().slice(0, 10);
const posix = (p) => p.split(path.sep).join("/");

// ------------------------------------------------------------------ reading the company

/** The text form of rituals-due (`DUE  wbr  last 2026-10-17 21:45  reasons  [held: …]`) as rows. */
export function parseDueText(text) {
  const out = [];
  for (const l0 of strip(text).split("\n")) {
    // M7 review: the held part first. On an ok row (no reasons) the reasons' `\s*` took the spaces before `[held: …]`,
    // so the held part was read as a reason and heldBy was lost
    const h = /\s+\[held: (.*)\]\s*$/.exec(l0), l = h ? l0.slice(0, h.index) : l0;
    const m = /^(DUE|ok)\s+(\S+)\s+last (\d{4}-\d{2}-\d{2} \d{2}:\d{2}|never)\s*(.*?)\s*$/.exec(l);
    if (!m) continue;
    out.push({ ritual: m[2], due: m[1] === "DUE", last: m[3] === "never" ? null : m[3], reasons: m[4] ? m[4].split("; ").filter(Boolean) : [], heldBy: h ? h[1] : null });
  }
  return out;
}
/** rituals-due in `repo`: [{ritual, due, reasons, last, heldBy, room, why}] or { error }. */
export function readDue(repo) {
  const tool = path.join(repo, "tools/rituals-due.mjs");
  if (!fs.existsSync(tool)) return { error: `no tools/rituals-due.mjs in ${repo}` };
  const r = node(repo, [tool, "--json"]);
  if (r.status === 0) { try { const d = JSON.parse(r.stdout); if (Array.isArray(d)) return d; } catch {} }
  const t = node(repo, [tool]);
  const rows = t.status === 0 ? parseDueText(t.stdout) : [];
  return rows.length ? rows : { error: `rituals-due failed: exit ${r.status}/${t.status}: ${strip(r.stderr || t.stderr).trim().slice(0, 300)}` };
}
/** The company's triggers (company/rituals/triggers.json), [] if unreadable. */
const triggersOf = (repo) => { try { return JSON.parse(fs.readFileSync(path.join(repo, "company/rituals/triggers.json"), "utf8")).triggers ?? []; } catch { return []; } };
/** The ritual a record file belongs to, by the company's own rule (tools/lib/ritual-records.mjs ritualOf: the longest
 *  trigger id the name equals or starts with plus "-"), loaded from `repo`; a plain name match where it is missing. */
export async function ritualOfIn(repo) {
  const lib = path.join(repo, "tools/lib/ritual-records.mjs"), tr = triggersOf(repo);
  if (fs.existsSync(lib) && tr.length) { const m = await import(pathToFileURL(lib).href); return (f) => m.ritualOf(f, tr)?.ritual ?? null; }
  return (f) => { const m = /^\d{4}-\d{2}-\d{2}-(.+)\.md$/.exec(path.basename(f)); return m ? m[1].replace(/-\d+$/, "") : null; };
}
/** The chair a company template names: its `chair:` line, else its `owner:` line (line 3 of each template). */
export function templateChair(text) {
  const head = String(text ?? "").split("\n").slice(0, 8).join("\n");
  const m = /(?:^|·\s*)chair:\s*([a-z][a-z0-9-]*)/m.exec(head) ?? /(?:^|·\s*)owners?:\s*([a-z][a-z0-9-]*)/m.exec(head);
  return m ? m[1] : null;
}
/** The company RITUALS table's names, from `node tools/company.mjs ritual` (no name: it prints its usage line). */
export function scaffoldable(repo) {
  const r = node(repo, [path.join(repo, "tools/company.mjs"), "ritual"]);
  const m = /usage: ritual <([^>]+)>/.exec(strip(r.stdout));
  return m ? m[1].split("|") : [];
}

/** Chair and attendee for one ritual, given the run's agent roles. */
export function seats(ritual, { roles, template = null }) {
  const has = (r) => roles.includes(r);
  const owner = CHAIRS[ritual] ?? OWNERS[ritual] ?? templateChair(template) ?? COS;
  const chair = has(owner) ? owner : STAND_IN[ritual] && has(STAND_IN[ritual]) ? STAND_IN[ritual] : COS;
  const proxyFor = chair === owner ? null : owner;
  let attendee = ATTENDEES[ritual] && has(ATTENDEES[ritual]) && ATTENDEES[ritual] !== chair ? ATTENDEES[ritual] : chair === COS ? HOP : COS;
  if (!has(attendee) || attendee === chair) attendee = roles.find((r) => r !== chair && [COS, HOP].includes(r)) ?? roles.find((r) => r !== chair) ?? null;
  return { chair, attendee, owner, proxyFor };
}
const stamp = (d = new Date()) => d.toISOString().slice(0, 16).replace(/[-:T]/g, "");

/** The handoff order (M7 exit criterion 5), placed once the cycle has ended: chaired by the chief of staff (the
 *  progress log's single writer), confirmed by the head of product. */
export function handoffOrder({ roles, budget = 300_000, now = new Date(), wbrs = [], base = null }) {
  if (!roles.includes(COS)) return null;
  const attendee = roles.includes(HOP) ? HOP : roles.find((r) => r !== COS) ?? null;
  if (!attendee) return null;
  const accept = [
    `The cycle has ended: ${wbrs.length} WBR record(s) were committed on the run's integration branch since ${base ? String(base).slice(0, 12) : "its base"} (${wbrs.join(", ")}). Write the chief of staff's dated handoff at the TOP of ${PROGRESS}, in that file's own format (read its first entries).`,
    `chair: ${COS} (the progress log's single writer, company/ops/operating-loop.md C4) · attendee: ${attendee} (confirms the entry at check).`,
    `Code put a skeleton entry at the top of ${PROGRESS} in your worktree before you start: \`## <date> · chief-of-staff (System 3 Meta, …) · <title>\`, then **Done**, **Believe** (what you now believe and how sure), **Next** and **Blocked**. Fill each from what the run committed (git log of the integration branch, company/rituals/records/, node tools/company.mjs status, node tools/rituals-due.mjs), citing paths and numbers, never your own estimates. Change nothing else in that file: every line below your entry stays exactly as it is.`,
    `Change no other file. Code checks the entry at each leave (rituals.mjs record handoff) and, after the check, puts it at the top of ${PROGRESS} on the run's integration branch and commits it alone (rituals.mjs ship handoff). After it is committed the ritual scheduler places nothing more: the run ends. --evidence is ${PROGRESS}.`,
  ].join("\n");
  return { key: `ritual:${HANDOFF}`, title: "Handoff: the M7 cycle's dated entry at the top of company/ops/progress.md", task: `HANDOFF-${stamp(now)}`, slug: HANDOFF, chair: COS, attendee, budget, accept };
}

export function dueOrders({ due, roles, skip = [], budget = 300_000, templates = {}, now = new Date(), cycle = null }) {
  // M7 exit criterion 5 (plan §M7 "Cycle end: the cycle ends when the second WBR is held and committed"): from then on
  // the scheduler places only the handoff, and once the handoff is committed, nothing: it says `end`
  if (cycle?.handoff) return { due: [], orders: [], end: `the cycle's handoff is committed (${cycle.handoff}): the run ends` };
  if (cycle && cycle.wbrs.length >= cycle.after) { const h = handoffOrder({ roles, budget, now, wbrs: cycle.wbrs, base: cycle.base }); return { due: [], orders: h ? [h] : [], cycleEnd: true }; }
  const rows = due.filter((r) => r.due && !skip.includes(r.ritual));
  const rank = (r) => { const i = LOOP_ORDER.indexOf(r); return i < 0 ? LOOP_ORDER.length : i; };
  rows.sort((a, b) => rank(a.ritual) - rank(b.ritual) || a.ritual.localeCompare(b.ritual));
  const out = [], seated = [];
  for (const r of rows) {
    if (!SLUG_RE.test(r.ritual)) continue;
    const s = seats(r.ritual, { roles, template: templates[r.ritual] ?? null });
    seated.push({ ritual: r.ritual, reasons: r.reasons, ...s });
    if (!s.chair || !s.attendee) continue;
    const tpl = templates[r.ritual] != null ? `company/rituals/templates/${r.ritual}.md` : null;
    const accept = [
      `ritual ${r.ritual} (company/rituals/triggers.json${r.why ? `: "${r.why}"` : ""}) is DUE: ${r.reasons.join("; ") || "per tools/rituals-due.mjs"}.`,
      `chair: ${s.chair}${s.proxyFor ? ` (standing in for ${s.proxyFor}, the company's chair of this ritual, who is not an agent of this run: the scaffold names that in the record's first lines and carries it in its Objections; keep both, code checks them)` : ""} · attendee: ${s.attendee} (confirms the record at check).`,
      `Record: code scaffolds ${RECORDS}/<YYYY-MM-DD>-${r.ritual}.md in your worktree before you start (${tpl ? `from ${tpl}` : "a skeleton: the company has no template for it"}); it is the one new file there. Fill every section from what you read in the repo (node tools/company.mjs status, npm run metrics, the records and files the template names), citing paths and numbers, never your own estimates. It ends with a \`## Decision\` section (what this ritual decided, one line each) and an \`## Objections\` section (each objection raised, with its answer ("Answer: …") or "carried", never "noted"; \`none raised\` if so).`,
      ...(r.ritual === "demo-crit" ? [`Demo Crit: the Decision section holds the table code reads, one row per lesson judged: \`| slug | decision | reason |\` with decision keep, revise or kill (send-to-real-learners and the rest go in prose above it). After the record is committed, code maps each row onto the run's orders (rituals.mjs ship): keep → nothing, revise → the lesson's order reopened by you with the reason as its findings, kill → its order cancelled; a lesson with no order in this run is carried to the chief of staff.`] : []),
      "Change no other file: company/ops/board.json, progress.md, events.jsonl and founder-inbox.json are code's. Code checks the record at each leave (rituals.mjs record) and, after the check, commits it to the run's integration branch (rituals.mjs ship), where tools/rituals-due.mjs must read the ritual as held. --evidence is the record's path.",
    ].join("\n");
    out.push({ key: `ritual:${r.ritual}`, title: `Ritual ${r.ritual}: ${r.reasons[0] ?? "due"}`.slice(0, 160), task: `RITUAL-${r.ritual}-${stamp(now)}`, slug: r.ritual, chair: s.chair, attendee: s.attendee, budget, accept });
  }
  return { due: seated, orders: out };
}

// ------------------------------------------------------------------ the order's record

/** Paths the order changed since `base`: committed, staged, unstaged and untracked, repo-relative. */
export function changedSince(repo, base) {
  const d = gitRaw(repo, "diff", "--name-only", base);
  const u = gitRaw(repo, "ls-files", "--others", "--exclude-standard");
  if (d.status !== 0) return { error: `git diff ${base}: ${String(d.stderr).trim()}` };
  return { paths: [...new Set([...d.stdout.split("\n"), ...u.stdout.split("\n")].map((x) => x.trim()).filter(Boolean))] };
}
/** The records of `ritual` new since `base` in the order's worktree (not in the base tree). */
async function newRecords(repo, base, ritual, { committedAt = null } = {}) {
  const of = await ritualOfIn(repo);
  let paths;
  if (committedAt) { const d = gitRaw(repo, "diff", "--name-only", "--diff-filter=A", base, committedAt, "--", RECORDS); if (d.status !== 0) return { error: `git diff ${base} ${committedAt}: ${String(d.stderr).trim()}` }; paths = d.stdout.split("\n").filter(Boolean); }
  else { const c = changedSince(repo, base); if (c.error) return c; paths = c.paths.filter((p) => p.startsWith(RECORDS + "/") && gitRaw(repo, "cat-file", "-e", `${base}:${p}`).status !== 0); }
  return { records: paths.filter((p) => path.dirname(p) === RECORDS && of(p) === ritual) };
}

const DECISION = /^#{2,3}\s+(?:\d+[.)]\s*)?Decisions?\s*$/im;
const OBJECTIONS = /^#{2,3}\s+(?:\d+[.)]\s*)?(?:Open\s+)?Objections\b.*$/im;
/** The body of the first section whose heading matches `re`, with HTML comments taken out, or null. */
export function section(text, re) {
  const lines = String(text).split("\n");
  const i = lines.findIndex((l) => re.test(l) && new RegExp(re.source, "i").test(l));
  if (i < 0) return null;
  const level = /^(#+)/.exec(lines[i])[1].length;
  const body = [];
  for (const l of lines.slice(i + 1)) { const h = /^(#+)\s/.exec(l); if (h && h[1].length <= level) break; body.push(l); }
  return body.join("\n").replace(/<!--[\s\S]*?-->/g, "").trim();
}
/** Does a section body hold content? Text lines or table data rows; a table's header and separator rows, empty
 *  bullets, `<…>` placeholders and TBD are not content (an empty template table is not a decision). */
const SEP = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
export function filled(b) {
  if (b == null) return false;
  const ls = b.split("\n");
  return ls.some((l, i) => {
    if (SEP.test(l) || (l.trim().startsWith("|") && SEP.test(ls[i + 1] ?? ""))) return false;
    const t = l.replace(/^[-*|\s]+|[|\s]+$/g, "").replace(/\s*\|\s*/g, " ").trim();
    return !!t && !/^<[^>]*>$/.test(t) && !/^(tbd|todo|\.\.\.|…)$/i.test(t);
  });
}

const STUB = {
  decision: "## Decision\n\n<!-- chair: what this ritual decided, one line each (a decision names what changes, or what stays and why) -->\n",
  // M7 exit criterion 6: the table code reads at ship (critDecisions), one row per lesson judged
  crit: "## Decision\n\n<!-- chair: one row per lesson judged; decision is keep, revise or kill (code maps it onto the run's orders after the record is committed: keep nothing, revise reopens the lesson's order with the reason as its findings, kill cancels it). Anything else (send to real learners, a strange branch) goes in prose above the table. -->\n\n| slug | decision | reason |\n|---|---|---|\n",
  objections: "## Objections\n\n<!-- every objection raised, each with its answer (\"Answer: …\") or \"carried\" (it travels with the decision), never \"noted\"; write \"none raised\" if so -->\n",
};
const SKELETON = {
  "founder-digest": (d) => `# Founder digest · ${d}\n\nowner: chief-of-staff\n\n## Done since the last digest\n\n## Decisions waiting for you\n\n## Next\n`,
  "design-review": (d) => `# Design Review: ${d}\n\nowner: design-lead · room: design-studio · trigger: \`company/rituals/triggers.json\` "design-review"\n\n## Method, and what this record can and cannot claim\n\n## Top findings\n`,
};

/** The company's short snapshot, the form its own `company ritual` puts in for {{snapshot}} (tools/company.mjs
 *  snapshotMarkdown: a lessons table and a coverage table), read from `node tools/company.mjs status` (snapshotMarkdown
 *  is not exported, and company.mjs is protected: run, never edited or imported). Coverage rows carry what status
 *  prints (domain, concepts with a lesson, the next unmet concept); null when status prints no Lessons line. */
export function shortSnapshot(statusText, date = today()) {
  const t = strip(statusText);
  const L = /^Lessons: (\d+) total · (\d+) draft · (\d+) review · (\d+) published · (\d+) retired/m.exec(t);
  if (!L) return null;
  const claims = /^Claims awaiting the fact-checker: (\d+)/m.exec(t)?.[1] ?? "?";
  const cov = [];
  const sec = /^Coverage[ \t]*\n([\s\S]*?)(?:\n[ \t]*\n|(?![\s\S]))/m.exec(t)?.[1] ?? "";
  for (const l of sec.split("\n")) {
    const m = /^\s+(.+?)\s{2,}\S*\s+(\d+)\/(\d+)\s+next: (\S+)/.exec(l);
    if (m) cov.push(`| ${m[1].trim()} | ${m[2]}/${m[3]} | ${m[4]} |`);
  }
  return [
    `Generated by \`company status\` on ${date} (code ran it to scaffold this record, in the company's own snapshot form). Numbers are counts from the repository, not learning outcomes.`,
    "",
    "| Lessons | draft | review | published | retired | open claims |",
    "|---|---|---|---|---|---|",
    `| ${L[1]} | ${L[2]} | ${L[3]} | ${L[4]} | ${L[5]} | ${claims} |`,
    ...(cov.length ? ["", "| Domain | Concepts with a lesson | Next unmet concept |", "|---|---|---|", ...cov] : []),
  ].join("\n");
}

/** The proxy lines a stood-in chair's record carries (M7 review: the order said so, the record did not have to). */
const proxyHead = (s) => `> Chaired by ${s.chair}, standing in for ${s.proxyFor} (the company's chair of this ritual, not an agent of this run).`;
const proxyObjection = (s) => `- ${s.chair} chaired this ${s.ritual} in place of ${s.proxyFor}, who is not an agent of this run: carried, for ${s.proxyFor} to confirm or redo.`;
const seatsIn = (repo, ritual, roles) => {
  const f = path.join(repo, "company/rituals/templates", `${ritual}.md`);
  return { ritual, ...seats(ritual, { roles, template: fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null }) };
};

async function scaffold(repo, ritual, { base, order = null, roles = null }) {
  if (ritual === HANDOFF) return handoffScaffold(repo, { base, order });
  const found = await newRecords(repo, base, ritual);
  if (found.error) return { exit: 3, out: { ok: false, stage: "rituals-scaffold", findings: [F.env("git", found.error)] } };
  if (found.records.length > 1) return { exit: 1, out: { ok: false, stage: "rituals-scaffold", findings: [F.block("records", `${found.records.length} records of ${ritual} are new in this worktree (${found.records.join(", ")}): one ritual order holds one record`)] } };
  if (found.records.length) return { exit: 0, out: { ok: true, stage: "rituals-scaffold", ritual, record: found.records[0], created: false, findings: [] } };
  const dir = path.join(repo, RECORDS);
  fs.mkdirSync(dir, { recursive: true });
  let rel = null, via;
  if (scaffoldable(repo).includes(ritual)) {
    const r = node(repo, [path.join(repo, "tools/company.mjs"), "ritual", ritual]);
    const m = /started (\S+\.md)/.exec(strip(r.stdout));
    if (r.status !== 0 || !m) return { exit: 3, out: { ok: false, stage: "rituals-scaffold", findings: [F.env("company-ritual", `node tools/company.mjs ritual ${ritual}: exit ${r.status}: ${strip(r.stdout + r.stderr).trim().slice(0, 300)}`)] } };
    rel = posix(m[1]); via = "company ritual";
  } else {
    const d = today(), tpl = path.join(repo, "company/rituals/templates", `${ritual}.md`);
    let file = path.join(dir, `${d}-${ritual}.md`);
    for (let n = 2; fs.existsSync(file); n++) file = path.join(dir, `${d}-${ritual}-${n}.md`);
    let body;
    if (fs.existsSync(tpl)) {
      // as `company ritual` does ({{date}}, {{snapshot}}), plus the `<date>` some templates' titles use (ops-review,
      // vertical-review, rnd-review: "# R&D Review: <date>"); a `<date>` elsewhere is a placeholder for another date
      body = fs.readFileSync(tpl, "utf8").replaceAll("{{date}}", d).replace(/^(# .*)<date>/, `$1${d}`);
      if (body.includes("{{snapshot}}")) {
        const st = node(repo, [path.join(repo, "tools/company.mjs"), "status"]);
        const snap = st.status === 0 ? shortSnapshot(st.stdout, d) : null;
        body = body.replace("{{snapshot}}", snap ?? `Snapshot: \`node tools/company.mjs status\` printed no lessons line (exit ${st.status}); run it and fill this in.`);
      }
      via = "template";
    } else if (SKELETON[ritual]) { body = SKELETON[ritual](d); via = "skeleton"; }
    else return { exit: 3, out: { ok: false, stage: "rituals-scaffold", findings: [F.env("template", `no company/rituals/templates/${ritual}.md and no skeleton for ${ritual}`)] } };
    fs.writeFileSync(file, body);
    rel = posix(path.relative(repo, file));
  }
  const abs = path.join(repo, rel);
  let text = fs.readFileSync(abs, "utf8");
  const s = roles ? seatsIn(repo, ritual, roles) : null;
  const head = [order ? `> Held through System 3 Meta (order ${order}): code scaffolded this record; its chair fills it, a second attendee confirms it, and code commits it.` : null, s?.proxyFor ? proxyHead(s) : null].filter(Boolean);
  if (head.length) text = text.replace(/^(# .*\n)/, `$1\n${head.join("\n")}\n`);
  if (!DECISION.test(text)) text = text.replace(/\s*$/, "\n\n") + (ritual === "demo-crit" ? STUB.crit : STUB.decision);
  else if (ritual === "demo-crit" && !critTable(section(text, DECISION))) text = text.replace(DECISION, (h) => `${h}\n\n| slug | decision | reason |\n|---|---|---|`);
  if (!OBJECTIONS.test(text)) text = text.replace(/\s*$/, "\n\n") + STUB.objections + (s?.proxyFor ? `\n${proxyObjection(s)}\n` : "");
  else if (s?.proxyFor) text = text.replace(OBJECTIONS, (h) => `${h}\n\n${proxyObjection(s)}`);
  fs.writeFileSync(abs, text);
  return { exit: 0, out: { ok: true, stage: "rituals-scaffold", ritual, record: rel, created: true, via, ...(s?.proxyFor ? { proxyFor: s.proxyFor } : {}), findings: [] } };
}

// ------------------------------------------------------------------ objections and the Demo Crit table

/** The items of an Objections body: top-level bullets or numbered lines (with their continuation lines) and table data
 *  rows (as {cells, header}); a prose line is an item only when the body has neither (a template's instruction line
 *  above the chair's list is not an objection). */
export function objectionItems(body) {
  const ls = String(body ?? "").replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const items = [];
  let header = null;
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i];
    if (!l.trim()) continue;
    if (l.trim().startsWith("|")) {
      const cells = l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (SEP.test(l)) continue;
      if (SEP.test(ls[i + 1] ?? "")) { header = cells.map((c) => c.toLowerCase()); continue; }
      items.push({ text: cells.join(" | "), cells, header });
      continue;
    }
    if (/^(?:[-*]|\d+[.)])\s+/.test(l)) { items.push({ text: l.replace(/^(?:[-*]|\d+[.)])\s+/, "") }); continue; }
    if (items.length && /^\s+\S/.test(l) && !items.at(-1).cells) { items.at(-1).text += ` ${l.trim()}`; continue; }
    if (/^#{1,6}\s/.test(l)) continue;
    items.push({ text: l.trim(), prose: true });
  }
  const listed = items.filter((x) => !x.prose);
  return (listed.length ? listed : items).filter((x) => x.text.replace(/[|\s-]/g, ""));
}
const DISPOSED = /\b(?:answer(?:ed)?\s*:|answered\b|carried\b|none raised\b|accepted\b|rejected because\b|superseded\b|open and funded by\b)/i;
const STATUS_COL = /^(status|answer|response|disposition)$/;
/** Why an Objections body does not carry every objection, or []: each item has its answer ("Answer: …") or is
 *  carried (a table row: a Status/Answer column filled), and none is answered "noted" (company CLAUDE.md: "Objections
 *  travel with decisions. Never answer one with 'noted'"; project-review.md: "'Noted' is not a status"). */
export function objectionProblems(body) {
  const out = [];
  for (const it of objectionItems(body)) {
    const col = it.cells && it.header ? it.header.findIndex((h) => STATUS_COL.test(h)) : -1;
    const cell = col >= 0 ? (it.cells[col] ?? "").trim() : null;
    const noted = /(^|[:\s])noted\.?$/i.test(cell ?? it.text.trim()) || /\banswer(?:ed)?\s*:\s*noted\b/i.test(it.text);
    const ok = !noted && (DISPOSED.test(it.text) || (cell != null && cell && !/^[-–—]$/.test(cell)));
    if (!ok) out.push(`"${it.text.slice(0, 120)}" ${noted ? "is answered \"noted\", which is not an answer" : "has no answer (\"Answer: …\") and is not carried"}`);
  }
  return out;
}

/** The Demo Crit decision table in a Decision body: [{slug, decision, reason}] or null (no `| slug | decision | reason |`
 *  table). Rows keep their raw text for the findings. */
export function critTable(body) {
  if (body == null) return null;
  const ls = String(body).replace(/<!--[\s\S]*?-->/g, "").split("\n").map((l) => l.trim());
  const hi = ls.findIndex((l, i) => l.startsWith("|") && SEP.test(ls[i + 1] ?? "") && /^\|?\s*slug\s*\|\s*decision\s*\|\s*reason\s*\|?$/i.test(l));
  if (hi < 0) return null;
  const rows = [];
  for (const l of ls.slice(hi + 2)) {
    if (!l.startsWith("|")) break;
    const c = l.replace(/^\||\|$/g, "").split("|").map((x) => x.trim());
    if (!c.join("")) continue;
    rows.push({ slug: c[0] ?? "", decision: (c[1] ?? "").toLowerCase().replace(/\*/g, ""), reason: c.slice(2).join(" | ").trim(), raw: l });
  }
  return rows;
}
export const CRIT_DECISIONS = ["keep", "revise", "kill"];
/** Why a Demo Crit table cannot be mapped onto orders, or []. `lessons`: the slugs that exist in the repo (src/demos). */
export function critProblems(rows, lessons = null) {
  if (rows == null) return ["the Decision section has no `| slug | decision | reason |` table (code maps it onto the run's orders)"];
  if (!rows.length) return ["the decision table has no rows: one row per lesson judged"];
  const out = [], seen = new Set();
  for (const r of rows) {
    if (!SLUG_RE.test(r.slug)) { out.push(`row ${r.raw}: ${JSON.stringify(r.slug)} is not a lesson slug`); continue; }
    if (seen.has(r.slug)) out.push(`row ${r.raw}: ${r.slug} has two rows: one decision per lesson`);
    seen.add(r.slug);
    if (!CRIT_DECISIONS.includes(r.decision)) out.push(`row ${r.raw}: decision is keep, revise or kill, not ${JSON.stringify(r.decision)}`);
    else if (r.decision !== "keep" && !r.reason.replace(/[-–—\s]/g, "")) out.push(`row ${r.raw}: a ${r.decision} says why (the reason is the order's findings)`);
    if (lessons && !lessons.has(r.slug)) out.push(`row ${r.raw}: no lesson ${r.slug} in src/demos/`);
  }
  return out;
}
/** The lesson slugs in `repo` (src/demos/<domain>/<slug>/meta.json). */
export function lessonSlugs(repo) {
  const out = new Set(), root = path.join(repo, "src/demos");
  let ds = [];
  try { ds = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()); } catch { return null; }
  for (const d of ds) for (const x of fs.readdirSync(path.join(root, d.name), { withFileTypes: true })) if (x.isDirectory() && fs.existsSync(path.join(root, d.name, x.name, "meta.json"))) out.add(x.name);
  return out;
}
/** The orders a Demo Crit decides (M7 exit criterion 6): keep → nothing, revise → reopen, kill → cancel, by slug in the
 *  lesson flow (K23, acts.mjs: the kernel applies them as the crit's chair, and carries what it cannot map, a lesson
 *  with no order in this run, to the chief of staff with why). */
export const critActs = (rows) => rows.filter((r) => r.decision !== "keep").map((r) => (r.decision === "revise"
  ? { act: "reopen", slug: r.slug, flow: "lesson", findings: `Demo Crit: revise. ${r.reason}` }
  : { act: "cancel", slug: r.slug, flow: "lesson", reason: `Demo Crit: kill. ${r.reason}` }));

async function record(repo, ritual, { base, evidence = null, roles = null }) {
  if (ritual === HANDOFF) return handoffRecord(repo, { base, evidence });
  const found = await newRecords(repo, base, ritual);
  if (found.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", found.error)] } };
  const f = [];
  if (found.records.length !== 1) f.push(F.block("records", found.records.length ? `${found.records.length} records of ${ritual} are new (${found.records.join(", ")}): keep one` : `no record of ${ritual} is new in ${RECORDS}/ since the order's base: write it there (the scaffold's file)`));
  const rec = found.records[0] ?? null;
  const ch = changedSince(repo, base);
  if (ch.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", ch.error)] } };
  const other = ch.paths.filter((p) => !found.records.includes(p));
  if (other.length) f.push(F.block("scope", `the order changes ${other.slice(0, 6).join(", ")}${other.length > 6 ? ` and ${other.length - 6} more` : ""}: a ritual order changes only its record (board.json, progress.md, events.jsonl and founder-inbox.json are code's); undo them`));
  let decisions = null;
  if (rec) {
    const text = fs.readFileSync(path.join(repo, rec), "utf8");
    const dec = section(text, DECISION), obj = section(text, OBJECTIONS);
    if (dec == null) f.push(F.block("decision", `${rec} has no \`## Decision\` section`));
    else if (!filled(dec)) f.push(F.block("decision", `${rec}'s Decision section is empty: write what this ritual decided, one line each`));
    if (obj == null) f.push(F.block("objections", `${rec} has no \`## Objections\` section`));
    else if (!filled(obj)) f.push(F.block("objections", `${rec}'s Objections section is empty: list each objection with its answer or "carried", or write "none raised"`));
    else for (const p of objectionProblems(obj)) f.push(F.block("objections", `${rec}: objection ${p}: every objection is answered or carried`));
    // M7 review: a stood-in chair is named in the record's first lines and carried as an objection
    const s = roles ? seatsIn(repo, ritual, roles) : null;
    if (s?.proxyFor) {
      const head = text.split(/\n## /)[0];
      if (!(head.includes(s.chair) && head.includes(s.proxyFor))) f.push(F.block("proxy", `${rec}: its first lines (before the first section) do not say that ${s.chair} chaired in place of ${s.proxyFor} (the scaffold's "> Chaired by …" line)`));
      if (!objectionItems(obj ?? "").some((it) => it.text.includes(s.proxyFor) && /\bcarried\b/i.test(it.text))) f.push(F.block("proxy", `${rec}: its Objections do not carry the stand-in (an item naming ${s.proxyFor}, marked carried)`));
    }
    // M7 exit criterion 6: a Demo Crit's decisions are a table code can map onto orders
    if (ritual === "demo-crit" && dec != null) {
      decisions = critTable(dec);
      for (const p of critProblems(decisions, lessonSlugs(repo))) f.push(F.block("crit-table", `${rec}: ${p}`));
    }
    if (evidence && path.normalize(String(evidence)).replace(/^\.\//, "") !== rec && !path.resolve(repo, String(evidence)).endsWith(path.sep + rec)) f.push(F.block("evidence", `--evidence names ${evidence}, but the record is ${rec}`));
  }
  const v = verdict(f);
  return { exit: v.exit, out: { ok: v.ok, stage: "rituals-record", ritual, record: rec, ...(decisions ? { decisions: decisions.map(({ raw, ...d }) => d) } : {}), findings: f } };
}

async function ship(repo, ritual, { base, fromSha, into, order = null }) {
  if (ritual === HANDOFF) return handoffShip(repo, { base, fromSha, into, order });
  const found = await newRecords(repo, base, ritual, { committedAt: fromSha });
  if (found.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", found.error)] } };
  if (found.records.length !== 1) return { exit: 1, out: { ok: false, stage: "rituals-ship", findings: [F.block("records", `${found.records.length} records of ${ritual} were committed between ${base.slice(0, 9)} and ${fromSha.slice(0, 9)}: one is shipped`, "run")] } };
  const rec = found.records[0];
  const sb = sandboxOf(into);
  if (sb.error) return { exit: 2, out: { ok: false, stage: "rituals-ship", findings: [F.env("into", sb.error)] } };
  const show = gitRaw(repo, "show", `${fromSha}:${rec}`);
  if (show.status !== 0) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", `git show ${fromSha}:${rec}: ${String(show.stderr).trim()}`)] } };
  // M7 exit criterion 6: the committed Demo Crit's table, read before anything is written (a table that cannot be
  // mapped is the chair's to fix: back to run)
  let acts = null, decisions = null;
  if (ritual === "demo-crit") {
    decisions = critTable(section(show.stdout, DECISION));
    const p = critProblems(decisions);
    if (p.length) return { exit: 1, out: { ok: false, stage: "rituals-ship", findings: p.map((x) => F.block("crit-table", `${rec}: ${x}`, "run")) } };
    acts = critActs(decisions);
  }
  const target = path.join(sb.root, rec);
  const onInto = gitRaw(sb.root, "show", `HEAD:${rec}`);
  if (onInto.status === 0 && onInto.stdout !== show.stdout) return { exit: 1, out: { ok: false, stage: "rituals-ship", route: "park", findings: [{ ...F.block("taken", `${sb.branch} already has a different ${rec}: a record is never overwritten (rename it with the next free -<n> on the order's branch, or cancel the order)`), route: "park" }] } };
  if (onInto.status !== 0 && fs.existsSync(target) && fs.readFileSync(target, "utf8") !== show.stdout) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("dirty", `${target} exists uncommitted with other content in the integration worktree: not code's to overwrite`)] } };
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, show.stdout);
  const c = commitPaths(sb.root, [rec], `meta: ${ritual} record${order ? ` (${order})` : ""}, the ritual flow's ship (chief-of-staff code step)`);
  if (c.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("commit", c.error)] } };
  const due = readDue(sb.root);
  if (due.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", record: rec, committed: c.sha ?? null, findings: [F.env("rituals-due", due.error)] } };
  const row = due.find((r) => r.ritual === ritual);
  if (row?.due) return { exit: 3, out: { ok: false, stage: "rituals-ship", record: rec, committed: c.sha ?? null, findings: [F.env("still-due", `${ritual} is still DUE on ${sb.branch} after ${rec} was committed: ${row.reasons.join("; ")}`)] } };
  return { exit: 0, out: { ok: true, stage: "rituals-ship", ritual, record: rec, into: sb.branch, committed: c.sha ?? null, unchanged: !!c.unchanged, heldBy: row?.heldBy ?? null, ...(decisions ? { decisions: decisions.map(({ raw, ...d }) => d), acts } : {}), findings: [] } };
}

// ------------------------------------------------------------------ the cycle's handoff (M7 exit criterion 5)

const HANDOFF_SKELETON = (d, order) => [
  `## ${d} · chief-of-staff (System 3 Meta${order ? `, order ${order}` : ""}) · <title: the cycle in one line>`,
  "",
  "<!-- chair: the chief of staff's handoff for this cycle, from what the run committed (cite paths, commits and numbers). Every line below this entry stays exactly as it is. -->",
  "",
  "**Done:**",
  "",
  "<!-- what changed: rituals held, lessons merged and published, decisions carried out -->",
  "",
  "**Believe** (and how sure):",
  "",
  "<!-- what you now believe and how sure you are -->",
  "",
  "**Next:**",
  "",
  "<!-- the next moves, by owner -->",
  "",
  "**Blocked:**",
  "",
  "<!-- what waits, and on whom (\"nothing\" if so) -->",
  "",
].join("\n");
const HANDOFF_PARTS = ["Done", "Believe", "Next", "Blocked"];
/** The entry the order put at the top of progress.md: { entry } when the file is `entry + base`, else { error }. */
function handoffEntry(text, baseText) {
  if (text === baseText) return { error: `${PROGRESS} is unchanged since the order's base: write the handoff at its top` };
  if (!text.endsWith(baseText)) return { error: `${PROGRESS} changed below its top: a handoff adds one entry at the top and keeps every line under it exactly as it was` };
  return { entry: text.slice(0, text.length - baseText.length) };
}
/** Why a handoff entry is not one the company's progress log takes, or []. */
export function handoffProblems(entry, { today: d = today() } = {}) {
  const out = [];
  const t = String(entry).replace(/<!--[\s\S]*?-->/g, "");
  const h = /^## (\d{4}-\d{2}-\d{2}) · chief-of-staff\b[^\n]* · (.+)$/m.exec(t.split("\n")[0] ?? "");
  if (!h) out.push("its first line is not `## <YYYY-MM-DD> · chief-of-staff (…) · <title>` (the progress log's entry heading)");
  else {
    if (h[1] > d) out.push(`its date ${h[1]} is after today (${d})`);
    if (/<title|<[^>]*>/.test(h[2])) out.push("its title is still the scaffold's placeholder");
  }
  if ((t.match(/^## /gm) ?? []).length !== 1) out.push("it holds more than one `## ` heading: one handoff is one entry");
  for (const k of HANDOFF_PARTS) {
    const m = new RegExp(`^\\*\\*${k}\\b[^\\n]*\\*\\*[^\\n]*$`, "m").exec(t);
    if (!m) { out.push(`it has no **${k}** part`); continue; }
    const rest = t.slice(m.index + m[0].length);
    const next = rest.search(new RegExp(`^\\*\\*(?:${HANDOFF_PARTS.join("|")})\\b`, "m"));
    const body = (next < 0 ? rest : rest.slice(0, next)).trim();
    const inline = m[0].replace(/^\*\*[^*]+\*\*/, "").replace(/^\s*\(and how sure\)/, "").replace(/^\s*:/, "").trim();
    if (!filled(body) && !inline) out.push(`its **${k}** part is empty`);
  }
  return out;
}
const baseOf = (repo, base) => { const r = gitRaw(repo, "show", `${base}:${PROGRESS}`); return r.status === 0 ? { text: r.stdout } : { error: `git show ${String(base).slice(0, 9)}:${PROGRESS}: ${String(r.stderr).trim()}` }; };

function handoffScaffold(repo, { base, order }) {
  const b = baseOf(repo, base);
  if (b.error) return { exit: 3, out: { ok: false, stage: "rituals-scaffold", findings: [F.env("git", b.error)] } };
  const file = path.join(repo, PROGRESS);
  const now = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (now !== b.text) return { exit: 0, out: { ok: true, stage: "rituals-scaffold", ritual: HANDOFF, record: PROGRESS, created: false, findings: [] } }; // a revise back to run: the entry is there
  fs.writeFileSync(file, HANDOFF_SKELETON(today(), order) + b.text);
  return { exit: 0, out: { ok: true, stage: "rituals-scaffold", ritual: HANDOFF, record: PROGRESS, created: true, via: "skeleton", findings: [] } };
}
function handoffRecord(repo, { base, evidence }) {
  const f = [];
  const ch = changedSince(repo, base);
  if (ch.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", ch.error)] } };
  const other = ch.paths.filter((p) => p !== PROGRESS);
  if (other.length) f.push(F.block("scope", `the order changes ${other.slice(0, 6).join(", ")}${other.length > 6 ? ` and ${other.length - 6} more` : ""}: the handoff changes only ${PROGRESS}; undo them`));
  const b = baseOf(repo, base);
  if (b.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", b.error)] } };
  const file = path.join(repo, PROGRESS);
  const e = handoffEntry(fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "", b.text);
  if (e.error) f.push(F.block("handoff", e.error));
  else for (const p of handoffProblems(e.entry)) f.push(F.block("handoff", `the handoff at the top of ${PROGRESS}: ${p}`));
  if (evidence && path.normalize(String(evidence)).replace(/^\.\//, "") !== PROGRESS && !path.resolve(repo, String(evidence)).endsWith(path.sep + PROGRESS)) f.push(F.block("evidence", `--evidence names ${evidence}, but the handoff is ${PROGRESS}`));
  const v = verdict(f);
  return { exit: v.exit, out: { ok: v.ok, stage: "rituals-record", ritual: HANDOFF, record: PROGRESS, findings: f } };
}
export const HANDOFF_MSG = (order) => `meta: handoff${order ? ` (${order})` : ""}, the cycle's entry at the top of ${PROGRESS} (chief-of-staff code step)`;
function handoffShip(repo, { base, fromSha, into, order }) {
  const sb = sandboxOf(into);
  if (sb.error) return { exit: 2, out: { ok: false, stage: "rituals-ship", findings: [F.env("into", sb.error)] } };
  const b = baseOf(repo, base);
  if (b.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", b.error)] } };
  const at = gitRaw(repo, "show", `${fromSha}:${PROGRESS}`);
  if (at.status !== 0) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", `git show ${fromSha}:${PROGRESS}: ${String(at.stderr).trim()}`)] } };
  const e = handoffEntry(at.stdout, b.text);
  if (e.error) return { exit: 1, out: { ok: false, stage: "rituals-ship", findings: [F.block("handoff", `as committed at ${fromSha.slice(0, 9)}: ${e.error}`, "run")] } };
  const p = handoffProblems(e.entry);
  if (p.length) return { exit: 1, out: { ok: false, stage: "rituals-ship", findings: p.map((x) => F.block("handoff", `as committed at ${fromSha.slice(0, 9)}: ${x}`, "run")) } };
  const target = path.join(sb.root, PROGRESS);
  const head = gitRaw(sb.root, "show", `HEAD:${PROGRESS}`);
  const cur = head.status === 0 ? head.stdout : "";
  if (fs.existsSync(target) && fs.readFileSync(target, "utf8") !== cur) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("dirty", `${target} has uncommitted changes in the integration worktree: not code's to overwrite`)] } };
  // the entry goes on top of the integration branch's progress.md as it is now (it may have moved past the order's base)
  if (!cur.startsWith(e.entry)) fs.writeFileSync(target, e.entry + cur);
  const c = commitPaths(sb.root, [PROGRESS], HANDOFF_MSG(order));
  if (c.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("commit", c.error)] } };
  if (!fs.readFileSync(target, "utf8").startsWith(e.entry)) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("not-on-top", `${PROGRESS} on ${sb.branch} does not start with the handoff after the commit`)] } };
  return { exit: 0, out: { ok: true, stage: "rituals-ship", ritual: HANDOFF, record: PROGRESS, into: sb.branch, committed: c.sha ?? null, unchanged: !!c.unchanged, findings: [] } };
}

/** The cycle as the integration branch shows it since `base` (M7: the run's start): the WBR records added there, and
 *  the handoff commit, if any. { wbrs: [path], handoff: sha|null, base } or { error }. */
export async function cycleOf(repo, base, after = 2) {
  const of = await ritualOfIn(repo);
  const d = gitRaw(repo, "diff", "--name-only", "--diff-filter=A", `${base}`, "HEAD", "--", RECORDS);
  if (d.status !== 0) return { error: `git diff ${base} HEAD: ${String(d.stderr).trim().slice(0, 300)}` };
  const wbrs = d.stdout.split("\n").filter((p) => p && path.dirname(p) === RECORDS && of(p) === "wbr").sort();
  const lg = gitRaw(repo, "log", "--format=%H %s", `${base}..HEAD`, "--", PROGRESS);
  if (lg.status !== 0) return { error: `git log ${base}..HEAD: ${String(lg.stderr).trim().slice(0, 300)}` };
  const h = lg.stdout.split("\n").find((l) => / meta: handoff\b/.test(l));
  return { wbrs, handoff: h ? h.split(" ")[0] : null, base, after };
}

export async function main(argv) {
  const o = parseArgs(argv);
  const [cmd, ritual] = o.positional;
  const usage = (m) => ({ exit: 2, out: { ok: false, stage: "rituals", findings: [F.env("usage", m)], usage: USAGE } });
  const known = { due: ["repo", "roles", "skip", "budget", "cycle-base", "handoff-after"], scaffold: ["repo", "base", "order", "roles"], record: ["repo", "base", "evidence", "roles"], ship: ["repo", "base", "from-sha", "into", "order"] }[cmd];
  if (!known) return usage(`no command ${cmd ?? ""}`);
  for (const k of Object.keys(o)) if (k !== "positional" && !known.includes(k)) return usage(`unknown flag --${k}`);
  for (const k of known) if (o[k] === true || o[k] === "") return usage(`--${k} needs a value`);
  if (typeof o.repo !== "string") return usage("--repo is required");
  const repo = path.resolve(o.repo);
  if (cmd === "due") {
    if (o.positional.length > 1) return usage(`unexpected argument ${o.positional[1]}`);
    if (typeof o.roles !== "string") return usage("--roles is required (the run's agent roles)");
    const roles = o.roles.split(",").filter(Boolean), skip = typeof o.skip === "string" ? o.skip.split(",").filter(Boolean) : [];
    const budget = o.budget != null ? Number(o.budget) : 300_000;
    if (!Number.isInteger(budget) || budget <= 0) return usage("--budget is a whole number of tokens");
    const after = o["handoff-after"] != null ? Number(o["handoff-after"]) : 2;
    if (!Number.isInteger(after) || after < 1) return usage("--handoff-after is a whole number of WBR records from 1");
    let cycle = null;
    if (typeof o["cycle-base"] === "string") {
      cycle = await cycleOf(repo, o["cycle-base"], after);
      if (cycle.error) return { exit: 3, out: { ok: false, stage: "rituals-due", findings: [F.env("cycle", cycle.error)] } };
    }
    const due = readDue(repo);
    if (due.error) return { exit: 3, out: { ok: false, stage: "rituals-due", findings: [F.env("rituals-due", due.error)] } };
    const templates = {};
    for (const r of due.filter((x) => x.due)) { const f = path.join(repo, "company/rituals/templates", `${r.ritual}.md`); if (fs.existsSync(f)) templates[r.ritual] = fs.readFileSync(f, "utf8"); }
    const d = dueOrders({ due, roles, skip, budget, templates, cycle });
    const findings = d.due.filter((x) => !x.chair || !x.attendee).map((x) => F.advisory("seats", `${x.ritual}: no chair and second attendee among ${roles.join(", ")}`));
    for (const x of d.due) if (x.proxyFor) findings.push(F.advisory("proxy", `${x.ritual}: ${x.chair} stands in for ${x.proxyFor}`));
    if (d.cycleEnd) findings.push(F.advisory("cycle-end", `${cycle.wbrs.length} WBR record(s) committed since ${String(cycle.base).slice(0, 12)} (${cycle.wbrs.join(", ")}): only the handoff is placed now`));
    return { exit: 0, out: { ok: true, stage: "rituals-due", repo, due: d.due, orders: d.orders, skipped: due.filter((x) => x.due && skip.includes(x.ritual)).map((x) => x.ritual), ...(cycle ? { cycle: { base: cycle.base, wbrs: cycle.wbrs, after, handoff: cycle.handoff } } : {}), ...(d.end ? { end: d.end } : {}), findings } };
  }
  if (!ritual || !SLUG_RE.test(ritual)) return usage(`${cmd} needs a ritual name (kebab-case)`);
  if (o.positional.length > 2) return usage(`unexpected argument ${o.positional[2]}`);
  if (typeof o.base !== "string") return usage("--base is required (the order's base commit)");
  if (!fs.existsSync(repo)) return { exit: 3, out: { ok: false, stage: `rituals-${cmd}`, findings: [F.env("repo", `no directory ${repo}`)] } };
  const roles = typeof o.roles === "string" ? o.roles.split(",").filter(Boolean) : null;
  if (cmd === "scaffold") return scaffold(repo, ritual, { base: o.base, order: typeof o.order === "string" ? o.order : null, roles });
  if (cmd === "record") return record(repo, ritual, { base: o.base, evidence: typeof o.evidence === "string" ? o.evidence : null, roles });
  for (const k of ["from-sha", "into"]) if (typeof o[k] !== "string") return usage(`--${k} is required`);
  return ship(repo, ritual, { base: o.base, fromSha: o["from-sha"], into: path.resolve(o.into), order: typeof o.order === "string" ? o.order : null });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = await main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "rituals", findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const x of r.out.orders ?? []) console.log(`order ${x.key}: ${x.chair} chairs, ${x.attendee} attends (${x.task})`);
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
