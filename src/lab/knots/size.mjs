// Size of what typical lessons import. Usage: node src/lab/knots/size.mjs
// Two numbers per import set:
//   closure: gzip of the raw source of every module reached (what tools/evolve.mjs measures for index.mjs);
//   shaken:  a lesson's real cost after a bundler drops unused exports and minifies. Estimated by joining the
//            modules, exporting only the names the lesson uses, and minifying with the terser that ships
//            inside Next.js (a dev-time measurement only; the library itself has no dependencies).
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { createRequire } from 'node:module'

const here = path.dirname(new URL(import.meta.url).pathname), gz = (s) => zlib.gzipSync(s, { level: 9 }).length
const deps = (f) => [...fs.readFileSync(f, 'utf8').matchAll(/(?:import|export)[^'"]*?from\s*['"](\.[^'"]+)['"]/g)].map((m) => path.resolve(path.dirname(f), m[1]))
function order(entries) {
  const seen = new Set(), out = []
  const visit = (f) => { if (seen.has(f)) return; seen.add(f); deps(f).forEach(visit); out.push(f) }
  entries.map((e) => path.join(here, e)).forEach(visit)
  return out
}
let terser
try { terser = createRequire(import.meta.url)('next/dist/compiled/terser') } catch {}
async function shaken(files, names) {
  if (!terser) return NaN
  const src = files.map((f) => fs.readFileSync(f, 'utf8').replace(/^\s*import[^\n]*\n/gm, '').replace(/^export \*[^\n]*\n|^export \{[^}]*\}[^\n]*\n/gm, '').replace(/^export /gm, '')).join('\n') + `\nexport { ${names.join(', ')} }\n`
  return gz((await terser.minify(src, { module: true, compress: { passes: 2 }, mangle: true })).code)
}
const typical = [
  ['draw a table knot', ['table.mjs', 'draw.mjs'], ['KNOTS', 'draw']],
  ['tap crossings to make it the unknot', ['table.mjs', 'draw.mjs', 'core.mjs', 'moves.mjs'], ['KNOTS', 'draw', 'layout', 'crossingChange', 'simplify']],
  ['is this trefoil tricolourable?', ['table.mjs', 'draw.mjs', 'invariants.mjs'], ['KNOTS', 'draw', 'arcs', 'colouringOk', 'colourings']],
  ['Reidemeister moves keep the Jones polynomial', ['table.mjs', 'draw.mjs', 'invariants.mjs', 'moves.mjs', 'poly.mjs'], ['KNOTS', 'draw', 'moves', 'apply', 'jones', 'pstr']],
  ['linking number of a link', ['table.mjs', 'draw.mjs', 'core.mjs'], ['knot', 'draw', 'linkingNumber', 'signs', 'deleteComponent']],
  ['random knot: is it the unknot?', ['random.mjs', 'draw.mjs', 'moves.mjs', 'identify.mjs'], ['randomKnot', 'draw', 'simplify', 'identify']],
  ['everything (index.mjs)', ['index.mjs'], null],
]
for (const [name, entries, names] of typical) {
  const files = order(entries), closure = gz(files.map((f) => fs.readFileSync(f, 'utf8')).join(''))
  const all = names ?? [...files.flatMap((f) => [...fs.readFileSync(f, 'utf8').matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1]))]
  console.log(`${String(await shaken(files, all)).padStart(6)} B shaken  ${String(closure).padStart(6)} B closure  ${name}`)
}
