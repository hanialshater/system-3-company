// Lane policy: the manager's code. A manager tunes how their lane runs (caps, batching, how revisions are queued,
// staffing thresholds) without touching the rules that judge the lane (signers, independence, leases, exactly-once,
// founder-only steps), which live in lib.mjs and change only by engineering review. A policy is data, validated
// against an allowlist of knobs, versioned, and pinned to each order at creation: a change never moves work in flight.
//
// The manager cycle reads the lane's own numbers, records a belief and a decision (keep, or a new version with a
// committed prediction), so every policy change carries its reason and the evidence that will judge it.

export const KNOBS = {
  drainCap: { int: [1, 10], why: "items one agent session may take (room next)" },
  batchLater: { int: [1, 10], why: "a `later` item waits until this many are queued for the same role, or its due time" },
  revisionPriority: { oneOf: ["next", "later"], why: "how a sent-back item is queued (a `now` order stays `now`)" },
  revisionDueMin: { num: [1, 24 * 60], why: "a `later` revision is due this many minutes after it is sent back" },
  staffingWaitMin: { num: [5, 24 * 60], why: "the WBR flags a queue whose median wait passes this" },
  // K9 (plan 2026-10-21 §3): a HELD claim or a publish hold revised forever; past this many loops a revise parks the
  // order with a decision ask to the orderer. Unset: the spec's maxLoops (true: DEFAULT_MAX_LOOPS), else no cap
  maxLoops: { int: [1, 10], why: "revise loops an order may take; the next revise parks it and asks its orderer to decide" },
  // M5 (plan 2026-10-21 §M5 exit 1, "a session over the per-lane cap"): drainCap caps items per session, nothing capped
  // sessions per lane. Unset: no cap (the launcher's --max-parallel is the only limit)
  maxSessions: { int: [1, 10], why: "agent sessions at work in this lane at once: the planner starts no more, and room enter refuses a new one" },
  nowBy: { subsetOf: "flow", why: "levels that may order `now` in this lane: the flow's list or fewer, never more" },
};

/** Every reason this policy may not run. Empty means valid. */
export function policyProblems(knobs, { flowNowBy = ["founder", "chief-of-staff"] } = {}) {
  const p = [];
  for (const [k, v] of Object.entries(knobs)) {
    const spec = KNOBS[k];
    if (!spec) { p.push(`unknown knob ${k}: a lane policy cannot set it`); continue; }
    if (spec.int && !(Number.isInteger(v) && v >= spec.int[0] && v <= spec.int[1])) p.push(`${k} must be an integer ${spec.int[0]}-${spec.int[1]}`);
    if (spec.num && !(typeof v === "number" && v >= spec.num[0] && v <= spec.num[1])) p.push(`${k} must be ${spec.num[0]}-${spec.num[1]}`);
    if (spec.oneOf && !spec.oneOf.includes(v)) p.push(`${k} must be one of ${spec.oneOf.join(", ")}`);
    if (spec.subsetOf && !(Array.isArray(v) && v.every((x) => flowNowBy.includes(x)))) p.push(`${k} may only narrow the flow's list (${flowNowBy.join(", ")})`);
  }
  if (knobs.revisionPriority === "later" && knobs.revisionDueMin == null) p.push("revisionPriority later needs revisionDueMin: nothing waits without a due time");
  return p;
}

const laneOf = (engine, manager) => engine.org.role(manager)?.lane;
const box = (engine, lane) => engine.policies.get(lane) ?? engine.policies.set(lane, { versions: [], active: null }).get(lane);

/** The lane's manager proposes a version. Refused if invalid or if the proposer is not the lane's POC. */
export function proposePolicy(engine, { lane, by, knobs, reason, prediction }) {
  const poc = engine.org.lanePOC(lane);
  if (!poc || poc.id !== by) throw Object.assign(new Error(`HARD: ${by} is not the manager of lane ${lane}`), { refused: true });
  const flow = engine.flows.get(engine.active.get("task") ?? engine.active.get("item"));
  const problems = policyProblems(knobs, { flowNowBy: flow?.nowBy ?? ["founder", "chief-of-staff"] });
  if (problems.length) { engine.log.add({ type: "refuse", rule: "policy", msg: problems.join("; "), by, lane }); throw Object.assign(new Error(`policy: ${problems.join("; ")}`), { refused: true }); }
  if (!prediction) throw Object.assign(new Error("HARD: a policy change needs a committed prediction"), { refused: true });
  const b = box(engine, lane);
  const v = { lane, version: b.versions.length + 1, by, knobs, reason, prediction, proposed: engine.clock.now(), state: "proposed" };
  b.versions.push(v);
  engine.log.add({ type: "policy-propose", lane, version: v.version, by, knobs, reason, prediction });
  return v;
}

export function activatePolicy(engine, { lane, version, by }) {
  const b = box(engine, lane);
  const v = b.versions[version - 1];
  if (!v || v.state !== "proposed") throw Object.assign(new Error(`HARD: ${lane}@v${version} is not proposed`), { refused: true });
  if (engine.org.lanePOC(lane)?.id !== by) throw Object.assign(new Error(`HARD: ${by} is not the manager of lane ${lane}`), { refused: true });
  if (b.active) b.versions[b.active - 1].state = "retired";
  v.state = "active";
  b.active = version;
  engine.log.add({ type: "policy-active", lane, version, by });
  return v;
}

export function activeKnobs(engine, lane) {
  const b = engine.policies.get(lane);
  return b?.active ? b.versions[b.active - 1].knobs : {};
}

/** The lane's numbers since `since`, from events only: what a manager reads before deciding. */
export function managerReport(engine, lane, { since = -Infinity } = {}) {
  const ev = engine.log.events.filter((e) => e.t > since);
  const inLane = (id) => laneOf(engine, engine.orders.get(id)?.manager) === lane;
  const shipped = ev.filter((e) => e.type === "shipped" && inLane(e.order));
  const n = shipped.length || 1;
  const usage = ev.filter((e) => e.type === "usage").reduce((s, e) => s + e.tokens, 0);
  const reopens = ev.filter((e) => e.type === "reopen" && inLane(e.order)).length;
  const leads = shipped.map((e) => e.lead).sort((a, b) => a - b);
  const sessions = ev.filter((e) => e.type === "session-close");
  return {
    lane, shipped: shipped.length,
    tokensPerShipped: usage / n,
    revisionsPerShipped: reopens / n,
    leadP50: leads.length ? leads[Math.floor(leads.length / 2)] : null,
    itemsPerSession: sessions.length ? sessions.reduce((s, e) => s + e.items, 0) / sessions.length : null,
    singleItemSessions: sessions.filter((e) => e.items === 1).length,
  };
}

/** One manager cycle: the numbers, a belief, and a decision. A change must name its version (already proposed). */
export function recordCycle(engine, { lane, by, report, belief, decision, version = null }) {
  if (engine.org.lanePOC(lane)?.id !== by) throw Object.assign(new Error(`HARD: ${by} is not the manager of lane ${lane}`), { refused: true });
  if (!["keep", "change"].includes(decision)) throw Object.assign(new Error("HARD: decision is keep or change"), { refused: true });
  if (decision === "change" && !version) throw Object.assign(new Error("HARD: a change names the proposed version"), { refused: true });
  return engine.log.add({ type: "manager-cycle", lane, by, report, belief, decision, version });
}
