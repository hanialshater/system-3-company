// The tracker (Linear-like): every piece of work in one place.
//
//   items      ISS-n: issue | order (mirrored from the engine) | ask (a leadership ask) | action (from a meeting)
//              fields: title, body, state, assignee, project, labels, priority (0 urgent … 4 none), cycle, due,
//              links, comments, goal (the goal it contributes to)
//   states     backlog → todo → in-progress → in-review → done, or cancelled (an order's state follows its stage)
//   projects   a named set of items with a lead, and the goals it serves
//   cycles     time boxes; an item is in at most one
//   links      blocks | blocked-by | relates | duplicates | parent; blocks/blocked-by are kept symmetric
//   board      columns by state, filtered by assignee, project, label, cycle, goal, kind
//   search     words in title, body and comments
// Rules: an assignee exists and is active; an action and an ask have an assignee and a due date; a cycle may not
// overlap another; order items are moved only by the flow (sync), never by hand.
import { Refused } from "./lib.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
export const STATES = ["backlog", "todo", "in-progress", "in-review", "done", "cancelled"];
export const KINDS = ["issue", "order", "ask", "action"];
const LINKS = { blocks: "blocked-by", "blocked-by": "blocks", relates: "relates", duplicates: "duplicates", parent: "child", child: "parent" };
const store = (co) => (co.data.tracker ??= { items: new Map(), projects: new Map(), cycles: new Map(), n: 0, nP: 0, nC: 0 });
const now = (co) => co.engine.clock.now();

export function create(co, { by, kind = "issue", title, body = "", assignee = null, project = null, labels = [], priority = 3, cycle = null, due = null, goal = null, order = null, state = "backlog" }) {
  const s = store(co);
  if (!KINDS.includes(kind)) refuse(`kind is ${KINDS.join(", ")}`);
  if (!title) refuse("an item has a title");
  if (!co.org.role(by) && by !== "engine") refuse(`no role ${by}`);
  if (assignee && !co.org.role(assignee)?.active) refuse(`no active role ${assignee}`);
  if (["action", "ask"].includes(kind) && (!assignee || !due)) refuse(`an ${kind} has an assignee and a due date`);
  if (project && !s.projects.has(project)) refuse(`no project ${project}`);
  if (cycle && !s.cycles.has(cycle)) refuse(`no cycle ${cycle}`);
  if (!STATES.includes(state)) refuse(`state is ${STATES.join(", ")}`);
  if (!(Number.isInteger(priority) && priority >= 0 && priority <= 4)) refuse("priority is 0 (urgent) to 4 (none)");
  const id = `ISS-${++s.n}`;
  const it = { id, kind, title, body, state, assignee, project, labels: [...new Set(labels)], priority, cycle, due, goal, order, links: [], comments: [], by, created: now(co), updated: now(co), history: [{ t: now(co), by, state }] };
  s.items.set(id, it);
  co.log.add({ type: "item-create", item: id, kind, by, assignee, project, goal });
  return it;
}

export function get(co, id) { const it = store(co).items.get(id); if (!it) refuse(`no item ${id}`); return it; }

export function update(co, { by, id, ...ch }) {
  const it = get(co, id);
  if (it.kind === "order" && ch.state && by !== "engine") refuse(`${id} mirrors order ${it.order}: its state moves with the flow`);
  if (ch.assignee && !co.org.role(ch.assignee)?.active) refuse(`no active role ${ch.assignee}`);
  if (ch.state && !STATES.includes(ch.state)) refuse(`state is ${STATES.join(", ")}`);
  if (ch.project && !store(co).projects.has(ch.project)) refuse(`no project ${ch.project}`);
  if (ch.cycle && !store(co).cycles.has(ch.cycle)) refuse(`no cycle ${ch.cycle}`);
  const allowed = ["title", "body", "state", "assignee", "project", "priority", "cycle", "due", "goal"];
  for (const k of Object.keys(ch)) if (!allowed.includes(k) && k !== "addLabels" && k !== "removeLabels") refuse(`cannot set ${k}`);
  for (const k of allowed) if (ch[k] !== undefined) it[k] = ch[k];
  if (ch.addLabels) it.labels = [...new Set([...it.labels, ...ch.addLabels])];
  if (ch.removeLabels) it.labels = it.labels.filter((l) => !ch.removeLabels.includes(l));
  it.updated = now(co);
  if (ch.state) it.history.push({ t: now(co), by, state: ch.state });
  co.log.add({ type: "item-update", item: id, by, changes: Object.keys(ch) });
  return it;
}

export function comment(co, { by, id, text }) {
  const it = get(co, id);
  if (!text) refuse("a comment has text");
  it.comments.push({ by, t: now(co), text });
  it.updated = now(co);
  co.log.add({ type: "item-comment", item: id, by });
  return it;
}

export function link(co, { by, id, type, to }) {
  const a = get(co, id), b = get(co, to);
  if (!LINKS[type]) refuse(`link type is ${Object.keys(LINKS).join(", ")}`);
  if (id === to) refuse("an item cannot link to itself");
  if (!a.links.some((l) => l.type === type && l.to === to)) a.links.push({ type, to });
  const back = LINKS[type];
  if (!b.links.some((l) => l.type === back && l.to === id)) b.links.push({ type: back, to: id });
  co.log.add({ type: "item-link", item: id, link: type, to, by });
  return a;
}

export function createProject(co, { by, name, lead, goals = [] }) {
  const s = store(co);
  if (!co.org.role(lead)?.active) refuse(`no active role ${lead}`);
  const id = `PRJ-${++s.nP}`;
  s.projects.set(id, { id, name, lead, goals, by, created: now(co) });
  co.log.add({ type: "project-create", project: id, name, lead, by });
  return s.projects.get(id);
}

export function createCycle(co, { by, name, start, end }) {
  const s = store(co);
  if (!(end > start)) refuse("a cycle ends after it starts");
  const clash = [...s.cycles.values()].find((c) => c.start < end && start < c.end);
  if (clash) refuse(`overlaps ${clash.id}`);
  const id = `CYC-${++s.nC}`;
  s.cycles.set(id, { id, name, start, end, by });
  co.log.add({ type: "cycle-create", cycle: id, name, by });
  return s.cycles.get(id);
}

const STAGE_STATE = { budget: "todo", build: "in-progress", test1: "in-review", check: "in-review", uat: "in-review", release: "in-review", ship: "in-review", done: "done", parked: "backlog", cancelled: "cancelled" }; // K8

/** Mirror every engine order as a tracker item; its state follows the order's stage. Idempotent. */
export function syncOrders(co) {
  const s = store(co);
  const byOrder = new Map([...s.items.values()].filter((i) => i.kind === "order").map((i) => [i.order, i]));
  for (const o of co.engine.orders.values()) {
    let it = byOrder.get(o.id);
    if (!it) it = create(co, { by: "engine", kind: "order", title: o.title || o.id, order: o.id, project: o.project ?? null, goal: o.goal ?? null, assignee: o.builder && co.org.role(o.builder)?.active ? o.builder : null, state: "todo", labels: o.loops ? ["revised"] : [] });
    const st = o.stage === "cancelled" ? "cancelled" : o.blocked ? "backlog" : STAGE_STATE[o.stage] ?? "in-progress";
    if (it.state !== st) update(co, { by: "engine", id: it.id, state: st });
    // K8: a parked order sits in backlog with a label (its decision ask says why); a resume takes the label off
    if (o.stage === "parked" && !it.labels.includes("parked")) update(co, { by: "engine", id: it.id, addLabels: ["parked"] });
    if (o.stage !== "parked" && it.labels.includes("parked")) update(co, { by: "engine", id: it.id, removeLabels: ["parked"] });
    if (o.builder && it.assignee !== o.builder && co.org.role(o.builder)?.active) update(co, { by: "engine", id: it.id, assignee: o.builder });
    if (o.loops && !it.labels.includes("revised")) update(co, { by: "engine", id: it.id, addLabels: ["revised"] });
  }
}

export function board(co, f = {}) {
  const items = [...store(co).items.values()].filter((i) =>
    (!f.assignee || i.assignee === f.assignee) && (!f.project || i.project === f.project) && (!f.label || i.labels.includes(f.label)) &&
    (!f.cycle || i.cycle === f.cycle) && (!f.goal || i.goal === f.goal) && (!f.kind || i.kind === f.kind));
  const cols = Object.fromEntries(STATES.map((st) => [st, []]));
  for (const i of items.sort((a, b) => a.priority - b.priority || a.created - b.created)) cols[i.state].push({ id: i.id, kind: i.kind, title: i.title, assignee: i.assignee, priority: i.priority, labels: i.labels, due: i.due });
  return cols;
}

export function search(co, q) {
  const w = String(q).toLowerCase().split(/\s+/).filter(Boolean);
  return [...store(co).items.values()].filter((i) => { const t = [i.title, i.body, ...i.comments.map((c) => c.text)].join(" ").toLowerCase(); return w.every((x) => t.includes(x)); })
    .map((i) => ({ id: i.id, kind: i.kind, title: i.title, state: i.state }));
}

/** Overdue open items (due is an ISO date or a minute count). */
export function overdue(co) {
  const t = now(co);
  const due = (d) => (typeof d === "number" ? d : Date.parse(d) / 60000);
  return [...store(co).items.values()].filter((i) => i.due != null && !["done", "cancelled"].includes(i.state) && due(i.due) < t);
}
