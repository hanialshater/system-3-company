// Layout (docs: index.d.ts): Tutte embedding of a triangulation of the diagram, then stress majorization in which
// no step may flip a triangle, so every drawing on the way is planar. Outer face: the better of the 2 largest (by spacing).
import { load, faces, pieces, S } from './core.mjs'

const ar = (x, y, a, b, c) => (x[b] - x[a]) * (y[c] - y[a]) - (y[b] - y[a]) * (x[c] - x[a])

export function layout(pd, { K = 2 } = {}) {
  const M = load(pd), F = faces(M), n = M.n, P = pieces(M), fo = [], X = [], Y = [], E = (d) => n + d, o = M.o
  F.forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  P.forEach((cs, p) => {
    // vertices: crossings, a point per dart, a vertex per face (not monogons); triangles: corners, fans in faces
    const id = new Map(), V = [], es = [], T = [], at = (v) => (id.has(v) || (id.set(v, V.length), V.push(v)), id.get(v)), mine = F.filter((f) => cs.includes(f[0] >> 2))
    for (const c of cs) for (let s = 0; s < 4; s++) { const d = 4 * c + s; es.push([at(c), at(E(d)), 1, c, o[d] >> 2], [at(E(d)), at(E(o[d])), 1, c, o[d] >> 2]); T.push(-1, at(c), at(E(d)), at(E(S(d)))) }
    for (const f of mine) {
      const v = f[1] != null && at(5 * n + fo[f[0]]), l = 0.6 / Math.sin(Math.PI / 2 / f.length)
      for (const d of f) { const a = at(E(d)), b = at(E(o[d])), c = at(E(S(o[d]))); if (c != a) es.push([b, c, 1.4]); if (v) es.push([v, a, l], [v, b, l]), T.push(v, v, b, a, v, v, c, b) }
    }
    const N = V.length, adj = V.map(() => []), D = dist(adj, es)
    let best = -1, B
    const fs = mine.filter((f) => f[1] != null && f.every((d) => fo[o[d]] != fo[d])).sort((a, b) => b.length - a.length)
    for (const out of (fs[0] ? fs : mine).slice(0, K)) {
      const ov = id.get(5 * n + fo[out[0]]), x = new Float64Array(N), y = new Float64Array(N), bd = out.flatMap((d) => [id.get(E(d)), id.get(E(o[d]))])
      // reweighted Tutte: 5 rounds, each edge's weight times (its length / its target), clipped to [1/4, 4]
      for (let r = 0, w = es.map(() => 1); r < 6; r++) {
        if (r) es.forEach(([a, b, l], k) => (w[k] *= Math.min(4, Math.max(0.25, Math.hypot(x[a] - x[b], y[a] - y[b]) / l))))
        tutte(x, y, es, bd, ov, w)
      }
      relax(x, y, D, T, bd, ov, cs.length)
      // score: closest pair of crossings per sqrt(n), and closest strand to a crossing it does not touch
      const C = cs.map((c) => id.get(c)), cx = C.map((c) => x[c]), cy = C.map((c) => y[c]), z = Math.max(Math.max(...cx) - Math.min(...cx), Math.max(...cy) - Math.min(...cy), 1e-9)
      let cc = 9, sp = 9
      for (const a of C) for (const b of C) if (a != b) cc = Math.min(cc, Math.hypot(x[a] - x[b], y[a] - y[b]) / z)
      for (const c of C) for (const [a, b, l, e, f] of es) if (l == 1 && e != V[c] && f != V[c]) {
        const dx = x[b] - x[a], dy = y[b] - y[a], t = Math.max(0, Math.min(1, ((x[c] - x[a]) * dx + (y[c] - y[a]) * dy) / (dx * dx + dy * dy)))
        sp = Math.min(sp, Math.hypot(x[c] - x[a] - t * dx, y[c] - y[a] - t * dy) / z)
      }
      const s = Math.min(1.5, cc * Math.sqrt(C.length)) + 5 * sp
      if (s > best) (best = s), (B = [x, y, ov])
    }
    const [x, y, ov] = B, I = V.map((_, i) => i).filter((i) => i != ov), x0 = Math.min(...I.map((i) => x[i])), y0 = Math.min(...I.map((i) => y[i])), R = Math.max(...I.map((i) => Math.max(x[i] - x0, y[i] - y0))) / 2 || 1
    I.forEach((i) => ((X[V[i]] = 2.6 * p + (x[i] - x0) / R - 1), (Y[V[i]] = (y[i] - y0) / R - 1)))
  })
  return { crossings: [...Array(n).keys()].map((c) => [X[c], Y[c]]), points: [...Array(4 * n).keys()].map((d) => [X[n + d], Y[n + d]]), loops: Array.from({ length: M.loops }, (_, j) => [2.6 * (P.length + j), 0, 0.8]) }
}

// All-pairs graph distances: a queue-based shortest-path search from every vertex.
function dist(adj, es) {
  const N = adj.length, D = new Float64Array(N * N).fill(1e9)
  for (const [a, b, l] of es) adj[a].push(b, l), adj[b].push(a, l)
  for (let s = 0; s < N; s++) {
    const R = D.subarray(s * N, s * N + N), q = [s], Z = new Uint8Array(N)
    R[s] = 0
    for (let h = 0; h < q.length; h++) { const u = q[h], a = adj[u]; Z[u] = 0; for (let k = 0; k < a.length; k += 2) if (R[u] + a[k + 1] < R[a[k]]) (R[a[k]] = R[u] + a[k + 1]), Z[a[k]] || ((Z[a[k]] = 1), q.push(a[k])) }
  }
  return D
}

// Tutte (1963): the outer boundary bd on a circle, every other vertex at the mean of its neighbours (vertex ov,
// the outer face's, takes no part), solved exactly by elimination.
function tutte(x, y, es, bd, ov, w) {
  const N = x.length, fix = [], A = Array.from(x, () => new Float64Array(N + 2))
  bd.forEach((v, k) => { x[v] = Math.cos((k * 6.283) / bd.length); y[v] = Math.sin((k * 6.283) / bd.length); fix[v] = 1 })
  es.forEach(([a, b], k) => { if (a != ov) for (const [p, q] of [[a, b], [b, a]]) if (!fix[p]) { const r = A[p]; r[p] += w[k]; if (fix[q]) (r[N] += w[k] * x[q]), (r[N + 1] += w[k] * y[q]); else r[q] -= w[k] } })
  const fr = A.map((_, i) => i).filter((i) => !fix[i] && i != ov)
  for (let k = 0; k < fr.length; k++) { const i = fr[k], r = A[i]; for (let h = k + 1; h < fr.length; h++) { const s = A[fr[h]], f = s[i] / r[i]; if (f) for (let c = i; c <= N + 1; c++) s[c] -= f * r[c] } }
  for (const i of fr.reverse()) { const r = A[i]; let sx = r[N], sy = r[N + 1]; for (let j = i + 1; j < N; j++) (sx -= r[j] * x[j]), (sy -= r[j] * y[j]); x[i] = sx / r[i]; y[i] = sy / r[i] }
}

// Stress majorization (Gansner, Koren & North 2004) with weights 1/d^2 (more for close pairs), from the Tutte
// drawing; vertex ov takes no part. Then the four stubs at each of the nc crossings are turned toward a right-angled
// cross. A step may not flip a triangle or make the outer boundary cross itself: the corners of a triangle that
// would flip stay put, and the next step is shorter.
function relax(x, y, D, T, bd, ov, nc) {
  const N = x.length, W = D.map((d, k) => (d && k % N != ov && ((k / N) | 0) != ov ? d ** -2 : 0)), sw = new Float64Array(N), tx = new Float64Array(N), ty = new Float64Array(N), m = bd.length, tri = []
  for (let k = 0; k < T.length; k += 4) if (T[k] != ov) tri.push(T[k + 1], T[k + 2], T[k + 3])
  const sg = Math.sign(ar(x, y, tri[0], tri[1], tri[2]))
  // and once a crossing's four stub ends form a convex quadrilateral, it stays convex (so the strands really cross)
  for (let t = 0; t < 12 * nc; t += 12) for (let s = 0; s < 4; s++) tri.push(tri[t + 1 + 3 * s], tri[t + 1 + ((3 * s + 3) % 12)], tri[t + 1 + ((3 * s + 6) % 12)])
  let nu = 0, de = 0
  // commit (tx, ty) unless it tangles the boundary, after putting back the corners of any triangle it would flip
  const go = () => {
    let st = 1.2
    for (let bad = 1; bad; ) { bad = 0; for (let t = 0; t < tri.length; t += 3) if (sg * ar(tx, ty, tri[t], tri[t + 1], tri[t + 2]) <= 0 && sg * ar(x, y, tri[t], tri[t + 1], tri[t + 2]) > 0) for (let u = t; u < t + 3; u++) { const v = tri[u]; if (tx[v] != x[v] || ty[v] != y[v]) (tx[v] = x[v]), (ty[v] = y[v]), (bad = 1), (st = 0.5) } }
    for (let i = 0; i < m; i++) for (let j = i + 2; j < m - !i; j++) { const a = bd[i], b = bd[(i + 1) % m], c = bd[j], d = bd[(j + 1) % m]; if (ar(tx, ty, a, b, c) * ar(tx, ty, a, b, d) < 0 && ar(tx, ty, c, d, a) * ar(tx, ty, c, d, b) < 0) return 0.5 }
    x.set(tx), y.set(ty)
    return st
  }
  for (let i = 0; i < N; i++) for (let j = 0, k = i * N; j < N; j++, k++) { const l = Math.hypot(x[i] - x[j], y[i] - y[j]); sw[i] += W[k]; nu += l * W[k] * D[k]; de += l * l * W[k] }
  for (let i = 0; i < N; i++) (x[i] *= nu / de), (y[i] *= nu / de)
  for (let it = 0, step = 1; it < 60 && step > 1e-3; it++) {
    for (let i = 0; i < N; i++) {
      let sx = 0, sy = 0
      const xi = x[i], yi = y[i]
      for (let j = 0, k = i * N; j < N; j++, k++) { const dx = xi - x[j], dy = yi - y[j], w = W[k], q = (w * D[k]) / Math.sqrt(dx * dx + dy * dy + 1e-18); sx += w * x[j] + q * dx; sy += w * y[j] + q * dy }
      tx[i] = sw[i] ? xi + step * (sx / sw[i] - xi) : xi; ty[i] = sw[i] ? yi + step * (sy / sw[i] - yi) : yi
    }
    step = Math.min(1, step * go())
  }
  // 4 rounds: every stub halfway to a right-angled cross, and halfway to 0.8 of its crossing's mean stub length
  for (let it = 0; it < 4; it++) {
    tx.set(x), ty.set(y)
    for (let t = 0; t < 12 * nc; t += 12) {
      const c = tri[t], p = [1, 4, 7, 10].map((u) => tri[t + u]), a = p.map((v, s) => Math.atan2(y[v] - y[c], x[v] - x[c]) - (sg * s * Math.PI) / 2), r = Math.atan2(...[Math.sin, Math.cos].map((f) => a.reduce((s, b) => s + f(b), 0)))
      const L = p.map((v) => Math.hypot(x[v] - x[c], y[v] - y[c])), l = 0.2 * (L[0] + L[1] + L[2] + L[3])
      p.forEach((v, s) => { const b = a[s] + Math.atan2(Math.sin(r - a[s]), Math.cos(r - a[s])) / 2 + (sg * s * Math.PI) / 2; tx[v] = x[c] + ((L[s] + l) / 2) * Math.cos(b); ty[v] = y[c] + ((L[s] + l) / 2) * Math.sin(b) })
    }
    go()
  }
}

