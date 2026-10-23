#!/usr/bin/env node
// Benchmark 8 material: W6's benchmark programs. The visible programs are <b8>/spec/bench/*.c; the score is measured
// on hidden variants (<b8>/hidden/bench/*.c): the same programs with other constants (sizes, seeds, rotations), so a
// compiler that special-cases the visible text gains nothing. Every program must agree on stdout and exit under
// gcc and clang at -O0 and -O2 and gcc -O0 with ASan+UBSan.
//   node build-bench.mjs     writes spec/bench/<name>.expected and hidden/bench/<name>.c, .expected, manifest.json
import fs from "node:fs";
import path from "node:path";
import { P, run, status, mkdirp, writeJson, median, sha } from "./lib.mjs";

export const VARIANTS = {
  fib: { N: "37", SEED: "8" },
  sieve: { N: "9000000", ROUNDS: "3" },
  matmul: { N: "460", SEED: "54321u" },
  sort: { N: "2300000", SEED: "31337u" },
  bintree: { DEPTH: "17" },
  fannkuch: { START: "3" },
  crc: { MB: "36", SEED: "88172645u" },
  vm: { ITER: "9000000", MULT: "37", MODV: "999983" },
};
const BUILDS = [["gcc", ["-O0"]], ["gcc", ["-O2"]], ["clang", ["-O0"]], ["clang", ["-O2"]], ["gcc", ["-O0", "-fsanitize=address,undefined", "-fno-sanitize-recover=all"]]];

export function variantText(text, consts) {
  let t = text;
  for (const [k, v] of Object.entries(consts)) {
    const re = new RegExp(`^#define ${k} .*$`, "m");
    if (!re.test(t)) throw new Error(`no #define ${k}`);
    t = t.replace(re, `#define ${k} ${v}`);
  }
  return t;
}

async function agree(src, dir) {
  const outs = [];
  for (let i = 0; i < BUILDS.length; i++) {
    const [cc, fl] = BUILDS[i], exe = path.join(dir, `x${i}`);
    const b = await run(cc, ["-std=c11", "-pedantic-errors", "-Wall", "-Werror", ...fl, "-nostdinc", "-I", P.inc, src, "-o", exe], { timeout: 60000 });
    if (b.code !== 0) throw new Error(`${cc} ${fl.join(" ")}: ${b.stderr}`);
    const x = await run(exe, [], { timeout: 120000, env: { PATH: "/usr/bin:/bin", ASAN_OPTIONS: "detect_leaks=0" } });
    outs.push({ stdout: x.stdout, exit: status(x) });
  }
  if (outs.some((o) => o.stdout !== outs[0].stdout || o.exit !== outs[0].exit)) throw new Error(`disagree: ${src}`);
  const ms = [];
  for (let k = 0; k < 5; k++) ms.push((await run(path.join(dir, "x0"), [], { timeout: 120000 })).ms);
  return { ...outs[0], gccMs: median(ms) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const tmp = path.join(P.work, "bench"); mkdirp(tmp); mkdirp(P.hbench);
  const man = { built: new Date().toISOString(), programs: [] };
  for (const f of fs.readdirSync(P.bench).filter((x) => x.endsWith(".c")).sort()) {
    const name = f.slice(0, -2), text = fs.readFileSync(path.join(P.bench, f), "utf8");
    const v = await agree(path.join(P.bench, f), tmp);
    fs.writeFileSync(path.join(P.bench, `${name}.expected`), v.stdout);
    const ht = variantText(text, VARIANTS[name]);
    const hsrc = path.join(P.hbench, f);
    fs.writeFileSync(hsrc, ht);
    const h = await agree(hsrc, tmp);
    fs.writeFileSync(path.join(P.hbench, `${name}.expected`), h.stdout);
    man.programs.push({ name, visibleGccMs: Math.round(v.gccMs), hiddenGccMs: Math.round(h.gccMs), exit: h.exit, stdoutSha: sha(h.stdout), consts: VARIANTS[name] });
    console.log(`${name}: visible ${v.gccMs.toFixed(0)} ms, hidden ${h.gccMs.toFixed(0)} ms at gcc -O0; ${h.stdout.trim().split("\n").at(-1)}`);
  }
  writeJson(path.join(P.hbench, "manifest.json"), man);
}
