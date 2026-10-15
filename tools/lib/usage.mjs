// One usage figure per agent run (W-941 A1).
//
// The harness reports <subagent_tokens> and <duration_ms> as running totals for an agent, and a run
// that is resumed (SendMessage) finishes again and reports again. tools/events.mjs keys usage ids on the
// token count, so one run can leave 2-4 `usage` events, each cumulative. Summing them double counts.
//
// What the records support (checked 2026-10-15 against company/ops/events.jsonl): every usage event has
// an `agent` label (`<description> ·<4-hex hash of the harness agent id>`), every duplicated label has
// exactly one dispatch, and repeat records for a label are at most 30 minutes apart. So the run key is
// the agent label, and records for the same label further apart than the session window (12 h) count as
// separate runs, in case a label is ever reused. Within a run the record with the most tokens wins; the
// later record wins a tie. Token counts are not always monotone (a resume can report fewer tokens than
// the first finish), which is why this takes the max and not the last.
//
// Used by tools/metrics.mjs, tools/ops-health.mjs and tools/lib/ledger.mjs (ledger lines carry the same
// `agent` and `tokens`). Records without an agent label are kept as they are: nothing joins them.

export const SESSION_WINDOW_MS = 12 * 3600_000;

/**
 * Collapse usage-like records (`{ts, agent, tokens}`) to one per run, keeping the max-tokens record.
 * Records with no numeric `tokens` (stopped runs, unmeasured ledger lines) pass through unchanged.
 * Returns the kept records in their original order.
 */
export function dedupeUsage(records, { windowMs = SESSION_WINDOW_MS } = {}) {
  const runs = new Map(); // label -> [{ last, best }]
  const keep = new Set();
  const order = records.map((r, i) => ({ r, i })).sort((a, b) => String(a.r.ts).localeCompare(String(b.r.ts)) || a.i - b.i);
  for (const { r, i } of order) {
    if (typeof r.tokens !== "number" || !r.agent) {
      keep.add(i);
      continue;
    }
    const t = Date.parse(r.ts);
    const list = runs.get(r.agent) ?? [];
    let run = list.find((x) => Math.abs(t - x.last) <= windowMs);
    if (!run) list.push((run = { last: t, best: null }));
    run.last = Math.max(run.last, t);
    if (!run.best || r.tokens >= run.best.r.tokens) run.best = { r, i };
    runs.set(r.agent, list);
  }
  for (const list of runs.values()) for (const run of list) keep.add(run.best.i);
  return records.filter((_, i) => keep.has(i));
}

/** Sum of tokens after dedupe: the corrected total. */
export const totalTokens = (records) => dedupeUsage(records).reduce((n, r) => n + (typeof r.tokens === "number" ? r.tokens : 0), 0);
