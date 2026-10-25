// A migration bridge, not part of the starter (the kernel will emit v1 events itself): reads a kernel company's state (live/<run>/state.json: the corporate archetype's engine, meta.mjs) as v1 events, so
// the starter HQ shows it beside crews and benchmarks. Closed meetings become `meeting` events with their minutes
// (meetings.mjs); the rest of the kernel's log comes through as `kernel.<type>` events, newest last.
import fs from "node:fs";

const MIN = 60000; // the kernel's clock counts minutes since the epoch
const plain = (v) => (v && typeof v === "object" ? (v.__map ? Object.fromEntries(v.__map.map(([k, x]) => [k, plain(x)])) : v.__set ? v.__set : Array.isArray(v) ? v.map(plain) : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plain(x)]))) : v);
const iso = (min) => new Date(Math.round(min * MIN)).toISOString();

export function kernelEvents(stateFile) {
  let s; try { s = JSON.parse(fs.readFileSync(stateFile, "utf8")); } catch { return []; }
  const log = s.log?.events ?? [], ev = [];
  const genesis = log.find((e) => e.type === "org-genesis");
  if (genesis) ev.push({ v: 1, t: iso(genesis.t), type: "company.start", by: "kernel", roles: genesis.roles ?? [], budget: null });
  // rooms: a role enters a room for a stage and goes back to its home room when it leaves (the HQ's Rooms page)
  const home = Object.fromEntries(kernelOrg(stateFile, s).map((r) => [r.id, r.room]));
  for (const e of log) if (e.type !== "org-genesis" && !e.type?.startsWith("meeting")) ev.push({ v: 1, t: iso(e.t), type: `kernel.${e.type}`, by: e.by ?? e.role ?? e.from ?? "kernel", ...Object.fromEntries(Object.entries(e).filter(([k]) => !["seq", "t", "type", "by"].includes(k))), ...(e.type === "leave" && e.role && home[e.role] ? { room: home[e.role] } : {}) });
  const meetings = Object.values(plain(s.data?.meetings?.meetings) ?? {});
  for (const m of meetings.filter((x) => x.state === "closed")) {
    const objections = m.agenda.flatMap((a) => a.objections.map((o) => `${o.by}: ${o.text}${o.answer ? ` → ${o.answer.how}: ${o.answer.text}` : ""}`));
    ev.push({ v: 1, t: iso(m.closed ?? m.opened), type: "meeting", by: m.chair, id: m.id, title: m.title, attendees: m.present ?? m.invitees, decisions: m.agenda.filter((a) => a.decision).map((a) => `${a.title}: ${a.decision.text}`), objections, text: m.minutes ?? "" });
  }
  return ev.sort((a, b) => Date.parse(a.t) - Date.parse(b.t));
}

/** the kernel's org: its roles with their level, reporting line, lane and home room */
export function kernelOrg(stateFile, s = null) {
  try { s ??= JSON.parse(fs.readFileSync(stateFile, "utf8")); } catch { return []; }
  return Object.values(plain(s.org?.roles) ?? {}).filter((r) => r.active !== false).map((r) => ({ id: r.id, title: r.level ?? "", reportsTo: r.reportsTo ?? null, team: r.lane ?? null, room: r.room ?? null, floor: r.floor ?? null }));
}
