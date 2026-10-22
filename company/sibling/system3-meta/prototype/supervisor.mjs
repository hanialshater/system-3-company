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
//           maxSessions gets no session past it (M5). M6 prep: a role with spec `sessions: N` gets up to N at once (one
//           item each while sessions are free); spec policy.levelCaps {<level>: N} caps the sessions of a level's roles (K17)
//   exports M6 prep: spec `exports` (the chief of staff's founder-inbox export, adapters/s3c/inbox-export.mjs) run by
//           code after a tick's changes are saved: on every tick, or only when the state changed since their last run
//   host    K17: with spec policy.host, no session is planned while the 1-minute load passes maxLoadPerCpu × cpus or the
//           workspace's free disk falls under minFreeGB (a `host-hold` event per change; META_HOST_PROBE fakes the probe)
//
//   schedule K18 (M7): spec `schedulers` (the ritual scheduler, adapters/s3c/rituals.mjs due) run at most once per
//           minIntervalMin inside the tick; each order its JSON names is placed in the scheduler's flow, as its role's,
//           unless an order of the same key is still open (one open order per ritual); a company with a scheduler is
//           never "done" for serve (it serves until --max-min)
//   gate    K20 (M7): spec `launchGate` (dispatch-check.mjs for a demo-builder's build) runs before a planned session is
//           reserved (serve, cycle); a refusal reserves nothing, logs `launch-gate`, sends one notice to the chief of
//           staff's mailbox (in its next brief) and holds the item for retryMin; a pass goes on the launch event
//   resume  K22 (M7): serve records serve-start/serve-stop; --max-min reached saves a serve-stop and exits 0; a serve
//           started on a worked state logs serve-resume: leases and runs stand, its K2 jobs are re-adopted (or found
//           lost: a stage-error at the next collect), launches reserved and not entered stay reserved for their grace
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
import os from "node:os";
import path from "node:path";
import { absCmds, HERE, LIVE, STATE, load, save, withLock, runTests, runTest1, runCmdCheck, runCmdJson, rep, CHECK_KEYS, interpolate, sessionRole, detachedProcess, briefVars, storeVars } from "./state.mjs";
import { syncOrders, update as updateItem } from "./tracker.mjs";
import { sweepGoals } from "./goals.mjs";
import { expireContracts } from "./contractor.mjs";
import * as CH from "./channels.mjs";
import * as JOBS from "./jobs.mjs";
import * as WS from "./workspace.mjs";
import { isIndependent, packHistory, preKey, lanesOf, Refused } from "./lib.mjs";
import { raiseBudgetAsk } from "./asks.mjs";
import { applyActs } from "./acts.mjs";
import { storeArtifacts, snapshotArtifacts } from "./artifacts.mjs";
import { learnTick, learnPending, reviewerRoles, independentAuthor, RULE_MAX_CHARS as LEARN_RULE_MAX } from "./learn.mjs";

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
    if (s.artifacts) snapshotArtifacts(co, o, s, { stage }); // K24 review: the pass keeps only what this job makes
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
  // K24: a passing cmd stage stores its artifacts before it is signed; a required one that cannot be stored holds the
  // order as a stage-error (nothing signed: `supervisor.mjs retry` runs the stage again), not a pass
  const kept = (t) => { if (!t.pass || !s.artifacts) return null; const a = storeArtifacts(co, o, s, { stage }); return a?.stageError ? err({ ...t, pass: false, stageError: true, output: `${t.output}; ${a.why}` }) : null; };
  // K24 review: a cmd run here (t null) notes the stage's files first, so only what it makes is kept (a job noted them
  // when it started, runCodeStage)
  if (t == null && s.artifacts) snapshotArtifacts(co, o, s, { stage });
  if (s.signer === "code") {
    t ??= s.acts ? runCmdJson(o, s) : runCmdCheck(o, s); // K23: a stage with acts reads its cmd's last JSON line
    if (t.stageError) return err(t);
    if (t.route === "park") return park(t);
    { const held = kept(t); if (held) return held; }
    engine.advance(o.id, { stage, by: "code", verdict: t.pass ? "pass" : "revise", findings: why(t), to: to(t) });
    // K23: what the passed stage decided for other orders (a Demo Crit's revise → reopen, kill → cancel), applied as
    // its chair's under this lock; the steps go out with the stage's own
    const acted = t.pass && s.acts ? applyActs(co, o, s, t.json?.acts, { stage }) : [];
    return acted.length ? { ...say(t), acts: acted } : say(t);
  }
  if (s.signer === "orderer") {
    t ??= runCmdCheck(o, s);
    if (t.stageError) return err(t);
    if (t.route === "park") return park(t);
    { const held = kept(t); if (held) return held; }
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
    { const held = kept(t); if (held) return held; }
    const { run } = rooms.enter({ msg: m.id, role: rel.id });
    rooms.leave(run, { verdict: t.pass ? "pass" : "revise", evidence: `${t.output} (supervisor.mjs)`, findings: why(t), learned: null, to: to(t), stored: !!s.artifacts });
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

/** K17 (plan §M6, dispatch-check C4): the host as the planner sees it, { load, cpus, freeGB }. META_HOST_PROBE (a JSON
 *  object with any of those keys) stands in for it in tests; otherwise os.loadavg()[0], os.cpus().length, and the free
 *  space (fs.statfsSync: bavail × bsize) of the workspace root (its nearest existing ancestor), else the live dir. */
export function hostProbe(co) {
  const fake = process.env.META_HOST_PROBE ? JSON.parse(process.env.META_HOST_PROBE) : {};
  let dir = co.spec?.workspace?.root ?? LIVE;
  while (!fs.existsSync(dir) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  const free = () => { const f = fs.statfsSync(dir); return (f.bavail * f.bsize) / 2 ** 30; };
  return { load: fake.load ?? os.loadavg()[0], cpus: fake.cpus ?? os.cpus().length, freeGB: fake.freeGB ?? free(), dir };
}
/** K17: is the host held? spec policy.host {maxLoadPerCpu (2), minFreeGB (10)}: held when the 1-minute load passes
 *  maxLoadPerCpu × cpus or the workspace's free space falls under minFreeGB; no policy.host, never held. The state is
 *  kept in co.data.host, and a `host-hold` event (held true or false) is logged once per change: a step, so it is saved. */
export function hostCheck(co, probe = hostProbe) {
  const H = co.spec?.policy?.host;
  if (!H) return null;
  const maxLoad = H.maxLoadPerCpu ?? 2, minFree = H.minFreeGB ?? 10;
  let p;
  try { p = probe(co); } catch (e) { p = { error: String(e?.message ?? e) }; }
  const why = p.error ? `host probe failed: ${p.error}` : [p.load > maxLoad * p.cpus && `load ${p.load.toFixed(2)} > ${maxLoad} × ${p.cpus} cpus`, p.freeGB < minFree && `${p.freeGB.toFixed(1)} GB free on ${p.dir ?? "the workspace"} < ${minFree} GB`].filter(Boolean).join("; ");
  const held = !!why, was = co.data.host?.held ?? false;
  co.data.host = { held, why: why || null, load: p.load ?? null, cpus: p.cpus ?? null, freeGB: p.freeGB ?? null };
  if (held === was) return null;
  co.log.add({ type: "host-hold", held, why: why || "clear", load: p.load ?? null, cpus: p.cpus ?? null, freeGB: p.freeGB ?? null });
  return { step: "host", result: held ? "hold" : "clear", output: why || `load ${p.load?.toFixed?.(2)} of ${maxLoad} × ${p.cpus} cpus, ${p.freeGB?.toFixed?.(1)} GB free` };
}

/** M6 prep (plan §M5 exit criterion 2: the founder inbox "is written on the sandbox branch only, by the chief-of-staff
 *  role's code step"): spec `exports: [{id, role, every: "change"|"tick", run: {cmd}}]`, run by code after each tick
 *  under the lock, once the tick's changes are saved (an exporter reads the state file: adapters/s3c/inbox-export.mjs).
 *  "change": only when an event other than the supervisor's own tick and export records was logged since its last run;
 *  "tick": every tick. Each run is an `export` event (by its role) and co.data.exports[id]; a failure is recorded and
 *  retried on the next due tick, and never holds an order. Returns the exports that ran. */
export const EXPORT_QUIET = ["supervisor-tick", "export", "serve-stop", "serve-resume", "serve-start", "scheduler-run"];
export function runExports(co) {
  const ex = co.spec?.exports ?? [];
  if (!ex.length) return [];
  co.data.exports ??= {};
  const last = co.log.events.findLast((e) => !EXPORT_QUIET.includes(e.type))?.seq ?? 0;
  const ran = [];
  for (const x of ex) {
    const rec = co.data.exports[x.id];
    if (x.every !== "tick" && rec && rec.seq >= last) continue;
    // a cmd of no order: ${live} and ${stage} (the export's id) are its variables; it runs in the live dir
    const t = runCmdJson({ id: "", task: "", workdir: LIVE }, x.run, { stage: x.id });
    // M7 (board-mirror.mjs): an export may hand back the outside ids it gave Meta's orders, {labels: {<O>: ["ext:W-12"]}}:
    // code puts each on the order's tracker item (only `ext:<SYS>-<id>` labels, one per system: a new W id replaces the old)
    const labelled = t.pass ? applyExportLabels(co, t.json?.labels) : [];
    co.data.exports[x.id] = { seq: last, t: co.engine.clock.now(), pass: !!t.pass, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400) };
    co.log.add({ type: "export", id: x.id, by: x.role, pass: !!t.pass, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400), findings: t.findings ? String(t.findings).slice(0, 600) : null, ...(labelled.length ? { labelled } : {}) });
    ran.push({ step: "export", id: x.id, result: t.pass ? "pass" : t.stageError ? "stage-error" : "findings", output: t.output });
  }
  return ran;
}

/** M7: put an export's outside ids on the orders' tracker items. `labels` is {<order id>: [<label>, …]}; a label is
 *  `ext:<SYS>-<id>` (ext:W-12, a company board id), and an order keeps one per system (a new one replaces the old).
 *  Anything else is ignored. Returns ["O-1 ext:W-12", …] for the labels it changed. */
export const EXT_LABEL = /^ext:([A-Za-z]+)-[A-Za-z0-9._-]{1,40}$/;
export function applyExportLabels(co, labels) {
  if (!labels || typeof labels !== "object" || Array.isArray(labels)) return [];
  const items = [...(co.data?.tracker?.items?.values() ?? [])].filter((i) => i.kind === "order");
  const out = [];
  for (const [oid, ls] of Object.entries(labels)) {
    const it = items.find((i) => i.order === oid);
    if (!it || !co.engine.orders.has(oid)) continue;
    for (const l of [].concat(ls ?? [])) {
      const m = typeof l === "string" ? EXT_LABEL.exec(l) : null;
      if (!m || it.labels.includes(l)) continue;
      const old = it.labels.filter((x) => x.startsWith(`ext:${m[1]}-`));
      updateItem(co, { by: "engine", id: it.id, addLabels: [l], ...(old.length ? { removeLabels: old } : {}) });
      out.push(`${oid} ${l}`);
    }
  }
  return out;
}

/** K18 (plan §M7, the ritual scheduler): spec `schedulers: [{id, role, flow, every: "tick", minIntervalMin, run}]`.
 *  On each tick (at most once per minIntervalMin, kept in co.data.schedulers) code runs the cmd as the role's (the
 *  chief of staff's: adapters/s3c/rituals.mjs due), reads its last JSON line {orders: [{key, title, task, accept,
 *  slug, chair, attendee, to, budget, priority}]} and places each as an order of `flow`, by `role`, unless an order
 *  of the same key is still open (one open order per ritual: not done and not cancelled). A failed run is recorded
 *  (a `scheduler-run` event) and tried again at the next interval; it never holds anything. Returns the steps. */
export function runSchedulers(co) {
  const list = co.spec?.schedulers ?? [];
  if (!list.length) return [];
  co.data.schedulers ??= {};
  const now = co.engine.clock.now(), steps = [];
  for (const x of list) {
    const rec = co.data.schedulers[x.id];
    if (rec?.ended) continue; // M7: a scheduler that said the run is over places nothing more
    if (rec && now - rec.t < (x.minIntervalMin ?? 1)) continue;
    const t = runCmdJson({ id: "", task: "", workdir: LIVE }, x.run, { stage: x.id });
    const placed = [], skipped = [], refused = [];
    const want = t.pass && Array.isArray(t.json?.orders) ? t.json.orders : [];
    for (const w of want) {
      const key = typeof w?.key === "string" && /^[\w:.-]{1,80}$/.test(w.key) ? w.key : null;
      if (!key) { refused.push({ key: String(w?.key ?? "?").slice(0, 80), why: "a scheduled order has a key ([A-Za-z0-9_:.-], at most 80)" }); continue; }
      // M7 review: an open order of the same ritual placed by hand (`order new --flow=ritual --slug=wbr`, no schedKey)
      // counts too, or the scheduler placed a second order for the record that one already holds
      const sameRitual = (o) => o.schedKey === key || (w?.slug != null && o.slug === w.slug && String(o.flow).split("@")[0] === x.flow);
      const open = [...co.engine.orders.values()].find((o) => sameRitual(o) && !["done", "cancelled"].includes(o.stage));
      if (open) { skipped.push({ key, order: open.id, stage: open.stage }); continue; }
      try {
        for (const k of ["title", "task", "accept"]) if (typeof w[k] !== "string" || !w[k].trim()) throw new Refused(`${key}: ${k} is a non-empty string`);
        if (!/^[A-Za-z0-9][\w.-]{0,80}$/.test(w.task)) throw new Refused(`${key}: task is a name ([A-Za-z0-9_.-])`);
        if (w.slug != null && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(w.slug)) throw new Refused(`${key}: slug is kebab-case`);
        if ([...co.engine.orders.values()].some((o) => o.task === w.task)) throw new Refused(`${key}: task ${w.task} is another order's`);
        // M7 review: the cmd's budget is adapter output: a word became NaN (saved as null) and a negative one was taken,
        // and Engine.overBudget is false for both, so the order had no K13 stop at all
        const budget = w.budget ?? x.budget ?? 200_000;
        if (!Number.isInteger(budget) || budget <= 0) throw new Refused(`${key}: budget is a whole number of tokens above 0, not ${JSON.stringify(budget)}`);
        const o = co.engine.orderNew({ flow: x.flow, by: x.role, to: w.to ?? null, chair: w.chair ?? null, attendee: w.attendee ?? null, budget, accept: w.accept, title: w.title, priority: ["now", "next", "later"].includes(w.priority) ? w.priority : "next" });
        o.task = w.task; if (w.slug) o.slug = w.slug; o.schedKey = key; o.scheduledBy = x.id;
        co.log.add({ type: "scheduled", scheduler: x.id, key, order: o.id, by: x.role, flow: o.flow, task: o.task });
        placed.push({ key, order: o.id });
        steps.push({ step: "scheduled", order: o.id, result: key, output: `${x.id}: ${o.title}` });
      } catch (e) { if (!e.refused && !(e instanceof Refused)) throw e; refused.push({ key, why: String(e.message).slice(0, 300) }); }
    }
    co.data.schedulers[x.id] = { t: now, pass: !!t.pass, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400), placed: placed.length, skipped: skipped.length, refused: refused.length };
    // M7 (exit criterion 5, the cycle's end): a passing run whose JSON says `end: "<why>"` ends the scheduler: it is not
    // run again, and serve may settle (every order done and every scheduler ended). The end is an event of its own
    const end = t.pass && typeof t.json?.end === "string" && t.json.end.trim() ? t.json.end.trim().slice(0, 400) : null;
    if (end) { co.data.schedulers[x.id].ended = { why: end, t: now }; co.log.add({ type: "scheduler-end", id: x.id, by: x.role, why: end }); }
    co.log.add({ type: "scheduler-run", id: x.id, by: x.role, pass: !!t.pass, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400), placed, skipped, refused, ...(t.pass ? {} : { findings: t.findings ? String(t.findings).slice(0, 600) : null }) });
    // a step of its own, so serve saves the run's time (the interval holds across serve's loads; minIntervalMin > 0)
    steps.push({ step: "scheduler", order: x.id, result: end ? "ended" : t.pass ? `${placed.length} placed, ${skipped.length} open` : t.stageError ? "stage-error" : "findings", output: end ?? t.output });
  }
  return steps;
}

/** K20 (plan §M7, the pre-launch gate): spec `launchGate` ({id, roles, stages, run, notify, retryMin}, or a list).
 *  Before a planned session is reserved, code runs the gate cmd of every gate that matches it, once for each of its
 *  items (M7 review: a batch was gated only for its first item's order and worktree): an item is a work message (its
 *  stage), a judgment task (its kind) or a contract, and a gate matches it when its role is in `roles` and its stage or
 *  kind is in `stages` (an unset list matches all). Each run is in the worktree of the item's order, with ${role},
 *  ${launch} (that item's order and task), ${running} and ${builders} (sessions in flight before this one:
 *  dispatch-check's --running and --builders). Every item passes: the launch is reserved and the gates' results go on
 *  its launch event. Any item refused: no reservation, a `launch-gate` event, and one notice for that item (keyed by
 *  gate, role and item, so a regrouped batch is the same work: M7 review) in the `notify` role's mailbox (the chief of
 *  staff's); the item is not gated again for retryMin minutes (default 5), so a refusal holds it without a hot loop.
 *  `memo` keeps this pass's results across planGated's rounds. Returns { pass: [planned items, each with .gate],
 *  steps, refused: [item ids] }. */
export const gatesOf = (co) => [].concat(co.spec?.launchGate ?? []).filter(Boolean);
export function inFlight(co) {
  const now = co.engine.clock.now(), { rooms, org, log } = co;
  const busy = new Set([...rooms.runs.values()].filter((x) => x.state === "running").map((x) => x.session));
  const live = [...rooms.sessions.values()].filter((s) => s.open && (busy.has(s.id) || (s.waitUntil != null && s.waitUntil > now - 0.5)));
  const lid = (l) => `${String(l.seq).padStart(4, "0")}-${l.role}`;
  const ended = (l) => log.events.some((e) => e.type === "launch-finished" && (e.launch ? e.launch === lid(l) : e.role === l.role && e.t >= l.t));
  const entered = (l) => [...rooms.sessions.values()].some((s) => s.launch === lid(l)) || log.events.some((e) => e.type === "enter" && e.role === l.role && e.t >= l.t);
  const pending = log.events.filter((e) => e.type === "launch" && now - e.t < LAUNCH_GRACE_MIN && !entered(e) && !ended(e));
  const roles = [...live.map((s) => s.role), ...pending.map((l) => l.role)].filter((r) => !org.role(r)?.human);
  return { agents: roles.length, builders: roles.filter((r) => org.role(r)?.level === "builder").length };
}
/** The items a planned launch is gated by: { unit, kind, order, msg }. A unit id is what plan's `skip` takes. */
export function gateUnits(co, p) {
  return [
    ...(p.msgs ?? []).map((id) => co.mailbox.msgs.get(id)).filter(Boolean).map((m) => ({ unit: m.id, kind: m.body?.stage ?? null, order: co.engine.orders.get(m.ref) ?? null, msg: m.id })),
    ...(p.tasks ?? []).map((t) => ({ unit: `${t.kind}:${t.ref}`, kind: t.kind, order: co.engine.orders.get(t.ref) ?? null, ref: t.ref, msg: null })),
    ...(p.contract ? [{ unit: `contract:${p.contract}`, kind: null, order: null, ref: p.contract, msg: null }] : []),
  ];
}
const noticeKey = (key) => `launch-gate:${key}`;
export function gateLaunches(co, planned, memo = new Map()) {
  const gates = gatesOf(co);
  if (!gates.length || !planned.length) return { pass: planned, steps: [], refused: [] };
  co.data.gates ??= {};
  const now = co.engine.clock.now(), steps = [], pass = [], refused = [];
  const flight = inFlight(co);
  for (const p of planned) {
    const builder = co.org.role(p.role)?.level === "builder";
    const results = [], passed = [], held = [];
    for (const u of gateUnits(co, p)) {
      const o = u.order;
      for (const g of gates) {
        if (g.roles && !g.roles.includes(p.role)) continue;
        if (g.stages && !g.stages.includes(u.kind)) continue;
        const key = `${g.id}:${p.role}:${u.unit}`;
        // a pass is reused only for the same count in flight (C1/C2 read it); a refusal for this whole pass
        const mk = `${key}|${flight.agents}|${flight.builders}`;
        let r = memo.get(mk) ?? memo.get(key);
        if (!r) {
          const last = co.data.gates[key];
          if (last && !last.pass && now - last.t < (g.retryMin ?? 5)) r = { id: g.id, unit: u.unit, pass: false, held: true, output: last.output };
          else {
            const at = o ?? { id: "", task: "", workdir: LIVE };
            const t = runCmdCheck(at, g.run, { stage: u.kind ?? "", role: p.role, running: String(flight.agents), builders: String(flight.builders), launch: `system3-meta ${p.role} ${o ? `${o.id} ${o.task ?? ""}` : u.ref ?? u.unit}`.trim() });
            r = { id: g.id, unit: u.unit, pass: !!t.pass, stageError: !!t.stageError, output: String(t.output ?? "").slice(0, 400), ...(t.pass ? {} : { findings: t.findings ? String(t.findings).slice(0, 1200) : null }), running: flight.agents, builders: flight.builders };
            co.data.gates[key] = { t: now, pass: r.pass, output: r.output };
            if (!r.pass) {
              co.log.add({ type: "launch-gate", gate: g.id, role: p.role, msgs: p.msgs ?? [], unit: u.unit, order: o?.id ?? null, stage: u.kind ?? null, pass: false, stageError: r.stageError, output: r.output, findings: r.findings });
              const to = g.notify ?? "chief-of-staff";
              // M7 review: Mailbox.send dedupes on a key even when its message is done, so a refusal after a pass (the
              // launch died before it entered, and the same item was planned again) got no open notice
              const nk = noticeKey(key), prev = co.mailbox.keys.get(nk);
              if (prev && co.mailbox.msgs.get(prev)?.state !== "open") co.mailbox.keys.delete(nk);
              if (co.org.role(to)?.active) co.mailbox.send({ from: "code", to, kind: "notice", key: nk, ref: o?.id ?? null, body: { gate: g.id, role: p.role, unit: u.unit, msg: u.msg, msgs: p.msgs ?? [], stage: u.kind ?? null, why: r.output, findings: r.findings } });
              steps.push({ step: "launch-gate", order: o?.id ?? p.role, result: "refused", output: `${g.id}: ${p.role}: ${r.findings ?? r.output}` });
            }
          }
          memo.set(r.pass ? mk : key, r);
        }
        results.push(r);
        if (!r.pass) { held.push(u.unit); break; }
        passed.push(key);
      }
    }
    if (held.length) { refused.push(...held); continue; }
    if (results.length) {
      p.gate = results;
      // a refusal that has cleared: its notice is done (the chief of staff's mailbox holds only what still blocks)
      for (const key of passed) { const id = co.mailbox.keys.get(noticeKey(key)), m = id && co.mailbox.msgs.get(id); if (m?.kind === "notice" && m.state === "open") co.mailbox.done(m.id, { run: null }); }
    }
    pass.push(p);
    flight.agents++; if (builder) flight.builders++; // the next planned launch counts this one
  }
  return { pass, steps, refused };
}

/** K20 with the planner (M7 review): plan() counts each item it plans against policy.levelCaps and the lanes'
 *  maxSessions, so a launch the gate refuses forever took the slot on every tick and roles whose launches would pass
 *  were never planned. Here the items the gate refuses (or holds for retryMin) are left out and the plan is made again,
 *  until every planned launch passes. Returns { pass, steps }. */
export function planGated(co, opts = {}) {
  if (!gatesOf(co).length) return { pass: plan(co, opts), steps: [] };
  const skip = new Set(), memo = new Map(), steps = [];
  for (;;) {
    const g = gateLaunches(co, plan(co, { ...opts, skip }), memo);
    steps.push(...g.steps);
    const fresh = g.refused.filter((u) => !skip.has(u));
    if (!fresh.length) return { pass: g.pass, steps }; // plan never plans a skipped item, so this ends
    for (const u of fresh) skip.add(u);
  }
}

/** K20 (M7 review): a gate's open notice whose item is gone (its message done or withdrawn, its order done, parked or
 *  cancelled) is closed: it no longer blocks anything, and the chief of staff's brief says a notice closes by itself. */
export function sweepGateNotices(co) {
  const steps = [];
  for (const m of co.mailbox.msgs.values()) {
    if (m.kind !== "notice" || m.state !== "open" || !String(m.key ?? "").startsWith("launch-gate:")) continue;
    const o = m.ref ? co.engine.orders.get(m.ref) : null;
    const ms = (m.body?.msg ? [m.body.msg] : m.body?.unit ? [] : m.body?.msgs ?? []).map((id) => co.mailbox.msgs.get(id));
    const gone = (o && ["done", "parked", "cancelled"].includes(o.stage)) || (ms.length && ms.every((x) => !x || x.state !== "open"));
    if (!gone) continue;
    co.mailbox.done(m.id, { run: null });
    co.log.add({ type: "notice-closed", msg: m.id, key: m.key, why: o && ["done", "parked", "cancelled"].includes(o.stage) ? `${o.id} is ${o.stage}` : "its item is no longer queued" });
    steps.push({ step: "gate-notice", msg: m.id, order: m.ref ?? undefined, result: "closed" });
  }
  return steps;
}

/** A step as one word, for serve's stream and the supervisor-tick event: `<step>:<what it is about>[:<result>]`, where
 *  what it is about is its order, message, run, contract or goal, else its own id (an export's, a scheduler's). M7 dry
 *  run: the host and export steps have no order, and serve printed `host:undefined:clear` and `export:undefined:pass`
 *  (three exports, three identical words). A step about nothing is `<step>[:<result>]`. */
export function stepLabel(s, { result = true } = {}) {
  const about = s.order ?? s.msg ?? s.run ?? s.contract ?? s.goal ?? s.id ?? null;
  return [s.step, about, result ? s.result : null].filter((x) => x != null && x !== "").join(":");
}

/** One pass over every order; repeated until nothing changes (an accepted UAT makes a ship step possible). */
export function tick(co, { acceptance = null, faults = null, probe = hostProbe } = {}) {
  const { engine, rooms, mailbox, log } = co;
  const steps = [];
  { const h = hostCheck(co, probe); if (h) steps.push(h); } // K17: the planner starts no session while the host is held
  for (const m of mailbox.promote()) steps.push({ step: "promote", msg: m.id, order: m.ref });
  for (const x of rooms.recover()) steps.push({ step: "recover", run: x.run, role: x.role, order: x.order });
  steps.push(...JOBS.collect(co, { apply: applyCmdResult })); // K2: only what has ended; a running job is left alone
  steps.push(...runSchedulers(co)); // K18: orders a scheduler places are worked in this same tick
  steps.push(...sweepGateNotices(co)); // K20: a notice whose item is gone blocks nothing
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
        // M7: a flow's workspace.maxOpen (the ritual flow's: a full checkout each, removed on done) caps how many of its
        // orders hold a worktree at once; the others wait here, unplanned (their pre-check has not run), in order
        if (WS.flowFull(co, o)) continue;
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
        if (st) { const { acts, ...one } = st; steps.push(one, ...(acts ?? [])); changed = true; }
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
  // M7 housekeeping: a done order's build output (and, where its flow says so, its worktree; the branch is kept) is
  // removed once its last commit is made; a cancelled one's build output too. Once per order; never holds anything
  for (const o of engine.orders.values()) {
    const c = WS.cleanupDue(co, o) ? WS.cleanup(co, o) : null;
    if (c && (c.removed.length || c.worktree || c.error)) steps.push({ step: "cleanup", order: o.id, result: c.error ? "error" : c.worktree ? "worktree removed" : "removed", output: c.error ?? c.removed.join(", ") });
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
  steps.push(...learnTick(co)); // K28: each ended order's evidence, the rules' scores, a retro when due
  if (co.data) { syncOrders(co); for (const g of sweepGoals(co)) steps.push({ step: "goal-auto-red", goal: g }); }
  if (steps.length) log.add({ type: "supervisor-tick", steps: steps.map((s) => stepLabel(s, { result: false })) });
  return steps;
}

/** Which agent sessions to start now. Pure: reads the state, changes nothing. */
export const LAUNCH_GRACE_MIN = 5;
export const WATCHDOG_MIN = Number(process.env.META_WATCHDOG_MIN ?? 2);
export function plan(co, { batchLater: batchDefault = 3, cap: capDefault = 4, skip = null } = {}) {
  const { org, rooms, mailbox, log } = co;
  // K17 (plan §M6): the host guard (tick decides it, hostCheck, and records each change): no new agent session at all
  // while the host is held (load or disk), as dispatch-check C4 refuses rather than queues
  if (co.data?.host?.held) return [];
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
  // M6 prep: a role may run several sessions at once (spec `sessions`, the demo-builder's 3); its launches are told
  // apart by the launch id their sessions carry (meta.mjs room enter: META_LAUNCH), not by "an enter since"
  const many = (role) => (org.role(role)?.sessions ?? 1) > 1;
  const entered = (l) => (many(l.role) ? [...rooms.sessions.values()].some((s) => s.launch === lid(l)) : log.events.some((e) => e.type === "enter" && e.role === l.role && e.t >= l.t));
  // M5: sessions at work per lane (open with a run or waiting, plus launches not yet entered), for maxSessions
  const load = new Map();
  // M6 prep: a role of several lanes is counted in the lane of the order it is planned for (its first item's)
  const laneOf = (role, m = null) => { const r = org.role(role), ls = lanesOf(r), ol = m ? org.role(co.engine.orders.get(m.ref)?.manager)?.lane : null; return ls.length > 1 && ls.includes(ol) ? ol : r?.lane ?? null; };
  // K17 (plan §M6): sessions at work per level (spec policy.levelCaps: never more than N sessions of that level's roles)
  const levelCaps = co.spec?.policy?.levelCaps ?? {}, levels = new Map();
  const bump = (role, m = null) => { const l = laneOf(role, m); if (l != null) load.set(l, (load.get(l) ?? 0) + 1); const v = org.role(role)?.level; levels.set(v, (levels.get(v) ?? 0) + 1); };
  for (const l of new Set(org.active().flatMap((r) => lanesOf(r)))) load.set(l, rooms.laneLoad(l));
  const busy = new Set([...rooms.runs.values()].filter((x) => x.state === "running").map((x) => x.session));
  const live = (s) => s.open && (busy.has(s.id) || (s.waitUntil != null && s.waitUntil > now - 0.5));
  const liveOf = new Map(); // role → sessions at work, plus its launches not yet entered
  for (const s of rooms.sessions.values()) if (live(s)) { liveOf.set(s.role, (liveOf.get(s.role) ?? 0) + 1); const v = org.role(s.role)?.level; levels.set(v, (levels.get(v) ?? 0) + 1); }
  const pending = []; // launches of room work not yet entered
  for (const l of log.events.filter((e) => e.type === "launch" && now - e.t < LAUNCH_GRACE_MIN && !(e.tasks?.length && !e.msgs?.length))) {
    if (!entered(l) && !ended(l)) { running.add(l.role); bump(l.role, mailbox.msgs.get(l.msgs?.[0])); liveOf.set(l.role, (liveOf.get(l.role) ?? 0) + 1); pending.push(l); }
  }
  const laneFull = (role, m = null) => { const l = laneOf(role, m), cap = co.engine.laneKnobs(l).maxSessions; return cap != null && (load.get(l) ?? 0) >= cap; };
  const levelFull = (role) => { const v = org.role(role)?.level, cap = levelCaps[v]; return cap != null && (levels.get(v) ?? 0) >= cap; };
  // a session waiting for its role's next item will take it (room next --wait)
  // until it closes, and for 30 s past its deadline: its last poll can still take an item (benchmark 5: an item that
  // arrived 1 s after a wait ended was taken by the waiting session and by a fresh launch)
  const waiting = new Map();
  for (const s of rooms.sessions.values()) if (s.open && s.waitUntil != null && s.waitUntil > now - 0.5 && !busy.has(s.id)) { running.add(s.role); waiting.set(s.role, (waiting.get(s.role) ?? 0) + 1); }
  // M6 prep: items a role's live launch was planned for are that launch's (rooms.reservedElsewhere keeps them for it)
  const reserved = new Set(log.events.filter((e) => e.type === "launch" && many(e.role) && !ended(e) && (now - e.t < LAUNCH_GRACE_MIN || [...rooms.sessions.values()].some((s) => s.open && s.launch === lid(e)))).flatMap((e) => e.msgs ?? []));
  const out = [];
  const consider = (role, queued) => {
    // K5: an order held on its workspace launches no one: `room enter` would refuse its item (K5 review)
    // K13: nor does an order at or over its charged budget (its budget ask waits for a decider)
    // M5: nor one whose stage's pre-check has not run (the next tick runs it first)
    // K20 (planGated): nor an item the launch gate refused or holds
    // M7: nor one whose flow's worktrees are all taken (workspace.maxOpen: it waits for a worktree, unlaunched)
    const msgs = queued.filter((m) => { const o = co.engine.orders.get(m.ref); return !skip?.has(m.id) && o?.stageError?.kind !== "workspace" && !co.engine.overBudget(o) && !co.engine.preDue(o) && !(o && WS.specOf(co) && !o.workdir && WS.flowFull(co, o)); });
    if (!msgs.length) return;
    // the lane's policy, when it sets them, overrides the role's own (spec drainCap: the reviewers' batches) and the
    // command-line defaults
    const r = org.role(role);
    // M6 prep review: a role of several lanes reads the knobs of the lane its first item's order is in (laneOf), not
    // only its home lane's
    const kl = laneOf(role, msgs[0]), pl = co.engine.policies.get(kl);
    const k = pl?.active ? pl.versions[pl.active - 1].knobs : {};
    // K27: a review stage's `batch` {max, waitMin}: its first waiting order is held until max wait or the oldest has
    // waited waitMin minutes, then one session takes up to max (one cold start for the batch; nextTimer wakes for it)
    const bt = batchOf(co, msgs);
    if (bt && msgs.length < bt.max && co.engine.clock.now() - Math.min(...msgs.map((m) => m.ts)) < bt.waitMin && !msgs.some((m) => m.priority === "now")) return;
    const batchLater = k.batchLater ?? batchDefault, cap = bt?.max ?? k.drainCap ?? r?.drainCap ?? capDefault;
    const now = msgs.filter((m) => m.priority === "now");
    // M5: a lane at its policy's session cap (maxSessions) gets no new session, `now` items included; K17: nor a level at its cap
    // M6 prep review: a role of several sessions spends one of them per `now` item (the next/later loop below counted
    // its free sessions without these, so sessions:3 was planned 6 at once)
    for (const m of now) {
      if (laneFull(role, m) || levelFull(role)) return;
      if (many(role) && (liveOf.get(role) ?? 0) >= r.sessions) break;
      out.push({ role, why: many(role) ? `now: a fresh session at once (session ${(liveOf.get(role) ?? 0) + 1} of ${r.sessions})` : "now: a fresh session at once", msgs: [m.id], cap: 1 });
      bump(role, m); if (many(role)) liveOf.set(role, (liveOf.get(role) ?? 0) + 1);
    }
    if (!many(role) && running.has(role)) return; // its running session drains next and later items itself
    const next = msgs.filter((m) => m.priority === "next");
    const later = msgs.filter((m) => m.priority === "later");
    const dueLater = later.filter((m) => m.due != null && m.due <= co.engine.clock.now());
    if (!(next.length || later.length >= batchLater || dueLater.length)) return;
    // benchmark 1: a cap of 4 left 1 of 5 pages to a whole new reader session (63k for one page). When the remainder
    // is small, the session takes it all: half a cap more costs less than a fresh session's start-up.
    const chunk = (all) => (bt ? all.slice(0, cap) : all.length - cap <= Math.ceil(cap / 2) ? all : all.slice(0, cap));
    const why = next.length ? `next: ${next.length} waiting, no session running` : `later: a batch of ${later.length}`;
    if (!many(role)) {
      const take = chunk([...next, ...later]);
      // the cap leaves room for items that arrive while the session waits (room next --wait)
      if (laneFull(role, msgs[0]) || levelFull(role)) return;
      out.push({ role, why, msgs: take.map((m) => m.id), cap: Math.max(take.length, cap) });
      bump(role, msgs[0]);
      return;
    }
    // M6 prep: a role of several sessions (spec `sessions`) gets a session per batch, up to that many at once: the items
    // its live launches hold are theirs, and each session waiting for its next item will take one
    let rest = [...next, ...later].filter((m) => !reserved.has(m.id)).slice(waiting.get(role) ?? 0);
    for (let free = r.sessions - (liveOf.get(role) ?? 0); free > 0 && rest.length; free--) {
      if (laneFull(role, rest[0]) || levelFull(role)) return;
      // one item a session while other sessions are free (three lessons, three builders), a batch otherwise
      const take = rest.length <= free ? [rest[0]] : chunk(rest.slice(0, Math.max(1, Math.ceil(rest.length / free))));
      out.push({ role, why: `${why} (session ${(liveOf.get(role) ?? 0) + 1} of ${r.sessions})`, msgs: take.map((m) => m.id), cap: Math.max(take.length, cap) });
      bump(role, rest[0]); liveOf.set(role, (liveOf.get(role) ?? 0) + 1);
      rest = rest.slice(take.length);
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
    if (c.state !== "open" || skip?.has(`contract:${c.id}`)) continue;
    if (log.events.some((e) => e.type === "launch" && e.role === c.contractor)) continue;
    out.push({ role: c.contractor, why: `contract ${c.id} (${c.kind}) open, not started`, msgs: [], contract: c.id, cap: 1 });
  }
  if (checker) consider(checker.id, [...mailbox.queue(`role:${checker.id}`, "work"), ...mailbox.queue("pool:checker", "work")].filter(fit(checker.id)));
  for (const j0 of judgment(co)) {
    const j = skip ? { ...j0, tasks: j0.tasks.filter((t) => !skip.has(`${t.kind}:${t.ref}`)) } : j0;
    if (!j.tasks.length) continue;
    // a launch reserves non-room work until the work is done or NON_ROOM_GRACE_MIN passes (no room enter to watch for)
    if (log.events.some((e) => e.type === "launch" && e.role === j.role && now - e.t < NON_ROOM_GRACE_MIN && !ended(e) && (e.tasks ?? []).some((t) => j.tasks.some((u) => u.kind === t.kind && u.ref === t.ref)))) continue;
    const same = out.find((p) => p.role === j.role);
    if (same) same.tasks = [...(same.tasks ?? []), ...j.tasks]; else if (!levelFull(j.role)) { out.push(j); bump(j.role); } // K17
  }
  // K26: a warm role's next item for an order it already worked (a revise, or its next work stage) resumes that order's
  // Agent SDK session (recorded at `launch finished --sdk-session`) instead of a cold start; never one another launch in
  // flight is resuming, nor one whose resume failed (the launcher fell back to cold), nor for a stage it does not work
  const resuming = new Set(log.events.filter((e) => e.type === "launch" && e.resume && !ended(e)).map((e) => e.resume));
  for (const p of out) {
    if (p.tasks?.length || !p.msgs?.length || !org.role(p.role)?.warm) continue;
    const w = warmFor(co, p.role, p.msgs);
    if (w && !resuming.has(w.sdk)) { p.resume = w.sdk; p.why = `${p.why} (warm: resumes ${w.order}'s session from launch ${w.launch})`; resuming.add(w.sdk); }
  }
  return out;
}

/** K26: the recorded warm session a launch of `role` for these items resumes: the first item's order's (it must be at
 *  a stage the order's worker works), else any later item's; null for a cold start. */
export function warmFor(co, role, msgs) {
  for (const id of msgs) {
    const m = co.mailbox.msgs.get(id), o = m && co.engine.orders.get(m.ref);
    if (!o || !co.engine.isWorkStage(o, m.body?.stage)) continue;
    const w = co.data?.warm?.[`${o.id}|${role}`];
    if (w?.sdk && w.ok && !w.failed) return { ...w, order: o.id };
  }
  return null;
}

/** K26: the brief for a resumed warm session: short (it has this company's context and its own earlier work); the
 *  pack carries the stage, the findings and the commands, as for any session. */
export function warmBriefFor(co, item) {
  const r = co.org.role(item.role);
  const pre = [process.env.META_LIVE_DIR && `META_LIVE_DIR=${process.env.META_LIVE_DIR}`, process.env.META_STATE && `META_STATE=${process.env.META_STATE}`].filter(Boolean).join(" ");
  const items = item.msgs.map((id) => { const m = co.mailbox.msgs.get(id), o = m && co.engine.orders.get(m.ref); return o ? `${o.id} (${o.task}) at ${m.body?.stage}${m.body?.loops ? `, loop ${m.body.loops}` : ""}` : id; });
  const first = co.mailbox.msgs.get(item.msgs[0]), o = first && co.engine.orders.get(first.ref);
  const sd = o && co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === first.body?.stage);
  const L = [`You are \`${item.role}\` (${r.level}) again: this is your own session, resumed. The company, the CLI and your earlier work are as you left them; only what is new is below.`, "",
    `New work: ${items.join("; ")}. Session cap ${item.cap}.`,
    `1. Enter: \`${pre ? `${pre} ` : ""}node meta.mjs room enter --msg=${item.msgs[0]} --role=${item.role}\` (run it from ${HERE}). Read the pack's \`findings\`: they say what to change.${sd?.selftest ? ` Self-check as often as you like with \`node meta.mjs check --order=<O>\` (runs ${sd.selftest.argv.join(" ")}; it signs nothing).` : " Self-check with `node meta.mjs check --order=<O>` before you hand in (it signs nothing)."}`,
    `2. Hand in with the pack's \`next_with\` (\`--cap=${item.cap} --evidence=<path> --learned='one line'\`) and stop only when it says your session is over.`];
  return absCmds(L.join("\n"));
}

/** K27: the batch rule for these work items, when every one is at a stage with `batch` (the smallest max and waitMin
 *  of their stages), else null. */
export function batchOf(co, msgs) {
  const bs = msgs.map((m) => { const o = co.engine.orders.get(m.ref); return o ? co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === m.body?.stage)?.batch : null; });
  if (!bs.length || bs.some((b) => !b)) return null;
  return { max: Math.min(...bs.map((b) => b.max)), waitMin: Math.min(...bs.map((b) => b.waitMin ?? 0)) };
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
  if (context) L.push((o && WS.specOf(co) ? interpolate(context, { ...(o.workspace?.vars ?? {}), ...briefVars(o), ...storeVars(o), workdir: o.workdir ?? path.join(LIVE, "work", o.task ?? ""), task: o.task ?? "", slug: o.slug ?? o.task ?? "" }) : context).trim(), "");
  const closed = [...(co.data?.meetings?.meetings?.values() ?? [])].filter((m) => m.state === "closed").map((m) => m.id);
  if (closed.length) L.push(`Minutes of closed meetings (decisions you follow): ${closed.map((id) => path.join(LIVE, "minutes", `${id}.md`)).join(", ")}. Never read state files.`, "");
  // open tracker actions assigned to this role travel with the brief (benchmark 2: the kickoff gave writer-1 actions
  // its STYLE brief did not mention)
  const acts = [...(co.data?.tracker?.items?.values() ?? [])].filter((i) => i.kind === "action" && i.assignee === item.role && !["done", "cancelled"].includes(i.state));
  if (acts.length) L.push(`Your open actions (do them in this session when they touch this work; mark each done with \`node meta.mjs item update --id=<ISS> --by=${item.role} --state=done\`):`, ...acts.map((i) => `- ${i.id}: ${i.title}${i.due ? ` (due ${i.due})` : ""}${i.body ? ` · ${i.body}` : ""}`), "");
  // K20: code's notices for this role (a launch gate that refused a session) travel with its brief, until they clear
  const notes = [...co.mailbox.msgs.values()].filter((m) => m.kind === "notice" && m.state === "open" && m.to === item.role);
  if (notes.length) L.push("Notices from code (a launch gate refused a session; it is tried again by itself, and the notice closes when it passes or its item is gone):", ...notes.map((m) => `- ${m.id}: ${m.body?.gate} refused ${m.body?.role}${m.ref ? ` for ${m.ref}` : ""}${m.body?.stage ? ` at ${m.body.stage}` : ""}: ${String(m.body?.findings ?? m.body?.why ?? "").split("\n").slice(0, 3).join("; ").slice(0, 300)}`), "");
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
    const lane = r.lane, builders = co.org.active().filter((x) => x.level === "builder" && lanesOf(x).includes(lane)).map((x) => x.id); // M6 prep: a builder of several lanes
    L.push(`Orders waiting for a builder: ${dlg.map((id) => `${id} (${co.engine.orders.get(id).task})`).join(", ")}. Split them across your builders (${builders.join(", ")}) and delegate each: \`node meta.mjs order delegate <O> --by=${item.role} --to=<builder> --budget=150000\`. Dependent orders (\`--after\`) wait by themselves; give one builder a run of related items so its session can drain them.`);
  }
  const retros = (item.tasks ?? []).filter((t) => t.kind === "retro").map((t) => t.ref);
  if (retros.length) {
    const lim = co.spec?.learn ?? {};
    L.push(`Retro ${retros.join(", ")} (K28, the company's playbook): read the outcome evidence and the playbook with \`node meta.mjs learn show\` (each order's stage verdicts, defect classes, revise findings, loops, self-checks and cost; the active rules with their helped/hurt scores). Propose what would have prevented the defect classes that recur, as one JSON proposal: \`node meta.mjs learn propose --by=${item.role} --retro=${retros[0]} --proposal='{"add":[{"text":"…","why":["E-…"],"targets":["<class>"],"roles":["<role>"]}],"retire":[{"id":"P-1","why":"…"}],"sample":[{"stage":"<sampled stage>","rate":0.75,"why":["E-…"]}]}'\`. Code checks each change: a rule cites evidence ids that exist and targets a defect class that evidence shows, is one line of at most ${LEARN_RULE_MAX} characters, is for ${(lim.roles ?? []).join(" or ")}, never tells anyone to skip or weaken a check or to read what a review must not see; at most ${lim.maxRules ?? 12} rules are active; a sample rate stays inside the spec's bounds. A refused change is reported; the rest apply. Retire a rule its scores say hurts. If nothing recurs, propose \`{}\`: that closes the retro too.${(() => { const rv = [...reviewerRoles(co.spec)].filter((x) => (lim.roles ?? []).includes(x)); return rv.length && !independentAuthor(co.spec, item.role) ? ` You are on the work side: your rules are for ${(lim.roles ?? []).filter((x) => !rv.includes(x)).join(" or ") || "no role"}; ${rv.join(" and ")} review${rv.length > 1 ? "" : "s"} independently, and only code or the founder writes rules for ${rv.length > 1 ? "them" : "it"}.` : ""; })()}`);
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
    const gv = o ? { ...(o.workspace?.vars ?? {}), ...briefVars(o), ...storeVars(o), workdir: o.workdir ?? path.join(LIVE, "work", o.task ?? ""), task: o.task ?? "", slug: o.slug ?? o.task ?? "" } : {};
    // K24: an include of the run's artifact store (${artifacts}…) is an absolute path outside the workdir
    if (sd?.pack?.include?.length) { const inc = sd.pack.include.map((g) => interpolate(g, gv)); L.push(`Read only these${inc.some((g) => path.isAbsolute(g)) ? " (relative ones in the workdir; absolute ones are the run's artifact store, the stages' kept copies)" : " in the workdir"}: ${inc.join(", ")}.`); }
    if (sd?.pack?.exclude?.length) L.push(`Never open: ${sd.pack.exclude.map((g) => interpolate(g, gv)).join(", ")}.`);
    if (item.msgs.length > 1 && sd?.pack) L.push("Each item's pack states its own stage's rules.");
    // K4: an independent stage's role reviews, whatever its level (a role signer such as learner-evaluator)
    if (r.level === "checker" || (o && isIndependent(co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === first.body?.stage)))) L.push("2. Check the work against its accept criteria and the shipped work it must agree with. Never fix it. Report defects by class: list every instance of a class, each as what is wrong → what is required.", `3. Hand in with \`next_with\` (\`--cap=${item.cap} --verdict=pass\` or \`--verdict=revise --findings='…'\`, \`--evidence=<path>\`, \`--learned='one line'\`) to take the next item in this session: it waits up to ${r.waitSec ?? 90} s for one${(r.waitSec ?? 90) > 90 ? ` (give that Bash call a timeout of at least ${(r.waitSec + 60) * 1000} ms)` : ""}, so always hand in with it, and stop only when it says your session is over.`);
    else L.push("2. Do the work the accept criteria ask, in the workdir only. If the work needs a change in another order's module, do not edit it: raise it with your manager (`node meta.mjs ask raise --by=" + item.role + " --kind=decision --title='…' --why='what is wrong, where, what is required' --due=YYYY-MM-DD`) and say so when you hand in. " + (sd?.selftest ? `Check your own work as often as you like with \`node meta.mjs check --order=<O>\` (it runs ${sd.selftest.argv.join(" ")} in the workdir and signs nothing; only your hand-in starts the next stage).` : "If the order has `checks`, run `node meta.mjs check --order=<O>` before you hand in: it runs the same test1 code will run."), `3. Hand in with \`next_with\` (\`--cap=${item.cap} --evidence=<path> --learned='one line'\`) to take the next item in this session: it waits up to ${r.waitSec ?? 90} s for one${(r.waitSec ?? 90) > 90 ? ` (give that Bash call a timeout of at least ${(r.waitSec + 60) * 1000} ms)` : ""} (a revise of your work often arrives then), so always hand in with it, and stop only when it says your session is over.`);
    L.push("If a command refuses, read the message and fix what it names. If \`room enter\` says the item is held by another run or already done, stop at once and report it: another session has it, so never wait for a lease (benchmark 5: a session waited 30 minutes for one).");
  }
  L.push("", "Report back briefly: each item, its outcome, and anything that confused you.");
  return absCmds(L.filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n")); // K10: absolute with META_KERNEL_ABS
}

export const NON_ROOM_GRACE_MIN = 30;
/** Judgment work that happens outside rooms, found from the record (benchmark 1: I planned these by hand):
 *  - an open meeting's invitees with positions still to write (agents only; a missing person is named at reveal)
 *  - an open meeting whose positions are all in: the chair reveals, decides and closes
 *  - orders at their first stage (build, or a draft) with no builder: their manager delegates
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
  // K25: an order waits for its delegate at its first stage, whatever the flow calls it (draft, before a plan check)
  for (const o of engine.orders.values()) if (o.stage === engine.firstStage(o) && !o.builder) { if (chairing.has(o.manager) && !by.get(o.manager)?.some((t) => t.kind === "chair")) continue; add(o.manager, { kind: "delegate", ref: o.id }); }
  // an open ask to an agent decider is its work (benchmark 5: an integrator that finds a defect in another slot's
  // module asks the lead, who reopens that module)
  for (const it of co.data?.tracker?.items?.values() ?? []) if (it.kind === "ask" && !["done", "cancelled"].includes(it.state) && it.assignee) add(it.assignee, { kind: "ask", ref: it.id });
  // K28: an open retro of a role (learn.retro.role) is that role's work: one session reads the evidence and proposes
  for (const r of co.data?.learn?.retros ?? []) if (r.state === "open" && r.kind === "role") add(r.role, { kind: "retro", ref: r.id });
  return [...by].map(([role, tasks]) => {
    tasks.sort((a, b) => ["chair", "positions", "ask", "delegate", "retro"].indexOf(a.kind) - ["chair", "positions", "ask", "delegate", "retro"].indexOf(b.kind));
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
    ...JOBS.deadlines(co),
    // K27: a held review batch is released when its oldest item has waited its stage's batch.waitMin
    ...[...co.mailbox.msgs.values()].filter((m) => m.kind === "work" && m.state === "open").map((m) => { const o = co.engine.orders.get(m.ref), b = o && co.engine.flows.get(o.flow)?.stages.find((x) => x.stage === m.body?.stage)?.batch; return b ? m.ts + (b.waitMin ?? 0) : null; }).filter((t) => t != null && t > now)].filter((t) => t != null);
  if (!ts.length) return null;
  return Math.max(0, (Math.min(...ts) - now) * 60000) + 50;
}

function once(opts) {
  return withLock(() => {
    const co = load();
    const steps = tick(co, opts);
    save(co);
    const ex = runExports(co); // M6 prep: after the save (an exporter reads the state file)
    if (ex.length) save(co);
    return { steps: [...steps, ...ex], plan: plan(co, opts), wakeInMs: nextTimer(co) };
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
    const e = co.log.add({ type: "launch", role: p.role, msgs: p.msgs, tasks: p.tasks ?? [], why: `plan: ${p.why}`, ...(p.gate ? { gate: p.gate } : {}), ...(p.resume ? { resume: p.resume } : {}) }); // K20: the gate's result; K26: the warm session it resumes
    // K26: a resumed session gets the short brief; the full one is kept beside it for the launcher's cold fallback
    const cold = briefFor(co, p, { context }), brief = p.resume ? warmBriefFor(co, p) : cold;
    let file = null, coldFile = null;
    if (outbox) {
      fs.mkdirSync(outbox, { recursive: true });
      const base = path.join(outbox, `${String(e.seq).padStart(4, "0")}-${p.role}`);
      file = `${base}.md`; fs.writeFileSync(file, brief);
      if (p.resume) { coldFile = `${base}.cold.md`; fs.writeFileSync(coldFile, cold); }
    }
    return { ...p, launch: e.seq, file, brief, ...(p.resume ? { coldFile, coldBrief: cold } : {}) };
  });
}

/** K22: record a serve's start in the state (co.data.serve); when an earlier serve worked this state, a serve-resume
 *  event says how it ended (a recorded stop, or none: it was killed) and what this serve takes over. Returns that
 *  summary, or null on a first start. */
export function serveStart(co, { pid = process.pid } = {}) {
  const prev = co.data.serve ?? null, now = co.engine.clock.now();
  co.data.serve = { pid, started: now, stopped: null, starts: (prev?.starts ?? 0) + 1 };
  if (!prev) { co.log.add({ type: "serve-start", pid }); return null; }
  const jobs = JOBS.adopt(co);
  const { rooms, log } = co;
  const lid = (l) => `${String(l.seq).padStart(4, "0")}-${l.role}`;
  const held = log.events.filter((e) => e.type === "launch" && now - e.t < LAUNCH_GRACE_MIN && !log.events.some((f) => f.type === "launch-finished" && (f.launch ? f.launch === lid(e) : f.role === e.role && f.t >= e.t)) && ![...rooms.sessions.values()].some((s) => s.launch === lid(e)) && !log.events.some((f) => f.type === "enter" && f.role === e.role && f.t >= e.t)).map((e) => ({ launch: lid(e), role: e.role, msgs: e.msgs ?? [], ageMin: Math.round((now - e.t) * 10) / 10 }));
  const leases = [...co.mailbox.msgs.values()].filter((m) => m.state === "open" && m.lease && m.lease.until > now).length;
  const running = [...rooms.runs.values()].filter((x) => x.state === "running").length;
  const r = { previous: prev.pid, stopped: prev.stopped?.why ?? "no stop recorded (killed or crashed)", downMin: prev.stopped ? Math.round((now - prev.stopped.t) * 10) / 10 : null, jobs, held, leases, runs: running };
  log.add({ type: "serve-resume", pid, ...r });
  return r;
}
export function serveStop(co, why) {
  co.data.serve = { ...(co.data.serve ?? { pid: process.pid, started: co.engine.clock.now() }), stopped: { why, t: co.engine.clock.now() } };
  co.log.add({ type: "serve-stop", pid: process.pid, why, resumable: why !== "done" });
}

/** Is anything left to do? Open orders, or open meetings. */
export function settled(co) {
  // K7 review: a done order whose last commit is pending (held, or due on the next tick) is work left; only while the
  // spec still commits (K7 review 2)
  // K8: a cancelled order is settled; a parked one is not (its ask waits for a decision)
  return [...co.engine.orders.values()].every((o) => o.stage === "cancelled" || (o.stage === "done" && !WS.commitDue(co, o))) && ![...(co.data?.meetings?.meetings?.values() ?? [])].some((m) => m.state === "open") && !learnPending(co); // K28: the run's evidence and its last retro
}

/** M7: has every spec scheduler ended (a `scheduler-end`)? True with no schedulers. */
export const schedulersEnded = (co) => (co.spec?.schedulers ?? []).every((x) => !!co.data?.schedulers?.[x.id]?.ended);

/** K22 (M7 review): is `pid` a live serve? After a crash or a reboot the dead serve's pid may belong to another process
 *  now, and every new serve refused to start ("another serve runs on this state") until serve.pid was removed by hand.
 *  As jobs.mjs wrapperAlive does for the K2 wrappers, the process's /proc cmdline must name supervisor.mjs and serve;
 *  with no /proc to read, a live pid counts (as before). This process is never "another" serve. */
export function serveAlive(pid, { proc = "/proc" } = {}) {
  if (!Number.isInteger(pid) || pid <= 0 || pid === process.pid) return false;
  try { process.kill(pid, 0); } catch (e) { if (e.code !== "EPERM") return false; }
  let argv;
  try { argv = fs.readFileSync(`${proc}/${pid}/cmdline`, "utf8").split("\0"); } catch { return !fs.existsSync(proc); }
  return argv.some((a) => path.basename(a) === "supervisor.mjs") && argv.includes("serve");
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
    if (serveAlive(other)) { say({ event: "refused", why: `another serve (pid ${other}) runs on this state` }); process.exitCode = 1; return; }
  }
  fs.writeFileSync(pidFile, String(process.pid));
  const release = () => { try { if (Number(fs.readFileSync(pidFile, "utf8")) === process.pid) fs.unlinkSync(pidFile); } catch {} };
  // K22: a stop is recorded in the state (serve-stop), so the next serve knows it resumes a clean stop, not a crash
  const stop = (why) => { try { withLock(() => { const co = load(); serveStop(co, why); save(co); }); } catch {} };
  process.on("exit", release); for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => { stop(`signal ${sig}`); release(); process.exit(0); });
  let quietSince = Date.now();
  // K22 (plan §M7, the long-lived service): a serve started on a state another serve worked resumes it. Leases, runs
  // and reservations are in the state and stand as they are; the K2 jobs the last serve started are re-adopted (their
  // wrappers run detached, and collect reads their exit records), or found dead and held as stage-errors by collect;
  // launches it reserved but nobody entered stay reserved for their grace period (plan never plans them twice)
  const resumed = withLock(() => { const co = load(); const r = serveStart(co); save(co); return r; });
  say({ event: "serving", live: LIVE, outbox, ...(resumed ? { resumed } : {}) });
  for (;;) {
    const r = withLock(() => {
      const co = load();
      const steps = tick(co, opts);
      const context = fs.existsSync(ctxFile) ? fs.readFileSync(ctxFile, "utf8") : null;
      const g = planGated(co, opts); // K20: a refused launch is not reserved, and the plan is made without it
      steps.push(...g.steps);
      const launches = reserve(co, g.pass, { context, outbox });
      if (steps.length || launches.length) save(co); // saving wakes the watcher: only when something changed
      const ex = runExports(co); // M6 prep: after the save (an exporter reads the state file); its record is saved too
      if (ex.length) { save(co); steps.push(...ex); }
      // K18: a company with a scheduler is never done (its next ritual falls due later): it serves until --max-min, or
      // (M7) until every scheduler has ended (rituals.mjs due: the cycle's handoff is committed) and the work is done
      return { steps, launches, settled: settled(co) && schedulersEnded(co), wakeInMs: nextTimer(co) };
    });
    if (r.steps.length) say({ event: "steps", steps: r.steps.map((x) => stepLabel(x)) });
    for (const l of r.launches) say({ event: "launch", role: l.role, why: l.why, cap: l.cap, msgs: l.msgs, brief: l.file, ...(l.resume ? { resume: l.resume, coldBrief: l.coldFile } : {}), ...(l.gate ? { gate: l.gate.map((x) => ({ id: x.id, pass: x.pass, output: x.output })) } : {}) });
    if (r.steps.length || r.launches.length) quietSince = Date.now();
    if (r.settled && Date.now() - quietSince >= idleMin * 60000) { stop("done"); say({ event: "done", why: "every order is done and no meeting is open" }); return; }
    // K22: --max-min is a pause, not an end: the state is saved with a serve-stop, exit 0, and the next serve resumes
    if (Date.now() >= end) { stop(`--max-min=${maxMin}`); say({ event: "stopped", why: `--max-min=${maxMin}`, resumable: true }); return; }
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
  // M6 prep (the hole the M5 review left open): `launched` writes launch events (a reservation the planner honours, and
  // the launch K13 charges by) and `usage` writes harness usage: both are the orchestrator's reports, as meta.mjs
  // `launch finished` is the launcher's. In an agent session (state.mjs sessionRole: the launcher's META_ROLE on the
  // process's ancestry) they are refused, exit 1, with a refuse event; the launcher's guard denies the spelling too.
  // M6 prep review: a process re-parented to init (setsid -f, a double fork) has no ancestry to read, and one that also
  // dropped META_ROLE read as the orchestrator: such a detached process is refused as of unknown session (the
  // orchestrator runs these from its own shell; a subreaper other than init is not detected)
  const me = ["launched", "usage"].includes(cmd) ? sessionRole() ?? (detachedProcess() ? "detached: a process re-parented to init, its session unknown" : null) : null;
  if (me != null) {
    const msg = `supervisor.mjs ${cmd} is the orchestrator's report: refused in an agent session (${me})`;
    try { withLock(() => { const co = load(); co.log.add({ type: "refuse", rule: "hard", msg, by: me, argv: argv.join(" ") }); save(co); }); } catch {} // no state: nothing to record it in
    console.error(JSON.stringify({ refused: true, error: msg }));
    process.exit(1);
  }
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
        const g = planGated(co, opts); // K20: as serve (the plan made again under this lock, without what the gate refuses)
        const out = g.pass.map((p) => { co.log.add({ type: "launch", role: p.role, msgs: p.msgs, tasks: p.tasks ?? [], why: `cycle: ${p.why}`, ...(p.gate ? { gate: p.gate } : {}), ...(p.resume ? { resume: p.resume } : {}) }); const cold = briefFor(co, p, { context }); return { ...p, brief: p.resume ? warmBriefFor(co, p) : cold, ...(p.resume ? { coldBrief: cold } : {}) }; });
        w.steps.push(...g.steps);
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
