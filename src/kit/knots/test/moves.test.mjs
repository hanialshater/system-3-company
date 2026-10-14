// Reidemeister moves: detection, application, and invariance of every invariant under seeded random moves.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as K from '../index.mjs'

const norm = (p) => JSON.stringify(Object.entries(p).map(([e, c]) => [+e, c]).sort((a, b) => a[0] - b[0]))
const lk = (pd) => JSON.stringify(K.linkingMatrix(pd).flatMap((r, i) => r.filter((_, j) => j > i)).sort())
const fingerprint = (pd) => [K.components(pd), norm(K.jones(pd)), norm(K.alexander(pd)), K.determinant(pd), K.colourings(pd, 3), K.colourings(pd, 5), lk(pd)].join('|')

const names = Object.keys(K.KNOTS)
for (const n of names) {
  test(`${n}: invariants survive 12 random Reidemeister moves (3 seeds)`, () => {
    const pd = K.KNOTS[n].pd, f = fingerprint(pd)
    for (const seed of [1, 2, 3]) {
      const q = K.scramble(pd, seed * 7919 + n.length, 12)
      assert.equal(fingerprint(q), f, `seed ${seed}`)
      if (K.components(pd) == 1 && K.crossingCount(pd) && n != 'U10') assert.equal(K.signature(q), K.signature(pd))
    }
  })
}

test('writhe: R1 changes it by ±1, R2 and R3 keep it', () => {
  const rng = K.mulberry32(5)
  let pd = K.KNOTS['6_2'].pd
  for (let i = 0; i < 40; i++) {
    const w = K.writhe(pd), ms = K.moves(pd), r3 = ms.filter((m) => m.type == 'R3')
    if (r3.length && rng() < 0.4) { pd = K.apply(pd, r3[0]); assert.equal(K.writhe(pd), w); continue }
    const f = K.regions(pd).find((f) => new Set(f).size > 1), [a, b] = [f[0], f.find((e) => e != f[0])]
    if (rng() < 0.5) { pd = K.addBigon(pd, a, b, rng() < 0.5); assert.equal(K.writhe(pd), w) }
    else { pd = K.addKink(pd, a, (rng() * 2) | 0, (rng() * 2) | 0); assert.equal(Math.abs(K.writhe(pd) - w), 1) }
  }
})

test('move detection: reduced alternating diagrams offer no moves; a kink offers R1; a bigon offers R2', () => {
  for (const n of ['3_1', '4_1', '5_1', '7_4']) assert.deepEqual(K.moves(K.KNOTS[n].pd), [])
  const k = K.addKink([], 1, 0, 0)
  assert.equal(K.crossingCount(k), 1)
  assert.deepEqual(K.moves(k).map((m) => m.type), ['R1', 'R1'], 'a one-crossing curve has two kinks')
  assert.deepEqual(K.apply(k, K.moves(k)[0]), [])
  const t = K.KNOTS['3_1'].pd, [e1, e2] = K.regions(t).find((f) => f.length == 3), b = K.addBigon(t, e1, e2)
  assert.equal(K.crossingCount(b), 5)
  const r2 = K.moves(b).filter((m) => m.type == 'R2')
  assert.ok(r2.length >= 1)
  assert.equal(K.crossingCount(K.apply(b, r2[0])), 3)
  assert.equal(r2[0].crossings.length, 2)
})

test('R3 is reversible and keeps the crossing count', () => {
  let found = 0
  for (let s = 1; s < 30 && found < 5; s++) {
    const pd = K.scramble(K.KNOTS['4_1'].pd, s, 6)
    for (const m of K.moves(pd).filter((m) => m.type == 'R3')) {
      const q = K.apply(pd, m)
      assert.equal(K.crossingCount(q), K.crossingCount(pd))
      assert.ok(K.moves(q).some((x) => x.type == 'R3'))
      found++
    }
  }
  assert.ok(found >= 5)
})

test('crossing change: one switch unknots the trefoil; it flips that sign and moves the writhe by 2', () => {
  const t = K.KNOTS['3_1'].pd
  const u = K.crossingChange(t, 0)
  assert.equal(K.signs(u)[0], -K.signs(t)[0])
  assert.equal(K.writhe(u), K.writhe(t) + 2)
  assert.equal(K.simplify(u).status, 'unknot')
  assert.equal(norm(K.jones(u)), norm({ 0: 1 }))
})

test('simplify: honest statuses, never "knotted" from being stuck', () => {
  assert.equal(K.simplify(K.KNOTS['3_1'].pd).status, 'minimal')
  assert.equal(K.simplify(K.scramble([], 4, 15)).status, 'unknot')
  assert.equal(K.simplify(K.deleteComponent(K.knot('borromean').pd, 0)).status, 'unlink')
  for (let s = 1; s <= 5; s++) {
    const r = K.simplify(K.scramble(K.KNOTS['5_2'].pd, s, 15))
    assert.ok(['minimal', 'unknown'].includes(r.status))
    assert.ok(r.crossings >= 5)
  }
  assert.ok(['unknot', 'unknown'].includes(K.simplify(K.scramble([], 9, 30, 0.8)).status))
})

test('operations: delete a component, turn over, reverse', () => {
  const B = K.knot('borromean').pd
  for (let c = 0; c < 3; c++) { const r = K.deleteComponent(B, c); assert.equal(K.components(r), 2); assert.equal(K.linkingNumber(r), 0); assert.equal(K.determinant(r), 0) }
  assert.deepEqual(K.deleteComponent(K.knot('hopf').pd, 1), [])
  const W = K.knot('whitehead').pd
  assert.equal(K.components(K.deleteComponent(W, 0)), 1)
  const t = K.KNOTS['7_6'].pd
  assert.equal(norm(K.jones(K.reverse(t))), norm(K.jones(t)))
  assert.equal(K.linkingNumber(K.reverse(K.fromBraid([1, 1]), 0)), -1)
  assert.equal(K.writhe(K.turnOver(t)), K.writhe(t))
  assert.notDeepEqual(K.turnOver(t), K.mirror(t))
})
