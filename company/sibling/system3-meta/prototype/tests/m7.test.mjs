import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// M7 (plan 2026-10-21 §M7, "one cycle of the operating loop"): the kernel pieces the M7 run needs. Each case drives the
// real CLIs (meta.mjs, supervisor.mjs) on temp state, with small node scripts standing in for the company's tools (the
// adapters' own tests run those tools: adapters/s3c/tests/rituals, events-export, board-mirror, m7-spec):
//   K19  several flows per spec (`flows` beside the legacy `flow`), `order new --flow`, a chair flow's orders
//   K18  schedulers: code places one open order per key from a cmd's JSON (the ritual scheduler)
//   K20  the launch gate: a cmd before a planned session is reserved; a refusal holds it with a notice, deduped
//   K21  exports hand back outside ids (ext:W-n) for the tracker (board-mirror.mjs)
//   K22  serve resumes: --max-min exits 0 with a serve-stop; a killed serve's jobs are re-adopted, nothing launched twice
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
const work = (dir) => msgs(dir).filter((m) => m.kind === "work");
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m7-${p}-`));
const okCmd = { argv: ["node", "-e", "process.exit(0)"], cwd: "${live}" };
/** A small company with both kinds of flow: a lesson flow (build → qa → check → ship) and a ritual flow (run by the
 *  chair → check by the attendee → ship by code). */
function spec(extra = {}, { qa = okCmd, async = false } = {}) {
  return {
    name: "m7t",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "a" }, { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "build", "review"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "mgr", level: "manager", reportsTo: "head-of-product", lane: "a", room: "studio", floor: 2 },
      { id: "builder", level: "builder", reportsTo: "mgr", lane: "a", room: "studio", floor: 2 },
      { id: "checker", level: "checker", reportsTo: "chief-of-staff", room: "quality", floor: 3 },
      { id: "release", level: "release", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
    ],
    flows: {
      lesson: { stages: [{ stage: "build", signer: "builder", evidence: ["work"] }, { stage: "qa", signer: "code", evidence: [], run: qa, ...(async ? { async: true } : {}) }, { stage: "check", signer: "checker", evidence: ["notes"] }, { stage: "ship", signer: "release", evidence: ["shipped"], run: okCmd }] },
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
const ritual = (dir, extra = []) => meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=chief-of-staff", "--attendee=head-of-product", "--title=WBR", "--task=RITUAL-wbr-1", "--slug=wbr", "--accept=hold the WBR", ...extra);
const script = (dir, name, body) => { const f = path.join(dir, name); fs.writeFileSync(f, body); return f; };

test("K19: flows {lesson, ritual} beside the legacy flow: each validated by name, a chair signer only in a chair flow; ORG.md lists both", () => {
  assert.deepEqual(G.validateSpec(spec()), []);
  assert.deepEqual(G.specFlows(spec()).map((f) => f.name), ["lesson", "ritual"]);
  assert.equal(G.defaultFlow(spec()).name, "lesson");
  // the legacy single flow is still valid, and is the default
  const legacy = spec(); legacy.flow = { name: "task", ...legacy.flows.lesson }; delete legacy.flows;
  assert.deepEqual(G.validateSpec(legacy), []);
  assert.equal(G.defaultFlow(legacy).name, "task");
  const v = (mut) => { const s = spec(); mut(s); return G.validateSpec(s).join("\n"); };
  assert.match(v((s) => { s.flows.ritual.stages[1].signer = "chair"; }), /flow ritual: flow problem: check must be signed independently of build/);
  assert.match(v((s) => { s.flows.lesson.stages[2].signer = "attendee"; }), /flow lesson: stage check: a attendee signs only in a chair flow/);
  assert.match(v((s) => { s.flows.ritual.stages.push({ stage: "uat", signer: "orderer", evidence: ["x"] }); }), /flow ritual: flow problem: .*no builder or manager to sign uat/);
  assert.match(v((s) => { s.flows.ritual.name = "other"; }), /flows is \{<name>/);
  assert.match(v((s) => { s.flow = { name: "ritual", ...s.flows.lesson }; }), /flow names are unique/);
  assert.match(v((s) => { delete s.flows; }), /missing flow/);
  assert.match(v((s) => { s.flows.lesson.stages[0].signer = "checker"; }), /flow lesson: the first stage is signed by the builder/);
  const dir = init(spec());
  const org = fs.readFileSync(path.join(dir, "ORG.md"), "utf8");
  assert.match(org, /one of 2 flows: `lesson` \(the default\) or `ritual`/);
  assert.match(org, /### ritual \(each order names its chair[\s\S]*\*\*run\*\*, signed by the chair[\s\S]*\*\*check\*\*, signed by the attendee/);
  assert.deepEqual(events(dir, "flow-active").map((e) => e.flow), ["lesson@v1", "ritual@v1"]);
});

test("K19: order new --flow=ritual names a chair and an attendee (no manager): the chair works run, only the attendee signs check, a revise goes back to run", () => {
  const dir = init(spec());
  // refusals: --to on a chair flow; the same role twice; a person as chair; an unknown flow; --chair on a lesson order
  assert.match(ritual(dir, ["--to=mgr"]).err, /not a manager \(--to\)/);
  assert.match(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=head-of-product", "--attendee=head-of-product", "--title=t", "--task=R1", "--accept=a").err, /another role than the chair/);
  assert.match(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=founder", "--attendee=head-of-product", "--title=t", "--task=R1", "--accept=a").err, /--chair=founder is not an active agent role/);
  assert.match(meta(dir, "order", "new", "--flow=nope", "--by=chief-of-staff", "--to=mgr", "--title=t", "--task=R1", "--accept=a").err, /no active flow nope/);
  assert.match(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", "--chair=head-of-product", "--attendee=checker", "--title=t", "--task=L0", "--accept=a").err, /only a chair flow names a chair/);
  const r = ok(ritual(dir));
  assert.deepEqual([r.order, r.stage, r.slug], ["O-1", "run", "wbr"]);
  const o = orderOf(dir, "O-1");
  assert.deepEqual([o.flow, o.chair, o.attendee, o.builder, o.manager, o.orderer], ["ritual@v1", "chief-of-staff", "head-of-product", "chief-of-staff", "chief-of-staff", "chief-of-staff"]);
  assert.match(meta(dir, "order", "delegate", "O-1", "--by=chief-of-staff", "--to=builder").err, /chaired by chief-of-staff: nobody delegates it/);
  // the chair's item is in role:chief-of-staff at once, and the planner plans the chair (the chief of staff takes named items only)
  const m1 = work(dir).find((m) => m.ref === "O-1");
  assert.deepEqual([m1.to, m1.body.stage], ["role:chief-of-staff", "run"]);
  assert.ok(ok(sup(dir, "tick")).plan.some((p) => p.role === "chief-of-staff" && p.msgs.includes(m1.id)));
  const e1 = ok(meta(dir, "room", "enter", `--msg=${m1.id}`, "--role=chief-of-staff"));
  ok(meta(dir, "room", "leave", `--run=${e1.run}`, "--evidence=records/wbr.md"));
  const m2 = work(dir).find((m) => m.ref === "O-1" && m.body.stage === "check");
  assert.equal(m2.to, "role:head-of-product");
  // the chair is the order's worker: K4's guard keeps it off the independent check
  assert.match(meta(dir, "room", "enter", `--msg=${m2.id}`, "--role=chief-of-staff").err, /may not take|built O-1/);
  const e2 = ok(meta(dir, "room", "enter", `--msg=${m2.id}`, "--role=head-of-product"));
  const back = ok(meta(dir, "room", "leave", `--run=${e2.run}`, "--evidence=records/wbr.md", "--verdict=revise", "--findings=no decision section"));
  assert.deepEqual([back.next_stage, back.loops], ["run", 1]);
  assert.equal(orderOf(dir, "O-1").history.find((h) => h.stage === "run").evidence, "records/wbr.md", "a stage's evidence is in its history (events-export names the record)");
  // round two: run, check pass, ship by code: done
  const m3 = work(dir).find((m) => m.ref === "O-1" && m.state === "open" && m.body.stage === "run");
  const e3 = ok(meta(dir, "room", "enter", `--msg=${m3.id}`, "--role=chief-of-staff"));
  ok(meta(dir, "room", "leave", `--run=${e3.run}`, "--evidence=records/wbr.md"));
  const m4 = work(dir).find((m) => m.ref === "O-1" && m.state === "open" && m.body.stage === "check");
  const e4 = ok(meta(dir, "room", "enter", `--msg=${m4.id}`, "--role=head-of-product"));
  ok(meta(dir, "room", "leave", `--run=${e4.run}`, "--evidence=records/wbr.md", "--verdict=pass"));
  ok(sup(dir, "tick"));
  assert.equal(orderOf(dir, "O-1").stage, "done");
  // a lesson order in the same company still goes to a manager, starts at build and is delegated
  const l = ok(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", "--title=L", "--task=L1", "--accept=a lesson"));
  assert.equal(l.stage, "build");
  ok(meta(dir, "order", "delegate", l.order, "--by=mgr", "--to=builder"));
});

test("K18: a scheduler places one open order per key from its cmd's JSON, as its role's, into its flow; a failed run places nothing", () => {
  const dir0 = fresh("sched");
  const out = path.join(dir0, "orders.json");
  const prog = script(dir0, "due.mjs", `import fs from "node:fs"; const x = JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")); if (x.exit) { console.log("environment rituals-due: boom"); console.log(JSON.stringify({ ok: false })); process.exit(x.exit); } console.log(JSON.stringify({ ok: true, orders: x.orders }));\n`);
  const want = (orders, exit = 0) => fs.writeFileSync(out, JSON.stringify({ orders, exit }));
  const o = (r, chair, attendee, n = 1) => ({ key: `ritual:${r}`, title: `Ritual ${r}`, task: `RITUAL-${r}-${n}`, slug: r, chair, attendee, accept: `hold ${r}`, budget: 100000 });
  const sched = { id: "rituals", role: "chief-of-staff", flow: "ritual", every: "tick", minIntervalMin: 5, run: { argv: ["node", prog], pass: { json: "ok", equals: true }, errorExit: [2, 3], findings: { fromStdout: "^environment [\\w-]+: (.*)$" } } };
  // validation
  const bad = (mut) => { const s = spec({ schedulers: [{ ...sched, run: { ...sched.run } }] }); mut(s.schedulers[0]); return G.validateSpec(s).join("\n"); };
  assert.deepEqual(G.validateSpec(spec({ schedulers: [sched] })), []);
  assert.match(bad((x) => { x.flow = "nope"; }), /scheduler rituals: flow nope is one of the spec's flows/);
  assert.match(bad((x) => { x.minIntervalMin = 0; }), /minIntervalMin is 0.5-1440/);
  assert.match(bad((x) => { x.role = "builder"; }), /role builder is an agent role that orders work/);
  assert.match(bad((x) => { x.run.argv = ["node", prog, "${slug}"]; }), /reads only \$\{live\} and \$\{stage\}/);
  const dir = init(spec({ schedulers: [sched] }));
  want([o("founder-digest", "chief-of-staff", "head-of-product"), o("demo-crit", "head-of-product", "chief-of-staff"), { key: "bad key!", title: "x", task: "x", accept: "x" }]);
  const t = ok(sup(dir, "tick"));
  assert.ok(t.steps.some((s) => s.step === "scheduled" && s.order === "O-1" && s.result === "ritual:founder-digest"));
  const a = orderOf(dir, "O-1"), b = orderOf(dir, "O-2");
  assert.deepEqual([a.flow, a.chair, a.attendee, a.task, a.slug, a.schedKey, a.orderer, a.budget, a.stage], ["ritual@v1", "chief-of-staff", "head-of-product", "RITUAL-founder-digest-1", "founder-digest", "ritual:founder-digest", "chief-of-staff", 100000, "run"]);
  assert.equal(b.chair, "head-of-product");
  const run1 = events(dir, "scheduler-run").at(-1);
  assert.deepEqual([run1.pass, run1.placed.length, run1.refused.length], [true, 2, 1]);
  // within minIntervalMin it does not run again
  ok(sup(dir, "tick"));
  assert.equal(events(dir, "scheduler-run").length, 1);
  // past it: an open order of the same key is not placed twice; a cancelled one is placed again (a new task)
  setState(dir, (s) => { s.data.schedulers.rituals.t = 0; });
  want([o("founder-digest", "chief-of-staff", "head-of-product", 2), o("demo-crit", "head-of-product", "chief-of-staff", 2)]);
  ok(meta(dir, "order", "cancel", "O-2", "--by=chief-of-staff", "--reason=test"));
  ok(sup(dir, "tick"));
  const run2 = events(dir, "scheduler-run").at(-1);
  assert.deepEqual([run2.skipped.map((x) => x.order), run2.placed.map((x) => x.order)], [["O-1"], ["O-3"]]);
  assert.equal(orderOf(dir, "O-3").task, "RITUAL-demo-crit-2");
  // a failing run is recorded (pass false, its finding) and places nothing
  setState(dir, (s) => { s.data.schedulers.rituals.t = 0; });
  want([o("wbr", "chief-of-staff", "head-of-product")], 3);
  ok(sup(dir, "tick"));
  const run3 = events(dir, "scheduler-run").at(-1);
  assert.deepEqual([run3.pass, run3.stageError, run3.placed.length], [false, true, 0]);
  assert.match(run3.findings, /boom/);
  assert.equal(state(dir).engine.orders.__map.length, 3);
});

test("K20: a launch gate refuses a builder's build launch (not reserved, a launch-gate event, one notice to the chief of staff), holds it for retryMin, and lets it through once it passes", () => {
  const dir0 = fresh("gate");
  const flag = path.join(dir0, "pass"), calls = path.join(dir0, "calls.jsonl");
  const prog = script(dir0, "gate.mjs", `import fs from "node:fs"; fs.appendFileSync(${JSON.stringify(calls)}, JSON.stringify({ argv: process.argv.slice(2), cwd: process.cwd() }) + "\\n"); const ok = fs.existsSync(${JSON.stringify(flag)}); console.log(JSON.stringify({ kind: "build", ok, fails: ok ? [] : ["R1 ritual overdue: wbr (108 h (limit 24 h)); run it before new work"] }, null, 2)); process.exitCode = ok ? 0 : 1;\n`);
  const gate = { id: "dispatch-check", roles: ["builder"], stages: ["build"], notify: "chief-of-staff", retryMin: 5, run: { argv: ["node", prog, "--kind=build", "--role=${role}", "--running=${running}", "--builders=${builders}", "--agent=${launch}", "--worktree=${workdir}"], cwd: "${live}", pass: { json: "ok", equals: true }, errorExit: [2], findings: { fromStdout: '^\\s*"((?:C[1-4]|R[12])\\b[^"]*)"' } } };
  const bad = (mut) => { const s = spec({ launchGate: { ...gate } }); mut(s.launchGate); return G.validateSpec(s).join("\n"); };
  assert.deepEqual(G.validateSpec(spec({ launchGate: gate })), []);
  assert.match(bad((g) => { g.roles = ["nobody"]; }), /launchGate dispatch-check: roles are agent roles/);
  assert.match(bad((g) => { g.stages = ["deploy"]; }), /stages are stages of the spec's flows/);
  assert.match(bad((g) => { g.run = { ...g.run, route: { x: "park" } }; }), /run has no route/);
  const dir = init(spec({ launchGate: gate }));
  const l = ok(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", "--title=L", "--task=L1", "--accept=a lesson"));
  ok(meta(dir, "order", "delegate", l.order, "--by=mgr", "--to=builder"));
  // a ritual order's chair is not gated (the gate names the builder's build only)
  ok(ritual(dir));
  const c1 = ok(sup(dir, "cycle", "--max-min=0.05"));
  assert.deepEqual(c1.launch.map((x) => x.role), ["chief-of-staff"], "the chair launches; the builder is held");
  assert.ok(c1.steps.some((s) => s.step === "launch-gate" && s.result === "refused" && /R1 ritual overdue: wbr/.test(s.output)));
  const ev = events(dir, "launch-gate");
  assert.equal(ev.length, 1);
  assert.deepEqual([ev[0].gate, ev[0].role, ev[0].order, ev[0].stage, ev[0].pass], ["dispatch-check", "builder", "O-1", "build", false]);
  assert.match(ev[0].findings, /^R1 ritual overdue: wbr/);
  assert.ok(!events(dir, "launch").some((e) => e.role === "builder"), "not reserved");
  const notes = () => msgs(dir).filter((m) => m.kind === "notice");
  assert.deepEqual(notes().map((m) => [m.to, m.state, m.ref, m.body.gate]), [["chief-of-staff", "open", "O-1", "dispatch-check"]]);
  const call = JSON.parse(fs.readFileSync(calls, "utf8").trim().split("\n")[0]);
  assert.deepEqual(call.argv.slice(1, 4), ["--role=builder", "--running=1", "--builders=0"], "the chair's launch, passed first in the same plan, counts");
  assert.match(call.argv[4], /^--agent=system3-meta builder O-1 L1$/);
  assert.equal(call.argv[5], `--worktree=${path.join(dir, "work", "L1")}`);
  // within retryMin the gate is not run again, the launch stays held, and no second notice is sent
  const c2 = ok(sup(dir, "cycle", "--max-min=0.02"));
  assert.ok(!c2.launch.some((x) => x.role === "builder"));
  assert.equal(fs.readFileSync(calls, "utf8").trim().split("\n").length, 1);
  assert.equal(notes().length, 1);
  // it passes now (R1 cleared): past retryMin the gate runs again and the launch is reserved with the gate's result
  fs.writeFileSync(flag, "");
  setState(dir, (s) => { for (const k of Object.keys(s.data.gates)) s.data.gates[k].t = 0; });
  const c3 = ok(sup(dir, "cycle", "--max-min=0.05"));
  const b = c3.launch.find((x) => x.role === "builder");
  assert.ok(b, JSON.stringify(c3));
  const le = events(dir, "launch").find((e) => e.role === "builder");
  assert.deepEqual(le.gate.map((g) => [g.id, g.pass]), [["dispatch-check", true]]);
  assert.equal(notes()[0].state, "done", "the refusal's notice closes when the gate passes");
  // the chief of staff's launch is still in flight (reserved, not yet entered): it counts
  const last = JSON.parse(fs.readFileSync(calls, "utf8").trim().split("\n").at(-1));
  assert.deepEqual(last.argv.slice(2, 4), ["--running=1", "--builders=0"]);
});

test("K20: the chief of staff's brief lists code's open notices", async () => {
  const { briefFor } = await import("../supervisor.mjs");
  const notes = [{ id: "M-9", kind: "notice", state: "open", to: "chief-of-staff", ref: "O-1", body: { gate: "dispatch-check", role: "builder", stage: "build", findings: "R1 ritual overdue: wbr" } }];
  const co = { org: { role: () => ({ level: "chief-of-staff" }), active: () => [] }, mailbox: { msgs: new Map(notes.map((m) => [m.id, m])) }, engine: { orders: new Map(), flows: new Map() }, data: {}, spec: {} };
  const b = briefFor(co, { role: "chief-of-staff", msgs: [], tasks: [{ kind: "ask", ref: "ISS-1" }], cap: 1 });
  assert.match(b, /Notices from code[\s\S]*M-9: dispatch-check refused builder for O-1 at build: R1 ritual overdue: wbr/);
});

test("K21 (board-mirror): an export's JSON hands back ext:<SYS>-<id> labels; code puts one per system on the order's tracker item", () => {
  const dir0 = fresh("labels");
  const out = path.join(dir0, "labels.json");
  const prog = script(dir0, "mirror.mjs", `import fs from "node:fs"; console.log(fs.readFileSync(${JSON.stringify(out)}, "utf8").trim());\n`);
  const dir = init(spec({ exports: [{ id: "board-mirror", role: "chief-of-staff", every: "tick", run: { argv: ["node", prog] } }] }));
  ok(ritual(dir));
  fs.writeFileSync(out, JSON.stringify({ ok: true, labels: { "O-1": ["ext:W-7", "not-ext", "ext:"], "O-9": ["ext:W-1"] } }));
  ok(sup(dir, "tick"));
  const item = () => state(dir).data.tracker.items.__map.map(([, i]) => i).find((i) => i.order === "O-1");
  assert.deepEqual(item().labels.filter((l) => l.startsWith("ext:")), ["ext:W-7"]);
  assert.deepEqual(events(dir, "export").at(-1).labelled, ["O-1 ext:W-7"]);
  fs.writeFileSync(out, JSON.stringify({ ok: true, labels: { "O-1": ["ext:W-8"] } }));
  ok(sup(dir, "tick"));
  assert.deepEqual(item().labels.filter((l) => l.startsWith("ext:")), ["ext:W-8"], "a new id for the same system replaces the old");
  // a failing export changes no label
  fs.writeFileSync(out, "not json");
  ok(sup(dir, "tick"));
  assert.deepEqual(item().labels.filter((l) => l.startsWith("ext:")), ["ext:W-8"]);
});

/** serve as a child: its JSON lines, and a way to wait for one. */
function serve(dir, args) {
  const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE;
  const p = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", ...args], { env: e });
  const lines = []; let buf = "";
  p.stdout.on("data", (d) => { buf += d; let i; while ((i = buf.indexOf("\n")) >= 0) { try { lines.push(JSON.parse(buf.slice(0, i))); } catch {} buf = buf.slice(i + 1); } });
  const exited = new Promise((r) => p.on("exit", (code, signal) => r({ code, signal })));
  const next = (pred, ms = 20000) => new Promise((resolve, reject) => {
    const t0 = Date.now();
    const check = () => { const x = lines.find(pred); if (x) resolve(x); else if (Date.now() - t0 > ms) reject(new Error(`timeout; lines: ${JSON.stringify(lines)}`)); else setTimeout(check, 50); };
    check();
  });
  return { p, lines, next, exited, kill: async () => { p.kill("SIGKILL"); await exited; } };
}

test("K22: --max-min reached exits 0 with the state saved and a serve-stop; the next serve resumes it", async () => {
  const dir = init(spec());
  const s1 = serve(dir, ["--max-min=0.02", "--idle-min=5"]);
  const stopped = await s1.next((e) => e.event === "stopped");
  assert.equal(stopped.resumable, true);
  assert.deepEqual(await s1.exited, { code: 0, signal: null });
  const stop = events(dir, "serve-stop").at(-1);
  assert.deepEqual([stop.why, stop.resumable], ["--max-min=0.02", true]);
  assert.equal(events(dir, "serve-start").length, 1);
  assert.ok(!fs.existsSync(path.join(dir, "serve.pid")));
  const s2 = serve(dir, ["--max-min=0.02", "--idle-min=5"]);
  const serving = await s2.next((e) => e.event === "serving");
  assert.equal(serving.resumed.stopped, "--max-min=0.02");
  await s2.exited;
  assert.equal(events(dir, "serve-resume").length, 1);
});

test("K22: a serve killed mid-run is restarted: its reserved launch is not made twice, its running job is re-adopted (not started again), and the flow goes on", async () => {
  const qa = { argv: ["node", "-e", "setTimeout(() => process.exit(0), 2500)"], cwd: "${live}", timeoutMs: 60000 };
  const dir = init(spec({}, { qa, async: true }));
  const l = ok(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", "--title=L", "--task=L1", "--accept=a lesson"));
  ok(meta(dir, "order", "delegate", l.order, "--by=mgr", "--to=builder"));
  // serve 1 reserves the builder's launch, then dies (SIGKILL: no stop recorded, its pid file left behind)
  const s1 = serve(dir, ["--max-min=2", "--idle-min=5"]);
  const launch = await s1.next((e) => e.event === "launch" && e.role === "builder");
  await s1.kill();
  assert.ok(fs.existsSync(path.join(dir, "serve.pid")), "a killed serve leaves its pid file");
  // serve 2 takes over the dead serve's pid file and resumes: the launch is held (reserved, not entered), not planned again
  const s2 = serve(dir, ["--max-min=2", "--idle-min=5"]);
  const serving = await s2.next((e) => e.event === "serving");
  assert.equal(serving.resumed.stopped, "no stop recorded (killed or crashed)");
  assert.deepEqual(serving.resumed.held.map((h) => [h.role, h.msgs]), [["builder", launch.msgs]]);
  await new Promise((r) => setTimeout(r, 1500));
  assert.ok(!s2.lines.some((e) => e.event === "launch"), "no second launch for the reserved one");
  // the builder works; serve 2 starts qa as a job, and dies while it runs
  const e1 = ok(meta(dir, "room", "enter", `--msg=${launch.msgs[0]}`, "--role=builder"));
  ok(meta(dir, "room", "leave", `--run=${e1.run}`, "--evidence=work"));
  await s2.next((e) => e.event === "steps" && e.steps.includes("qa:O-1:started"));
  await s2.kill();
  // serve 3: the job's wrapper still runs (detached): re-adopted; collected when it ends; the checker launched once
  const s3 = serve(dir, ["--max-min=0.4", "--idle-min=5"]);
  const sv3 = await s3.next((e) => e.event === "serving");
  assert.deepEqual([sv3.resumed.jobs.readopted.length + sv3.resumed.jobs.ended.length, sv3.resumed.jobs.lost], [1, []]);
  await s3.next((e) => e.event === "launch" && e.role === "checker");
  const stopped = await s3.next((e) => e.event === "stopped", 40000);
  assert.equal(stopped.resumable, true);
  assert.deepEqual(await s3.exited, { code: 0, signal: null });
  assert.equal(events(dir, "job-start").filter((e) => e.order === "O-1" && e.stage === "qa").length, 1, "the job ran once");
  assert.equal(events(dir, "job-end").filter((e) => e.order === "O-1" && e.stage === "qa").length, 1);
  assert.equal(events(dir, "launch").filter((e) => e.role === "builder").length, 1, "the builder was launched once");
  assert.equal(events(dir, "launch").filter((e) => e.role === "checker").length, 1);
  assert.equal(orderOf(dir, "O-1").stage, "check");
  assert.equal(events(dir, "serve-resume").length, 2);
});

test("K22: a job whose pid now belongs to another process is not taken for its wrapper (lost, then held as a stage-error)", async () => {
  const J = await import("../jobs.mjs");
  const j = { id: "J-1", pid: process.pid };
  assert.equal(J.wrapperAlive(j), false, "this test process is alive, but it is not J-1's wrapper");
  assert.equal(J.wrapperAlive({ id: "J-1", pid: 2 ** 22 + 12345 }), false, "a dead pid");
  const co = { data: { jobs: { "J-1": { ...j, state: "running", order: "O-1", stage: "qa", loops: 0 } } } };
  assert.deepEqual(J.adopt(co), { readopted: [], ended: [], lost: ["J-1"] });
});
