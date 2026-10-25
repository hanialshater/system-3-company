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
//   principles   Meta's audit (\$META/src/principles.mjs, default ../../../system3-meta from this folder); left out if
//                Meta is not there
// Read-only.  node hq-dashboard.mjs [<company root>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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

export function dashboard(root, { audit } = {}) {
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
  const out = { v: 1, id: "system-3-company", name: "System 3 Lessons", mission, owner: "founder", links, asks, budget: { unit: "tokens", approved, spent: total, spentCapped: capped, spentUncapped: total - capped, lines }, milestones: ms, kpis, features, releases };
  if (audit) { try { out.principles = audit(root); } catch {} }
  return out;
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
  console.log(JSON.stringify(dashboard(root, { audit: await metaAudit() }), null, 1));
}
