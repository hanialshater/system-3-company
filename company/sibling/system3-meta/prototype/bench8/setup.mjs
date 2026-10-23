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
//   node setup.mjs watch [--once]                     the observer alone
//   node setup.mjs accept --arm=S --wave=Wn --dir=<workdir> [--runs] [--b8]   the S order's accept cmd (code runs it)
//   node setup.mjs hook --arm=V|S [--runs] [--b8]     PreToolUse command hook (stdin JSON; exit 2 denies)
//   node setup.mjs tally [--arm=V|S] [--md]           per (arm, wave): first hand-in and final hidden pass rate, rounds,
//                                                     cost, tokens, minutes; W6 score; the per-module knowledge metric
//   node setup.mjs audit [--md]                       fairness: hook coverage, denials, shim calls, canaries, sources
//   node setup.mjs selftest                           the access rule on a fixed list of calls (no session)
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

const SELF = fileURLToPath(import.meta.url);
const HERE = path.dirname(SELF);
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const REPO_PROTO = "/home/user/system-3-company/company/sibling/system3-meta/prototype";
export const WAVES = ["W1", "W2", "W3", "W4", "W5", "W6"];
export const ARMS = ["V", "S"];
export const MAX_ROUNDS = 3; // feedback rounds after the first hidden run of a wave, every arm
export const RUN_MIN = 300, RUN_COST = 120; // the caps, every arm: wall clock (min) and cost ($), for the whole run
const DEFAULT_BUDGET = 400_000_000; // cumulative tokens per S order: a runaway cap only (the cost cap is the real one)
const SPEC_FILE = "ccompiler-specialized.json";
const DEFAULT_RUNS = path.join(SCRATCH, "b8-runs");
const HARNESS_FILES = ["setup.mjs", "visible-check.mjs", "contract.mjs"];

export function paths(opt = {}) {
  const b8 = path.resolve(opt.b8 ?? process.env.B8_HOME ?? path.join(SCRATCH, "b8"));
  const runs = path.resolve(opt.runs ?? process.env.B8_RUNS ?? DEFAULT_RUNS);
  const proto = path.resolve(opt.proto ?? (fs.existsSync(path.join(HERE, "..", "meta.mjs")) ? path.join(HERE, "..") : REPO_PROTO));
  const op = path.join(runs, "_operator"), S = path.join(runs, "S");
  return {
    b8, runs, proto, op,
    toolchain: path.join(runs, "toolchain"), clj: path.join(runs, "toolchain", "clj-run"),
    V: path.join(runs, "V"),
    S, repo: path.join(S, "work"), wt: path.join(S, "wt"), live: path.join(S, "live"), store: path.join(S, "store"), scratch: path.join(S, "scratch"), harness: path.join(S, "harness"),
    shim: (arm) => path.join(runs, "_shim", arm, "bin"),
    access: path.join(op, "access.jsonl"), shimLog: path.join(op, "shim.jsonl"),
    vledger: path.join(op, "V", "vanilla.jsonl"),
    results: (arm, wave, k) => path.join(op, arm, "hidden", `${wave}-${k}.json`),
    acceptLog: path.join(op, "S", "accept.jsonl"), waves: path.join(op, "S", "waves.jsonl"), operator: path.join(op, "S", "operator.jsonl"),
    baseline: path.join(op, "S", "integration-baseline.json"),
    runner: path.join(b8, "run-hidden.mjs"), hidden: path.join(b8, "hidden"),
    spec: path.join(b8, "spec"), visible: path.join(b8, "visible"),
  };
}
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
export const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
export const append = (f, x) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.appendFileSync(f, JSON.stringify({ t: new Date().toISOString(), ...x }) + "\n"); };
const real = (p) => { try { return fs.realpathSync(p); } catch { return p; } };
const waveN = (w) => Number(String(w).replace(/^W/i, ""));
const git = (cwd, ...a) => spawnSync("git", ["-C", cwd, ...a], { encoding: "utf8" });
const gitOk = (cwd, ...a) => { const r = git(cwd, ...a); if (r.status !== 0) throw new Error(`git ${a.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout.trim(); };

// ---------------------------------------------------------------- what each wave releases (the same files, every arm)
/** The files the orderer releases with wave `w`, as [published path in the arm's dir, source path]: W1 the contract,
 *  the provided headers, the visible-tests README, W1.md and visible/W1; Wn its doc and visible/Wn; W6 its doc and the
 *  benchmark programs with their expected outputs. */
export function releaseFiles(P, w) {
  const n = waveN(w), out = [];
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
    try { fs.mkdirSync(lock); fs.writeFileSync(path.join(lock, "pid"), String(process.pid)); break; } catch {}
    let pid = null; try { pid = Number(fs.readFileSync(path.join(lock, "pid"), "utf8")); } catch {}
    let alive = false; if (pid) { try { process.kill(pid, 0); alive = true; } catch {} }
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
  const own = arm === "V" ? [P.V] : [P.wt, P.scratch];
  const ro = arm === "V" ? [P.toolchain] : [P.toolchain, P.live, P.repo, P.store];
  const scratch = path.dirname(P.runs);
  const deny = [P.b8, P.runs, P.op, path.join(P.proto, "bench8"), path.join(REPO_PROTO, "bench8"), REPO_ROOT, ...cfgDirs(), ...claudeTmpRoots(P), "/proc"];
  if (scratch !== "/" && scratch !== os.homedir()) deny.push(scratch, path.dirname(scratch));
  if (path.dirname(REPO_ROOT) !== "/") deny.push(path.dirname(REPO_ROOT));
  const both = (l) => [...new Set(l.flatMap((r) => [r, real(r)]))];
  return { arm, own: both([...own, ...ro]), rw: both(own), ro: both(ro), deny: both(deny), cfg: cfgDirs(), tmp: claudeTmpRoots(P) };
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
  return null;
}
const readOnly = (abs, R) => { const ra = realish(abs); return R.ro.some((r) => inside(abs, r) || inside(ra, r)); };
const RO_TEXT = "a read-only folder of the run (the toolchain, the kernel's live dir, the repo's main checkout, the playbook store): only your worktree and scratch are yours to change";
const above = (abs, R) => { const ra = realish(abs); return R.deny.some((d) => (inside(d, abs) || inside(d, ra)) && !R.own.some((o) => inside(o, d))); };
/** The paths one Bash line can reach (bench7's bashReach). */
export function bashReach(cmd, cwd) {
  const out = { paths: [], unresolved: [], recursive: RECURSIVE.test(cmd) };
  const toks = String(cmd).split(/[\s'"=;|&()<>,{}\[\]]+/).filter(Boolean);
  let cur = cwd;
  const res = (t) => path.resolve(cur, t.replace(/^~(?=\/|$)/, os.homedir()));
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (/[$`]/.test(t)) { if (/[/.~]/.test(t.replace(/^\$\w+$/, "")) || /\$\(|`|\$\{|\$(?:HOME|PWD|OLDPWD|TMPDIR)\b/.test(t)) out.unresolved.push(t); continue; }
    if (t === "cd" || t === "pushd") {
      const n = toks[i + 1];
      if (n == null || n.startsWith("-") || /[$`]/.test(n)) { if (n != null && /[$`]/.test(n)) out.unresolved.push(n); cur = n == null ? os.homedir() : null; if (cur == null) out.unresolved.push(`${t} ${n ?? ""}`.trim()); i++; continue; }
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
const NET = /^(curl|wget|nc|ncat|netcat|socat|ssh|scp|sftp|ftp|telnet|aria2c|lynx|w3m|links|elinks|http|https|httpie|xh|apt|apt-get|aptitude|dnf|yum|apk|snap|brew|pip|pip3|pipx|conda|uv|gem|cargo|go|npx|pnpm|yarn|bunx|mvn|gradle|lein|clojure|clj|sdk|coursier|cs)$/;
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
    if (prog === "npm" && words.slice(1).some((w) => ["install", "i", "add", "ci", "exec", "x", "update", "view", "pack", "publish", "init", "create"].includes(w))) return "npm install/exec: no downloads (CONTRACT.md rule 3)";
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
  if (["Agent", "Task", "WebFetch", "WebSearch"].includes(tool)) return { deny: true, why: `${tool}: not one of the arm's tools` };
  const text = WRITERS.includes(tool) ? "" : JSON.stringify(input ?? {});
  if (DENY_WORDS.test(text)) return { deny: true, why: "names a hidden-test file" };
  const at = (f) => path.resolve(cwd, String(f).replace(/^~(?=\/|$)/, os.homedir()));
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
    const b = bashReach(cmd, cwd || process.cwd());
    const bare = cmd.replace(/'[^']*'|"(?:[^"\\]|\\.)*"/g, "''");
    if (WRITE_LINE.test(bare) && b.paths.some((p) => readOnly(p, R))) return { deny: true, why: RO_TEXT };
    for (const m of bare.matchAll(/(?:^|[^0-9&<>])>{1,2}(?!&)\s*([^\s;&|()<>]+)/g)) { const t = bashReach(`${bare.slice(0, m.index)} ${m[1]}`, cwd || process.cwd()).paths.at(-1); if (t && readOnly(t, R)) return { deny: true, why: RO_TEXT }; }
    if (b.unresolved.length) return { deny: true, why: `a path the hook cannot resolve (${b.unresolved[0].slice(0, 60)}): spell paths out, inside your own directory` };
    for (const p of b.paths) { const why = closed(p, R); if (why) return { deny: true, why }; if (b.recursive && above(p, R)) return { deny: true, why: "a recursive command over a folder that holds the benchmark's area" }; }
  }
  return { deny: false };
}
export const DENY_TEXT = (why) => `Benchmark harness: ${why}. Work in your own directory with paths spelled out; gcc only assembles and links your compiler's .s files; no network.`;
export function accessNote(P, { arm, sid, role = null, launch = null, tool, input, cwd, d }) {
  const what = input?.command ?? input?.file_path ?? input?.path ?? input?.pattern ?? input?.notebook_path ?? "";
  append(P.access, { arm, sid: sid ?? null, role, launch, tool, cwd, what: String(what).slice(0, 300), deny: d.deny, ...(d.deny ? { why: d.why } : {}) });
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

// ---- the PATH shims (the backstop for code an agent runs: a script, a Clojure shell-out, a Makefile)
/** <runs>/_shim/<arm>/bin: gcc, cc, clang (and their spellings) pass through to /usr/bin only for assembling and
 *  linking (no C source, no -E, no -x c); cpp, tcc, chibicc, cc1, claude, curl and wget always refuse. Every call is
 *  logged to _operator/shim.jsonl. The env of every arm's session puts this folder first on PATH. */
export function installShims(P, arm) {
  const dir = P.shim(arm); fs.mkdirSync(dir, { recursive: true });
  const log = P.shimLog.replace(/'/g, "");
  const pass = ["gcc", "cc", "clang", "c99", "c89", "g++", "c++", "clang++", "x86_64-linux-gnu-gcc", "gcc-13", "clang-18"];
  const never = ["cpp", "tcc", "chibicc", "cc1", "claude", "curl", "wget", "x86_64-linux-gnu-cpp", "cpp-13"];
  const head = (name) => `#!/bin/sh
# Benchmark 8 shim (${arm}): ${name}
log() { printf '{"t":"%s","arm":"${arm}","prog":"${name}","deny":%s,"args":"%s"}\\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$1" "$(printf '%s ' "$ARGS" | tr -d '"\\\\' | cut -c1-300)" >> '${log}' 2>/dev/null; }
ARGS="$*"
`;
  for (const n of never) fs.writeFileSync(path.join(dir, n), head(n) + `log true\necho "Benchmark harness: ${n} is not available in this benchmark (CONTRACT.md rules 1-3)" >&2\nexit 1\n`, { mode: 0o755 });
  for (const n of pass) {
    const realBin = ["/usr/bin/" + n, "/usr/local/bin/" + n].find((f) => fs.existsSync(f)) ?? "/usr/bin/gcc";
    fs.writeFileSync(path.join(dir, n), head(n) + `prev=""
for a in "$@"; do
  case "$prev" in -o|-L|-l|-I|-D|-U|-MF|-MT|-T|-Xlinker|-Xassembler|-z) prev=""; continue;; -x) case "$a" in assembler|none) ;; *) log true; echo "Benchmark harness: ${n} -x $a compiles C: gcc only assembles and links your compiler's .s (CONTRACT.md rule 2)" >&2; exit 1;; esac; prev=""; continue;; esac
  case "$a" in
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
/** An arm's session env: PATH with the shims first, no proxy for child Java, nothing of this session's identity. */
export function armEnv(P, arm, base = process.env) {
  const env = { ...base, PATH: `${P.shim(arm)}:${base.PATH ?? "/usr/bin:/bin"}` };
  for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING", "NODE_TEST_CONTEXT", "B8_HOME", "B8_RUNS", "META_ROLE", "META_LAUNCH", "META_STATE", "META_LIVE_DIR"]) delete env[k];
  return env;
}

// ---------------------------------------------------------------- S: place a wave
const metaEnv = (P) => { const env = { ...process.env, META_LIVE_DIR: P.live }; for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT", "META_STATE"]) delete env[x]; return env; };
export const metaCli = (P, ...a) => { const r = spawnSync(process.execPath, [path.join(P.proto, "meta.mjs"), ...a], { env: metaEnv(P), encoding: "utf8" }); if (r.status !== 0) throw new Error(`meta.mjs ${a.slice(0, 2).join(" ")}: ${(r.stderr || r.stdout).slice(0, 600)}`); try { return JSON.parse(r.stdout); } catch { return r.stdout; } };
export function readState(live) {
  for (let i = 0; i < 5; i++) { try { return JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8")); } catch { spawnSync("sleep", ["0.2"]); } }
  return null;
}
const mapVals = (m) => (m?.__map ?? []).map(([, v]) => v);
export const orderOf = (st, wave) => mapVals(st?.engine?.orders).filter((o) => o.task === wave).at(-1) ?? null;
const TERMINAL = ["done", "cancelled"];
/** The spec, with the default runs root replaced by this run's (the committed spec names the default layout). */
export function instantiateSpec(P) {
  let t = fs.readFileSync(path.join(P.proto, "specs", SPEC_FILE), "utf8");
  if (P.runs !== DEFAULT_RUNS) t = t.split(DEFAULT_RUNS).join(P.runs);
  if (P.b8 !== path.join(SCRATCH, "b8")) t = t.split(path.join(SCRATCH, "b8")).join(P.b8);
  return JSON.parse(t);
}
export const waveAccept = (w) => `Wave ${w} of the C-subset compiler (in Clojure, x86-64 GNU as). Read spec/CONTRACT.md (what never changes) and spec/${w}.md (this wave's exact scope) in the order's worktree; ${waveN(w) <= 5 ? `visible/${w}/ holds about a quarter of this wave's tests with their expected outputs` : "spec/bench/ holds the 8 benchmark programs with their expected outputs"}. The integration check after each hand-in runs the visible tests of waves 1..${Math.min(waveN(w), 5)}${waveN(w) === 6 ? " and the benchmarks" : ""}: a visible test that passed at the last passing check and fails now is a regression, routed back. After the evaluation, code runs the orderer's hidden runner on the worktree: it scores the hidden tests of waves 1..${Math.min(waveN(w), 5)}${waveN(w) === 6 ? ", times the hidden benchmark variants against gcc -O0 and applies the regression gate" : ""}, and a failure comes back as a revise naming only the failing categories, one line each: \`W3 structs: 12 of 40 fail\`. Three such feedback rounds at most; then the wave ends with what is there.`;

function sPlace(P, opt) {
  const w = String(opt.wave ?? "W1").toUpperCase();
  if (!WAVES.includes(w)) throw new Error("--wave=W1..W6");
  const k = WAVES.indexOf(w);
  for (const f of [P.runner, path.join(P.hidden, "manifest.json"), path.join(P.proto, "meta.mjs"), path.join(P.proto, "launcher", "launch.mjs"), path.join(P.proto, "specs", SPEC_FILE)]) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
  const st0 = fs.existsSync(path.join(P.live, "state.json")) ? readState(P.live) : null;
  if (k === 0) {
    if (st0 || (fs.existsSync(P.S) && fs.readdirSync(P.S).length)) throw new Error(`${P.S} exists: S's W1 starts a fresh run (move it aside)`);
    ensureToolchain(P); installShims(P, "S");
    for (const d of [P.repo, P.wt, P.live, P.store, P.scratch, P.harness, path.join(P.op, "S")]) fs.mkdirSync(d, { recursive: true });
    for (const f of HARNESS_FILES) fs.copyFileSync(path.join(HERE, f), path.join(P.harness, f));
    gitOk(P.repo, "init", "-q", "-b", "main"); gitOk(P.repo, "config", "user.email", "orderer@b8.invalid"); gitOk(P.repo, "config", "user.name", "B8 orderer");
    fs.writeFileSync(path.join(P.repo, "README.md"), "# The C-subset compiler (Benchmark 8)\n\nThe orderer's repository. `spec/` and `visible/` are the orderer's files; each wave is released here and worked in its own worktree.\n");
    gitOk(P.repo, "add", "-A"); gitOk(P.repo, "commit", "-q", "-m", "orderer: the repository");
    const spec = instantiateSpec(P), specFile = path.join(P.op, "S", "spec.json");
    fs.writeFileSync(specFile, JSON.stringify(spec, null, 1) + "\n");
    metaCli(P, "init", `--spec-file=${specFile}`, `--vars=${JSON.stringify({ playbook_store: P.store })}`);
  } else {
    if (!st0) throw new Error(`${P.live} has no run: place W1 first`);
    const prev = orderOf(st0, WAVES[k - 1]);
    if (!prev || !TERMINAL.includes(prev.stage)) throw new Error(`S ${WAVES[k - 1]} has not ended (${prev?.stage ?? "not placed"}): waves run in order`);
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
  const acceptCmd = ["node", path.join(P.harness, "setup.mjs"), "accept", "--arm=S", `--wave=${w}`, "--dir=${workdir}", `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.proto}`, `--max-rounds=${Number(opt["max-rounds"] ?? MAX_ROUNDS)}`];
  const budget = Number(opt.budget ?? DEFAULT_BUDGET);
  const o = metaCli(P, "order", "new", "--by=founder", "--to=architect", `--title=${w}: the compiler, wave ${waveN(w)}`, `--task=${w}`, `--accept=${waveAccept(w)}`, `--accept-cmd=${JSON.stringify(acceptCmd)}`, `--budget=${budget}`);
  const rec = { event: "place", wave: w, order: o.order, stage: o.stage, main: head, release: rel.sha, files: rel.files.length, budget, maxRounds: Number(opt["max-rounds"] ?? MAX_ROUNDS), kernelHead: spawnSync("git", ["-C", P.proto, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim() || null };
  append(P.waves, rec);
  return { ...rec, run: `node ${SELF} run --waves=${w}` };
}

// ---------------------------------------------------------------- S: the order's accept (code runs it)
/** The S order's accept stage: the hidden run of waves 1..n on the worktree, its failing categories as `failed: ` lines
 *  and the categories it checked. The (1 + max-rounds)-th failing run of a wave exits 3 (a stage error: no revise is
 *  sent) and marks the wave's rounds as spent; the observer then ends the order, as V's harness ends a wave after its
 *  third feedback round. A runner error exits 3 too, recorded, and spends nothing. */
function sAccept(P, opt) {
  const w = String(opt.wave).toUpperCase(), dir = path.resolve(opt.dir), maxRounds = Number(opt["max-rounds"] ?? MAX_ROUNDS);
  const prior = readJsonl(P.acceptLog).filter((x) => x.wave === w && x.total != null);
  if (prior.length && prior.at(-1).exhausted) { console.log("# this wave's feedback rounds are spent: the orderer ends it"); process.exit(3); }
  const results = nextResults(P, "S", w), gate = waveN(w) === 6 ? lastResults(P, "S", "W5") : null;
  const t0 = Date.now(), r = hidden(P, w, dir, { results, gate });
  if (r.error) { append(P.acceptLog, { wave: w, dir, error: r.error }); console.log(r.error); process.exit(3); }
  const head = git(dir, "rev-parse", "HEAD").stdout.trim() || null, dirty = !!git(dir, "status", "--porcelain").stdout.trim();
  const exhausted = r.anyFail && prior.length >= maxRounds;
  append(P.acceptLog, { wave: w, dir, head, dirty, k: prior.length + 1, pass: r.pass, total: r.total, rate: r.rate, byWave: r.byWave, categories: r.categories, failing: r.failing, feedback: r.feedback, gate: r.gate, w6: r.w6, failStages: r.failStages, cheat: r.cheat, results, ms: Date.now() - t0, exhausted });
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
  const hook = JSON.stringify([process.execPath, path.join(P.harness, "setup.mjs"), "hook", "--arm=S", `--runs=${P.runs}`, `--b8=${P.b8}`, `--proto=${P.proto}`]);
  return [process.execPath, path.join(P.proto, "launcher", "launch.mjs"), `--live=${P.live}`, "--workdir-from=order", `--max-parallel=${opt["max-parallel"] ?? 4}`, `--max-min=${Math.max(1, Math.floor(maxMin))}`, `--pretool-hook=${hook}`, ...(opt.model ? [`--model=${opt.model}`] : [])];
}
const learnOpen = (st) => !!st?.data?.learn && (!st.data.learn.closed || st.data.learn.retros?.some((x) => x.state === "open"));
async function sRun(P, opt) {
  const waves = String(opt.waves ?? WAVES.join(",")).split(/[,.]+/).filter(Boolean).map((x) => x.toUpperCase());
  const maxMin = Number(opt["max-min"] ?? RUN_MIN), maxCost = Number(opt["max-cost"] ?? RUN_COST), poll = Number(opt.poll ?? 5) * 1000;
  // the caps are for the whole run: time already used by earlier waves (waves.jsonl) counts
  const used = readJsonl(P.waves).filter((x) => x.event === "wave-end").reduce((a, x) => a + (x.minutes ?? 0), 0);
  if (opt["dry-run"]) return { dry: true, launcher: launcherArgv(P, opt, maxMin - used), env: { PATH: armEnv(P, "S").PATH.split(":").slice(0, 2).join(":") + ":…" }, caps: { maxMin, maxCost, usedMin: used }, observe: fs.existsSync(path.join(P.live, "state.json")) ? summarizeOrder(P, waves[0]) : null };
  const out = [];
  for (const w of waves) {
    const st = fs.existsSync(path.join(P.live, "state.json")) ? readState(P.live) : null;
    if (!orderOf(st, w)) out.push(sPlace(P, { ...opt, wave: w }));
    const left = maxMin - readJsonl(P.waves).filter((x) => x.event === "wave-end").reduce((a, x) => a + (x.minutes ?? 0), 0);
    if (left <= 0 || cost(P).cost >= maxCost) { endIfStopped(P, w, { why: left <= 0 ? `the run's wall clock (${maxMin} min)` : `the run's cost cap ($${maxCost})` }); append(P.waves, { event: "stop", wave: w, why: "caps" }); break; }
    const t0 = Date.now(), lines0 = readJsonl(path.join(P.live, "launches.jsonl")).length;
    append(P.waves, { event: "wave-start", wave: w, launchesFrom: lines0, leftMin: left });
    let stopped = null;
    const launch = async (argv) => {
      const fd = fs.openSync(path.join(P.op, "S", "launcher.out"), "a");
      const child = spawn(argv[0], argv.slice(1), { env: armEnv(P, "S"), stdio: ["ignore", fd, fd] });
      let exited = false; child.on("exit", () => { exited = true; });
      while (!exited) {
        endIfStopped(P, w);
        const c = cost(P).cost, mins = (Date.now() - t0) / 60000;
        if (!stopped && (c >= maxCost || mins >= left)) { stopped = c >= maxCost ? `the run's cost cap ($${maxCost}: $${c})` : `the run's wall clock (${maxMin} min)`; append(P.operator, { act: "stop", wave: w, why: stopped }); child.kill("SIGINT"); setTimeout(() => { try { child.kill("SIGKILL"); } catch {} }, 60_000); }
        await new Promise((r) => setTimeout(r, poll));
      }
    };
    await launch(launcherArgv(P, opt, left));
    endIfStopped(P, w, { why: stopped ?? (TERMINAL.includes(orderOf(readState(P.live), w)?.stage) ? null : `the launcher stopped after ${Math.round((Date.now() - t0) / 60000)} min`) });
    // the cancelled order's evidence and the architect's retro still run, in a short launcher of their own
    if (!stopped && learnOpen(readState(P.live))) { append(P.operator, { act: "retro-launch", wave: w }); await launch(launcherArgv(P, opt, 30)); }
    const minutes = Math.round((Date.now() - t0) / 600) / 100;
    append(P.waves, { event: "wave-end", wave: w, launchesTo: readJsonl(path.join(P.live, "launches.jsonl")).length, minutes, stage: orderOf(readState(P.live), w)?.stage ?? null, stopped });
    out.push(summarizeOrder(P, w));
    if (stopped) break;
  }
  return out;
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
const score = (x, wave) => (x ? { pass: x.pass, total: x.total, pct: pct(x.total ? x.pass / x.total : 0), own: x.byWave?.[wave] ? { ...x.byWave[wave], pct: pct(x.byWave[wave].pass / x.byWave[wave].total) } : null, byWave: x.byWave ?? null, failing: x.failing, w6: x.w6?.score ?? null, gate: x.gate ? { regressions: x.gate.regressions, pass: x.gate.pass } : null } : null);
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
  return WAVES.map((wave) => {
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
  return WAVES.map((wave) => {
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
      arm: "S", wave, order: o.id, stage: o.stage, loops: o.loops,
      firstHandin: score(a[0], wave), final: score(a.at(-1), wave), rounds: Math.max(0, a.length - 1), hiddenRuns: a.length, exhausted: !!a.at(-1)?.exhausted,
      cost: c.cost, cumulative: c.cumulative, minutes: end?.minutes ?? null, launches: fins.length, sessions: c.sdkSessions, byRole, revises,
      integration: { runs: oe.filter((e) => e.type === "integration").length, failed: oe.filter((e) => e.type === "integration" && e.results?.some((x) => !x.pass)).length },
      parts: oe.filter((e) => e.type === "parts").map((e) => e.owners), routed: oe.filter((e) => e.type === "part-route").map((e) => ({ by: e.by, to: e.to, categories: e.categories })),
      changeRequests: ev.filter((e) => e.type === "grant" && e.order === o.id).map((e) => ({ role: e.role, module: e.module, by: e.by })),
      guardDenials: fins.reduce((n, f) => n + (f.denials ?? 0), 0), hookDenials: L.slice(start?.launchesFrom ?? 0, end?.launchesTo ?? L.length).filter((x) => x.event === "hook-deny").length,
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
export function tally(P, opt = {}) {
  const T = routeTable(P), arms = opt.arm ? [opt.arm] : ARMS;
  const V = arms.includes("V") ? tallyV(P, T) : [], S = arms.includes("S") ? tallyS(P, T) : [];
  const total = (G) => ({ cost: Number(G.reduce((a, g) => a + (g.cost ?? 0), 0).toFixed(2)), minutes: Math.round(G.reduce((a, g) => a + (g.minutes ?? 0), 0) * 10) / 10, w6: G.find((g) => g.wave === "W6")?.final?.w6 ?? null });
  return { V: { waves: V, total: total(V) }, S: { waves: S, total: total(S) }, knowledge: knowledge(S, V) };
}
function tallyMd(T) {
  const f = (x) => (x ? `${x.pass}/${x.total} (${x.pct}%)${x.own ? `; own ${x.own.pct}%` : ""}${x.w6 != null ? `; W6 ${x.w6}` : ""}` : "-");
  const L = ["| arm | wave | first hand-in | final | rounds | cost $ | min | sessions |", "|---|---|---|---|---|---|---|---|"];
  for (const a of ["V", "S"]) for (const g of T[a].waves) L.push(`| ${a} | ${g.wave} | ${f(g.firstHandin)} | ${f(g.final)} | ${g.rounds} | ${g.cost} | ${g.minutes ?? "-"} | ${g.sessions ?? 1} |`);
  L.push("", `| arm | total cost $ | total min | W6 score |`, "|---|---|---|---|");
  for (const a of ["V", "S"]) L.push(`| ${a} | ${T[a].total.cost} | ${T[a].total.minutes} | ${T[a].total.w6 ?? "-"} |`);
  L.push("", "| module | wave | S rules at start | S first hand-in fail % | V first hand-in fail % |", "|---|---|---|---|---|");
  for (const m of T.knowledge) for (const w of m.waves) L.push(`| ${m.module} | ${w.wave} | ${w.sRules ?? "-"} | ${w.sFailPct ?? "-"} | ${w.vFailPct ?? "-"} |`);
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
  return { content: [...out], paths: [P.b8, real(P.b8), P.op, "run-hidden", "hidden/manifest.json"] };
}
function transcriptOf(sid) {
  const roots = cfgDirs().map((r) => path.join(r, "projects"));
  for (const r of roots) { let ds = []; try { ds = fs.readdirSync(r); } catch { continue; } for (const d of ds) { const f = path.join(r, d, `${sid}.jsonl`); if (fs.existsSync(f)) return f; } }
  return null;
}
/** The arm's sources that name a C compiler or preprocessor run, a network fetch or chibicc's own identifiers. */
function sourceScan(dirs) {
  const RE = /\b(gcc|clang|cc1|tcc|chibicc)\b[^\n]{0,80}\.c\b|ProcessBuilder|clojure\.java\.shell|java\.net\.(URL|http|Socket)|\bslurp\s+"https?:|\bnew_cast\b|\bnew_binary\b|\bcurrent_fn\b|\bstrndup\(|\bconsume_end\b|\bis_typename\b|\bdeclspec\b/;
  const hits = [];
  const walk = (d, rel = "") => { let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } for (const e of es) { if ([".git", "visible", "spec", "node_modules"].includes(e.name)) continue; const p = path.join(d, e.name), r = path.join(rel, e.name); if (e.isDirectory()) walk(p, r); else if (/\.(clj|cljc|edn|sh|mjs|js|py|mk)$|^Makefile$/.test(e.name)) { const t = fs.readFileSync(p, "utf8"); for (const l of t.split("\n")) { const m = RE.exec(l); if (m) { hits.push(`${r}: ${l.trim().slice(0, 140)}`); if (hits.length > 60) return; } } } } };
  for (const d of dirs) walk(d);
  return hits;
}
export function audit(P) {
  const acc = readJsonl(P.access), shims = readJsonl(P.shimLog), C = canaries(P), isPath = new Set(C.paths), can = [...C.content, ...C.paths];
  const sessions = [];
  for (const t of readJsonl(P.vledger).filter((x) => x.event === "turn" && x.session)) sessions.push({ arm: "V", sid: t.session, role: "vanilla" });
  for (const f of readJsonl(path.join(P.live, "launches.jsonl")).filter((x) => x.event === "finish" && x.sdk)) sessions.push({ arm: "S", sid: f.sdk, role: f.role });
  const uniq = [...new Map(sessions.map((s) => [s.sid, s])).values()];
  const rows = uniq.map((s) => {
    const logged = acc.filter((a) => a.sid === s.sid), file = transcriptOf(s.sid);
    const seen = [], tried = [], own = new Set();
    if (file) for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line) continue; let m; try { m = JSON.parse(line); } catch { continue; }
      const content = m?.message?.content; if (!Array.isArray(content)) continue;
      for (const c of content) {
        const text = c.type === "tool_result" ? JSON.stringify(c.content ?? "") : c.type === "tool_use" ? JSON.stringify(c.input ?? {}) : null;
        if (text == null) continue;
        for (const k of can) if (text.includes(k)) { if (c.type === "tool_use") { if (isPath.has(k)) tried.push(k.slice(0, 80)); else own.add(k); } else if (!isPath.has(k) && !own.has(k)) seen.push(k.slice(0, 80)); }
      }
    }
    return { ...s, hookCalls: logged.length, denials: logged.filter((a) => a.deny).map((a) => `${a.tool}: ${a.what.slice(0, 120)} (${a.why})`), transcript: file, seen: [...new Set(seen)], tried: [...new Set(tried)], own: own.size };
  });
  const sDirs = fs.existsSync(P.wt) ? fs.readdirSync(P.wt).map((d) => path.join(P.wt, d)) : [];
  return {
    canaries: C.content.length, sessions: rows.length,
    hookMissing: rows.filter((r) => !r.hookCalls).map((r) => `${r.arm} ${r.role} ${r.sid}`),
    transcriptMissing: rows.filter((r) => !r.transcript).map((r) => `${r.arm} ${r.role} ${r.sid}`),
    denials: rows.flatMap((r) => r.denials.map((d) => `${r.arm} ${r.role}: ${d}`)),
    shimDenials: shims.filter((x) => x.deny).map((x) => `${x.arm} ${x.prog} ${x.args}`.slice(0, 200)),
    shimCalls: Object.fromEntries(ARMS.map((a) => [a, shims.filter((x) => x.arm === a).length])),
    leaks: rows.filter((r) => r.seen.length).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, seen: r.seen.slice(0, 10) })),
    attempts: rows.filter((r) => r.tried.length).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, tried: r.tried })),
    ownCanaryLines: rows.filter((r) => r.own).map((r) => ({ arm: r.arm, role: r.role, sid: r.sid, lines: r.own })),
    sources: { V: sourceScan([P.V]), S: sourceScan(sDirs) },
    verdict: !rows.length ? "no sessions recorded (a dry run, or nothing has run)" : rows.every((r) => r.hookCalls && r.transcript && !r.seen.length) && !shims.some((x) => x.deny && !["claude"].includes(x.prog)) ? "clean: every session ran under the hook, no hidden-test text reached any session, and no shim refused a C compile" : "NOT clean (or unverified): see hookMissing, transcriptMissing, leaks, shimDenials",
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
  return { cases, failed: cases.filter((x) => !x.ok) };
}

// ---------------------------------------------------------------- CLI
async function main() {
  const [cmd] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  const P = paths(opt);
  if (cmd === "hook") {
    // fail closed (exit 2) on a decision that denies; unreadable input is allowed (a logger first: the audit backstops)
    let input = ""; try { input = fs.readFileSync(0, "utf8"); } catch {}
    let j; try { j = JSON.parse(input); } catch { process.exit(0); }
    const guard = await guardMod(P), arm = opt.arm === "V" ? "V" : "S";
    const d = accessDecision({ tool: j.tool_name, input: j.tool_input, cwd: j.cwd }, accessRules(P, arm), guard);
    try { accessNote(P, { arm, sid: j.session_id, role: process.env.META_ROLE ?? null, launch: process.env.META_LAUNCH ?? null, tool: j.tool_name, input: j.tool_input, cwd: j.cwd, d }); } catch {}
    if (d.deny) { process.stderr.write(DENY_TEXT(d.why) + "\n"); process.exit(2); }
    process.exit(0);
  }
  if (cmd === "accept") { if (!opt.wave || !opt.dir) { console.error("usage: setup.mjs accept --arm=S --wave=Wn --dir=<workdir>"); process.exit(2); } sAccept(P, opt); return; }
  let out;
  if (cmd === "place") out = sPlace(P, opt);
  else if (cmd === "run") out = await sRun(P, opt);
  else if (cmd === "watch") { const w = WAVES.find((x) => { const o = orderOf(readState(P.live), x); return o && !TERMINAL.includes(o.stage); }); out = w ? { ...summarizeOrder(P, w), stop: endIfStopped(P, w) } : { open: null }; }
  else if (cmd === "tally") { const T = tally(P, opt); if (opt.md) { console.log(tallyMd(T)); return; } out = T; }
  else if (cmd === "audit") out = audit(P);
  else if (cmd === "selftest") { out = await selftest(P); if (out.failed.length) { console.log(JSON.stringify(out, null, 1)); process.exit(1); } }
  else { console.error("usage: node setup.mjs place|run|watch|accept|hook|tally|audit|selftest … (see the header)"); process.exit(2); }
  console.log(JSON.stringify(out, null, 1));
}
if (process.argv[1] && real(process.argv[1]) === real(SELF)) main().catch((e) => { console.error(e.stack ?? e.message); process.exit(1); });
