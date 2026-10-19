/**
 * Review-timing candidate policy (W-1547, batch 3 P2) for criterion 2.
 *
 * owner: learner-model-engineer (Ifeoma) · offline only · nothing in src/ imports this.
 * Interface: criterion 2 §I at commit 45826c6 (company/personalization/eval/2026-10-16-criterion-2.md, §I only);
 * the four types below are copied verbatim from §I.4. Numbers: REVIEW_TIMING_CURVES only
 * (applied-scientist-personalization, W-1546). This file holds no timing value of its own.
 *
 * The decision (§I.1): at the start of a session, which completed lessons come back, in what order. The rule is
 * the one written in REVIEW_TIMING_CURVES's header (P1 owns it; this file implements it and chooses nothing):
 *   per lesson, streak = trailing correct results; last = latest result's `at`, or `completedAt` if none;
 *   wait = postMissWaitDays after a miss, else waitDays[streak]; retired when streak >= retireAfterStreak;
 *   due when not retired and now - last >= wait days.
 *   Order: every `fixedDue` slug in `fixedDue`'s order, then the other due lessons by (now - last) / wait
 *   descending, ties older `last`, then slug; at most `slots`. Each revisit carries a reason naming an act.
 *
 * Reads only: now, history[].{slug, completedAt, recalls[].{at, correct}} (completions, recalls:
 * standing-conditions), slots and fixedDue (not personal / derived from completions and recalls). It does not
 * read `dims` or `predictedCorrectly` (curves `notRead`). Elapsed time is per lesson (now - last), never per
 * learner (no gapDays, §I.3). Pure: no clock, no random numbers, no I/O, no module state; never mutates its input.
 * V4: serving fixedDue first and whole is what keeps every revisit at or before the fixed schedule; keep it.
 */
import type { HistoryItem, LessonDims } from "../model";
import { REVIEW_TIMING_CURVES, type ReviewTimingCurves } from "../review-timing-curves.ts";

// ---- §I.4, copied verbatim ----------------------------------------------------------------------
export type ReviewTimingInput = {
  now: number;
  history: HistoryItem[];
  dims: Record<string, LessonDims>;
  slots: number;
  fixedDue: string[];
};
export type ReviewTimingDecision = {
  /** Ordered: served first to last, before any new card. */
  revisits: { slug: string; reason: string }[];
};
export type ReviewTimingPolicy = {
  name: string;      // the POLICIES entry
  version: string;   // with a change line in company/decisions/2026-10-16-personalization-model-v0.md
  decide: (input: ReviewTimingInput) => ReviewTimingDecision;
};
// ---- end of §I.4 --------------------------------------------------------------------------------

export const REVIEW_TIMING_NAME = "review-timing" as const;
export const REVIEW_TIMING_VERSION = "review-timing-v1" as const;
const DAY = 86_400_000;
type Curves = ReviewTimingCurves;

/** One lesson's record as the policy reads it: only permitted fields, copied, never the caller's objects. */
type LessonRecord = { slug: string; completedAt: number; recalls: { at: number; correct: boolean }[] };

/** Merge repeated completions of one slug (a lesson completed twice): latest completion, all results by time. */
function records(history: HistoryItem[]): LessonRecord[] {
  const by = new Map<string, LessonRecord>();
  for (const h of history) {
    const rs = (h.recalls ?? []).map((r) => ({ at: r.at, correct: r.correct === true }));
    const prev = by.get(h.slug);
    if (!prev) by.set(h.slug, { slug: h.slug, completedAt: h.completedAt, recalls: rs });
    else by.set(h.slug, { slug: h.slug, completedAt: Math.max(prev.completedAt, h.completedAt), recalls: [...prev.recalls, ...rs] });
  }
  for (const r of by.values()) r.recalls.sort((a, b) => a.at - b.at); // stable: equal `at` keeps the input order
  return [...by.values()];
}

/**
 * One lesson's timing, exactly as the curves file's header specifies (REVIEW_TIMING_CURVES, "WHAT THE CANDIDATE DOES"):
 * streak = trailing correct results; last = latest result's `at` or `completedAt`; wait = postMissWaitDays after a miss,
 * else waitDays[streak]; retired = streak >= retireAfterStreak; due = !retired && now - last >= wait days.
 */
function timing(rec: LessonRecord, now: number, curves: Curves) {
  let streak = 0;
  for (let i = rec.recalls.length - 1; i >= 0 && rec.recalls[i].correct; i--) streak++;
  const last = rec.recalls[rec.recalls.length - 1];
  const lastAt = last ? last.at : rec.completedAt;
  const missed = !!last && !last.correct;
  const retired = streak >= curves.retireAfterStreak.value;
  const waitDays = retired ? null : missed ? curves.postMissWaitDays.value : curves.waitDays.values[Math.min(streak, curves.waitDays.values.length - 1)];
  const rule = retired ? `retired: ${streak} correct in a row >= retireAfterStreak ${curves.retireAfterStreak.value}`
    : missed ? "postMissWaitDays (latest result a miss)" : `waitDays[${streak}] (correct in a row since the last miss)`;
  const due = waitDays !== null && now - lastAt >= waitDays * DAY;
  return { streak, lastAt, lastAct: (!last ? "completed" : last.correct ? "recalled" : "missed") as ReviewTimingRow["lastAct"], waitDays, rule, due };
}

const ago = (ms: number) => { const d = Math.floor(ms / DAY); return d <= 0 ? "earlier today" : d === 1 ? "1 day ago" : `${d} days ago`; };

/** A reason a learner could read later: names the act and when it happened, never a trait or comparison. */
function reasonFor(rec: LessonRecord, now: number): string {
  const last = rec.recalls[rec.recalls.length - 1];
  if (!last) return `You finished this lesson ${ago(now - rec.completedAt)}.`;
  return last.correct ? `You got this right on a revisit ${ago(now - last.at)}.` : `You missed this on a revisit ${ago(now - last.at)}.`;
}

export type ReviewTimingRow = {
  slug: string; streak: number; lastAt: number; lastAct: "completed" | "recalled" | "missed";
  elapsedDays: number; waitDays: number | null; rule: string; due: boolean;
  /** Overdue ratio (now - last) / wait, the order key for lessons outside fixedDue. null when retired. */
  overdue: number | null;
  inFixedDue: boolean; served: number | null; reason: string;
};
export type ReviewTimingTrace = { policy: string; version: string; curvesVersion: string; slots: number;
  order: string; rows: ReviewTimingRow[]; decision: ReviewTimingDecision };

/**
 * The per-step trace (W-1504 style): every lesson in history, why it is or is not due, where it was served,
 * and the decision. Order (curves `order`, "fixedDue-first-then-most-overdue"): every fixedDue slug that is in
 * history, in fixedDue's order; then every other due lesson by overdue ratio descending, ties older `last`, then
 * slug; truncated to `slots`.
 */
export function explainReviewTiming(input: ReviewTimingInput, curves: Curves = REVIEW_TIMING_CURVES): ReviewTimingTrace {
  if (curves.order.value !== "fixedDue-first-then-most-overdue") throw new Error(`review-timing: unknown order ${String(curves.order.value)}`);
  const now = input.now;
  const fixed = new Set(input.fixedDue);
  const rows: ReviewTimingRow[] = records(input.history).map((rec) => {
    const t = timing(rec, now, curves);
    const overdue = t.waitDays === null ? null : t.waitDays > 0 ? (now - t.lastAt) / (t.waitDays * DAY) : Infinity;
    return { slug: rec.slug, streak: t.streak, lastAt: t.lastAt, lastAct: t.lastAct, elapsedDays: (now - t.lastAt) / DAY,
      waitDays: t.waitDays, rule: t.rule, due: t.due, overdue, inFixedDue: fixed.has(rec.slug), served: null, reason: reasonFor(rec, now) };
  });
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const first: ReviewTimingRow[] = [];
  for (const s of input.fixedDue) { const r = bySlug.get(s); if (r && !first.includes(r)) first.push(r); }
  const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  const rest = rows.filter((r) => r.due && !r.inFixedDue)
    .sort((a, b) => (b.overdue as number) - (a.overdue as number) || a.lastAt - b.lastAt || cmp(a.slug, b.slug));
  const slots = Number.isInteger(input.slots) && input.slots > 0 ? input.slots : 0;
  const served = [...first, ...rest].slice(0, slots);
  served.forEach((r, i) => { r.served = i; });
  return { policy: REVIEW_TIMING_NAME, version: REVIEW_TIMING_VERSION, curvesVersion: curves.version, slots, order: curves.order.value,
    rows, decision: { revisits: served.map((r) => ({ slug: r.slug, reason: r.reason })) } };
}

export const REVIEW_TIMING_POLICY: ReviewTimingPolicy = {
  name: REVIEW_TIMING_NAME,
  version: REVIEW_TIMING_VERSION,
  decide: (input: ReviewTimingInput): ReviewTimingDecision => explainReviewTiming(input).decision,
};
