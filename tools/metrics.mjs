#!/usr/bin/env node
// Company health metrics. Not a gate (gates live in tools/company.mjs); this is the instrument
// panel for WBRs and retros. Every number is computed from files in the repo.
//
//   npm run metrics            human-readable
//   npm run metrics -- --md    markdown tables (paste into WBR / retro records)
//
// Definitions live in company/ops/metrics.md. A number here is evidence about the company,
// not about learning: no metric below says anyone learned anything.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(ROOT, ...p);
const ls = (d) => (fs.existsSync(d) ? fs.readdirSync(d) : []);
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
  for (const f of ls(dir)) {
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
const evs = fs.existsSync(rel("company/ops/events.jsonl"))
  ? fs.readFileSync(rel("company/ops/events.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l))
  : [];
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
  const f = ls(dir).filter((x) => x.includes("learner")).sort()[0];
  return f ? fs.readFileSync(path.join(dir, f), "utf8").match(/Verdict:\s*\**\s*(launch|revise|fatal)/i)?.[1]?.toLowerCase() : null;
};
const byModel = { sonnet: { n: 0, reviewed: 0, launch: 0 }, opus: { n: 0, reviewed: 0, launch: 0 } };
for (const l of live) {
  const b = rel("company/reviews", l.slug, "build.md");
  const m = fs.existsSync(b) && /sonnet build/i.test(fs.readFileSync(b, "utf8")) ? "sonnet" : "opus";
  byModel[m].n++;
  const v = firstVerdict(l.slug);
  if (v) (byModel[m].reviewed++, v === "launch" && byModel[m].launch++);
}
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
  console.log(`| Roles never dispatched | ${neverDispatched.length} of ${roster.length}${neverDispatched.length ? ": " + neverDispatched.slice(0, 40).join(", ") + (neverDispatched.length > 40 ? ", …" : "") : ""} |`);
  console.log(`| Rework | ${reworked} of ${live.length} lessons revised at least once (${pct(reworked, live.length)}) |`);
  console.log(`| First-review launch rate by builder model (EXP-003) | opus ${byModel.opus.launch}/${byModel.opus.reviewed} (${pct(byModel.opus.launch, byModel.opus.reviewed)}) · sonnet ${byModel.sonnet.launch}/${byModel.sonnet.reviewed} (${pct(byModel.sonnet.launch, byModel.sonnet.reviewed)}) |`);
  console.log(`\n| Role | Dispatched | Reported | Stopped | Resumed | Tokens/run | Median min |\n|---|---|---|---|---|---|---|`);
  for (const r of agentRows) console.log(`| ${r.role} | ${r.dispatched} | ${r.done} | ${r.stopped} | ${r.resumed} | ${r.perRun ? r.perRun + "k" : "—"} | ${r.medMin || "—"} |`);
  if (waves.length) {
    console.log(`\n| Wave | Builders | Lessons added | Build tokens/lesson | Check tokens/lesson | Merge QA failures |\n|---|---|---|---|---|---|`);
    for (const w of waves)
      console.log(`| ${w.id} | ${w.builders ?? "—"} | ${w.lessonsAdded ?? "—"} | ${w.buildTokens && w.lessonsAdded ? Math.round(w.buildTokens / w.lessonsAdded / 1000) + "k" : "—"} | ${w.checkTokens && w.lessonsChecked ? Math.round(w.checkTokens / w.lessonsChecked / 1000) + "k" : "—"} | ${w.mergeQaFailures ?? "—"} |`);
  }
} else {
  console.log(`System 3 Company: health metrics (${today})\n`);
  console.log(`Lessons ${stat.lessons}  ·  ${Object.entries(stat.status).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
  console.log(`Claims  ${stat.claimsVerified}/${stat.claims} verified (${pct(stat.claimsVerified, stat.claims)}), ${stat.claimsDisputed} disputed, ${stat.claimsPerLesson} per lesson`);
  console.log(`Checks  fact-checked ${stat.factChecked} · learner-reviewed ${stat.learnerReviewed} · QA pass ${stat.qaPass}  (of ${stat.lessons})`);
  console.log(`Verdict fatal ${stat.fatal.length} · revise ${stat.revise} · launch ${stat.launchVerdict} · revised since review (needs re-review) ${stat.needsReReview}${stat.fatal.length ? `\n        fatal: ${stat.fatal.join(", ")}` : ""}`);
  console.log(`Board   ${open.length} open; oldest ${open.length ? Math.max(...open.map(age)) : 0} days; by owner: ${Object.entries(open.reduce((m, i) => ((m[i.owner] = (m[i.owner] ?? 0) + 1), m), {})).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  console.log(`Rituals ${Object.entries(ritualCount).map(([k, v]) => `${k} ${v}`).join(" · ") || "none run"}`);
  console.log(`Agents  ${agentRows.reduce((n, r) => n + r.dispatched, 0)} runs · ${seen.stopped.size} stopped (${stopRate}%) · ${Math.round(totalTokens / 1e5) / 10}M tokens · rework ${pct(reworked, live.length)} · launch-on-first-review opus ${pct(byModel.opus.launch, byModel.opus.reviewed)} vs sonnet ${pct(byModel.sonnet.launch, byModel.sonnet.reviewed)}`);
  console.log(`        never dispatched (${neverDispatched.length}/${roster.length}): ${neverDispatched.join(", ") || "none"}`);
  for (const r of agentRows.slice(0, 12)) console.log(`        ${r.role.padEnd(22)} ${String(r.dispatched).padStart(3)} runs  ${String(r.stopped).padStart(2)} stopped  ${String(r.perRun || "—").padStart(4)}k/run  ${String(r.medMin || "—").padStart(3)} min`);
  console.log(`\nDomain        lessons published reviewed fatal`);
  for (const d of perDomain) console.log(`${d.id.padEnd(13)} ${String(d.lessons).padStart(7)} ${String(d.published).padStart(9)} ${String(d.reviewed).padStart(8)} ${String(d.fatal).padStart(5)}`);
  if (waves.length) {
    console.log(`\nWave  builders added  build-k/lesson  check-k/lesson  merge-QA-fail`);
    for (const w of waves)
      console.log(`${String(w.id).padEnd(5)} ${String(w.builders ?? "—").padStart(8)} ${String(w.lessonsAdded ?? "—").padStart(5)}  ${String(w.buildTokens && w.lessonsAdded ? Math.round(w.buildTokens / w.lessonsAdded / 1000) : "—").padStart(14)}  ${String(w.checkTokens && w.lessonsChecked ? Math.round(w.checkTokens / w.lessonsChecked / 1000) : "—").padStart(14)}  ${String(w.mergeQaFailures ?? "—").padStart(13)}`);
  }
}
