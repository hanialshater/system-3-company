// Drawing (docs: index.d.ts). Two layouts, chosen by a generic test on the diagram: a reduced diagram (no nugatory
// crossing) gets gen 0's circle packing if its skeleton is planar (round, textbook look; smooth Catmull-Rom curves);
// every other diagram gets the orthogonal grid drawing of gen1-ortho (Tamassia 1987, topology-shape-metrics): every
// crossing is a grid point with its four strands leaving E, N, W, S; bends from a min-cost flow on the faces; faces
// cut into rectangles, then longest-path compaction, balanced. Paths: straight runs, bends rounded. No force
// relaxation of any kind. draw() scales each axis on its own to fill the square view box (the ortho stretch).
import { load, faces, pieces, trace, isOver, sign, darts, nugatory } from './core.mjs'

export function layout(pd, { tries = 3 } = {}) {
  const M = load(pd), F = faces(M), P = pieces(M), pc = [], fs = P.map(() => [])
  if (!nugatory(pd).length) { const L = pack(M, F, P); if (L) return L }
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
// Round branch, for reduced diagrams: gen 0's circle packing (Collins-Stephenson) of the crossing/edge/region
// triangulation, each piece's largest region at infinity. Kept only if its straight skeleton is planar.
const ang = (a, b, c) => Math.acos(1 - (2 * b * c) / (a + b) / (a + c))
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]), lerp = (a, b, s) => a.map((v, j) => v + (b[j] - v) * s)
const pol = (p, l, f) => [p[0] + l * Math.cos(f), p[1] + l * Math.sin(f)], an = (p, q) => Math.atan2(q[1] - p[1], q[0] - p[0])
function pack(M, F, P) {
  const n = M.n, o = M.o, N = 5 * n, fo = [], Z = [], ed = (d) => n + Math.min(d, o[d]), rot = [], S = [], points = {}
  F.forEach((f, i) => f.forEach((d) => (fo[d] = N + i)))
  for (const d of darts(M)) {
    const c = d >> 2
    ;(rot[c] ||= []).push(ed(d), fo[4 * c + ((d + 1) & 3)])
    rot[ed(d)] = [c, fo[d], o[d] >> 2, fo[o[d]]]
    S.push([c, n + d]), d < o[d] && S.push([n + d, n + o[d]])
  }
  F.forEach((f, i) => (rot[N + i] = f.flatMap((d) => [d >> 2, ed(d)]).reverse()))
  P.forEach((cs, p) => {
    const vs = [...new Set(cs.flatMap((c) => [c, ...rot[c]]))], out = vs.filter((v) => v >= N).sort((a, b) => rot[b].length - rot[a].length)[0]
    const bd = [out, ...rot[out]], q = vs.filter((v) => !bd.includes(v)), r = [], z = []
    vs.forEach((v) => (r[v] = 1))
    for (let it = 0; it < 200; it++) for (const v of q) {
      const w = rot[v], k = w.length, b = Math.sin(w.reduce((s, a, i) => s + ang(r[v], r[a], r[w[(i + 1) % k]]), 0) / (2 * k)), dl = Math.sin(Math.PI / k)
      r[v] = ((r[v] * b) / (1 - b)) * ((1 - dl) / dl)
    }
    // Lay the circles out from the first inner one, each new one tangent to its two predecessors.
    const [v0] = q, [w0] = rot[v0], Q = [v0, w0].filter((v) => !bd.includes(v))
    z[v0] = [0, 0], z[w0] = [r[v0] + r[w0], 0]
    for (const v of Q) {
      const w = rot[v], k = w.length, j = w.findIndex((a) => z[a])
      for (let i = 1; i < k; i++) {
        const a = w[(j + i - 1) % k], b = w[(j + i) % k]
        z[b] || ((z[b] = pol(z[v], r[v] + r[b], an(z[v], z[a]) + ang(r[v], r[a], r[b]))), bd.includes(b) || Q.push(b))
      }
    }
    const R = Math.max(...cs.flatMap((c) => [c, ...rot[c]].filter((v) => v < N).map((v) => Math.hypot(...z[v])))), T = (v) => [2.6 * p + z[v][0] / R, z[v][1] / R]
    // Each strand leaves its crossing 0.6 of the way to the edge's circle, turned 30 % towards a right-angled cross.
    for (const c of cs) {
      const C = (Z[c] = T(c)), e = [0, 1, 2, 3].map((s) => T(ed(4 * c + s))), a = e.map((p) => an(C, p)), u = Math.atan2(...[Math.sin, Math.cos].map((f) => a.reduce((t, x, s) => t + f(x - (s * Math.PI) / 2), 0)))
      a.forEach((x, s) => (Z[n + 4 * c + s] = pol(C, 0.6 * dist(e[s], C), x + 0.3 * Math.asin(Math.sin(u + (s * Math.PI) / 2 - x)))))
    }
  })
  const sg = (p, q, r) => Math.sign(Math.sin(an(Z[p], Z[r]) - an(Z[p], Z[q])))
  if (!Z.flat().every(isFinite) || S.some((s) => S.some((t) => !s.some((v) => t.includes(v)) && sg(...s, t[0]) * sg(...s, t[1]) < 0 && sg(...t, s[0]) * sg(...t, s[1]) < 0))) return
  for (const t of darts(M)) if (!M.h[t]) points[M.lab[t]] = [Z[n + t], Z[n + o[t]]]
  return { round: 1, crossings: Z.slice(0, n), points, loops: Array.from({ length: M.loops }, (_, j) => [2.6 * (P.length + j), 0, 0.8]) }
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
  const pt = (v) => [X[v], Y[v]]
  for (const l in poly) poly[l] = poly[l].map(pt)
  return { w, crossings: [...Array(n).keys()].map(pt), points: poly, loops: Array.from({ length: M.loops }, (_, j) => [ox + 2.5 * j + 1, 0, 1]) }
}

export function draw(pd, { size = 100, margin = 8, gap = 0.35, layout: Lay } = {}) {
  const M = load(pd), [L, C] = trace(M), Q = Lay ?? layout(pd), all = [...Q.crossings, ...Object.values(Q.points).flat(), ...Q.loops.flatMap(([a, b, r]) => [[a - r, b - r], [a + r, b + r]])]
  // The stretch: each axis is scaled on its own to fill the square view box.
  const lo = [0, 1].map((j) => Math.min(...all.map((p) => p[j]))), K = [0, 1].map((j) => (size - 2 * margin) / Math.max(Math.max(...all.map((p) => p[j])) - lo[j], 1e-9))
  const k = Math.min(...K), T = (p) => p.map((v, j) => (j ? size - margin - (v - lo[1]) * K[1] : margin + (v - lo[0]) * K[0]))
  const cp = (c) => T(Q.crossings[c]), r = (v) => Math.round(v * 10) / 10, P = (p) => p.map(r).join(' ')
  const tails = darts(M).filter((d) => !M.h[d]), path = (t) => [cp(t >> 2), ...Q.points[M.lab[t]].map(T), cp(M.o[t] >> 2)]
  const g = gap * Math.min(...tails.map((t) => dist(...path(t))), size / 8)
  // Under-pass gap: keep the part of a cubic beyond chord distance g from its start (de Casteljau split).
  const cut = ([a, b, c, e], s = Math.min(0.8, g / dist(a, e))) => { const p = lerp(a, b, s), q = lerp(b, c, s), u = lerp(c, e, s), v = lerp(q, u, s); return [lerp(lerp(p, q, s), v, s), v, u, e] }
  const edges = tails.map((t) => {
    const h = M.o[t], q = path(t), m = q.length - 1, B = [], line = (a, c) => P(a) != P(c) && B.push([a, lerp(a, c, 1 / 3), lerp(c, a, 1 / 3), c])
    if (Q.round) {
      // Round branch: Catmull-Rom through the strand, continued across each end crossing so it passes straight.
      const z = [T(Q.points[M.lab[t ^ 2]][M.h[t ^ 2]]), ...q, T(Q.points[M.lab[h ^ 2]][M.h[h ^ 2]])]
      for (let i = 1; i <= m; i++) B.push([z[i], ...[[i, i + 1, i - 1], [i + 1, i, i + 2]].map(([a, b, c]) => z[a].map((v, j) => v + (z[b][j] - z[c][j]) / 6)), z[i + 1]])
    } else {
      // Straight runs; each bend a rounded corner (radius at most half a layout unit and half of either leg).
      let a = q[0]
      for (let i = 1; i < m; i++) {
        const s = Math.min(k / 2, dist(q[i - 1], q[i]) / 2, dist(q[i], q[i + 1]) / 2), [c, f] = [i - 1, i + 1].map((j) => lerp(q[i], q[j], s / dist(q[i], q[j])))
        line(a, c), B.push([c, lerp(c, q[i], 2 / 3), lerp(f, q[i], 2 / 3), (a = f)])
      }
      line(a, q[m])
    }
    if (!isOver(M, t)) B[0] = cut(B[0])
    if (!isOver(M, h)) B.push(cut(B.pop().reverse()).reverse())
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d: `M${P(B[0][0])}` + B.map((b) => 'C' + b.slice(1).map(P).join(' ')).join('') }
  })
  const crossings = Q.crossings.map((p, i) => { const [x, y] = T(p).map(r); return { i, x, y, sign: sign(M, i) } })
  const loops = Q.loops.map(([a, b, c]) => { const [cx, cy] = T([a, b]).map(r); return { cx, cy, r: r(c * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
