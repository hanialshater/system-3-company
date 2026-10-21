import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { validateSpec } from "../generator.mjs";

// M2: a company from a spec file. Exit criterion: one spec regenerates the toy company exactly; a second generates and
// validates.
const HERE = path.dirname(new URL(import.meta.url).pathname);
const cli = (dir, ...args) => { const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT; const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
// the company itself, without timestamps and the spec's own copy
const shape = (s) => JSON.stringify({ roles: s.org.roles, rooms: s.org.rooms, flows: s.engine.flows, active: s.engine.active }, (k, v) => (["t", "at", "created", "since", "ts"].includes(k) ? undefined : v));

test("the toy spec as a file regenerates the toy company exactly", () => {
  const a = fs.mkdtempSync(path.join(os.tmpdir(), "meta-gen-a-")), b = fs.mkdtempSync(path.join(os.tmpdir(), "meta-gen-b-"));
  assert.equal(cli(a, "init", "--spec=toy").code, 0);
  const r = cli(b, "init", `--spec-file=${path.join(HERE, "..", "specs", "toy.json")}`);
  assert.equal(r.code, 0, r.err);
  assert.equal(shape(state(b)), shape(state(a)));
  assert.ok(fs.existsSync(path.join(b, "ORG.md")));
  // the generated company runs without its file: the spec lives in the state
  assert.equal(cli(b, "order", "new", "--by=cos", "--to=mgr-live", "--title=x", "--task=T1", "--accept=a module").code, 0);
});

test("a second spec (a research desk) generates: org, flow, channels, standing rules, ORG.md and CONTEXT.md", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-gen-r-"));
  const r = cli(d, "init", `--spec-file=${path.join(HERE, "..", "specs", "research.json")}`);
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(r.out.files, ["ORG.md", "CONTEXT.md"]);
  assert.match(fs.readFileSync(path.join(d, "ORG.md"), "utf8"), /\| fact-checker \| checker \|/);
  const o = cli(d, "order", "new", "--by=cos", "--to=desk-editor", "--title=Q", "--task=BRIEF1", "--accept=a brief", `--checks=${JSON.stringify({ file: "page.md" })}`);
  assert.equal(o.code, 0, o.err);
  const s = state(d);
  const order = new Map(s.engine.orders.__map).get(o.out.order);
  assert.equal(order.checks.minWords, 150, "the spec's standing rule reached the order");
  assert.ok(s.data.channels, "channels created");
});

test("the validator refuses a company that breaks an invariant, and says which", () => {
  const good = JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", "research.json"), "utf8"));
  assert.deepEqual(validateSpec(good), []);
  const bad = structuredClone(good);
  bad.roles.find((r) => r.id === "researcher-2").reportsTo = "fact-checker"; // a builder whose work nobody delegates
  bad.roles = bad.roles.filter((r) => r.id !== "release");                     // ship has no signer
  bad.roles.find((r) => r.id === "cos").reportsTo = "desk-editor";            // a reporting loop
  const v = validateSpec(bad);
  assert.ok(v.some((x) => /builder researcher-2 reports to a manager/.test(x)));
  assert.ok(v.some((x) => /release role exists/.test(x)));
  assert.ok(v.some((x) => /reporting chain reaches the founder/.test(x)));
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-gen-x-")); const f = path.join(d, "bad.json"); fs.writeFileSync(f, JSON.stringify(bad));
  const r = cli(d, "init", `--spec-file=${f}`);
  assert.notEqual(r.code, 0);
  assert.match(r.err, /breaks \d+ invariant/);
  assert.equal(fs.existsSync(path.join(d, "state.json")), false, "nothing is generated from an invalid spec");
});
