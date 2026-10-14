// Diagram core (docs: index.d.ts). PD crossing [a, b, c, d]: labels counter-clockwise from the incoming under-strand.
// Model: dart d = 4*crossing + slot; o[d] = other end of d's edge; h[d] = 1 if the edge enters at d;
// u[c] = parity of the under-strand's slots; faces are orbits of d -> S(o[d]) (region on the right).
export const S = (d) => (d & ~3) | ((d + 1) & 3)
export const darts = (M) => { const r = []; for (let c = 0; c < M.n; c++) if (!M.dead[c]) r.push(4 * c, 4 * c + 1, 4 * c + 2, 4 * c + 3); return r }
export const isOver = (M, d) => (d & 1) != M.u[d >> 2]
export const nX = (pd) => pd.filter((x) => x.length == 4).length

export function load(pd) {
  if (!Array.isArray(pd)) throw Error('PD code must be an array')
  const X = pd.filter((x) => x.length == 4), n = X.length, o = [], h = [], lab = [], at = {}, q = []
  X.forEach((x, c) => x.forEach((l, s) => (at[l] ||= []).push(4 * c + s)))
  for (const l in at) { const [a, b, z] = at[l]; if (b == null || z != null) throw Error(`edge ${l} must appear exactly twice`); o[a] = b; o[b] = a; lab[a] = lab[b] = +l }
  const set = (d, v) => { if (h[d] == null) h[d] = v, q.push(d); else if (h[d] != v) throw Error('inconsistent orientation') }
  const flow = () => { while (q.length) { const d = q.pop(); set(o[d], 1 - h[d]); set(d ^ 2, 1 - h[d]) } }
  for (let c = 0; c < n; c++) set(4 * c, 1)
  flow()
  for (let c = 0; c < n; c++) if (h[4 * c + 1] == null) { const [, j, , l] = X[c]; set(4 * c + (j - l == 1 || l - j > 1 ? 3 : 1), 1); flow() }
  const M = { n, o, h, lab, u: X.map(() => 0), dead: [], loops: pd.length ? pd.length - n : 1 }
  if (faces(M).length != n + 2 * pieces(M).length) throw Error('PD code is not planar')
  return M
}

export function faces(M) {
  const seen = [], F = []
  for (const d of darts(M)) if (!seen[d]) { const f = []; for (let e = d; !seen[e]; e = S(M.o[e])) seen[e] = 1, f.push(e); F.push(f) }
  return F
}

export function pieces(M) {
  const p = [], f = (c) => (p[c] == c ? c : (p[c] = f(p[c])))
  const D = darts(M), g = {}
  for (const d of D) p[d >> 2] = d >> 2
  for (const d of D) p[f(d >> 2)] = f(M.o[d] >> 2)
  for (const d of D) if (!(d & 3)) (g[f(d >> 2)] ||= []).push(d >> 2)
  return Object.values(g)
}

export function trace(M) {
  const L = [], C = [], T = darts(M).filter((d) => !M.h[d]).sort((a, b) => (M.lab[a] ?? 1e9) - (M.lab[b] ?? 1e9) || a - b)
  let e = 0, k = 0
  for (const t of T) if (L[t] == null) { for (let d = t; L[d] == null; d = M.o[d] ^ 2) L[d] = L[M.o[d]] = ++e, C[d] = C[M.o[d]] = k; k++ }
  return [L, C, k]
}

export function toPD(M) {
  const [L] = trace(M), pd = []
  for (let c = 0; c < M.n; c++) if (!M.dead[c]) { const a = M.u[c], s = M.h[4 * c + a] ? a : a + 2; pd.push([0, 1, 2, 3].map((i) => L[4 * c + ((s + i) & 3)])) }
  let e = 2 * pd.length
  for (let i = 0; i < M.loops; i++) pd.push([++e])
  return pd.length == 1 && pd[0].length == 1 ? [] : pd
}

export const sign = (M, c) => { const a = M.u[c], i = M.h[4 * c + a] ? a : a + 2, j = M.h[4 * c + 1 - a] ? 1 - a : 3 - a; return ((j - i) & 3) == 3 ? 1 : -1 }
const live = (M) => [...Array(M.n).keys()].filter((c) => !M.dead[c])
export const signs = (pd) => { const M = load(pd); return live(M).map((c) => sign(M, c)) }
export const writhe = (pd) => signs(pd).reduce((a, b) => a + b, 0)
export const components = (pd) => { const M = load(pd); return trace(M)[2] + M.loops }

export function linkingMatrix(pd) {
  const M = load(pd), [, C, k] = trace(M), m = k + M.loops, Z = Array.from({ length: m }, () => Array(m).fill(0))
  for (const c of live(M)) { const a = C[4 * c], b = C[4 * c + 1]; if (a != b) Z[a][b] += sign(M, c), Z[b][a] += sign(M, c) }
  return Z.map((r) => r.map((x) => x / 2))
}
export const linkingNumber = (pd, a = 0, b = 1) => linkingMatrix(pd)[a][b]

export function excise(M, dead, keep = () => 1) {
  for (const c of dead) M.dead[c] = 1
  const { o } = M, seen = []
  for (const d of darts(M)) if (M.dead[o[d] >> 2] && !seen[d]) {
    let e = o[d]
    while (M.dead[e >> 2]) seen[e] = seen[e ^ 2] = 1, e = o[e ^ 2]
    o[d] = e; o[e] = d; seen[d] = seen[e] = 1
  }
  for (const c of dead) for (let s = 0; s < 4; s++) {
    const d0 = 4 * c + s
    if (seen[d0]) continue
    let e = d0
    do seen[e] = seen[e ^ 2] = 1, e = o[e ^ 2]; while (e != d0)
    if (keep(d0)) M.loops++
  }
}

const op = (f) => (pd, ...a) => { const M = load(pd); f(M, ...a); return toPD(M) }
export const crossingChange = op((M, ...cs) => cs.forEach((c) => (M.u[c] ^= 1)))
export const mirror = op((M) => (M.u = M.u.map((x) => x ^ 1)))
export const reverse = op((M, k) => { const [, C] = trace(M); for (const d of darts(M)) if (k == null || C[d] == k) M.h[d] ^= 1 })
export const turnOver = op((M) => {
  const p = (d) => (d & ~3) | (-d & 3), o = [], h = [], lab = []
  for (const d of darts(M)) o[p(d)] = p(M.o[d]), h[p(d)] = M.h[d], lab[p(d)] = M.lab[d]
  Object.assign(M, { o, h, lab, u: M.u.map((x) => x ^ 1) })
})
export const deleteComponent = op((M, k) => {
  const [, C, m] = trace(M)
  if (k >= m) return void M.loops--
  excise(M, new Set(darts(M).filter((d) => C[d] == k).map((d) => d >> 2)), (d) => C[d] != k)
})

export function connectedSum(a, b) {
  const A = load(a), B = load(b)
  if (!B.n) return toPD({ ...A, loops: A.loops + B.loops - 1 })
  if (!A.n) return toPD({ ...B, loops: A.loops + B.loops - 1 })
  const N = 4 * A.n, M = { n: A.n + B.n, o: [...A.o, ...B.o.map((x) => x + N)], h: [...A.h, ...B.h], lab: [...A.lab, ...B.lab.map((x) => x + 1e6)], u: [...A.u, ...B.u], dead: [], loops: A.loops + B.loops }
  const t1 = A.h.indexOf(0), t2 = N + B.h.indexOf(0), h1 = M.o[t1], h2 = M.o[t2]
  M.o[t1] = h2; M.o[h2] = t1; M.o[t2] = h1; M.o[h1] = t2
  return toPD(M)
}

export function isAlternating(pd) {
  const M = load(pd)
  return darts(M).every((d) => !M.h[d] || isOver(M, d) != isOver(M, M.o[d ^ 2]))
}

export function nugatory(pd) {
  const M = load(pd), fo = []
  faces(M).forEach((f, i) => f.forEach((d) => (fo[d] = i)))
  return live(M).filter((c) => new Set([0, 1, 2, 3].map((s) => fo[4 * c + s])).size < 4)
}
