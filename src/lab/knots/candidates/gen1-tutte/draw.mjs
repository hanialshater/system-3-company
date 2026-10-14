// Drawing (docs: index.d.ts). Layout: layout.mjs. Paths: Catmull-Rom cubics, cut short at under-passes.
import { load, trace, isOver, sign, darts } from './core.mjs'
import { layout } from './layout.mjs'
export { layout }

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
  // the point "behind" dart d for the tangent at its crossing, along the difference of the unit stubs d and d^2: the
  // strands then cross with the right handedness whenever the four stubs go round the crossing in order
  const V = (d) => { const c = cp(d >> 2), [e, f] = [d, d ^ 2].map((s) => dp(s).map((v, i) => v - c[i])), l = Math.hypot(...e) || 1e-9, m = Math.hypot(...f) || 1e-9, n = [0, 1].map((i) => e[i] / l - f[i] / m), z = (l + m) / (Math.hypot(...n) || 1e-9); return [0, 1].map((i) => dp(d)[i] - z * n[i]) }
  const edges = tails.map((t) => {
    const h = M.o[t], q = [V(t), cp(t >> 2), dp(t), dp(h), cp(h >> 2), V(h)]
    const segs = [0, 1, 2].map((i) => { const a = q[i + 1], b = q[i + 2]; return [a, [a[0] + (b[0] - q[i][0]) / 6, a[1] + (b[1] - q[i][1]) / 6], [b[0] - (q[i + 3][0] - a[0]) / 6, b[1] - (q[i + 3][1] - a[1]) / 6], b] })
    if (!isOver(M, t)) segs[0] = cut(segs[0], g, false)
    if (!isOver(M, h)) segs[2] = cut(segs[2], g, true)
    return { label: L[t], component: C[t], from: t >> 2, to: h >> 2, d: `M${r(segs[0][0][0])} ${r(segs[0][0][1])}` + segs.map((s) => 'C' + s.slice(1).map((p) => `${r(p[0])} ${r(p[1])}`).join(' ')).join('') }
  })
  const crossings = [...Array(M.n).keys()].map((c) => ({ i: c, x: r(cp(c)[0]), y: r(cp(c)[1]), sign: sign(M, c) }))
  const loops = Q.loops.map(([a, b, rr]) => { const [cx, cy] = T([a, b]); return { cx: r(cx), cy: r(cy), r: r(rr * k) } })
  return { size, viewBox: `0 0 ${size} ${size}`, edges, crossings, loops }
}
