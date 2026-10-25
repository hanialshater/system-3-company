#!/usr/bin/env node
// A company's org file for the HQ's Org page, from its org as data (System 3 Company: tools/org/roles.mjs):
// [{ id, name, title, reportsTo, team }], the founder at the root; names from its people data (people.mjs beside
// roles.mjs: nameFor), if it has one.
//   node tools/hq/org-from-roles.mjs <roles.mjs> [out.json]    prints the org contract (the HQ runs this live), or writes it
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

// Where each role sits (a bridge until System 3 Company keeps rooms in its org data): floor names from
// src/lib/hq-floors.ts, rooms (id, name, kind, floor) from src/lib/hq.ts, home rooms from src/app/hq/people.ts.
// Read as text (they are TypeScript); anything not found is simply left out of the org.
export function plan(root, SUBAREAS = {}) {
  const read = (f) => { try { return fs.readFileSync(path.join(root, f), "utf8"); } catch { return ""; } };
  const floorNames = Object.fromEntries([...read("src/lib/hq-floors.ts").matchAll(/^\s*(\d+): "([^"]+)"/gm)].map((m) => [Number(m[1]), m[2]]));
  const hq = read("src/lib/hq.ts"), rooms = {};
  for (const m of hq.matchAll(/\{ id: "([^"]+)", name: "([^"]+)"[^}]*?kind: "(\w+)"([^}]*)\}/g)) rooms[m[1]] = { name: m[2], kind: m[3], floor: Number(/floor: (\d+)/.exec(m[4])?.[1] ?? 1) };
  // category offices: named lists of [id, name, colour] mapped through office(…, floor)
  const lists = Object.fromEntries([...hq.matchAll(/const (\w+): \[string, string, string\]\[\] = \[([\s\S]*?)\];/g)].map((m) => [m[1], [...m[2].matchAll(/\["([^"]+)", "([^"]+)"/g)].map((x) => [x[1], x[2]])]));
  for (const m of hq.matchAll(/\.\.\.(\w+)\.map\([^)]*\) => office\([^)]*, (\d+)\)\)/g)) for (const [id, name] of lists[m[1]] ?? []) rooms[`cm-${id}`] = { name, kind: "office", floor: Number(m[2]) };
  const people = read("src/app/hq/people.ts"), home = {};
  const block = /export const HOME[^{]*\{([\s\S]*?)\n\};/.exec(people)?.[1] ?? "";
  for (const m of block.matchAll(/^\s*"?([\w-]+)"?: "([\w-]+)",?$/gm)) home[m[1]] = m[2];
  const cms = /for \(const d of \[([^\]]+)\]\) HOME\[`cm-\$\{d\}`\]/.exec(people)?.[1];
  if (cms) for (const d of cms.match(/"([\w-]+)"/g).map((x) => x.slice(1, -1))) home[`cm-${d}`] = `cm-${d}`;
  for (const [d, subs] of Object.entries(SUBAREAS)) for (const [sub] of subs) home[`cm-${d}-${sub}`] ??= `cm-${d}`;
  return { floorNames, rooms, home };
}
export function seating(root, roles = [], SUBAREAS = {}) {
  const { floorNames, rooms, home } = plan(root, SUBAREAS);
  const out = {};
  for (const r of roles) { const rid = home[r.id], room = rid && rooms[rid]; if (!room) continue; out[r.id] = { room: rid, roomName: room.name, roomKind: room.kind, floor: room.floor, floorName: floorNames[room.floor] }; }
  return out;
}

export async function orgFromRoles(file) {
  const { roles, SUBAREAS = {} } = await import(pathToFileURL(path.resolve(file)).href);
  const seats = seating(path.resolve(path.dirname(path.resolve(file)), "..", ".."), roles, SUBAREAS);
  let nameFor = () => null; try { nameFor = (await import(pathToFileURL(path.join(path.dirname(path.resolve(file)), "people.mjs")).href)).nameFor; } catch {}
  const name = (id) => { const n = nameFor(id); return n && n !== id ? n : undefined; };
  const ids = new Set(roles.map((r) => r.id));
  // the founder is the root: as a role in the data if there is one (it reports to no one), else added
  const root = ids.has("founder") ? [] : [{ id: "founder", title: "Founder (CEO)", reportsTo: null, team: null }];
  return [...root, ...roles.map((r) => ({ id: r.id, name: name(r.id), ...(seats[r.id] ?? {}), title: r.title, reportsTo: r.id === "founder" ? null : ids.has(r.reportsTo) && r.reportsTo !== r.id ? r.reportsTo : "founder", team: r.team ?? null }))];
}
/** the building (the HQ's building contract): every room, homed or not (meeting rooms included), and the floors */
export async function building(file) {
  const { SUBAREAS = {} } = await import(pathToFileURL(path.resolve(file)).href);
  const { floorNames, rooms } = plan(path.resolve(path.dirname(path.resolve(file)), "..", ".."), SUBAREAS);
  return { floors: Object.entries(floorNames).map(([n, name]) => ({ n: Number(n), name })).sort((a, b) => a.n - b.n), rooms: Object.entries(rooms).map(([id, r]) => ({ id, name: r.name, kind: r.kind, floor: r.floor })) };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (process.argv[2] === "--building") { console.log(JSON.stringify(await building(process.argv[3]))); process.exit(0); }
  const org = await orgFromRoles(process.argv[2]);
  if (process.argv[3]) { fs.writeFileSync(process.argv[3], JSON.stringify(org, null, 1) + "\n"); console.log(`${org.length} roles → ${process.argv[3]}`); } else console.log(JSON.stringify(org));
}
