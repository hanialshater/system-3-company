// Drawing (docs: index.d.ts). Layout = an orthogonal grid drawing (Tamassia 1987, topology-shape-metrics: every
// crossing a grid point with strands leaving E, N, W, S; bends from a min-cost flow on the faces; faces cut into
// rectangles, then longest-path compaction), used as the planar start of a crossing-preserving force relaxation
// (`round`, PrEd after Bertault 2000) that bends it into round strands. Paths: Catmull-Rom cubics, cut at under-passes.
import { load, faces, pieces, trace, isOver, sign, darts } from './core.mjs'

export function layout(pd, { relax = 60 } = {}) {
  // Each piece's largest face is its outer face.
  const M = load(pd), F = faces(M), P = pieces(M), out = P.map((cs) => F.reduce((b, f, i) => (cs.includes(f[0] >> 2) && !(F[b]?.length >= f.length) ? i : b), -1))
  return round(M, F, out, ortho(M, F, P, out), relax)
}
function ortho(M, F, P, out) {
  const n = M.n, o = M.o, D = darts(M), fo = [], b = [], base = [], nb = [], poly = {}
  F.forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  // Shape: b[d] = net right bends along d's edge. Face f needs sum b = 4 - |f| (inner) or -4 - |f| (outer).
  D.forEach((d) => (b[d] = 0))
  const need = F.map((f, i) => (out.includes(i) ? -4 : 4) - f.length)
  for (let s; (s = need.findIndex((v) => v < 0)) >= 0; ) {
    const L = F.map(() => 1 / 0), pre = []
    L[s] = 0
    for (let k = 0, ch = 1; ch && k++ < F.length; ) { ch = 0; for (const d of D) { const v = L[fo[o[d]]] + (b[d] < 0 ? -1 : 1); if (v < L[fo[d]]) (L[fo[d]] = v), (pre[fo[d]] = d), (ch = 1) } }
    let t = -1
    need.forEach((v, i) => { if (v > 0 && (t < 0 || L[i] < L[t])) t = i })
    need[s]++, need[t]--
    for (let f = t, d; f != s; f = fo[o[d]]) (d = pre[f]), b[d]++, b[o[d]]--
  }
  // Directions (0 E, 1 N, 2 W, 3 S): slot s of crossing c points base[c] + s.
  for (const [c0] of P) { base[c0] = 0; const q = [c0]; for (const c of q) for (let s = 0; s < 4; s++) { const e = o[4 * c + s]; if (base[e >> 2] == null) base[e >> 2] = (base[c] + s - b[4 * c + s] + 2 - e) & 3, q.push(e >> 2) } }
  let V = n
  const link = (u, h, w) => (((nb[u] ||= [])[h & 3] = w), ((nb[w] ||= [])[(h + 2) & 3] = u))
  const walk = (v, h, seen = []) => { const r = []; let u = v, g = h & 3; do { const w = nb[u][g]; let t = 3; while (nb[w][(g + t) & 3] == null) t = (t + 1) & 3; r.push([w, g, t]); (u = w), (g = (g + t) & 3), (seen[4 * u + g] = 1) } while (u != v || g != (h & 3)); return r }
  for (const t of D) if (!M.h[t]) {
    let u = t >> 2, h = base[u] + (t & 3)
    poly[M.lab[t]] = []
    for (let k = 0; k < Math.abs(b[t]); k++) link(u, h, V), poly[M.lab[t]].push((u = V++)), (h -= Math.sign(b[t]))
    link(u, h, o[t] >> 2)
  }
  // A frame around each piece, bridged from a convex corner, so every face is bounded.
  out.forEach((f) => { const d = F[f][0], [[v, h]] = walk(d >> 2, base[d >> 2] + d).filter((e) => e[2] == 1); link(v, h, V); link(V, h + 3, V + 1); link(V + 1, h + 2, V + 2); link(V + 2, h + 1, V + 3); link(V + 3, h, V + 4); link(V + 4, h + 3, V); V += 5 })
  // Rectangular refinement: a reflex corner followed by two convex ones gets an edge that cuts off a rectangle.
  for (let u = 0, seen = []; u < V; u++) for (let g = 0; g < 4; g++) if (nb[u][g] != null && !seen[4 * u + g])
    for (let r = walk(u, g, seen), m = r.length, i = 0; i < m; i++) if (r[i][2] == 1) {
      const nx = (i) => { do i = (i + 1) % m; while (!r[i][2]); return i }, j = nx(i), k = nx(j), [w, a] = r[k], e = (a + 3) & 3, [v, h] = r[i]
      if (r[j][2] == 3 && r[k][2] == 3) link(V, e, nb[w][e]), link(w, e, V), link(v, h, V++), (r = walk(v, h, seen)), (m = r.length), (i = -1)
    }
  // Metrics: longest paths along each axis, from both sides, averaged.
  const lp = (h) => { const A = Array(V).fill(0); for (let ch = 1, it = 0; ch && it++ < V; ) { ch = 0; for (let u = 0; u < V; u++) nb[u].forEach((w, g) => { const v = A[u] + (g == h) * (u < n && w < n ? 2 : 1); if ((g == h || (g ^ h) & 1) && v > A[w]) (A[w] = v), (ch = 1) }) } return A }
  const X0 = lp(0), X1 = lp(2), Y0 = lp(1), Y1 = lp(3), X = [], Y = []
  let ox = 0
  // Pieces side by side; the start of the relaxation, so it needs no stretch.
  for (const cs of P) {
    const vs = cs.flatMap((c) => [c, ...[0, 1, 2, 3].flatMap((s) => (M.h[4 * c + s] ? [] : poly[M.lab[4 * c + s]]))]), xs = vs.map((v) => (X0[v] - X1[v]) / 2), x0 = Math.min(...xs)
    vs.forEach((v, i) => ((X[v] = xs[i] - x0 + ox), (Y[v] = (Y0[v] - Y1[v]) / 2)))
    ox += Math.max(...xs) - x0 + 2
  }
  const pt = (v) => [X[v], Y[v]]
  for (const l in poly) poly[l] = poly[l].map(pt)
  return { crossings: [...Array(n).keys()].map(pt), points: poly }
}

// Rounding (`round`): each grid run is cut into pieces of at most 4 grid units (an edge gets at least one inner
// point), and the drawing of crossings and points is relaxed with forces after Fruchterman-Reingold: springs,
// vertex-vertex repulsion, PrEd vertex-segment repulsion within each face, and a pull to the centre. A vertex moves
// less than 0.45 x its distance to every segment of a face it lies on, and a segment's ends less than 0.45 x the
// distance of every vertex of its faces, so no vertex crosses a segment: the drawing stays planar, with the same
// faces and the same cyclic order of strands at every crossing. The outer faces of all pieces count as one face.
// The schedule is fixed (60 steps, step cap cooling linearly); nothing is scored or compared.
function round(M, F, out, Q, its) {
  const n = M.n, x = [], y = [], ch = {}, E = [], W = [], ob = [], os = [], cd = (d) => (M.h[d] ? [...ch[M.lab[d]]].reverse() : ch[M.lab[d]])
  Q.crossings.map(([a, b], c) => ((x[c] = a), (y[c] = b)))
  for (const t of darts(M)) if (!M.h[t]) {
    const q = [Q.crossings[t >> 2], ...Q.points[M.lab[t]], Q.crossings[M.o[t] >> 2]], v = (ch[M.lab[t]] = [t >> 2])
    for (let i = 1; i < q.length; i++) {
      const [a, b] = q[i - 1], [c, d] = q[i], m = Math.max(Math.ceil(Math.hypot(c - a, d - b) / 4 - 1e-9), 4 - q.length)
      for (let j = 1; j <= m; j++) v.push(i + 1 < q.length || j < m ? (y.push(b + ((d - b) * j) / m), x.push(a + ((c - a) * j) / m) - 1) : M.o[t] >> 2)
    }
    v.slice(1).map((w, i) => E.push(v[i], w))
  }
  const N = x.length, mx = x.reduce((s, v) => s + v / N, 0), my = y.reduce((s, v) => s + v / N, 0), R = Math.max(...x.map((v, i) => Math.hypot(v - mx, y[i] - my)))
  x.map((v, i) => ((x[i] = (v - mx) / R), (y[i] = (y[i] - my) / R)))
  const pairs = (b, s) => { for (const w of b) for (const [u, v] of s) if (w != u && w != v) W.push(w, u, v) }
  F.map((f, i) => { const b = f.flatMap((d) => cd(d).slice(1)), s = f.flatMap((d) => cd(d).slice(1).map((v, j) => [cd(d)[j], v])); out.includes(i) ? (ob.push(...b), os.push(...s)) : pairs(b, s) })
  pairs(ob, os)
  relax(x, y, E, W, n, its)
  // The stretch: the short side is scaled to the long one, so the picture fills the square stage.
  const S = (a) => Math.max(...a) - Math.min(...a), w = S(x), h = S(y)
  x.map((v, i) => (w < h ? (x[i] = (v * h) / w) : (y[i] = (y[i] * w) / h)))
  const P = {}
  for (const l in ch) P[l] = ch[l].slice(1, -1).map((v) => [x[v], y[v]])
  return { crossings: x.slice(0, n).map((a, c) => [a, y[c]]), points: P, loops: Array.from({ length: M.loops }, (_, j) => [Math.max(0, ...x) + 1 + 1.6 * j, 0, 0.6]) }
}
function relax(x, y, E, W, n, its) {
  const N = x.length, k = Math.sqrt(Math.PI / N), g = k / 2
  for (let it = 0; it < its; it++) {
    const fx = Float64Array.from(x, (v) => -v / 2), fy = Float64Array.from(y, (v) => -v / 2), lim = new Float64Array(N).fill(9)
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const dx = x[i] - x[j], dy = y[i] - y[j], f = (0.12 * k * k * (j < n ? 2 : 1)) / (dx * dx + dy * dy + 1e-12); fx[i] += dx * f; fy[i] += dy * f; fx[j] -= dx * f; fy[j] -= dy * f }
    for (let e = 0; e < E.length; e += 2) {
      const a = E[e], b = E[e + 1], dx = x[b] - x[a], dy = y[b] - y[a], f = Math.sqrt(dx * dx + dy * dy) / k / 2
      fx[a] += dx * f; fy[a] += dy * f; fx[b] -= dx * f; fy[b] -= dy * f
    }
    for (let e = 0; e < W.length; e += 3) {
      const v = W[e], a = W[e + 1], b = W[e + 2], dx = x[b] - x[a], dy = y[b] - y[a]
      const t = Math.max(0, Math.min(1, ((x[v] - x[a]) * dx + (y[v] - y[a]) * dy) / (dx * dx + dy * dy + 1e-12))), ex = x[v] - x[a] - t * dx, ey = y[v] - y[a] - t * dy, d = Math.sqrt(ex * ex + ey * ey)
      lim[v] = Math.min(lim[v], d); lim[a] = Math.min(lim[a], d); lim[b] = Math.min(lim[b], d)
      if (d < g) { const f = ((g - d) * (g - d) * (v < n ? 4 : 1)) / (d * d + 1e-12); fx[v] += ex * f; fy[v] += ey * f; fx[a] -= ex * f * (1 - t); fy[a] -= ey * f * (1 - t); fx[b] -= ex * f * t; fy[b] -= ey * f * t }
    }
    for (let i = 0; i < N; i++) { const f = Math.hypot(fx[i], fy[i]), m = Math.min(f, (k * (its - it)) / its / 4, 0.45 * lim[i]) / (f || 1); x[i] += fx[i] * m; y[i] += fy[i] * m }
  }
}

export function draw(pd, { size = 100, margin = 8, gap = 0.35, layout: Lay } = {}) {
  const M = load(pd), [L, C] = trace(M), Q = Lay ?? layout(pd), all = [...Q.crossings, ...Object.values(Q.points).flat(), ...Q.loops.flatMap(([a, b, r]) => [[a - r, b - r], [a + r, b + r]])]
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]), x0 = Math.min(...xs), y1 = Math.max(...ys)
  const k = (size - 2 * margin) / Math.max(Math.max(...xs) - x0, y1 - Math.min(...ys), 1e-9), T = ([a, b]) => [margin + (a - x0) * k, margin + (y1 - b) * k]
  const cp = (c) => T(Q.crossings[c]), r = (v) => Math.round(v * 10) / 10, P = (p) => `${r(p[0])} ${r(p[1])}`, dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1])
  // nx(d): the first point after crossing d >> 2 along dart d's edge (every edge has at least one).
  const nx = (d) => T(Q.points[M.lab[d]].at(M.h[d] ? -1 : 0)), tails = darts(M).filter((d) => !M.h[d]), g = gap * Math.min(...tails.map((t) => dist(cp(t >> 2), nx(t))), size / 8)
  const edges = tails.map((t) => {
    // Catmull-Rom through the crossing before, the edge's points and the crossing after. At an under-pass the end
    // moves back by the gap along its chord and keeps its tangent, the strand's direction through the crossing.
    const h = M.o[t], q = [nx(t ^ 2), cp(t >> 2), ...Q.points[M.lab[t]].map(T), cp(h >> 2), nx(h ^ 2)], m = q.length - 2, at = (i, j) => q[i].map((v, z) => v + ((q[j][z] - v) * g) / dist(q[i], q[j]))
    const s = isOver(M, t) ? q[1] : at(1, 2), e = isOver(M, h) ? q[m] : at(m, m - 1)
    let d = `M${P(s)}`
    for (let i = 1; i < m; i++) {
      const [o, a, b, z] = q.slice(i - 1, i + 3), A = i < 2 ? s : a, B = i + 1 < m ? b : e
      d += `C${P(A.map((v, j) => v + (b[j] - o[j]) / 6))} ${P(B.map((v, j) => v - (z[j] - a[j]) / 6))} ${P(B)}`
    }
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d }
  })
  const crossings = [...Array(M.n).keys()].map((c) => ({ i: c, x: r(cp(c)[0]), y: r(cp(c)[1]), sign: sign(M, c) }))
  const loops = Q.loops.map(([a, b, rr]) => { const [cx, cy] = T([a, b]); return { cx: r(cx), cy: r(cy), r: r(rr * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
