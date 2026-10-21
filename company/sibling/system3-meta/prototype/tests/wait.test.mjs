import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

// benchmark 3: cost was sessions × ~65k, because every revise and re-check arrived a minute after the last session
// left. `room next --wait` keeps the session for the role's next item; the planner counts it as running.
const HERE = path.dirname(new URL(import.meta.url).pathname);
const envOf = (dir) => { const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT; return env; };
const cli = (dir, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env: envOf(dir), encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
const sup = (dir, ...args) => spawnSync("node", [path.join(HERE, "..", "supervisor.mjs"), ...args], { env: envOf(dir), encoding: "utf8" });
const later = (dir, ...args) => new Promise((res) => { const p = spawn("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env: envOf(dir) }); let o = ""; p.stdout.on("data", (d) => (o += d)); p.on("close", (code) => res({ code, out: o ? JSON.parse(o) : null })); });

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-wait-"));
  assert.equal(cli(dir, "init", "--spec=storybook").code, 0);
  for (const t of ["P1", "P2"]) assert.equal(cli(dir, "order", "new", "--by=cos", "--to=editor", `--title=${t}`, `--task=${t}`, "--accept=a page").code, 0);
  assert.equal(cli(dir, "order", "delegate", "O-1", "--by=editor", "--to=writer-1").code, 0);
  const msg = cli(dir, "queue", "writer-1").out[0].msg;
  const run = cli(dir, "room", "enter", `--msg=${msg}`, "--role=writer-1").out.run;
  return { dir, run };
}

test("room next --wait: the session takes an item that arrives while it waits, and the planner plans no second session", async () => {
  const { dir, run } = setup();
  const waiting = later(dir, "room", "next", `--run=${run}`, "--cap=4", "--wait=20", "--evidence=x");
  await new Promise((r) => setTimeout(r, 1500));
  assert.equal(cli(dir, "order", "delegate", "O-2", "--by=editor", "--to=writer-1").code, 0);
  const planned = JSON.parse(sup(dir, "tick").stdout);
  assert.equal((planned.plan ?? []).some((p) => p.role === "writer-1"), false, "writer-1 is waiting: no new session");
  const r = await waiting;
  assert.equal(r.code, 0);
  assert.equal(r.out.waited, true);
  assert.equal(r.out.left.order, "O-1");
  assert.match(JSON.stringify(r.out), /O-2/);
});

test("room next --wait: nothing arrives, the session closes when the wait is over", async () => {
  const { dir, run } = setup();
  const r = await later(dir, "room", "next", `--run=${run}`, "--cap=4", "--wait=3", "--evidence=x");
  assert.equal(r.code, 0);
  assert.equal(r.out.reason, "queue empty");
  assert.match(r.out.note, /session is over/);
});
