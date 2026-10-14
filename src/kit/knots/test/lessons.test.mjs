// The size entries in evolve.json ("sizeEntries") must be real, working lesson programs, so a candidate
// cannot shrink its measured cost by breaking or emptying the modules a lesson imports.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as table from './lessons/draw-a-table-knot.mjs'
import * as tri from './lessons/tricolour-check.mjs'
import * as game from './lessons/unknot-game.mjs'
import * as rnd from './lessons/random-knot.mjs'

const drawn = (pic, n) => { assert.equal(pic.edges.length, 2 * n); assert.ok(pic.edges.every((e) => /^M[\d.\s-]+C/.test(e.d))) }

test('size entry: draw a table knot', () => drawn(table.run(), 5))
test('size entry: tricolour check', () => { const r = tri.run(); drawn(r.pic, 3); assert.equal(r.arcs, 3); assert.equal(r.n, 3); assert.ok(r.ok.every(Boolean)) })
test('size entry: unknot game', () => { const r = game.run(); drawn(r.pic, 3); assert.equal(r.status, 'unknot') })
test('size entry: random knot', () => { for (const s of [3, 4, 5]) { const r = rnd.run(s); assert.ok(r.pic.edges.length > 0); assert.ok(['unknot', 'minimal', 'unknown'].includes(r.status)); assert.ok(Array.isArray(r.names)) } })
