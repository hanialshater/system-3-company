// In-flight dispatches from the event log (r5-tools B2; W-1195, W-1280; record
// company/engineering/readiness/2026-10-16-inflight-key-match.md).
//
// Before this, dispatch-check kept one open dispatch per agent label and closed it only on a report or stopped
// event with the SAME label. A run is often logged twice under two labels: the chief of staff's hand dispatch
// (ev-, "tools-lead: guard fixes r3 B1") and the transcript backfill's (tx-, "[project:maintenance] Tools r3 B1:
// guard fixes ·af1d"). The hand report closed only the hand label, so the tx- dispatch stayed open until the
// 6 h stale rule, and the chief of staff closed 11 by hand at 2026-10-16T13:08Z.
//
// Now a report or stopped event closes ONE open dispatch, the first rule that matches (oldest open run first):
//   1. strong key  the same run key: an explicit `key` field (events.mjs --key, or the backfill's tool_use id), the
//                  hook's `toolUseId`, or (dispatch side only, for a hand --key=xxxx) the `·xxxx` suffix of a tx-/hk-
//                  label. A report also carries the tool-use ids of the latest dispatch that has its label.
//   2. label       the same agent label (today's rule). A label is as specific as a key, so it comes before 3.
//   3. batch key   the same batch item, `batch=<file>#B<n>`: the dispatch's `source`, else the first batch ref in its
//                  summary, else in its body (the prompt); for a report, its `key`, else the first ref in its summary,
//                  else the batch key of the latest dispatch with its label (the hand-dispatch twin's key).
// Nothing closes a dispatch without one of these matches, so the count never drops on a guess: a run that may be
// finished but matches nothing is listed by dispatch-check as "possibly finished", never dropped.
// As before, a second dispatch with an open label is the same run (SendMessage continuations), not a new one.

import path from "node:path";

const SUFFIX = / ·([0-9a-f]{4})$/;
const BATCH_RE = /batch=([^\s#`"')\]]*?\.md)#B(\d+)\b/g;

/** The first `batch=<file>#B<n>` in a text as a normalized key "batch:<file name tail>#B<n>", or null. */
export function batchKeyOf(text) {
  if (!text) return null;
  BATCH_RE.lastIndex = 0;
  const m = BATCH_RE.exec(String(text));
  if (!m) return null;
  const tail = m[1].split(/[/…]/).pop();
  return tail && tail.length > 3 ? `batch:${tail}#B${m[2]}` : null;
}

/** Two batch keys name the same item: same item number, and one file name is the other or ends with "-<other>"
 * (the chief of staff's `batch=…r3-research.md#B2` short form; a bare word with no "-" never matches by suffix). */
export function sameBatch(a, b) {
  if (!a || !b) return false;
  const [fa, ia] = a.slice(6).split("#B"), [fb, ib] = b.slice(6).split("#B");
  if (ia !== ib) return false;
  if (fa === fb) return true;
  const [long, short] = fa.length >= fb.length ? [fa, fb] : [fb, fa];
  return short.includes("-") && long.endsWith("-" + short);
}

/** Classify one explicit key: "tu:<tool use id or opaque id>", "sx:<4 hex>" or a batch key. */
export function normalizeKey(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (/^batch=/.test(s)) return batchKeyOf(s);
  const hex = /^·?([0-9a-f]{4})$/.exec(s);
  if (hex) return `sx:${hex[1]}`;
  return `tu:${s}`;
}

/** The keys an event carries: { strong: Set<string>, batch: string|null }. */
export function keysOf(e, { asReport = false } = {}) {
  const strong = new Set();
  let batch = null;
  for (const k of String(e?.key ?? "").split(",").map(normalizeKey).filter(Boolean)) {
    if (k.startsWith("batch:")) batch ??= k;
    else strong.add(k);
  }
  if (e?.toolUseId) strong.add(`tu:${e.toolUseId}`);
  // A label's own ·xxxx suffix is a key of the DISPATCH only, for a hand `--key=xxxx`. Four hex digits collide
  // between runs (1 in 65,536 per pair), so a report's label suffix is never matched by itself: rule 2 (label) does that.
  const sx = asReport ? null : SUFFIX.exec(String(e?.agent ?? ""))?.[1];
  if (sx) strong.add(`sx:${sx}`);
  if (!batch) batch = asReport ? batchKeyOf(e?.summary) : batchKeyOf(e?.source) ?? batchKeyOf(e?.summary) ?? batchKeyOf(e?.body);
  return { strong, batch };
}

const intersects = (a, b) => { for (const x of a) if (b.has(x)) return true; return false; };

/** The best key to name a run with on a command line: a strong key without its prefix, else the batch key. */
export function keyArg(run) {
  const tu = [...run.keys.strong].find((k) => k.startsWith("tu:"));
  const sx = [...run.keys.strong].find((k) => k.startsWith("sx:"));
  if (tu) return tu.slice(3);
  if (sx) return sx.slice(3);
  if (run.keys.batch) { const [f, n] = run.keys.batch.slice(6).split("#B"); return `batch=${f}#B${n}`; }
  return null;
}

/**
 * Replay events (any order; sorted by ts here) and return the open runs.
 * Returns { open: Run[], closes: [{ event, run, rule }], unmatched: Event[], match(e) }.
 * Run = { label, dispatch (latest dispatch event of the run), first (its first dispatch ts), keys }.
 * match(e) says which open run a new report/stopped event would close, without changing anything.
 */
export function replay(events) {
  const sorted = events.filter((e) => typeof e?.ts === "string").sort((a, b) => a.ts.localeCompare(b.ts));
  const open = [];
  const lastByLabel = new Map(); // label -> keys of the latest dispatch with that label (open or closed)
  const closes = [];
  const unmatched = [];

  const pick = (e) => {
    const own = keysOf(e, { asReport: true });
    const inh = e.agent ? lastByLabel.get(e.agent) : null;
    // Inherited from the label's dispatch: tool-use ids only (never its 4-hex suffix, see keysOf).
    const strong = new Set([...own.strong, ...[...(inh?.strong ?? [])].filter((k) => k.startsWith("tu:"))]);
    let run = strong.size ? open.find((r) => intersects(r.keys.strong, strong) && r.label === e.agent) ?? open.find((r) => intersects(r.keys.strong, strong)) : null;
    if (run) return { run, rule: "key" };
    run = e.agent ? open.find((r) => r.label === e.agent) : null;
    if (run) return { run, rule: "label" };
    const b = own.batch ?? inh?.batch ?? null;
    run = b ? open.find((r) => sameBatch(r.keys.batch, b)) : null;
    if (run) return { run, rule: "batch" };
    return null;
  };

  for (const e of sorted) {
    if (e.type === "dispatch") {
      if (!e.agent) continue;
      const k = keysOf(e);
      const run = open.find((r) => r.label === e.agent);
      if (run) {
        run.dispatch = e;
        for (const s of k.strong) run.keys.strong.add(s);
        run.keys.batch ??= k.batch;
      } else open.push({ label: e.agent, dispatch: e, first: e.ts, keys: { strong: new Set(k.strong), batch: k.batch } });
      const prev = lastByLabel.get(e.agent);
      lastByLabel.set(e.agent, { strong: new Set([...(prev?.strong ?? []), ...k.strong]), batch: k.batch ?? prev?.batch ?? null });
    } else if (e.type === "report" || e.type === "stopped") {
      if (!e.agent && !e.key) continue;
      const m = pick(e);
      if (m) {
        open.splice(open.indexOf(m.run), 1);
        closes.push({ event: e, run: m.run, rule: m.rule });
      } else unmatched.push(e);
    }
  }
  return { open, closes, unmatched, match: pick };
}

/** The open runs closest to a label (word overlap, then age): for "no open dispatch matches" warnings. */
export function nearest(open, label, n = 3) {
  const words = (s) => new Set(String(s ?? "").toLowerCase().replace(/ ·[0-9a-f]{4}$/, "").split(/[^a-z0-9]+/).filter((w) => w.length > 1));
  const want = words(label);
  return open
    .map((r) => ({ r, score: [...words(r.label)].filter((w) => want.has(w)).length }))
    .sort((a, b) => b.score - a.score || b.r.dispatch.ts.localeCompare(a.r.dispatch.ts))
    .slice(0, n)
    .map((x) => x.r);
}

export const ageText = (ms) => (ms < 3.6e6 ? `${Math.round(ms / 6e4)} min` : `${(ms / 3.6e6).toFixed(1)} h`);

/** A shell-safe double-quoted argument. */
export const q = (s) => `"${String(s).replace(/(["\\$`])/g, "\\$1")}"`;

/** The command that closes one run by hand. */
export function stoppedCommand(run) {
  const key = keyArg(run);
  return `node tools/events.mjs stopped --agent=${q(run.label)}${key ? ` --key=${q(key)}` : ""} --actor=chief-of-staff --summary=${q("Closed by chief of staff: finished, its report matched no dispatch (dispatch-check: possibly finished)")}`;
}

/**
 * Open runs older than `minH` hours (and younger than staleH, so still counted) with no live slot and no spool
 * activity after their dispatch. They stay in the count; this only lists them.
 * slotsLive: slot records ({agent, source}); spoolEvents: the hook spool's events.
 */
export function possiblyFinished(open, { now = Date.now(), minH = 2, staleH = 6, slotsLive = [], spoolEvents = [], closes = [] } = {}) {
  const out = [];
  for (const r of open) {
    const age = now - Date.parse(r.dispatch.ts);
    if (!(age > minH * 3.6e6 && age < staleH * 3.6e6)) continue;
    const base = r.label.replace(SUFFIX, "");
    const hasSlot = slotsLive.some((s) => (s.agent && (s.agent === r.label || s.agent === base)) || (r.keys.batch && sameBatch(batchKeyOf(s.source), r.keys.batch)));
    if (hasSlot) continue;
    const active = spoolEvents.some((e) => e !== r.dispatch && e?.id !== r.dispatch.id && typeof e?.ts === "string" && e.ts > r.dispatch.ts && (e.agent === r.label || intersects(keysOf(e).strong, r.keys.strong)));
    if (active) continue;
    // Evidence for the reader, never a close by itself (a second dispatch of one item may be a rerun):
    // another open dispatch of the same batch item, or one of the same item that has already reported.
    const twin = open.find((o) => o !== r && r.keys.batch && sameBatch(o.keys.batch, r.keys.batch));
    const done = r.keys.batch ? closes.filter((c) => c.run !== r && sameBatch(c.run.keys.batch, r.keys.batch) && c.event.ts > r.first).at(-1) : null;
    out.push({ run: r, ageMs: age, twin: twin?.label ?? null, twinReported: done ? { label: done.run.label, ts: done.event.ts, id: done.event.id } : null, command: stoppedCommand(r) });
  }
  return out;
}

/** The newest hk- (hook-written) event in a list, or null. */
export function lastHookEvent(events) {
  let best = null;
  for (const e of events) if (typeof e?.id === "string" && e.id.startsWith("hk-") && typeof e.ts === "string" && (!best || e.ts > best.ts)) best = e;
  return best;
}

export const relRoot = (root, f) => { const r = path.relative(root, f); return !r || r.startsWith("..") ? f : r; };
