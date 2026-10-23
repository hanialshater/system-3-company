import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// B8 restart (2026-10-23: the container was reclaimed twice in an hour; every process died, the files survived): the
// harness reports each launch the dead launcher left unfinished as `launch finished --ok=false`, so its runs are
// abandoned, its leases released and its sessions closed, and serve plans the work again at once. With --intact=true
// (the process died with the machine, not by its own failure) a warm builder's SDK session stays resumable (K26): the
// next item of that order resumes it. Without it, a failed process goes cold, as before. And the launcher writes each
// session's id to its ledger as soon as it is known, so a dead launch leaves it behind.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k26r-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SPEC = {
  name: "shop", title: "a small shop (B8 restart)",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "bench", floor: 2, kind: "lane", lane: "w" }, { id: "review", floor: 3, kind: "quality" }],
  skills: ["manage", "build", "review"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "founder", lane: "w", room: "bench", floor: 2, skills: ["manage"] },
    { id: "maker", level: "builder", reportsTo: "lead", lane: "w", room: "bench", floor: 2, skills: ["build"], warm: true },
    { id: "judge", level: "evaluator", reportsTo: "founder", room: "review", floor: 3, skills: ["review"] },
  ],
  flow: { name: "thing", stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
    { stage: "eval", signer: { role: "judge" }, independent: true, evidence: ["EVAL.md"] },
    { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } },
  ] },
};
const ENV = { ...process.env, META_LIVE_DIR: LIVE };
delete ENV.NODE_TEST_CONTEXT; delete ENV.META_ROLE; delete ENV.META_LAUNCH;
function cli(file, args, env = {}) {
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: { ...ENV, ...env }, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const meta = (...a) => cli("meta.mjs", a);
const as = (role, launch, ...a) => cli("meta.mjs", a, { META_ROLE: role, ...(launch ? { META_LAUNCH: launch } : {}) });
const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };
const tick = () => ok(cli("supervisor.mjs", ["tick"]));
const SDK = "22222222-aaaa-4bbb-8ccc-000000000002";
const launched = (p) => { const L = ok(cli("supervisor.mjs", ["launched", "--role=maker", `--msgs=${p.msgs.join(",")}`, ...(p.resume ? [`--resume=${p.resume}`] : [])])); return `${String(L.seq).padStart(4, "0")}-maker`; };

test("a launch that died with the machine: abandoned and planned again; --intact keeps its warm session, without it the next start is cold", () => {
  const f = path.join(LIVE, "shop.json");
  fs.writeFileSync(f, JSON.stringify(SPEC));
  ok(meta("init", `--spec-file=${f}`));
  const A = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Game A", "--task=GA", "--accept=a game")).order;
  ok(meta("order", "delegate", A, "--by=lead", "--to=maker"));
  let p = tick().plan.find((x) => x.role === "maker");
  // a warm session that finished its build: the revise below resumes it (K26 as before)
  const l1 = launched(p);
  let pk = ok(as("maker", l1, "room", "enter", `--msg=${p.msgs[0]}`, "--role=maker"));
  fs.mkdirSync(path.join(LIVE, "work", "GA"), { recursive: true }); fs.writeFileSync(path.join(LIVE, "work", "GA", "game.mjs"), "v1\n");
  ok(as("maker", l1, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs"));
  ok(meta("launch", "finished", `--launch=${l1}`, "--role=maker", "--tokens=10", `--sdk-session=${SDK}`));
  tick();
  const q = ok(meta("queue", "role:judge")).find((x) => x.order === A);
  const ev = ok(as("judge", null, "room", "enter", `--msg=${q.msg}`, "--role=judge"));
  fs.writeFileSync(path.join(LIVE, "work", "GA", "EVAL.md"), "x\n");
  ok(as("judge", null, "room", "leave", `--run=${ev.run}`, "--evidence=EVAL.md", "--verdict=revise", "--findings=movement: north does nothing"));
  p = tick().plan.find((x) => x.role === "maker");
  assert.equal(p.resume, SDK, "the revise resumes the warm session");
  // the resumed launch enters its run, and the machine restarts: no process reports it, its run and lease stand
  const l2 = launched(p);
  pk = ok(as("maker", l2, "room", "enter", `--msg=${p.msgs[0]}`, "--role=maker"));
  assert.equal(tick().plan.find((x) => x.role === "maker"), undefined, "a running run: nothing is planned while it stands");
  // the harness reports the dead launch: failed, intact
  const fin = ok(meta("launch", "finished", `--launch=${l2}`, "--role=maker", "--tokens=0", "--ok=false", "--intact=true", "--reason=abandoned: the machine restarted", `--sdk-session=${SDK}`));
  assert.deepEqual(fin.abandoned, [pk.run], "its run is abandoned");
  assert.deepEqual(fin.warm, [A]);
  const lf = ok(meta("events", "--type=launch-finished")).at(-1);
  assert.deepEqual([lf.ok, lf.intact, lf.sdk], [false, true, SDK]);
  p = tick().plan.find((x) => x.role === "maker");
  assert.ok(p, "the work is planned again at once (its lease was released)");
  assert.equal(p.resume, SDK, "--intact: the same warm session is resumed");
  // the same, without --intact: a failed process goes cold (K26 as before)
  const l3 = launched(p);
  pk = ok(as("maker", l3, "room", "enter", `--msg=${p.msgs[0]}`, "--role=maker"));
  const fin3 = ok(meta("launch", "finished", `--launch=${l3}`, "--role=maker", "--tokens=0", "--ok=false", "--reason=crashed", `--sdk-session=${SDK}`));
  assert.deepEqual(fin3.abandoned, [pk.run]);
  p = tick().plan.find((x) => x.role === "maker");
  assert.ok(p && !p.resume, "without --intact: the next start is cold");
  // --intact means nothing on a process that ended well
  const l4 = launched(p);
  pk = ok(as("maker", l4, "room", "enter", `--msg=${p.msgs[0]}`, "--role=maker"));
  ok(as("maker", l4, "room", "leave", `--run=${pk.run}`, "--evidence=game.mjs"));
  const fin4 = ok(meta("launch", "finished", `--launch=${l4}`, "--role=maker", "--tokens=0", "--intact=true", `--sdk-session=${SDK}`));
  assert.deepEqual(fin4.abandoned, []);
  assert.equal(ok(meta("events", "--type=launch-finished")).at(-1).intact, undefined);
});

test("the launcher writes each session's id to its ledger as soon as it is known", () => {
  const src = fs.readFileSync(path.join(HERE, "..", "launcher", "launch.mjs"), "utf8");
  assert.match(src, /m\.session_id !== sdk\) \{ sdk = m\.session_id; note\(\{ event: "sdk", launch: id, n: k, role: ev\.role, sdk \}\)/);
});

test("a second launcher on one live dir starts (the kernel link is checked with lstat), and a report refused for the state lock is tried again", () => {
  const src = fs.readFileSync(path.join(HERE, "..", "launcher", "launch.mjs"), "utf8");
  assert.match(src, /fs\.lstatSync\(path\.join\(PROTO, "live"\)\)/);
  assert.doesNotMatch(src, /if \(!fs\.existsSync\(path\.join\(PROTO, "live"\)\)\) fs\.symlinkSync/);
  assert.match(src, /\/state is locked\/\.test\(r\.stderr/);
  // the behaviour itself: a dangling link is "there" for lstat, not for existsSync
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "meta-link-")), l = path.join(d, "live");
  fs.symlinkSync(path.join(d, "nowhere"), l);
  assert.equal(fs.existsSync(l), false);
  assert.doesNotThrow(() => fs.lstatSync(l));
});
