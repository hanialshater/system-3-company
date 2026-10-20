#!/usr/bin/env node
// EXP-009 reconciliation: how much of what independently happened is in the event log and the ledger?
// Experiment: company/experiments/EXP-009-meta-measurement-integrity.md · notes: company/experiments/EXP-009/build-notes.md
// Founder rule (code over agent judgment): company/decisions/2026-10-20-founder-code-over-agent-judgment.md
//
//   node tools/reconcile.mjs --from=<ISO> --to=<ISO> [--window-min=30] [--json] [--stamp]
//        [--root=<dir>] [--events=<file>] [--ledger=<file>] [--mailboxes=<dir>]
//
// Two halves that never mix:
//   1. The INDEPENDENT list is built only from files that are not events.jsonl or ledger.jsonl (extract* functions):
//      dispatch requests, role memory entries, records naming a run label, git commits, founder quotes, lesson
//      meta.json status changes in git, releases.json, and mailbox markers when that spool exists.
//   2. The RECORD (events.jsonl + ledger.jsonl) is read only to match against (buildEventRuns, match*).
// Every number in the output is computed here; nothing is counted by hand. Same inputs (files + git HEAD) give
// identical output: everything is sorted, and the clock appears only with --stamp.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dedupeUsage, SESSION_WINDOW_MS } from "./lib/usage.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_ROOT = path.resolve(HERE, "..");

// ------------------------------------------------------------------ named parameters (judgment lives here, in the open)

export const PARAMS = Object.freeze({
  // WBR 10-17 A1: the last `usage` event in the log is 2026-10-16T15:27:53Z. Usage coverage is split here.
  USAGE_STOP: "2026-10-16T15:27:53.504Z",
  // First founder-type event written after the transcript backfill ended (company/ops/events.jsonl, ev- ids).
  FOUNDER_LOG_START: "2026-10-17T21:06:55.250Z",
  // EXP-009 P6: publish coverage "after 2026-10-16" = on or after 2026-10-17T00:00Z.
  PUBLISH_SPLIT: "2026-10-17T00:00:00.000Z",
  // A run with a dispatch but no report/stopped/usage is treated as open for this long after its dispatch.
  OPEN_RUN_MS: 6 * 3600_000,
  // Commits by the same role closer than this belong to one run.
  COMMIT_CLUSTER_MS: 90 * 60_000,
  // A founder quote carries a day; a founder event may be written up to this many days from it.
  FOUNDER_DAY_SLACK: 1,
  // A lesson-slug publish match must be within this of the status commit.
  PUBLISH_SLUG_SLACK_MS: 24 * 3600_000,
  // Token-overlap threshold for a founder text match when no prefix matches.
  FOUNDER_JACCARD: 0.6,
  // Spread check (EXP-009 "Matching errors"): windows rerun and the threshold that flags a matching problem.
  SPREAD_WINDOWS_MIN: [10, 60],
  SPREAD_FLAG_POINTS: 5,
});

// The fixed, coded cause list. Rules are tried in this order; the first that applies wins. "unknown" stays unknown.
export const CAUSES = Object.freeze({
  "usage-after-stop": "after usage stop 10-16T15:27Z (no usage event or ledger line is written after it)",
  "usage-day-straddles-stop": "run known only by day (10-16), which straddles the usage stop",
  "founder-option-pick": "the quote is a picked option label ending '(Recommended)', not a typed message",
  "founder-before-log-start": "before founder logging start 10-17T21:06Z: the quote's day overlaps the unlogged interval after the transcript backfill's last founder event",
  "founder-events-are-summaries": "after founder logging start every founder event is a chief-of-staff summary, never the founder's words, so no text can match",
  "publish-after-last-event": "no publish event after the last one in the log",
  "publish-event-unnamed": "a publish event exists within the window but names neither the lesson nor the commit",
  "dispatch-missing-run-reported": "the run has report/usage records but no dispatch event",
  "report-stopped-instead": "the run was closed by a stopped event, not a report",
  "role-runs-claimed": "event runs of this role are in range, but each is already matched to another item from the same source",
  "outside-window": "an event run of this role exists that day, but outside the time window",
  "after-transcript-backfill": "after the last transcript-backfilled event (tx- ids); later runs are only in the log if written by hand",
  "no-role": "the independent item names no role, so only a label or mail id could match it",
  unknown: "unknown",
});

// The main session is not a dispatched run: its memory entries and commits are not run items.
export const MAIN_SESSION_ROLES = new Set(["chief-of-staff", "founder"]);

// ------------------------------------------------------------------ small helpers

const ms = (s) => (s == null ? NaN : Date.parse(s));
const iso = (t) => new Date(t).toISOString();
const DAY = 86400_000;
const dayStart = (d) => Date.parse(`${d}T00:00:00.000Z`);
const dayOf = (t) => iso(t).slice(0, 10);
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
export const norm = (s) => String(s ?? "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const tokens = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 1));
export function jaccard(a, b) {
  const A = tokens(a), B = tokens(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const x of A) if (B.has(x)) n++;
  return n / (A.size + B.size - n);
}
const LABEL_SUFFIX = /·([0-9a-f]{4})\s*$/;
export const labelSuffix = (label) => (String(label ?? "").match(LABEL_SUFFIX) || [])[1] ?? null;
const readText = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null);
const listDir = (d) => (fs.existsSync(d) ? fs.readdirSync(d).sort() : []);

/** Parse --to/--from; a value with minutes but no seconds covers the whole minute when it is the end. */
export function parseWindow(from, to) {
  const f = ms(from), t0 = ms(to);
  if (!Number.isFinite(f) || !Number.isFinite(t0)) throw new Error("--from and --to must be ISO timestamps");
  const t = /T\d\d:\d\dZ$/.test(String(to)) ? t0 + 59_999 : t0;
  return { from: f, to: t, fromDay: dayOf(f), toDay: dayOf(t) };
}
const inWin = (t, w) => t >= w.from && t <= w.to;
const dayInWin = (d, w) => d >= w.fromDay && d <= w.toDay;

// An item's time: minute precision (t) or day precision (day). span() gives its earliest/latest possible instant.
const span = (it) => (it.t != null ? [it.t, it.t] : [dayStart(it.day), dayStart(it.day) + DAY - 1]);

// ------------------------------------------------------------------ git (injectable for fixtures)

export function gitRunner(root) {
  const run = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 512 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  return {
    head() { try { return run(["rev-parse", "HEAD"]).trim(); } catch { return null; } },
    shallow() { try { return run(["rev-parse", "--is-shallow-repository"]).trim() === "true"; } catch { return false; } },
    horizon() { try { const l = run(["log", "--format=%aI", "--max-parents=0"]).trim().split("\n").filter(Boolean); return l.length ? iso(Math.min(...l.map(ms))) : null; } catch { return null; } },
    /** Non-merge commits: [{sha, ts, parents, message}] */
    commits(sinceIso) {
      let out;
      try { out = run(["log", "--no-merges", `--since=${sinceIso}`, "--format=%x1e%H%x1f%aI%x1f%P%x1f%B"]); } catch { return []; }
      return out.split("\x1e").filter((x) => x.trim()).map((rec) => {
        const [sha, ts, parents, message] = rec.split("\x1f");
        return { sha: sha.trim(), ts: iso(ms(ts)), parents: parents.trim() ? parents.trim().split(" ") : [], message: (message ?? "").trim() };
      });
    },
    /** Raw `git log -p -U0` of lesson meta.json status lines. */
    statusDiffs(sinceIso) {
      try { return run(["log", "--no-merges", "-p", "-U0", `--since=${sinceIso}`, "--format=@@C %H %aI %P", "-G\"status\"", "--", "src/demos/*/*/meta.json"]); } catch { return ""; }
    },
  };
}

// ------------------------------------------------------------------ 1. INDEPENDENT LIST (never reads events.jsonl or ledger.jsonl)

/** Role ids from the org data (tools/org/roles.mjs), or a fixture list. */
export async function loadRoles(root) {
  const f = path.join(root, "tools/org/roles.mjs");
  if (!fs.existsSync(f)) return [];
  const m = await import(pathToFileURL(f).href);
  return (m.roles ?? []).map((r) => r.id).filter(Boolean).sort();
}

/**
 * Rule DR (dispatch requests). company/ops/dispatch-requests/<date>-<lane>.md: the "## B<n> · title" items give each
 * item's `role:`; the "## Dispatched…" section says what actually ran. Each bullet is split into sentences. A sentence
 * counts as dispatched when it has "→" or the word "dispatched" (not "not dispatched"), and none of
 * waits/waiting/queued/held/refused/"next round". Its item ids are the B<n>/A<n> tokens in it; the role is the
 * "→ <role>" after an id, else the one "→ <role>" in the sentence, else the item's `role:`. Time: "~HH:MMZ" in the
 * sentence, else in the section heading, else the file's day. "reported/returned/committed/integrated" marks it ended.
 */
export function extractDispatchRequests(root, win, roleSet) {
  const dir = path.join(root, "company/ops/dispatch-requests");
  const out = [];
  for (const name of listDir(dir).filter((f) => f.endsWith(".md"))) {
    const day = (name.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (!day || !dayInWin(day, win)) continue;
    const lines = readText(path.join(dir, name)).split("\n");
    const itemRole = {};
    let cur = null;
    for (const l of lines) {
      const h = l.match(/^## ([AB]\d+[a-z]?) · /);
      if (h) { cur = h[1]; continue; }
      if (/^## /.test(l)) cur = null;
      const r = cur && l.match(/^role:\s*([a-z0-9-]+)/);
      if (r) itemRole[cur] = r[1];
    }
    let inSec = false, secTime = null;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (/^## Dispatched/.test(l)) { inSec = true; secTime = hhmm(l); continue; }
      if (/^## /.test(l)) { inSec = false; continue; }
      if (!inSec || !/^\s*- /.test(l)) continue;
      for (const sent of l.replace(/^\s*- /, "").split(/(?<=[.;])\s+(?=[*A-Z])/)) {
        const s = sent.replace(/\*\*/g, "");
        if (/\b(wait|waits|waiting|queued|held|refused|next round)\b/i.test(s)) continue;
        if (!(s.includes("→") || (/\bdispatched\b/i.test(s) && !/\bnot dispatched\b/i.test(s)))) continue;
        const ids = [...new Set([...s.matchAll(/\b([AB]\d+)\b/g)].map((m) => m[1]))];
        if (!ids.length) continue;
        const arrows = [...s.matchAll(/→\s*([a-z0-9-]+)/g)].map((m) => m[1]).filter((x) => roleSet.has(x));
        const t = hhmm(s) ?? secTime;
        for (const id of ids) {
          const pair = s.match(new RegExp(`\\b${id}\\b[^→.;]{0,40}→\\s*([a-z0-9-]+)`));
          const role = (pair && roleSet.has(pair[1]) ? pair[1] : null) ?? (arrows.length === 1 ? arrows[0] : null) ?? itemRole[id] ?? null;
          const tt = t ? Date.parse(`${day}T${t}:00.000Z`) : null;
          out.push({ source: "dispatch-request", ref: `company/ops/dispatch-requests/${name}:${i + 1}#${id}`, role, t: tt, day, ended: /\b(reported|returned|committed|integrated)\b/i.test(s) });
        }
      }
    }
  }
  return out.filter((x) => (x.t == null ? dayInWin(x.day, win) : inWin(x.t, win)));
}
const hhmm = (s) => { const m = String(s).match(/~?\b(\d{1,2}):(\d{2})Z\b/); return m ? `${m[1].padStart(2, "0")}:${m[2]}` : null; };

/**
 * Rule ME (memory entries). company/roles/memory/<role>/<date>-<runkey>.md, one per run (F-39), except the main-session
 * roles (MAIN_SESSION_ROLES). Header
 * "### <date> · <runkey> · <by-or-role>". Day precision; ended (offboarding is the last step of a run). A 4-hex
 * label suffix in the header becomes a label key.
 */
export function extractMemoryEntries(root, win) {
  const base = path.join(root, "company/roles/memory");
  const out = [];
  for (const role of listDir(base)) {
    if (MAIN_SESSION_ROLES.has(role)) continue;
    const d = path.join(base, role);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of listDir(d).filter((x) => x.endsWith(".md"))) {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
      if (!m || !dayInWin(m[1], win)) continue;
      const head = (readText(path.join(d, f)).split("\n").find((l) => l.startsWith("### ")) ?? "").slice(4);
      const parts = head.split(" · ");
      out.push({ source: "memory", ref: `company/roles/memory/${role}/${f}`, role, t: null, day: m[1], ended: true, runkey: parts[1] ?? m[2], suffix: labelSuffix(parts.slice(2).join(" · ")) });
    }
  }
  return out;
}

/**
 * Rule RR (records naming a run). Review, readiness and ritual records dated in the window that write a run label
 * "<text> ·<4 hex>". The suffix is the key; one item per distinct suffix per file. Day = the file's date prefix.
 */
export function extractRecordLabels(root, win) {
  const dirs = ["company/reviews", "company/engineering/readiness", "company/rituals/records"];
  const out = [];
  const walk = (d) => listDir(d).flatMap((n) => { const p = path.join(d, n); return fs.statSync(p).isDirectory() ? walk(p) : n.endsWith(".md") ? [p] : []; });
  for (const rel of dirs) {
    for (const f of walk(path.join(root, rel))) {
      const day = (path.basename(f).match(/^(\d{4}-\d{2}-\d{2})/) || [])[1];
      if (!day || !dayInWin(day, win)) continue;
      const seen = new Set();
      for (const m of readText(f).matchAll(/·([0-9a-f]{4})\b/g)) seen.add(m[1]);
      for (const s of [...seen].sort()) out.push({ source: "record-label", ref: `${path.relative(root, f)}#·${s}`, role: null, t: null, day, ended: true, suffix: s });
    }
  }
  return out;
}

/**
 * Rule GC (git commits naming a role run). Non-merge commits whose subject starts "<role>:" (a known role, not
 * chief-of-staff or founder, which are the main session) or "memory: <role> …". Commits by one role closer than
 * COMMIT_CLUSTER_MS form one run; its time is the last commit's author time (minute precision, ended).
 */
export function extractCommitRuns(commits, win, roleSet) {
  const skip = MAIN_SESSION_ROLES;
  const hits = [];
  for (const c of commits) {
    if (c.parents.length > 1) continue;
    const t = ms(c.ts);
    if (!inWin(t, win)) continue;
    const subj = c.message.split("\n")[0];
    let role = (subj.match(/^([a-z0-9-]+):/) || [])[1];
    if (role === "memory") role = (subj.match(/^memory:\s*([a-z0-9-]+)/) || [])[1];
    if (!role || !roleSet.has(role) || skip.has(role)) continue;
    hits.push({ role, t, sha: c.sha });
  }
  hits.sort((a, b) => cmp(a.role, b.role) || a.t - b.t || cmp(a.sha, b.sha));
  const out = [];
  for (const h of hits) {
    const last = out[out.length - 1];
    if (last && last.role === h.role && h.t - last.t <= PARAMS.COMMIT_CLUSTER_MS) { last.t = h.t; last.shas.push(h.sha.slice(0, 10)); continue; }
    out.push({ source: "commit", role: h.role, t: h.t, day: null, ended: true, shas: [h.sha.slice(0, 10)] });
  }
  return out.map((x) => ({ ...x, day: dayOf(x.t), ref: `git:${x.shas.join(",")}` }));
}

/**
 * Rule MB (mailbox markers). company/ops/mailboxes/<role>/<id>.md requests (kind dispatch-request) with a
 * `<id>.claimed` marker in state launched; `<id>.done` marks it ended. Gitignored spool: absent in most checkouts,
 * and absence is reported, not an error.
 */
export function extractMailboxes(dir, win) {
  if (!dir || !fs.existsSync(dir)) return { present: false, items: [] };
  const items = [];
  for (const box of listDir(dir)) {
    const d = path.join(dir, box);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of listDir(d).filter((x) => x.endsWith(".md"))) {
      const id = f.slice(0, -3);
      const fm = {};
      const text = readText(path.join(d, f));
      const m = text.match(/^---\n([\s\S]*?)\n---/);
      if (m) for (const l of m[1].split("\n")) { const k = l.match(/^([a-z-]+):\s*(.*)$/); if (k) fm[k[1]] = k[2].trim(); }
      if (fm.kind !== "dispatch-request") continue;
      let claimed = null;
      try { claimed = JSON.parse(readText(path.join(d, `${id}.claimed`))); } catch { claimed = null; }
      if (!claimed || (claimed.state ?? "launched") !== "launched") continue;
      const t = ms(claimed.launchedAt ?? claimed.ts ?? fm.ts);
      if (!Number.isFinite(t) || !inWin(t, win)) continue;
      items.push({ source: "mailbox", ref: `mail:${fm.id ?? id}`, mail: fm.id ?? id, role: fm.role ?? null, t, day: dayOf(t), ended: fs.existsSync(path.join(d, `${id}.done`)) });
    }
  }
  return { present: true, items };
}

const QUOTE = /["“]([^"”\n]{2,400})["”]/g;
/**
 * Rule FQ (founder quotes). FQ1: "Founder verbatim …:" followed by quoted text on the line, or by "> " lines.
 * FQ2: "founder … said/asked/wrote/replied/answered/picked/chose/typed/approved…:" right before a quote, or
 * "Founder:" / "(founder: " before a quote. FQ3 (files named *founder*): "> " blockquote lines in the first 25
 * lines (their quoted part if any). Returns raw quotes; dedupeFounderQuotes merges repeats.
 */
export function quotesInText(text, { blockquotes = false } = {}) {
  const lines = text.split("\n");
  const out = [];
  const lead = /\bfounder\b(?:\s*\([^)]*\))?[^"“\n]{0,40}?(?:\b(?:said|says|asked|wrote|replied|answered|picked|chose|typed|approved|messaged)\b[^"“\n]{0,12}?|:)\s*(?:\*\*)?\s*$/i;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const verb = l.match(/Founder verbatim[^:]*:\s*(.*)$/);
    if (verb) {
      const qs = [...verb[1].matchAll(QUOTE)].map((m) => m[1]);
      if (qs.length) qs.forEach((q) => out.push({ text: q, line: i + 1, rule: "FQ1" }));
      else for (let j = i + 1; j < lines.length && /^>\s?/.test(lines[j]); j++) out.push({ text: lines[j].replace(/^>\s?/, "").trim(), line: j + 1, rule: "FQ1" });
      continue;
    }
    for (const m of l.matchAll(QUOTE)) {
      if (lead.test(l.slice(0, m.index))) out.push({ text: m[1], line: i + 1, rule: "FQ2" });
    }
    if (blockquotes && i < 25 && /^>\s?/.test(l)) {
      const body = l.replace(/^>\s?/, "").trim();
      const q = [...body.matchAll(QUOTE)].map((m) => m[1]);
      out.push({ text: q.length ? q[0] : body, line: i + 1, rule: "FQ3" });
    }
  }
  return out.filter((q) => norm(q.text).length >= 2);
}
const quoteDay = (text, fallback) => (String(text).match(/\((\d{4}-\d{2}-\d{2})/) || [])[1] ?? fallback;

/** FQ over company/decisions/<date>-*.md in the window. */
export function extractFounderDecisions(root, win) {
  const dir = path.join(root, "company/decisions");
  const out = [];
  for (const f of listDir(dir).filter((x) => x.endsWith(".md"))) {
    const day = (f.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (!day || !dayInWin(day, win)) continue;
    const text = readText(path.join(dir, f));
    for (const q of quotesInText(text, { blockquotes: /founder/.test(f) })) {
      const d = quoteDay(text.split("\n")[q.line - 1], day);
      out.push({ source: "decision", ref: `company/decisions/${f}:${q.line}`, rule: q.rule, text: q.text, day: d });
    }
  }
  return out.filter((q) => dayInWin(q.day, win));
}

/** FQ2 over company/ops/progress.md handoffs ("## <date> · <role> · …") dated in the window. */
export function extractFounderProgress(root, win) {
  const text = readText(path.join(root, "company/ops/progress.md")) ?? "";
  const lines = text.split("\n");
  const out = [];
  let day = null, start = 0;
  const flush = (end) => {
    if (!day || !dayInWin(day, win)) return;
    for (const q of quotesInText(lines.slice(start, end).join("\n"))) out.push({ source: "progress", ref: `company/ops/progress.md:${start + q.line}`, rule: q.rule, text: q.text, day });
  };
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^## (\d{4}-\d{2}-\d{2}) · /);
    if (h) { flush(i); day = h[1]; start = i; }
  }
  flush(lines.length);
  return out;
}

/** FQ2 over commit messages in the window (day precision: a commit is written after the message). */
export function extractFounderCommits(commits, win) {
  const out = [];
  for (const c of commits) {
    if (!inWin(ms(c.ts), win)) continue;
    for (const q of quotesInText(c.message)) out.push({ source: "commit", ref: `git:${c.sha.slice(0, 10)}`, rule: q.rule, text: q.text, day: dayOf(ms(c.ts)) });
  }
  return out;
}

/** One founder item per distinct message: key = first 60 normalized chars; earliest day wins; refs are kept. */
export function dedupeFounderQuotes(quotes) {
  const by = new Map();
  for (const q of [...quotes].sort((a, b) => cmp(a.day, b.day) || cmp(a.ref, b.ref))) {
    const k = norm(q.text).slice(0, 60);
    const have = by.get(k);
    if (have) { have.refs.push(q.ref); continue; }
    by.set(k, { key: k, text: q.text, day: q.day, refs: [q.ref], rule: q.rule });
  }
  return [...by.values()].sort((a, b) => cmp(a.day, b.day) || cmp(a.key, b.key));
}

/**
 * Rule PB (publishes). In `git log -p -U0` of src/demos/<domain>/<slug>/meta.json: a file whose diff in a commit adds
 * `"status": "published"` and does not remove it. The shallow root commit (no parents) is the clone boundary, not a
 * publish, and is skipped. Minute precision (author time).
 */
export function extractPublishes(raw, win) {
  const out = [];
  let c = null, file = null, plus = false, minus = false;
  const end = () => { if (c && file && plus && !minus && c.parents.length && inWin(c.t, win)) out.push({ source: "meta-status", slug: file.split("/")[3], path: file, sha: c.sha, t: c.t, day: dayOf(c.t), ref: `git:${c.sha.slice(0, 10)}:${file}` }); file = null; plus = minus = false; };
  for (const l of String(raw).split("\n")) {
    const h = l.match(/^@@C (\S+) (\S+) ?(.*)$/);
    if (h) { end(); c = { sha: h[1], t: ms(h[2]), parents: h[3].trim() ? h[3].trim().split(" ") : [] }; continue; }
    const d = l.match(/^diff --git a\/(\S+) b\/(\S+)/);
    if (d) { end(); file = d[2]; continue; }
    if (/^\+\s*"status":\s*"published"/.test(l)) plus = true;
    if (/^-\s*"status":\s*"published"/.test(l)) minus = true;
  }
  end();
  return out.sort((a, b) => a.t - b.t || cmp(a.path, b.path));
}

/** Rule RL (releases). company/ops/releases.json entries dated in the window. */
export function extractReleases(root, win) {
  let j;
  try { j = JSON.parse(readText(path.join(root, "company/ops/releases.json"))); } catch { return []; }
  return (j.releases ?? []).filter((r) => inWin(ms(r.date), win)).map((r) => ({ source: "releases", version: r.version, sha: String(r.commit ?? ""), t: ms(r.date), day: dayOf(ms(r.date)), ref: `company/ops/releases.json#${r.version}` }));
}

// ------------------------------------------------------------------ 2. THE RECORD (matched against, never a source of items)

export function readJsonl(file) {
  const text = readText(file);
  if (!text) return [];
  const out = [];
  for (const l of text.split("\n")) { if (!l.trim()) continue; try { out.push(JSON.parse(l)); } catch { /* skipped, as tools/events.mjs E1 */ } }
  return out;
}

const roleOfDispatch = (e, roleSet) => {
  if (Array.isArray(e.subjects) && roleSet.has(e.subjects[0])) return e.subjects[0];
  const m = String(e.summary ?? "").match(/^(?:Dispatch|Message to) ([a-z0-9-]+)\b/) || String(e.agent ?? "").match(/^([a-z0-9-]+):/);
  return m && roleSet.has(m[1]) ? m[1] : null;
};

/**
 * Event runs: dispatch/report/stopped/usage events and ledger lines grouped by run key (agent label, else `key`,
 * else the event id), split when records of one key are more than SESSION_WINDOW_MS apart (as dedupeUsage does).
 * Usage is the union of usage events and ledger lines after dedupeUsage, so a resumed run counts once.
 */
export function buildEventRuns(events, ledger, roleSet) {
  const RUN_TYPES = new Set(["dispatch", "report", "stopped", "usage"]);
  const recs = [];
  for (const e of events) if (RUN_TYPES.has(e.type) && Number.isFinite(ms(e.ts))) recs.push({ kind: e.type, ts: e.ts, t: ms(e.ts), key: e.agent || e.key || `id:${e.id}`, e });
  const usageLike = [
    ...events.filter((e) => e.type === "usage").map((e) => ({ ts: e.ts, agent: e.agent || e.key || null, tokens: e.tokens, from: `events:${e.id}` })),
    ...ledger.filter((l) => Number.isFinite(ms(l.ts))).map((l) => ({ ts: l.ts, agent: l.agent || null, tokens: l.tokens, from: `ledger:${l.id}`, role: l.role })),
  ];
  const kept = dedupeUsage(usageLike);
  for (const u of kept) if (u.from.startsWith("ledger:")) recs.push({ kind: "ledger", ts: u.ts, t: ms(u.ts), key: u.agent || u.from, e: { actor: u.role, id: u.from, tokens: u.tokens } });
  const keptUsage = new Set(kept.map((u) => u.from));
  recs.sort((a, b) => cmp(a.key, b.key) || a.t - b.t || cmp(a.kind, b.kind) || cmp(String(a.e.id), String(b.e.id)));
  const runs = [];
  let cur = null;
  for (const r of recs) {
    if (!cur || cur.key !== r.key || r.t - cur.lastT > SESSION_WINDOW_MS) runs.push((cur = { key: r.key, recs: [], lastT: r.t }));
    cur.recs.push(r);
    cur.lastT = r.t;
  }
  return runs.map((g) => {
    const of = (k) => g.recs.filter((r) => r.kind === k);
    const d = of("dispatch"), rep = of("report"), st = of("stopped");
    const usage = [...of("usage").filter((r) => keptUsage.has(`events:${r.e.id}`)), ...of("ledger")];
    const roleFrom = [...rep, ...st, ...of("usage"), ...of("ledger")].map((r) => r.e.actor).find((a) => roleSet.has(a) && a !== "chief-of-staff")
      ?? d.map((r) => roleOfDispatch(r.e, roleSet)).find(Boolean) ?? null;
    const start = g.recs[0].t;
    const ends = [...rep, ...st, ...usage].map((r) => r.t);
    const end = ends.length ? Math.max(...ends) : start + PARAMS.OPEN_RUN_MS;
    const mails = d.map((r) => r.e.source).filter((s) => typeof s === "string" && s.startsWith("mail:")).map((s) => s.slice(5));
    return {
      id: `${g.key}@${iso(start)}`, label: g.key, suffix: labelSuffix(g.key), role: roleFrom, start, end, firstDispatch: d.length ? d[0].t : null,
      hasDispatch: d.length > 0, hasReport: rep.length > 0, hasStopped: st.length > 0, hasUsage: usage.length > 0, usageRecords: usage.length, tokens: usage.reduce((n, r) => n + (typeof r.e.tokens === "number" ? r.e.tokens : 0), 0), mails,
    };
  }).sort((a, b) => a.start - b.start || cmp(a.id, b.id));
}

// ------------------------------------------------------------------ 3. MATCHING

/** Candidate strength of an event run for a run item: 3 mail id, 2 label suffix, 1 role + time; 0 none. */
export function runCandidate(item, run, windowMs) {
  if (item.mail && run.mails.includes(item.mail)) return { strength: 3, dist: 0 };
  if (item.suffix && run.suffix === item.suffix) return { strength: 2, dist: Math.abs((item.t ?? dayStart(item.day)) - run.start) };
  if (!item.role || item.role !== run.role) return null;
  const [lo, hi] = span(item);
  const a = run.start - windowMs, b = run.end + windowMs;
  if (hi < a || lo > b) return null;
  const dist = lo > run.end ? lo - run.end : hi < run.start ? run.start - hi : 0;
  return { strength: 1, dist };
}

/**
 * One-to-one per source: within a source, each event run is claimed once (best pairs first: strength, then distance,
 * then earliest run, then item ref). Across sources several items may name the same run; mergeRunItems joins them.
 */
export function matchRunItems(items, runs, windowMs) {
  const bySource = new Map();
  for (const it of items) (bySource.get(it.source) ?? bySource.set(it.source, []).get(it.source)).push(it);
  const result = new Map();
  for (const [, list] of [...bySource].sort((a, b) => cmp(a[0], b[0]))) {
    const pairs = [];
    for (const it of list) for (const r of runs) { const c = runCandidate(it, r, windowMs); if (c) pairs.push({ it, r, ...c }); }
    pairs.sort((x, y) => y.strength - x.strength || x.dist - y.dist || x.r.start - y.r.start || cmp(x.r.id, y.r.id) || cmp(x.it.ref, y.it.ref));
    const usedRun = new Set(), usedItem = new Set();
    for (const p of pairs) {
      if (usedRun.has(p.r.id) || usedItem.has(p.it.ref)) continue;
      usedRun.add(p.r.id); usedItem.add(p.it.ref);
      result.set(p.it.ref, p.r);
    }
  }
  return result;
}

/**
 * Independent runs: items matched to the same event run are one occurrence. Unmatched items join an unmatched
 * group of the same role and day that has no item from their source yet; otherwise they start one.
 */
export function mergeRunItems(items, matches) {
  const groups = new Map();
  const sorted = [...items].sort((a, b) => cmp(a.ref, b.ref));
  for (const it of sorted) {
    const r = matches.get(it.ref);
    if (!r) continue;
    const g = groups.get(r.id) ?? { run: r, items: [] };
    g.items.push(it);
    groups.set(r.id, g);
  }
  const loose = [];
  for (const it of sorted.filter((x) => !matches.has(x.ref)).sort((a, b) => cmp(a.role ?? "", b.role ?? "") || cmp(a.day, b.day) || cmp(a.source, b.source) || cmp(a.ref, b.ref))) {
    const g = it.role && loose.find((x) => x.role === it.role && x.day === it.day && !x.items.some((y) => y.source === it.source));
    if (g) g.items.push(it); else loose.push({ run: null, role: it.role, day: it.day, items: [it] });
  }
  const all = [...groups.values(), ...loose].map((g) => {
    const timed = g.items.filter((x) => x.t != null).map((x) => x.t);
    return {
      run: g.run, role: g.run?.role ?? g.role ?? g.items[0].role, items: g.items,
      t: g.run ? g.run.end : timed.length ? Math.max(...timed) : null, day: g.items.map((x) => x.day).sort()[0],
      ended: g.items.some((x) => x.ended),
    };
  });
  return all.sort((a, b) => cmp(a.items[0].ref, b.items[0].ref));
}

/** Founder text match: prefix (40 normalized chars), whole short message, or token Jaccard ≥ FOUNDER_JACCARD; day within slack. */
export function founderMatches(quote, ev) {
  const dd = Math.abs(dayStart(quote.day) - dayStart(dayOf(ms(ev.ts)))) / DAY;
  if (dd > PARAMS.FOUNDER_DAY_SLACK) return false;
  const q = norm(quote.text), s = norm(ev.summary), b = norm(`${ev.summary ?? ""} ${ev.body ?? ""}`);
  if (!q) return false;
  if (q.length >= 12) { if (b.includes(q.slice(0, 40)) || (s.length >= 12 && q.includes(s.slice(0, 40)))) return true; }
  else if (s === q || norm(ev.body) === q) return true;
  return tokens(q).size >= 3 && tokens(b).size >= 3 && jaccard(q, b) >= PARAMS.FOUNDER_JACCARD;
}

/** Publish match: a publish event naming the slug within PUBLISH_SLUG_SLACK_MS, or naming the commit in refs. */
export function publishMatch(item, ev) {
  const refs = (ev.refs ?? []).map(String);
  const sha = String(item.sha ?? "");
  if (sha.length >= 7 && refs.some((r) => /^[0-9a-f]{7,40}$/.test(r) && (sha.startsWith(r) || r.startsWith(sha)))) return "commit";
  if (item.slug && (ev.subjects ?? []).includes(item.slug) && Math.abs(ms(ev.ts) - item.t) <= PARAMS.PUBLISH_SLUG_SLACK_MS) return "slug";
  if (item.version && new RegExp(`\\b(?:Release|release) ${item.version.replace(/\./g, "\\.")}\\b`).test(String(ev.summary ?? ""))) return "version";
  return null;
}

// ------------------------------------------------------------------ 4. CAUSES (fixed list, first rule that applies)

export function causeForRun(type, r, ctx) {
  const stop = ms(PARAMS.USAGE_STOP);
  if (type === "usage") {
    const [lo, hi] = r.t != null ? [r.t, r.t] : span(r);
    if (lo > stop) return "usage-after-stop";
    if (hi > stop) return "usage-day-straddles-stop";
  }
  if (r.run) {
    if (type === "dispatch" && (r.run.hasReport || r.run.hasUsage)) return "dispatch-missing-run-reported";
    if (type === "report" && r.run.hasStopped) return "report-stopped-instead";
    return "unknown";
  }
  if (!r.role) return "no-role";
  if (r.items.some((it) => ctx.runs.some((x) => runCandidate(it, x, ctx.windowMs)))) return "role-runs-claimed";
  const day = r.day;
  const sameDay = ctx.runs.some((x) => x.role === r.role && (dayOf(x.start) === day || dayOf(x.end) === day));
  if (sameDay) return "outside-window";
  if (span(r)[0] > ctx.txBackfillEnd) return "after-transcript-backfill";
  return "unknown";
}

export function causeForFounder(q, ctx) {
  const start = ms(PARAMS.FOUNDER_LOG_START);
  const [lo, hi] = span(q);
  if (/\(Recommended\)\s*$/.test(q.text)) return "founder-option-pick";
  if (hi > ctx.founderBackfillEnd && lo < start) return "founder-before-log-start";
  if (lo >= start && ctx.summariesOnlyAfterStart) return "founder-events-are-summaries";
  return "unknown";
}

export function causeForPublish(item, ctx, windowMs) {
  if (item.t > ctx.lastPublishEvent) return "publish-after-last-event";
  if (ctx.publishEvents.some((e) => Math.abs(ms(e.ts) - item.t) <= windowMs)) return "publish-event-unnamed";
  return "unknown";
}

// ------------------------------------------------------------------ 5. RECONCILE

const pct = (m, n) => (n ? Math.round((1000 * m) / n) / 10 : null);
const row = (items, ok) => { const matched = items.filter(ok).length; return { items: items.length, matched, unmatched: items.length - matched, coverage: pct(matched, items.length) }; };

/** Collect every input once (so the spread reruns reuse them). */
export async function collect(opts = {}) {
  const root = opts.root ?? DEFAULT_ROOT;
  const win = parseWindow(opts.from, opts.to);
  const roles = opts.roles ?? (await loadRoles(root));
  const roleSet = new Set(roles);
  const git = opts.git ?? gitRunner(root);
  const since = iso(win.from - 2 * DAY);
  const commits = git.commits(since);
  const mailDir = opts.mailboxes ?? path.join(root, "company/ops/mailboxes");
  const mb = extractMailboxes(mailDir, win);
  const runItems = [
    ...extractDispatchRequests(root, win, roleSet), ...extractMemoryEntries(root, win), ...extractRecordLabels(root, win),
    ...extractCommitRuns(commits, win, roleSet), ...mb.items,
  ];
  const quotes = [...extractFounderDecisions(root, win), ...extractFounderProgress(root, win), ...extractFounderCommits(commits, win)];
  const founder = dedupeFounderQuotes(quotes);
  const publishes = extractPublishes(git.statusDiffs(since), win);
  const releases = extractReleases(root, win);
  const events = readJsonl(opts.events ?? path.join(root, "company/ops/events.jsonl"));
  const ledger = readJsonl(opts.ledger ?? path.join(root, "company/ops/ledger.jsonl"));
  return {
    root, win, opts, roleSet, runItems, quotes, founder, publishes, releases, events, ledger, mailboxesPresent: mb.present,
    git: { head: git.head(), shallow: git.shallow(), horizon: git.horizon() },
  };
}

export function reconcile(c, windowMin) {
  const W = windowMin * 60_000;
  const runs = buildEventRuns(c.events, c.ledger, c.roleSet);
  const matches = matchRunItems(c.runItems, runs, W);
  const indep = mergeRunItems(c.runItems, matches);
  const stop = ms(PARAMS.USAGE_STOP);
  const ended = indep.filter((r) => r.ended);
  const usageHalf = (r) => { const [lo, hi] = r.t != null ? [r.t, r.t] : span(r); return hi <= stop ? "before" : lo > stop ? "after" : "straddle"; };
  const txTs = c.events.filter((e) => String(e.id).startsWith("tx-")).map((e) => ms(e.ts)).filter(Number.isFinite);
  const ctx = { runs, windowMs: W, txBackfillEnd: txTs.length ? Math.max(...txTs) : Infinity };

  const founderEvents = c.events.filter((e) => e.type === "founder");
  const backfill = founderEvents.filter((e) => e.actor === "founder").map((e) => ms(e.ts));
  const startT = ms(PARAMS.FOUNDER_LOG_START);
  const fctx = { founderEvents, founderBackfillEnd: backfill.length ? Math.max(...backfill) : -Infinity, summariesOnlyAfterStart: founderEvents.filter((e) => ms(e.ts) >= startT).every((e) => e.actor !== "founder") };
  const fMatch = new Map(c.founder.map((q) => [q.key, founderEvents.filter((e) => founderMatches(q, e)).map((e) => e.id).sort()]));

  const pubEvents = c.events.filter((e) => e.type === "publish").sort((a, b) => cmp(a.ts, b.ts) || cmp(a.id, b.id));
  const pctx = { publishEvents: pubEvents, lastPublishEvent: pubEvents.length ? ms(pubEvents[pubEvents.length - 1].ts) : -Infinity };
  const pMatch = (it) => pubEvents.filter((e) => publishMatch(it, e)).map((e) => `${e.id}:${publishMatch(it, e)}`).sort();
  const split = ms(PARAMS.PUBLISH_SPLIT);

  const runView = (r) => ({ role: r.role, time: r.t != null ? iso(r.t) : null, day: r.day, ended: r.ended, run: r.run ? r.run.label : null, items: r.items.map((x) => x.ref).sort() });
  const types = {
    dispatch: { set: indep, ok: (r) => !!r.run?.hasDispatch },
    report: { set: ended, ok: (r) => !!r.run?.hasReport },
    "usage-before": { set: ended.filter((r) => usageHalf(r) === "before"), ok: (r) => !!r.run?.hasUsage },
    "usage-after": { set: ended.filter((r) => usageHalf(r) === "after"), ok: (r) => !!r.run?.hasUsage },
    "usage-straddle": { set: ended.filter((r) => usageHalf(r) === "straddle"), ok: (r) => !!r.run?.hasUsage },
  };
  const coverage = {}, gaps = {}, byDay = {};
  for (const [k, v] of Object.entries(types)) {
    coverage[k] = row(v.set, v.ok);
    const days = {};
    for (const r of v.set) { const d = (days[r.day] ??= { items: 0, matched: 0 }); d.items++; if (v.ok(r)) d.matched++; }
    byDay[k] = Object.fromEntries(Object.keys(days).sort().map((d) => [d, { ...days[d], coverage: pct(days[d].matched, days[d].items) }]));
    const base = k.startsWith("usage") ? "usage" : k;
    gaps[k] = v.set.filter((r) => !v.ok(r)).map((r) => ({ ...runView(r), cause: causeForRun(base, r, ctx) }));
  }
  coverage.founder = row(c.founder, (q) => fMatch.get(q.key).length > 0);
  gaps.founder = c.founder.filter((q) => !fMatch.get(q.key).length).map((q) => ({ day: q.day, text: q.text, refs: q.refs, cause: causeForFounder(q, fctx) }));
  const pubBefore = c.publishes.filter((p) => p.t < split), pubAfter = c.publishes.filter((p) => p.t >= split);
  for (const [k, set] of [["publish-before", pubBefore], ["publish-after", pubAfter], ["release", c.releases]]) {
    coverage[k] = row(set, (p) => pMatch(p).length > 0);
    gaps[k] = set.filter((p) => !pMatch(p).length).map((p) => ({ time: iso(p.t), slug: p.slug ?? null, version: p.version ?? null, ref: p.ref, cause: causeForPublish(p, pctx, W) }));
  }
  for (const k of Object.keys(gaps)) gaps[k].sort((a, b) => cmp(a.time ?? a.day ?? "", b.time ?? b.day ?? "") || cmp(JSON.stringify(a), JSON.stringify(b)));

  // Records with no independent item (in the window).
  const claimed = new Set(indep.filter((r) => r.run).map((r) => r.run.id));
  const unclaimedRuns = runs.filter((r) => inWin(r.start, c.win) && !claimed.has(r.id));
  const fClaimed = new Set([...fMatch.values()].flat());
  const pClaimed = new Set([...c.publishes, ...c.releases].flatMap((p) => pMatch(p).map((x) => x.split(":")[0])));
  const recordsWithoutItem = {
    dispatch: unclaimedRuns.filter((r) => r.hasDispatch).map((r) => r.id),
    report: unclaimedRuns.filter((r) => r.hasReport).map((r) => r.id),
    usage: unclaimedRuns.filter((r) => r.hasUsage).map((r) => r.id),
    founder: founderEvents.filter((e) => inWin(ms(e.ts), c.win) && !fClaimed.has(e.id)).map((e) => e.id).sort(),
    publish: pubEvents.filter((e) => inWin(ms(e.ts), c.win) && !pClaimed.has(e.id)).map((e) => e.id).sort(),
  };
  const causeTotals = {};
  for (const list of Object.values(gaps)) for (const g of list) causeTotals[g.cause] = (causeTotals[g.cause] ?? 0) + 1;
  const derived = { txBackfillEnd: Number.isFinite(ctx.txBackfillEnd) ? iso(ctx.txBackfillEnd) : null, founderBackfillEnd: Number.isFinite(fctx.founderBackfillEnd) ? iso(fctx.founderBackfillEnd) : null, lastPublishEvent: Number.isFinite(pctx.lastPublishEvent) ? iso(pctx.lastPublishEvent) : null };
  return { derived, coverage, byDay, gaps, recordsWithoutItem, causeTotals: Object.fromEntries(Object.entries(causeTotals).sort((a, b) => b[1] - a[1] || cmp(a[0], b[0]))), eventRunsInWindow: runs.filter((r) => inWin(r.start, c.win)).length };
}

export async function run(opts) {
  const windowMin = Number(opts.windowMin ?? 30);
  const c = await collect(opts);
  const main = reconcile(c, windowMin);
  const spread = {};
  const alt = Object.fromEntries([...new Set([...PARAMS.SPREAD_WINDOWS_MIN, windowMin])].sort((a, b) => a - b).map((w) => [w, w === windowMin ? main : reconcile(c, w)]));
  for (const k of Object.keys(main.coverage)) {
    const vals = Object.fromEntries(Object.entries(alt).map(([w, r]) => [`±${w}`, r.coverage[k].coverage]));
    const nums = Object.values(vals).filter((v) => v != null);
    const pts = nums.length ? Math.round(10 * (Math.max(...nums) - Math.min(...nums))) / 10 : null;
    spread[k] = { ...vals, spreadPoints: pts, flagged: pts != null && pts > PARAMS.SPREAD_FLAG_POINTS };
  }
  const bySource = {};
  for (const it of c.runItems) bySource[it.source] = (bySource[it.source] ?? 0) + 1;
  const totalGaps = Object.values(main.gaps).reduce((n, l) => n + l.length, 0);
  const known = Object.entries(main.causeTotals).filter(([k]) => k !== "unknown").sort((a, b) => b[1] - a[1]);
  let acc = 0, need = 0;
  for (const [, n] of known) { if (acc >= 0.9 * totalGaps) break; acc += n; need++; }
  const out = {
    tool: "tools/reconcile.mjs", experiment: "EXP-009",
    window: { from: iso(c.win.from), to: iso(c.win.to), windowMin },
    params: PARAMS, derived: main.derived, causes: CAUSES,
    inputs: {
      gitHead: c.git.head, gitShallow: c.git.shallow, gitHorizon: c.git.horizon, mailboxes: c.mailboxesPresent ? "present" : "absent",
      runItemsBySource: Object.fromEntries(Object.entries(bySource).sort()), founderQuotesRaw: c.quotes.length, founderMessages: c.founder.length,
      publishItems: c.publishes.length, releaseItems: c.releases.length, events: c.events.length, ledgerLines: c.ledger.length, eventRunsInWindow: main.eventRunsInWindow,
    },
    coverage: main.coverage, spread, byDay: main.byDay, causeTotals: main.causeTotals,
    causeSummary: { totalGaps, unknown: main.causeTotals.unknown ?? 0, distinctKnownCauses: known.length, causesFor90pct: acc >= 0.9 * totalGaps ? need : null },
    gaps: main.gaps,
    recordsWithoutItem: Object.fromEntries(Object.entries(main.recordsWithoutItem).map(([k, v]) => [k, { count: v.length, byDay: countByDay(v), ids: v }])),
  };
  if (opts.stamp) out.generatedAt = new Date().toISOString();
  return out;
}

// Run ids end "@<ISO start>"; event ids have no time, so they are counted under "event".
const countByDay = (ids) => { const d = {}; for (const id of ids) { const m = String(id).match(/@(\d{4}-\d{2}-\d{2})T/); const k = m ? m[1] : "event"; d[k] = (d[k] ?? 0) + 1; } return Object.fromEntries(Object.entries(d).sort()); };

export function formatText(o) {
  const L = [];
  L.push(`EXP-009 reconciliation ${o.window.from} .. ${o.window.to} (±${o.window.windowMin} min)`);
  L.push(`git ${o.inputs.gitHead?.slice(0, 10) ?? "?"} shallow=${o.inputs.gitShallow} horizon=${o.inputs.gitHorizon} · mailboxes ${o.inputs.mailboxes}`);
  L.push(`run items by source: ${Object.entries(o.inputs.runItemsBySource).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  L.push("");
  L.push(`${"type".padEnd(16)}${"items".padStart(7)}${"matched".padStart(9)}${"gaps".padStart(6)}${"cov%".padStart(7)}  spread (±10/±${o.window.windowMin}/±60)`);
  for (const [k, v] of Object.entries(o.coverage)) {
    const s = o.spread[k];
    L.push(`${k.padEnd(16)}${String(v.items).padStart(7)}${String(v.matched).padStart(9)}${String(v.unmatched).padStart(6)}${String(v.coverage ?? "-").padStart(7)}  ${Object.entries(s).filter(([x]) => x.startsWith("±")).map(([, x]) => x ?? "-").join("/")} (${s.spreadPoints ?? "-"} pts${s.flagged ? ", FLAGGED" : ""})`);
  }
  L.push("");
  L.push(`causes (${o.causeSummary.totalGaps} gaps; ${o.causeSummary.distinctKnownCauses} known causes; ${o.causeSummary.causesFor90pct ?? "no"} cover 90%; unknown ${o.causeSummary.unknown}):`);
  for (const [k, n] of Object.entries(o.causeTotals)) L.push(`  ${String(n).padStart(5)}  ${k}: ${o.causes[k]}`);
  L.push("");
  L.push(`records with no independent item: ${Object.entries(o.recordsWithoutItem).map(([k, v]) => `${k} ${v.count}`).join(", ")}`);
  return L.join("\n");
}

function parseArgs(argv) {
  const o = {};
  for (const a of argv) { const m = a.match(/^--([a-z-]+)(?:=(.*))?$/); if (m) o[m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = m[2] ?? true; }
  return o;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const a = parseArgs(process.argv.slice(2));
  if (!a.from || !a.to) { console.error("usage: node tools/reconcile.mjs --from=<ISO> --to=<ISO> [--window-min=30] [--json] [--stamp]"); process.exit(1); }
  const o = await run({ from: a.from, to: a.to, windowMin: a.windowMin ?? 30, stamp: !!a.stamp, root: a.root ? path.resolve(a.root) : undefined, events: a.events, ledger: a.ledger, mailboxes: a.mailboxes });
  process.stdout.write(a.json ? JSON.stringify(o, null, 2) + "\n" : formatText(o) + "\n");
}
