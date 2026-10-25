// AMD-017 (ratified 2026-10-25, F-51): risk tiers for the publish gate and the sampled learner walk for tier S.
// Ordinary surface, like tools/lib/readiness.mjs: the mechanics live here; the strictness parameters (sample rate,
// stop-rule rate, new-format threshold, which routes are risky) are passed in by tools/company.mjs (protected),
// which also runs a known-answer canary against this file before any gate trusts it. A lib that throws or fails
// the canary closes the sampled path: every lesson then needs its own learner walk, as before AMD-017.
//
// Pure core: tierOf, drawSample, batchState, coverage and auditRevoked read nothing from disk.
// loadBatches, loadAudits and learnerVerdictsAt do the I/O.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { readReview } from "./readiness.mjs";

/** "Before / after toggle" and "before-after-toggle" are one format; a lesson without a format is "(none)". */
export function normFormat(f) {
  const s = String(f ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return s || "(none)";
}

/** Published lessons per normalised format. */
export function publishedFormatCounts(metas) {
  const m = new Map();
  for (const x of metas) if (x?.status === "published") m.set(normFormat(x.contentType ?? x.format), (m.get(normFormat(x.contentType ?? x.format)) ?? 0) + 1);
  return m;
}

/**
 * Tier of one lesson (AMD-017 (a), steward's redraft).
 * ctx: { formatCounts: Map, concept: curriculum entry | null, domainStatus: string | null }
 * params: { riskRoutes: string[], newFormatBelow: number }
 * Returns { tier: "N" | "R" | "S", why }.
 *   N: the lesson's format has fewer than params.newFormatBelow OTHER published lessons. N wins over R.
 *   R: a risky route on the lesson (meta.reviewRoute.route) or on its curriculum concept (reviewRoute, or a
 *      non-empty `sensitive`), or a domain that is still incubating. No lesson declared reviewRoute on
 *      2026-10-25, so the route alone would have put every sensitive history and Life Hacks lesson in tier S.
 *   S: everything else.
 */
export function tierOf(meta, ctx, params) {
  const fmt = normFormat(meta.contentType ?? meta.format);
  const self = meta.status === "published" ? 1 : 0;
  const others = (ctx.formatCounts?.get(fmt) ?? 0) - self;
  if (others < params.newFormatBelow) return { tier: "N", why: `format "${fmt}" has ${others} other published lesson(s), fewer than ${params.newFormatBelow}` };
  const risky = new Set(params.riskRoutes);
  const route = meta.reviewRoute?.route ?? null;
  if (route && risky.has(route)) return { tier: "R", why: `reviewRoute.route is ${route}` };
  const c = ctx.concept ?? null;
  const croute = typeof c?.reviewRoute === "string" ? c.reviewRoute : c?.reviewRoute?.route ?? null;
  if (croute && risky.has(croute)) return { tier: "R", why: `curriculum concept route is ${croute}` };
  if (c?.sensitive && String(Array.isArray(c.sensitive) ? c.sensitive.join("") : c.sensitive).trim()) return { tier: "R", why: "curriculum concept is marked sensitive" };
  if (ctx.domainStatus === "incubating") return { tier: "R", why: "domain is incubating" };
  return { tier: "S", why: "standard" };
}

const h = (s) => crypto.createHash("sha256").update(s).digest("hex");

/**
 * The sample a batch must walk: ceil(n * rate) lessons, at least 1, picked by hash of the batch id and the slug,
 * so whoever lists the batch does not choose which lessons are walked. full = true (stop rule) walks every lesson.
 */
export function drawSample(batch, rate, full = false) {
  const slugs = [...new Set((batch.lessons ?? []).map((l) => l.slug))].sort();
  if (full) return slugs;
  const k = Math.max(1, Math.ceil(slugs.length * rate - 1e-9));
  return slugs.map((s) => [h(`${batch.id}:${s}`), s]).sort((a, b) => a[0].localeCompare(b[0])).slice(0, k).map((x) => x[1]).sort();
}

/**
 * State of one batch. verdictAt(slug, version) -> "launch" | "revise" | "fatal" | null (worst readable verdict
 * stamped with that version). prevTripped: the category's previous batch tripped the stop rule.
 * Returns { sample, full, verdicts, fatal, complete, tripped, problems }.
 */
export function batchState(batch, verdictAt, params, prevTripped = false) {
  const problems = [];
  if (!batch.id || !batch.domain || !Array.isArray(batch.lessons) || !batch.lessons.length) problems.push("batch record needs id, domain and lessons");
  if (!batch.drawnBy) problems.push("batch record needs drawnBy");
  const full = !!prevTripped;
  const sample = drawSample(batch, params.sampleRate, full);
  if (Array.isArray(batch.sample) && JSON.stringify([...batch.sample].sort()) !== JSON.stringify(sample)) problems.push(`recorded sample (${batch.sample.join(", ")}) is not the drawn sample (${sample.join(", ")})`);
  const version = new Map((batch.lessons ?? []).map((l) => [l.slug, l.version]));
  const verdicts = {};
  for (const s of sample) verdicts[s] = verdictAt(s, version.get(s));
  const fatal = Object.values(verdicts).filter((v) => v === "fatal").length;
  const complete = Object.values(verdicts).every((v) => v);
  const tripped = fatal * params.stopDenominator > sample.length * params.stopNumerator;
  return { sample, full, verdicts, fatal, complete, tripped, problems };
}

/**
 * Is a tier-S lesson's learner walk covered by a batch sample (AMD-017 (b))?
 * batches: every batch record, any order. Only the earliest record listing this slug at this version counts.
 * ownCurrentReviews: learner reviews on disk stamped with the lesson's current version (any verdict). If there is
 * one, the lesson's own verdict governs and coverage does not apply.
 * Returns { covered, reason, batch }.
 */
export function coverage(meta, tier, batches, verdictAt, params, { ownCurrentReviews = 0, revoked = null } = {}) {
  const v = meta.version ?? 1;
  if (tier !== "S") return { covered: false, reason: `tier ${tier} needs its own learner walk` };
  if (ownCurrentReviews > 0) return { covered: false, reason: "the lesson has its own learner review for this version" };
  if (revoked) return { covered: false, reason: revoked };
  const sorted = [...batches].sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
  const mine = sorted.find((b) => (b.lessons ?? []).some((l) => l.slug === meta.slug && l.version === v));
  if (!mine) return { covered: false, reason: "no batch sample lists this lesson at its current version" };
  if (mine.domain !== meta.domain) return { covered: false, reason: `batch ${mine.id} is for ${mine.domain}, lesson is ${meta.domain}`, batch: mine.id };
  if (params.builders?.(mine)?.includes(mine.drawnBy)) return { covered: false, reason: `batch ${mine.id} was drawn by a builder of one of its lessons`, batch: mine.id };
  // Walk the category's batches in order: a tripped batch makes the next one full (100% walks).
  let prevTripped = false;
  let st = null;
  for (const b of sorted.filter((x) => x.domain === mine.domain)) {
    st = batchState(b, verdictAt, params, prevTripped);
    if (b === mine) break;
    prevTripped = st.tripped;
  }
  if (st.problems.length) return { covered: false, reason: `batch ${mine.id}: ${st.problems.join("; ")}`, batch: mine.id };
  if (st.sample.includes(meta.slug)) return { covered: false, reason: `sampled in batch ${mine.id}: needs its own walk`, batch: mine.id };
  if (!st.complete) return { covered: false, reason: `batch ${mine.id} sample not walked yet (${st.sample.filter((s) => !st.verdicts[s]).join(", ")})`, batch: mine.id };
  if (st.tripped) return { covered: false, reason: `stop rule: batch ${mine.id} sample found ${st.fatal} fatal in ${st.sample.length}; every lesson in it and the category's next batch need their own walks`, batch: mine.id };
  return { covered: true, reason: null, batch: mine.id };
}

/**
 * AMD-017 would_be_wrong_if: the weekly audit finds more than 1 fatal flaw in 10, two weeks running, in a category;
 * then (b) is revoked for that category. audits: [{ date, lessons: [{ slug, domain, fatal }] }].
 * Returns a reason string when revoked for this domain, else null.
 */
export function auditRevoked(domain, audits, params) {
  const last = [...audits].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 2);
  if (last.length < 2) return null;
  const rates = last.map((a) => {
    const mine = (a.lessons ?? []).filter((l) => l.domain === domain);
    return { n: mine.length, f: mine.filter((l) => l.fatal).length, date: a.date };
  });
  if (rates.every((r) => r.n > 0 && r.f * params.stopDenominator > r.n * params.stopNumerator))
    return `weekly audits ${rates.map((r) => `${r.date} (${r.f} fatal in ${r.n})`).join(" and ")} found more than ${params.stopNumerator} fatal in ${params.stopDenominator} in ${domain}: sampling revoked for this category (AMD-017)`;
  return null;
}

// ------------------------------------------------------------ disk

function readJsonDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort().map((f) => ({ ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), _file: f }));
}
export const BATCH_DIR = "company/evaluation/batches";
export const AUDIT_DIR = "company/evaluation/audits";
export const loadBatches = (root) => readJsonDir(path.join(root, BATCH_DIR));
export const loadAudits = (root) => readJsonDir(path.join(root, AUDIT_DIR));

const SEV = { launch: 0, revise: 1, fatal: 2 };
/** Readable learner verdicts for one lesson, from company/reviews/<slug>/*learner*.md: [{ f, verdict, version }]. */
export function learnerVerdicts(root, slug) {
  const dir = path.join(root, "company/reviews", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.includes("learner") && f.endsWith(".md"))
    .map((f) => ({ f, ...readReview(fs.readFileSync(path.join(dir, f), "utf8")) }))
    .filter((r) => r.version > 0);
}
/** Worst readable verdict stamped with this version, or null (an unreadable one does not count as a walk). */
export function worstAt(reviews, version) {
  const at = reviews.filter((r) => r.version === version && !r.problem && r.verdict);
  if (!at.length) return null;
  return at.map((r) => r.verdict).sort((a, b) => SEV[b] - SEV[a])[0];
}
