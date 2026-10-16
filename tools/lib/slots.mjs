#!/usr/bin/env node
// Slot ledger (W-1173 / W-1196, retro 2026-10-16 C2): one O_EXCL file per in-flight agent in company/ops/slots/,
// recording who runs (role), where (lane), why (source) and who chose it (chooser). dispatch-check claims a slot
// when it passes and reads the ledger as a third count for the caps (the event log and the caller's count are the
// other two; the largest wins). A slot is released by a later `report` or `stopped` event (see assignReleases:
// the agent label, the hook's tool-use-id joined to its dispatch event, or a batch item named in a summary),
// or by hand (`node tools/lib/slots.mjs release <id>`). Events are the log plus the hook spool (W-1240 F8).
//
// source is one of:
//   batch=<file>#B<n>   a manager's batch item (company/ceo-office/dispatch-requests.md §2-§3)
//   SO-<lane>-<n>       a standing order issued in a batch's "standing orders" (§2.3); `batch=SO-…` is accepted too
//   §4:<reason>         something the chief of staff may still do alone (§4: integration, emergencies, rituals ...)
//
// The folder is runtime state (gitignored except its README). History lives in events.jsonl, not here.
// S3_SLOTS_DIR overrides the folder (tests). S3_EVENTS overrides the event log (as everywhere).
//
// CLI:
//   node tools/lib/slots.mjs list [--json]      every slot: age, stale (> 6 h), released by an event
//   node tools/lib/slots.mjs release <id>       delete one slot (the agent reported, or was never dispatched)
//   node tools/lib/slots.mjs prune              delete the slots an event already released
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeById, readJsonlFile, readSpool } from "./events-spool.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const STALE_H = 6;
export const slotsDir = (root = ROOT) => (process.env.S3_SLOTS_DIR ? path.resolve(process.env.S3_SLOTS_DIR) : path.join(root, "company/ops/slots"));
const eventsPath = (root = ROOT) => (process.env.S3_EVENTS ? path.resolve(process.env.S3_EVENTS) : path.join(root, "company/ops/events.jsonl"));

// The log plus the hook spool, deduped by id (the same reader as dispatch-check; W-1240 F8): reports still in the
// spool release slots before the chief of staff's next fold. Unreadable lines are skipped.
export function readEvents(root = ROOT) {
  const log = readJsonlFile(eventsPath(root)).events;
  let spool = [];
  try { spool = readSpool().events; } catch {}
  return mergeById(log, spool);
}

// Ritual ids a role takes part in: the first word of each entry of its `rituals:` list in tools/org/roles.mjs
// (W-1240 Q1, F6). Data, generated into the onboarding docs, so a free-text reason cannot widen it.
let ROLES = null;
try { ({ roles: ROLES } = await import("../org/roles.mjs")); } catch { ROLES = null; }
export function roleRituals(role) {
  const r = (ROLES ?? []).find((x) => x.id === role);
  return new Set((r?.rituals ?? []).map((x) => String(x).trim().split(/\s+/)[0]).filter(Boolean));
}

// ---- sources
export function parseSource(raw) {
  if (raw === undefined || raw === null || raw === true || String(raw).trim() === "") return { type: null, raw: null };
  const s = String(raw).trim();
  let m;
  if ((m = /^§4:\s*(.*)$/s.exec(s))) return { type: "s4", reason: m[1].trim(), raw: s };
  const body = s.replace(/^batch=/, "");
  if ((m = /^(SO-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-\d+)$/.exec(body))) return { type: "so", so: m[1], raw: s };
  if ((m = /^(.+\.md)#B(\d+)$/.exec(body)) && s.startsWith("batch=")) return { type: "batch", file: m[1], item: Number(m[2]), raw: s };
  return { type: "bad", raw: s };
}

// Header fields of a batch file: `poc: <role> (<name>)`, `lane: <n> …`.
export function batchHeader(text) {
  const head = text.split(/^## /m)[0];
  const poc = /^poc:\s*([a-z0-9-]+)/m.exec(head)?.[1] ?? null;
  const lane = /^lane:\s*(\d+)/m.exec(head)?.[1] ?? null;
  return { poc, lane };
}
// The `role:` line of item B<n>, or null when the item is not in the file.
export function batchItemRole(text, n) {
  const parts = text.split(/^(?=## )/m);
  const item = parts.find((p) => new RegExp(`^## B${n}\\b`).test(p));
  if (!item) return undefined;
  return /^role:\s*([a-z0-9-]+)/m.exec(item)?.[1] ?? null;
}

const batchDirs = (root) => [
  path.join(root, "company/ops/dispatch-requests"),
  ...(() => { const d = path.join(root, "company/initiatives"); return fs.existsSync(d) ? fs.readdirSync(d).map((i) => path.join(d, i, "dispatch")) : []; })(),
].filter((d) => fs.existsSync(d));

// The batch file that issued a standing order: the one whose text defines it ("SO-x-n (new" or a
// `standing orders:` header line naming it); else the earliest file that mentions it.
export function findStandingOrder(so, root = ROOT) {
  const files = batchDirs(root).flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".md")).map((f) => path.join(d, f))).sort();
  const re = new RegExp(`${so}\\b`);
  const defines = new RegExp(`(${so}\\s*\\(new|^standing orders:.*${so}\\b)`, "m");
  const hits = files.filter((f) => re.test(fs.readFileSync(f, "utf8")));
  return hits.find((f) => defines.test(fs.readFileSync(f, "utf8"))) ?? hits[0] ?? null;
}

// Resolve a source to its lane and chooser, with S1 problems (strings) for anything that does not hold.
export function resolveSource(raw, { root = ROOT, role } = {}) {
  const src = parseSource(raw);
  const out = { ...src, lane: null, chooser: null, file: null, itemRole: null, problems: [] };
  if (!src.type) { out.problems.push("no source: pass --source=batch=<file>#B<n>, SO-<lane>-<n> or §4:<reason>"); return out; }
  if (src.type === "bad") { out.problems.push(`source "${src.raw}" is not batch=<file>#B<n>, SO-<lane>-<n> or §4:<reason>`); return out; }
  if (src.type === "s4") {
    if (!src.reason) out.problems.push("§4 source with no reason: write §4:<integration | emergency | ritual | resume | manager run>: <what>");
    out.chooser = "chief-of-staff";
    out.lane = "19";
    return out;
  }
  if (src.type === "batch") {
    const abs = path.resolve(root, src.file);
    if (!fs.existsSync(abs)) { out.problems.push(`batch file ${src.file} does not exist`); return out; }
    out.file = path.relative(root, abs);
    const text = fs.readFileSync(abs, "utf8");
    const h = batchHeader(text);
    out.lane = h.lane; out.chooser = h.poc;
    if (!h.poc) out.problems.push(`${out.file} has no "poc:" line, so nobody is on record as the chooser`);
    const itemRole = batchItemRole(text, src.item);
    if (itemRole === undefined) out.problems.push(`${out.file} has no item "## B${src.item}"`);
    else {
      out.itemRole = itemRole;
      if (role && itemRole && itemRole !== role) out.problems.push(`${out.file}#B${src.item} names role ${itemRole}, not ${role} (the chief of staff never changes an item's role, §3.3)`);
    }
    return out;
  }
  // standing order
  const f = findStandingOrder(src.so, root);
  if (!f) { out.problems.push(`standing order ${src.so} is not in any batch file`); return out; }
  out.file = path.relative(root, f);
  const h = batchHeader(fs.readFileSync(f, "utf8"));
  out.lane = h.lane; out.chooser = h.poc;
  if (!h.poc) out.problems.push(`${out.file} (which issued ${src.so}) has no "poc:" line`);
  return out;
}

// ---- roles and lanes
export function agentRoles(root = ROOT) {
  const d = path.join(root, ".claude/agents");
  return new Set(fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)) : []);
}
// Lane number -> { poc, roles } from the table in company/ceo-office/poc-map.md. A role is in a lane when its id
// appears as a whole word in the POC or roles column. Prose, so the result is advisory (warn), never a refusal.
export function pocLanes(root = ROOT) {
  const p = path.join(root, "company/ceo-office/poc-map.md");
  const lanes = new Map();
  if (!fs.existsSync(p)) return lanes;
  const known = agentRoles(root);
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = /^\|\s*(\d+)\s*\|[^|]*\|([^|]*)\|([^|]*)\|/.exec(line);
    if (!m) continue;
    const text = `${m[2]} ${m[3]}`;
    const roles = new Set([...known].filter((r) => new RegExp(`(^|[^a-z0-9-])${r}([^a-z0-9-]|$)`).test(text)));
    lanes.set(m[1], { poc: /([a-z0-9-]+)\s*\(/.exec(m[2])?.[1] ?? null, roles });
  }
  return lanes;
}
export const lanesOf = (role, lanes) => [...lanes].filter(([, l]) => l.roles.has(role)).map(([n]) => n);
const CHECKERS_FALLBACK = ["fact-checker", "qa-tester", "learner-evaluator", "accessibility-reviewer", "pedagogy-critic", "lifehacks-safety-reviewer", "privacy-reviewer", "cultural-reviewer"];
export function checkerRoles(root = ROOT) {
  const l = pocLanes(root).get("10");
  const roles = l ? [...l.roles].filter((r) => r !== l.poc) : [];
  return new Set(roles.length ? roles : CHECKERS_FALLBACK);
}

// ---- rules S1, S2, S4 (S3 is the count, done by the caller against the caps)
// Returns { fails: [{rule, msg}], warns: [], slot } where slot is what would be claimed.
export function evaluate({ role, source, chooser, kind, agent, s4 = false, root = ROOT }) {
  const fails = [], warns = [];
  const roleId = role === true ? undefined : role;
  const src = resolveSource(source, { root, role: roleId });
  for (const p of src.problems) fails.push({ rule: "S1", msg: p });
  if (!roleId) fails.push({ rule: "S1", msg: "no --role: the slot cannot say who runs" });
  const ch = chooser === true ? undefined : chooser;
  if (!ch && !src.chooser) fails.push({ rule: "S1", msg: "no --chooser, and the source names none" });
  if (ch && src.chooser && ch !== src.chooser) fails.push({ rule: "S1", msg: `--chooser=${ch} but ${src.type === "s4" ? "a §4 dispatch is chosen by" : `${src.file ?? "the source"} has poc:`} ${src.chooser}` });
  const lanes = pocLanes(root);
  if (roleId === "general-purpose") {
    if (src.type !== "s4") fails.push({ rule: "S2", msg: "general-purpose runs only for a §4 integration task (source §4:integration: …); a missing role is never run as general-purpose (poc-map rule 4)" });
    else if (!/^integration:\s*\S/i.test(src.reason ?? "")) fails.push({ rule: "S2", msg: `general-purpose with §4 reason "${src.reason}": only §4:integration: <what> allows it` });
  } else if (roleId && !agentRoles(root).has(roleId)) fails.push({ rule: "S2", msg: `role ${roleId} has no .claude/agents/${roleId}.md` });
  else if (roleId && src.lane && lanes.size && src.type !== "s4" && !lanes.get(src.lane)?.roles.has(roleId)) {
    const in_ = lanesOf(roleId, lanes);
    warns.push(`role ${roleId} is not listed in lane ${src.lane} of poc-map.md${in_.length ? ` (it is in lane ${in_.join(", ")})` : ""}`);
  }
  // Q1 (W-1240): a §4 ritual the role takes part in is not a builder choosing its own checker: `§4:ritual: <id>`
  // passes S4 when <id> is the first word of an entry in the role's rituals: list. Any other §4 source fails.
  const ritualId = src.type === "s4" ? /^ritual:\s*([a-z0-9-]+)(?![a-z0-9-])/i.exec(src.reason ?? "")?.[1]?.toLowerCase() : null;
  const ritualOk = !!ritualId && roleRituals(roleId).has(ritualId);
  if (s4 && roleId && checkerRoles(root).has(roleId) && !ritualOk && !((src.type === "batch" || src.type === "so") && src.lane === "10")) {
    fails.push({ rule: "S4", msg: `${roleId} is a lane-10 checker; it is dispatched only from a lane-10 batch or standing order (F-28, poc-map rule 3), not ${src.raw ?? "no source"}` });
  }
  const laneOfRole = roleId ? lanesOf(roleId, lanes) : [];
  const slot = {
    role: roleId ?? null,
    lane: src.lane ?? (laneOfRole.length === 1 ? laneOfRole[0] : laneOfRole.join(",") || null),
    source: src.raw ?? "none",
    chooser: ch ?? src.chooser ?? null,
    kind: kind ?? null,
    agent: agent === true || agent === undefined ? null : String(agent),
  };
  return { fails, warns, slot, src };
}

// ---- the ledger
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
export const slotId = ({ agent, role, source }) => slug(agent ? agent : `${role ?? "unknown"}--${source ?? "none"}`);
const slotPath = (id, dir) => path.join(dir, `${id}.json`);

export function readSlot(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; }
}
// Claim a slot with O_EXCL: if two dispatches race for the same id, exactly one wins. A stale slot (> 6 h) with the
// same id is replaced (its agent is presumed gone), and the result says so.
export function claim(slot, { dir = slotsDir(), now = Date.now() } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  const id = slot.id ?? slotId(slot);
  const file = slotPath(id, dir);
  let replaced = null;
  if (fs.existsSync(file)) {
    const prev = readSlot(file);
    const t = prev?.ts ? Date.parse(prev.ts) : fs.statSync(file).mtimeMs; // L2: an unreadable slot ages by mtime
    if (now - t > STALE_H * 3.6e6) { fs.rmSync(file, { force: true }); replaced = prev ?? { id, ts: new Date(t).toISOString(), unreadable: true }; }
  }
  const body = { id, ...slot, ts: new Date(now).toISOString() };
  try {
    const fd = fs.openSync(file, "wx");
    fs.writeSync(fd, JSON.stringify(body) + "\n");
    fs.closeSync(fd);
    return { ok: true, id, file, slot: body, replaced };
  } catch (e) {
    if (e.code !== "EEXIST") throw e;
    return { ok: false, id, file, held: readSlot(file) };
  }
}
export function release(id, { dir = slotsDir() } = {}) {
  const file = slotPath(slug(id), dir);
  if (!fs.existsSync(file)) return false;
  fs.rmSync(file);
  return true;
}

// Batch references in an event summary: `batch=<path or …abbreviated>#B<n>`, as [{ tail, item }], where tail is the
// file part after the last "/" or "…" (`…r2-tools.md#B2` -> tail "r2-tools.md").
export const summaryRefs = (summary) => [...String(summary ?? "").matchAll(/batch=([^\s#]*?\.md)#B(\d+)\b/g)].map((m) => ({ tail: m[1].split(/[\/…]/).pop(), item: Number(m[2]) }));

// Two sources name the same work (W-1240 F1, F4): a batch item by resolved path (by file name when one side is
// abbreviated and not on disk) and exact item number; a standing order by id (`batch=` stripped); a §4 reason when
// the event's reason starts with the slot's first 79 characters (the hook cuts §4 reasons to 79 + "…", and takes
// the reason from the prompt's whole line, which may run on past the --source the chief of staff passed).
export function sameSource(a, b, root = ROOT) {
  const p = parseSource(a), q = parseSource(b);
  if (!p.type || !q.type || p.type !== q.type) return false;
  if (p.type === "so") return p.so === q.so;
  if (p.type === "batch") {
    if (p.item !== q.item) return false;
    const pa = path.resolve(root, p.file), qa = path.resolve(root, q.file);
    if (pa === qa) return true;
    const abbreviated = (f) => f.includes("…") || !fs.existsSync(path.resolve(root, f));
    return (abbreviated(p.file) || abbreviated(q.file)) && path.basename(p.file.split("…").pop()) === path.basename(q.file.split("…").pop());
  }
  if (p.type === "s4") {
    const sr = p.reason.slice(0, 79), er = q.reason.replace(/…$/, "");
    return sr.length > 0 && er.startsWith(sr);
  }
  return false;
}

const tsOf = (x) => Date.parse(x?.ts ?? "");
// Which report released which slot. Each report or stopped event releases at most ONE slot: the first rule that
// matches, and within a rule the oldest live slot (so a standing order run twice releases one run per report).
// Only slots claimed at or before the report count.
//   1. label:  the event's agent is the slot's --agent, or the hook's form "<slot.agent> ·<hash>" (F1 fallback).
//   2. hook:   the event's toolUseId has a dispatch event (written by .claude/hooks/agent-events.mjs) whose role
//              (subjects[0]) is the slot's role and whose source is the slot's source (sameSource), and the slot was
//              claimed no later than 60 s after that dispatch (dispatch-check runs before the Agent call).
//   3. summary: an unlabelled slot, and the summary names its batch item (`batch=…r2-tools.md#B2`) or standing
//              order, from the slot's role (the chief of staff's hand-written reports).
export function assignReleases(slotList, events, { root = ROOT } = {}) {
  const dispatchByTU = new Map();
  for (const e of events) if (e?.type === "dispatch" && e.toolUseId && !dispatchByTU.has(e.toolUseId)) dispatchByTU.set(e.toolUseId, e);
  const reports = events.filter((e) => (e?.type === "report" || e?.type === "stopped") && Number.isFinite(tsOf(e))).sort((a, b) => tsOf(a) - tsOf(b));
  const open = slotList.filter((s) => s && !s.unreadable && Number.isFinite(tsOf(s))).sort((a, b) => tsOf(a) - tsOf(b));
  const out = new Map();
  for (const e of reports) {
    const cand = open.filter((s) => !out.has(s.id) && tsOf(s) <= tsOf(e));
    if (!cand.length) continue;
    const label = (s) => s.agent && (e.agent === s.agent || String(e.agent ?? "").startsWith(s.agent + " ·"));
    const d = e.toolUseId ? dispatchByTU.get(e.toolUseId) : null;
    const dRole = d ? (Array.isArray(d.subjects) ? d.subjects[0] : d.subjects) : null;
    const hook = (s) => d && s.role && dRole === s.role && sameSource(s.source, d.source, root) && tsOf(s) <= tsOf(d) + 60e3;
    const summary = (s) => {
      if (s.agent) return false;
      if (s.role && !(e.actor === s.role || String(e.agent ?? "").startsWith(s.role))) return false;
      const p = parseSource(s.source);
      if (p.type === "batch") { const base = path.basename(p.file); return summaryRefs(e.summary).some((r) => r.tail.length > 3 && base.endsWith(r.tail) && r.item === p.item); }
      if (p.type === "so") return new RegExp(`${p.so}(?![\\w-])`).test(e.summary ?? "");
      return false;
    };
    const pick = cand.find(label) ?? cand.find(hook) ?? cand.find(summary);
    if (pick) out.set(pick.id, { event: e, rule: label(pick) ? "label" : hook(pick) ? "hook" : "summary" });
  }
  return out;
}
// The event that released one slot (kept for callers of the single-slot form).
export function releasedBy(slot, events, opts) {
  return assignReleases([slot], events, opts).get(slot.id)?.event ?? null;
}

export function listSlots({ dir = slotsDir(), events = readEvents(), now = Date.now() } = {}) {
  if (!fs.existsSync(dir)) return [];
  const all = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => {
    const file = path.join(dir, f);
    const s = readSlot(file) ?? { id: f.slice(0, -5), ts: null, unreadable: true };
    // L2 (W-1240 F3): an unreadable file (a claim being written, or a corrupt one) ages by its mtime, so it is
    // counted while young and goes stale after 6 h like any other slot.
    let t = s.ts ? Date.parse(s.ts) : NaN;
    if (!Number.isFinite(t)) { try { t = fs.statSync(file).mtimeMs; } catch { t = now; } }
    return { ...s, id: s.id ?? f.slice(0, -5), file: f, ageH: (now - t) / 3.6e6 };
  });
  const rel = assignReleases(all, events);
  return all.map((s) => {
    const r = rel.get(s.id);
    return { ...s, stale: s.ageH > STALE_H, releasedBy: r?.event.id ?? null, releasedRule: r?.rule ?? null };
  }).sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
}
export const isBuilderSlot = (s) => s.kind === "build" || s.kind === "wave" || s.role === "demo-builder";
// In flight = not released by an event and not stale. Stale slots are reported, not counted (the same 6 h rule as
// the event-log count in dispatch-check), and are never deleted automatically.
export function inFlight(opts) {
  const all = listSlots(opts);
  const live = all.filter((s) => !s.releasedBy && !s.stale);
  return { all, live, agents: live.length, builders: live.filter(isBuilderSlot).length, stale: all.filter((s) => !s.releasedBy && s.stale), released: all.filter((s) => s.releasedBy) };
}
export function prune(opts = {}) {
  const dir = opts.dir ?? slotsDir();
  const gone = inFlight({ ...opts, dir }).released;
  for (const s of gone) fs.rmSync(path.join(dir, s.file), { force: true });
  return gone;
}

// ---- CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, arg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const json = process.argv.includes("--json");
  if (cmd === "list" || !cmd) {
    const all = listSlots();
    if (json) console.log(JSON.stringify(all, null, 2));
    else if (!all.length) console.log(`no slots in ${path.relative(ROOT, slotsDir()) || slotsDir()}`);
    else for (const s of all) console.log(`${s.stale && !s.releasedBy ? "STALE " : s.releasedBy ? "done  " : "      "}${s.id}  role=${s.role} lane=${s.lane} source=${s.source} chooser=${s.chooser} kind=${s.kind} ${s.ageH.toFixed(1)} h${s.releasedBy ? ` (released by ${s.releasedBy})` : ""}`);
  } else if (cmd === "release") {
    if (!arg) { console.error("usage: node tools/lib/slots.mjs release <id>"); process.exit(2); }
    const ok = release(arg);
    console.log(ok ? `released ${arg}` : `no slot ${arg}`);
    process.exitCode = ok ? 0 : 1;
  } else if (cmd === "prune") {
    const gone = prune();
    console.log(`pruned ${gone.length} slot(s) released by events${gone.length ? ": " + gone.map((s) => s.id).join(", ") : ""}`);
  } else { console.error("usage: node tools/lib/slots.mjs list [--json] | release <id> | prune"); process.exit(2); }
}
