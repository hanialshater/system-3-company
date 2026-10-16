// Probe for W-1567 (record: 2026-10-16-knots-left-or-right-card.md). Review evidence, not a lesson or a test.
// Question: is the left-right reflection of draw(mirror(pd), { layout: L }) the picture of turnOver(pd)?
// Run from the repo root: node company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs
// Columns, per one-component KNOTS entry, L = layout(pd) (default relax), draw at default size/margin:
//   calib        the path-geometry sign formula agrees with draw()'s own crossing signs on the unreflected mirror
//   turnOver     signs(turnOver(pd)), the readout the lesson would show
//   reflMirror   signs read from the GEOMETRY of the reflected mirror drawing vs turnOver
//   unreflMirror signs of the mirror drawing seen unreflected (what a pre-rotated back face shows at rest)
//   naiveFlip    signs of the FRONT drawing reflected (a one-sided flip) vs signs(mirror(pd))
//   curves       max coordinate gap (of 100) between the reflected mirror drawing and
//                draw(turnOver(pd), { layout: L reflected }); c = the reflection line x = c/2
const root = new URL('../../../', import.meta.url)
const K = await import(new URL('src/kit/knots/index.mjs', root))
const core = await import(new URL('src/kit/knots/core.mjs', root))
const { KNOTS, layout, draw, mirror, turnOver, signs } = K
const pts = (d) => { const a = d.match(/-?[\d.]+/g).map(Number); return [[a[0], a[1]], [a[2], a[3]], [a[4], a[5]], [a[6], a[7]]] }
// Sign from the drawn paths: at crossing i the incoming over edge ends at the centre, the incoming under edge is cut.
function geoSigns(D, reflect) {
  const X = (p) => (reflect ? [D.size - p[0], p[1]] : p)
  return D.crossings.map(({ i, x, y }) => {
    const C = X([x, y]), inc = D.edges.filter((e) => e.to == i).map((e) => pts(e.d).map(X))
    inc.sort((a, b) => Math.hypot(a[3][0] - C[0], a[3][1] - C[1]) - Math.hypot(b[3][0] - C[0], b[3][1] - C[1]))
    const [over, under] = inc, dir = (b) => [b[3][0] - b[2][0], b[3][1] - b[2][1]], o = dir(over), u = dir(under)
    return Math.sign(u[0] * o[1] - u[1] * o[0])
  })
}
// draw.mjs `at`: handle index of dart d, counted from the crossing's first incoming slot.
const at = (M, d) => (d & ~3) + ((d - [0, 1, 2, 3].find((i) => M.h[(d & ~3) + i] && M.h[(d & ~3) + ((i + 1) & 3)])) & 3)
// L reflected, re-indexed for turnOver(pd): core.mjs turnOver maps dart d to p(d) (slots 1 and 3 swap) and flips u;
// toPD then writes each crossing from its incoming under slot s, so new PD slot i = turnOver-model slot (s + i) & 3.
function turnLayout(pd, L) {
  const M = core.load(pd), N = core.load(turnOver(pd)), p = (d) => (d & ~3) | (-d & 3), h = [], points = []
  for (const d of core.darts(M)) h[p(d)] = M.h[d]
  for (let c = 0; c < M.n; c++) {
    const a = M.u[c] ^ 1, s = h[4 * c + a] ? a : a + 2
    for (let i = 0; i < 4; i++) { const q = L.points[at(M, p(4 * c + ((s + i) & 3)))]; points[at(N, 4 * c + i)] = [-q[0], q[1]] }
  }
  return { crossings: L.crossings.map(([x, y]) => [-x, y]), points, loops: L.loops }
}
const rows = []
for (const [name, e] of Object.entries(KNOTS)) {
  if (core.components(e.pd) != 1 || !e.pd.length) continue
  const pd = e.pd, L = layout(pd), A = draw(mirror(pd), { layout: L }), front = draw(pd, { layout: L })
  const want = signs(turnOver(pd)).join('')
  const g0 = geoSigns(A, false), calib = g0.map((s, i) => s * A.crossings[i].sign), k = calib[0]
  const B = draw(turnOver(pd), { layout: turnLayout(pd, L) })
  const c = A.crossings[0].x + B.crossings[0].x
  const ra = A.edges.map((e) => pts(e.d).map(([x, y]) => [Math.min(A.size, Math.max(0, c - x)), y])), rb = B.edges.map((e) => pts(e.d))
  const dd = (a, b) => Math.max(...a.map((q, i) => Math.max(Math.abs(q[0] - b[i][0]), Math.abs(q[1] - b[i][1]))))
  let worst = 0
  for (const a of ra) worst = Math.max(worst, Math.min(...rb.map((b) => Math.min(dd(a, b), dd([...a].reverse(), b)))))
  rows.push({
    name,
    calib: calib.every((x) => x == k) ? 'ok' : 'BAD',
    turnOver: want,
    reflMirror: geoSigns(A, true).map((s) => s * k).join('') == want ? 'equal' : 'DIFF',
    unreflMirror: g0.map((s) => s * k).join('') == want ? 'equal' : 'differs',
    naiveFlip: geoSigns(front, true).map((s) => s * k).join('') == signs(mirror(pd)).join('') ? '= mirror' : 'other',
    curves: (ra.length == rb.length ? '' : 'COUNT ') + `c=${c.toFixed(1)} max ${worst.toFixed(2)}`,
  })
}
console.table(rows)
