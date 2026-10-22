import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K26 (founder 2026-10-22: a FAST harness; B6: Meta's 18 sessions cost 2.3x one vanilla agent, mostly cold-start cache
// writes): a warm builder keeps ONE Agent SDK session across its work stages and revises. The launcher reports each
// session's SDK id (`launch finished --sdk-session`), the planner resumes it for the same order's next item with a short
// brief (the cold one kept for a failed resume, `launch resume-failed`), the builder self-checks inside its session
// (`selftest`, `check --order`: nothing signed), and one warm session may carry several orders in sequence. Driven by
// the CLI as agents, the supervisor and the launcher drive it; no SDK session runs.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k26-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname), UP = "..";
const G = await import(path.join(HERE, UP, "launcher", "guard.mjs"));
const { validateSpec } = await import("../generator.mjs");
const { validateCmd } = await import("../state.mjs");

const SPEC = {
  name: "shop", title: "a small shop (K26)",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "bench", floor: 2, kind: "lane", lane: "w" }, { id: "review", floor: 3, kind: "quality" }],
  skills: ["manage", "build", "review"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "founder", lane: "w", room: "bench", floor: 2, skills: ["manage"] },
    { id: "maker", level: "builder", reportsTo: "lead", lane: "w", room: "bench", floor: 2, skills: ["build"], warm: true, drainCap: 3 },
    { id: "plain", level: "builder", reportsTo: "lead", lane: "w", room: "bench", floor: 2, skills: ["build"] },
    { id: "judge", level: "evaluator", reportsTo: "founder", room: "review", floor: 3, skills: ["review"] },
  ],
  flow: { name: "thing", stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"], selftest: { argv: ["node", "--test"], pass: { tap: true }, timeoutMs: 60000 } },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "eval", signer: { role: "judge" }, independent: true, evidence: ["EVAL.md"], pack: { include: ["*.mjs"], exclude: ["NOTES.md"], history: false } },
    { stage: "accept", signer: "code", evidence: [], run: { argvFrom: "order", findings: { fromStdout: "^failed: (.+)$" } } },
    { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } },
  ] },
};
const ENV = { ...process.env, META_LIVE_DIR: LIVE };
delete ENV.NODE_TEST_CONTEXT; delete ENV.META_ROLE;
function cli(file, args, env = {}) {
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: { ...ENV, ...env }, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const meta = (...a) => cli("meta.mjs", a);
const as = (role, launch, ...a) => cli("meta.mjs", a, { META_ROLE: role, ...(launch ? { META_LAUNCH: launch } : {}) });
const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };
const tick = () => ok(cli("supervisor.mjs", ["tick"]));
const events = (t) => ok(meta("events", `--type=${t}`));
const W = (task, f, t) => { fs.mkdirSync(path.join(LIVE, "work", task), { recursive: true }); fs.writeFileSync(path.join(LIVE, "work", task, f), t); };
const GOOD = 'import { test } from "node:test"; import assert from "node:assert"; test("ok", () => assert.equal(1, 1));\n';
const BAD = 'import { test } from "node:test"; import assert from "node:assert"; test("bad", () => assert.equal(1, 2));\n';
const SDK1 = "11111111-aaaa-4bbb-8ccc-000000000001";
const RUNNER = path.join(LIVE, "accept.mjs");
fs.writeFileSync(RUNNER, 'import fs from "node:fs"; const d = process.argv[2]; if (fs.existsSync(d + "/game.mjs") && fs.readFileSync(d + "/game.mjs", "utf8").includes("v2")) process.exit(0); console.log("failed: movement"); process.exit(1);\n');

test("validation: warm is a builder's, true or false; selftest is a work stage's own cmd; argvFrom only on a stage run", () => {
  assert.deepEqual(validateSpec(SPEC), []);
  const bad = JSON.parse(JSON.stringify(SPEC));
  bad.roles[4].warm = true; bad.roles[2].warm = "yes";
  const v = validateSpec(bad).join("\n");
  assert.match(v, /role judge: only a builder is warm/);
  assert.match(v, /role maker: warm is true or false/);
  const st = JSON.parse(JSON.stringify(SPEC));
  st.flow.stages[1].selftest = { argv: ["node", "--test"] };
  st.flow.stages[0].selftest.route = { x: "park" };
  const w = validateSpec(st).join("\n");
  assert.match(w, /stage test1: selftest is for a stage the order's worker works/);
  assert.match(w, /stage build: selftest has no route/);
  assert.equal(validateCmd({ argvFrom: "order" }), "argvFrom is for a stage run only (the order's acceptance cmd)");
  assert.match(validateCmd({ argvFrom: "order", argv: ["x"] }, { orderArgv: true }), /in place of argv/);
  assert.equal(validateCmd({ argvFrom: "order" }, { orderArgv: true }), null);
  const post = JSON.parse(JSON.stringify(SPEC));
  post.flow.stages[2].post = { argvFrom: "order" };
  assert.match(validateSpec(post).join("\n"), /stage eval: post: argvFrom is for a stage run only/);
});

test("the launcher's side: queryOptions resumes; a failed resume (and only that) falls back to the cold brief", () => {
  const p = G.sessionPlan({ tools: null, workdir: null, roots: [] }, {}, { cwd: "/k", sessionMin: 20, maxTurns: 80, settingSources: [] });
  const g = G.makeGuard({ tools: p.tools, roots: [], cwd: "/k" });
  assert.equal(G.queryOptions(p, g, { resume: SDK1 }).resume, SDK1);
  assert.ok(!("resume" in G.queryOptions(p, g, {})), "cold: no resume key at all");
  assert.equal(G.warmFallback({ resumed: true, error: "No conversation found with session ID" }), true);
  assert.equal(G.warmFallback({ resumed: true, result: { is_error: true, subtype: "error_during_execution" } }), true);
  assert.equal(G.warmFallback({ resumed: true, error: "aborted", sawAssistant: true }), false, "it worked, then failed: a failed launch, never run twice");
  assert.equal(G.warmFallback({ resumed: false, error: "x" }), false, "a cold launch has nothing to fall back to");
  assert.equal(G.warmFallback({ resumed: true, result: { is_error: false } }), false);
  const src = fs.readFileSync(path.join(HERE, UP, "launcher", "launch.mjs"), "utf8");
  assert.match(src, /--sdk-session=\$\{sdk\}/, "every finish reports the SDK session id");
  assert.match(src, /meta\("launch", "resume-failed"/, "a fallback is recorded in the state");
});

test("warm: the builder's session is resumed for its revise, with a short brief; self-checks sign nothing; a failed resume goes cold", async () => {
  const f = path.join(LIVE, "shop.json");
  fs.writeFileSync(f, JSON.stringify(SPEC));
  ok(meta("init", `--spec-file=${f}`));
  // the acceptance cmd is the orderer's: refused in an agent session
  const acc = `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`;
  assert.match(as("lead", null, "order", "new", "--by=lead", "--to=lead", "--title=x", "--task=X", "--accept=x", acc).err, /--accept-cmd is the orderer's/);
  assert.match(meta("order", "new", "--by=founder", "--to=lead", "--title=x", "--task=X", "--accept=x", "--accept-cmd=[1]").err, /a JSON list of 1-64 non-empty strings/);
  const A = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Game A", "--task=GA", "--accept=a game", acc)).order;
  const B = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Game B", "--task=GB", "--accept=a game", acc)).order;
  ok(meta("order", "delegate", A, "--by=lead", "--to=maker"));
  ok(meta("order", "delegate", B, "--by=lead", "--to=maker"));
  let p = tick().plan.find((x) => x.role === "maker");
  assert.deepEqual([p.msgs.length, p.resume], [2, undefined], "the first launch is cold, and carries both orders (drainCap 3)");
  const L1 = ok(cli("supervisor.mjs", ["launched", "--role=maker", `--msgs=${p.msgs.join(",")}`]));
  const lid1 = `${String(L1.seq).padStart(4, "0")}-maker`;
  // build A: a failing self-check is recorded and signs nothing; the passing one too
  let pk = ok(as("maker", lid1, "room", "enter", `--msg=${p.msgs[0]}`, "--role=maker"));
  assert.match(pk.self_check, new RegExp(`check --order=${A}`));
  W("GA", "game.mjs", "export const v = 'v1';\n"); W("GA", "game.test.mjs", BAD);
  let c = ok(as("maker", lid1, "check", `--order=${A}`));
  assert.deepEqual([c.pass, c.rules[0]], [false, "the build stage's selftest (spec)"]);
  W("GA", "game.test.mjs", GOOD);
  assert.equal(ok(as("maker", lid1, "check", `--order=${A}`)).pass, true);
  assert.equal(ok(meta("flow", "show", A)).stage, "build", "self-checks never sign the stage");
  assert.deepEqual(events("self-check").map((e) => [e.order, e.pass, e.kind]), [[A, false, "selftest"], [A, true, "selftest"]]);
  // hand in A, take B in the same session (a batch: one warm session carries both orders)
  const n1 = ok(as("maker", lid1, "room", "next", `--run=${pk.run}`, "--cap=3", "--evidence=game.mjs", "--learned=x"));
  assert.equal(n1.order, B);
  W("GB", "game.mjs", "export const v = 'v2';\n"); W("GB", "game.test.mjs", GOOD);
  ok(as("maker", lid1, "room", "leave", `--run=${n1.run}`, "--evidence=game.mjs"));
  // the launcher reports the process with its SDK id: both orders map to it
  const fin = ok(meta("launch", "finished", `--launch=${lid1}`, "--role=maker", "--tokens=5000", `--sdk-session=${SDK1}`));
  assert.deepEqual(fin.warm, [A, B]);
  assert.match(as("maker", lid1, "launch", "resume-failed", `--launch=${lid1}`, "--role=maker", `--sdk-session=${SDK1}`, "--why=x").err, /the launcher's report/);
  // test1 (code), then the evaluation: A's revise comes back to the builder
  tick();
  assert.equal(ok(meta("flow", "show", A)).stage, "eval");
  const q = ok(meta("queue", "role:judge")).find((x) => x.order === A);
  const ev = ok(as("judge", null, "room", "enter", `--msg=${q.msg}`, "--role=judge"));
  W("GA", "EVAL.md", "movement: north does nothing\n");
  ok(as("judge", null, "room", "leave", `--run=${ev.run}`, "--evidence=EVAL.md", "--verdict=revise", "--findings=movement: north does nothing"));
  // the planner resumes the maker's session for A, with the short brief; the cold one is kept for a fallback
  const t2 = tick();
  p = t2.plan.find((x) => x.role === "maker");
  assert.equal(p.resume, SDK1);
  assert.match(p.why, new RegExp(`warm: resumes ${A}'s session from launch ${lid1}`));
  const { load } = await import("../state.mjs");
  const { reserve } = await import("../supervisor.mjs");
  const { withLock, save } = await import("../state.mjs");
  const outbox = path.join(LIVE, "outbox");
  const [r] = withLock(() => { const co = load(); const x = reserve(co, [p], { outbox }); save(co); return x; });
  assert.ok(fs.existsSync(r.file) && fs.existsSync(r.coldFile));
  const short = fs.readFileSync(r.file, "utf8"), cold = fs.readFileSync(r.coldFile, "utf8");
  assert.match(short, /this is your own session, resumed/);
  assert.match(short, new RegExp(`${A} \\(GA\\) at build, loop 1`));
  assert.ok(short.length * 2 < cold.length, `the resumed brief is short (${short.length} vs ${cold.length} chars)`);
  assert.match(cold, /Check your own work as often as you like with `node meta.mjs check --order=<O>`/);
  assert.equal(events("launch").at(-1).resume, SDK1, "the launch event carries the session it resumes");
  // while that launch is in flight, the same session is never planned again
  assert.equal(tick().plan.find((x) => x.role === "maker"), undefined);
  // the resume fails: recorded, never tried again; the next plan is cold
  const lid2 = `${String(events("launch").at(-1).seq).padStart(4, "0")}-maker`;
  const fb = ok(meta("launch", "resume-failed", `--launch=${lid2}`, "--role=maker", `--sdk-session=${SDK1}`, "--why=No conversation found"));
  assert.deepEqual(fb.orders, [A, B]);
  ok(meta("launch", "finished", `--launch=${lid2}`, "--role=maker", "--tokens=1", "--ok=false", "--reason=x"));
  p = tick().plan.find((x) => x.role === "maker");
  assert.ok(p && !p.resume, "after a failed resume: a cold start");
  // a non-warm builder's SDK id is never recorded
  const fin2 = ok(meta("launch", "finished", "--launch=9999-plain", "--role=plain", "--tokens=1", `--sdk-session=${SDK1}`));
  assert.equal(fin2.warm, undefined);
});

test("accept runs the order's cmd: its category line is the finding; an order without one is a stage-error", async () => {
  // B was built as v2: test1, eval and the order's acceptance cmd pass it, and code ships it
  for (let i = 0; i < 3; i++) tick();
  const q = ok(meta("queue", "role:judge")).find((x) => x.order === "O-2");
  const ev = ok(as("judge", null, "room", "enter", `--msg=${q.msg}`, "--role=judge"));
  W("GB", "EVAL.md", "plays as specified\n");
  ok(as("judge", null, "room", "leave", `--run=${ev.run}`, "--evidence=EVAL.md", "--verdict=pass"));
  const steps = tick().steps;
  assert.deepEqual(steps.filter((s) => s.order === "O-2").map((s) => `${s.step}:${s.result}`), ["accept:pass", "ship:pass"]);
  assert.equal(ok(meta("flow", "show", "O-2")).stage, "done");
  // an order with no acceptance cmd holds at accept as a stage-error (not the work's fault: no loop spent)
  const C = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=C", "--task=GC", "--accept=x")).order;
  const { load, save, withLock } = await import("../state.mjs");
  const { tick: tk } = await import("../supervisor.mjs");
  withLock(() => { const co = load(); const o = co.engine.orders.get(C); o.builder = "maker"; o.stage = "accept"; o.workdir = null; fs.mkdirSync(path.join(LIVE, "work", "GC"), { recursive: true }); const st = tk(co); save(co); const s = st.find((x) => x.order === C); assert.equal(s.result, "stage-error"); assert.match(s.output, /names no acceptance cmd/); });
  // A's acceptance fails with its category only
  withLock(() => { const co = load(); const o = co.engine.orders.get("O-1"); o.stage = "accept"; for (const m of co.mailbox.msgs.values()) if (m.ref === "O-1" && m.state === "open") m.state = "withdrawn"; const st = tk(co); save(co); const s = st.find((x) => x.order === "O-1"); assert.equal(s.result, "revise"); assert.equal(s.findings, "movement"); assert.equal(o.stage, "build"); });
});
