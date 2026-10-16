// Answer checks for the BLOCKED knot briefs (K10..K12): they use scramble / apply / simplify, whose output no lesson may draw
// until import block (a) lifts (src/kit/knots/README.md rule 2a). This script only computes numbers; nothing here is drawn.
// Run: node company/domains/briefs/checks/knots-check-blocked.mjs
import * as K from '../../../../src/kit/knots/index.mjs'
const say = (...a) => console.log(...a)

// K10 unknot in disguise: scramble([], seed, steps); report crossings, simplify status, and whether removals alone (reduce) reach 0
for (const steps of [6, 10, 20]) {
  const rows = []
  for (let seed = 1; seed <= 400; seed++) {
    const pd = K.scramble([], seed, steps), c = K.crossingCount(pd)
    if (c < 5 || c > 7) continue
    rows.push({ seed, c, st: K.simplify(pd).status, reduce: K.crossingCount(K.reduce(pd)) })
  }
  const mono = rows.filter((r) => r.reduce === 0)
  say('K10', 'steps=' + steps, 'seeds with 5-7 crossings=' + rows.length, 'unknot by simplify=' + rows.filter((r) => r.st === 'unknot').length,
    'reduced to 0 by removals alone=' + mono.length, 'first such seeds=' + mono.slice(0, 5).map((r) => r.seed + ':' + r.c).join(','))
}

// K11 fingerprint: random legal moves keep the Jones polynomial; one switch changes it
{
  const pd = K.knot('5_2').pd, v0 = K.pstr(K.jones(pd))
  let ok = 0, tried = 0
  for (let seed = 1; seed <= 50; seed++) {
    const q = K.scramble(pd, seed, 8); tried++
    if (K.pstr(K.jones(q)) === v0) ok++
  }
  say('K11', '5_2 V=' + v0, 'scrambled copies with the same V=' + ok + '/' + tried, 'after one switch V=' + K.pstr(K.jones(K.crossingChange(pd, 0))), 'name=' + K.identify(K.crossingChange(pd, 0)).map((x) => x.name).join('|'))
}

// K12 crossing number vs the drawing: scrambled 5_2 with 9 crossings simplifies to 5 and the result is reduced alternating
{
  const pd = K.knot('5_2').pd, hits = []
  for (let seed = 1; seed <= 300 && hits.length < 5; seed++) {
    const q = K.scramble(pd, seed, 8)
    if (K.crossingCount(q) === 9) { const s = K.simplify(q); hits.push(seed + ':' + s.status + ':' + K.crossingCount(s.pd ?? s.diagram ?? [])) }
  }
  say('K12', '5_2 scrambled to 9 crossings (seed:status:crossings after simplify)=', hits.join(' '))
  say('K12', 'simplify result keys=' + Object.keys(K.simplify(K.scramble(pd, 1, 8))).join(','))
}
