// Quality bench for the knot library (evaluator, owned by the R&D lead; see company/rnd/evolution.md and
// company/rnd/evolution/knots-gen0.md). Prints ONE JSON line of numbers, higher = better. Correctness is the
// tests' job, not this. Every input is generated or disguised HERE, at bench time, from EVOLVE_SEED (set by
// tools/evolve.mjs once per scoring run; default 1), by evaluator code in test/benchgen.mjs that never calls
// the library under test. So a candidate can neither choose nor special-case what it is scored on.
//
// Layout: 20 messy random knot diagrams: 12 projections of random 3-D polygons (8-20 crossings, kinks and
// bigons left in) and 8 random braid closures (3-5 strands, 8-14 crossings). Drawn with draw(pd).
//   layoutExtraCrossings  -(strand intersections that are not at a crossing both strands belong to), summed
//   layoutPlanarShare     100 x share of diagrams drawn with no extra intersection
//   layoutSpacing         100 x mean of (closest approach of a strand to a crossing it does not touch) / size
//   layoutCrossingSpread  100 x mean of (closest pair of crossings) / (size / sqrt(crossings)): bunching shows here
//   layoutAspect          100 x mean of (short side / long side) of the drawing's bounding box
//   layoutSlowPenalty     -(mean ms per draw above 100 ms)
// Unknots: test/benchdata.mjs HARD (10 unknot diagrams with no R1/R2/R3 move: crossings must be added first)
// and the monster unknot, each in 2 seeded disguises, plus 8 seeded connected sums of two disguised HARD ones.
//   hardUnknotShare       100 x share of those 30 that simplify() takes to 0 crossings (3 s each at most)
//   hardUnknotReduction   100 x mean share of their crossings removed
//   falseUnknotPenalty    -100 per decoy (a knotted no-move diagram; HARD # 3_1; HARD # 4_1) simplified below
//                         its true minimum (a claim the library cannot have proved)
//   gordianReduction      100 x share of the 141 crossings of a disguised Haken Gordian unknot removed (20 s)
// Jones: 30 seeded 4-strand braid closures (<= 11 crossings), checked against a reference state sum here.
//   jonesWrongPenalty     -100 per wrong Jones polynomial
//   jonesSpeed            10 x log2(Jones polynomials per second), each call on a freshly disguised diagram
import * as K from './index.mjs'
import * as G from './test/benchgen.mjs'
import { HARD, DECOY, MONSTER, GORDIAN, KNOTS } from './test/benchdata.mjs'

const SEED = Number(process.env.EVOLVE_SEED ?? 1) >>> 0
const rng = (k) => G.rng((SEED * 2654435761 + k * 40503) >>> 0)
const r2 = (v) => Math.round(v * 100) / 100
const out = {}

// ---- layout of messy diagrams ----
const messy = []
{
  const r = rng(1)
  while (messy.length < 12) { const pd = G.projectPD(G.randomPolygon(r, 14 + ((r() * 18) | 0), 2 + r())); if (pd.length >= 8 && pd.length <= 20) messy.push(pd) }
  while (messy.length < 20) { const pd = G.randomBraid(r, 3 + ((r() * 3) | 0), 8 + ((r() * 6) | 0)); if (pd) messy.push(G.disguise(pd, r)) }
}
const nums = (d) => d.match(/-?[\d.]+(?:e-?\d+)?/g).map(Number)
const sample = (d) => { const v = nums(d), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); const o = []; for (let s = 0; s + 3 < p.length; s += 3) for (let i = 0; i <= 8; i++) { const t = i / 8, u = 1 - t; o.push([0, 1].map((k) => u * u * u * p[s][k] + 3 * u * u * t * p[s + 1][k] + 3 * u * t * t * p[s + 2][k] + t * t * t * p[s + 3][k])) } return o }
const hit = (a, b, c, d) => { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0 }
let extra = 0, planar = 0, spacing = 0, spread = 0, aspect = 0, ms = 0
for (const pd of messy) {
  let D
  const t0 = performance.now()
  try { D = K.draw(pd) } catch { D = null }
  ms += performance.now() - t0
  const P = D?.edges?.map((e) => sample(e.d))
  if (!D || P.length != 2 * pd.length || P.some((s) => !s.length || s.some((p) => !isFinite(p[0] + p[1])))) { extra += 50; continue }
  const C = D.crossings, ends = D.edges.map((e) => [e.from, e.to]), R = 0.04 * D.size
  const atShared = (p, i, j) => ends[i].some((c) => ends[j].includes(c) && Math.hypot(p[0] - C[c].x, p[1] - C[c].y) < R)
  let x = 0
  for (let i = 0; i < P.length; i++) for (let j = i; j < P.length; j++) for (let a = 0; a + 1 < P[i].length; a++) for (let b = i == j ? a + 2 : 0; b + 1 < P[j].length; b++) {
    if (!hit(P[i][a], P[i][a + 1], P[j][b], P[j][b + 1])) continue
    if (!atShared(P[i][a], i, j)) x++
  }
  let m = Infinity
  for (const c of C) P.forEach((s, i) => { if (!ends[i].includes(c.i)) for (const p of s) m = Math.min(m, Math.hypot(p[0] - c.x, p[1] - c.y)) })
  const xs = P.flat().map((p) => p[0]), ys = P.flat().map((p) => p[1]), w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys)
  let cc = Infinity
  for (const a of C) for (const b of C) if (a.i < b.i) cc = Math.min(cc, Math.hypot(a.x - b.x, a.y - b.y))
  spread += isFinite(cc) ? Math.min(1.5, cc / (D.size / Math.sqrt(C.length))) : 0
  extra += x; planar += !x; spacing += isFinite(m) ? m / D.size : 0; aspect += Math.min(w, h) / (Math.max(w, h) || 1)
}
Object.assign(out, { layoutExtraCrossings: -extra, layoutPlanarShare: r2((100 * planar) / messy.length), layoutSpacing: r2((100 * spacing) / messy.length), layoutCrossingSpread: r2((100 * spread) / messy.length), layoutAspect: r2((100 * aspect) / messy.length), layoutSlowPenalty: -r2(Math.max(0, ms / messy.length - 100)) })

// ---- hard unknots ----
const timed = (pd, cap) => { const t0 = performance.now(); let s; try { s = K.simplify(pd) } catch { return Infinity } return performance.now() - t0 > cap ? Infinity : s.crossings }
{
  const r = rng(2), inst = []
  for (const h of [...HARD, MONSTER]) for (let k = 0; k < 2; k++) inst.push(G.disguise(h, r))
  const sum = (a, b) => G.disguise(G.connectedSum(G.disguise(a, r), G.disguise(b, r), 1 + ((r() * 2 * a.length) | 0), 1 + ((r() * 2 * b.length) | 0)), r)
  for (let k = 0; k < 8; k++) inst.push(sum(HARD[(r() * HARD.length) | 0], HARD[(r() * HARD.length) | 0]))
  let solved = 0, red = 0
  for (const pd of inst) { const c = timed(pd, 3000); solved += c == 0; red += isFinite(c) ? (pd.length - c) / pd.length : 0 }
  const decoys = [[G.disguise(DECOY, r), 1], [sum(HARD[(r() * HARD.length) | 0], KNOTS['3_1']), 3], [sum(HARD[(r() * HARD.length) | 0], KNOTS['4_1']), 4]]
  const lies = decoys.filter(([pd, min]) => { const c = timed(pd, 3000); return isFinite(c) && c < min }).length
  const g = timed(G.disguise(GORDIAN, r), 20000)
  Object.assign(out, { hardUnknotShare: r2((100 * solved) / inst.length), hardUnknotReduction: r2((100 * red) / inst.length), falseUnknotPenalty: -100 * lies, gordianReduction: r2(isFinite(g) ? (100 * (141 - g)) / 141 : 0) })
}

// ---- Jones ----
{
  const r = rng(3), pool = []
  while (pool.length < 30) { const pd = G.randomBraid(r, 4, 9 + ((r() * 3) | 0)); if (pd) pool.push(pd) }
  const key = (p) => Object.keys(p).filter((e) => p[e]).sort((a, b) => a - b).map((e) => `${+e}:${p[e]}`).join()
  let wrong = 0
  for (const pd of pool) { let j; try { j = K.jones(pd) } catch { j = {} } if (key(j) != key(G.jonesRef(pd))) wrong++ }
  const inputs = Array.from({ length: 400 }, (_, k) => G.disguise(pool[k % pool.length], r))
  let runs = 0
  const t0 = performance.now()
  while (runs < inputs.length && performance.now() - t0 < 1500) K.jones(inputs[runs++])
  Object.assign(out, { jonesWrongPenalty: -100 * wrong, jonesSpeed: r2(10 * Math.log2(runs / ((performance.now() - t0) / 1000))) })
}

console.log(JSON.stringify(out))
