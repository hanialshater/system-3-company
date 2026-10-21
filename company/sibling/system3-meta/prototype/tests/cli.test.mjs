import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const cli = (dir, ...args) => {
  const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" });
  return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr };
};

test("batch: set-up in one command, results feed later ops, any refusal saves nothing", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-batch-"));
  assert.equal(cli(dir, "init", "--spec=storybook").code, 0);
  const ops = [
    { cmd: "channel", sub: "create", args: { by: "cos", id: "company", kind: "company" } },
    { cmd: "order", sub: "new", args: { by: "cos", to: "editor", title: "Bible", task: "BIBLE", accept: "a bible", checks: { mustInclude: ["Pip"] } } },
    { cmd: "order", sub: "new", args: { by: "cos", to: "editor", title: "Page 1", task: "PAGE1", accept: "page 1", after: "${1.order}" } },
  ];
  const f = path.join(dir, "ops.json"); fs.writeFileSync(f, JSON.stringify(ops));
  const r = cli(dir, "batch", `--file=${f}`);
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(r.out.results[2].after, ["O-1"]);
  assert.equal(r.out.results[2].blocked, true);
  // a bad op: nothing from this batch is saved
  const bad = [{ cmd: "channel", sub: "create", args: { by: "cos", id: "lane:e", kind: "lane" } }, { cmd: "order", sub: "new", args: { by: "cos", to: "editor", title: "x", task: "X", accept: "x", after: "${9.order}" } }];
  fs.writeFileSync(f, JSON.stringify(bad));
  const r2 = cli(dir, "batch", `--file=${f}`);
  assert.notEqual(r2.code, 0);
  assert.match(r2.err, /batch op 1 .*nothing saved/);
  const state = JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
  assert.equal(JSON.stringify(state).includes('"lane:e"'), false);
});
