// Invariants, exact integers (docs: index.d.ts): arcs, Fox colourings (Smith-style diagonalisation), determinant and
// Alexander (Fox-calculus matrix, Bareiss), Kauffman bracket state sum -> Jones, Gordon-Litherland signature.
import { load, toPD, faces, sign, darts, nX, pieces, writhe, components } from './core.mjs'
import { poly, pmul, padd } from './poly.mjs'
import { reduce } from './moves.mjs'

function arcInfo(M) {
  const p = [], f = (d) => (p[d] == d ? d : (p[d] = f(p[d]))), D = darts(M), id = {}, X = []
  for (const d of D) p[d] = d
  for (const d of D) { p[f(d)] = f(M.o[d]); if (isOv(M, d)) p[f(d)] = f(d ^ 2) }
  for (const d of D) id[f(d)] ??= Object.keys(id).length
  for (let c = 0; c < M.n; c++) if (!M.dead[c]) { const a = 4 * c + M.u[c], i = M.h[a] ? a : a ^ 2; X.push([id[f(a ^ 1)], id[f(i)], id[f(i ^ 2)], sign(M, c)]) }
  return { count: Object.keys(id).length, arc: D.map((d) => id[f(d)]), X }
}
const isOv = (M, d) => (d & 1) != M.u[d >> 2]

export function arcs(pd) {
  const M = load(pd), { count, arc, X } = arcInfo(M), edges = Array.from({ length: count }, () => [])
  darts(M).forEach((d, i) => M.h[d] && edges[arc[i]].push(M.lab[d]))
  return { count, crossings: X.map((x) => x.slice(0, 3)), edges }
}

export const colouringOk = (pd, col, p = 3) => arcs(pd).crossings.map(([o, i, j]) => (((2 * col[o] - col[i] - col[j]) % p) + p) % p == 0)

export function colourings(pd, p = 3) {
  const M = load(pd), { count, X } = arcInfo(M), m = X.length
  const A = X.map(([k, i, j]) => { const r = Array(count).fill(0); r[k] += 2; r[i]--; r[j]--; return r })
  let res = p ** M.loops, t = 0
  while (t < Math.min(m, count)) {
    let bi = -1, bj = 0, bv = Infinity
    for (let i = t; i < m; i++) for (let j = t; j < count; j++) { const v = Math.abs(A[i][j]); if (v && v < bv) (bv = v), (bi = i), (bj = j) }
    if (bi < 0) break
    ;[A[t], A[bi]] = [A[bi], A[t]]
    for (const r of A) [r[t], r[bj]] = [r[bj], r[t]]
    const pv = A[t][t]; let clean = true
    for (let i = t + 1; i < m; i++) { const q = Math.trunc(A[i][t] / pv); for (let j = t; j < count; j++) A[i][j] -= q * A[t][j]; if (A[i][t]) clean = false }
    for (let j = t + 1; j < count; j++) { const q = Math.trunc(A[t][j] / pv); for (let i = t; i < m; i++) A[i][j] -= q * A[i][t]; if (A[t][j]) clean = false }
    if (clean) res *= gcd(Math.abs(pv), p), t++
  }
  return res * p ** (count - t)
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a)
export const tricolourable = (pd) => colourings(pd, 3) > 3

const trim = (a) => { while (a.length && !a[a.length - 1]) a.pop(); return a }
const dsub = (a, b) => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) - (b[i] || 0)))
const dmul = (a, b) => { if (!a.length || !b.length) return []; const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => (r[i + j] += x * y))); return r }
const ddiv = (a, b) => { a = [...a]; const q = []; for (let i = a.length - b.length; i >= 0; i--) { const c = a[i + b.length - 1] / b[b.length - 1]; q[i] = c; b.forEach((y, j) => (a[i + j] -= c * y)) } return trim(q) }
function bareiss(A) {
  const n = A.length; let s = 1, prev = [1]
  for (let k = 0; k < n - 1; k++) {
    if (!A[k][k].length) { const r = A.findIndex((row, i) => i > k && row[k].length); if (r < 0) return []; [A[k], A[r]] = [A[r], A[k]]; s = -s }
    for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) A[i][j] = ddiv(dsub(dmul(A[i][j], A[k][k]), dmul(A[i][k], A[k][j])), prev)
    prev = A[k][k]
  }
  return (n ? A[n - 1][n - 1] : [1]).map((x) => s * x)
}
function matrix(pd, row) {
  const M = load(reduce(pd)), { count, X } = arcInfo(M)
  if ((M.loops && M.n) || count != X.length || pieces(M).length > 1) return null
  return X.map((x) => { const r = Array.from({ length: count }, () => []); row(x).forEach(([c, v]) => (r[c] = dsub(r[c], v))); return r.slice(1) }).slice(1)
}

export function determinant(pd) {
  if (!nX(reduce(pd))) return components(pd) == 1 ? 1 : 0
  const A = matrix(pd, ([k, i, j]) => [[k, [-2]], [i, [1]], [j, [1]]])
  return A ? Math.abs(bareiss(A)[0] || 0) : 0
}

export function alexander(pd) {
  const q = reduce(pd)
  if (!nX(q)) return components(q) == 1 ? { 0: 1 } : {}
  const A = matrix(q, ([k, i, j, s]) => (s > 0 ? [[k, [-1, 1]], [i, [0, -1]], [j, [1]]] : [[k, [1, -1]], [i, [-1]], [j, [0, 1]]]))
  const d = A ? bareiss(A) : [], lo = d.findIndex((x) => x), r = {}
  if (lo < 0) return {}
  d.forEach((c, i) => c && (r[i - (lo + d.length - 1) / 2] = c))
  const flip = components(q) == 1 ? d.reduce((a, b) => a + b, 0) < 0 : d[d.length - 1] < 0
  return poly(flip ? Object.fromEntries(Object.entries(r).map(([e, c]) => [e, -c])) : r)
}

export function bracket(pd) {
  pd = toPD(load(pd))
  const X = pd.filter((x) => x.length == 4), n = X.length, loops = pd.length ? pd.length - n : 1, cnt = {}
  const par = new Int32Array(2 * n + 1), f = (x) => { while (par[x] != x) x = par[x] = par[par[x]]; return x }, un = (a, b) => { a = f(a); b = f(b); return a != b && (par[a] = b, 1) }
  for (let s = 0; s < 1 << n; s++) {
    for (let i = 0; i <= 2 * n; i++) par[i] = i
    let c = 2 * n, a = n
    for (let i = 0; i < n; i++) { const [p, q, r, t] = X[i]; if ((s >> i) & 1) a--, (c -= un(p, t) + un(q, r)); else c -= un(p, q) + un(r, t) }
    const k = `${2 * a - n},${n ? c : 1}`
    cnt[k] = (cnt[k] || 0) + 1
  }
  let out = {}
  const delta = { 2: -1, '-2': -1 }, pw = [{ 0: 1 }]
  for (const k in cnt) {
    const [e, c] = k.split(',').map(Number), m = c - 1 + loops - (n ? 0 : 1)
    while (pw.length <= m) pw.push(pmul(pw[pw.length - 1], delta))
    out = padd(out, pmul({ [e]: cnt[k] }, pw[m]))
  }
  return out
}

export function jones(pd) {
  const q = reduce(pd), w = writhe(q), b = bracket(q), r = {}
  for (const k in b) r[-(+k - 3 * w) / 4] = b[k] * (w & 1 ? -1 : 1)
  return poly(r)
}

export function signature(pd) {
  const M = load(reduce(pd))
  if (!M.n) return 0
  if (M.loops || pieces(M).length > 1) throw Error('signature: connected diagrams only')
  const F = faces(M), fo = [], col = [0]
  F.forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  for (const st = [0]; st.length; ) for (const d of F[st.pop()]) { const g = fo[M.o[d]]; if (col[g] == null) (col[g] = 1 - col[fo[d]]), st.push(g) }
  const W = F.map((_, i) => i).filter((i) => !col[i]), wi = Object.fromEntries(W.map((w, i) => [w, i])), G = W.map(() => W.map(() => 0))
  let mu = 0
  for (let c = 0; c < M.n; c++) {
    const b = 4 * c, p = 1 - M.u[c], eta = col[fo[b + ((p + 1) & 3)]] ? -1 : 1, x = wi[fo[b + (col[fo[b]] ? 1 : 0)]], y = wi[fo[b + (col[fo[b]] ? 3 : 2)]]
    if (x != y) G[x][y] -= eta, G[y][x] -= eta, (G[x][x] += eta), (G[y][y] += eta)
    const a = M.u[c], i = M.h[b + a] ? a : a + 2, j = M.h[b + 1 - a] ? 3 - a : 1 - a
    if (!col[fo[b + (((j - i) & 3) == 1 ? (i + 1) & 3 : i)]]) mu += eta
  }
  return mu - inertia(G.slice(1).map((r) => r.slice(1)))
}
function inertia(A) {
  A = A.map((r) => r.map(BigInt))
  let s = 0
  while (A.length) {
    let k = A.findIndex((r, i) => r[i])
    if (k < 0) {
      const i = A.findIndex((r) => r.some((x) => x)); if (i < 0) break
      const j = A[i].findIndex((x) => x)
      A[i] = A[i].map((x, c) => x + A[j][c]); A.forEach((r) => (r[i] += r[j])); k = i
    }
    const p = A[k][k], a = A[k].filter((_, j) => j != k), g = p > 0n ? 1n : -1n
    s += Number(g)
    A = A.filter((_, i) => i != k).map((r, i) => r.filter((_, j) => j != k).map((x, j) => (p * x - a[i] * a[j]) * g))
  }
  return s
}
