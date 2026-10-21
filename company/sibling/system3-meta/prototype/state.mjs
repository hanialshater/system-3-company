// Shared live state for meta.mjs (the agents' CLI) and supervisor.mjs (the code-only supervisor): the live org, the
// task flow, load/save of the JSON state under an O_EXCL lock, and running a task's tests.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Log, Mailbox, Org, Engine, Rooms, DEFAULT_CONFIG } from "./lib.mjs";
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const LIVE = process.env.META_LIVE_DIR || path.join(HERE, "live");
export const STATE = path.join(LIVE, process.env.META_STATE || "state.json");
export const LOCK = path.join(LIVE, "state.lock");

export const LIVE_ROOMS = [{ id: "lobby", floor: 1 }, { id: "ceo-office", floor: 1 }, { id: "sandbox", floor: 2 }, { id: "quality", floor: 3 }, { id: "launch", floor: 3 }];
export const LIVE_ROLES = [
  { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
  { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
  { id: "mgr-live", level: "manager", reportsTo: "cos", lane: "s", room: "sandbox", floor: 2, skills: ["manage"] },
  { id: "toy-builder-1", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-builder-2", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-checker", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["review"] },
  { id: "toy-release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
];
export const TASK_FLOW = {
  stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "check", signer: "checker", evidence: ["review notes"] },
    { stage: "uat", signer: "orderer", evidence: ["hidden acceptance tests"] },
    { stage: "ship", signer: "release", evidence: ["copied to live/shipped/"] },
  ],
};

export const clock = { now: () => Date.now() / 60000 }; // minutes, to the millisecond (live run 1 used whole minutes: too coarse for agents)

export function make() {
  const config = DEFAULT_CONFIG;
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  const org = new Org({ log, rooms: LIVE_ROOMS, skills: ["manage", "js", "review", "release"], rituals: [] });
  const engine = new Engine({ log, clock, config, mailbox, org });
  const rooms = new Rooms({ log, clock, config, mailbox, engine, org });
  return { log, mailbox, org, engine, rooms };
}

export const rep = (k, v) => (v instanceof Map ? { __map: [...v] } : v instanceof Set ? { __set: [...v] } : v);
export const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);
export const FIELDS = { log: ["events"], mailbox: ["msgs", "keys", "n"], org: ["roles", "changes", "n"], engine: ["flows", "active", "orders", "approvals", "n", "limits", "policies", "contracts"], rooms: ["runs", "n", "memory", "sessions", "nS"] };

export function save(co) {
  const data = Object.fromEntries(Object.entries(FIELDS).map(([o, fs_]) => [o, Object.fromEntries(fs_.map((f) => [f, co[o][f]]))]));
  const tmp = `${STATE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, rep, 1));
  fs.renameSync(tmp, STATE); // atomic replace: a crash mid-write leaves the old state
}
export function load() {
  const co = make();
  const data = JSON.parse(fs.readFileSync(STATE, "utf8"), rev);
  for (const [o, fs_] of Object.entries(FIELDS)) for (const f of fs_) if (data[o][f] !== undefined) co[o][f] = data[o][f];
  co.mailbox.promote(); // due `later` items become `next` on every command: time is checked when anything happens
  return co;
}

export function withLock(fn) {
  fs.mkdirSync(LIVE, { recursive: true });
  const until = Date.now() + 10_000;
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      const age = Date.now() - fs.statSync(LOCK).mtimeMs;
      if (age > 30_000) { fs.rmSync(LOCK, { force: true }); continue; } // a writer died holding it
      if (Date.now() > until) throw new Error("state is locked by another process (10 s)");
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
  try { return fn(); } finally { fs.rmSync(LOCK, { force: true }); }
}

export function runTests(task, { dir = path.join(LIVE, "work", task), label = `live/work/${task}`, files: only = null } = {}) {
  const files = only ?? (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".test.mjs")) : []);
  if (!files.length) return { pass: false, output: `no *.test.mjs in ${label}` };
  // Started from inside a node --test process, the child inherits NODE_TEST_CONTEXT, reports to that parent instead and
  // exits 0 even when its tests fail. Drop it, and judge by the parsed counts as well as the exit code.
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  let text, code = 0;
  try { text = execFileSync(process.execPath, ["--test", ...files], { cwd: dir, encoding: "utf8", stdio: "pipe", timeout: 60_000, env }); }
  catch (e) { text = String(e.stdout || e.message); code = e.status ?? 1; }
  const count = (k) => Number((text.match(new RegExp(`^# ${k} (\\d+)`, "m")) || [])[1] ?? NaN);
  const pass = code === 0 && count("fail") === 0 && count("pass") > 0;
  const output = pass ? text.split("\n").filter((l) => /^# (tests|pass|fail)/.test(l)).join(" ") : text.split("\n").filter((l) => /^not ok|^# (tests|pass|fail)|error:/.test(l)).slice(0, 12).join("\n");
  return { pass, output };
}
