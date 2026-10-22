#!/usr/bin/env node
// The supervisor as code (live run 2: as an agent it cost 34k tokens an order for steps that need no judgment).
// It does every step a rule can decide, and plans the ones only an agent can do:
//   test1   runs the builder's tests and signs as `code`
//   run     K1: any stage signed by code, or with a `run` cmd in the spec, runs by code (runCodeStage; the cmd check is
//           state.mjs runCmdCheck: {argv, cwd, env, timeoutMs, pass, findings, route}, with ${slug}/${task}/${workdir});
//           K11: a failure whose output matches a `route` regex is revised back to that earlier stage, not to build;
//           a route to `park` parks the order with an ask (M4 audit: an active publish hold); `errorExit` codes are a stage-error
//   workspace  K5: with a spec `workspace`, each order with a builder gets its git worktree once (workspace.mjs ensure);
//           its cmd stages run there with its env, and its brief names it; a git failure holds the order whatever its
//           stage (no launch, `room enter`/`next` refuse its items) until `retry`
//   jobs    K2: a run stage with `async: true` starts its cmd detached (jobs.mjs) and a later tick collects it; the tick
//           never waits. A timeout, a cmd that cannot start or a job that died is a stage-error (the order holds at its
//           stage), not a revise: `node supervisor.mjs retry --order=<O>` runs it again; `node supervisor.mjs jobs` lists them
//   uat     runs the orderer's hidden acceptance tests (--acceptance=<dir>/<task>.test.mjs) and signs as the orderer;
//           no acceptance file for a task: the order waits at uat for a person (it is never passed by default)
//   ship    claims the release message, copies the module (not the builder's tests) to live/shipped/<task>/, leaves
//   recover expired leases (left without leave: the work goes back to its queue)
//   promote `later` items past their due time
//   pre     M5: a stage's `pre` cmd (adapters/s3c holds.mjs, ledger-gate.mjs) runs once per stage, loop and park before
//           its work is planned; a route to park parks the order with an ask before any session is spent
//   budget  K13: an order at or over its charged budget gets one kind:budget ask, and no session until it is approved
//   plan    which agent sessions to start: `now` items get a fresh session at once; `next` items get a session if the
//           role has none running; `later` items wait for a batch (--batch-later=N) or their due time; a lane whose policy sets
//           maxSessions gets no session past it (M5)
//
//   node supervisor.mjs launched --role=<role> [--msgs=…]   the orchestrator started a session: plan it as starting
//   node supervisor.mjs serve [--acceptance=<dir>] [--idle-min=2] [--max-min=120] [--faults=<json>]   the supervisor as a service
//        (--faults: benchmark fault injection inside the tick, e.g. [{"id":"F3","kind":"drop","task":"P1","stage":"check"}])
//        (benchmark 2: one typed `cycle` per wake made 142% of the current method's actions): runs until the work is
//        done; at every state change it ticks, reserves each planned launch, writes its brief to live/<dir>/outbox/
//        and prints one JSON line per launch: a stream for the orchestrator's monitor, so a wake needs no command
//   node supervisor.mjs usage --finished=<role>:<tokens>,…   record harness usage of finished sessions (batch is fine)
//   node supervisor.mjs cycle [--finished=<role>:<tokens>,…] [watch flags]   the orchestrator's one command per wake
//        (benchmark 1: 20 of 45 orchestrator actions were bookkeeping by hand): records the harness usage of the
//        sessions that finished, watches until a session is needed, reserves every planned launch, and prints a brief
//        per launch, written by code from the order, the pack commands and live/<dir>/CONTEXT.md if present
//   node supervisor.mjs tick  [--acceptance=<dir>] [--batch-later=3] [--cap=4]   one pass; prints steps and the plan
//   node supervisor.mjs watch [--acceptance=<dir>] [--batch-later=3] [--cap=4] [--max-min=30]
//        tick, then wait for a change to the state file or the next lease expiry or due time (a wake, not a poll), and
//        tick again; exits as soon as the plan asks for an agent session (that exit is the orchestrator's wake-up), or
//        after --max-min with nothing to do.
// Same state as meta.mjs (META_LIVE_DIR, META_STATE). Exit 0 always unless the state cannot be read.
import fs from "node:fs";
import path from "node:path";
import { absCmds, HERE, LIVE, STATE, load, save, withLock, runTests, runTest1, runCmdCheck, rep, CHECK_KEYS, interpolate } from "./state.mjs";
import { syncOrders } from "./tracker.mjs";
import { sweepGoals } from "./goals.mjs";
import { expireContracts } from "./contractor.mjs";
import * as CH from "./channels.mjs";
import * as JOBS from "./jobs.mjs";
import * as WS from "./workspace.mjs";
import { isIndependent, packHistory, preKey } from "./lib.mjs";
import { raiseBudgetAsk } from "./asks.mjs";

/** K1: a stage signed by code, or any stage with a `run` cmd (plan 2026-10-21 §3: the lesson flow's stages 2, 3, 4, 8 and 9
 *  are scripts; the old table only knew test1/uat/ship by name). No `run`: test1 as before (the order's text checks or
 *  the builder's tests). With `run`: the cmd decides; code signs a code stage, the orderer a uat-like one, and a release
 *  stage is entered and left by the release role as ship is (code executes, release signs). null: nothing to do yet. */
export function runCodeStage(co, o, s) {
  const { engine, rooms, mailbox } = co;
  const stage = o.stage;
  if (!s?.run) {
    const t = runTest1(o);
    engine.advance(o.id, { stage, by: "code", verdict: t.pass ? "pass" : "revise", findings: t.pass ? null : t.output });
    return { step: stage, order: o.id, result: t.pass ? "pass" : "revise", output: t.output };
  }
  if (s.async) {
    // K2: started detached, collected by a later tick (jobs.collect → applyCmdResult); one job per stage and loop
    if (JOBS.jobFor(co, o)) return null;
    if (s.signer === "release" && (!mailbox.queue("pool:release", "work").some((x) => x.ref === o.id) || !co.org.byLevel("release")[0])) return null;
    const { job, result } = JOBS.start(co, o, s);
    if (result) return applyCmdResult(co, o, s, result);
    return { step: stage, kind: "job", order: o.id, result: "started", job: job.id, output: job.label };
  }
  return applyCmdResult(co, o, s, null);
}

/** Sign stage `s` of order `o` with a cmd result `t` (null: run it now, sync). Shared by the sync path and K2's
 *  collector. A stage-error holds the order where it is (o.stageError), with nothing signed. */
export function applyCmdResult(co, o, s, t) {
  const { engine, rooms, mailbox } = co;
  const stage = o.stage;
  const say = (t) => ({ step: stage, kind: "cmd", order: o.id, result: t.stageError ? "stage-error" : t.pass ? "pass" : t.route === "park" ? "park" : "revise", output: t.output, findings: t.findings, route: t.route });
  // M4 audit (plan §2 ship table): "active publish hold → park + ask"; a route to park signs nothing and spends no loop
  const park = (t) => { engine.parkRouted(o, { by: s.signer === "orderer" ? o.manager : "code", stage, why: t.findings ?? t.output, ask: t.ask ?? null }); return say(t); };
  // K11: a routed failure goes back to the earlier stage its route names (ship's "claims not verified" → check, not a
  // rebuild); the route stays in the findings so the stage it lands on reads why. No route: build, as before
  const to = (t) => (t.pass ? null : t.route ?? null);
  const why = (t) => (t.pass ? null : `${t.output}${t.route ? ` [route: ${t.route}]` : ""}${t.findings ? `\n${t.findings}` : ""}`);
  const err = (t) => { o.stageError = { stage, loops: o.loops, why: t.output, t: engine.clock.now() }; co.log.add({ type: "stage-error", order: o.id, stage, loops: o.loops, why: t.output }); return say(t); };
  if (s.signer === "code") {
    t ??= runCmdCheck(o, s);
    if (t.stageError) return err(t);
    if (t.route === "park") return park(t);
    engine.advance(o.id, { stage, by: "code", verdict: t.pass ? "pass" : "revise", findings: why(t), to: to(t) });
    return say(t);
  }
  if (s.signer === "orderer") {
    t ??= runCmdCheck(o, s);
    if (t.stageError) return err(t);
    if (t.route === "park") return park(t);
    engine.advance(o.id, { stage, by: o.manager, verdict: t.pass ? "pass" : "revise", evidence: `${t.output} (supervisor.mjs)`, findings: why(t), to: to(t) });
    return say(t);
  }
  if (s.signer === "release") {
    const m = mailbox.queue("pool:release", "work").find((x) => x.ref === o.id);
    const rel = co.org.byLevel("release")[0];
    if (!m || !rel) return null;
    t ??= runCmdCheck(o, s);
    if (t.stageError) return err(t); // the release role enters only to sign
    if (t.route === "park") return park(t); // its pool:release message is withdrawn by the park
    const { run } = rooms.enter({ msg: m.id, role: rel.id });
    rooms.leave(run, { verdict: t.pass ? "pass" : "revise", evidence: `${t.output} (supervisor.mjs)`, findings: why(t), learned: null, to: to(t) });
    rooms.closeSession(rooms.runs.get(run).session, `${stage} done`);
    return say(t);
  }
  return null; // validateSpec allows `run` only on code, orderer and release stages
}

/** M5: run stage `sd`'s `pre` cmd for order `o` (sync, under the lock: the pre-checks are quick reads). */
export function runPreCheck(co, o, sd) {
  const { engine, log } = co;
  const stage = o.stage, t = runCmdCheck(o, sd.pre);
  log.add({ type: "pre-check", order: o.id, stage, loops: o.loops, pass: !!t.pass, route: t.route ?? null, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400) });
  const say = (result) => ({ step: stage, kind: "pre", order: o.id, result, output: t.output, findings: t.findings });
  if (t.pass) { o.prechecked = preKey(o); return say("pass"); }
  // M5 review: the check's own ask goes with the park (ledger-gate.mjs's kind:budget, routed by amount)
  if (t.route === "park" && !t.stageError) { engine.parkRouted(o, { by: "code", stage, why: t.findings ?? t.output, ask: t.ask ?? null }); return say("park"); }
  const why = `pre-check: ${t.output}${t.route && !t.stageError ? ` (a pre-check routes only to park, not ${t.route})` : ""}`;
  o.stageError = { stage, loops: o.loops, why, t: engine.clock.now() };
  log.add({ type: "stage-error", order: o.id, stage, loops: o.loops, why });
  return say("stage-error");
}

/** One pass over every order; repeated until nothing changes (an accepted UAT makes a ship step possible). */
export function tick(co, { acceptance = null, faults = null } = {}) {
  const { engine, rooms, mailbox, log } = co;
  const steps = [];
  for (const m of mailbox.promote()) steps.push({ step: "promote", msg: m.id, order: m.ref });
  for (const x of rooms.recover()) steps.push({ step: "recover", run: x.run, role: x.role, order: x.order });
  steps.push(...JOBS.collect(co, { apply: applyCmdResult })); // K2: only what has ended; a running job is left alone
  // K13: an order at or over its charged budget gets one budget ask (the planner below starts no session on it)
  for (const o of engine.orders.values()) { const it = raiseBudgetAsk(co, o); if (it) steps.push({ step: "budget", order: o.id, result: "stopped", output: `${o.spent} of ${o.budget}: ${it.id} to ${it.assignee}` }); }
  let madeOne = false;
  for (let changed = true; changed;) {
    changed = false;
    for (const o of engine.orders.values()) {
      // K7 review: a done order's last commit (after ship) refused or failed was skipped here, so a retry never committed it
      if (o.blocked || (o.stage === "done" && !WS.commitDue(co, o))) continue;
      if (o.stageError?.kind === "workspace") continue; // K5: held until a retry, whatever its stage (K5 review)
      if (o.stageError?.stage === o.stage && o.stageError?.loops === o.loops) continue; // K2: held until a retry
      // K5: the order's worktree, made once when it has a builder (before its first brief names it); a git failure
      // holds the order (WS.hold) until `supervisor.mjs retry`; `room enter` and `room next` refuse its items meanwhile.
      // One worktree is made per tick (K5 review: each add of the 17k-file repo runs under the state lock)
      const off = o.stage === "parked" || o.stage === "cancelled"; // K8: no worktree and no stage work until a resume
      if (o.builder && WS.specOf(co) && !o.workdir && !off) {
        const w = WS.ensure(co, o, { create: !madeOne });
        if (w?.pending) continue; // the next tick makes it
        if (w?.error) {
          WS.hold(co, o, w.error);
          steps.push({ step: o.stage, kind: "workspace", order: o.id, result: "stage-error", output: o.stageError.why });
          continue;
        }
        if (w?.created) madeOne = true;
        if (w) steps.push({ step: "workspace", order: o.id, result: w.created ? "created" : "reused", output: `${w.workdir} (${w.branch} at ${w.sha.slice(0, 7)})` });
      }
      // K7: a commit refused or failed after a stage left; `retry` lifted the hold, so it is tried again here
      if (WS.commitDue(co, o)) {
        const c = WS.afterStage(co, o, o.workspace.pendingCommit.stage);
        if (o.stageError?.kind === "workspace") { steps.push({ step: o.stage, kind: "workspace", order: o.id, result: "stage-error", output: o.stageError.why }); continue; }
        if (c) steps.push({ step: "commit", order: o.id, result: c.sha ? "committed" : "nothing to commit", output: c.sha ?? "" });
      }
      if (o.stage === "done" || off) continue; // only its pending commit was left to do
      const sd = engine.stageDef(o);
      // K12 review: a post on a stage the supervisor signs (a flow defined before validation refused it) holds the order
      // with nothing done: toy ship.post=exit 1 entered, copied to live/shipped, then threw out of tick on every tick
      if (sd?.post && (sd.run || sd.signer === "code" || ["test1", "uat", "ship"].includes(o.stage))) {
        const why = `stage ${o.stage} has a post-check, but the supervisor signs it and runs none: redefine the flow without it, then retry`;
        o.stageError = { stage: o.stage, loops: o.loops, why, t: engine.clock.now() }; log.add({ type: "stage-error", order: o.id, stage: o.stage, loops: o.loops, why });
        steps.push({ step: o.stage, kind: "post", order: o.id, result: "stage-error", output: why });
        continue;
      }
      // M5: a stage's pre-check (holds.mjs, ledger-gate.mjs) runs before its work is planned: a pass lets the planner
      // start it, a route to park parks it with an ask (no session spent), any other failure holds it as a stage-error
      if (engine.preDue(o) && o.builder) { steps.push(runPreCheck(co, o, sd)); changed = true; continue; }
      if (sd?.run || sd?.signer === "code" || o.stage === "test1") {
        const st = runCodeStage(co, o, sd);
        if (st) { steps.push(st); changed = true; }
      } else if (o.stage === "uat") {
        const file = acceptance && path.join(acceptance, `${o.task}.test.mjs`);
        if (!file || !fs.existsSync(file)) { if (!o.uatWaiting) { o.uatWaiting = true; steps.push({ step: "uat-needs-a-person", order: o.id, task: o.task }); } continue; }
        const t = runTests(o.task, { dir: path.dirname(file), files: [path.basename(file)], label: file });
        engine.advance(o.id, { stage: "uat", by: o.manager, verdict: t.pass ? "pass" : "revise", evidence: `hidden acceptance ${o.task}: ${t.output} (supervisor.mjs)`, findings: t.pass ? null : t.output });
        steps.push({ step: "uat", order: o.id, result: t.pass ? "pass" : "revise", output: t.output });
        changed = true;
      } else if (o.stage === "ship") {
        const m = mailbox.queue("pool:release", "work").find((x) => x.ref === o.id);
        const rel = co.org.byLevel("release")[0];
        if (!m || !rel) continue;
        const { run } = rooms.enter({ msg: m.id, role: rel.id });
        const src = path.join(LIVE, "work", o.task), dst = path.join(LIVE, "shipped", o.task);
        fs.mkdirSync(dst, { recursive: true });
        const files = fs.readdirSync(src).filter((f) => (f.endsWith(".mjs") || f.endsWith(".md")) && !f.endsWith(".test.mjs"));
        for (const f of files) fs.copyFileSync(path.join(src, f), path.join(dst, f));
        rooms.leave(run, { evidence: `live/shipped/${o.task}/ (${files.join(", ")})`, learned: null });
        rooms.closeSession(rooms.runs.get(run).session, "ship done");
        steps.push({ step: "ship", order: o.id, files });
        changed = true;
      }
    }
  }
  // regression gate (benchmark 4): after a ship, every shipped order's hidden acceptance runs again; a shipped module
  // that a later change broke goes back to its builder with the failing categories
  if (acceptance && steps.some((x) => x.step === "ship")) {
    for (const o of engine.orders.values()) {
      if (o.stage !== "done") continue;
      const file = path.join(acceptance, `${o.task}.test.mjs`);
      if (!fs.existsSync(file)) continue;
      const t = runTests(o.task, { dir: path.dirname(file), files: [path.basename(file)], label: file });
      if (!t.pass) { engine.reopen(o.id, { by: "code", reason: "regression", findings: `regression: a shipped module no longer passes its acceptance. ${t.output}` }); steps.push({ step: "regression", order: o.id, output: t.output }); }
    }
  }
  // watchdog (benchmark 4): an open order that no message and no run carries is stuck for good (a lost message);
  // after WATCHDOG_MIN it is sent again
  for (const o of engine.orders.values()) {
    if (o.stage === "done" || o.blocked || !o.builder) { o.orphanSince = null; continue; }
    const s = engine.stageDef(o);
    if (!s || s.signer === "code" || s.signer === "orderer" || s.signer === "founder") { o.orphanSince = null; continue; }
    const carried = [...mailbox.msgs.values()].some((m) => m.ref === o.id && m.kind === "work" && m.state === "open" && m.body?.stage === o.stage && m.body?.loops === o.loops)
      || [...rooms.runs.values()].some((x) => x.order === o.id && x.state === "running");
    if (carried) { o.orphanSince = null; continue; }
    const now = engine.clock.now();
    // a step of its own, so `serve` saves it (benchmark 4b: in a quiet company nothing else changed, the mark was
    // never saved, and the lost message was never sent again)
    if (o.orphanSince == null) { o.orphanSince = now; steps.push({ step: "orphaned", order: o.id, stage: o.stage }); continue; }
    if (now - o.orphanSince >= WATCHDOG_MIN) { engine.notifyStage(o, { duplicate: true }); o.orphanSince = null; log.add({ type: "watchdog-resend", order: o.id, stage: o.stage, loops: o.loops }); steps.push({ step: "watchdog", order: o.id, stage: o.stage }); }
  }
  // injected faults for benchmarks (--faults=<json>): applied here, inside the tick, so a trigger cannot be missed
  // between polls (benchmark 4: the poller missed F3's trigger). `drop` deletes the order's open message for a stage
  // as soon as it is sent, before any launch is planned for it.
  if (faults) {
    const fired = new Set(log.events.filter((e) => e.type === "fault-injected").map((e) => e.fault)); // once each
    for (const f of faults) {
      if (fired.has(f.id) || f.kind !== "drop") continue;
      const o = [...engine.orders.values()].find((x) => x.task === f.task && x.stage === f.stage);
      const m = o && [...mailbox.msgs.values()].find((x) => x.ref === o.id && x.kind === "work" && x.state === "open" && x.body?.stage === f.stage && !x.lease);
      if (!m) continue;
      mailbox.msgs.delete(m.id);
      log.add({ type: "fault-injected", fault: f.id, kind: f.kind, order: o.id, msg: m.id });
      steps.push({ step: "fault", fault: f.id, order: o.id, msg: m.id });
    }
  }
  for (const id of expireContracts(co)) steps.push({ step: "contract-expired", contract: id });
  if (co.data) { syncOrders(co); for (const g of sweepGoals(co)) steps.push({ step: "goal-auto-red", goal: g }); }
  if (steps.length) log.add({ type: "supervisor-tick", steps: steps.map((s) => `${s.step}:${s.order ?? s.msg ?? s.run ?? s.contract ?? s.goal}`) });
  return steps;
}

/** Which agent sessions to start now. Pure: reads the state, changes nothing. */
export const LAUNCH_GRACE_MIN = 5;
export const WATCHDOG_MIN = Number(process.env.META_WATCHDOG_MIN ?? 2);
export function plan(co, { batchLater: batchDefault = 3, cap: capDefault = 4 } = {}) {
  const { org, rooms, mailbox, log } = co;
  const running = new Set([...rooms.runs.values()].filter((x) => x.state === "running").map((x) => x.role));
  // A session the orchestrator has started but that has not entered a room yet is starting, not missing (live run 3:
  // the first watch fired 3 s after the launch and asked for the same session again). Past the grace period with no
  // enter, the launch failed and the role is planned again.
  const now = co.engine.clock.now();
  // a launch for work outside rooms (meeting positions, chairing, delegating) does not reserve room work (benchmark 2:
  // writer-1's kickoff launch kept its STYLE build unplanned for the grace period)
  // a launch the launcher reports finished (ok or crashed) reserves nothing any more (benchmark 5: a chair killed
  // mid-meeting held its meeting for the 30-minute grace period)
  // matched by the launch's own id (<seq>-<role>, the brief's name): benchmark 5, an older lead session's finish freed a
  // newer one's reservation and the same ask was planned twice. A finish without that id falls back to role and time.
  const lid = (l) => `${String(l.seq).padStart(4, "0")}-${l.role}`;
  const ended = (l) => log.events.some((e) => e.type === "launch-finished" && (e.launch ? e.launch === lid(l) : e.role === l.role && e.t >= l.t));
  // M5: sessions at work per lane (open with a run or waiting, plus launches not yet entered), for maxSessions
  const load = new Map();
  const laneOf = (role) => org.role(role)?.lane ?? null;
  const bump = (role) => { const l = laneOf(role); if (l != null) load.set(l, (load.get(l) ?? 0) + 1); };
  for (const l of new Set(org.active().map((r) => r.lane).filter((x) => x != null))) load.set(l, rooms.laneLoad(l));
  for (const l of log.events.filter((e) => e.type === "launch" && now - e.t < LAUNCH_GRACE_MIN && !(e.tasks?.length && !e.msgs?.length))) {
    if (!log.events.some((e) => e.type === "enter" && e.role === l.role && e.t >= l.t) && !ended(l)) { running.add(l.role); bump(l.role); }
  }
  const laneFull = (role) => { const l = laneOf(role), cap = co.engine.laneKnobs(l).maxSessions; return cap != null && (load.get(l) ?? 0) >= cap; };
  // a session waiting for its role's next item will take it (room next --wait)
  // until it closes, and for 30 s past its deadline: its last poll can still take an item (benchmark 5: an item that
  // arrived 1 s after a wait ended was taken by the waiting session and by a fresh launch)
  for (const s of rooms.sessions.values()) if (s.open && s.waitUntil != null && s.waitUntil > now - 0.5) running.add(s.role);
  const out = [];
  const consider = (role, queued) => {
    // K5: an order held on its workspace launches no one: `room enter` would refuse its item (K5 review)
    // K13: nor does an order at or over its charged budget (its budget ask waits for a decider)
    // M5: nor one whose stage's pre-check has not run (the next tick runs it first)
    const msgs = queued.filter((m) => co.engine.orders.get(m.ref)?.stageError?.kind !== "workspace" && !co.engine.overBudget(co.engine.orders.get(m.ref)) && !co.engine.preDue(co.engine.orders.get(m.ref)));
    if (!msgs.length) return;
    // the lane's policy, when it sets them, overrides the command-line defaults
    const k = co.engine.policies.get(org.role(role)?.lane)?.active ? co.engine.policies.get(org.role(role).lane).versions[co.engine.policies.get(org.role(role).lane).active - 1].knobs : {};
    const batchLater = k.batchLater ?? batchDefault, cap = k.drainCap ?? capDefault;
    const now = msgs.filter((m) => m.priority === "now");
    // M5: a lane at its policy's session cap (maxSessions) gets no new session, `now` items included
    for (const m of now) { if (laneFull(role)) return; out.push({ role, why: "now: a fresh session at once", msgs: [m.id], cap: 1 }); bump(role); }
    if (running.has(role)) return; // its running session drains next and later items itself
    const next = msgs.filter((m) => m.priority === "next");
    const later = msgs.filter((m) => m.priority === "later");
    const dueLater = later.filter((m) => m.due != null && m.due <= co.engine.clock.now());
    if (next.length || later.length >= batchLater || dueLater.length) {
      // benchmark 1: a cap of 4 left 1 of 5 pages to a whole new reader session (63k for one page). When the remainder
      // is small, the session takes it all: half a cap more costs less than a fresh session's start-up.
      const all = [...next, ...later];
      const take = all.length - cap <= Math.ceil(cap / 2) ? all : all.slice(0, cap);
      // the cap leaves room for items that arrive while the session waits (room next --wait)
      if (laneFull(role)) return;
      out.push({ role, why: next.length ? `next: ${next.length} waiting, no session running` : `later: a batch of ${later.length}`, msgs: take.map((m) => m.id), cap: Math.max(take.length, cap) });
      bump(role);
    }
  };
  // K3/K4: a role signer's items go to role:<id>, and are planned for that role whatever its level (stage 7's
  // head-of-product); no role is planned for an independent stage of an order it built
  const fit = (role) => (m) => co.engine.independentOf(co.engine.orders.get(m.ref), m.body?.stage, role);
  const checker = org.byLevel("checker")[0];
  for (const r of org.active()) {
    if (r.human) continue;
    const named = mailbox.queue(`role:${r.id}`, "work").filter(fit(r.id));
    if (r.id === checker?.id) continue; // the pool is planned once, below, with its own role:<id> items
    if (["founder", "chief-of-staff", "manager", "release", "checker"].includes(r.level)) { if (named.length) consider(r.id, named); continue; }
    consider(r.id, [...mailbox.queue(r.id, "work"), ...named]);
  }
  // An open engagement needs its contractor started once; a launch (any time) counts while the engagement is open.
  for (const c of co.engine.contracts?.values() ?? []) {
    if (c.state !== "open") continue;
    if (log.events.some((e) => e.type === "launch" && e.role === c.contractor)) continue;
    out.push({ role: c.contractor, why: `contract ${c.id} (${c.kind}) open, not started`, msgs: [], contract: c.id, cap: 1 });
  }
  if (checker) consider(checker.id, [...mailbox.queue(`role:${checker.id}`, "work"), ...mailbox.queue("pool:checker", "work")].filter(fit(checker.id)));
  for (const j of judgment(co)) {
    // a launch reserves non-room work until the work is done or NON_ROOM_GRACE_MIN passes (no room enter to watch for)
    if (log.events.some((e) => e.type === "launch" && e.role === j.role && now - e.t < NON_ROOM_GRACE_MIN && !ended(e) && (e.tasks ?? []).some((t) => j.tasks.some((u) => u.kind === t.kind && u.ref === t.ref)))) continue;
    const same = out.find((p) => p.role === j.role);
    if (same) same.tasks = [...(same.tasks ?? []), ...j.tasks]; else out.push(j);
  }
  return out;
}

/** Harness usage for sessions that finished, as role:tokens. The role's latest session without usage gets it; a
 *  role with no such session (work outside a room, such as a meeting position) gets a usage event of its own. */
export function recordFinished(co, finished) {
  const out = [];
  for (const [role, tokens] of finished) {
    if (!co.org.role(role)) throw new Error(`no role ${role}`);
    const has = (id) => co.log.events.some((e) => e.type === "usage" && e.session === id);
    const s = [...co.rooms.sessions.values()].filter((x) => x.role === role && !has(x.id)).at(-1);
    if (s) { if (s.open) co.rooms.closeSession(s.id, "finished (harness)"); co.rooms.recordSessionUsage(s.id, tokens); out.push({ role, session: s.id, tokens }); }
    else { co.log.add({ type: "usage", role, tokens, label: "outside a room", source: "harness", supervisor: true }); out.push({ role, session: null, tokens }); }
  }
  return out;
}

/** The brief for one planned session, written by code: who you are, where, the exact first command, the cap. */
export function briefFor(co, item, { context = null } = {}) {
  const r = co.org.role(item.role);
  const pre = [process.env.META_LIVE_DIR && `META_LIVE_DIR=${process.env.META_LIVE_DIR}`, process.env.META_STATE && `META_STATE=${process.env.META_STATE}`].filter(Boolean).join(" ");
  const first = co.mailbox.msgs.get(item.msgs[0]);
  const o = first ? co.engine.orders.get(first.ref) : null;
  // K5: an order with a worktree is worked in it; meta.mjs still runs from HERE (its state is the live dir's)
  const ws = o?.workspace ? o : null;
  const L = [`You are \`${item.role}\` (${r.level}) in a company run by a CLI.`, "", ws ? `Run every \`node meta.mjs\` command from: ${HERE}` : `Run every command from: ${HERE}`, pre ? `Prefix every command with: ${pre}` : "", ""];
  if (ws) {
    L.push(`Your workdir for ${o.task} is ${o.workdir}: a git worktree of ${o.workspace.repo} on branch ${o.workspace.branch} (from ${o.workspace.base} at ${o.workspace.sha.slice(0, 7)}). Do the work there, and run the repo's own commands from it; never edit another checkout.${Object.keys(o.workspace.env).length ? ` Its env (set it for the repo's commands): ${Object.entries(o.workspace.env).map(([k, v]) => `${k}=${v}`).join(" ")}.` : ""}${item.msgs.length > 1 ? " Each item's pack names its own workdir." : ""}`, "");
  }
  // briefs name ${workdir}, ${task} and ${slug} (K5): CONTEXT.md is written once per company, the workdir once per order
  // only with a spec workspace (K5 review: an older CONTEXT.md's literal ${…} keeps its meaning)
  if (context) L.push((o && WS.specOf(co) ? interpolate(context, { ...(o.workspace?.vars ?? {}), workdir: o.workdir ?? path.join(LIVE, "work", o.task ?? ""), task: o.task ?? "", slug: o.slug ?? o.task ?? "" }) : context).trim(), "");
  const closed = [...(co.data?.meetings?.meetings?.values() ?? [])].filter((m) => m.state === "closed").map((m) => m.id);
  if (closed.length) L.push(`Minutes of closed meetings (decisions you follow): ${closed.map((id) => path.join(LIVE, "minutes", `${id}.md`)).join(", ")}. Never read state files.`, "");
  // open tracker actions assigned to this role travel with the brief (benchmark 2: the kickoff gave writer-1 actions
  // its STYLE brief did not mention)
  const acts = [...(co.data?.tracker?.items?.values() ?? [])].filter((i) => i.kind === "action" && i.assignee === item.role && !["done", "cancelled"].includes(i.state));
  if (acts.length) L.push(`Your open actions (do them in this session when they touch this work; mark each done with \`node meta.mjs item update --id=<ISS> --by=${item.role} --state=done\`):`, ...acts.map((i) => `- ${i.id}: ${i.title}${i.due ? ` (due ${i.due})` : ""}${i.body ? ` · ${i.body}` : ""}`), "");
  // unread announcements travel with the brief (benchmark 4: a changed requirement posted on a channel must reach a
  // session that starts after the post)
  if (co.data?.channels) {
    const un = CH.inbox(co, item.role);
    if (un.length) L.push("Unread announcements for you (read each before you start: `node meta.mjs channel read --by=" + item.role + " --post=<P> --ack`):", ...un.map((p) => `- ${p.post} on ${p.channel}: ${p.title}`), "");
  }
  for (const t of item.tasks ?? []) {
    if (t.kind === "positions") L.push(`Meeting ${t.ref}: read it with \`node meta.mjs meeting show --id=${t.ref}\` (agenda, and the pack if any). For each item ${t.items.join(", ")}, write your own position: \`node meta.mjs meeting position --id=${t.ref} --by=${item.role} --item=<n> --text='…'\`. Positions stay private until the chair reveals them; argue from the order, the goals and what you know, and be specific.`);
    if (t.kind === "chair") L.push(`You chair meeting ${t.ref}: \`node meta.mjs meeting show --id=${t.ref}\`. For each item ${t.items.join(", ")}: write your own position (\`meeting position\`), then \`meeting reveal --id=${t.ref} --by=${item.role} --item=<n>\` (add \`--force\` if someone is missing; they are named in the minutes), read them (\`meeting read\`), and \`meeting decide --id=${t.ref} --by=${item.role} --item=<n> --decision='…'\` (answer every objection with \`--answers\`; follow-ups as \`--actions='[{"title":"…","owner":"<role>","due":"YYYY-MM-DD"}]'\`). Every decision code can check (word limits per line, required text, banned words, which kinds of line are allowed, answers unique across items; e.g. "numbers as digits" is a ban on the number words) also goes in \`--rules='[{"tasks":"<task prefix>","checks":{…}}]'\`: code then checks it on every matching order, open or later (checks: ${CHECK_KEYS.join(", ")}; e.g. \`{"lineMaxWords":[{"prefix":"**Why:**","maxWords":20}],"allowedLines":["# ","**Q","**Answer:**","**Why:**"],"distinctAnswers":{"prefix":"**Answer:**","across":"ROUND"}}\`). ${co.data?.meetings?.meetings?.get(t.ref)?.kind === "wbr" ? `This is a WBR: the pack (\`meeting show\`) holds page 0, hits and misses, roadmap and goals, and leadership asks, all computed by code; cite its numbers, never your own. Close it with \`node meta.mjs wbr close --by=${item.role} --meeting=${t.ref} --summary='3-5 sentences'\` (not \`meeting close\`: that would skip the WBR record), then run \`node meta.mjs goal-review --by=${item.role}\`.` : `Then \`meeting close --id=${t.ref} --by=${item.role}\`.`} The decision text is what builders will follow: make it concrete.`);
  }
  const asks = (item.tasks ?? []).filter((t) => t.kind === "ask").map((t) => t.ref);
  if (asks.length) L.push(`Asks waiting for your decision: ${asks.join(", ")}. Read each (\`node meta.mjs item show --id=<ISS>\`), check the claim against the work (live/<dir>/work/), and decide. If a shipped order must change, reopen it with what is wrong and what is required: \`node meta.mjs order reopen <O> --by=${item.role} --findings='…'\`. An ask about a parked order (K9: it hit its loop cap) is answered by deciding it: \`node meta.mjs order resume <O> --by=${item.role} --reason='…'\` (with what must change) or \`node meta.mjs order cancel <O> --by=${item.role} --reason='…'\`. A budget ask (K13: an order spent its budget) is answered yes to raise the budget by its amount, or no to keep it stopped. Otherwise answer: \`node meta.mjs ask answer --by=${item.role} --id=<ISS> --decision=yes|no|redirect --text='…'\`.`);
  const dlg = (item.tasks ?? []).filter((t) => t.kind === "delegate").map((t) => t.ref);
  if (dlg.length) {
    const lane = r.lane, builders = co.org.active().filter((x) => x.level === "builder" && x.lane === lane).map((x) => x.id);
    L.push(`Orders waiting for a builder: ${dlg.map((id) => `${id} (${co.engine.orders.get(id).task})`).join(", ")}. Split them across your builders (${builders.join(", ")}) and delegate each: \`node meta.mjs order delegate <O> --by=${item.role} --to=<builder> --budget=150000\`. Dependent orders (\`--after\`) wait by themselves; give one builder a run of related items so its session can drain them.`);
  }
  if ((item.tasks ?? []).length) {
    // judgment outside rooms ends here
  } else if (item.contract) {
    L.push(`Read your brief: \`node meta.mjs contract brief --id=${item.contract}\`. Work only in its folder; deliver with the \`contract deliver\` command it names, before the timebox ends.`);
  } else {
    // K6: the first item's stage pack rules; with history:false the brief, like the pack, names no findings or history
    const sd = o ? co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === first.body?.stage) : null, hist = packHistory(sd);
    L.push(`1. Enter: \`node meta.mjs room enter --msg=${item.msgs[0]} --role=${item.role}\`. The JSON pack gives the order, stage, workdir, accept criteria, ${hist ? "findings, history, memory" : "memory"}${sd?.pack?.include?.length || sd?.pack?.exclude?.length ? ", the files you read" : ""} and the exact \`next_with\` and \`leave_with\` commands. Your session cap is ${item.cap} (${item.msgs.length} item${item.msgs.length > 1 ? "s" : ""} queued${o ? `, starting with ${o.task}` : ""}).`);
    if (!hist) L.push(`This stage (${sd.stage}) judges the artifact before the account: its pack leaves out prior findings and build history. Judge the work itself; do not read the builder's notes, earlier reviews, \`flow show\`, \`item show\` or \`events\` for this order before your own findings are written.`);
    // K6 audit: the globs as the pack applies them (the order's ${slug}, ${task}, … filled in)
    const gv = o ? { ...(o.workspace?.vars ?? {}), workdir: o.workdir ?? path.join(LIVE, "work", o.task ?? ""), task: o.task ?? "", slug: o.slug ?? o.task ?? "" } : {};
    if (sd?.pack?.include?.length) L.push(`Read only these in the workdir: ${sd.pack.include.map((g) => interpolate(g, gv)).join(", ")}.`);
    if (sd?.pack?.exclude?.length) L.push(`Never open: ${sd.pack.exclude.map((g) => interpolate(g, gv)).join(", ")}.`);
    if (item.msgs.length > 1 && sd?.pack) L.push("Each item's pack states its own stage's rules.");
    // K4: an independent stage's role reviews, whatever its level (a role signer such as learner-evaluator)
    if (r.level === "checker" || (o && isIndependent(co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === first.body?.stage)))) L.push("2. Check the work against its accept criteria and the shipped work it must agree with. Never fix it. Report defects by class: list every instance of a class, each as what is wrong → what is required.", `3. Hand in with \`next_with\` (\`--cap=${item.cap} --verdict=pass\` or \`--verdict=revise --findings='…'\`, \`--evidence=<path>\`, \`--learned='one line'\`) to take the next item in this session: it waits up to 90 s for one, so always hand in with it, and stop only when it says your session is over.`);
    else L.push("2. Do the work the accept criteria ask, in the workdir only. If the work needs a change in another order's module, do not edit it: raise it with your manager (`node meta.mjs ask raise --by=" + item.role + " --kind=decision --title='…' --why='what is wrong, where, what is required' --due=YYYY-MM-DD`) and say so when you hand in. If the order has `checks`, run `node meta.mjs check --order=<O>` before you hand in: it runs the same test1 code will run.", `3. Hand in with \`next_with\` (\`--cap=${item.cap} --evidence=<path> --learned='one line'\`) to take the next item in this session: it waits up to 90 s for one (a revise of your work often arrives then), so always hand in with it, and stop only when it says your session is over.`);
    L.push("If a command refuses, read the message and fix what it names. If \`room enter\` says the item is held by another run or already done, stop at once and report it: another session has it, so never wait for a lease (benchmark 5: a session waited 30 minutes for one).");
  }
  L.push("", "Report back briefly: each item, its outcome, and anything that confused you.");
  return absCmds(L.filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n")); // K10: absolute with META_KERNEL_ABS
}

export const NON_ROOM_GRACE_MIN = 30;
/** Judgment work that happens outside rooms, found from the record (benchmark 1: I planned these by hand):
 *  - an open meeting's invitees with positions still to write (agents only; a missing person is named at reveal)
 *  - an open meeting whose positions are all in: the chair reveals, decides and closes
 *  - orders at build with no builder: their manager delegates
 *  One plan item per role, with its tasks in order (chair before delegate: decisions shape delegation). */
export function judgment(co) {
  const { org, engine } = co;
  const by = new Map();
  const add = (role, task) => { if (!org.role(role)?.active || org.role(role).human) return; (by.get(role) ?? by.set(role, []).get(role)).push(task); };
  for (const m of co.data?.meetings?.meetings?.values() ?? []) {
    if (m.state !== "open") continue;
    const open = m.agenda.filter((a) => !a.decision && !a.deferred);
    const waiting = new Set();
    for (const a of open) { const r = a.rounds.at(-1); if (r.revealed) continue; for (const i of m.invitees) if (i !== m.chair && !r.positions[i] && !org.role(i)?.human) waiting.add(i); }
    for (const i of waiting) add(i, { kind: "positions", ref: m.id, items: open.filter((a) => !a.rounds.at(-1).revealed && !a.rounds.at(-1).positions[i]).map((a) => a.n) });
    if (!waiting.size && open.length) add(m.chair, { kind: "chair", ref: m.id, items: open.map((a) => a.n) });
  }
  // a manager chairing an open meeting delegates after it decides (the kickoff's decisions shape who builds what)
  const chairing = new Set([...(co.data?.meetings?.meetings?.values() ?? [])].filter((m) => m.state === "open").map((m) => m.chair));
  for (const o of engine.orders.values()) if (o.stage === "build" && !o.builder) { if (chairing.has(o.manager) && !by.get(o.manager)?.some((t) => t.kind === "chair")) continue; add(o.manager, { kind: "delegate", ref: o.id }); }
  // an open ask to an agent decider is its work (benchmark 5: an integrator that finds a defect in another slot's
  // module asks the lead, who reopens that module)
  for (const it of co.data?.tracker?.items?.values() ?? []) if (it.kind === "ask" && !["done", "cancelled"].includes(it.state) && it.assignee) add(it.assignee, { kind: "ask", ref: it.id });
  return [...by].map(([role, tasks]) => {
    tasks.sort((a, b) => ["chair", "positions", "ask", "delegate"].indexOf(a.kind) - ["chair", "positions", "ask", "delegate"].indexOf(b.kind));
    return { role, why: [...new Set(tasks.map((t) => t.kind))].map((k) => `${k}: ${tasks.filter((t) => t.kind === k).map((t) => t.ref).join(", ")}`).join("; "), msgs: [], cap: 1, tasks };
  });
}

/** When to wake next without polling: the nearest lease expiry or due time, in ms (null: only on a state change). */
export function nextTimer(co) {
  const now = co.engine.clock.now();
  const ts = [co.mailbox.nextExpiry(), ...[...co.mailbox.msgs.values()].filter((m) => m.state === "open" && m.priority === "later" && m.due != null).map((m) => m.due),
    // the watchdog's resend is due WATCHDOG_MIN after an order was first seen orphaned
    ...[...co.engine.orders.values()].filter((o) => o.orphanSince != null).map((o) => o.orphanSince + WATCHDOG_MIN),
    // K2: a running job's backstop (its wrapper died or hangs past its timeout); a job that ends wakes waitForChange
    ...JOBS.deadlines(co)].filter((t) => t != null);
  if (!ts.length) return null;
  return Math.max(0, (Math.min(...ts) - now) * 60000) + 50;
}

function once(opts) {
  return withLock(() => {
    const co = load();
    const steps = tick(co, opts);
    save(co);
    return { steps, plan: plan(co, opts), wakeInMs: nextTimer(co) };
  });
}

async function watch(opts, maxMin) {
  const end = Date.now() + maxMin * 60000;
  const all = [];
  for (;;) {
    const r = once(opts);
    all.push(...r.steps);
    if (r.plan.length) return { exit: "agent sessions needed", steps: all, plan: r.plan };
    if (Date.now() >= end) return { exit: "idle", steps: all, plan: [] };
    await waitForChange(Math.min(r.wakeInMs ?? Infinity, end - Date.now()));
  }
}

/** Sleep until the state file changes, a job writes its exit record (K2: a QA that ends must not wait for the 60 s
 *  fallback or a lease), or `ms` passes (Infinity: no timer). */
function waitForChange(ms) {
  fs.mkdirSync(JOBS.JOBS, { recursive: true });
  return new Promise((resolve) => {
    const name = path.basename(STATE);
    const ws = [fs.watch(path.dirname(STATE), (ev, f) => { if (f === name) done(); }), fs.watch(JOBS.JOBS, (ev, f) => { if (String(f).endsWith(".exit.json")) done(); })];
    const t = Number.isFinite(ms) ? setTimeout(done, Math.max(50, ms)) : null;
    let fired = false;
    function done() { if (fired) return; fired = true; for (const w of ws) w.close(); if (t) clearTimeout(t); setTimeout(resolve, 200); } // let the writer finish
  });
}

/** Reserve each planned launch and write its brief; returns the launches. Shared by `cycle` and `serve`. */
export function reserve(co, planned, { context = null, outbox = null } = {}) {
  return planned.map((p) => {
    const e = co.log.add({ type: "launch", role: p.role, msgs: p.msgs, tasks: p.tasks ?? [], why: `plan: ${p.why}` });
    const brief = briefFor(co, p, { context });
    let file = null;
    if (outbox) { fs.mkdirSync(outbox, { recursive: true }); file = path.join(outbox, `${String(e.seq).padStart(4, "0")}-${p.role}.md`); fs.writeFileSync(file, brief); }
    return { ...p, launch: e.seq, file, brief };
  });
}

/** Is anything left to do? Open orders, or open meetings. */
export function settled(co) {
  // K7 review: a done order whose last commit is pending (held, or due on the next tick) is work left; only while the
  // spec still commits (K7 review 2)
  // K8: a cancelled order is settled; a parked one is not (its ask waits for a decision)
  return [...co.engine.orders.values()].every((o) => o.stage === "cancelled" || (o.stage === "done" && !WS.commitDue(co, o))) && ![...(co.data?.meetings?.meetings?.values() ?? [])].some((m) => m.state === "open");
}

async function serve(opts, { idleMin = 2, maxMin = 120 } = {}) {
  const end = Date.now() + maxMin * 60000;
  const ctxFile = path.join(LIVE, "CONTEXT.md");
  const outbox = path.join(LIVE, "outbox");
  const say = (x) => console.log(JSON.stringify(x));
  // one supervisor per state (live run 4: two serves on one state would reserve the same launches twice)
  const pidFile = path.join(LIVE, "serve.pid");
  if (fs.existsSync(pidFile)) {
    const other = Number(fs.readFileSync(pidFile, "utf8"));
    let alive = false; try { process.kill(other, 0); alive = other !== process.pid; } catch { alive = false; }
    if (alive) { say({ event: "refused", why: `another serve (pid ${other}) runs on this state` }); process.exitCode = 1; return; }
  }
  fs.writeFileSync(pidFile, String(process.pid));
  const release = () => { try { if (Number(fs.readFileSync(pidFile, "utf8")) === process.pid) fs.unlinkSync(pidFile); } catch {} };
  process.on("exit", release); for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => { release(); process.exit(0); });
  let quietSince = Date.now();
  say({ event: "serving", live: LIVE, outbox });
  for (;;) {
    const r = withLock(() => {
      const co = load();
      const steps = tick(co, opts);
      const context = fs.existsSync(ctxFile) ? fs.readFileSync(ctxFile, "utf8") : null;
      const launches = reserve(co, plan(co, opts), { context, outbox });
      if (steps.length || launches.length) save(co); // saving wakes the watcher: only when something changed
      return { steps, launches, settled: settled(co), wakeInMs: nextTimer(co) };
    });
    if (r.steps.length) say({ event: "steps", steps: r.steps.map((x) => `${x.step}:${x.order ?? x.msg ?? x.run ?? x.contract ?? x.goal}${x.result ? ":" + x.result : ""}`) });
    for (const l of r.launches) say({ event: "launch", role: l.role, why: l.why, cap: l.cap, msgs: l.msgs, brief: l.file });
    if (r.steps.length || r.launches.length) quietSince = Date.now();
    if (r.settled && Date.now() - quietSince >= idleMin * 60000) { say({ event: "done", why: "every order is done and no meeting is open" }); return; }
    if (Date.now() >= end) { say({ event: "stopped", why: `--max-min=${maxMin}` }); return; }
    // wake on a state change, the next lease or due time, or a minute (launch reservations expire by time)
    await waitForChange(Math.min(r.wakeInMs ?? Infinity, 60000, end - Date.now(), r.settled ? idleMin * 60000 : Infinity));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const opt = {};
  for (const a of argv) if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; }
  const opts = { acceptance: opt.acceptance ?? null, batchLater: Number(opt["batch-later"] ?? 3), cap: Number(opt.cap ?? 4), faults: opt.faults ? JSON.parse(fs.readFileSync(opt.faults, "utf8")) : null };
  const cmd = argv.find((a) => !a.startsWith("--"));
  const print = (x) => console.log(absCmds(JSON.stringify(x, rep, 2))); // K10: as meta.mjs out
  if (cmd === "launched") {
    // The orchestrator records each session it starts, so the next plan does not ask for it again.
    if (!opt.role) { console.error("usage: node supervisor.mjs launched --role=<role> [--msgs=M-1,M-2] [--why=…]"); process.exit(2); }
    print(withLock(() => { const co = load(); const e = co.log.add({ type: "launch", role: opt.role, msgs: opt.msgs ? String(opt.msgs).split(",") : [], tasks: opt.tasks ? String(opt.tasks).split(",").map((x) => { const [kind, ref] = x.split(":"); return { kind, ref }; }) : [], why: opt.why ?? null }); save(co); return e; }));
  } else if (cmd === "serve") {
    serve(opts, { idleMin: Number(opt["idle-min"] ?? 2), maxMin: Number(opt["max-min"] ?? 120) });
  } else if (cmd === "usage") {
    // a batch after the run (live run 4): by session id (S-n:tokens) is exact; by role (role:tokens) takes the role's
    // latest session without usage; --outside=role:tokens is work outside any room (meeting positions, chairing)
    const pairs = (v) => String(v ?? "").split(",").filter(Boolean).map((x) => { const [r, t] = x.split(":"); return [r, Number(t)]; });
    print(withLock(() => {
      const co = load();
      const out = [];
      for (const [k, t] of pairs(opt.finished)) {
        if (/^S-\d+$/.test(k)) { co.rooms.recordSessionUsage(k, t); out.push({ session: k, tokens: t }); }
        else out.push(...recordFinished(co, [[k, t]]));
      }
      for (const [r, t] of pairs(opt.outside)) { if (!co.org.role(r)) throw new Error(`no role ${r}`); co.log.add({ type: "usage", role: r, tokens: t, label: "outside a room", source: "harness", supervisor: true }); out.push({ role: r, session: null, tokens: t }); }
      save(co);
      return out;
    }));
  } else if (cmd === "cycle") {
    const finished = opt.finished ? String(opt.finished).split(",").map((x) => { const [r, t] = x.split(":"); return [r, Number(t)]; }) : [];
    const usage = finished.length ? withLock(() => { const co = load(); const u = recordFinished(co, finished); save(co); return u; }) : [];
    const ctxFile = path.join(LIVE, "CONTEXT.md");
    const context = fs.existsSync(ctxFile) ? fs.readFileSync(ctxFile, "utf8") : null;
    watch(opts, Number(opt["max-min"] ?? 30)).then((w) => {
      const launches = w.plan.length ? withLock(() => {
        const co = load();
        const out = w.plan.map((p) => { co.log.add({ type: "launch", role: p.role, msgs: p.msgs, tasks: p.tasks ?? [], why: `cycle: ${p.why}` }); return { ...p, brief: briefFor(co, p, { context }) }; });
        save(co);
        return out;
      }) : [];
      print({ usage, exit: w.exit, steps: w.steps, launch: launches });
    });
  } else if (cmd === "retry") {
    // K2: a stage-error (a job that timed out, could not start or died) holds the order; this clears it, and the next
    // tick runs the stage again, as the same loop (it was not the work's fault)
    if (!opt.order) { console.error("usage: node supervisor.mjs retry --order=<O>"); process.exit(2); }
    print(withLock(() => {
      const co = load(); const o = co.engine.orders.get(opt.order);
      if (!o?.stageError) { process.exitCode = 1; return { refused: `${opt.order} has no stage-error` }; }
      const was = o.stageError; delete o.stageError;
      co.log.add({ type: "stage-retry", order: o.id, stage: was.stage, loops: was.loops, by: opt.by ?? null });
      save(co); return { order: o.id, stage: o.stage, retried: was.why };
    }));
  } else if (cmd === "jobs") print(withLock(() => Object.values(JOBS.jobsOf(load()))));
  else if (cmd === "tick") print(once(opts));
  else if (cmd === "watch") watch(opts, Number(opt["max-min"] ?? 30)).then(print);
  else { console.error("usage: node supervisor.mjs tick|watch|serve|cycle|retry|jobs [--acceptance=<dir>] [--batch-later=3] [--cap=4] [--max-min=30]"); process.exit(2); }
}
