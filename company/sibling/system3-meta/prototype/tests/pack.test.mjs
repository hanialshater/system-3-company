import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K6 (plan 2026-10-21 §3): context-pack rules per stage, `pack:{include, exclude, history:false}`. With history:false the
// brief and the room pack leave out prior findings and build history (stage 6, artifact before account); exclude keeps
// build.md out of a reviewer's pack (stage 5).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k6-"));
process.env.META_LIVE_DIR = LIVE;
const { make, save } = await import("../state.mjs");
const { flowProblems, packProblem, packHistory } = await import("../lib.mjs");
const { briefFor } = await import("../supervisor.mjs");
const { validateSpec, orgDoc, builtinSpec } = await import("../generator.mjs");
const { packGlobRe, packFiles } = await import("../workspace.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);

const SPEC = () => ({
  name: "lessons-k6", title: "K6",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "s" }, { id: "review", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
  skills: ["manage", "build", "verify", "learn", "release"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "cos", lane: "s", room: "studio", floor: 2, skills: ["manage"] },
    { id: "demo-builder", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"] },
    { id: "fact-checker", level: "checker", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["verify"] },
    { id: "learner-evaluator", level: "evaluator", reportsTo: "cos", lane: "q", room: "review", floor: 3, skills: ["learn"] },
    { id: "release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
  ],
  flow: { name: "lesson", stages: [
    { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"] },
    { stage: "check", signer: { role: "fact-checker" }, evidence: ["fact-check record"], pack: { exclude: ["build.md", "notes/"] } },
    { stage: "learner", signer: { role: "learner-evaluator" }, evidence: ["learner review"], pack: { include: ["src/**/*.tsx", "*.json"], exclude: ["build.md"], history: false } },
    { stage: "ship", signer: "release", evidence: ["publish"] },
  ] },
});
function company(spec = SPEC()) {
  const co = make(spec.name, spec);
  co.org.genesis(spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define(spec.flow.name, spec.flow, { by: "cos" }), { by: "founder", words: "Approve" });
  return co;
}
const msgFor = (co, o, to) => co.mailbox.queue(to, "work").find((m) => m.ref === o.id);
const sign = (co, o, to, role, opts = {}) => { const { run } = co.rooms.enter({ msg: msgFor(co, o, to).id, role }); co.rooms.leave(run, { evidence: "e", ...opts }); };
/** An order at the learner stage, after a fact-check revise with findings and a second build. */
function atLearner(co) {
  const o = co.engine.orderNew({ flow: "lesson", by: "cos", to: "lead", budget: 100, accept: "a lesson" }); o.task = "L1";
  co.engine.delegate(o.id, { by: "lead", to: "demo-builder", budget: 100 });
  sign(co, o, "demo-builder", "demo-builder", { learned: "built it" });
  sign(co, o, "role:fact-checker", "fact-checker", { verdict: "revise", findings: "SECRET-FINDING: card 2 claim unsourced" });
  sign(co, o, "demo-builder", "demo-builder");
  sign(co, o, "role:fact-checker", "fact-checker");
  // the evaluator's own memory of this order would carry the account too (a re-review after a reopen)
  co.rooms.memory.set("learner-evaluator", [{ t: 0, did: `learner on ${o.id}: revise (loop 0)`, learned: "PRIOR-REVIEW", mistake: null }, { t: 0, did: "learner on O-99: pass (loop 0)", learned: "other order", mistake: null }]);
  assert.equal(co.engine.orders.get(o.id).stage, "learner");
  return co.engine.orders.get(o.id);
}

test("K6: pack rules validate in the spec and in every flow definition; a code stage has no pack", () => {
  assert.deepEqual(validateSpec(SPEC()), []);
  assert.deepEqual(flowProblems(SPEC().flow), []);
  for (const [p, re] of [[[], /pack is \{include, exclude, history\}/], [{ history: "no" }, /pack.history is true or false/], [{ include: "src/**" }, /pack.include is a list/], [{ exclude: ["../x"] }, /pack.exclude is a list/], [{ include: ["/abs"] }, /pack.include/], [{ hist: false }, /pack has unknown key hist/]]) {
    assert.match(packProblem(p), re);
    const bad = SPEC(); bad.flow.stages[2].pack = p;
    assert.match(validateSpec(bad).join("\n"), new RegExp("stage learner: " + re.source));
    assert.match(flowProblems(bad.flow).join("\n"), new RegExp("learner: " + re.source));
  }
  const code = SPEC(); code.flow.stages.splice(1, 0, { stage: "gates", signer: "code", evidence: [], pack: { history: false } });
  assert.match(validateSpec(code).join("\n"), /stage gates: a pack is for a stage an agent works, not code/);
  assert.equal(packProblem(null), null); assert.equal(packHistory({ stage: "x" }), true); assert.equal(packHistory({ pack: { history: false } }), false);
  // every built-in spec still validates (no pack: nothing changes)
  for (const n of ["toy", "storybook"]) assert.deepEqual(validateSpec(builtinSpec(n)), [], n);
  for (const n of ["research", "sheetco", "sheetco-r"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
  assert.match(orgDoc(SPEC(), "k6"), /\*\*learner\*\*.*\(pack: no prior findings or history; only src\/\*\*\/\*\.tsx, \*\.json; never build\.md\)/);
});

test("K6: pack globs: ** any depth, a bare name anywhere, a trailing / the whole folder; .git and node_modules are skipped", () => {
  assert.ok(packGlobRe("build.md").test("build.md") && packGlobRe("build.md").test("src/demos/x/build.md") && !packGlobRe("build.md").test("build.mdx"));
  assert.ok(packGlobRe("src/**/*.tsx").test("src/a.tsx") && packGlobRe("src/**/*.tsx").test("src/demos/x/Demo.tsx") && !packGlobRe("src/**/*.tsx").test("lib/src/a.tsx"));
  assert.ok(packGlobRe("notes/").test("notes/a/b.md") && packGlobRe("notes/").test("x/notes/a.md") && !packGlobRe("notes/").test("notesx/a"));
  assert.ok(packGlobRe("a?.md").test("ab.md") && !packGlobRe("a?.md").test("a/.md"));
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k6-files-"));
  for (const f of ["build.md", "meta.json", "src/demos/x/Demo.tsx", "src/demos/x/build.md", "src/demos/x/meta.json", "notes/n.md", ".git/HEAD", "node_modules/p/i.tsx", ".next-L1/s.tsx"]) { fs.mkdirSync(path.dirname(path.join(d, f)), { recursive: true }); fs.writeFileSync(path.join(d, f), "x"); }
  assert.equal(packFiles(d, null), null); assert.equal(packFiles(d, { history: false }), null);
  assert.deepEqual(packFiles(d, { exclude: ["build.md", "notes/"] }).files, ["meta.json", "src/demos/x/Demo.tsx", "src/demos/x/meta.json"]);
  assert.deepEqual(packFiles(d, { include: ["src/**/*.tsx", "*.json"], exclude: ["src/demos/x/meta.json"] }).files, ["meta.json", "src/demos/x/Demo.tsx"]);
  assert.deepEqual(packFiles(path.join(d, "gone"), { include: ["*"] }).files, []);
});

test("K6: with history:false the brief names no findings or history and says artifact before account; other stages keep them", () => {
  const co = company();
  const o = atLearner(co);
  const learner = briefFor(co, { role: "learner-evaluator", msgs: [msgFor(co, o, "role:learner-evaluator").id], cap: 1, why: "t" });
  assert.match(learner, /accept criteria, memory, the files you read and the exact/);
  assert.doesNotMatch(learner, /findings, history/);
  assert.match(learner, /This stage \(learner\) judges the artifact before the account: its pack leaves out prior findings and build history/);
  assert.match(learner, /Read only these in the workdir: src\/\*\*\/\*\.tsx, \*\.json\./);
  assert.match(learner, /Never open: build\.md\./);
  assert.doesNotMatch(learner, /SECRET-FINDING/);
  // a stage with no pack (and a builder's brief) is as before K6
  const co2 = company(); const o2 = co2.engine.orderNew({ flow: "lesson", by: "cos", to: "lead", budget: 100, accept: "x" }); o2.task = "L2";
  co2.engine.delegate(o2.id, { by: "lead", to: "demo-builder", budget: 100 });
  const b = briefFor(co2, { role: "demo-builder", msgs: [msgFor(co2, o2, "demo-builder").id], cap: 1, why: "t" });
  assert.match(b, /accept criteria, findings, history, memory and the exact/);
  assert.doesNotMatch(b, /artifact before the account|Never open|Read only/);
  sign(co2, o2, "demo-builder", "demo-builder");
  const chk = briefFor(co2, { role: "fact-checker", msgs: [msgFor(co2, o2, "role:fact-checker").id], cap: 1, why: "t" });
  assert.match(chk, /accept criteria, findings, history, memory, the files you read and the exact/);
  assert.match(chk, /Never open: build\.md, notes\/\./);
  assert.doesNotMatch(chk, /artifact before the account/);
});

test("the CLI: `room enter` on a history:false stage gives a pack with no findings, history or memory of the order, and only the files its rules let in", () => {
  const co = company();
  const o = atLearner(co);
  const work = path.join(LIVE, "work", o.task);
  for (const f of ["build.md", "meta.json", "src/Demo.tsx", "src/build.md", "src/style.css"]) { fs.mkdirSync(path.dirname(path.join(work, f)), { recursive: true }); fs.writeFileSync(path.join(work, f), "x"); }
  save(co);
  const env = { ...process.env, META_LIVE_DIR: LIVE }; delete env.NODE_TEST_CONTEXT;
  const run = (...args) => { const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr, raw: r.stdout }; };
  const e = run("room", "enter", `--msg=${msgFor(co, o, "role:learner-evaluator").id}`, "--role=learner-evaluator");
  assert.equal(e.code, 0, e.err);
  assert.equal(e.out.stage, "learner");
  assert.equal(e.out.findings, null);
  assert.deepEqual(e.out.history, []);
  assert.match(e.out.history_withheld, /artifact before the account/);
  assert.deepEqual(e.out.memory.map((m) => m.learned), ["other order"], "the role's memory of this order is withheld, of others kept");
  assert.doesNotMatch(e.raw, /SECRET-FINDING|PRIOR-REVIEW|built it/);
  assert.deepEqual(e.out.files, ["meta.json", "src/Demo.tsx"]);
  assert.deepEqual(e.out.read_only, ["src/**/*.tsx", "*.json"]);
  assert.deepEqual(e.out.never_read, ["build.md"]);
  assert.equal(e.out.files_truncated, false);
  assert.equal(e.out.accept, "a lesson", "the accept criteria still travel: they are the order, not the account");
});

test("the CLI: a stage without history:false still gets findings and history (the builder's revise, every run before K6)", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k6-cli-"));
  const env = { ...process.env, META_LIVE_DIR: d }; delete env.NODE_TEST_CONTEXT;
  const run = (...args) => { const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
  const f = path.join(d, "k6.json"); fs.writeFileSync(f, JSON.stringify(SPEC()));
  const bad = SPEC(); bad.flow.stages[2].pack = { history: 0 }; fs.writeFileSync(path.join(d, "bad.json"), JSON.stringify(bad));
  assert.match(run("init", `--spec-file=${path.join(d, "bad.json")}`).err, /stage learner: pack.history is true or false/);
  assert.equal(run("init", `--spec-file=${f}`).code, 0);
  const o = run("order", "new", "--by=cos", "--to=lead", "--title=x", "--task=L3", "--accept=a lesson").out.order;
  assert.equal(run("order", "delegate", o, "--by=lead", "--to=demo-builder", "--budget=100").code, 0);
  const msgs = () => [...new Map(JSON.parse(fs.readFileSync(path.join(d, "state.json"), "utf8")).mailbox.msgs.__map).values()].filter((m) => m.state === "open" && m.kind === "work");
  const b = run("room", "enter", `--msg=${msgs()[0].id}`, "--role=demo-builder");
  assert.equal(run("room", "leave", `--run=${b.out.run}`, "--evidence=w").code, 0);
  const c = run("room", "enter", `--msg=${msgs()[0].id}`, "--role=fact-checker");
  assert.equal(c.code, 0, c.err);
  assert.equal(c.out.history_withheld, undefined);
  assert.equal(c.out.history.length, 1);
  assert.deepEqual(c.out.files, [], "an exclude-only pack names the workdir's files (none yet)");
  assert.equal(run("room", "leave", `--run=${c.out.run}`, "--evidence=w", "--verdict=revise", "--findings=fix card 2").code, 0);
  const r = run("room", "enter", `--msg=${msgs()[0].id}`, "--role=demo-builder");
  assert.equal(r.code, 0, r.err);
  assert.equal(r.out.findings, "fix card 2");
  assert.equal(r.out.history.length, 2);
  assert.equal(r.out.files, undefined, "a stage with no pack names no files");
});
