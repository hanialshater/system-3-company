// Drawing (docs: index.d.ts). Layout = orthogonal grid drawing (Tamassia 1987, topology-shape-metrics): every
// crossing is a grid point with its four strands leaving E, N, W, S; bends from a min-cost flow on the faces;
// faces cut into rectangles, then longest-path compaction, balanced. Paths: straight runs, bends rounded.
import { load, faces, pieces, trace, isOver, sign, darts } from './core.mjs'

export function layout(pd, { tries = 3 } = {}) {
  const M = load(pd), F = faces(M), P = pieces(M), pc = [], fs = P.map(() => [])
  P.forEach((cs, p) => cs.forEach((c) => (pc[c] = p)))
  F.forEach((f, i) => fs[pc[f[0] >> 2]].push(i))
  fs.forEach((a) => a.sort((i, j) => F[j].length - F[i].length))
  let best
  for (let k = 0; k < tries && k < Math.max(...fs.map((a) => a.length)); k++) {
    const L = ortho(M, F, P, fs.map((a) => a[Math.min(k, a.length - 1)]))
    if (!best || L.w < best.w) best = L
  }
  return best ?? ortho(M, F, P, [])
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
  let ox = 0, w = 0, hh = 0
  for (const cs of P) {
    const vs = cs.flatMap((c) => [c, ...[0, 1, 2, 3].flatMap((s) => (M.h[4 * c + s] ? [] : poly[M.lab[4 * c + s]]))]), xs = vs.map((v) => (X0[v] - X1[v]) / 2), ys = vs.map((v) => (Y0[v] - Y1[v]) / 2)
    const x0 = Math.min(...xs), y0 = (Math.min(...ys) + Math.max(...ys)) / 2
    vs.forEach((v, i) => ((X[v] = xs[i] - x0 + ox), (Y[v] = ys[i] - y0)))
    ox += Math.max(...xs) - x0 + 2; hh = Math.max(hh, 2 * (Math.max(...ys) - y0)); w = Math.max(ox - 2, hh)
  }
  const sx = Math.max(1, hh / (ox - 2)), sy = Math.max(1, (ox - 2) / hh), pt = (v) => [X[v] * sx, Y[v] * sy]
  for (const l in poly) poly[l] = poly[l].map(pt)
  return { w, crossings: [...Array(n).keys()].map(pt), points: poly, loops: Array.from({ length: M.loops }, (_, j) => [ox * sx + 2.5 * j + 1, 0, 1]) }
}

export function draw(pd, { size = 100, margin = 8, gap = 0.35, layout: Lay } = {}) {
  const M = load(pd), [L, C] = trace(M), Q = Lay ?? layout(pd), all = [...Q.crossings, ...Object.values(Q.points).flat(), ...Q.loops.flatMap(([a, b, r]) => [[a - r, b - r], [a + r, b + r]])]
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]), x0 = Math.min(...xs), y1 = Math.max(...ys)
  const k = (size - 2 * margin) / Math.max(Math.max(...xs) - x0, y1 - Math.min(...ys), 1e-9), T = ([a, b]) => [margin + (a - x0) * k, margin + (y1 - b) * k]
  const cp = (c) => T(Q.crossings[c]), r = (v) => Math.round(v * 10) / 10, dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1])
  const tails = darts(M).filter((d) => !M.h[d]), path = (t) => [cp(t >> 2), ...Q.points[M.lab[t]].map(T), cp(M.o[t] >> 2)]
  const g = gap * Math.min(...tails.map((t) => { const q = path(t); return dist(q[0], q[1]) }), size / 8)
  const at = (p, q, s) => { const l = dist(p, q) || 1; return [p[0] + ((q[0] - p[0]) * s) / l, p[1] + ((q[1] - p[1]) * s) / l] }
  const edges = tails.map((t) => {
    const h = M.o[t], q = path(t), m = q.length - 1, ab = [q[0]]
    // On-curve points: each bend becomes a rounded corner (radius at most half a layout unit and half of either leg).
    for (let i = 1; i < m; i++) { const s = Math.min(k / 2, dist(q[i - 1], q[i]) / 2, dist(q[i], q[i + 1]) / 2); ab.push(at(q[i], q[i - 1], s), q[i], at(q[i], q[i + 1], s)) }
    ab.push(q[m])
    if (!isOver(M, t)) ab[0] = at(ab[0], ab[1], g)
    if (!isOver(M, h)) ab[ab.length - 1] = at(ab[ab.length - 1], ab[ab.length - 2], g)
    const P = (p) => `${r(p[0])} ${r(p[1])}`, third = (p, q) => at(p, q, dist(p, q) / 3)
    let d = `M${P(ab[0])}`
    for (let i = 0; i < ab.length - 1; i += 3) {
      const [a, c] = [ab[i], ab[i + 1]]
      if (P(a) != P(c)) d += `C${P(third(a, c))} ${P(third(c, a))} ${P(c)}`
      if (i + 3 < ab.length) { const e = ab[i + 2], f = ab[i + 3]; d += `C${P(at(c, e, (2 * dist(c, e)) / 3))} ${P(at(f, e, (2 * dist(f, e)) / 3))} ${P(f)}` }
    }
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d }
  })
  const crossings = [...Array(M.n).keys()].map((c) => ({ i: c, x: r(cp(c)[0]), y: r(cp(c)[1]), sign: sign(M, c) }))
  const loops = Q.loops.map(([a, b, rr]) => { const [cx, cy] = T([a, b]); return { cx: r(cx), cy: r(cy), r: r(rr * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
