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
//   node supervisor.mjs launched --role=<role> [--msgs=…]   the orchestrator started a session: plan it as starting
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
import { HERE, LIVE, STATE, load, save, withLock, runTests, runTest1, rep } from "./state.mjs";
import { syncOrders } from "./tracker.mjs";
import { sweepGoals } from "./goals.mjs";
import { expireContracts } from "./contractor.mjs";

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
        const t = runTest1(o);
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
        const files = fs.readdirSync(src).filter((f) => (f.endsWith(".mjs") || f.endsWith(".md")) && !f.endsWith(".test.mjs"));
        for (const f of files) fs.copyFileSync(path.join(src, f), path.join(dst, f));
        rooms.leave(run, { evidence: `live/shipped/${o.task}/ (${files.join(", ")})`, learned: null });
        rooms.closeSession(rooms.runs.get(run).session, "ship done");
        steps.push({ step: "ship", order: o.id, files });
        changed = true;
      }
    }
  }
  for (const id of expireContracts(co)) steps.push({ step: "contract-expired", contract: id });
  if (co.data) { syncOrders(co); for (const g of sweepGoals(co)) steps.push({ step: "goal-auto-red", goal: g }); }
  if (steps.length) log.add({ type: "supervisor-tick", steps: steps.map((s) => `${s.step}:${s.order ?? s.msg ?? s.run ?? s.contract ?? s.goal}`) });
  return steps;
}

/** Which agent sessions to start now. Pure: reads the state, changes nothing. */
export const LAUNCH_GRACE_MIN = 5;
export function plan(co, { batchLater: batchDefault = 3, cap: capDefault = 4 } = {}) {
  const { org, rooms, mailbox, log } = co;
  const running = new Set([...rooms.runs.values()].filter((x) => x.state === "running").map((x) => x.role));
  // A session the orchestrator has started but that has not entered a room yet is starting, not missing (live run 3:
  // the first watch fired 3 s after the launch and asked for the same session again). Past the grace period with no
  // enter, the launch failed and the role is planned again.
  const now = co.engine.clock.now();
  for (const l of log.events.filter((e) => e.type === "launch" && now - e.t < LAUNCH_GRACE_MIN)) {
    if (!log.events.some((e) => e.type === "enter" && e.role === l.role && e.t >= l.t)) running.add(l.role);
  }
  const out = [];
  const consider = (role, msgs) => {
    if (!msgs.length) return;
    // the lane's policy, when it sets them, overrides the command-line defaults
    const k = co.engine.policies.get(org.role(role)?.lane)?.active ? co.engine.policies.get(org.role(role).lane).versions[co.engine.policies.get(org.role(role).lane).active - 1].knobs : {};
    const batchLater = k.batchLater ?? batchDefault, cap = k.drainCap ?? capDefault;
    const now = msgs.filter((m) => m.priority === "now");
    for (const m of now) out.push({ role, why: "now: a fresh session at once", msgs: [m.id], cap: 1 });
    if (running.has(role)) return; // its running session drains next and later items itself
    const next = msgs.filter((m) => m.priority === "next");
    const later = msgs.filter((m) => m.priority === "later");
    const dueLater = later.filter((m) => m.due != null && m.due <= co.engine.clock.now());
    if (next.length || later.length >= batchLater || dueLater.length) {
      // benchmark 1: a cap of 4 left 1 of 5 pages to a whole new reader session (63k for one page). When the remainder
      // is small, the session takes it all: half a cap more costs less than a fresh session's start-up.
      const all = [...next, ...later];
      const take = all.length - cap <= Math.ceil(cap / 2) ? all : all.slice(0, cap);
      out.push({ role, why: next.length ? `next: ${next.length} waiting, no session running` : `later: a batch of ${later.length}`, msgs: take.map((m) => m.id), cap: take.length });
    }
  };
  for (const r of org.active()) {
    if (r.human || ["founder", "chief-of-staff", "manager", "release"].includes(r.level)) continue;
    if (r.level === "checker") continue; // the pool is planned once, below
    consider(r.id, mailbox.queue(r.id, "work"));
  }
  // An open engagement needs its contractor started once; a launch (any time) counts while the engagement is open.
  for (const c of co.engine.contracts?.values() ?? []) {
    if (c.state !== "open") continue;
    if (log.events.some((e) => e.type === "launch" && e.role === c.contractor)) continue;
    out.push({ role: c.contractor, why: `contract ${c.id} (${c.kind}) open, not started`, msgs: [], contract: c.id, cap: 1 });
  }
  const checker = org.byLevel("checker")[0];
  if (checker) consider(checker.id, mailbox.queue("pool:checker", "work").filter((m) => co.engine.orders.get(m.ref).builder !== checker.id));
  for (const j of judgment(co)) {
    // a launch reserves non-room work until the work is done or NON_ROOM_GRACE_MIN passes (no room enter to watch for)
    if (log.events.some((e) => e.type === "launch" && e.role === j.role && now - e.t < NON_ROOM_GRACE_MIN && (e.tasks ?? []).some((t) => j.tasks.some((u) => u.kind === t.kind && u.ref === t.ref)))) continue;
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
  const L = [`You are \`${item.role}\` (${r.level}) in a company run by a CLI.`, "", `Run every command from: ${HERE}`, pre ? `Prefix every command with: ${pre}` : "", ""];
  if (context) L.push(context.trim(), "");
  for (const t of item.tasks ?? []) {
    if (t.kind === "positions") L.push(`Meeting ${t.ref}: read it with \`node meta.mjs meeting show --id=${t.ref}\` (agenda, and the pack if any). For each item ${t.items.join(", ")}, write your own position: \`node meta.mjs meeting position --id=${t.ref} --by=${item.role} --item=<n> --text='…'\`. Positions stay private until the chair reveals them; argue from the order, the goals and what you know, and be specific.`);
    if (t.kind === "chair") L.push(`You chair meeting ${t.ref}: \`node meta.mjs meeting show --id=${t.ref}\`. For each item ${t.items.join(", ")}: write your own position (\`meeting position\`), then \`meeting reveal --id=${t.ref} --by=${item.role} --item=<n>\` (add \`--force\` if someone is missing; they are named in the minutes), read them (\`meeting read\`), and \`meeting decide --id=${t.ref} --by=${item.role} --item=<n> --decision='…'\` (answer every objection with \`--answers\`; follow-ups as \`--actions='[{"title":"…","owner":"<role>","due":"YYYY-MM-DD"}]'\`). Then \`meeting close --id=${t.ref} --by=${item.role}\`. The decision text is what builders will follow: make it concrete.`);
  }
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
    L.push(`1. Enter: \`node meta.mjs room enter --msg=${item.msgs[0]} --role=${item.role}\`. The JSON pack gives the order, stage, workdir, accept criteria, findings, history, memory and the exact \`next_with\` and \`leave_with\` commands. Your session cap is ${item.cap} (${item.msgs.length} item${item.msgs.length > 1 ? "s" : ""} queued${o ? `, starting with ${o.task}` : ""}).`);
    if (r.level === "checker") L.push("2. Check the work against its accept criteria and the shipped work it must agree with. Never fix it. Report defects by class: list every instance of a class, each as what is wrong → what is required.", `3. Hand in with \`next_with\` (\`--cap=${item.cap} --verdict=pass\` or \`--verdict=revise --findings='…'\`, \`--evidence=<path>\`, \`--learned='one line'\`) to take the next item in this session; on the last item, or when nothing is queued, use \`leave_with\`.`);
    else L.push("2. Do the work the accept criteria ask, in the workdir only. If the order has `checks`, run `node meta.mjs check --order=<O>` before you hand in: it runs the same test1 code will run.", `3. Hand in with \`next_with\` (\`--cap=${item.cap} --evidence=<path> --learned='one line'\`) to take the next item in this session; on the last item use \`leave_with\`.`);
    L.push("If a command refuses, read the message and fix what it names.");
  }
  L.push("", "Report back briefly: each item, its outcome, and anything that confused you.");
  return L.filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n");
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
  return [...by].map(([role, tasks]) => {
    tasks.sort((a, b) => ["chair", "positions", "delegate"].indexOf(a.kind) - ["chair", "positions", "delegate"].indexOf(b.kind));
    return { role, why: [...new Set(tasks.map((t) => t.kind))].map((k) => `${k}: ${tasks.filter((t) => t.kind === k).map((t) => t.ref).join(", ")}`).join("; "), msgs: [], cap: 1, tasks };
  });
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
  if (cmd === "launched") {
    // The orchestrator records each session it starts, so the next plan does not ask for it again.
    if (!opt.role) { console.error("usage: node supervisor.mjs launched --role=<role> [--msgs=M-1,M-2] [--why=…]"); process.exit(2); }
    print(withLock(() => { const co = load(); const e = co.log.add({ type: "launch", role: opt.role, msgs: opt.msgs ? String(opt.msgs).split(",") : [], why: opt.why ?? null }); save(co); return e; }));
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
  } else if (cmd === "tick") print(once(opts));
  else if (cmd === "watch") watch(opts, Number(opt["max-min"] ?? 30)).then(print);
  else { console.error("usage: node supervisor.mjs tick|watch [--acceptance=<dir>] [--batch-later=3] [--cap=4] [--max-min=30]"); process.exit(2); }
}
