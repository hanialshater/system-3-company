// The bench's own generators (test/benchgen.mjs) must agree with the library's conventions, or the bench
// would score candidates on wrong inputs. Checked against the library's tested functions.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as K from '../index.mjs'
import * as G from './benchgen.mjs'
import { HARD, DECOY, MONSTER, GORDIAN, KNOTS } from './benchdata.mjs'

const same = (p, q) => K.pstr(p) == K.pstr(q)

test('bench generators: braid closures and projections are valid knots with the library sign convention', () => {
  const r = G.rng(11)
  for (let k = 0; k < 12; k++) {
    for (const pd of [G.randomBraid(r, 3 + (k % 3), 8 + k), G.projectPD(G.randomPolygon(r, 16 + k, 2.5))]) {
      if (!pd?.length) continue
      assert.equal(K.components(pd), 1)
      assert.deepEqual(K.signs(pd), pd.map((x) => G.knotSign(pd, x)))
    }
  }
  assert.ok(same(K.jones(G.braidPD([1, 1, 1], 2)), K.jones(K.fromBraid([1, 1, 1], 2))), 'right trefoil')
  assert.equal(G.braidPD([1, 1], 2), null, 'a two-component closure is refused')
})

test('bench generators: projection gives the same knot as the library projection', () => {
  const r = G.rng(12)
  for (let k = 0; k < 8; k++) { const P = G.randomPolygon(r, 14, 2), pd = G.projectPD(P); if (pd.length && pd.length <= 12) assert.ok(same(K.jones(pd), K.jones(K.project(P)))) }
})

test('bench generators: disguise, mirror, reverse and connected sum keep (or mirror) the knot', () => {
  const r = G.rng(13), T = KNOTS['3_1'], F = KNOTS['4_1'], jT = K.jones(T)
  assert.ok(same(K.jones(G.mirror(T)), K.pinv(jT)))
  assert.ok(same(K.jones(G.reverse(T)), jT))
  for (let k = 0; k < 6; k++) { const d = G.disguise(T, r), j = K.jones(d); assert.ok(same(j, jT) || same(j, K.pinv(jT))) }
  const s = G.connectedSum(T, F, 2, 5)
  assert.equal(K.components(s), 1)
  assert.ok(same(K.jones(s), K.pmul(jT, K.jones(F))))
  assert.ok(same(G.jonesRef(s), K.jones(s)), 'reference state sum')
})

test('bench data: hard unknots admit no move, keep the label convention, and are unknots by their invariants', () => {
  for (const pd of [...HARD, DECOY]) { assert.equal(K.moves(pd).length, 0); assert.equal(K.pstr(K.alexander(pd)), '1') }
  for (const pd of [...HARD, DECOY, MONSTER, GORDIAN]) assert.deepEqual(K.signs(pd), pd.map((x) => G.knotSign(pd, x)))
  for (const pd of HARD.filter((p) => p.length <= 13)) assert.equal(K.pstr(K.jones(pd)), '1')
})

// W-407: the U10 tests (codes, invariants x2, moves) read MONSTER from here, not table entry U10, so they also pass
// when the lab table is the derived one (no U10). While the lab table still has U10, it must be this same diagram.
test('bench data: MONSTER is the table entry U10 while the lab table still carries it', () => {
  const u = K.knot('monster-unknot')
  if (u) assert.deepEqual(u.pd, MONSTER)
  assert.equal(K.crossingCount(MONSTER), 10)
})
