#!/usr/bin/env node
// Benchmark 8 material, W7 ("compile real software": Lua 5.4.7 and its own test suite). Lays out <b8> for W7 and
// calibrates it with gcc -O0 (B8_HOME, default the scratchpad b8/). Run as root, after install.mjs; about 2 min.
//   node build-w7.mjs [--no-clone] [--runs=3]
//   1. hidden/w7/upstream/lua-5.4.7: github.com/lua/lua at tag v5.4.7 (commit checked against spec/w7/build.json);
//   2. spec/W7.md, spec/w7/{build.json, include/, bench/*.lua} from bench8/spec; spec/w7/lua/: the 33 sources and
//      every header of Lua's tree but ltests.h (unmodified);
//   3. hidden/w7/ref/: Lua built with gcc -O0 and -O2 (the provided headers, -nostdinc) and with chibicc (its own
//      headers first, as the W1-W6 validation ran it), and compile.json (the serial compile time and peak RSS of
//      gcc -O0 -S and chibicc -S over the 33 sources);
//   4. the tests: every file of testes/ that the gcc -O0 Lua passes in `full` mode (all.lua's Linux defaults) --runs
//      times in a row, in a fresh copy of the tests' directory with an empty stdin pipe; main.lua is left out (it needs
//      C modules through dlopen, which this build leaves out, and `lua` on PATH); all.lua, heavy.lua and the helpers
//      (tracegc.lua, bwcoercion.lua) are not tests. A fixed list is visible (visible/W7/, with the helpers, the driver
//      w7test.lua, README.md and manifest.json); the rest are hidden (hidden/w7/tests/ holds the whole directory);
//   5. the benchmarks: spec/w7/bench/<name>.expected (the visible programs) and hidden/w7/bench/ (variants: other
//      constants), every expected output gcc -O0's Lua's; hidden/w7/manifest.json (tests, categories, gcc -O0 ms).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)), BENCH8 = path.dirname(HERE);
const B8 = path.resolve(process.env.B8_HOME ?? "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8");
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const RUNS = Number(opt.runs ?? 3);
const sh = (cmd, args, o = {}) => spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 64 << 20, ...o });
const must = (r, what) => { if (r.status !== 0) throw new Error(`${what}: ${r.stderr || r.stdout}`); return r; };
const build = JSON.parse(fs.readFileSync(path.join(BENCH8, "spec", "w7", "build.json"), "utf8"));
const H7 = path.join(B8, "hidden", "w7"), UP = path.join(H7, "upstream", `lua-${build.lua}`);
const rm = (p) => fs.rmSync(p, { recursive: true, force: true });

// the categories (spec/W7.md) and the visible files
export const CATEGORY = {
  language: ["constructs", "locals", "goto", "calls", "closure", "vararg", "events", "code", "literals", "verybig", "big"],
  libraries: ["strings", "pm", "tpack", "utf8", "nextvar", "sort", "math", "bitwise"],
  runtime: ["gc", "gengc", "coroutine", "cstack", "errors", "db", "api"],
  "io-os": ["files", "attrib"],
};
export const VISIBLE = ["closure", "vararg", "literals", "nextvar", "sort", "bitwise"];
const HELPERS = ["tracegc.lua", "bwcoercion.lua"];
// the hidden benchmark variants: the same programs, other constants
export const VARIANTS = { fib: { N: 31 }, nbody: { N: 120000 }, spectral: { N: 280 }, bintrees: { N: 13 }, fannkuch: { N: 8, R: 8 }, strops: { N: 120000, SEED: 777 } };

// 1. upstream
if (!fs.existsSync(path.join(UP, "lua.c")) && !opt["no-clone"]) { fs.mkdirSync(path.dirname(UP), { recursive: true }); must(sh("git", ["clone", "-q", "--depth", "1", "--branch", build.upstream.tag, build.upstream.url, UP]), "git clone"); }
const head = sh("git", ["-C", UP, "rev-parse", "HEAD"]).stdout.trim();
if (head !== build.upstream.commit) throw new Error(`${UP} is at ${head}, not ${build.upstream.commit}`);

// 2. the visible spec
const SPEC = path.join(B8, "spec");
fs.copyFileSync(path.join(BENCH8, "spec", "W7.md"), path.join(SPEC, "W7.md"));
rm(path.join(SPEC, "w7")); fs.mkdirSync(path.join(SPEC, "w7", "lua"), { recursive: true });
fs.copyFileSync(path.join(BENCH8, "spec", "w7", "build.json"), path.join(SPEC, "w7", "build.json"));
fs.cpSync(path.join(BENCH8, "spec", "w7", "include"), path.join(SPEC, "w7", "include"), { recursive: true });
fs.mkdirSync(path.join(SPEC, "w7", "bench"));
for (const f of fs.readdirSync(path.join(BENCH8, "spec", "w7", "bench")).filter((x) => x.endsWith(".lua"))) fs.copyFileSync(path.join(BENCH8, "spec", "w7", "bench", f), path.join(SPEC, "w7", "bench", f));
for (const f of fs.readdirSync(UP).filter((f) => (build.sources.includes(f) || (f.endsWith(".h") && f !== "ltests.h")))) fs.copyFileSync(path.join(UP, f), path.join(SPEC, "w7", "lua", f));
const LUA = path.join(SPEC, "w7", "lua"), INC = path.join(SPEC, "w7", "include");

// 3. the reference builds
const REF = path.join(H7, "ref"), OBJ = path.join(H7, "ref", "obj");
rm(REF); fs.mkdirSync(OBJ, { recursive: true });
const flags = ["-I", INC, "-I", LUA, ...build.defines.flatMap((d) => ["-D", d])];
const TIMER = path.join(OBJ, "timer.py");
fs.writeFileSync(TIMER, "import resource,subprocess,sys,time\nt=time.time()\nfor a in sys.argv[2:]:\n    c=subprocess.call(a.split('\\x01'))\n    if c: sys.exit(c)\nw=time.time()-t\nru=resource.getrusage(resource.RUSAGE_CHILDREN)\nopen(sys.argv[1],'w').write('%.3f %d\\n'%(w,ru.ru_maxrss))\n");
const CHIBICC = path.join(B8, "hidden", "validation", "chibicc-cmd");
function compileAll(tag, cmdFor) {
  const d = path.join(OBJ, tag); fs.mkdirSync(d, { recursive: true });
  const tf = path.join(d, "time.txt");
  const r = sh("python3", [TIMER, tf, ...build.sources.map((f) => cmdFor(path.join(LUA, f), path.join(d, f.replace(/\.c$/, ".s"))).join("\x01"))]);
  if (r.status !== 0) return { ok: false, why: (r.stderr || "").slice(0, 400) };
  const [seconds, rssKB] = fs.readFileSync(tf, "utf8").trim().split(" ").map(Number);
  const out = path.join(REF, `lua-${tag}`);
  const l = sh("gcc", [...build.sources.map((f) => path.join(d, f.replace(/\.c$/, ".s"))), "-o", out, "-lm"]);
  return { ok: l.status === 0, seconds, rssKB, ...(l.status ? { why: `link: ${l.stderr.slice(0, 400)}` } : {}) };
}
const refs = {
  "gcc-O0": compileAll("gcc-O0", (i, o) => ["gcc", "-O0", "-std=gnu99", "-w", "-nostdinc", ...flags, "-S", i, "-o", o]),
  "gcc-O2": compileAll("gcc-O2", (i, o) => ["gcc", "-O2", "-std=gnu99", "-w", "-nostdinc", ...flags, "-S", i, "-o", o]),
  chibicc: fs.existsSync(path.join(CHIBICC, "chibicc")) ? compileAll("chibicc", (i, o) => [path.join(CHIBICC, "chibicc"), "-S", `-I${path.join(CHIBICC, "include")}`, `-I${INC}`, `-I${LUA}`, ...build.defines.map((d) => `-D${d}`), "-o", o, i]) : { ok: false, why: "no chibicc" },
};
if (!refs["gcc-O0"].ok) throw new Error(`gcc -O0 cannot build Lua with the provided headers: ${refs["gcc-O0"].why}`);
fs.writeFileSync(path.join(REF, "compile.json"), JSON.stringify(Object.fromEntries(Object.entries({ O0: refs["gcc-O0"], chibicc: refs.chibicc }).filter(([, v]) => v.ok).map(([k, v]) => [k, { seconds: v.seconds, rssKB: v.rssKB }])), null, 1) + "\n");
const LUA0 = path.join(REF, "lua-gcc-O0");

// 4. the tests
const TESTS = path.join(H7, "tests");
rm(TESTS); fs.cpSync(path.join(UP, "testes"), TESTS, { recursive: true });
fs.copyFileSync(path.join(BENCH8, "spec", "w7", "visible", "w7test.lua"), path.join(TESTS, "w7test.lua"));
const TMP = fs.mkdtempSync(path.join(B8, ".tmp", "w7b-"));
function runTest(lua, file) {
  const d = fs.mkdtempSync(path.join(TMP, "t-")); fs.cpSync(TESTS, d, { recursive: true });
  const t0 = process.hrtime.bigint();
  const r = sh(lua, ["w7test.lua", "full", file], { cwd: d, input: "", timeout: 300_000, env: { PATH: "/usr/bin:/bin", HOME: d, LANG: "C.UTF-8" } });
  const ms = Number(process.hrtime.bigint() - t0) / 1e6; rm(d);
  return { ok: r.status === 0 && new RegExp(`(^|\\n)W7-TEST-OK ${file.replace(/\./g, "\\.")}\\n`).test(r.stdout), ms };
}
const catOf = (n) => Object.entries(CATEGORY).find(([, fs_]) => fs_.includes(n))?.[0] ?? null;
const tests = [], dropped = [];
for (const n of Object.values(CATEGORY).flat()) {
  const file = `${n}.lua`, rs = Array.from({ length: RUNS }, () => runTest(LUA0, file));
  const ms = rs.map((x) => x.ms).sort((a, b) => a - b)[rs.length >> 1];
  if (rs.every((x) => x.ok)) tests.push({ file, category: catOf(n), visible: VISIBLE.includes(n), gccMs: Math.round(ms) }); else dropped.push({ file, passes: rs.filter((x) => x.ok).length });
}
const others = fs.readdirSync(TESTS).filter((f) => f.endsWith(".lua") && !tests.some((t) => t.file === f) && !dropped.some((t) => t.file === f));
// the visible files
const VIS = path.join(B8, "visible", "W7");
rm(VIS); fs.mkdirSync(VIS, { recursive: true });
for (const t of tests.filter((x) => x.visible)) fs.copyFileSync(path.join(TESTS, t.file), path.join(VIS, t.file));
for (const f of HELPERS) fs.copyFileSync(path.join(TESTS, f), path.join(VIS, f));
for (const f of ["w7test.lua", "README.md"]) fs.copyFileSync(path.join(BENCH8, "spec", "w7", "visible", f), path.join(VIS, f));
fs.writeFileSync(path.join(VIS, "manifest.json"), JSON.stringify(Object.fromEntries(tests.filter((x) => x.visible).map((t) => [t.file, { category: t.category, gccO0Ms: t.gccMs, timeoutMs: Math.max(30000, 20 * t.gccMs) }])), null, 1) + "\n");

// 5. the benchmarks
const BV = path.join(BENCH8, "spec", "w7", "bench"), BH = path.join(H7, "bench");
rm(BH); fs.mkdirSync(BH, { recursive: true });
const timeLua = (lua, dir, name) => { const t0 = process.hrtime.bigint(); const r = sh(lua, [`${name}.lua`], { cwd: dir, input: "", timeout: 300_000 }); return { out: r.stdout, ok: r.status === 0, ms: Number(process.hrtime.bigint() - t0) / 1e6 }; };
const bench = [];
for (const f of fs.readdirSync(BV).filter((x) => x.endsWith(".lua")).sort()) {
  const name = f.slice(0, -4), src = fs.readFileSync(path.join(BV, f), "utf8");
  const v = timeLua(LUA0, BV, name); if (!v.ok) throw new Error(`gcc -O0 Lua fails on ${f}`);
  fs.writeFileSync(path.join(BV, `${name}.expected`), v.out); fs.copyFileSync(path.join(BV, `${name}.expected`), path.join(SPEC, "w7", "bench", `${name}.expected`));
  let hid = src; for (const [k, val] of Object.entries(VARIANTS[name] ?? {})) { const re = new RegExp(`^local ${k} = .*$`, "m"); if (!re.test(hid)) throw new Error(`${f}: no 'local ${k} =' line`); hid = hid.replace(re, `local ${k} = ${val}`); }
  if (hid === src) throw new Error(`${f}: no hidden variant`);
  fs.writeFileSync(path.join(BH, f), hid);
  const rs = Array.from({ length: RUNS }, () => timeLua(LUA0, BH, name));
  if (!rs.every((x) => x.ok && x.out === rs[0].out)) throw new Error(`gcc -O0 Lua is not deterministic on the variant of ${f}`);
  fs.writeFileSync(path.join(BH, `${name}.expected`), rs[0].out);
  bench.push({ name, expected: rs[0].out, gccMs: Math.round(rs.map((x) => x.ms).sort((a, b) => a - b)[rs.length >> 1]), visibleGccMs: Math.round(v.ms) });
}
rm(TMP);
const manifest = { what: "Benchmark 8 W7: the hidden Lua tests and benchmark variants", lua: build.lua, commit: head, mode: "full", tests, dropped, notTests: others, bench, refs: Object.fromEntries(Object.entries(refs).map(([k, v]) => [k, { ok: v.ok, seconds: v.seconds ?? null, rssKB: v.rssKB ?? null, why: v.why ?? null }])), built: new Date().toISOString() };
fs.writeFileSync(path.join(H7, "manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
fs.copyFileSync(path.join(BENCH8, "run-hidden-w7.mjs"), path.join(B8, "run-hidden-w7.mjs"));
console.log(JSON.stringify({ tests: tests.length, visible: tests.filter((t) => t.visible).length, hidden: tests.filter((t) => !t.visible).length, byCategory: Object.fromEntries(Object.keys(CATEGORY).map((c) => [c, { visible: tests.filter((t) => t.category === c && t.visible).length, hidden: tests.filter((t) => t.category === c && !t.visible).length }])), dropped, notTests: others, bench: bench.map((b) => `${b.name} ${b.visibleGccMs}/${b.gccMs} ms`), refs: manifest.refs }, null, 1));
