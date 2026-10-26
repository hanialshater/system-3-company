#!/usr/bin/env node
// System 3 Company's events tool for the city HQ (`eventsCmd`): its own log (company/ops/events.jsonl, its schema:
// { id, ts, type, room, actor, summary, agent?, subjects?, refs?, tokens? }) as v1 events ({ v, t, type, by, … }).
// Read-only. Every event keeps its own type as `src` and its id, so nothing is lost; the HQ's pages read the v1 types:
//   note        notes, commits, merges, reviews, verifies, reports, kudos, publishes, org changes (with `kind`)
//   kudos       a kudos also as the city's kudos event: { from, to, for, refs, emoji? } (tools/kudos.mjs)
//   wake/idle   a role dispatched (wake) and its report (idle), so the rooms show who is working
//   spend       a finished run's tokens (unit: tokens; the company's ledger is in tokens, not dollars)
//   board.post  decisions, founder decisions, incidents and proposals (kind, area, text, evidence)
//   meeting     rituals (WBR, retro, crits, digests), with the record they wrote
//   node hq-events.mjs [<company root>]    prints JSON lines
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BOARD = { decision: "decision", founder: "founder decision", incident: "incident", proposal: "proposal", blocked: "blocked", announcement: "announcement" };
// the minutes of a ritual, from the record it wrote: who took part (the header's owner, chair, presents, members,
// attendees, reviewers: the names that are roles), its decisions and objections (the bullets under those headings)
let roles = null, minutes = null;
export function minutesReader(root) {
  try { roles = new Set(fs.readdirSync(path.join(root, ".claude/agents")).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3))); } catch { roles = new Set(); }
  const cache = new Map();
  minutes = (rel) => {
    if (!rel) return null; if (cache.has(rel)) return cache.get(rel);
    let text = ""; try { text = fs.readFileSync(path.join(root, rel), "utf8"); } catch { cache.set(rel, null); return null; }
    const lines = text.split("\n"), head = lines.slice(0, 8).join(" "), attendees = new Set(); let chair = null;
    for (const part of head.split(/\s+·\s+|\n/)) { const m = /^\s*\**(owner|chair|presents|members|attendees[^:]*|reviewers|metrics|run by)\**\s*:\s*(.+)$/i.exec(part); if (!m) continue;
      for (const id of m[2].match(/[a-z][a-z0-9]*(?:-[a-z0-9]+)+|[a-z]{4,}/g) ?? []) if (roles.has(id)) { attendees.add(id); if (/owner|chair/i.test(m[1])) chair ??= id; } if (/founder/.test(m[2])) attendees.add("founder"); }
    const section = (re) => { const out = []; let on = false; for (const l of lines) { if (/^##\s/.test(l)) { on = re.test(l); continue; } if (on) { const b = /^\s*(?:[-*]|\d+\.)\s+(.*)/.exec(l); if (b) out.push(b[1].replace(/\*\*/g, "").slice(0, 300)); } } return out.slice(0, 12); };
    const summary = lines.slice(1).join("\n").split(/\n\s*\n/).map((x) => x.trim()).find((x) => x && !/^(#|\||[-*]\s|>|```|owner:|chair:)/i.test(x) && x.length > 40)?.replace(/\s+/g, " ").slice(0, 400) ?? null;
    const r = { chair, attendees: [...attendees], decisions: section(/decision/i), objections: section(/objection/i), summary }; cache.set(rel, r); return r;
  };
}
// what a board post is about: the company folder its first record lives in (constitution, engineering, product, …),
// else the founder's own decisions, else the room it was posted from
const areaOf = (e) => { const r = (e.refs ?? []).find((x) => /^company\/[\w-]+\//.test(x)); if (r) return r.split("/")[1].replace(/-/g, " "); if (e.type === "founder") return "founder decisions"; return e.room ?? "general"; };
export function toV1(e) {
  const base = { v: 1, t: e.ts, by: e.actor ?? "unknown", src: e.type, id: e.id, ...(e.room ? { room: e.room } : {}), ...(e.refs?.length ? { refs: e.refs } : {}) };
  const text = e.summary ?? "";
  if (e.type === "usage") return [{ ...base, type: "spend", tokens: e.tokens ?? 0, usd: 0, text }];
  if (e.type === "dispatch") return [{ ...base, type: "note", to: "all", kind: "dispatch", text }, ...(e.actor === "chief-of-staff" ? [] : [{ ...base, type: "wake" }])];
  if (e.type === "report") return [{ ...base, type: "note", to: "all", kind: "report", text }, { ...base, type: "idle" }];
  if (e.type === "stopped") return [{ ...base, type: "note", to: "all", kind: "stopped", text }, { ...base, type: "idle" }];
  if (BOARD[e.type]) return [{ ...base, type: "board.post", kind: BOARD[e.type], area: areaOf(e), text, evidence: (e.refs ?? []).join(", "), wrongIf: "" }];
  if (e.type === "ritual") { const m = minutes?.(e.refs?.find((r) => /records\/.*\.md$/.test(r))) ?? {};
    return [{ ...base, type: "meeting", title: text, attendees: [...new Set([e.actor, ...(m.attendees ?? []), ...(/founder/i.test(text) || e.room === "boardroom" ? ["founder"] : []), ...(e.subjects ?? []).filter((x) => roles?.has(x))].filter(Boolean))], chair: m.chair ?? e.actor, decisions: m.decisions ?? [], objections: m.objections ?? [], summary: m.summary ?? null, record: e.refs?.find((r) => /\.md$/.test(r)) ?? null }]; }
  // a kudos (tools/kudos.mjs) stays a note, as before, and is also the city's v1 kudos event (additive): who thanks whom,
  // for what, with its records, for the Kudos pages
  if (e.type === "kudos") return [{ ...base, type: "note", to: e.subjects?.[0] ?? "all", kind: e.type, text }, { ...base, id: `${e.id}:kudos`, type: "kudos", from: e.actor ?? "unknown", to: e.subjects?.[0] ?? null, for: e.body ?? text, refs: e.refs ?? [], ...(/^\p{Extended_Pictographic}/u.test(text) ? { emoji: [...text][0] } : {}) }];
  return [{ ...base, type: "note", to: e.subjects?.[0] ?? "all", kind: e.type, text }];
}
export function hqEvents(root) {
  const src = [], out = []; minutesReader(root);
  for (const l of fs.readFileSync(path.join(root, "company/ops/events.jsonl"), "utf8").split("\n")) { if (!l.trim()) continue; try { src.push(JSON.parse(l)); } catch {} }
  // a dispatch names its run (key), not the role; the run's report names the role: so the role wakes at its dispatch
  const worker = {}; for (const e of src) if ((e.type === "report" || e.type === "stopped" || e.type === "usage") && e.key && e.actor) worker[e.key] ??= e.actor;
  for (const e of src) { out.push(...toV1(e)); if (e.type === "dispatch" && worker[e.key] && worker[e.key] !== e.actor) out.push({ v: 1, t: e.ts, type: "wake", by: worker[e.key], src: "dispatch", id: `${e.id}:wake` }); }
  return out.filter((e) => e.t).sort((a, b) => a.t.localeCompare(b.t));
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  process.stdout.write(hqEvents(root).map((e) => JSON.stringify(e)).join("\n") + "\n");
}
