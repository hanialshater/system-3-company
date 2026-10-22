import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M6 smoke (2026-10-22: specs/s3c-lessons-m6.json driven by CLI in a temp live dir, no agent session): one case per
// kernel defect it found, driving the real CLI on temp state.
//   1 decide words  `approval decide --decision=approved` denied the budget the founder meant to approve, in silence
//                   (the order stayed at budget with no ask left); only approve or deny is taken now
//   2 check         `check --order` ran the builder's own node tests ("no *.test.mjs") and said "the same check test1
//                   will run", but test1 with a spec `run` cmd (s3c: gates.mjs --stage=build) signs by that cmd; it
//                   now runs that cmd, with the order's ${slug}, outside the state lock
const HERE = path.dirname(new URL(import.meta.url).pathname);
const META = path.join(HERE, "..", "meta.mjs");
const exec = (dir, args) => {
  const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_LAUNCH;
  const r = spawnSync("node", [META, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const ok = (r) => { assert.equal(r.code, 0, r.err || r.stdout); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const { builtinSpec } = await import("../generator.mjs");
function init(spec) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m6s-"));
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(exec(dir, ["init", `--spec-file=${f}`]));
  return dir;
}

test("M6 smoke 1: approval decide takes approve or deny only; any other word is refused and the approval stays open", () => {
  const dir = init(builtinSpec("toy"));
  const id = ok(exec(dir, ["order", "new", "--to=mgr-live", "--title=T", "--task=T", "--accept=x", "--budget=50000000"])).order;
  assert.equal(orderOf(dir, id).stage, "budget", "over the founder's limit: a budget approval first");
  const words = ["--by=founder", "--words=approve the budget", "--channel=chat"];
  const bad = exec(dir, ["approval", "decide", "--ids=A-1", "--decision=approved", ...words]);
  assert.equal(bad.code, 1);
  assert.match(bad.stdout + bad.err, /decision is one of approve, deny, not \\"approved\\"/);
  assert.equal(state(dir).engine.approvals.__map.find(([k]) => k === "A-1")[1].state, "open", "nothing decided");
  assert.equal(orderOf(dir, id).stage, "budget");
  assert.deepEqual(ok(exec(dir, ["approval", "decide", "--ids=A-1", "--decision=approve", ...words])), [{ id: "A-1", state: "approved" }]);
  assert.equal(orderOf(dir, id).stage, "build");
});

test("M6 smoke 2: check --order runs the flow's test1 `run` cmd (with the order's ${slug}) outside the lock, not the builder's node tests", () => {
  const s = builtinSpec("toy");
  // the cmd reports its slug, whether the state lock was held while it ran, and fails until the workdir holds `ok`
  const t1 = s.flow.stages.find((x) => x.stage === "test1");
  t1.run = { argv: ["node", "-e", "const fs = require('fs'); const ok = fs.existsSync('ok'); fs.appendFileSync('seen', String(fs.existsSync(process.argv[2])) + '\\n'); console.log(JSON.stringify({ ok, slug: process.argv[1] })); if (!ok) console.log('block no-lesson: no meta.json for ' + process.argv[1]); process.exit(ok ? 0 : 1)", "${slug}", "${live}/state.lock"], pass: { json: "ok", equals: true }, findings: { fromStdout: "^block [\\w-]+: (.*)$" } };
  const dir = init(s);
  const id = ok(exec(dir, ["order", "new", "--to=mgr-live", "--title=T", "--task=LESSON-my-lesson", "--slug=my-lesson", "--accept=x"])).order;
  ok(exec(dir, ["order", "delegate", id, "--by=mgr-live", "--to=toy-builder-1"]));
  const work = path.join(dir, "work", "LESSON-my-lesson");
  fs.mkdirSync(work, { recursive: true });
  let c = ok(exec(dir, ["check", `--order=${id}`]));
  assert.equal(c.pass, false);
  assert.equal(c.cmd[3], "my-lesson", "${slug} is the order's slug, not its task");
  assert.equal(c.findings, "no meta.json for my-lesson");
  assert.doesNotMatch(String(c.output), /no \*\.test\.mjs/, "not the builder's node tests");
  assert.deepEqual(c.rules, ["the flow's test1 cmd (spec run)"]);
  fs.writeFileSync(path.join(work, "ok"), "");
  c = ok(exec(dir, ["check", `--order=${id}`]));
  assert.equal(c.pass, true);
  const ev = state(dir).log.events.filter((e) => e.type === "self-check");
  assert.deepEqual(ev.map((e) => e.pass), [false, true], "each self-check is recorded");
  assert.equal(orderOf(dir, id).stage, "build", "nothing is signed");
  assert.deepEqual(fs.readFileSync(path.join(work, "seen"), "utf8").trim().split("\n"), ["false", "false"], "the cmd ran with the state lock free");
  // a flow whose test1 has no cmd keeps the builder's own tests
  const plain = init(builtinSpec("toy"));
  const p = ok(exec(plain, ["order", "new", "--to=mgr-live", "--title=T", "--task=P", "--accept=x"])).order;
  ok(exec(plain, ["order", "delegate", p, "--by=mgr-live", "--to=toy-builder-1"]));
  fs.mkdirSync(path.join(plain, "work", "P"), { recursive: true });
  assert.deepEqual(ok(exec(plain, ["check", `--order=${p}`])).rules, ["the builder's own tests (node --test)"]);
});
