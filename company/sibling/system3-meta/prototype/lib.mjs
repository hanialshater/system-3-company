// System 3 Meta prototype: one engine under five tools (mailbox, org, flows, rooms, rituals).
// Design: company/ops/2026-10-20-flow-and-rooms-scenarios.md. Plain JavaScript, no dependencies, no I/O except
// toJSON/fromJSON. Time is injected (clock.now(), minutes), so the simulator and the tests control it.
//
// Every guarded rule goes through guard(). With config.enforce on, a broken rule throws Refused and writes a
// `refuse` event. With it off (the "current design" arm), the action goes ahead and a `violation` event is written, so
// the simulator can count what prose rules let through. Rules marked HARD hold in both modes: they are the engine's
// own integrity (an unknown order, a lease held by another run), not company rules.

export class Refused extends Error {
  constructor(msg) { super(msg); this.refused = true; }
}

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** M6 prep (plan §M6 "Live run": a demo-builder with lanes math and cs, not a second builder): the lanes a role works
 *  in. A spec role may give `lanes: [..]` beside (or instead of) `lane`; `lane` stays its home lane (its lane room, the
 *  lane a manager is POC of). */
export const lanesOf = (r) => [...new Set([...(r?.lane != null ? [r.lane] : []), ...(Array.isArray(r?.lanes) ? r.lanes : [])])];

export class Log {
  constructor(clock) { this.clock = clock; this.events = []; }
  add(e) { const ev = { seq: this.events.length + 1, t: this.clock.now(), ...e }; this.events.push(ev); return ev; }
  of(type) { return this.events.filter((e) => e.type === type); }
}

export const DEFAULT_MAX_LOOPS = 3; // K9: a spec's `maxLoops: true` (plan 2026-10-21 §3)
export const BUDGET_WARN_AT = 0.8; // K13: the company's projects.json thresholds.warnAt (tools/lib/ledger.mjs gate)
export const DEFAULT_CONFIG = { enforce: true, autoBookkeeping: true, supervisor: true, asyncApprovals: true, leases: true, dedupe: true };

function makeGuard(log, config) {
  return (ok, rule, msg, extra = {}) => {
    if (ok) return true;
    if (config.enforce) { log.add({ type: "refuse", rule, msg, ...extra }); throw new Refused(`${rule}: ${msg}`); }
    log.add({ type: "violation", rule, msg, ...extra });
    return false;
  };
}
const hard = (ok, msg) => { if (!ok) throw new Refused(`HARD: ${msg}`); };

// ------------------------------------------------------------------ mailbox: delivery layer for everything

export const PRIORITY = { now: 0, next: 1, later: 2 };
const byPriority = (a, b) => (PRIORITY[a.priority ?? "next"] - PRIORITY[b.priority ?? "next"]) || a.ts - b.ts;

export class Mailbox {
  constructor({ log, clock, config }) { Object.assign(this, { log, clock, config }); this.msgs = new Map(); this.keys = new Map(); this.n = 0; this.onLease = null; }

  /** priority: now (wake a session at once), next (default: front of the next drain), later (wait for a batch or the due time). */
  send({ from, to, kind, key = null, due = null, ref = null, body = null, priority = "next" }) {
    hard(priority in PRIORITY, `unknown priority ${priority}`);
    // a key whose message is gone (lost: benchmark 4's dropped message) no longer dedupes
    if (key && this.keys.has(key) && !this.msgs.has(this.keys.get(key))) this.keys.delete(key);
    if (this.config.dedupe && key && this.keys.has(key)) {
      const m = this.msgs.get(this.keys.get(key));
      this.log.add({ type: "dedupe", msg: m.id, key });
      return m;
    }
    const m = { id: `M-${++this.n}`, from, to, kind, key, due, ref, body, priority, ts: this.clock.now(), state: "open", lease: null, acked: false };
    this.msgs.set(m.id, m);
    if (key) this.keys.set(key, m.id);
    this.log.add({ type: "send", msg: m.id, from, to, kind, key, ref, priority, due });
    return m;
  }

  leaseFree(m) { return !m.lease || (m.state === "open" && m.lease.until <= this.clock.now()); }

  claim(id, { run, leaseMin = 30 }) {
    const m = this.msgs.get(id);
    hard(m, `no message ${id}`);
    hard(m.state === "open", `${id} is ${m.state}`);
    hard(this.leaseFree(m), `${id} is held by run ${m.lease?.run} until ${m.lease?.until}`);
    m.lease = { run, until: this.clock.now() + leaseMin };
    this.log.add({ type: "claim", msg: id, run });
    this.onLease?.(id, m.lease.until); // a wake at expiry, instead of a sweep that polls
    return m;
  }

  heartbeat(id, { run, leaseMin = 30 }) {
    const m = this.msgs.get(id);
    hard(m?.lease?.run === run, `${id} not held by ${run}`);
    m.lease.until = this.clock.now() + leaseMin;
    this.onLease?.(id, m.lease.until);
  }

  /** A `later` message past its due time becomes `next`: nothing waits forever for a batch. */
  promote() {
    const out = [];
    for (const m of this.msgs.values()) {
      if (m.state === "open" && m.priority === "later" && m.due != null && m.due <= this.clock.now()) {
        m.priority = "next";
        this.log.add({ type: "promote", msg: m.id, late: this.clock.now() - Math.max(m.due, m.ts) }); // late from when it became eligible
        out.push(m);
      }
    }
    return out;
  }

  /** The earliest lease expiry among held messages, or null: when the supervisor should next wake. */
  nextExpiry() {
    const xs = [...this.msgs.values()].filter((m) => m.state === "open" && m.lease).map((m) => m.lease.until);
    return xs.length ? Math.min(...xs) : null;
  }

  release(id, { run, reason }) {
    const m = this.msgs.get(id);
    hard(m && (!m.lease || m.lease.run === run || m.lease.until <= this.clock.now()), `${id} held by another run`);
    m.lease = null;
    this.log.add({ type: "release", msg: id, run, reason });
  }

  done(id, { run, report = null }) {
    const m = this.msgs.get(id);
    hard(m && m.state === "open", `${id} not open`);
    hard(!m.lease || m.lease.run === run, `${id} held by another run`);
    m.state = "done";
    this.log.add({ type: "done", msg: id, run });
    if (report) this.send({ from: m.to, to: m.from, kind: "report", ref: m.ref, body: report });
  }

  /** K8: a parked or cancelled order's open messages leave every queue (state "withdrawn"); a lease is kept so recover
   *  still ends a run that was on it, and the key is freed so a resumed stage is sent afresh, not deduped to this one */
  withdraw(ref, { by, reason }) {
    const out = [];
    for (const m of this.msgs.values()) {
      if (m.ref !== ref || m.state !== "open") continue;
      m.state = "withdrawn";
      if (m.key && this.keys.get(m.key) === m.id) this.keys.delete(m.key);
      out.push(m.id);
    }
    if (out.length) this.log.add({ type: "withdraw", ref, msgs: out, by, reason });
    return out;
  }

  ack(id, by) { const m = this.msgs.get(id); hard(m, `no message ${id}`); m.acked = true; this.log.add({ type: "ack", msg: id, by }); }

  /** Open messages for a recipient (or a pool) whose lease is free: now, then next, then later; oldest first within each. */
  queue(to, kind = null) {
    return [...this.msgs.values()].filter((m) => m.to === to && m.state === "open" && (!kind || m.kind === kind) && this.leaseFree(m)).sort(byPriority);
  }

  thread(ref) { return [...this.msgs.values()].filter((m) => m.ref === ref); }

  toJSON() { return { n: this.n, msgs: [...this.msgs.values()] }; }
  static fromJSON(json, deps) {
    const mb = new Mailbox(deps);
    mb.n = json.n;
    for (const m of json.msgs) { mb.msgs.set(m.id, { ...m }); if (m.key) mb.keys.set(m.key, m.id); }
    return mb;
  }
}

// ------------------------------------------------------------------ org: roles as data, changes through approval

export const LEVELS = ["founder", "vp", "chief-of-staff", "manager", "builder", "checker", "release", "contractor", "evaluator"];

export class Org {
  constructor({ log, rooms = [], skills = [], rituals = [] }) {
    Object.assign(this, { log });
    this.roles = new Map();
    this.changes = new Map();
    this.n = 0;
    this.rooms = new Map(rooms.map((r) => [r.id, r])); // {id, floor}
    this.skills = new Set(skills);
    this.ritualIds = new Set(rituals);
    this.onboard = []; // hooks: (role) => void, run on approval (memory init, room seat, ritual lists, day-one order)
  }

  genesis(roles) {
    for (const r of roles) this.roles.set(r.id, { skills: [], rituals: [], active: true, ...r });
    this.log.add({ type: "org-genesis", roles: roles.map((r) => r.id) });
  }

  role(id) { return this.roles.get(id); }
  active() { return [...this.roles.values()].filter((r) => r.active); }
  byLevel(level) { return this.active().filter((r) => r.level === level); }
  lanePOC(lane) { return this.active().find((r) => r.level === "manager" && r.lane === lane); }

  validate(r, op) {
    const p = [];
    if (op === "add" && this.roles.has(r.id)) p.push(`id ${r.id} exists`);
    if (!LEVELS.includes(r.level)) p.push(`unknown level ${r.level}`);
    if (r.level !== "founder" && !this.roles.has(r.reportsTo)) p.push(`reportsTo ${r.reportsTo} does not exist`);
    if (!this.rooms.has(r.room)) p.push(`room ${r.room} does not exist`);
    else if (r.floor != null && this.rooms.get(r.room).floor !== r.floor) p.push(`room ${r.room} is not on floor ${r.floor}`);
    for (const s of r.skills ?? []) if (!this.skills.has(s)) p.push(`unknown skill ${s}`);
    for (const x of r.rituals ?? []) if (!this.ritualIds.has(x.split(":")[0])) p.push(`unknown ritual ${x}`);
    if (r.level === "manager" && op === "add" && this.lanePOC(r.lane)) p.push(`lane ${r.lane} already has a POC`);
    return p;
  }

  propose({ op, role, reason, by, to = null }) {
    hard(["add", "change", "retire"].includes(op), `unknown op ${op}`);
    const target = op === "add" ? role : { ...this.roles.get(role.id), ...role };
    hard(op === "add" || this.roles.has(role.id), `no role ${role.id}`);
    const problems = op === "retire" ? (to && this.roles.has(to) ? [] : [`retire needs --to, an existing role`]) : this.validate(target, op);
    hard(problems.length === 0, problems.join("; "));
    const id = `ORG-${++this.n}`;
    this.changes.set(id, { id, op, role: target, reason, by, to, state: "proposed" });
    this.log.add({ type: "org-propose", change: id, op, role: target.id, by, reason });
    return id;
  }

  /** Founder-reserved. Called by the engine's approval callback, never directly by an agent. */
  apply(id, { by, words }) {
    const c = this.changes.get(id);
    hard(c && c.state === "proposed", `${id} not proposed`);
    hard(by === "founder" && words, "org change needs the founder's words");
    c.state = "applied";
    if (c.op === "add") {
      this.roles.set(c.role.id, { skills: [], rituals: [], active: true, ...c.role });
      for (const h of this.onboard) h(this.roles.get(c.role.id));
      this.log.add({ type: "onboard", role: c.role.id, change: id, steps: ["record", "onboarding-doc", "agent-file", "memory-init", "room-seat", "lane-roster", "ritual-lists", "day-one-order"] });
    } else if (c.op === "change") {
      this.roles.set(c.role.id, c.role);
      this.log.add({ type: "org-change", role: c.role.id, change: id });
    } else {
      this.roles.get(c.role.id).active = false;
      this.log.add({ type: "offboard", role: c.role.id, change: id, reassignTo: c.to, steps: ["reassign-open-orders", "memory-archive", "leave-rooms-lanes-rituals", "agent-file-removed"] });
    }
    return c;
  }

  /** Evidence for staffing decisions, from events only. Decides nothing. */
  gaps(events, { since = 0, waitP50Min = 240 } = {}) {
    const ev = events.filter((e) => e.t >= since);
    const waits = {};
    const sent = new Map(ev.filter((e) => e.type === "send" && e.kind === "work").map((e) => [e.msg, e]));
    for (const e of ev.filter((e) => e.type === "enter" && e.msg && sent.has(e.msg))) {
      const pool = sent.get(e.msg).to;
      (waits[pool] ??= []).push(e.t - sent.get(e.msg).t);
    }
    const waiting = {};
    for (const s of sent.values()) if (!ev.some((e) => e.type === "enter" && e.msg === s.msg)) (waiting[s.to] ??= 0, waiting[s.to]++);
    const p50 = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
    const overloaded = Object.entries(waits).map(([pool, w]) => ({ pool, waitP50: p50(w), waiting: waiting[pool] ?? 0 }))
      .filter((x) => x.waitP50 > waitP50Min || x.waiting > 3).sort((a, b) => b.waitP50 - a.waitP50);
    const entered = new Set(ev.filter((e) => e.type === "enter").map((e) => e.role));
    const idle = this.active().filter((r) => !r.human && r.level !== "chief-of-staff" && !entered.has(r.id)).map((r) => r.id);
    const missing = ev.filter((e) => e.type === "refuse" && e.rule === "no-role").length;
    return { overloaded, idle, missing };
  }

  activity(events, roleId) {
    const ev = events.filter((e) => e.role === roleId || e.by === roleId);
    const count = (t) => ev.filter((e) => e.type === t).length;
    return {
      runs: count("enter"), tokens: ev.filter((e) => e.type === "usage").reduce((s, e) => s + e.tokens, 0),
      signed: count("advance"), refusals: count("refuse"), lost: count("left-without-leave"),
    };
  }
}

// ------------------------------------------------------------------ flows and orders

// K3 (plan 2026-10-21 §3): a stage signer may name one role, {role:"<id>"}: stages 5-7 of the lesson flow are signed by
// fact-checker, learner-evaluator and head-of-product, and pool:checker would let any checker-level role sign fact-check
export const signerRole = (s) => (s?.signer && typeof s.signer === "object" ? s.signer.role ?? null : null);
export const signerName = (s) => (signerRole(s) ? `role ${signerRole(s)}` : String(s?.signer));
// K4: a reviewing stage is independent (the builder may never enter or sign it): `independent`, by default true for
// checker, evaluator and role signers; `check` always is (S8). Before K4 only the stage named check was guarded (stage 6)
export const isIndependent = (s) => !!s && (s.stage === "check" || (s.independent ?? (["checker", "evaluator", "attendee"].includes(s.signer) || !!signerRole(s))));
// K19 (plan 2026-10-21 §M7): a second kind of flow, whose orders name a chair and an attendee instead of a manager and
// a builder (the ritual flow: run by the chair → check by a second attendee → ship by code). Its first stage is signed
// by "chair" (the order's o.chair), its check by "attendee" (o.attendee, independent by default: the chair is the
// order's worker, o.builder, so K4's guard keeps the chair off it). Which roles they are is the order's, not the flow's:
// a WBR is chaired by the chief of staff, a Demo Crit by the head of product (adapters/s3c/rituals.mjs)
export const CHAIR_SIGNERS = ["chair", "attendee"];
/** M7 review: who may order a chair flow's order (by level), and who may chair one. */
export const CHAIR_ORDER_BY = ["founder", "chief-of-staff"];
export const CHAIR_LEVELS = ["chief-of-staff", "vp", "manager"];
/** K19: a flow whose orders name a chair (its first stage is signed by "chair"). */
export const isChairFlow = (def) => def?.stages?.[0]?.signer === "chair";
// K6 (plan 2026-10-21 §3): a stage's context-pack rules, `pack:{include:[globs], exclude:[globs], history:false}`. With
// history:false the brief and the room pack leave out prior findings and build history (stage 6, artifact before account:
// the learner judged the lesson through the builder's notes); exclude keeps a file out of the pack (stage 5 and build.md)
export const packHistory = (s) => s?.pack?.history !== false;
// K12 review: a post-check runs only at an agent's room leave. The supervisor signs code, orderer and release stages and
// test1/uat/ship by name, and a person signs founder stages through an approval, all with engine.advance: a post there
// either never ran (uat: a person's flow advance skipped it) or threw out of tick (toy ship.post exit 1: the files were
// already copied, nothing saved, every later tick the same, the company stopped). ${evidence} and ${verdict} are the
// agent's own text: never a shell or -e script, the program, or the cwd (path.resolve with no containment)
const POST_SIGNED_BY_SUPERVISOR = ["code", "orderer", "release", "founder"];
const AGENT_VAR = /\$\{(evidence|verdict)\}/;
const SHELLS = /^(sh|bash|zsh|dash|ksh|fish|csh|tcsh|cmd|cmd\.exe|pwsh|powershell)$/i;
const EVAL_FLAGS = ["-c", "-e", "--eval", "-p", "--print", "-Command", "-command"];
export function postProblems(s) {
  const c = s?.post;
  if (c == null) return [];
  if (!(c && typeof c === "object" && Array.isArray(c.argv) && c.argv.length && c.argv.every((a) => typeof a === "string"))) return ["post is a cmd {argv, …}"];
  const p = [];
  if (s.run != null || POST_SIGNED_BY_SUPERVISOR.includes(s.signer) || ["test1", "uat", "ship"].includes(s.stage)) p.push(`a post-check is for a stage an agent leaves, not one code runs or the supervisor or a person signs (${s.run != null ? "it has a run" : POST_SIGNED_BY_SUPERVISOR.includes(s.signer) ? `signer ${s.signer}` : `the supervisor signs ${s.stage}`}): they sign with engine.advance, which runs no post-check`);
  const shell = SHELLS.test(c.argv[0].split(/[\\/]/).pop()); // lib.mjs imports nothing: no path.basename
  if (AGENT_VAR.test(c.argv[0])) p.push("post: ${evidence} and ${verdict} are the agent's text and cannot name the program");
  else if (c.argv.some((a, i) => AGENT_VAR.test(a) && (shell || EVAL_FLAGS.includes(c.argv[i - 1])))) p.push("post: ${evidence} and ${verdict} are the agent's text and cannot go into a shell or an -e/-c script (pass them as a plain argument)");
  if (typeof c.cwd === "string" && AGENT_VAR.test(c.cwd)) p.push("post: ${evidence} and ${verdict} are the agent's text and cannot pick the cwd");
  return p;
}
export function packProblem(p) {
  if (p == null) return null;
  if (typeof p !== "object" || Array.isArray(p)) return "pack is {include, exclude, history}";
  const extra = Object.keys(p).filter((k) => !["include", "exclude", "history"].includes(k));
  if (extra.length) return `pack has unknown key${extra.length > 1 ? "s" : ""} ${extra.join(", ")} (include, exclude, history)`;
  for (const k of ["include", "exclude"]) if (p[k] != null && !(Array.isArray(p[k]) && p[k].every((g) => typeof g === "string" && g.trim() && !g.startsWith("/") && !g.split("/").includes("..")))) return `pack.${k} is a list of workdir-relative globs`;
  if (p.history != null && typeof p.history !== "boolean") return "pack.history is true or false";
  return null;
}

/** Invariants every flow definition must meet, whoever writes it. */
export function flowProblems(def) {
  const p = [];
  const stages = def.stages.map((s) => s.stage);
  for (const s of def.stages) {
    if (!s.signer) p.push(`${s.stage}: no signer`);
    if (s.signer !== "code" && !(s.evidence?.length)) p.push(`${s.stage}: no evidence`);
    if (s.signer && typeof s.signer === "object" && (typeof s.signer.role !== "string" || !s.signer.role || Object.keys(s.signer).length !== 1)) p.push(`${s.stage}: a role signer is {role:"<id>"}`);
    if (s.independent != null && typeof s.independent !== "boolean") p.push(`${s.stage}: independent is true or false`);
    if (s.signer === "builder" && s.independent === true) p.push(`${s.stage}: an independent stage cannot be signed by the builder`);
    { const e = packProblem(s.pack); if (e) p.push(`${s.stage}: ${e}`); } // K6
    // K12: a post-check runs at an agent's leave (generator.mjs validates the cmd itself against state.mjs validateCmd)
    for (const e of postProblems(s)) p.push(`${s.stage}: ${e}`);
  }
  // K19: chair and attendee signers belong to a chair flow (orders that name them); a chair flow has no builder stage
  const chairFlow = isChairFlow(def);
  for (const s of def.stages) {
    if (CHAIR_SIGNERS.includes(s.signer) && !chairFlow) p.push(`${s.stage}: a ${s.signer} signs only in a flow whose first stage the chair signs`);
    if (chairFlow && ["builder", "orderer"].includes(s.signer)) p.push(`${s.stage}: a chair flow's orders have no builder or manager to sign ${s.stage} (chair, attendee, code, a role or release)`);
  }
  const t1 = def.stages.find((s) => s.stage === "test1");
  if (t1 && t1.signer !== "code") p.push("test1 must be signed by code");
  const check = def.stages.find((s) => s.stage === "check");
  if (!check) p.push("no independent check stage");
  else if (["builder", "orderer", "chair"].includes(check.signer)) p.push("check must be signed independently of build");
  const rel = def.stages.find((s) => s.stage === "release");
  if (rel && rel.signer !== "founder") p.push("release is founder-reserved");
  // M6 prep (plan §M6 criterion 5): after ship only code stages with a run may follow (the integration merge,
  // adapters/s3c/integrate.mjs): no agent and no person signs anything after the release
  const si = stages.lastIndexOf("ship");
  if (si < 0) p.push("last stage must be ship");
  else for (const x of def.stages.slice(si + 1)) if (x.signer !== "code" || x.run == null) p.push(`${x.stage}: only code stages with a run (an integration merge) may follow ship`);
  return p;
}

// K15 (plan 2026-10-21 §M5): AMD-015's scoped pre-approval as data, `approvals.standing:[{action, role, trigger,
// record}]`. The constitution has one pre-approved exception (CLAUDE.md: on a privacy or child-safety trigger,
// release-manager may run the flag-off withdrawal without asking first); a standing approval covers exactly that
// action, by that role, on one of its `|`-separated triggers, and nothing else (another role, another action, another
// trigger, a plain deploy). Matched beside COVERS, the founder's words for an approval kind; never used by decide, and
// not exercised in any run: a test only, so Meta does not contradict the constitution.
export const STANDING_ACTIONS = ["flag-off-withdrawal"];
/** M5 review: the one grant the constitution makes (CLAUDE.md, AMD-015), and the bound every standing entry is held to.
 *  The shape check alone let a spec pre-approve a builder's flag-off withdrawal on "outage" under a made-up AMD-999. */
export const STANDING_GRANT = Object.freeze({ action: "flag-off-withdrawal", role: "release-manager", triggers: Object.freeze(["privacy", "child-safety"]), record: "AMD-015" });
const STANDING_KEYS = ["action", "role", "trigger", "record"];
export function standingProblems(list, { roles = null } = {}) {
  if (list == null) return [];
  if (!Array.isArray(list)) return ["approvals.standing is a list of {action, role, trigger, record}"];
  const p = [], G = STANDING_GRANT;
  for (const [i, s] of list.entries()) {
    const at = `approvals.standing[${i}]`;
    if (!s || typeof s !== "object" || Array.isArray(s)) { p.push(`${at} is {action, role, trigger, record}`); continue; }
    const extra = Object.keys(s).filter((k) => !STANDING_KEYS.includes(k)), miss = STANDING_KEYS.filter((k) => typeof s[k] !== "string" || !s[k]);
    if (extra.length) p.push(`${at} has unknown key${extra.length > 1 ? "s" : ""} ${extra.join(", ")} (${STANDING_KEYS.join(", ")})`);
    if (miss.length) p.push(`${at} needs ${miss.join(", ")} (strings)`);
    if (typeof s.action === "string" && !STANDING_ACTIONS.includes(s.action)) p.push(`${at}: action ${s.action} is not one the constitution pre-approves (${STANDING_ACTIONS.join(", ")})`);
    if (typeof s.trigger === "string" && !/^[a-z][a-z0-9-]*(\|[a-z][a-z0-9-]*)*$/.test(s.trigger)) p.push(`${at}: trigger is kebab-case words separated by | (privacy|child-safety)`);
    else if (typeof s.trigger === "string") { const off = s.trigger.split("|").filter((t) => !G.triggers.includes(t)); if (off.length) p.push(`${at}: trigger ${off.join(", ")} is not one ${G.record} names (${G.triggers.join(", ")})`); }
    if (typeof s.record === "string" && !/^AMD-\d{3}$/.test(s.record)) p.push(`${at}: record is the ratified amendment that grants it (AMD-nnn)`);
    else if (typeof s.record === "string" && s.record !== G.record) p.push(`${at}: record ${s.record} grants no standing approval (the constitution's one is ${G.record})`);
    if (typeof s.role === "string" && s.role !== G.role) p.push(`${at}: role ${s.role}: ${G.record} pre-approves the flag-off withdrawal for ${G.role} only`);
    if (roles && typeof s.role === "string") { const r = roles.get(s.role); if (!r || r.active === false || r.human) p.push(`${at}: role ${s.role} is not an active agent role`); }
  }
  return p;
}
/** The standing approval that covers `action` by `role` on `trigger`, or null. Exact on all three, and only an entry
 *  inside the constitution's grant (STANDING_GRANT) is honored, whatever a spec holds (M5 review). */
export function standingCovers(list, { action, role, trigger }) {
  return (list ?? []).find((s) => s?.action === action && s.role === role && typeof trigger === "string" && String(s.trigger).split("|").includes(trigger) && !standingProblems([s]).length) ?? null;
}

const COVERS = { release: /\b(approve|go)\b.*\b(deploy|release|ship)\b|\b(deploy|release|ship)\b.*\b(approve|ok|go)\b/i, "org-change": /\b(approve|add|retire|ok|yes)\b/i, budget: /\b(approve|ok|yes)\b/i };
const DECISIONS = ["approve", "deny"]; // engine.decide: the only words an approval takes (M6 smoke)

export const preKey = (o) => `${o.stage}:${o.loops}:${o.parks ?? 0}`;

export class Engine {
  constructor({ log, clock, config, mailbox, org }) {
    Object.assign(this, { log, clock, config, mailbox, org });
    this.guard = makeGuard(log, config);
    this.flows = new Map(); // "name@v" → def
    this.active = new Map(); // name → "name@v"
    this.orders = new Map();
    this.approvals = new Map();
    this.n = { O: 0, A: 0 };
    this.limits = { "chief-of-staff": 500_000, manager: 250_000 };
    this.policies = new Map(); // lane → { versions, active }: the manager's knobs (policy.mjs validates them)
    this.contracts = new Map(); // contractor engagements (contractor.mjs): outside the delivery flow
    this.onApproved = []; // [{ prefix, fn }]: handlers for approved org changes owned by other tools (not persisted)
    this.onAdvanced = []; // [fn(o, {stage, by, verdict})]: after a stage leaves (K7: the per-stage commit; not persisted)
    this.onParked = []; // [fn(o, park)]: K9's loop-cap ask to the orderer (state.mjs: asks need the tracker; not persisted)
    this.defaultMaxLoops = null; // K9: the spec's `maxLoops` (state.mjs make); null: no cap unless the lane policy sets one
    this.standing = []; // K15: the spec's approvals.standing (state.mjs make; not persisted: the spec is in the state)
  }

  /** M5: the knobs of a lane's active policy (the lane as it runs now; an order's own pinned version is policyOf). */
  laneKnobs(lane) { const b = lane != null ? this.policies.get(lane) : null; return b?.active ? b.versions[b.active - 1]?.knobs ?? {} : {}; }
  /** M5 (plan §4 holds.mjs, ledger-gate.mjs: "parked with an ask before any session is spent"): a stage's `pre` cmd,
   *  which the supervisor runs once per stage, loop and park before the stage's work is planned or entered. True while
   *  it has not run (passed) for where the order is now. */
  preDue(o) { const sd = o && this.stageDef(o); return !!sd?.pre && o.prechecked !== preKey(o); }

  /** K15: the standing approval (AMD-015) that pre-approves this act, or null. Pure; nothing calls it in a run. */
  standingFor({ action, role, trigger }) { return standingCovers(this.standing, { action, role, trigger }); }

  /** The policy an order runs under: the lane's active version when the order was made (pinned; never moves). */
  policyOf(o) {
    const b = this.policies.get(this.org.role(o.manager)?.lane);
    return b && o.policyVersion ? b.versions[o.policyVersion - 1]?.knobs ?? {} : {};
  }

  /** K9: revise loops this order may take before the next revise parks it (lane policy maxLoops, else the spec's), plus
   *  what a resume granted; null: uncapped (every spec before K9) */
  maxLoopsOf(o) {
    const cap = this.policyOf(o).maxLoops ?? this.defaultMaxLoops;
    return cap == null ? null : cap + (o.extraLoops ?? 0);
  }

  // ---- K13 (plan 2026-10-21 §M5): charged spend. o.spent was set to 0 at orderNew and never moved, so a budget was
  // a number nobody checked. `launch finished` charges a launch's cumulative tokens to the orders it touched, split
  // evenly (a head-of-product session signing 3 orders: an approximation, stated as such). The planner then refuses
  // new sessions for an order at or over its budget and asks for a top-up (supervisor tick, asks.raiseBudgetAsk).
  overBudget(o) { return !!o && Number.isFinite(o.budget) && o.budget > 0 && (o.spent ?? 0) >= o.budget; }
  charge(ids, tokens, { launch = null } = {}) {
    const os = [...new Set(ids)].map((id) => this.orders.get(id)).filter(Boolean);
    const n = Math.round(Number(tokens));
    if (!os.length || !(n > 0)) return [];
    const each = Math.floor(n / os.length);
    const out = os.map((o, i) => {
      const t = each + (i < n - each * os.length ? 1 : 0); // the remainder, a token each, to the first orders: the sum is exact
      o.spent = (o.spent ?? 0) + t;
      // warn once per budget at BUDGET_WARN_AT (a top-up is a new budget, so it can warn again)
      if (o.budget > 0 && o.spent / o.budget >= BUDGET_WARN_AT && o.budgetWarned !== o.budget) { o.budgetWarned = o.budget; this.log.add({ type: "budget-warn", order: o.id, spent: o.spent, budget: o.budget, pct: Math.round((o.spent / o.budget) * 100), launch }); }
      return { order: o.id, tokens: t, spent: o.spent, budget: o.budget };
    });
    this.log.add({ type: "charge", launch, tokens: n, split: os.length, orders: out });
    return out;
  }
  /** K13: an approved budget ask raises the order's budget by its amount; the planner takes it up again. */
  topUp(id, { amount, by, ask = null }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(Number.isFinite(amount) && amount > 0, "a top-up is a positive number of tokens");
    const was = o.budget;
    o.budget = was + amount;
    this.log.add({ type: "budget-topup", order: id, by, ask, amount, from: was, to: o.budget, spent: o.spent ?? 0 });
    return o;
  }

  // ---- definitions
  define(name, def, { by }) {
    const v = [...this.flows.keys()].filter((k) => k.startsWith(`${name}@`)).length + 1;
    const problems = flowProblems(def);
    hard(problems.length === 0, `flow ${name}: ${problems.join("; ")}`);
    const key = `${name}@v${v}`;
    this.flows.set(key, { ...def, name, key, state: "proposed", by });
    this.log.add({ type: "flow-define", flow: key, by });
    return key;
  }
  approveDef(key, { by, words }) {
    const f = this.flows.get(key);
    hard(f && f.state === "proposed", `${key} not proposed`);
    hard(by === "founder" && words, "a flow definition is approved by the founder, in words");
    f.state = "active";
    this.active.set(f.name, key);
    this.log.add({ type: "flow-active", flow: key, by, words });
  }
  stageDef(o) { return this.flows.get(o.flow).stages.find((s) => s.stage === o.stage); }
  /** K19: where an order starts and where a plain revise goes back to: build in a lesson flow, run in a ritual flow. */
  firstStage(o) { return this.flows.get(o.flow)?.stages[0]?.stage ?? "build"; }
  nextStage(o) { const st = this.flows.get(o.flow).stages; return st[st.findIndex((s) => s.stage === o.stage) + 1]?.stage ?? "done"; }

  // ---- orders, down the chain
  orderNew({ flow, by, to = null, budget, accept, words = null, title = "", priority = "next", dueMin = null, after = [], fromContract = null, chair = null, attendee = null }) {
    const key = this.active.get(flow);
    hard(key, `no active flow ${flow}`);
    // K19: a chair flow's order names its chair and a second attendee (both active agent roles, never the same one), and
    // no manager: the orderer keeps the manager's part (it may park, resume or cancel it), the chair works it
    const chairFlow = isChairFlow(this.flows.get(key));
    if (chairFlow) {
      hard(to == null, `flow ${flow} orders name a chair and an attendee, not a manager (--to)`);
      for (const [k, v] of [["chair", chair], ["attendee", attendee]]) { const r = this.org.role(v); hard(r?.active && !r.human, `flow ${flow}: --${k}=${v ?? ""} is not an active agent role`); }
      hard(chair !== attendee, `flow ${flow}: the attendee confirms the chair's record, so it is another role than the chair (${chair})`);
      // M7 review: the chain guard a lesson order has ("orders a manager") had no counterpart here, so any role (a
      // builder under its own META_ROLE) could place a ritual order, chair it and be its orderer; and a builder or a
      // checker could be named chair. A chair flow is ordered from the top (CHAIR_ORDER_BY: the founder or the chief of
      // staff, whose role the ritual scheduler is), and chaired by a role that chairs meetings (CHAIR_LEVELS)
      this.guard(CHAIR_ORDER_BY.includes(this.org.role(by)?.level), "chain", `${by} may not order a ${flow} order (a chair flow is ordered by: ${CHAIR_ORDER_BY.join(", ")})`, { by });
      this.guard(CHAIR_LEVELS.includes(this.org.role(chair).level), "chain", `flow ${flow}: --chair=${chair} is a ${this.org.role(chair).level}; a chair is one of: ${CHAIR_LEVELS.join(", ")}`, { by });
      to = by;
    } else hard(chair == null && attendee == null, `flow ${flow} orders go to a manager; only a chair flow names a chair and an attendee`);
    const byRole = this.org.role(by), toRole = this.org.role(to);
    hard(byRole && toRole, "unknown role");
    if (!chairFlow) this.guard(toRole.level === "manager", "chain", `${by} orders a manager, not ${to}`);
    hard(priority in PRIORITY, `unknown priority ${priority}`);
    const nowBy = this.flows.get(key).nowBy ?? ["founder", "chief-of-staff"];
    this.guard(priority !== "now" || nowBy.includes(byRole.level), "priority", `${by} may not order with priority now (flow allows: ${nowBy.join(", ")})`, { by });
    for (const d of after) hard(this.orders.has(d), `--after ${d}: no such order`);
    // A contractor's result enters the product only as a normal order that cites an accepted engagement.
    if (fromContract) hard(this.contracts?.get(fromContract)?.state === "accepted", `--from-contract ${fromContract} is not an accepted engagement`);
    const overLimit = budget > (this.limits[byRole.level] ?? Infinity);
    const o = { id: `O-${++this.n.O}`, flow: key, title, chain: [by, to], orderer: by, manager: to, builder: null, checker: null, budget, spent: 0, accept, words, stage: overLimit ? "budget" : this.flows.get(key).stages[0].stage, loops: 0, created: this.clock.now(), history: [], priority, due: dueMin != null ? this.clock.now() + dueMin : null, after, blocked: after.some((d) => this.orders.get(d).stage !== "done") };
    o.policyVersion = this.policies.get(toRole.lane)?.active ?? null;
    o.fromContract = fromContract;
    if (chairFlow) { o.chair = chair; o.attendee = attendee; o.builder = chair; o.chain = [by, chair]; } // K19: no delegate step
    this.orders.set(o.id, o);
    this.log.add({ type: "order", order: o.id, by, to, budget, flow: key, priority, after, policy: o.policyVersion, ...(chairFlow ? { chair, attendee } : {}) });
    if (overLimit) this.request({ order: o.id, stage: "budget", approver: "founder", kind: "budget", dueMin: 24 * 60, key: `${o.id}:budget` });
    else if (chairFlow && !o.blocked) this.notifyStage(o); // its chair has it at once (a lesson order waits for its delegate)
    return o;
  }

  delegate(id, { by, to, budget }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    const toRole = this.org.role(to);
    if (!toRole?.active) { this.log.add({ type: "refuse", rule: "no-role", msg: `${to} does not exist`, order: id }); throw new Refused(`no-role: ${to}`); }
    hard(!o.chair, `${id} is a ${o.flow.split("@")[0]} order chaired by ${o.chair}: nobody delegates it`); // K19
    this.guard(by === o.manager, "chain", `${by} is not the manager of ${id}`, { order: id });
    // M6 prep: a builder of several lanes (spec `lanes`) takes work from the manager of any of them
    this.guard(lanesOf(toRole).includes(this.org.role(o.manager).lane), "lane", `${to} is not in lane ${this.org.role(o.manager).lane}`, { order: id, by });
    this.guard(budget <= this.limits.manager, "limit", `${budget} over the manager limit ${this.limits.manager}`, { order: id, by });
    o.builder = to;
    o.chain.push(to);
    this.log.add({ type: "delegate", order: id, by, to, budget });
    if (o.blocked) this.log.add({ type: "blocked", order: id, after: o.after.filter((d) => this.orders.get(d).stage !== "done") });
    else this.notifyStage(o);
    return o;
  }

  /** Puts the order's current stage in the right queue. Stages signed by code run at once; release goes to approval. */
  notifyStage(o, { duplicate = false } = {}) {
    const s = this.stageDef(o);
    if (!s) return;
    const key = `${o.id}:${o.stage}:${o.loops}`;
    if (s.signer === "code") return this.log.add({ type: "code-stage", order: o.id, stage: o.stage });
    if (s.signer === "founder") return this.request({ order: o.id, stage: o.stage, approver: "founder", kind: "release", dueMin: 24 * 60, key });
    const to = signerRole(s) ? `role:${signerRole(s)}` : s.signer === "chair" ? `role:${o.chair}` : s.signer === "attendee" ? `role:${o.attendee}` : s.signer === "builder" ? o.builder : s.signer === "orderer" ? o.manager : `pool:${s.signer}`; // K3: role:<id>; K19: the order's chair or attendee
    return this.mailbox.send({ from: o.manager, to, kind: "work", key: duplicate ? (this.config.dedupe ? key : `${key}:dup${this.mailbox.n}`) : key, ref: o.id, body: { stage: o.stage, loops: o.loops }, priority: o.priority ?? "next", due: o.due ?? null });
  }

  mayAssign(o, stage, roleId) {
    const s = this.flows.get(o.flow).stages.find((x) => x.stage === stage);
    if (!s) return false;
    if (s.signer === "code") return roleId === "code";
    const r = this.org.role(roleId);
    if (!r?.active) return false;
    if (s.signer === "builder") return roleId === o.builder;
    if (s.signer === "orderer") return roleId === o.manager;
    if (s.signer === "founder") return roleId === "founder";
    if (s.signer === "chair") return roleId === o.chair; // K19
    if (s.signer === "attendee") return roleId === o.attendee;
    if (signerRole(s)) return roleId === signerRole(s); // K3: exactly that role, never its level's pool
    return r.level === s.signer;
  }
  /** K12 review: would advance refuse this signature before its post-check guard (consult, signer, independence,
   *  evidence)? Pure; a leave that is refused anyway runs no post-check (a QA stamp or diff guard can be slow). */
  refusesSign(o, stage, by, { evidence = null, consult = false } = {}) {
    const s = this.flows.get(o.flow)?.stages.find((x) => x.stage === stage);
    return !s || consult || !this.mayAssign(o, stage, by) || (isIndependent(s) && by === o.builder) || (s.signer !== "code" && !evidence);
  }
  /** K4: may this role work on (enter or sign) this stage of this order? Only the builder is kept off independent stages. */
  independentOf(o, stage, roleId) { return !(isIndependent(this.flows.get(o.flow)?.stages.find((x) => x.stage === stage)) && roleId === o.builder); }

  // ---- stages, up the chain
  advance(id, { stage, by, verdict = "pass", evidence = null, findings = null, consult = false, postChecked = false, to = null }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(o.stage === stage, `${id} is at ${o.stage}, not ${stage}`);
    this.guard(!consult, "consult", `a consult run cannot sign ${stage}`, { order: id, by });
    const s = this.stageDef(o);
    this.guard(this.mayAssign(o, stage, by), "signer", `${by} may not sign ${stage} on ${id}`, { order: id, by });
    // K11 (plan 2026-10-21 §3): a revise may name the earlier stage it belongs to (ship's "claims not verified" goes back
    // to check, not to a rebuild); never the stage itself or a later one, and only on a revise
    const st = this.flows.get(o.flow).stages.map((x) => x.stage);
    const earlier = to != null && st.indexOf(to) >= 0 && st.indexOf(to) < st.indexOf(stage);
    if (to != null) { hard(verdict === "revise", `${stage} on ${id}: only a revise is routed (to ${to})`); this.guard(earlier, "route", `${stage} on ${id} cannot send work to ${to}: a revise goes back to an earlier stage (${st.slice(0, st.indexOf(stage)).join(", ") || "none"})`, { order: id, by }); }
    // K4: every independent stage, not only check; who signed it is kept per stage (o.checker stays for check)
    if (isIndependent(s)) { this.guard(by !== o.builder, "independence", `${by} built ${id} and cannot ${stage === "check" ? "check it" : `sign ${stage}`}`, { order: id, by }); (o.signers ??= {})[stage] = by; }
    if (stage === "check") o.checker = by;
    if (s.signer !== "code") this.guard(!!evidence, "evidence", `${stage} needs evidence`, { order: id, by });
    // K12 review: the check lives with the signature: a stage with a post-check is signed only by a room leave, which ran
    // it (`flow advance --stage=build --evidence=x` signed toy build.post=exit 1 without running it)
    if (s.post) this.guard(postChecked, "post-check", `${stage} on ${id} has a post-check: sign it with room leave (it runs the check), not flow advance`, { order: id, by });
    const first = this.firstStage(o); // K19: build, or a ritual's run
    const back = verdict === "revise" ? (earlier ? to : first) : null; // with enforce off a bad route is recorded and goes to the first stage
    // M7 (K21): the evidence a stage was signed with travels in its history (events-export.mjs names a ritual's record)
    o.history.push({ stage, by, verdict, t: this.clock.now(), ...(evidence && s.signer !== "code" ? { evidence: String(evidence).slice(0, 300) } : {}), ...(verdict === "revise" && findings ? { findings: String(findings).slice(0, 2000) } : {}), ...(back && back !== first ? { to: back } : {}) }); // every revise keeps its findings (org evaluation reads them)
    this.log.add({ type: "advance", order: id, stage, by, verdict });
    if (verdict === "pass") o.stage = this.nextStage(o);
    else {
      o.stage = back; o.loops++; o.findings = findings;
      // The lane's policy decides how a revision is queued; an urgent (`now`) order stays urgent.
      const pol = this.policyOf(o);
      if (pol.revisionPriority && o.priority !== "now") { o.priority = pol.revisionPriority; o.due = pol.revisionPriority === "later" ? this.clock.now() + pol.revisionDueMin : null; }
      this.log.add({ type: "reopen", order: id, from: stage, loops: o.loops, priority: o.priority, ...(back !== first ? { to: back } : {}) });
      this.loopCap(o, { by, from: stage });
    }
    if (o.stage === "done") {
      this.log.add({ type: "shipped", order: id, lead: this.clock.now() - o.created, loops: o.loops, priority: o.priority ?? "next" });
      for (const d of this.orders.values()) {
        if (d.blocked && d.after.includes(id) && d.after.every((x) => this.orders.get(x).stage === "done")) {
          d.blocked = false;
          this.log.add({ type: "unblocked", order: d.id, by: id });
          if (d.builder) this.notifyStage(d);
        }
      }
    } else if (o.stage !== "parked") this.notifyStage(o);
    for (const fn of this.onAdvanced) fn(o, { stage, by, verdict });
    return o;
  }

  /** A shipped order goes back to build: a regression found by code, or a changed requirement (benchmark 4). */
  reopen(id, { by, findings, reason }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(o.stage === "done", `${id} is at ${o.stage}: only a shipped order is reopened (a open one is revised)`);
    hard(!!findings, "a reopen says what is wrong (findings)");
    o.stage = this.firstStage(o); o.loops++; o.findings = findings;
    if (o.budgetHold?.no) delete o.budgetHold; // M5 review: as resume
    o.history.push({ stage: "done", by, verdict: "reopen", t: this.clock.now(), findings: String(findings).slice(0, 2000) });
    this.log.add({ type: "reopen", order: id, from: "done", by, reason: reason ?? null, loops: o.loops, priority: o.priority });
    // K9: benchmark 4's regression gate reopens by code, and that loop counts; so does the manager's (plan §5 step 6: a
    // Demo Crit revise is an `order reopen`, and an agent that keeps reopening must park). K8+K9 review: only the
    // founder's reopen is a changed requirement that gets its own loop, so it never parks at once
    if (by === "founder" && this.maxLoopsOf(o) != null) { o.extraLoops = (o.extraLoops ?? 0) + 1; this.notifyStage(o); }
    else if (!this.loopCap(o, { by, from: "done" })) this.notifyStage(o);
    return o;
  }

  /** M7 finish review (K23, a Demo Crit's revise of a lesson still in review): an open order past its first stage is
   *  sent back to it with the findings, as its own stage's revise would (a loop: K9's cap counts it). Its open messages
   *  and approvals leave their queues first; the caller abandons its running runs. Refused: parked (its ask is decided
   *  first), blocked, at budget, or still at its first stage (its work was never shown). */
  sendBack(id, { by, findings, reason }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(!["done", "cancelled", "parked", "budget"].includes(o.stage) && !o.blocked, `${id} is ${o.blocked ? "blocked" : o.stage}: only an open order at work is sent back (a shipped one is reopened)`);
    const first = this.firstStage(o);
    hard(o.stage !== first, `${id} is at ${first}: its work has not been shown yet`);
    hard(!!findings, "a send-back says what is wrong (findings)");
    const from = o.stage;
    this.withdraw(o, { by, reason: `sent back to ${first}: ${reason ?? findings}`.slice(0, 300) });
    o.history.push({ stage: from, by, verdict: "revise", t: this.clock.now(), findings: String(findings).slice(0, 2000) });
    o.stage = first; o.loops++; o.findings = findings;
    this.log.add({ type: "reopen", order: id, from, by, reason: reason ?? null, loops: o.loops, priority: o.priority });
    if (!this.loopCap(o, { by, from })) this.notifyStage(o);
    return o;
  }

  /** K9 (plan 2026-10-21 §3): past the cap a revise parks the order instead of sending it back, with an ask to the
   *  orderer carrying every finding (a HELD claim on a blocked host, or a publish hold, otherwise loops forever: each
   *  revise is a fresh build session that cannot fix it). The revise itself is kept (history, loops, findings), so a
   *  resume picks up at the stage it was sent to. Nothing was queued for that stage yet, so nothing is withdrawn. */
  loopCap(o, { by, from }) {
    const cap = this.maxLoopsOf(o);
    if (cap == null || o.loops <= cap) return false;
    const findings = o.history.filter((h) => h.findings).map((h) => ({ stage: h.stage, by: h.by, verdict: h.verdict, findings: h.findings }));
    this.log.add({ type: "loop-cap", order: o.id, loops: o.loops, maxLoops: cap, from, by });
    this.park(o.id, { by: "engine", reason: `loop cap: ${o.loops} revise loops, over maxLoops ${cap} (last from ${from})`, withdraw: false, ask: { kind: "decision", findings } });
    return true;
  }

  // ---- K8 (plan 2026-10-21 §3): terminal states. A learner's `Verdict: fatal`, a publish hold or a Demo Crit kill had
  // no state but done: the order was revised forever or left at a stage nobody would sign. `parked` waits for a decision
  // and resumes where it stopped; `cancelled` is final. Neither is done, so orders after it (--after) stay blocked.
  park(id, { by, reason, withdraw = true, ask = null }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(!["done", "cancelled", "parked"].includes(o.stage), `${id} is ${o.stage}: only an open order is parked`);
    hard(!!reason, "a park says why (--reason)");
    o.parked = { stage: o.stage, loops: o.loops, by, reason, t: this.clock.now(), ...(ask && !ask.routed ? { loopCap: true } : {}) };
    o.stage = "parked"; o.parks = (o.parks ?? 0) + 1; // a run entered before the park is stale after a resume (Rooms.leave)
    if (withdraw) this.withdraw(o, { by, reason: `parked: ${reason}` });
    this.log.add({ type: "parked", order: id, from: o.parked.stage, loops: o.loops, by, reason });
    for (const fn of this.onParked) fn(o, { by, reason, ask });
    return o;
  }

  /** M4 audit (plan 2026-10-21 §2): a cmd or post-check whose route says `park` (a learner's Verdict: fatal, an active
   *  publish hold: adapters/s3c emit route "park") parks the order with K9's ask to its orderer, every finding so far
   *  plus this one; no revise loop is spent (before, a fatal could only revise: a fresh build that cannot fix it). */
  parkRouted(o, { by, stage, why, ask = null }) {
    const findings = [...o.history.filter((h) => h.findings).map((h) => ({ stage: h.stage, by: h.by, verdict: h.verdict, findings: h.findings })), { stage, by, verdict: "park", findings: String(why).slice(0, 2000) }];
    this.log.add({ type: "park-route", order: o.id, stage, by, why: String(why).slice(0, 400) });
    // M5 review: a check that names a budget ask (ledger-gate.mjs: the company's project gate fails) parks with a
    // kind:budget ask routed by amount (asks.raiseParkAsk), not a decision to the orderer
    const budget = ask?.kind === "budget" ? { budget: { text: typeof ask.text === "string" ? ask.text.slice(0, 1000) : null, amount: Number.isFinite(Number(ask.amount)) && Number(ask.amount) > 0 ? Math.round(Number(ask.amount)) : null } } : {};
    return this.park(o.id, { by, reason: `${stage}: ${String(why).split("\n")[0].slice(0, 200)}`, ask: { kind: "decision", findings, routed: true, ...budget } });
  }

  resume(id, { by, reason, extraLoops = null, to = null }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(o.stage === "parked" && o.parked, `${id} is ${o.stage}, not parked`);
    hard(!!reason, "a resume says why (--reason)");
    hard(extraLoops == null || (Number.isInteger(extraLoops) && extraLoops >= 0 && extraLoops <= 10), "extra loops is a whole number 0-10");
    // M6 prep review: `to`, an earlier stage of the flow than the one it parked at (a merge conflict parks at merge, the
    // stage after ship: resumed there, the same merge conflicted again, so the order could only be cancelled). Back to an
    // earlier stage is a decided revise: a loop (its stage is sent afresh, never deduped to the old message) with one
    // more loop granted, so it never parks at once on the cap (as a founder's reopen), and the park's reason as findings
    const st = this.flows.get(o.flow)?.stages.map((x) => x.stage) ?? [];
    if (to != null) hard(st.includes(o.parked.stage) && st.includes(to) && st.indexOf(to) <= st.indexOf(o.parked.stage), `${id} parked at ${o.parked.stage}: --to is that stage or an earlier one (${st.slice(0, Math.max(0, st.indexOf(o.parked.stage) + 1)).join(", ") || "none"})`);
    // K9: a loop-cap park resumes with one more loop unless the decider grants more (or 0: the very next revise parks)
    const grant = extraLoops ?? (o.parked.loopCap ? 1 : 0);
    if (grant) o.extraLoops = (o.extraLoops ?? 0) + grant;
    const p = o.parked, back = to != null && to !== p.stage;
    o.stage = back ? to : p.stage; delete o.parked;
    if (back) { o.loops++; o.extraLoops = (o.extraLoops ?? 0) + 1; o.findings = `parked at ${p.stage}: ${p.reason}. Resumed to ${to} by ${by}: ${reason}`; }
    if (o.budgetHold?.no) delete o.budgetHold; // M5 review: the owner put it back to work: a budget no is asked again (asks.raiseBudgetAsk)
    (o.history ??= []).push({ stage: "parked", by, verdict: "resume", t: this.clock.now(), reason });
    this.log.add({ type: "resumed", order: id, to: o.stage, by, reason, extraLoops: grant, parkedMin: this.clock.now() - p.t, ...(back ? { from: p.stage, loops: o.loops } : {}) });
    if (o.stage === "budget") this.request({ order: o.id, stage: "budget", approver: "founder", kind: "budget", dueMin: 24 * 60, key: `${o.id}:budget:r${o.parks}` });
    else if (o.blocked) this.log.add({ type: "blocked", order: id, after: o.after.filter((d) => this.orders.get(d).stage !== "done") });
    else if (o.builder) this.notifyStage(o); // no builder yet: its manager delegates, which notifies
    return o;
  }

  cancel(id, { by, reason }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(!["done", "cancelled"].includes(o.stage), `${id} is ${o.stage}: a shipped or cancelled order is not cancelled`);
    hard(!!reason, "a cancel says why (--reason)");
    const from = o.stage === "parked" ? o.parked.stage : o.stage;
    o.cancelled = { stage: from, loops: o.loops, by, reason, t: this.clock.now() };
    o.stage = "cancelled"; o.parks = (o.parks ?? 0) + 1; delete o.parked;
    this.withdraw(o, { by, reason: `cancelled: ${reason}` });
    this.log.add({ type: "cancelled", order: id, from, loops: o.loops, by, reason });
    // the chain stays blocked: what was ordered after it waits for a decision (re-order it, or cancel it too)
    const after = [...this.orders.values()].filter((d) => d.after?.includes(id) && !["done", "cancelled"].includes(d.stage)).map((d) => d.id);
    if (after.length) this.log.add({ type: "blocked-by-cancelled", order: id, after });
    return o;
  }

  /** Every open message and approval of order `o` leaves its queue (a decision on a withdrawn approval is a repeat). */
  withdraw(o, { by, reason }) {
    this.mailbox.withdraw(o.id, { by, reason });
    for (const a of this.approvals.values()) if (a.order === o.id && a.state === "open") { a.state = "withdrawn"; this.log.add({ type: "approval-withdrawn", approval: a.id, order: o.id, by, reason }); }
  }

  // ---- approvals: queues and callbacks
  request({ order = null, stage = null, approver, kind, dueMin, key, ref = null, onTimeout = "remind" }) {
    const m = this.mailbox.send({ from: "engine", to: approver, kind: "approval-request", key, ref: order ?? ref, body: { stage, kind } });
    const existing = [...this.approvals.values()].find((a) => a.msg === m.id);
    if (existing) return existing;
    const a = { id: `A-${++this.n.A}`, msg: m.id, order, stage, approver, kind, ref, due: this.clock.now() + dueMin, state: "open", fired: false, onTimeout, timedOut: false, created: this.clock.now() };
    this.approvals.set(a.id, a);
    this.log.add({ type: "request", approval: a.id, order, stage, approver, kind });
    return a;
  }

  queue(approver) { return [...this.approvals.values()].filter((a) => a.approver === approver && a.state === "open"); }

  decide(ids, { by, decision, words, channel }) {
    // M6 smoke: any other word was a denial ("--decision=approved" denied a budget the founder meant to approve, and
    // the order stayed at budget with no ask left); refused before any approval changes
    hard(DECISIONS.includes(decision), `decision is one of ${DECISIONS.join(", ")}, not ${JSON.stringify(decision ?? null)}`);
    const out = [];
    for (const id of [].concat(ids)) {
      const a = this.approvals.get(id);
      hard(a, `no approval ${id}`);
      if (a.state !== "open") { this.log.add({ type: "decide-repeat", approval: id }); out.push(a); continue; }
      hard(by === a.approver, `${by} is not the approver of ${id}`);
      if (by === "founder") hard(words && channel && COVERS[a.kind]?.test(words), `founder words "${words}" do not cover ${a.kind}`);
      a.state = decision === "approve" ? "approved" : "denied";
      this.log.add({ type: "decide", approval: id, by, decision, words, channel, wait: this.clock.now() - a.created });
      this.mailbox.done(a.msg, { run: null });
      this.fire(a, { by, words });
      out.push(a);
    }
    return out;
  }

  /** The callback does only what the decision authorises, once. */
  fire(a, { by, words }) {
    if (a.fired) return;
    a.fired = true;
    this.log.add({ type: "callback", approval: a.id, kind: a.kind, decision: a.state });
    if (a.kind === "org-change") {
      if (a.state !== "approved") return;
      // other tools register what an approved change of theirs does (e.g. the building's FLOOR-n refs)
      const h = this.onApproved.find((x) => String(a.ref).startsWith(x.prefix));
      if (h) h.fn(a.ref, { by, words }); else this.org.apply(a.ref, { by, words });
      return;
    }
    const o = this.orders.get(a.order);
    // M7 review: a chair flow's order has no delegate step to send its first item, so an approved budget sends it here
    // (a lesson order's delegate does); before, the chair got it only from the watchdog's resend
    if (a.kind === "budget") { if (a.state === "approved") { o.stage = this.firstStage(o); this.log.add({ type: "budget-approved", order: o.id }); if (o.chair && !o.blocked) this.notifyStage(o); } return; }
    if (a.state === "approved") this.advance(o.id, { stage: a.stage, by, evidence: `decision ${a.id}: "${words}"` });
    else { o.stage = "uat"; o.loops++; this.log.add({ type: "reopen", order: o.id, from: a.stage, loops: o.loops }); this.notifyStage(o); }
  }

  /** Deadlines: a timeout reminds or escalates. It never approves. */
  tick() {
    for (const a of this.approvals.values()) {
      if (a.state === "open" && !a.timedOut && this.clock.now() >= a.due) {
        a.timedOut = true;
        this.log.add({ type: "timeout", approval: a.id, action: a.onTimeout });
      }
    }
  }

  status() {
    const by = {};
    for (const o of this.orders.values()) (by[o.stage] ??= []).push(o.id);
    return by;
  }
}

// ------------------------------------------------------------------ rooms: enter → work → leave

export class Rooms {
  constructor({ log, clock, config, mailbox, engine, org }) {
    Object.assign(this, { log, clock, config, mailbox, engine, org });
    this.guard = makeGuard(log, config);
    this.runs = new Map();
    this.n = 0;
    this.memory = new Map(); // role → entries
    this.sessions = new Map(); // a session is one agent process; a run is one item it works on
    this.nS = 0;
    this.postCheck = null; // K12: fn(o, cmd, vars) → {pass, output, findings, stageError}: state.mjs wires runCmdCheck (not persisted)
  }

  enter({ msg, role, mode = "work", as = null, leaseMin = 30, session = null }) {
    const m = this.mailbox.msgs.get(msg);
    hard(m && m.kind === "work", `no work message ${msg}`);
    const o = this.engine.orders.get(m.ref);
    // Impersonation is consult-only (S14): `as` with work mode would let any role sign as another.
    hard(!as || mode === "consult", `--as=${as} needs --mode=consult: a role works only as itself`);
    const actor = as ?? role;
    const r = this.org.role(actor);
    hard(r?.active, `no active role ${actor}`);
    this.guard(m.to === actor || m.to === `pool:${r.level}` || m.to === `role:${actor}`, "lane", `${actor} may not take ${msg} (for ${m.to})`, { order: o.id, by: actor });
    hard(r.level !== "contractor", `contractor ${actor} works outside the delivery flow: it enters no flow work`);
    if (!this.engine.independentOf(o, m.body.stage, actor)) this.guard(false, "independence", `${actor} built ${o.id}`, { order: o.id, by: actor }); // K4: every independent stage
    let s;
    if (session) { s = this.sessions.get(session); hard(s?.open && s.role === actor, `session ${session} is not open for ${actor}`); }
    else { s = { id: `S-${++this.nS}`, role: actor, items: 0, open: true, started: this.clock.now() }; this.sessions.set(s.id, s); this.log.add({ type: "session-open", session: s.id, role: actor }); }
    const run = `R-${++this.n}`;
    if (this.config.leases) this.mailbox.claim(msg, { run, leaseMin });
    s.items++;
    // The run works on the stage and loop the message was sent for, not on wherever the order is now: a late
    // duplicate of a finished stage is a stale run, and its leave signs nothing.
    const { stage, loops } = m.body;
    const ctx = { roleDoc: `company/roles/${actor}.md`, memory: this.memory.get(actor) ?? [], order: o.id, stage, findings: o.findings ?? null };
    this.runs.set(run, { run, msg, role: actor, by: role, consult: mode === "consult", order: o.id, stage, loops, parks: o.parks ?? 0, entered: this.clock.now(), state: "running", session: s.id });
    this.log.add({ type: "enter", run, msg, role: actor, by: role, room: r.room, order: o.id, stage, mode, session: s.id, item: s.items });
    return { run, ctx, session: s.id, item: s.items };
  }

  /** Messages this role may take next, best first (priority, then age), skipping independent stages of its own builds. */
  eligible(role) {
    const r = this.org.role(role);
    return [...this.mailbox.queue(role, "work"), ...this.mailbox.queue(`role:${role}`, "work"), ...this.mailbox.queue(`pool:${r.level}`, "work")]
      .filter((m) => this.engine.independentOf(this.engine.orders.get(m.ref), m.body.stage, role))
      .filter((m) => !this.engine.overBudget(this.engine.orders.get(m.ref)) && !this.engine.preDue(this.engine.orders.get(m.ref))) // K13: a session spends nothing more on it; M5: nor before its pre-check
      .sort((a, b) => (PRIORITY[a.priority] - PRIORITY[b.priority]) || a.ts - b.ts);
  }

  /** M5 (plan §M5 exit 1, "a session over the per-lane cap"): sessions at work in `lane` now, open with a running run
   *  or waiting for their role's next item (an open session whose agent stopped without `room next` holds nothing). */
  laneLoad(lane) {
    const now = this.clock.now();
    // M6 prep: a session of a role in several lanes counts in the lane of the order it works (its manager's), and,
    // while it waits for its next item, in each of its lanes (it may take either's)
    const busy = new Map([...this.runs.values()].filter((x) => x.state === "running").map((x) => [x.session, this.org.role(this.engine.orders.get(x.order)?.manager)?.lane]));
    const counts = (s) => { const ls = lanesOf(this.org.role(s.role)); return ls.length > 1 && busy.has(s.id) && ls.includes(busy.get(s.id)) ? busy.get(s.id) === lane : ls.includes(lane); };
    return [...this.sessions.values()].filter((s) => s.open && counts(s) && (busy.has(s.id) || (s.waitUntil != null && s.waitUntil > now - 0.5))).length;
  }
  /** M5: a new agent session for `role` is refused when its lane's policy caps sessions at once (knob maxSessions) and
   *  the lane is full; the planner plans none (supervisor plan), this is the backstop at `room enter`. M6 prep: `lane`
   *  is the lane of the order it enters (a role of several lanes is judged in that one; unset: in each of its lanes). */
  checkLaneCap(role, lane = null) {
    const ls = lanesOf(this.org.role(role));
    for (const l of lane != null && ls.includes(lane) ? [lane] : ls) {
      const cap = this.engine.laneKnobs(l).maxSessions;
      if (cap == null) continue;
      const n = this.laneLoad(l);
      this.guard(n < cap, "lane-cap", `lane ${l} has ${n} session${n === 1 ? "" : "s"} at work, its policy's cap (maxSessions ${cap}): ${role} starts none until one ends`, { by: role, lane: l, cap, load: n });
    }
  }
  /** M6 prep: whether message `msg` is reserved for another session of its role: named by a launch of a role that
   *  runs several sessions at once (spec `sessions`), not yet finished, and either entered by a session of that launch
   *  or made within `graceMin`; never by the asking session's own launch. A session's `room next` then leaves it to the
   *  session launched for it (two sessions of one role would otherwise both take it, one a wasted start). */
  reservedElsewhere(msg, session, graceMin = 5) {
    const s = this.sessions.get(session), own = s?.launch ?? null, now = this.clock.now();
    if (!((this.org.role(s?.role)?.sessions ?? 1) > 1)) return false;
    const ev = this.log.events;
    for (const e of ev) {
      if (e.type !== "launch" || e.role !== s.role || !e.msgs?.includes(msg)) continue;
      const id = `${String(e.seq).padStart(4, "0")}-${e.role}`;
      if (id === own || ev.some((f) => f.type === "launch-finished" && f.launch === id)) continue;
      if (now - e.t < graceMin || [...this.sessions.values()].some((x) => x.launch === id && x.open)) return true;
    }
    return false;
  }

  /** room next: leave this run as usual, then take the next eligible item in the same session, up to `cap` items. */
  next(run, leaveOpts = {}, { cap = Infinity, leaseMin = 30, filter = () => true, waitMin = 0 } = {}) {
    const x = this.runs.get(run);
    hard(x, `no run ${run}`);
    const left = this.leave(run, leaveOpts);
    const s = this.sessions.get(x.session);
    if (s.items >= cap) return { left, next: null, closed: this.closeSession(s.id, "cap") };
    const m = this.eligible(x.role).find(filter);
    if (!m && waitMin > 0) {
      // benchmark 3: every revise and re-check was a fresh session (~60k start-up) because its item arrived a minute
      // after the last one left. A session that waits a little for its role's next item costs one tool call.
      s.waitUntil = this.engine.clock.now() + waitMin;
      this.log.add({ type: "session-wait", session: s.id, role: s.role, minutes: waitMin });
      return { left, next: null, waiting: s };
    }
    if (!m) return { left, next: null, closed: this.closeSession(s.id, "queue empty") };
    return { left, next: this.enter({ msg: m.id, role: x.role, session: s.id, leaseMin }) };
  }

  /** A waiting session takes its role's next eligible item, or closes once its wait is over. */
  resume(session, { leaseMin = 30, filter = () => true } = {}) {
    const s = this.sessions.get(session);
    hard(s, `no session ${session}`);
    if (!s.open) return { closed: s, reason: "closed" };
    const m = this.eligible(s.role).find(filter); // K5: meta.mjs skips items of an order held on its workspace
    if (m) { s.waitUntil = null; return { next: this.enter({ msg: m.id, role: s.role, session: s.id, leaseMin }) }; }
    if (this.engine.clock.now() >= (s.waitUntil ?? 0)) { s.waitUntil = null; return { closed: this.closeSession(s.id, "queue empty after wait"), reason: "queue empty" }; }
    return { waiting: true };
  }

  closeSession(id, reason) {
    const s = this.sessions.get(id);
    if (!s?.open) return null;
    s.open = false;
    this.log.add({ type: "session-close", session: id, role: s.role, items: s.items, reason, minutes: this.clock.now() - s.started });
    return s;
  }

  /** The harness reports usage per agent process (session), not per item. Recorded once per session. */
  recordSessionUsage(session, tokens, source = "harness") {
    const s = this.sessions.get(session);
    hard(s, `no session ${session}`);
    hard(!this.log.events.some((e) => e.type === "usage" && e.session === session), `usage for ${session} already recorded`);
    this.log.add({ type: "usage", session, role: s.role, tokens, items: s.items, source });
  }

  heartbeat(run, { leaseMin = 30 } = {}) {
    const x = this.runs.get(run);
    if (this.config.leases) this.mailbox.heartbeat(x.msg, { run, leaseMin });
  }

  /** Usage from the harness (it counts an agent's tokens; the agent cannot). Once per run. */
  recordUsage(run, tokens, source = "harness") {
    const x = this.runs.get(run);
    hard(x, `no run ${run}`);
    hard(!this.log.events.some((e) => e.type === "usage" && e.run === run), `usage for ${run} already recorded`);
    this.log.add({ type: "usage", run, role: x.role, tokens, source });
  }

  leave(run, { verdict = "pass", evidence = null, learned = null, mistake = null, tokens = null, findings = null, post = null, to = null }) {
    const x = this.runs.get(run);
    hard(x && x.state === "running", `run ${run} not running`);
    const o = this.engine.orders.get(x.order);
    if (o.stage !== x.stage || o.loops !== x.loops || (o.parks ?? 0) !== (x.parks ?? 0)) { // K8: parked (and resumed) since it entered
      x.state = "stale";
      this.log.add({ type: "stale-leave", run, order: o.id, role: x.role });
      if (this.config.autoBookkeeping && tokens != null) this.log.add({ type: "usage", run, role: x.role, tokens, auto: true });
      return null;
    }
    // K12 review: a leave advance refuses anyway (no evidence, wrong signer) runs no post-check; with enforce off it runs
    // (advance only records those violations and signs, so the post-check's own violation must be recorded too)
    const pr = !(this.config.enforce && this.engine.refusesSign(o, x.stage, x.role, { evidence, consult: x.consult })) ? this.checkPost(x, o, { verdict, evidence, post }) : null;
    // M4 audit: a routed post-check failure is code's reading of the record (learner-verdict: revise → build, fatal →
    // park), whatever verdict the agent typed; it signs instead of refusing (the evaluator's revise review was refused
    // on every leave, so stage 6 could never revise)
    if (pr?.route === "park") return this.leaveParked(x, o, pr, { learned, mistake, tokens });
    if (pr?.route) { verdict = "revise"; to = pr.route === "build" ? null : pr.route; findings = [findings, pr.findings ?? pr.output].filter(Boolean).join("\n"); }
    this.engine.advance(o.id, { stage: x.stage, by: x.role, verdict, evidence, findings, consult: x.consult, postChecked: true, to }); // K11
    x.state = "left";
    const m = this.mailbox.msgs.get(x.msg);
    if (m.state === "open") this.mailbox.done(x.msg, { run, report: { stage: x.stage, verdict } });
    if (this.config.autoBookkeeping) {
      const did = `${x.stage} on ${o.id}: ${verdict} (loop ${x.loops})`;
      (this.memory.get(x.role) ?? this.memory.set(x.role, []).get(x.role)).push({ t: this.clock.now(), did, learned, mistake });
      if (tokens != null) this.log.add({ type: "usage", run, role: x.role, tokens, auto: true });
      this.log.add({ type: "leave", run, role: x.role, order: o.id, stage: x.stage, verdict, minutes: this.clock.now() - x.entered });
    }
    return o;
  }

  /** M4 audit: the leave of a run whose post-check routed to park: nothing is signed, the order parks with an ask, and
   *  the stage's files are committed (K7) as for any stage that leaves. */
  leaveParked(x, o, pr, { learned, mistake, tokens }) {
    this.engine.parkRouted(o, { by: x.role, stage: x.stage, why: pr.findings ?? pr.output, ask: pr.ask ?? null });
    x.state = "left";
    const m = this.mailbox.msgs.get(x.msg);
    if (!["done", "withdrawn"].includes(m.state)) this.mailbox.done(x.msg, { run: x.run, report: { stage: x.stage, verdict: "park" } });
    for (const fn of this.engine.onAdvanced) fn(o, { stage: x.stage, by: x.role, verdict: "park" });
    if (this.config.autoBookkeeping) {
      (this.memory.get(x.role) ?? this.memory.set(x.role, []).get(x.role)).push({ t: this.clock.now(), did: `${x.stage} on ${o.id}: park (loop ${x.loops})`, learned, mistake });
      if (tokens != null) this.log.add({ type: "usage", run: x.run, role: x.role, tokens, auto: true });
      this.log.add({ type: "leave", run: x.run, role: x.role, order: o.id, stage: x.stage, verdict: "park", minutes: this.clock.now() - x.entered });
    }
    return o;
  }

  /** K12 (plan 2026-10-21 §3): a stage's `post` cmd runs before its leave signs anything (stage 5 diff guard and stamp,
   *  stage 6 verdict parsing, stage 7 record shape: evidence was any non-empty string). A failure refuses the leave and
   *  the run stays open, so the agent fixes it in the same session and leaves again. `post` is a result meta.mjs ran
   *  outside the lock for this run, stage and loop (a cmd under the lock past 30 s lets another writer break it). */
  checkPost(x, o, { verdict, evidence, post }) {
    const sd = this.engine.flows.get(o.flow)?.stages.find((s) => s.stage === x.stage);
    if (!sd?.post) return;
    const mine = post && post.run === x.run && post.stage === x.stage && post.loops === x.loops;
    hard(mine || this.postCheck, `stage ${x.stage} has a post-check and nothing here runs it`);
    const t = mine ? post : this.postCheck(o, sd.post, { evidence: evidence ?? "", verdict, stage: x.stage });
    const rec = { order: o.id, run: x.run, role: x.role, stage: x.stage, verdict, output: String(t.output ?? "").slice(0, 400), outsideLock: !!t.outsideLock }; // K12 review: which run was used
    if (t.pass) { this.log.add({ type: "post-check", pass: true, ...rec, ...(t.findings ? { findings: t.findings } : {}) }); return null; }
    // M4 audit: a failure whose output matches the post's route is a verdict, not a defect of the leave (validateSpec:
    // an earlier stage or park); the caller signs it. A stage-error never routes (judgeCmd)
    // (M4 integrate: checked here too, so a post result made elsewhere with stageError and a route still refuses)
    if (t.route && !t.stageError) { this.log.add({ type: "post-check", pass: false, route: t.route, ...rec, findings: t.findings ?? null }); return { route: t.route, output: t.output, findings: t.findings ?? null }; }
    const why = t.stageError ? "the post-check itself failed (fix it or ask the supervisor to abandon the run)" : "fix the work and leave again: this run is still open";
    if (!this.config.enforce) { this.log.add({ type: "violation", rule: "post-check", msg: t.output, ...rec, findings: t.findings ?? null }); return null; }
    this.log.add({ type: "refuse", rule: "post-check", msg: `${t.output}; ${why}`, ...rec, findings: t.findings ?? null });
    const e = new Refused(`post-check: ${x.stage} on ${o.id} refused the leave: ${t.output}; ${why}`);
    e.findings = t.findings ?? null;
    throw e;
  }

  /** Supervisor: end a run without signing anything (a bad start). The work goes back to the queue. */
  abandon(run, { by, reason }) {
    const x = this.runs.get(run);
    hard(x && x.state === "running", `run ${run} not running`);
    x.state = "abandoned";
    if (this.config.leases) this.mailbox.release(x.msg, { run, reason });
    this.log.add({ type: "abandon", run, role: x.role, order: x.order, by, reason });
  }

  /** Lease expiry: the run left without leave; its order goes back to the queue. `usage(run)` is the harness's own
   *  token count for the run (it reports usage for failed runs too); with autoBookkeeping it is recorded here, since
   *  no leave will ever record it. */
  recover({ usage = null } = {}) {
    const lost = [];
    for (const x of this.runs.values()) {
      if (x.state !== "running") continue;
      const m = this.mailbox.msgs.get(x.msg);
      if (this.config.leases && m.lease?.run === x.run && m.lease.until <= this.clock.now()) {
        x.state = "lost";
        this.mailbox.release(x.msg, { run: x.run, reason: "lease expired" });
        this.log.add({ type: "left-without-leave", run: x.run, role: x.role, order: x.order, after: this.clock.now() - x.entered });
        const n = usage?.(x.run);
        if (this.config.autoBookkeeping && n != null) this.log.add({ type: "usage", run: x.run, role: x.role, tokens: n, auto: true, lost: true });
        lost.push(x);
      }
    }
    return lost;
  }

  who(room) { return [...this.runs.values()].filter((x) => x.state === "running" && this.org.role(x.role)?.room === room); }
}

// ------------------------------------------------------------------ rituals: trigger → open → rounds → close

// Company time is counted in cycles, not dates. A ritual says which clocks it runs on:
//   progress  every: { shipped: n, tokens: n }      enough has happened to be worth deciding on
//   event     or: ["incident", "refuse", …]           something happened that cannot wait
//             stuckMin: n                             open work has waited longer than this
//   fallback  fallbackMin: n                          the calendar backstop: silence is a signal too
//   human     needs: "founder-slot" | "none"          whether closing waits for a person's slot
// minEvidence: a token-only trigger does not fire with fewer shipped outcomes than this.
export class Rituals {
  constructor({ log, clock, mailbox, org }) { Object.assign(this, { log, clock, mailbox, org }); this.defs = new Map(); this.held = new Map(); this.open_ = new Map(); this.n = 0; this.cycles = new Map(); }
  register({ id, chair, invite, everyMin = null, every = {}, or = [], stuckMin = null, fallbackMin = null, minEvidence = 0, needs = "none" }) {
    this.defs.set(id, { id, chair, invite, everyMin, every, or, stuckMin, fallbackMin, minEvidence, needs, registered: this.clock.now() });
  }
  reasons(id) {
    const d = this.defs.get(id);
    // Events count from the last holding (never held: from the start); calendar time from the last holding or registration.
    const since = this.held.get(id) ?? -Infinity;
    const clockSince = this.held.get(id) ?? d.registered;
    const ev = this.log.events.filter((e) => (e.t ?? -Infinity) > since || (since === -Infinity));
    const shipped = ev.filter((e) => e.type === "shipped").length;
    const tokens = ev.filter((e) => e.type === "usage").reduce((x, e) => x + e.tokens, 0);
    const out = [];
    if (d.everyMin != null && this.clock.now() - clockSince >= d.everyMin) out.push(`calendar ${d.everyMin} min`);
    if (d.every.shipped && shipped >= d.every.shipped) out.push(`progress: ${shipped} shipped`);
    if (d.every.tokens && tokens >= d.every.tokens && shipped >= d.minEvidence) out.push(`progress: ${tokens} tokens`);
    for (const t of d.or) if (ev.some((e) => e.type === t)) out.push(`event: ${t}`);
    if (d.stuckMin != null) {
      const stuck = [...this.mailbox.msgs.values()].filter((m) => m.kind === "work" && m.state === "open" && this.clock.now() - m.ts > d.stuckMin);
      if (stuck.length) out.push(`event: ${stuck.length} work items waiting > ${d.stuckMin} min`);
    }
    if (d.fallbackMin != null && this.clock.now() - clockSince >= d.fallbackMin) out.push(`fallback ${d.fallbackMin} min`);
    return out;
  }
  due() { return [...this.defs.keys()].filter((id) => this.reasons(id).length); }
  open(id, { agenda }) {
    const d = this.defs.get(id);
    const rid = `RIT-${++this.n}`;
    const invitees = this.org.active().filter(d.invite).map((r) => r.id);
    for (const r of invitees) this.mailbox.send({ from: d.chair, to: r, kind: "invite", key: `${rid}:${r}`, ref: rid });
    const why = this.reasons(id);
    this.open_.set(rid, { rid, id, invitees, positions: [], actions: [], agenda, why, opened: this.clock.now() });
    this.log.add({ type: "ritual-open", ritual: id, rid, invitees, agenda, why });
    return rid;
  }
  position(rid, { by, position, objection = null, action = null }) {
    const r = this.open_.get(rid);
    hard(r?.invitees.includes(by), `${by} not invited to ${rid}`);
    if (action) hard(action.owner && action.due != null, "an action needs an owner and a due time");
    r.positions.push({ by, position, objection });
    if (action) r.actions.push(action);
  }
  close(rid, { by }) {
    const r = this.open_.get(rid);
    hard(r, `no ritual ${rid}`);
    hard(by === this.defs.get(r.id).chair, `${by} does not chair ${r.id}`);
    const came = new Set(r.positions.map((p) => p.by));
    const absent = r.invitees.filter((x) => !came.has(x));
    const since = this.held.get(r.id) ?? -Infinity;
    const ev = this.log.events.filter((e) => since === -Infinity || e.t > since);
    const cycle = (this.cycles.get(r.id) ?? 0) + 1;
    this.cycles.set(r.id, cycle);
    const metrics = { shipped: ev.filter((e) => e.type === "shipped").length, tokens: ev.filter((e) => e.type === "usage").reduce((x, e) => x + e.tokens, 0), decisions: ev.filter((e) => e.type === "decide").length, minutes: this.clock.now() - (this.held.get(r.id) ?? this.defs.get(r.id).registered), openedAfter: r.opened - (this.held.get(r.id) ?? this.defs.get(r.id).registered) };
    this.held.set(r.id, this.clock.now());
    this.open_.delete(rid);
    this.log.add({ type: "ritual-close", ritual: r.id, rid, cycle, why: r.why, metrics, positions: r.positions.length, objections: r.positions.filter((p) => p.objection).length, actions: r.actions.length, absent });
    return { ...r, absent, cycle, metrics };
  }
}

export function makeCompany(config = DEFAULT_CONFIG, { start = 0 } = {}) {
  const clock = { t: start, now() { return this.t; } };
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  return { clock, log, config, mailbox };
}

// ------------------------------------------------------------------ time: what "fast" means for a parallel company

/** Per order and overall, from events only:
 *  lead      wall time from order to shipped
 *  work      sum of run durations on the order (time an agent was actually on it)
 *  critical  the order's work plus the longest critical path among the orders it waits for (--after):
 *            the lead time unlimited parallel agents could reach
 *  flow efficiency = critical / lead: the rest is waiting (queues, approvals, crashes, dispatch)
 *  cost      tokens per shipped item; attention = founder decisions and sittings per shipped item */
export function flowMetrics(log, orders) {
  const ev = log.events;
  const work = {};
  for (const e of ev) if (e.type === "leave" && e.order) work[e.order] = (work[e.order] ?? 0) + (e.minutes ?? 0);
  const memo = {};
  const crit = (id) => memo[id] ??= (work[id] ?? 0) + Math.max(0, ...((orders.get(id)?.after ?? []).map(crit)));
  const per = [];
  for (const e of ev.filter((x) => x.type === "shipped")) {
    const o = orders.get(e.order);
    per.push({ order: e.order, priority: e.priority ?? "next", lead: e.lead, work: work[e.order] ?? 0, critical: crit(e.order), flowEfficiency: e.lead ? crit(e.order) / e.lead : 1, loops: e.loops, after: o?.after ?? [] });
  }
  const shipped = per.length || 1;
  const first = Math.min(...ev.filter((x) => x.type === "order").map((x) => x.t));
  const last = Math.max(...ev.filter((x) => x.type === "shipped").map((x) => x.t));
  return {
    orders: per,
    shipped: per.length,
    makespan: per.length ? last - first : 0,
    criticalPath: Math.max(0, ...per.map((p) => p.critical)),
    flowEfficiency: per.length ? per.reduce((x, p) => x + p.flowEfficiency, 0) / per.length : 0,
    tokensPerShipped: ev.filter((x) => x.type === "usage").reduce((x, e) => x + e.tokens, 0) / shipped,
    founderDecisionsPerShipped: ev.filter((x) => x.type === "decide" && x.by === "founder").length / shipped,
    loopsPerShipped: per.reduce((x, p) => x + p.loops, 0) / shipped,
    sessions: ev.filter((x) => x.type === "session-close").map((x) => x.items),
  };
}
