// Design-lead probe for company/design/reviews/2026-10-16-knots-specs-review.md (left-or-right marks and flip timing).
// Run from the repo root: node company/design/reviews/2026-10-16-knots-specs-review/badge-probe.mjs [radii, default "10,13"]
// Imports only the kit. For each knot and each of the four B2 rest states (spec table), it places one badge per crossing
// the way the spec does (ring of radius R round the crossing's on-screen position, 32 angles, centre inside -3..103,
// farthest from every drawn strand) and prints the clearances. Then it prints how long a 300 ms flip spends between
// 63 and 117 degrees (the band where 4_1's strands touch) for several easings.
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const K = await import(join(dirname(fileURLToPath(import.meta.url)), '../../../../src/kit/knots/index.mjs'))

const BADGE = 4.6, RING = 0.25, HALF_STROKE = 1 // view-box units; S2 stroke 2
const sample = (d) => { // draw() emits one cubic per edge: "Mx yCx1 y1 x2 y2 x y"
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number)
  if (n.length !== 8) throw new Error('edge is not a single cubic; update the sampler: ' + d)
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n, p = []
  for (let i = 0; i <= 200; i++) { const t = i / 200, u = 1 - t; p.push([u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3, u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3]) }
  return p
}
for (const R of (process.argv[2] || '10,13').split(',').map(Number)) {
  let worst = Infinity, where = ''
  for (const n of ['3_1', '4_1']) {
    const pd = K.knot(n).pd, L = K.layout(pd)
    const front = K.draw(pd, { layout: L, gap: 0.5 }), back = K.draw(K.mirror(pd), { layout: L, gap: 0.5 })
    const states = { front: [front, (x) => x], turned: [back, (x) => 100 - x], mirrored: [front, (x) => 100 - x], 'mirrored+turned': [back, (x) => x] }
    for (const [st, [d, fx]] of Object.entries(states)) {
      const strand = d.edges.flatMap((e) => sample(e.d)).map(([x, y]) => [fx(x), y])
      const cr = d.crossings.map((c) => [fx(c.x), c.y])
      const badges = cr.map(([X, Y]) => {
        let best = null
        for (let a = 0; a < 32; a++) {
          const bx = X + R * Math.cos(a * Math.PI / 16), by = Y + R * Math.sin(a * Math.PI / 16)
          if (bx < -3 || bx > 103 || by < -3 || by > 103) continue
          const clear = Math.min(...strand.map(([x, y]) => Math.hypot(x - bx, y - by)))
          if (!best || clear > best.clear) best = { bx, by, clear }
        }
        return best
      })
      badges.forEach((b, k) => {
        const edge = b.clear - BADGE - RING - HALF_STROKE
        const other = Math.min(...cr.filter((_, j) => j !== k).map(([x, y]) => Math.hypot(x - b.bx, y - b.by)))
        const near = Math.min(...badges.filter((_, j) => j !== k).map((o) => Math.hypot(o.bx - b.bx, o.by - b.by)))
        if (edge < worst) { worst = edge; where = `${n} ${st} crossing ${k} at (${cr[k][0].toFixed(1)}, ${cr[k][1].toFixed(1)})` }
        if (process.env.VERBOSE) console.log(`R ${R} ${n} ${st} c${k}: centre clear ${b.clear.toFixed(2)}, edge gap ${edge.toFixed(2)} u, nearest other crossing ${other.toFixed(1)}, nearest badge ${near.toFixed(1)}`)
      })
    }
  }
  console.log(`ring radius ${R}: smallest badge-edge to strand-edge gap ${worst.toFixed(2)} units = ${(worst * 2.5).toFixed(1)} px at 290, ${(worst * 260 / 116).toFixed(1)} px at 260 (${where})`)
}
const bez = (x1, y1, x2, y2) => (t) => {
  const X = (s) => 3*(1-s)*(1-s)*s*x1 + 3*(1-s)*s*s*x2 + s*s*s, Y = (s) => 3*(1-s)*(1-s)*s*y1 + 3*(1-s)*s*s*y2 + s*s*s
  let lo = 0, hi = 1; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (X(m) < t) lo = m; else hi = m } return Y((lo + hi) / 2)
}
const easings = { linear: (t) => t, ease: bez(0.25, 0.1, 0.25, 1), 'ease-in-out': bez(0.42, 0, 0.58, 1), 'in-out-cubic': bez(0.65, 0, 0.35, 1) }
for (const [k, f] of Object.entries(easings)) {
  let c = 0; const N = 10000
  for (let i = 0; i < N; i++) { const a = 180 * f((i + 0.5) / N); if (a > 63 && a < 117) c++ }
  console.log(`${k}: ${(100 * c / N).toFixed(1)} % of the flip between 63 and 117 degrees = ${(300 * c / N).toFixed(0)} ms of 300`)
}
