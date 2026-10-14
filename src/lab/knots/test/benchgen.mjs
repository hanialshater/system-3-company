// Evaluator-owned input generators for bench.mjs (owner: rnd-lead). Nothing here imports the library under
// test, so a candidate cannot change what it is scored on. Every input is generated at bench time from a
// seed (EVOLVE_SEED, set by tools/evolve.mjs once per scoring run), so a candidate cannot special-case it.
// PD convention (same as the library): [a, b, c, d] counter-clockwise from the incoming under-strand.
// Knots only: labels 1..2n run consecutively along the orientation.

export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), a | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const int = (r, n) => (r() * n) | 0

// Closure of a braid word (σi = i, σi⁻¹ = -i, 1-based) on `strands` strands; null unless it closes to one knot.
export function braidPD(word, strands) {
  if (new Set(word.map(Math.abs)).size != strands - 1) return null
  const pos = [...Array(strands).keys()], X = [], par = []
  let id = strands
  const f = (e) => (par[e] == null || par[e] == e ? e : (par[e] = f(par[e])))
  for (const g of word) {
    const i = Math.abs(g) - 1, inL = pos[i], inR = pos[i + 1], outL = id++, outR = id++
    // y up: NE = outR, NW = outL, SW = inL, SE = inR (counter-clockwise NE, NW, SW, SE).
    X.push(g > 0 ? { t: [inR, outR, outL, inL], ins: [0, 3] } : { t: [inL, inR, outR, outL], ins: [0, 1] })
    pos[i] = outL; pos[i + 1] = outR
  }
  pos.forEach((top, k) => (par[top] = k))
  const T = X.map((x) => ({ t: x.t.map(f), ins: x.ins })), head = new Map()
  T.forEach((x, c) => x.ins.forEach((s) => head.set(x.t[s], [c, s])))
  if (head.size != 2 * T.length) return null
  // Trace from edge T[0].t[0]: the strand goes straight through (slot s in → slot s+2 out).
  const lab = new Map()
  let e = T[0].t[0]
  for (let k = 1; !lab.has(e); k++) { lab.set(e, k); const [c, s] = head.get(e); e = T[c].t[(s + 2) & 3] }
  if (lab.size != 2 * T.length) return null
  return T.map((x) => x.t.map((e) => lab.get(e)))
}

export function randomBraid(r, strands, length) {
  length += (length - strands + 1) & 1 // a strands-cycle needs this parity
  for (let tries = 0; tries < 1000; tries++) {
    const w = []
    while (w.length < length) { const g = (1 + int(r, strands - 1)) * (r() < 0.5 ? -1 : 1); if (w[w.length - 1] != -g) w.push(g) }
    const pd = braidPD(w, strands)
    if (pd) return pd
  }
  return null
}

// Projection of a closed 3-D polygon to the xy-plane (generic position assumed; random floats).
export function projectPD(P) {
  const N = P.length, pass = Array.from({ length: N }, () => []), X = []
  for (let i = 0; i < N; i++) for (let j = i + 2; j < N; j++) {
    if (i == 0 && j == N - 1) continue
    const a = P[i], b = P[(i + 1) % N], c = P[j], d = P[(j + 1) % N], r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]], den = r[0] * s[1] - r[1] * s[0]
    if (!den) continue
    const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den, v = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den
    if (t <= 0 || t >= 1 || v <= 0 || v >= 1) continue
    const k = X.length, iOver = a[2] + t * (b[2] - a[2]) > c[2] + v * (d[2] - c[2])
    X.push({ over: iOver ? r : s, under: iOver ? s : r })
    pass[i].push([t, k, iOver]); pass[j].push([v, k, !iOver])
  }
  const seq = pass.flatMap((p) => p.sort((x, y) => x[0] - y[0])), m = seq.length
  if (!m) return []
  seq.forEach(([, k, over], q) => { const io = [q == 0 ? m : q, q + 1]; if (over) X[k].o = io; else X[k].u = io })
  return X.map(({ over, under, o, u }) => (under[0] * over[1] - under[1] * over[0] > 0 ? [u[0], o[0], u[1], o[1]] : [u[0], o[1], u[1], o[0]]))
}

// A random closed polygon: a walk of unit steps in a ball, closed by a straight segment.
export function randomPolygon(r, steps, radius) {
  const pts = [[0, 0, 0]]
  while (pts.length < steps) {
    const [x, y, z] = pts[pts.length - 1], w = 2 * r() - 1, a = 2 * Math.PI * r(), s = Math.sqrt(1 - w * w), q = [x + s * Math.cos(a), y + s * Math.sin(a), z + w]
    if (Math.hypot(...q) <= radius) pts.push(q)
  }
  return pts
}

// Disguises that keep the knot type (or mirror it): relabelling, crossing order, mirror, reversal.
const n2 = (pd) => 2 * pd.length, succ = (pd, l) => (l % n2(pd)) + 1
export const knotSign = (pd, x) => (x[1] == succ(pd, x[3]) ? 1 : -1) // +1: the over-strand enters at slot d
export function mirror(pd) { return pd.map((x) => (knotSign(pd, x) > 0 ? [x[3], x[0], x[1], x[2]] : [x[1], x[2], x[3], x[0]])) }
export function reverse(pd) { const m = n2(pd) + 1; return pd.map(([a, b, c, d]) => [c, d, a, b].map((l) => m - l)) }
export function disguise(pd, r) {
  if (!pd.length) return pd
  const n = n2(pd), k = int(r, n)
  let q = pd.map((x) => x.map((l) => ((l - 1 + k) % n) + 1))
  if (r() < 0.5) q = mirror(q)
  if (r() < 0.5) q = reverse(q)
  for (let i = q.length - 1; i > 0; i--) { const j = int(r, i + 1); [q[i], q[j]] = [q[j], q[i]] }
  return q
}

// Connected sum of two knot diagrams, joined at edge e of A and edge f of B (head ends swapped).
export function connectedSum(A, B, e = 1, f = 1) {
  if (!A.length) return B
  if (!B.length) return A
  const na = n2(A), nb = n2(B)
  const isIn = (pd, x, s) => s == 0 || (s == 3 && knotSign(pd, x) > 0) || (s == 1 && knotSign(pd, x) < 0)
  const mapA = (l) => (l <= e ? l : l + nb), mapB = (l) => e + ((((l - f - 1) % nb) + nb) % nb) + 1
  return [
    ...A.map((x) => x.map((l, s) => (l == e && isIn(A, x, s) ? e + nb : mapA(l)))),
    ...B.map((x) => x.map((l, s) => (l == f && isIn(B, x, s) ? e : mapB(l)))),
  ]
}

// Reference Jones polynomial for small knot diagrams (Kauffman bracket state sum; library conventions:
// A-smoothing joins (a,b),(c,d); V = (-A^3)^-w <D>, t = A^-4). Returns {exponent of t: coefficient}.
export function jonesRef(pd) {
  const n = pd.length, w = pd.reduce((s, x) => s + knotSign(pd, x), 0), cnt = new Map()
  if (!n) return { 0: 1 }
  const par = new Int32Array(2 * n + 1), f = (x) => { while (par[x] != x) x = par[x] = par[par[x]]; return x }, un = (a, b) => { a = f(a); b = f(b); if (a == b) return 0; par[a] = b; return 1 }
  for (let s = 0; s < 1 << n; s++) {
    for (let i = 0; i <= 2 * n; i++) par[i] = i
    let loops = 2 * n, a = 0
    for (let i = 0; i < n; i++) { const [p, q, r, t] = pd[i]; if ((s >> i) & 1) loops -= un(p, t) + un(q, r); else (a++, (loops -= un(p, q) + un(r, t))) }
    const key = `${2 * a - n},${loops}`
    cnt.set(key, (cnt.get(key) || 0) + 1)
  }
  const B = {} // <D> = sum A^e * d^(loops-1), d = -A^2 - A^-2
  for (const [key, c] of cnt) {
    const [e, l] = key.split(',').map(Number)
    let p = { [e]: c }
    for (let k = 1; k < l; k++) { const q = {}; for (const x in p) { q[+x + 2] = (q[+x + 2] || 0) - p[x]; q[+x - 2] = (q[+x - 2] || 0) - p[x] } p = q }
    for (const x in p) B[x] = (B[x] || 0) + p[x]
  }
  const V = {}
  for (const e in B) if (B[e]) V[-(+e - 3 * w) / 4] = B[e] * (w & 1 ? -1 : 1)
  return V
}
