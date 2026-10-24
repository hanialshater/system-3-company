#!/usr/bin/env node
// Benchmark 10: the operator's preparation (B10.md "What has to be built first").
//   node setup.mjs [--runs=<dir>]   lays out <runs>/: material/ (SQLite, headers, sqlrun.c, opts), ref/ (gcc builds),
//        visible/ and hidden/ (corpora and workloads with gcc's outputs and gcc -O2's instruction counts), start/ (B9
//        V's compiler with spec/B10.md and the visible material committed), judge/ (judge.mjs, B8's visible-check.mjs,
//        judge.json, the start's hidden W7 results and visible pass set). Idempotent: each step skips what exists.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generate } from "./corpus.mjs";
import { workloads } from "./workloads.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const B10 = path.resolve(opt.runs ?? path.join(SCRATCH, "b10-runs"));
export const SEEDS = { visCorpus: 1010, hidCorpus: Number(process.env.B10_HIDDEN_CORPUS_SEED ?? 52981), visWork: 7, hidWork: Number(process.env.B10_HIDDEN_WORK_SEED ?? 31) };
export const START_FROM = path.join(SCRATCH, "b9-runs", "arms", "V", "V"), START_REV = "3e6efb1";
const B8 = path.join(SCRATCH, "b8"), CLJ = path.join(SCRATCH, "b8-runs", "toolchain", "clj-run");
const sh = (cmd, args, o = {}) => { const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 256 << 20, ...o }); if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout; };
const git = (cwd, ...a) => sh("git", ["-c", "safe.directory=*", "-C", cwd, ...a]);
const step = (name, done, fn) => { if (done()) { console.log(`= ${name}: exists`); return; } const t0 = Date.now(); fn(); console.log(`+ ${name} (${Math.round((Date.now() - t0) / 1000)} s)`); };
async function pool(items, n, fn) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k]); } })); }
// bytes, not strings (see judge.mjs run()): a per-chunk decode split UTF-8 characters
const runOut = (exe, args, cwd) => new Promise((res) => { const ch = spawn(exe, args, { cwd, stdio: ["ignore", "pipe", "pipe"] }); const o = [], e = []; ch.stdout.on("data", (d) => o.push(d)); ch.stderr.on("data", (d) => e.push(d)); ch.on("close", (code) => res({ code, out: Buffer.concat(o), err: Buffer.concat(e).toString("utf8") })); });

fs.mkdirSync(B10, { recursive: true });
const M = path.join(B10, "material"), REF = path.join(B10, "ref");
// 1. material
step("material", () => fs.existsSync(path.join(M, "sqlite3.c")), () => {
  fs.mkdirSync(M, { recursive: true });
  sh(path.join(HERE, "material", "get-sqlite.sh"), [M]);
  fs.cpSync(path.join(HERE, "material", "include"), path.join(M, "include"), { recursive: true });
  for (const f of ["sqlrun.c", "opts.txt"]) fs.copyFileSync(path.join(HERE, "material", f), path.join(M, f));
});
const OPTS = fs.readFileSync(path.join(M, "opts.txt"), "utf8").trim().split(/\s+/);
// 2. gcc's reference builds (the provided headers only)
for (const O of ["O0", "O2"]) step(`ref ${O}`, () => fs.existsSync(path.join(REF, `sqlrun-${O}`)), () => {
  fs.mkdirSync(REF, { recursive: true });
  sh("gcc", [`-${O}`, "-std=c99", "-nostdinc", "-I", path.join(M, "include"), "-I", M, ...OPTS, path.join(M, "sqlite3.c"), path.join(M, "sqlrun.c"), "-o", path.join(REF, `sqlrun-${O}`), "-lm"]);
});
const O2 = path.join(REF, "sqlrun-O2"), O0 = path.join(REF, "sqlrun-O0");
// 3. corpora: scripts and gcc's outputs (checked equal for -O0 and -O2, and stable)
async function makeCorpus(dir, seed, n) {
  if (fs.existsSync(path.join(dir, "DONE"))) { console.log(`= corpus ${path.basename(path.dirname(dir))}: exists`); return; }
  fs.mkdirSync(dir, { recursive: true }); const t0 = Date.now();
  const scripts = generate(seed, n); let unstable = 0;
  await pool(scripts, os.cpus().length, async (s) => {
    const f = path.join(dir, `${s.name}.sql`); fs.writeFileSync(f, s.sql);
    const a = await runOut(O2, [f], dir), b = await runOut(O0, [f], dir);
    if (a.code !== 0 || !a.out.equals(b.out)) { unstable++; fs.rmSync(f); return; }
    fs.writeFileSync(path.join(dir, `${s.name}.ref`), a.out);
  });
  fs.writeFileSync(path.join(dir, "DONE"), JSON.stringify({ seed, n, dropped: unstable }));
  console.log(`+ corpus ${dir}: ${n - unstable} scripts (dropped ${unstable} whose -O0 and -O2 outputs differ) (${Math.round((Date.now() - t0) / 1000)} s)`);
}
// 4. workloads: scripts, gcc's outputs, gcc -O2's instruction counts
async function makeWork(dir, seed, scale) {
  if (fs.existsSync(path.join(dir, "o2.json"))) { console.log(`= workloads ${dir}: exist`); return; }
  fs.mkdirSync(dir, { recursive: true }); const t0 = Date.now(), counts = {};
  await pool(workloads(seed, scale), os.cpus().length, async (w) => {
    const f = path.join(dir, `${w.name}.sql`); fs.writeFileSync(f, w.sql);
    const r = await runOut("valgrind", ["--tool=callgrind", "--callgrind-out-file=/dev/null", O2, f], dir), b = await runOut(O0, [f], dir);
    if (r.code !== 0 || !r.out.equals(b.out) || /^error/m.test(r.out.toString("utf8"))) throw new Error(`workload ${w.name}: exit ${r.code}, or -O0/-O2 differ, or an error`);
    fs.writeFileSync(path.join(dir, `${w.name}.ref`), r.out); counts[w.name] = Number(r.err.match(/Collected : (\d+)/)[1]);
  });
  fs.writeFileSync(path.join(dir, "o2.json"), JSON.stringify(counts, null, 1));
  console.log(`+ workloads ${dir} (${Math.round((Date.now() - t0) / 1000)} s)`);
}
await makeCorpus(path.join(B10, "visible", "corpus"), SEEDS.visCorpus, 600);
await makeCorpus(path.join(B10, "hidden", "corpus"), SEEDS.hidCorpus, 3000);
await makeWork(path.join(B10, "visible", "work"), SEEDS.visWork, 0.5);
await makeWork(path.join(B10, "hidden", "work"), SEEDS.hidWork, 1);
// 5. the start: B9 V's compiler with the task and the visible material committed
const START = path.join(B10, "start");
step("start", () => fs.existsSync(path.join(START, "spec", "B10.md")), () => {
  git(B10, "clone", "-q", "--no-hardlinks", START_FROM, START); git(START, "checkout", "-q", "-B", "main", START_REV); git(START, "remote", "remove", "origin");
  const s = path.join(START, "spec", "b10"); fs.mkdirSync(s, { recursive: true });
  fs.copyFileSync(path.join(HERE, "spec-B10.md"), path.join(START, "spec", "B10.md"));
  for (const f of ["sqlite3.c", "sqlite3.h", "sqlrun.c", "opts.txt"]) fs.copyFileSync(path.join(M, f), path.join(s, f));
  fs.cpSync(path.join(M, "include"), path.join(s, "include"), { recursive: true });
  fs.cpSync(path.join(B10, "visible", "corpus"), path.join(s, "corpus"), { recursive: true }); fs.rmSync(path.join(s, "corpus", "DONE"));
  fs.cpSync(path.join(B10, "visible", "work"), path.join(s, "work"), { recursive: true });
  fs.appendFileSync(path.join(START, ".gitignore"), "\n# B10: build and profiling output, the harness's saved leftovers\nbuild/\n*.s\n*.o\ncallgrind.out*\ncg*.out\nsqlrun\n.b10-leftover/\n");
  git(START, "add", "-A"); git(START, "-c", "user.name=operator", "-c", "user.email=operator@b10", "commit", "-qm", "B10: the task (spec/B10.md) and its visible material (spec/b10/)");
});
// 6. the judge: install, the start's hidden W7 results and visible pass set
const JD = path.join(B10, "judge");
step("judge", () => fs.existsSync(path.join(JD, "judge.json")), () => {
  fs.mkdirSync(JD, { recursive: true });
  fs.copyFileSync(path.join(HERE, "judge.mjs"), path.join(JD, "judge.mjs"));
  fs.copyFileSync(path.join(HERE, "..", "bench8", "visible-check.mjs"), path.join(JD, "visible-check.mjs"));
  const res = path.join(JD, "start-W7.json");
  const h = spawnSync(process.execPath, [path.join(B8, "run-hidden-w7.mjs"), `--dir=${START}`, `--results=${res}`, "--no-refs"], { encoding: "utf8", env: { ...process.env, B8_HOME: B8 }, timeout: 4 * 3600_000, maxBuffer: 256 << 20 });
  const hj = (() => { for (const l of h.stdout.trim().split("\n").reverse()) { try { return JSON.parse(l); } catch {} } return null; })();
  if (!hj?.w7 || !fs.existsSync(`${res}.w15.json`)) throw new Error(`the start's hidden W7 run: exit ${h.status} ${h.stdout.slice(-800)} ${h.stderr.slice(-800)}`);
  const vis = path.join(JD, "start-visible.json");
  sh(process.execPath, [path.join(JD, "visible-check.mjs"), "--wave=W7", `--dir=${START}`, `--clj=${CLJ}`, `--baseline=${vis}`], { timeout: 3600_000 });
  fs.writeFileSync(path.join(JD, "judge.json"), JSON.stringify({ b8: B8, clj: CLJ, material: M, visCorpus: path.join(B10, "visible", "corpus"), visWork: path.join(B10, "visible", "work"), hidCorpus: path.join(B10, "hidden", "corpus"), hidWork: path.join(B10, "hidden", "work"), startResults: res, startVisible: vis, startRuntime: hj.w7.bench.score, startLua: hj.w7.tests }, null, 1));
});
console.log(JSON.stringify({ runs: B10, seeds: { visCorpus: SEEDS.visCorpus, visWork: SEEDS.visWork } }));
