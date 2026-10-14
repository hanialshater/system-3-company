// Drawing (docs: index.d.ts). Layout = Tutte barycentric embedding of the graph of crossings, edge handles and
// regions (each piece's largest region on a circle), then an embedding-preserving force relaxation (`relax`,
// below). Each edge is drawn as ONE cubic Bezier: crossing, two handles, crossing; cut short at under-passes.
import { load, faces, pieces, trace, isOver, sign, darts } from './core.mjs'

// Stored handles are indexed from each crossing's first incoming slot (the incoming strand followed, counter-
// clockwise, by the other incoming one), not from the PD's slot 0, which a crossing change moves: so a stored
// layout still fits after crossingChange. `at(M, d)` = the index of dart d's handle in `points`.
const at = (M, d) => (d & ~3) + ((d - [0, 1, 2, 3].find((i) => M.h[(d & ~3) + i] && M.h[(d & ~3) + ((i + 1) & 3)])) & 3)

export function layout(pd, { relax = 60 } = {}) {
  const M = load(pd), F = faces(M), n = M.n, P = pieces(M), X = [], Y = []
  const O = tutte(M, F, P, X, Y)
  if (relax) force(M, F, P, X, Y, relax, O)
  return { crossings: [...Array(n).keys()].map((c) => [X[c], Y[c]]), points: darts(M).reduce((a, d) => ((a[at(M, d)] = [X[n + d], Y[n + d]]), a), []), loops: Array.from({ length: M.loops }, (_, j) => [2.6 * (P.length + j), 0, 0.8]) }
}
// Vertices: crossing c, handle n + d of dart d, region 5n + i. A region is joined to the handles round it; each
// piece's largest region is put on a unit circle, at x = 2.6 x piece, and every other vertex at its neighbours' mean.
// Returns those outer regions (by index in F).
function tutte(M, F, P, X, Y) {
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
  return outer
}

// Relaxation that keeps the embedding (PrEd, Bertault 2000; ImPrEd, Simonetto et al. 2011), forces after
// Fruchterman-Reingold, on the control polygons (crossing, handle, handle, crossing) of the edges: springs,
// vertex-vertex repulsion (8 x between two crossings, to spread them), vertex-segment repulsion within each face,
// a pull to the piece centre, a square-crossing pull, an angle spring at handles so strands bend evenly, and a
// bigon opener (in `relax`) so a long 2-sided region is drawn as a lens, not as a doubled line.
// Moves are bounded per direction (8 sectors, below), so no vertex crosses a segment: the polygons keep their
// faces and handedness. Each curve lies inside its polygon's hull; hulls of near strands can still overlap.
function force(M, F, P, X, Y, its, O) {
  const n = M.n
  P.forEach((cs, p) => {
    const V = cs.flatMap((c) => [c, ...[0, 1, 2, 3].map((s) => n + 4 * c + s)]), N = V.length, id = {}, x = new Float64Array(N), y = new Float64Array(N), cx = 2.6 * p, E = [], T = [], W = [], B = []
    V.forEach((v, i) => { id[v] = i; x[i] = X[v] - cx; y[i] = Y[v] })
    // Segments with springs: crossing to handle, and handle to handle (not across a kink, so its loop can open).
    // Strand triples (crossing, handle, next handle) for the bending spring.
    for (const c of cs) for (let s = 0; s < 4; s++) {
      const d = 4 * c + s, a = id[n + d], b = id[n + M.o[d]]
      E.push(id[c], a); if (d < M.o[d] && M.o[d] >> 2 != c) E.push(a, b)
      T.push(id[c], a, b)
    }
    // Bigons (2-sided regions, not the outer one): [crossing a, edge 1's handles from a, crossing b, edge 2's from a].
    for (const f of F) if (f[0] >> 2 in id) {
      if (f.length == 2 && !O.includes(F.indexOf(f))) { const [d, e] = f; B.push(id[d >> 2], id[n + d], id[n + M.o[d]], id[e >> 2], id[n + M.o[e]], id[n + e]) }
      const b = f.flatMap((d) => [id[d >> 2], id[n + d], id[n + M.o[d]]])
      b.forEach((u, i) => { const v = b[(i + 1) % b.length]; for (const w of b) if (w != u && w != v) W.push(w, u, v) })
    }
    // Tutte puts a kink's two handles on one point (the graph cannot tell them apart); a tiny step toward the
    // square frame separates them in the right order before relaxing. (A large one could cross a segment.)
    for (let c = 0; c < N; c += 5) frame(x, y, c, (v, ux, uy) => { x[v] += ux / 1e3; y[v] += uy / 1e3 })
    const x0 = x.slice(), y0 = y.slice()
    relax(x, y, E, T, W, B, Math.min(its, (2e8 / N ** 3) | 0))
    if (hand(x, y) > hand(x0, y0)) x.set(x0), y.set(y0)
    let mx = 0, my = 0, R = 0
    for (let i = 0; i < N; i++) mx += x[i] / N, my += y[i] / N
    for (let i = 0; i < N; i++) R = Math.max(R, Math.hypot(x[i] - mx, y[i] - my))
    V.forEach((v, i) => { X[v] = cx + (x[i] - mx) / (R || 1); Y[v] = (y[i] - my) / (R || 1) })
  })
}
// Square crossing: the frame of four directions 90 degrees apart that best fits crossing c's arms (circular mean),
// and for each handle v the move (ux, uy) onto it at the same distance, passed to f. Used as a force while
// relaxing, then applied alone, so every strand runs straight through its crossings and crosses at 90 degrees.
const frame = (x, y, c, f) => {
  let sn = 0, co = 0
  for (let s = 1; s < 5; s++) { const q = Math.atan2(y[c + s] - y[c], x[c + s] - x[c]) - (s * Math.PI) / 2; sn += Math.sin(q); co += Math.cos(q) }
  for (let s = 1; s < 5; s++) { const v = c + s, r = Math.hypot(x[v] - x[c], y[v] - y[c]), q = Math.atan2(sn, co) + (s * Math.PI) / 2; f(v, x[c] + r * Math.cos(q) - x[v], y[c] + r * Math.sin(q) - y[v]) }
}
// How many crossings turn the wrong way: (p0 - p2) x (p1 - p3) over the four handles must be positive (slots run
// counter-clockwise), as `draw` takes the strands' directions there from them. Relaxing must not add any.
const hand = (x, y) => { let h = 0; for (let c = 0; c < x.length; c += 5) h += (x[c + 1] - x[c + 3]) * (y[c + 2] - y[c + 4]) <= (y[c + 1] - y[c + 3]) * (x[c + 2] - x[c + 4]); return h }
// Movement zones (anisotropic, 8 sectors of 45 degrees). For a vertex v and a segment ab of a common face, with e
// the vector from the segment's nearest point to v (length d), v may approach the segment by less than 0.45 d
// along e and a, b by less than 0.45 d towards v; then a line across e separates them for the whole step, so they
// cannot meet. Each bound is filed under the sector of its direction, and a move m is cut so that, for every
// sector, its largest component along any direction in that sector stays under the sector's bound. Moves along or
// away from a near segment are free. (A step is at most k/4, so a bound at d >= 0.6 k never binds: skipped.)
// Steps: `its` cooling steps of all forces, then 12 steps of squaring alone (`frame`), inside the same zones.
function relax(x, y, E, T, W, B, its) {
  const N = x.length, fx = new Float64Array(N), fy = new Float64Array(N), lim = new Float64Array(8 * N), k = Math.sqrt(Math.PI / N), g = k / 2, Q = Math.PI / 4, U = [0, 1, 2, 3, 4, 5, 6, 7].map((s) => [Math.cos(s * Q), Math.sin(s * Q)])
  const zone = (v, ex, ey, d) => { const j = 8 * v + (Math.round(Math.atan2(ey, ex) / Q) & 7); if (d < lim[j]) lim[j] = d }
  for (let it = 0; it < its + 12; it++) {
    const z = it < its
    lim.fill(1e9)
    for (let i = 0; i < N; i++) { fx[i] = z ? -x[i] / 2 : 0; fy[i] = z ? -y[i] / 2 : 0 }
    if (z) {
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const dx = x[i] - x[j], dy = y[i] - y[j], f = (0.12 * k * k * (i % 5 || j % 5 ? 1 : 8)) / (dx * dx + dy * dy + 1e-12); fx[i] += dx * f; fy[i] += dy * f; fx[j] -= dx * f; fy[j] -= dy * f }
    for (let e = 0; e < E.length; e += 2) {
      const a = E[e], b = E[e + 1], dx = x[b] - x[a], dy = y[b] - y[a], f = Math.hypot(dx, dy) / k / 2
      fx[a] += dx * f; fy[a] += dy * f; fx[b] -= dx * f; fy[b] -= dy * f
    }
    // Angle spring at each handle b, between its crossing a and the edge's other handle c: pull b toward the
    // midpoint of a and c, and a and c the other way, in proportion to the turn at b (offset over |ac|, so it does
    // not depend on scale). Least total turning with the crossings' directions fixed = the turn shared evenly.
    for (let e = 0; e < T.length; e += 3) {
      const a = T[e], b = T[e + 1], c = T[e + 2], f = (0.4 * k) / (Math.hypot(x[c] - x[a], y[c] - y[a]) + 1e-9), ux = f * ((x[a] + x[c]) / 2 - x[b]), uy = f * ((y[a] + y[c]) / 2 - y[b])
      fx[b] += ux; fy[b] += uy; fx[a] -= ux / 2; fy[a] -= uy / 2; fx[c] -= ux / 2; fy[c] -= uy / 2
    }
    // Bigon opener. Squared crossings on Tutte's outer circle leave a long bigon as two near-parallel strands (a
    // doubled line). For a bigon with crossings a, b (chord l), w = how far apart its two edges' handles sit across
    // the chord (sum of the two handles' offsets, edge 1 minus edge 2). Below 6 (l - 1.5 k) the edges are pushed apart
    // across the chord, in proportion to the shortfall. A bigon shorter than 1.5 k (a twist in a dense diagram) gets
    // nothing: there the room is better spent on the other regions. The zones still bound every move.
    for (let e = 0; e < B.length; e += 6) {
      const a = B[e], b = B[e + 3], l = Math.hypot(x[b] - x[a], y[b] - y[a]) + 1e-9, nx = (y[a] - y[b]) / l, ny = (x[b] - x[a]) / l
      const o = (i) => (x[B[e + i]] + x[B[e + i + 1]] - 2 * x[a]) * nx + (y[B[e + i]] + y[B[e + i + 1]] - 2 * y[a]) * ny, w = o(1) - o(4), f = 6 * (l - 1.5 * k) - Math.abs(w)
      if (f > 0) for (const i of [1, 2, 4, 5]) { const q = (i < 3) == (w >= 0) ? 10 * f : -10 * f; fx[B[e + i]] += q * nx; fy[B[e + i]] += q * ny }
    }
    }
    for (let e = 0; e < W.length; e += 3) {
      const v = W[e], a = W[e + 1], b = W[e + 2], dx = x[b] - x[a], dy = y[b] - y[a]
      const t = Math.max(0, Math.min(1, ((x[v] - x[a]) * dx + (y[v] - y[a]) * dy) / (dx * dx + dy * dy + 1e-12))), ex = x[v] - x[a] - t * dx, ey = y[v] - y[a] - t * dy, d = Math.sqrt(ex * ex + ey * ey)
      if (d < 0.6 * k) zone(v, -ex, -ey, d), zone(a, ex, ey, d), zone(b, ex, ey, d)
      if (z && d < g) { const f = ((g - d) * (g - d) * (v % 5 ? 1 : 4)) / (d * d + 1e-12); fx[v] += ex * f; fy[v] += ey * f; fx[a] -= ex * f * (1 - t); fy[a] -= ey * f * (1 - t); fx[b] -= ex * f * t; fy[b] -= ey * f * t }
    }
    for (let c = 0; c < N; c += 5) frame(x, y, c, (v, ux, uy) => { fx[v] += z ? 0.2 * ux : ux; fy[v] += z ? 0.2 * uy : uy; if (z) fx[c] -= 0.2 * ux, fy[c] -= 0.2 * uy })
    for (let i = 0; i < N; i++) {
      const f = Math.hypot(fx[i], fy[i]) || 1
      let m = Math.min(f, (k * (z ? (its - it) / its : 1)) / 4)
      for (let s = 0; s < 8; s++) {
        const u = (fx[i] * U[s][0] + fy[i] * U[s][1]) / f, w = u > 0.92 ? 1 : 0.92 * u + 0.38 * Math.sqrt(1 - u * u)
        if (w > 0) m = Math.min(m, (0.45 * lim[8 * i + s]) / w)
      }
      x[i] += (fx[i] * m) / f; y[i] += (fy[i] * m) / f
    }
  }
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
  // The frame fits the curves (points at a quarter, half and three quarters of each edge), not their handles; a
  // handle that then falls outside the view box is moved onto its edge.
  const M = load(pd), [L, C] = trace(M), Q = Lay ?? layout(pd), tails = darts(M).filter((d) => !M.h[d]), pt = (d) => Q.points[at(M, d)]
  const all = [...tails.flatMap((t) => [1, 2, 3].map((j) => split([Q.crossings[t >> 2], pt(t), pt(M.o[t]), Q.crossings[M.o[t] >> 2]], j / 4)[1][0])), ...Q.loops.flatMap(([a, b, r]) => [[a - r, b - r], [a + r, b + r]])]
  // Scale to the view box; the short side is stretched by up to 20 % more to fill the square stage.
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]), x0 = Math.min(...xs), y1 = Math.max(...ys), S = size - 2 * margin, w = Math.max(...xs) - x0, h = y1 - Math.min(...ys)
  const k = S / Math.max(w, h, 1e-9), kx = Math.min(S / w, 1.2 * k), ky = Math.min(S / h, 1.2 * k), T = ([a, b]) => [margin + (a - x0) * kx, margin + (y1 - b) * ky]
  const cp = (c) => T(Q.crossings[c]), dp = (d) => T(pt(d)), r = (v) => Math.round(v * 10) / 10
  const g = gap * Math.min(...tails.map((t) => Math.hypot(...cp(t >> 2).map((v, i) => v - dp(t)[i]))), size / 8)
  const edges = tails.map((t) => {
    const h = M.o[t]
    // A kink (an edge from a crossing back to itself) leaves and returns at 90 degrees; drawn from its handles it
    // is a small hook, so its handles are taken twice as far out, which draws a round curl.
    const c = cp(t >> 2), w = (t >> 2 == h >> 2) + 1, H = (d) => dp(d).map((v, i) => c[i] + w * (v - c[i]))
    let b = [c, H(t), H(h), cp(h >> 2)]
    if (!isOver(M, t)) b = cut(b, g, false)
    if (!isOver(M, h)) b = cut(b, g, true)
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d: b.map((p, j) => (j ? (j > 1 ? ' ' : 'C') : 'M') + p.map((v) => r(Math.min(size, Math.max(0, v)))).join(' ')).join('') }
  })
  const crossings = [...Array(M.n).keys()].map((c) => ({ i: c, x: r(cp(c)[0]), y: r(cp(c)[1]), sign: sign(M, c) }))
  const loops = Q.loops.map(([a, b, rr]) => { const [cx, cy] = T([a, b]); return { cx: r(cx), cy: r(cy), r: r(rr * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
