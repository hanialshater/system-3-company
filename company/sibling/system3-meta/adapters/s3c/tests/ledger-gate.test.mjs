// Tests for adapters/s3c/ledger-gate.mjs (plan 2026-10-21-m4-m7-plan.md §M5 "Adapters": the company's project budget
// gate as a planner pre-check). Unit cases run the company's REAL tools/ledger.mjs (copied with tools/lib/ledger.mjs and
// usage.mjs from the main checkout) in a temp repo whose company/ops/projects.json and ledger.jsonl are fixtures; one
// case reads the main checkout's own register, read-only (gate writes nothing).
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseGate } from "../ledger-gate.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "ledger-gate.mjs");
const META = path.join(HERE, "..", "..", "..", "prototype"); // the kernel, for the pre-check case
const MAIN = process.env.S3C_MAIN_REPO ?? "/home/user/system-3-company";

function run(args, extra = {}) {
  const env = { ...process.env, ...extra }; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { env, encoding: "utf8", timeout: 60_000 });
  return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)), stdout: r.stdout };
}
const PROJECTS = {
  thresholds: { warnAt: 0.8, stopAt: 1 },
  projects: [
    { id: "alpha", major: true, status: "approved", budget: { tokens: 1000 } },
    { id: "beta", major: true, status: "approved", budget: { tokens: 1000, topUps: [{ tokens: 500 }] } },
    { id: "gamma", major: true, status: "approved", budget: { tokens: 1000 } },
    { id: "delta", major: true, status: "proposed" },
    { id: "rituals", major: false, status: "active", budget: { tokens: 100 } },
  ],
};
const LEDGER = [["alpha", 200], ["beta", 1300], ["gamma", 1000], ["rituals", 150]].map(([project, tokens], i) => ({ id: `L-${i}`, ts: `2026-10-2${i}T00:00:00Z`, project, role: "demo-builder", agent: `a${i}`, tokens, outcome: "done" }));
function repo({ projects = PROJECTS, ledger = LEDGER, tool = null } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ledger-gate-"));
  fs.mkdirSync(path.join(root, "tools/lib"), { recursive: true });
  fs.mkdirSync(path.join(root, "company/ops"), { recursive: true });
  if (tool != null) fs.writeFileSync(path.join(root, "tools/ledger.mjs"), tool);
  else for (const f of ["tools/ledger.mjs", "tools/lib/ledger.mjs", "tools/lib/usage.mjs"]) fs.copyFileSync(path.join(MAIN, f), path.join(root, f));
  if (projects) fs.writeFileSync(path.join(root, "company/ops/projects.json"), JSON.stringify(projects));
  fs.writeFileSync(path.join(root, "company/ops/ledger.jsonl"), ledger.map((l) => JSON.stringify(l)).join("\n") + "\n");
  return root;
}

test("parseGate reads the tool's lines: level, project, spent of budget, reasons", () => {
  assert.deepEqual(parseGate("warn: wave-j (6.4M of 7.5M)\n  wave-j is at 86%: owner files a forecast with the forum\n"), { level: "warn", project: "wave-j", spent: "6.4M", budget: "7.5M", reasons: ["wave-j is at 86%: owner files a forecast with the forum"] });
  assert.deepEqual(parseGate("ok: x"), { level: "ok", project: "x", spent: null, budget: null, reasons: [] });
  assert.equal(parseGate("Error: boom"), null);
  assert.equal(parseGate(""), null);
});

test("the company's gate through the adapter: ok and warn pass (exit 0), a fail parks with a budget ask (exit 1)", () => {
  const root = repo();
  let r = run(["alpha", `--repo=${root}`]);
  assert.deepEqual([r.exit, r.json.ok, r.json.level, r.json.park, r.json.findings], [0, true, "ok", false, []]);
  r = run(["alpha", "--tokens=700", `--repo=${root}`]); // 200 + 700 of 1000: 90%
  assert.deepEqual([r.exit, r.json.level, r.json.planned], [0, "warn", 700]);
  assert.match(r.json.findings[0].message, /alpha is at 90%/);
  assert.equal(r.json.findings[0].severity, "advisory");
  r = run(["beta", `--repo=${root}`]); // a top-up counts: 1300 of 1500
  assert.deepEqual([r.exit, r.json.level, r.json.budget], [0, "warn", "2k"]);
  r = run(["gamma", `--repo=${root}`]); // 100%: new dispatches stop
  assert.equal(r.exit, 1);
  assert.deepEqual([r.json.ok, r.json.level, r.json.park, r.json.findings[0].route, r.json.ask.kind], [false, "fail", true, "park", "budget"]);
  assert.match(r.json.findings[0].message, /gamma has spent 1k of 1k \(100%\): new dispatches stop/);
  const x = run(["delta", `--repo=${root}`]);
  assert.equal(x.exit, 1);
  assert.match(x.json.findings[0].message, /in status "proposed"/);
  // M5 review: an unknown project is the spec's error, not a budget question: a stage-error, no park, no ask
  const u = run(["nope", `--repo=${root}`]);
  assert.deepEqual([u.exit, u.json.park, "ask" in u.json, u.json.findings[0].kind], [3, false, false, "spec"]);
  assert.match(u.json.findings[0].message, /unknown project or line "nope"/);
  assert.equal(run(["gamma", "--tokens=300", `--repo=${root}`]).json.ask.amount, 300, "the planned tokens are the ask's amount");
  assert.equal(run(["rituals", `--repo=${root}`]).exit, 0, "a budget line over budget flags, never blocks (not major)");
  // S3_PROJECTS / S3_LEDGER cannot point the gate at another register: the checkout's own is read
  const other = path.join(root, "other.json"); fs.writeFileSync(other, JSON.stringify({ projects: [] }));
  assert.equal(run(["alpha", `--repo=${root}`], { S3_PROJECTS: other }).exit, 0);
});

test("a tool that crashes or answers in another shape is a stage-error (exit 3), never a park; usage is exit 2", () => {
  assert.equal(run(["alpha", `--repo=${repo({ projects: null })}`]).exit, 3, "no projects.json: the tool throws (exit 1), not a gate fail");
  assert.equal(run(["alpha", `--repo=${repo({ tool: "console.log('fail: other');process.exit(1)\n" })}`]).exit, 3, "a fail for another project");
  assert.equal(run(["alpha", `--repo=${repo({ tool: "console.log('fail: alpha');process.exit(0)\n" })}`]).exit, 3, "exit and level disagree");
  assert.equal(run(["alpha", `--repo=${repo({ tool: "process.exit(4)\n" })}`]).exit, 3);
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "ledger-gate-none-"));
  assert.equal(run(["alpha", `--repo=${empty}`]).exit, 3);
  for (const args of [[], ["Alpha"], ["a", "b"], ["alpha", "--tokens=x"], ["alpha", "--nope"], ["alpha", "--repo"]]) assert.equal(run(args).exit, 2, args.join(" "));
});

test("the main checkout's register, read only: a real project gets a gate answer (exit 0 or 1, never 3)", () => {
  const reg = JSON.parse(fs.readFileSync(path.join(MAIN, "company/ops/projects.json"), "utf8"));
  const id = reg.projects[0].id;
  const r = run([id, `--repo=${MAIN}`]);
  assert.ok([0, 1].includes(r.exit), r.stdout);
  assert.equal(r.json.project, id);
  assert.ok(["ok", "warn", "fail"].includes(r.json.level));
});

test("M5 review: as a stage pre-check on each order's own project and tokens, a fail parks with a kind:budget ask routed by amount", () => {
  const root = repo();
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "ledger-gate-live-"));
  const meta = (...args) => {
    const env = { ...process.env, META_LIVE_DIR: live }; delete env.NODE_TEST_CONTEXT; delete env.META_ROLE;
    const r = spawnSync(process.execPath, [path.join(META, args[0] === "tick" ? "supervisor.mjs" : "meta.mjs"), ...args], { env, encoding: "utf8", timeout: 60_000 });
    assert.equal(r.status, 0, `${args.join(" ")}: ${r.stderr}`);
    return JSON.parse(r.stdout);
  };
  const spec = {
    name: "m5-ledger", title: "M5 ledger",
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
      { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"], pre: { argv: ["node", ADAPTER, "${ledger_project}", "--tokens=${remaining}", `--repo=${root}`], cwd: root, errorExit: [2, 3], route: { '"route":"park"': "park" } } },
      { stage: "check", signer: "checker", evidence: ["fact-check record"] },
      { stage: "uat", signer: "orderer", independent: true, evidence: ["acceptance"] },
      { stage: "ship", signer: "release", evidence: ["publish"] },
    ] },
  };
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec));
  meta("init", `--spec-file=${f}`);
  const ids = [["gamma", 300_000], ["alpha", 100], ["nope", 100]].map(([p, budget]) => {
    const id = meta("order", "new", "--to=lead", `--title=${p}`, `--task=${p}`, "--accept=x", `--budget=${budget}`, `--ledger-project=${p}`).order;
    meta("order", "delegate", id, "--by=lead", "--to=demo-builder");
    return id;
  });
  const t = meta("tick");
  assert.deepEqual(t.steps.filter((s) => s.kind === "pre").map((s) => [s.order, s.result]), [[ids[0], "park"], [ids[1], "pass"], [ids[2], "stage-error"]]);
  const st = JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
  const [pa] = st.log.events.filter((e) => e.type === "park-ask");
  assert.deepEqual([pa.order, pa.kind, pa.to], [ids[0], "budget", "cos"], "before: a decision ask to the orderer, 'Parked O-1: resume or cancel?'");
  const it = st.data.tracker.items.__map.find(([k]) => k === pa.item)[1];
  assert.deepEqual([it.ask.kind, it.ask.amount], ["budget", 300_000], "the order's remaining tokens, routed over the manager's limit to the chief of staff");
  assert.match(it.body, /Top it up through the project review/, "the gate's own text");
});