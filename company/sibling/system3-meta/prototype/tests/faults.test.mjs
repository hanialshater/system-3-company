import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Benchmark 4 / M3: the faults a hands-free company must survive, each recovered by code.
const HERE = path.dirname(new URL(import.meta.url).pathname);
const envOf = (dir, extra = {}) => { const env = { ...process.env, META_LIVE_DIR: dir, BOOK_ROOT: path.join(dir, "work"), ...extra }; delete env.NODE_TEST_CONTEXT; return env; };
const cli = (dir, args, extra) => { const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env: envOf(dir, extra), encoding: "utf8" }); return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr }; };
const tick = (dir, args = [], extra) => JSON.parse(spawnSync("node", [path.join(HERE, "..", "supervisor.mjs"), "tick", ...args], { env: envOf(dir, extra), encoding: "utf8" }).stdout);
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const C = JSON.stringify({ titleLine: true, minWords: 3 });

function company() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-faults-"));
  assert.equal(cli(dir, ["init", "--spec=storybook"]).code, 0);
  return dir;
}
function order(dir, task) {
  const o = cli(dir, ["order", "new", "--by=cos", "--to=editor", `--title=${task}`, `--task=${task}`, "--accept=a page", `--checks=${C}`]).out.order;
  assert.equal(cli(dir, ["order", "delegate", o, "--by=editor", "--to=writer-1"]).code, 0);
  return o;
}
const queue = (dir, role) => cli(dir, ["queue", role]).out;

test("watchdog: an order whose message was lost is sent again", () => {
  const dir = company();
  const o = order(dir, "P1");
  const s = state(dir);
  s.mailbox.msgs.__map = s.mailbox.msgs.__map.filter(([, m]) => m.ref !== o); // the dropped message (fault F3)
  fs.writeFileSync(path.join(dir, "state.json"), JSON.stringify(s));
  assert.equal(queue(dir, "writer-1").length, 0);
  tick(dir, [], { META_WATCHDOG_MIN: "0" }); // first sight: orphaned
  const t = tick(dir, [], { META_WATCHDOG_MIN: "0" });
  assert.ok(t.steps.some((x) => x.step === "watchdog" && x.order === o));
  assert.equal(queue(dir, "writer-1")[0].order, o);
});

function shipPage(dir, task, acc) {
  const o = order(dir, task);
  const msg = queue(dir, "writer-1").find((m) => m.order === o).msg;
  const run = cli(dir, ["room", "enter", `--msg=${msg}`, "--role=writer-1"]).out.run;
  fs.mkdirSync(path.join(dir, "work", task), { recursive: true });
  fs.writeFileSync(path.join(dir, "work", task, "page.md"), `# ${task}\n\nA small page with words.\n`);
  assert.equal(cli(dir, ["room", "leave", `--run=${run}`, "--evidence=page"]).code, 0);
  tick(dir, [`--acceptance=${acc}`]); // test1
  const cm = queue(dir, "pool:checker").find((m) => m.order === o).msg;
  const crun = cli(dir, ["room", "enter", `--msg=${cm}`, "--role=reader"]).out.run;
  assert.equal(cli(dir, ["room", "leave", `--run=${crun}`, "--evidence=read", "--verdict=pass"]).code, 0);
  return { o, t: tick(dir, [`--acceptance=${acc}`]) };
}

test("regression gate: a later ship re-runs every shipped order's acceptance and reopens the one that broke", () => {
  const dir = company();
  const acc = fs.mkdtempSync(path.join(os.tmpdir(), "meta-acc-"));
  for (const t of ["P1", "P2"]) fs.writeFileSync(path.join(acc, `${t}.test.mjs`), `import { test } from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs"; import path from "node:path";\ntest("${t}", () => assert.match(fs.readFileSync(path.join(process.env.BOOK_ROOT, "${t}", "page.md"), "utf8"), /^# /));\n`);
  const a = shipPage(dir, "P1", acc);
  assert.ok(a.t.steps.some((x) => x.step === "ship" && x.order === a.o));
  fs.writeFileSync(path.join(dir, "work", "P1", "page.md"), "no title now\n"); // a shipped module corrupted (fault F2)
  const b = shipPage(dir, "P2", acc);
  assert.ok(b.t.steps.some((x) => x.step === "regression" && x.order === a.o), JSON.stringify(b.t.steps));
  const p1 = state(dir).engine.orders.__map.find(([id]) => id === a.o)[1];
  assert.equal(p1.stage, "build");
  assert.match(p1.findings, /^regression/);
});

test("launch finished: a failed agent process gives its work back and closes its session", () => {
  const dir = company();
  const o = order(dir, "P1");
  const msg = queue(dir, "writer-1")[0].msg;
  const e = cli(dir, ["room", "enter", `--msg=${msg}`, "--role=writer-1"], { META_LAUNCH: "0001-writer-1" });
  assert.equal(e.code, 0);
  const f = cli(dir, ["launch", "finished", "--launch=0001-writer-1", "--role=writer-1", "--tokens=30000", "--ok=false", "--reason=killed"]);
  assert.equal(f.code, 0, f.err);
  assert.deepEqual(f.out.abandoned, [e.out.run]);
  assert.equal(queue(dir, "writer-1")[0].order, o); // back in the queue, free to claim
  const ev = state(dir).log.events;
  assert.ok(ev.some((x) => x.type === "usage" && x.session === f.out.sessions[0] && x.tokens === 30000));
  assert.ok(ev.some((x) => x.type === "session-close" && x.reason === "process failed"));
});

test("order reopen: only the manager or the founder reopens a shipped order, with findings", () => {
  const dir = company();
  const acc = fs.mkdtempSync(path.join(os.tmpdir(), "meta-acc-"));
  fs.writeFileSync(path.join(acc, "P1.test.mjs"), `import { test } from "node:test"; test("ok", () => {});\n`);
  const a = shipPage(dir, "P1", acc);
  assert.notEqual(cli(dir, ["order", "reopen", a.o, "--by=writer-1", "--findings=x"]).code, 0);
  const r = cli(dir, ["order", "reopen", a.o, "--by=editor", "--findings=rename #CYCLE! to #CIRC!"]);
  assert.equal(r.code, 0, r.err);
  assert.equal(r.out.stage, "build");
  assert.equal(queue(dir, "writer-1")[0].order, a.o);
});

test("mail dup: only a manager (or above) resends work, and the resend is recorded", () => {
  const dir = company();
  const o = order(dir, "P1");
  assert.notEqual(cli(dir, ["mail", "dup", o, "--by=reader"]).code, 0);
  assert.equal(cli(dir, ["mail", "dup", o, "--by=editor"]).code, 0);
  assert.ok(state(dir).log.events.some((e) => e.type === "mail-dup" && e.by === "editor"));
});

test("injected drop inside the tick: the message is gone before any launch is planned, and the watchdog sends it again", () => {
  const dir = company();
  const o = order(dir, "P1");
  const f = path.join(dir, "faults.json"); fs.writeFileSync(f, JSON.stringify([{ id: "F3", kind: "drop", task: "P1", stage: "build" }]));
  const t1 = tick(dir, [`--faults=${f}`], { META_WATCHDOG_MIN: "0" });
  assert.ok(t1.steps.some((x) => x.step === "fault" && x.order === o));
  assert.equal(t1.plan.some((p) => p.role === "writer-1"), false, "nothing to launch for: the message is gone");
  tick(dir, [`--faults=${f}`], { META_WATCHDOG_MIN: "0" }); // orphan seen
  const t3 = tick(dir, [`--faults=${f}`], { META_WATCHDOG_MIN: "0" });
  assert.ok(state(dir).log.events.some((e) => e.type === "watchdog-resend" && e.order === o));
  assert.ok(t3.plan.some((p) => p.role === "writer-1"), "the resent message is planned");
  assert.equal(state(dir).log.events.filter((e) => e.type === "fault-injected").length, 1, "a fault fires once");
});

test("an ask from a builder to its manager is planned as the manager's work, with the reopen command in the brief", () => {
  const dir = company();
  const r = cli(dir, ["ask", "raise", "--by=writer-1", "--kind=decision", "--title=SHEET fails: GRAPH misses self-loops", "--why=slot C cycleCells ignores A1=A1; required: a self-reading cell is on a cycle", "--due=2026-10-22"]);
  assert.equal(r.code, 0, r.err);
  const t = tick(dir);
  const p = t.plan.find((x) => x.role === "editor");
  assert.ok(p && p.tasks.some((k) => k.kind === "ask"), JSON.stringify(t.plan));
});

test("a judgment launch that crashed reserves nothing: the meeting's chair is planned again at once", () => {
  const dir = company();
  assert.equal(cli(dir, ["meeting", "open", "--by=editor", "--title=Kickoff", "--room=story-room", "--minutes=30", "--invitees=writer-1", "--agenda=" + JSON.stringify([{ title: "split" }])]).code, 0);
  assert.equal(cli(dir, ["meeting", "position", "--id=MTG-1", "--by=writer-1", "--item=1", "--text=two halves"]).code, 0);
  const plan1 = tick(dir).plan;
  const chair = plan1.find((p) => p.role === "editor");
  assert.ok(chair?.tasks.some((t) => t.kind === "chair"), JSON.stringify(plan1));
  assert.equal(spawnSync("node", [path.join(HERE, "..", "supervisor.mjs"), "launched", "--role=editor", "--tasks=chair:MTG-1"], { env: envOf(dir), encoding: "utf8" }).status, 0);
  assert.equal(tick(dir).plan.some((p) => p.role === "editor"), false, "reserved while it runs");
  assert.equal(cli(dir, ["launch", "finished", "--launch=0001-editor", "--role=editor", "--tokens=40000", "--ok=false", "--reason=killed"]).code, 0);
  assert.ok(tick(dir).plan.some((p) => p.role === "editor" && p.tasks.some((t) => t.kind === "chair")), "planned again after the crash");
});
