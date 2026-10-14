// Conversions: PD <-> signed Gauss code, PD <-> DT code (knots), braid word -> PD.
import { load, toPD, trace, darts, isOver, sign } from './core.mjs'

export function toGauss(pd) {
  const M = load(pd), [L, C, k] = trace(M), code = Array.from({ length: k + M.loops }, () => []), idx = []
  let i = 0
  for (let c = 0; c < M.n; c++) if (!M.dead[c]) idx[c] = ++i
  for (const t of darts(M).filter((d) => !M.h[d]).sort((a, b) => L[a] - L[b])) { const d = M.o[t]; code[C[t]].push(isOver(M, d) ? idx[d >> 2] : -idx[d >> 2]) }
  return { code, signs: idx.map((_, c) => sign(M, c)).filter((x, c) => idx[c]) }
}

export function fromGauss(code, signs) {
  const n = Math.max(0, ...code.flat().map(Math.abs)), P = Array.from({ length: n }, () => [])
  let e = 0, loops = 0
  for (const g of code) {
    if (!g.length) { loops++; continue }
    g.forEach((x, i) => { const c = Math.abs(x) - 1, a = e + i + 1, b = e + ((i + 1) % g.length) + 1; x > 0 ? ((P[c][2] = a), (P[c][3] = b)) : ((P[c][0] = a), (P[c][1] = b)) })
    e += g.length
  }
  const build = (s) => { let f = e; return [...P.map(([ui, uo, oi, oo], c) => (s[c] > 0 ? [ui, oo, uo, oi] : [ui, oi, uo, oo])), ...Array.from({ length: loops }, () => [++f])] }
  if (signs) return toPD(load(build(signs)))
  for (let m = 0; m < 1 << n; m++) try { return toPD(load(build(P.map((_, c) => (m >> c) & 1 ? -1 : 1)))) } catch {}
  throw Error('Gauss code has no planar realisation')
}

export function toDT(pd) {
  const { code } = toGauss(pd)
  if (code.length != 1) throw Error('DT codes are for knots')
  let g = code[0]; const s = Math.max(0, g.findIndex((x) => x > 0)), lab = {}
  g = [...g.slice(s), ...g.slice(0, s)]
  g.forEach((x, i) => (lab[Math.abs(x)] ||= []).push([i + 1, x > 0]))
  return Object.values(lab).map(([[a, ao], [b, bo]]) => (a % 2 ? [a, b, bo] : [b, a, ao])).sort((x, y) => x[0] - y[0]).map(([, b, o]) => (o ? -b : b))
}

export function fromDT(dt) {
  const g = []
  dt.forEach((x, i) => { const ov = x < 0; g[2 * i] = ov ? -(i + 1) : i + 1; g[Math.abs(x) - 1] = ov ? i + 1 : -(i + 1) })
  return fromGauss([g])
}

export function fromBraid(w, k = Math.max(1, ...w.map((x) => Math.abs(x) + 1))) {
  let e = 0
  const cur = Array.from({ length: k }, () => ++e), start = [...cur], X = [], map = {}
  for (const g of w) {
    const i = Math.abs(g) - 1, a = ++e, b = ++e, l = cur[i], r = cur[i + 1]
    X.push(g > 0 ? [r, b, a, l] : [l, r, b, a]); cur[i] = a; cur[i + 1] = b
  }
  let loops = 0
  cur.forEach((x, p) => (x == start[p] ? loops++ : (map[x] = start[p])))
  return toPD(load([...X.map((x) => x.map((l) => map[l] ?? l)), ...Array.from({ length: loops }, () => [++e])]))
}
