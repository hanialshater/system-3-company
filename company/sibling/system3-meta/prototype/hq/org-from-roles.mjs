#!/usr/bin/env node
// A company's org file for the HQ's Org page, from its org as data (System 3 Company: tools/org/roles.mjs):
// [{ id, title, reportsTo, team }], the founder at the root.
//   node hq/org-from-roles.mjs <roles.mjs> <out.json>
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

export async function orgFromRoles(file) {
  const { roles } = await import(pathToFileURL(path.resolve(file)).href);
  const ids = new Set(roles.map((r) => r.id));
  // the founder is the root: as a role in the data if there is one (it reports to no one), else added
  const root = ids.has("founder") ? [] : [{ id: "founder", title: "Founder (CEO)", reportsTo: null, team: null }];
  return [...root, ...roles.map((r) => ({ id: r.id, title: r.title, reportsTo: r.id === "founder" ? null : ids.has(r.reportsTo) && r.reportsTo !== r.id ? r.reportsTo : "founder", team: r.team ?? null }))];
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const org = await orgFromRoles(process.argv[2]); fs.writeFileSync(process.argv[3], JSON.stringify(org, null, 1) + "\n"); console.log(`${org.length} roles → ${process.argv[3]}`);
}
