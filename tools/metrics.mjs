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

function reviewVerdicts(slug) {
  const dir = rel("company/reviews", slug);
  const out = { learner: [], factCheck: false, qa: false, fatal: false };
  for (const f of ls(dir)) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    if (f.includes("learner")) {
      const v = t.match(/Verdict:\s*\**\s*(launch|revise|fatal)/i)?.[1]?.toLowerCase();
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
const rows = live.map((l) => ({ l, r: reviewVerdicts(l.slug) }));
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
  console.log(`| Learner verdicts | fatal ${stat.fatal.length} · revise ${stat.revise} · launch ${stat.launchVerdict} |`);
  console.log(`| Board | ${open.length} open (oldest ${open.length ? Math.max(...open.map(age)) : 0} days) |`);
  console.log(`\n| Domain | Lessons | Published | Reviewed | Fatal |\n|---|---|---|---|---|`);
  for (const d of perDomain) console.log(`| ${d.id} | ${d.lessons} | ${d.published} | ${d.reviewed} | ${d.fatal} |`);
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
  console.log(`Verdict fatal ${stat.fatal.length} · revise ${stat.revise} · launch ${stat.launchVerdict}${stat.fatal.length ? `\n        fatal: ${stat.fatal.join(", ")}` : ""}`);
  console.log(`Board   ${open.length} open; oldest ${open.length ? Math.max(...open.map(age)) : 0} days; by owner: ${Object.entries(open.reduce((m, i) => ((m[i.owner] = (m[i.owner] ?? 0) + 1), m), {})).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  console.log(`Rituals ${Object.entries(ritualCount).map(([k, v]) => `${k} ${v}`).join(" · ") || "none run"}`);
  console.log(`\nDomain        lessons published reviewed fatal`);
  for (const d of perDomain) console.log(`${d.id.padEnd(13)} ${String(d.lessons).padStart(7)} ${String(d.published).padStart(9)} ${String(d.reviewed).padStart(8)} ${String(d.fatal).padStart(5)}`);
  if (waves.length) {
    console.log(`\nWave  builders added  build-k/lesson  check-k/lesson  merge-QA-fail`);
    for (const w of waves)
      console.log(`${String(w.id).padEnd(5)} ${String(w.builders ?? "—").padStart(8)} ${String(w.lessonsAdded ?? "—").padStart(5)}  ${String(w.buildTokens && w.lessonsAdded ? Math.round(w.buildTokens / w.lessonsAdded / 1000) : "—").padStart(14)}  ${String(w.checkTokens && w.lessonsChecked ? Math.round(w.checkTokens / w.lessonsChecked / 1000) : "—").padStart(14)}  ${String(w.mergeQaFailures ?? "—").padStart(13)}`);
  }
}
