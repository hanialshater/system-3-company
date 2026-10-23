#!/usr/bin/env node
// Benchmark 8 material: build the test suites from the upstream clones under <b8>/hidden/upstream.
//   node build-tests.mjs [--only=cts,torture,chibicc] [--limit=N] [--jobs=4]
// Sources: c-testsuite tests/single-exec, gcc.c-torture/execute (top level), chibicc test/*.c (adapted, chibicc.mjs).
// For every candidate program:
//   1. gcc and clang, -std=c11 -pedantic-errors and the implicit-declaration/int/pointer errors, with only the
//      provided headers (-nostdinc -I spec/include): both must accept it;
//   2. the tagger (tagger.mjs) finds its features, its first wave and its category, or why it is out of scope;
//   3. it is built five ways (gcc -O0, gcc -O2, clang -O0, clang -O2, gcc -O0 with ASan+UBSan) and run: all five must
//      agree on stdout and exit status, exit normally (no signal), and finish in under 1.5 s at gcc -O0.
// chibicc units that pass are grouped by (file, wave, category), up to 8 per program, and the group is checked again.
// Each wave's tests are split 25% visible / 75% hidden, stratified by category. Outputs:
//   <b8>/hidden/tests/<id>.c + .expected, <b8>/hidden/manifest.json, <b8>/hidden/build-report.json,
//   <b8>/visible/Wn/<id>.c, .expected, .exit, manifest.json
import fs from "node:fs";
import path from "node:path";
import { P, run, status, pool, mkdirp, writeJson, sha, median } from "./lib.mjs";
import { tag } from "./tagger.mjs";
import { parseChibicc } from "./chibicc.mjs";
import { mask, topItems } from "./ctok.mjs";

// Most upstream tests print nothing and exit 0, which a compiler that emits `main: xor %eax,%eax; ret` would pass.
// So a test whose main takes no parameters has main renamed b8_main, and a wrapper main prints a line before and
// after calling it: an empty program can pass nothing, and every test needs calls and printf to work. (A test that
// calls exit() or abort() never prints the second line; its expected output says so.)
export const WRAPPER = `
int printf(const char *fmt, ...);
int main(void) {
  printf("b8: start\\n");
  int r = b8_main();
  printf("b8: end\\n");
  return r;
}
`;
export function wrapMain(text) {
  const m = mask(text);
  if (!/\bint\s+main\s*\(\s*(void)?\s*\)\s*\{/.test(m) || /\bb8_main\b/.test(m)) return { text, wrapped: false };
  // main's implicit `return 0` at its closing brace (C99 5.1.2.2.3) does not hold for b8_main: add it
  const it = topItems(text).find((x) => x.kind === "decl" && /\bint\s+main\s*\(\s*(void)?\s*\)\s*\{/.test(mask(x.text)));
  if (!it || !it.text.trimEnd().endsWith("}")) return { text, wrapped: false };
  const close = it.start + it.text.trimEnd().length - 1;
  text = text.slice(0, close) + "  return 0;\n" + text.slice(close);
  const m2 = mask(text);
  // rename every main outside comments and strings
  let out = "", last = 0;
  for (const mm of m2.matchAll(/\bmain\b/g)) { out += text.slice(last, mm.index) + "b8_main"; last = mm.index + 4; }
  out += text.slice(last);
  return { text: out.trimEnd() + "\n" + WRAPPER, wrapped: true };
}

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const ONLY = new Set(String(opt.only ?? "cts,torture,chibicc").split(","));
const LIMIT = opt.limit ? Number(opt.limit) : Infinity;
const JOBS = Number(opt.jobs ?? 4);
const CHUNK = 8, MAX_GCC_MS = 1500;
const WORK = P.work;
const STRICT = ["-std=c11", "-pedantic-errors", "-Werror=implicit-function-declaration", "-Werror=implicit-int", "-Werror=int-conversion", "-Werror=incompatible-pointer-types", "-fsyntax-only", "-nostdinc", "-I", P.inc];
const BUILDS = [
  ["gcc", ["-O0"]], ["gcc", ["-O2"]], ["clang", ["-O0"]], ["clang", ["-O2"]],
  ["gcc", ["-O0", "-fsanitize=address,undefined", "-fno-sanitize-recover=all", "-fno-omit-frame-pointer"]],
];
const RUN_ENV = { PATH: "/usr/bin:/bin", ASAN_OPTIONS: "detect_leaks=0:abort_on_error=0", UBSAN_OPTIONS: "halt_on_error=1" };

// ---- 1. candidates ----
// gcc torture tests, normalized mechanically: semantics-neutral optimizer attributes are removed, and the
// __builtin_ spellings of libc functions become the plain names with a standard prototype first. What remains must
// still pass every filter below (so no builtin or extension survives).
const ATTR_RE = /__attribute__\s*\(\(\s*(?:(?:__)?(?:noinline|noclone|noipa|used|unused|always_inline|hot|cold)(?:__)?\s*,?\s*)+\)\)/g;
const STD_PROTOS = {
  abort: "void abort(void);", exit: "void exit(int);", memset: "void *memset(void *, int, unsigned long);",
  memcpy: "void *memcpy(void *, const void *, unsigned long);", memmove: "void *memmove(void *, const void *, unsigned long);",
  memcmp: "int memcmp(const void *, const void *, unsigned long);", strlen: "unsigned long strlen(const char *);",
  strcmp: "int strcmp(const char *, const char *);", strncmp: "int strncmp(const char *, const char *, unsigned long);",
  strcpy: "char *strcpy(char *, const char *);", strncpy: "char *strncpy(char *, const char *, unsigned long);",
  strcat: "char *strcat(char *, const char *);", strchr: "char *strchr(const char *, int);", strrchr: "char *strrchr(const char *, int);",
  printf: "int printf(const char *, ...);", sprintf: "int sprintf(char *, const char *, ...);", malloc: "void *malloc(unsigned long);",
  calloc: "void *calloc(unsigned long, unsigned long);", free: "void free(void *);", puts: "int puts(const char *);",
  putchar: "int putchar(int);", abs: "int abs(int);", labs: "long labs(long);",
};
export function normalizeTorture(text) {
  let t = text.replace(ATTR_RE, "");
  const renamed = new Set();
  t = t.replace(new RegExp(`\\b__builtin_(${Object.keys(STD_PROTOS).join("|")})\\b`, "g"), (m, f) => { renamed.add(f); return f; });
  if (renamed.size) t = [...renamed].sort().map((f) => STD_PROTOS[f]).join("\n") + "\n" + t;
  return { text: t, normalized: t !== text };
}
function candidates() {
  const out = [];
  if (ONLY.has("cts")) {
    const d = path.join(P.upstream, "c-testsuite", "tests", "single-exec");
    for (const f of fs.readdirSync(d).filter((x) => /^\d+\.c$/.test(x)).sort().slice(0, LIMIT))
      out.push({ id: `cts-${f.slice(0, -2)}`, source: "c-testsuite", origin: `c-testsuite/tests/single-exec/${f}`, text: fs.readFileSync(path.join(d, f), "utf8") });
  }
  if (ONLY.has("torture")) {
    const d = path.join(P.upstream, "gcc", "gcc", "testsuite", "gcc.c-torture", "execute");
    let n = 0;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".c")).sort()) {
      if (n++ >= LIMIT) break;
      const raw = fs.readFileSync(path.join(d, f), "utf8");
      const { text, normalized } = normalizeTorture(raw);
      const c = { id: `torture-${f.slice(0, -2)}`, source: "gcc-torture", origin: `gcc/testsuite/gcc.c-torture/execute/${f}${normalized ? " (normalized)" : ""}`, text };
      // tests with their own options, extra sources, expected failures, or a .x driver file are dropped
      if (fs.existsSync(path.join(d, f.slice(0, -2) + ".x"))) c.pre = "has .x file";
      else if (/dg-(options|additional-options|additional-sources|xfail|require-(effective-target|alias|weak|visibility|ifunc))/.test(raw)) c.pre = "dg directive";
      out.push(c);
    }
  }
  if (ONLY.has("chibicc")) {
    const d = path.join(P.upstream, "chibicc", "test"), common = fs.readFileSync(path.join(d, "common"), "utf8");
    const cw = path.join(WORK, "chibicc-parse"); mkdirp(cw);
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".c")).sort()) {
      const p = parseChibicc(path.join(d, f), common, P.inc, cw);
      chibiccFiles.set(p.name, p);
      for (const u of p.units.slice(0, LIMIT)) {
        if (!u.conv) { out.push({ id: `chibicc-${p.name}-u${u.id}`, source: "chibicc", origin: `chibicc/test/${f}#${u.id}`, pre: "unconvertible ASSERT", text: "" }); continue; }
        out.push({ id: `chibicc-${p.name}-u${u.id}`, source: "chibicc", origin: `chibicc/test/${f}#${u.id}`, file: p.name, unit: u.id, text: p.build([u.id]) });
      }
    }
  }
  return out;
}
const chibiccFiles = new Map();

// ---- 2. one candidate ----
async function check(c) {
  const r = { id: c.id, source: c.source, origin: c.origin, file: c.file, unit: c.unit };
  if (c.pre) return { ...r, drop: c.pre };
  const dir = path.join(WORK, "cand", c.id);
  fs.rmSync(dir, { recursive: true, force: true });
  mkdirp(dir);
  const src = path.join(dir, "t.c");
  const { text, wrapped } = wrapMain(c.text);
  r.wrapped = wrapped;
  c = { ...c, text };
  fs.writeFileSync(src, c.text);
  for (const cc of ["gcc", "clang"]) {
    // clang 18's -pedantic-errors also makes C23's deprecation of `int f()` an error; C11 allows it
    const s = await run(cc, [...STRICT, ...(cc === "clang" ? ["-Wno-strict-prototypes", "-Wno-deprecated-non-prototype"] : []), src], { cwd: dir, timeout: 30000 });
    if (s.code !== 0) return { ...r, drop: `strict-${cc}`, detail: s.stderr.split("\n").find((l) => /error/.test(l))?.replace(src, "t.c").slice(0, 200) };
  }
  const t = tag(src, c.text, P.inc);
  Object.assign(r, { wave: t.wave, category: t.category, features: t.features });
  if (t.reasons.length) return { ...r, drop: "out-of-scope", detail: t.reasons.join("; ") };
  const outs = [];
  for (let i = 0; i < BUILDS.length; i++) {
    const [cc, flags] = BUILDS[i], exe = path.join(dir, `x${i}`);
    const b = await run(cc, ["-std=c11", "-w", ...flags, "-nostdinc", "-I", P.inc, src, "-o", exe], { cwd: dir, timeout: 60000 });
    if (b.code !== 0) return { ...r, drop: `build-${cc}${flags.join("")}`, detail: b.stderr.split("\n").find((l) => /error/.test(l))?.slice(0, 200) };
    const x = await run(exe, [], { cwd: dir, timeout: 10000, env: RUN_ENV, maxOut: 1 << 16 });
    if (x.timedOut) return { ...r, drop: "timeout", detail: `${cc} ${flags.join(" ")}` };
    if (x.overflow) return { ...r, drop: "output > 64 KB" };
    if (x.signal) return { ...r, drop: "signal", detail: `${cc} ${flags.join(" ")} ${x.signal}` };
    outs.push({ stdout: x.stdout, exit: status(x), ms: x.ms });
  }
  if (outs.some((o) => o.stdout !== outs[0].stdout || o.exit !== outs[0].exit)) {
    const who = outs.map((o, i) => (o.stdout !== outs[0].stdout || o.exit !== outs[0].exit ? i : -1)).filter((i) => i >= 0);
    return { ...r, drop: who.includes(4) && who.length === 1 ? "sanitizer" : "disagree", detail: who.map((i) => BUILDS[i][0] + BUILDS[i][1][0]).join(",") };
  }
  // c-testsuite tests that exit non-zero are kept with that status; others must exit 0
  const ms = [outs[0].ms];
  for (let k = 0; k < 2; k++) ms.push((await run(path.join(dir, "x0"), [], { cwd: dir, timeout: 10000, env: RUN_ENV })).ms);
  const gccMs = median(ms);
  if (gccMs > MAX_GCC_MS) return { ...r, drop: "slow", detail: `${gccMs.toFixed(0)} ms` };
  fs.rmSync(dir, { recursive: true, force: true });
  return { ...r, ok: true, text: c.text, stdout: outs[0].stdout, exit: outs[0].exit, gccMs };
}

// ---- main ----
const t0 = Date.now();
mkdirp(WORK);
const cands = candidates();
console.log(`${cands.length} candidates (${[...ONLY].join(",")})`);
const prog = (label) => (d, n) => { if (d % 100 === 0 || d === n) console.log(`${label} ${d}/${n} ${((Date.now() - t0) / 1000).toFixed(0)} s`); };
const results = await pool(cands, JOBS, check, prog("checked"));

// chibicc groups
const groups = new Map();
for (const r of results) if (r.ok && r.source === "chibicc") {
  const k = `${r.file}|${r.wave}|${r.category}`;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}
const chunkCands = [];
for (const [k, rs] of groups) {
  rs.sort((a, b) => a.unit - b.unit);
  const [file, wave, category] = k.split("|");
  for (let i = 0; i < rs.length; i += CHUNK) {
    const part = rs.slice(i, i + CHUNK);
    const ids = part.map((x) => x.unit);
    chunkCands.push({ id: `chibicc-${file}-w${wave}-${category}-${i / CHUNK + 1}`, source: "chibicc", origin: `chibicc/test/${file}.c#${ids.join(",")}`, file, units: ids, text: chiBuild(file, ids), wantWave: Number(wave), parts: part });
  }
}
function chiBuild(file, ids) { return chibiccFiles.get(file).build(ids); }
console.log(`${chunkCands.length} chibicc groups`);
const chunkRes = await pool(chunkCands, JOBS, check, prog("groups"));
const finals = results.filter((r) => r.ok && r.source !== "chibicc");
const chunkFallback = [];
chunkRes.forEach((r, i) => {
  if (r.ok && r.wave === chunkCands[i].wantWave) finals.push(r);
  else { chunkFallback.push(r.id); for (const p of chunkCands[i].parts) finals.push(p); }
});

// ids, split, write
const byWave = new Map();
for (const r of finals) { if (!byWave.has(r.wave)) byWave.set(r.wave, []); byWave.get(r.wave).push(r); }
const manifest = { built: new Date().toISOString(), headersSha: sha(fs.readdirSync(P.inc).sort().map((h) => fs.readFileSync(path.join(P.inc, h), "utf8")).join("\0")), tests: [] };
fs.rmSync(P.tests, { recursive: true, force: true }); mkdirp(P.tests);
for (let w = 1; w <= 5; w++) fs.rmSync(path.join(P.visible, `W${w}`), { recursive: true, force: true });
for (const [w, rs] of [...byWave].sort((a, b) => a[0] - b[0])) {
  // stable anonymous ids: order by hash of origin
  rs.sort((a, b) => (sha("b8|" + a.origin) < sha("b8|" + b.origin) ? -1 : 1));
  const byCat = new Map();
  rs.forEach((r, i) => { r.tid = `w${w}-${String(i + 1).padStart(4, "0")}`; if (!byCat.has(r.category)) byCat.set(r.category, []); byCat.get(r.category).push(r); });
  for (const cs of byCat.values()) cs.forEach((r, i) => { r.visible = i % 4 === 0; });
  const vdir = path.join(P.visible, `W${w}`), vman = {};
  mkdirp(vdir);
  for (const r of rs) {
    const timeoutMs = Math.min(30000, Math.max(3000, Math.round(30 * r.gccMs)));
    fs.writeFileSync(path.join(P.tests, `${r.tid}.c`), r.text);
    fs.writeFileSync(path.join(P.tests, `${r.tid}.expected`), r.stdout, "latin1");
    manifest.tests.push({ id: r.tid, wave: w, category: r.category, features: r.features, source: r.source, origin: r.origin, wrapped: r.wrapped, exit: r.exit, stdoutSha: sha(r.stdout), gccMs: Math.round(r.gccMs * 10) / 10, timeoutMs, visible: r.visible });
    if (r.visible) {
      fs.writeFileSync(path.join(vdir, `${r.tid}.c`), r.text);
      fs.writeFileSync(path.join(vdir, `${r.tid}.expected`), r.stdout, "latin1");
      fs.writeFileSync(path.join(vdir, `${r.tid}.exit`), `${r.exit}\n`);
      vman[r.tid] = { category: r.category, exit: r.exit, timeoutMs };
    }
  }
  writeJson(path.join(vdir, "manifest.json"), vman);
}
writeJson(P.manifest, manifest);

// report
const drops = {};
for (const r of [...results, ...chunkRes]) if (!r.ok) { const k = `${r.source}: ${r.drop}`; drops[k] = (drops[k] ?? 0) + 1; }
const counts = {};
for (const t of manifest.tests) {
  const k = `W${t.wave}`;
  counts[k] ??= { visible: 0, hidden: 0, bySource: {}, byCategory: {} };
  counts[k][t.visible ? "visible" : "hidden"]++;
  counts[k].bySource[t.source] = (counts[k].bySource[t.source] ?? 0) + 1;
  counts[k].byCategory[t.category] ??= { visible: 0, hidden: 0 };
  counts[k].byCategory[t.category][t.visible ? "visible" : "hidden"]++;
}
// c-testsuite's own .expected vs the agreed output (a sanity check on the pipeline)
let ctsSame = 0, ctsDiff = [];
for (const r of finals.filter((x) => x.source === "c-testsuite")) {
  const e = fs.readFileSync(path.join(P.upstream, r.origin + ".expected"), "latin1");
  const got = r.wrapped ? r.stdout.replace(/^b8: start\n/, "").replace(/b8: end\n$/, "") : r.stdout;
  if (e === got) ctsSame++; else ctsDiff.push(r.origin);
}
const detail = results.filter((r) => !r.ok).map((r) => ({ id: r.id, drop: r.drop, detail: r.detail, wave: r.wave }));
writeJson(path.join(P.hidden, "build-report.json"), { seconds: Math.round((Date.now() - t0) / 1000), candidates: cands.length, chibiccGroups: chunkCands.length, chunkFallback, drops, counts, ctsExpectedSame: ctsSame, ctsExpectedDiff: ctsDiff, detail });
console.log(JSON.stringify({ drops, counts: Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, { visible: v.visible, hidden: v.hidden, bySource: v.bySource }])), ctsSame, ctsDiff: ctsDiff.length, chunkFallback: chunkFallback.length }, null, 1));
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
