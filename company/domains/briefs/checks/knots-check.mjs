// Answer checks for the knot briefs (cm-math-discrete, W-146 / W-419). Run: node company/domains/briefs/checks/knots-check.mjs
// Uses only src/kit/knots (the shipped library). Labels K1..K9 are cited by the briefs in math.discrete.md.
import * as K from '../../../../src/kit/knots/index.mjs'

const name = (q) => K.identify(q).map((x) => x.name + (x.mirror ? '*' : '')).join('|') || '(not in table)'
const say = (...a) => console.log(...a)

// K1 table facts for the knots the briefs draw
for (const n of ['3_1', '4_1', '5_2', '6_1']) {
  const k = K.knot(n), pd = k.pd
  say('K1', n, 'c=' + k.c, 'u=' + k.u, 'amphichiral=' + k.a, 'drawn crossings=' + K.crossingCount(pd), 'arcs=' + K.arcs(pd).count,
    'colourings(3)=' + K.colourings(pd, 3), 'det=' + K.determinant(pd), 'writhe=' + K.writhe(pd), 'simplify=' + K.simplify(pd).status)
}

// K2 tricolour: every colour-per-arc assignment of 3_1 and 4_1, run through the learner's own check (colouringOk)
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd, A = K.arcs(pd).count
  let valid = 0, validMulti = 0, valid2 = 0, valid3 = 0
  for (let m = 0; m < 3 ** A; m++) {
    const col = []; let x = m
    for (let i = 0; i < A; i++) { col.push(x % 3); x = Math.floor(x / 3) }
    if (K.colouringOk(pd, col).every(Boolean)) {
      valid++
      const u = new Set(col).size
      if (u > 1) validMulti++
      if (u === 2) valid2++
      if (u === 3) valid3++
    }
  }
  say('K2', n, 'assignments=' + 3 ** A, 'valid=' + valid, 'valid with 2+ colours=' + validMulti, 'using exactly 2 colours=' + valid2, 'exactly 3=' + valid3)
}
say('K2', 'unknot (no crossings, one arc): colourings(3)=' + K.colourings(K.knot('unknot').pd, 3))

// K3 every subset of crossing switches on 3_1 and 4_1
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd, c = K.crossingCount(pd), rows = []
  for (let m = 0; m < 2 ** c; m++) {
    let q = pd, cnt = 0
    for (let i = 0; i < c; i++) if (m >> i & 1) { q = K.crossingChange(q, i); cnt++ }
    rows.push({ cnt, st: K.simplify(q).status, id: name(q) })
  }
  for (let k = 0; k <= c; k++) {
    const r = rows.filter((x) => x.cnt === k)
    say('K3', n, 'switches=' + k, 'subsets=' + r.length, 'unknot by simplify=' + r.filter((x) => x.st === 'unknot').length, 'identify=' + [...new Set(r.map((x) => x.id))].join(','))
  }
}

// K4 chirality (numbers only: turnOver is never drawn): Jones, writhe and per-crossing signs under mirror and under turn over
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd
  say('K4', n, 'V=' + K.pstr(K.jones(pd)), 'V(mirror)=' + K.pstr(K.jones(K.mirror(pd))), 'V(turnOver)=' + K.pstr(K.jones(K.turnOver(pd))),
    'writhe=' + K.writhe(pd), 'mirror=' + K.writhe(K.mirror(pd)), 'turnOver=' + K.writhe(K.turnOver(pd)),
    'signs=' + JSON.stringify(K.signs(pd)), 'mirror signs=' + JSON.stringify(K.signs(K.mirror(pd))), 'turnOver signs=' + JSON.stringify(K.signs(K.turnOver(pd))),
    'identify(mirror)=' + name(K.mirror(pd)), 'identify(turnOver)=' + name(K.turnOver(pd)))
}
say('K4', 'right trefoil fromBraid([1,1,1]) writhe=' + K.writhe(K.fromBraid([1, 1, 1])), 'V=' + K.pstr(K.jones(K.fromBraid([1, 1, 1]))))

// K5 pictures: a stored layout survives mirror and crossingChange; turn over: stored layout versus a fresh one
for (const n of ['3_1', '4_1', '5_2', '6_1']) {
  const pd = K.knot(n).pd, L = K.layout(pd)
  const d0 = K.draw(pd, { layout: L }), d1 = K.draw(K.mirror(pd), { layout: L })
  say('K5', n, 'edges=' + d0.edges.length, 'crossings=' + d0.crossings.length, 'mirror with stored layout: edges=' + d1.edges.length, 'crossings=' + d1.crossings.length)
}
// turnOver is NOT drawn by any brief (EDD-011 re-read F4: it stays inside import block (a)); it is used for numbers only.
// The mirror and the crossing-changed pictures below are drawn on the entry's stored layout, default size and margin.
// K5b: mirror drawn on the entry's own stored layout, and again after every subset of crossing changes
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd, L = K.layout(pd), c = K.crossingCount(pd); let ok = 0, tot = 0
  for (let m = 0; m < 1 << c; m++) {
    let q = K.mirror(pd); for (let i = 0; i < c; i++) if (m >> i & 1) q = K.crossingChange(q, i)
    const d = K.draw(q, { layout: L }); tot++; if (d.edges.length === 2 * c && d.crossings.length === c && d.size === 100) ok++
  }
  say('K5b', n, 'mirror + every subset drawn on stored layout, default size/margin: ' + ok + ' of ' + tot + ' draw with the right edge and crossing counts')
}

// K13 viewBox padding for 44 px hit areas (brief 2 U1, brief 4): the default draw is 100 x 100; pad with the viewBox only.
// A crossing at distance d from the nearest edge, stage W px wide, viewBox side 100 + 2p: hit radius 22 px needs (d + p) * W / (100 + 2p) >= 22.
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd, L = K.layout(pd)
  for (const [lab, q] of [['knot', pd], ['mirror', K.mirror(pd)]]) {
    const cr = K.draw(q, { layout: L }).crossings, d = Math.min(...cr.flatMap((c) => [c.x, c.y, 100 - c.x, 100 - c.y]))
    const W = 360, rows = [0, 6, 8, 10].map((p) => 'p=' + p + ': edge room ' + ((d + p) * W / (100 + 2 * p)).toFixed(1) + ' px')
    let minGap = Infinity; for (let i = 0; i < cr.length; i++) for (let j = i + 1; j < cr.length; j++) minGap = Math.min(minGap, Math.hypot(cr[i].x - cr[j].x, cr[i].y - cr[j].y))
    say('K13', n, lab, 'nearest crossing to an edge d=' + d.toFixed(1) + ' (of 100)', rows.join('; '), '| closest crossing pair ' + minGap.toFixed(1) + ' units = ' + (minGap * W / 116).toFixed(0) + ' px at W=360, p=8')
  }
}

// K6 the table name's first number is the crossing number c (and the drawn count, for these drawings)
for (const n of ['3_1', '4_1', '5_2', '6_1']) say('K6', n, 'name digit=' + n.split('_')[0], 'crossing number c=' + K.knot(n).c, 'drawn=' + K.crossingCount(K.knot(n).pd))

// K7 links the briefs name but may not draw (block c): invariants only
{
  const W = K.knot('whitehead').pd, B = K.knot('borromean').pd
  say('K7', 'whitehead components=' + K.components(W), 'linking matrix=' + JSON.stringify(K.linkingMatrix(W)), 'crossings=' + K.crossingCount(W), 'simplify=' + K.simplify(W).status)
  const comps = K.components(B)
  for (let k = 0; k < comps; k++) say('K7', 'borromean delete component', k, 'simplify=' + K.simplify(K.deleteComponent(B, k)).status)
  say('K7', 'borromean components=' + comps, 'pairwise linking numbers=' + JSON.stringify(K.linkingMatrix(B)), 'crossings=' + K.crossingCount(B), 'simplify=' + K.simplify(B).status)
}

// K8 the states a learner can reach by tapping crossings of 3_1 and 4_1, by simplify status
// (the lesson may print "knotted" only for 'minimal', never for 'unknown')
for (const n of ['3_1', '4_1']) {
  const pd = K.knot(n).pd, c = K.crossingCount(pd), seen = {}
  for (let m = 0; m < 2 ** c; m++) {
    let q = pd
    for (let i = 0; i < c; i++) if (m >> i & 1) q = K.crossingChange(q, i)
    const key = K.simplify(q).status + ' / ' + name(q)
    seen[key] = (seen[key] || 0) + 1
  }
  say('K8', n, JSON.stringify(seen))
}

// K9 unknotting number from this drawing: one switch frees it, and the knot is not the unknot, so u = 1
for (const n of ['3_1', '4_1']) say('K9', n, 'identify(knot)=' + name(K.knot(n).pd), 'table u=' + K.knot(n).u)
