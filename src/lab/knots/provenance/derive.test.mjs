// W-145: the derived table (provenance/table.derived.mjs) is generated from typed-in factual notation and
// matches the current table entry by entry. Run: node --test src/lab/knots/provenance/*.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { KNOTS } from '../table.mjs'
import * as D from '../provenance/table.derived.mjs'
import { alexander, jones } from '../invariants.mjs'
import { pstr } from '../poly.mjs'
import { mirror, turnOver, reverse, crossingCount, writhe } from '../index.mjs'
import { SOURCES } from './sources.mjs'
import { derive, derivedTable, encode, decode, iso, fileText, describe, platGauss, conwayBraid } from './derive.mjs'

test('table.derived.mjs is exactly what derive.mjs generates from sources.mjs', () => {
  assert.equal(readFileSync(new URL('./table.derived.mjs', import.meta.url), 'utf8'), fileText(derivedTable()))
  for (const s of derivedTable()) assert.deepEqual(decode(encode(s.pd)), s.pd, s.name)
})

test('every source uses factual notation only, with a citation', () => {
  for (const s of SOURCES) {
    assert.ok(s.cite, s.name)
    assert.equal(['pd', 'dt', 'conway', 'braid'].filter((k) => k in s).length, 1, s.name)
    if (s.pd) assert.deepEqual(s.pd, [], 'only the unknot is given as a PD code')
  }
})

test('the derived table has every entry of table.mjs except U10, with the same metadata', () => {
  const names = (T) => Object.keys(T).sort()
  assert.deepEqual(names(D.KNOTS), names(KNOTS).filter((n) => n != 'U10'))
  for (const [n, k] of Object.entries(D.KNOTS)) {
    const { pd: _a, ...meta } = k, { pd: _b, ...cur } = KNOTS[n]
    assert.deepEqual(meta, cur, n)
  }
  assert.equal(D.knot('monster-unknot'), undefined)
})

test('each derived entry: same crossing number, writhe, Alexander and Jones as the current entry', () => {
  for (const [n, k] of Object.entries(D.KNOTS)) {
    const cur = KNOTS[n].pd
    assert.equal(crossingCount(k.pd), crossingCount(cur), n)
    assert.equal(writhe(k.pd), writhe(cur), n)
    assert.equal(pstr(alexander(k.pd)), pstr(alexander(cur)), `${n} Alexander`)
    assert.equal(pstr(jones(k.pd)), pstr(jones(cur)), `${n} Jones`)
  }
})

test('each derived entry is the same oriented diagram as the current one, up to relabelling', () => {
  for (const [n, k] of Object.entries(D.KNOTS)) {
    const r = iso(KNOTS[n].pd, k.pd)
    assert.ok(r, `${n}: no isomorphism`)
    assert.deepEqual([r.plane, r.crossings, r.reversed], [1, 1, []], n)
  }
})

test('iso tells mirror images, turned-over and reversed diagrams apart', () => {
  const t = KNOTS['3_1'].pd, w = KNOTS.L5a1.pd
  assert.deepEqual([iso(t, mirror(t)).plane, iso(t, mirror(t)).crossings], [1, -1], 'the mirror image is flagged, not "same"')
  assert.match(describe(iso(t, mirror(t))), /mirror/)
  for (const [n, k] of Object.entries(KNOTS)) { const r = iso(k.pd, turnOver(k.pd)); assert.equal(r.plane * r.crossings, 1, `${n}: turning over is not mirroring`) }
  assert.deepEqual(iso(w, reverse(w, 0)).reversed, [0])
  assert.equal(iso(KNOTS['5_2'].pd, KNOTS['5_1'].pd), null)
})

test('derivations: DT, braid and 4-plat routes give the expected small examples', () => {
  assert.equal(pstr(jones(derive({ dt: [4, 6, 2], w: 3 }))), 't + t^3 - t^4', 'right trefoil from DT 4 6 2')
  assert.equal(pstr(jones(derive({ braid: [1, 1] }))), '-t^(1/2) - t^(5/2)', 'positive Hopf link')
  assert.deepEqual(conwayBraid([3, 2, 2]), [2, 2, 2, -1, -1, 2, 2])
  assert.equal(platGauss(conwayBraid([3])).length, 6, 'the 4-plat of Conway 3 is a 3-crossing knot')
  assert.ok(iso(derive({ conway: [3], w: -3 }), KNOTS['3_1'].pd), 'Conway 3 is the table trefoil diagram')
  assert.throws(() => conwayBraid([2, 2]), /odd/)
})
