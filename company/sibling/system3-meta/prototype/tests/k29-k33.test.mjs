import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K29-K33 (Benchmark 8: a specialized org, divided ownership on one growing codebase). A small fake org: three owners
// (fe, be, arch) of three modules on one order's worktree, at once; arch also owns an interface. Driven by the CLI as
// the agents and the supervisor drive it, with a temp git repo for the company repo; no SDK session runs.
//   K29 a write to a module another role owns is denied by the launcher's guard, and refused at the commit
//   K30 a revise's findings split by category and routed to each owner (unmatched: the triage role, the lead)
//   K31 parallel owners on one worktree: a commit per owner, only its paths; the integration check after each hand-in,
//       on the commit as made; a failure routed back as a reopened part
//   K32 an interface change: a change request the architect approves; its contract must pass at the next integration
//   K33 evidence names each category's module; the code retro writes scoped rules; each owner's pack carries its own
//   K26 several warm owners on one order: each (order, role) resumes its own SDK session
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k29-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname), UP = "..";
const G = await import(path.join(HERE, UP, "launcher", "guard.mjs"));
const { validateSpec } = await import("../generator.mjs");
const OWN = await import("../owners.mjs");
const LEARN = await import("../learn.mjs");
const { load } = await import("../state.mjs");
const WS = await import("../workspace.mjs");
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };

// the company repo: three modules, an interface, the shared integration check and the interface's contract
const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt"), STORE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k33-store-"));
const put = (dir, f, t) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), t); };
fs.mkdirSync(REPO, { recursive: true });
sh(REPO, "init", "-q", "-b", "main"); sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
put(REPO, "src/front/lex.js", "v0\n"); put(REPO, "src/back/gen.js", "v0\n"); put(REPO, "src/core/rt.js", "v0\n"); put(REPO, "include/api.txt", "api v1\n");
put(REPO, "integrate.mjs", 'import fs from "node:fs"; import path from "node:path"; const bad = [];\nconst walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else { const m = /BROKEN-([a-z]+)/.exec(fs.readFileSync(p, "utf8")); if (m) bad.push(`failed: ${m[1]}: broken in ${p}`); } } };\nwalk("src"); for (const b of bad) console.log(b); process.exit(bad.length ? 1 : 0);\n');
put(REPO, "contract.mjs", 'import fs from "node:fs"; if (!/^api v\\d/.test(fs.readFileSync("include/api.txt", "utf8"))) { console.log("include/api.txt does not start with its version"); process.exit(1); }\n');
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");
// the orderer's hidden acceptance runner (outside the repo): category-only failures
const RUNNER = path.join(LIVE, "accept.mjs");
fs.writeFileSync(RUNNER, 'import fs from "node:fs"; const d = process.argv[2], r = (f) => fs.readFileSync(`${d}/${f}`, "utf8"), out = [];\nif (!r("src/front/lex.js").includes("lex-ok")) out.push("failed: lexer: tokens wrong");\nif (!r("src/back/gen.js").includes("gen-ok")) out.push("failed: codegen: wrong asm");\nif (!r("src/core/rt.js").includes("rt-ok")) out.push("failed: runtime: crash");\nif (!r("src/back/gen.js").includes("fast")) out.push("failed: perf: too slow");\nconsole.log(out.join("\\n")); process.exit(out.length ? 1 : 0);\n');

const SPEC = {
  name: "compilers", title: "a compiler shop (K29-K33)",
  vars: { playbook_store: "" },
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "bench", floor: 2, kind: "lane", lane: "c" }],
  skills: ["manage", "build", "review"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "founder", lane: "c", room: "bench", floor: 2, skills: ["manage"] },
    { id: "arch", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], warm: true },
    { id: "fe", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], warm: true },
    { id: "be", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], warm: true },
    { id: "judge", level: "evaluator", reportsTo: "founder", room: "bench", floor: 2, skills: ["review"] },
  ],
  modules: { front: { paths: ["src/front/**"], owner: "fe", readers: "all" }, back: { paths: ["src/back/**"], owner: "be", readers: "all" }, core: { paths: ["src/core/**"], owner: "arch" } },
  interfaces: [{ name: "api", paths: ["include/**"], owner: "arch", contract: { argv: ["node", "contract.mjs"] } }],
  routes: [{ match: "^(lex|pars)", owner: "front" }, { match: "^codegen", owner: "back" }, { match: "^runtime", owner: "core" }],
  integration: { run: { argv: ["node", "integrate.mjs"], findings: { fromStdout: "^failed: (.+)$" } }, maxTries: 3 },
  workspace: { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "b8", commit: true },
  flow: { name: "wave", stages: [
    { stage: "build", signer: "builder", evidence: ["the owner's module"] },
    { stage: "review", signer: { role: "judge" }, independent: true, evidence: ["REVIEW.md"] },
    { stage: "accept", signer: "code", evidence: [], run: { argvFrom: "order", findings: { fromStdout: "^failed: (.+)$" } } },
    { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } },
  ] },
  learn: { store: "${playbook_store}", roles: ["fe", "be", "arch"], retro: { run: { argv: ["node", "${kernel}/learn.mjs", "retro", "--store=${store}", "--min=1"] } } },
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
const queued = (q, order) => ok(meta("queue", q)).filter((x) => x.order === order);
const log = (dir) => sh(dir, "log", "--format=%s", `${BASE}..HEAD`).split("\n").filter(Boolean);
/** The independent review: never an owner of a part (K4: every owner built it); the judge passes it. */
function review() {
  tick();
  const m = queued("role:judge", O)[0];
  assert.ok(m, "the review is the judge's");
  assert.match(as("fe", null, "room", "enter", `--msg=${m.msg}`, "--role=fe").err, /fe may not take|fe built/);
  const p = ok(as("judge", null, "room", "enter", `--msg=${m.msg}`, "--role=judge"));
  ok(as("judge", null, "room", "leave", `--run=${p.run}`, "--evidence=REVIEW.md", "--verdict=pass"));
}
const SDK = { fe: "aaaaaaaa-0000-4000-8000-00000000000f", be: "bbbbbbbb-0000-4000-8000-00000000000b", arch: "cccccccc-0000-4000-8000-00000000000a" };

test("validation: modules, interfaces, routes and the integration check; every existing spec stays valid", () => {
  assert.deepEqual(validateSpec(SPEC), []);
  const bad = (f) => { const s = JSON.parse(JSON.stringify(SPEC)); f(s); return validateSpec(s).join("\n"); };
  assert.match(bad((s) => { s.modules.front.owner = "nobody"; }), /module front: owner nobody is an agent role/);
  assert.match(bad((s) => { s.modules.front.readers = "some"; }), /readers is "all"/);
  assert.match(bad((s) => { s.modules.front.paths = ["../x"]; }), /paths is a list of workdir-relative globs/);
  assert.match(bad((s) => { s.routes.push({ match: "^x", owner: "ghost" }); }), /owner ghost is a module or an agent role/);
  assert.match(bad((s) => { s.routes.push({ match: "(", owner: "front" }); }), /a route is \{match: <regular expression>, owner\}/);
  assert.match(bad((s) => { delete s.interfaces[0].contract; }), /interface api: contract is the cmd/);
  assert.match(bad((s) => { s.integration.at = "elsewhere"; s.integration.extra = 1; }), /integration is \{run, at, maxTries\}/);
  assert.match(bad((s) => { s.modules.back.paths = ["src/front/**"]; }), /modules front and back both claim src\/front\/\*\*/);
  assert.match(bad((s) => { s.triage = "founder"; }), /triage founder is an agent role/);
  for (const f of ["toy", "storybook", "research", "sheetco", "textgame-hybrid", "textgame-hybrid-nolearn"].map((n) => `${n}.json`)) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", f), "utf8"))), [], f);
  // categories and routes, as code reads them (the K28 classify regex)
  const own = OWN.ownershipOf(SPEC);
  assert.deepEqual(OWN.categorize("node accept.mjs: exit 1\nlexer: tokens wrong\nruntime: crash\nperf: too slow", { skipFirst: true, byCode: true }).map((x) => x.category), ["lexer", "runtime", "perf"]);
  assert.deepEqual([OWN.routeOf(own, "lexer"), OWN.routeOf(own, "parser-errors")?.owner, OWN.routeOf(own, "perf")], [{ owner: "fe", module: "front", route: "^(lex|pars)" }, "fe", null]);
  assert.deepEqual([OWN.ownerOf(own, "include/api.txt").name, OWN.ownerOf(own, "src/core/rt.js").owner, OWN.ownerOf(own, "README.md")], ["api", "arch", null]);
  // K31: the commit lock is re-entrant and leaves nothing behind
  assert.equal(WS.commitLock(LIVE, () => WS.commitLock(LIVE, () => 7)), 7);
});

let O, WT;
test("K31 + K29 + K32 + K26: three owners at once on one worktree, the guard, a refused commit, a change request, the integration check", () => {
  const f = path.join(LIVE, "compilers.json");
  fs.writeFileSync(f, JSON.stringify(SPEC));
  ok(meta("init", `--spec-file=${f}`, `--vars=${JSON.stringify({ playbook_store: STORE })}`));
  O = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Wave 1", "--task=W1", "--accept=wave 1", `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`)).order;
  assert.match(as("lead", null, "order", "delegate", O, "--by=lead", "--to=arch", "--owners=fe,ghost").err, /ghost is not an active agent role/);
  assert.deepEqual(ok(as("lead", null, "order", "delegate", O, "--by=lead", "--to=arch", "--owners=fe,be")).owners, ["arch", "fe", "be"]);
  const t1 = tick();
  WT = path.join(ROOT, "W1");
  assert.ok(t1.steps.some((s) => s.step === "workspace" && s.result === "created"));
  // one work item per owner, on the same order and loop; the planner starts the three owners at once
  for (const r of ["arch", "fe", "be"]) assert.equal(queued(`role:${r}`, O).length, 1, `${r} has its part`);
  const plan = t1.plan.filter((p) => p.msgs?.length);
  assert.deepEqual(plan.map((p) => p.role).sort(), ["arch", "be", "fe"]);
  const lid = {}, pk = {};
  for (const p of plan) { const L = ok(cli("supervisor.mjs", ["launched", `--role=${p.role}`, `--msgs=${p.msgs.join(",")}`])); lid[p.role] = `${String(L.seq).padStart(4, "0")}-${p.role}`; }
  // all three enter before anyone hands in: the pack names the part and what the owner owns
  for (const r of ["arch", "fe", "be"]) pk[r] = ok(as(r, lid[r], "room", "enter", `--msg=${queued(`role:${r}`, O)[0].msg}`, `--role=${r}`));
  assert.deepEqual([pk.fe.part.owner, pk.fe.part.owners.sort(), pk.fe.ownership.yours], ["fe", ["arch", "be", "fe"], ["src/front/**"]]);
  assert.deepEqual(pk.arch.ownership.yours.sort(), ["include/**", "src/core/**"]);
  assert.match(pk.fe.ownership.ask_with, /--kind=change-request --module=<module or interface> --order=O-1/);
  assert.equal(pk.fe.workdir, `${WT}/`);

  // K29: the guard of fe's launch denies a write to another owner's module or the interface; its own module, a shared
  // file and every read are fine
  const cfg = ok(as("fe", lid.fe, "launch", "config", "--role=fe"));
  const owned = cfg.roots.find((x) => x.kind === "owned" && x.dir === WT);
  assert.ok(owned, "the order's worktree carries the ownership table");
  const d = (tool, input) => G.decide(tool, input, { roots: cfg.roots, cwd: WT, role: "fe" });
  assert.equal(d("Write", { file_path: path.join(WT, "src/front/lex.js") }), null);
  assert.equal(d("Write", { file_path: path.join(WT, "NOTES.md") }), null, "an unowned path");
  assert.equal(d("Read", { file_path: path.join(WT, "src/back/gen.js") }), null, "readers: all");
  const w = d("Edit", { file_path: path.join(WT, "src/back/gen.js") });
  assert.deepEqual([w.rule, /module back, owned by be/.test(w.why), /change-request --module=back --order=O-1/.test(w.why)], ["module-owner", true, true]);
  assert.equal(d("Bash", { command: "echo x > src/core/rt.js" }).rule, "module-owner", "a shell write too");
  assert.equal(d("Write", { file_path: path.join(WT, "include/api.txt") }).rule, "module-owner", "the interface is the architect's");
  ok(meta("guard", "denied", ...G.deniedArgs(lid.fe, "fe", { tool: "Edit", rule: w.rule, why: w.why, via: "hook", detail: w.detail }).slice(2)));
  assert.equal(events("guard").at(-1).rule, "module-owner", "a refusal is a guard event");

  // K32: fe needs an interface change: a change request, decided by the architect (never by fe, or anyone else)
  assert.match(as("fe", lid.fe, "ask", "raise", "--by=fe", "--kind=change-request", "--module=nope", `--order=${O}`, "--title=t", "--why=w", "--due=30").err, /none of this company's modules or interfaces/);
  assert.match(as("fe", lid.fe, "ask", "raise", "--by=fe", "--kind=change-request", "--module=front", `--order=${O}`, "--title=t", "--why=w", "--due=30").err, /module front is fe's own/);
  const ask = ok(as("fe", lid.fe, "ask", "raise", "--by=fe", "--kind=change-request", "--module=api", `--order=${O}`, "--title=api: add a token kind", "--why=the lexer emits a new token kind", "--due=30"));
  assert.deepEqual([ask.assignee, ask.ask.approvers, ask.ask.target], ["arch", ["arch"], "interface"]);
  assert.match(as("be", lid.be, "ask", "answer", "--by=be", `--id=${ask.id}`, "--decision=yes", "--text=ok").err, /arch's to answer/);
  ok(as("arch", lid.arch, "ask", "answer", "--by=arch", `--id=${ask.id}`, "--decision=yes", "--text=approved: keep the version line"));
  assert.deepEqual(events("grant").map((e) => [e.role, e.module, e.by]), [["fe", "api", "arch"]]);
  const cfg2 = ok(as("fe", lid.fe, "launch", "config", "--role=fe"));
  assert.equal(G.decide("Write", { file_path: path.join(WT, "include/api.txt") }, { roots: cfg2.roots, cwd: WT, role: "fe" }), null, "granted on this order");
  assert.equal(G.decide("Write", { file_path: path.join(WT, "src/back/gen.js") }, { roots: cfg2.roots, cwd: WT, role: "fe" }).rule, "module-owner", "only what was granted");

  // K31: everyone writes at once; be's code is broken (the integration check catches it) and be stages arch's file
  put(WT, "src/front/lex.js", "lex-v1\n"); put(WT, "include/api.txt", "BROKEN api\n");
  put(WT, "src/back/gen.js", "BROKEN-codegen gen-ok fast\n"); put(WT, "src/core/rt.js", "rt-v1 (be was here)\n");
  sh(WT, "add", "src/core/rt.js");
  // K29 at the commit: be's hand-in would commit arch's file: refused, nothing recorded, be's run stays open
  const r1 = as("be", lid.be, "room", "leave", `--run=${pk.be.run}`, "--evidence=src/back/gen.js");
  assert.equal(r1.code, 1);
  assert.match(r1.err, /module-owner: be's part of O-1 at build is not handed in: be's change touches src\/core\/rt\.js \(module core, owned by arch\)/);
  assert.deepEqual(events("refuse").filter((e) => e.rule === "module-owner").length, 1);
  assert.deepEqual(log(WT), [], "nothing committed");
  sh(WT, "reset", "-q"); put(WT, "src/core/rt.js", "rt-v1\n"); // be undoes it; arch's own work in progress stays
  // fe hands in first: only fe's paths (its module and its grant) are committed; the integration check runs on that
  // commit as made, where be's broken file is not: it passes
  ok(as("fe", lid.fe, "room", "leave", `--run=${pk.fe.run}`, "--evidence=src/front/lex.js"));
  assert.deepEqual(log(WT), [`meta: ${O} build:fe W1`]);
  assert.deepEqual(sh(WT, "show", "--name-only", "--format=", "HEAD").split("\n").sort(), ["include/api.txt", "src/front/lex.js"]);
  assert.equal(sh(WT, "status", "--porcelain", "--untracked-files=no").split("\n").length, 2, "be's and arch's work stays in the worktree");
  let t = tick();
  // the interface changed: its contract is due too, and fails (the version line is gone): fe's part reopens
  let ig = t.steps.find((s) => s.step === "integration");
  assert.deepEqual([ig.result, ig.output], ["revise", "fe: interface-api"]);
  assert.deepEqual(events("integration").map((e) => e.results.map((x) => [x.name, x.pass])), [[["integration", true], ["interface api", false]]]);
  let fe2 = queued("role:fe", O);
  assert.equal(fe2.length, 1, "fe's part again");
  // K26: the launches finish; each warm owner's (order, role) has its own SDK session
  for (const r of ["fe", "arch", "be"]) ok(meta("launch", "finished", `--launch=${lid[r]}`, `--role=${r}`, "--tokens=1000", `--sdk-session=${SDK[r]}`));
  const fePlan = t.plan.find((p) => p.role === "fe") ?? tick().plan.find((p) => p.role === "fe");
  assert.ok(fePlan, "fe is planned again");
  const p2 = tick().plan.find((p) => p.role === "fe");
  assert.equal(p2.resume, SDK.fe, "fe's own session, resumed");
  const L2 = ok(cli("supervisor.mjs", ["launched", "--role=fe", `--msgs=${p2.msgs.join(",")}`, `--resume=${SDK.fe}`]));
  lid.fe = `${String(L2.seq).padStart(4, "0")}-fe`;
  const pf2 = ok(as("fe", lid.fe, "room", "enter", `--msg=${fe2[0].msg}`, "--role=fe"));
  assert.match(pf2.findings, /interface api: its contract failed/);
  assert.deepEqual(pf2.part.categories, ["interface-api"]);
  put(WT, "include/api.txt", "api v2: token kinds\n");
  ok(as("fe", lid.fe, "room", "leave", `--run=${pf2.run}`, "--evidence=include/api.txt"));
  t = tick();
  ig = t.steps.find((s) => s.step === "integration");
  assert.equal(ig.result, "pass");
  assert.equal(ok(meta("flow", "show", O)).stage, "build", "be and arch are not in yet");
  // be hands in its broken code: the check routes "codegen" back to be (its module, by the routes)
  ok(as("be", lid.be, "room", "leave", `--run=${pk.be.run}`, "--evidence=src/back/gen.js"));
  t = tick();
  ig = t.steps.find((s) => s.step === "integration");
  assert.deepEqual([ig.result, ig.output], ["revise", "be: codegen"]);
  const be2 = queued("role:be", O);
  const pb2 = ok(as("be", null, "room", "enter", `--msg=${be2[0].msg}`, "--role=be"));
  assert.match(pb2.findings, /^integration check after be's hand-in failed:\ncodegen: broken in src\/back\/gen\.js/);
  put(WT, "src/back/gen.js", "gen-ok\n");
  ok(as("be", null, "room", "leave", `--run=${pb2.run}`, "--evidence=src/back/gen.js"));
  assert.equal(tick().steps.find((s) => s.step === "integration").result, "pass");
  // the last owner in: the stage passes, then accept (code) revises with three categories
  ok(as("arch", lid.arch, "room", "leave", `--run=${pk.arch.run}`, "--evidence=src/core/rt.js"));
  assert.equal(ok(meta("flow", "show", O)).stage, "build", "arch's hand-in is checked first");
  assert.equal(tick().steps.find((s) => s.step === "integration").result, "pass");
  assert.equal(ok(meta("flow", "show", O)).stage, "review");
  review();
  t = tick();
  assert.deepEqual(log(WT).slice().reverse(), [`meta: ${O} build:fe W1`, `meta: ${O} build:fe W1`, `meta: ${O} build:be W1`, `meta: ${O} build:be W1`, `meta: ${O} build:arch W1`]);
  assert.ok(t.steps.some((s) => s.step === "accept" && s.result === "revise"));
  assert.deepEqual(events("part-in").map((e) => e.by), ["fe", "fe", "be", "be", "arch"]);
});

test("K30: a revise's findings split by owner; unmatched categories to the triage role (the lead), who routes them on", () => {
  const f = ok(meta("flow", "show", O));
  assert.deepEqual([f.stage, f.loops], ["build", 1]);
  const parts = events("parts").at(-1);
  assert.deepEqual(parts.owners, { fe: ["lexer"], arch: ["runtime"], lead: ["perf"] }, "codegen passed: be gets nothing");
  assert.equal(queued("role:be", O).length, 0);
  // K26: two warm owners on the same order are planned at once, each resuming its own (order, role) session
  const plan = tick().plan;
  assert.deepEqual(["fe", "arch"].map((r) => plan.find((p) => p.role === r)?.resume), [SDK.fe, SDK.arch]);
  // each owner's pack carries only its own lines; the history's revise is marked as split
  const pfe = ok(as("fe", null, "room", "enter", `--msg=${queued("role:fe", O)[0].msg}`, "--role=fe"));
  assert.equal(pfe.findings, "lexer: tokens wrong");
  assert.match(pfe.history.find((h) => h.stage === "accept").findings, /split by owner/);
  const par = ok(as("arch", null, "room", "enter", `--msg=${queued("role:arch", O)[0].msg}`, "--role=arch"));
  assert.equal(par.findings, "runtime: crash");
  // the lead triages perf to be (the backend), then hands in its own part
  const pl = ok(as("lead", null, "room", "enter", `--msg=${queued("role:lead", O)[0].msg}`, "--role=lead"));
  assert.equal(pl.findings, "perf: too slow");
  assert.match(as("fe", null, "order", "route", O, "--by=fe", "--to=be", "--categories=perf").err, /fe's part of O-1 has no findings in perf/);
  ok(as("lead", null, "order", "route", O, "--by=lead", "--to=be", "--categories=perf"));
  ok(as("lead", null, "room", "leave", `--run=${pl.run}`, "--evidence=triaged: perf is the backend's"));
  const pbe = ok(as("be", null, "room", "enter", `--msg=${queued("role:be", O)[0].msg}`, "--role=be"));
  assert.equal(pbe.findings, "perf: too slow");
  put(WT, "src/front/lex.js", "lex-ok\n"); put(WT, "src/core/rt.js", "rt-ok\n"); put(WT, "src/back/gen.js", "gen-ok fast\n");
  for (const [r, p] of [["fe", pfe], ["arch", par], ["be", pbe]]) ok(as(r, null, "room", "leave", `--run=${p.run}`, "--evidence=done"));
  assert.equal(tick().steps.find((s) => s.step === "integration").result, "pass");
  review();
  for (let i = 0; i < 4 && ok(meta("flow", "show", O)).stage !== "done"; i++) tick();
  assert.equal(ok(meta("flow", "show", O)).stage, "done");
});

test("K33: evidence names each category's owner and module; the code retro writes scoped rules; each owner's pack carries its own", () => {
  tick();
  const ev = fs.readFileSync(path.join(STORE, "evidence.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l)).find((e) => e.order === O);
  assert.deepEqual(ev.modules, { lexer: "front", runtime: "core", perf: "back" });
  assert.deepEqual(ev.owners, { lexer: "fe", runtime: "arch", perf: "be" });
  const pb = JSON.parse(fs.readFileSync(path.join(STORE, "playbook.json"), "utf8"));
  const scoped = Object.fromEntries(pb.rules.filter((r) => r.status === "active").map((r) => [r.targets[0], r.scope]));
  assert.deepEqual(scoped, { lexer: { module: "front" }, runtime: { module: "core" }, perf: { module: "back" } });
  assert.match(pb.rules.find((r) => r.targets[0] === "lexer").text, /check your front module for "lexer" defects/);
  const co = load();
  const rules = (role) => LEARN.activeRules(co, role).map((r) => r.scope?.module ?? "global");
  assert.deepEqual([rules("fe"), rules("be"), rules("arch")], [["front"], ["back"], ["core"]]);
  // a global rule reaches every learning role; a scope must name a learning role or a module whose owner learns
  const L = co.spec.learn, evidence = LEARN.readEvidence(STORE), cur = LEARN.readPlaybook(STORE);
  assert.match(LEARN.ruleProblem({ text: "Check the token table twice.", why: [ev.id], targets: ["lexer"], scope: { module: "nope" } }, { evidence, pb: cur, learn: L, spec: co.spec }), /scope.module nope is none of the spec's modules/);
  assert.match(LEARN.ruleProblem({ text: "Check the token table twice.", why: [ev.id], targets: ["lexer"], scope: { role: "lead" } }, { evidence, pb: cur, learn: L, spec: co.spec }), /scope.role lead is a learning role/);
  assert.match(LEARN.ruleProblem({ text: "Check the token table twice.", why: [ev.id], targets: ["lexer"], scope: { module: "front", role: "be" } }, { evidence, pb: cur, learn: L, spec: co.spec }), /module front is fe's, not be's/);
  const res = LEARN.applyProposal(co, { add: [{ text: "Run the integration check before you hand in your part.", why: [ev.id], targets: ["lexer"] }] }, { by: "founder" });
  assert.equal(res.added.length, 1);
  assert.deepEqual([rules("fe"), rules("be")], [["front", "global"], ["back", "global"]]);
  assert.match(fs.readFileSync(path.join(STORE, "playbook.md"), "utf8"), /module front; targets lexer/);
});
