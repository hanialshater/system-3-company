#!/usr/bin/env node
// Benchmark 12: the operator's preparation (B12.md). Idempotent.
//   node setup.mjs   <runs>/: corpus split into visible/ and hidden/ (by a hash of the test file's name), start/ (B11 V's
//        engine with spec/B12.md, spec/b12/ and spec/KNOWLEDGE.md committed), judge/.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const B12 = path.resolve(opt.runs ?? path.join(SCRATCH, "b12-runs")), ALL = path.join(SCRATCH, "b12-all"), B11 = path.join(SCRATCH, "b11-runs");
const sh = (cmd, args, o = {}) => { const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 256 << 20, ...o }); if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout; };
const git = (cwd, ...a) => sh("git", ["-c", "safe.directory=*", "-c", "user.name=operator", "-c", "user.email=operator@b12", "-C", cwd, ...a]);
export const SALT = process.env.B12_SALT ?? "b12-split-7"; // the split's salt (hidden from the agents)
export const visibleFile = (testfile) => crypto.createHash("sha256").update(SALT + testfile).digest()[0] < 77; // about 30%
fs.mkdirSync(B12, { recursive: true });
const V = path.join(B12, "visible", "corpus"), H = path.join(B12, "hidden", "corpus");
if (!fs.existsSync(path.join(B12, "visible", "DONE"))) {
  fs.mkdirSync(V, { recursive: true }); fs.mkdirSync(H, { recursive: true });
  const n = { visFiles: new Set(), hidFiles: new Set(), visScripts: 0, hidScripts: 0 };
  for (const f of fs.readdirSync(ALL).filter((x) => x.endsWith(".sql"))) {
    const tf = f.replace(/-\d+\.sql$/, ""), vis = visibleFile(tf), d = vis ? V : H;
    fs.copyFileSync(path.join(ALL, f), path.join(d, f)); fs.copyFileSync(path.join(ALL, f.replace(/\.sql$/, ".ref")), path.join(d, f.replace(/\.sql$/, ".ref")));
    (vis ? n.visFiles : n.hidFiles).add(tf); vis ? n.visScripts++ : n.hidScripts++;
  }
  fs.writeFileSync(path.join(B12, "visible", "DONE"), JSON.stringify({ visFiles: n.visFiles.size, hidFiles: n.hidFiles.size, visScripts: n.visScripts, hidScripts: n.hidScripts }));
  console.log(`+ split: ${n.visFiles.size} visible test files (${n.visScripts} scripts), ${n.hidFiles.size} hidden (${n.hidScripts})`);
} else console.log("= split: exists");
const START = path.join(B12, "start");
if (!fs.existsSync(path.join(START, "spec", "B12.md"))) {
  const vEnd = sh("node", ["-e", `const fs=require("fs");const r=fs.readFileSync("${B11}/_operator/V/ledger.jsonl","utf8").trim().split("\\n").map(JSON.parse).find(x=>x.event==="end");console.log(r.head)`]).trim();
  git(B12, "clone", "-q", "--no-hardlinks", path.join(B11, "arms", "V", "V"), START); git(START, "checkout", "-q", "-B", "main", vEnd); git(START, "remote", "remove", "origin");
  const s = path.join(START, "spec", "b12"); fs.mkdirSync(s, { recursive: true });
  fs.copyFileSync(path.join(HERE, "spec-B12.md"), path.join(START, "spec", "B12.md"));
  fs.copyFileSync(path.join(HERE, "..", "..", "knowledge", "KB.md"), path.join(START, "spec", "KNOWLEDGE.md"));
  fs.copyFileSync(path.join(B11, "ref", "sqlrun"), path.join(s, "sqlrun"));
  fs.cpSync(V, path.join(s, "corpus"), { recursive: true });
  git(START, "add", "-A"); git(START, "commit", "-qm", "B12: the task (spec/B12.md), SQLite's own tests' visible part (spec/b12/), the knowledge base (spec/KNOWLEDGE.md)");
  console.log(`+ start from B11 V's ${vEnd.slice(0, 10)}`);
} else console.log("= start: exists");
const JD = path.join(B12, "judge");
fs.mkdirSync(JD, { recursive: true }); fs.copyFileSync(path.join(HERE, "judge.mjs"), path.join(JD, "judge.mjs"));
fs.writeFileSync(path.join(JD, "judge.json"), JSON.stringify({ clj: path.join(SCRATCH, "b8-runs", "toolchain", "clj-run"), visCorpus: V, hidCorpus: H, tmp: path.join(B12, ".tmp"), prologue: false, macro: true }, null, 1));
console.log(JSON.stringify({ runs: B12 }));
