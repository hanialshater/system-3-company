// W-946 / AMD-001 (c2) + rider R1: the registry is split by side, and the importers keep it that way.
//
//   npm run test:platform
//
// tools/company.mjs `check` judges the generated files themselves (invariants 1 to 6). It cannot see who imports
// them, and the W-946 leak was an importer choice: a "use client" file imported the module holding every meta.json.
// This test scans the import graph of src/ (static imports, re-exports, import(); `import type` is erased and skipped):
//   1. no "use client" file, nor anything it reaches, reaches src/demos/index.generated.ts or src/lib/catalog.ts;
//   2. src/demos/loaders.generated.ts is imported by src/components/DemoHost.tsx and by nothing else;
//   3. so no server module imports it (a server import puts every lesson's code and CSS back in the page shell);
//   4. src/demos/index.generated.ts is imported by src/lib/catalog.ts alone, which imports "server-only";
//   5. src/demos/registry.generated.ts is gone and nothing imports it;
//   6. every meta.json carries an unquoted zero-tolerance internal string (what keeps the static/chunks ratchet safe).
// Design: company/engineering/notes/2026-10-15-w946-loaders-design.md section 2. The built-output test checks the
// result in static/chunks (built-output.test.mjs).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { INTERNAL_STRINGS, LESSON_CODE_FIELDS } from "./internal-strings.mjs";

const repo = path.resolve(new URL("../..", import.meta.url).pathname);
const INDEX = "src/demos/index.generated.ts";
const LOADERS = "src/demos/loaders.generated.ts";
const OLD = "src/demos/registry.generated.ts";
const CATALOG = "src/lib/catalog.ts";
const HOST = "src/components/DemoHost.tsx";

const CODE_EXT = [".tsx", ".ts", ".mjs", ".js", ".jsx"];
const RESOLVE_EXT = ["", ...CODE_EXT, ".json", ".css", ...CODE_EXT.map((e) => `/index${e}`)];
// Static imports and re-exports (type-only ones excluded below), bare side-effect imports, and import().
const IMPORT_RE = /(^|[^\w$.])(import|export)(\s+type)?\s[^"'`;]*?from\s*["']([^"']+)["']|(^|[^\w$.])import\s*["']([^"']+)["']|\bimport\(\s*["']([^"']+)["']\s*\)/gm;

const abs = (p) => path.join(repo, p);
const isFile = (p) => fs.existsSync(abs(p)) && fs.statSync(abs(p)).isFile();

function walk(dir, out = []) {
  for (const e of fs.readdirSync(abs(dir), { withFileTypes: true })) {
    const p = path.posix.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (CODE_EXT.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
}

function walkAll(dir, out = []) {
  for (const e of fs.readdirSync(abs(dir), { withFileTypes: true })) {
    const p = path.posix.join(dir, e.name);
    if (e.isDirectory()) walkAll(p, out);
    else out.push(p);
  }
  return out;
}

function resolveSpec(from, spec) {
  let base;
  if (spec.startsWith("@/")) base = path.posix.join("src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.posix.join(path.posix.dirname(from), spec);
  else return null; // a package
  for (const ext of RESOLVE_EXT) if (isFile(base + ext)) return base + ext;
  return null;
}

const files = walk("src");
const src = new Map(files.map((f) => [f, fs.readFileSync(abs(f), "utf8")]));
const deps = new Map();
for (const [f, text] of src) {
  const out = [];
  for (const m of text.matchAll(IMPORT_RE)) {
    if (m[3]) continue; // import type / export type: erased at build time
    const spec = m[4] ?? m[6] ?? m[7];
    const r = resolveSpec(f, spec);
    if (r) out.push(r);
  }
  deps.set(f, out);
}
const isClient = (f) => /^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*\s*["']use client["']/.test(src.get(f) ?? "");
const importersOf = (target) => files.filter((f) => deps.get(f).includes(target));

test("the registry is split: index and loaders exist, registry.generated.ts is gone and nothing imports it", () => {
  assert.ok(isFile(INDEX), `${INDEX} exists (npm run registry)`);
  assert.ok(isFile(LOADERS), `${LOADERS} exists (npm run registry)`);
  assert.ok(!isFile(OLD), `${OLD} must not exist: a re-export would let the next importer bring W-946 back`);
  const stale = files.filter((f) => /registry\.generated/.test(src.get(f)));
  assert.deepEqual(stale, [], "files that still mention registry.generated");
});

test("the generated files keep to their side (metas without import(), loaders without meta.json)", () => {
  const idx = fs.readFileSync(abs(INDEX), "utf8");
  const ld = fs.readFileSync(abs(LOADERS), "utf8");
  assert.doesNotMatch(idx, /\bimport\s*\(/, "index.generated.ts holds an import()");
  assert.match(idx, /^import m0 from "\.\/[^"]+\/meta\.json";$/m, "index.generated.ts imports the metas");
  assert.match(ld, /^  "[^"]+": \(\) => import\("\.\/[^"]+\/Demo"\),$/m, "loaders.generated.ts holds the loaders");
  assert.doesNotMatch(ld, /from\s*["'][^"']*\.json["']/, "loaders.generated.ts imports a meta.json");
  for (const [name, text] of [["index", idx], ["loaders", ld]])
    assert.doesNotMatch(text, /(from|import)\s*\(?\s*["'][^"']*\.generated(\.ts)?["']/, `${name}.generated.ts imports another generated file`);
});

test("only DemoHost.tsx imports loaders.generated, and it is a client module (no server module imports it)", () => {
  assert.deepEqual(importersOf(LOADERS), [HOST]);
  assert.ok(isClient(HOST), `${HOST} starts with "use client"`);
  const serverImporters = importersOf(LOADERS).filter((f) => !isClient(f));
  assert.deepEqual(serverImporters, [], "server modules importing loaders.generated put every lesson's code and CSS in the shell");
});

test("only catalog.ts imports index.generated, and catalog.ts is server-only", () => {
  assert.deepEqual(importersOf(INDEX), [CATALOG]);
  assert.match(src.get(CATALOG), /^import "server-only";$/m, `${CATALOG} imports "server-only"`);
  assert.ok(!isClient(CATALOG), `${CATALOG} is not a client module`);
  // Review C1 (F2): CI runs `build`, not this test. The generated index imports "server-only" itself, so a client
  // module importing @/demos/index.generated directly fails `next build` on CI, not only this advisory scan.
  assert.match(src.get(INDEX), /^import "server-only";$/m, `${INDEX} imports "server-only" (tools/registry.mjs emits it)`);
});

test('no "use client" module reaches index.generated or catalog.ts, directly or through its imports', () => {
  const clients = files.filter(isClient);
  assert.ok(clients.includes(HOST) && clients.length > 10, `found client modules (${clients.length})`);
  const parent = new Map(clients.map((c) => [c, null]));
  const stack = [...clients];
  while (stack.length) {
    const f = stack.pop();
    for (const d of deps.get(f) ?? []) if (!parent.has(d)) (parent.set(d, f), stack.push(d));
  }
  const chain = (f) => { const out = []; for (let x = f; x; x = parent.get(x)) out.unshift(x); return out.join(" -> "); };
  const leaks = [INDEX, CATALOG].filter((t) => parent.has(t)).map(chain);
  assert.deepEqual(leaks, [], "client import chains that reach every meta.json");
});

test("the scanner sees what it must (self-check: a planted client import is caught)", () => {
  const planted = 'import { demos } from "@/demos/index.generated";\nimport type { X } from "@/lib/catalog";\n';
  const found = [...planted.matchAll(IMPORT_RE)].filter((m) => !m[3]).map((m) => resolveSpec("src/components/X.tsx", m[4] ?? m[6] ?? m[7]));
  assert.deepEqual(found, [INDEX], "a value import is seen and a type-only import is skipped");
  assert.deepEqual([...'const L = () => import("./a/b/Demo");'.matchAll(IMPORT_RE)].map((m) => m[7]), ["./a/b/Demo"]);
});

test("every meta.json carries an unquoted zero-tolerance internal string (keeps the static/chunks field ratchet safe)", () => {
  // built-output.test.mjs lets LESSON_CODE_FIELDS appear in up to 2 client chunks (Life Hacks lesson code uses them).
  // That ratchet only hides nothing while a meta.json in any client chunk still trips a 0-hit string. Count only
  // strings without quotes: a bundler may serialise JSON keys unquoted, so '"curriculum"' is not a reliable tripwire.
  const tripwires = INTERNAL_STRINGS.filter((s) => !LESSON_CODE_FIELDS.includes(s) && !s.includes('"'));
  const metas = walkAll("src/demos").filter((p) => p.endsWith("/meta.json"));
  assert.ok(metas.length > 100, `found meta.json files (${metas.length})`);
  const bare = metas.filter((p) => { const t = fs.readFileSync(abs(p), "utf8"); return !tripwires.some((s) => t.includes(s)); });
  assert.deepEqual(bare, [], `meta.json files with none of ${tripwires.join(" | ")}: the ${LESSON_CODE_FIELDS.join(" ")} ratchet in built-output.test.mjs would then be the only signal that such a meta reached the browser. Give it a claim with checkedBy/checkedOn, or tighten the ratchet`);
});
