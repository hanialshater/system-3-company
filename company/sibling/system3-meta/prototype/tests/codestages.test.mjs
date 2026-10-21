import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K1 (plan 2026-10-21 §3): generic code stages. Any stage signed by code, or with a `run` cmd, is run by the supervisor;
// the cmd check {argv, cwd, env, timeoutMs, pass, findings, route} interpolates ${slug}, ${task}, ${workdir}.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k1-"));
process.env.META_LIVE_DIR = LIVE;
const { make, LIVE_ROLES, runCmdCheck, validateCmd, interpolate } = await import("../state.mjs");
const { tick } = await import("../supervisor.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const BIN = path.join(LIVE, "bin");
fs.mkdirSync(BIN, { recursive: true });
// gates: JSON on stdout (then an advisory line), exit 1 unless the workdir holds `ok`
fs.writeFileSync(path.join(BIN, "gate.mjs"), `import fs from "node:fs";
const ok = fs.existsSync("ok");
console.log(JSON.stringify({ slug: process.argv[2], stage: process.env.GATE_STAGE, errors: ok ? [] : ["src/demos/x/" + process.argv[2] + ": no brief"] }));
console.log("COPY-TELL: a long dash in card 2");
process.exit(ok ? 0 : 1);
`);
// publish: refuses with a reason line the route map reads
fs.writeFileSync(path.join(BIN, "publish.mjs"), `import fs from "node:fs";
if (fs.existsSync("unverified")) { console.log("refused: claims not verified (2)"); process.exit(1); }
fs.writeFileSync("published", process.argv[2]); console.log("published " + process.argv[2]);
`);
fs.writeFileSync(path.join(BIN, "slow.mjs"), "setTimeout(() => {}, 5000);\n");

const GATES = { argv: ["node", path.join(BIN, "gate.mjs"), "${slug}"], env: { GATE_STAGE: "build-${task}" }, pass: { json: "errors.length", equals: 0 }, findings: { fromStdout: "^COPY-TELL: (.*)$" } };
const UAT = { argv: ["node", "--test"], pass: { tap: true } };
const SHIP = { argv: ["node", path.join(BIN, "publish.mjs"), "${slug}"], route: { "claims not verified": "check" } };
const FLOW = { stages: [
  { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
  { stage: "gates", signer: "code", evidence: [], run: GATES },
  { stage: "check", signer: "checker", evidence: ["review notes"] },
  { stage: "uat", signer: "orderer", evidence: ["acceptance by cmd"], run: UAT },
  { stage: "ship", signer: "release", evidence: ["publish.mjs"], run: SHIP },
] };

function fresh(flow = FLOW) {
  const co = make();
  co.org.genesis(LIVE_ROLES.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
function order(co, task) {
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "x" });
  o.task = task;
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true });
  return o;
}
const work = (task, f, text = "x") => fs.writeFileSync(path.join(LIVE, "work", task, f), text);
function sign(co, o, to, role, verdict = "pass") {
  const m = co.mailbox.queue(to, "work").find((x) => x.ref === o.id);
  const { run } = co.rooms.enter({ msg: m.id, role });
  co.rooms.leave(run, { evidence: "e", verdict });
}

test("runCmdCheck: exit0, interpolation into argv/env/cwd, json pass from the last JSON line, findings from stdout", () => {
  const o = { task: "CK1", slug: "my-lesson" };
  fs.mkdirSync(path.join(LIVE, "work", "CK1", "sub"), { recursive: true });
  assert.equal(interpolate("${workdir}/a-${slug}-${task}", { workdir: "/w", slug: "s", task: "t" }), "/w/a-s-t");
  const r = runCmdCheck(o, { run: { argv: ["node", "-e", "console.log(require('path').basename(process.cwd()), process.argv[1], process.env.X); process.exit(0)", "${slug}"], cwd: "sub", env: { X: "${task}@${workdir}" }, findings: { fromStdout: "^(sub .*)$" } } });
  assert.equal(r.findings, `sub my-lesson CK1@${path.join(LIVE, "work", "CK1")}`, "cwd is relative to the workdir; slug, task and workdir interpolate");
  let g = runCmdCheck(o, { run: GATES });
  assert.equal(g.pass, false);
  assert.match(g.output, /errors\.length = 1, wanted 0/);
  assert.equal(g.findings, "a long dash in card 2", "findings come from the stdout regex (group 1)");
  work("CK1", "ok");
  g = runCmdCheck(o, { run: GATES });
  assert.equal(g.pass, true, "json pass by the dotted path, though the process printed more after the JSON");
  assert.equal(g.findings, "a long dash in card 2", "advisory findings on a pass too");
  const fail = runCmdCheck(o, { run: { argv: ["node", "-e", "console.error('boom'); process.exit(3)"] } });
  assert.deepEqual([fail.pass, fail.code, fail.findings], [false, 3, "boom"], "no findings regex: a failure's own output tail");
});

test("runCmdCheck: tap counts, timeout, a missing cwd, and a route by the first matching regex", () => {
  const o = { task: "CK2" };
  fs.mkdirSync(path.join(LIVE, "work", "CK2"), { recursive: true });
  work("CK2", "a.test.mjs", `import { test } from "node:test"; test("t", () => {});\n`);
  assert.equal(runCmdCheck(o, { run: UAT }).pass, true);
  work("CK2", "b.test.mjs", `import { test } from "node:test"; import assert from "node:assert"; test("t", () => assert.equal(1, 2));\n`);
  const t = runCmdCheck(o, { run: UAT });
  assert.equal(t.pass, false);
  assert.match(t.output, /# fail 1/);
  const slow = runCmdCheck(o, { run: { argv: ["node", path.join(BIN, "slow.mjs")], timeoutMs: 300 } });
  assert.deepEqual([slow.pass, slow.timedOut], [false, true]);
  assert.match(slow.output, /timed out after 300 ms/);
  assert.match(runCmdCheck(o, { run: { argv: ["node", "-e", "0"], cwd: "nope" } }).output, /no directory/);
  work("CK2", "unverified");
  const s = runCmdCheck({ task: "CK2" }, { run: { ...SHIP, route: { "QA:": "qa", "claims not verified": "check", "refused": "build" } } });
  assert.deepEqual([s.pass, s.route], [false, "check"]);
});

test("validateCmd and validateSpec: a stage run is a valid cmd, only on code/orderer/release, routing back only", () => {
  assert.equal(validateCmd(GATES), null);
  assert.match(validateCmd({ argv: [] }), /argv/);
  assert.match(validateCmd({ argv: ["x"], bogus: 1 }), /unknown cmd field bogus/);
  assert.match(validateCmd({ argv: ["x"], pass: "exit1" }), /pass is/);
  assert.match(validateCmd({ argv: ["x"], pass: { json: "a" } }), /pass is/);
  assert.match(validateCmd({ argv: ["x"], env: { A: 1 } }), /env/);
  assert.match(validateCmd({ argv: ["x"], findings: { fromStdout: "(" } }), /findings/);
  const spec = builtinSpec("toy");
  assert.deepEqual(validateSpec(spec), [], "the built-in specs stay valid");
  spec.flow.stages = JSON.parse(JSON.stringify(FLOW.stages));
  assert.deepEqual(validateSpec(spec), []);
  spec.flow.stages[1].run = { ...GATES, route: { x: "ship" } };
  spec.flow.stages[2].run = { argv: ["node", "x"] };
  const v = validateSpec(spec);
  assert.ok(v.some((x) => /stage gates: run: route "x" goes to ship, not an earlier stage \(build\)/.test(x)), v.join("\n"));
  assert.ok(v.some((x) => /stage check: a run is for a stage signed by code, orderer or release, not checker/.test(x)), v.join("\n"));
  for (const n of ["toy", "storybook", "research", "sheetco"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
});

test("tick: a code stage with run, a uat by cmd (orderer signs), a ship by cmd (release signs) and its route in the findings", () => {
  const co = fresh();
  const a = order(co, "KA"); a.slug = "lesson-a";
  sign(co, a, "toy-builder-1", "toy-builder-1");
  let steps = tick(co);
  assert.equal(a.stage, "build", "gates failed: back to the builder");
  assert.equal(steps[0].step, "gates");
  assert.equal(steps[0].kind, "cmd");
  assert.match(a.findings, /errors\.length = 1/);
  assert.match(a.findings, /long dash/);
  work("KA", "ok"); work("KA", "a.test.mjs", `import { test } from "node:test"; test("t", () => {});\n`); work("KA", "unverified");
  sign(co, a, "toy-builder-1", "toy-builder-1");
  steps = tick(co);
  assert.equal(a.stage, "check");
  assert.deepEqual(steps.map((s) => `${s.step}:${s.result}`), ["gates:pass"]);
  sign(co, a, "pool:checker", "toy-checker");
  steps = tick(co);
  assert.deepEqual(steps.map((s) => `${s.step}:${s.result}`), ["uat:pass", "ship:revise"]);
  assert.equal(a.history.find((h) => h.stage === "uat").by, "mgr-live", "the orderer signs a uat run by code");
  assert.equal(a.history.find((h) => h.stage === "ship").by, "toy-release", "the release role signs; code executes");
  assert.equal(steps[1].route, "check");
  assert.match(a.findings, /\[route: check\]/);
  assert.equal(a.stage, "build", "until K11 a revise goes to build");
  fs.rmSync(path.join(LIVE, "work", "KA", "unverified"));
  sign(co, a, "toy-builder-1", "toy-builder-1");
  for (let i = 0; i < 3 && a.stage !== "done"; i++) { tick(co); if (a.stage === "check") sign(co, a, "pool:checker", "toy-checker"); }
  assert.equal(a.stage, "done");
  assert.equal(fs.readFileSync(path.join(LIVE, "work", "KA", "published"), "utf8"), "lesson-a", "the cmd ran in the workdir with ${slug}");
  assert.equal(fs.existsSync(path.join(LIVE, "shipped", "KA")), false, "a ship with run does not copy the module");
});

test("tick: a code stage under any name without run runs test1 as before; test1/uat/ship without run are unchanged", () => {
  const co = fresh({ stages: [
    { stage: "build", signer: "builder", evidence: ["w"] },
    { stage: "lint", signer: "code", evidence: [] },
    { stage: "check", signer: "checker", evidence: ["n"] },
    { stage: "uat", signer: "orderer", evidence: ["n"] },
    { stage: "ship", signer: "release", evidence: ["n"] },
  ] });
  const a = order(co, "KB");
  work("KB", "m.mjs", "export const f = () => 1;\n");
  work("KB", "m.test.mjs", `import { test } from "node:test"; import assert from "node:assert"; import { f } from "./m.mjs"; test("f", () => assert.equal(f(), 1));\n`);
  sign(co, a, "toy-builder-1", "toy-builder-1");
  assert.deepEqual(tick(co).map((s) => `${s.step}:${s.result}`), ["lint:pass"]);
  sign(co, a, "pool:checker", "toy-checker");
  assert.deepEqual(tick(co).map((s) => s.step), ["uat-needs-a-person"], "uat without run or acceptance waits for a person");
  const acc = path.join(LIVE, "acc"); fs.mkdirSync(acc, { recursive: true });
  fs.writeFileSync(path.join(acc, "KB.test.mjs"), `import { test } from "node:test"; test("hidden", () => {});\n`);
  assert.deepEqual(tick(co, { acceptance: acc }).map((s) => s.step), ["uat", "ship"]);
  assert.deepEqual(fs.readdirSync(path.join(LIVE, "shipped", "KB")), ["m.mjs"]);
});

test("the CLI: a spec with run stages inits, and `supervisor.mjs tick` runs the cmd stage", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k1-cli-"));
  const env = { ...process.env, META_LIVE_DIR: d }; delete env.NODE_TEST_CONTEXT;
  const run = (file, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const spec = builtinSpec("toy"); spec.name = "k1"; spec.flow.stages = JSON.parse(JSON.stringify(FLOW.stages));
  const f = path.join(d, "k1.json"); fs.writeFileSync(f, JSON.stringify(spec));
  const bad = JSON.parse(JSON.stringify(spec)); bad.flow.stages[1].run = { argv: "node x" };
  fs.writeFileSync(path.join(d, "bad.json"), JSON.stringify(bad));
  assert.match(run("meta.mjs", "init", `--spec-file=${path.join(d, "bad.json")}`).err, /stage gates: run: argv/);
  assert.equal(run("meta.mjs", "init", `--spec-file=${f}`).code, 0);
  const o = run("meta.mjs", "order", "new", "--by=cos", "--to=mgr-live", "--title=x", "--task=KC", "--accept=a lesson");
  assert.equal(o.code, 0, o.err);
  assert.equal(run("meta.mjs", "order", "delegate", o.out.order, "--by=mgr-live", "--to=toy-builder-1", "--budget=100").code, 0);
  const s = JSON.parse(fs.readFileSync(path.join(d, "state.json"), "utf8"));
  const msg = new Map(s.mailbox.msgs.__map).values().next().value.id;
  const e = run("meta.mjs", "room", "enter", `--msg=${msg}`, "--role=toy-builder-1");
  assert.equal(e.code, 0, e.err);
  fs.mkdirSync(path.join(d, "work", "KC"), { recursive: true }); fs.writeFileSync(path.join(d, "work", "KC", "ok"), "");
  assert.equal(run("meta.mjs", "room", "leave", `--run=${e.out.run}`, "--evidence=w").code, 0);
  const t = run("supervisor.mjs", "tick");
  assert.equal(t.code, 0, t.err);
  assert.deepEqual(t.out.steps.map((x) => `${x.step}:${x.result}`), ["gates:pass"]);
  assert.equal(new Map(JSON.parse(fs.readFileSync(path.join(d, "state.json"), "utf8")).engine.orders.__map).get(o.out.order).stage, "check");
});
