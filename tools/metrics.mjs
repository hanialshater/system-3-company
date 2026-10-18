#!/usr/bin/env node
// Company health metrics. Not a gate (gates live in tools/company.mjs); this is the instrument
// panel for WBRs and retros. Every number is computed from files in the repo.
//
//   npm run metrics            human-readable
//   npm run metrics -- --md    markdown tables (paste into WBR / retro records)
//   S3_EVENTS=<file>           read another event log (tests, fixtures)
//
// Definitions live in company/ops/metrics.md. A number here is evidence about the company,
// not about learning: no metric below says anyone learned anything.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(ROOT, ...p);
const ls = (d) => (fs.existsSync(d) ? fs.readdirSync(d) : []);
// Review folders can hold subfolders (screenshots, per-pass fact-check folders): read only files from them.
const lsFiles = (d) => ls(d).filter((f) => fs.statSync(path.join(d, f)).isFile());
const md = process.argv.includes("--md");
const today = new Date().toISOString().slice(0, 10);

const lessons = [];
for (const dom of ls(rel("src/demos"))) {
  const dd = rel("src/demos", dom);
  if (!fs.statSync(dd).isDirectory()) continue;
  for (const slug of ls(dd)) {
    const mp = path.join(dd, slug, "meta.json");
    if (!fs.existsSync(mp)) continue;
    try {
      lessons.push(JSON.parse(fs.readFileSync(mp, "utf8")));
    } catch {
      lessons.push({ slug, domain: dom, status: "broken", claims: [], evidence: {} });
    }
  }
}

function reviewVerdicts(slug, version = 1) {
  const dir = rel("company/reviews", slug);
  const out = { learner: [], factCheck: false, qa: false, fatal: false, superseded: false };
  // A verdict is superseded when the lesson was revised after it: build.md has a "## v<current>" section
  // and the review does not mention that version.
  const build = fs.existsSync(path.join(dir, "build.md")) ? fs.readFileSync(path.join(dir, "build.md"), "utf8") : "";
  const revisedTo = version > 1 && new RegExp(`##\\s*v${version}\\b`).test(build);
  for (const f of lsFiles(dir)) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    if (f.includes("learner")) {
      const v = t.match(/Verdict:\s*\**\s*(launch|revise|fatal)/i)?.[1]?.toLowerCase();
      const stale = revisedTo && !new RegExp(`\\bv${version}\\b`).test(t);
      if (stale) { out.superseded = true; continue; }
      if (v) out.learner.push(v);
      if (v === "fatal") out.fatal = true;
    }
    if (f.includes("fact-check")) out.factCheck = true;
    if (f.endsWith("-qa.md") && /result: \*\*pass\*\*/.test(t)) out.qa = true;
  }
  return out;
}

const live = lessons.filter((l) => l.status !== "retired");
const claims = live.flatMap((l) => l.claims ?? []);
const by = (k) => live.reduce((m, l) => ((m[l[k]] = (m[l[k]] ?? 0) + 1), m), {});
const rows = live.map((l) => ({ l, r: reviewVerdicts(l.slug, l.version ?? 1) }));
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "—");

const stat = {
  lessons: live.length,
  status: by("status"),
  claims: claims.length,
  claimsVerified: claims.filter((c) => c.status === "verified").length,
  claimsDisputed: claims.filter((c) => c.status === "disputed").length,
  claimsPerLesson: (claims.length / Math.max(1, live.length)).toFixed(1),
  factChecked: rows.filter((x) => x.r.factCheck).length,
  learnerReviewed: rows.filter((x) => x.r.learner.length).length,
  qaPass: rows.filter((x) => x.r.qa).length,
  fatal: rows.filter((x) => x.r.fatal).map((x) => x.l.slug),
  revise: rows.filter((x) => x.r.learner.includes("revise") && !x.r.fatal).length,
  launchVerdict: rows.filter((x) => x.r.learner.length && x.r.learner.every((v) => v === "launch")).length,
  needsReReview: rows.filter((x) => x.r.superseded && !x.r.learner.length).length,
  exploration: 0,
};

// Board health
const board = fs.existsSync(rel("company/ops/board.json")) ? JSON.parse(fs.readFileSync(rel("company/ops/board.json"), "utf8")).items : [];
const open = board.filter((i) => !["done", "dropped"].includes(i.state));
const age = (i) => Math.round((Date.parse(today) - Date.parse(i.created)) / 86_400_000);

// Waves (throughput and cost, recorded by the chief of staff)
const waves = fs.existsSync(rel("company/ops/waves.json")) ? JSON.parse(fs.readFileSync(rel("company/ops/waves.json"), "utf8")).waves : [];

// Rituals: records per kind (cadence is tracked by `company rituals`)
const recs = ls(rel("company/rituals/records")).filter((f) => /^\d{4}-\d{2}-\d{2}-/.test(f));
const ritualCount = recs.reduce((m, f) => {
  const k = f.slice(11, -3).replace(/-\d+$/, "");
  m[k] = (m[k] ?? 0) + 1;
  return m;
}, {});

// ------------------------------------------------------------------ agents (WBR "Agents" section, 2026-10-13)
// From the event log: who was dispatched, finished, stopped, and what it cost. The point is to catch
// roles nobody uses (the design roles sat at 0 dispatches for ~500 lessons) and roles that keep failing.
const { roles } = await import("./org/roles.mjs");
const { dedupeUsage } = await import("./lib/usage.mjs");
const { readEvents, lastDispatchAge, lastDispatchLine } = await import("./lib/dispatch-age.mjs");
const rawEvs = readEvents();
// W-1195 / retro 2026-10-16 C1: how old the newest dispatch event is. Over 6 h, "never dispatched" is STALE:
// it may list roles that ran but were not recorded.
const dispatchAge = lastDispatchAge(rawEvs);
const staleTag = dispatchAge.stale ? "STALE " : "";
// PE-ops H4: corruption is visible, not silent. Ruling H2: unfolded hook spool lines are shown with their age.
const logHealthLines = [
  ...(rawEvs.skipped ? [`events.jsonl: ${rawEvs.skipped} unreadable line(s)`] : []),
  ...(rawEvs.spool?.skipped ? [`events spool: ${rawEvs.spool.skipped} unreadable line(s)`] : []),
  ...(rawEvs.spool?.lines ? [`events spool: ${rawEvs.spool.lines} unfolded event(s), oldest ${rawEvs.spool.oldest?.slice(0, 16) ?? "?"}Z`] : []),
];
// A resumed run logs `usage` again with cumulative tokens: count only the max record per run (W-941, tools/lib/usage.mjs).
const keptUsage = new Set(dedupeUsage(rawEvs.filter((e) => e.type === "usage")));
const evs = rawEvs.filter((e) => e.type !== "usage" || keptUsage.has(e));
const roleOfLabel = {};
for (const e of evs) if (e.type === "dispatch" && e.agent && e.subjects?.[0] && !roleOfLabel[e.agent]) roleOfLabel[e.agent] = e.subjects[0];
const per = {};
const bump = (role, k, v = 1) => ((per[role] ??= { dispatched: 0, done: 0, stopped: 0, resumed: 0, tokens: 0, ms: [], labels: new Set() })[k] += v);
const seen = { done: new Set(), stopped: new Set() };
for (const e of evs) {
  const role = e.agent ? roleOfLabel[e.agent] : null;
  if (!role) continue;
  if (e.type === "dispatch") {
    if (per[role]?.labels.has(e.agent)) bump(role, "resumed");
    else (bump(role, "dispatched"), per[role].labels.add(e.agent));
  }
  if (e.type === "report" && !seen.done.has(e.agent)) (seen.done.add(e.agent), bump(role, "done"));
  if (e.type === "stopped" && !seen.stopped.has(e.agent)) (seen.stopped.add(e.agent), bump(role, "stopped"));
  if (e.type === "usage") (bump(role, "tokens", e.tokens ?? 0), per[role].ms.push(e.durationMs ?? 0));
}
const median = (xs) => (xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : 0);
const agentRows = Object.entries(per)
  .map(([role, r]) => ({ role, ...r, perRun: r.done ? Math.round(r.tokens / Math.max(1, r.ms.length) / 1000) : 0, medMin: Math.round(median(r.ms) / 60000) }))
  .sort((a, b) => b.dispatched - a.dispatched);
const roster = roles.filter((r) => !r.human && r.id !== "chief-of-staff");
const neverDispatched = roster.filter((r) => !per[r.id]).map((r) => r.id);
const totalTokens = agentRows.reduce((n, r) => n + r.tokens, 0);
const stopRate = (() => {
  const d = agentRows.reduce((n, r) => n + r.dispatched, 0);
  return d ? Math.round((100 * seen.stopped.size) / d) : 0;
})();
// Rework and the EXP-003 split: first learner verdict per lesson, by builder model (build.md says "sonnet build").
const firstVerdict = (slug) => {
  const dir = rel("company/reviews", slug);
  const f = lsFiles(dir).filter((x) => x.includes("learner")).sort()[0];
  return f ? fs.readFileSync(path.join(dir, f), "utf8").match(/Verdict:\s*\**\s*(launch|revise|fatal)/i)?.[1]?.toLowerCase() : null;
};
// "opus" is the default when build.md has no "sonnet build" phrase, so `labelled` counts lessons whose build.md names
// the model explicitly. Assessment 2026-10-17 (Measurement fitness): the split is not causal (domains, vintages and
// tasks differ; the first learner record is chosen by filename), so it prints as a comparison only when both arms are
// mostly explicitly labelled (MODEL_LABEL_MIN); otherwise raw counts with the missingness.
const MODEL_LABEL_MIN = 0.8;
const byModel = { sonnet: { n: 0, reviewed: 0, launch: 0, labelled: 0 }, opus: { n: 0, reviewed: 0, launch: 0, labelled: 0 } };
for (const l of live) {
  const b = rel("company/reviews", l.slug, "build.md");
  const t = fs.existsSync(b) ? fs.readFileSync(b, "utf8") : "";
  const m = /sonnet build/i.test(t) ? "sonnet" : "opus";
  byModel[m].n++;
  if (new RegExp(`${m} build`, "i").test(t)) byModel[m].labelled++;
  const v = firstVerdict(l.slug);
  if (v) (byModel[m].reviewed++, v === "launch" && byModel[m].launch++);
}
const ledgerRows = fs.existsSync(rel("company/ops/ledger.jsonl"))
  ? fs.readFileSync(rel("company/ops/ledger.jsonl"), "utf8").split("\n").filter((x) => x.trim()).map((x) => { try { return JSON.parse(x); } catch { return {}; } })
  : [];
const ledgerNoModel = ledgerRows.filter((r) => !r.model).length;
const modelComparable = ["opus", "sonnet"].every((k) => byModel[k].n && byModel[k].labelled / byModel[k].n >= MODEL_LABEL_MIN);
const modelLine = () => {
  const o = byModel.opus, s = byModel.sonnet;
  const miss = `"opus" = no model phrase in build.md for ${o.n - o.labelled} of ${o.n} lessons; ledger rows without a model label ${ledgerNoModel} of ${ledgerRows.length}`;
  return modelComparable
    ? `opus ${o.launch}/${o.reviewed} (${pct(o.launch, o.reviewed)}) vs sonnet ${s.launch}/${s.reviewed} (${pct(s.launch, s.reviewed)}), non-causal (${miss})`
    : `no model comparison (non-causal and under ${Math.round(MODEL_LABEL_MIN * 100)}% explicit labels: ${miss}); raw: sonnet-labelled ${s.launch}/${s.reviewed}, unlabelled ${o.launch}/${o.reviewed}`;
};
// Never-dispatched comes from dispatch telemetry that misses runs (assessment 2026-10-17: roles with visible work are listed).
const retireCaveat = "unsuitable for retirement decisions until dispatch telemetry is reconciled";
// Founder attention per accepted outcome (company/ops/metrics.md §C).
const FL = await import("./lib/founder-leverage.mjs");
const checkedSlugs = new Set(rows.filter(FL.isCheckedPublished).map((x) => x.l.slug));
const levAll = FL.leverage(evs, checkedSlugs);
const levNew = FL.leverage(evs, checkedSlugs, { since: FL.CLASSIFY_FROM });
const levText = FL.leverageText(levAll);
const levNewText = FL.leverageText(levNew);
const reworked = live.filter((l) => (l.version ?? 1) > 1).length;

const domains = JSON.parse(fs.readFileSync(rel("content/domains.json"), "utf8")).domains;
const perDomain = domains.map((d) => {
  const ls_ = live.filter((l) => l.domain === d.id);
  const rs = rows.filter((x) => x.l.domain === d.id);
  return {
    id: d.id,
    lessons: ls_.length,
    published: ls_.filter((l) => l.status === "published").length,
    fatal: rs.filter((x) => x.r.fatal).length,
    reviewed: rs.filter((x) => x.r.learner.length).length,
  };
});

// Budget: spend per project or line from the token ledger (company/ops/token-budget.md; tools/ledger.mjs).
let budget = null;
if (fs.existsSync(rel("company/ops/projects.json")) && fs.existsSync(rel("company/ops/ledger.jsonl"))) {
  const L = await import("./lib/ledger.mjs");
  budget = L.summary();
  budget.fmt = L.fmt;
}
// Assessment 2026-10-17 (Measurement fitness): tokens recorded up to the last usage record ÷ lessons published today.
// The two ends can be days apart, so this is a stock ratio, not the marginal cost of a lesson.
const stockRatio = () =>
  `stock ratio ${budget.fmt(budget.perPublishedAll)}/published lesson = tokens recorded to ${budget.lastUsage?.slice(0, 16) ?? "—"}Z ÷ ${budget.published} lessons published at ${today}; not marginal cost`;
const budgetRows = budget ? budget.rows.filter((r) => r.spent || r.budget || (r.major && !["legacy", "done", "killed"].includes(r.status))) : [];

if (md) {
  console.log(`| Metric | Value |\n|---|---|`);
  console.log(`| Lessons (not retired) | ${stat.lessons} |`);
  console.log(`| Status | ${Object.entries(stat.status).map(([k, v]) => `${k} ${v}`).join(", ")} |`);
  console.log(`| Claims verified | ${stat.claimsVerified}/${stat.claims} (${pct(stat.claimsVerified, stat.claims)}) · disputed ${stat.claimsDisputed} |`);
  console.log(`| Claims per lesson | ${stat.claimsPerLesson} |`);
  console.log(`| Fact-checked / learner-reviewed / QA pass | ${stat.factChecked} / ${stat.learnerReviewed} / ${stat.qaPass} of ${stat.lessons} |`);
  console.log(`| Learner verdicts (current version) | fatal ${stat.fatal.length} · revise ${stat.revise} · launch ${stat.launchVerdict} · needs re-review ${stat.needsReReview} |`);
  console.log(`| Board | ${open.length} open (oldest ${open.length ? Math.max(...open.map(age)) : 0} days) |`);
  console.log(`\n| Domain | Lessons | Published | Reviewed | Fatal |\n|---|---|---|---|---|`);
  for (const d of perDomain) console.log(`| ${d.id} | ${d.lessons} | ${d.published} | ${d.reviewed} | ${d.fatal} |`);
  console.log(`\n### Agents\n\n| Metric | Value |\n|---|---|`);
  console.log(`| Agent runs | ${agentRows.reduce((n, r) => n + r.dispatched, 0)} dispatched · ${seen.done.size} reported · ${seen.stopped.size} stopped at least once (${stopRate}%) |`);
  console.log(`| Tokens (recorded runs) | ${Math.round(totalTokens / 1e6 * 10) / 10}M |`);
  console.log(`| Last dispatch event | ${lastDispatchLine(dispatchAge).replace(/^last dispatch event: /, "")} |`);
  for (const l of logHealthLines) console.log(`| Event log health | ${l} |`);
  console.log(`| ${staleTag}Roles never dispatched | ${neverDispatched.length} of ${roster.length} (${retireCaveat})${neverDispatched.length ? ": " + neverDispatched.slice(0, 40).join(", ") + (neverDispatched.length > 40 ? ", …" : "") : ""} |`);
  console.log(`| Rework | ${reworked} of ${live.length} lessons revised at least once (${pct(reworked, live.length)}) |`);
  console.log(`| First-review launch rate by builder model (EXP-003) | ${modelLine()} |`);
  console.log(`\n| Role | Dispatched | Reported | Stopped | Resumed | Tokens/run | Median min |\n|---|---|---|---|---|---|---|`);
  for (const r of agentRows) console.log(`| ${r.role} | ${r.dispatched} | ${r.done} | ${r.stopped} | ${r.resumed} | ${r.perRun ? r.perRun + "k" : "—"} | ${r.medMin || "—"} |`);
  console.log(`\n### Founder leverage (all of the log to ${today}; company/ops/metrics.md §C)\n\n| Metric | Value |\n|---|---|`);
  console.log(`| Founder attention | ${levText.head} |`);
  console.log(`| Accepted outcomes | ${levText.acc} |`);
  console.log(`| Since ${FL.CLASSIFY_FROM} (classification began) | ${levNewText.head} · ${levNewText.acc} (lessons dated by first publish event) |`);
  console.log(`| Founder attention per accepted outcome since ${FL.CLASSIFY_FROM} | ${levNewText.per.replace(/^per accepted outcome: /, "")} |`);
  if (waves.length) {
    console.log(`\n| Wave | Builders | Lessons added | Build tokens/lesson | Check tokens/lesson | Merge QA failures |\n|---|---|---|---|---|---|`);
    for (const w of waves)
      console.log(`| ${w.id} | ${w.builders ?? "—"} | ${w.lessonsAdded ?? "—"} | ${w.buildTokens && w.lessonsAdded ? Math.round(w.buildTokens / w.lessonsAdded / 1000) + "k" : "—"} | ${w.checkTokens && w.lessonsChecked ? Math.round(w.checkTokens / w.lessonsChecked / 1000) + "k" : "—"} | ${w.mergeQaFailures ?? "—"} |`);
  }
  if (budget) {
    console.log(`\n### Budget (token ledger: ${budget.fmt(budget.total)} measured over ${budget.runs} runs; ${stockRatio()})\n\n| Line | Status | Major | Budget | Spent vs budget | % | Spent (all) | Published | k/published |\n|---|---|---|---|---|---|---|---|---|`);
    for (const r of budgetRows) console.log(`| ${r.id} | ${r.status} | ${r.major ? "yes" : ""} | ${budget.fmt(r.budget)} | ${budget.fmt(r.against)} | ${r.pct ?? "—"} | ${budget.fmt(r.spent)} | ${r.returns?.published ?? "—"} | ${r.perPublished ? Math.round(r.perPublished / 1000) : "—"} |`);
  }
} else {
  console.log(`System 3 Company: health metrics (${today})\n`);
  console.log(`Lessons ${stat.lessons}  ·  ${Object.entries(stat.status).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
  console.log(`Claims  ${stat.claimsVerified}/${stat.claims} verified (${pct(stat.claimsVerified, stat.claims)}), ${stat.claimsDisputed} disputed, ${stat.claimsPerLesson} per lesson`);
  console.log(`Checks  fact-checked ${stat.factChecked} · learner-reviewed ${stat.learnerReviewed} · QA pass ${stat.qaPass}  (of ${stat.lessons})`);
  console.log(`Verdict fatal ${stat.fatal.length} · revise ${stat.revise} · launch ${stat.launchVerdict} · revised since review (needs re-review) ${stat.needsReReview}${stat.fatal.length ? `\n        fatal: ${stat.fatal.join(", ")}` : ""}`);
  console.log(`Board   ${open.length} open; oldest ${open.length ? Math.max(...open.map(age)) : 0} days; by owner: ${Object.entries(open.reduce((m, i) => ((m[i.owner] = (m[i.owner] ?? 0) + 1), m), {})).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  console.log(`Rituals ${Object.entries(ritualCount).map(([k, v]) => `${k} ${v}`).join(" · ") || "none run"}`);
  console.log(`Agents  ${agentRows.reduce((n, r) => n + r.dispatched, 0)} runs · ${seen.stopped.size} stopped (${stopRate}%) · ${Math.round(totalTokens / 1e5) / 10}M tokens · rework ${pct(reworked, live.length)} · first-review launch by builder model: ${modelLine()}`);
  console.log(`        ${lastDispatchLine(dispatchAge)}`);
  for (const l of logHealthLines) console.log(`        ${l}`);
  console.log(`        ${staleTag}never dispatched (${neverDispatched.length}/${roster.length}; ${retireCaveat}): ${neverDispatched.join(", ") || "none"}`);
  for (const r of agentRows.slice(0, 12)) console.log(`        ${r.role.padEnd(22)} ${String(r.dispatched).padStart(3)} runs  ${String(r.stopped).padStart(2)} stopped  ${String(r.perRun || "—").padStart(4)}k/run  ${String(r.medMin || "—").padStart(3)} min`);
  console.log(`Founder ${levText.head}  (all of the log to ${today}; company/ops/metrics.md §C)`);
  console.log(`        ${levText.acc}`);
  console.log(`        since ${FL.CLASSIFY_FROM} (classification began): ${levNewText.head}`);
  console.log(`        since ${FL.CLASSIFY_FROM}: ${levNewText.acc} (lessons dated by first publish event)`);
  console.log(`        since ${FL.CLASSIFY_FROM}: ${levNewText.per}`);
  console.log(`\nDomain        lessons published reviewed fatal`);
  for (const d of perDomain) console.log(`${d.id.padEnd(13)} ${String(d.lessons).padStart(7)} ${String(d.published).padStart(9)} ${String(d.reviewed).padStart(8)} ${String(d.fatal).padStart(5)}`);
  if (waves.length) {
    console.log(`\nWave  builders added  build-k/lesson  check-k/lesson  merge-QA-fail`);
    for (const w of waves)
      console.log(`${String(w.id).padEnd(5)} ${String(w.builders ?? "—").padStart(8)} ${String(w.lessonsAdded ?? "—").padStart(5)}  ${String(w.buildTokens && w.lessonsAdded ? Math.round(w.buildTokens / w.lessonsAdded / 1000) : "—").padStart(14)}  ${String(w.checkTokens && w.lessonsChecked ? Math.round(w.checkTokens / w.lessonsChecked / 1000) : "—").padStart(14)}  ${String(w.mergeQaFailures ?? "—").padStart(13)}`);
  }
  if (budget) {
    console.log(`\nBudget  ${budget.fmt(budget.total)} measured over ${budget.runs} runs (${budget.unmeasured} stopped, unmeasured) · ${stockRatio()} (node tools/ledger.mjs report)`);
    for (const r of budgetRows) console.log(`        ${r.id.padEnd(22)} ${String(r.status).padEnd(10)} ${r.major ? "major" : "     "} budget ${budget.fmt(r.budget).padStart(6)}  spent ${budget.fmt(r.spent).padStart(6)}${r.pct != null ? `  ${r.pct}%${r.pct >= 100 ? " STOP" : r.pct >= 80 ? " WARN" : ""}` : ""}${r.perPublished ? `  ${Math.round(r.perPublished / 1000)}k/published` : ""}`);
  }
}
