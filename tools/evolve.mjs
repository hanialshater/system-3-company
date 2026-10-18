#!/usr/bin/env node
// Code evolution for R&D (company/rnd/evolution.md). A project in src/lab/<p>/ has a FIXED evaluator
// (its test/ folder, an optional bench.mjs, and evolve.json) owned by the R&D lead. Candidates are
// full copies of the library source in src/lab/<p>/candidates/<id>/ written by R&D engineers. A
// candidate may not ship its own tests: the harness always evaluates it with the project's tests.
//
//   node tools/evolve.mjs eval <project> [id…] [--seed=N]   score candidates (all if none given) → archive
//   node tools/evolve.mjs board <project>                   leaderboard (latest score per candidate)
//   node tools/evolve.mjs promote <project> <id>            copy the winner over the project's main source
//   node tools/evolve.mjs size <project> [id]               per-entry sizes only (no tests, no archive)
//   node tools/evolve.mjs selftest                          check the harness itself (stripper, size gate)
//
// evolve.json: { "entry": "index.mjs", "weights": { "tests": 100, "size": -0.002, "bench": 1 },
//                "budgetGzBytes": 10240, "parents": { "<id>": ["<parent id>", …] },
//   optional:    "sizeEntries": ["test/lessons/a.mjs", …], "sizeBudgetGzBytes": 10240,
//                "benchWeights": { "<metric>": w, … }, "mutable": ["draw.mjs", "layout*.mjs", …] }
// Size: without sizeEntries (old behaviour), gz = gzip of the raw transitive closure of `entry`, gated by
// budgetGzBytes. With sizeEntries, each entry (an evaluator-owned lesson program) is measured as the gzip of
// its closure with comments and whitespace stripped; every entry must fit sizeBudgetGzBytes, the whole
// `entry` (stripped) must fit budgetGzBytes, and the size term uses the mean entry cost.
// Bench: bench.mjs prints one JSON line of numbers (higher = better). Without benchWeights every number is
// summed with weights.bench; with it, only the listed metrics count, each with its own weight. The bench gets
// EVOLVE_SEED: one seed per `eval` run, shared by every candidate in that run, recorded in the archive.
// mutable: when set, a candidate with a parent may change only files matching these globs; every other file
// must be byte-identical to a parent's. Dynamic import() and require() are refused (they hide size).
// Score = 0 unless every test passes and every gate holds; otherwise
// tests*weights.tests + gz*weights.size + bench term.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readArchive, boardOf, boardLines } from "./evolve-board.mjs";

// ---------------------------------------------------------------------------------------------------------
// Comment and whitespace stripping (a conservative tokenizer, not a minifier: it never renames, never joins
// lines that ASI could split differently, and keeps every string, template and regex literal byte for byte).
const ID = /[\w$\u0080-￿]/;
const KW_BEFORE_REGEX = new Set(["return", "typeof", "instanceof", "in", "of", "new", "delete", "void", "throw", "case", "do", "else", "yield", "await"]);
export function strip(src) {
  let i = src.startsWith("#!") ? src.indexOf("\n") : 0, out = "", ws = "", last = "", lastWord = "";
  if (i < 0) return "";
  const emit = (tok) => {
    if (ws && out) {
      const a = out[out.length - 1], b = tok[0];
      const needSpace = (ID.test(a) && ID.test(b)) || (a == b && "+-".includes(a)) || (a == "/" && b == "/") || (/\d/.test(a) && b == ".");
      if (ws == "\n" && !"{([,;".includes(a) && !"})],".includes(b)) out += "\n";
      else if (needSpace) out += ws == "\n" ? "\n" : " ";
    }
    out += tok; ws = "";
  };
  const regexOk = () => !last || (!ID.test(last) && !")]}".includes(last)) || KW_BEFORE_REGEX.has(lastWord);
  function code(untilBrace) {
    let depth = 0;
    while (i < src.length) {
      const c = src[i], d = src[i + 1];
      if (untilBrace && c == "}" && depth == 0) return;
      if (c == "\n" || c == "\r") { ws = "\n"; i++; continue; }
      if (/\s/.test(c)) { if (!ws) ws = " "; i++; continue; }
      if (c == "/" && d == "/") { while (i < src.length && src[i] != "\n") i++; continue; }
      if (c == "/" && d == "*") { const e = src.indexOf("*/", i + 2), body = src.slice(i, e < 0 ? src.length : e + 2); i += body.length; if (body.includes("\n")) ws = "\n"; else if (!ws) ws = " "; continue; }
      if (c == "'" || c == '"') { let j = i + 1; while (j < src.length && src[j] != c) j += src[j] == "\\" ? 2 : 1; emit(src.slice(i, j + 1)); i = j + 1; last = ")"; lastWord = ""; continue; }
      if (c == "`") { template(); continue; }
      if (c == "/" && regexOk()) {
        let j = i + 1, cls = false;
        while (j < src.length && (cls || src[j] != "/")) { if (src[j] == "\\") j++; else if (src[j] == "[") cls = true; else if (src[j] == "]") cls = false; j++; }
        j++; while (j < src.length && /[a-z]/i.test(src[j])) j++;
        emit(src.slice(i, j)); i = j; last = ")"; lastWord = ""; continue; // a regex literal is an operand
      }
      if (ID.test(c)) { let j = i; while (j < src.length && (ID.test(src[j]) || (/\d/.test(c) && src[j] == "." ))) j++; const w = src.slice(i, j); emit(w); i = j; last = w[w.length - 1]; lastWord = w; continue; }
      if (c == "{") depth++;
      if (c == "}") depth--;
      emit(c); i++; last = c; lastWord = "";
    }
  }
  function template() {
    let j = i + 1;
    emit("`");
    for (;;) {
      if (j >= src.length) { i = j; return; }
      if (src[j] == "\\") { out += src.slice(j, j + 2); j += 2; continue; }
      if (src[j] == "`") { out += "`"; i = j + 1; last = ")"; lastWord = ""; return; }
      if (src[j] == "$" && src[j + 1] == "{") { out += "${"; i = j + 2; last = "{"; lastWord = ""; ws = ""; code(true); out += "}"; ws = ""; j = i + 1; continue; }
      out += src[j++];
    }
  }
  code(false);
  return out;
}

// The files an entry really loads, as Node's module loader resolves them (a load hook records each file URL),
// so no import syntax can hide a module from the size gate. A failed import is an error.
function closureFiles(root, entry) {
  const trace = path.join(root, `.evolve-trace-${process.pid}`), hooks = path.join(root, ".evolve-hooks.mjs"), reg = path.join(root, ".evolve-register.mjs");
  fs.writeFileSync(hooks, `import fs from "node:fs";\nexport async function load(url, ctx, next) { if (url.startsWith("file:")) fs.appendFileSync(${JSON.stringify(trace)}, url + "\\n"); return next(url, ctx); }\n`);
  fs.writeFileSync(reg, `import { register } from "node:module";\nregister(${JSON.stringify(new URL("file://" + hooks).href)});\n`);
  fs.rmSync(trace, { force: true });
  try {
    const r = spawnSync(process.execPath, ["--import", reg, "--input-type=module", "-e", `await import(${JSON.stringify(new URL("file://" + path.join(root, entry)).href)})`], { cwd: root, encoding: "utf8", timeout: 60_000 });
    if (r.status !== 0) throw new Error(`${entry} does not load: ${(r.stderr || "").split("\n").find((l) => /Error/.test(l)) ?? r.stderr.slice(0, 200)}`);
    const urls = fs.existsSync(trace) ? fs.readFileSync(trace, "utf8").trim().split("\n").filter(Boolean) : [];
    return [...new Set(urls)].map((u) => decodeURIComponent(new URL(u).pathname)).filter((f) => f.startsWith(root + path.sep) && !path.basename(f).startsWith(".evolve-"));
  } finally { for (const f of [trace, hooks, reg]) fs.rmSync(f, { force: true }); }
}
function closureSize(root, entry, { stripped = false } = {}) {
  const src = closureFiles(root, entry).sort().map((f) => { const t = fs.readFileSync(f, "utf8"); return stripped ? strip(t) + "\n" : t; }).join("");
  return zlib.gzipSync(src, { level: 9 }).length;
}
// Old behaviour, kept byte-compatible for projects without sizeEntries.
function gzSizeRaw(root, entry) {
  const seen = new Set(), stack = [path.join(root, entry)];
  let src = "";
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f) || !fs.existsSync(f)) continue;
    seen.add(f);
    const t = fs.readFileSync(f, "utf8");
    src += t;
    for (const m of t.matchAll(/(?:import|export)[^'"]*?from\s*['"](\.[^'"]+)['"]/g)) stack.push(path.resolve(path.dirname(f), m[1]));
  }
  return zlib.gzipSync(src, { level: 9 }).length;
}

// Size gates. Returns { gz, sizes, libGz, problems }.
function measure(root, cfg) {
  const problems = [];
  if (!cfg.sizeEntries?.length) {
    const gz = gzSizeRaw(root, cfg.entry ?? "index.mjs");
    if (gz > (cfg.budgetGzBytes ?? Infinity)) problems.push(`raw closure ${gz} B > budget ${cfg.budgetGzBytes}`);
    return { gz, sizes: null, libGz: gz, problems };
  }
  const sizes = {};
  for (const e of cfg.sizeEntries) {
    try { sizes[e] = closureSize(root, e, { stripped: true }); } catch (err) { problems.push(err.message); sizes[e] = null; continue; }
    if (sizes[e] > (cfg.sizeBudgetGzBytes ?? Infinity)) problems.push(`${path.basename(e)} costs ${sizes[e]} B > lesson budget ${cfg.sizeBudgetGzBytes}`);
  }
  let libGz = null;
  try { libGz = closureSize(root, cfg.entry ?? "index.mjs", { stripped: true }); } catch (err) { problems.push(err.message); }
  if (libGz != null && libGz > (cfg.budgetGzBytes ?? Infinity)) problems.push(`whole library ${libGz} B > budget ${cfg.budgetGzBytes}`);
  const v = Object.values(sizes).filter((x) => x != null);
  return { gz: v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : Infinity, sizes, libGz, problems };
}

const glob = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*") + "$");
const walk = (d, base = d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name), base) : [path.relative(base, path.join(d, e.name))]));

// Static checks of a candidate's source: frozen files (cfg.mutable) and hidden loads.
function sourceProblems(src, id, cfg, cands) {
  const problems = [], files = walk(src).filter((f) => f != "NOTES.md");
  for (const f of files.filter((f) => /\.m?js$/.test(f))) {
    const t = strip(fs.readFileSync(path.join(src, f), "utf8"));
    if (/(?:^|[^\w$.])import\s*\(/.test(t) || /(?:^|[^\w$.])require\s*\(/.test(t)) problems.push(`${f}: dynamic import() or require() is not allowed (it hides size from the gate)`);
  }
  const parents = cfg.parents?.[id] ?? [];
  if (cfg.mutable?.length && !(id in (cfg.parents ?? {}))) problems.push(`${id} is not registered in evolve.json "parents", so its frozen files cannot be checked`);
  if (cfg.mutable?.length && parents.length) {
    const ok = cfg.mutable.map(glob), free = (f) => ok.some((r) => r.test(f));
    const pdirs = parents.map((p) => path.join(cands, p)).filter((p) => fs.existsSync(p));
    if (!pdirs.length) problems.push(`parents ${parents.join(",")} not found, so frozen files cannot be checked`);
    const frozen = new Set([...files, ...pdirs.flatMap((p) => walk(p))].filter((f) => f != "NOTES.md" && !free(f)));
    for (const f of frozen) {
      const mine = path.join(src, f);
      const same = pdirs.some((p) => fs.existsSync(path.join(p, f)) && fs.existsSync(mine) && fs.readFileSync(path.join(p, f)).equals(fs.readFileSync(mine)));
      if (!same) problems.push(`${f} is frozen this generation (mutable: ${cfg.mutable.join(" ")}) but differs from every parent`);
    }
  }
  return problems;
}

// ---------------------------------------------------------------------------------------------------------
function selftest() {
  let bad = 0;
  const ok = (cond, msg) => { if (!cond) (bad++, console.log(`FAIL ${msg}`)); };
  const same = (code, msg) => { const a = new Function(code)(), b = new Function(strip(code))(); ok(JSON.stringify(a) === JSON.stringify(b), `${msg}: ${JSON.stringify(a)} vs ${JSON.stringify(b)} (stripped: ${strip(code)})`); };
  same("const s = 'a // not a comment', t = \"/* nor this */\"\nreturn [s, t]", "comment markers inside strings");
  same("const r = /\\/\\*[^/]*\\//g // a regex with comment markers\nreturn '/*x*/'.replace(r, 'y')", "regex literal with comment markers");
  same("const a = 6, b = 3, c = 2\nreturn a / b / c", "division is not a regex");
  same("const a = 1, b = 2\nreturn [a + +b, a - -b, a+ ++[0][0]]", "unary operators keep their space");
  same("const x = 5\nconst y = `t${x + `${x * 2}`}` // nested\nreturn y", "nested template literals");
  same("const f = (x) => {\n  return x\n    .toString()\n}\nreturn f(12)", "line continuation");
  same("let a = 1\nlet b = a\n;[a, b] = [b + 1, a]\nreturn [a, b]", "ASI-sensitive line starting with [");
  same("function f() { return /ab+c/.test('abbc') }\nreturn f()", "regex after return");
  same("const o = { a: 1 }\nconst v = o.a\n/ 2\nreturn v", "division on the next line");
  same("const s = '\\'' + \"\\\"\"\nreturn s", "escaped quotes");
  same("return typeof /x/ + (1 /* inline */ + 2)", "regex after typeof, inline comment");
  same("let i = 0\ni\n++\ni\nreturn i", "restricted production: postfix ++ across a line");
  ok(strip("a // c\nb") === "a\nb", "a line comment becomes a newline");
  ok(strip("x  =  1 ;  /* c */  y = 2").length < 12, "whitespace collapses");
  ok(strip("#!/usr/bin/env node\nreturn 1") === "return 1", "a shebang line is dropped");
  // Size gate on a scratch project: entries are measured stripped, a missing import is an error, and an
  // entry over the lesson budget is reported.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "evolve-selftest-"));
  const big = Array.from({ length: 4000 }, (_, k) => `export const v${k} = ${(k * 7919) % 10007} // comment ${k}`).join("\n");
  fs.writeFileSync(path.join(tmp, "a.mjs"), "// header\nexport const a = 1  /* x */\n");
  fs.writeFileSync(path.join(tmp, "big.mjs"), big);
  fs.writeFileSync(path.join(tmp, "e1.mjs"), "import { a } from './a.mjs'\nexport const run = () => a\n");
  fs.writeFileSync(path.join(tmp, "e2.mjs"), "import { v1 } from './big.mjs'\nexport const run = () => v1\n");
  fs.writeFileSync(path.join(tmp, "e3.mjs"), "import { q } from './missing.mjs'\n");
  fs.writeFileSync(path.join(tmp, "e4.mjs"), "import{v2}from'./big.mjs';export const run=()=>v2\n");
  fs.writeFileSync(path.join(tmp, "index.mjs"), "export * from './a.mjs'\nexport * from './big.mjs'\n");
  const m1 = measure(tmp, { entry: "index.mjs", sizeEntries: ["e1.mjs"], sizeBudgetGzBytes: 100, budgetGzBytes: 1e6 });
  ok(!m1.problems.length && m1.sizes["e1.mjs"] < closureSize(tmp, "e1.mjs"), `stripped entry is smaller and passes (${JSON.stringify(m1)})`);
  const m2 = measure(tmp, { entry: "index.mjs", sizeEntries: ["e1.mjs", "e2.mjs"], sizeBudgetGzBytes: 2000, budgetGzBytes: 1e6 });
  ok(m2.problems.length == 1 && /e2\.mjs costs/.test(m2.problems[0]), `an entry over budget is gated (${m2.problems})`);
  const m3 = measure(tmp, { entry: "index.mjs", sizeEntries: ["e3.mjs"], sizeBudgetGzBytes: 2000 });
  ok(m3.problems.some((p) => /missing\.mjs/.test(p)), "a missing import is an error, not a free byte");
  const m5 = measure(tmp, { entry: "index.mjs", sizeEntries: ["e4.mjs"], sizeBudgetGzBytes: 2000 });
  ok(m5.problems.length == 1, "a minified import is still followed (the loader, not a regex, finds the closure)");
  const m4 = measure(tmp, { entry: "index.mjs", budgetGzBytes: 100 });
  ok(m4.sizes == null && m4.problems.length == 1 && m4.gz == gzSizeRaw(tmp, "index.mjs"), "without sizeEntries the old raw gate applies");
  fs.writeFileSync(path.join(tmp, "dyn.mjs"), "export const f = () => import('./big.mjs')\n");
  ok(sourceProblems(tmp, "x", {}, tmp).some((p) => /dyn\.mjs/.test(p)), "dynamic import is refused");
  // Frozen files: a child that changes a frozen file is refused; changing a mutable one is fine.
  const cands = path.join(tmp, "cands");
  for (const c of ["p", "ok", "bad"]) { fs.mkdirSync(path.join(cands, c), { recursive: true }); fs.writeFileSync(path.join(cands, c, "core.mjs"), "export const a = 1\n"); fs.writeFileSync(path.join(cands, c, "draw.mjs"), "export const d = 1\n"); }
  fs.writeFileSync(path.join(cands, "ok", "draw.mjs"), "export const d = 2\n");
  fs.writeFileSync(path.join(cands, "ok", "layout-x.mjs"), "export const l = 2\n");
  fs.writeFileSync(path.join(cands, "bad", "core.mjs"), "export const a = 2\n");
  const fcfg = { mutable: ["draw.mjs", "layout*.mjs"], parents: { ok: ["p"], bad: ["p"] } };
  ok(sourceProblems(path.join(cands, "ok"), "ok", fcfg, cands).length == 0, "mutable files may change, new mutable files may be added");
  ok(sourceProblems(path.join(cands, "bad"), "bad", fcfg, cands).some((p) => /core\.mjs is frozen/.test(p)), "a frozen file that changed is refused");
  ok(sourceProblems(path.join(cands, "ok"), "stranger", fcfg, cands).some((p) => /not registered/.test(p)), "an unregistered candidate is refused when files are frozen");
  fs.rmSync(tmp, { recursive: true, force: true });
  // The real library still works when every module is stripped: run the knot tests on a stripped copy.
  const lib = path.resolve("src/lab/knots");
  if (fs.existsSync(path.join(lib, "test"))) {
    const t2 = fs.mkdtempSync(path.join(os.tmpdir(), "evolve-selftest-knots-"));
    fs.cpSync(lib, t2, { recursive: true, filter: (s) => !s.includes(`${path.sep}candidates`) });
    for (const f of walk(t2).filter((f) => f.endsWith(".mjs"))) fs.writeFileSync(path.join(t2, f), strip(fs.readFileSync(path.join(t2, f), "utf8")));
    const files = walk(path.join(t2, "test")).filter((f) => /\.test\.mjs$/.test(f)).map((f) => path.join("test", f));
    const r = spawnSync(process.execPath, ["--test", "--test-reporter=tap", ...files], { cwd: t2, encoding: "utf8", timeout: 300_000 });
    const pass = Number(r.stdout.match(/^# pass (\d+)/m)?.[1] ?? 0), fail = Number(r.stdout.match(/^# fail (\d+)/m)?.[1] ?? 1);
    ok(pass > 0 && fail == 0, `knot tests pass on stripped source (${pass} pass, ${fail} fail)`);
    fs.rmSync(t2, { recursive: true, force: true });
  }
  console.log(bad ? `selftest: ${bad} failure(s)` : "selftest: ok");
  process.exit(bad ? 1 : 0);
}

// ---------------------------------------------------------------------------------------------------------
const argv = process.argv.slice(2), flags = Object.fromEntries(argv.filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));
const [cmd, project, ...ids] = argv.filter((a) => !a.startsWith("--"));
if (cmd === "selftest") selftest();
if (!cmd || !project) (console.log("usage: node tools/evolve.mjs eval|board|promote|size <project> [id…] [--seed=N] | selftest"), process.exit(1));
const dir = path.resolve(process.env.EVOLVE_ROOT ?? "src/lab", project);
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "evolve.json"), "utf8"));
const ARCHIVE = path.resolve(process.env.EVOLVE_ARCHIVE ?? `company/rnd/evolution/${project}.jsonl`);
const cands = path.join(dir, "candidates");
const W = { tests: 100, size: -0.002, bench: 1, ...(cfg.weights ?? {}) };
const SEED = Number(flags.seed ?? process.env.EVOLVE_SEED ?? crypto.randomInt(1, 2 ** 31));

// The candidate as the evaluator sees it: its source plus the project's fixed test/ and bench.mjs.
function stage(id) {
  const src = path.join(cands, id);
  if (!fs.existsSync(src)) throw new Error(`${id}: no such candidate in ${path.relative(process.cwd(), cands)}`);
  if (fs.existsSync(path.join(src, "test"))) throw new Error(`${id}: candidates may not ship tests; the evaluator's tests are fixed`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `evolve-${project}-`));
  fs.cpSync(src, tmp, { recursive: true });
  fs.cpSync(path.join(dir, "test"), path.join(tmp, "test"), { recursive: true });
  if (fs.existsSync(path.join(dir, "bench.mjs"))) fs.copyFileSync(path.join(dir, "bench.mjs"), path.join(tmp, "bench.mjs"));
  return { src, tmp };
}

function evaluate(id) {
  const { src, tmp } = stage(id);
  const t0 = Date.now();
  const files = fs.readdirSync(path.join(tmp, "test"), { recursive: true }).filter((f) => /\.test\.m?js$/.test(f)).map((f) => path.join("test", f));
  const r = spawnSync(process.execPath, ["--test", "--test-reporter=tap", ...files], { cwd: tmp, encoding: "utf8", timeout: 300_000 });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const pass = Number(out.match(/^# pass (\d+)/m)?.[1] ?? 0), fail = Number(out.match(/^# fail (\d+)/m)?.[1] ?? (r.status ? 1 : 0));
  const size = measure(tmp, cfg), problems = [...size.problems, ...sourceProblems(src, id, cfg, cands)];
  let bench = {};
  if (fail === 0 && fs.existsSync(path.join(tmp, "bench.mjs"))) {
    try { bench = JSON.parse(execFileSync(process.execPath, ["bench.mjs"], { cwd: tmp, encoding: "utf8", timeout: 600_000, env: { ...process.env, EVOLVE_SEED: String(SEED) } }).trim().split("\n").pop()); } catch (e) { bench = { error: String(e.message).slice(0, 120) }; }
  }
  const gated = fail === 0 && pass > 0 && !problems.length;
  const BW = cfg.benchWeights;
  const benchScore = BW ? Object.entries(BW).reduce((s, [k, w]) => s + (typeof bench[k] === "number" ? bench[k] * w : 0), 0) : Object.values(bench).filter((v) => typeof v === "number").reduce((a, b) => a + b, 0) * W.bench;
  const score = gated ? Math.round((pass * W.tests + size.gz * W.size + benchScore) * 100) / 100 : 0;
  fs.rmSync(tmp, { recursive: true, force: true });
  const rec = { ts: new Date().toISOString(), project, id, parents: cfg.parents?.[id] ?? [], seed: SEED, pass, fail, gzBytes: size.gz, ...(size.sizes ? { sizes: size.sizes, libGzBytes: size.libGz } : {}), bench, benchScore: Math.round(benchScore * 100) / 100, score, gated, ...(problems.length ? { problems } : {}), ms: Date.now() - t0 };
  fs.mkdirSync(path.dirname(ARCHIVE), { recursive: true });
  fs.appendFileSync(ARCHIVE, JSON.stringify(rec) + "\n");
  return rec;
}

const board = () => boardOf(readArchive(ARCHIVE)); // shared with the HQ R&D page: tools/evolve-board.mjs

if (cmd === "eval") {
  const list = ids.length ? ids : fs.existsSync(cands) ? fs.readdirSync(cands).filter((d) => fs.statSync(path.join(cands, d)).isDirectory()) : [];
  console.log(`bench seed ${SEED} (one seed for every candidate in this run)`);
  for (const id of list) {
    const r = evaluate(id);
    console.log(`${id.padEnd(24)} score ${String(r.score).padStart(9)}  tests ${r.pass}/${r.pass + r.fail}  ${r.gzBytes} B gz${r.sizes ? " (mean lesson)" : ""}  bench ${r.benchScore}${r.gated ? "" : "  (gated out)"}`);
    for (const p of r.problems ?? []) console.log(`  - ${p}`);
  }
} else if (cmd === "board") {
  for (const l of boardLines(readArchive(ARCHIVE))) console.log(l);
} else if (cmd === "size") {
  const { tmp } = stage(ids[0] ?? fs.readdirSync(cands)[0]);
  const m = measure(tmp, cfg);
  for (const [e, b] of Object.entries(m.sizes ?? {})) console.log(`${String(b).padStart(6)} B  ${e}`);
  console.log(`${String(m.libGz).padStart(6)} B  ${cfg.entry ?? "index.mjs"} (whole library)`);
  for (const p of m.problems) console.log(`  - ${p}`);
  fs.rmSync(tmp, { recursive: true, force: true });
} else if (cmd === "promote") {
  const id = ids[0];
  const top = board()[0];
  if (!top || top.id !== id) console.log(`warning: ${id} is not the leaderboard's top (${top?.id ?? "none"}); promoting anyway because you asked`);
  for (const f of fs.readdirSync(path.join(cands, id))) fs.cpSync(path.join(cands, id, f), path.join(dir, f), { recursive: true });
  console.log(`promoted ${id} into ${path.relative(process.cwd(), dir)}`);
}
