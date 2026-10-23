#!/usr/bin/env node
// Benchmark 8, the harness for both arms: V (vanilla-compiler.mjs: one Agent SDK session for the whole run) and S
// (System 3 Meta running specs/ccompiler-specialized.json: an architect, four module owners, an independent evaluator,
// K29-K33). Both arms get the same toolchain, contract, wave docs, headers, visible tests, hidden runner, feedback
// lines, rounds, access rule and caps (PROTOCOL.md "Fairness"). V uses this file's release, hidden, hook and tally
// helpers; S runs from it.
//
//   node setup.mjs place [--wave=Wn] [--runs=<dir>] [--b8=<dir>] [--budget=<tokens>] [--max-rounds=3]
//        S: W1 makes the run (toolchain copy, shims, the repo with the contract, the frozen harness, `meta.mjs init`);
//        every wave: main fast-forwarded to the last wave's branch, the wave's docs and visible tests committed to main
//        by the orderer, one order founder -> architect; prints the run command
//   node setup.mjs run [--waves=W1..W6] [--max-min=300] [--max-cost=120] [--max-parallel=4] [--poll=5] [--model=<id>] [--dry-run]
//        S: for each wave, place it, run the launcher (Agent SDK) with the observer beside it, the protocol's stops, the
//        architect's retro; --dry-run prints the launcher command and runs one observer pass (no session)
//        --resume (PROTOCOL.md "Restarts"): continue after the machine restarted: the dead run's leftovers killed, its
//        unfinished launches abandoned and planned again (warm sessions resumed by SDK id, K26, or cold, recorded),
//        the broker and the observer started again, the current wave and order continued, the caps on the active
//        clock (_operator/S/clock.json: downtime recorded, never counted); a finished run exits at once.
//        --fake [--fake-sec=2] [--fake-lose-session] (restart tests, a scratch --runs only): bench8/fake-sdk plays
//        every session by the kernel's CLI, so the real launcher, serve, broker, accept and hidden runner run
//   node setup.mjs status [--arm=V|S]                 where each arm stands (started, finished, alive, restarts)
//   node setup.mjs watch [--once]                     the observer alone
//   node setup.mjs accept --arm=S --wave=Wn --dir=<workdir> [--runs] [--b8]   the S order's accept cmd (code runs it)
//   node setup.mjs hook --arm=V|S [--runs] [--b8]     PreToolUse command hook (stdin JSON; exit 2 denies)
//   node setup.mjs tally [--arm=V|S] [--md]           per (arm, wave): first hand-in and final hidden pass rate, rounds,
//                                                     cost, tokens, minutes; W6 score; the per-module knowledge metric
//   node setup.mjs audit [--md]                       fairness: hook coverage, denials, shim calls, canaries, sources
//   node setup.mjs selftest                           the access rule on a fixed list of calls (no session)
//   node setup.mjs box-check --arm=V|S                the arm's box (sandbox.mjs), probed from inside (no session)
//   node setup.mjs broker --arm=S | egress --arm=V|S  the orderer's broker and egress proxy (started by run; root)
//   node setup.mjs preflight --arm=V|S [--runs]       one one-turn Agent SDK session started as the arm's are (tools [])
//   node setup.mjs probe --arm=V|S [--runs]           one tiny session asked to read a hidden file, curl github and gcc a
//                                                     .c: all three must be denied by the access hook and logged
// --isolation=hooks|box (every command; default hooks, or B8_ISOLATION): hooks runs the sessions without the box, as
// Benchmarks 6/7 did, the access hook, the shims and the audit enforcing what the box did (PROTOCOL.md "Isolation
// deviation"); box runs them in sandbox.mjs's box.
//
// Layout (<runs> = <scratchpad>/b8-runs, outside any git checkout with a CLAUDE.md):
//   <runs>/toolchain/          clj-run + jars (a copy of <b8>/toolchain): read-only to both arms
//   <runs>/V/                  V's directory: its own git repo, the compiler at its root (vanilla-compiler.mjs)
//   <runs>/S/work/             S's repo (main: the contract, the released waves, the shipped waves)
//   <runs>/S/wt/<Wn>/          the wave's worktree (K5): the owners' work
//   <runs>/S/live/             META_LIVE_DIR: state.json, the kernel copy, launches.jsonl (read-only to S's tools)
//   <runs>/S/store/            the K33 playbook store, kept across waves (read-only to S's tools)
//   <runs>/S/scratch/          S's scratch space
//   <runs>/S/harness/          a frozen copy of this folder's scripts the S order's code stages run
//   <runs>/_shim/<arm>/bin/    PATH shims: gcc/cc/clang refuse C sources, cpp/tcc/claude/curl/wget refuse
//   <runs>/_operator/          never readable by an arm: access.jsonl, shim.jsonl, hidden results, V's ledger,
//                              S's accept.jsonl, waves.jsonl, operator.jsonl, the integration baseline
// No model identifier lives here: the launcher's own --model default is used unless --model is passed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import net from "node:net";
import { createRequire } from "node:module";
import { boxPaths, boxEnv, boxEnvNames, boxArgv, prepareBox, startEgress, ARM_UID, NODE_DIR, isolationOf, hooksMode, hooksEnv, armEnvFor, armEnvNames, prepareArm } from "./sandbox.mjs";
import { armClock, clockOf, procAlive, readPid, writePid, killLeftovers, bootId } from "./restart.mjs";

const SELF = fileURLToPath(import.meta.url);
const HERE = path.dirname(SELF);
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const REPO_PROTO = "/home/user/system-3-company/company/sibling/system3-meta/prototype";
export const WAVES = ["W1", "W2", "W3", "W4", "W5", "W6"];
export const ARMS = ["V", "S"];
// S2 (PROTOCOL.md "S2"): a fresh second run of the S harness with specs/ccompiler-specialized-v2.json, in its own
// folders (<runs>/S2, _operator/S2), the same hooks, caps and feedback as S and V. paths({arm: "S2"}) gives its
// layout; every S code path below takes the S-like arm from P.sarm.
export const S_ARMS = ["S", "S2", "S9"];
// S9 (bench9/PROTOCOL.md "S"): Benchmark 9's org arm runs on this harness; its pieces are bench9/s9.mjs (loaded only
// when P.sarm is S9), its orders the tasks W8, W9, W10 (B9's rounds 1-3)
export const SPEC_FILES = { S: "ccompiler-specialized.json", S2: "ccompiler-specialized-v2.json", S9: "compiler-speed-s9.json" };
export const isS = (arm) => S_ARMS.includes(arm);
export const ALL_ARMS = ["V", ...S_ARMS];
export const S1_LABEL = "stopped by the founder at W3"; // S1's run (arm S) ended there: the tally compares V, S1 and S2
export const MAX_ROUNDS = 3; // feedback rounds after the first hidden run of a wave, every arm
export const RUN_MIN = 300, RUN_COST = 120; // the caps, every arm: wall clock (min) and cost ($), for the whole run
const DEFAULT_BUDGET = 400_000_000; // cumulative tokens per S order: a runaway cap only (the cost cap is the real one)
const SPEC_FILE = "ccompiler-specialized.json";
const DEFAULT_RUNS = path.join(SCRATCH, "b8-runs");
const HARNESS_FILES = ["setup.mjs", "sandbox.mjs", "visible-check.mjs", "contract.mjs", "restart.mjs", "w7.mjs"];
// W7 (PROTOCOL.md "W7", spec/W7.md): its pieces live in w7.mjs, loaded only on a W7 path (a synchronous require of the
// ES module), so W1-W6 run exactly as before
const w7 = () => createRequire(import.meta.url)("./w7.mjs");
const s9 = () => createRequire(import.meta.url)(fs.existsSync(path.join(HERE, "s9.mjs")) ? "./s9.mjs" : path.join(REPO_PROTO, "bench9", "s9.mjs"));
const isS9 = (P) => P?.sarm === "S9";
export const ALL_WAVES = [...WAVES, "W7"];
export const EFFORT = "high"; // the SDK effort option, the same for both arms (pilot fix: it was inherited from this session's env)
export const TOOLS_OK = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];

export function paths(opt = {}) {
  const b8 = path.resolve(opt.b8 ?? process.env.B8_HOME ?? path.join(SCRATCH, "b8"));
  const runs = path.resolve(opt.runs ?? process.env.B8_RUNS ?? DEFAULT_RUNS);
  const proto = path.resolve(opt.proto ?? (fs.existsSync(path.join(HERE, "..", "meta.mjs")) ? path.join(HERE, "..") : REPO_PROTO));
  const sarm = isS(opt.arm) ? opt.arm : "S"; // V's own calls (and every S1 call) get S's layout, as before
  const op = path.join(runs, "_operator"), S = path.join(runs, sarm);
  return {
    b8, runs, proto, op, sarm, specFile: SPEC_FILES[sarm],
    toolchain: path.join(runs, "toolchain"), clj: path.join(runs, "toolchain", "clj-run"),
    V: path.join(runs, "V"),
    S, sproto: path.join(S, "proto"), repo: path.join(S, "work"), wt: path.join(S, "wt"), live: path.join(S, "live"), store: path.join(S, "store"), scratch: path.join(S, "scratch"), harness: path.join(S, "harness"),
    shim: (arm) => path.join(runs, "_shim", arm, "bin"),
    access: path.join(op, "access.jsonl"), shimLog: path.join(op, "shim.jsonl"),
    vledger: path.join(op, "V", "vanilla.jsonl"),
    results: (arm, wave, k) => path.join(op, arm, "hidden", `${wave}-${k}.json`),
    acceptLog: path.join(op, sarm, "accept.jsonl"), waves: path.join(op, sarm, "waves.jsonl"), operator: path.join(op, sarm, "operator.jsonl"),
    baseline: path.join(S, "integration", "baseline.json"), // in S's box (the integration check runs there); tools may not write it (ro)
    runner: path.join(b8, "run-hidden.mjs"), hidden: path.join(b8, "hidden"),
    spec: path.join(b8, "spec"), visible: path.join(b8, "visible"),
  };
}
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
export const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
export const append = (f, x) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.appendFileSync(f, JSON.stringify({ t: new Date().toISOString(), ...x }) + "\n"); };
const real = (p) => { try { return fs.realpathSync(p); } catch { return p; } };
const waveN = (w) => Number(String(w).replace(/^W/i, ""));
// the orderer's git runs as root on folders an arm's uid owns: safe.directory for that, and chownArm after
const git = (cwd, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-C", cwd, ...a], { encoding: "utf8" });
// hooks mode: no chown (the agents run as root, and git refuses a repo another uid owns)
export const chownArm = (arm, ...dirs) => { if (process.env.B8_NO_CHOWN || hooksMode()) return; for (const d of dirs) if (fs.existsSync(d)) spawnSync("chown", ["-R", `${ARM_UID[arm]}:${ARM_UID[arm]}`, d]); };
const gitOk = (cwd, ...a) => { const r = git(cwd, ...a); if (r.status !== 0) throw new Error(`git ${a.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout.trim(); };

// ---------------------------------------------------------------- what each wave releases (the same files, every arm)
/** The files the orderer releases with wave `w`, as [published path in the arm's dir, source path]: W1 the contract,
 *  the provided headers, the visible-tests README, W1.md and visible/W1; Wn its doc and visible/Wn; W6 its doc and the
 *  benchmark programs with their expected outputs. */
export function releaseFiles(P, w) {
  if (isS9(P)) return s9().releaseFiles(P, w);
  const n = waveN(w), out = [];
  if (n === 7) return w7().releaseFiles(P);
  const dir = (from, to) => { for (const f of fs.readdirSync(from).sort()) { const s = path.join(from, f); if (fs.statSync(s).isFile()) out.push([path.join(to, f), s]); } };
  if (n === 1) { out.push(["spec/CONTRACT.md", path.join(P.spec, "CONTRACT.md")]); dir(path.join(P.spec, "include"), "spec/include"); out.push(["visible/README.md", path.join(P.visible, "README.md")]); }
  out.push([`spec/${w}.md`, path.join(P.spec, `${w}.md`)]);
  if (n <= 5) dir(path.join(P.visible, w), `visible/${w}`);
  else dir(path.join(P.spec, "bench"), "spec/bench");
  return out;
}
/** Copy wave `w`'s files into `dir` (never over an existing file with other content: the orderer's files are fixed). */
export function release(P, w, dir) {
  const files = releaseFiles(P, w), h = crypto.createHash("sha256");
  for (const [to, from] of files) {
    const d = path.join(dir, to), buf = fs.readFileSync(from);
    fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.writeFileSync(d, buf);
    h.update(to + "\0"); h.update(buf); h.update("\0");
  }
  return { files: files.map(([to]) => to), sha: h.digest("hex").slice(0, 16) };
}
/** The toolchain both arms run Clojure with: a copy of <b8>/toolchain, checked against VERSIONS.md's sha256s. */
export function ensureToolchain(P) {
  const lib = path.join(P.toolchain, "lib");
  if (!fs.existsSync(P.clj)) { fs.mkdirSync(P.toolchain, { recursive: true }); fs.cpSync(path.join(P.b8, "toolchain"), P.toolchain, { recursive: true }); }
  const versions = fs.readFileSync(path.join(P.toolchain, "VERSIONS.md"), "utf8");
  for (const f of fs.readdirSync(lib).filter((x) => x.endsWith(".jar"))) {
    const h = crypto.createHash("sha256").update(fs.readFileSync(path.join(lib, f))).digest("hex");
    if (!versions.includes(h)) throw new Error(`toolchain: ${f} sha256 ${h} is not in VERSIONS.md`);
  }
  fs.chmodSync(P.clj, 0o755);
  return { clj: P.clj };
}

// ---------------------------------------------------------------- the hidden runner, as every arm receives it
/** One hidden run at a time across both arms (W6 times programs: two runs at once would disturb each other). */
function withHiddenLock(P, fn) {
  const lock = path.join(P.op, "hidden.lock");
  fs.mkdirSync(P.op, { recursive: true });
  for (let i = 0; ; i++) {
    try { fs.mkdirSync(lock); fs.writeFileSync(path.join(lock, "pid"), `${process.pid} ${bootId() ?? ""}`); break; } catch {}
    // restart safety: a lock left by a process of an earlier boot is free, whatever runs at its pid now
    let pid = null, boot = null; try { [pid, boot] = fs.readFileSync(path.join(lock, "pid"), "utf8").trim().split(" "); pid = Number(pid); } catch {}
    const alive = !!pid && procAlive(pid, { boot: boot || null });
    if (!alive && i > 2) { fs.rmSync(lock, { recursive: true, force: true }); continue; }
    spawnSync("sleep", ["2"]);
  }
  try { return fn(); } finally { fs.rmSync(lock, { recursive: true, force: true }); }
}
/** Run the hidden suite of waves 1..n on `dir`: { pass, fail, total, rate, byWave, categories, failing, lines, w6, gate,
 *  feedback, findings, code }. `feedback` is what V's next turn quotes, `findings` the same lines as the S accept's
 *  `failed: ` lines; both are empty when nothing fails (no round is spent then). W6: the gate against `gate` (the
 *  arm's last W5 results), and the benchmark and score lines go with the feedback when anything fails. */
export function hidden(P, wave, dir, { results = null, gate = null, reps = null } = {}) {
  if (isS9(P)) return withHiddenLock(P, () => s9().hidden(P, dir));
  if (waveN(wave) === 7) return withHiddenLock(P, () => w7().hidden(P, dir, { results, reps }));
  const { NODE_TEST_CONTEXT, B8_HOME, ...env } = process.env;
  const argv = [P.runner, `--wave=${wave}`, `--dir=${dir}`, ...(results ? [`--results=${results}`] : []), ...(gate && fs.existsSync(gate) ? [`--gate=${gate}`] : []), ...(reps ? [`--reps=${reps}`] : [])];
  const r = withHiddenLock(P, () => spawnSync(process.execPath, argv, { encoding: "utf8", env: { ...env, B8_HOME: P.b8 }, timeout: 3 * 3600_000, maxBuffer: 32 << 20 }));
  const out = String(r.stdout ?? "").trim().split("\n"), last = out.pop();
  let j = null; try { j = JSON.parse(last); } catch {}
  if (!j || typeof j.total !== "number") return { error: `runner: exit ${r.status} ${String(r.stderr ?? r.error ?? "").slice(0, 400)}`, code: 3 };
  const categories = j.byCategory ?? {};
  const failing = Object.entries(categories).filter(([, c]) => c.fail).map(([k, c]) => `${k}: ${c.fail} of ${c.total} fail`);
  const gateLine = j.gate && !j.gate.pass ? `regression-gate: ${j.gate.regressions} test(s) that passed at your W5 hand-in fail now (${Object.entries(j.gate.byWave).map(([k, v]) => `${k} ${v}`).join(", ")})` : null;
  const w6 = j.bench ? { score: j.bench.score, programs: j.bench.programs } : null;
  const w6Lines = out.filter((l) => /^W6 /.test(l));
  const benchFail = !!w6 && Object.values(w6.programs).some((b) => !b.ok);
  const fail = failing.length > 0 || !!gateLine || benchFail;
  const feedback = fail ? [...failing, ...(gateLine ? [gateLine] : []), ...w6Lines] : [];
  return { wave, pass: j.pass, fail: j.total - j.pass, total: j.total, rate: j.total ? j.pass / j.total : 0, byWave: j.byWave, categories, failing, gate: j.gate, w6, w6Lines, failStages: j.failStages, cheat: j.cheat, seconds: j.seconds, anyFail: fail, feedback, findings: feedback.map((l) => `failed: ${l}`), results, code: fail ? 1 : 0 };
}
/** The arm's last W5 hidden results file (W6's regression gate), or null. */
export function lastResults(P, arm, wave) {
  const d = path.join(P.op, arm, "hidden");
  let fs_ = []; try { fs_ = fs.readdirSync(d).filter((f) => f.startsWith(`${wave}-`)).sort((a, b) => Number(a.split("-")[1].split(".")[0]) - Number(b.split("-")[1].split(".")[0])); } catch {}
  return fs_.length ? path.join(d, fs_.at(-1)) : null;
}
export const nextResults = (P, arm, wave) => { const last = lastResults(P, arm, wave); return P.results(arm, wave, last ? Number(path.basename(last).split("-")[1].split(".")[0]) + 1 : 1); };

// ---------------------------------------------------------------- the access rule (the same for every arm)
// From Benchmark 7 v3 (bench7/setup.mjs): every path a call can reach is resolved (Bash words against the directory the
// line is in, each cd followed; symlinks by their real path; Glob/Grep by their root). An arm's own directories are
// open, its read-only ones readable, and around them the benchmark's area is closed (the scratchpad holding b8/ and the
// runs, the other arm, _operator, the repo and its home folder, other sessions' transcripts, /proc). Benchmark 8 adds
// three rules on Bash: no C compiler or preprocessor on C sources (gcc/cc/clang only assemble or link: CONTRACT.md
// rule 2), no network fetch (rule 3; the upstream suites are public), and no nested `claude` session. Code an agent
// writes and runs is out of the hook's reach: the PATH shims, the hidden runner's sandbox and the audit are the backstops.
const REPO_ROOT = path.resolve(REPO_PROTO, "..", "..", "..", "..");
const enc = (p) => p.replace(/[^a-zA-Z0-9]/g, "-");
const cfgDirs = () => [...new Set([process.env.CLAUDE_CONFIG_DIR, path.join(os.homedir(), ".claude")].filter(Boolean).map((d) => path.resolve(d)))];
export const claudeTmpRoots = (P) => [...new Set([path.join("/tmp", `claude-${typeof process.getuid === "function" ? process.getuid() : 0}`), ...[P.b8, P.runs].map((p) => (p.match(/^(\/tmp\/claude-[^/]+)\//) ?? [])[1]).filter(Boolean)])];
/** {own (read-write), ro (readable, never written by a tool), deny, cfg, tmp} for arm V or S. */
export function accessRules(P, arm) {
  const B = boxPaths(P, arm), hooks = hooksMode();
  // hooks mode: the CLI keeps this process's HOME (its transcripts go to ~/.claude/projects, closed but for the arm's
  // own project folders); the arm's TMPDIR is its own
  const priv = hooks ? [B.tmp] : [B.home, B.tmp];
  const own = arm === "V" ? [P.V, ...priv] : [P.wt, P.scratch, ...priv];
  const ro = arm === "V" ? [P.toolchain] : [P.toolchain, P.live, P.repo, P.store, path.dirname(P.baseline), path.join(P.S, "proto"), P.harness];
  const scratch = path.dirname(P.runs);
  const deny = [P.b8, P.runs, P.op, path.join(P.proto, "bench8"), path.join(REPO_PROTO, "bench8"), REPO_ROOT, ...cfgDirs(), ...claudeTmpRoots(P), "/proc"];
  if (scratch !== "/" && scratch !== os.homedir()) deny.push(scratch, path.dirname(scratch));
  if (path.dirname(REPO_ROOT) !== "/") deny.push(path.dirname(REPO_ROOT));
  const both = (l) => [...new Set(l.flatMap((r) => [r, real(r)]))];
  return { arm, isolation: hooks ? "hooks" : "box", home: hooks ? os.homedir() : B.home, own: both([...own, ...ro]), rw: both(own), ro: both(ro), deny: both(deny), cfg: cfgDirs(), tmp: claudeTmpRoots(P) };
}
const DENY_WORDS = /run-hidden|hidden\/(tests|bench|manifest|upstream|validation)|b8\/hidden|build-report\.json|\/\.tmp\/run-/;
const PROCESS_LIST = /(^|[\s;&|(`])(ps|pgrep|pstree|top|htop|lsof|fuser)(\s|$)/;
const WRITE_LINE = /(^|[\s;&|(`])(tee|cp|mv|rm|rmdir|truncate|ln|chmod|chown|touch|dd|install|rsync|unlink|shred|patch)(\s|$)|\bsed\b[^|;&]*\s-[a-zA-Z]*i|\bperl\b[^|;&]*\s-[a-zA-Z]*i|(^|[\s;&|(`])(node|python3?|ruby|perl|deno|bun)\s[^|;&]*(-e|-c|--eval|-p)\b/;
const RECURSIVE = /(^|[\s;&|(])(find|grep|egrep|fgrep|rg|ag|fd|locate|tree|du|rsync|tar|zip|scp)(\s|$)|\bls\s+-[a-zA-Z]*R|\bcp\s+-[a-zA-Z]*[rRa]|\bgrep\s+-[a-zA-Z]*[rR]/;
const inside = (p, r) => p === r || p.startsWith(r.endsWith("/") ? r : r + "/");
const realish = (p) => { let head = path.resolve(p), tail = []; while (!fs.existsSync(head) && path.dirname(head) !== head) { tail.unshift(path.basename(head)); head = path.dirname(head); } return path.join(real(head), ...tail); };
function closed(abs, R) {
  const ra = realish(abs);
  const ownIn = (root, p) => { const rel = path.relative(root, p); if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false; const name = rel.split(path.sep)[0]; return R.rw.some((o) => name === enc(o) || name.startsWith(enc(o) + "-")); };
  const ownCfg = (p) => R.cfg.some((c) => ownIn(path.join(c, "projects"), p));
  const ownTmp = (p) => (R.tmp ?? []).some((t) => ownIn(t, p));
  const open = (p) => R.own.some((o) => inside(p, o)) || ownCfg(p) || ownTmp(p);
  if (open(abs) && open(ra)) return null;
  if (R.deny.some((d) => inside(abs, d) || inside(ra, d))) return "a path outside your own directory, in the benchmark's area";
  // default-deny (pilot fix: /tmp held the operator's debug log and other sessions' fixtures): besides the arm's own and
  // read-only folders, only the system folders are open, and a path that does not exist (its nearest existing folder is
  // / or /tmp: in the box, /tmp is the arm's private tmpfs)
  if (SYSTEM_OPEN.some((s) => inside(abs, s) && inside(ra, s))) return null;
  const anc = nearestExisting(abs);
  if (anc === "/" || anc === "/tmp") return null;
  return "a path outside your own folders (open: your folders, the read-only folders you were given, /usr /etc /bin /lib /dev, and new files under /tmp)";
}
const SYSTEM_OPEN = ["/usr", "/bin", "/sbin", "/lib", "/lib32", "/lib64", "/libx32", "/etc", "/dev", NODE_DIR, "/proc/self", "/proc/cpuinfo", "/proc/meminfo"].map((d) => real(d));
const nearestExisting = (p) => { let h = path.resolve(p); while (!fs.existsSync(h) && path.dirname(h) !== h) h = path.dirname(h); return h; };
const readOnly = (abs, R) => { const ra = realish(abs); return R.ro.some((r) => inside(abs, r) || inside(ra, r)); };
const RO_TEXT = "a read-only folder of the run (the toolchain, the kernel's live dir, the repo's main checkout, the playbook store): only your worktree and scratch are yours to change";
const above = (abs, R) => { const ra = realish(abs); return R.deny.some((d) => (inside(d, abs) || inside(d, ra)) && !R.own.some((o) => inside(o, d))); };
/** The paths one Bash line can reach (bench7's bashReach). */
export function bashReach(cmd, cwd, home = os.homedir()) {
  const out = { paths: [], unresolved: [], recursive: RECURSIVE.test(cmd) };
  const toks = String(cmd).split(/[\s'"=;|&()<>,{}\[\]]+/).filter(Boolean);
  let cur = cwd;
  const res = (t) => path.resolve(cur, t.replace(/^~(?=\/|$)/, home));
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (/[$`]/.test(t)) { if (/[/.~]/.test(t.replace(/^\$\w+$/, "")) || /\$\(|`|\$\{|\$(?:HOME|PWD|OLDPWD|TMPDIR)\b/.test(t)) out.unresolved.push(t); continue; }
    if (t === "cd" || t === "pushd") {
      const n = toks[i + 1];
      if (n == null || n.startsWith("-") || /[$`]/.test(n)) { if (n != null && /[$`]/.test(n)) out.unresolved.push(n); cur = n == null ? home : null; if (cur == null) out.unresolved.push(`${t} ${n ?? ""}`.trim()); i++; continue; }
      if (cur == null) { out.unresolved.push(`${t} ${n}`); i++; continue; }
      cur = res(n); out.paths.push(cur); i++; continue;
    }
    if (t === "popd") { cur = null; out.unresolved.push(t); continue; }
    if (t.startsWith("-") || /^[a-z][a-z0-9+.-]*:\/\//i.test(t)) continue;
    if (cur == null) { if (/[/~]|^\.\.?$/.test(t)) out.unresolved.push(t); continue; }
    const base = t.split(/[*?]/)[0];
    out.paths.push(res(base === t ? t : (base.endsWith("/") ? base : path.dirname(base)) || "."));
  }
  if (out.recursive && cur) out.paths.push(cur);
  return out;
}

// ---- B8's Bash rules: compilers, the network, nested sessions
const COMPILER = /^(gcc|g\+\+|cc|c\+\+|c89|c99|c11|clang|clang\+\+|clang-cl|cpp|tcc|chibicc|cc1|cc1plus|cproc|lcc|pcc|mcpp|ucpp|zig|ecc|x86_64-(?:pc-|unknown-)?linux-gnu-(?:gcc|g\+\+|cpp|cc)(?:-\d+(?:\.\d+)*)?|(?:gcc|g\+\+|cpp|clang|clang\+\+|cc)-\d+(?:\.\d+)*)$/;
const ALWAYS_NO = /^(cpp|tcc|chibicc|cc1|cc1plus|mcpp|ucpp|cproc|lcc|pcc|clang-cl)$|-cpp(-\d+)?$/; // a preprocessor or another C compiler: any use
const C_SOURCE = /\.(c|h|i|ii|cc|cp|cxx|cpp|c\+\+|C|S|sx|m|mi)$/;
const VALUE_OPTS = new Set(["-o", "-I", "-L", "-l", "-D", "-U", "-MF", "-MT", "-MQ", "-T", "-Xlinker", "-Xassembler", "-z", "-B", "--sysroot", "-iquote", "-isystem", "-idirafter", "-wrapper"]);
const NET = /^(curl|wget|nc|ncat|netcat|socat|ssh|scp|sftp|ftp|telnet|aria2c|lynx|w3m|links|elinks|http|https|httpie|xh|apt|apt-get|aptitude|dnf|yum|apk|snap|brew|pip|pip3|pipx|conda|uv|gem|cargo|go|npm|npx|pnpm|yarn|bunx|mvn|gradle|lein|clojure|clj|sdk|coursier|cs)$/;
const WRAP = new Set(["sudo", "env", "command", "exec", "builtin", "time", "nice", "nohup", "xargs", "timeout", "stdbuf", "ionice", "setsid", "unshare", "strace", "ltrace", "chrt", "taskset", "nsenter", "firejail", "flock"]);
const SHELLS = new Set(["sh", "bash", "dash", "zsh", "ksh", "busybox", "fish"]);
const bareName = (w) => path.basename(String(w));
/** Skip the leading VAR=value words and wrapper commands (env, timeout 10, xargs -n1 …) of one simple command. */
function headIndex(words) {
  let i = 0;
  for (;;) {
    while (i < words.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[i])) i++;
    const w = bareName(words[i] ?? "");
    if (!WRAP.has(w)) return i;
    i++;
    if (w === "timeout") { while (i < words.length && words[i].startsWith("-")) i++; i++; }
    else if (w === "flock") { while (i < words.length && words[i].startsWith("-")) i++; i++; }
    else while (i < words.length && words[i].startsWith("-")) { if (["-n", "-I", "-P", "-L", "-s", "-d", "-a", "-u", "-c", "-p", "-o", "-e", "-i"].includes(words[i]) && !/^-[a-zA-Z]$/.test(words[i + 1] ?? "")) i++; i++; }
  }
}
/** Why one compiler command (words from its program on) is denied, or null (an assemble or link of .s/.o files). */
export function compilerUse(words) {
  const prog = bareName(words[0]);
  if (ALWAYS_NO.test(prog)) return `${prog}: a C preprocessor or another C compiler (CONTRACT.md rules 1-2)`;
  if (prog === "zig" && !["cc", "c++", "build-exe", "build-obj", "run", "translate-c"].includes(words[1])) return null;
  const args = words.slice(prog === "zig" ? 2 : 1);
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (/[$`]/.test(a)) return `${prog} with an argument the hook cannot read (${a.slice(0, 40)}): spell the files out`;
    // pilot fix: `gcc @args.rsp` and `gcc --language=c x.txt` compiled C past both the hook and the shim
    if (a.startsWith("@")) return `${prog} ${a.slice(0, 40)}: a response file the hook cannot read (spell the arguments out)`;
    if (a === "--language" || a.startsWith("--language=")) { const l = a === "--language" ? args[++i] : a.slice(11); if (!["assembler", "none"].includes(l)) return `${prog} --language ${l}: compiling C (CONTRACT.md rule 2)`; continue; }
    if (a === "-E" || a === "-fsyntax-only" || a === "-" || a === "-M" || a === "-MM" || /^-fpreprocessed$/.test(a)) return `${prog} ${a}: preprocessing or compiling C (CONTRACT.md rule 2)`;
    if (a === "-x" || a.startsWith("-x")) { const l = a === "-x" ? args[++i] : a.slice(2); if (l && !["assembler", "none", "assembler-with-cpp"].includes(l)) return `${prog} -x ${l}: compiling C (CONTRACT.md rule 2)`; if (l === "assembler-with-cpp") return `${prog} -x assembler-with-cpp: runs the C preprocessor`; continue; }
    if (a === "-include" || a === "-imacros") return `${prog} ${a}: runs the C preprocessor`;
    if (VALUE_OPTS.has(a)) { i++; continue; }
    if (a.startsWith("-")) continue;
    if (C_SOURCE.test(a)) return `${prog} ${a}: compiling C with ${prog} (CONTRACT.md rule 2: gcc only assembles and links your compiler's .s)`;
  }
  return null;
}
/** Why Bash line `c` breaks a B8 rule (compiler, network, nested session), or null. Reads `bash -c` strings, $(…),
 *  eval, and a script file the line runs (sh x.sh, ./x.sh, make) when it is in the arm's own folders. */
export function b8BashDenial(c, { cwd = process.cwd(), R = null, depth = 0, guard } = {}) {
  if (depth > 4) return null;
  const text = String(c ?? "");
  if (/@anthropic-ai\/claude|claude-agent-sdk|claude-code/i.test(text)) return "a nested Claude session (claude-code / the Agent SDK): one session is the arm";
  if (/\/dev\/(tcp|udp)\//.test(text)) return "a network connection (/dev/tcp)";
  let parsed; try { parsed = guard.shellCommands(text); } catch { return "a Bash line the hook cannot parse"; }
  const { cmds, subs } = parsed;
  const sub = (s) => b8BashDenial(s, { cwd, R, depth: depth + 1, guard });
  for (const words0 of cmds) {
    const words = words0.slice(headIndex(words0));
    if (!words.length) continue;
    const prog = bareName(words[0]);
    if (/^claude(\.exe)?$/.test(prog) || /(^|\/)claude$/.test(words[0])) return "a nested `claude` session: one session is the arm";
    if (COMPILER.test(prog)) { const d = compilerUse(words); if (d) return d; }
    if (NET.test(prog)) return `${prog}: a network fetch or package install (CONTRACT.md rule 3: no downloads)`;
    if (prog === "git" && words.slice(1).some((w) => ["clone", "fetch", "pull", "ls-remote", "submodule", "remote", "archive", "send-email", "request-pull", "svn", "p4"].includes(w))) return "git with a remote: no downloads (CONTRACT.md rule 3)";
    if (/^python[0-9.]*$/.test(prog)) { const k = words.findIndex((w) => w === "-m" || /^-m\S/.test(w)); const mod = k < 0 ? null : words[k] === "-m" ? words[k + 1] : words[k].slice(2); if (mod && /^(pip|pip3|ensurepip|venv|virtualenv|http\.server|urllib|ftplib|smtplib|telnetlib|httpx|requests|wget|uv)(\.|$)/.test(mod)) return `${prog} -m ${mod}: a network fetch or package install (CONTRACT.md rule 3: no downloads)`; }
    if (words.some((w) => /^[a-z][a-z0-9+.-]*:\/\/[^/\s]+/i.test(w) && !/^file:\/\//i.test(w))) return "a URL: no network (CONTRACT.md rule 3)";
    if (SHELLS.has(prog)) {
      const k = words.indexOf("-c");
      if (k > 0 && words[k + 1] != null) { const d = sub(words[k + 1]); if (d) return d; continue; }
      const f = words.slice(1).find((w) => !w.startsWith("-"));
      if (f) { const d = scriptDenial(path.resolve(cwd, f), { cwd, R, depth, guard }); if (d) return d; }
      continue;
    }
    if (prog === "eval" || prog === "source" || prog === ".") { const d = prog === "eval" ? sub(words.slice(1).join(" ")) : scriptDenial(path.resolve(cwd, words[1] ?? ""), { cwd, R, depth, guard }); if (d) return d; continue; }
    if (prog === "make" || prog === "gmake") { for (const m of ["GNUmakefile", "makefile", "Makefile"]) { const d = scriptDenial(path.resolve(cwd, m), { cwd, R, depth, guard, make: true }); if (d) return d; } continue; }
    if (words[0].includes("/")) { const d = scriptDenial(path.resolve(cwd, words[0]), { cwd, R, depth, guard }); if (d) return d; }
  }
  for (const s of subs) { const d = sub(s); if (d) return d; }
  return null;
}
/** A script file the line runs, judged line by line (only a text file in the arm's own folders, under 256 KB). */
function scriptDenial(f, { cwd, R, depth, guard, make = false }) {
  let st; try { st = fs.statSync(f); } catch { return null; }
  if (!st.isFile() || st.size > 256 << 10) return null;
  if (R && !R.rw.some((o) => inside(realish(f), o) || inside(f, o))) return null;
  let t; try { t = fs.readFileSync(f, "utf8"); } catch { return null; }
  if (t.includes("\0")) return null;
  const lines = make ? t.split("\n").filter((l) => l.startsWith("\t")).map((l) => l.slice(1).replace(/^[@+-]+/, "")) : [t];
  for (const l of lines) { const d = b8BashDenial(l, { cwd, R, depth: depth + 1, guard }); if (d) return `${path.basename(f)}: ${d}`; }
  return null;
}
const WRITERS = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
let GUARD = null;
async function guardMod(P) { GUARD ??= await import(path.join(P.proto, "launcher", "guard.mjs")); return GUARD; }
/** {deny, why} for one tool call of arm R.arm. */
export function accessDecision({ tool, input = {}, cwd = process.cwd() }, R, guard) {
  // pilot fix: an allowlist, not a denylist (an MCP tool or Skill passed the old rule)
  if (!TOOLS_OK.includes(tool)) return { deny: true, why: `${tool}: not one of the arm's tools (${TOOLS_OK.join(", ")})` };
  const text = WRITERS.includes(tool) ? "" : JSON.stringify(input ?? {});
  if (DENY_WORDS.test(text)) return { deny: true, why: "names a hidden-test file" };
  const home = R.home ?? os.homedir();
  const at = (f) => path.resolve(cwd, String(f).replace(/^~(?=\/|$)/, home));
  for (const k of ["file_path", "path", "notebook_path"]) {
    const f = input?.[k]; if (typeof f !== "string" || !f) continue;
    const why = closed(at(f), R); if (why) return { deny: true, why };
    if (WRITERS.includes(tool) && readOnly(at(f), R)) return { deny: true, why: RO_TEXT };
  }
  if (tool === "Glob" || tool === "Grep") {
    const root = at(typeof input?.path === "string" && input.path ? input.path : ".");
    const pat = typeof input?.pattern === "string" ? input.pattern : "";
    const base = tool === "Glob" && pat ? path.resolve(root, pat.split(/[*?[{]/)[0].replace(/[^/]*$/, "") || ".") : root;
    for (const b of [root, base]) { const why = closed(b, R); if (why) return { deny: true, why }; if (above(b, R)) return { deny: true, why: "a search over a folder that holds the benchmark's area" }; }
    if (tool === "Grep" && typeof input?.glob === "string" && /(^|\/)\.\.(\/|$)|^\//.test(input.glob)) return { deny: true, why: "a search glob that leaves your directory" };
  }
  if (tool === "Bash" && typeof input?.command === "string") {
    const cmd = input.command;
    if (PROCESS_LIST.test(cmd)) return { deny: true, why: "a process listing (the harness's processes are not yours to inspect)" };
    const d8 = b8BashDenial(cmd, { cwd, R, guard });
    if (d8) return { deny: true, why: d8, rule: "b8" };
    const b = bashReach(cmd, cwd || process.cwd(), home);
    const bare = cmd.replace(/'[^']*'|"(?:[^"\\]|\\.)*"/g, "''");
    if (WRITE_LINE.test(bare) && b.paths.some((p) => readOnly(p, R))) return { deny: true, why: RO_TEXT };
    for (const m of bare.matchAll(/(?:^|[^0-9&<>])>{1,2}(?!&)\s*([^\s;&|()<>]+)/g)) { const t = bashReach(`${bare.slice(0, m.index)} ${m[1]}`, cwd || process.cwd(), home).paths.at(-1); if (t && readOnly(t, R)) return { deny: true, why: RO_TEXT }; }
    if (b.unresolved.length) return { deny: true, why: `a path the hook cannot resolve (${b.unresolved[0].slice(0, 60)}): spell paths out, inside your own directory` };
    for (const p of b.paths) { const why = closed(p, R); if (why) return { deny: true, why }; if (b.recursive && above(p, R)) return { deny: true, why: "a recursive command over a folder that holds the benchmark's area" }; }
  }
  return { deny: false };
}
export const DENY_TEXT = (why) => `Benchmark harness: ${why}. Work in your own directory with paths spelled out; gcc only assembles and links your compiler's .s files; no network.`;
export function accessNote(P, { arm, sid, role = null, launch = null, tool, input, cwd, d, via = "hook" }) {
  const what = input?.command ?? input?.file_path ?? input?.path ?? input?.pattern ?? input?.notebook_path ?? "";
  append(P.access, { arm, sid: sid ?? null, role, launch, via, tool, cwd, what: String(what).slice(0, 300), deny: d.deny, ...(d.deny ? { why: d.why } : {}) });
}
/** The in-process PreToolUse hook (V's; S's runs as `setup.mjs hook`, the launcher's --pretool-hook). */
export async function makeHook(P, arm, { sid = () => null, cwd: cwd0 } = {}) {
  const R = accessRules(P, arm), guard = await guardMod(P);
  return async (input) => {
    if (input?.hook_event_name && input.hook_event_name !== "PreToolUse") return {};
    const cwd = input?.cwd || cwd0;
    const d = accessDecision({ tool: input?.tool_name, input: input?.tool_input, cwd }, R, guard);
    try { accessNote(P, { arm, sid: input?.session_id ?? sid(), tool: input?.tool_name, input: input?.tool_input, cwd, d }); } catch {}
    return d.deny ? { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: DENY_TEXT(d.why) } } : {};
  };
}
/** V's SDK canUseTool: the same access rule as the hook, logged with via "canUseTool" (S's canUseTool is the kernel
 *  guard's; the hook above is the access rule both arms share). */
export async function makeCanUse(P, arm, { sid = () => null, cwd: cwd0 } = {}) {
  const R = accessRules(P, arm), guard = await guardMod(P);
  return async (tool, input, o = {}) => {
    const d = accessDecision({ tool, input, cwd: cwd0 }, R, guard);
    try { accessNote(P, { arm, sid: sid(), tool, input, cwd: cwd0, d, via: "canUseTool" }); } catch {}
    return d.deny ? { behavior: "deny", message: DENY_TEXT(d.why) } : { behavior: "allow", updatedInput: input };
  };
}
/** V's query() options (the turn's, the preflight's and the probe's): the six tools (or `tools`), settingSources [],
 *  the access rule as the PreToolUse hook and as canUseTool (permissionMode "default" with Bash and the write tools
 *  out of allowedTools, as the launcher's queryOptions does, so canUseTool is asked); in box mode the CLI is started in
 *  V's box (spawnClaudeCodeProcess), in hooks mode the SDK starts it as usual. */
export async function vOptions(P, { cwd, model, effort = EFFORT, abortController, tools = TOOLS_OK, maxTurns, sid = () => null, resume = null, stderrLog = null }) {
  const hook = await makeHook(P, "V", { sid, cwd }), canUseTool = await makeCanUse(P, "V", { sid, cwd });
  const box = hooksMode() ? {} : { spawnClaudeCodeProcess: (await import("./sandbox.mjs")).spawnFor(P, "V", { stderrLog }) };
  return { cwd, model, effort, abortController, env: armEnvFor(P, "V"), settingSources: [], tools, allowedTools: tools.filter((t) => !["Bash", "Write", "Edit", "MultiEdit", "NotebookEdit"].includes(t)), permissionMode: "default", permissionPrompts: "host", canUseTool, maxTurns, hooks: { PreToolUse: [{ hooks: [hook] }] }, ...box, ...(resume ? { resume } : {}) };
}

// ---- the PATH shims (the backstop for code an agent runs: a script, a Clojure shell-out, a Makefile)
/** <runs>/_shim/<arm>/bin: gcc, cc, clang (and their spellings) pass through to /usr/bin only for assembling and
 *  linking (no C source, no -E, no -x c); cpp, tcc, chibicc, cc1, claude, curl and wget always refuse. Every call is
 *  logged to _operator/shim.jsonl. The env of every arm's session puts this folder first on PATH. */
export function installShims(P, arm) {
  const dir = P.shim(arm); fs.mkdirSync(dir, { recursive: true });
  const log = P.shimLog.replace(/'/g, ""); // outside a box; in a box B8_SHIM_LOG (the box's own log folder)
  const pass = ["gcc", "cc", "clang", "c99", "c89", "g++", "c++", "clang++", "x86_64-linux-gnu-gcc", "gcc-13", "clang-18"];
  const never = ["cpp", "tcc", "chibicc", "cc1", "claude", "curl", "wget", "x86_64-linux-gnu-cpp", "cpp-13", "nc", "ncat", "netcat", "socat", "ssh", "scp", "sftp", "pip", "pip3", "npm", "npx", "uv"];
  const head = (name) => `#!/bin/sh
# Benchmark 8 shim (${arm}): ${name}
log() { printf '{"t":"%s","arm":"${arm}","prog":"${name}","deny":%s,"args":"%s"}\\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$1" "$(printf '%s ' "$ARGS" | tr -d '"\\\\' | cut -c1-300)" >> "\${B8_SHIM_LOG:-${log}}" 2>/dev/null; }
ARGS="$*"
`;
  for (const n of never) fs.writeFileSync(path.join(dir, n), head(n) + `log true\necho "Benchmark harness: ${n} is not available in this benchmark (CONTRACT.md rules 1-3)" >&2\nexit 1\n`, { mode: 0o755 });
  for (const n of pass) {
    const realBin = ["/usr/bin/" + n, "/usr/local/bin/" + n].find((f) => fs.existsSync(f)) ?? "/usr/bin/gcc";
    fs.writeFileSync(path.join(dir, n), head(n) + `prev=""
for a in "$@"; do
  case "$prev" in -o|-L|-l|-I|-D|-U|-MF|-MT|-T|-Xlinker|-Xassembler|-z) prev=""; continue;; -x|--language) case "$a" in assembler|none) ;; *) log true; echo "Benchmark harness: ${n} -x $a compiles C: gcc only assembles and links your compiler's .s (CONTRACT.md rule 2)" >&2; exit 1;; esac; prev=""; continue;; esac
  case "$a" in
    @*|--language=*) case "$a" in --language=assembler|--language=none) ;; *) log true; echo "Benchmark harness: ${n} $a: response files and --language are not allowed (CONTRACT.md rule 2)" >&2; exit 1;; esac;;
    -E|-fsyntax-only|-|-M|-MM|-include|-imacros|-xc|-xc++|-xassembler-with-cpp|*.c|*.h|*.i|*.ii|*.cc|*.cpp|*.cxx|*.C|*.S|*.sx) log true; echo "Benchmark harness: ${n} $a: compiling or preprocessing C is not allowed; gcc only assembles and links your compiler's .s (CONTRACT.md rule 2)" >&2; exit 1;;
  esac
  prev="$a"
done
log false
exec ${realBin} "$@"
`, { mode: 0o755 });
  }
  return dir;
}
/** An arm's session env: in box mode an allowlist (sandbox.mjs boxEnv); in hooks mode this process's env minus the
 *  launcher's and the context variables (sandbox.mjs hooksEnv). */
export const armEnv = (P, arm, extra = {}) => armEnvFor(P, arm, extra);

// ---------------------------------------------------------------- S: place a wave
const metaEnv = (P) => { const env = { ...process.env, META_LIVE_DIR: P.live }; for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT", "META_STATE"]) delete env[x]; return env; };
// the orderer's kernel calls (root): S's frozen kernel copy when the run has one; the live dir goes back to S's uid after
const kernelDir = (P) => (fs.existsSync(path.join(P.sproto, "meta.mjs")) ? P.sproto : P.proto);
export const metaCli = (P, ...a) => { let r; for (let i = 0; i < 6; i++) { r = spawnSync(process.execPath, [path.join(kernelDir(P), "meta.mjs"), ...a], { env: metaEnv(P), encoding: "utf8" }); if (r.status === 0 || !/state is locked/.test(r.stderr ?? "")) break; spawnSync("sleep", ["5"]); } /* a tick holding the lock: try again */ if (fs.existsSync(path.join(P.sproto, "meta.mjs"))) chownArm("S", P.live, P.store); if (r.status !== 0) throw new Error(`meta.mjs ${a.slice(0, 2).join(" ")}: ${(r.stderr || r.stdout).slice(0, 600)}`); try { return JSON.parse(r.stdout); } catch { return r.stdout; } };
/** S's frozen copy of the kernel and the launcher (with its node_modules: the SDK), the only Meta code S's box sees. */
export function freezeKernel(P) {
  fs.mkdirSync(P.sproto, { recursive: true });
  for (const f of fs.readdirSync(P.proto).filter((f) => f.endsWith(".mjs") || f === "escapes.json")) fs.copyFileSync(path.join(P.proto, f), path.join(P.sproto, f));
  for (const d of ["specs", "launcher"]) { const r = spawnSync("cp", ["-a", path.join(P.proto, d), P.sproto]); if (r.status !== 0) throw new Error(`freeze ${d}: ${r.stderr}`); }
  return P.sproto;
}
export function readState(live) {
  for (let i = 0; i < 5; i++) { try { return JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8")); } catch { spawnSync("sleep", ["0.2"]); } }
  return null;
}
const mapVals = (m) => (m?.__map ?? []).map(([, v]) => v);
export const orderOf = (st, wave) => mapVals(st?.engine?.orders).filter((o) => o.task === wave).at(-1) ?? null;
const TERMINAL = ["done", "cancelled"];
/** The spec, with the default runs root replaced by this run's (the committed spec names the default layout). */
export function instantiateSpec(P) {
  let t = fs.readFileSync(path.join(P.proto, "specs", P.specFile ?? SPEC_FILE), "utf8");
  if (P.runs !== DEFAULT_RUNS) t = t.split(DEFAULT_RUNS).join(P.runs);
  if (P.b8 !== path.join(SCRATCH, "b8")) t = t.split(path.join(SCRATCH, "b8")).join(P.b8);
  return JSON.parse(t);
}
export const waveAccept = (w) => waveN(w) === 7 ? w7().WAVE_ACCEPT : `Wave ${w} of the C-subset compiler (in Clojure, x86-64 GNU as). Read spec/CONTRACT.md (what never changes) and spec/${w}.md (this wave's exact scope) in the order's worktree; ${waveN(w) <= 5 ? `visible/${w}/ holds about a quarter of this wave's tests with their expected outputs` : "spec/bench/ holds the 8 benchmark programs with their expected outputs"}. The integration check after each hand-in runs the visible tests of waves 1..${Math.min(waveN(w), 5)}${waveN(w) === 6 ? " and the benchmarks" : ""}: a visible test that passed at the last passing check and fails now is a regression, routed back. After the evaluation, code runs the orderer's hidden runner on the worktree: it scores the hidden tests of waves 1..${Math.min(waveN(w), 5)}${waveN(w) === 6 ? ", times the hidden benchmark variants against gcc -O0 and applies the regression gate" : ""}, and a failure comes back as a revise naming only the failing categories, one line each: \`W3 structs: 12 of 40 fail\`. Three such feedback rounds at most; then the wave ends with what is there.`;

function sPlace(P, opt) {
  const w = String(opt.wave ?? "W1").toUpperCase();
  if (isS9(P) ? !s9().S9_WAVES.includes(w) : !WAVES.includes(w) && w !== "W7") throw new Error(isS9(P) ? "--wave=W8..W10 (S9)" : "--wave=W1..W7");
  const k = isS9(P) ? s9().S9_WAVES.indexOf(w) : ALL_WAVES.indexOf(w);
  for (const f of [P.runner, path.join(P.hidden, "manifest.json"), path.join(P.proto, "meta.mjs"), path.join(P.proto, "launcher", "launch.mjs"), path.join(P.proto, "specs", P.specFile ?? SPEC_FILE)]) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
  const st0 = fs.existsSync(path.join(P.live, "state.json")) ? readState(P.live) : null;
  if (k === 0) {
    // a fresh run: nothing in S's folder but what S's preflight made (the frozen kernel, the harness, empty scratch/live)
    const pre = new Set(["proto", "harness", "scratch", "live"]), extra = fs.existsSync(P.S) ? fs.readdirSync(P.S).filter((f) => !pre.has(f) || (["scratch", "live"].includes(f) && fs.readdirSync(path.join(P.S, f)).length)) : [];
    if (st0 || extra.length) throw new Error(`${P.S} exists (${extra.slice(0, 3).join(", ")}): ${P.sarm}'s W1 starts a fresh run (move it aside)`);
    ensureToolchain(P); installShims(P, P.sarm); prepareArm(P, P.sarm);
    for (const d of [P.repo, P.wt, P.live, P.store, P.scratch, P.harness, path.dirname(P.baseline), path.join(P.op, P.sarm)]) fs.mkdirSync(d, { recursive: true });
    for (const f of HARNESS_FILES) fs.copyFileSync(path.join(HERE, f), path.join(P.harness, f));
    if (isS9(P)) fs.copyFileSync(path.join(REPO_PROTO, "bench9", "s9.mjs"), path.join(P.harness, "s9.mjs"));
    freezeKernel(P);
    gitOk(P.repo, "init", "-q", "-b", "main"); gitOk(P.repo, "config", "user.email", "orderer@b8.invalid"); gitOk(P.repo, "config", "user.name", "B8 orderer");
    fs.writeFileSync(path.join(P.repo, "README.md"), "# The C-subset compiler (Benchmark 8)\n\nThe orderer's repository. `spec/` and `visible/` are the orderer's files; each wave is released here and worked in its own worktree.\n");
    if (isS9(P)) s9().seed(P);
    gitOk(P.repo, "add", "-A"); gitOk(P.repo, "commit", "-q", "-m", isS9(P) ? "orderer: the repository (Benchmark 9's start)" : "orderer: the repository");
    const spec = instantiateSpec(P), specFile = path.join(P.op, P.sarm, "spec.json");
    // the fake-SDK dry run only (a scratch --runs): a shorter time box, so a test sees one end in minutes
    if (opt["timebox-min"] != null) { if (P.runs === DEFAULT_RUNS) throw new Error("--timebox-min is for a scratch --runs only"); for (const x of spec.flow?.stages ?? []) if (x.timebox) x.timebox.min = Number(opt["timebox-min"]); }
    fs.writeFileSync(specFile, JSON.stringify(spec, null, 1) + "\n");
    metaCli(P, "init", `--spec-file=${specFile}`, `--vars=${JSON.stringify({ playbook_store: P.store })}`);
  } else {
    if (!st0) throw new Error(`${P.live} has no run: place W1 first`);
    // W7 follows the last wave the run placed (W6, or an earlier one where the caps stopped it), whatever its end
    const pw = isS9(P) ? s9().S9_WAVES[k - 1] : w === "W7" ? [...WAVES].reverse().find((x) => orderOf(st0, x)) ?? "W6" : WAVES[k - 1];
    const prev = orderOf(st0, pw);
    if (!prev || !TERMINAL.includes(prev.stage)) throw new Error(`S ${pw} has not ended (${prev?.stage ?? "not placed"}): waves run in order`);
    if (st0.data?.learn && (!st0.data.learn.closed || st0.data.learn.retros?.some((r) => r.state === "open"))) throw new Error(`S ${WAVES[k - 1]}'s learn step is still open (evidence or the architect's retro): the playbook would miss it`);
    if (orderOf(st0, w)) throw new Error(`${w} is already placed`);
    // the last wave's work, whatever its end (done, or cancelled at its rounds or the clock), is the next wave's base
    const br = prev.workspace?.branch;
    if (br) gitOk(P.repo, "merge", "-q", "--ff-only", br);
  }
  const rel = release(P, w, P.repo);
  gitOk(P.repo, "add", "--", ...new Set(rel.files.map((f) => f.split("/")[0])));
  gitOk(P.repo, "commit", "-q", "-m", `orderer: release ${w}`, "--allow-empty");
  const head = gitOk(P.repo, "rev-parse", "HEAD");
  // the accept stage runs in S's box: it asks the orderer's broker (root, outside) to run the hidden runner
  const acceptCmd = ["node", path.join(P.harness, "setup.mjs"), "accept", `--arm=${P.sarm}`, `--wave=${w}`, "--dir=${workdir}", `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.sproto}`, `--max-rounds=${Number(opt["max-rounds"] ?? MAX_ROUNDS)}`, ...(opt["no-broker"] ? [] : [`--broker=${boxPaths(P, P.sarm).broker}`]), ...(opt["fake-accept-pass"] ? fakePass(P) : [])];
  const budget = Number(opt.budget ?? DEFAULT_BUDGET);
  const o = metaCli(P, "order", "new", "--by=founder", "--to=architect", `--title=${isS9(P) ? `${w}: Benchmark 9, round ${s9().S9_ROUND[w]}` : `${w}: the compiler, wave ${waveN(w)}`}`, `--task=${w}`, `--accept=${isS9(P) ? s9().waveAccept(P, w) : waveAccept(w)}`, `--accept-cmd=${JSON.stringify(acceptCmd)}`, `--budget=${budget}`);
  chownArm(P.sarm, P.S);
  const rec = { event: "place", wave: w, order: o.order, stage: o.stage, main: head, release: rel.sha, files: rel.files.length, budget, maxRounds: Number(opt["max-rounds"] ?? MAX_ROUNDS), kernelHead: spawnSync("git", ["-C", P.proto, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim() || null };
  append(P.waves, rec);
  return { ...rec, run: `node ${SELF} run --waves=${w}` };
}

// ---------------------------------------------------------------- the preflight: one tiny session in the arm's box
export const AUTH_HINT = "The box passes only the auth variables in sandbox.mjs AUTH_KEYS: export one of them (or name others in B8_AUTH_ENV, or copy a credential file into the box's HOME with B8_AUTH_FILES=<src>:<dst under HOME>), then run again.";
/** The launcher's default model (no model id lives in bench8: the same default for both arms). */
export function launcherModel(P) { const src = fs.readFileSync(path.join(P.proto, "launcher", "launch.mjs"), "utf8"); return (src.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1] ?? null; }
/** S's PreToolUse command hook argv (the launcher's --pretool-hook): the frozen harness's `setup.mjs hook`, logging
 *  through the broker. */
export const sHookArgv = (P, { broker = true } = {}) => [path.join(NODE_DIR, "bin", "node"), path.join(P.harness, "setup.mjs"), "hook", `--arm=${P.sarm ?? "S"}`, `--isolation=${isolationOf()}`, `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.sproto}`, ...(broker ? [`--broker=${boxPaths(P, P.sarm ?? "S").broker}`] : [])];
/** An S session's query() options outside the launcher (the preflight's and the probe's), built as launch.mjs builds
 *  every S session: the frozen kernel's guard.mjs sessionPlan/makeGuard/queryOptions (canUseTool and PreToolUse: the
 *  kernel guard) plus commandHook(sHookArgv) (the access rule), with the launcher's env. Hooks mode only: in box mode
 *  the preflight goes through spawnFor in S's box. */
export async function sOptions(P, { cwd, model, effort = EFFORT, abortController, tools = TOOLS_OK, maxTurns, role = "probe" }) {
  const G = await import(path.join(P.sproto, "launcher", "guard.mjs"));
  const env = { ...armEnvFor(P, P.sarm ?? "S"), META_LIVE_DIR: P.live, META_KERNEL_ABS: "1" };
  for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING"]) delete env[k];
  const plan = G.sessionPlan({ tools, settingSources: [], maxTurns, workdir: cwd, roots: [] }, { fromOrder: true }, { cwd, sessionMin: 5, maxTurns, settingSources: [] });
  const guard = G.makeGuard({ tools: plan.tools, strictTools: plan.strictTools, roots: plan.roots, cwd: plan.cwd, role });
  const extraHooks = [G.commandHook(sHookArgv(P), { env: { ...env, META_LAUNCH: role, META_ROLE: role } })];
  return { options: G.queryOptions(plan, guard, { model, abortController, env: { ...env, META_LAUNCH: role, META_ROLE: role }, extraHooks, effort }), guard };
}
/** S's harness folders for a preflight or probe on a fresh runs dir (the kernel frozen, the harness copied). */
function sReady(P) {
  if (!fs.existsSync(path.join(P.sproto, "meta.mjs"))) freezeKernel(P);
  fs.mkdirSync(P.harness, { recursive: true });
  for (const f of HARNESS_FILES) fs.copyFileSync(path.join(HERE, f), path.join(P.harness, f));
  for (const d of [P.scratch, P.live]) fs.mkdirSync(d, { recursive: true });
}
const sdkQuery = async (P) => (await import(path.join(P.proto, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs"))).query;
const usageCost = (result) => Object.values(result?.modelUsage ?? {}).reduce((a, u) => a + (u.costUSD ?? 0), 0);
/** Before an arm runs: one Agent SDK session (one turn, no tools) started exactly as the arm's are: in box mode in its
 *  box (spawnFor, the egress tunnel); in hooks mode with its env and its hooks (V: vOptions; S: sOptions). A failure
 *  here (auth, the tunnel, the box) stops the run before any wave, and costs a few cents at most. */
export async function preflight(P, arm, opt = {}) {
  fs.mkdirSync(arm === "V" ? P.V : P.S, { recursive: true }); // the box binds the arm's folder (empty before W1)
  const hooks = hooksMode(), B = prepareArm(P, arm), t0 = Date.now(), model = opt.model ?? launcherModel(P), effort = opt.effort ?? EFFORT;
  const egress = hooks ? null : startEgress(P, arm);
  const query = await sdkQuery(P);
  let result = null, error = null, broker = null, sid = null;
  const ac = new AbortController(), t = setTimeout(() => ac.abort(new Error("preflight over 3 min")), 180_000);
  try {
    let options;
    if (!hooks) { const { spawnFor } = await import("./sandbox.mjs"); options = { cwd: B.home, model, effort, env: boxEnv(P, arm), settingSources: [], tools: [], allowedTools: [], permissionMode: "dontAsk", maxTurns: 1, abortController: ac, spawnClaudeCodeProcess: spawnFor(P, arm, { stderrLog: path.join(P.op, arm, "preflight-stderr.log") }) }; }
    else if (arm === "V") options = await vOptions(P, { cwd: B.tmp, model, effort, abortController: ac, tools: [], maxTurns: 1 });
    else { sReady(P); broker = startBroker(P); options = (await sOptions(P, { cwd: P.scratch, model, effort, abortController: ac, tools: [], maxTurns: 1, role: "preflight" })).options; }
    for await (const m of query({ prompt: "Reply with the single word: ready", options })) { if (typeof m.session_id === "string" && m.session_id) sid ??= m.session_id; if (m.type === "result") result = m; }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(t); try { egress?.kill(); } catch {} try { broker?.kill(); } catch {}
  const cost = usageCost(result);
  // the session's own id (the probe found every session sharing the operator's: CLAUDE_CODE_REMOTE_SESSION_ID)
  const ownId = !!sid && !String(process.env.CLAUDE_CODE_SESSION_ID ?? "").includes(sid);
  const ok = !error && !!result && !result.is_error && /ready/i.test(String(result.result ?? "")) && ownId;
  return { arm, isolation: hooks ? "hooks" : "box", ok, sid, ownSessionId: ownId, said: String(result?.result ?? "").slice(0, 80), why: ok ? null : String(error ?? result?.result ?? result?.subtype ?? "no result").slice(0, 300), cost: Number(cost.toFixed(4)), seconds: Math.round((Date.now() - t0) / 1000), envNames: armEnvNames(P, arm), effort };
}
/** The hook probe (hooks mode): one tiny session of the arm, asked to run three Bash commands the access rule must
 *  refuse (read a hidden file, curl github, gcc on a .c); each must come back denied and be logged in access.jsonl
 *  with this session's id. Bash only and maxTurns 2, to keep it cheap. */
export async function probe(P, arm, opt = {}) {
  if (!hooksMode()) throw new Error("probe is for --isolation=hooks (box mode: setup.mjs box-check)");
  const B = prepareArm(P, arm), t0 = Date.now(), model = opt.model ?? launcherModel(P), effort = opt.effort ?? EFFORT;
  installShims(P, arm);
  const cwd = arm === "V" ? P.V : P.scratch;
  if (isS(arm)) sReady(P);
  fs.mkdirSync(cwd, { recursive: true });
  fs.writeFileSync(path.join(cwd, "probe.c"), "int main(void) { return 0; }\n");
  const hiddenFile = path.join(P.hidden, "manifest.json");
  const cmds = [`cat ${hiddenFile}`, "curl -sS https://github.com", `gcc ${path.join(cwd, "probe.c")} -o ${path.join(cwd, "probe")}`];
  const prompt = `This is a harness check of your sandbox, not a task. In ONE message, make exactly these three Bash tool calls (in parallel, each command exactly as written), then reply with one line per command saying whether it was allowed or denied. Do nothing else.\n${cmds.map((c, i) => `${i + 1}. ${c}`).join("\n")}`;
  const query = await sdkQuery(P);
  let result = null, error = null, sid = null, broker = null;
  const ac = new AbortController(), t = setTimeout(() => ac.abort(new Error("probe over 4 min")), 240_000);
  const from = readJsonl(P.access).length;
  try {
    let options;
    if (arm === "V") options = await vOptions(P, { cwd, model, effort, abortController: ac, tools: ["Bash"], maxTurns: 2, sid: () => sid });
    else { broker = startBroker(P); options = (await sOptions(P, { cwd, model, effort, abortController: ac, tools: ["Bash"], maxTurns: 2, role: "probe" })).options; }
    for await (const m of query({ prompt, options })) { if (typeof m.session_id === "string" && m.session_id) sid ??= m.session_id; if (m.type === "result") result = m; }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(t); try { broker?.kill(); } catch {}
  const logged = readJsonl(P.access).slice(from).filter((x) => x.sid === sid);
  const checks = cmds.map((c, i) => { const hit = logged.filter((x) => x.tool === "Bash" && String(x.what).trim() === c); return { cmd: ["hidden file", "curl github", "gcc on .c"][i], called: hit.length > 0, denied: hit.length > 0 && hit.every((x) => x.deny), logged: hit.length, why: hit.find((x) => x.deny)?.why ?? null }; });
  const executed = logged.filter((x) => !x.deny).map((x) => `${x.via ?? "hook"} ${x.tool}: ${x.what}`);
  const ownSessionId = !!sid && !String(process.env.CLAUDE_CODE_SESSION_ID ?? "").includes(sid);
  const ok = checks.every((c) => c.called && c.denied) && !executed.length && ownSessionId;
  return { arm, isolation: "hooks", ok, sid, ownSessionId, checks, allowedCalls: executed, said: String(result?.result ?? "").slice(0, 400), error, cost: Number(usageCost(result).toFixed(4)), seconds: Math.round((Date.now() - t0) / 1000), shimLog: B.shimLog };
}

// ---------------------------------------------------------------- S: the order's accept (code runs it)
/** The S order's accept stage: the hidden run of waves 1..n on the worktree, its failing categories as `failed: ` lines
 *  and the categories it checked. The (1 + max-rounds)-th failing run of a wave exits 3 (a stage error: no revise is
 *  sent) and marks the wave's rounds as spent; the observer then ends the order, as V's harness ends a wave after its
 *  third feedback round. A runner error exits 3 too, recorded, and spends nothing. */
/** The fake-SDK dry run only (a scratch --runs): the stub compiler never passes the hidden runner, so the dry run's
 *  accept reports the real run's lines as notes and passes (S2's advisory review comes after a passing accept). */
const fakePass = (P) => { if (P.runs === DEFAULT_RUNS) throw new Error("--fake-accept-pass is for a scratch --runs only"); return ["--fake-pass"]; };
/** The broker's client (in S's box): send the accept request, print what the orderer's run printed, exit with its code. */
async function acceptClient(P, opt) {
  const r = await brokerCall(opt.broker, { op: "accept", wave: String(opt.wave).toUpperCase(), dir: path.resolve(opt.dir), maxRounds: Number(opt["max-rounds"] ?? MAX_ROUNDS) }, 4 * 3600_000);
  if (!r || r.error) { console.log(`runner error: the orderer's broker: ${r?.error ?? "no answer"}`); process.exit(3); }
  if (opt["fake-pass"] && P.runs !== DEFAULT_RUNS) { for (const l of String(r.stdout ?? "").split("\n").filter(Boolean)) console.log(`# (dry run: the orderer passes it) ${l}`); process.exit(0); }
  process.stdout.write(r.stdout ?? ""); process.exit(r.code ?? 3);
}
export function brokerCall(sock, req, timeoutMs = 20_000) {
  return new Promise((resolve) => {
    let buf = "", done = false; const fin = (x) => { if (!done) { done = true; clearTimeout(t); try { c.destroy(); } catch {} resolve(x); } };
    const c = net.connect(sock); const t = setTimeout(() => fin({ error: `timed out after ${timeoutMs} ms` }), timeoutMs);
    c.on("connect", () => c.write(JSON.stringify(req) + "\n"));
    c.on("data", (d) => { buf += d; const i = buf.indexOf("\n"); if (i >= 0) { try { fin(JSON.parse(buf.slice(0, i))); } catch (e) { fin({ error: String(e) }); } } });
    c.on("error", (e) => fin({ error: String(e?.message ?? e) }));
    c.on("close", () => fin({ error: "closed" }));
  });
}
/** The orderer's broker for arm S (root, outside the box): the hook's log lines and the accept stage's hidden runs. */
function broker(P, opt) {
  const B = isolationOf() === "hooks" ? (prepareArm(P, P.sarm), boxPaths(P, P.sarm)) : boxPaths(P, P.sarm);
  try { fs.rmSync(B.broker, { force: true }); } catch {}
  const wt = real(P.wt);
  const srv = net.createServer((c) => {
    let buf = "";
    c.on("error", () => {});
    c.on("data", async (d) => {
      buf += d; const i = buf.indexOf("\n"); if (i < 0) { if (buf.length > 1 << 20) c.destroy(); return; }
      let req; try { req = JSON.parse(buf.slice(0, i)); } catch { c.end(JSON.stringify({ error: "bad request" }) + "\n"); return; }
      buf = "\x00"; // one request per connection
      if (req.op === "log") { try { const { arm: _a, ...rec } = req.rec ?? {}; append(P.access, { arm: P.sarm, ...rec }); c.end(JSON.stringify({ ok: true }) + "\n"); } catch (e) { c.end(JSON.stringify({ error: String(e) }) + "\n"); } return; }
      if (req.op === "accept") {
        const dir = realish(String(req.dir ?? ""));
        if (!inside(dir, wt) || !(isS9(P) ? s9().S9_WAVES.includes(String(req.wave)) : /^W[1-7]$/.test(String(req.wave)))) { append(P.operator, { act: "broker-refused", req }); c.end(JSON.stringify({ stdout: "runner error: the accept dir is not one of S's worktrees\n", code: 3 }) + "\n"); return; }
        const argv = [SELF, "accept", `--arm=${P.sarm}`, `--wave=${req.wave}`, `--dir=${dir}`, `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.proto}`, `--max-rounds=${Number(req.maxRounds ?? MAX_ROUNDS)}`];
        const ch = spawn(process.execPath, argv, { stdio: ["ignore", "pipe", "pipe"] });
        let out = ""; ch.stdout.on("data", (x) => { out += x; }); ch.stderr.on("data", () => {});
        ch.on("close", (code) => { try { c.end(JSON.stringify({ stdout: out, code: code ?? 3 }) + "\n"); } catch {} });
        return;
      }
      c.end(JSON.stringify({ error: `unknown op ${req.op}` }) + "\n");
    });
  });
  srv.listen(B.broker, () => { fs.chmodSync(B.broker, 0o600); spawnSync("chown", [`${B.uid}:${B.uid}`, B.broker]); });
  return srv;
}
function startBroker(P) {
  const B = boxPaths(P, P.sarm);
  // a unix socket path over 107 bytes is cut short by the kernel, silently: the broker then listens somewhere else
  if (Buffer.byteLength(B.broker) > 107) throw new Error(`the broker's socket path is ${Buffer.byteLength(B.broker)} bytes (unix sockets take 107): use a shorter --runs (${B.broker})`);
  try { fs.rmSync(B.broker, { force: true }); } catch {}
  fs.mkdirSync(path.join(P.op, P.sarm), { recursive: true });
  const bo = fs.openSync(path.join(P.op, P.sarm, "broker.out"), "a");
  const ch = spawn(process.execPath, [SELF, "broker", `--arm=${P.sarm}`, `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.proto}`], { stdio: ["ignore", bo, bo] });
  fs.closeSync(bo);
  process.on("exit", () => { try { ch.kill("SIGKILL"); } catch {} });
  for (let k = 0; k < 600 && !fs.existsSync(B.broker); k++) spawnSync("sleep", ["0.05"]); // 30 s: a loaded host (the restart test) took over 5
  if (!fs.existsSync(B.broker)) throw new Error("the broker did not start");
  return ch;
}

function sAccept(P, opt) {
  const w = String(opt.wave).toUpperCase(), dir = path.resolve(opt.dir), maxRounds = Number(opt["max-rounds"] ?? MAX_ROUNDS);
  const prior = readJsonl(P.acceptLog).filter((x) => x.wave === w && x.total != null);
  if (prior.length && prior.at(-1).exhausted) { console.log("# this wave's feedback rounds are spent: the orderer ends it"); process.exit(3); }
  const results = nextResults(P, P.sarm, w), gate = waveN(w) === 6 ? lastResults(P, P.sarm, "W5") : null;
  const t0 = Date.now(), r = hidden(P, w, dir, { results, gate });
  if (r.error) { append(P.acceptLog, { wave: w, dir, error: r.error }); console.log(r.error); process.exit(3); }
  const head = git(dir, "rev-parse", "HEAD").stdout.trim() || null, dirty = !!git(dir, "status", "--porcelain").stdout.trim();
  const exhausted = r.anyFail && prior.length >= maxRounds;
  append(P.acceptLog, { wave: w, dir, head, dirty, k: prior.length + 1, pass: r.pass, total: r.total, rate: r.rate, byWave: r.byWave, categories: r.categories, failing: r.failing, feedback: r.feedback, gate: r.gate, w6: r.w6, ...(r.w7 ? { w7: r.w7 } : {}), failStages: r.failStages, cheat: r.cheat, results, ms: Date.now() - t0, exhausted, ...(r.b9 ? { b9: r.b9, lines: r.lines } : {}) });
  for (const l of r.findings) console.log(l);
  console.log(`checked: ${Object.keys(r.categories).join(", ")}${r.w6 ? `, ${Object.keys(r.w6.programs).map((p) => `W6 ${p}`).join(", ")}` : ""}`);
  if (exhausted) { console.log(`# hidden acceptance: ${r.failing.length} categories fail, and the wave's ${maxRounds} feedback rounds are spent: the orderer ends the wave`); process.exit(3); }
  console.log(r.anyFail ? `# hidden acceptance: ${r.feedback.length} lines` : "# hidden acceptance: every category passes");
  process.exit(r.code);
}

// ---------------------------------------------------------------- S: the observer and the protocol's stops
const cost = (P) => { const fins = readJsonl(path.join(P.live, "launches.jsonl")).filter((x) => x.event === "finish"); return dedupCost(fins); };
/** An order the protocol ends, as the founder (a rule fixed before the run, never a judgment): its wave's rounds spent,
 *  parked (the loop cap, the integration's maxTries), its budget hold, the run's caps, or the launcher stopped. Its
 *  last version is the arm's final for the wave, and a cancelled order is an ended one (its evidence and retro run). */
export function endIfStopped(P, wave, { why: forced = null } = {}) {
  const o = orderOf(readState(P.live), wave);
  if (!o || TERMINAL.includes(o.stage)) return null;
  const acc = readJsonl(P.acceptLog).filter((x) => x.wave === wave && x.total != null);
  const rounds = readJsonl(P.waves).findLast((x) => x.event === "place" && x.wave === wave)?.maxRounds ?? MAX_ROUNDS;
  const why = forced ?? (acc.at(-1)?.exhausted ? `the wave's ${rounds} feedback round${rounds === 1 ? " is" : "s are"} spent` : o.stage === "parked" ? `parked: ${String(o.parked?.reason ?? "").slice(0, 200)}` : o.budgetHold?.ask ? `budget: ${o.spent} of ${o.budget} tokens` : null);
  if (!why) return null;
  let r; try { r = metaCli(P, "order", "cancel", o.id, "--by=founder", `--reason=B8 protocol stop (${why}): the last version is the arm's final for ${wave}`); } catch (e) { r = { error: e.message }; }
  append(P.operator, { act: "cancel", wave, order: o.id, why, ok: !r?.error, out: JSON.stringify(r).slice(0, 300) });
  return { cancelled: o.id, why };
}
function launcherArgv(P, opt, maxMin) {
  const node = path.join(NODE_DIR, "bin", "node");
  const hook = JSON.stringify(sHookArgv(P));
  return [node, path.join(P.sproto, "launcher", "launch.mjs"), `--live=${P.live}`, "--workdir-from=order", `--max-parallel=${opt["max-parallel"] ?? 4}`, `--max-min=${Math.max(1, Math.floor(maxMin))}`, `--pretool-hook=${hook}`, `--effort=${opt.effort ?? EFFORT}`, ...(opt.model ? [`--model=${opt.model}`] : [])];
}
const learnOpen = (st) => !!st?.data?.learn && (!st.data.learn.closed || st.data.learn.retros?.some((x) => x.state === "open"));

// ---------------------------------------------------------------- restart safety (PROTOCOL.md "Restarts", 2026-10-23)
/** Where V stands in its ledger: started, finished (every wave summed up, a cap's stop, or an end after its last
 *  start). keepalive.mjs and --resume read it. */
export function vStatus(rows, waves = WAVES) {
  const i = rows.findLastIndex((x) => x.event === "start" || x.event === "resume");
  const stop = rows.find((x) => x.event === "stop"), end = i >= 0 ? rows.slice(i + 1).find((x) => x.event === "end") : null;
  const all = waves.every((w) => rows.some((x) => x.event === "wave-summary" && x.wave === w));
  return { started: i >= 0, finished: !!stop || all || !!end, why: stop ? `stopped: ${stop.why}` : end ? `ended: ${end.why}` : all ? "every wave ran" : null };
}
/** Where S stands in waves.jsonl: started (a run began), finished (every wave ended, a cap's stop, or a run-end after its
 *  last run-start or resume). */
export function sStatus(rows, waves = WAVES) {
  const i = rows.findLastIndex((x) => x.event === "run-start" || x.event === "resume");
  const stop = rows.find((x) => x.event === "stop"), end = i >= 0 ? rows.slice(i + 1).find((x) => x.event === "run-end") : null;
  const all = waves.every((w) => rows.some((x) => x.event === "wave-end" && x.wave === w));
  return { started: i >= 0 || rows.some((x) => x.event === "wave-start"), finished: !!stop || all || !!end, why: stop ? `stopped: ${stop.why}` : end ? `ended: ${end.why}` : all ? "every wave ended" : null };
}
const supCli = (P, ...a) => spawnSync(process.execPath, [path.join(kernelDir(P), "supervisor.mjs"), ...a], { env: metaEnv(P), encoding: "utf8" });
/** After a restart, every launch the dead launcher left unfinished (started, or reserved and still queued) is reported
 *  failed (`launch finished --ok=false`): its runs are abandoned, its leases released and its sessions closed, so
 *  serve plans the work again at once (K22's serve-resume alone keeps them standing until their leases expire). A
 *  launch whose SDK session id is known (the launcher's `sdk` line, its `resume`, or the access log) is reported
 *  --intact: a warm builder's next item resumes that session (K26), and the launcher falls back cold, recorded, if the
 *  resume fails. Each gets a `finish` line in launches.jsonl (restart: true; no sdk field, so dedupCost counts nothing
 *  twice). Returns what was abandoned. */
export function abandonDead(P, why = "abandoned: the machine restarted (B8 resume)") {
  const st = readState(P.live); if (!st) return [];
  const ledger = path.join(P.live, "launches.jsonl"), L = readJsonl(ledger), acc = readJsonl(P.access);
  const ev = st.log?.events ?? [], lid = (e) => `${String(e.seq).padStart(4, "0")}-${e.role}`;
  const ended = new Set(ev.filter((e) => e.type === "launch-finished" && e.launch).map((e) => e.launch));
  const out = [];
  for (const e of ev.filter((x) => x.type === "launch" && !ended.has(lid(x)))) {
    const id = lid(e), started = L.find((x) => x.event === "start" && x.launch === id);
    // the launcher finished it, but its report was refused (an older frozen launcher did not retry the state lock):
    // reported again with what the launcher recorded, so its usage, its sessions and its warm record are the kernel's
    const fin = L.find((x) => x.event === "finish" && x.launch === id);
    if (fin) {
      let error = null; try { metaCli(P, "launch", "finished", `--launch=${id}`, `--role=${e.role}`, `--tokens=${fin.tokens ?? 0}`, `--cumulative=${fin.cumulative ?? 0}`, `--cost=${fin.cost ?? 0}`, `--ok=${!!fin.ok}`, ...(fin.reason ? [`--reason=${fin.reason}`] : []), ...(fin.sdk ? [`--sdk-session=${fin.sdk}`] : [])); } catch (x) { error = String(x.message).slice(0, 300); }
      out.push({ launch: id, role: e.role, reReported: true, ...(error ? { error } : {}) });
      continue;
    }
    const sdk = L.findLast((x) => x.event === "sdk" && x.launch === id)?.sdk ?? started?.resume ?? acc.findLast((x) => x.arm === P.sarm && x.launch === id && x.sid)?.sid ?? null;
    let rec = null, error = null;
    try { rec = metaCli(P, "launch", "finished", `--launch=${id}`, `--role=${e.role}`, "--tokens=0", "--cumulative=0", "--cost=0", "--ok=false", `--reason=${why}`, ...(sdk ? [`--sdk-session=${sdk}`, "--intact=true"] : [])); } catch (x) { error = String(x.message).slice(0, 300); }
    const r = { event: "finish", launch: id, n: null, role: e.role, ok: false, reason: why, tokens: 0, cumulative: 0, cost: 0, turns: null, minutes: null, sessions: rec?.sessions ?? [], abandoned: rec?.abandoned ?? [], denials: 0, said: "", restart: true, started: !!started, ...(sdk ? { sdkLost: sdk } : {}), ...(started?.resume ? { resumed: started.resume } : {}), warm: rec?.warm ?? [], ...(error ? { error } : {}) };
    append(ledger, r);
    out.push({ launch: id, role: e.role, started: !!started, sdk, runs: r.abandoned, next: rec?.warm?.length ? `warm: resumes ${sdk}` : "cold", ...(error ? { error } : {}) });
  }
  return out;
}
/** A stage-error the restart caused (the accept job died with the machine, or lost the broker) holds the order until
 *  `supervisor.mjs retry` (K2): the observer retries it, as the founder, at most 6 times a wave (a runner error that
 *  is not a restart's stays a stage-error, as before). */
const RESTART_ERROR = /died without an exit record|the job was killed|the orderer's broker|could not start/;
function retryLost(P, wave) {
  const o = orderOf(readState(P.live), wave);
  if (!o?.stageError || !RESTART_ERROR.test(String(o.stageError.why ?? ""))) return null;
  if (readJsonl(P.operator).filter((x) => x.act === "retry" && x.wave === wave).length >= 6) return null;
  const r = supCli(P, "retry", `--order=${o.id}`, "--by=founder");
  const rec = { act: "retry", wave, order: o.id, stage: o.stageError.stage, why: String(o.stageError.why).slice(0, 300), ok: r.status === 0 };
  append(P.operator, rec);
  return rec;
}
/** --fake (restart tests only): the frozen launcher's SDK replaced by bench8/fake-sdk, which plays each role by the CLI. */
function installFakeSdk(P) {
  if (P.runs === DEFAULT_RUNS) throw new Error("--fake never runs on the real runs dir");
  const d = path.join(P.sproto, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk");
  if (fs.existsSync(path.join(d, "package.json")) && JSON.parse(fs.readFileSync(path.join(d, "package.json"), "utf8")).version?.includes("b8-fake")) return;
  fs.rmSync(d, { recursive: true, force: true }); fs.cpSync(path.join(HERE, "fake-sdk"), d, { recursive: true });
}

async function sRun(P, opt) {
  // --extend=W7 (PROTOCOL.md "W7"): continue an arm that finished its W1-W6 run into W7, the next wave's order, with
  // W7's own caps (w7.mjs W7_MIN, W7_COST; --w7-min, --w7-cost) counted from W7's start (the `extend` row)
  const EXT = opt.extend ? String(opt.extend).toUpperCase() : null;
  if (EXT && EXT !== "W7") throw new Error("--extend=W7");
  const waves = EXT ? ["W7"] : String(opt.waves ?? (isS9(P) ? s9().S9_WAVES : WAVES).join(",")).split(/[,.]+/).filter(Boolean).map((x) => x.toUpperCase());
  const maxMin = EXT ? Number(opt["w7-min"] ?? w7().W7_MIN) : Number(opt["max-min"] ?? RUN_MIN), maxCost = EXT ? Number(opt["w7-cost"] ?? w7().W7_COST) : Number(opt["max-cost"] ?? RUN_COST), poll = Number(opt.poll ?? 5) * 1000;
  const hooks = hooksMode(), FAKE = !!opt.fake, RESUME = !!opt.resume;
  const rows0 = readJsonl(P.waves), st0 = EXT ? w7().extStatus(rows0, "S") : sStatus(rows0, waves);
  if (EXT && !st0.started && !sStatus(rows0).finished) throw new Error(`${P.sarm ?? "S"}'s W1-W6 run has not finished (${P.waves}): W7 extends a finished run`);
  let base7 = EXT ? w7().capBase(rows0) : null;
  // the caps are for the whole run: the active clock (restart-safe), or for a run from before it, the waves' minutes
  const clockFile = path.join(P.op, P.sarm, "clock.json"), legacyMin = !clockOf(clockFile) ? rows0.filter((x) => x.event === "wave-end").reduce((a, x) => a + (x.minutes ?? 0), 0) : 0;
  if (opt["dry-run"]) { const used = (clockOf(clockFile)?.activeMs ?? 0) / 60000 + legacyMin; return { dry: true, isolation: hooks ? "hooks" : "box", launcher: launcherArgv(P, opt, maxMin - used), ...(hooks ? { cwd: P.S } : { box: boxArgv(P, P.sarm, P.S, ["<launcher>"])[1].slice(0, 8) }), envNames: armEnvNames(P, P.sarm), caps: { maxMin, maxCost, usedMin: used }, status: st0, observe: fs.existsSync(path.join(P.live, "state.json")) ? summarizeOrder(P, waves[0]) : null }; }
  if (RESUME && st0.finished) return { resume: true, finished: true, why: st0.why };
  // one S at a time on these runs (arm.pid, checked against /proc and the boot)
  const PIDF = path.join(P.op, P.sarm, "arm.pid"), other = readPid(PIDF);
  if (other && other.pid !== process.pid && procAlive(other.pid, { match: ["setup.mjs", "run"], boot: other.boot })) { console.error(`refused: ${P.sarm} is already running on ${P.runs} (pid ${other.pid}); one ${P.sarm} at a time`); process.exit(3); }
  writePid(PIDF, { arm: P.sarm, runs: P.runs }); process.on("exit", () => { try { if (readPid(PIDF)?.pid === process.pid) fs.rmSync(PIDF, { force: true }); } catch {} });
  if (FAKE) { process.env.B8_FAKE_STUB = path.join(HERE, "dryrun", "stub"); process.env.B8_FAKE_SEC = String(opt["fake-sec"] ?? 2); if (opt["fake-lose-session"]) process.env.B8_FAKE_LOSE_SESSION = "1"; process.env.B8_NO_CHOWN = "1"; }
  // what the dead run left: the launcher, serve and every agent (cwd in S's folder), the broker and its accept runs,
  // the K2 job wrappers, a hidden runner on S's worktrees
  const leftovers = st0.started ? killLeftovers({ dirs: [P.S], names: [["setup.mjs", "broker", `--runs=${P.runs}`], ["setup.mjs", "accept", `--runs=${P.runs}`], ["run-hidden.mjs", `--dir=${P.wt}`], ["jobs.mjs", "exec", P.live]] }) : [];
  if (!opt["no-preflight"] && !FAKE && !rows0.some((x) => x.event === "preflight" && x.ok)) { const pf = await preflight(P, P.sarm, opt); append(P.waves, { event: "preflight", ...pf }); if (!pf.ok) throw new Error(`S preflight failed (${pf.why}): no session could start ${hooks ? "with S's env and hooks" : "in S's box"}. ${hooks ? "" : AUTH_HINT}`); }
  const clock = armClock(clockFile);
  const activeMin = () => clock.activeMin() + legacyMin - (base7?.activeMin ?? 0);
  // the spend the caps count (W7: since W7's start)
  const usedCost = () => cost(P).cost - (base7?.cost ?? 0);
  if (EXT && !base7) { base7 = { activeMin: clock.activeMin() + legacyMin, cost: cost(P).cost }; append(P.waves, { event: "extend", wave: "W7", activeMin: Math.round(base7.activeMin * 100) / 100, cost: base7.cost, caps: { maxMin, maxCost } }); }
  if (st0.started) {
    // the state lock a killed tick held (state.mjs breaks a dead holder's lock only after 30 s, and a serve that waits
    // its 10 s for it dies): its holder is dead (or of this run's leftovers, killed above), so it goes
    { const lk = path.join(P.live, "state.lock"); let holder = null; try { holder = Number(fs.readFileSync(lk, "utf8").trim()); } catch {} if (holder != null && !procAlive(holder)) fs.rmSync(lk, { force: true }); }
    // a stale git index lock (a git killed mid-command) would stop every hand-in's commit
    for (const d of [P.repo, ...(fs.existsSync(P.wt) ? fs.readdirSync(P.wt).map((x) => path.join(P.wt, x)) : [])]) { const g = git(d, "rev-parse", "--git-dir").stdout.trim(); const f = g && path.resolve(d, g, "index.lock"); if (f && fs.existsSync(f)) fs.rmSync(f, { force: true }); }
    const dead = abandonDead(P);
    append(P.waves, { event: RESUME ? "resume" : "run-start", resumed: true, downMin: Math.round(clock.downMs / 600) / 100, activeMin: Math.round(activeMin() * 100) / 100, lastBeat: clock.prev?.t ?? null, cost: usedCost(), abandoned: dead, leftovers: leftovers.map((x) => x.argv.slice(0, 120)), wave: waves.find((w) => !rows0.some((x) => x.event === "wave-end" && x.wave === w)) ?? null });
  } else append(P.waves, { event: "run-start", waves, fake: FAKE || undefined });
  append(P.waves, { event: "isolation", isolation: hooks ? "hooks" : "box", envNames: armEnvNames(P, P.sarm) });
  if (!hooks) startEgress(P, P.sarm);
  startBroker(P);
  const out = [];
  let runWhy = "every wave ran";
  // S2 (K35): a spec with an advisory stage runs one launcher across waves, so the next wave starts while the last
  // wave's advisory review still runs (its findings then go to the next order); the wave ends when its order has
  // ended and its learn step is closed, not when the launcher exits
  const continuous = !!readState(P.live)?.data?.specDef?.flow?.stages?.some((x) => x.advisory) || !!instantiateSpec(P).flow?.stages?.some((x) => x.advisory);
  let L = null;
  const spawnLauncher = (argv) => {
    const fd = fs.openSync(path.join(P.op, P.sarm, "launcher.out"), "a");
    chownArm(P.sarm, P.S);
    const [bin, args] = hooks ? [argv[0], argv.slice(1)] : boxArgv(P, P.sarm, P.S, argv, { killSignal: "SIGINT" });
    const child = spawn(bin, args, { env: armEnvFor(P, P.sarm), cwd: P.S, stdio: ["ignore", fd, fd] });
    const x = { child, exited: false, t: Date.now(), wave: null }; child.on("exit", () => { x.exited = true; });
    return x;
  };
  if (EXT) {
    // W7's integration check and runner pieces in the frozen harness (W1-W6's files there are left as they ran)
    for (const f of ["visible-check.mjs", "w7.mjs"]) fs.copyFileSync(path.join(HERE, f), path.join(P.harness, f));
    // a W6 whose learn step the caps left open: its retro runs first (in W7's budget: S's own process), as after a wave
    if (!orderOf(readState(P.live), "W7") && learnOpen(readState(P.live))) {
      append(P.operator, { act: "retro-launch", wave: "before W7" });
      const argv = launcherArgv(P, opt, 30), fd = fs.openSync(path.join(P.op, P.sarm ?? "S", "launcher.out"), "a");
      const [bin, args] = hooks ? [argv[0], argv.slice(1)] : boxArgv(P, P.sarm ?? "S", P.S, argv, { killSignal: "SIGINT" });
      const child = spawn(bin, args, { env: armEnvFor(P, P.sarm ?? "S"), cwd: P.S, stdio: ["ignore", fd, fd] });
      let exited = false; child.on("exit", () => { exited = true; });
      while (!exited) await new Promise((r) => setTimeout(r, poll));
    }
  }
  for (const w of waves) {
    if (readJsonl(P.waves).some((x) => x.event === "wave-end" && x.wave === w)) continue;
    const st = fs.existsSync(path.join(P.live, "state.json")) ? readState(P.live) : null;
    if (!orderOf(st, w)) out.push(sPlace(P, { ...opt, wave: w }));
    if (FAKE) installFakeSdk(P);
    // an older frozen launcher re-linked live/kernel/live on every start and died on EEXIST when the link dangled (the
    // frozen kernel has no live/): a real folder there keeps the link whole
    fs.mkdirSync(path.join(P.sproto, "live"), { recursive: true });
    const left = maxMin - activeMin();
    if (left <= 0 || usedCost() >= maxCost) { const why = left <= 0 ? `the run's wall clock (${maxMin} min)` : `the run's cost cap ($${maxCost})`; endIfStopped(P, w, { why }); append(P.waves, { event: "stop", wave: w, why: "caps" }); runWhy = why; break; }
    const ws = readJsonl(P.waves).findLast((x) => x.event === "wave-start" && x.wave === w);
    if (!ws) append(P.waves, { event: "wave-start", wave: w, launchesFrom: readJsonl(path.join(P.live, "launches.jsonl")).length, leftMin: left, activeMin: Math.round(activeMin() * 100) / 100 });
    else append(P.waves, { event: "wave-resume", wave: w, leftMin: left, activeMin: Math.round(activeMin() * 100) / 100 });
    const a0 = ws?.activeMin ?? (ws ? activeMin() - (Date.parse(clock.prev?.t ?? new Date().toISOString()) - Date.parse(ws.t)) / 60000 : activeMin());
    let stopped = null;
    const launch = async (argv) => {
      const fd = fs.openSync(path.join(P.op, P.sarm, "launcher.out"), "a");
      chownArm(P.sarm, P.S);
      // box mode: the whole launcher (supervisor, code stages, every session) in S's box, as S's uid (pilot fix);
      // hooks mode: the launcher as Benchmarks 6/7 ran it, with S's env (hooksEnv), every session under the kernel
      // guard and the access hook (--pretool-hook)
      const [bin, args] = hooks ? [argv[0], argv.slice(1)] : boxArgv(P, P.sarm, P.S, argv, { killSignal: "SIGINT" });
      const child = spawn(bin, args, { env: armEnvFor(P, P.sarm), cwd: P.S, stdio: ["ignore", fd, fd] });
      let exited = false; child.on("exit", () => { exited = true; });
      // the observer: the protocol's stops, the caps (the active clock: downtime never counts), and a restart's
      // stage-errors retried
      while (!exited) {
        endIfStopped(P, w);
        retryLost(P, w);
        const c = usedCost();
        if (!stopped && (c >= maxCost || activeMin() >= maxMin)) { stopped = c >= maxCost ? `the run's cost cap ($${maxCost}: $${c})` : `the run's wall clock (${maxMin} min)`; append(P.operator, { act: "stop", wave: w, why: stopped }); child.kill("SIGINT"); setTimeout(() => { try { child.kill("SIGKILL"); } catch {} }, 60_000); }
        await new Promise((r) => setTimeout(r, poll));
      }
    };
    if (continuous) {
      // the observer for this wave, with the one launcher (started again when it exits: for the retro, or after a
      // stop of the launcher with the order still open, which the protocol ends as S's harness does)
      for (;;) {
        const st = readState(P.live), o = orderOf(st, w), ended = TERMINAL.includes(o?.stage);
        if (ended && !learnOpen(st)) break;
        if (stopped) { if (!L || L.exited) break; await new Promise((r) => setTimeout(r, poll)); continue; }
        if (!L || L.exited) {
          // S2 review: a launcher that exited with the order open ends the wave (once a poll: a failed cancel is
          // retried after a sleep, not in a hot loop), unless it is one from an earlier wave that exited before this
          // order's work began (serve exits --idle-min after settled, before the observer placed this order): that one
          // is started again for this wave
          const idleExit = L?.exited && L.wave !== w && !(st?.log?.events ?? []).some((e) => e.type === "enter" && e.order === o?.id);
          if (L?.exited && !ended && !idleExit) { endIfStopped(P, w, { why: `the launcher stopped after ${Math.round(activeMin() - a0)} min` }); await new Promise((r) => setTimeout(r, poll)); continue; }
          if (ended) append(P.operator, { act: "retro-launch", wave: w });
          L = spawnLauncher(launcherArgv(P, opt, ended ? Math.min(30, maxMin - activeMin()) : maxMin - activeMin())); L.wave = w;
          append(P.operator, { act: "launcher", wave: w, pid: L.child.pid, continuous: true });
        }
        endIfStopped(P, w);
        retryLost(P, w);
        const c = usedCost();
        if (c >= maxCost || activeMin() >= maxMin) { stopped = c >= maxCost ? `the run's cost cap ($${maxCost}: $${c})` : `the run's wall clock (${maxMin} min)`; append(P.operator, { act: "stop", wave: w, why: stopped }); const ch = L.child; ch.kill("SIGINT"); setTimeout(() => { try { ch.kill("SIGKILL"); } catch {} }, 60_000); endIfStopped(P, w, { why: stopped }); }
        await new Promise((r) => setTimeout(r, poll));
      }
    } else if (!TERMINAL.includes(orderOf(readState(P.live), w)?.stage)) {
      await launch(launcherArgv(P, opt, maxMin - activeMin()));
      endIfStopped(P, w, { why: stopped ?? (TERMINAL.includes(orderOf(readState(P.live), w)?.stage) ? null : `the launcher stopped after ${Math.round(activeMin() - a0)} min`) });
    }
    // the cancelled order's evidence and the architect's retro still run, in a short launcher of their own
    if (!continuous && !stopped && learnOpen(readState(P.live))) { append(P.operator, { act: "retro-launch", wave: w }); await launch(launcherArgv(P, opt, 30)); }
    const minutes = Math.round((activeMin() - a0) * 100) / 100;
    append(P.waves, { event: "wave-end", wave: w, launchesTo: readJsonl(path.join(P.live, "launches.jsonl")).length, minutes, stage: orderOf(readState(P.live), w)?.stage ?? null, stopped });
    out.push(summarizeOrder(P, w));
    if (stopped) { runWhy = stopped; break; }
  }
  // S2: the run is over; the one launcher (an advisory review of the last wave may still run: its findings have no
  // next order) is stopped, recorded
  if (L && !L.exited) {
    const st = readState(P.live), open = mapVals(st?.engine?.orders).flatMap((o) => Object.entries(o.advisory ?? {}).filter(([, a]) => a.state === "open").map(([stage, a]) => `${o.task} ${stage} #${a.n}`));
    append(P.operator, { act: "launcher-stop", why: "the run ended", advisoryOpen: open, backlog: backlogOf(st) });
    L.child.kill("SIGINT"); for (let i = 0; i < 120 && !L.exited; i++) await new Promise((r) => setTimeout(r, 500)); if (!L.exited) { try { L.child.kill("SIGKILL"); } catch {} }
  }
  clock.stop();
  // S2 review (K35): late findings no order took (the last wave's advisory review, held findings flushed at its end)
  // are recorded with the run's end, never lost
  append(P.waves, { event: "run-end", why: runWhy, activeMin: Math.round(activeMin() * 100) / 100, cost: usedCost(), ...(backlogOf(readState(P.live)).length ? { backlog: backlogOf(readState(P.live)) } : {}) });
  return out;
}
/** K35: the late findings in an S state's engine backlog (no next order took them): {from, stage, kind, by, findings}. */
export function backlogOf(st) {
  return (st?.engine?.backlog ?? []).map((b) => ({ from: b.from, stage: b.stage, kind: b.kind, by: b.by, findings: String(b.findings ?? "").slice(0, 2000) }));
}
function summarizeOrder(P, w) {
  const o = orderOf(readState(P.live), w);
  return o ? { wave: w, order: o.id, stage: o.stage, loops: o.loops, owners: o.owners ?? [], workdir: o.workdir ?? null } : { wave: w, order: null };
}

// ---------------------------------------------------------------- tally
/** Cost of a set of launches, one Agent SDK session counted once (a resumed session's result carries its running
 *  total: bench7 dedupCost). */
export function dedupCost(fins) {
  const by = new Map(); let free = { cost: 0, cumulative: 0 };
  for (const f of fins) {
    if (!f.sdk) { free.cost += f.cost ?? 0; free.cumulative += f.cumulative ?? 0; continue; }
    const s = by.get(f.sdk) ?? { base: { cost: 0, cumulative: 0 }, last: { cost: 0, cumulative: 0 } };
    if ((f.cost ?? 0) < s.last.cost) { s.base.cost += s.last.cost; s.base.cumulative += s.last.cumulative; }
    s.last = { cost: f.cost ?? 0, cumulative: f.cumulative ?? 0 };
    by.set(f.sdk, s);
  }
  let c = free.cost, cumulative = free.cumulative;
  for (const s of by.values()) { c += s.base.cost + s.last.cost; cumulative += s.base.cumulative + s.last.cumulative; }
  return { cost: Number(c.toFixed(4)), cumulative, sdkSessions: by.size };
}
const pct = (x) => (x == null ? null : Math.round(x * 1000) / 10);
/** A hidden run's score: overall, the wave's own tests, and per wave. */
const score = (x, wave) => (x ? { ...(x.w7 ? { w7: w7().tallyOf(x) } : {}), pass: x.pass, total: x.total, pct: pct(x.total ? x.pass / x.total : 0), own: x.byWave?.[wave] ? { ...x.byWave[wave], pct: pct(x.byWave[wave].pass / x.byWave[wave].total) } : null, byWave: x.byWave ?? null, failing: x.failing, w6: x.w6?.score ?? null, gate: x.gate ? { regressions: x.gate.regressions, pass: x.gate.pass } : null } : null);
/** K30's routes, applied to any arm's categories (the per-module metric compares S with V on the same mapping). */
export function routeTable(P) {
  try { const s = instantiateSpec(P); return { routes: s.routes ?? [], modules: s.modules ?? {}, triage: s.triage ?? null }; } catch { return { routes: [], modules: {}, triage: null }; }
}
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
export function moduleOf(T, category) {
  const c = norm(category);
  for (const r of T.routes) if (new RegExp(r.match).test(c)) return T.modules[r.owner] ? r.owner : Object.entries(T.modules).find(([, m]) => m.owner === r.owner)?.[0] ?? r.owner;
  return "triage";
}
/** Per module: the failing hidden tests at the wave's first hand-in (of the tests of waves 1..n). */
function byModule(T, cats) {
  const out = {};
  for (const [k, c] of Object.entries(cats ?? {})) { const m = moduleOf(T, k); const x = (out[m] ??= { fail: 0, total: 0 }); x.fail += c.fail; x.total += c.total; }
  for (const x of Object.values(out)) x.pct = pct(x.total ? x.fail / x.total : 0);
  return out;
}
function tallyV(P, T) {
  const rows = readJsonl(P.vledger);
  let prevSid = null, prevCost = 0, prevCum = 0;
  const turnCost = new Map();
  for (const r of rows.filter((x) => x.event === "turn")) {
    const same = r.session && r.session === prevSid && (r.cost ?? 0) >= prevCost;
    turnCost.set(r, { cost: same ? (r.cost ?? 0) - prevCost : (r.cost ?? 0), cumulative: same ? (r.cumulative ?? 0) - prevCum : (r.cumulative ?? 0) });
    prevSid = r.session; prevCost = r.cost ?? 0; prevCum = r.cumulative ?? 0;
  }
  return ALL_WAVES.map((wave) => {
    const r = rows.filter((x) => x.wave === wave); if (!r.length) return null;
    const hs = r.filter((x) => x.event === "hidden" && x.total != null), turns = r.filter((x) => x.event === "turn"), s = r.findLast((x) => x.event === "wave-summary");
    const c = turns.reduce((a, t) => ({ cost: a.cost + turnCost.get(t).cost, cumulative: a.cumulative + turnCost.get(t).cumulative }), { cost: 0, cumulative: 0 });
    return { arm: "V", wave, firstHandin: score(hs[0], wave), final: score(hs.at(-1), wave), rounds: Math.max(0, hs.length - 1), hiddenRuns: hs.length, cost: Number(c.cost.toFixed(4)), cumulative: c.cumulative, minutes: s?.minutes ?? null, turns: turns.length, firstByModule: byModule(T, hs[0]?.categories), done: !!s };
  }).filter(Boolean);
}
function tallyS(P, T) {
  const st = readState(P.live); if (!st) return [];
  const L = readJsonl(path.join(P.live, "launches.jsonl")), acc = readJsonl(P.acceptLog), wv = readJsonl(P.waves);
  const ev = st.log?.events ?? [];
  let pb = null; try { pb = JSON.parse(fs.readFileSync(path.join(P.store, "playbook.json"), "utf8")); } catch {}
  const evidence = readJsonl(path.join(P.store, "evidence.jsonl"));
  return ALL_WAVES.map((wave) => {
    const o = orderOf(st, wave); if (!o) return null;
    const start = wv.find((x) => x.event === "wave-start" && x.wave === wave), end = wv.findLast((x) => x.event === "wave-end" && x.wave === wave);
    const fins = L.slice(start?.launchesFrom ?? 0, end?.launchesTo ?? L.length).filter((x) => x.event === "finish");
    const c = dedupCost(fins);
    const a = acc.filter((x) => x.wave === wave && x.total != null);
    const byRole = {}; for (const f of fins) { const r = (byRole[f.role] ??= { launches: 0, resumed: 0, cost: 0 }); r.launches++; if (f.resumed) r.resumed++; }
    for (const [role, x] of Object.entries(byRole)) x.cost = dedupCost(fins.filter((f) => f.role === role)).cost;
    const hist = o.history ?? [], revises = {}; for (const h of hist) if (h.verdict === "revise" || h.verdict === "reopen") revises[h.stage] = (revises[h.stage] ?? 0) + 1;
    const oe = ev.filter((e) => e.order === o.id);
    const rulesBy = (until) => { const out = {}; for (const r of pb?.rules ?? []) { if (until != null && r.addedMs > until) continue; if (r.status !== "active" && !(r.retiredMs && until != null && r.retiredMs > until)) continue; const k = r.scope?.module ?? r.scope?.role ?? "global"; out[k] = (out[k] ?? 0) + 1; } return out; };
    return {
      arm: P.sarm, wave, order: o.id, stage: o.stage, loops: o.loops,
      firstHandin: score(a[0], wave), final: score(a.at(-1), wave), rounds: Math.max(0, a.length - 1), hiddenRuns: a.length, exhausted: !!a.at(-1)?.exhausted,
      cost: c.cost, cumulative: c.cumulative, minutes: end?.minutes ?? null, launches: fins.length, sessions: c.sdkSessions, byRole, revises,
      integration: { runs: oe.filter((e) => e.type === "integration").length, failed: oe.filter((e) => e.type === "integration" && e.results?.some((x) => !x.pass)).length },
      parts: oe.filter((e) => e.type === "parts").map((e) => e.owners), routed: oe.filter((e) => e.type === "part-route").map((e) => ({ by: e.by, to: e.to, categories: e.categories })),
      changeRequests: ev.filter((e) => e.type === "grant" && e.order === o.id).map((e) => ({ role: e.role, module: e.module, by: e.by })),
      guardDenials: fins.reduce((n, f) => n + (f.denials ?? 0), 0), hookDenials: L.slice(start?.launchesFrom ?? 0, end?.launchesTo ?? L.length).filter((x) => x.event === "hook-deny").length,
      lateBacklog: backlogOf(st).filter((b) => b.from === o.id).map((b) => ({ stage: b.stage, kind: b.kind, lines: b.findings.split("\n").length })), // K35: its late findings no order took
      firstByModule: byModule(T, a[0]?.categories), rulesAtStart: rulesBy(Date.parse((start ?? wv.find((x) => x.event === "place" && x.wave === wave))?.t ?? "") || null), evidence: evidence.filter((e) => e.order === o.id).map((e) => ({ classes: e.classes, modules: e.modules ?? null, owners: e.owners ?? null })),
    };
  }).filter(Boolean);
}
/** The per-module knowledge metric (PREDICTIONS.md P8-9): for each module, its rules at each wave's start (S only)
 *  and the failing fraction of its routed hidden tests at each wave's first hand-in, for S and for V on the same
 *  routes. Knowledge accumulates if S's fraction in a module falls after the module gained rules, more than V's. */
export function knowledge(S, V) {
  const mods = [...new Set([...S, ...V].flatMap((g) => Object.keys(g.firstByModule ?? {})))].sort();
  return mods.map((m) => ({ module: m, waves: WAVES.map((w) => { const s = S.find((g) => g.wave === w), v = V.find((g) => g.wave === w); return { wave: w, sRules: s?.rulesAtStart?.[m] ?? (s ? 0 : null), sFailPct: s?.firstByModule?.[m]?.pct ?? null, vFailPct: v?.firstByModule?.[m]?.pct ?? null }; }).filter((x) => x.sFailPct != null || x.vFailPct != null) }));
}
/** Restarts (PROTOCOL.md "Restarts"): keepalive's `operator: restart` lines (_operator/<arm>/restarts.jsonl), the arm's
 *  own resumes with their downtime (the gap between the dead process's last clock beat and the resume), what each lost
 *  (V: sessions that could not be resumed; S: launches abandoned, and how they went on: warm or cold), and the arm's
 *  active minutes (the caps' clock). */
export function restartsOf(P, arm) {
  const ops = readJsonl(path.join(P.op, arm, "restarts.jsonl")), clock = clockOf(path.join(P.op, arm, "clock.json"));
  const rows = arm === "V" ? readJsonl(P.vledger) : readJsonl(P.waves);
  const own = rows.filter((x) => x.event === "resume" || (x.event === "run-start" && x.resumed));
  const r2 = (x) => Math.round(x * 100) / 100;
  const out = {
    operatorRestarts: ops.filter((x) => x.event === "operator: restart").length,
    resumes: own.length,
    downMin: r2(own.reduce((a, x) => a + (x.downMin ?? 0), 0)),
    keepaliveDownMin: r2(ops.filter((x) => x.event === "operator: restart").reduce((a, x) => a + (x.downMin ?? 0), 0)),
    activeMin: clock ? r2(clock.activeMs / 60000) : null,
    list: own.map((x) => ({ t: x.t, downMin: x.downMin ?? null, wave: x.wave ?? null, ...(arm === "V" ? { round: x.round, point: x.point, session: x.session, sessionFrom: x.sessionFrom } : { abandoned: (x.abandoned ?? []).map((a) => `${a.launch} ${a.reReported ? "re-reported" : a.next}`) }) })),
  };
  if (arm === "V") out.sessionsLost = rows.filter((x) => x.event === "session-lost").length;
  else { const ab = own.flatMap((x) => x.abandoned ?? []).filter((a) => !a.reReported); out.reReported = own.flatMap((x) => x.abandoned ?? []).length - ab.length; out.launchesAbandoned = ab.length; out.warmResumed = ab.filter((a) => /^warm/.test(a.next)).length; out.warmFallbacks = readJsonl(path.join(P.live, "launches.jsonl")).filter((x) => x.event === "warm-fallback").length; out.stageRetries = readJsonl(P.operator).filter((x) => x.act === "retry").length; }
  return out;
}
export function tally(P, opt = {}) {
  const T = routeTable(P), arms = opt.arm ? [opt.arm] : ALL_ARMS;
  const PS = paths({ ...opt, arm: "S" }), PS2 = paths({ ...opt, arm: "S2" });
  const V = arms.includes("V") ? tallyV(P, T) : [], S = arms.includes("S") ? tallyS(PS, T) : [], S2 = arms.includes("S2") ? tallyS(PS2, T) : [];
  const total = (G) => ({ cost: Number(G.reduce((a, g) => a + (g.cost ?? 0), 0).toFixed(2)), minutes: Math.round(G.reduce((a, g) => a + (g.minutes ?? 0), 0) * 10) / 10, w6: G.find((g) => g.wave === "W6")?.final?.w6 ?? null, w7: G.find((g) => g.wave === "W7")?.final?.w7 ?? null });
  // S2: the waves both S runs reached, side by side with V (S1 stopped by the founder at W3)
  const vs = (A) => A.map((g) => { const v = V.find((x) => x.wave === g.wave); return { wave: g.wave, cost: g.cost, vCost: v?.cost ?? null, costRatio: v?.cost ? Math.round((g.cost / v.cost) * 100) / 100 : null, minutes: g.minutes, vMinutes: v?.minutes ?? null, final: g.final?.pct ?? null, vFinal: v?.final?.pct ?? null }; });
  return { V: { waves: V, total: total(V), restarts: restartsOf(P, "V") }, S: { label: S1_LABEL, waves: S, total: total(S), restarts: restartsOf(PS, "S") }, S2: { waves: S2, total: total(S2), restarts: restartsOf(PS2, "S2") }, knowledge: knowledge(S, V), knowledgeS2: knowledge(S2, V), againstV: { S: vs(S), S2: vs(S2) } };
}
function tallyMd(T) {
  const f = (x) => (x ? `${x.pass}/${x.total} (${x.pct}%)${x.own ? `; own ${x.own.pct}%` : ""}${x.w6 != null ? `; W6 ${x.w6}` : ""}${x.w7 ? `; Lua tests ${x.w7.luaTests ?? "-"}%, runtime ${x.w7.runtime ?? "-"}, compile ${x.w7.compileSec ?? "-"} s, RSS ${x.w7.rssMB ?? "-"} MB` : ""}` : "-");
  const L = ["| arm | wave | first hand-in | final | rounds | cost $ | min | sessions |", "|---|---|---|---|---|---|---|---|"];
  for (const a of ALL_ARMS) for (const g of T[a]?.waves ?? []) L.push(`| ${a} | ${g.wave} | ${f(g.firstHandin)} | ${f(g.final)} | ${g.rounds} | ${g.cost} | ${g.minutes ?? "-"} | ${g.sessions ?? 1} |`);
  L.push("", `| arm | total cost $ | total min | W6 score |`, "|---|---|---|---|");
  for (const a of ALL_ARMS.filter((x) => T[x])) L.push(`| ${a}${T[a].label ? ` (${T[a].label})` : ""} | ${T[a].total.cost} | ${T[a].total.minutes} | ${T[a].total.w6 ?? "-"} |`);
  L.push("", "| arm | restarts (keepalive) | resumes | downtime min | active min | lost |", "|---|---|---|---|---|---|");
  for (const a of ALL_ARMS) { const r = T[a]?.restarts; if (r) L.push(`| ${a} | ${r.operatorRestarts} | ${r.resumes} | ${r.downMin} | ${r.activeMin ?? "-"} | ${a === "V" ? `${r.sessionsLost} session(s) not resumable` : `${r.launchesAbandoned} launch(es) abandoned, ${r.warmResumed} warm, ${r.warmFallbacks} fell back cold, ${r.stageRetries} stage retries`} |`); }
  L.push("", "| module | wave | S rules at start | S first hand-in fail % | V first hand-in fail % |", "|---|---|---|---|---|");
  for (const m of T.knowledge) for (const w of m.waves) L.push(`| ${m.module} | ${w.wave} | ${w.sRules ?? "-"} | ${w.sFailPct ?? "-"} | ${w.vFailPct ?? "-"} |`);
  if (T.knowledgeS2?.length) { L.push("", "| module | wave | S2 rules at start | S2 first hand-in fail % | V first hand-in fail % |", "|---|---|---|---|---|"); for (const m of T.knowledgeS2) for (const w of m.waves) L.push(`| ${m.module} | ${w.wave} | ${w.sRules ?? "-"} | ${w.sFailPct ?? "-"} | ${w.vFailPct ?? "-"} |`); }
  if (T.againstV) { L.push("", `| arm | wave | cost $ | V cost $ | cost / V | min | V min | final % | V final % |`, "|---|---|---|---|---|---|---|---|---|"); for (const a of ["S", "S2"]) for (const g of T.againstV[a] ?? []) L.push(`| ${a === "S" ? `S1 (${S1_LABEL})` : a} | ${g.wave} | ${g.cost} | ${g.vCost ?? "-"} | ${g.costRatio ?? "-"} | ${g.minutes ?? "-"} | ${g.vMinutes ?? "-"} | ${g.final ?? "-"} | ${g.vFinal ?? "-"} |`); }
  return L.join("\n");
}

// ---------------------------------------------------------------- audit
/** Content canaries: lines (40+ characters) of the hidden tests that no visible test, header or spec contains. A
 *  session whose tool results first show one read hidden material (one it wrote first itself is its own: the suites
 *  are public, and a model may know a program by heart, which the audit reports apart as `own`). */
export function canaries(P, { max = 4000 } = {}) {
  const read = (f) => { try { return fs.readFileSync(f, "utf8"); } catch { return ""; } };
  const ls = (d) => { try { return fs.readdirSync(d).map((f) => path.join(d, f)); } catch { return []; } };
  const given = [...WAVES.slice(0, 5).flatMap((w) => ls(path.join(P.visible, w))), ...ls(path.join(P.spec, "include")), ...ls(path.join(P.spec, "bench")), ...WAVES.map((w) => path.join(P.spec, `${w}.md`)), path.join(P.spec, "CONTRACT.md")].map(read).join("\n");
  let man = null; try { man = JSON.parse(read(path.join(P.hidden, "manifest.json"))); } catch {}
  const out = new Set();
  for (const t of (man?.tests ?? []).filter((x) => !x.visible)) {
    for (const l of read(path.join(P.hidden, "tests", `${t.id}.c`)).split("\n").map((x) => x.trim())) if (l.length >= 40 && !given.includes(l) && !/^(\/\/|\/\*|\*)/.test(l)) out.add(l);
    if (out.size >= max) break;
  }
  // W7: lines of the hidden Lua test files that no released W7 file holds
  let man7 = null; try { man7 = JSON.parse(read(path.join(P.hidden, "w7", "manifest.json"))); } catch {}
  if (man7) {
    const given7 = ls(path.join(P.visible, "W7")).map(read).join("\n");
    for (const t of man7.tests.filter((x) => !x.visible)) { for (const l of read(path.join(P.hidden, "w7", "tests", t.file)).split("\n").map((x) => x.trim())) if (l.length >= 40 && !given7.includes(l) && !l.startsWith("--")) out.add(l); if (out.size >= max + 2000) break; }
  }
  return { content: [...out], paths: [P.b8, real(P.b8), P.op, "run-hidden", "hidden/manifest.json"] };
}
function transcriptOf(sid, P) {
  // the arms' CLIs run with their box's HOME (pilot fix): their transcripts are there
  const roots = [...(P ? ARMS.map((a) => path.join(boxPaths(P, a).home, ".claude", "projects")) : []), ...cfgDirs().map((r) => path.join(r, "projects"))];
  for (const r of roots) { let ds = []; try { ds = fs.readdirSync(r); } catch { continue; } for (const d of ds) { const f = path.join(r, d, `${sid}.jsonl`); if (fs.existsSync(f)) return f; } }
  return null;
}
/** The arm's sources that name a C compiler or preprocessor run, a network fetch or chibicc's own identifiers. */
function sourceScan(dirs) {
  const RE = /\b(gcc|clang|cc1|tcc|chibicc)\b[^\n]{0,80}\.c\b|ProcessBuilder|clojure\.java\.shell|java\.net\.|HttpClient|HttpURLConnection|urlopen|\bfetch\(|api\.anthropic|x-api-key|anthropic-version|\bslurp\s+"https?:|\bnew_cast\b|\bnew_binary\b|\bcurrent_fn\b|\bstrndup\(|\bconsume_end\b|\bis_typename\b|\bdeclspec\b/;
  const hits = [];
  const walk = (d, rel = "") => { let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } for (const e of es) { if ([".git", "visible", "spec", "node_modules"].includes(e.name)) continue; const p = path.join(d, e.name), r = path.join(rel, e.name); if (e.isDirectory()) walk(p, r); else if (/\.(clj|cljc|edn|sh|mjs|js|py|mk)$|^Makefile$/.test(e.name)) { const t = fs.readFileSync(p, "utf8"); for (const l of t.split("\n")) { const m = RE.exec(l); if (m) { hits.push(`${r}: ${l.trim().slice(0, 140)}`); if (hits.length > 60) return; } } } } };
  for (const d of dirs) walk(d);
  return hits;
}
/** Markers of the upstream suites' own text (hooks mode: the hook, not a mount, keeps the clones away, so the audit
 *  looks for their traces): the suites' names and paths, gcc's copyright header, and the original file names of the
 *  hidden tests (gcc torture `20021118-3.c`, `pr36321.c`, c-testsuite `00042.c`, chibicc's `test/*.c`), which no
 *  released file names (the visible tests are released as w<n>-<k> ids, without their origin). */
/** Does `text` name `needle` as a path (not as the prefix of a longer name: <scratch>/b8 is a prefix of <scratch>/b8-runs)? */
const namesPath = (text, needle) => { for (let i = text.indexOf(needle); i >= 0; i = text.indexOf(needle, i + 1)) if (!/[\w.-]/.test(text[i + needle.length] ?? "")) return true; return false; };
export function upstreamMarkers(P) {
  let man = null; try { man = JSON.parse(fs.readFileSync(path.join(P.hidden, "manifest.json"), "utf8")); } catch {}
  const names = new Set();
  for (const t of man?.tests ?? []) { const b = path.basename(String(t.origin ?? "")); if (/\.c$/.test(b) && b.length >= 7) names.add(b); }
  const words = ["gcc.c-torture", "c-torture/execute", "c-testsuite", "rui314", "single-exec", "Free Software Foundation", "dg-do run", "dg-options", "dg-require", "dg-skip-if", "{ dg-"];
  return { words, names: [...names] };
}
/** Hooks mode's file scan: every text file of the arm's own folders (the released spec/ and visible/ aside) checked for
 *  hidden paths, network words, a C compiler run on C, upstream markers and hidden-test lines (the canaries). */
export function fileScan(P, arm, { C = canaries(P), M = upstreamMarkers(P) } = {}) {
  const dirs = arm === "V" ? [P.V, boxPaths(P, "V").tmp] : [...(fs.existsSync(P.wt) ? fs.readdirSync(P.wt).map((d) => path.join(P.wt, d)) : []), P.scratch, boxPaths(P, P.sarm).tmp];
  const HID = [P.b8, real(P.b8), P.op, P.hidden, "run-hidden", "hidden/manifest", "hidden/tests", "hidden/upstream", REPO_ROOT, path.join(os.homedir(), ".claude"), arm === "V" ? P.S : P.V];
  const NET = /urlopen|\bfetch\(|java\.net\.|HttpClient|HttpURLConnection|https?:\/\/|api\.anthropic|x-api-key|\/dev\/tcp|\bcurl\b|\bwget\b|git (clone|fetch|pull|ls-remote)|pip install|npm (install|i)\b/;
  const CC = /\b(gcc|cc|clang|tcc|chibicc|cpp|cc1)\b[^\n]{0,80}(\.c\b|-x\s*c\b|--language|\s-E\b)/;
  const nameRe = M.names.length ? new RegExp(`(^|[^A-Za-z0-9_-])(${M.names.map((n) => n.replace(/[.+^${}()|[\]\\]/g, "\\$&")).join("|")})`) : null;
  const canary = new Set(C.content);
  const out = { files: 0, hiddenPaths: [], network: [], compiler: [], upstream: [], hiddenText: [] };
  const push = (k, x) => { if (out[k].length < 40) out[k].push(x); };
  const walk = (d, top) => {
    let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if ([".git", "node_modules", ".cpcache"].includes(e.name) || (d === top && ["visible", "spec"].includes(e.name))) continue; walk(p, top); continue; }
      if (!e.isFile()) continue;
      let st; try { st = fs.statSync(p); } catch { continue; } if (st.size > 1 << 20) continue;
      let t; try { t = fs.readFileSync(p, "utf8"); } catch { continue; } if (t.includes("\0")) continue;
      out.files++;
      const rel = path.relative(top, p);
      t.split("\n").forEach((l, i) => {
        const at = `${arm} ${rel}:${i + 1}: ${l.trim().slice(0, 120)}`;
        if (HID.some((h) => namesPath(l, h))) push("hiddenPaths", at);
        if (NET.test(l)) push("network", at);
        if (CC.test(l)) push("compiler", at);
        if (M.words.some((w) => l.includes(w)) || (nameRe && nameRe.test(l))) push("upstream", at);
        if (l.trim().length >= 40 && canary.has(l.trim())) push("hiddenText", at);
      });
    }
  };
  for (const d of dirs) walk(d, d);
  return out;
}
/** Hooks mode's tool-call scan: each logged call (access.jsonl) checked for hidden paths, network words, a C compiler
 *  on C, and upstream markers; allowed and denied calls apart (a denied one is an attempt, an allowed one a hole). */
export function toolScan(P, arm, { M = upstreamMarkers(P) } = {}) {
  const HID = [P.b8, real(P.b8), P.op, "run-hidden", "hidden/manifest", "hidden/tests", "hidden/upstream", REPO_ROOT, path.join(os.homedir(), ".claude")];
  const NET = /https?:\/\/|\b(curl|wget|nc|ncat|socat|ssh|scp|pip3?|npm|npx|uv)\b|git (clone|fetch|pull|ls-remote)|urlopen|\/dev\/tcp/;
  const CC = /(^|[\s;&|(\/])(gcc|cc|clang|tcc|chibicc|cpp|cc1)\b[^\n]{0,120}(\.c\b|-x\s*c\b|--language|\s-E\b)/;
  const names = new Set(M.names);
  const rows = readJsonl(P.access).filter((a) => a.arm === arm);
  const out = { calls: rows.length, denied: rows.filter((a) => a.deny).length, hiddenPaths: [], network: [], compiler: [], upstream: [] };
  for (const a of rows) {
    const w = String(a.what ?? ""), tag = `${a.deny ? "denied" : "ALLOWED"} ${a.via ?? "hook"} ${a.tool}: ${w.slice(0, 140)}`;
    if (HID.some((h) => namesPath(w, h))) out.hiddenPaths.push(tag);
    if (NET.test(w)) out.network.push(tag);
    if (CC.test(w)) out.compiler.push(tag);
    if (M.words.some((x) => w.includes(x)) || w.split(/[\s/'"=]+/).some((x) => names.has(x))) out.upstream.push(tag);
  }
  for (const k of ["hiddenPaths", "network", "compiler", "upstream"]) out[k] = out[k].slice(0, 60);
  out.holes = [...out.hiddenPaths, ...out.network, ...out.compiler, ...out.upstream].filter((x) => x.startsWith("ALLOWED"));
  return out;
}
export function audit(P) {
  const acc = readJsonl(P.access), C = canaries(P), isPath = new Set(C.paths), can = [...C.content, ...C.paths], M = upstreamMarkers(P), mNames = new Set(M.names);
  const shims = [...readJsonl(P.shimLog), ...ARMS.flatMap((a) => readJsonl(boxPaths(P, a).shimLog).map((x) => ({ ...x, arm: a })))];
  const egress = Object.fromEntries(ARMS.map((a) => [a, readJsonl(path.join(P.op, `egress-${a}.jsonl`))]));
  const NETWORDS = /urlopen|fetch\(|java\.net|HttpClient|https?:\/\/|api\.anthropic|x-api-key|\bnc\b|socat|\/dev\/tcp/;
  const sessions = [];
  for (const t of readJsonl(P.vledger).filter((x) => (x.event === "turn" || x.event === "session") && x.session)) sessions.push({ arm: "V", sid: t.session, role: "vanilla" });
  // a session killed with the machine has no finish line with its id: the launcher's `sdk` line (and the restart's
  // finish line, sdkLost) still name it
  for (const f of readJsonl(path.join(P.live, "launches.jsonl")).filter((x) => (x.event === "finish" || x.event === "sdk") && (x.sdk || x.sdkLost))) sessions.push({ arm: P.sarm, sid: f.sdk ?? f.sdkLost, role: f.role });
  const uniq = [...new Map(sessions.map((s) => [s.sid, s])).values()];
  const rows = uniq.map((s) => {
    const logged = acc.filter((a) => a.sid === s.sid), file = transcriptOf(s.sid, P);
    const seen = [], tried = [], own = new Set(), upstream = new Set();
    if (file) for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line) continue; let m; try { m = JSON.parse(line); } catch { continue; }
      const content = m?.message?.content; if (!Array.isArray(content)) continue;
      for (const c of content) {
        const text = c.type === "tool_result" ? JSON.stringify(c.content ?? "") : c.type === "tool_use" ? JSON.stringify(c.input ?? {}) : null;
        if (text == null) continue;
        if (c.type === "tool_use" && (M.words.some((w) => text.includes(w)) || text.split(/[\s/'"=\\]+/).some((x) => mNames.has(x)))) upstream.add(text.slice(0, 140));
        for (const k of can) if (isPath.has(k) ? namesPath(text, k) : text.includes(k)) { if (c.type === "tool_use") { if (isPath.has(k)) tried.push(k.slice(0, 80)); else own.add(k); } else if (!isPath.has(k) && !own.has(k)) seen.push(k.slice(0, 80)); }
      }
    }
    return { ...s, hookCalls: logged.length, denials: logged.filter((a) => a.deny).map((a) => `${a.tool}: ${a.what.slice(0, 120)} (${a.why})`), transcript: file, seen: [...new Set(seen)], tried: [...new Set(tried)], own: own.size, upstream: [...upstream].slice(0, 20) };
  });
  const sDirs = fs.existsSync(P.wt) ? fs.readdirSync(P.wt).map((d) => path.join(P.wt, d)) : [];
  // the isolation each arm ran under (its ledger), and hooks mode's scans of the arm's files and tool calls
  const iso = { V: readJsonl(P.vledger).findLast((x) => x.event === "start")?.isolation ?? null, S: readJsonl(P.waves).findLast((x) => x.event === "isolation")?.isolation ?? null };
  const files = Object.fromEntries(ARMS.map((a) => [a, fileScan(P, a, { C, M })])), tools = Object.fromEntries(ARMS.map((a) => [a, toolScan(P, a, { M })]));
  const scanDirty = ARMS.some((a) => files[a].hiddenPaths.length || files[a].hiddenText.length || files[a].compiler.length || tools[a].holes.length);
  return {
    isolation: iso,
    restarts: Object.fromEntries(ARMS.map((a) => [a, restartsOf(P, a)])),
    fileScan: files, toolScan: tools,
    canaries: C.content.length, sessions: rows.length,
    hookMissing: rows.filter((r) => !r.hookCalls).map((r) => `${r.arm} ${r.role} ${r.sid}`),
    transcriptMissing: rows.filter((r) => !r.transcript).map((r) => `${r.arm} ${r.role} ${r.sid}`),
    denials: rows.flatMap((r) => r.denials.map((d) => `${r.arm} ${r.role}: ${d}`)),
    shimDenials: shims.filter((x) => x.deny).map((x) => `${x.arm} ${x.prog} ${x.args}`.slice(0, 200)),
    shimCalls: Object.fromEntries(ARMS.map((a) => [a, shims.filter((x) => x.arm === a).length])),
    leaks: rows.filter((r) => r.seen.length).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, seen: r.seen.slice(0, 10) })),
    attempts: rows.filter((r) => r.tried.length).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, tried: r.tried })),
    upstreamInToolCalls: rows.filter((r) => r.upstream.length).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, calls: r.upstream })),
    ownCanaryLines: rows.filter((r) => r.own).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, lines: r.own })),
    sources: { V: sourceScan([P.V]), S: sourceScan(sDirs) },
    // pilot fix: the box's egress proxy log (any host but the model API was refused), and network words in tool calls
    egressRefused: Object.fromEntries(ARMS.map((a) => [a, egress[a].filter((x) => !x.allowed).map((x) => x.target).slice(0, 40)])),
    egressAllowed: Object.fromEntries(ARMS.map((a) => [a, egress[a].filter((x) => x.allowed).length])),
    netWords: acc.filter((a) => NETWORDS.test(a.what ?? "")).map((a) => `${a.arm} ${a.tool}: ${String(a.what).slice(0, 140)}${a.deny ? " (denied)" : ""}`).slice(0, 60),
    verdict: !rows.length ? "no sessions recorded (a dry run, or nothing has run)" : rows.every((r) => r.hookCalls && r.transcript && !r.seen.length) && !shims.some((x) => x.deny && !["claude"].includes(x.prog)) && ARMS.every((a) => !egress[a].some((x) => !x.allowed)) && !scanDirty ? `clean: every session ran under the hook, no hidden-test text reached any session, no shim refused a C compile, the egress proxy (box mode) refused nothing, and the file and tool-call scans found no hidden path, hidden-test line, C compile or allowed network call (upstream markers and network words in files are listed for a reader: fileScan.*.upstream, .network)` : "NOT clean (or unverified): see hookMissing, transcriptMissing, leaks, shimDenials, egressRefused, fileScan (hiddenPaths, hiddenText, compiler), toolScan.*.holes",
  };
}

// ---------------------------------------------------------------- selftest: the access rule on fixed calls
export async function selftest(P) {
  const guard = await guardMod(P), cases = [];
  const V = accessRules(P, "V"), S = accessRules(P, "S"), wt = path.join(P.wt, "W1");
  const c = (arm, R, tool, input, cwd, want) => { const d = accessDecision({ tool, input, cwd }, R, guard); cases.push({ arm, tool, what: input.command ?? input.file_path ?? input.path ?? "", deny: d.deny, ok: d.deny === want, why: d.why ?? null }); };
  c("V", V, "Bash", { command: "gcc out.s -o prog && ./prog" }, P.V, false);
  c("V", V, "Bash", { command: "gcc -c t.s -o t.o; gcc t.o -o t -lm" }, P.V, false);
  c("V", V, "Bash", { command: "gcc visible/W1/w1-0001.c -o ref" }, P.V, true);
  c("V", V, "Bash", { command: "cc -E spec/include/stdio.h" }, P.V, true);
  c("V", V, "Bash", { command: "clang -x c - -o x < a.txt" }, P.V, true);
  c("V", V, "Bash", { command: "echo 'int main(){}' | gcc -x c -" }, P.V, true);
  c("V", V, "Bash", { command: "bash -c 'tcc -run t.c'" }, P.V, true);
  c("V", V, "Bash", { command: "timeout 10 /usr/bin/gcc-13 a.c" }, P.V, true);
  c("V", V, "Bash", { command: "curl -sS https://github.com/c-testsuite/c-testsuite" }, P.V, true);
  c("V", V, "Bash", { command: "git clone https://github.com/rui314/chibicc" }, P.V, true);
  c("V", V, "Bash", { command: "claude -p 'write the parser'" }, P.V, true);
  c("V", V, "Bash", { command: "npx @anthropic-ai/claude-code" }, P.V, true);
  c("V", V, "Bash", { command: `cat ${path.join(P.hidden, "manifest.json")}` }, P.V, true);
  c("V", V, "Bash", { command: "cat ../b8/hidden/tests/w1-0002.c" }, P.V, true);
  c("V", V, "Read", { file_path: path.join(P.op, "V", "vanilla.jsonl") }, P.V, true);
  c("V", V, "Read", { file_path: path.join(P.S, "wt", "W1", "src", "ccc", "main.clj") }, P.V, true);
  c("V", V, "Bash", { command: `${P.clj} -m ccc.main -I spec/include visible/W1/w1-0001.c -o /tmp/t.s` }, P.V, false);
  c("V", V, "Write", { file_path: path.join(P.toolchain, "clj-run") }, P.V, true);
  c("V", V, "Write", { file_path: path.join(P.V, "src", "ccc", "main.clj") }, P.V, false);
  c("V", V, "Bash", { command: "git init && git add -A && git commit -m wip" }, P.V, false);
  c("S", S, "Bash", { command: `node ${path.join(P.live, "kernel", "meta.mjs")} room enter --msg=M-1 --role=backend` }, wt, false);
  c("S", S, "Write", { file_path: path.join(P.live, "state.json") }, wt, true);
  c("S", S, "Read", { file_path: path.join(P.V, "src", "ccc", "main.clj") }, wt, true);
  c("S", S, "Bash", { command: "gcc tests/eval/W1/t1.c" }, wt, true);
  c("S", S, "Bash", { command: `${P.clj} -m ccc.main -I spec/include tests/eval/W1/t1.c -o /tmp/t1.s && gcc /tmp/t1.s -o /tmp/t1 && /tmp/t1` }, wt, false);
  c("S", S, "Write", { file_path: path.join(wt, "src", "ccc", "backend", "x86.clj") }, wt, false);
  // pilot fixes
  c("V", V, "Bash", { command: "gcc --language=c -S x.txt -o x.s" }, P.V, true);
  c("V", V, "Bash", { command: "gcc @args.rsp" }, P.V, true);
  c("V", V, "Bash", { command: "gcc --language=assembler -c t.s -o t.o" }, P.V, false);
  c("V", V, "Read", { file_path: "/tmp/claude-code.log" }, P.V, true);
  c("V", V, "Read", { file_path: "/root/.claude.json" }, P.V, true);
  c("V", V, "Bash", { command: "ls /tmp/cc-socks" }, P.V, true);
  c("V", V, "Bash", { command: "cc -c /tmp/t.s -o /tmp/t.o && cat /usr/include/stdio.h | head -1" }, P.V, false);
  c("V", V, "mcp__github__get_file_contents", { owner: "rui314", repo: "chibicc", path: "parse.c" }, P.V, true);
  c("V", V, "Skill", { skill: "x" }, P.V, true);
  // the box's private HOME is the CLI's in box mode; in hooks mode the CLI keeps this process's HOME, and that folder
  // (under the runs' _box) is closed like the rest of the runs folder
  c("V", V, "Read", { file_path: path.join(boxPaths(P, "V").home, ".claude", "x.json") }, P.V, !!hooksMode());
  c("S", S, "Write", { file_path: P.baseline }, wt, true);
  // --isolation=hooks (2026-10-23): no box behind the hook, so it must close by itself what the box hid
  const scratch = path.dirname(P.runs), cfg = path.join(os.homedir(), ".claude");
  for (const [arm, R, cwd] of [["V", V, P.V], ["S", S, wt]]) {
    const other = arm === "V" ? path.join(P.S, "scratch", "notes.md") : path.join(P.V, "src", "ccc", "main.clj");
    const deny = [
      ["Bash", { command: `cat ${path.join(P.hidden, "manifest.json")}` }], ["Read", { file_path: path.join(P.hidden, "tests", "w1-0002.c") }],
      ["Bash", { command: `ls ${path.join(P.hidden, "upstream", "gcc")}` }], ["Grep", { pattern: "abort", path: path.join(P.hidden, "upstream") }],
      ["Read", { file_path: P.runner }], ["Bash", { command: `head ${path.join(P.op, "access.jsonl")}` }], ["Read", { file_path: other }],
      ["Read", { file_path: path.join(REPO_ROOT, "CLAUDE.md") }], ["Bash", { command: `cat ${path.join(REPO_ROOT, "company", "ops", "progress.md")}` }],
      ["Read", { file_path: path.join(cfg, "settings.json") }], ...(hooksMode() ? [["Bash", { command: "cat ~/.claude/settings.json" }], ["Bash", { command: "ls ~" }]] : []),
      ["Read", { file_path: path.join(scratch, "b8-pilot", "README.md") }], ["Glob", { pattern: "**/*.c", path: scratch }], ["Bash", { command: `ls ${scratch}` }],
      ["Bash", { command: "curl -sS https://github.com" }], ["Bash", { command: "wget -q https://example.org/x.tar.gz" }], ["Bash", { command: "git ls-remote https://github.com/c-testsuite/c-testsuite" }],
      ["Bash", { command: "git fetch origin" }], ["Bash", { command: "git pull" }], ["Bash", { command: "pip install pycparser" }], ["Bash", { command: "python3 -m pip install pycparser" }],
      ["Bash", { command: "npm run build" }], ["Bash", { command: "npx tsx x.ts" }], ["Bash", { command: "uv pip install x" }], ["Bash", { command: "nc example.org 80" }],
      ["Bash", { command: "ssh git@github.com" }], ["Bash", { command: "python3 x.py https://raw.githubusercontent.com/x" }], ["Bash", { command: "claude --version" }],
      ["Bash", { command: "gcc probe.c -o probe" }], ["Bash", { command: "/usr/bin/gcc -S t.c" }], ["Bash", { command: "clang -c t.c" }], ["Bash", { command: "tcc -run t.c" }],
      ["Bash", { command: "chibicc t.c" }], ["Bash", { command: "cc -x c -o t t.txt" }],
    ];
    for (const [tool, input] of deny) c(arm, R, tool, input, cwd, true);
    const own = arm === "V" ? P.V : wt;
    for (const [tool, input] of [["Bash", { command: "gcc t.s -o t && ./t" }], ["Bash", { command: "gcc -c t.s -o t.o && gcc t.o -o t" }], ["Read", { file_path: path.join(own, "spec", "CONTRACT.md") }], ["Read", { file_path: path.join(P.toolchain, "VERSIONS.md") }], ["Write", { file_path: path.join(boxPaths(P, arm).tmp, "x.s") }], ["Bash", { command: `${P.clj} -m ccc.main -I spec/include visible/W1/w1-0001.c -o out.s` }]]) c(arm, R, tool, input, cwd, false);
    c(arm, R, "Write", { file_path: path.join(P.toolchain, "VERSIONS.md") }, cwd, true);
  }
  return { isolation: isolationOf(), cases, failed: cases.filter((x) => !x.ok) };
}

// ---------------------------------------------------------------- CLI
async function main() {
  const [cmd] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  // the run's isolation, for this process and every process it starts (the broker, the accept, the launcher, the hook)
  process.env.B8_ISOLATION = ["box-check", "egress"].includes(cmd) ? "box" : isolationOf(opt); // the box's own commands are box mode
  const P = paths(opt);
  if (cmd === "hook") {
    // fail closed (exit 2) on a decision that denies; unreadable input is allowed (a logger first: the audit backstops)
    // fails closed (pilot fix): unreadable input, an unreachable operator log, any error: exit 2 (deny)
    let input = ""; try { input = fs.readFileSync(0, "utf8"); } catch {}
    let j; try { j = JSON.parse(input); } catch { process.stderr.write(DENY_TEXT("a hook input the harness cannot read") + "\n"); process.exit(2); }
    const guard = await guardMod(P), arm = opt.arm === "V" ? "V" : P.sarm;
    const d = accessDecision({ tool: j.tool_name, input: j.tool_input, cwd: j.cwd }, accessRules(P, arm), guard);
    const what = j.tool_input?.command ?? j.tool_input?.file_path ?? j.tool_input?.path ?? j.tool_input?.pattern ?? "";
    const rec = { sid: j.session_id ?? null, role: process.env.META_ROLE ?? null, launch: process.env.META_LAUNCH ?? null, tool: j.tool_name, cwd: j.cwd, what: String(what).slice(0, 300), deny: d.deny, ...(d.deny ? { why: d.why } : {}) };
    if (opt.broker) { const r = await brokerCall(opt.broker, { op: "log", rec }); if (!r?.ok) { process.stderr.write(DENY_TEXT(`the operator's access log is unreachable (${r?.error ?? "no answer"}): denied, the hook fails closed`) + "\n"); process.exit(2); } }
    else { try { append(P.access, { arm, ...rec }); } catch { process.stderr.write(DENY_TEXT("the access log cannot be written: denied") + "\n"); process.exit(2); } }
    if (d.deny) { process.stderr.write(DENY_TEXT(d.why) + "\n"); process.exit(2); }
    process.exit(0);
  }
  if (cmd === "accept") { if (!opt.wave || !opt.dir) { console.error("usage: setup.mjs accept --arm=S --wave=Wn --dir=<workdir>"); process.exit(2); } if (opt.broker) { await acceptClient(P, opt); return; } sAccept(P, opt); return; }
  if (cmd === "broker") { broker(P, opt); return; }
  if (cmd === "egress") { const { egressServer } = await import("./sandbox.mjs"); const arm = isS(opt.arm) ? opt.arm : "V", B = boxPaths(P, arm); egressServer({ sock: B.egress, log: path.join(P.op, `egress-${arm}.jsonl`), uid: B.uid }); return; }
  if (cmd === "preflight" || cmd === "probe") {
    const arm = isS(opt.arm) ? opt.arm : "V";
    const r = cmd === "preflight" ? await preflight(P, arm, opt) : await probe(P, arm, opt);
    append(path.join(P.op, `${cmd}.jsonl`), { event: cmd, ...r });
    console.log(JSON.stringify(r, null, 1)); process.exit(r.ok ? 0 : 1);
  }
  if (cmd === "box-check") { const { check } = await import("./sandbox.mjs"); const r = await check(P, isS(opt.arm) ? opt.arm : "V"); console.log(JSON.stringify(r, null, 1)); process.exit(r.failed.length ? 1 : 0); }
  let out;
  if (cmd === "place") out = sPlace(P, opt);
  else if (cmd === "run") out = await sRun(P, opt);
  else if (cmd === "watch") { const w = WAVES.find((x) => { const o = orderOf(readState(P.live), x); return o && !TERMINAL.includes(o.stage); }); out = w ? { ...summarizeOrder(P, w), stop: endIfStopped(P, w) } : { open: null }; }
  else if (cmd === "tally") { const T = tally(P, opt); if (opt.md) { console.log(tallyMd(T)); return; } out = T; }
  else if (cmd === "audit") out = audit(P);
  else if (cmd === "status") out = Object.fromEntries((opt.arm ? [opt.arm] : ALL_ARMS).map((a) => { const Pa = isS(a) ? paths({ ...opt, arm: a }) : P, pid = readPid(path.join(P.op, a, "arm.pid")); return [a, { ...(a === "V" ? vStatus(readJsonl(P.vledger)) : sStatus(readJsonl(Pa.waves))), ...(a === "S" ? { label: S1_LABEL } : {}), alive: !!pid && procAlive(pid.pid, { match: a === "V" ? ["vanilla-compiler.mjs"] : a === "S2" ? ["setup.mjs", "run", "--arm=S2"] : ["setup.mjs", "run"], boot: pid.boot }), pid: pid?.pid ?? null, clock: clockOf(path.join(P.op, a, "clock.json")), restarts: restartsOf(Pa, a), w7: w7().extStatus(a === "V" ? readJsonl(P.vledger) : readJsonl(Pa.waves), a === "V" ? "V" : "S") }]; }));
  else if (cmd === "selftest") { out = await selftest(P); if (out.failed.length) { console.log(JSON.stringify(out, null, 1)); process.exit(1); } }
  else { console.error("usage: node setup.mjs place|run|watch|accept|hook|tally|audit|selftest … (see the header)"); process.exit(2); }
  console.log(JSON.stringify(out, null, 1));
  if (cmd === "run") process.exit(0); // the broker child would keep the process alive (keepalive.mjs reads a live process as a running arm)
}
if (process.argv[1] && real(process.argv[1]) === real(SELF)) main().catch((e) => { console.error(e.stack ?? e.message); process.exit(1); });
