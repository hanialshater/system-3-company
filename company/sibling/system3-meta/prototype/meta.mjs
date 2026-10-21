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
//   node meta.mjs usage add --role=<role> --tokens=<n> --label=…   harness usage of a session outside any room (the supervisor)
//   node meta.mjs events [--type=<t>]   ·   node meta.mjs memory <role>   ·   node meta.mjs org activity <role>
// Exit: 0 ok, 1 refused, 2 usage or state error.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Log, Mailbox, Org, Engine, Rooms, DEFAULT_CONFIG, Refused, flowMetrics } from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LIVE = process.env.META_LIVE_DIR || path.join(HERE, "live");
const STATE = path.join(LIVE, process.env.META_STATE || "state.json");
const LOCK = path.join(LIVE, "state.lock");

export const LIVE_ROOMS = [{ id: "lobby", floor: 1 }, { id: "ceo-office", floor: 1 }, { id: "sandbox", floor: 2 }, { id: "quality", floor: 3 }, { id: "launch", floor: 3 }];
export const LIVE_ROLES = [
  { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
  { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
  { id: "mgr-live", level: "manager", reportsTo: "cos", lane: "s", room: "sandbox", floor: 2, skills: ["manage"] },
  { id: "toy-builder-1", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-builder-2", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-checker", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["review"] },
  { id: "toy-release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
];
export const TASK_FLOW = {
  stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "check", signer: "checker", evidence: ["review notes"] },
    { stage: "uat", signer: "orderer", evidence: ["hidden acceptance tests"] },
    { stage: "ship", signer: "release", evidence: ["copied to live/shipped/"] },
  ],
};

const clock = { now: () => Date.now() / 60000 }; // minutes, to the millisecond (live run 1 used whole minutes: too coarse for agents)

function make() {
  const config = DEFAULT_CONFIG;
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  const org = new Org({ log, rooms: LIVE_ROOMS, skills: ["manage", "js", "review", "release"], rituals: [] });
  const engine = new Engine({ log, clock, config, mailbox, org });
  const rooms = new Rooms({ log, clock, config, mailbox, engine, org });
  return { log, mailbox, org, engine, rooms };
}

const rep = (k, v) => (v instanceof Map ? { __map: [...v] } : v instanceof Set ? { __set: [...v] } : v);
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);
const FIELDS = { log: ["events"], mailbox: ["msgs", "keys", "n"], org: ["roles", "changes", "n"], engine: ["flows", "active", "orders", "approvals", "n", "limits"], rooms: ["runs", "n", "memory", "sessions", "nS"] };

function save(co) {
  const data = Object.fromEntries(Object.entries(FIELDS).map(([o, fs_]) => [o, Object.fromEntries(fs_.map((f) => [f, co[o][f]]))]));
  const tmp = `${STATE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, rep, 1));
  fs.renameSync(tmp, STATE); // atomic replace: a crash mid-write leaves the old state
}
function load() {
  const co = make();
  const data = JSON.parse(fs.readFileSync(STATE, "utf8"), rev);
  for (const [o, fs_] of Object.entries(FIELDS)) for (const f of fs_) if (data[o][f] !== undefined) co[o][f] = data[o][f];
  co.mailbox.promote(); // due `later` items become `next` on every command: time is checked when anything happens
  return co;
}

function withLock(fn) {
  fs.mkdirSync(LIVE, { recursive: true });
  const until = Date.now() + 10_000;
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      const age = Date.now() - fs.statSync(LOCK).mtimeMs;
      if (age > 30_000) { fs.rmSync(LOCK, { force: true }); continue; } // a writer died holding it
      if (Date.now() > until) throw new Error("state is locked by another process (10 s)");
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
  try { return fn(); } finally { fs.rmSync(LOCK, { force: true }); }
}

const argv = process.argv.slice(2);
const opt = {}, pos = [];
for (const a of argv) { if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; } else pos.push(a); }
const out = (x) => console.log(JSON.stringify(x, rep, 2));
const need = (...ks) => { for (const k of ks) if (opt[k] == null || opt[k] === true) throw new Error(`missing --${k}`); };

function runTests(task) {
  const dir = path.join(LIVE, "work", task);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".test.mjs")) : [];
  if (!files.length) return { pass: false, output: `no *.test.mjs in live/work/${task}` };
  try { return { pass: true, output: execFileSync(process.execPath, ["--test", ...files], { cwd: dir, encoding: "utf8", stdio: "pipe", timeout: 60_000 }).split("\n").filter((l) => /^# (tests|pass|fail)/.test(l)).join(" ") }; }
  catch (e) { return { pass: false, output: String(e.stdout || e.message).split("\n").filter((l) => /^not ok|^# (tests|pass|fail)|error:/.test(l)).slice(0, 12).join("\n") }; }
}

function pack(co, run, ctx, session, item) {
  const o = co.engine.orders.get(ctx.order);
  return { run, session, item, lease_min: Number(opt.lease ?? 30), order: o.id, task: o.task, title: o.title, priority: o.priority, stage: ctx.stage, accept: o.accept, workdir: `live/work/${o.task}/`, findings: o.findings ?? null, memory: ctx.memory, history: o.history,
    leave_with: `node meta.mjs room leave --run=${run} --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`,
    next_with: `node meta.mjs room next --run=${run} --cap=<cap from your brief> --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'` };
}

function main() {
  const [cmd, sub, arg] = pos;
  if (cmd === "init") return withLock(() => {
    if (fs.existsSync(STATE)) throw new Error("state exists; refusing to overwrite");
    const co = make();
    co.org.genesis(LIVE_ROLES);
    const key = co.engine.define("task", TASK_FLOW, { by: "cos" });
    co.engine.approveDef(key, { by: "founder", words: "Approve the task flow for the Meta sandbox (founder: Decide for me, 2026-10-21)" });
    save(co);
    return { ok: true, flow: key, roles: LIVE_ROLES.map((r) => r.id) };
  });
  const readOnly = ["queue", "events", "memory"].includes(cmd) || (cmd === "flow" && ["show", "status"].includes(sub)) || (cmd === "org");
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
    const o = engine.orderNew({ flow: "task", by: opt.by ?? "cos", to: opt.to, budget: Number(opt.budget ?? 200_000), accept: opt.accept, title: opt.title, priority: opt.priority ?? "next", dueMin: opt.due ? Number(opt.due) : null, after: opt.after ? String(opt.after).split(",") : [] });
    o.task = opt.task;
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
      const t = runTests(o.task);
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
  if (cmd === "events") return log.events.filter((e) => !opt.type || e.type === opt.type);
  if (cmd === "memory") return rooms.memory.get(sub) ?? [];
  if (cmd === "org" && sub === "activity") return org.activity(log.events, arg);
  throw new Error(`unknown command: ${[cmd, sub].join(" ")}`);
}

try { const r = main(); out(r); }
catch (e) { console.error(JSON.stringify({ error: e.message, refused: !!e.refused })); process.exit(e.refused ? 1 : 2); }
