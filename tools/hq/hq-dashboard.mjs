#!/usr/bin/env node
// System 3 Company's dashboard tool for the city HQ (`dashboardCmd`): the dashboard contract
// { v, id, name, mission, owner, budget: { unit, approved, spent, lines }, milestones, kpis, features, releases, principles }
// from its own records:
//   mission      company/mission.md (its bold line)
//   budget       company/ops/projects.json (projects and lines, budgets in tokens) and company/ops/ledger.jsonl (spend)
//   milestones   the projects themselves (approved, in flight, returned), the initiatives' charters
//   kpis         lessons by status (src/demos/*/*/meta.json)
//   features     company/features.json (the city's Features page)
//   releases     company/ops/releases.json, newest first (the city's Release log): canonical rN releases plus the
//                historical production deploys recorded there; approvedBy is null where the record names no approval
//   pipeline     tools/hq/lifecycle.mjs: each content type's life cycle (the lanes' lifecycle blocks in
//                company/ops/projects.json) and where every lesson is in it (the city's Pipeline page)
//   issues       company/ops/board.json, as the city's issues contract (Linear-like states)
//   goals        derived by Meta's goals tool (no OKR file yet); wbr: the WBR ritual's records, one issue a week, and
//                this week's live issue from Meta's WBR tool
//   principles   Meta's audit (\$META/src/principles.mjs, default ../../../system3-meta from this folder); left out if
//                Meta is not there
// Read-only.  node hq-dashboard.mjs [<company root>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadPipeline } from "./lifecycle.mjs";

const NOT_APPROVED = /not recorded|unapproved|none found/i;
/** company/ops/releases.json → the dashboard contract's releases, newest first. Never invents an approval. */
export function releasesOf(rec) {
  const one = (r, id, historical) => {
    const a = r.approved_by ?? {}, who = typeof a === "string" ? a : a.who ?? null, record = typeof a === "string" ? null : a.record ?? null;
    const add = r.added ?? {}, notes = [...(add.features ?? []), ...(add.fixes ?? []).map((x) => `Fix: ${x}`), ...(add.known_issues ?? []).map((x) => `Known issue: ${x}`)];
    if (historical) notes.unshift(`Unnumbered production deploy (company/ops/releases.json historical_deployments)${who ? `; ${who}${record ? `: ${record}` : ""}` : ""}`);
    const approved = who && !NOT_APPROVED.test(who) ? `${who.replace(/^the /, "")}${record ? ` (${record})` : ""}` : null;
    return { id, date: String(r.date ?? "").slice(0, 10), title: r.summary ?? id, notes, commit: r.commit ? String(r.commit).slice(0, 9) : null, approvedBy: approved, at: r.date ?? null, target: r.target ?? null };
  };
  const all = [...(rec.releases ?? []).map((r) => one(r, r.version, false)), ...(rec.historical_deployments ?? []).map((r) => one(r, r.id ?? `deployment-${String(r.commit).slice(0, 8)}`, true))];
  return all.sort((x, y) => Date.parse(y.at) - Date.parse(x.at));
}

const pipelineCache = new Map(); // one computation per root per process (it walks every lesson and runs git)
export function dashboard(root, { audit, meta } = {}) {
  const read = (f) => { try { return fs.readFileSync(path.join(root, f), "utf8"); } catch { return ""; } };
  const mission = (/\*\*(.+?)\*\*/.exec(read("company/mission.md"))?.[1] ?? "").trim();
  const reg = JSON.parse(read("company/ops/projects.json") || "{}"), spent = {};
  for (const l of read("company/ops/ledger.jsonl").split("\n")) { if (!l.trim()) continue; try { const e = JSON.parse(l); spent[e.project] = (spent[e.project] ?? 0) + (e.tokens ?? 0); } catch {} }
  const items = reg.projects ?? [];
  const lines = items.map((p) => ({ id: p.id, title: p.title, kind: p.kind, status: p.status, approved: p.budget?.tokens ?? null, spent: spent[p.id] ?? 0, approvedBy: [p.approval?.approvedBy, p.approval?.date].filter(Boolean).join(", ") || null, owner: p.owner ?? null, source: "company/ops/projects.json, company/ops/ledger.jsonl", live: ["in-flight", "approved", "active"].includes(p.status) }));
  const approved = lines.reduce((a, l) => a + (l.approved ?? 0), 0), total = Object.values(spent).reduce((a, n) => a + n, 0);
  const ms = items.filter((p) => p.kind === "project").map((p) => ({ id: p.id, title: p.title, state: { returned: "done", legacy: "done", approved: "active", "in-flight": "active", proposed: "next", killed: "blocked", paused: "blocked" }[p.status] ?? "next", owner: p.owner ?? null, evidence: [p.owner, p.returns?.headline].filter(Boolean).join(" · ") }));
  const st = {}; for (const dom of fs.readdirSync(path.join(root, "src/demos"), { withFileTypes: true })) if (dom.isDirectory()) for (const s of fs.readdirSync(path.join(root, "src/demos", dom.name), { withFileTypes: true })) {
    if (!s.isDirectory()) continue; try { const m = JSON.parse(fs.readFileSync(path.join(root, "src/demos", dom.name, s.name, "meta.json"), "utf8")); st[m.status ?? "unknown"] = (st[m.status ?? "unknown"] ?? 0) + 1; } catch {}
  }
  const kpis = [{ label: "lessons published", value: st.published ?? 0 }, { label: "in review", value: st.review ?? 0 }, { label: "in draft", value: st.draft ?? 0 }];
  const capped = lines.filter((l) => l.approved != null).reduce((a, l) => a + l.spent, 0);
  // what waits on the founder (company/ops/founder-inbox.json: "everything waiting on the founder, in one place")
  const inbox = JSON.parse(read("company/ops/founder-inbox.json") || "{}").items ?? [];
  const asks = inbox.filter((i) => !["decided", "superseded", "done", "withdrawn"].includes(i.status)).map((i) => ({ id: i.id, title: i.title, kind: i.category ?? null, priority: i.priority ?? null, status: i.status, since: i.since ?? i.date ?? i.opened ?? null, from: i.from ?? i.owner ?? "chief-of-staff", blocks: i.blocks ?? null, recommendation: typeof i.recommendation === "string" ? i.recommendation.slice(0, 400) : null, options: Array.isArray(i.options) ? i.options : i.options ? [String(i.options)] : [], links: i.links ?? [] }));
  const links = [{ label: "Website", url: "https://system-3-company.vercel.app", kind: "website" }, { label: "Repository", url: "https://github.com/hanialshater/system-3-company", kind: "repo" }];
  const features = JSON.parse(read("company/features.json") || "{}").features ?? [];
  const releases = releasesOf(JSON.parse(read("company/ops/releases.json") || "{}"));
  // the company's logo (the dashboard contract's `logo`): company/logo.svg as a data URI, as Meta's dashboard tool does
  const logoSvg = (() => { try { const b = fs.readFileSync(path.join(root, "company/logo.svg")); return b.length <= 65536 ? `data:image/svg+xml;base64,${b.toString("base64")}` : null; } catch { return null; } })();
  const out = { v: 1, id: "system-3-company", name: "System 3 Lessons", mission, owner: "founder", logo: logoSvg, links, asks, budget: { unit: "tokens", approved, spent: total, spentCapped: capped, spentUncapped: total - capped, lines }, milestones: ms, kpis, features, releases };
  try { out.pipeline = pipelineCache.get(root) ?? pipelineCache.set(root, loadPipeline(root)).get(root); } catch {}
  if (audit) { try { out.principles = audit(root); } catch {} }
  // issues (the city's issues contract, Linear-like): the board, company/ops/board.json, every item
  out.issues = issuesOf(JSON.parse(read("company/ops/board.json") || "{}").items ?? []);
  // goals: derived by Meta's goals tool from the mission and the projects (no OKR file here yet), marked derived
  if (meta?.goalsOf) { try { out.goals = meta.goalsOf({ mission, owner: "founder", milestones: ms, budget: out.budget, kpis }); } catch {} }
  // the WBR: the ritual's own records (company/rituals/records/*wbr*.md, written by `company ritual wbr`), one issue a
  // week (the latest record of the week, with the others listed), and this week's live issue from Meta's WBR tool
  out.wbr = { source: "company/rituals/records (the WBR ritual)", records: wbrRecords(root), current: null, recordedThisWeek: false };
  if (meta?.wbrIssue && meta?.weekOf) { try { const wk = meta.weekOf(new Date().toISOString().slice(0, 10)); out.wbr.current = meta.wbrIssue(out, { week: wk }); out.wbr.current.source = "live (Meta's WBR tool over this dashboard)"; out.wbr.recordedThisWeek = out.wbr.records.some((r) => r.week === wk.week); } catch {} }
  return out;
}
const STATE = { backlog: "backlog", next: "todo", doing: "in progress", review: "review", done: "done", dropped: "canceled" };
/** company/ops/board.json items → the issues contract: { v, source, total, states, items: [{ id, title, state, priority,
 *  owner, project, labels, created, updated, url? }] }, newest-updated first */
export function issuesOf(items) {
  const list = items.filter((i) => i && i.id).map((i) => ({ id: String(i.id), title: String(i.title ?? "").slice(0, 300), state: STATE[i.state] ?? "backlog", priority: [1, 2, 3, 4].includes(i.priority) ? i.priority : 0, owner: i.owner ?? null, project: i.project ?? i.strand ?? i.domain ?? null, labels: Array.isArray(i.labels) ? i.labels.slice(0, 8) : [], created: i.created ?? null, updated: String(i.updated ?? i.triage?.at ?? i.created ?? "").slice(0, 10) || null, ...(i.github ? { url: `https://github.com/hanialshater/system-3-company/issues/${encodeURIComponent(String(i.github).replace(/^#/, ""))}` } : {}) }))
    .sort((a, b) => String(b.updated ?? "").localeCompare(String(a.updated ?? "")) || b.id.localeCompare(a.id, undefined, { numeric: true }));
  const states = {}; for (const s of ["backlog", "todo", "in progress", "review", "done", "canceled"]) states[s] = list.filter((i) => i.state === s).length;
  return { v: 1, source: "company/ops/board.json", total: list.length, states, items: list };
}
/** the WBR ritual's records as weekly issues: the week, the record, its operating snapshot (the lessons table), its
 *  anomalies, the decisions it asked of the founder and the objections it carried; newest week first */
export function wbrRecords(root) {
  const dir = path.join(root, "company/rituals/records"); let files = [];
  try { files = fs.readdirSync(dir).filter((f) => /^\d{4}-\d{2}-\d{2}-wbr.*\.md$/.test(f)).sort(); } catch { return []; }
  const weekOf = (day) => { const d = new Date(`${day}T00:00:00Z`), thu = new Date(d); thu.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) + 3); const y = thu.getUTCFullYear(), j = new Date(Date.UTC(y, 0, 4)); return `${y}-W${String(1 + Math.round(((thu - j) / 86400000 - 3 + ((j.getUTCDay() + 6) % 7)) / 7)).padStart(2, "0")}`; };
  const parse = (f) => {
    const t = fs.readFileSync(path.join(dir, f), "utf8"), date = f.slice(0, 10), sec = (re) => { const m = new RegExp(`^## [^\\n]*${re}[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "mi").exec(t); return m ? m[1] : ""; };
    const rows = (x) => x.split("\n").filter((l) => /^\|/.test(l) && !/^\|\s*-/.test(l)).map((l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    const snap = rows(sec("Operating snapshot")), metrics = snap.length >= 2 ? snap[0].map((h, i) => ({ label: h.toLowerCase(), value: Number(String(snap[1][i]).replace(/[^\d.-]/g, "")) })).filter((m) => m.label && Number.isFinite(m.value) && String(snap[1][snap[0].indexOf(m.label)] ?? "").trim() !== "") : [];
    const anomalies = rows(sec("Anomalies")).slice(1).map((r) => (r[0] ?? "").replace(/\*\*/g, "").slice(0, 200)).filter(Boolean);
    const decisions = sec("Decisions needed").split("\n").filter((l) => /^\s*\d+\.\s/.test(l)).map((l) => l.replace(/^\s*\d+\.\s*/, "").replace(/\*\*/g, "").slice(0, 200));
    const objections = rows(sec("Objections")).slice(1).length;
    return { week: weekOf(date), date, record: `company/rituals/records/${f}`, title: (/^# (.+)$/m.exec(t)?.[1] ?? f).trim(), metrics, anomalies, decisions, objections };
  };
  const byWeek = new Map(); for (const f of files) { let r; try { r = parse(f); } catch { continue; } const w = byWeek.get(r.week); if (w) w.also.push(w.record); byWeek.set(r.week, { ...r, also: w ? [...w.also] : [] }); }
  return [...byWeek.values()].sort((a, b) => b.week.localeCompare(a.week)).map((r) => ({ v: 1, source: "ritual record", ...r }));
}

/** Meta's goals and WBR tools (src/goals.mjs, src/wbr.mjs, src/news.mjs weekOf), or null without Meta (then goals and
 *  the live WBR issue are left out; the issues and the WBR records are this company's own and always there). */
export async function metaTools() {
  const meta = process.env.META ? path.resolve(process.env.META) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../system3-meta");
  try { const [g, w, n] = await Promise.all(["goals", "wbr", "news"].map((m) => import(pathToFileURL(path.join(meta, "src", `${m}.mjs`)).href))); return { goalsOf: g.goalsOf, wbrIssue: w.wbrIssue, weekOf: n.weekOf }; } catch { return null; }
}
/** Meta's principles audit, or null when Meta is not checked out (the field is then left out). */
export async function metaAudit() {
  const meta = process.env.META ? path.resolve(process.env.META) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../system3-meta");
  const f = path.join(meta, "src", "principles.mjs");
  if (!fs.existsSync(f)) return null;
  try { return (await import(pathToFileURL(f).href)).audit ?? null; } catch { return null; }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  console.log(JSON.stringify(dashboard(root, { audit: await metaAudit(), meta: await metaTools() }), null, 1));
}
