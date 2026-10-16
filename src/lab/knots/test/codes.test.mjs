// Representations (Gauss, DT, braids), random knots, 3-D curves, projection and identification.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as K from '../index.mjs'
// The monster unknot comes from the lab bench data, not the table, so these tests pass on the derived table too (W-407).
import { MONSTER } from './benchdata.mjs'

const norm = (p) => JSON.stringify(Object.entries(p).map(([e, c]) => [+e, c]).sort((a, b) => a[0] - b[0]))
const sameUpToMirror = (a, b) => [norm(K.jones(b)), norm(K.pinv(K.jones(b)))].includes(norm(K.jones(a)))

test('PD codes are validated: bad labels, non-planar codes and inconsistent orientations throw', () => {
  assert.throws(() => K.load([[1, 2, 3, 4]]))
  assert.throws(() => K.load([[1, 2, 3, 3]]), /twice|orientation|planar/)
  assert.throws(() => K.fromGauss([[1, 2, -1, -2]], [1, 1]), /planar/, 'the virtual trefoil')
  assert.throws(() => K.fromGauss([[1, 2, -1, -2]]), /planar/)
  assert.deepEqual(K.toPD(K.load(K.KNOTS['5_2'].pd)), K.toPD(K.load(K.toPD(K.load(K.KNOTS['5_2'].pd)))))
})

test('signed Gauss codes round-trip; unsigned Gauss and DT codes recover the knot up to mirror image', () => {
  for (const [n, k] of Object.entries(K.KNOTS)) {
    const g = K.toGauss(k.pd)
    assert.deepEqual(K.fromGauss(g.code, g.signs), K.toPD(K.load(k.pd)), n)
    if (K.components(k.pd) == 1 && K.crossingCount(k.pd) && !['granny', 'square'].includes(n)) {
      assert.ok(sameUpToMirror(K.fromGauss(g.code), k.pd), `${n} unsigned Gauss`)
      assert.ok(sameUpToMirror(K.fromDT(K.toDT(k.pd)), k.pd), `${n} DT`)
    }
  }
  assert.deepEqual(K.toDT(K.KNOTS['3_1'].pd), [4, 6, 2])
  assert.deepEqual(K.toDT(K.KNOTS['4_1'].pd), [4, 6, 8, 2])
})

test('braid closures: σ1³ is the right trefoil, (σ1 σ2⁻¹)² the figure-eight, σ1² the positive Hopf link', () => {
  assert.equal(K.pstr(K.jones(K.fromBraid([1, 1, 1]))), 't + t^3 - t^4')
  assert.equal(norm(K.jones(K.fromBraid([1, -2, 1, -2]))), norm(K.jones(K.KNOTS['4_1'].pd)))
  assert.equal(K.pstr(K.jones(K.fromBraid([1, 1]))), '-t^(1/2) - t^(5/2)')
  assert.equal(K.components(K.fromBraid([1, 1], 3)), 3, 'an unused strand is a separate loop')
})

test('random knots are seeded, one component, and the same for the same seed', () => {
  for (let s = 1; s <= 10; s++) {
    const a = K.randomKnot(s, { strands: 4, length: 12 }), b = K.randomKnot(s, { strands: 4, length: 12 })
    assert.deepEqual(a, b)
    assert.equal(K.components(a.pd), 1)
    assert.equal(K.crossingCount(a.pd), 13, 'a 4-strand knot needs an odd braid length')
  }
  assert.notDeepEqual(K.randomKnot(1).braid, K.randomKnot(2).braid)
})

test('3-D curves: a parametric trefoil projects to a trefoil; random walks close and project to valid diagrams', () => {
  const tre = Array.from({ length: 90 }, (_, i) => { const t = (2 * Math.PI * i) / 90; return [Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t), -Math.sin(3 * t)] })
  const pd = K.project(tre)
  assert.equal(K.crossingCount(pd), 3)
  assert.deepEqual(K.identify(pd).map((x) => x.name), ['3_1'])
  for (let s = 1; s <= 5; s++) {
    const w = K.randomWalk(s, 30, 4)
    assert.deepEqual(w, K.randomWalk(s, 30, 4))
    assert.ok(w.every((p) => Math.hypot(...p) <= 4))
    for (const m of ['direct', 'radial']) { const q = K.project(K.closeCurve(w, m)); assert.equal(K.components(q), 1) }
  }
})

test('identify: scrambled table knots are found, mirrors flagged, unknown knots return []', () => {
  for (const n of ['3_1', '4_1', '5_2', '6_1', '7_7']) {
    const q = K.scramble(K.KNOTS[n].pd, 11, 10)
    assert.deepEqual(K.identify(q), [{ name: n, mirror: false }])
    assert.deepEqual(K.identify(K.mirror(q)).map((x) => x.name), [n])
  }
  assert.deepEqual(K.identify(K.mirror(K.KNOTS['3_1'].pd)), [{ name: '3_1', mirror: true }])
  assert.deepEqual(K.identify(MONSTER), [{ name: '0_1', mirror: false }])
  assert.deepEqual(K.identify(K.fromBraid([1, 1, 1, 1, 1, 1, 1, 1, 1])), [], '9_1 is not in the table')
})
