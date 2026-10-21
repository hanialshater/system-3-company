// Group meetings: agenda → rounds of private-then-revealed positions → whiteboard → decisions and actions → minutes.
//
//   open      the chair books a meeting room (building.mjs) for the invitees and sets an agenda: items may cite
//             tracker items or goals, so the meeting starts from the record, not from memory
//   rounds    for each agenda item, every invitee writes a position privately. Nobody can read others' positions
//             until they have written their own or the round is revealed (no anchoring). The chair reveals when all
//             have written or the deadline passes; missing participants are named, never filled in.
//   board     a shared whiteboard: sections anyone present may append to, each line with its author
//   objections raised against an item; a decision on that item must answer each one (answered or carried, with text):
//             objections travel with decisions
//   decide    the chair records the decision per item; actions become tracker items (kind action, assignee, due)
//   close     only when every item is decided or deferred; writes the minutes (markdown) from the record, and posts a
//             summary to the meeting's channel if one is given
import { Refused } from "./lib.mjs";
import { book, releaseBooking } from "./building.mjs";
import { create as createItem } from "./tracker.mjs";
import { post, mayPost } from "./channels.mjs";
import { validateChecks, mergeChecks } from "./state.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
const store = (co) => (co.data.meetings ??= { meetings: new Map(), n: 0 });
const now = (co) => co.engine.clock.now();

export function openMeeting(co, { by, title, room, start, minutes = 30, invitees, agenda, channel = null, kind = "meeting" }) {
  const s = store(co);
  if (!co.org.role(by)?.active) refuse(`no active role ${by}`);
  if (!Array.isArray(agenda) || !agenda.length) refuse("a meeting has an agenda");
  for (const a of agenda) {
    if (!a.title) refuse("an agenda item has a title");
    if (a.item && !co.data.tracker?.items?.has(a.item)) refuse(`no tracker item ${a.item}`);
    if (a.goal && !co.data.goals?.goals?.has(a.goal)) refuse(`no goal ${a.goal}`);
  }
  for (const i of invitees) if (!co.org.role(i)?.active) refuse(`no active role ${i}`);
  // where the minutes go is checked now, not at close (found in tests: a manager's minutes aimed at the company channel)
  if (channel) { const c = co.data.channels?.channels?.get(channel); if (!c) refuse(`no channel ${channel}`); if (!mayPost(co, by, c)) refuse(`${by} may not post minutes to ${channel}`); }
  const people = [...new Set([by, ...invitees])];
  const bk = room ? book(co, { by, room, start: start ?? now(co), end: (start ?? now(co)) + minutes, attendees: people, purpose: title }) : null;
  const id = `MTG-${++s.n}`;
  const m = { id, kind, title, chair: by, invitees: people, booking: bk?.id ?? null, room: room ?? null, channel, opened: now(co), state: "open",
    agenda: agenda.map((a, i) => ({ n: i + 1, title: a.title, item: a.item ?? null, goal: a.goal ?? null, rounds: [{ n: 1, positions: {}, revealed: false }], objections: [], decision: null, deferred: null })),
    board: {}, present: new Set([by]) };
  s.meetings.set(id, m);
  co.log.add({ type: "meeting-open", meeting: id, kind, chair: by, invitees: people.length, agenda: m.agenda.length, room: room ?? null });
  return m;
}

const get = (co, id) => { const m = store(co).meetings.get(id); if (!m) refuse(`no meeting ${id}`); return m; };
const item = (m, n) => { const a = m.agenda.find((x) => x.n === n); if (!a) refuse(`no agenda item ${n}`); return a; };
const invited = (m, by) => { if (!m.invitees.includes(by)) refuse(`${by} is not invited to ${m.id}`); };

export function writePosition(co, { id, by, n, text }) {
  const m = get(co, id); invited(m, by);
  if (m.state !== "open") refuse(`${id} is ${m.state}`);
  const a = item(m, n);
  if (a.decision || a.deferred) refuse(`item ${n} is already settled`);
  const r = a.rounds.at(-1);
  if (r.revealed) refuse(`round ${r.n} of item ${n} is revealed: wait for the next round`);
  if (!text) refuse("a position has text");
  r.positions[by] = { text, t: now(co) };
  m.present.add(by);
  co.log.add({ type: "position", meeting: id, item: n, round: r.n, by });
  return { item: n, round: r.n, written: Object.keys(r.positions).length, of: m.invitees.length };
}

/** Read a round: before reveal, only a participant who has written may read, and only their own. */
export function readRound(co, { id, by, n, round = null }) {
  const m = get(co, id); invited(m, by);
  const a = item(m, n);
  const r = round ? a.rounds.find((x) => x.n === round) : a.rounds.at(-1);
  if (!r) refuse(`no round ${round}`);
  if (!r.revealed) return { item: n, round: r.n, revealed: false, mine: r.positions[by]?.text ?? null, waitingFor: m.invitees.filter((i) => !r.positions[i]) };
  return { item: n, round: r.n, revealed: true, positions: Object.entries(r.positions).map(([who, p]) => ({ by: who, text: p.text })), missing: r.missing };
}

export function reveal(co, { id, by, n, force = false }) {
  const m = get(co, id);
  if (by !== m.chair) refuse(`only the chair (${m.chair}) reveals`);
  const a = item(m, n);
  const r = a.rounds.at(-1);
  const missing = m.invitees.filter((i) => !r.positions[i]);
  if (missing.length && !force) refuse(`waiting for ${missing.join(", ")} (force to reveal without them; they are named in the minutes)`);
  r.revealed = true; r.missing = missing;
  co.log.add({ type: "reveal", meeting: id, item: n, round: r.n, positions: Object.keys(r.positions).length, missing: missing.length });
  return readRound(co, { id, by, n });
}

export function nextRound(co, { id, by, n }) {
  const m = get(co, id);
  if (by !== m.chair) refuse("only the chair opens a round");
  const a = item(m, n);
  if (!a.rounds.at(-1).revealed) refuse("reveal the current round first");
  a.rounds.push({ n: a.rounds.length + 1, positions: {}, revealed: false });
  co.log.add({ type: "round-open", meeting: id, item: n, round: a.rounds.length });
  return a.rounds.at(-1);
}

export function whiteboard(co, { id, by, section, text }) {
  const m = get(co, id); invited(m, by);
  if (m.state !== "open") refuse(`${id} is ${m.state}`);
  if (!section || !text) refuse("a whiteboard line has a section and text");
  (m.board[section] ??= []).push({ by, text, t: now(co) });
  m.present.add(by);
  co.log.add({ type: "whiteboard", meeting: id, section, by });
  return m.board;
}

export function object(co, { id, by, n, text }) {
  const m = get(co, id); invited(m, by);
  const a = item(m, n);
  if (a.decision) refuse(`item ${n} is decided`);
  if (!text) refuse("an objection has text");
  a.objections.push({ k: a.objections.length + 1, by, text, answer: null });
  co.log.add({ type: "objection", meeting: id, item: n, by });
  return a.objections.at(-1);
}

/** The chair decides an item. Each objection must be answered or carried, with text. Actions become tracker items. */
/** A decision's checkable rules become checks (benchmark 2: the kickoff decided "why lines ≤ 20 words", no check
 *  carried it, and 3 of 5 rounds went back at the reader). Each rule {tasks: <task prefix>, checks} tightens every
 *  open order whose task starts with the prefix, and stands for orders placed later (applyStandingRules). */
export function applyRules(co, rules, source) {
  const out = [];
  for (const r of rules) {
    const hit = [];
    for (const o of co.engine.orders.values()) {
      if (o.stage === "done" || !String(o.task ?? "").startsWith(r.tasks)) continue;
      o.checks = mergeChecks(o.checks ?? {}, r.checks);
      hit.push(o.id);
      co.log.add({ type: "rule-applied", order: o.id, task: o.task, source, keys: Object.keys(r.checks) });
    }
    (co.data.rules ??= []).push({ ...r, source });
    out.push(hit); // per rule (live run 4: one list for all rules made the minutes misleading)
  }
  return out;
}
export function applyStandingRules(co, o) {
  for (const r of co.data.rules ?? []) if (String(o.task ?? "").startsWith(r.tasks)) { o.checks = mergeChecks(o.checks ?? {}, r.checks); co.log.add({ type: "rule-applied", order: o.id, task: o.task, source: r.source, keys: Object.keys(r.checks) }); }
}

export function decide(co, { id, by, n, decision, answers = {}, actions = [], rules = [] }) {
  const m = get(co, id);
  if (by !== m.chair) refuse("only the chair records decisions");
  const a = item(m, n);
  if (!a.rounds.some((r) => r.revealed)) refuse(`item ${n} has no revealed round: positions come before decisions`);
  if (!decision) refuse("a decision has text");
  for (const r of rules) { if (!r.tasks || !r.checks) refuse("a rule is {tasks: <task prefix>, checks: {…}}"); const e = validateChecks(r.checks); if (e) refuse(`rule for ${r.tasks}: ${e}`); }
  for (const o of a.objections) {
    const ans = answers[o.k];
    if (!ans || !["answered", "carried"].includes(ans.how) || !ans.text) refuse(`objection ${o.k} by ${o.by} needs an answer: {how: answered|carried, text}`);
    o.answer = ans;
  }
  const made = actions.map((x) => createItem(co, { by, kind: "action", title: x.title, assignee: x.owner, due: x.due, goal: x.goal ?? a.goal ?? null, body: `From ${m.id} item ${n}: ${a.title}` }));
  const tightened = rules.length ? applyRules(co, rules, `${m.id} item ${n}`) : [];
  a.decision = { text: decision, t: now(co), actions: made.map((x) => x.id), rules: rules.map((r, i) => ({ ...r, tightened: tightened[i] })) };
  co.log.add({ type: "meeting-decide", meeting: id, item: n, by, objections: a.objections.length, actions: made.length });
  return a;
}

export function defer(co, { id, by, n, reason }) {
  const m = get(co, id);
  if (by !== m.chair) refuse("only the chair defers");
  if (!reason) refuse("deferring needs a reason");
  item(m, n).deferred = { reason, t: now(co) };
  co.log.add({ type: "meeting-defer", meeting: id, item: n, by });
}

export function closeMeeting(co, { id, by }) {
  const m = get(co, id);
  if (by !== m.chair) refuse("only the chair closes");
  const open = m.agenda.filter((a) => !a.decision && !a.deferred);
  if (open.length) refuse(`items not decided or deferred: ${open.map((a) => a.n).join(", ")}`);
  m.state = "closed";
  m.closed = now(co);
  if (m.booking) releaseBooking(co, m.booking);
  const absent = m.invitees.filter((i) => !m.present.has(i));
  m.minutes = minutes(co, m, absent);
  co.log.add({ type: "meeting-close", meeting: id, by, decided: m.agenda.filter((a) => a.decision).length, deferred: m.agenda.filter((a) => a.deferred).length, absent });
  if (m.channel) post(co, { by, channel: m.channel, title: `Minutes: ${m.title}`, body: m.minutes, key: `${id}:minutes`, ref: id });
  return m;
}

function minutes(co, m, absent) {
  const L = [`# ${m.title} (${m.id})`, "", `chair: ${m.chair} · invited: ${m.invitees.join(", ")} · absent: ${absent.join(", ") || "none"}${m.room ? ` · room: ${m.room}` : ""}`, ""];
  for (const a of m.agenda) {
    L.push(`## ${a.n}. ${a.title}${a.item ? ` (${a.item})` : ""}${a.goal ? ` [${a.goal}]` : ""}`);
    for (const r of a.rounds.filter((x) => x.revealed)) {
      L.push(`Round ${r.n}${r.missing?.length ? ` (no position: ${r.missing.join(", ")})` : ""}:`);
      for (const [who, p] of Object.entries(r.positions)) L.push(`- ${who}: ${p.text}`);
    }
    for (const o of a.objections) L.push(`- objection ${o.k} (${o.by}): ${o.text} → ${o.answer?.how}: ${o.answer?.text}`);
    if (a.decision) L.push(`**Decision:** ${a.decision.text}${a.decision.actions.length ? ` · actions: ${a.decision.actions.join(", ")}` : ""}`, ...(a.decision.rules ?? []).map((r) => `- rule for ${r.tasks}*: ${JSON.stringify(r.checks)} (checked by code; tightened ${(r.tightened ?? []).join(", ") || "no open order yet"})`));
    if (a.deferred) L.push(`**Deferred:** ${a.deferred.reason}`);
    L.push("");
  }
  const secs = Object.entries(m.board);
  if (secs.length) { L.push("## Whiteboard"); for (const [sec, lines] of secs) { L.push(`### ${sec}`); for (const l of lines) L.push(`- ${l.text} (${l.by})`); } }
  return L.join("\n");
}

export const getMeeting = get;
