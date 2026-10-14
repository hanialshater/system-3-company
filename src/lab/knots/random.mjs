// Seeded randomness: random braid knots, random 3-D curves, closing open curves, projecting to a diagram.
import { fromBraid, fromGauss } from './codes.mjs'
import { mulberry32 } from './rng.mjs'

export { mulberry32 }

export function randomKnot(seed = 1, { strands = 3, length = 10 } = {}) {
  const rng = mulberry32(seed)
  length += (length - strands + 1) & 1
  for (let tries = 0; tries < 1e4; tries++) {
    const w = Array.from({ length }, () => (1 + ((rng() * (strands - 1)) | 0)) * (rng() < 0.5 ? -1 : 1)), p = [...Array(strands).keys()]
    for (const g of w) { const i = Math.abs(g) - 1; [p[i], p[i + 1]] = [p[i + 1], p[i]] }
    let c = 1
    for (let x = p[0]; x; x = p[x]) c++
    if (c == strands) return { braid: w, pd: fromBraid(w, strands) }
  }
  throw Error('no knot found')
}

export function randomWalk(seed = 1, steps = 40, radius = Infinity) {
  const rng = mulberry32(seed), pts = [[0, 0, 0]]
  while (pts.length <= steps) {
    const [x, y, z] = pts[pts.length - 1], w = 2 * rng() - 1, a = 2 * Math.PI * rng(), r = Math.sqrt(1 - w * w), q = [x + r * Math.cos(a), y + r * Math.sin(a), z + w]
    if (Math.hypot(...q) <= radius) pts.push(q)
  }
  return pts
}

export function closeCurve(pts, method = 'direct') {
  if (method == 'direct') return pts
  const m = pts.length, c = [0, 1, 2].map((i) => pts.reduce((s, p) => s + p[i], 0) / m), R = 100 * Math.max(...pts.map((p) => Math.hypot(...p.map((x, i) => x - c[i]))))
  const far = (p) => { const v = p.map((x, i) => x - c[i]), l = Math.hypot(...v) || 1; return v.map((x, i) => c[i] + (x / l) * R) }
  return [...pts, far(pts[m - 1]), far(pts[0])]
}

export function project(pts) {
  const N = pts.length, pass = Array.from({ length: N }, () => []), signs = []
  for (let i = 0; i < N; i++) for (let j = i + 2; j < N; j++) {
    if (i == 0 && j == N - 1) continue
    const [a, b, c, d] = [pts[i], pts[(i + 1) % N], pts[j], pts[(j + 1) % N]], r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]], den = r[0] * s[1] - r[1] * s[0]
    if (!den) continue
    const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den, v = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den
    if (t <= 0 || t >= 1 || v <= 0 || v >= 1) continue
    const k = signs.length + 1, iOver = a[2] + t * (b[2] - a[2]) > c[2] + v * (d[2] - c[2])
    signs.push(Math.sign(iOver ? den : -den))
    pass[i].push([t, iOver ? k : -k]); pass[j].push([v, iOver ? -k : k])
  }
  return fromGauss([pass.flatMap((p) => p.sort((x, y) => x[0] - y[0]).map((x) => x[1]))], signs)
}
