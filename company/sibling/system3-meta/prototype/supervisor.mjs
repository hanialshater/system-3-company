#!/usr/bin/env node
// The supervisor as code (live run 2: as an agent it cost 34k tokens an order for steps that need no judgment).
// It does every step a rule can decide, and plans the ones only an agent can do:
//   test1   runs the builder's tests and signs as `code`
//   uat     runs the orderer's hidden acceptance tests (--acceptance=<dir>/<task>.test.mjs) and signs as the orderer;
//           no acceptance file for a task: the order waits at uat for a person (it is never passed by default)
//   ship    claims the release message, copies the module (not the builder's tests) to live/shipped/<task>/, leaves
//   recover expired leases (left without leave: the work goes back to its queue)
//   promote `later` items past their due time
//   plan    which agent sessions to start: `now` items get a fresh session at once; `next` items get a session if the
//           role has none running; `later` items wait for a batch (--batch-later=N) or their due time
//
//   node supervisor.mjs tick  [--acceptance=<dir>] [--batch-later=3] [--cap=4]   one pass; prints steps and the plan
//   node supervisor.mjs watch [--acceptance=<dir>] [--batch-later=3] [--cap=4] [--max-min=30]
//        tick, then wait for a change to the state file or the next lease expiry or due time (a wake, not a poll), and
//        tick again; exits as soon as the plan asks for an agent session (that exit is the orchestrator's wake-up), or
//        after --max-min with nothing to do.
// Same state as meta.mjs (META_LIVE_DIR, META_STATE). Exit 0 always unless the state cannot be read.
import fs from "node:fs";
import path from "node:path";
import { LIVE, STATE, load, save, withLock, runTests, rep } from "./state.mjs";

const STAGE_SIGNER = { test1: "code", uat: "orderer", ship: "release" };

/** One pass over every order; repeated until nothing changes (an accepted UAT makes a ship step possible). */
export function tick(co, { acceptance = null } = {}) {
  const { engine, rooms, mailbox, log } = co;
  const steps = [];
  for (const m of mailbox.promote()) steps.push({ step: "promote", msg: m.id, order: m.ref });
  for (const x of rooms.recover()) steps.push({ step: "recover", run: x.run, role: x.role, order: x.order });
  for (let changed = true; changed;) {
    changed = false;
    for (const o of engine.orders.values()) {
      if (o.blocked || o.stage === "done") continue;
      if (o.stage === "test1") {
        const t = runTests(o.task);
        engine.advance(o.id, { stage: "test1", by: "code", verdict: t.pass ? "pass" : "revise", findings: t.pass ? null : t.output });
        steps.push({ step: "test1", order: o.id, result: t.pass ? "pass" : "revise", output: t.output });
        changed = true;
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
        const files = fs.readdirSync(src).filter((f) => f.endsWith(".mjs") && !f.endsWith(".test.mjs"));
        for (const f of files) fs.copyFileSync(path.join(src, f), path.join(dst, f));
        rooms.leave(run, { evidence: `live/shipped/${o.task}/ (${files.join(", ")})`, learned: null });
        rooms.closeSession(rooms.runs.get(run).session, "ship done");
        steps.push({ step: "ship", order: o.id, files });
        changed = true;
      }
    }
  }
  if (steps.length) log.add({ type: "supervisor-tick", steps: steps.map((s) => `${s.step}:${s.order ?? s.msg ?? s.run}`) });
  return steps;
}

/** Which agent sessions to start now. Pure: reads the state, changes nothing. */
export function plan(co, { batchLater = 3, cap = 4 } = {}) {
  const { org, rooms, mailbox } = co;
  const running = new Set([...rooms.runs.values()].filter((x) => x.state === "running").map((x) => x.role));
  const out = [];
  const consider = (role, msgs) => {
    if (!msgs.length) return;
    const now = msgs.filter((m) => m.priority === "now");
    for (const m of now) out.push({ role, why: "now: a fresh session at once", msgs: [m.id], cap: 1 });
    if (running.has(role)) return; // its running session drains next and later items itself
    const next = msgs.filter((m) => m.priority === "next");
    const later = msgs.filter((m) => m.priority === "later");
    const dueLater = later.filter((m) => m.due != null && m.due <= co.engine.clock.now());
    if (next.length || later.length >= batchLater || dueLater.length) {
      const take = [...next, ...later].slice(0, cap);
      out.push({ role, why: next.length ? `next: ${next.length} waiting, no session running` : `later: a batch of ${later.length}`, msgs: take.map((m) => m.id), cap: Math.min(cap, take.length) });
    }
  };
  for (const r of org.active()) {
    if (r.human || ["founder", "chief-of-staff", "manager", "release"].includes(r.level)) continue;
    if (r.level === "checker") continue; // the pool is planned once, below
    consider(r.id, mailbox.queue(r.id, "work"));
  }
  const checker = org.byLevel("checker")[0];
  if (checker) consider(checker.id, mailbox.queue("pool:checker", "work").filter((m) => co.engine.orders.get(m.ref).builder !== checker.id));
  return out;
}

/** When to wake next without polling: the nearest lease expiry or due time, in ms (null: only on a state change). */
export function nextTimer(co) {
  const now = co.engine.clock.now();
  const ts = [co.mailbox.nextExpiry(), ...[...co.mailbox.msgs.values()].filter((m) => m.state === "open" && m.priority === "later" && m.due != null).map((m) => m.due)].filter((t) => t != null);
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
    const wait = Math.min(r.wakeInMs ?? Infinity, end - Date.now());
    await new Promise((resolve) => {
      const name = path.basename(STATE);
      const w = fs.watch(path.dirname(STATE), (ev, f) => { if (f === name) done(); });
      const t = Number.isFinite(wait) ? setTimeout(done, wait) : null;
      function done() { w.close(); if (t) clearTimeout(t); setTimeout(resolve, 200); } // let the writer finish
    });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const opt = {};
  for (const a of argv) if (a.startsWith("--")) { const [k, ...v] = a.slice(2).split("="); opt[k] = v.length ? v.join("=") : true; }
  const opts = { acceptance: opt.acceptance ?? null, batchLater: Number(opt["batch-later"] ?? 3), cap: Number(opt.cap ?? 4) };
  const cmd = argv.find((a) => !a.startsWith("--"));
  const print = (x) => console.log(JSON.stringify(x, rep, 2));
  if (cmd === "tick") print(once(opts));
  else if (cmd === "watch") watch(opts, Number(opt["max-min"] ?? 30)).then(print);
  else { console.error("usage: node supervisor.mjs tick|watch [--acceptance=<dir>] [--batch-later=3] [--cap=4] [--max-min=30]"); process.exit(2); }
}
