import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// M7 review fixes (the kernel's part), each a regression test on the real CLIs with temp state:
//   1 K20  the gate's hold and notice are per item (gate, role, msg), not per planned batch: a regrouped batch is the
//          same work (no second run inside retryMin, no second notice), and a pass closes every notice it clears
//   2 K20  a refusal after a pass (the launch died before it entered) gets an open notice again (Mailbox.send dedupes
//          on a done message's key)
//   3 K20  planGated: an item the gate refuses is left out and the plan made again, so it does not hold a level cap
//          (or a lane's maxSessions) that another role's passing launch needs
//   4 K18  an open ritual order placed by hand (no schedKey) counts for its slug: no second order
//   5 K20  every item of a batch is gated in its own order's worktree
//   6 K18  a scheduled order's budget is a whole number of tokens above 0
//   7 K22  a serve.pid whose pid is now another process does not block a new serve
//   8 K19  a chair flow is ordered by the founder or the chief of staff, chaired by a chief of staff, vp or manager
//   9 K19  an approved budget sends a chair order's first item (no delegate step would)
//  10 K20  a notice whose item is gone (worked by a session the gate did not launch) closes
//  11 K10  the launcher's guard denies the M7 writers (board-mirror, events-export, rituals.mjs ship, commit-file,
//          m7-scope) to agent sessions
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import("../generator.mjs");
const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err || r.stdout); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const setState = (dir, fn) => { const f = path.join(dir, "state.json"); const s = JSON.parse(fs.readFileSync(f, "utf8")); fn(s); fs.writeFileSync(f, JSON.stringify(s)); };
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const msgs = (dir) => state(dir).mailbox.msgs.__map.map(([, m]) => m);
const notices = (dir) => msgs(dir).filter((m) => m.kind === "notice");
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m7r-${p}-`));
const okCmd = { argv: ["node", "-e", "process.exit(0)"], cwd: "${live}" };
const script = (dir, name, body) => { const f = path.join(dir, name); fs.writeFileSync(f, body); return f; };
const zeroGates = (dir) => setState(dir, (s) => { for (const k of Object.keys(s.data.gates ?? {})) s.data.gates[k].t = -1e9; });

function spec(extra = {}, { roles = [] } = {}) {
  return {
    name: "m7r",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "a" }, { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "build", "review"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "mgr", level: "manager", reportsTo: "head-of-product", lane: "a", room: "studio", floor: 2 },
      { id: "builder", level: "builder", reportsTo: "mgr", lane: "a", room: "studio", floor: 2 },
      ...roles,
      { id: "checker", level: "checker", reportsTo: "chief-of-staff", room: "quality", floor: 3 },
      { id: "release", level: "release", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
    ],
    flows: {
      lesson: { stages: [{ stage: "build", signer: "builder", evidence: ["work"] }, { stage: "qa", signer: "code", evidence: [], run: okCmd }, { stage: "check", signer: "checker", evidence: ["notes"] }, { stage: "ship", signer: "release", evidence: ["shipped"], run: okCmd }] },
      ritual: { stages: [{ stage: "run", signer: "chair", evidence: ["records/<ritual>.md"] }, { stage: "check", signer: "attendee", evidence: ["records/<ritual>.md"] }, { stage: "ship", signer: "code", evidence: [], run: okCmd }] },
    },
    ...extra,
  };
}
function init(s) {
  const dir = fresh("co");
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(s));
  ok(meta(dir, "init", `--spec-file=${f}`));
  return dir;
}
/** A gate script that logs each call and refuses while `flag` is missing, or (with `only`) only for a launch naming it. */
function gateScript(dir0, { only = null } = {}) {
  const flag = path.join(dir0, "pass"), calls = path.join(dir0, "calls.jsonl");
  const prog = script(dir0, "gate.mjs", `import fs from "node:fs"; const a = process.argv.slice(2); fs.appendFileSync(${JSON.stringify(calls)}, JSON.stringify({ argv: a }) + "\\n"); const agent = a.find((x) => x.startsWith("--agent=")) ?? ""; const ok = ${only ? `!agent.includes(${JSON.stringify(only)})` : `fs.existsSync(${JSON.stringify(flag)})`}; console.log(JSON.stringify({ kind: "build", ok, fails: ok ? [] : ["R1 ritual overdue: wbr"] }, null, 2)); process.exitCode = ok ? 0 : 1;\n`);
  const roles = only ? ["builder", "builder2"] : ["builder"];
  const gate = { id: "dispatch-check", roles, stages: ["build"], notify: "chief-of-staff", retryMin: 5, run: { argv: ["node", prog, "--running=${running}", "--agent=${launch}", "--worktree=${workdir}"], cwd: "${live}", pass: { json: "ok", equals: true }, errorExit: [2], findings: { fromStdout: '^\\s*"((?:C[1-4]|R[12])\\b[^"]*)"' } } };
  const read = () => (fs.existsSync(calls) ? fs.readFileSync(calls, "utf8").trim().split("\n").map((l) => JSON.parse(l).argv) : []);
  return { flag, gate, calls: read };
}
const lesson = (dir, task, to = "builder") => { const l = ok(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", `--title=${task}`, `--task=${task}`, "--accept=a lesson")); ok(meta(dir, "order", "delegate", l.order, "--by=mgr", `--to=${to}`)); return l.order; };
const agentOf = (argv) => argv.find((x) => x.startsWith("--agent=")).slice(8);

test("M7 review 1+5: the gate holds and notifies per item: a regrouped batch is not gated again inside retryMin nor notified twice; each item is gated in its own order; a pass closes every notice", () => {
  const dir0 = fresh("gate1");
  const g = gateScript(dir0);
  const dir = init(spec({ launchGate: g.gate }));
  lesson(dir, "L1");
  const c1 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.ok(c1.steps.some((s) => s.step === "launch-gate" && s.result === "refused"));
  assert.deepEqual(notices(dir).map((m) => [m.state, m.ref, m.body.unit]), [["open", "O-1", "M-1"]]);
  // L2 arrives: the planner regroups the builder's items as [M-1, M-3]; M-1 is held (not run again), only L2 is gated
  lesson(dir, "L2");
  const c2 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.ok(!c2.launch.some((x) => x.role === "builder"));
  assert.deepEqual(g.calls().map(agentOf), ["system3-meta builder O-1 L1", "system3-meta builder O-2 L2"], "L1 was not gated again inside retryMin; L2 was gated in its own order");
  assert.deepEqual(g.calls().map((a) => a.find((x) => x.startsWith("--worktree=")).slice(11)), [path.join(dir, "work", "L1"), path.join(dir, "work", "L2")]);
  assert.deepEqual(notices(dir).map((m) => [m.state, m.ref, m.body.unit]), [["open", "O-1", "M-1"], ["open", "O-2", "M-3"]], "one notice per blocked item, not a second for L1");
  // a third cycle inside retryMin: nothing runs, nothing is sent
  ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.equal(g.calls().length, 2);
  assert.equal(notices(dir).length, 2);
  // it passes: both items are gated (each in its order), the batch launches, and both notices close
  fs.writeFileSync(g.flag, ""); zeroGates(dir);
  const c3 = ok(sup(dir, "cycle", "--max-min=0.02"));
  const b = c3.launch.find((x) => x.role === "builder");
  assert.deepEqual(b?.msgs, ["M-1", "M-3"], JSON.stringify(c3));
  assert.deepEqual(g.calls().slice(2).map(agentOf), ["system3-meta builder O-1 L1", "system3-meta builder O-2 L2"]);
  assert.deepEqual(events(dir, "launch").find((e) => e.role === "builder").gate.map((r) => [r.unit, r.pass]), [["M-1", true], ["M-3", true]]);
  assert.deepEqual(notices(dir).map((m) => m.state), ["done", "done"], "no notice is left open for work that launched");
});

test("M7 review 2: a refusal after a pass (the launch died before it entered) gets an open notice again", () => {
  const dir0 = fresh("gate2");
  const g = gateScript(dir0);
  const dir = init(spec({ launchGate: g.gate }));
  lesson(dir, "L1");
  ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.deepEqual(notices(dir).map((m) => m.state), ["open"]);
  fs.writeFileSync(g.flag, ""); zeroGates(dir);
  const c2 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.ok(c2.launch.some((x) => x.role === "builder"));
  assert.deepEqual(notices(dir).map((m) => m.state), ["done"]);
  const seq = events(dir, "launch").find((e) => e.role === "builder").seq;
  ok(meta(dir, "launch", "finished", `--launch=${String(seq).padStart(4, "0")}-builder`, "--role=builder", "--ok=false", "--tokens=10"));
  fs.rmSync(g.flag); zeroGates(dir);
  const c3 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.ok(c3.steps.some((s) => s.step === "launch-gate" && s.result === "refused"), JSON.stringify(c3.steps));
  const open = notices(dir).filter((m) => m.state === "open");
  assert.equal(open.length, 1, "the chief of staff is told about the second refusal");
  assert.equal(open[0].body.unit, "M-1");
});

test("M7 review 3: an item the gate refuses forever does not hold the level cap: the other builder's launch is planned and passes", () => {
  const dir0 = fresh("gate3");
  const g = gateScript(dir0, { only: "L1" });
  const s = spec({ launchGate: g.gate, policy: { levelCaps: { builder: 1 } } }, { roles: [{ id: "builder2", level: "builder", reportsTo: "mgr", lane: "a", room: "studio", floor: 2 }] });
  assert.deepEqual(G.validateSpec(s), []);
  const dir = init(s);
  lesson(dir, "L1", "builder");
  lesson(dir, "L2", "builder2");
  const c1 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.deepEqual(c1.launch.map((x) => x.role), ["builder2"], JSON.stringify(c1));
  assert.deepEqual(g.calls().map(agentOf), ["system3-meta builder O-1 L1", "system3-meta builder2 O-2 L2"]);
  assert.deepEqual(events(dir, "launch-gate").map((e) => e.order), ["O-1"]);
});

test("M7 review 4+6: the scheduler counts an open hand-placed order of the same ritual, and refuses a budget that is not a whole number above 0", () => {
  const dir0 = fresh("sched");
  const out = path.join(dir0, "orders.json");
  const prog = script(dir0, "due.mjs", `import fs from "node:fs"; console.log(JSON.stringify({ ok: true, orders: JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")) }));\n`);
  const sched = { id: "rituals", role: "chief-of-staff", flow: "ritual", every: "tick", minIntervalMin: 5, run: { argv: ["node", prog], pass: { json: "ok", equals: true } } };
  const dir = init(spec({ schedulers: [sched] }));
  const o = (r, extra = {}) => ({ key: `ritual:${r}`, title: `Ritual ${r}`, task: `RITUAL-${r}-2`, slug: r, chair: "chief-of-staff", attendee: "head-of-product", accept: `hold ${r}`, ...extra });
  fs.writeFileSync(out, JSON.stringify([o("wbr"), o("retro", { budget: "lots" }), o("demo-crit", { budget: -5, chair: "head-of-product", attendee: "chief-of-staff" }), o("founder-digest", { budget: 1.5 })]));
  ok(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=chief-of-staff", "--attendee=head-of-product", "--title=WBR", "--task=RITUAL-wbr-1", "--slug=wbr", "--accept=hold the WBR"));
  ok(sup(dir, "tick"));
  const run = events(dir, "scheduler-run").at(-1);
  assert.deepEqual(run.skipped.map((x) => [x.key, x.order]), [["ritual:wbr", "O-1"]], "the hand-placed WBR is open: no second WBR");
  assert.deepEqual(run.refused.map((x) => x.key), ["ritual:retro", "ritual:demo-crit", "ritual:founder-digest"]);
  assert.match(run.refused[0].why, /budget is a whole number of tokens above 0, not "lots"/);
  assert.equal(state(dir).engine.orders.__map.length, 1);
});

test("M7 review 7: a serve.pid naming a live process that is not a serve does not block the next serve", async () => {
  const { serveAlive } = await import("../supervisor.mjs");
  const dir = init(spec());
  const sleeper = spawn("sleep", ["30"]);
  try {
    assert.equal(serveAlive(sleeper.pid), false, "alive, but not supervisor.mjs serve");
    assert.equal(serveAlive(process.pid), false, "never itself");
    fs.writeFileSync(path.join(dir, "serve.pid"), String(sleeper.pid));
    const r = sup(dir, "serve", "--max-min=0.02", "--idle-min=5");
    assert.equal(r.code, 0, r.stdout + r.err);
    assert.ok(!/"refused"/.test(r.stdout), r.stdout);
    assert.match(r.stdout, /"event":"stopped"/);
  } finally { sleeper.kill(); }
  // a real serve is still seen as one
  const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE;
  const p = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--max-min=0.3", "--idle-min=5"], { env: e });
  try {
    for (let i = 0; i < 100 && !fs.existsSync(path.join(dir, "serve.pid")); i++) await new Promise((r) => setTimeout(r, 50));
    assert.equal(serveAlive(p.pid), true);
    const r2 = sup(dir, "serve", "--max-min=0.02");
    assert.equal(r2.code, 1);
    assert.match(r2.stdout, /another serve \(pid \d+\) runs on this state/);
  } finally { p.kill("SIGKILL"); }
});

test("M7 review 8: a chair flow's order is placed by the founder or the chief of staff only, and chaired by a chief of staff, vp or manager; its scheduler's role likewise", () => {
  const dir = init(spec());
  const r = (by, chair, attendee, task) => meta(dir, "order", "new", "--flow=ritual", `--by=${by}`, `--chair=${chair}`, `--attendee=${attendee}`, "--title=WBR", `--task=${task}`, "--slug=wbr", "--accept=hold");
  assert.match(r("builder", "head-of-product", "chief-of-staff", "R1").err, /chain: builder may not order a ritual order \(a chair flow is ordered by: founder, chief-of-staff\)/);
  assert.match(r("checker", "chief-of-staff", "checker", "R2").err, /chain: checker may not order/);
  assert.match(r("chief-of-staff", "builder", "checker", "R3").err, /--chair=builder is a builder; a chair is one of: chief-of-staff, vp, manager/);
  assert.match(r("head-of-product", "head-of-product", "chief-of-staff", "R4").err, /chain: head-of-product may not order/);
  assert.equal(state(dir).engine.orders.__map.length, 0);
  assert.equal(ok(r("chief-of-staff", "mgr", "checker", "R5")).stage, "run", "a manager chairs; any agent attends");
  const sched = { id: "rituals", role: "head-of-product", flow: "ritual", every: "tick", run: okCmd };
  assert.match(G.validateSpec(spec({ schedulers: [sched] })).join("\n"), /scheduler rituals: flow ritual is a chair flow, ordered by founder or chief-of-staff: role head-of-product is a vp/);
  assert.deepEqual(G.validateSpec(spec({ schedulers: [{ ...sched, flow: "lesson" }] })), [], "a lesson flow's scheduler may be a vp");
});

test("M7 review 9: a chair order over its orderer's limit gets its first item when the founder approves the budget", () => {
  const dir = init(spec());
  const o = ok(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=chief-of-staff", "--attendee=head-of-product", "--title=WBR", "--task=R1", "--slug=wbr", "--accept=hold", "--budget=900000"));
  assert.equal(o.stage, "budget");
  assert.ok(!msgs(dir).some((m) => m.kind === "work" && m.ref === o.order));
  ok(meta(dir, "approval", "decide", "--ids=A-1", "--decision=approve", "--by=founder", "--words=approve the budget", "--channel=chat"));
  assert.equal(orderOf(dir, o.order).stage, "run");
  const w = msgs(dir).filter((m) => m.kind === "work" && m.ref === o.order && m.state === "open");
  assert.deepEqual(w.map((m) => [m.to, m.body.stage]), [["role:chief-of-staff", "run"]], "the chair has it at once, not after the watchdog");
});

test("M7 review 10: a gate notice closes when its item is gone some other way (a session took it by hand); a cancel withdraws it", () => {
  const dir0 = fresh("gate10");
  const g = gateScript(dir0);
  const dir = init(spec({ launchGate: g.gate }));
  lesson(dir, "L1");
  ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.deepEqual(notices(dir).map((m) => [m.state, m.body.unit]), [["open", "M-1"]]);
  // the builder's item is worked without the gate's launch (a person started the session): build is done, the order at check
  const e = ok(meta(dir, "room", "enter", "--msg=M-1", "--role=builder"));
  ok(meta(dir, "room", "leave", `--run=${e.run}`, "--evidence=work"));
  const t = ok(sup(dir, "tick"));
  assert.ok(t.steps.some((s) => s.step === "gate-notice" && s.result === "closed"), JSON.stringify(t.steps));
  assert.deepEqual(notices(dir).map((m) => m.state), ["done"]);
  assert.match(events(dir, "notice-closed")[0].why, /no longer queued/);
  // a cancelled order's notice leaves the queue with its other messages (K8 withdraw)
  const id2 = lesson(dir, "L2");
  ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.equal(notices(dir).filter((m) => m.state === "open" && m.ref === id2).length, 1);
  ok(meta(dir, "order", "cancel", id2, "--by=chief-of-staff", "--reason=not needed"));
  assert.equal(notices(dir).filter((m) => m.state === "open").length, 0);
});

test("M7 review 11: the guard denies the M7 writers to an agent session; rituals.mjs record (code's post-check) stays allowed", async () => {
  const { decide } = await import("../launcher/guard.mjs");
  const A = "/home/user/system-3-company/company/sibling/system3-meta/adapters/s3c";
  const ctx = { role: "demo-builder", tools: ["Bash"] };
  const d = (command) => decide("Bash", { command }, ctx)?.why ?? null;
  assert.match(d(`node ${A}/board-mirror.mjs --live=/tmp/x --repo=/home/user/s3c-wt/m7-int --run=m7 --commit`), /board-mirror\.mjs \(a code stage\)/);
  assert.match(d(`node ${A}/events-export.mjs --live=/tmp/x --repo=/home/user/s3c-wt/m7-int --commit`), /events-export\.mjs \(a code stage\)/);
  assert.match(d(`node ${A}/rituals.mjs ship wbr --repo=. --base=abc --from-sha=HEAD --into=/home/user/s3c-wt/m7-int`), /rituals\.mjs ship \(a code stage\)/);
  assert.match(d(`cd ${A} && node rituals.mjs --x ship wbr`), /rituals\.mjs ship/);
  assert.match(d(`node ${A}/m7-scope.mjs rituals.mjs record wbr --repo=.`), /m7-scope\.mjs \(a code stage\)/);
  assert.match(d(`node -e "import('${A}/lib/commit-file.mjs').then((m) => m.commitPaths('/x', ['a'], 'm'))"`), /commit-file\.mjs \(a code stage\)/);
  assert.equal(d(`node ${A}/rituals.mjs record wbr --repo=. --base=abc`), null);
  assert.equal(d(`node ${A}/rituals.mjs due --repo=/home/user/s3c-wt/m7-int --roles=a,b`), null);
});
