// Token ledger: actual spend per agent run against a project or budget line.
// Read by tools/ledger.mjs (CLI) and tools/metrics.mjs (the Budget section). System: company/ops/token-budget.md.
// Sources, in order of trust:
//   1. company/ops/events.jsonl `usage` events: the harness's <subagent_tokens> and <duration_ms> for a
//      finished run, backfilled from the session transcript by tools/events.mjs. Measured.
//   2. `stopped` events: the run ended early; the harness reports no tokens, so spend is NOT measured.
//   3. `ledger.mjs add`: a line the chief of staff writes from a finished agent's usage report. Measured
//      when the numbers are copied from the harness, never estimated.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dedupeUsage } from "./usage.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rel = (...p) => path.join(ROOT, ...p);
// S3_LEDGER and S3_PROJECTS override the ledger and the register (tests and fixtures only; read at import).
export const PATHS = {
  ledger: process.env.S3_LEDGER ? path.resolve(process.env.S3_LEDGER) : rel("company/ops/ledger.jsonl"),
  projects: process.env.S3_PROJECTS ? path.resolve(process.env.S3_PROJECTS) : rel("company/ops/projects.json"),
  events: rel("company/ops/events.jsonl"),
  board: rel("company/ops/board.json"),
  inbox: rel("company/ops/founder-inbox.json"),
  waves: rel("company/ops/waves.json"),
};

const readJsonl = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
export const readLedger = () => readJsonl(PATHS.ledger);
export const readEvents = () => readJsonl(PATHS.events).sort((a, b) => a.ts.localeCompare(b.ts));
export const readRegister = () => JSON.parse(fs.readFileSync(PATHS.projects, "utf8"));
export function appendLedger(lines) {
  if (!lines.length) return 0;
  fs.appendFileSync(PATHS.ledger, lines.map((l) => JSON.stringify(l)).join("\n") + "\n");
  return lines.length;
}

// A dispatch label or brief may carry `[project:<id>]`. That tag is the durable attribution: it rides
// the agent description into the transcript, the event log and this ledger with no extra step.
export const TAG = /\[project:([a-z0-9-]+)\]/i;

/** Attribute one run to a register line: tag > label rule > role default > unattributed. */
export function attribute(reg, { label = "", body = "", role = "" }) {
  const tag = label.match(TAG)?.[1] ?? body.match(TAG)?.[1];
  if (tag && reg.projects.some((p) => p.id === tag)) return { project: tag, attribution: "tagged" };
  const name = label.split(" ·")[0];
  for (const p of reg.projects) for (const rx of p.match ?? []) if (new RegExp(rx, "i").test(name)) return { project: p.id, attribution: "label-rule" };
  for (const [line, roles] of Object.entries(reg.roleDefaults ?? {}))
    if (roles.some((r) => (r.startsWith("^") ? new RegExp(r).test(role) : r === role))) return { project: line, attribution: "role-default" };
  return { project: "unattributed", attribution: "none" };
}

/** New ledger lines from usage/stopped events not yet in the ledger (idempotent on source id). */
export function importFromEvents(reg, ledger = readLedger(), events = readEvents()) {
  const have = new Set(ledger.map((l) => l.source));
  const manual = new Set(ledger.filter((l) => l.source?.startsWith("manual:")).map((l) => `${l.agent}|${l.tokens}`));
  const dispatch = {};
  for (const e of events) if (e.type === "dispatch" && e.agent && !dispatch[e.agent]) dispatch[e.agent] = e;
  const out = [];
  for (const e of events) {
    if (e.type !== "usage" && e.type !== "stopped") continue;
    const source = `events:${e.id}`;
    if (have.has(source)) continue;
    if (e.type === "usage" && manual.has(`${e.agent}|${e.tokens}`)) continue; // already written by hand from the same report
    const d = dispatch[e.agent];
    const { project, attribution } = attribute(reg, { label: e.agent ?? "", body: d?.body ?? "", role: e.actor });
    out.push({
      id: `L-${e.id}`,
      ts: e.ts,
      project,
      role: e.actor,
      agent: e.agent,
      model: d?.summary?.match(/\((opus|sonnet|haiku)[^)]*\)/)?.[1] ?? null,
      tokens: e.type === "usage" ? e.tokens : null,
      durationMs: e.type === "usage" ? e.durationMs : null,
      outcome: e.type === "usage" ? "done" : "stopped",
      measured: e.type === "usage" ? "tokens+duration (harness subagent_tokens)" : "not measured (stopped runs report no tokens)",
      attribution,
      source,
    });
    have.add(source);
  }
  return out;
}

// ------------------------------------------------------------------ returns

function lessons() {
  const out = [];
  const base = rel("src/demos");
  if (!fs.existsSync(base)) return out;
  for (const d of fs.readdirSync(base)) {
    const dir = path.join(base, d);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const s of fs.readdirSync(dir)) {
      const f = path.join(dir, s, "meta.json");
      if (!fs.existsSync(f)) continue;
      try { out.push(JSON.parse(fs.readFileSync(f, "utf8"))); } catch {}
    }
  }
  return out;
}

/** Return measures for one register entry. Anything the scope cannot measure comes back null, with why. */
export function returnsFor(p, all = lessons(), board = boardItems(), waves = wavesData()) {
  const r = p.returns ?? {};
  let scope = null;
  let why = null;
  if (r.domains) scope = all.filter((l) => r.domains.includes(l.domain));
  else if (r.slugs) scope = all.filter((l) => r.slugs.includes(l.slug));
  else if (r.wave) {
    const w = waves.find((x) => String(x.id).toLowerCase() === String(r.wave).toLowerCase());
    if (w?.slugs?.length) scope = all.filter((l) => w.slugs.includes(l.slug));
    else why = `wave ${r.wave} has no slug list in company/ops/waves.json yet (${r.slugListOwedBy ?? "chief-of-staff"})`;
  } else why = r.notLessons ?? "no lesson scope: this line returns something other than lessons";
  const live = scope?.filter((l) => l.status !== "retired");
  const ids = new Set(p.board ?? []);
  const tag = `#${p.id}`;
  const linked = board.filter((i) => ids.has(i.id) || (i.title ?? i.text ?? "").includes(tag));
  return {
    lessons: live ? live.length : null,
    published: live ? live.filter((l) => l.status === "published").length : null,
    claimsVerified: live ? live.flatMap((l) => l.claims ?? []).filter((c) => c.status === "verified").length : null,
    claims: live ? live.flatMap((l) => l.claims ?? []).length : null,
    findingsFixed: linked.filter((i) => i.state === "done").length,
    findingsOpen: linked.filter((i) => !["done", "dropped"].includes(i.state)).length,
    why,
  };
}
function boardItems() {
  return fs.existsSync(PATHS.board) ? JSON.parse(fs.readFileSync(PATHS.board, "utf8")).items ?? [] : [];
}
function wavesData() {
  return fs.existsSync(PATHS.waves) ? JSON.parse(fs.readFileSync(PATHS.waves, "utf8")).waves ?? [] : [];
}

// ------------------------------------------------------------------ spend and the gate

// A resumed run is imported once per cumulative usage report; every sum below counts only its max line
// (W-941, tools/lib/usage.mjs). The ledger file itself stays append-only.
export function spendBy(ledger) {
  const m = {};
  for (const l of dedupeUsage(ledger)) {
    const s = (m[l.project] ??= { tokens: 0, runs: 0, measuredRuns: 0, unmeasuredRuns: 0, ms: 0, byAttribution: {} });
    s.runs++;
    if (typeof l.tokens === "number") { s.tokens += l.tokens; s.measuredRuns++; s.ms += l.durationMs ?? 0; }
    else s.unmeasuredRuns++;
    s.byAttribution[l.attribution] = (s.byAttribution[l.attribution] ?? 0) + (l.tokens ?? 0);
  }
  return m;
}

/** Budget actually available: base budget plus approved top-ups. */
export const budgetOf = (p) => (p.budget?.tokens == null ? null : p.budget.tokens + (p.budget.topUps ?? []).reduce((n, t) => n + (t.tokens ?? 0), 0));

/** Spend that counts against the budget: only lines on or after the budget was set (earlier spend is history). */
export function spendAgainstBudget(p, ledger) {
  const from = p.budget?.countFrom ?? "0000";
  return dedupeUsage(ledger).filter((l) => l.project === p.id && l.ts >= from && typeof l.tokens === "number").reduce((n, l) => n + l.tokens, 0);
}

const OPEN_OK = new Set(["approved", "active"]);

/**
 * May new work be dispatched against this register entry right now?
 * pass: true/false, level: ok | warn | fail, reasons: string[]
 */
export function gate(reg, id, { now = new Date().toISOString(), planned = 0, ledger = readLedger() } = {}) {
  const p = reg.projects.find((x) => x.id === id);
  if (!p) return { pass: false, level: "fail", reasons: [`unknown project or line "${id}": register it in company/ops/projects.json (portfolio-manager) or tag the work to a budget line`] };
  const reasons = [];
  const budget = budgetOf(p);
  const spent = spendAgainstBudget(p, ledger);
  const frac = budget ? (spent + planned) / budget : null;
  const warnAt = reg.thresholds?.warnAt ?? 0.8;
  if (!p.major) {
    // Budget lines (rituals, maintenance, catalog) never block small work; they flag.
    if (frac != null && frac >= 1) reasons.push(`${id} is at ${Math.round(frac * 100)}% of its line budget: flag in the WBR, owner re-plans (token-budget.md section 4)`);
    else if (frac != null && frac >= warnAt) reasons.push(`${id} is at ${Math.round(frac * 100)}% of its line budget`);
    return { pass: true, level: reasons.length ? "warn" : "ok", reasons, project: p, spent, budget };
  }
  if (OPEN_OK.has(p.status)) {
    if (!budget) return { pass: false, level: "fail", reasons: [`${id} is approved but has no budget: the approval record must set one`], project: p, spent, budget };
    if (spent >= budget) return { pass: false, level: "fail", reasons: [`${id} has spent ${fmt(spent)} of ${fmt(budget)} (100%): new dispatches stop until a top-up is approved or the project is killed (token-budget.md section 4)`], project: p, spent, budget };
    if (frac >= 1) reasons.push(`this dispatch would take ${id} past 100% (${fmt(spent)} + ${fmt(planned)} of ${fmt(budget)})`);
    else if (frac >= warnAt) reasons.push(`${id} is at ${Math.round(frac * 100)}%: owner files a forecast with the forum`);
    return { pass: true, level: reasons.length ? "warn" : "ok", reasons, project: p, spent, budget };
  }
  if (p.status === "in-flight") {
    if (p.grandfatheredUntil && now <= p.grandfatheredUntil) {
      return { pass: true, level: "warn", reasons: [`${id} was started before the forum existed and has no approved budget; allowed until ${p.grandfatheredUntil} (first project review). Bring it to the forum.`], project: p, spent, budget };
    }
    return { pass: false, level: "fail", reasons: [`${id} is a major project with no forum approval, and its grace period ended ${p.grandfatheredUntil ?? "(none set)"}`], project: p, spent, budget };
  }
  return { pass: false, level: "fail", reasons: [`${id} is a major project in status "${p.status}": only approved or active major projects take new work (company/rituals/templates/project-review.md)`], project: p, spent, budget };
}

export const fmt = (n) => (n == null ? "—" : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : `${Math.round(n / 1e3)}k`);

/** A major project the forum has not yet decided: proposed, returned, or in flight with a proposal. */
export function awaitingForum(p) {
  return !!p.major && (["proposed", "returned"].includes(p.status) || (p.status === "in-flight" && !!p.proposal));
}

/** Why a project's pre-mortem does not count (null = it does). Template: company/rituals/templates/project-review.md. */
export function premortemProblem(p) {
  if (!p.premortem) return "major project proposal with no pre-mortem (set `premortem` to the file holding its \"## Pre-mortem: <id>\" section)";
  const file = path.join(ROOT, String(p.premortem).split("#")[0]);
  if (!fs.existsSync(file)) return `pre-mortem ${p.premortem} not on disk`;
  const text = fs.readFileSync(file, "utf8");
  const esc = p.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = new RegExp(`^## Pre-mortem: ${esc}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m").exec(text);
  if (!m) return `${p.premortem} has no "## Pre-mortem: ${p.id}" section`;
  // A scored row: | n | failure mode | L 1-5 | I 1-5 | signal | mitigation | owner | ...
  if (!/^\|\s*\d+\s*\|[^|\n]+\|\s*[1-5]\s*\|\s*[1-5]\s*\|[^|\n]+\|[^|\n]+\|[^|\n]+\|/m.test(m[1])) return `pre-mortem for ${p.id} has no scored failure mode (likelihood and impact 1-5, signal, mitigation, owner)`;
  return null;
}

export const readInbox = () => (fs.existsSync(PATHS.inbox) ? JSON.parse(fs.readFileSync(PATHS.inbox, "utf8")).items ?? [] : []);

// token-budget.md section 9 (W-920): an initiative or decision item that reaches the founder proposing
// spend or a project carries a `budget` field, the projects.json id of its portfolio-manager budget line,
// or "not an initiative: <why>" when the portfolio manager has said in writing that it is not one.
const SPEND = /\$\s?\d|\bUSD\b|\bper month\b|\/mo\b|\bspend\b|\bpurchase\b|\bpaid\b|\bsubscription\b|\btranche\b|\bbudget\b|\d(\.\d+)?\s?[MkK]\s+tokens\b|\btokens?\s+per\b/i;
const PROJECT = /\bnew (category|project|org|organi[sz]ation|vertical|team|course|format|program(me)?)\b|\bmajor project\b|\b(proceed to|start|begin|launch) (a |the )?(stage|phase|pilot|tranche)\b|\[project:[a-z0-9-]+\]/i;
const CLOSED = new Set(["decided", "closed", "done", "withdrawn", "dropped", "resolved"]);

/** Warnings for open founder-inbox items that propose spend or a project with no budget line (section 9). */
export function inboxBudgetWarnings(reg, items = readInbox()) {
  const ids = new Set(reg.projects.map((p) => p.id));
  const out = [];
  for (const i of items) {
    if (!["initiative", "decision"].includes(i.category) || CLOSED.has(String(i.status ?? "open").toLowerCase())) continue;
    const text = [i.title, i.options, i.recommendation, i.blocks, i.ask, i.body].filter((x) => typeof x === "string").join("\n");
    const links = [...(i.links ?? []), ...(i.refs ?? [])].map(String);
    const why = [];
    if (links.some((l) => l.startsWith("company/initiatives/"))) why.push("links an initiative");
    if (i.project || PROJECT.test(text)) why.push("proposes a project");
    if (SPEND.test(text)) why.push("proposes spend");
    if (i.budget) {
      const b = String(i.budget);
      if (!ids.has(b) && !/^not an initiative:/i.test(b)) out.push(`founder-inbox ${i.id}: budget "${b}" is not a projects.json id (or "not an initiative: <why>") (token-budget.md section 9)`);
      continue;
    }
    if (why.length) out.push(`founder-inbox ${i.id} (${i.category}): ${why.join(", ")} with no \`budget\` field; it goes back to its proposer for a portfolio-manager budget line (token-budget.md section 9)`);
  }
  return out;
}

/** Register and ledger problems. Errors fail `ledger.mjs check`. */
export function problems(reg, ledger = readLedger(), inbox = readInbox()) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const STATUSES = new Set(["proposed", "approved", "active", "in-flight", "returned", "paused", "done", "killed", "legacy"]);
  for (const p of reg.projects) {
    if (ids.has(p.id)) errors.push(`duplicate id ${p.id}`);
    ids.add(p.id);
    for (const k of ["id", "title", "kind", "owner", "status"]) if (!p[k]) errors.push(`${p.id ?? "?"}: missing ${k}`);
    if (!STATUSES.has(p.status)) errors.push(`${p.id}: unknown status ${p.status}`);
    if (p.major && OPEN_OK.has(p.status)) {
      if (!p.approval?.record) errors.push(`${p.id}: ${p.status} major project with no approval record`);
      else if (!fs.existsSync(path.join(ROOT, p.approval.record))) errors.push(`${p.id}: approval record ${p.approval.record} not on disk`);
      else {
        // Objections travel with decisions: the record must carry them, each with a real status.
        const text = fs.readFileSync(path.join(ROOT, p.approval.record), "utf8");
        if (!/^## Objections/m.test(text)) errors.push(`${p.id}: approval record has no "## Objections" section`);
        if (/\|\s*noted\.?\s*\|/i.test(text)) errors.push(`${p.id}: approval record answers an objection with "noted"`);
      }
      if (budgetOf(p) == null) errors.push(`${p.id}: ${p.status} major project with no budget`);
      if (p.approval?.approvedBy && p.approval.approvedBy === p.proposedBy) errors.push(`${p.id}: approved by its own proposer`);
    }
    if (p.major && !p.kill && ["proposed", "approved", "active", "in-flight"].includes(p.status)) warnings.push(`${p.id}: no kill criteria`);
    // Pre-mortem (founder decision 2026-10-14-founder-risk-in-ops-review): required for a major project awaiting the forum.
    if (awaitingForum(p)) { const why = premortemProblem(p); if (why) errors.push(`${p.id}: ${why}`); }
  }
  warnings.push(...inboxBudgetWarnings(reg, inbox));
  for (const l of ledger) if (!ids.has(l.project) && l.project !== "unattributed") errors.push(`ledger ${l.id}: unknown project ${l.project}`);
  // The bite: work explicitly tagged to a major project after enforcement began must have passed the gate at that time.
  const from = reg.enforceFrom ?? "9999";
  for (const l of ledger.filter((x) => x.attribution === "tagged" && x.ts >= from)) {
    const g = gate(reg, l.project, { now: l.ts, ledger: ledger.filter((x) => x.ts < l.ts) });
    if (!g.pass) errors.push(`ledger ${l.id} (${l.agent ?? l.role}, ${l.ts.slice(0, 16)}): work on ${l.project} that the gate refuses: ${g.reasons[0]}`);
  }
  return { errors, warnings };
}

/** One summary object for reports and metrics. */
export function summary(reg = readRegister(), ledger = readLedger(), events = readEvents()) {
  const spend = spendBy(ledger);
  const all = lessons();
  const board = boardItems();
  const waves = wavesData();
  const rows = reg.projects.map((p) => {
    const s = spend[p.id] ?? { tokens: 0, runs: 0, measuredRuns: 0, unmeasuredRuns: 0, ms: 0, byAttribution: {} };
    const budget = budgetOf(p);
    const against = spendAgainstBudget(p, ledger);
    const ret = returnsFor(p, all, board, waves);
    return {
      id: p.id, title: p.title, kind: p.kind, major: !!p.major, status: p.status, owner: p.owner,
      budget, against, pct: budget ? Math.round((100 * against) / budget) : null,
      spent: s.tokens, runs: s.runs, unmeasuredRuns: s.unmeasuredRuns, hours: Math.round(s.ms / 3.6e6 * 10) / 10,
      byAttribution: s.byAttribution, returns: ret,
      perPublished: ret.published ? Math.round(s.tokens / ret.published) : null,
    };
  });
  const un = spend.unattributed;
  if (un) rows.push({ id: "unattributed", title: "No rule or tag matched", kind: "none", major: false, status: "—", owner: "portfolio-manager", budget: null, against: un.tokens, pct: null, spent: un.tokens, runs: un.runs, unmeasuredRuns: un.unmeasuredRuns, hours: Math.round(un.ms / 3.6e6 * 10) / 10, byAttribution: un.byAttribution, returns: { why: "unattributed" }, perPublished: null });
  const runs = dedupeUsage(ledger);
  const total = runs.reduce((n, l) => n + (l.tokens ?? 0), 0);
  const byAttr = runs.reduce((m, l) => ((m[l.attribution] = (m[l.attribution] ?? 0) + (l.tokens ?? 0)), m), {});
  const dispatched = new Set(events.filter((e) => e.type === "dispatch" && e.agent && !e.summary?.startsWith("Message to")).map((e) => e.agent));
  const accounted = new Set(ledger.map((l) => l.agent));
  const noRecord = [...dispatched].filter((a) => !accounted.has(a)).length;
  const lastUsage = events.filter((e) => e.type === "usage").at(-1)?.ts ?? null;
  const published = all.filter((l) => l.status === "published").length;
  return { rows, total, byAttr, runs: runs.length, duplicateLines: ledger.length - runs.length, unmeasured: ledger.filter((l) => l.tokens == null).length, noRecord, lastUsage, published, perPublishedAll: published ? Math.round(total / published) : null };
}
