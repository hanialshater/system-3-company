// M2: a company from a spec. A spec is a JSON file (prototype/specs/<name>.json): rooms, skills, roles, the flow, and
// optionally channels, standing rules (checks every matching order gets), a CONTEXT.md text and a product line.
// `node meta.mjs init --spec-file=<json>` validates it against the invariants below, builds the state from it, keeps
// the spec in the state (so the company runs without the file), and writes ORG.md and CONTEXT.md for agents.
//   node generator.mjs validate <spec.json>     the invariants, as a list of violations (exit 1 if any)
//   node generator.mjs export <name>            a built-in spec (specs.mjs) as JSON
import fs from "node:fs";
import { SPECS } from "./specs.mjs";
import { validateCmd } from "./state.mjs";
import { validateWorkspace, validateRoleLaunch } from "./workspace.mjs";
import { signerRole, signerName, isIndependent, packProblem, packHistory, postProblems, standingProblems, isChairFlow, flowProblems, CHAIR_SIGNERS } from "./lib.mjs";
import { policyProblems } from "./policy.mjs";

const SIGNERS = ["builder", "code", "checker", "orderer", "release", "founder", "evaluator", "chair", "attendee"]; // K4: evaluator signs as a level, independent by default; K19: a chair flow's chair and attendee
/** K19: every flow of a spec, [{name, stages, …, legacy}]: the single `flow` first (legacy: true), then `flows` in
 *  key order, each named by its key. Orders go to the default flow unless `order new --flow` names another. */
export function specFlows(s) {
  const out = [];
  if (s?.flow) out.push({ ...s.flow, legacy: true });
  for (const [name, f] of Object.entries(s?.flows && typeof s.flows === "object" && !Array.isArray(s.flows) ? s.flows : {})) out.push({ ...f, name });
  return out;
}
/** K19: the flow `order new` uses with no --flow: the legacy `flow`, else the first of `flows`. */
export const defaultFlow = (s) => specFlows(s)[0] ?? null;

const LEVELS = ["founder", "chief-of-staff", "vp", "manager", "builder", "checker", "release", "evaluator", "contractor"];
const KINDS = ["lobby", "office", "lane", "quality", "launch", "meeting"];

/** Every violation of the invariants a company must hold before it runs. Empty means valid. */
export function validateSpec(s) {
  const v = [];
  const need = (ok, msg) => { if (!ok) v.push(msg); };
  if (!s || typeof s !== "object") return ["a spec is an object"];
  for (const k of ["rooms", "skills", "roles"]) need(s[k] != null, `missing ${k}`);
  need(s.flow != null || s.flows != null, "missing flow");
  if (s.flows != null) need(typeof s.flows === "object" && !Array.isArray(s.flows) && Object.keys(s.flows).length > 0 && Object.entries(s.flows).every(([k, f]) => /^[a-z][a-z0-9-]*$/.test(k) && f && typeof f === "object" && (f.name == null || f.name === k)), "flows is {<name>: {stages, …}}, each keyed by its kebab-case name (a name inside, if any, is the key)");
  if (v.length) return v;
  const rooms = new Map(s.rooms.map((r) => [r.id, r]));
  need(rooms.size === s.rooms.length, "room ids are unique");
  for (const r of s.rooms) { need(KINDS.includes(r.kind), `room ${r.id}: kind is one of ${KINDS.join(", ")}`); need(Number.isInteger(r.floor) && r.floor >= 1, `room ${r.id}: floor is a whole number from 1`); if (r.kind === "lane") need(!!r.lane, `lane room ${r.id} names its lane`); }
  const roles = new Map(s.roles.map((r) => [r.id, r]));
  need(roles.size === s.roles.length, "role ids are unique");
  const founders = s.roles.filter((r) => r.level === "founder");
  need(founders.length === 1 && founders[0].human, "exactly one founder, and the founder is a person (human: true)");
  for (const r of s.roles) {
    need(LEVELS.includes(r.level), `role ${r.id}: level is one of ${LEVELS.join(", ")}`);
    need(rooms.has(r.room), `role ${r.id}: room ${r.room} exists`);
    if (rooms.has(r.room)) need(rooms.get(r.room).floor === r.floor, `role ${r.id}: floor ${r.floor} is room ${r.room}'s floor (${rooms.get(r.room).floor})`);
    for (const k of r.skills ?? []) need(s.skills.includes(k), `role ${r.id}: skill ${k} is declared`);
    if (r.level !== "founder") need(roles.has(r.reportsTo), `role ${r.id}: reports to an existing role (${r.reportsTo})`);
    // the chain ends at the founder, with no loop
    const seen = new Set(); let x = r;
    while (x && x.level !== "founder" && !seen.has(x.id)) { seen.add(x.id); x = roles.get(x.reportsTo); }
    need(x?.level === "founder", `role ${r.id}: its reporting chain reaches the founder`);
    if (["builder", "manager"].includes(r.level) && r.lane) need(s.rooms.some((m) => m.kind === "lane" && m.lane === r.lane), `role ${r.id}: lane ${r.lane} has a lane room`);
    // M6 prep: `lanes` (a builder of several lanes, plan §M6: demo-builder in math and cs; `lane` stays its home lane),
    // `sessions` (agent sessions of the role at once, the planner's; default 1), `drainCap` (items a session takes) and
    // `waitSec` (how long its session waits for its next item: the pack's room next --wait; default 90)
    if (r.lanes != null) {
      need(Array.isArray(r.lanes) && r.lanes.length > 0 && r.lanes.every((l) => typeof l === "string" && l) && new Set(r.lanes).size === r.lanes.length, `role ${r.id}: lanes is a list of distinct lane names`);
      need(r.level === "builder", `role ${r.id}: only a builder works in several lanes (a manager is one lane's POC)`);
      if (Array.isArray(r.lanes)) for (const l of r.lanes) need(s.rooms.some((m) => m.kind === "lane" && m.lane === l), `role ${r.id}: lane ${l} has a lane room`);
    }
    if (r.sessions != null) need(Number.isInteger(r.sessions) && r.sessions >= 1 && r.sessions <= 10, `role ${r.id}: sessions is a whole number 1-10`);
    // at most 540: the agent's Bash call must outlive the wait, and a Bash tool call's timeout is at most 10 minutes
    if (r.waitSec != null) need(Number.isInteger(r.waitSec) && r.waitSec >= 0 && r.waitSec <= 540, `role ${r.id}: waitSec is a whole number of seconds 0-540 (room next --wait in its pack; a Bash call lasts at most 10 minutes)`);
    if (r.drainCap != null) need(Number.isInteger(r.drainCap) && r.drainCap >= 1 && r.drainCap <= 10, `role ${r.id}: drainCap is a whole number 1-10 (policy.mjs KNOBS.drainCap)`);
    if (r.level === "builder") { const m = roles.get(r.reportsTo); need(m?.level === "manager", `builder ${r.id} reports to a manager (who delegates its work)`); }
    // K10: per-role launch settings (launcher/launch.mjs): tools, sessionMin, maxTurns, settingSources
    { const e = validateRoleLaunch(r); need(!e, `role ${r.id}: ${e}`); }
  }
  // K19 (plan §M7): several flows per spec, `flows: {lesson: {stages…}, ritual: {stages…}}`, beside the single legacy
  // `flow` (still valid: specFlows reads both). Each is validated as the one flow was; a message about a flow of
  // `flows` names it ("flow ritual: …"), the legacy flow's read as before
  const flowList = specFlows(s);
  need(new Set(flowList.map((f) => f.name)).size === flowList.length, "flow names are unique (flow.name and the keys of flows)");
  for (const f of flowList) {
    const pre = f.legacy ? "" : `flow ${f.name}: `;
    const need = (ok, msg) => { if (!ok) v.push(pre + msg); };
    const st = Array.isArray(f?.stages) ? f.stages : [];
    need(!!f?.name && Array.isArray(st) && st.length > 0, "the flow has a name and stages");
    // K19: a lesson-like flow starts at build, signed by the builder; a chair flow (the ritual flow) at a stage its chair
    // signs, and its orders name the chair and an attendee (lib.mjs isChairFlow, flowProblems)
    if (isChairFlow(f)) for (const e of flowProblems({ stages: st })) need(false, `flow problem: ${e}`);
    else {
      need(st[0]?.stage === "build" && st[0]?.signer === "builder", "the first stage is build, signed by the builder");
      for (const x of st) if (CHAIR_SIGNERS.includes(x.signer)) need(false, `stage ${x.stage}: a ${x.signer} signs only in a chair flow (one whose first stage the chair signs)`);
    }
    for (const x of st) {
      // K3: or {role:"<id>"}, a role that exists and is active; K4: `independent` is a boolean, never on a builder stage, and
      // an independent stage's role is not a builder (it could be the order's own builder: the guard would refuse every run)
      const rid = signerRole(x);
      if (rid) {
        const r = roles.get(rid);
        need(Object.keys(x.signer).length === 1, `stage ${x.stage}: a role signer is {role:"<id>"}`);
        need(!!r && r.active !== false, `stage ${x.stage}: signer role ${rid} exists and is active`);
        need(!r || !r.human, `stage ${x.stage}: signer role ${rid} is an agent (a person signs as founder, through approval)`);
        if (r && isIndependent(x)) need(r.level !== "builder", `stage ${x.stage}: signer role ${rid} is a builder and cannot sign an independent stage`);
      } else need(SIGNERS.includes(x.signer), `stage ${x.stage}: signer is one of ${SIGNERS.join(", ")}, or {role:"<id>"}`);
      if (x.independent != null) need(typeof x.independent === "boolean", `stage ${x.stage}: independent is true or false`);
      if (x.signer === "builder") need(x.independent !== true, `stage ${x.stage}: an independent stage cannot be signed by the builder`);
      // K6: context-pack rules (a code stage has no pack: no agent reads it)
      { const e = packProblem(x.pack); need(!e, `stage ${x.stage}: ${e}`); }
      if (x.pack != null) need(x.signer !== "code", `stage ${x.stage}: a pack is for a stage an agent works, not code`);
    }
    need(new Set(st.map((x) => x.stage)).size === st.length, "stage names are unique");
    // K1: a stage `run` is a valid cmd, on a stage code may execute (code, orderer, release: never an agent's own stage or
    // the founder's), and its routes go back to an earlier stage only (plan 2026-10-21 §3, K1/K11)
    for (const [i, x] of st.entries()) {
      // K2: `async: true` runs the stage's cmd as a job outside the lock (jobs.mjs); it needs a cmd to run
      if (x.async != null) need(typeof x.async === "boolean" && (!x.async || x.run != null), `stage ${x.stage}: async is true or false, and async needs a run`);
      // K12: a post-check is a cmd on a stage an agent leaves; it comes from the spec, never from an agent (as K1's run).
      // A failure refuses the leave, unless its output matches a `route` (M4 audit: learner-verdict's revise → build and
      // fatal → park; with no route a revise review refused every leave and the evaluator could never hand in): an
      // earlier stage or park, never this one
      if (x.post != null) {
        const e = validateCmd(x.post, { stages: st.slice(0, i).map((y) => y.stage) });
        need(!e, `stage ${x.stage}: post: ${e}`);
        // K12 review: where it may go (never a stage the supervisor or a person signs) and no agent text in a shell or cwd
        if (!e) for (const q of postProblems(x)) need(false, `stage ${x.stage}: ${q}`);
      }
      // M5: a pre-check is a cmd code runs before an agent's stage is planned (holds.mjs, ledger-gate.mjs); it reads no
      // agent text, and routes only to park (a pass plans the stage, anything else holds it as a stage-error)
      if (x.pre != null) {
        const e = validateCmd(x.pre, { stages: [] });
        need(!e, `stage ${x.stage}: pre: ${e}`);
        need(x.run == null && !["code", "founder"].includes(x.signer), `stage ${x.stage}: a pre-check is for a stage an agent works (code runs a code stage itself; the founder decides an approval)`);
        need(!/\$\{(evidence|verdict)\}/.test(JSON.stringify(x.pre)), `stage ${x.stage}: pre: \${evidence} and \${verdict} are a leave's; a pre-check runs before anyone works the stage`);
      }
      if (x.run == null) continue;
      need(["code", "orderer", "release"].includes(x.signer), `stage ${x.stage}: a run is for a stage signed by code, orderer or release, not ${x.signer}`);
      const e = validateCmd(x.run, { stages: st.slice(0, i).map((y) => y.stage) });
      need(!e, `stage ${x.stage}: run: ${e}`);
    }
    const has = (lvl) => s.roles.some((r) => r.level === lvl);
    if (st.some((x) => x.signer === "builder")) need(has("builder"), "a builder exists to sign build");
    if (st.some((x) => x.signer === "checker")) need(has("checker"), "a checker exists to sign check");
    if (st.some((x) => x.signer === "evaluator")) need(has("evaluator"), "an evaluator exists to sign its stage");
    if (st.some((x) => x.signer === "release")) need(has("release"), "a release role exists to sign ship");
    if (st.some((x) => x.signer === "orderer")) need(has("manager"), "a manager exists to order work (orderer signs uat)");
    // independence (S8): someone other than every builder can check
    if (st.some((x) => x.signer === "checker")) need(s.roles.some((r) => r.level === "checker" && r.level !== "builder"), "a checker who is not a builder");
  }
  for (const c of s.channels ?? []) { need(["company", "lane", "role", "topic"].includes(c.kind), `channel ${c.id}: kind is company, lane, role or topic`); for (const m of c.members ?? []) need(roles.has(m), `channel ${c.id}: member ${m} exists`); }
  // K5: an order workspace (one git worktree per order, workspace.mjs)
  if (s.workspace != null) { const e = validateWorkspace(s.workspace); need(!e, `workspace: ${e}`); }
  // K9: the loop cap (true: lib.mjs DEFAULT_MAX_LOOPS; a lane policy's maxLoops wins), the same range as the knob
  if (s.maxLoops != null) need(s.maxLoops === true || (Number.isInteger(s.maxLoops) && s.maxLoops >= 1 && s.maxLoops <= 10), "maxLoops is true (3) or a whole number 1-10");
  for (const r of s.rules ?? []) need(!!r.tasks && r.checks && typeof r.checks === "object", "a standing rule is {tasks, checks}");
  // K17 + M6 prep: `policy` {levelCaps: {<level>: N}, host: {maxLoadPerCpu, minFreeGB}, lanes: {<lane>: {knobs, reason,
  // prediction}}}: the planner's caps per level, its host guard, and each lane's first policy version (meta.mjs init
  // proposes and activates it as the lane's manager; the manager changes it later as any policy, policy.mjs)
  if (s.policy != null) {
    const P = s.policy;
    if (typeof P !== "object" || Array.isArray(P)) need(false, "policy is {levelCaps, host, lanes}");
    else {
      for (const k of Object.keys(P)) need(["levelCaps", "host", "lanes"].includes(k), `policy has unknown key ${k} (levelCaps, host, lanes)`);
      for (const [lv, n] of Object.entries(P.levelCaps ?? {})) { need(LEVELS.includes(lv), `policy.levelCaps: ${lv} is a level (${LEVELS.join(", ")})`); need(Number.isInteger(n) && n >= 1 && n <= 20, `policy.levelCaps.${lv} is a whole number 1-20`); }
      if (P.host != null) {
        need(typeof P.host === "object" && !Array.isArray(P.host) && Object.keys(P.host).every((k) => ["maxLoadPerCpu", "minFreeGB"].includes(k)), "policy.host is {maxLoadPerCpu, minFreeGB}");
        if (P.host.maxLoadPerCpu != null) need(typeof P.host.maxLoadPerCpu === "number" && P.host.maxLoadPerCpu > 0, "policy.host.maxLoadPerCpu is a number above 0");
        if (P.host.minFreeGB != null) need(typeof P.host.minFreeGB === "number" && P.host.minFreeGB >= 0, "policy.host.minFreeGB is a number from 0");
      }
      for (const [lane, v] of Object.entries(P.lanes ?? {})) {
        need(s.roles.some((r) => r.level === "manager" && r.lane === lane), `policy.lanes.${lane}: the lane has a manager (its POC proposes the policy)`);
        need(!!v && typeof v === "object" && v.knobs && typeof v.knobs === "object" && typeof v.reason === "string" && !!v.reason && typeof v.prediction === "string" && !!v.prediction, `policy.lanes.${lane} is {knobs, reason, prediction}`);
        if (v?.knobs && typeof v.knobs === "object") for (const e of policyProblems(v.knobs, { flowNowBy: defaultFlow(s)?.nowBy ?? ["founder", "chief-of-staff"] })) need(false, `policy.lanes.${lane}: ${e}`);
      }
    }
  }
  // M6 prep: exports [{id, role, every, run}]: code steps the supervisor runs after each tick (supervisor.mjs
  // runExports), each as a role's (the founder inbox: the chief of staff's, its single writer). Never into the main
  // checkout: no --allow-main (inbox-export.mjs's override of its main-checkout refusal)
  if (s.exports != null) {
    if (!Array.isArray(s.exports)) need(false, "exports is a list of {id, role, every, run}");
    else {
      need(new Set(s.exports.map((x) => x?.id)).size === s.exports.length, "export ids are unique");
      for (const x of s.exports) {
        const id = x?.id ?? "?";
        need(!!x && typeof x === "object" && Object.keys(x).every((k) => ["id", "role", "every", "run"].includes(k)), `export ${id}: fields are id, role, every, run`);
        need(typeof x?.id === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(x.id), `export ${id}: id is kebab-case`);
        need(roles.has(x?.role) && !roles.get(x?.role)?.human, `export ${id}: role ${x?.role} is an agent role of the spec (whose code step it is)`);
        need(["change", "tick"].includes(x?.every), `export ${id}: every is "change" or "tick"`);
        const e = validateCmd(x?.run, { stages: [] });
        need(!e, `export ${id}: run: ${e}`);
        if (!e) {
          need(!x.run.route, `export ${id}: run has no route (an export signs and parks nothing)`);
          need(!/\$\{(evidence|verdict|slug|task|workdir|branch|base_sha|head_sha|order|budget|remaining|ledger_project|brief_file)\}/.test(JSON.stringify(x.run)), `export ${id}: run reads only \${live} and \${stage} (it belongs to no order)`);
          need(!x.run.argv.some((a) => /^--allow-main\b/.test(a)), `export ${id}: run never writes the main checkout (--allow-main)`);
        }
      }
    }
  }
  // K18: schedulers [{id, role, flow, every: "tick", minIntervalMin, budget, run}]: code that places orders (the ritual
  // scheduler, adapters/s3c/rituals.mjs due), as the role's, into one of the spec's flows; its cmd reads only ${live}
  if (s.schedulers != null) {
    if (!Array.isArray(s.schedulers)) need(false, "schedulers is a list of {id, role, flow, every, minIntervalMin, budget, run}");
    else {
      need(new Set(s.schedulers.map((x) => x?.id)).size === s.schedulers.length, "scheduler ids are unique");
      const names = specFlows(s).map((f) => f.name);
      for (const x of s.schedulers) {
        const id = x?.id ?? "?";
        need(!!x && typeof x === "object" && Object.keys(x).every((k) => ["id", "role", "flow", "every", "minIntervalMin", "budget", "run"].includes(k)), `scheduler ${id}: fields are id, role, flow, every, minIntervalMin, budget, run`);
        need(typeof x?.id === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(x.id), `scheduler ${id}: id is kebab-case`);
        need(roles.has(x?.role) && !roles.get(x?.role)?.human && ["chief-of-staff", "vp", "manager"].includes(roles.get(x?.role)?.level), `scheduler ${id}: role ${x?.role} is an agent role that orders work (chief-of-staff, vp or manager)`);
        need(names.includes(x?.flow), `scheduler ${id}: flow ${x?.flow} is one of the spec's flows (${names.join(", ")})`);
        need(x?.every === "tick", `scheduler ${id}: every is "tick" (at most once per minIntervalMin)`);
        // serve saves each run (its time), and a save wakes serve: at least half a minute between runs, or it would spin
        need(x?.minIntervalMin == null || (typeof x.minIntervalMin === "number" && x.minIntervalMin >= 0.5 && x.minIntervalMin <= 1440), `scheduler ${id}: minIntervalMin is 0.5-1440 minutes (default 1)`);
        need(x?.budget == null || (Number.isInteger(x.budget) && x.budget > 0), `scheduler ${id}: budget is a whole number of tokens`);
        const e = validateCmd(x?.run, { stages: [] });
        need(!e, `scheduler ${id}: run: ${e}`);
        if (!e) {
          need(!x.run.route, `scheduler ${id}: run has no route (a scheduler places orders, it signs nothing)`);
          need(!/\$\{(evidence|verdict|slug|task|workdir|branch|base_sha|head_sha|order|budget|remaining|ledger_project|brief_file|role|running|builders|launch)\}/.test(JSON.stringify(x.run)), `scheduler ${id}: run reads only \${live} and \${stage} (it belongs to no order)`);
        }
      }
    }
  }
  // K20: launchGate {id, roles, stages, run, notify, retryMin} (or a list): a cmd code runs before it reserves a
  // planned session that matches (dispatch-check.mjs for a demo-builder's build); exit 0 reserves it
  if (s.launchGate != null) {
    const gs = [].concat(s.launchGate);
    need(gs.length > 0 && new Set(gs.map((g) => g?.id)).size === gs.length, "launchGate is a gate or a list of gates with unique ids");
    const allStages = new Set([...specFlows(s).flatMap((f) => (Array.isArray(f.stages) ? f.stages : []).map((x) => x.stage)), "chair", "positions", "ask", "delegate"]);
    for (const g of gs) {
      const id = g?.id ?? "?";
      need(!!g && typeof g === "object" && !Array.isArray(g) && Object.keys(g).every((k) => ["id", "roles", "stages", "run", "notify", "retryMin"].includes(k)), `launchGate ${id}: fields are id, roles, stages, run, notify, retryMin`);
      need(typeof g?.id === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.id), `launchGate ${id}: id is kebab-case`);
      if (g?.roles != null) need(Array.isArray(g.roles) && g.roles.length > 0 && g.roles.every((r) => roles.has(r) && !roles.get(r).human), `launchGate ${id}: roles are agent roles of the spec`);
      if (g?.stages != null) need(Array.isArray(g.stages) && g.stages.length > 0 && g.stages.every((x) => allStages.has(x)), `launchGate ${id}: stages are stages of the spec's flows (or judgment kinds: chair, positions, ask, delegate)`);
      if (g?.notify != null) need(roles.has(g.notify) && !roles.get(g.notify).human, `launchGate ${id}: notify is an agent role (whose mailbox gets the refusals)`);
      if (g?.retryMin != null) need(typeof g.retryMin === "number" && g.retryMin >= 0.5 && g.retryMin <= 120, `launchGate ${id}: retryMin is 0.5-120 minutes`);
      const e = validateCmd(g?.run, { stages: [] });
      need(!e, `launchGate ${id}: run: ${e}`);
      if (!e) need(!g.run.route && !/\$\{(evidence|verdict)\}/.test(JSON.stringify(g.run)), `launchGate ${id}: run has no route and reads no agent text (\${evidence}, \${verdict})`);
    }
  }
  // K15: approvals.standing, AMD-015's scoped pre-approval as data: {action, role, trigger, record}, nothing else
  if (s.approvals != null) {
    if (typeof s.approvals !== "object" || Array.isArray(s.approvals)) need(false, "approvals is {standing:[…]}");
    else { for (const k of Object.keys(s.approvals)) need(k === "standing", `approvals has unknown key ${k} (standing)`); for (const e of standingProblems(s.approvals.standing, { roles })) need(false, e); }
  }
  return v;
}

/** ORG.md: the company as agents read it (generated, never edited by hand). */
export function orgDoc(s, name) {
  const L = [`# ${s.title ?? name}: the organisation (generated from the spec \`${name}\`; do not edit)`, ""];
  if (s.product) L.push(s.product, "");
  L.push("## Roles", "", "| Role | Level | Reports to | Room (floor) | Lane | Skills |", "|---|---|---|---|---|---|");
  for (const r of s.roles) L.push(`| ${r.id} | ${r.level}${r.human ? " (a person)" : ""} | ${r.reportsTo ?? "-"} | ${r.room} (${r.floor}) | ${[...new Set([r.lane, ...(r.lanes ?? [])].filter(Boolean))].join(", ") || "-"} | ${(r.skills ?? []).join(", ") || "-"} |`);
  // K19: every flow of the spec; an order goes through one of them (the first unless `order new --flow` names another)
  const fl = specFlows(s);
  L.push("", "## How work flows", "", fl.length > 1 ? `Every order goes through one of ${fl.length} flows: \`${fl[0].name}\` (the default) or ${fl.slice(1).map((f) => `\`${f.name}\``).join(", ")} (\`order new --flow=<name>\`). Each stage is signed by one kind of role, and nobody checks their own work.` : `Every order goes through the \`${fl[0].name}\` flow; each stage is signed by one kind of role, and nobody checks their own work.`, "");
  for (const f of fl) {
    if (fl.length > 1) L.push(`### ${f.name}${isChairFlow(f) ? " (each order names its chair and a second attendee: `order new --flow=" + f.name + " --chair=<role> --attendee=<role>`)" : ""}`, "");
    for (const x of f.stages) L.push(`1. **${x.stage}**, signed by the ${x.signer === "code" ? "supervisor's code" : signerName(x)}${isIndependent(x) && x.stage !== "check" ? " (independent: never the builder)" : ""}${x.evidence?.length ? ` (evidence: ${x.evidence.join(", ")})` : ""}${x.pack ? ` (pack: ${[!packHistory(x) && "no prior findings or history", x.pack.include?.length && `only ${x.pack.include.join(", ")}`, x.pack.exclude?.length && `never ${x.pack.exclude.join(", ")}`].filter(Boolean).join("; ")})` : ""}`);
    if (fl.length > 1) L.push("");
  }
  if (s.rules?.length) { L.push("", "## Standing rules (checked by code on every matching order)", ""); for (const r of s.rules) L.push(`- orders whose task starts with \`${r.tasks}\`: ${Object.keys(r.checks).join(", ")}`); }
  if (s.channels?.length) { L.push("", "## Channels", ""); for (const c of s.channels) L.push(`- \`${c.id}\` (${c.kind})${c.title ? `: ${c.title}` : ""}`); }
  return L.join("\n") + "\n";
}

export const builtinSpec = (name) => { const s = SPECS[name]; if (!s) throw new Error(`no built-in spec ${name}`); return JSON.parse(JSON.stringify(s)); };

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === "validate") { const v = validateSpec(JSON.parse(fs.readFileSync(arg, "utf8"))); console.log(JSON.stringify({ valid: !v.length, violations: v }, null, 1)); process.exit(v.length ? 1 : 0); }
  else if (cmd === "export") console.log(JSON.stringify(builtinSpec(arg), null, 1));
  else { console.error("usage: node generator.mjs validate <spec.json> | export <name>"); process.exit(2); }
}
