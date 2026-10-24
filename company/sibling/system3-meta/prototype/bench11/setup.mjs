#!/usr/bin/env node
// Benchmark 11: the operator's preparation (B11.md "What has to be built first"). Idempotent.
//   node setup.mjs [--runs=<dir>]   <runs>/: ref/sqlrun (gcc -O2 against SQLite 3.53.4, B11's driver), visible/ and
//        hidden/ core corpora with SQLite's outputs, start/ (the stub project, spec/B11.md and the visible material,
//        committed), judge/ (judge.mjs and judge.json).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generate } from "../bench10/corpus.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const B11 = path.resolve(opt.runs ?? path.join(SCRATCH, "b11-runs"));
export const SEEDS = { vis: 2020, hid: Number(process.env.B11_HIDDEN_SEED ?? 77731) };
const B10M = path.join(SCRATCH, "b10-runs", "material"), CLJ = path.join(SCRATCH, "b8-runs", "toolchain", "clj-run");
const sh = (cmd, args, o = {}) => { const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 256 << 20, ...o }); if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout; };
const git = (cwd, ...a) => sh("git", ["-c", "safe.directory=*", "-c", "user.name=operator", "-c", "user.email=operator@b11", "-C", cwd, ...a]);
const step = (name, done, fn) => { if (done()) { console.log(`= ${name}: exists`); return; } const t0 = Date.now(); fn(); console.log(`+ ${name} (${Math.round((Date.now() - t0) / 1000)} s)`); };
const runOut = (exe, args, cwd) => new Promise((res) => { const ch = spawn(exe, args, { cwd, stdio: ["ignore", "pipe", "pipe"] }); const o = []; ch.stdout.on("data", (d) => o.push(d)); ch.on("close", (code) => res({ code, out: Buffer.concat(o) })); });
async function pool(items, n, fn) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k]); } })); }

fs.mkdirSync(B11, { recursive: true });
const REF = path.join(B11, "ref", "sqlrun");
step("ref sqlrun", () => fs.existsSync(REF), () => {
  fs.mkdirSync(path.dirname(REF), { recursive: true });
  const opts = fs.readFileSync(path.join(B10M, "opts.txt"), "utf8").trim().split(/\s+/);
  sh("gcc", ["-O2", "-std=c99", "-nostdinc", "-I", path.join(B10M, "include"), "-I", B10M, ...opts, path.join(B10M, "sqlite3.c"), path.join(HERE, "material", "sqlrun.c"), "-o", REF, "-lm"]);
});
async function corpus(dir, seed, n) {
  if (fs.existsSync(path.join(dir, "DONE"))) { console.log(`= corpus ${dir}: exists`); return; }
  fs.mkdirSync(dir, { recursive: true }); const t0 = Date.now(); let dropped = 0;
  await pool(generate(seed, n, { core: true }), os.cpus().length, async (s) => {
    const f = path.join(dir, `${s.name}.sql`); fs.writeFileSync(f, s.sql);
    const a = await runOut(REF, [f], dir), b = await runOut(REF, [f], dir);
    if (a.code !== 0 || !a.out.equals(b.out)) { dropped++; fs.rmSync(f); return; }
    fs.writeFileSync(path.join(dir, `${s.name}.ref`), a.out);
  });
  fs.writeFileSync(path.join(dir, "DONE"), JSON.stringify({ seed, n, dropped }));
  console.log(`+ corpus ${dir}: ${n - dropped} scripts, dropped ${dropped} (${Math.round((Date.now() - t0) / 1000)} s)`);
}
await corpus(path.join(B11, "visible", "corpus"), SEEDS.vis, 600);
await corpus(path.join(B11, "hidden", "corpus"), SEEDS.hid, 3000);
const START = path.join(B11, "start");
step("start", () => fs.existsSync(path.join(START, "spec", "B11.md")), () => {
  fs.mkdirSync(START, { recursive: true }); git(B11, "init", "-q", "-b", "main", START);
  fs.cpSync(path.join(HERE, "stub"), START, { recursive: true });
  const s = path.join(START, "spec", "b11"); fs.mkdirSync(s, { recursive: true });
  fs.copyFileSync(path.join(HERE, "spec-B11.md"), path.join(START, "spec", "B11.md"));
  fs.copyFileSync(path.join(HERE, "material", "sqlrun.c"), path.join(s, "sqlrun.c")); fs.copyFileSync(REF, path.join(s, "sqlrun"));
  fs.cpSync(path.join(B11, "visible", "corpus"), path.join(s, "corpus"), { recursive: true }); fs.rmSync(path.join(s, "corpus", "DONE"));
  fs.writeFileSync(path.join(START, ".gitignore"), "build/\n*.out\n.b10-leftover/\n.cpcache/\n");
  git(START, "add", "-A"); git(START, "commit", "-qm", "B11: the task (spec/B11.md), its visible material (spec/b11/) and a stub (src/sqlclj/main.clj)");
});
const JD = path.join(B11, "judge");
step("judge", () => fs.existsSync(path.join(JD, "judge.json")), () => {
  fs.mkdirSync(JD, { recursive: true }); fs.copyFileSync(path.join(HERE, "judge.mjs"), path.join(JD, "judge.mjs"));
  fs.writeFileSync(path.join(JD, "judge.json"), JSON.stringify({ clj: CLJ, visCorpus: path.join(B11, "visible", "corpus"), hidCorpus: path.join(B11, "hidden", "corpus"), tmp: path.join(B11, ".tmp") }, null, 1));
});
console.log(JSON.stringify({ runs: B11 }));
