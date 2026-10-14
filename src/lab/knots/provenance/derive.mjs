// Derive the knot table's PD codes from factual source notation (sources.mjs) with this library's own code.
// Run: node src/lab/knots/provenance/derive.mjs          (prints the verification table)
//      node src/lab/knots/provenance/derive.mjs --write  (also regenerates table.derived.mjs)
// Plain ESM, no dependencies. See README.md in this folder.
import { load, trace, darts, S, isOver, mirror, reverse, writhe, nX } from '../core.mjs'
import { fromDT, fromBraid, fromGauss } from '../codes.mjs'
import { SOURCES } from './sources.mjs'

// Source notation -> PD code. The chirality is fixed by the writhe bit w (mirror if the writhe is -w), and
// the orientation by rev (components of the derived diagram to reverse): both are conventions, not data.
export function derive(src) {
  let pd = src.pd ?? (src.dt ? fromDT(src.dt) : src.conway ? fromGauss([platGauss(conwayBraid(src.conway))]) : fromBraid(src.braid))
  if (src.w != null && writhe(pd) != src.w) pd = mirror(pd)
  if (src.w != null && writhe(pd) != src.w) throw Error(`${src.name}: writhe ${writhe(pd)}, expected ±${src.w}`)
  for (const k of src.rev ?? []) pd = reverse(pd, k)
  return pd
}

// Conway notation a1 a2 ... an (n odd) of a 2-bridge knot -> the 4-braid s2^a1 s1^-a2 s2^a3 ... whose plat
// closure is the standard diagram (Burde-Zieschang, "Knots", ch. 12; Murasugi, "Knot Theory and Its
// Applications", ch. 9).
export function conwayBraid(a) {
  if (a.length % 2 == 0) throw Error('this 4-plat form needs an odd-length Conway notation')
  return a.flatMap((x, k) => Array(x).fill(k % 2 ? -1 : 2))
}

// Plat closure of a 4-braid (caps join positions 1-2 and 3-4 at the top and the bottom) as an unsigned Gauss
// code: walk the strand, recording +j at an over-pass and -j at an under-pass of crossing j. In sigma_i (i > 0)
// the strand that is at position i above the crossing passes over; in sigma_i^-1 it passes under.
export function platGauss(w) {
  const code = [], m = w.length, cap = (p) => (p % 2 ? p + 1 : p - 1)
  let p = 1, j = 0, down = true
  for (let guard = 0; guard < 8 * m + 8; guard++) {
    if (down && j == m) { p = cap(p); down = false; j = m - 1; continue }
    if (!down && j < 0) { p = cap(p); down = true; j = 0; if (p == 1) return code; continue }
    const i = Math.abs(w[j])
    if (p == i || p == i + 1) { const top = down ? p == i : p == i + 1; code.push(top == w[j] > 0 ? j + 1 : -(j + 1)); p = p == i ? i + 1 : i }
    j += down ? 1 : -1
  }
  throw Error('plat closure is not a knot')
}

// One base-36 character per edge label, four per crossing (the table.mjs format).
export const encode = (pd) => pd.map((x) => x.map((l) => l.toString(36)).join('')).join('')
export const decode = (s) => (s.match(/..../g) || []).map((q) => [...q].map((c) => parseInt(c, 36)))

// Diagram isomorphism on the sphere. Returns null, or how B is A: { plane: +1 | -1 (orientation of the
// sphere preserved or reflected), crossings: +1 | -1 (over/under kept or all switched), reversed: [component
// indices of A, numbered as in reverse(), whose orientation is reversed], map: crossing of A -> crossing of B }.
// plane +1, crossings +1, reversed [] means the same oriented diagram up to relabelling.
export function iso(A, B) {
  const a = load(A), b = load(B)
  if (a.n != b.n || a.loops != b.loops) return null
  if (!a.n) return { plane: 1, crossings: 1, reversed: [], map: [] }
  const Si = (d) => (d & ~3) | ((d + 3) & 3), comp = trace(a)[1]
  for (const rot of [S, Si]) for (let e = 0; e < 4 * b.n; e++) {
    const phi = new Map([[0, e]]), q = [0]
    let ok = true
    while (ok && q.length) {
      const d = q.pop()
      for (const [x, y] of [[a.o[d], b.o[phi.get(d)]], [S(d), rot(phi.get(d))]]) {
        if (!phi.has(x)) phi.set(x, y), q.push(x)
        else if (phi.get(x) != y) ok = false
      }
    }
    if (!ok || phi.size != 4 * a.n || new Set(phi.values()).size != 4 * a.n) continue
    const ov = darts(a).map((d) => isOver(a, d) == isOver(b, phi.get(d)))
    if (!ov.every((x) => x == ov[0])) continue
    const rev = new Set(), fwd = new Set()
    for (const d of darts(a)) (a.h[d] == b.h[phi.get(d)] ? fwd : rev).add(comp[d])
    if ([...rev].some((k) => fwd.has(k))) continue
    return { plane: rot == S ? 1 : -1, crossings: ov[0] ? 1 : -1, reversed: [...rev].sort(), map: [...Array(a.n).keys()].map((c) => phi.get(4 * c) >> 2) }
  }
  return null
}

export const describe = (r) => !r ? 'different diagram' :
  r.plane == 1 && r.crossings == 1 ? (r.reversed.length ? `same diagram, component(s) ${r.reversed} reversed` : 'same diagram (relabelled)') :
  r.plane == -1 && r.crossings == -1 ? `same diagram turned over (3-D flip)${r.reversed.length ? ', reversed ' + r.reversed : ''}` :
  `mirror-image diagram (plane ${r.plane}, crossings ${r.crossings})`

export const derivedTable = () => SOURCES.map((s) => ({ ...s, pd: derive(s) }))

export function fileText(rows) {
  const meta = (s) => { const o = {}; for (const k of ['alias', 'c', 'u', 'a']) if (s[k] != null && !(k == 'c' && s.c == (+s.name[0] || 0))) o[k] = s[k]; return Object.keys(o).length ? ', ' + JSON.stringify(o).replace(/"(\w+)":/g, '$1: ').replace(/,(?=\w)/g, ', ').replace(/"/g, "'").replace(/^\{/, '{ ').replace(/\}$/, ' }') : '' }
  return `// GENERATED by src/lab/knots/provenance/derive.mjs --write from sources.mjs. Do not edit.
// Same format and exports as ../table.mjs; every PD code is derived by this library's own code from factual
// notation typed in by hand (DT codes, a Conway notation, braid words). See provenance/README.md.
// U10 (the monster unknot, from Regina) is deliberately absent: see provenance/README.md, 'U10'.
// On promotion to src/kit/knots this file replaces table.mjs, with the import path changed to './core.mjs'.
import { connectedSum, mirror } from '../core.mjs'

const T = {}
const K = (name, s, x = {}) => (T[name] = { name, pd: (s.match(/..../g) || []).map((q) => [...q].map((c) => parseInt(c, 36))), c: +name[0] || 0, ...x })
${rows.map((s) => `K('${s.name}', '${encode(s.pd)}'${meta(s)})`).join('\n')}
T.granny = { name: 'granny', pd: connectedSum(T['3_1'].pd, T['3_1'].pd), c: 6, u: 2 }
T.square = { name: 'square', pd: connectedSum(T['3_1'].pd, mirror(T['3_1'].pd)), c: 6, u: 2, a: true }
export const KNOTS = T
export const knot = (n) => T[n] ?? Object.values(T).find((k) => k.alias == n)
`
}

// Largest crossing-position difference after the best similarity fit (rotation, scale, shift, and a
// reflection when the isomorphism reflects the plane), relative to the drawing's radius.
export function drawingDelta(LA, LB, r) {
  const P = LA.crossings.map(([x, y]) => [x, r.plane == 1 ? y : -y]), Q = r.map.map((j) => LB.crossings[j])
  const n = P.length, mp = mean(P), mq = mean(Q), p = P.map(([x, y]) => [x - mp[0], y - mp[1]]), q = Q.map(([x, y]) => [x - mq[0], y - mq[1]])
  let re = 0, im = 0, nn = 0
  for (let i = 0; i < n; i++) re += q[i][0] * p[i][0] + q[i][1] * p[i][1], im += q[i][1] * p[i][0] - q[i][0] * p[i][1], nn += p[i][0] ** 2 + p[i][1] ** 2
  const ar = re / (nn || 1), ai = im / (nn || 1), R = Math.max(1e-9, ...q.map(([x, y]) => Math.hypot(x, y)))
  const err = Math.max(0, ...p.map(([x, y], i) => Math.hypot(ar * x - ai * y - q[i][0], ai * x + ar * y - q[i][1]))) / R
  return err < 0.02 ? `same up to similarity (${err.toFixed(3)})` : `differs (${err.toFixed(2)})`
}
const mean = (P) => [P.reduce((s, p) => s + p[0], 0) / (P.length || 1), P.reduce((s, p) => s + p[1], 0) / (P.length || 1)]

if (import.meta.url == `file://${process.argv[1]}`) {
  const { KNOTS } = await import('../table.mjs')
  const { alexander, jones } = await import('../invariants.mjs')
  const { pstr } = await import('../poly.mjs')
  const { layout } = await import('../draw.mjs')
  const rows = derivedTable()
  console.log('entry | source | c (derived/current) | Alexander | Jones | diagram vs current | drawing')
  for (const s of rows) {
    const cur = KNOTS[s.name]?.pd, notation = s.dt ? `DT ${s.dt.join(' ')}` : s.braid ? `braid ${s.braid.join(' ')}` : s.conway ? `Conway ${s.conway.join(' ')} (4-plat)` : 'empty'
    if (!cur) { console.log(`${s.name} | ${notation} | ${nX(s.pd)} | - | - | not in table.mjs | -`); continue }
    const r = iso(cur, s.pd), al = pstr(alexander(s.pd)) == pstr(alexander(cur)), jo = pstr(jones(s.pd)) == pstr(jones(cur))
    console.log(`${s.name} | ${notation} | ${nX(s.pd)}/${nX(cur)} | ${al ? 'same' : 'DIFF'} | ${jo ? 'same' : 'DIFF'} | ${describe(r)} | ${r ? drawingDelta(layout(cur), layout(s.pd), r) : '-'}`)
  }
  if (process.argv.includes('--write')) {
    const { writeFileSync } = await import('node:fs')
    writeFileSync(new URL('./table.derived.mjs', import.meta.url), fileText(rows))
    console.log('wrote table.derived.mjs')
  }
}
