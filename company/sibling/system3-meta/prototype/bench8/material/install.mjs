#!/usr/bin/env node
// Benchmark 8 material: lay out <b8> from this repository (B8_HOME, default the scratchpad b8/).
//   node install.mjs [--no-clone] [--no-jars]
//   1. toolchain/: clj-run + VERSIONS.md from bench8/toolchain/, and the three jars from Maven Central, each checked
//      against the sha256 recorded here (a mismatch stops the install);
//   2. spec/: CONTRACT.md, W1-W6.md, include/, bench/ from bench8/spec/; visible/README.md;
//   3. run-hidden.mjs (a copy of bench8/run-hidden.mjs);
//   4. hidden/upstream/: the three test sources at their pinned commits (gcc as a sparse, shallow checkout of
//      gcc.c-torture/execute only), unless --no-clone or already there at the right commit.
// Then build the suites: node build-tests.mjs && node build-bench.mjs (and check them: node validate.mjs).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { P, mkdirp } from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url)), BENCH8 = path.dirname(HERE);
const opt = new Set(process.argv.slice(2));
export const JARS = [
  { path: "org/clojure/clojure/1.12.6/clojure-1.12.6.jar", sha256: "21b578db389a8e74b286ce79c4a7f86ec641e26d88b12f18d69030916b0e18ca" },
  { path: "org/clojure/spec.alpha/0.5.238/spec.alpha-0.5.238.jar", sha256: "94cd99b6ea639641f37af4860a643b6ed399ee5a8be5d717cff0b663c8d75077" },
  { path: "org/clojure/core.specs.alpha/0.4.74/core.specs.alpha-0.4.74.jar", sha256: "eb73ac08cf49ba840c88ba67beef11336ca554333d9408808d78946e0feb9ddb" },
];
export const UPSTREAM = [
  { dir: "c-testsuite", url: "https://github.com/c-testsuite/c-testsuite.git", commit: "5c7275656d751de0e68b2d340a95b5681858ed07" },
  { dir: "chibicc", url: "https://github.com/rui314/chibicc.git", commit: "90d1f7f199cc55b13c7fdb5839d1409806633fdb" },
  { dir: "gcc", url: "https://github.com/gcc-mirror/gcc.git", commit: "6382527abc778ecbfedb8a85ddcc502cd97ddee9", sparse: "gcc/testsuite/gcc.c-torture/execute" },
];
const sh = (cmd, args, cwd) => { const r = spawnSync(cmd, args, { cwd, stdio: ["ignore", "inherit", "inherit"] }); if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed`); };
const sha256 = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");

// 1. toolchain
mkdirp(path.join(P.toolchain, "lib"));
for (const f of ["clj-run", "VERSIONS.md"]) fs.copyFileSync(path.join(BENCH8, "toolchain", f), path.join(P.toolchain, f));
fs.chmodSync(P.cljRun, 0o755);
if (!opt.has("--no-jars")) for (const j of JARS) {
  const dst = path.join(P.toolchain, "lib", path.basename(j.path));
  if (!fs.existsSync(dst) || sha256(dst) !== j.sha256) sh("curl", ["-sSfL", "--retry", "6", "--retry-all-errors", "--retry-delay", "5", "-o", dst, `https://repo1.maven.org/maven2/${j.path}`]);
  if (sha256(dst) !== j.sha256) throw new Error(`sha256 mismatch: ${dst}`);
}
// 2-3. spec, visible README, runner
fs.cpSync(path.join(BENCH8, "spec"), P.spec, { recursive: true, filter: (s) => !s.endsWith("visible-README.md") });
mkdirp(P.visible);
fs.copyFileSync(path.join(BENCH8, "spec", "visible-README.md"), path.join(P.visible, "README.md"));
fs.copyFileSync(path.join(BENCH8, "run-hidden.mjs"), path.join(P.b8, "run-hidden.mjs"));
// 4. upstream
if (!opt.has("--no-clone")) for (const u of UPSTREAM) {
  const d = path.join(P.upstream, u.dir);
  const head = fs.existsSync(d) ? spawnSync("git", ["-C", d, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim() : null;
  if (head === u.commit) continue;
  fs.rmSync(d, { recursive: true, force: true }); mkdirp(d);
  sh("git", ["init", "-q"], d);
  sh("git", ["remote", "add", "origin", u.url], d);
  if (u.sparse) { sh("git", ["sparse-checkout", "set", u.sparse], d); }
  sh("git", ["fetch", "-q", "--depth", "1", ...(u.sparse ? ["--filter=blob:none"] : []), "origin", u.commit], d);
  sh("git", ["checkout", "-q", "FETCH_HEAD"], d);
}
console.log(`installed into ${P.b8}`);
