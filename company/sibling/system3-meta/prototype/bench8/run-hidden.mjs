#!/usr/bin/env node
// Benchmark 8: the hidden runner. Installed as <b8>/run-hidden.mjs (a copy of bench8/run-hidden.mjs; self-contained).
//   node run-hidden.mjs --wave=W1..W6 --dir=<arm compiler dir> [--results=<file>] [--gate=<results file>]
//        [--jobs=4] [--reps=5] [--keep]
//   operator-only: [--all] (score visible tests too) [--cmd=<script> --cmd-dir=<dir>] (another compiler, e.g. a stub
//        or chibicc behind a wrapper: run as /run/b8box/cmd/<script> with the contract's arguments)
// It batch-compiles the hidden tests of waves 1..n (and for W6 the hidden benchmark variants) with the arm's compiler,
// assembles and links each .s with `gcc out.s -o prog`, runs every program with its timeout, and prints ONLY:
//   one line per category of waves 1..n:  `W3 structs: 12 of 40 fail`
//   one total line per wave, one overall total; for W6 one line per benchmark and the score line;
//   and a JSON summary as the last line (no test names, no test text, no outputs).
// Isolation (like Benchmark 7's runner): the arm's directory is copied (regular text files only: no symlinks, no
// binaries, no .class/.jar, nothing over 5 MB) to a fresh dir under <b8>/.tmp, and every step runs in its own
// namespace sandbox (unshare: mount, pid and network namespaces) as user nobody with the root file system read-only,
// /tmp /home /root /opt /mnt /run /var/tmp /dev/shm replaced by empty tmpfs, and no network. Compiling runs with cc1
// and clang removed (/usr/lib/gcc and /usr/lib/llvm-* hidden), so no C compiler exists for the arm's compiler to call;
// it sees only its own copy, the test sources (renamed t0001.c ...), the provided headers and the toolchain. Linking
// sees only the .s files; running sees only the binary. The expected outputs never enter a sandbox: this process
// compares them. A .s naming gcc or clang (`.ident "GCC: ...`) or pulling in files (.incbin/.include) fails as cheat.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH_B8 = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8";
const B8 = path.resolve(process.env.B8_HOME ?? (fs.existsSync(path.join(HERE, "hidden", "manifest.json")) ? HERE : SCRATCH_B8));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const die = (m, code = 2) => { console.error(m); process.exit(code); };
const WAVE = Number(String(opt.wave ?? "").replace(/^W/i, ""));
if (!(WAVE >= 1 && WAVE <= 6)) die("--wave=W1..W6");
if (!opt.dir || !fs.statSync(opt.dir, { throwIfNoEntry: false })?.isDirectory()) die("--dir=<arm compiler dir>");
const JOBS = Number(opt.jobs ?? Math.min(4, os.cpus().length));
const REPS = Number(opt.reps ?? 5);
const PENALTY = 20; // a benchmark that fails or times out counts as 20x gcc -O0
const CATEGORY_ORDER = {
  1: ["functions", "control", "expressions"],
  2: ["strings", "char", "globals", "arrays", "pointers"],
  3: ["unions", "enums", "typedef", "initializers", "sizeof", "structs"],
  4: ["varargs", "stringize-paste", "macro-function", "conditional", "define", "include"],
  5: ["floating", "function-pointers", "goto", "switch", "misc", "storage", "bitwise", "casts", "integer-types"],
};
const H = path.join(B8, "hidden");
const manifest = JSON.parse(fs.readFileSync(path.join(H, "manifest.json"), "utf8"));
const benchMan = WAVE === 6 ? JSON.parse(fs.readFileSync(path.join(H, "bench", "manifest.json"), "utf8")) : null;

// ---- helpers ----
function run(cmd, args, { cwd, timeout = 10000, maxOut = 1 << 20 } = {}) {
  return new Promise((resolve) => {
    const t0 = process.hrtime.bigint();
    const ch = spawn(cmd, args, { cwd, env: { PATH: "/usr/bin:/bin" }, stdio: ["ignore", "pipe", "pipe"], detached: true });
    const out = []; let n = 0, timedOut = false, overflow = false, errN = 0; const err = [];
    const kill = () => { try { process.kill(-ch.pid, "SIGKILL"); } catch {} };
    const timer = setTimeout(() => { timedOut = true; kill(); }, timeout);
    ch.stdout.on("data", (d) => { n += d.length; if (n > maxOut) { overflow = true; kill(); } else out.push(d); });
    ch.stderr.on("data", (d) => { if (errN < 8192) { err.push(d); errN += d.length; } });
    ch.on("error", () => {});
    ch.on("close", (code, signal) => { clearTimeout(timer); resolve({ code, signal, stdout: Buffer.concat(out).toString("latin1"), stderr: Buffer.concat(err).toString(), ms: Number(process.hrtime.bigint() - t0) / 1e6, timedOut, overflow }); });
  });
}
const SIG = { SIGABRT: 6, SIGSEGV: 11, SIGFPE: 8, SIGKILL: 9, SIGBUS: 7, SIGILL: 4, SIGTRAP: 5 };
async function pool(items, n, fn) { let i = 0; const res = []; await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; res[k] = await fn(items[k], k); } })); return res; }
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

// ---- the sandbox ----
const BOX = `#!/bin/sh
# box.sh <mode> <spec>... -- cmd...   spec = src:dst:ro|rw ; cwd is the first spec's dst unless BOX_CWD is set
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
const R = fs.mkdtempSync(path.join(fs.mkdirSync(path.join(B8, ".tmp"), { recursive: true }) ?? path.join(B8, ".tmp"), "run-"));
fs.chmodSync(path.join(B8, ".tmp"), 0o700);
const boxPath = path.join(R, "box.sh");
fs.writeFileSync(boxPath, BOX, { mode: 0o755 });
const box = (mode, specs, cmd, { timeout, cwd } = {}) => run("unshare", ["-m", "-n", "-p", "-f", "--mount-proc", "--kill-child", "env", `BOX_CWD=${cwd ?? "/tmp"}`, "/bin/sh", boxPath, mode, ...specs.map(([s, d, m]) => `${s}:${d}:${m}`), "--", ...cmd], { timeout });
const cleanup = () => { if (!opt.keep) fs.rmSync(R, { recursive: true, force: true }); };
process.on("exit", cleanup);
process.on("SIGINT", () => process.exit(130));
process.on("SIGTERM", () => process.exit(143));

// ---- copy the arm's directory ----
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
const T0 = Date.now();
for (const d of ["arm", "in", "out", "bin", "lists", "include", "toolchain", "cmd"]) fs.mkdirSync(path.join(R, d), { recursive: true });
fs.chmodSync(R, 0o755);
for (const d of ["arm", "out", "bin"]) fs.chmodSync(path.join(R, d), 0o777);
copyArm(path.resolve(opt.dir), path.join(R, "arm"));
const chmodAll = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { fs.chmodSync(p, 0o777); chmodAll(p); } else fs.chmodSync(p, 0o666); } };
chmodAll(path.join(R, "arm"));
fs.cpSync(path.join(B8, "spec", "include"), path.join(R, "include"), { recursive: true });
fs.cpSync(path.join(B8, "toolchain"), path.join(R, "toolchain"), { recursive: true });
let compileCmd = ["/run/b8box/toolchain/clj-run", "-m", "ccc.main"];
if (opt.cmd) {
  if (opt["cmd-dir"]) fs.cpSync(path.resolve(opt["cmd-dir"]), path.join(R, "cmd"), { recursive: true });
  fs.copyFileSync(path.resolve(opt.cmd), path.join(R, "cmd", path.basename(opt.cmd)));
  fs.chmodSync(path.join(R, "cmd", path.basename(opt.cmd)), 0o755);
  compileCmd = [`/run/b8box/cmd/${path.basename(opt.cmd)}`];
}

// ---- the jobs ----
const tests = manifest.tests.filter((t) => t.wave <= Math.min(WAVE, 5) && (opt.all || !t.visible));
const jobs = tests.map((t, i) => ({ kind: "test", t, name: `t${String(i + 1).padStart(4, "0")}` }));
if (benchMan) for (const p of benchMan.programs) jobs.push({ kind: "bench", p, name: `b_${p.name}` });
for (const j of jobs) {
  const src = j.kind === "test" ? path.join(H, "tests", `${j.t.id}.c`) : path.join(H, "bench", `${j.p.name}.c`);
  fs.copyFileSync(src, path.join(R, "in", `${j.name}.c`));
  j.expected = fs.readFileSync(j.kind === "test" ? path.join(H, "tests", `${j.t.id}.expected`) : path.join(H, "bench", `${j.p.name}.expected`), "latin1");
  j.exit = j.kind === "test" ? j.t.exit : j.p.exit;
}

// compile: JOBS batch lists. A batch that exits 0 ran to its end. When one dies (non-zero exit, a signal) or times
// out, the first file it did not write is failed and the batch restarts on the rest (the contract: list order)
const MAX_RESTARTS = 40;
const compileSpecs = [[path.join(R, "arm"), "arm", "rw"], [path.join(R, "in"), "in", "ro"], [path.join(R, "out"), "out", "rw"], [path.join(R, "lists"), "lists", "ro"], [path.join(R, "include"), "include", "ro"], [path.join(R, "toolchain"), "toolchain", "ro"], [path.join(R, "cmd"), "cmd", "ro"]];
const outPath = (j) => path.join(R, "out", `${j.name}.s`);
const written = (j) => { try { return fs.statSync(outPath(j)).size > 0; } catch { return false; } };
let batches = 0, restarts = 0;
async function compileList(list, k) {
  let queue = list, n = 0;
  while (queue.length && n <= MAX_RESTARTS) {
    const lf = path.join(R, "lists", `c${k}-${n}.txt`);
    fs.writeFileSync(lf, queue.map((j) => `/run/b8box/in/${j.name}.c /run/b8box/out/${j.name}.s`).join("\n") + "\n");
    batches++;
    const r = await box("compile", compileSpecs, [...compileCmd, "-I", "/run/b8box/include", "--batch", `/run/b8box/lists/c${k}-${n}.txt`], { timeout: 60000 + 2000 * queue.length, cwd: "/run/b8box/arm" });
    const missing = queue.filter((j) => !written(j));
    if (!missing.length) return;
    // exit 0 = the batch ran to its end: the files it did not write are its compile errors
    if (r.code === 0 && !r.timedOut) { for (const j of missing) j.compileFail = "error"; return; }
    missing[0].compileFail = "crash-or-timeout";
    queue = missing.slice(1); n++; restarts++;
  }
  for (const j of queue) j.compileFail = "not-reached";
}
const lists = Array.from({ length: JOBS }, () => []);
jobs.forEach((j, i) => lists[i % JOBS].push(j));
await Promise.all(lists.map((l, k) => compileList(l, k)));
const tCompile = (Date.now() - T0) / 1000;

// check the .s, then link
const cheat = { ident: 0, include: 0 };
for (const j of jobs) {
  if (!written(j)) { j.fail = "compile"; continue; }
  const s = fs.readFileSync(outPath(j), "latin1");
  if (/\.ident\s+"(GCC|clang)|GCC: \(|clang version/i.test(s)) { j.fail = "cheat"; cheat.ident++; continue; }
  if (/^\s*\.(incbin|include)\b/im.test(s)) { j.fail = "cheat"; cheat.include++; continue; }
}
const linkSpecs = [[path.join(R, "out"), "out", "ro"], [path.join(R, "bin"), "bin", "rw"]];
await pool(jobs.filter((j) => !j.fail), JOBS, async (j) => {
  const r = await box("link", linkSpecs, ["gcc", `/run/b8box/out/${j.name}.s`, "-o", `/run/b8box/bin/${j.name}`], { timeout: 60000 });
  if (r.code !== 0 || !fs.existsSync(path.join(R, "bin", j.name))) j.fail = "link";
});
const tLink = (Date.now() - T0) / 1000;

// run the tests
const runSpecs = [[path.join(R, "bin"), "bin", "ro"]];
const outcome = (j, r) => {
  if (r.timedOut) return "timeout";
  if (r.overflow) return "output";
  const st = r.signal ? 128 + (SIG[r.signal] ?? 64) : r.code;
  return r.stdout === j.expected && st === j.exit ? null : "output";
};
await pool(jobs.filter((j) => j.kind === "test" && !j.fail), JOBS, async (j) => {
  const r = await box("run", runSpecs, [`/run/b8box/bin/${j.name}`], { timeout: j.t.timeoutMs + 1000 });
  j.fail = outcome(j, r);
});
const tRun = (Date.now() - T0) / 1000;

// W6: the benchmarks, serially, the arm's binary and gcc -O0's interleaved, REPS times each, medians
let bench = null;
if (benchMan) {
  bench = { programs: {}, score: null };
  const B = jobs.filter((j) => j.kind === "bench");
  for (const j of B) {
    const ref = path.join(R, "bin", `ref_${j.p.name}`);
    const b = await run("gcc", ["-O0", "-std=c11", "-w", "-nostdinc", "-I", path.join(B8, "spec", "include"), path.join(R, "in", `${j.name}.c`), "-o", ref], { timeout: 60000 });
    if (b.code !== 0) die(`runner error: gcc -O0 failed on ${j.p.name}`, 3);
    j.refMs = []; j.armMs = [];
  }
  for (let rep = 0; rep < REPS; rep++) for (const j of B) {
    const tmo = Math.max(20000, 20 * j.p.hiddenGccMs);
    const g = await box("run", runSpecs, [`/run/b8box/bin/ref_${j.p.name}`], { timeout: 120000 });
    if (g.stdout !== j.expected) die(`runner error: gcc -O0 output differs on ${j.p.name}`, 3);
    j.refMs.push(g.ms);
    if (j.fail) continue;
    const a = await box("run", runSpecs, [`/run/b8box/bin/${j.name}`], { timeout: tmo });
    const f = outcome(j, a);
    if (f) { j.fail = f; continue; }
    j.armMs.push(a.ms);
  }
  const ratios = [];
  for (const j of B) {
    const ref = median(j.refMs);
    const ratio = j.fail ? PENALTY : Math.min(PENALTY, median(j.armMs) / ref);
    ratios.push(ratio);
    bench.programs[j.p.name] = { ok: !j.fail, fail: j.fail ?? null, ratio: Math.round(ratio * 1000) / 1000, armMs: j.fail ? null : Math.round(median(j.armMs)), gccO0Ms: Math.round(ref) };
  }
  bench.score = Math.round(Math.exp(ratios.reduce((s, x) => s + Math.log(x), 0) / ratios.length) * 1000) / 1000;
}
const tAll = (Date.now() - T0) / 1000;

// ---- report ----
const cats = new Map();
for (const j of jobs.filter((x) => x.kind === "test")) {
  const k = `W${j.t.wave} ${j.t.category}`;
  if (!cats.has(k)) cats.set(k, { wave: j.t.wave, category: j.t.category, fail: 0, total: 0 });
  const c = cats.get(k); c.total++; if (j.fail) c.fail++;
}
const order = [...cats.values()].sort((a, b) => a.wave - b.wave || CATEGORY_ORDER[a.wave].indexOf(a.category) - CATEGORY_ORDER[b.wave].indexOf(b.category));
const byWave = {};
for (const c of order) {
  console.log(`W${c.wave} ${c.category}: ${c.fail} of ${c.total} fail`);
  const w = (byWave[`W${c.wave}`] ??= { fail: 0, total: 0 }); w.fail += c.fail; w.total += c.total;
}
for (const [w, v] of Object.entries(byWave)) console.log(`${w} total: ${v.fail} of ${v.total} fail`);
const T = jobs.filter((x) => x.kind === "test"), failN = T.filter((j) => j.fail).length;
console.log(`total: ${failN} of ${T.length} fail`);
let gate = null;
if (opt.gate) {
  const prev = JSON.parse(fs.readFileSync(opt.gate, "utf8"));
  const now = Object.fromEntries(T.map((j) => [j.t.id, !j.fail]));
  const reg = {};
  for (const [id, ok] of Object.entries(prev.tests ?? {})) if (ok && now[id] === false) { const t = manifest.tests.find((x) => x.id === id); const k = `W${t.wave}`; reg[k] = (reg[k] ?? 0) + 1; }
  const n = Object.values(reg).reduce((a, b) => a + b, 0);
  gate = { regressions: n, byWave: reg, pass: n === 0 };
  console.log(`regression gate: ${n} test(s) that passed before fail now${n ? ` (${Object.entries(reg).map(([k, v]) => `${k} ${v}`).join(", ")})` : ""}`);
}
if (bench) {
  for (const [name, b] of Object.entries(bench.programs)) console.log(`W6 ${name}: ${b.ok ? `${b.ratio.toFixed(2)}x gcc -O0` : `fails (${b.fail}), counted as ${PENALTY}x`}`);
  console.log(`W6 score: ${bench.score.toFixed(3)} (geometric mean of runtime / gcc -O0 over ${Object.keys(bench.programs).length} programs; lower is better)`);
}
const stageCount = {};
for (const j of T) if (j.fail) stageCount[j.fail] = (stageCount[j.fail] ?? 0) + 1;
if (opt.results) {
  fs.mkdirSync(path.dirname(path.resolve(opt.results)), { recursive: true });
  fs.writeFileSync(opt.results, JSON.stringify({ wave: WAVE, tests: Object.fromEntries(T.map((j) => [j.t.id, !j.fail])), stage: Object.fromEntries(T.filter((j) => j.fail).map((j) => [j.t.id, j.fail])), bench }, null, 1));
}
console.log(JSON.stringify({
  wave: `W${WAVE}`, pass: T.length - failN, total: T.length, byWave: Object.fromEntries(Object.entries(byWave).map(([k, v]) => [k, { pass: v.total - v.fail, total: v.total }])),
  byCategory: Object.fromEntries(order.map((c) => [`W${c.wave} ${c.category}`, { fail: c.fail, total: c.total }])), failStages: stageCount, cheat,
  bench, gate, copiedFiles: copied, batches, restarts, seconds: { compile: Math.round(tCompile), link: Math.round(tLink - tCompile), run: Math.round(tRun - tLink), bench: Math.round(tAll - tRun), total: Math.round(tAll) },
}));
