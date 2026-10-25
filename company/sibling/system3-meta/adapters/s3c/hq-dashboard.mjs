#!/usr/bin/env node
// System 3 Company's dashboard tool for the city HQ (`dashboardCmd`): the dashboard contract
// { v, id, name, mission, owner, budget: { unit, approved, spent, lines }, milestones, kpis } from its own records:
//   mission      company/mission.md (its bold line)
//   budget       company/ops/projects.json (projects and lines, budgets in tokens) and company/ops/ledger.jsonl (spend)
//   milestones   the projects themselves (approved, in flight, returned), the initiatives' charters
//   kpis         lessons by status (src/demos/*/*/meta.json)
// Read-only.  node hq-dashboard.mjs [<company root>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function dashboard(root) {
  const read = (f) => { try { return fs.readFileSync(path.join(root, f), "utf8"); } catch { return ""; } };
  const mission = (/\*\*(.+?)\*\*/.exec(read("company/mission.md"))?.[1] ?? "").trim();
  const reg = JSON.parse(read("company/ops/projects.json") || "{}"), spent = {};
  for (const l of read("company/ops/ledger.jsonl").split("\n")) { if (!l.trim()) continue; try { const e = JSON.parse(l); spent[e.project] = (spent[e.project] ?? 0) + (e.tokens ?? 0); } catch {} }
  const items = reg.projects ?? [];
  const lines = items.map((p) => ({ id: p.id, title: p.title, kind: p.kind, status: p.status, approved: p.budget?.tokens ?? null, spent: spent[p.id] ?? 0, approvedBy: p.approval ? `${p.approval.approvedBy}, ${p.approval.date}` : null, owner: p.owner ?? null, source: "company/ops/projects.json, company/ops/ledger.jsonl", live: ["in-flight", "approved", "active"].includes(p.status) }));
  const approved = lines.reduce((a, l) => a + (l.approved ?? 0), 0), total = Object.values(spent).reduce((a, n) => a + n, 0);
  const ms = items.filter((p) => p.kind === "project").map((p) => ({ id: p.id, title: p.title, state: { returned: "done", legacy: "done", approved: "active", "in-flight": "active", proposed: "next", killed: "blocked", paused: "blocked" }[p.status] ?? "next", owner: p.owner ?? null, evidence: [p.owner, p.returns?.headline].filter(Boolean).join(" · ") }));
  const st = {}; for (const dom of fs.readdirSync(path.join(root, "src/demos"), { withFileTypes: true })) if (dom.isDirectory()) for (const s of fs.readdirSync(path.join(root, "src/demos", dom.name), { withFileTypes: true })) {
    if (!s.isDirectory()) continue; try { const m = JSON.parse(fs.readFileSync(path.join(root, "src/demos", dom.name, s.name, "meta.json"), "utf8")); st[m.status ?? "unknown"] = (st[m.status ?? "unknown"] ?? 0) + 1; } catch {}
  }
  const kpis = [{ label: "lessons published", value: st.published ?? 0 }, { label: "in review", value: st.review ?? 0 }, { label: "in draft", value: st.draft ?? 0 }];
  const capped = lines.filter((l) => l.approved != null).reduce((a, l) => a + l.spent, 0);
  return { v: 1, id: "system-3-company", name: "System 3 Lessons", mission, owner: "founder", budget: { unit: "tokens", approved, spent: total, spentCapped: capped, spentUncapped: total - capped, lines }, milestones: ms, kpis };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../../.."));
  console.log(JSON.stringify(dashboard(root), null, 1));
}
