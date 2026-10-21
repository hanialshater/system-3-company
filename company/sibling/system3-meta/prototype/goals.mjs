// Goals for scalable oversight (founder, 2026-10-21: "goals have levels (who track them) and breakdown (goals that
// contribute to others), status like red, yellow, green. Also delivery date, why it is important, what to be done,
// shape of success, also goal review rituals (rolling to the CEO) and tracking board").
//
// Levels and who tracks them (the owner's level must match):
//   company  founder (the CEO)       org   chief of staff       lane  that lane's manager       team  a builder or checker
// A goal contributes to one or more goals at its own level or above (the breakdown tree); a company goal contributes
// to nothing. Every goal states: why (why it matters), what (what is to be done), success (the shape of success:
// measurable criteria with a target), and due (delivery date, ISO). Status is green | yellow | red; yellow and red need
// a reason and a path back to green.
//
// Status is checked by code, not only asserted:
//   - past due and not done → red, whatever the owner says (an "auto-red" event names it)
//   - a goal shown green while a contributor is red is a *divergence*: allowed, but it must carry a reason, and the
//     review shows it to the level above
//   - progress = the share of linked tracker items done; met = every success criterion's current value reaches target
// Review: each level reviews its own goals, and only exceptions roll up: red, yellow, divergent, due soon, or status
// changed since the last review. The CEO sees the company goals plus every exception that reached that level.
import { Refused } from "./lib.mjs";
import { STATES } from "./tracker.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
export const LEVELS = ["company", "org", "lane", "team"];
const RANK = Object.fromEntries(LEVELS.map((l, i) => [l, i]));
export const OWNER_LEVEL = { company: ["founder"], org: ["chief-of-staff"], lane: ["manager"], team: ["builder", "checker"] };
export const RAG = ["green", "yellow", "red"];
const store = (co) => (co.data.goals ??= { goals: new Map(), n: 0, reviews: [] });
const nowMin = (co) => co.engine.clock.now();
const dueMin = (d) => Date.parse(`${d}T23:59:59Z`) / 60000;
const worst = (xs) => xs.reduce((w, x) => (RAG.indexOf(x) > RAG.indexOf(w) ? x : w), "green");

export function createGoal(co, { by, title, level, owner, why, what, success, due, contributesTo = [], status = "green", reason = null, path = null }) {
  const s = store(co);
  if (!LEVELS.includes(level)) refuse(`level is ${LEVELS.join(", ")}`);
  const o = co.org.role(owner);
  if (!o?.active) refuse(`no active owner ${owner}`);
  if (!OWNER_LEVEL[level].includes(o.level)) refuse(`a ${level} goal is tracked by ${OWNER_LEVEL[level].join(" or ")}, not ${o.level}`);
  if (!title || !why || !what) refuse("a goal states its title, why it matters and what is to be done");
  if (!Array.isArray(success) || !success.length || success.some((c) => !c.metric || c.target == null)) refuse("success is a list of {metric, target} criteria");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due ?? "")) refuse("due is a delivery date, YYYY-MM-DD");
  if (level === "company" && contributesTo.length) refuse("a company goal is the top: it contributes to nothing");
  if (level !== "company" && !contributesTo.length) refuse("every goal below company contributes to at least one goal");
  for (const p of contributesTo) {
    const pg = s.goals.get(p);
    if (!pg) refuse(`no goal ${p}`);
    if (RANK[pg.level] > RANK[level]) refuse(`${p} is a ${pg.level} goal: a ${level} goal contributes to its own level or above`);
    if (dueMin(due) > dueMin(pg.due)) refuse(`due ${due} is after ${p}'s due ${pg.due}: a contributor cannot land after the goal it serves`);
  }
  checkStatus(status, reason, path);
  if (level === "lane" && by !== owner && co.org.role(by)?.level !== "chief-of-staff") refuse(`${by} may not set lane goals for ${owner}`);
  const id = `G-${++s.n}`;
  const g = { id, title, level, owner, why, what, success: success.map((c) => ({ metric: c.metric, target: c.target, current: c.current ?? null, unit: c.unit ?? null })), due, contributesTo, status, reason, path, created: nowMin(co), updates: [{ t: nowMin(co), by, status, reason }], reviewedStatus: null, done: false };
  s.goals.set(id, g);
  co.log.add({ type: "goal-create", goal: id, level, owner, due, contributesTo, by });
  return g;
}

function checkStatus(status, reason, path) {
  if (!RAG.includes(status)) refuse(`status is ${RAG.join(", ")}`);
  if (status !== "green" && (!reason || !path)) refuse(`a ${status} goal states the reason and the path back to green`);
}

export function getGoal(co, id) { const g = store(co).goals.get(id); if (!g) refuse(`no goal ${id}`); return g; }

/** The owner updates status, criteria values or done; others may comment through the tracker, not change the goal. */
export function updateGoal(co, { by, id, status, reason = null, path = null, current = {}, done = null, divergence = null }) {
  const g = getGoal(co, id);
  if (by !== g.owner && co.org.role(by)?.level !== "founder") refuse(`${by} does not own ${id} (owner ${g.owner})`);
  for (const [metric, v] of Object.entries(current)) { const c = g.success.find((x) => x.metric === metric); if (!c) refuse(`${id} has no criterion ${metric}`); c.current = v; }
  if (status) { checkStatus(status, reason, path); g.status = status; g.reason = reason; g.path = path; }
  if (done != null) {
    if (done && !met(g)) refuse(`${id} is not met: ${g.success.filter((c) => !reached(c)).map((c) => `${c.metric} ${c.current ?? "?"}/${c.target}`).join(", ")}`);
    g.done = done;
  }
  const kidsRed = children(co, id).some((k) => effective(co, k) === "red");
  if (g.status === "green" && kidsRed && !divergence) refuse(`${id} has a red contributor: green needs a divergence reason`);
  g.divergence = g.status === "green" && kidsRed ? divergence : null;
  g.updates.push({ t: nowMin(co), by, status: g.status, reason: g.reason, current, done: g.done });
  co.log.add({ type: "goal-update", goal: id, by, status: g.status, done: g.done });
  return g;
}

const reached = (c) => c.current != null && (typeof c.target === "number" ? c.current >= c.target : c.current === c.target);
export const met = (g) => g.success.every(reached);
export function children(co, id) { return [...store(co).goals.values()].filter((x) => x.contributesTo.includes(id)); }

/** The status code holds a goal to: auto-red when past due and not done. */
export function effective(co, g) {
  if (!g.done && nowMin(co) > dueMin(g.due)) return "red";
  return g.status;
}

/** Linked tracker items' progress for a goal (items with goal = id). */
export function progress(co, id) {
  const items = [...(co.data.tracker?.items?.values() ?? [])].filter((i) => i.goal === id && i.state !== "cancelled");
  return items.length ? { done: items.filter((i) => i.state === "done").length, total: items.length } : null;
}

/** Writes auto-red events for goals that went past due; returns them. Called by the supervisor tick. */
export function sweepGoals(co) {
  const out = [];
  for (const g of store(co).goals.values()) {
    if (effective(co, g) === "red" && g.status !== "red" && !g.autoRed) { g.autoRed = true; co.log.add({ type: "goal-auto-red", goal: g.id, due: g.due }); out.push(g.id); }
  }
  return out;
}

export function view(co, g) {
  const eff = effective(co, g);
  const kids = children(co, g.id);
  return { id: g.id, title: g.title, level: g.level, owner: g.owner, due: g.due, status: eff, ownerStatus: g.status, autoRed: eff === "red" && g.status !== "red", reason: g.reason, path: g.path, divergence: g.divergence ?? null, contributorsWorst: kids.length ? worst(kids.map((k) => effective(co, k))) : null, progress: progress(co, g.id), met: met(g), done: g.done, why: g.why, what: g.what, success: g.success, contributesTo: g.contributesTo };
}

/** The goal board: the tree from company goals down, with status. */
export function goalBoard(co, { level = null, owner = null } = {}) {
  const all = [...store(co).goals.values()];
  const tree = (g, depth = 0) => [{ depth, ...view(co, g) }, ...children(co, g.id).flatMap((k) => tree(k, depth + 1))];
  const rows = all.filter((g) => g.level === "company").flatMap((g) => tree(g));
  const seen = new Set();
  const uniq = rows.filter((r) => (seen.has(`${r.id}@${r.depth}`) ? false : (seen.add(`${r.id}@${r.depth}`), true)));
  const filtered = uniq.filter((r) => (!level || r.level === level) && (!owner || r.owner === owner));
  const counts = { green: 0, yellow: 0, red: 0 };
  for (const g of all) counts[effective(co, g)]++;
  return { counts, rows: filtered };
}

const isException = (co, g, soonDays = 7) => {
  const eff = effective(co, g);
  return eff !== "green" || !!g.divergence || (!g.done && dueMin(g.due) - nowMin(co) < soonDays * 24 * 60) || (g.reviewedStatus != null && g.reviewedStatus !== eff);
};

/** One level's goal review: its own goals in full, plus the exceptions from the level below that roll up to it.
 *  Reviewing marks the reviewed status, so "changed since last review" is exact next time. */
export function reviewLevel(co, { by, level }) {
  const r = co.org.role(by);
  if (!r || !OWNER_LEVEL[level].includes(r.level)) refuse(`${by} does not review ${level} goals`);
  const s = store(co);
  const own = [...s.goals.values()].filter((g) => g.level === level && (level !== "lane" || g.owner === by));
  const below = LEVELS[RANK[level] + 1];
  const scope = (g) => (level === "lane" ? g.contributesTo.some((p) => own.some((o) => o.id === p)) : true);
  const exceptions = below ? [...s.goals.values()].filter((g) => g.level === below && scope(g) && isException(co, g)) : [];
  const out = { level, by, own: own.map((g) => view(co, g)), exceptions: exceptions.map((g) => ({ ...view(co, g), why_here: whyHere(co, g) })) };
  for (const g of own) g.reviewedStatus = effective(co, g);
  s.reviews.push({ t: nowMin(co), level, by, own: own.length, exceptions: exceptions.length });
  co.log.add({ type: "goal-review", level, by, own: own.length, exceptions: exceptions.length });
  return out;
}

function whyHere(co, g) {
  const eff = effective(co, g);
  const w = [];
  if (eff !== "green") w.push(eff === "red" && g.status !== "red" ? "auto-red: past due" : eff);
  if (g.divergence) w.push("divergent: green over a red contributor");
  if (g.reviewedStatus != null && g.reviewedStatus !== eff) w.push(`changed since last review (${g.reviewedStatus} → ${eff})`);
  if (!g.done && dueMin(g.due) - nowMin(co) < 7 * 24 * 60) w.push("due within 7 days");
  return w;
}

/** The roll-up to the CEO: team → lane → org → company reviews in order; the CEO sees what survived each level. */
export function rollUp(co) {
  const steps = [];
  const managers = co.org.active().filter((r) => r.level === "manager");
  for (const m of managers) steps.push(reviewLevel(co, { by: m.id, level: "lane" }));
  const cos = co.org.active().find((r) => r.level === "chief-of-staff");
  if (cos) steps.push(reviewLevel(co, { by: cos.id, level: "org" }));
  const ceo = co.org.active().find((r) => r.level === "founder");
  if (ceo) steps.push(reviewLevel(co, { by: ceo.id, level: "company" }));
  return steps;
}
