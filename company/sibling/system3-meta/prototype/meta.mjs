#!/usr/bin/env node
// CLI over the prototype tools for live runs: state in live/state.json, one writer at a time (O_EXCL lock file).
// Every command loads the state, acts through lib.mjs, saves, and prints JSON. Time is real minutes.
//
//   node meta.mjs init [--spec=<built-in> | --spec-file=<json>]   a fresh live org and its flow (refuses if state exists);
//        --spec-file generates a company from a spec file, validated against the invariants (generator.mjs, M2)
//   node meta.mjs order new --to=<manager> --title=… --task=<T> --accept=… [--budget=200000] [--priority=now|next|later --due=<min>] [--after=O-1,O-2]
//   node meta.mjs order delegate <O> --by=<manager> --to=<builder> [--budget=150000]
//   node meta.mjs order reopen <O> --by=<manager|founder> --findings=… [--reason=…]   a shipped order back to build
//   node meta.mjs queue <role|pool:level>                     open work messages
//   node meta.mjs room enter --msg=<M> --role=<role> [--lease=30] [--as=<role> --mode=consult]
//   node meta.mjs room next --run=<R> --cap=<n> [--wait=<s>] --evidence=… [leave flags]   leave, then take the next item in the
//        same session; --wait keeps the session up to <s> seconds for the role's next item (benchmark 3: ~60k per new session)
//   node meta.mjs escape add --by=<role> --pattern=<regex> --why=… [--runs=a,b] | escape list   the company's known false
//        claims (escapes.json, kept across runs); every text order is checked against them
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
//   node meta.mjs mail dup <O> --by=<manager>                 send the current stage's notification again (managers only)
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
//   node meta.mjs launch config --role=<r> [--msgs=M-1,…]   K10: the role's launch settings, its orders' workdirs and protected globs
//   node meta.mjs guard denied --role=<r> --tool=<t> --rule=<rule> --why=… [--launch=<L>] [--detail=…]   K10: a guard denial (the launcher)
//   node meta.mjs events [--type=<t>]   ·   node meta.mjs memory <role>   ·   node meta.mjs org activity <role>
// Exit: 0 ok, 1 refused, 2 usage or state error.
import fs from "node:fs";
import path from "node:path";
import { Refused, flowMetrics } from "./lib.mjs";
import * as GEN from "./generator.mjs";
import * as WS from "./workspace.mjs";
import { proposePolicy, activatePolicy, managerReport, recordCycle, KNOBS } from "./policy.mjs";
import { engage, engageTemplate, briefFor, deliver, decideContract, TEMPLATES } from "./contractor.mjs";
import { absCmds, HERE, LIVE, STATE, LIVE_ROLES, TASK_FLOW, clock, make, rep, interpolate, save, load, withLock, runTests, runTest1, validateChecks, describeChecks, mergeChecks, ESCAPES, readEscapes } from "./state.mjs";
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
const need = (...ks) => { const miss = ks.filter((k) => opt[k] == null || opt[k] === true); if (miss.length) throw new Error(`missing ${miss.map((k) => `--${k}`).join(" ")}`); };


/** K5: why message `m`'s order may not be worked yet (its workspace is held or cannot be made), or null. */
const wsBlocker = (co, m) => (m && WS.specOf(co) ? WS.blocker(co, co.engine.orders.get(m.ref)) : null);
function pack(co, run, ctx, session, item) {
  const o = co.engine.orders.get(ctx.order);
  // Live run 2 findings: the workdir did not exist; the commands omitted the state prefix; cap and times were unclear.
  // K5: with a spec workspace the workdir is the order's git worktree (made by the supervisor's tick, or by the room
  // enter/next gate, wsBlocker); a git failure after that gate is reported in the pack: the run is already entered
  const ws = WS.ensure(co, o);
  const dir = ws ? ws.workdir ?? path.join(WS.specOf(co).root, o.task) : path.join(LIVE, "work", o.task);
  if (ctx.stage === "build" && !ws) fs.mkdirSync(dir, { recursive: true });
  const vars = { workdir: dir, task: o.task ?? "", slug: o.slug ?? o.task ?? "" };
  // Benchmark 1 finding (writer-1): the prefix dropped META_LIVE_DIR, so a copied command wrote to the wrong state
  const pre = [process.env.META_LIVE_DIR && `META_LIVE_DIR=${process.env.META_LIVE_DIR}`, process.env.META_STATE && `META_STATE=${process.env.META_STATE}`].filter(Boolean).map((x) => x + " ").join("");
  const iso = (m) => new Date(m * 60000).toISOString();
  return { run, session, item, lease_min: Number(opt.lease ?? 30), order: o.id, task: o.task, title: o.title, priority: o.priority, stage: ctx.stage, accept: ws ? interpolate(o.accept ?? "", vars) : o.accept, workdir: dir + "/", workdir_exists: fs.existsSync(dir), ...(ws ? (ws.error ? { workspace_error: ws.error } : { branch: o.workspace.branch, base_sha: o.workspace.sha, env: o.workspace.env, run_meta_from: HERE }) : {}), findings: o.findings ?? null, memory: ctx.memory.map((e) => ({ ...e, t: iso(e.t) })), history: o.history.map((h) => ({ ...h, t: iso(h.t) })),
    cap_means: "--cap counts every item in this session, including the first one you entered",
    leave_with: absCmds(`${pre}node meta.mjs room leave --run=${run} --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`),
    next_with: absCmds(`${pre}node meta.mjs room next --run=${run} --cap=<cap from your brief> --wait=90 --evidence=<path>${ctx.stage === "check" ? " --verdict=pass|revise --findings='…'" : ""} --learned='…'`) };
}

function main() {
  const [cmd, sub, arg] = pos;
  // benchmark 2 (writer-1): with no command or `help` the CLI printed only an error; the usage is this file's header
  if (!cmd || cmd === "help") return fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//   node ")).map((l) => l.slice(5)).filter((l) => !sub || l.includes(` ${sub}`));
  if (cmd === "init") return withLock(() => {
    if (fs.existsSync(STATE)) throw new Error("state exists; refusing to overwrite");
    // M2: --spec-file=<json> generates a company from a spec file, validated first
    let def = null, name = opt.spec ?? "toy";
    if (opt["spec-file"]) {
      def = JSON.parse(fs.readFileSync(opt["spec-file"], "utf8"));
      const v = GEN.validateSpec(def);
      if (v.length) throw new Refused(`spec ${opt["spec-file"]} breaks ${v.length} invariant(s): ${v.join("; ")}`);
      name = def.name ?? path.basename(opt["spec-file"], ".json");
    }
    const co = make(name, def);
    co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
    const key = co.engine.define(co.spec.flow.name, { stages: co.spec.flow.stages }, { by: "cos" });
    co.engine.approveDef(key, { by: "founder", words: "Approve the task flow for the Meta sandbox (founder: Decide for me, 2026-10-21)" });
    if (def) {
      co.writeFile = (rel, text) => { const f = path.join(LIVE, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
      for (const c of def.channels ?? []) CH.createChannel(co, { by: "cos", id: c.id, kind: c.kind, members: c.members ?? [], title: c.title ?? "" });
      if (def.rules?.length) co.data.rules = def.rules.map((r) => ({ ...r, source: `spec ${name}` }));
      co.writeFile("ORG.md", GEN.orgDoc(def, name));
      if (def.context) co.writeFile("CONTEXT.md", def.context + "\n");
    }
    save(co);
    return { ok: true, spec: co.data.spec, generated: !!def, flow: key, roles: co.spec.roles.map((r) => r.id), files: def ? ["ORG.md", ...(def.context ? ["CONTEXT.md"] : [])] : [] };
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
  const readOnly = ["queue", "events", "memory"].includes(cmd) || (cmd === "launch" && sub === "config") || (cmd === "flow" && ["show", "status"].includes(sub)) || (cmd === "org" && sub !== "propose") || (cmd === "building" && sub === "plan") || (cmd === "item" && ["show", "search"].includes(sub)) || (cmd === "goal" && ["show", "board"].includes(sub)) || (cmd === "ask" && ["route", "summary"].includes(sub)) || (cmd === "channel" && ["status", "inbox"].includes(sub)) || (cmd === "meeting" && sub === "show") || (cmd === "wbr" && sub === "page0");
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
        // a refused command changes nothing but the record of its refusal (benchmark 2: a refused meeting decide left
        // the tracker action it had already created): reload, then append only the refusal events
        const refusals = co.log.events.slice(before).filter((x) => x.type === "refuse");
        const clean = load();
        if (refusals.length) for (const r of refusals) { const { seq, t, ...rest } = r; clean.log.add(rest); }
        else clean.log.add({ type: "refuse", rule: "hard", msg: e.message, argv: argv.join(" ") });
        save(clean);
      }
      throw e;
    }
  };
  const r = readOnly ? act() : withLock(act);
  // room next --wait: the hand-in is saved; poll (outside the lock) until the role's next item or the end of the wait
  if (cmd === "room" && sub === "next" && r?.waiting) {
    for (;;) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2000);
      // the pack is made under the lock and saved (K5 review: a worktree made by it, and its event, were lost)
      const w = withLock(() => {
        const co = load(); const x = co.rooms.resume(r.waiting, { leaseMin: Number(opt.lease ?? 30), filter: (m) => !wsBlocker(co, m) });
        if (x.waiting) return { x };
        const p = x.next ? pack(co, x.next.run, x.next.ctx, x.next.session, x.next.item) : null;
        save(co); return { x, p };
      });
      if (w.x.waiting) continue;
      if (w.p) return { left: r.left, waited: true, ...w.p };
      return { left: r.left, session_closed: r.waiting, reason: w.x.reason, note: "your session is over: stop now" };
    }
  }
  return r;
}

function dispatch(co, cmd, sub, arg) {
  const { engine, rooms, mailbox, org, log } = co;
  if (cmd === "order" && sub === "new") {
    need("to", "title", "task", "accept");
    const o = engine.orderNew({ flow: co.spec.flow?.name ?? "task", by: opt.by ?? "cos", to: opt.to, budget: Number(opt.budget ?? 200_000), accept: opt.accept, title: opt.title, priority: opt.priority ?? "next", dueMin: opt.due ? Number(opt.due) : null, after: opt.after ? String(opt.after).split(",") : [], fromContract: opt["from-contract"] ?? null });
    o.task = opt.task;
    if (opt.project) o.project = opt.project; // mirrored onto its tracker item, so the roadmap counts it
    if (opt.goal) o.goal = opt.goal;
    if (opt.checks) { o.checks = JSON.parse(opt.checks); const e = validateChecks(o.checks); if (e) throw new Refused(`HARD: ${e}`); } // test1 by declared checks (non-code work)
    M.applyStandingRules(co, o); // decisions made before this order was placed
    // the company's known false claims travel to every text order (benchmark 3: room memory is per run, so an escape
    // found by one run's fact-check reached the next run unchanged)
    const kf = readEscapes();
    if (o.checks && kf.length) { o.checks = mergeChecks(o.checks, { knownFalse: kf.map(({ pattern, why }) => ({ pattern, why })) }); log.add({ type: "rule-applied", order: o.id, task: o.task, source: "escapes", keys: ["knownFalse"] }); }
    return { order: o.id, stage: o.stage, priority: o.priority, after: o.after, blocked: o.blocked };
  }
  if (cmd === "order" && sub === "reopen") {
    need("by", "findings");
    const o = engine.orders.get(arg);
    if (!o) throw new Refused(`no order ${arg}`);
    if (opt.by !== o.manager && opt.by !== "founder") throw new Refused(`${opt.by} may not reopen ${arg}: its manager (${o.manager}) or the founder may`);
    const r = engine.reopen(arg, { by: opt.by, findings: opt.findings, reason: opt.reason ?? "changed requirement" });
    return { order: r.id, stage: r.stage, loops: r.loops };
  }
  if (cmd === "order" && sub === "delegate") {
    need("by", "to");
    const o = engine.delegate(arg, { by: opt.by, to: opt.to, budget: Number(opt.budget ?? 150_000) });
    return { order: o.id, builder: o.builder, messages: mailbox.thread(o.id).map((m) => m.id) };
  }
  if (cmd === "queue") return mailbox.queue(sub, "work").map((m) => ({ msg: m.id, order: m.ref, stage: m.body.stage, loop: m.body.loops, priority: m.priority, title: engine.orders.get(m.ref).title }));
  if (cmd === "room" && sub === "enter") {
    need("msg", "role");
    // K5 review: a workspace failure held the order only in tick, and `room enter` went ahead with no worktree. A
    // refusal would drop the hold (a refused command saves only its refusal), so this saves it and exits 1
    const held = wsBlocker(co, mailbox.msgs.get(opt.msg));
    if (held) { process.exitCode = 1; return { refused: `order ${mailbox.msgs.get(opt.msg).ref} is held: ${held}`, note: "do not start this item: the supervisor retries it (node supervisor.mjs retry --order=<O>)" }; }
    const { run, ctx, session, item } = rooms.enter({ msg: opt.msg, role: opt.role, as: opt.as ?? null, mode: opt.mode ?? "work", leaseMin: Number(opt.lease ?? 30) });
    // the launcher (M3) names each agent process; its usage and its crash are then this session's, exactly
    const s = rooms.sessions.get(session);
    if (process.env.META_LAUNCH && s.launch == null) s.launch = process.env.META_LAUNCH;
    return pack(co, run, ctx, session, item);
  }
  if (cmd === "room" && sub === "next") {
    need("run", "evidence");
    const r = rooms.next(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null }, { cap: Number(opt.cap ?? 3), leaseMin: Number(opt.lease ?? 30), waitMin: Number(opt.wait ?? 0) / 60, filter: (m) => !wsBlocker(co, m) });
    const left = r.left ? { order: r.left.id, next_stage: r.left.stage, loops: r.left.loops } : { stale: true };
    if (r.waiting) return { left, waiting: r.waiting.id };
    if (!r.next) return { left, session_closed: r.closed?.id ?? true, reason: r.closed ? (r.closed.items >= Number(opt.cap ?? 3) ? "cap reached" : "queue empty") : "closed", note: "your session is over: stop now" };
    return { left, ...pack(co, r.next.run, r.next.ctx, r.next.session, r.next.item) };
  }
  if (cmd === "room" && sub === "session-usage") { need("session", "tokens"); rooms.recordSessionUsage(opt.session, Number(opt.tokens)); return { ok: true }; }
  if (cmd === "room" && sub === "wake-plan") { const t = mailbox.nextExpiry(); return { next_expiry_in_s: t == null ? null : Math.max(0, Math.round((t - clock.now()) * 60)) }; }
  if (cmd === "check") { need("order"); const o = engine.orders.get(opt.order); if (!o) throw new Refused(`no order ${opt.order}`); const t = runTest1(o);
    // every self-check is a record (org evaluation, ISS-2): a failed one is a defect code caught before hand-in
    const by = [...rooms.runs.values()].find((r) => r.state === "running" && r.order === o.id)?.role ?? opt.by ?? null;
    log.add({ type: "self-check", order: o.id, task: o.task, by, stage: o.stage, pass: t.pass, output: String(t.output).slice(0, 400) });
    return { order: o.id, task: o.task, pass: t.pass, output: t.output, rules: o.checks ? describeChecks(o.checks) : ["the builder's own tests (node --test)"], note: "the same check test1 will run; nothing is signed" }; }
  if (cmd === "flow" && sub === "metrics") { const m = flowMetrics(log, engine.orders); const r1 = (x) => Math.round(x * 100) / 100; return { ...m, orders: m.orders.map((o) => ({ ...o, lead_min: r1(o.lead), work_min: r1(o.work), critical_min: r1(o.critical), flowEfficiency: r1(o.flowEfficiency) })) }; }
  if (cmd === "room" && sub === "heartbeat") { need("run"); rooms.heartbeat(opt.run, { leaseMin: 30 }); return { ok: true }; }
  if (cmd === "room" && sub === "leave") {
    need("run", "evidence");
    // K7 review: `commit` is this leave's own commit; the head before tells it from an earlier stage's (null: nothing changed)
    const was = engine.orders.get(rooms.runs.get(opt.run)?.order)?.workspace?.head ?? null;
    const o = rooms.leave(opt.run, { verdict: opt.verdict ?? "pass", evidence: opt.evidence, findings: opt.findings ?? null, learned: opt.learned ?? null, mistake: opt.mistake ?? null });
    // K7: the stage's commit (code's, in the order's worktree), or why it was refused and the order held
    return o ? { order: o.id, next_stage: o.stage, loops: o.loops, ...(WS.commitOf(WS.specOf(co)) && o.workspace?.dir ? { commit: o.workspace.head && o.workspace.head !== was ? o.workspace.head : null } : {}), ...(o.stageError?.kind === "workspace" ? { held: o.stageError.why } : {}) } : { stale: true, note: "the stage moved on while you worked; nothing was signed" };
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
  // a resend is a manager's act, recorded with who did it (benchmark 4's F3 test: a checker resent its own lost
  // message with an unguarded `mail dup`; the watchdog does it by code)
  if (cmd === "mail" && sub === "dup") { need("by"); const o = engine.orders.get(arg); if (!o) throw new Refused(`no order ${arg}`);
    const lvl = org.role(opt.by)?.level; if (!["founder", "chief-of-staff", "manager"].includes(lvl)) throw new Refused(`${opt.by} may not resend work: a manager, the chief of staff or the founder may (the supervisor's watchdog resends lost messages by itself)`);
    log.add({ type: "mail-dup", order: arg, by: opt.by }); const m = engine.notifyStage(o, { duplicate: true }); return { order: arg, msg: m?.id, open_work_messages: mailbox.thread(arg).filter((x) => x.kind === "work" && x.state === "open").length }; }
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
  if (cmd === "meeting" && sub === "decide") { need("id", "by", "item", "decision"); return M.decide(co, { id: opt.id, by: opt.by, n: N("item"), decision: opt.decision, answers: J("answers") ?? {}, actions: J("actions") ?? [], rules: J("rules") ?? [] }); }
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
  // the launcher reports a finished agent process: usage to its session(s); a crash abandons what it left running and
  // closes its session, so the work goes back to the queue and the supervisor plans it again
  if (cmd === "launch" && sub === "finished") {
    need("launch", "role", "tokens");
    const ok = opt.ok !== "false", tokens = Number(opt.tokens);
    const ss = [...rooms.sessions.values()].filter((s) => s.launch === opt.launch);
    const abandoned = [];
    for (const s of ss) {
      if (!ok) for (const x of rooms.runs.values()) if (x.session === s.id && x.state === "running") { rooms.abandon(x.run, { by: "launcher", reason: opt.reason ?? "agent process failed" }); abandoned.push(x.run); }
      if (!ok || s.waitUntil != null) { s.waitUntil = null; rooms.closeSession(s.id, ok ? "process ended" : "process failed"); }
    }
    if (ss.length) rooms.recordSessionUsage(ss[0].id, tokens, "launcher");
    else log.add({ type: "usage", role: opt.role, tokens, label: "outside a room", source: "launcher", launch: opt.launch });
    log.add({ type: "launch-finished", launch: opt.launch, role: opt.role, ok, tokens, cumulative: N("cumulative") ?? null, cost: N("cost") ?? null, sessions: ss.map((s) => s.id), abandoned, reason: opt.reason ?? null });
    return { sessions: ss.map((s) => s.id), abandoned };
  }
  // K10: what the launcher needs for one session (the role's tools/sessionMin/maxTurns/settingSources, the orders'
  // workdirs and protected globs), and the record of every call its guard denied (launcher/guard.mjs)
  if (cmd === "launch" && sub === "config") { need("role"); return WS.launchConfig(co, { role: opt.role, msgs: L("msgs") ?? [] }); }
  if (cmd === "guard" && sub === "denied") {
    need("role", "tool", "rule", "why");
    return log.add({ type: "guard", launch: opt.launch ?? null, role: opt.role, tool: opt.tool, rule: opt.rule, why: opt.why, detail: opt.detail ?? null, via: opt.via ?? null });
  }
  if (cmd === "escape" && sub === "list") return readEscapes();
  if (cmd === "escape" && sub === "add") {
    need("by", "pattern", "why");
    const e = validateChecks({ knownFalse: [{ pattern: opt.pattern, why: opt.why }] }); if (e) throw new Refused(e);
    const list = readEscapes().filter((x) => x.pattern !== opt.pattern);
    list.push({ pattern: opt.pattern, why: opt.why, by: opt.by, runs: opt.runs ? String(opt.runs).split(",") : [], added: new Date().toISOString().slice(0, 10) });
    fs.writeFileSync(ESCAPES, JSON.stringify(list, null, 1) + "\n");
    log.add({ type: "escape-added", by: opt.by, pattern: opt.pattern });
    return { ok: true, escapes: list.length };
  }
  if (cmd === "events") return log.events.filter((e) => !opt.type || e.type === opt.type);
  if (cmd === "memory") return rooms.memory.get(sub) ?? [];
  if (cmd === "org" && sub === "activity") return org.activity(log.events, arg);
  throw new Error(`unknown command: ${[cmd, sub].join(" ")}`);
}

try { const r = main(); out(r); }
catch (e) { console.error(JSON.stringify({ error: e.message, refused: !!e.refused })); process.exit(e.refused ? 1 : 2); }
