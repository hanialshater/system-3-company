#!/usr/bin/env node
// Benchmark 8 material: re-check the built suite from scratch, independently of build-tests.mjs's own checks.
//   node validate.mjs [--jobs=4] [--sample=N] [--spot=K]
// For every test in hidden/manifest.json:
//   - gcc -O0 and clang -O0 (with only the provided headers) build it, and both runs print exactly the stored
//     .expected and exit with the stored status;
//   - the tagger, run again, gives the same wave and category (determinism);
//   - a visible test's files under visible/Wn/ are byte-identical to the hidden copies, and a hidden test has none.
// --spot=K prints K tests per wave (id, origin, features, category, first lines) for a human spot-check of tagging.
import fs from "node:fs";
import path from "node:path";
import { P, run, status, pool, readJson, sha } from "./lib.mjs";
import { tag } from "./tagger.mjs";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const man = readJson(P.manifest);
let tests = man.tests;
if (opt.sample) tests = tests.filter((t) => parseInt(sha(t.id).slice(0, 8), 16) % Math.ceil(tests.length / Number(opt.sample)) === 0);
const tmp = fs.mkdtempSync(path.join(P.work, "validate-"));
const problems = [];
const t0 = Date.now();
await pool(tests, Number(opt.jobs ?? 4), async (t) => {
  const src = path.join(P.tests, `${t.id}.c`), text = fs.readFileSync(src, "utf8");
  const expected = fs.readFileSync(path.join(P.tests, `${t.id}.expected`), "latin1");
  if (sha(expected) !== t.stdoutSha) problems.push(`${t.id}: expected file does not match its sha`);
  for (const cc of ["gcc", "clang"]) {
    const exe = path.join(tmp, `${t.id}-${cc}`);
    const b = await run(cc, [`-std=${t.std ?? "c11"}`, "-w", "-O0", "-nostdinc", "-I", P.inc, src, "-o", exe], { timeout: 60000 });
    if (b.code !== 0) { problems.push(`${t.id}: ${cc} build failed`); continue; }
    const x = await run(exe, [], { timeout: t.timeoutMs, env: { PATH: "/usr/bin:/bin" } });
    if (x.stdout !== expected || status(x) !== t.exit) problems.push(`${t.id}: ${cc} output or exit differs`);
    fs.rmSync(exe, { force: true });
  }
  const r = tag(src, text, P.inc);
  if (r.wave !== t.wave || r.category !== t.category || r.reasons.length) problems.push(`${t.id}: re-tag gives W${r.wave} ${r.category} ${r.reasons.join(";")}`);
  const v = path.join(P.visible, `W${t.wave}`, `${t.id}.c`);
  if (t.visible) {
    if (!fs.existsSync(v) || fs.readFileSync(v, "utf8") !== text || fs.readFileSync(v.replace(/\.c$/, ".expected"), "latin1") !== expected || Number(fs.readFileSync(v.replace(/\.c$/, ".exit"), "utf8")) !== t.exit) problems.push(`${t.id}: visible copy differs`);
  } else if (fs.existsSync(v)) problems.push(`${t.id}: hidden test is visible`);
});
fs.rmSync(tmp, { recursive: true, force: true });
// no visible file without a manifest entry
const ids = new Set(man.tests.filter((t) => t.visible).map((t) => t.id));
for (let w = 1; w <= 5; w++) for (const f of fs.readdirSync(path.join(P.visible, `W${w}`)).filter((f) => f.endsWith(".c"))) if (!ids.has(f.slice(0, -2))) problems.push(`visible/W${w}/${f}: not a visible test`);
console.log(JSON.stringify({ checked: tests.length, seconds: Math.round((Date.now() - t0) / 1000), problems }, null, 1));

if (opt.spot) {
  const K = Number(opt.spot);
  for (let w = 1; w <= 5; w++) {
    const ws = man.tests.filter((t) => t.wave === w).sort((a, b) => (sha("spot" + a.id) < sha("spot" + b.id) ? -1 : 1)).slice(0, K);
    for (const t of ws) {
      const body = fs.readFileSync(path.join(P.tests, `${t.id}.c`), "utf8").split("\n").filter((l) => l.trim() && !/^\s*(\/\/|\/\*|\*)/.test(l)).slice(0, 14).join("\n");
      console.log(`\n=== ${t.id} W${t.wave} ${t.category} [${t.features.join(",")}] ${t.origin}\n${body}`);
    }
  }
}
process.exit(problems.length ? 1 : 0);
