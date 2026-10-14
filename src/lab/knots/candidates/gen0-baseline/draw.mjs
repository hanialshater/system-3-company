// Drawing (docs: index.d.ts). Layout = circle packing (Collins-Stephenson iteration) of the triangulation whose
// vertices are crossings, edges and regions, with each piece's largest region at infinity; if that comes out
// non-planar, a Tutte barycentric embedding. Paths: Catmull-Rom cubics, cut short at under-passes.
import { load, faces, pieces, trace, isOver, sign, darts } from './core.mjs'

const ang = (a, b, c) => Math.acos(Math.min(1, Math.max(-1, ((a + b) ** 2 + (a + c) ** 2 - (b + c) ** 2) / (2 * (a + b) * (a + c)))))

export function layout(pd, { iters = 600, tutte = false } = {}) {
  const M = load(pd), F = faces(M), n = M.n, P = pieces(M), fo = [], N = 5 * n + F.length, X = [], Y = []
  F.forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  const ed = (d) => n + Math.min(d, M.o[d]), fv = (i) => 5 * n + i, rot = []
  for (const d of darts(M)) {
    const c = d >> 2, s = d & 3
    ;(rot[c] ||= []).push(ed(d), fv(fo[4 * c + ((s + 1) & 3)]))
    if (d < M.o[d]) rot[ed(d)] = [c, fv(fo[d]), M.o[d] >> 2, fv(fo[M.o[d]])]
  }
  F.forEach((f, i) => (rot[fv(i)] = f.flatMap((d) => [d >> 2, ed(d)]).reverse()))
  P.forEach((cs, p) => {
    const vs = new Set(cs.flatMap((c) => [c, ...rot[c]])), out = [...vs].filter((v) => v >= 5 * n).sort((a, b) => rot[b].length - rot[a].length)[0]
    const bd = new Set(rot[out]), inn = [...vs].filter((v) => v != out && !bd.has(v)), r = {}, x = {}, y = {}
    vs.forEach((v) => (r[v] = 1))
    for (let it = 0; it < iters; it++) for (const v of inn) {
      const w = rot[v], k = w.length, th = w.reduce((s, a, i) => s + ang(r[v], r[a], r[w[(i + 1) % k]]), 0), b = Math.sin(th / (2 * k)), dl = Math.sin(Math.PI / k)
      r[v] = ((r[v] * b) / (1 - b)) * ((1 - dl) / dl)
    }
    const v0 = inn[0], q = [v0], done = new Set(q)
    x[v0] = y[v0] = 0; x[rot[v0][0]] = r[v0] + r[rot[v0][0]]; y[rot[v0][0]] = 0
    while (q.length) {
      const v = q.shift(), w = rot[v], k = w.length, j = w.findIndex((a) => a in x)
      for (let i = 1; i < k; i++) {
        const a = w[(j + i - 1) % k], b = w[(j + i) % k]
        if (!(b in x)) { const f = Math.atan2(y[a] - y[v], x[a] - x[v]) + ang(r[v], r[a], r[b]); x[b] = x[v] + (r[v] + r[b]) * Math.cos(f); y[b] = y[v] + (r[v] + r[b]) * Math.sin(f) }
        if (!bd.has(b) && b != out && !done.has(b)) done.add(b), q.push(b)
      }
    }
    pl(M, cs, x, y, ed, p, X, Y, tutte)
  })
  const ok = !tutte && planar(M, X, Y)
  if (!ok) tutteLayout(M, F, P, X, Y)
  return { crossings: [...Array(n).keys()].map((c) => [X[c], Y[c]]), points: [...Array(4 * n).keys()].map((d) => [X[n + d], Y[n + d]]), loops: Array.from({ length: M.loops }, (_, j) => [2.6 * (P.length + j), 0, 0.8]) }
}
function pl(M, cs, x, y, ed, p, X, Y) {
  const vs = cs.flatMap((c) => [c, ...[0, 1, 2, 3].map((s) => ed(4 * c + s))]), mx = vs.reduce((s, v) => s + x[v], 0) / vs.length, my = vs.reduce((s, v) => s + y[v], 0) / vs.length
  const R = Math.max(...vs.map((v) => Math.hypot(x[v] - mx, y[v] - my))) || 1, T = (v) => [2.6 * p + (x[v] - mx) / R, (y[v] - my) / R]
  for (const c of cs) {
    ;[X[c], Y[c]] = T(c)
    const m = [0, 1, 2, 3].map((s) => T(ed(4 * c + s))), a = m.map(([u, v]) => Math.atan2(v - Y[c], u - X[c]))
    const o = Math.atan2(...[Math.sin, Math.cos].map((f) => a.reduce((t, x, s) => t + f(x - (s * Math.PI) / 2), 0))), rho = m.map(([u, v]) => Math.hypot(u - X[c], v - Y[c]))
    for (let s = 0; s < 4; s++) {
      const r = o + (s * Math.PI) / 2, t = a[s] + 0.3 * Math.atan2(Math.sin(r - a[s]), Math.cos(r - a[s]))
      X[M.n + 4 * c + s] = X[c] + 0.6 * rho[s] * Math.cos(t); Y[M.n + 4 * c + s] = Y[c] + 0.6 * rho[s] * Math.sin(t)
    }
  }
}
const segs = (M) => darts(M).flatMap((d) => [[d >> 2, M.n + d], ...(d < M.o[d] ? [[M.n + d, M.n + M.o[d]]] : [])])
const cross = (X, Y, a, b, c, d) => { const o = (p, q, r) => Math.sign((X[q] - X[p]) * (Y[r] - Y[p]) - (Y[q] - Y[p]) * (X[r] - X[p])); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0 }
function planar(M, X, Y) {
  const S = segs(M)
  if (S.some(([a, b]) => !isFinite(X[a] + Y[a] + X[b] + Y[b]))) return false
  return S.every((s, i) => S.every((t, j) => j <= i || s.some((v) => t.includes(v)) || !cross(X, Y, ...s, ...t)))
}
function tutteLayout(M, F, P, X, Y) {
  const n = M.n, N = 5 * n + F.length, pc = [], fix = [], adj = Array.from({ length: N }, () => []), E = (d) => n + d, add = (a, b) => (adj[a].push(b), adj[b].push(a)), outer = P.map(() => -1)
  P.forEach((cs, i) => cs.forEach((c) => (pc[c] = i)))
  for (const d of darts(M)) { add(d >> 2, E(d)); if (d < M.o[d]) add(E(d), E(M.o[d])) }
  F.forEach((f, i) => { const p = pc[f[0] >> 2]; if (outer[p] < 0 || f.length > F[outer[p]].length) outer[p] = i })
  F.forEach((f, i) => {
    if (outer.includes(i)) {
      const seq = [...new Set(f.flatMap((d) => [d >> 2, E(d), E(M.o[d])]))]
      return seq.forEach((v, k) => { const a = (2 * Math.PI * k) / seq.length; X[v] = 2.6 * pc[f[0] >> 2] + Math.cos(a); Y[v] = Math.sin(a); fix[v] = 1 })
    }
    for (const d of f) add(5 * n + i, E(d)), add(5 * n + i, E(M.o[d]))
  })
  for (let v = 0; v < N; v++) if (!fix[v]) X[v] = Y[v] = 0
  for (let it = 0; it < 500; it++) for (let v = 0; v < N; v++) if (!fix[v] && adj[v].length) { let sx = 0, sy = 0; for (const w of adj[v]) (sx += X[w]), (sy += Y[w]); X[v] = sx / adj[v].length; Y[v] = sy / adj[v].length }
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const split = (b, t) => { const [p, q, r, s] = b, pq = lerp(p, q, t), qr = lerp(q, r, t), rs = lerp(r, s, t), a = lerp(pq, qr, t), c = lerp(qr, rs, t), m = lerp(a, c, t); return [[p, pq, a, m], [m, c, rs, s]] }
function cut(b, g, end) {
  if (end) return cut([...b].reverse(), g, false).reverse()
  let lo = 0, hi = 1
  for (let i = 0; i < 24; i++) { const t = (lo + hi) / 2, m = split(b, t)[1][0]; Math.hypot(m[0] - b[0][0], m[1] - b[0][1]) < g ? (lo = t) : (hi = t) }
  return split(b, hi)[1]
}

export function draw(pd, { size = 100, margin = 8, gap = 0.35, layout: Lay } = {}) {
  const M = load(pd), [L, C] = trace(M), Q = Lay ?? layout(pd), all = [...Q.crossings, ...Q.points, ...Q.loops.flatMap(([a, b, r]) => [[a - r, b - r], [a + r, b + r]])]
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]), x0 = Math.min(...xs), y1 = Math.max(...ys)
  const k = (size - 2 * margin) / Math.max(Math.max(...xs) - x0, y1 - Math.min(...ys), 1e-9), T = ([a, b]) => [margin + (a - x0) * k, margin + (y1 - b) * k]
  const cp = (c) => T(Q.crossings[c]), dp = (d) => T(Q.points[d]), r = (v) => Math.round(v * 10) / 10
  const tails = darts(M).filter((d) => !M.h[d]), g = gap * Math.min(...tails.map((t) => Math.hypot(...cp(t >> 2).map((v, i) => v - dp(t)[i]))), size / 8)
  const edges = tails.map((t) => {
    const h = M.o[t], q = [dp(t ^ 2), cp(t >> 2), dp(t), dp(h), cp(h >> 2), dp(h ^ 2)]
    const segs = [0, 1, 2].map((i) => { const a = q[i + 1], b = q[i + 2]; return [a, [a[0] + (b[0] - q[i][0]) / 6, a[1] + (b[1] - q[i][1]) / 6], [b[0] - (q[i + 3][0] - a[0]) / 6, b[1] - (q[i + 3][1] - a[1]) / 6], b] })
    if (!isOver(M, t)) segs[0] = cut(segs[0], g, false)
    if (!isOver(M, h)) segs[2] = cut(segs[2], g, true)
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d: `M${r(segs[0][0][0])} ${r(segs[0][0][1])}` + segs.map((s) => 'C' + s.slice(1).map((p) => `${r(p[0])} ${r(p[1])}`).join(' ')).join('') }
  })
  const crossings = [...Array(M.n).keys()].map((c) => ({ i: c, x: r(cp(c)[0]), y: r(cp(c)[1]), sign: sign(M, c) }))
  const loops = Q.loops.map(([a, b, rr]) => { const [cx, cy] = T([a, b]); return { cx: r(cx), cy: r(cy), r: r(rr * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
