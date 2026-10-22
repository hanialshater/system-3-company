// Contractors: off-org workers for work that is NOT in the delivery process: a quick prototype, a research question,
// a spike (founder, 2026-10-21: "all managers are allowed to hire a one time contractor and decide on how to onboard
// them … Contractor is for task that are not in the process, quick prototype, research etc.").
//
// An engagement is not an order. It has no test1, check, UAT or ship, and its output never reaches the product by
// itself: to use it, the manager places a normal order that cites the engagement (`order new --from-contract=C-n`),
// and that order goes through the whole flow like any other.
//
// The manager decides: the kind, the goal, what comes back, the budget (within the manager limit), the timebox and the
// onboarding (docs, whether to share the lane's builder notes, a brief). Code decides, whatever the manager wants:
//   - onboarding paths stay inside the lane's own work and the handbook; never acceptance tests, state, parent paths,
//     another lane's work
//   - the contractor writes only to live/contracts/<id>/ and can enter no flow work, sign no stage and ship nothing
//   - a research deliverable states every finding with a source and a confidence; without them it is refused
//   - the engagement ends on accept, reject or timeout: the contractor is deactivated, a handoff goes to the manager,
//     and no memory of it is kept
import { Refused } from "./lib.mjs";
import { managerReport } from "./policy.mjs";

const refuse = (msg) => { throw new Refused(`HARD: ${msg}`); };
export const KINDS = ["prototype", "research", "spike"];
export const ONBOARDING_ALLOWED = [/^live\/work\/[^/]+\/?/, /^live\/shipped\/[^/]+\/?/, /^company\/(roles|product|knowledge|design)\//, /^docs\//];
export const ONBOARDING_DENIED = [/acceptance/i, /state[^/]*\.json$/i, /\.\./, /^\//, /scratchpad/i, /\.lock$/];
export const CONFIDENCE = ["high", "medium", "low"];

export function onboardingProblems(onb, { ownTasks = [] } = {}) {
  const p = [];
  for (const k of Object.keys(onb)) if (!["docs", "laneMemory", "brief"].includes(k)) p.push(`unknown onboarding field ${k}`);
  for (const d of onb.docs ?? []) {
    if (ONBOARDING_DENIED.some((r) => r.test(d))) p.push(`${d}: never shown to a contractor`);
    else if (!ONBOARDING_ALLOWED.some((r) => r.test(d))) p.push(`${d}: outside what a contractor may read`);
    else { const m = d.match(/^live\/(?:work|shipped)\/([^/]+)/); if (m && !ownTasks.includes(m[1])) p.push(`${d}: another lane's work`); }
  }
  if (onb.laneMemory != null && typeof onb.laneMemory !== "boolean") p.push("laneMemory is true or false");
  if (onb.brief != null && (typeof onb.brief !== "string" || onb.brief.length > 2000)) p.push("brief is a string of at most 2000 characters");
  return p;
}

/** A research deliverable is checkable: every finding has a source and a confidence. */
export function deliverableProblems(kind, d) {
  const p = [];
  if (!d?.summary) p.push("a deliverable needs a summary");
  if (!d?.path || !/^live\/contracts\/C-\d+\//.test(d.path)) p.push("the deliverable lives in the engagement's own folder, live/contracts/<id>/");
  if (kind === "research") {
    if (!Array.isArray(d.findings) || !d.findings.length) p.push("research returns findings");
    for (const [i, f] of (d.findings ?? []).entries()) {
      if (!f.claim) p.push(`finding ${i + 1}: no claim`);
      if (!f.source) p.push(`finding ${i + 1}: no source`);
      if (!CONFIDENCE.includes(f.confidence)) p.push(`finding ${i + 1}: confidence is ${CONFIDENCE.join(", ")}`);
    }
  }
  return p;
}

const contracts = (engine) => engine.contracts ?? (engine.contracts = new Map());

// Ready-made engagements. A contractor is custom, cheap to start and disposable, which suits preparation work: a new
// manager has one study the lane and brief them, keeps the brief if it is good, and nothing of the contractor remains.
// The lane's data is put in the brief by code (contractors may not read state files), so every finding can cite it.
export const TEMPLATES = {
  "manager-onboarding": {
    kind: "research",
    goal: "Brief the lane's manager: current state, numbers, open decisions, recurring defect classes, and the policy history with the reasons behind each change.",
    deliverable: "a one-page brief in the engagement folder; every finding cites an order, a policy version or the manager report, with a confidence",
    budget: 60_000,
    timeboxMin: 45,
    onboarding: { laneMemory: true, brief: "Read the data in this brief first. Do not guess: if the data does not show it, say so." },
    data(co, lane) {
      const { engine } = co;
      const inLane = [...engine.orders.values()].filter((o) => engine.org.role(o.manager)?.lane === lane);
      return {
        report: managerReport(engine, lane),
        policies: (engine.policies.get(lane)?.versions ?? []).map((v) => ({ version: v.version, state: v.state, knobs: v.knobs, reason: v.reason, prediction: v.prediction })),
        openOrders: inLane.filter((o) => !["done", "cancelled"].includes(o.stage)).map((o) => ({ order: o.id, title: o.title, stage: o.stage, loops: o.loops, priority: o.priority })),
        recentFindings: inLane.filter((o) => o.findings).slice(-10).map((o) => ({ order: o.id, title: o.title, findings: String(o.findings).slice(0, 400) })),
        cycles: engine.log.events.filter((e) => e.type === "manager-cycle" && e.lane === lane).slice(-5).map((e) => ({ belief: e.belief, decision: e.decision, version: e.version })),
      };
    },
  },
};

/** Open an engagement from a template; any field given overrides the template's. */
export function engageTemplate(co, { template, by, ...over }) {
  const t = TEMPLATES[template];
  if (!t) refuse(`no template ${template} (have: ${Object.keys(TEMPLATES).join(", ")})`);
  const c = engage(co, { by, kind: t.kind, goal: t.goal, deliverable: t.deliverable, budget: t.budget, timeboxMin: t.timeboxMin, onboarding: t.onboarding, ...over });
  c.template = template;
  return c;
}

export function engage({ engine, org, mailbox, log }, { by, kind, goal, deliverable, budget, timeboxMin, onboarding = {} }) {
  const mgr = org.role(by);
  if (!mgr || mgr.level !== "manager" || org.lanePOC(mgr.lane)?.id !== by) refuse(`${by} is not a lane manager`);
  if (!KINDS.includes(kind)) refuse(`kind is ${KINDS.join(", ")}: in-process work is an order, not a contract`);
  if (!goal || !deliverable) refuse("an engagement needs a goal and a stated deliverable");
  if (!(budget > 0 && budget <= engine.limits.manager)) refuse(`budget ${budget} is over the manager limit ${engine.limits.manager}`);
  if (!(timeboxMin > 0 && timeboxMin <= 7 * 24 * 60)) refuse("timebox is 1 minute to 7 days");
  const ownTasks = [...engine.orders.values()].filter((x) => x.manager === by && x.task).map((x) => x.task);
  const problems = onboardingProblems(onboarding, { ownTasks });
  if (problems.length) { log.add({ type: "refuse", rule: "onboarding", msg: problems.join("; "), by }); throw new Refused(`onboarding: ${problems.join("; ")}`); }
  const cid = `C-${contracts(engine).size + 1}`;
  const rid = `ctr-${cid.slice(2)}`;
  org.roles.set(rid, { id: rid, level: "contractor", reportsTo: by, lane: mgr.lane, room: mgr.room, floor: mgr.floor, skills: [], rituals: [], active: true, contract: cid });
  const c = { id: cid, contractor: rid, by, lane: mgr.lane, kind, goal, deliverable, budget, timeboxMin, onboarding, state: "open", opened: engine.clock.now(), due: engine.clock.now() + timeboxMin, delivered: null, decision: null };
  contracts(engine).set(cid, c);
  mailbox.send({ from: by, to: rid, kind: "contract", key: `${cid}:open`, ref: cid, body: { kind, goal, deliverable, timeboxMin }, due: c.due });
  log.add({ type: "contract-open", contract: cid, contractor: rid, by, kind, budget, timeboxMin, onboarding: { docs: onboarding.docs ?? [], laneMemory: !!onboarding.laneMemory, brief: !!onboarding.brief } });
  return c;
}

/** What the contractor gets: the manager's onboarding, its own folder, nothing of the org's memory or process. */
export function briefFor({ engine, org, rooms }, cid) {
  const c = contracts(engine).get(cid);
  if (!c) refuse(`no contract ${cid}`);
  const lane = c.lane;
  const laneMemory = c.onboarding.laneMemory
    ? org.active().filter((x) => x.lane === lane && x.level === "builder").flatMap((x) => (rooms.memory.get(x.id) ?? []).filter((e) => e.learned).map((e) => ({ from: x.id, learned: e.learned })))
    : [];
  const data = c.template ? TEMPLATES[c.template].data({ engine, org, rooms }, lane) : null;
  return { contract: cid, contractor: c.contractor, kind: c.kind, template: c.template ?? null, goal: c.goal, deliverable: c.deliverable, timebox_ends: new Date(c.due * 60000).toISOString(), write_only_to: `live/contracts/${cid}/`, docs: c.onboarding.docs ?? [], brief: c.onboarding.brief ?? null, laneMemory, data, rules: "no flow work, no signing, no shipping; research findings need a source and a confidence" };
}

export function deliver({ engine, log }, { cid, by, summary, path, findings = null }) {
  const c = contracts(engine).get(cid);
  if (!c) refuse(`no contract ${cid}`);
  if (by !== c.contractor) refuse(`${by} is not the contractor on ${cid}`);
  if (c.state !== "open") refuse(`${cid} is ${c.state}`);
  if (engine.clock.now() > c.due) refuse(`${cid} timed out: its timebox ended`);
  const d = { summary, path, findings };
  const problems = deliverableProblems(c.kind, d);
  if (problems.length) { log.add({ type: "refuse", rule: "deliverable", msg: problems.join("; "), contract: cid }); throw new Refused(`deliverable: ${problems.join("; ")}`); }
  c.delivered = { ...d, t: engine.clock.now() };
  c.state = "delivered";
  log.add({ type: "contract-deliver", contract: cid, by, path, findings: findings?.length ?? 0 });
  return c;
}

/** The manager's judgment: accept or reject. Either ends the engagement. Nothing ships from here. */
export function decideContract(co, { cid, by, decision, reason }) {
  const c = contracts(co.engine).get(cid);
  if (!c) refuse(`no contract ${cid}`);
  if (by !== c.by) refuse(`${by} did not open ${cid}`);
  if (c.state !== "delivered") refuse(`${cid} is ${c.state}: decide after delivery`);
  if (!["accept", "reject"].includes(decision) || !reason) refuse("decision is accept or reject, with a reason");
  c.decision = { decision, reason, t: co.engine.clock.now() };
  c.state = decision === "accept" ? "accepted" : "rejected";
  co.log.add({ type: "contract-decide", contract: cid, by, decision, reason });
  close(co, c, c.state);
  return c;
}

/** Timebox ends with no delivery: the engagement expires. Called by the supervisor's tick. */
export function expireContracts(co) {
  const out = [];
  for (const c of contracts(co.engine).values()) if (c.state === "open" && co.engine.clock.now() > c.due) { c.state = "expired"; close(co, c, "expired"); out.push(c.id); }
  return out;
}

function close(co, c, why) {
  const r = co.org.role(c.contractor);
  r.active = false;
  co.rooms.memory.delete(c.contractor);
  co.mailbox.send({ from: c.contractor, to: c.by, kind: "handoff", key: `${c.id}:handoff`, ref: c.id, body: { why, deliverable: c.delivered ?? null } });
  co.log.add({ type: "offboard", role: c.contractor, contract: c.id, contractor: true, why, steps: ["handoff-to-manager", "memory-not-kept", "deactivated"] });
}
