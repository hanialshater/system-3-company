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

export class Log {
  constructor(clock) { this.clock = clock; this.events = []; }
  add(e) { const ev = { seq: this.events.length + 1, t: this.clock.now(), ...e }; this.events.push(ev); return ev; }
  of(type) { return this.events.filter((e) => e.type === type); }
}

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

export class Mailbox {
  constructor({ log, clock, config }) { Object.assign(this, { log, clock, config }); this.msgs = new Map(); this.keys = new Map(); this.n = 0; }

  send({ from, to, kind, key = null, due = null, ref = null, body = null }) {
    if (this.config.dedupe && key && this.keys.has(key)) {
      const m = this.msgs.get(this.keys.get(key));
      this.log.add({ type: "dedupe", msg: m.id, key });
      return m;
    }
    const m = { id: `M-${++this.n}`, from, to, kind, key, due, ref, body, ts: this.clock.now(), state: "open", lease: null, acked: false };
    this.msgs.set(m.id, m);
    if (key) this.keys.set(key, m.id);
    this.log.add({ type: "send", msg: m.id, from, to, kind, key, ref });
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
    return m;
  }

  heartbeat(id, { run, leaseMin = 30 }) {
    const m = this.msgs.get(id);
    hard(m?.lease?.run === run, `${id} not held by ${run}`);
    m.lease.until = this.clock.now() + leaseMin;
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

  ack(id, by) { const m = this.msgs.get(id); hard(m, `no message ${id}`); m.acked = true; this.log.add({ type: "ack", msg: id, by }); }

  /** Open messages for a recipient (or a pool), oldest first, whose lease is free. */
  queue(to, kind = null) {
    return [...this.msgs.values()].filter((m) => m.to === to && m.state === "open" && (!kind || m.kind === kind) && this.leaseFree(m));
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

export const LEVELS = ["founder", "chief-of-staff", "manager", "builder", "checker", "release"];

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

/** Invariants every flow definition must meet, whoever writes it. */
export function flowProblems(def) {
  const p = [];
  const stages = def.stages.map((s) => s.stage);
  for (const s of def.stages) {
    if (!s.signer) p.push(`${s.stage}: no signer`);
    if (s.signer !== "code" && !(s.evidence?.length)) p.push(`${s.stage}: no evidence`);
  }
  const t1 = def.stages.find((s) => s.stage === "test1");
  if (t1 && t1.signer !== "code") p.push("test1 must be signed by code");
  const check = def.stages.find((s) => s.stage === "check");
  if (!check) p.push("no independent check stage");
  else if (["builder", "orderer"].includes(check.signer)) p.push("check must be signed independently of build");
  const rel = def.stages.find((s) => s.stage === "release");
  if (rel && rel.signer !== "founder") p.push("release is founder-reserved");
  if (stages.at(-1) !== "ship") p.push("last stage must be ship");
  return p;
}

const COVERS = { release: /\b(approve|go)\b.*\b(deploy|release|ship)\b|\b(deploy|release|ship)\b.*\b(approve|ok|go)\b/i, "org-change": /\b(approve|add|retire|ok|yes)\b/i, budget: /\b(approve|ok|yes)\b/i };

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
  nextStage(o) { const st = this.flows.get(o.flow).stages; return st[st.findIndex((s) => s.stage === o.stage) + 1]?.stage ?? "done"; }

  // ---- orders, down the chain
  orderNew({ flow, by, to, budget, accept, words = null, title = "" }) {
    const key = this.active.get(flow);
    hard(key, `no active flow ${flow}`);
    const byRole = this.org.role(by), toRole = this.org.role(to);
    hard(byRole && toRole, "unknown role");
    this.guard(toRole.level === "manager", "chain", `${by} orders a manager, not ${to}`);
    const overLimit = budget > (this.limits[byRole.level] ?? Infinity);
    const o = { id: `O-${++this.n.O}`, flow: key, title, chain: [by, to], orderer: by, manager: to, builder: null, checker: null, budget, spent: 0, accept, words, stage: overLimit ? "budget" : "build", loops: 0, created: this.clock.now(), history: [] };
    this.orders.set(o.id, o);
    this.log.add({ type: "order", order: o.id, by, to, budget, flow: key });
    if (overLimit) this.request({ order: o.id, stage: "budget", approver: "founder", kind: "budget", dueMin: 24 * 60, key: `${o.id}:budget` });
    return o;
  }

  delegate(id, { by, to, budget }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    const toRole = this.org.role(to);
    if (!toRole?.active) { this.log.add({ type: "refuse", rule: "no-role", msg: `${to} does not exist`, order: id }); throw new Refused(`no-role: ${to}`); }
    this.guard(by === o.manager, "chain", `${by} is not the manager of ${id}`, { order: id });
    this.guard(toRole.lane === this.org.role(o.manager).lane, "lane", `${to} is not in lane ${this.org.role(o.manager).lane}`, { order: id, by });
    this.guard(budget <= this.limits.manager, "limit", `${budget} over the manager limit ${this.limits.manager}`, { order: id, by });
    o.builder = to;
    o.chain.push(to);
    this.log.add({ type: "delegate", order: id, by, to, budget });
    this.notifyStage(o);
    return o;
  }

  /** Puts the order's current stage in the right queue. Stages signed by code run at once; release goes to approval. */
  notifyStage(o, { duplicate = false } = {}) {
    const s = this.stageDef(o);
    if (!s) return;
    const key = `${o.id}:${o.stage}:${o.loops}`;
    if (s.signer === "code") return this.log.add({ type: "code-stage", order: o.id, stage: o.stage });
    if (s.signer === "founder") return this.request({ order: o.id, stage: o.stage, approver: "founder", kind: "release", dueMin: 24 * 60, key });
    const to = s.signer === "builder" ? o.builder : s.signer === "orderer" ? o.manager : `pool:${s.signer}`;
    return this.mailbox.send({ from: o.manager, to, kind: "work", key: duplicate ? (this.config.dedupe ? key : `${key}:dup${this.mailbox.n}`) : key, ref: o.id, body: { stage: o.stage, loops: o.loops } });
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
    return r.level === s.signer;
  }

  // ---- stages, up the chain
  advance(id, { stage, by, verdict = "pass", evidence = null, findings = null, consult = false }) {
    const o = this.orders.get(id);
    hard(o, `no order ${id}`);
    hard(o.stage === stage, `${id} is at ${o.stage}, not ${stage}`);
    this.guard(!consult, "consult", `a consult run cannot sign ${stage}`, { order: id, by });
    const s = this.stageDef(o);
    this.guard(this.mayAssign(o, stage, by), "signer", `${by} may not sign ${stage} on ${id}`, { order: id, by });
    if (stage === "check") { this.guard(by !== o.builder, "independence", `${by} built ${id} and cannot check it`, { order: id, by }); o.checker = by; }
    if (s.signer !== "code") this.guard(!!evidence, "evidence", `${stage} needs evidence`, { order: id, by });
    o.history.push({ stage, by, verdict, t: this.clock.now() });
    this.log.add({ type: "advance", order: id, stage, by, verdict });
    if (verdict === "pass") o.stage = this.nextStage(o);
    else { o.stage = "build"; o.loops++; o.findings = findings; this.log.add({ type: "reopen", order: id, from: stage, loops: o.loops }); }
    if (o.stage === "done") this.log.add({ type: "shipped", order: id, lead: this.clock.now() - o.created, loops: o.loops });
    else this.notifyStage(o);
    return o;
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
    if (a.kind === "org-change") { if (a.state === "approved") this.org.apply(a.ref, { by, words }); return; }
    const o = this.orders.get(a.order);
    if (a.kind === "budget") { if (a.state === "approved") { o.stage = "build"; this.log.add({ type: "budget-approved", order: o.id }); } return; }
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
  }

  enter({ msg, role, mode = "work", as = null, leaseMin = 30 }) {
    const m = this.mailbox.msgs.get(msg);
    hard(m && m.kind === "work", `no work message ${msg}`);
    const o = this.engine.orders.get(m.ref);
    const actor = as ?? role;
    const r = this.org.role(actor);
    hard(r?.active, `no active role ${actor}`);
    this.guard(m.to === actor || m.to === `pool:${r.level}`, "lane", `${actor} may not take ${msg} (for ${m.to})`, { order: o.id, by: actor });
    if (m.body.stage === "check") this.guard(actor !== o.builder, "independence", `${actor} built ${o.id}`, { order: o.id, by: actor });
    const run = `R-${++this.n}`;
    if (this.config.leases) this.mailbox.claim(msg, { run, leaseMin });
    // The run works on the stage and loop the message was sent for, not on wherever the order is now: a late
    // duplicate of a finished stage is a stale run, and its leave signs nothing.
    const { stage, loops } = m.body;
    const ctx = { roleDoc: `company/roles/${actor}.md`, memory: this.memory.get(actor) ?? [], order: o.id, stage, findings: o.findings ?? null };
    this.runs.set(run, { run, msg, role: actor, by: role, consult: mode === "consult", order: o.id, stage, loops, entered: this.clock.now(), state: "running" });
    this.log.add({ type: "enter", run, msg, role: actor, by: role, room: r.room, order: o.id, stage, mode });
    return { run, ctx };
  }

  heartbeat(run, { leaseMin = 30 } = {}) {
    const x = this.runs.get(run);
    if (this.config.leases) this.mailbox.heartbeat(x.msg, { run, leaseMin });
  }

  leave(run, { verdict = "pass", evidence = null, learned = null, mistake = null, tokens = 0, findings = null }) {
    const x = this.runs.get(run);
    hard(x && x.state === "running", `run ${run} not running`);
    const o = this.engine.orders.get(x.order);
    if (o.stage !== x.stage || o.loops !== x.loops) {
      x.state = "stale";
      this.log.add({ type: "stale-leave", run, order: o.id, role: x.role });
      if (this.config.autoBookkeeping) this.log.add({ type: "usage", run, role: x.role, tokens, auto: true });
      return null;
    }
    this.engine.advance(o.id, { stage: x.stage, by: x.role, verdict, evidence, findings, consult: x.consult });
    x.state = "left";
    const m = this.mailbox.msgs.get(x.msg);
    if (m.state === "open") this.mailbox.done(x.msg, { run, report: { stage: x.stage, verdict } });
    if (this.config.autoBookkeeping) {
      const did = `${x.stage} on ${o.id}: ${verdict} (loop ${x.loops})`;
      (this.memory.get(x.role) ?? this.memory.set(x.role, []).get(x.role)).push({ t: this.clock.now(), did, learned, mistake });
      this.log.add({ type: "usage", run, role: x.role, tokens, auto: true });
      this.log.add({ type: "leave", run, role: x.role, order: o.id, stage: x.stage, verdict, minutes: this.clock.now() - x.entered });
    }
    return o;
  }

  /** Lease expiry: the run left without leave; its order goes back to the queue. */
  recover() {
    const lost = [];
    for (const x of this.runs.values()) {
      if (x.state !== "running") continue;
      const m = this.mailbox.msgs.get(x.msg);
      if (this.config.leases && m.lease?.run === x.run && m.lease.until <= this.clock.now()) {
        x.state = "lost";
        this.mailbox.release(x.msg, { run: x.run, reason: "lease expired" });
        this.log.add({ type: "left-without-leave", run: x.run, role: x.role, order: x.order, after: this.clock.now() - x.entered });
        lost.push(x);
      }
    }
    return lost;
  }

  who(room) { return [...this.runs.values()].filter((x) => x.state === "running" && this.org.role(x.role)?.room === room); }
}

// ------------------------------------------------------------------ rituals: trigger → open → rounds → close

export class Rituals {
  constructor({ log, clock, mailbox, org }) { Object.assign(this, { log, clock, mailbox, org }); this.defs = new Map(); this.held = new Map(); this.open_ = new Map(); this.n = 0; }
  register({ id, everyMin, chair, invite }) { this.defs.set(id, { id, everyMin, chair, invite }); }
  due() { return [...this.defs.values()].filter((d) => this.clock.now() - (this.held.get(d.id) ?? 0) >= d.everyMin).map((d) => d.id); }
  open(id, { agenda }) {
    const d = this.defs.get(id);
    const rid = `RIT-${++this.n}`;
    const invitees = this.org.active().filter(d.invite).map((r) => r.id);
    for (const r of invitees) this.mailbox.send({ from: d.chair, to: r, kind: "invite", key: `${rid}:${r}`, ref: rid });
    this.open_.set(rid, { rid, id, invitees, positions: [], actions: [], agenda });
    this.log.add({ type: "ritual-open", ritual: id, rid, invitees, agenda });
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
    this.held.set(r.id, this.clock.now());
    this.open_.delete(rid);
    this.log.add({ type: "ritual-close", ritual: r.id, rid, positions: r.positions.length, objections: r.positions.filter((p) => p.objection).length, actions: r.actions.length, absent });
    return { ...r, absent };
  }
}

export function makeCompany(config = DEFAULT_CONFIG, { start = 0 } = {}) {
  const clock = { t: start, now() { return this.t; } };
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  return { clock, log, config, mailbox };
}
