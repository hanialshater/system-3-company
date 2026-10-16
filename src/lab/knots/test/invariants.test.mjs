// Invariants of every table entry against reference values (test/published.mjs) and against
// identities that hold for every knot. Imports only from ../index.mjs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as K from '../index.mjs'
import { REF, SIGNATURE_ABS, TRICOLOURABLE } from './published.mjs'
// U10 (the monster unknot) comes from the lab bench data, not the table, so these tests pass on the derived table too (W-407).
import { MONSTER } from './benchdata.mjs'

const norm = (p) => JSON.stringify(Object.entries(p).map(([e, c]) => [+e, c]).filter(([, c]) => c).sort((a, b) => a[0] - b[0]))
const pdOf = (n) => (n == 'U10' ? MONSTER : n == 'rtrefoil' ? K.mirror(K.KNOTS['3_1'].pd) : n == 'hopfplus' ? K.fromBraid([1, 1]) : K.KNOTS[n].pd)
// V at t^(1/2) = i, as a Gaussian integer: |V(-1)| is the determinant.
const vAtMinus1 = (p) => { let re = 0, im = 0; for (const [e, c] of Object.entries(p)) { const k = (((2 * +e) % 4) + 4) % 4; if (k == 0) re += c; else if (k == 1) im += c; else if (k == 2) re -= c; else im -= c } return Math.hypot(re, im) }

for (const [name, r] of Object.entries(REF)) {
  test(`${name}: Jones, Alexander, components, writhe match the reference`, () => {
    const pd = pdOf(name)
    assert.equal(K.components(pd), r.components)
    assert.equal(K.writhe(pd), r.writhe)
    assert.equal(norm(K.jones(pd)), norm(r.jones))
    if (r.alexander) assert.equal(norm(K.alexander(pd)), norm(r.alexander))
  })
  test(`${name}: determinant = |V(-1)| (and |Δ(-1)| for knots); colourings agree with it`, () => {
    const pd = pdOf(name), det = K.determinant(pd)
    assert.equal(det, vAtMinus1(r.jones))
    if (r.alexander) assert.equal(det, Math.abs(Object.entries(r.alexander).reduce((s, [e, c]) => s + c * (-1) ** Math.abs(+e), 0)))
    for (const p of [3, 5, 7]) {
      const n = K.colourings(pd, p)
      assert.ok(n % p == 0 && n >= p)
      if (r.components == 1) assert.equal(n > p, det % p == 0, `${p}-colourable iff ${p} | det`)
    }
  })
}

test('tricolourability: 3_1 yes, 4_1 no, and the full table list', () => {
  for (const [n, k] of Object.entries(K.KNOTS)) if (K.components(k.pd) == 1) assert.equal(K.tricolourable(k.pd), TRICOLOURABLE.includes(n), n)
  assert.equal(K.colourings(K.KNOTS['3_1'].pd, 3), 9)
  assert.equal(K.colourings(K.KNOTS['4_1'].pd, 3), 3)
  assert.equal(K.colourings([], 3), 3)
})

test('a colouring checker for lessons: the trefoil with three colours passes, one colour per arc', () => {
  const pd = K.KNOTS['3_1'].pd, a = K.arcs(pd)
  assert.equal(a.count, 3)
  assert.deepEqual(K.colouringOk(pd, [0, 1, 2]), [true, true, true])
  assert.deepEqual(K.colouringOk(pd, [0, 0, 1]).filter((x) => x).length, 0)
  assert.equal(a.edges.flat().length, 6)
})

test('linking numbers: Hopf ±1, Whitehead 0, Borromean all 0', () => {
  assert.equal(Math.abs(K.linkingNumber(K.knot('hopf').pd)), 1)
  assert.equal(K.linkingNumber(K.fromBraid([1, 1])), 1)
  assert.equal(K.linkingNumber(K.mirror(K.fromBraid([1, 1]))), -1)
  assert.equal(K.linkingNumber(K.knot('whitehead').pd), 0)
  assert.deepEqual(K.linkingMatrix(K.knot('borromean').pd).flat(), Array(9).fill(0))
})

test('signature: |σ| matches the table, σ(right trefoil) = -2, Traczyk formula, Murasugi mod 4', () => {
  for (const [n, s] of Object.entries(SIGNATURE_ABS)) assert.equal(Math.abs(K.signature(K.KNOTS[n].pd)), s, n)
  assert.equal(K.signature(K.mirror(K.KNOTS['3_1'].pd)), -2)
  for (const [n, k] of Object.entries(K.KNOTS)) {
    if (K.components(k.pd) != 1 || !K.crossingCount(k.pd)) continue
    const s = K.signature(k.pd), det = K.determinant(k.pd)
    assert.equal(s % 4 == 0, det % 4 == 1, `${n}: σ ≡ 0 mod 4 iff det ≡ 1 mod 4`)
    assert.equal(K.signature(K.mirror(k.pd)), 0 - s)
    if (K.isAlternating(k.pd) && !K.nugatory(k.pd).length) {
      // Traczyk: σ = s_A - n_+ - 1 for reduced alternating diagrams; s_A from the top A-degree of the bracket.
      const b = K.bracket(k.pd), top = Math.max(...Object.keys(b).map(Number)), nA = K.crossingCount(k.pd), sA = (top - nA) / 2 + 1
      const nPlus = K.signs(k.pd).filter((x) => x > 0).length
      assert.equal(s, sA - nPlus - 1, n)
    }
  }
})

test('mirror inverts t in V; turning over changes nothing; connected sum multiplies', () => {
  for (const n of ['3_1', '5_2', '7_7', 'L5a1']) {
    const pd = K.KNOTS[n].pd
    assert.equal(norm(K.jones(K.mirror(pd))), norm(K.pinv(K.jones(pd))))
    assert.equal(norm(K.jones(K.turnOver(pd))), norm(K.jones(pd)))
    assert.equal(K.writhe(K.turnOver(pd)), K.writhe(pd))
  }
  const t = K.KNOTS['3_1'].pd, f = K.KNOTS['4_1'].pd
  assert.equal(norm(K.jones(K.connectedSum(t, f))), norm(K.pmul(K.jones(t), K.jones(f))))
  assert.equal(norm(K.alexander(K.connectedSum(t, f))), norm(K.pmul(K.alexander(t), K.alexander(f))))
  assert.equal(norm(K.jones(K.knot('square').pd)), norm(K.pinv(K.jones(K.knot('square').pd))), 'square knot is amphichiral')
  assert.notEqual(norm(K.jones(K.knot('granny').pd)), norm(K.pinv(K.jones(K.knot('granny').pd))), 'granny is chiral')
})

test('chirality fingerprints: trefoil V(t) != V(1/t), figure-eight and 6_3 equal', () => {
  for (const [n, k] of Object.entries(K.KNOTS)) if (K.components(k.pd) == 1 && n != 'U10') assert.equal(norm(K.jones(k.pd)) == norm(K.pinv(K.jones(k.pd))), !!k.a, n)
})

test('Jones identities: V(1) = 1 for knots, span = crossing number for the alternating table knots', () => {
  for (const [n, k] of Object.entries(K.KNOTS)) {
    if (K.components(k.pd) != 1) continue
    const v = K.jones(k.pd), e = Object.keys(v).map(Number)
    assert.equal(Object.values(v).reduce((a, b) => a + b, 0), 1, n)
    if (K.isAlternating(k.pd) && !K.nugatory(k.pd).length) assert.equal(Math.max(...e) - Math.min(...e), k.c, n)
  }
})

test('polynomial helpers: format and parse round trip', () => {
  for (const s of ['t + t^3 - t^4', '-t^(1/2) - t^(5/2)', 't^-2 - t^-1 + 1 - t + t^2', '0', '2t^-1 - 3 + 2t']) assert.equal(K.pstr(K.pparse(s)), s)
  assert.equal(K.pstr(K.jones(K.mirror(K.KNOTS['3_1'].pd))), 't + t^3 - t^4')
})
