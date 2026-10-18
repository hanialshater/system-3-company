// Founder attention per accepted outcome (definition: company/ops/metrics.md §C, analytics-steward).
// Assessment that asked for it: company/reviews/org/2026-10-17-external-assessment.md, Appendix B "Founder leverage".
//
// Pure functions over the event log, used by tools/metrics.mjs and tests/metrics/metrics.test.mjs.
//
// A founder *message* is a `founder` event with no `corrects` field (the transcript backfill writes these as tx-…).
// The log is append-only, so a message is classified by a later `founder` event that names it:
//   { type: "founder", actor: "chief-of-staff", corrects: "<message id>", class: "decision" | "correction" | "routing", minutes?: n }
// A hand-written founder message may carry `class` itself. The newest classification of a message wins.
// A message nobody classified counts as `unclassified`; it is never guessed.
//
// Accepted outcomes by task class:
//   lesson  = a checked lesson published: status published, and its current version has a fact-check record,
//             only "launch" learner verdicts, and a QA pass record (computed from meta.json + review records).
//   library = an adopted library improvement, opfix = a verified operational fix: counted only from events that
//             carry `accepted: "library" | "opfix"`, written by the role that accepted it (not the one that made it).

export const FOUNDER_CLASSES = ["decision", "correction", "routing"];
export const ACCEPTED_CLASSES = ["library", "opfix"];
/** Below this share of classified founder messages, the per-outcome ratio is not printed. */
export const MIN_CLASSIFIED_SHARE = 0.8;

const isMessage = (e) => e?.type === "founder" && !e.corrects;

/**
 * Founder messages by class over [since, until) (ISO strings; either may be null for open).
 * Returns { messages, decision, correction, routing, unclassified, minutes, minutesN, orphans }.
 * `orphans` counts classification events whose `corrects` names no founder message in the log.
 */
export function founderCounts(events, { since = null, until = null } = {}) {
  const ordered = [...events].filter((e) => e?.type === "founder").sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
  const msgs = new Map();
  for (const e of ordered) if (isMessage(e)) msgs.set(e.id, { ts: e.ts, cls: FOUNDER_CLASSES.includes(e.class) ? e.class : null, minutes: Number.isFinite(e.minutes) ? e.minutes : null });
  let orphans = 0;
  for (const e of ordered) {
    if (!e.corrects || !FOUNDER_CLASSES.includes(e.class)) continue;
    const m = msgs.get(e.corrects);
    if (!m) { orphans++; continue; }
    m.cls = e.class;
    if (Number.isFinite(e.minutes)) m.minutes = e.minutes;
  }
  const out = { messages: 0, decision: 0, correction: 0, routing: 0, unclassified: 0, minutes: 0, minutesN: 0, orphans };
  for (const m of msgs.values()) {
    if (since && String(m.ts) < since) continue;
    if (until && String(m.ts) >= until) continue;
    out.messages++;
    out[m.cls ?? "unclassified"]++;
    if (m.minutes != null) (out.minutes += m.minutes, out.minutesN++);
  }
  return out;
}

/** Accepted library improvements and operational fixes from `accepted` events, over [since, until). */
export function acceptedFromEvents(events, { since = null, until = null } = {}) {
  const out = { library: 0, opfix: 0 };
  const seen = new Set();
  for (const e of events) {
    if (!ACCEPTED_CLASSES.includes(e?.accepted) || seen.has(e.id)) continue;
    if (since && String(e.ts) < since) continue;
    if (until && String(e.ts) >= until) continue;
    seen.add(e.id);
    out[e.accepted]++;
  }
  return out;
}

/** True when a lesson row ({ l: meta, r: reviewVerdicts }) is a checked published lesson. */
export const isCheckedPublished = ({ l, r }) =>
  l.status === "published" && r.factCheck && r.qa && r.learner.length > 0 && r.learner.every((v) => v === "launch");

/** Classification began on this date: founder messages before it are unclassified and never backfilled. */
export const CLASSIFY_FROM = "2026-10-17";

/**
 * Checked lessons accepted in [since, …): a lesson is dated by the first `publish` event whose subjects name it.
 * Limitation: a launch-review publish event can list a lesson it held, so a held lesson may be dated early.
 */
export function lessonsAcceptedSince(events, checkedSlugs, since) {
  if (!since) return checkedSlugs.size;
  const first = new Map();
  for (const e of events) {
    if (e?.type !== "publish" || !Array.isArray(e.subjects)) continue;
    for (const s of e.subjects) if (checkedSlugs.has(s) && (!first.has(s) || String(e.ts) < first.get(s))) first.set(s, String(e.ts));
  }
  return [...first.values()].filter((ts) => ts >= since).length;
}

/**
 * Founder counts and accepted outcomes over the same period [since, now) (since null = all of the log).
 * `ratio` is each founder class per accepted outcome, or null with `why` when it would mislead.
 */
export function leverage(events, checkedSlugs, { since = null } = {}) {
  const f = founderCounts(events, { since });
  const a = acceptedFromEvents(events, { since });
  const lesson = lessonsAcceptedSince(events, checkedSlugs, since);
  const outcomes = lesson + a.library + a.opfix;
  const classified = f.decision + f.correction + f.routing;
  let ratio = null;
  let why = null;
  if (!f.messages) why = "no founder messages";
  else if (classified / f.messages < MIN_CLASSIFIED_SHARE) why = `only ${classified} of ${f.messages} founder messages classified (needs ${Math.round(MIN_CLASSIFIED_SHARE * 100)}%)`;
  else if (!outcomes) why = "no accepted outcomes";
  else ratio = { decision: f.decision / outcomes, correction: f.correction / outcomes, routing: f.routing / outcomes };
  return { since, founder: f, accepted: { lesson, ...a }, outcomes, ratio, why };
}

const r2 = (x) => Math.round(x * 100) / 100;
/** One text line (no leading label) for `npm run metrics`. */
export function leverageText(L) {
  const f = L.founder;
  const head = `founder messages ${f.messages}: decision ${f.decision} · correction ${f.correction} · routing ${f.routing} · unclassified ${f.unclassified}${f.minutesN ? ` · ${f.minutes} min recorded on ${f.minutesN}` : " · minutes not recorded"}${f.orphans ? ` · ${f.orphans} classification(s) name no message` : ""}`;
  const acc = `accepted outcomes ${L.outcomes}: checked lessons published ${L.accepted.lesson} · library improvements adopted ${L.accepted.library} · operational fixes verified ${L.accepted.opfix}`;
  const per = L.ratio
    ? `per accepted outcome: decision ${r2(L.ratio.decision)} · correction ${r2(L.ratio.correction)} · routing ${r2(L.ratio.routing)}`
    : `per accepted outcome: not computed (${L.why})`;
  return { head, acc, per };
}
