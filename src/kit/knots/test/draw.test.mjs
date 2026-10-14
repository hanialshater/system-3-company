// Drawing: one path per edge, inside the view box, the picture shows the right knot (not its mirror),
// and no two strands cross except at the diagram's crossings.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as K from '../index.mjs'

const nums = (d) => d.match(/-?[\d.]+/g).map(Number)
const bez = (d) => { const v = nums(d), p = [[v[0], v[1]]]; for (let i = 2; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p }
const sample = (d) => { const p = bez(d), out = []; for (let s = 0; s + 3 < p.length; s += 3) for (let i = 0; i <= 8; i++) { const t = i / 8, u = 1 - t; out.push([0, 1].map((k) => u * u * u * p[s][k] + 3 * u * u * t * p[s + 1][k] + 3 * u * t * t * p[s + 2][k] + t * t * t * p[s + 3][k])) } return out }
const hit = (a, b, c, d) => { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0 }

function check(pd, name) {
  const D = K.draw(pd), n = K.crossingCount(pd)
  assert.equal(D.edges.length, 2 * n, name)
  for (const e of D.edges) for (const v of nums(e.d)) assert.ok(v >= -1 && v <= D.size + 1, `${name}: ${v} outside`)
  // Geometric sign at each crossing (SVG y points down) must equal the combinatorial sign.
  const S = K.signs(pd)
  for (const c of D.crossings) {
    const out = D.edges.filter((e) => e.from == c.i), dir = (e) => { const p = bez(e.d); return [p[1][0] - p[0][0], p[1][1] - p[0][1]] }
    if (out.length != 2 || out.some((e) => e.to == c.i && e.from == c.i)) continue
    const [a, b] = out.map(dir), [ea] = out, over = K.toGauss(pd) && overOut(pd, c.i, ea.label)
    const [o, u] = over ? [a, b] : [b, a]
    assert.equal(-Math.sign(o[0] * u[1] - o[1] * u[0]), S[c.i], `${name}: crossing ${c.i} drawn mirrored`)
  }
  // No extra crossings between strands away from the diagram's crossings.
  const P = D.edges.map((e) => sample(e.d)), far = (p) => D.crossings.every((c) => Math.hypot(p[0] - c.x, p[1] - c.y) > 3)
  let extra = 0
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) for (let a = 0; a + 1 < P[i].length; a++) for (let b = 0; b + 1 < P[j].length; b++) if (far(P[i][a]) && far(P[j][b]) && hit(P[i][a], P[i][a + 1], P[j][b], P[j][b + 1])) extra++
  return extra
}
// Is the edge with this label the over-strand where it leaves crossing c? (From the PD code: slots 1 and 3 are over.)
const overOut = (pd, c, label) => pd[c][1] == label || pd[c][3] == label

test('table knots draw cleanly: right handedness, no extra strand crossings', () => {
  for (const [n, k] of Object.entries(K.KNOTS)) assert.equal(check(k.pd, n), 0, `${n} has extra crossings`)
})

test('random diagrams draw with the right handedness', () => {
  for (let s = 1; s <= 10; s++) check(K.randomKnot(s, { strands: 3, length: 9 }).pd, `random ${s}`)
  for (let s = 1; s <= 5; s++) check(K.scramble(K.KNOTS['3_1'].pd, s, 6), `scrambled ${s}`)
})

test('a stored layout keeps the picture fixed across a crossing change', () => {
  const pd = K.KNOTS['5_2'].pd, L = K.layout(pd), a = K.draw(pd, { layout: L }), b = K.draw(K.crossingChange(pd, 2), { layout: L })
  assert.deepEqual(a.crossings.map((c) => [c.x, c.y]), b.crossings.map((c) => [c.x, c.y]))
  assert.notDeepEqual(a.edges.map((e) => e.d), b.edges.map((e) => e.d))
  assert.equal(JSON.parse(JSON.stringify(L)).crossings.length, 5, 'plain data')
})

// Textbook look (added 2026-10-14 for gen 2; company/rnd/evolution/knots-gen1.md, "Looks"). A table knot is the
// picture a learner compares with the book: round strands, no long straight runs, no sharp corners. Measured on
// the drawn curves away from crossings (6 % of size), as the share of curve length whose radius of curvature is
// above 2 x size (straight) or below 4 % of size (a corner). Gen 0's packing: at most 18 % / 0.3 %.
// Rectilinear (gen1-ortho, 65-80 %) and flattened bigons (gen1-tutte, up to 47 % / 6.8 %) fail it.
test('table knots look like the textbook: round strands, no long straight runs, no sharp corners', () => {
  const fine = (d) => { const p = bez(d), out = []; for (let s = 0; s + 3 < p.length; s += 3) for (let i = 0; i <= 16; i++) { const t = i / 16, u = 1 - t; out.push([0, 1].map((k) => u * u * u * p[s][k] + 3 * u * u * t * p[s + 1][k] + 3 * u * t * t * p[s + 2][k] + t * t * t * p[s + 3][k])) } return out }
  for (const [name, k] of Object.entries(K.KNOTS)) {
    if (!/^\d+_\d+$/.test(name) || name == '0_1') continue
    const D = K.draw(k.pd), S = D.size, near = (p) => D.crossings.some((c) => Math.hypot(p[0] - c.x, p[1] - c.y) < 0.06 * S)
    let L = 0, straight = 0, sharp = 0
    for (const e of D.edges) {
      const s = fine(e.d)
      for (let i = 1; i + 1 < s.length; i++) {
        const [a, b, c] = [s[i - 1], s[i], s[i + 1]], ab = Math.hypot(b[0] - a[0], b[1] - a[1]), bc = Math.hypot(c[0] - b[0], c[1] - b[1]), ac = Math.hypot(c[0] - a[0], c[1] - a[1])
        if (ab < 1e-6 || bc < 1e-6 || near(b)) continue
        const cr = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])), R = cr < 1e-9 ? Infinity : (ab * bc * ac) / (2 * cr), l = (ab + bc) / 2
        L += l; if (R > 2 * S) straight += l; if (R < 0.04 * S) sharp += l
      }
    }
    assert.ok(straight / L <= 0.3, `${name}: ${Math.round((100 * straight) / L)} % of the strands are straight runs (at most 30 %)`)
    assert.ok(sharp / L <= 0.03, `${name}: ${Math.round((100 * sharp) / L)} % of the strands are sharp corners (at most 3 %)`)
  }
})

// Strands, not just crossing positions (added 2026-10-14 at promotion, W-162; company/rnd/evolution/knots-gen2.md,
// "The crossing-change bug" and "Promotion re-score"). With the under-pass gap off, a drawing from a stored layout and
// the drawing of the same layout after any crossing change must be the same set of curves (Hausdorff distance <= 0.5
// in a 100-unit view box). L2a1 must be in the case set: a 2-edge component is the case that separates the ortho line.
test('a stored layout keeps every strand where it was across a crossing change', () => {
  assert.ok(K.KNOTS.L2a1?.pd?.length == 2, 'the case set must include the Hopf link L2a1')
  const pts = (D) => D.edges.flatMap((e) => sample(e.d))
  const far = (A, B) => Math.max(...A.map((a) => Math.min(...B.map((b) => Math.hypot(a[0] - b[0], a[1] - b[1])))))
  const cases = [...Object.values(K.KNOTS).map((k) => k.pd), ...[1, 2, 3].map((s) => K.randomKnot(s).pd)].filter((pd) => pd.length)
  for (const pd of cases) {
    const L = K.layout(pd), A = pts(K.draw(pd, { layout: L, gap: 0 }))
    for (let c = 0; c < pd.length; c++) { const B = pts(K.draw(K.crossingChange(pd, c), { layout: L, gap: 0 })); assert.ok(Math.max(far(A, B), far(B, A)) <= 0.5, `${JSON.stringify(pd)} @ ${c}`) }
  }
})
