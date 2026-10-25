#!/usr/bin/env node
// System 3 Company's events tool for the city HQ (`eventsCmd`): its own log (company/ops/events.jsonl, its schema:
// { id, ts, type, room, actor, summary, agent?, subjects?, refs?, tokens? }) as v1 events ({ v, t, type, by, … }).
// Read-only. Every event keeps its own type as `src` and its id, so nothing is lost; the HQ's pages read the v1 types:
//   note        notes, commits, merges, reviews, verifies, reports, kudos, publishes, org changes (with `kind`)
//   wake/idle   a role dispatched (wake) and its report (idle), so the rooms show who is working
//   spend       a finished run's tokens (unit: tokens; the company's ledger is in tokens, not dollars)
//   board.post  decisions, founder decisions, incidents and proposals (kind, area, text, evidence)
//   meeting     rituals (WBR, retro, crits, digests), with the record they wrote
//   node hq-events.mjs [<company root>]    prints JSON lines
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BOARD = { decision: "decision", founder: "founder decision", incident: "incident", proposal: "proposal", blocked: "blocked", announcement: "announcement" };
export function toV1(e) {
  const base = { v: 1, t: e.ts, by: e.actor ?? "unknown", src: e.type, id: e.id, ...(e.room ? { room: e.room } : {}), ...(e.refs?.length ? { refs: e.refs } : {}) };
  const text = e.summary ?? "";
  if (e.type === "usage") return [{ ...base, type: "spend", tokens: e.tokens ?? 0, usd: 0, text }];
  if (e.type === "dispatch") return [{ ...base, type: "note", to: "all", kind: "dispatch", text }, ...(e.actor === "chief-of-staff" ? [] : [{ ...base, type: "wake" }])];
  if (e.type === "report") return [{ ...base, type: "note", to: "all", kind: "report", text }, { ...base, type: "idle" }];
  if (e.type === "stopped") return [{ ...base, type: "note", to: "all", kind: "stopped", text }, { ...base, type: "idle" }];
  if (BOARD[e.type]) return [{ ...base, type: "board.post", kind: BOARD[e.type], area: e.room ?? "", text, evidence: (e.refs ?? []).join(", "), wrongIf: "" }];
  if (e.type === "ritual") return [{ ...base, type: "meeting", title: text, attendees: [e.actor, ...(e.subjects ?? [])].filter(Boolean), decisions: [], objections: [], record: e.refs?.[0] ?? null }];
  return [{ ...base, type: "note", to: e.subjects?.[0] ?? "all", kind: e.type, text }];
}
export function hqEvents(root) {
  const src = [], out = [];
  for (const l of fs.readFileSync(path.join(root, "company/ops/events.jsonl"), "utf8").split("\n")) { if (!l.trim()) continue; try { src.push(JSON.parse(l)); } catch {} }
  // a dispatch names its run (key), not the role; the run's report names the role: so the role wakes at its dispatch
  const worker = {}; for (const e of src) if ((e.type === "report" || e.type === "stopped" || e.type === "usage") && e.key && e.actor) worker[e.key] ??= e.actor;
  for (const e of src) { out.push(...toV1(e)); if (e.type === "dispatch" && worker[e.key] && worker[e.key] !== e.actor) out.push({ v: 1, t: e.ts, type: "wake", by: worker[e.key], src: "dispatch", id: `${e.id}:wake` }); }
  return out.filter((e) => e.t).sort((a, b) => a.t.localeCompare(b.t));
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../../.."));
  process.stdout.write(hqEvents(root).map((e) => JSON.stringify(e)).join("\n") + "\n");
}
