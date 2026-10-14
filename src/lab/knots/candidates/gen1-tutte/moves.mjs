// Reidemeister moves on PD codes. Every function takes a PD code and returns a new canonical one.
import { S, load, toPD, faces, isOver, excise, nX, darts, pieces } from './core.mjs'
import { mulberry32 } from './rng.mjs'

export const regions = (pd) => { const M = load(pd); return faces(M).map((f) => f.map((d) => M.lab[d])) }

export function moves(pd) {
  const M = load(pd), r = []
  for (const f of faces(M)) {
    const cs = f.map((d) => d >> 2), m = { dart: f[0], crossings: cs, edges: f.map((d) => M.lab[d]) }
    if (f.length == 1) r.push({ type: 'R1', ...m })
    else if (f.length == 2 && cs[0] != cs[1] && isOver(M, f[0]) == isOver(M, M.o[f[0]])) r.push({ type: 'R2', ...m })
    else if (f.length == 3 && new Set(cs).size == 3 && f.some((d) => isOver(M, d) && isOver(M, M.o[d]))) r.push({ type: 'R3', ...m })
  }
  return r
}

export function apply(pd, m) {
  const M = load(pd), d = m.dart
  if (m.type == 'R1') excise(M, [d >> 2])
  else if (m.type == 'R2') excise(M, [d >> 2, M.o[d] >> 2])
  else r3(M, d)
  return toPD(M)
}

function r3(M, d1) {
  const { o, h, u, lab } = M, d2 = S(o[d1]), d3 = S(o[d2]), X = d1 >> 2, Y = d2 >> 2, Z = d3 >> 2, P = (c, s) => 4 * c + s
  const old = [o[d3] ^ 2, d1 ^ 2, o[d1] ^ 2, d2 ^ 2, o[d2] ^ 2, d3 ^ 2]
  const nw = [P(Z, 1), P(Y, 1), P(X, 3), P(Z, 0), P(Y, 2), P(X, 2)], map = new Map(old.map((a, i) => [a, nw[i]]))
  const ov = old.map((a) => o[a]), oh = old.map((a) => h[a]), ol = old.map((a) => lab[a])
  const uu = [u[X] == (o[d3] & 1), u[Y] == (d2 & 1), u[Z] == (o[d2] & 1)]
  for (const c of [X, Y, Z]) for (let s = 0; s < 4; s++) lab[P(c, s)] = undefined
  old.forEach((a, i) => { const A = nw[i], p = map.get(ov[i]) ?? ov[i]; o[A] = p; o[p] = A; h[A] = oh[i]; lab[A] = ol[i] })
  const link = (a, b, ha) => { o[a] = b; o[b] = a; h[a] = ha; h[b] = 1 - ha }
  link(P(X, 1), P(Y, 3), oh[1]); link(P(X, 0), P(Z, 3), oh[0]); link(P(Y, 0), P(Z, 2), oh[3])
  ;[X, Y, Z].forEach((c, i) => (u[c] = uu[i] ? 0 : 1))
}

const link = (o, a, b) => { o[a] = b; o[b] = a }
export function addKink(pd, e = 1, side = 0, under = 0) {
  const M = load(pd), { o, h } = M, ds = darts(M).filter((d) => M.lab[d] == e), K = 4 * M.n++
  M.u.push(under)
  if (!ds.length) {
    if (!M.loops--) throw Error(`no edge ${e}`)
    link(o, K, K + 3); link(o, K + 1, K + 2); Object.assign(h, { [K]: 0, [K + 1]: 0, [K + 2]: 1, [K + 3]: 1 })
  } else {
    const A = ds.find((d) => h[d] == side), B = o[A], f = 1 - h[A]
    link(o, A, K + 2); link(o, K, K + 3); link(o, K + 1, B)
    Object.assign(h, { [K + 2]: f, [K]: 1 - f, [K + 3]: f, [K + 1]: 1 - f })
  }
  return toPD(M)
}

export function addBigon(pd, a, b, aOver = true) {
  const M = load(pd), { o, h, lab } = M
  for (const f of faces(M)) {
    const d1 = f.find((d) => lab[d] == a), d2 = f.find((d) => lab[d] == b)
    if (d1 == null || d2 == null || a == b) continue
    const P = 4 * M.n, Q = P + 4, B1 = o[d1], B2 = o[d2], f1 = 1 - h[d1], f2 = 1 - h[d2]
    M.n += 2; M.u.push(+!aOver, +!aOver)
    link(o, d1, P + 1); link(o, P + 3, Q + 3); link(o, Q + 1, B1); link(o, d2, Q); link(o, Q + 2, P); link(o, P + 2, B2)
    Object.assign(h, { [P + 1]: f1, [P + 3]: 1 - f1, [Q + 3]: f1, [Q + 1]: 1 - f1, [Q]: f2, [Q + 2]: 1 - f2, [P]: f2, [P + 2]: 1 - f2 })
    return toPD(M)
  }
  throw Error(`edges ${a} and ${b} share no region`)
}

export function reduce(pd) {
  for (let m; (m = moves(pd).find((m) => m.type != 'R3')); ) pd = apply(pd, m)
  return toPD(load(pd))
}

export function randomMove(pd, rng, up = 0.5, kink = 0.5) {
  const ms = moves(pd), r = rng()
  if (r < up || !ms.length) {
    const F = regions(pd).filter((f) => new Set(f).size > 1)
    if (r < up * kink || !F.length) { const e = nX(pd) ? 1 + ((rng() * 2 * nX(pd)) | 0) : 1; return addKink(pd, e, (rng() * 2) | 0, (rng() * 2) | 0) }
    const f = F[(rng() * F.length) | 0], i = (rng() * f.length) | 0, j = (i + 1 + ((rng() * (f.length - 1)) | 0)) % f.length
    return f[i] == f[j] ? pd : addBigon(pd, f[i], f[j], rng() < 0.5)
  }
  return apply(pd, ms[(rng() * ms.length) | 0])
}

export function scramble(pd, seed = 1, steps = 10, up = 0.5) {
  const rng = mulberry32(seed)
  for (let i = 0; i < steps; i++) pd = randomMove(pd, rng, up)
  return pd
}

export function simplify(pd, { seed = 1, effort = 300 } = {}) {
  const rng = mulberry32(seed)
  let best = reduce(pd), cur = best
  for (let i = 0; i < effort && nX(best) && !minimal(best); i++) {
    for (let s = 1 + rng() * 4; s > 0; s--) {
      const ms = moves(cur).filter((m) => m.type == 'R3')
      cur = ms.length && rng() < 0.7 ? apply(cur, ms[(rng() * ms.length) | 0]) : randomMove(cur, rng, 1, 0)
    }
    cur = reduce(cur)
    if (nX(cur) < nX(best)) best = cur
    else if (nX(cur) > nX(best) + 4) cur = best
  }
  const n = nX(best)
  return { pd: best, crossings: n, status: n ? (minimal(best) ? 'minimal' : 'unknown') : best.length > 1 ? 'unlink' : 'unknot' }
}

function minimal(pd) {
  const M = load(pd), fo = []
  if (M.loops || pieces(M).length != 1) return false
  faces(M).forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  return darts(M).every((d) => (!M.h[d] || isOver(M, d) != isOver(M, M.o[d ^ 2])) && fo[d] != fo[S(d)] && fo[d] != fo[d ^ 2])
}
