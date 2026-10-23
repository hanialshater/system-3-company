import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// B7 (founder 2026-10-22: "start with smaller task ... fast and more accurate harness with self improvement, use complex
// text game as example"): specs/textgame-hybrid.json, a small company that builds a text game from a spec. build (a warm
// builder that self-checks in its session) → test1 (code: its own tests) → eval (an independent evaluator, sampled by a
// knob at 1.0, reading only the spec and the game) → accept (code: the orderer's hidden runner, categories only) → ship
// (code). Learn: a playbook store set at init (a spec variable left ""), for the builder (B7 review: the lead, on the
// work side, never writes the evaluator's pack). No eval batch: one order per company would wait out every hold.
// specs/textgame-hybrid-nolearn.json is the same company without `learn`. A dry run by the CLI (no agent session runs).
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "meta-b7-"));
process.env.META_LIVE_DIR = path.join(TMP, "unit");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SPECS = path.join(HERE, "..", "specs");
const H = JSON.parse(fs.readFileSync(path.join(SPECS, "textgame-hybrid.json"), "utf8"));
const N = JSON.parse(fs.readFileSync(path.join(SPECS, "textgame-hybrid-nolearn.json"), "utf8"));
const { validateSpec } = await import("../generator.mjs");
const RUNNER = path.join(TMP, "hidden.mjs");
// the hidden runner's contract: one `failed: <category>` line per failing category, exit 1; exit 0 when all pass
fs.writeFileSync(RUNNER, 'import fs from "node:fs"; const g = fs.readFileSync(process.argv[2] + "/game.mjs", "utf8"); const bad = []; if (!g.includes("go <dir>")) bad.push("parser"); for (const b of bad) console.log("failed: " + b); process.exit(bad.length ? 1 : 0);\n');

test("the hybrid spec and its no-learn twin validate, and differ only by learn", () => {
  assert.deepEqual(validateSpec(H), []);
  assert.deepEqual(validateSpec(N), []);
  const { learn, vars, name, ...h } = H, { name: n2, ...n } = N;
  assert.deepEqual(n, h, "identical without learn (and the vars only learn reads)");
  assert.deepEqual([name, n2, learn.roles, learn.retro, learn.store], ["textgame-hybrid", "textgame-hybrid-nolearn", ["builder"], { role: "lead" }, "${playbook_store}"]);
  assert.deepEqual(vars, { playbook_store: "" }, "the store is set at init (--vars): no machine's path in a repo spec");
  for (const r of H.roles.filter((x) => !x.human)) assert.deepEqual(r.tools, ["Bash", "Read", "Write", "Edit", "Glob", "Grep"], `${r.id} names its tools (the SDK then shows only those, as V's six)`);
  const st = Object.fromEntries(H.flow.stages.map((s) => [s.stage, s]));
  assert.deepEqual(H.flow.stages.map((s) => s.stage), ["build", "test1", "eval", "accept", "ship"]);
  assert.deepEqual([H.roles.find((r) => r.id === "builder").warm, st.build.selftest.argv, st.test1.signer, st.test1.run], [true, ["node", "--test"], "code", undefined]);
  assert.deepEqual([st.eval.signer, st.eval.independent, st.eval.batch, st.eval.sample.rate, st.eval.pack.history], [{ role: "evaluator" }, true, undefined, 1, false]);
  assert.ok(st.eval.pack.exclude.includes("NOTES*.md") && st.eval.pack.include.includes("SPEC.md"));
  assert.deepEqual([st.accept.signer, st.accept.run.argvFrom, st.ship.signer], ["code", "order", "code"]);
  assert.ok(!H.roles.some((r) => r.level === "release"), "no release role: a code ship");
  const abs = [...JSON.stringify(H).matchAll(/"(\/[^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(abs, [], "no absolute path");
});

function company(live, spec, vars = null) {
  const env = { ...process.env, META_LIVE_DIR: live }; delete env.NODE_TEST_CONTEXT; delete env.META_ROLE;
  const cli = (file, args, extra = {}) => { const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: { ...env, ...extra }, encoding: "utf8" }); let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; } return { code: r.status, out, err: r.stderr }; };
  const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };
  const as = (role, launch, ...a) => ok(cli("meta.mjs", a, { META_ROLE: role, ...(launch ? { META_LAUNCH: launch } : {}) }));
  const meta = (...a) => ok(cli("meta.mjs", a));
  const tick = () => ok(cli("supervisor.mjs", ["tick"]));
  ok(cli("meta.mjs", ["init", `--spec-file=${path.join(SPECS, spec)}`, ...(vars ? [`--vars=${JSON.stringify(vars)}`] : [])]));
  const W = (task, f, t) => { fs.mkdirSync(path.join(live, "work", task), { recursive: true }); fs.writeFileSync(path.join(live, "work", task, f), t); };
  return { cli, ok, as, meta, tick, W };
}
const SPEC_MD = "# The cave\nRooms: hall, cave. `go <dir>` moves the player; `look` describes the room.\n";
const TESTS = 'import { test } from "node:test"; import assert from "node:assert"; import { play } from "./game.mjs"; test("look", () => assert.match(play(["look"]), /hall/));\n';
const GAME = (v) => `// ${v}\nexport function play(cmds) { return cmds.map((c) => (c === "look" ? "You are in the hall." : ${v === "v2" ? '"go <dir>: you move."' : '"?"'})).join("\\n"); }\n`;

test("hybrid dry run: delegate, a warm build with self-checks, the eval, a revise that resumes the builder, accept, a code ship, the playbook's evidence and retro", () => {
  const live = path.join(TMP, "hybrid"), store = path.join(TMP, "store");
  const C = company(live, "textgame-hybrid.json", { playbook_store: store });
  const id = C.meta("order", "new", "--by=founder", "--to=lead", "--title=The cave", "--task=CAVE", "--accept=a text game as SPEC.md in your workdir specifies", `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`).order;
  C.W("CAVE", "SPEC.md", SPEC_MD);
  assert.deepEqual(C.tick().plan.map((p) => [p.role, p.tasks?.map((t) => t.kind)]), [["lead", ["delegate"]]]);
  C.as("lead", null, "order", "delegate", id, "--by=lead", "--to=builder");
  let p = C.tick().plan.find((x) => x.role === "builder");
  assert.ok(p && !p.resume, "the first build is a cold start");
  const L1 = C.ok(C.cli("supervisor.mjs", ["launched", "--role=builder", `--msgs=${p.msgs.join(",")}`]));
  const lid = `${String(L1.seq).padStart(4, "0")}-builder`;
  let pk = C.as("builder", lid, "room", "enter", `--msg=${p.msgs[0]}`, "--role=builder");
  assert.match(pk.self_check, /runs node --test in the workdir/);
  assert.equal(pk.playbook, undefined, "an empty store: no rules yet");
  C.W("CAVE", "game.mjs", GAME("v1")); C.W("CAVE", "game.test.mjs", TESTS); C.W("CAVE", "NOTES.md", "my notes: parser is a stub\n");
  assert.equal(C.as("builder", lid, "check", `--order=${id}`).pass, true);
  C.as("builder", lid, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs");
  C.meta("launch", "finished", `--launch=${lid}`, "--role=builder", "--tokens=1000", "--sdk-session=22222222-aaaa-4bbb-8ccc-000000000002");
  // test1 passes; the eval is planned at once (no batch hold)
  const t = C.tick();
  assert.equal(C.meta("flow", "show", id).stage, "eval");
  assert.ok(t.plan.find((x) => x.role === "evaluator"), "planned at once: no batch to wait for");
  // the evaluator's pack: the spec and the game, never the builder's notes or the history
  const m = C.meta("queue", "role:evaluator")[0];
  assert.match(C.cli("meta.mjs", ["room", "enter", `--msg=${m.msg}`, "--role=builder"], { META_ROLE: "builder" }).err, /builder may not take/, "the builder never enters its own evaluation");
  const ev = C.as("evaluator", null, "room", "enter", `--msg=${m.msg}`, "--role=evaluator");
  assert.deepEqual([...ev.files].sort(), ["SPEC.md", "game.mjs", "game.test.mjs"], "never NOTES.md");
  assert.ok(ev.history_withheld && ev.findings === null);
  C.W("CAVE", "EVAL.md", "parser: go north prints ? -> go <dir> moves the player\n");
  C.as("evaluator", null, "room", "leave", `--run=${ev.run}`, "--evidence=live/work/CAVE/EVAL.md", "--verdict=revise", "--findings=parser: go north prints ? -> go <dir> moves the player");
  // the revise resumes the builder's own session
  p = C.tick().plan.find((x) => x.role === "builder");
  assert.equal(p.resume, "22222222-aaaa-4bbb-8ccc-000000000002");
  pk = C.as("builder", null, "room", "enter", `--msg=${p.msgs[0]}`, "--role=builder");
  assert.match(pk.findings, /^parser: go north/);
  C.W("CAVE", "game.mjs", GAME("v2"));
  C.as("builder", null, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs");
  C.tick();
  const ev2 = C.as("evaluator", null, "room", "enter", `--msg=${C.meta("queue", "role:evaluator")[0].msg}`, "--role=evaluator");
  C.as("evaluator", null, "room", "leave", `--run=${ev2.run}`, "--evidence=live/work/CAVE/EVAL.md", "--verdict=pass");
  const steps = C.tick().steps.filter((s) => s.order === id).map((s) => `${s.step}:${s.result}`);
  assert.deepEqual(steps.slice(0, 3), ["accept:pass", "ship:pass", "learn-evidence:done"]);
  assert.ok(fs.existsSync(path.join(live, "shipped", "CAVE", "game.mjs")), "code shipped the game");
  const e = JSON.parse(fs.readFileSync(path.join(store, "evidence.jsonl"), "utf8").trim().split("\n")[0]);
  assert.deepEqual([e.order, e.classes, e.stages.eval, e.reviews.eval.ran, e.selfChecks], [id, ["parser"], ["revise", "pass"], 2, { n: 1, failed: 0 }]);
  assert.deepEqual(C.tick().plan.map((x) => [x.role, x.tasks?.map((t) => t.kind)]), [["lead", ["retro"]]], "one retro session for the lead");
});

test("no-learn twin: the same order ships with no store, no evidence and no retro", () => {
  const live = path.join(TMP, "nolearn");
  const C = company(live, "textgame-hybrid-nolearn.json");
  const id = C.meta("order", "new", "--by=founder", "--to=lead", "--title=The cave", "--task=CAVE", "--accept=x", `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`).order;
  C.W("CAVE", "SPEC.md", SPEC_MD);
  C.as("lead", null, "order", "delegate", id, "--by=lead", "--to=builder");
  const pk = C.as("builder", null, "room", "enter", `--msg=${C.meta("queue", "builder")[0].msg}`, "--role=builder");
  C.W("CAVE", "game.mjs", GAME("v2")); C.W("CAVE", "game.test.mjs", TESTS);
  C.as("builder", null, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs");
  C.tick();
  const ev = C.as("evaluator", null, "room", "enter", `--msg=${C.meta("queue", "role:evaluator")[0].msg}`, "--role=evaluator");
  C.as("evaluator", null, "room", "leave", `--run=${ev.run}`, "--evidence=EVAL.md", "--verdict=pass");
  C.tick();
  assert.equal(C.meta("flow", "show", id).stage, "done");
  assert.deepEqual(C.meta("events").filter((x) => x.type.startsWith("learn-")), []);
  assert.match(C.cli("meta.mjs", ["learn", "show"]).err, /no learn spec/);
  assert.deepEqual(C.tick().plan, [], "settled: nothing to plan");
});

// B7 dry run 2 (2026-10-22, the real G1/G2 references and hidden runner, every role by CLI): G1's retro added a rule
// targeting "padlock", a G1-only category; on G2, whose hidden suite has no padlock category, code scored it "helped"
// (the accept stage had caught padlock once, and it judged G2), so a game-specific rule would never retire. A stage run
// may now say which classes it checked (findings.checked); K28 scores a rule only where its class was checked. The
// names are kept as hashes (a worker can read its order's history) and never reach the findings.
test("findings.checked: validated, read from stdout, kept as hashes, never in the findings", async () => {
  const { validateCmd, judgeCmd } = await import("../state.mjs");
  const { classTag } = await import("../lib.mjs");
  assert.equal(validateCmd({ argv: ["x"], findings: { fromStdout: "^failed: (.+)$", checked: "^checked: (.+)$" } }), null);
  assert.match(validateCmd({ argv: ["x"], findings: { fromStdout: "^f", checked: "^checked: .+$" } }), /group 1 lists the defect classes/);
  assert.match(validateCmd({ argv: ["x"], findings: { fromStdout: "^f", extra: 1 } }), /findings is \{fromStdout/);
  const c = { argv: ["x"], findings: { fromStdout: "^failed: (.+)$", checked: "^checked: (.+)$" } };
  const bad = judgeCmd(c, "acc", { status: 1, stdout: "failed: padlock: 1 of 2 tests fail\nchecked: api, padlock, beacon\n", stderr: "" });
  assert.deepEqual([bad.pass, bad.findings, bad.checked], [false, "padlock: 1 of 2 tests fail", ["api", "padlock", "beacon"]]);
  // B8 S2 review: multi-word classes in a comma list stay whole ("W3 sizeof" was split into "W3" and "sizeof", so no
  // W3 rule was ever scored on W4 or W5); a list with no comma still splits on whitespace
  assert.deepEqual(judgeCmd(c, "acc", { status: 1, stdout: "failed: W3 sizeof: 1 of 9 fail\nchecked: W1 functions, W3 sizeof,W5 gnu\n", stderr: "" }).checked, ["W1 functions", "W3 sizeof", "W5 gnu"]);
  assert.deepEqual(judgeCmd(c, "acc", { status: 1, stdout: "failed: x\nchecked: api padlock\n", stderr: "" }).checked, ["api", "padlock"]);
  const none = judgeCmd(c, "acc", { status: 1, stdout: "boom\nchecked: api\n", stderr: "" });
  assert.equal(none.findings, "boom", "the fallback findings leave the checked line out");
  assert.equal(judgeCmd(c, "acc", { status: null, timedOut: true, stdout: "checked: api\n", stderr: "" }).checked, undefined, "a stage-error checked nothing");
  assert.equal(judgeCmd({ argv: ["x"] }, "acc", { status: 0, stdout: "checked: api\n", stderr: "" }).checked, undefined, "no checked regex: no list");
  assert.match(classTag("Padlock"), /^[0-9a-f]{8}$/); assert.equal(classTag("Padlock"), classTag("padlock"));
});

test("K28 scores a rule only on an order whose checking stage checked its class (B7 dry run 2)", () => {
  const store = path.join(TMP, "store-checked");
  // the runner fails `padlock` unless the game says "fixed"; it prints the categories its suite has (argv[3])
  const R = path.join(TMP, "hidden-checked.mjs");
  fs.writeFileSync(R, 'import fs from "node:fs"; const g = fs.readFileSync(process.argv[2] + "/game.mjs", "utf8"); const cats = process.argv[3].split(","); if (cats.includes("padlock") && !g.includes("fixed")) console.log("failed: padlock: 1 of 2 tests fail"); console.log("checked: " + cats.join(", ")); process.exit(cats.includes("padlock") && !g.includes("fixed") ? 1 : 0);\n');
  const game = (live, task, cats, versions) => {
    const C = company(live, "textgame-hybrid.json", { playbook_store: store });
    const id = C.meta("order", "new", "--by=founder", "--to=lead", `--title=${task}`, `--task=${task}`, "--accept=x", `--accept-cmd=${JSON.stringify(["node", R, "${workdir}", cats])}`).order;
    C.W(task, "SPEC.md", SPEC_MD); C.W(task, "game.test.mjs", TESTS);
    C.as("lead", null, "order", "delegate", id, "--by=lead", "--to=builder");
    for (const v of versions) {
      const pk = C.as("builder", null, "room", "enter", `--msg=${C.meta("queue", "builder")[0].msg}`, "--role=builder");
      C.W(task, "game.mjs", GAME("v1").replace("// v1", `// ${v}`));
      assert.equal(C.as("builder", null, "check", `--order=${id}`).pass, true);
      C.as("builder", null, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs");
      C.tick();
      const ev = C.as("evaluator", null, "room", "enter", `--msg=${C.meta("queue", "role:evaluator")[0].msg}`, "--role=evaluator");
      C.as("evaluator", null, "room", "leave", `--run=${ev.run}`, "--evidence=EVAL.md", "--verdict=pass");
      C.tick();
    }
    assert.equal(C.meta("flow", "show", id).stage, "done");
    return { C, id };
  };
  // G1: accept catches padlock once; the lead's retro adds a rule for it, citing the evidence
  const g1 = game(path.join(TMP, "chk-g1"), "G1", "api,padlock", ["broken", "fixed"]);
  const h = g1.C.meta("flow", "show", g1.id).history.filter((x) => x.stage === "accept");
  assert.deepEqual(h.map((x) => x.checked?.length), [2, 2], "each accept keeps what it checked");
  assert.ok(!JSON.stringify(h).includes("padlock, ") && !h[0].checked.includes("padlock"), "as hashes, not names");
  assert.doesNotMatch(h[0].findings, /checked:/);
  const shown = g1.C.as("lead", null, "learn", "show"), e1 = shown.evidence.at(-1);
  assert.deepEqual([e1.classes, Object.keys(e1.checked)], [["padlock"], ["accept"]]);
  const retro = shown.retros.find((r) => r.state === "open").id;
  const p = g1.C.as("lead", null, "learn", "propose", "--by=lead", `--retro=${retro}`, `--proposal=${JSON.stringify({ add: [{ text: "Exercise each puzzle object's repeated and already-solved messages before hand-in.", why: [e1.id], targets: ["padlock"] }] })}`);
  assert.deepEqual(p.added, ["P-1"]);
  g1.C.tick();
  const score = (g) => g.C.meta("events").filter((e) => e.type === "learn-score").map((e) => e.outcome);
  // G2: a suite with no padlock category: the rule is unobserved there (before: helped)
  const g2 = game(path.join(TMP, "chk-g2"), "G2", "api,movement", ["fixed"]);
  assert.deepEqual(score(g2), ["unobserved"]);
  // G3: a suite that has padlock, and the game passes it: helped
  const g3 = game(path.join(TMP, "chk-g3"), "G3", "api,padlock", ["fixed"]);
  assert.deepEqual(score(g3), ["helped"]);
});
