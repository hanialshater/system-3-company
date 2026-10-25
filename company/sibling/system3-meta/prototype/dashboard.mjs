#!/usr/bin/env node
// The dashboard tool: a company's mission, budget and milestones as the dashboard contract (product/STARTER.md §3),
// from its company.json (mission, owner, budget lines) and milestones.json. Read-only. The HQ runs it as the company's
// dashboardCmd and adds what the event log shows (spend over time, by member and model).
//   node dashboard.mjs <company dir>    prints { mission, budget: { unit, approved, spent, spentCapped, spentUncapped,
//                                        lines }, milestones, kpis }
// A budget line's `spent` is its recorded figure, or the live total in its `ledger` (a spend.json with { spent }) while
// a run is going.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const J = (f, d = null) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } };
export function dashboard(dir) {
  const co = J(path.join(dir, "company.json"), {}), ms = J(path.join(dir, "milestones.json"), { milestones: [] }).milestones ?? [];
  const lines = (co.budget?.lines ?? []).map((l) => { const live = l.ledger ? J(l.ledger)?.spent ?? null : null; return { ...l, spent: live != null ? Number(live.toFixed(2)) : l.spent ?? null, live: live != null }; });
  const sum = (k) => Number(lines.reduce((a, l) => a + (l[k] ?? 0), 0).toFixed(2));
  const states = ms.reduce((m, x) => ((m[x.state] = (m[x.state] ?? 0) + 1), m), {});
  // capped: what was spent on lines with an approved amount, so "left" compares like with like; uncapped lines apart
  const capped = Number(lines.filter((l) => l.approved != null).reduce((a, l) => a + (l.spent ?? 0), 0).toFixed(2));
  return { v: 1, id: co.id ?? null, name: co.name ?? null, mission: co.mission ?? null, owner: co.owner ?? null, budget: { unit: co.budget?.unit ?? "USD", approved: sum("approved"), spent: sum("spent"), spentCapped: capped, spentUncapped: Number((sum("spent") - capped).toFixed(2)), lines }, milestones: ms, kpis: [{ label: "milestones done", value: states.done ?? 0, of: ms.length }, { label: "active", value: states.active ?? 0 }, { label: "blocked", value: states.blocked ?? 0 }] };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) console.log(JSON.stringify(dashboard(path.resolve(process.argv[2] ?? ".")), null, 1));
