import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// M7 dry run (plan 2026-10-21 §5, M7's gate: "a ritual-flow dry run on the sandbox; a K22 restart test"), the defects
// it found in the kernel, each a regression test on the real CLIs with temp state:
//   1  serve's step stream and the supervisor-tick event named a step about no order `host:undefined:clear` and
//      `export:undefined:pass` (three exports, three identical words): a step with no order is named by its own id
const HERE = path.dirname(new URL(import.meta.url).pathname);
const { stepLabel } = await import("../supervisor.mjs");
const env = (dir, extra = {}) => { const e = { ...process.env, META_LIVE_DIR: dir, ...extra }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE; return e; };
const exec = (dir, file, args, extra = {}) => {
  const r = spawnSync("node", [file, ...args], { env: env(dir, extra), encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const ok = (r) => { assert.equal(r.code, 0, r.err || r.stdout); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const okCmd = { argv: ["node", "-e", "process.exit(0)"], cwd: "${live}" };
const PROBE = { META_HOST_PROBE: JSON.stringify({ load: 0.1, cpus: 4, freeGB: 50 }) }; // serve: the hold clears

/** A small company with a host policy (a `host` step every change) and two exports (two `export` steps a tick). */
function init() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m7dry-"));
  const s = {
    name: "m7dry",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "office", floor: 1, kind: "office" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
    ],
    policy: { host: { maxLoadPerCpu: 2, minFreeGB: 10 } },
    exports: [{ id: "events-export", role: "chief-of-staff", every: "tick", run: okCmd }, { id: "board-mirror", role: "chief-of-staff", every: "tick", run: okCmd }],
    flows: { ritual: { stages: [{ stage: "run", signer: "chair", evidence: ["records/<ritual>.md"] }, { stage: "check", signer: "attendee", evidence: ["records/<ritual>.md"] }, { stage: "ship", signer: "code", evidence: [], run: okCmd }] } },
  };
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(s));
  ok(exec(dir, path.join(HERE, "..", "meta.mjs"), ["init", `--spec-file=${f}`]));
  return dir;
}

test("M7 dry run 1: stepLabel names a step by its order, message, run, contract or goal, else its own id; never `undefined`", () => {
  assert.equal(stepLabel({ step: "test1", order: "O-1", result: "pass" }), "test1:O-1:pass");
  assert.equal(stepLabel({ step: "ship", order: "O-1" }), "ship:O-1");
  assert.equal(stepLabel({ step: "export", id: "board-mirror", result: "pass" }), "export:board-mirror:pass");
  assert.equal(stepLabel({ step: "scheduler", order: "rituals", result: "0 placed, 7 open" }), "scheduler:rituals:0 placed, 7 open");
  assert.equal(stepLabel({ step: "host", result: "clear" }), "host:clear");
  assert.equal(stepLabel({ step: "host", result: "clear" }, { result: false }), "host");
  assert.equal(stepLabel({ step: "promote", msg: "M-3" }, { result: false }), "promote:M-3");
});

test("M7 dry run 1: the supervisor-tick event and serve's stream name host and export steps without `undefined`", async () => {
  const dir = init();
  // a host step is logged when the hold changes: a full disk holds it
  ok(exec(dir, path.join(HERE, "..", "supervisor.mjs"), ["tick"], { META_HOST_PROBE: JSON.stringify({ load: 0.1, cpus: 4, freeGB: 5 }) }));
  const ticks = state(dir).log.events.filter((e) => e.type === "supervisor-tick");
  assert.ok(ticks.length, "the first tick logged its host step");
  assert.ok(ticks.at(-1).steps.includes("host"), JSON.stringify(ticks.at(-1).steps));
  assert.ok(!ticks.some((e) => e.steps.some((x) => /undefined/.test(x))), JSON.stringify(ticks));
  const p = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--max-min=0.02", "--idle-min=0.01"], { env: env(dir, PROBE) });
  let out = "";
  p.stdout.on("data", (d) => { out += d; });
  await new Promise((r) => p.on("exit", r));
  const steps = out.split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((e) => e.event === "steps").flatMap((e) => e.steps);
  assert.ok(steps.includes("export:events-export:pass") && steps.includes("export:board-mirror:pass"), JSON.stringify(steps));
  assert.ok(!steps.some((x) => /undefined/.test(x)), JSON.stringify(steps));
});
