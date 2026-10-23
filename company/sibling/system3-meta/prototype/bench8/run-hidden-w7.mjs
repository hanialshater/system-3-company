#!/usr/bin/env node
// Benchmark 8: the W7 hidden runner ("compile real software": Lua 5.4.7). Installed as <b8>/run-hidden-w7.mjs (a copy of
// bench8/run-hidden-w7.mjs) beside <b8>/run-hidden.mjs, which it runs first for the W1-W5 regression part.
//   node run-hidden-w7.mjs --dir=<arm compiler dir> [--results=<file>] [--jobs=4] [--reps=5] [--keep]
//   operator-only: [--no-w15] (skip the hidden W1-W5 part) [--cmd=<script> --cmd-dir=<dir>] (another compiler behind
//        the contract's arguments, as run-hidden.mjs) [--cmd-unboxed] (run that compiler outside the sandbox: gcc as the
//        "arm", whose cc1 the compile sandbox hides) [--no-refs] (skip timing gcc -O2's and chibicc's Lua)
// What it does (spec/W7.md):
//   1. W1-W5: `run-hidden.mjs --wave=W5` on the same dir (the hidden W1-W5 tests stay in scope as regressions);
//   2. build: the arm's compiler compiles Lua's 33 sources (spec/w7/build.json: -I spec/w7/include -I spec/w7/lua
//      -D LUA_COMPAT_5_3 -D LUA_USE_POSIX) in ONE batch (one JVM), timed, with the compile's peak RSS; each .s is
//      checked (no gcc/clang .ident, no .incbin/.include); `gcc *.s -o lua -lm` links them;
//   3. sanity: the arm's lua must print a fixed line and must fail an `assert(false)` (else every W7 test fails);
//   4. tests: each hidden file of Lua's test suite (testes/, `w7test.lua full <file>`) in a fresh copy of the tests'
//      directory, empty stdin (a pipe), limit max(30 s, 20 x gcc -O0's time); passes on exit 0 and the line
//      `W7-TEST-OK <file>`;
//   5. runtime: 6 hidden Lua benchmark variants, serially, the arm's lua and gcc -O0's interleaved (and gcc -O2's and
//      chibicc's, as references), REPS times each (chibicc's once), medians; ratio = arm / gcc -O0 (a failure counts 20); the score is
//      the geometric mean;
// and prints ONLY category lines, totals, the build, benchmark, score and compile lines, and a JSON summary last.
// The sandbox is run-hidden.mjs's (unshare: mount, pid, net namespaces; nobody; ro root; empty /tmp; no network; the
// compile step without cc1 or clang).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH_B8 = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8";
const B8 = path.resolve(process.env.B8_HOME ?? (fs.existsSync(path.join(HERE, "hidden", "manifest.json")) ? HERE : SCRATCH_B8));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const die = (m, code = 2) => { console.error(m); process.exit(code); };
if (!opt.dir || !fs.statSync(opt.dir, { throwIfNoEntry: false })?.isDirectory()) die("--dir=<arm compiler dir>");
const JOBS = Number(opt.jobs ?? Math.min(4, os.cpus().length));
const REPS = Number(opt.reps ?? 5);
const PENALTY = 20;
const CATS = ["language", "libraries", "runtime", "io-os"];
const H7 = path.join(B8, "hidden", "w7");
const man = JSON.parse(fs.readFileSync(path.join(H7, "manifest.json"), "utf8"));
const build = JSON.parse(fs.readFileSync(path.join(B8, "spec", "w7", "build.json"), "utf8"));
// ---- helpers (run-hidden.mjs's, with an empty stdin pipe: Lua's files.lua seeks stdin) ----
function run(cmd, args, { cwd, timeout = 10000, maxOut = 4 << 20, env = { PATH: "/usr/bin:/bin" } } = {}) {
  return new Promise((resolve) => {
    const t0 = process.hrtime.bigint();
    const ch = spawn(cmd, args, { cwd, env, stdio: ["pipe", "pipe", "pipe"], detached: true });
    ch.stdin.on("error", () => {}); ch.stdin.end();
    const out = []; let n = 0, timedOut = false, overflow = false, errN = 0; const err = [];
    const kill = () => { try { process.kill(-ch.pid, "SIGKILL"); } catch {} };
    const timer = setTimeout(() => { timedOut = true; kill(); }, timeout);
    ch.stdout.on("data", (d) => { n += d.length; if (n > maxOut) { overflow = true; kill(); } else out.push(d); });
    ch.stderr.on("data", (d) => { if (errN < 8192) { err.push(d); errN += d.length; } });
    ch.on("error", () => {});
    ch.on("close", (code, signal) => { clearTimeout(timer); resolve({ code, signal, stdout: Buffer.concat(out).toString("latin1"), stderr: Buffer.concat(err).toString(), ms: Number(process.hrtime.bigint() - t0) / 1e6, timedOut, overflow }); });
  });
}
async function pool(items, n, fn) { let i = 0; await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } })); }
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const r3 = (x) => Math.round(x * 1000) / 1000;

// ---- 1. the hidden W1-W5 tests (run-hidden.mjs --wave=W5) ----
let w15 = null, w15Lines = [];
if (!opt["no-w15"]) {
  const argv = [path.join(HERE, "run-hidden.mjs"), "--wave=W5", `--dir=${path.resolve(opt.dir)}`, `--jobs=${JOBS}`, ...(opt.results ? [`--results=${opt.results}.w15.json`] : []), ...(opt.cmd && !opt["cmd-unboxed"] ? [`--cmd=${opt.cmd}`, ...(opt["cmd-dir"] ? [`--cmd-dir=${opt["cmd-dir"]}`] : [])] : [])];
  const r = spawnSync(process.execPath, argv, { encoding: "utf8", env: { ...process.env, B8_HOME: B8 }, timeout: 3 * 3600_000, maxBuffer: 32 << 20 });
  const lines = String(r.stdout ?? "").trim().split("\n");
  try { w15 = JSON.parse(lines.at(-1)); } catch {}
  if (!w15 || typeof w15.total !== "number") die(`runner error: the W1-W5 part failed (exit ${r.status}): ${String(r.stderr ?? "").slice(0, 300)}`, 3);
  w15Lines = lines.slice(0, -1).filter((l) => /^W[1-5] /.test(l));
}

const T0 = Date.now(); // after the W1-W5 part (its own seconds are added to the total)
// ---- the sandbox (run-hidden.mjs's box.sh) ----
const BOX = `#!/bin/sh
set -e
MODE=$1; shift
mount --make-rprivate /
mount -t tmpfs -o mode=755,size=1m tmpfs /run
mkdir /run/b8box
while [ "$1" != "--" ]; do
  src=\${1%%:*}; rest=\${1#*:}; dst=\${rest%%:*}; m=\${rest#*:}
  mkdir -p "/run/b8box/$dst"; mount --bind "$src" "/run/b8box/$dst"
  [ "$m" = ro ] && mount -o remount,bind,ro "/run/b8box/$dst"
  shift
done
shift
mount -o remount,ro /run
for d in /tmp /home /root /opt /mnt /srv /media /var/lib/docker /dev/shm /var/tmp; do [ -d $d ] && mount -t tmpfs -o mode=1777,size=512m tmpfs $d; done
if [ "$MODE" = compile ]; then for d in /usr/lib/gcc /usr/libexec/gcc /usr/lib/gcc-cross /usr/lib/llvm-*; do [ -d "$d" ] && mount -t tmpfs -o mode=755,size=1m tmpfs "$d"; done; fi
mount -o remount,bind,ro /
cd "\${BOX_CWD:-/tmp}"
if [ "$MODE" = run ]; then ulimit -v 4194304; ulimit -f 65536; fi
exec setpriv --reuid=65534 --regid=65534 --clear-groups --inh-caps=-all --bounding-set=-all -- env -i PATH=/usr/bin:/bin HOME=/tmp LANG=C.UTF-8 "$@"
`;
fs.mkdirSync(path.join(B8, ".tmp"), { recursive: true }); fs.chmodSync(path.join(B8, ".tmp"), 0o700);
const R = fs.mkdtempSync(path.join(B8, ".tmp", "w7-"));
const boxPath = path.join(R, "box.sh");
fs.writeFileSync(boxPath, BOX, { mode: 0o755 });
const box = (mode, specs, cmd, { timeout, cwd } = {}) => run("unshare", ["-m", "-n", "-p", "-f", "--mount-proc", "--kill-child", "env", `BOX_CWD=${cwd ?? "/tmp"}`, "/bin/sh", boxPath, mode, ...specs.map(([s, d, m]) => `${s}:${d}:${m}`), "--", ...cmd], { timeout });
const cleanup = () => { if (!opt.keep) fs.rmSync(R, { recursive: true, force: true }); };
process.on("exit", cleanup);
process.on("SIGINT", () => process.exit(130));
process.on("SIGTERM", () => process.exit(143));

// ---- copy the arm's directory (run-hidden.mjs's rules) ----
const SKIP_DIR = new Set([".git", "node_modules", "target", ".cpcache", ".clj-kondo", ".lsp", ".calva", "classes"]);
let copied = 0, copiedBytes = 0;
function copyArm(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) { if (!SKIP_DIR.has(e.name)) copyArm(s, d); continue; }
    if (!e.isFile() || /\.(class|jar|so|o|a)$/.test(e.name)) continue;
    const st = fs.statSync(s);
    if (st.size > 5 << 20 || copiedBytes + st.size > 100 << 20) continue;
    const buf = fs.readFileSync(s);
    if (buf.subarray(0, 4).toString("latin1") === "\x7fELF" || buf.subarray(0, 4).toString("latin1") === "PK\x03\x04") continue;
    fs.writeFileSync(d, buf); copied++; copiedBytes += st.size;
  }
}
for (const d of ["arm", "in", "out", "bin", "lists", "include", "toolchain", "cmd", "tt", "bench"]) fs.mkdirSync(path.join(R, d), { recursive: true });
fs.chmodSync(R, 0o755);
for (const d of ["arm", "out", "bin", "tt"]) fs.chmodSync(path.join(R, d), 0o777);
copyArm(path.resolve(opt.dir), path.join(R, "arm"));
const chmodAll = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { fs.chmodSync(p, 0o777); chmodAll(p); } else fs.chmodSync(p, 0o666); } };
chmodAll(path.join(R, "arm"));
// the orderer's Lua sources and headers (never the arm's copies)
fs.cpSync(path.join(B8, "spec", "w7", "include"), path.join(R, "include", "sys-w7"), { recursive: true });
fs.cpSync(path.join(B8, "spec", "w7", "lua"), path.join(R, "in", "lua"), { recursive: true });
fs.cpSync(path.join(B8, "toolchain"), path.join(R, "toolchain"), { recursive: true });
let compileCmd = ["/run/b8box/toolchain/clj-run", "-m", "ccc.main"];
if (opt.cmd) {
  if (opt["cmd-dir"]) fs.cpSync(path.resolve(opt["cmd-dir"]), path.join(R, "cmd"), { recursive: true });
  fs.copyFileSync(path.resolve(opt.cmd), path.join(R, "cmd", path.basename(opt.cmd)));
  fs.chmodSync(path.join(R, "cmd", path.basename(opt.cmd)), 0o755);
  compileCmd = opt["cmd-unboxed"] ? [path.join(R, "cmd", path.basename(opt.cmd))] : [`/run/b8box/cmd/${path.basename(opt.cmd)}`];
}

// ---- 2. build Lua with the arm's compiler: one batch (one JVM), timed, peak RSS of the compile's processes ----
// the wrapper (python3's rusage, inside the sandbox): wall seconds and the largest descendant's max RSS (KB)
const TIMER = "import resource,subprocess,sys,time\nt=time.time()\ntry:\n    c=subprocess.call(sys.argv[2:])\nexcept Exception:\n    c=127\nw=time.time()-t\nru=resource.getrusage(resource.RUSAGE_CHILDREN)\nopen(sys.argv[1],'w').write('%d %.3f %d\\n'%(c,w,ru.ru_maxrss))\nsys.exit(c)\n";
fs.writeFileSync(path.join(R, "lists", "timer.py"), TIMER);
const sources = build.sources.map((f, i) => ({ src: f, name: f.replace(/\.c$/, ""), k: i }));
const bp = (inBox) => (inBox ? "/run/b8box" : R);
const flags = (inBox) => [...["include/sys-w7", "in/lua"].flatMap((d) => ["-I", `${bp(inBox)}/${d}`]), ...build.defines.flatMap((d) => ["-D", d])];
const sOut = (s) => path.join(R, "out", `${s.name}.s`);
const written = (s) => { try { return fs.statSync(sOut(s)).size > 0; } catch { return false; } };
const compileSpecs = [[path.join(R, "arm"), "arm", "rw"], [path.join(R, "in"), "in", "ro"], [path.join(R, "out"), "out", "rw"], [path.join(R, "lists"), "lists", "ro"], [path.join(R, "include"), "include", "ro"], [path.join(R, "toolchain"), "toolchain", "ro"], [path.join(R, "cmd"), "cmd", "ro"]];
const BATCH_MS = 900_000;
let batches = 0, restarts = 0, compileWall = 0, compileRss = 0;
{
  let queue = sources, n = 0; const inBox = !opt["cmd-unboxed"];
  while (queue.length && n <= 40) {
    const lf = path.join(R, "lists", `w7-${n}.txt`), tf = path.join(R, "out", `time-${n}.txt`);
    fs.writeFileSync(lf, queue.map((s) => `${bp(inBox)}/in/lua/${s.src} ${bp(inBox)}/out/${s.name}.s`).join("\n") + "\n");
    batches++;
    const argv = ["python3", `${bp(inBox)}/lists/timer.py`, inBox ? `/run/b8box/out/time-${n}.txt` : tf, ...compileCmd, ...flags(inBox), "--batch", `${bp(inBox)}/lists/w7-${n}.txt`];
    const r = inBox ? await box("compile", compileSpecs, argv, { timeout: BATCH_MS, cwd: "/run/b8box/arm" }) : await run(argv[0], argv.slice(1), { cwd: path.join(R, "arm"), timeout: BATCH_MS, env: { PATH: "/usr/bin:/bin", HOME: R } });
    let code = r.code;
    try { const [c, w, kb] = fs.readFileSync(tf, "utf8").trim().split(" ").map(Number); code = r.timedOut ? null : c; compileWall += w; compileRss = Math.max(compileRss, kb); } catch { compileWall += r.ms / 1000; }
    const missing = queue.filter((s) => !written(s));
    if (!missing.length) break;
    if (code === 0 && !r.timedOut) { for (const s of missing) s.fail = "error"; break; }
    missing[0].fail = r.timedOut ? "timeout" : "crash";
    queue = missing.slice(1); n++; restarts++;
  }
  for (const s of queue) if (!written(s) && !s.fail) s.fail = "not-reached";
}
const cheat = { ident: 0, include: 0 };
for (const s of sources) {
  if (!written(s)) { s.fail ??= "error"; continue; }
  const t = fs.readFileSync(sOut(s), "latin1");
  if (/\.ident\s+"(GCC|clang)|GCC: \(|clang version/i.test(t)) { s.fail = "cheat"; cheat.ident++; }
  else if (/^\s*\.(incbin|include)\b/im.test(t)) { s.fail = "cheat"; cheat.include++; }
}
const srcFail = sources.filter((s) => s.fail);
let linked = false;
if (!srcFail.length) {
  const r = await box("link", [[path.join(R, "out"), "out", "ro"], [path.join(R, "bin"), "bin", "rw"]], ["gcc", ...sources.map((s) => `/run/b8box/out/${s.name}.s`), "-o", "/run/b8box/bin/lua", "-lm"], { timeout: 120000 });
  linked = r.code === 0 && fs.existsSync(path.join(R, "bin", "lua"));
}
const tBuild = (Date.now() - T0) / 1000;

// ---- 3. sanity: a fixed line, and a failing assert must fail ----
const runSpecs = (dir, mode = "ro") => [[path.join(R, "bin"), "bin", "ro"], ...(dir ? [[dir, "w", mode]] : [])];
let sanity = linked ? "ok" : "no-binary";
if (linked) {
  const a = await box("run", runSpecs(null), ["/run/b8box/bin/lua", "-e", "io.write(string.format('%d %.3f %s %q', 6*7, 1/3, tostring(nil), 'a\\0'))"], { timeout: 20000 });
  const b = await box("run", runSpecs(null), ["/run/b8box/bin/lua", "-e", "assert(1 == 2)"], { timeout: 20000 });
  if (a.code !== 0 || a.stdout !== `42 0.333 nil "a\\0"`) sanity = "fixed-line";
  else if (b.code === 0 || b.timedOut) sanity = "assert-does-not-fail";
}
const usable = linked && sanity === "ok";

// ---- 4. the hidden test files ----
const tests = man.tests.filter((t) => !t.visible || opt.all).map((t, i) => ({ ...t, k: i }));
await pool(usable ? tests : [], JOBS, async (t) => {
  const d = path.join(R, "tt", `t${t.k}`);
  fs.cpSync(path.join(H7, "tests"), d, { recursive: true }); fs.chmodSync(d, 0o777); chmodAll(d);
  const lim = Math.max(30000, 20 * t.gccMs);
  const r = await box("run", runSpecs(d, "rw"), ["/run/b8box/bin/lua", "w7test.lua", man.mode, t.file], { timeout: lim + 1000, cwd: "/run/b8box/w" });
  t.ms = Math.round(r.ms);
  t.fail = r.timedOut ? "timeout" : r.overflow ? "output" : r.code === 0 && new RegExp(`(^|\\n)W7-TEST-OK ${t.file.replace(/\./g, "\\.")}\\n`).test(r.stdout) ? null : "fail";
  fs.rmSync(d, { recursive: true, force: true });
});
for (const t of tests) if (!usable) t.fail = linked ? "sanity" : "build";
const tTests = (Date.now() - T0) / 1000;

// ---- 5. runtime: the hidden benchmark variants, serially; gcc -O0's Lua interleaved; -O2's and chibicc's as references ----
const REF = path.join(H7, "ref");
const refs = [["O0", "lua-gcc-O0"], ...(opt["no-refs"] ? [] : [["O2", "lua-gcc-O2"], ["chibicc", "lua-chibicc"]])].filter(([, f]) => fs.existsSync(path.join(REF, f)));
for (const [k, f] of refs) { fs.copyFileSync(path.join(REF, f), path.join(R, "bin", `ref-${k}`)); fs.chmodSync(path.join(R, "bin", `ref-${k}`), 0o755); }
if (!refs.some(([k]) => k === "O0")) die("runner error: no gcc -O0 Lua in hidden/w7/ref (run material/build-w7.mjs)", 3);
fs.cpSync(path.join(H7, "bench"), path.join(R, "bench"), { recursive: true }); chmodAll(path.join(R, "bench")); fs.chmodSync(path.join(R, "bench"), 0o755);
const B = man.bench.map((b) => ({ ...b, ms: Object.fromEntries([["arm", []], ...refs.map(([k]) => [k, []])]), refFail: {} }));
const timeRef = async (b, k) => {
  if (b.refFail[k]) return;
  const g = await box("run", runSpecs(path.join(R, "bench")), [`/run/b8box/bin/ref-${k}`, `${b.name}.lua`], { timeout: 120000, cwd: "/run/b8box/w" });
  if (g.stdout !== b.expected || g.code !== 0) { if (k === "O0") die(`runner error: gcc -O0's Lua output differs on ${b.name}`, 3); b.refFail[k] = true; return; }
  b.ms[k].push(g.ms);
};
for (let rep = 0; rep < REPS; rep++) for (const b of B) {
  // gcc -O0's Lua, then the arm's (interleaved, as W6), then the references
  await timeRef(b, "O0");
  if (!usable) b.fail ??= linked ? "sanity" : "build";
  if (!b.fail) {
    const a = await box("run", runSpecs(path.join(R, "bench")), ["/run/b8box/bin/lua", `${b.name}.lua`], { timeout: Math.max(20000, 20 * b.gccMs), cwd: "/run/b8box/w" });
    if (a.timedOut) b.fail = "timeout"; else if (a.stdout !== b.expected || a.code !== 0) b.fail = "output"; else b.ms.arm.push(a.ms);
  }
  // the references: gcc -O2's every rep; chibicc's (slow) once
  for (const [k] of refs) if (k === "O2" || (k === "chibicc" && rep === 0)) await timeRef(b, k);
}
const ratios = [], refRatios = Object.fromEntries(refs.filter(([k]) => k !== "O0").map(([k]) => [k, []]));
const programs = {};
for (const b of B) {
  const o0 = median(b.ms.O0);
  const ratio = b.fail ? PENALTY : Math.min(PENALTY, median(b.ms.arm) / o0);
  ratios.push(ratio);
  for (const k of Object.keys(refRatios)) refRatios[k].push(b.refFail[k] || !b.ms[k].length ? PENALTY : median(b.ms[k]) / o0);
  programs[b.name] = { ok: !b.fail, fail: b.fail ?? null, ratio: r3(ratio), armMs: b.fail ? null : Math.round(median(b.ms.arm)), gccO0Ms: Math.round(o0), ...Object.fromEntries(Object.keys(refRatios).map((k) => [`${k}Ratio`, r3(refRatios[k].at(-1))])) };
}
const geo = (xs) => (xs.length ? r3(Math.exp(xs.reduce((s, x) => s + Math.log(x), 0) / xs.length)) : null);
const benchOut = { programs, score: geo(ratios), refs: Object.fromEntries(Object.entries(refRatios).map(([k, xs]) => [k, geo(xs)])) };
const tAll = (Date.now() - T0) / 1000;

// ---- report ----
let refCompile = null; try { refCompile = JSON.parse(fs.readFileSync(path.join(REF, "compile.json"), "utf8")); } catch {}
const byCat = {};
for (const c of CATS) { const ts = tests.filter((t) => t.category === c); if (ts.length) byCat[`W7 ${c}`] = { fail: ts.filter((t) => t.fail).length, total: ts.length }; }
for (const l of w15Lines.filter((l) => !/ total: /.test(l) && !/^total:/.test(l))) console.log(l);
for (const [k, c] of Object.entries(byCat)) console.log(`${k}: ${c.fail} of ${c.total} fail`);
for (const l of w15Lines.filter((l) => / total: /.test(l))) console.log(l);
const w7fail = tests.filter((t) => t.fail).length;
console.log(`W7 total: ${w7fail} of ${tests.length} fail`);
const total = (w15?.total ?? 0) + tests.length, pass = (w15?.pass ?? 0) + tests.length - w7fail;
console.log(`total: ${total - pass} of ${total} fail`);
console.log(`W7 build: ${srcFail.length} of ${sources.length} sources fail to compile${srcFail.length ? ` (${Object.entries(srcFail.reduce((m, s) => ((m[s.fail] = (m[s.fail] ?? 0) + 1), m), {})).map(([k, v]) => `${v} ${k}`).join(", ")})` : ""}; link ${srcFail.length ? "not tried" : linked ? "ok" : "fails"}${linked && sanity !== "ok" ? `; sanity fails (${sanity}): every W7 test counts as failed` : ""}`);
for (const [name, b] of Object.entries(programs)) console.log(`W7 bench ${name}: ${b.ok ? `${b.ratio.toFixed(2)}x gcc -O0` : `fails (${b.fail}), counted as ${PENALTY}x`}`);
console.log(`W7 runtime score: ${benchOut.score.toFixed(3)} (geometric mean of the Lua interpreter's runtime / gcc -O0's over ${B.length} programs; lower is better${Object.entries(benchOut.refs).map(([k, v]) => `; ${k === "O2" ? "gcc -O2" : k}'s Lua: ${v.toFixed(3)}`).join("")})`);
const mb = (kb) => Math.round(kb / 1024);
const refC = refCompile ? Object.entries(refCompile).map(([k, v]) => `${k === "O0" ? "gcc -O0" : k}: ${v.seconds.toFixed(1)} s, ${mb(v.rssKB)} MB`).join("; ") : null;
console.log(`W7 compile: ${compileWall.toFixed(1)} s wall and ${mb(compileRss)} MB peak RSS for the ${sources.length} sources in ${batches} batch${batches === 1 ? "" : "es"}${refC ? ` (${refC})` : ""}`);
const byWave = { ...(w15?.byWave ?? {}), W7: { pass: tests.length - w7fail, total: tests.length } };
if (opt.results) {
  fs.mkdirSync(path.dirname(path.resolve(opt.results)), { recursive: true });
  let prevTests = {}; try { prevTests = JSON.parse(fs.readFileSync(`${opt.results}.w15.json`, "utf8")).tests ?? {}; } catch {}
  fs.writeFileSync(opt.results, JSON.stringify({ wave: 7, tests: { ...prevTests, ...Object.fromEntries(tests.map((t) => [`w7:${t.file}`, !t.fail])) }, stage: Object.fromEntries(tests.filter((t) => t.fail).map((t) => [`w7:${t.file}`, t.fail])), build: { failed: srcFail.map((s) => [s.src, s.fail]), linked, sanity }, bench: benchOut }, null, 1));
}
const failStages = { ...(w15?.failStages ?? {}) };
for (const t of tests) if (t.fail) failStages[`w7-${t.fail}`] = (failStages[`w7-${t.fail}`] ?? 0) + 1;
console.log(JSON.stringify({
  wave: "W7", pass, total, byWave, byCategory: { ...(w15?.byCategory ?? {}), ...byCat }, failStages, cheat: { ident: (w15?.cheat?.ident ?? 0) + cheat.ident, include: (w15?.cheat?.include ?? 0) + cheat.include },
  w7: { build: { sources: sources.length, failed: srcFail.length, linked, sanity }, tests: { pass: tests.length - w7fail, total: tests.length, pct: tests.length ? Math.round(1000 * (tests.length - w7fail) / tests.length) / 10 : null }, bench: benchOut, compile: { seconds: r3(compileWall), rssMB: mb(compileRss), batches, restarts, refs: refCompile } },
  w15: w15 ? { pass: w15.pass, total: w15.total, seconds: w15.seconds } : null, gate: null, bench: null, copiedFiles: copied,
  seconds: { build: Math.round(tBuild), tests: Math.round(tTests - tBuild), bench: Math.round(tAll - tTests), total: Math.round(tAll) + (w15?.seconds?.total ?? 0) },
}));
