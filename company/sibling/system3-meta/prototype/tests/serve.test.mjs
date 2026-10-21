import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const env = (dir) => { const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; return e; };
const cli = (dir, ...args) => { const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env: env(dir), encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };

test("serve: plans, briefs and code steps stream as events with no command per wake; usage is recorded in a batch", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-serve-"));
  const acc = fs.mkdtempSync(path.join(os.tmpdir(), "meta-acc-"));
  fs.writeFileSync(path.join(acc, "T1.test.mjs"), `import { test } from "node:test"; import fs from "node:fs"; import assert from "node:assert"; test("ok", () => assert.ok(fs.readFileSync(process.env.META_LIVE_DIR + "/work/T1/page.md", "utf8").includes("Pip")));\n`);
  cli(dir, "init", "--spec=storybook");
  cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=t", "--task=T1", "--accept=a page about Pip", `--checks={"mustInclude":["Pip"]}`);
  cli(dir, "order", "delegate", "O-1", "--by=editor", "--to=writer-1");
  const sv = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", `--acceptance=${acc}`, "--idle-min=0.02", "--max-min=1"], { env: env(dir) });
  const events = [];
  let buf = "";
  const next = (pred) => new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout; events: ${JSON.stringify(events)}`)), 15000);
    const check = () => { const e = events.find(pred); if (e) { clearTimeout(t); resolve(e); } else setTimeout(check, 50); };
    check();
  });
  sv.stdout.on("data", (d) => { buf += d; let i; while ((i = buf.indexOf("\n")) >= 0) { events.push(JSON.parse(buf.slice(0, i))); buf = buf.slice(i + 1); } });
  try {
    const w = await next((e) => e.event === "launch" && e.role === "writer-1");
    assert.match(fs.readFileSync(w.brief, "utf8"), new RegExp(`room enter --msg=${w.msgs[0]} --role=writer-1`));
    // the agent's work, through the CLI as an agent would do it
    const run = cli(dir, "room", "enter", `--msg=${w.msgs[0]}`, "--role=writer-1").out.run;
    fs.mkdirSync(path.join(dir, "work", "T1"), { recursive: true }); fs.writeFileSync(path.join(dir, "work", "T1", "page.md"), "# Pip\nPip is a fox.\n");
    assert.equal(cli(dir, "room", "leave", `--run=${run}`, "--evidence=work/T1/page.md").code, 0);
    const r = await next((e) => e.event === "launch" && e.role === "reader");
    assert.ok(events.some((e) => e.event === "steps" && e.steps.includes("test1:O-1:pass")), "test1 ran by itself");
    const run2 = cli(dir, "room", "enter", `--msg=${r.msgs[0]}`, "--role=reader").out.run;
    assert.equal(cli(dir, "room", "leave", `--run=${run2}`, "--evidence=work/T1/page.md", "--verdict=pass").code, 0);
    await next((e) => e.event === "done");
    assert.ok(events.some((e) => e.event === "steps" && e.steps.includes("ship:O-1")), "uat and ship ran by themselves");
  } finally { sv.kill(); }
  const u = spawnSync("node", [path.join(HERE, "..", "supervisor.mjs"), "usage", "--finished=writer-1:1000,reader:900"], { env: env(dir), encoding: "utf8" });
  assert.equal(JSON.parse(u.stdout).filter((x) => x.session).length, 2);
});

test("serve: a second supervisor on the same state refuses to start", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-serve2-"));
  cli(dir, "init", "--spec=storybook");
  const a = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--max-min=0.2"], { env: env(dir) });
  await new Promise((r) => a.stdout.once("data", r));
  const b = spawnSync("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--max-min=0.1"], { env: env(dir), encoding: "utf8" });
  a.kill();
  assert.match(b.stdout, /"event":"refused".*another serve/);
  assert.equal(b.status, 1);
});

test("serve: in a quiet company a lost message is sent again by the watchdog (benchmark 4b: the orphan mark was never saved)", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-serve-wd-"));
  cli(dir, "init", "--spec=storybook");
  cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=t", "--task=T1", "--accept=a page", `--checks={"titleLine":true}`);
  cli(dir, "order", "delegate", "O-1", "--by=editor", "--to=writer-1");
  const f = path.join(dir, "state.json"); const s = JSON.parse(fs.readFileSync(f, "utf8"));
  s.mailbox.msgs.__map = s.mailbox.msgs.__map.filter(([, m]) => m.ref !== "O-1"); fs.writeFileSync(f, JSON.stringify(s)); // lost, and nothing else happens
  const sv = spawn("node", [path.join(HERE, "..", "supervisor.mjs"), "serve", "--idle-min=1", "--max-min=0.5"], { env: { ...env(dir), META_WATCHDOG_MIN: "0.05" } });
  let out = ""; sv.stdout.on("data", (d) => (out += d));
  await new Promise((r) => sv.on("close", r));
  const ev = JSON.parse(fs.readFileSync(f, "utf8")).log.events;
  assert.ok(ev.some((e) => e.type === "watchdog-resend" && e.order === "O-1"), out);
  assert.match(out, /"event":"launch","role":"writer-1"/, "the resent message is planned and briefed");
});
