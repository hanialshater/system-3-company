#!/usr/bin/env node
// rituals.mjs: the company's ritual cadence as System 3 Meta's ritual scheduler (plan 2026-10-21-m4-m7-plan.md §M7
// K18 and exit criteria 1-2). The company decides when a ritual is due (tools/rituals-due.mjs: triggers.json, the
// committed records, company/ops/events.jsonl); Meta places one order per DUE ritual in its `ritual` flow (run by the
// chair → check by a second attendee → ship by code), and code commits the record to the run's integration branch,
// where rituals-due must then read the ritual as held. Nothing here re-implements the cadence.
//
//   node rituals.mjs due --repo=<integration worktree> --roles=<a,b,…> [--skip=<r,…>] [--budget=<tokens>]
//        the spec's scheduler cmd (prototype supervisor.mjs runSchedulers): runs `node <repo>/tools/rituals-due.mjs
//        --json` (the text form's DUE rows are parsed if the JSON cannot be read: parseDueText) and prints
//        {ok, due:[{ritual, reasons, chair, attendee, owner, proxyFor}], orders:[{key, title, task, slug, chair,
//        attendee, budget, accept}]} in the operating loop's order (digest, retro, WBR, launch, crit, then the rest).
//        --roles: the run's agent roles; --skip: rituals another flow holds (launch-review: the lesson flow's launch
//        stage writes a launch-review record per lesson, and integrate.mjs merges it).
//   node rituals.mjs scaffold <ritual> --repo=<order worktree> --base=<sha> [--order=<O>]
//        the run stage's pre-check: starts the record, once per order (a record of this ritual new since --base is
//        reused): `node tools/company.mjs ritual <ritual>` where the company's RITUALS table has it (read from that
//        command's own usage line), else a copy of company/rituals/templates/<ritual>.md ({{date}}, {{snapshot}}: the
//        output of `node tools/company.mjs status`), else a skeleton (founder-digest and design-review have no
//        template). A `## Decision` and an `## Objections` section are appended when the template has none.
//   node rituals.mjs record <ritual> --repo=<order worktree> --base=<sha> [--evidence=<path>]
//        the post-check at the chair's and the attendee's leave: exactly one record of this ritual is new since
//        --base, the order changed nothing else (board.json, progress.md, events.jsonl and founder-inbox.json are
//        code's), and its Decision and Objections sections hold text (not the scaffold's comments)
//   node rituals.mjs ship <ritual> --repo=<order worktree> --base=<sha> --from-sha=<sha> --into=<integration worktree> [--order=<O>]
//        the ship stage: the record as committed at --from-sha (the order's last K7 commit) is written to the same
//        path in --into (a linked worktree on a meta/* branch: lib/commit-file.mjs) and committed alone, with the
//        repo's hooks; then `rituals-due.mjs --json` in --into must read the ritual as not DUE
//
// Chairs (plan §M7): wbr, founder-digest and retro the chief of staff; demo-crit and design-review the head of
// product; every other ritual the `chair:` or `owner:` of its company template (ops-review principal-engineer-ops,
// vertical-review principal-pm-verticals, rnd-review vp-rnd, project-review the founder). A chair who is not in the
// run's org (--roles), or is a person, is stood in for by the chief of staff, and the order says so (proxyFor): the
// record must name it, and carry it as an objection. The attendee is the template's second voice where the spec has
// it (wbr: analytics-steward, its metrics owner), else the head of product for a chief of staff's ritual and the chief
// of staff for anyone else's.
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
/** The operating loop's order (company/ops/operating-loop.md; plan §M7 "Ritual sequence"): SEV → COE → digest → retro
 *  → WBR → launch → crit → others. SEV and COE are incidents, not triggers. */
export const LOOP_ORDER = ["founder-digest", "retro", "wbr", "launch-review", "demo-crit"];
export const CHAIRS = { wbr: "chief-of-staff", "founder-digest": "chief-of-staff", retro: "chief-of-staff", "demo-crit": "head-of-product", "design-review": "head-of-product" };
export const ATTENDEES = { wbr: "analytics-steward" };
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
  for (const l of strip(text).split("\n")) {
    const m = /^(DUE|ok)\s+(\S+)\s+last (\d{4}-\d{2}-\d{2} \d{2}:\d{2}|never)\s*(.*?)(?:\s+\[held: (.*)\])?\s*$/.exec(l);
    if (!m) continue;
    out.push({ ritual: m[2], due: m[1] === "DUE", last: m[3] === "never" ? null : m[3], reasons: m[4] ? m[4].split("; ").filter(Boolean) : [], heldBy: m[5] ?? null });
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
  const owner = CHAIRS[ritual] ?? templateChair(template) ?? COS;
  const chair = has(owner) ? owner : COS;
  const proxyFor = chair === owner ? null : owner;
  let attendee = ATTENDEES[ritual] && has(ATTENDEES[ritual]) && ATTENDEES[ritual] !== chair ? ATTENDEES[ritual] : chair === COS ? HOP : COS;
  if (!has(attendee) || attendee === chair) attendee = roles.find((r) => r !== chair && [COS, HOP].includes(r)) ?? roles.find((r) => r !== chair) ?? null;
  return { chair, attendee, owner, proxyFor };
}
const stamp = (d = new Date()) => d.toISOString().slice(0, 16).replace(/[-:T]/g, "");

export function dueOrders({ due, roles, skip = [], budget = 300_000, templates = {}, now = new Date() }) {
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
      `chair: ${s.chair}${s.proxyFor ? ` (standing in for ${s.proxyFor}, the company's chair of this ritual, who is not an agent of this run: name that in the record's first lines and carry it in its Objections)` : ""} · attendee: ${s.attendee} (confirms the record at check).`,
      `Record: code scaffolds ${RECORDS}/<YYYY-MM-DD>-${r.ritual}.md in your worktree before you start (${tpl ? `from ${tpl}` : "a skeleton: the company has no template for it"}); it is the one new file there. Fill every section from what you read in the repo (node tools/company.mjs status, npm run metrics, the records and files the template names), citing paths and numbers, never your own estimates. It ends with a \`## Decision\` section (what this ritual decided, one line each) and an \`## Objections\` section (each objection raised, with its answer or "carried"; \`none raised\` if so).`,
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
  objections: "## Objections\n\n<!-- every objection raised, each with its answer or \"carried\" (it travels with the decision); write \"none raised\" if so -->\n",
};
const SKELETON = {
  "founder-digest": (d) => `# Founder digest · ${d}\n\nowner: chief-of-staff\n\n## Done since the last digest\n\n## Decisions waiting for you\n\n## Next\n`,
  "design-review": (d) => `# Design Review: ${d}\n\nowner: design-lead · room: design-studio · trigger: \`company/rituals/triggers.json\` "design-review"\n\n## Method, and what this record can and cannot claim\n\n## Top findings\n`,
};

async function scaffold(repo, ritual, { base, order = null }) {
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
      body = fs.readFileSync(tpl, "utf8").replaceAll("{{date}}", d);
      if (body.includes("{{snapshot}}")) {
        const st = node(repo, [path.join(repo, "tools/company.mjs"), "status"]);
        body = body.replace("{{snapshot}}", `Snapshot (\`node tools/company.mjs status\`, ${new Date().toISOString().slice(0, 16)}Z, as code ran it):\n\n\`\`\`text\n${strip(st.stdout).trim()}\n\`\`\``);
      }
      via = "template";
    } else if (SKELETON[ritual]) { body = SKELETON[ritual](d); via = "skeleton"; }
    else return { exit: 3, out: { ok: false, stage: "rituals-scaffold", findings: [F.env("template", `no company/rituals/templates/${ritual}.md and no skeleton for ${ritual}`)] } };
    fs.writeFileSync(file, body);
    rel = posix(path.relative(repo, file));
  }
  const abs = path.join(repo, rel);
  let text = fs.readFileSync(abs, "utf8");
  if (order) text = text.replace(/^(# .*\n)/, `$1\n> Held through System 3 Meta (order ${order}): code scaffolded this record; its chair fills it, a second attendee confirms it, and code commits it.\n`);
  if (!DECISION.test(text)) text = text.replace(/\s*$/, "\n\n") + STUB.decision;
  if (!OBJECTIONS.test(text)) text = text.replace(/\s*$/, "\n\n") + STUB.objections;
  fs.writeFileSync(abs, text);
  return { exit: 0, out: { ok: true, stage: "rituals-scaffold", ritual, record: rel, created: true, via, findings: [] } };
}

async function record(repo, ritual, { base, evidence = null }) {
  const found = await newRecords(repo, base, ritual);
  if (found.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", found.error)] } };
  const f = [];
  if (found.records.length !== 1) f.push(F.block("records", found.records.length ? `${found.records.length} records of ${ritual} are new (${found.records.join(", ")}): keep one` : `no record of ${ritual} is new in ${RECORDS}/ since the order's base: write it there (the scaffold's file)`));
  const rec = found.records[0] ?? null;
  const ch = changedSince(repo, base);
  if (ch.error) return { exit: 3, out: { ok: false, stage: "rituals-record", findings: [F.env("git", ch.error)] } };
  const other = ch.paths.filter((p) => !found.records.includes(p));
  if (other.length) f.push(F.block("scope", `the order changes ${other.slice(0, 6).join(", ")}${other.length > 6 ? ` and ${other.length - 6} more` : ""}: a ritual order changes only its record (board.json, progress.md, events.jsonl and founder-inbox.json are code's); undo them`));
  if (rec) {
    const text = fs.readFileSync(path.join(repo, rec), "utf8");
    const dec = section(text, DECISION), obj = section(text, OBJECTIONS);
    if (dec == null) f.push(F.block("decision", `${rec} has no \`## Decision\` section`));
    else if (!filled(dec)) f.push(F.block("decision", `${rec}'s Decision section is empty: write what this ritual decided, one line each`));
    if (obj == null) f.push(F.block("objections", `${rec} has no \`## Objections\` section`));
    else if (!filled(obj)) f.push(F.block("objections", `${rec}'s Objections section is empty: list each objection with its answer or "carried", or write "none raised"`));
    if (evidence && path.normalize(String(evidence)).replace(/^\.\//, "") !== rec && !path.resolve(repo, String(evidence)).endsWith(path.sep + rec)) f.push(F.block("evidence", `--evidence names ${evidence}, but the record is ${rec}`));
  }
  const v = verdict(f);
  return { exit: v.exit, out: { ok: v.ok, stage: "rituals-record", ritual, record: rec, findings: f } };
}

async function ship(repo, ritual, { base, fromSha, into, order = null }) {
  const found = await newRecords(repo, base, ritual, { committedAt: fromSha });
  if (found.error) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", found.error)] } };
  if (found.records.length !== 1) return { exit: 1, out: { ok: false, stage: "rituals-ship", findings: [F.block("records", `${found.records.length} records of ${ritual} were committed between ${base.slice(0, 9)} and ${fromSha.slice(0, 9)}: one is shipped`, "run")] } };
  const rec = found.records[0];
  const sb = sandboxOf(into);
  if (sb.error) return { exit: 2, out: { ok: false, stage: "rituals-ship", findings: [F.env("into", sb.error)] } };
  const show = gitRaw(repo, "show", `${fromSha}:${rec}`);
  if (show.status !== 0) return { exit: 3, out: { ok: false, stage: "rituals-ship", findings: [F.env("git", `git show ${fromSha}:${rec}: ${String(show.stderr).trim()}`)] } };
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
  return { exit: 0, out: { ok: true, stage: "rituals-ship", ritual, record: rec, into: sb.branch, committed: c.sha ?? null, unchanged: !!c.unchanged, heldBy: row?.heldBy ?? null, findings: [] } };
}

export async function main(argv) {
  const o = parseArgs(argv);
  const [cmd, ritual] = o.positional;
  const usage = (m) => ({ exit: 2, out: { ok: false, stage: "rituals", findings: [F.env("usage", m)], usage: USAGE } });
  const known = { due: ["repo", "roles", "skip", "budget"], scaffold: ["repo", "base", "order"], record: ["repo", "base", "evidence"], ship: ["repo", "base", "from-sha", "into", "order"] }[cmd];
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
    const due = readDue(repo);
    if (due.error) return { exit: 3, out: { ok: false, stage: "rituals-due", findings: [F.env("rituals-due", due.error)] } };
    const templates = {};
    for (const r of due.filter((x) => x.due)) { const f = path.join(repo, "company/rituals/templates", `${r.ritual}.md`); if (fs.existsSync(f)) templates[r.ritual] = fs.readFileSync(f, "utf8"); }
    const d = dueOrders({ due, roles, skip, budget, templates });
    const findings = d.due.filter((x) => !x.chair || !x.attendee).map((x) => F.advisory("seats", `${x.ritual}: no chair and second attendee among ${roles.join(", ")}`));
    for (const x of d.due) if (x.proxyFor) findings.push(F.advisory("proxy", `${x.ritual}: ${x.chair} stands in for ${x.proxyFor}`));
    return { exit: 0, out: { ok: true, stage: "rituals-due", repo, due: d.due, orders: d.orders, skipped: due.filter((x) => x.due && skip.includes(x.ritual)).map((x) => x.ritual), findings } };
  }
  if (!ritual || !SLUG_RE.test(ritual)) return usage(`${cmd} needs a ritual name (kebab-case)`);
  if (o.positional.length > 2) return usage(`unexpected argument ${o.positional[2]}`);
  if (typeof o.base !== "string") return usage("--base is required (the order's base commit)");
  if (!fs.existsSync(repo)) return { exit: 3, out: { ok: false, stage: `rituals-${cmd}`, findings: [F.env("repo", `no directory ${repo}`)] } };
  if (cmd === "scaffold") return scaffold(repo, ritual, { base: o.base, order: typeof o.order === "string" ? o.order : null });
  if (cmd === "record") return record(repo, ritual, { base: o.base, evidence: typeof o.evidence === "string" ? o.evidence : null });
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
