import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K12 (plan 2026-10-21 §3): post-checks on agent stages. A stage `post` cmd runs at room leave/next before advance; a
// failure refuses the leave (exit 1, findings printed) and the run stays open, so the agent fixes it in-session (stage 5
// diff guard and stamp, stage 6 verdict parsing, stage 7 record shape: before K12 evidence was any non-empty string).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k12-"));
process.env.META_LIVE_DIR = LIVE;
const { make } = await import("../state.mjs");
const { flowProblems } = await import("../lib.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const { tick } = await import("../supervisor.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const BIN = path.join(LIVE, "bin");
fs.mkdirSync(BIN, { recursive: true });
// stamp: the build leaves a STAMP file (stage 5's QA stamp); findings on stdout
fs.writeFileSync(path.join(BIN, "stamp.mjs"), `import fs from "node:fs";
if (!fs.existsSync("STAMP")) { console.log("FINDING: no STAMP in " + process.argv[2]); process.exit(1); }
console.log("stamped");
`);
// verdict: the reviewer's evidence file is JSON whose verdict is the one it left with (stage 6 verdict parsing)
fs.writeFileSync(path.join(BIN, "verdict.mjs"), `import fs from "node:fs";
let j; try { j = JSON.parse(fs.readFileSync(process.argv[2], "utf8")); } catch { console.log("FINDING: " + process.argv[2] + " is not JSON"); process.exit(1); }
console.log(JSON.stringify({ ok: j.verdict === process.argv[3], stage: process.argv[4] }));
`);
fs.writeFileSync(path.join(BIN, "slow.mjs"), "setTimeout(() => {}, 5000);\n");
// lock: fails when the state lock is held (it ran inside withLock); marks every run so a test can count them
fs.writeFileSync(path.join(BIN, "lock.mjs"), `import fs from "node:fs";
fs.appendFileSync(process.argv[3], "ran\\n");
if (fs.existsSync(process.argv[2])) { console.log("FINDING: ran under the lock"); process.exit(1); }
console.log("outside the lock");
`);

const STAMP = { argv: ["node", path.join(BIN, "stamp.mjs"), "${slug}"], findings: { fromStdout: "^FINDING: (.*)$" } };
const VERDICT = { argv: ["node", path.join(BIN, "verdict.mjs"), "${evidence}", "${verdict}", "${stage}"], pass: { json: "ok", equals: true }, findings: { fromStdout: "^FINDING: (.*)$" } };
const SPEC = () => ({
  name: "lessons-k12", title: "K12",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "s" }, { id: "review", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
  skills: ["manage", "build", "verify", "release"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "cos", lane: "s", room: "studio", floor: 2, skills: ["manage"] },
    { id: "demo-builder", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"] },
    { id: "fact-checker", level: "checker", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["verify"] },
    { id: "release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
  ],
  flow: { name: "lesson", stages: [
    { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"], post: STAMP },
    { stage: "check", signer: { role: "fact-checker" }, evidence: ["fact-check record"], post: VERDICT },
    { stage: "ship", signer: "release", evidence: ["publish"] },
  ] },
});
function company(spec = SPEC(), config) {
  const co = make(spec.name, spec);
  if (config) Object.assign(co.engine.config, config);
  co.org.genesis(spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define(spec.flow.name, spec.flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
let nT = 0;
function order(co) {
  const o = co.engine.orderNew({ flow: "lesson", by: "cos", to: "lead", budget: 100, accept: "a lesson" });
  o.task = `L${++nT}`;
  co.engine.delegate(o.id, { by: "lead", to: "demo-builder", budget: 100 });
  fs.mkdirSync(path.join(LIVE, "work", o.task), { recursive: true });
  return o;
}
const enter = (co, o, to, role) => co.rooms.enter({ msg: co.mailbox.queue(to, "work").find((m) => m.ref === o.id).id, role }).run;
const wd = (o, f) => path.join(LIVE, "work", o.task, f);

test("K12: a post-check validates in the spec (a cmd with no route, on a stage an agent leaves) and in every flow definition", () => {
  assert.deepEqual(validateSpec(SPEC()), []);
  assert.deepEqual(flowProblems(SPEC().flow), []);
  const bad = (f) => { const s = SPEC(); f(s.flow.stages); return validateSpec(s).join("\n"); };
  assert.match(bad((st) => { st[0].post = { argv: [] }; }), /stage build: post: argv is a non-empty list/);
  assert.match(bad((st) => { st[0].post = { ...STAMP, route: { x: "build" } }; }), /stage build: post: a post-check has no route/);
  assert.match(bad((st) => { st[0].post = { ...STAMP, retries: 2 }; }), /stage build: post: unknown cmd field retries/);
  assert.match(bad((st) => { st.splice(1, 0, { stage: "gates", signer: "code", evidence: [], post: STAMP }); }), /stage gates: a post-check is for a stage an agent leaves/);
  assert.match(bad((st) => { st[2].run = { argv: ["node", "x"] }; st[2].post = STAMP; }), /stage ship: a post-check is for a stage an agent leaves/);
  const f = SPEC().flow; f.stages[0].post = "npm test";
  assert.match(flowProblems(f).join("\n"), /build: post is a cmd/);
  const g = SPEC().flow; g.stages.splice(1, 0, { stage: "gates", signer: "code", evidence: [], post: STAMP });
  assert.match(flowProblems(g).join("\n"), /gates: a post-check is for a stage an agent leaves/);
  // every built-in spec still validates (no post: nothing changes)
  for (const n of ["toy", "storybook"]) assert.deepEqual(validateSpec(builtinSpec(n)), [], n);
  for (const n of ["research", "sheetco", "sheetco-r"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
});

test("K12: a failed post-check refuses the leave with its findings and keeps the run open; fixed, the same run leaves", () => {
  const co = company(); const o = order(co);
  const run = enter(co, o, "demo-builder", "demo-builder");
  assert.throws(() => co.rooms.leave(run, { evidence: "built" }), (e) => e.refused && /post-check: build on O-\d+ refused the leave: .*exit 1; fix the work and leave again/.test(e.message) && e.findings === `no STAMP in ${o.task}`);
  assert.equal(co.engine.orders.get(o.id).stage, "build");
  assert.equal(co.rooms.runs.get(run).state, "running");
  const ref = co.log.of("refuse").at(-1);
  assert.equal(ref.rule, "post-check"); assert.equal(ref.stage, "build"); assert.equal(ref.findings, `no STAMP in ${o.task}`);
  assert.equal(co.log.of("leave").length, 0, "nothing signed");
  fs.writeFileSync(wd(o, "STAMP"), "qa");
  co.rooms.leave(run, { evidence: "built" });
  assert.equal(co.engine.orders.get(o.id).stage, "check");
  const ok = co.log.of("post-check").at(-1);
  assert.equal(ok.pass, true); assert.equal(ok.run, run); assert.match(ok.output, /stamp\.mjs .*: exit 0/);
});

test("K12: ${evidence}, ${verdict} and ${stage} reach the post cmd (stage 6: the record must parse and carry the verdict left with)", () => {
  const co = company(); const o = order(co);
  fs.writeFileSync(wd(o, "STAMP"), "qa");
  co.rooms.leave(enter(co, o, "demo-builder", "demo-builder"), { evidence: "built" });
  const run = enter(co, o, "role:fact-checker", "fact-checker");
  const rec = wd(o, "check.json");
  fs.writeFileSync(rec, "not json");
  assert.throws(() => co.rooms.leave(run, { evidence: rec, verdict: "revise", findings: "card 2" }), (e) => e.findings === `${rec} is not JSON`);
  fs.writeFileSync(rec, JSON.stringify({ verdict: "pass" }));
  assert.throws(() => co.rooms.leave(run, { evidence: rec, verdict: "revise", findings: "card 2" }), /ok = false, wanted true/);
  fs.writeFileSync(rec, JSON.stringify({ verdict: "revise" }));
  co.rooms.leave(run, { evidence: rec, verdict: "revise", findings: "card 2" });
  const x = co.engine.orders.get(o.id);
  assert.equal(x.stage, "build"); assert.equal(x.loops, 1);
  assert.equal(co.log.of("post-check").at(-1).verdict, "revise");
});

test("K12: a stale leave runs no post-check; a post-check that cannot run refuses as a stage error; enforce off records a violation", () => {
  const co = company(); const o = order(co);
  const run = enter(co, o, "demo-builder", "demo-builder");
  co.engine.orders.get(o.id).loops = 5; // the order moved on while the run worked
  const n = co.log.events.length;
  assert.equal(co.rooms.leave(run, { evidence: "e" }), null);
  assert.equal(co.log.events.slice(n).filter((e) => e.type === "post-check" || e.rule === "post-check").length, 0);

  const s = SPEC(); s.flow.stages[0].post = { argv: ["node", path.join(BIN, "slow.mjs")], timeoutMs: 300 };
  const c2 = company(s); const o2 = order(c2);
  assert.throws(() => c2.rooms.leave(enter(c2, o2, "demo-builder", "demo-builder"), { evidence: "e" }), /timed out after 300 ms; the post-check itself failed/);

  const c3 = company(SPEC(), { enforce: false }); const o3 = order(c3);
  c3.rooms.leave(enter(c3, o3, "demo-builder", "demo-builder"), { evidence: "e" });
  assert.equal(c3.engine.orders.get(o3.id).stage, "check");
  assert.equal(c3.log.of("violation").at(-1).rule, "post-check");

  // ship has no post: nothing runs there, and only build and check record a post-check
  const c4 = company(); const o4 = order(c4); fs.writeFileSync(wd(o4, "STAMP"), "qa");
  c4.rooms.leave(enter(c4, o4, "demo-builder", "demo-builder"), { evidence: "e" });
  c4.rooms.leave(enter(c4, o4, "role:fact-checker", "fact-checker"), { evidence: (fs.writeFileSync(wd(o4, "c.json"), '{"verdict":"pass"}'), wd(o4, "c.json")) });
  c4.rooms.leave(enter(c4, o4, "pool:release", "release"), { evidence: "e" });
  assert.equal(c4.engine.orders.get(o4.id).stage, "done");
  assert.equal(c4.log.of("post-check").length, 2);
});

test("K12 CLI: room leave and room next exit 1 with findings, save the refusal, keep the run; the pack names the check; batch runs it under the lock", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k12-cli-"));
  const cli = (...args) => { const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT; const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); let out = null, err = null; try { out = JSON.parse(r.stdout); } catch {} try { err = JSON.parse(r.stderr); } catch {} return { code: r.status, out, err, raw: r.stderr + r.stdout }; };
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(SPEC()));
  assert.equal(cli("init", `--spec-file=${f}`).code, 0);
  const mk = (task) => {
    const o = cli("order", "new", "--by=cos", "--to=lead", `--title=${task}`, `--task=${task}`, "--accept=a lesson").out.order;
    assert.equal(cli("order", "delegate", o, "--by=lead", "--to=demo-builder").code, 0);
    return o;
  };
  const o1 = mk("A1"), o2 = mk("A2");
  const msg = (o) => cli("queue", "demo-builder").out.find((m) => m.order === o).msg;
  const p = cli("room", "enter", `--msg=${msg(o1)}`, "--role=demo-builder");
  assert.equal(p.code, 0, p.raw);
  assert.match(p.out.post_check, /your leave first runs: node .*stamp\.mjs \$\{slug\}.*refuses the leave/);
  fs.mkdirSync(path.join(dir, "work", "A1"), { recursive: true });
  const r = cli("room", "leave", `--run=${p.out.run}`, "--evidence=built");
  assert.equal(r.code, 1, r.raw);
  assert.equal(r.err.refused, true); assert.match(r.err.error, /^post-check: build on O-\d+ refused the leave/); assert.equal(r.err.findings, "no STAMP in A1");
  const ev = cli("events", "--type=refuse").out.at(-1);
  assert.equal(ev.rule, "post-check"); assert.equal(ev.run, p.out.run);
  assert.equal(cli("flow", "show", o1).out.stage, "build");
  // room next: the same refusal; the session takes nothing new
  const n = cli("room", "next", `--run=${p.out.run}`, "--cap=3", "--evidence=built");
  assert.equal(n.code, 1, n.raw); assert.equal(n.err.findings, "no STAMP in A1");
  assert.equal(cli("events", "--type=enter").out.length, 1);
  // fixed in-session: next leaves and takes A2 in the same session
  fs.writeFileSync(path.join(dir, "work", "A1", "STAMP"), "qa");
  const n2 = cli("room", "next", `--run=${p.out.run}`, "--cap=3", "--evidence=built");
  assert.equal(n2.code, 0, n2.raw);
  assert.equal(n2.out.left.next_stage, "check"); assert.equal(n2.out.order, o2); assert.equal(n2.out.session, p.out.session);
  assert.equal(cli("events", "--type=post-check").out.length, 1);
  // batch: no result from outside the lock, so Rooms.leave runs the post-check itself; a refusal saves nothing but itself
  const ops = path.join(dir, "ops.json"); fs.writeFileSync(ops, JSON.stringify([{ cmd: "room", sub: "leave", args: { run: n2.out.run, evidence: "built" } }]));
  fs.mkdirSync(path.join(dir, "work", "A2"), { recursive: true });
  const b = cli("batch", `--file=${ops}`);
  assert.equal(b.code, 1, b.raw); assert.match(b.err.error, /batch op 0 \(room leave\): post-check: build/); assert.equal(b.err.findings, "no STAMP in A2");
  fs.writeFileSync(path.join(dir, "work", "A2", "STAMP"), "qa");
  assert.equal(cli("batch", `--file=${ops}`).code, 0);
  assert.equal(cli("flow", "show", o2).out.stage, "check");
  assert.equal(cli("events", "--type=post-check").out.length, 2);
});

test("K12 review: a post-check is refused on every stage the supervisor or a person signs, and agent text never reaches a shell, a script or the cwd", () => {
  const toy = builtinSpec("toy"); toy.flow.stages.find((x) => x.stage === "ship").post = { argv: ["node", "-e", "process.exit(1)"] };
  assert.match(validateSpec(toy).join("\n"), /stage ship: a post-check is for a stage an agent leaves.*signer release/);
  const bad = (f) => { const s = SPEC(); f(s.flow.stages); return validateSpec(s).join("\n"); };
  assert.match(bad((st) => { st.splice(2, 0, { stage: "uat", signer: "orderer", evidence: ["acceptance"], post: STAMP }); }), /stage uat: a post-check is for a stage an agent leaves.*signer orderer/);
  assert.match(bad((st) => { st.splice(2, 0, { stage: "go", signer: "release", evidence: ["publish"], post: STAMP }); }), /stage go: .*signer release/);
  assert.match(bad((st) => { st.splice(2, 0, { stage: "approve", signer: "founder", evidence: ["words"], post: STAMP }); }), /stage approve: .*signer founder/);
  const f = SPEC().flow; f.stages[2].post = STAMP;
  assert.match(flowProblems(f).join("\n"), /ship: a post-check is for a stage an agent leaves/);
  const inj = (post) => bad((st) => { st[1].post = post; });
  assert.match(inj({ argv: ["sh", "-c", "grep -q ok ${evidence}"] }), /stage check: post: .*cannot go into a shell/);
  assert.match(inj({ argv: ["/bin/bash", "x.sh", "${verdict}"] }), /cannot go into a shell/);
  assert.match(inj({ argv: ["node", "-e", "require('${evidence}')"] }), /an -e\/-c script/);
  assert.match(inj({ argv: ["${evidence}"] }), /cannot name the program/);
  assert.match(inj({ argv: ["node", "x.mjs"], cwd: "${evidence}/.." }), /cannot pick the cwd/);
  assert.deepEqual(inj(VERDICT), "", "a plain argument is fine");
  assert.deepEqual(inj({ argv: ["sh", "-c", "test -f ${slug}"] }), "", "spec-owned variables may go into a shell");
});

test("K12 review: a supervisor-signed stage with a post (a flow from before the fix) holds the order; tick neither throws nor ships", () => {
  const co = company(); const o = order(co);
  fs.writeFileSync(wd(o, "STAMP"), "qa"); fs.writeFileSync(wd(o, "x.mjs"), "export {}\n");
  co.rooms.leave(enter(co, o, "demo-builder", "demo-builder"), { evidence: "e" });
  co.rooms.leave(enter(co, o, "role:fact-checker", "fact-checker"), { evidence: (fs.writeFileSync(wd(o, "c.json"), '{"verdict":"pass"}'), wd(o, "c.json")) });
  co.engine.flows.get(o.flow).stages.find((x) => x.stage === "ship").post = { argv: ["node", "-e", "process.exit(1)"] };
  const steps = tick(co); tick(co);
  const x = co.engine.orders.get(o.id);
  assert.equal(x.stage, "ship"); assert.match(x.stageError.why, /stage ship has a post-check, but the supervisor signs it/);
  assert.deepEqual(steps.filter((s) => s.kind === "post").map((s) => s.result), ["stage-error"]);
  assert.equal(fs.existsSync(path.join(LIVE, "shipped", o.task)), false, "nothing copied");
  assert.equal(co.log.of("enter").filter((e) => e.order === o.id && e.role === "release").length, 0);
  assert.equal(co.log.of("stage-error").filter((e) => e.order === o.id).length, 1, "held once, not every tick");
});

test("K12 review: engine.advance refuses a stage with a post-check unless a room leave ran it (flow advance, uat-style signing); a leave refused anyway runs no check", () => {
  const co = company(); const o = order(co);
  assert.throws(() => co.engine.advance(o.id, { stage: "build", by: "demo-builder", evidence: "x" }), (e) => e.refused && /build on O-\d+ has a post-check: sign it with room leave/.test(e.message));
  assert.equal(co.engine.orders.get(o.id).stage, "build");
  assert.equal(co.log.of("refuse").at(-1).rule, "post-check");
  // enforce off: recorded as a violation, signed
  const c2 = company(SPEC(), { enforce: false }); const o2 = order(c2);
  c2.engine.advance(o2.id, { stage: "build", by: "demo-builder", evidence: "x" });
  assert.equal(c2.engine.orders.get(o2.id).stage, "check"); assert.equal(c2.log.of("violation").at(-1).rule, "post-check");
  // a leave with no evidence is refused by advance before any post-check runs
  const marks = path.join(LIVE, "marks-doomed");
  const s = SPEC(); s.flow.stages[0].post = { argv: ["node", path.join(BIN, "lock.mjs"), path.join(LIVE, "no-lock"), marks] };
  const c3 = company(s); const o3 = order(c3); const run = enter(c3, o3, "demo-builder", "demo-builder");
  assert.throws(() => c3.rooms.leave(run, { evidence: "" }), /build needs evidence/);
  assert.equal(fs.existsSync(marks), false, "the post-check did not run");
  c3.rooms.leave(run, { evidence: "e" });
  assert.equal(fs.readFileSync(marks, "utf8"), "ran\n");
  assert.equal(c3.engine.orders.get(o3.id).stage, "check");
});

test("K12 review CLI: flow advance cannot sign a post-checked stage; room leave uses the run made outside the lock (the check fails under it)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k12-lock-"));
  const cli = (...args) => { const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT; const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); let out = null, err = null; try { out = JSON.parse(r.stdout); } catch {} try { err = JSON.parse(r.stderr); } catch {} return { code: r.status, out, err, raw: r.stderr + r.stdout }; };
  const marks = path.join(dir, "marks");
  const s = SPEC(); s.flow.stages[0].post = { argv: ["node", path.join(BIN, "lock.mjs"), path.join(dir, "state.lock"), marks], findings: { fromStdout: "^FINDING: (.*)$" } };
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(s));
  assert.equal(cli("init", `--spec-file=${f}`).code, 0);
  const mk = (task) => { const o = cli("order", "new", "--by=cos", "--to=lead", `--title=${task}`, `--task=${task}`, "--accept=a lesson").out.order; assert.equal(cli("order", "delegate", o, "--by=lead", "--to=demo-builder").code, 0); fs.mkdirSync(path.join(dir, "work", task), { recursive: true }); return o; };
  const o1 = mk("B1"), o2 = mk("B2");
  const a = cli("flow", "advance", o1, "--stage=build", "--by=demo-builder", "--evidence=x");
  assert.equal(a.code, 1, a.raw); assert.match(a.err.error, /has a post-check: sign it with room leave/);
  assert.equal(cli("flow", "show", o1).out.stage, "build");
  const msg = (o) => cli("queue", "demo-builder").out.find((m) => m.order === o).msg;
  const p = cli("room", "enter", `--msg=${msg(o1)}`, "--role=demo-builder");
  const l = cli("room", "leave", `--run=${p.out.run}`, "--evidence=built");
  assert.equal(l.code, 0, l.raw); assert.equal(l.out.next_stage, "check");
  const ev = cli("events", "--type=post-check").out.at(-1);
  assert.equal(ev.outsideLock, true); assert.match(ev.output, /exit 0/);
  assert.equal(fs.readFileSync(marks, "utf8"), "ran\n", "run once, outside the lock, and that result used");
  // batch: no run from outside, so the check runs under the lock (and this check fails there)
  const q = cli("room", "enter", `--msg=${msg(o2)}`, "--role=demo-builder");
  const ops = path.join(dir, "ops.json"); fs.writeFileSync(ops, JSON.stringify([{ cmd: "room", sub: "leave", args: { run: q.out.run, evidence: "built" } }]));
  const b = cli("batch", `--file=${ops}`);
  assert.equal(b.code, 1, b.raw); assert.equal(b.err.findings, "ran under the lock");
  // a leave with no evidence runs no check at all
  const n = cli("room", "leave", `--run=${q.out.run}`, "--evidence=");
  assert.notEqual(n.code, 0);
  assert.equal(fs.readFileSync(marks, "utf8"), "ran\nran\n");
});
