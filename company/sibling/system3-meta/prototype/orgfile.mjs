#!/usr/bin/env node
// The org tool for a company whose org is a file (org.json: an array, or { roles }): validates it against the org
// contract (product/STARTER.md §3) and prints it. Read-only. The HQ runs it as the company's orgCmd.
//   node orgfile.mjs <org.json>        prints the org; exit 1 with the problems if it breaks the contract
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** the org contract's checks: ids unique, one root (reportsTo null), every manager in the org, no cycles */
export function orgProblems(org) {
  const p = [], ids = new Set(), by = {};
  if (!Array.isArray(org) || !org.length) return ["an org is a non-empty list of roles"];
  for (const r of org) { if (!r.id) p.push("a role needs an id"); else if (ids.has(r.id)) p.push(`duplicate id ${r.id}`); ids.add(r.id); by[r.id] = r; if (!("reportsTo" in r)) p.push(`${r.id}: reportsTo is required (null for the root)`); if (!r.title) p.push(`${r.id}: a title is required`); }
  const roots = org.filter((r) => r.reportsTo === null); if (roots.length !== 1) p.push(`one root (reportsTo null), found ${roots.length}`);
  for (const r of org) if (r.reportsTo != null && !ids.has(r.reportsTo)) p.push(`${r.id} reports to ${r.reportsTo}, not in the org`);
  for (const r of org) { const seen = new Set(); let n = r; while (n && n.reportsTo != null) { if (seen.has(n.id)) { p.push(`a cycle through ${r.id}`); break; } seen.add(n.id); n = by[n.reportsTo]; } }
  return p;
}
export const readOrg = (file) => { const o = JSON.parse(fs.readFileSync(file, "utf8")); return Array.isArray(o) ? o : o.roles ?? []; };

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const org = readOrg(process.argv[2]), p = orgProblems(org);
  if (p.length) { console.error(p.join("\n")); process.exit(1); }
  console.log(JSON.stringify(org, null, 1));
}
