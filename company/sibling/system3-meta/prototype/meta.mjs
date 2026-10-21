#!/usr/bin/env node
// CLI over the prototype tools for live runs: state in live/state.json, one writer at a time (O_EXCL lock file).
// Every command loads the state, acts through lib.mjs, saves, and prints JSON. Time is real minutes.
//
//   node meta.mjs init                                        a fresh live org and the `task` flow (refuses if state exists)
//   node meta.mjs order new --to=<manager> --title=… --task=<T> --accept=… [--budget=200000] [--priority=now|next|later --due=<min>] [--after=O-1,O-2]
//   node meta.mjs order delegate <O> --by=<manager> --to=<builder> [--budget=150000]
//   node meta.mjs queue <role|pool:level>                     open work messages
//   node meta.mjs room enter --msg=<M> --role=<role> [--lease=30] [--as=<role> --mode=consult]
//   node meta.mjs room next --run=<R> --cap=<n> --evidence=… [leave flags]   leave, then take the next item in the same session
//   node meta.mjs room session-usage --session=<S> --tokens=<n>   the harness count for a whole agent process (supervisor)
//   node meta.mjs room wake-plan                              seconds until the next lease expiry: when to run recover
//   node meta.mjs flow metrics                                lead, work, critical path (--after), flow efficiency, cost
//   node meta.mjs room heartbeat --run=<R>
//   node meta.mjs room leave --run=<R> [--verdict=pass|revise] --evidence=<path> [--findings=…] [--learned=…] [--mistake=…]
//   node meta.mjs room abandon --run=<R> --by=<role> --reason=…   supervisor: end a bad run, sign nothing
//   node meta.mjs room recover                                expired leases → left-without-leave, order back in the queue
//   node meta.mjs room usage --run=<R> --tokens=<n>           the harness's token count for a run (supervisor only)
//   node meta.mjs flow advance <O> --stage=test1 --by=code    runs the builder's tests itself; signs pass or revise
//   node meta.mjs flow advance <O> --stage=<s> --by=<role> --evidence=… [--verdict=…] [--findings=…]
//   node meta.mjs flow show <O> | flow status
//   node meta.mjs mail dup <O>                                send the current stage's notification again (fault F1)
//   node meta.mjs batch --file=<ops.json>   [{cmd, sub?, arg?, args:{…}}, …] on one state, all or nothing; ${n.field} reads result n
//   node meta.mjs building plan|floor-propose|room-add|room-rename|room-retire|book|cancel …   floors, rooms, bookings (API.md §11)
//   node meta.mjs approval queue --approver=<role>  ·  approval decide --ids=… --by --decision --words --channel
//   node meta.mjs channel create|post|read|status|inbox …     channels, posts fanned out to members, acks
//   node meta.mjs item create|update|comment|link|show|search …  ·  project create  ·  cycle create  ·  board [filters]
//   node meta.mjs goal create|update|show|board|review …      goals: levels, contributes-to, RAG, code-measured criteria
//   node meta.mjs meeting open|position|read|reveal|round|board|object|decide|defer|close|show --id=<MTG> …
//   node meta.mjs ask raise|route|answer|summary …            leadership asks, routed to the lowest decider
//   node meta.mjs wbr open|close|page0 …  ·  goal-review --by  ·  digest --audience=founder|lane:<l>|company [--channel]
//   node meta.mjs help [<command>]                            these lines
//   node meta.mjs check --order=<O>                          run the order's test1 (tests or text checks) without signing: builders self-check
//   node meta.mjs usage add --role=<role> --tokens=<n> --label=…   harness usage of a session outside any room (the supervisor)
//   node meta.mjs usage correct --from-session=<S> --to-session=<S> --tokens=<n> --reason=…   append a correction (never edit)
//   node meta.mjs policy knobs | policy show --lane=<l>       the knobs a lane policy may set; the lane's versions
//   node meta.mjs policy propose --lane=<l> --by=<manager> --knobs='{…}' --reason=… --prediction=…
//   node meta.mjs policy activate --lane=<l> --version=<n> --by=<manager>   new orders pin it; orders in flight keep theirs
//   node meta.mjs manager report --lane=<l>   ·   manager cycle --lane=<l> --by=<manager> --belief=… --decision=keep|change [--version=<n>]
//   node meta.mjs contract templates   ·   contract open --by=<manager> --template=manager-onboarding [overrides]
//   node meta.mjs contract open --by=<manager> --kind=prototype|research|spike --goal=… --deliverable=… --budget=<n> --timebox=<min> [--onboarding='{…}']
//   node meta.mjs contract brief --id=<C>   ·   contract deliver --id=<C> --by=<ctr> --summary=… --path=live/contracts/<C>/… [--findings='[{claim,source,confidence}]']
//   node meta.mjs contract decide --id=<C> --by=<manager> --decision=accept|reject --reason=…   ·   contract show --id=<C>
//   node meta.mjs events [--type=<t>]   ·   node meta.mjs memory <role>   ·   node meta.mjs org activity <role>
// Exit: 0 ok, 1 refused, 2 usage or state error.
import fs from "node:fs";
import path from "node:path";
import { Refused, flowMetrics } from "./lib.mjs";
import { proposePolicy, activatePolicy, managerReport, recordCycle, KNOBS } from "./policy.mjs";
import { engage, engageTemplate, briefFor, deliver, decideContract, TEMPLATES } from "./contractor.mjs";
import { LIVE, STATE, LIVE_ROLES, TASK_FLOW, clock, make, rep, save, load, withLock, runTests, runTest1 } from "./state.mjs";
import * as B from "./building.mjs";
import * as CH from "./channels.mjs";
import * as T from "./tracker.mjs";
import * as G from "./goals.mjs";
import * as M from "./meetings.mjs";
import * as A from "./asks.mjs";
import * as RIT from "./rituals.mjs";
export { LIVE_ROOMS, LIVE_ROLES, TASK_FLOW } from "./state.mjs";

const argv = process.argv.slice(2);
const opt = {}, pos = [];
for (const a of argv) { if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; } else pos.push(a); }
const out = (x) => console.log(JSON.stringify(x, rep, 2));
const need = (...ks) => { for (const k of ks) if (opt[k] == null || opt[k] === true) throw new Error(`missing --${k}`); };


function pack(co, run, ctx, session, item) {
  const o = co.engine.orders.get(ctx.order);
  // Live run 2 findings: the workdir did not exist; the commands omitted the state prefix; cap and times were unclear.
  const dir = path.join(LIVE, "work", o.task);
  if (ctx.stage === "build") fs.mkdirSync(dir, { recursive: true });
  // Benchmark 1 finding (writer-1): the prefix dropped META_LIVE_DIR, so a copied command wrote to the wrong state
  const pre = [process.env.META_LIVE_DIR && `META_LIVE_DIR=${process.env.META_LIVE_DIR}`, process.env.META_STATE && `META_STATE=${process.env.META_STATE}`].filter(Boolean).map((x) => x + " ").join("");
  const iso = (m) => new Date(m * 60000).toISOString();
  return { run, session, item, lease_min: Number(opt.lease ?? 30), order: o.id, task: o.task, title: o.title, priority: o.priority, stage: ctx.stage, accept: o.accept, workdir: dir + "/", workdir_exists: fs.existsSync(dir), findings: o.findings ?? null, memory: ctx.memory.map((e) => ({ ...e, t: iso(e.t) })), history: o.history.map((h) => ({ ...h, t: iso(h.t) })),
    cap_means: "--cap counts every item in this session, including the first one you entered",
    leave_with: `${pre}node meta.mjs room leave --run=${run} --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`,
    next_with: `${pre}node meta.mjs room next --run=${run} --cap=<cap from your brief> --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'` };
}

function main() {
  const [cmd, sub, arg] = pos;
  // benchmark 2 (writer-1): with no command or `help` the CLI printed only an error; the usage is this file's header
  if (!cmd || cmd === "help") return fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//   node ")).map((l) => l.slice(5)).filter((l) => !sub || l.includes(` ${sub}`));
  if (cmd === "init") return withLock(() => {
    if (fs.existsSync(STATE)) throw new Error("state exists; refusing to overwrite");
    const co = make(opt.spec ?? "toy");
    co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
    const key = co.engine.define(co.spec.flow.name, { stages: co.spec.flow.stages }, { by: "cos" });
    co.engine.approveDef(key, { by: "founder", words: "Approve the task flow for the Meta sandbox (founder: Decide for me, 2026-10-21)" });
    save(co);
    return { ok: true, spec: co.data.spec, flow: key, roles: co.spec.roles.map((r) => r.id) };
  });
  if (cmd === "batch") return withLock(() => {
    // Benchmark 1: set-up took 15 separate commands. A batch runs a list of commands on one state, all or nothing:
    // any refusal saves nothing. `${n.path}` in an argument is replaced by a field of the n-th result (0-based).
    need("file");
    const ops = JSON.parse(fs.readFileSync(opt.file, "utf8"));
    const co = load();
    const results = [];
    const sub$ = (v) => typeof v === "string" ? v.replace(/\$\{(\d+)\.([\w.]+)\}/g, (_, n, f) => { let x = results[Number(n)]; for (const k of f.split(".")) x = x?.[k]; if (x == null) throw new Error(`batch: \${${n}.${f}} is empty`); return String(x); }) : v;
    for (const [i, op] of ops.entries()) {
      for (const k of Object.keys(opt)) delete opt[k];
      try {
        for (const [k, v] of Object.entries(op.args ?? {})) opt[k] = typeof v === "object" && v !== null ? JSON.stringify(v) : sub$(String(v));
        results.push(dispatch(co, op.cmd, op.sub, sub$(op.arg)));
      }
      catch (e) { e.message = `batch op ${i} (${op.cmd} ${op.sub ?? ""}): ${e.message}; nothing saved`; throw e; }
    }
    save(co);
    return { ok: true, ops: ops.length, results };
  });
  const readOnly = ["queue", "events", "memory", "check"].includes(cmd) || (cmd === "flow" && ["show", "status"].includes(sub)) || (cmd === "org" && sub !== "propose") || (cmd === "building" && sub === "plan") || (cmd === "item" && ["show", "search"].includes(sub)) || (cmd === "goal" && ["show", "board"].includes(sub)) || (cmd === "ask" && ["route", "summary"].includes(sub)) || (cmd === "channel" && ["status", "inbox"].includes(sub)) || (cmd === "meeting" && sub === "show") || (cmd === "wbr" && sub === "page0");
  const act = () => {
    const co = load();
    const before = co.log.events.length;
    try {
      const r = dispatch(co, cmd, sub, arg);
      if (!readOnly) save(co);
      return r;
    } catch (e) {
      // A refusal is an event too (live run 1 lost every refusal by not saving on error). HARD refusals get one here.
      if (e.refused && !readOnly) {
        if (!co.log.events.slice(before).some((x) => x.type === "refuse")) co.log.add({ type: "refuse", rule: "hard", msg: e.message, argv: argv.join(" ") });
        save(co);
      }
      throw e;
    }
  };
  return readOnly ? act() : withLock(act);
}

function dispatch(co, cmd, sub, arg) {
  const { engine, rooms, mailbox, org, log } = co;
  if (cmd === "order" && sub === "new") {
    need("to", "title", "task", "accept");
    const o = engine.orderNew({ flow: "task", by: opt.by ?? "cos", to: opt.to, budget: Number(opt.budget ?? 200_000), accept: opt.accept, title: opt.title, priority: opt.priority ?? "next", dueMin: opt.due ? Number(opt.due) : null, after: opt.after ? String(opt.after).split(",") : [], fromContract: opt["from-contract"] ?? null });
    o.task = opt.task;
    if (opt.project) o.project = opt.project; // mirrored onto its tracker item, so the roadmap counts it
    if (opt.goal) o.goal = opt.goal;
    if (opt.checks) o.checks = JSON.parse(opt.checks); // test1 by declared checks (non-code work), not the builder's tests
    return { order: o.id, stage: o.stage, priority: o.priority, after: o.after, blocked: o.blocked };
  }
  if (cmd === "order" && sub === "delegate") {
    need("by", "to");
    const o = engine.delegate(arg, { by: opt.by, to: opt.to, budget: Number(opt.budget ?? 150_000) });
    return { order: o.id, builder: o.builder, messages: mailbox.thread(o.id).map((m) => m.id) };
  }
  if (cmd === "queue") return mailbox.queue(sub, "work").map((m) => ({ msg: m.id, order: m.ref, stage: m.body.stage, loop: m.body.loops, priority: m.priority, title: engine.orders.get(m.ref).title }));
  if (cmd === "room" && sub === "enter") {
    need("msg", "role");
    const { run, ctx, session, item } = rooms.enter({ msg: opt.msg, role: opt.role, as: opt.as ?? null, mode: opt.mode ?? "work", leaseMin: Number(opt.lease ?? 30) });
    return pack(co, run, ctx, session, item);
  }
  if (cmd === "room" && sub === "next") {
    need("run", "evidence");
    const r = rooms.next(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null }, { cap: Number(opt.cap ?? 3), leaseMin: Number(opt.lease ?? 30) });
    const left = r.left ? { order: r.left.id, next_stage: r.left.stage, loops: r.left.loops } : { stale: true };
    if (!r.next) return { left, session_closed: r.closed?.id ?? true, reason: r.closed ? (r.closed.items >= Number(opt.cap ?? 3) ? "cap reached" : "queue empty") : "closed", note: "your session is over: stop now" };
    return { left, ...pack(co, r.next.run, r.next.ctx, r.next.session, r.next.item) };
  }
  if (cmd === "room" && sub === "session-usage") { need("session", "tokens"); rooms.recordSessionUsage(opt.session, Number(opt.tokens)); return { ok: true }; }
  if (cmd === "room" && sub === "wake-plan") { const t = mailbox.nextExpiry(); return { next_expiry_in_s: t == null ? null : Math.max(0, Math.round((t - clock.now()) * 60)) }; }
  if (cmd === "check") { need("order"); const o = engine.orders.get(opt.order); if (!o) throw new Refused(`no order ${opt.order}`); const t = runTest1(o); return { order: o.id, task: o.task, pass: t.pass, output: t.output, note: "the same check test1 will run; nothing is signed" }; }
  if (cmd === "flow" && sub === "metrics") { const m = flowMetrics(log, engine.orders); const r1 = (x) => Math.round(x * 100) / 100; return { ...m, orders: m.orders.map((o) => ({ ...o, lead_min: r1(o.lead), work_min: r1(o.work), critical_min: r1(o.critical), flowEfficiency: r1(o.flowEfficiency) })) }; }
  if (cmd === "room" && sub === "heartbeat") { need("run"); rooms.heartbeat(opt.run, { leaseMin: 30 }); return { ok: true }; }
  if (cmd === "room" && sub === "leave") {
    need("run", "evidence");
    const o = rooms.leave(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null });
    return o ? { order: o.id, next_stage: o.stage, loops: o.loops } : { stale: true, note: "the stage moved on while you worked; nothing was signed" };
  }
  if (cmd === "room" && sub === "abandon") { need("run", "by", "reason"); rooms.abandon(opt.run, { by: opt.by, reason: opt.reason }); return { ok: true }; }
  if (cmd === "room" && sub === "recover") return rooms.recover().map((x) => ({ run: x.run, role: x.role, order: x.order, msg: x.msg }));
  if (cmd === "room" && sub === "usage") { need("run", "tokens"); rooms.recordUsage(opt.run, Number(opt.tokens)); return { ok: true }; }
  if (cmd === "flow" && sub === "advance") {
    need("stage", "by");
    const o = engine.orders.get(arg);
    if (opt.stage === "test1" && opt.by === "code") {
      if (!o || o.stage !== "test1") throw new Refused(`HARD: ${arg} is not at test1`);
      const t = runTest1(o);
      engine.advance(arg, { stage: "test1", by: "code", verdict: t.pass ? "pass" : "revise", findings: t.pass ? null : t.output });
      return { order: arg, test1: t.pass ? "pass" : "revise", output: t.output, next_stage: o.stage };
    }
    engine.advance(arg, { stage: opt.stage, by: opt.by, evidence: opt.evidence ?? null, verdict: opt.verdict ?? "pass", findings: opt.findings ?? null });
    return { order: arg, next_stage: o.stage, loops: o.loops };
  }
  if (cmd === "flow" && sub === "show") { const o = engine.orders.get(arg); return { ...o, messages: mailbox.thread(arg).map((m) => ({ id: m.id, stage: m.body?.stage, state: m.state, lease: m.lease })) }; }
  if (cmd === "flow" && sub === "status") return engine.status();
  if (cmd === "mail" && sub === "dup") { const o = engine.orders.get(arg); const m = engine.notifyStage(o, { duplicate: true }); return { order: arg, msg: m?.id, open_work_messages: mailbox.thread(arg).filter((x) => x.kind === "work" && x.state === "open").length }; }
  if (cmd === "usage" && sub === "add") { need("role", "tokens", "label"); log.add({ type: "usage", role: opt.role, tokens: Number(opt.tokens), label: opt.label, source: "harness", supervisor: true }); return { ok: true }; }
  if (cmd === "usage" && sub === "correct") {
    // The log is append-only: a wrong usage record is corrected by two new events, never by editing the old one.
    need("from-session", "to-session", "tokens", "reason");
    const n = Number(opt.tokens);
    const from = rooms.sessions.get(opt["from-session"]), to = rooms.sessions.get(opt["to-session"]);
    if (!from || !to) throw new Refused("HARD: unknown session");
    log.add({ type: "usage", session: from.id, role: from.role, tokens: -n, correction: true, reason: opt.reason });
    log.add({ type: "usage", session: to.id, role: to.role, tokens: n, items: to.items, source: "harness", correction: true, reason: opt.reason });
    return { ok: true, moved: n, from: from.id, to: to.id };
  }
  // ---- the manager's code: lane policy, and the cycle that changes it
  if (cmd === "policy" && sub === "knobs") return KNOBS;
  if (cmd === "policy" && sub === "show") { need("lane"); return engine.policies.get(opt.lane) ?? { versions: [], active: null }; }
  if (cmd === "policy" && sub === "propose") {
    need("lane", "by", "knobs", "reason", "prediction");
    return proposePolicy(engine, { lane: opt.lane, by: opt.by, knobs: JSON.parse(opt.knobs), reason: opt.reason, prediction: opt.prediction });
  }
  if (cmd === "policy" && sub === "activate") { need("lane", "version", "by"); return activatePolicy(engine, { lane: opt.lane, version: Number(opt.version), by: opt.by }); }
  if (cmd === "manager" && sub === "report") { need("lane"); return managerReport(engine, opt.lane, { since: opt.since ? Number(opt.since) : -Infinity }); }
  if (cmd === "manager" && sub === "cycle") {
    need("lane", "by", "belief", "decision");
    const report = managerReport(engine, opt.lane);
    return recordCycle(engine, { lane: opt.lane, by: opt.by, report, belief: opt.belief, decision: opt.decision, version: opt.version ? Number(opt.version) : null });
  }
  // ---- contractors: prototypes, research and spikes outside the delivery flow
  if (cmd === "contract" && sub === "templates") return Object.fromEntries(Object.entries(TEMPLATES).map(([k, t]) => [k, { kind: t.kind, goal: t.goal, deliverable: t.deliverable, budget: t.budget, timeboxMin: t.timeboxMin }]));
  if (cmd === "contract" && sub === "open") {
    need("by");
    const over = Object.fromEntries(Object.entries({ kind: opt.kind, goal: opt.goal, deliverable: opt.deliverable, budget: opt.budget && Number(opt.budget), timeboxMin: opt.timebox && Number(opt.timebox), onboarding: opt.onboarding && JSON.parse(opt.onboarding) }).filter(([, v]) => v != null && v !== true));
    if (!opt.template) need("kind", "goal", "deliverable", "budget", "timebox");
    const c = opt.template ? engageTemplate(co, { template: opt.template, by: opt.by, ...over }) : engage(co, { by: opt.by, onboarding: {}, ...over });
    fs.mkdirSync(path.join(LIVE, "contracts", c.id), { recursive: true });
    return { contract: c.id, contractor: c.contractor, due: new Date(c.due * 60000).toISOString(), folder: `live/contracts/${c.id}/` };
  }
  if (cmd === "contract" && sub === "brief") { need("id"); return briefFor(co, opt.id); }
  if (cmd === "contract" && sub === "deliver") {
    need("id", "by", "summary", "path");
    return deliver(co, { cid: opt.id, by: opt.by, summary: opt.summary, path: opt.path, findings: opt.findings ? JSON.parse(opt.findings) : null });
  }
  if (cmd === "contract" && sub === "decide") { need("id", "by", "decision", "reason"); return decideContract(co, { cid: opt.id, by: opt.by, decision: opt.decision, reason: opt.reason }); }
  if (cmd === "contract" && sub === "show") { need("id"); return engine.contracts.get(opt.id) ?? null; }
  const J = (k) => (opt[k] != null && opt[k] !== true ? JSON.parse(opt[k]) : undefined);
  const N = (k) => (opt[k] != null && opt[k] !== true ? Number(opt[k]) : undefined);
  const L = (k) => (opt[k] != null && opt[k] !== true ? String(opt[k]).split(",").filter(Boolean) : undefined);
  // ---- building
  if (cmd === "building" && sub === "plan") return B.plan(co);
  if (cmd === "building" && sub === "floor-propose") { need("by", "floor"); return B.proposeFloor(co, { by: opt.by, floor: N("floor"), name: opt.name }); }
  if (cmd === "building" && sub === "room-add") { need("by", "id", "floor", "kind"); return B.addRoom(co, { by: opt.by, id: opt.id, floor: N("floor"), kind: opt.kind, capacity: N("capacity") ?? 6, lane: opt.lane ?? null }); }
  if (cmd === "building" && sub === "room-rename") { need("by", "id", "to"); return B.renameRoom(co, { by: opt.by, id: opt.id, to: opt.to }); }
  if (cmd === "building" && sub === "room-retire") { need("by", "id"); return B.retireRoom(co, { by: opt.by, id: opt.id }); }
  if (cmd === "building" && sub === "book") { need("by", "room", "minutes"); const start = N("start") ?? clock.now(); return B.book(co, { by: opt.by, room: opt.room, start, end: start + N("minutes"), attendees: L("attendees") ?? [], purpose: opt.purpose ?? "" }); }
  if (cmd === "building" && sub === "cancel") { need("by", "id"); return B.cancelBooking(co, { by: opt.by, id: opt.id }); }
  // ---- approvals (the founder's queue) and org changes
  if (cmd === "approval" && sub === "queue") { need("approver"); return engine.queue(opt.approver).map((a) => ({ id: a.id, kind: a.kind, order: a.order, stage: a.stage, ref: a.ref, due: new Date(a.due * 60000).toISOString() })); }
  if (cmd === "approval" && sub === "decide") { need("ids", "by", "decision", "words", "channel"); return engine.decide(L("ids"), { by: opt.by, decision: opt.decision, words: opt.words, channel: opt.channel }).map((a) => ({ id: a.id, state: a.state })); }
  if (cmd === "org" && sub === "propose") {
    need("by", "op", "role");
    const id = org.propose({ op: opt.op, role: J("role"), reason: opt.reason ?? "", by: opt.by, to: opt.to ?? null });
    const a = engine.request({ approver: "founder", kind: "org-change", ref: id, dueMin: 24 * 60, key: `${id}:approve` });
    return { change: id, approval: a.id };
  }
  if (cmd === "org" && sub === "roles") return org.active().map((r) => ({ id: r.id, level: r.level, lane: r.lane ?? null, room: r.room }));
  if (cmd === "org" && sub === "gaps") return org.gaps(log.events, { waitP50Min: N("wait") ?? 60 });
  // ---- channels
  if (cmd === "channel" && sub === "create") { need("by", "id", "kind"); return CH.createChannel(co, { by: opt.by, id: opt.id, kind: opt.kind, members: L("members") ?? [], title: opt.title ?? "" }); }
  if (cmd === "channel" && sub === "post") { need("by", "channel", "title"); return CH.post(co, { by: opt.by, channel: opt.channel, title: opt.title, body: opt.body ?? "", ack: !!opt.ack, key: opt.key ?? null }); }
  if (cmd === "channel" && sub === "read") { need("by", "post"); return CH.read(co, { by: opt.by, post: opt.post, ackIt: !!opt.ack }); }
  if (cmd === "channel" && sub === "status") { need("post"); return CH.status(co, opt.post); }
  if (cmd === "channel" && sub === "inbox") { need("by"); return CH.inbox(co, opt.by); }
  // ---- tracker
  if (cmd === "item" && sub === "create") { need("by", "title"); return T.create(co, { by: opt.by, kind: opt.kind ?? "issue", title: opt.title, body: opt.body ?? "", assignee: opt.assignee ?? null, project: opt.project ?? null, labels: L("labels") ?? [], priority: N("priority") ?? 3, cycle: opt.cycle ?? null, due: opt.due ?? null, goal: opt.goal ?? null, state: opt.state ?? "backlog" }); }
  if (cmd === "item" && sub === "update") { need("by", "id"); const ch = {}; for (const k of ["title", "body", "state", "assignee", "project", "cycle", "due", "goal"]) if (opt[k] != null && opt[k] !== true) ch[k] = opt[k]; if (N("priority") != null) ch.priority = N("priority"); if (L("add-labels")) ch.addLabels = L("add-labels"); if (L("remove-labels")) ch.removeLabels = L("remove-labels"); return T.update(co, { by: opt.by, id: opt.id, ...ch }); }
  if (cmd === "item" && sub === "comment") { need("by", "id", "text"); return T.comment(co, { by: opt.by, id: opt.id, text: opt.text }); }
  if (cmd === "item" && sub === "link") { need("by", "id", "type", "to"); return T.link(co, { by: opt.by, id: opt.id, type: opt.type, to: opt.to }); }
  if (cmd === "item" && sub === "show") { need("id"); return T.get(co, opt.id); }
  if (cmd === "item" && sub === "search") { need("q"); return T.search(co, opt.q); }
  if (cmd === "project" && sub === "create") { need("by", "name", "lead"); return T.createProject(co, { by: opt.by, name: opt.name, lead: opt.lead, goals: L("goals") ?? [] }); }
  if (cmd === "cycle" && sub === "create") { need("by", "name", "minutes"); const start = N("start") ?? clock.now(); return T.createCycle(co, { by: opt.by, name: opt.name, start, end: start + N("minutes") }); }
  if (cmd === "board") { T.syncOrders(co); return T.board(co, { assignee: opt.assignee, project: opt.project, label: opt.label, cycle: opt.cycle, goal: opt.goal, kind: opt.kind }); }
  // ---- goals
  if (cmd === "goal" && sub === "create") { need("by", "title", "level", "owner", "why", "what", "success", "due"); return G.createGoal(co, { by: opt.by, title: opt.title, level: opt.level, owner: opt.owner, why: opt.why, what: opt.what, success: J("success"), due: opt.due, contributesTo: L("contributes-to") ?? [], status: opt.status ?? "green", reason: opt.reason ?? null, path: opt.path ?? null }); }
  if (cmd === "goal" && sub === "update") { need("by", "id"); return G.updateGoal(co, { by: opt.by, id: opt.id, status: opt.status, reason: opt.reason ?? null, path: opt.path ?? null, current: J("current") ?? {}, bind: J("bind") ?? {}, done: opt.done == null ? null : opt.done === "true" || opt.done === true, divergence: opt.divergence ?? null }); }
  if (cmd === "goal" && sub === "show") { need("id"); return G.view(co, G.getGoal(co, opt.id)); }
  if (cmd === "goal" && sub === "board") return G.goalBoard(co, { level: opt.level ?? null, owner: opt.owner ?? null });
  if (cmd === "goal" && sub === "review") { need("by", "level"); return G.reviewLevel(co, { by: opt.by, level: opt.level }); }
  // ---- meetings
  if (cmd === "meeting" && sub === "open") { need("by", "title", "invitees", "agenda"); return M.openMeeting(co, { by: opt.by, title: opt.title, room: opt.room ?? null, start: N("start"), minutes: N("minutes") ?? 30, invitees: L("invitees"), agenda: J("agenda"), channel: opt.channel ?? null }); }
  if (cmd === "meeting" && sub === "position") { need("id", "by", "item", "text"); return M.writePosition(co, { id: opt.id, by: opt.by, n: N("item"), text: opt.text }); }
  if (cmd === "meeting" && sub === "read") { need("id", "by", "item"); return M.readRound(co, { id: opt.id, by: opt.by, n: N("item"), round: N("round") ?? null }); }
  if (cmd === "meeting" && sub === "reveal") { need("id", "by", "item"); return M.reveal(co, { id: opt.id, by: opt.by, n: N("item"), force: !!opt.force }); }
  if (cmd === "meeting" && sub === "round") { need("id", "by", "item"); return M.nextRound(co, { id: opt.id, by: opt.by, n: N("item") }); }
  if (cmd === "meeting" && sub === "board") { need("id", "by", "section", "text"); return M.whiteboard(co, { id: opt.id, by: opt.by, section: opt.section, text: opt.text }); }
  if (cmd === "meeting" && sub === "object") { need("id", "by", "item", "text"); return M.object(co, { id: opt.id, by: opt.by, n: N("item"), text: opt.text }); }
  if (cmd === "meeting" && sub === "decide") { need("id", "by", "item", "decision"); return M.decide(co, { id: opt.id, by: opt.by, n: N("item"), decision: opt.decision, answers: J("answers") ?? {}, actions: J("actions") ?? [] }); }
  if (cmd === "meeting" && sub === "defer") { need("id", "by", "item", "reason"); return M.defer(co, { id: opt.id, by: opt.by, n: N("item"), reason: opt.reason }); }
  if (cmd === "meeting" && sub === "close") { need("id", "by"); return { minutes: M.closeMeeting(co, { id: opt.id, by: opt.by }).minutes }; }
  if (cmd === "meeting" && sub === "show") { need("id"); const m = M.getMeeting(co, opt.id); return { id: m.id, title: m.title, kind: m.kind, chair: m.chair, state: m.state, invitees: m.invitees, agenda: m.agenda.map((a) => ({ n: a.n, title: a.title, rounds: a.rounds.length, revealed: a.rounds.at(-1).revealed, written: Object.keys(a.rounds.at(-1).positions), objections: a.objections.length, decided: !!a.decision })), whiteboard: m.board, pack: m.pack ?? null, minutes: m.minutes ?? null }; }
  // ---- asks and rituals
  if (cmd === "ask" && sub === "raise") { need("by", "kind", "title", "why", "due"); return A.raise(co, { by: opt.by, kind: opt.kind, title: opt.title, why: opt.why, due: opt.due, to: opt.to ?? null, amount: N("amount") ?? 0, lane: opt.lane ?? null, escalate: opt.escalate ?? null, goal: opt.goal ?? null }); }
  if (cmd === "ask" && sub === "route") { need("by", "kind"); return { decider: A.route(co, { by: opt.by, kind: opt.kind, amount: N("amount") ?? 0, lane: opt.lane ?? null }) }; }
  if (cmd === "ask" && sub === "answer") { need("by", "id", "decision", "text"); return A.answer(co, { by: opt.by, id: opt.id, decision: opt.decision, text: opt.text }); }
  if (cmd === "ask" && sub === "summary") return A.askSummary(co);
  if (cmd === "wbr" && sub === "open") { need("by"); T.syncOrders(co); return RIT.wbrOpen(co, { by: opt.by, room: opt.room ?? null, start: opt.start ? Date.parse(opt.start) / 60000 : null, invitees: L("invitees") ?? null, channel: opt.channel ?? null }); }
  if (cmd === "wbr" && sub === "close") { need("by", "meeting", "summary"); return { doc: RIT.wbrClose(co, { by: opt.by, meeting: opt.meeting, summary: opt.summary }).doc }; }
  if (cmd === "wbr" && sub === "page0") return RIT.page0(co);
  if (cmd === "goal-review") { need("by"); return RIT.goalReview(co, { by: opt.by }); }
  if (cmd === "digest") { need("audience"); return { doc: opt.channel ? RIT.publishDigest(co, { by: opt.by ?? "cos", audience: opt.audience, channel: opt.channel }).body : RIT.digest(co, { audience: opt.audience }) }; }
  if (cmd === "events") return log.events.filter((e) => !opt.type || e.type === opt.type);
  if (cmd === "memory") return rooms.memory.get(sub) ?? [];
  if (cmd === "org" && sub === "activity") return org.activity(log.events, arg);
  throw new Error(`unknown command: ${[cmd, sub].join(" ")}`);
}

try { const r = main(); out(r); }
catch (e) { console.error(JSON.stringify({ error: e.message, refused: !!e.refused })); process.exit(e.refused ? 1 : 2); }
