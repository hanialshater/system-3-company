// Contractors: off-org workers hired once, for one isolated order (founder, 2026-10-21: "all managers are allowed to
// hire a one time contractor and decide on how to onboard them").
//
// What the manager decides: who (a contractor id is made for them), the budget (within the manager's own limit), and the
// onboarding: the docs the contractor may read, whether it sees the lane's memory notes, and a short brief.
// What code decides, whatever the manager wants:
//   - the order is in the manager's own lane, at build, and isolated: nothing in flight depends on it
//   - onboarding paths are inside the repository's lesson/work and handbook areas; never hidden acceptance tests,
//     state files, or another lane's work
//   - the contractor takes only its order's work, signs only its build, never a check (its level is not checker), and
//     its work goes through the same test1, independent check and UAT as anyone's
//   - the contract ends when the order ships: the contractor is offboarded, its learned notes go to the manager as a
//     handoff message, and nothing of it stays in role memory
import { Refused } from "./lib.mjs";

const refuse = (msg) => { throw new Refused(`HARD: ${msg}`); };
export const ONBOARDING_ALLOWED = [/^live\/work\/[^/]+\/?/, /^company\/(roles|product|knowledge|design)\//, /^docs\//];
export const ONBOARDING_DENIED = [/acceptance/i, /state[^/]*\.json$/i, /\.\./, /^\//, /scratchpad/i, /\.lock$/];

export function onboardingProblems(onb, { ownTasks = [] } = {}) {
  const p = [];
  const allowedKeys = ["docs", "laneMemory", "brief"];
  for (const k of Object.keys(onb)) if (!allowedKeys.includes(k)) p.push(`unknown onboarding field ${k}`);
  for (const d of onb.docs ?? []) {
    if (ONBOARDING_DENIED.some((r) => r.test(d))) p.push(`${d}: never shown to a contractor`);
    else if (!ONBOARDING_ALLOWED.some((r) => r.test(d))) p.push(`${d}: outside what a contractor may read`);
    else { const m = d.match(/^live\/work\/([^/]+)/); if (m && !ownTasks.includes(m[1])) p.push(`${d}: another lane's work`); }
  }
  if (onb.laneMemory != null && typeof onb.laneMemory !== "boolean") p.push("laneMemory is true or false");
  if (onb.brief != null && (typeof onb.brief !== "string" || onb.brief.length > 2000)) p.push("brief is a string of at most 2000 characters");
  return p;
}

export function hireContractor({ engine, org, mailbox, log }, { by, order, budget, onboarding = {} }) {
  const mgr = org.role(by);
  if (!mgr || mgr.level !== "manager" || org.lanePOC(mgr.lane)?.id !== by) refuse(`${by} is not a lane manager`);
  const o = engine.orders.get(order);
  if (!o) refuse(`no order ${order}`);
  if (o.manager !== by) refuse(`${order} is not in ${by}'s lane`);
  if (o.stage !== "build" || o.loops !== 0) refuse(`${order} is at ${o.stage} (loop ${o.loops}): a contractor takes a fresh build`);
  const dependents = [...engine.orders.values()].filter((x) => x.after?.includes(order) && x.stage !== "done");
  if (dependents.length) refuse(`${order} is not isolated: ${dependents.map((x) => x.id).join(", ")} wait for it`);
  if (o.after?.some((d) => engine.orders.get(d).stage !== "done")) refuse(`${order} still waits for ${o.after.join(", ")}`);
  if (!(budget > 0 && budget <= engine.limits.manager)) refuse(`budget ${budget} is over the manager limit ${engine.limits.manager}`);
  const ownTasks = [...engine.orders.values()].filter((x) => x.manager === by && x.task).map((x) => x.task);
  const problems = onboardingProblems(onboarding, { ownTasks });
  if (problems.length) { log.add({ type: "refuse", rule: "onboarding", msg: problems.join("; "), by, order }); throw new Refused(`onboarding: ${problems.join("; ")}`); }
  const id = `ctr-${[...org.roles.values()].filter((r) => r.level === "contractor").length + 1}`;
  org.roles.set(id, { id, level: "contractor", reportsTo: by, lane: mgr.lane, room: mgr.room, floor: mgr.floor, skills: [], rituals: [], active: true, contractFor: order, budget, onboarding, hiredAt: engine.clock.now() });
  log.add({ type: "contractor-hire", role: id, by, order, budget, onboarding: { docs: onboarding.docs ?? [], laneMemory: !!onboarding.laneMemory, brief: !!onboarding.brief } });
  // the order's current build message is withdrawn from the previous builder and re-sent to the contractor
  for (const m of mailbox.msgs.values()) if (m.ref === order && m.kind === "work" && m.state === "open" && !m.lease) { m.state = "withdrawn"; log.add({ type: "withdraw", msg: m.id, reason: `assigned to contractor ${id}` }); }
  o.builder = id;
  o.chain.push(id);
  // a reassignment is a new delivery, so it gets its own idempotency key (the old key would dedupe to the withdrawn message)
  mailbox.send({ from: by, to: id, kind: "work", key: `${o.id}:${o.stage}:${o.loops}:${id}`, ref: o.id, body: { stage: o.stage, loops: o.loops }, priority: o.priority ?? "next", due: o.due ?? null });
  return org.role(id);
}

/** Called after every advance: a contract whose order shipped ends here. */
export function endContracts({ engine, org, mailbox, log, rooms }) {
  const ended = [];
  for (const r of org.roles.values()) {
    if (r.level !== "contractor" || !r.active) continue;
    const o = engine.orders.get(r.contractFor);
    if (o?.stage !== "done") continue;
    r.active = false;
    const notes = (rooms.memory.get(r.id) ?? []).filter((e) => e.learned || e.mistake);
    rooms.memory.delete(r.id);
    mailbox.send({ from: r.id, to: r.reportsTo, kind: "handoff", key: `${r.id}:handoff`, ref: o.id, body: { learned: notes.map((e) => e.learned).filter(Boolean), mistakes: notes.map((e) => e.mistake).filter(Boolean) } });
    log.add({ type: "offboard", role: r.id, order: o.id, contractor: true, steps: ["handoff-to-manager", "memory-not-kept", "deactivated"] });
    ended.push(r.id);
  }
  return ended;
}
