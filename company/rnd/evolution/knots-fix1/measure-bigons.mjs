// Development measurement for fix1-bigon (not part of the library, not imported by index.mjs, not an evaluator).
// Bigon width: for every 2-sided region (bigon) of a diagram, draw with the default layout and gap 0, sample the
// two edges' curves densely, and take the largest distance from a point of one curve to the other curve (both
// ways: the lens's thickness at its widest). Reported in view-box units (size 100) and as a share of the chord (the
// distance between the bigon's two crossings). A "flattened" bigon is one whose width is small against its chord.
// Also the minimum face width over all regions (definition at `bigons`), which catches squeezed non-bigons.
//
//   node company/rnd/evolution/knots-fix1/measure-bigons.mjs [before] [--table=kit] [--svg=outDir]
// Measures candidate fix1-bigon's draw, or with `before` its parent gen2-force-smooth (both imported statically from
// src/lab/knots/candidates/). Table diagrams come from the candidate's own (lab) table by default, or with
// --table=kit from the kit's derived table (src/kit/knots, read only). --svg writes the renders 3_1, 4_1, 5_2, L2a1
// and random12 (randomKnot(20261014, {strands: 3, length: 12}), as in knots-gen2.md) as <outDir>/<lib>--<name>.svg.
// Moved here from the candidate folder by the rnd-lead on 2026-10-14 (frozen-file check; NOTES section 8); the
// width definitions and the self-check are unchanged, only the import paths and the --table option are new.
import fs from 'node:fs'
import path from 'node:path'
import * as Kafter from '../../../../src/lab/knots/candidates/fix1-bigon/index.mjs'
import * as Cafter from '../../../../src/lab/knots/candidates/fix1-bigon/core.mjs'
import * as Kbefore from '../../../../src/lab/knots/candidates/gen2-force-smooth/index.mjs'
import * as Cbefore from '../../../../src/lab/knots/candidates/gen2-force-smooth/core.mjs'
import * as Kit from '../../../../src/kit/knots/index.mjs'

const args = process.argv.slice(2), flag = (k) => args.find((a) => a.startsWith(`--${k}=`))?.split('=')[1]
const before = args.includes('before'), K = before ? Kbefore : Kafter, C = before ? Cbefore : Cafter, tag = before ? 'gen2-force-smooth' : 'fix1-bigon'

const nums = (d) => d.match(/-?[\d.]+/g).map(Number)
const curve = (d, m = 48) => {
  const v = nums(d), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]])
  const out = [] // every cubic segment of the path (one in this candidate; several in gen 0's Catmull-Rom edges)
  for (let s = 0; s + 3 < p.length; s += 3) for (let i = 0; i <= m; i++) { const t = i / m, u = 1 - t; out.push([0, 1].map((k) => u * u * u * p[s][k] + 3 * u * u * t * p[s + 1][k] + 3 * u * t * t * p[s + 2][k] + t * t * t * p[s + 3][k])) }
  return out
}
const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy) }
const toPoly = (p, Q) => { let m = Infinity; for (let i = 0; i + 1 < Q.length; i++) m = Math.min(m, segDist(p, Q[i], Q[i + 1])); return m }
const haus = (A, B) => Math.max(...A.map((p) => toPoly(p, B)), ...B.map((p) => toPoly(p, A)))

// Known value: two symmetric cubics bulging 0.75 x 10 to each side of a 100-long chord are 15 apart at their widest.
if (Math.abs(haus(curve('M0 0C0 10 100 10 100 0'), curve('M0 0C0 -10 100 -10 100 0')) - 15) > 0.01) throw Error('width measure self-check failed')

export function bigons(pd) {
  const M = C.load(pd), [L] = C.trace(M), D = K.draw(pd, { gap: 0 }), byLabel = new Map(D.edges.map((e) => [e.label, e]))
  const out = []
  let face = Infinity
  for (const f of C.faces(M)) {
    const es = [...new Set(f.map((d) => L[d]))].map((l) => byLabel.get(l))
    // Face width (any face): for each edge of the face, the largest distance from a point on its middle third to the
    // face's other edges; the face's width is the smallest of these. A doubled pair of strands (a squeezed triangle,
    // say) shows here even when it is not a bigon.
    if (es.length > 1) face = Math.min(face, ...es.map((e) => { const o = es.filter((g) => g != e).map((g) => curve(g.d)); const c = curve(e.d); return Math.max(...c.slice(Math.floor(c.length / 3), Math.ceil((2 * c.length) / 3)).map((q) => Math.min(...o.map((P) => toPoly(q, P))))) }))
    if (f.length != 2) continue
    const [e1, e2] = f.map((d) => byLabel.get(L[d])), a = D.crossings[e1.from], b = D.crossings[e1.to]
    const w = haus(curve(e1.d), curve(e2.d)), chord = Math.hypot(a.x - b.x, a.y - b.y)
    out.push({ edges: [e1.label, e2.label], width: w, chord, ratio: w / (chord || 1) })
  }
  out.face = face
  return out
}

const TABLE = flag('table') === 'kit' ? Kit.KNOTS : K.KNOTS
console.log(`table ${flag('table') === 'kit' ? 'kit (src/kit/knots, derived)' : 'lab (candidate)'}`)
const prime = Object.keys(TABLE).filter((n) => /^\d+_\d+$/.test(n) && n != '0_1')
const row = (knot, B) => ({ knot, bigons: B.length, minWidth: +Math.min(...B.map((b) => b.width)).toFixed(1), minRatio: +Math.min(...B.map((b) => b.ratio)).toFixed(2), face: +B.face.toFixed(1) })
const r12 = K.randomKnot(20261014, { strands: 3, length: 12 }).pd
const rows = [...[...prime, 'L2a1'].map((n) => row(n, bigons(TABLE[n].pd))), row('random12', bigons(r12))]
console.log(`lib ${tag}`)
console.log('knot     bigons  min bigon width (of 100)  min width/chord  min face width')
for (const r of rows) console.log(`${r.knot.padEnd(9)}${String(r.bigons).padStart(6)}${String(r.minWidth).padStart(26)}${String(r.minRatio).padStart(17)}${String(r.face).padStart(16)}`)
const W = rows.filter((r) => prime.includes(r.knot))
console.log(`prime table knots: min bigon width ${Math.min(...W.map((r) => r.minWidth))}, min width/chord ${Math.min(...W.map((r) => r.minRatio))}, min face width ${Math.min(...W.map((r) => r.face))}`)
// Over the lesson family: randomKnot(s) defaults, seeds 1..200.
const rs = [], fs2 = []
for (let s = 1; s <= 200; s++) { const B = bigons(K.randomKnot(s).pd); for (const b of B) rs.push(b.width); fs2.push(B.face) }
rs.sort((a, b) => a - b); fs2.sort((a, b) => a - b)
const q = (a, f) => a[Math.floor(a.length * f)].toFixed(1)
console.log(`randomKnot(1..200): bigons ${rs.length}, bigon width min ${q(rs, 0)}, 5th pct ${q(rs, 0.05)}, median ${q(rs, 0.5)}; per-diagram min face width: min ${q(fs2, 0)}, 5th pct ${q(fs2, 0.05)}, median ${q(fs2, 0.5)}`)

const svgDir = flag('svg')
if (svgDir) {
  fs.mkdirSync(svgDir, { recursive: true })
  const cases = { '3_1': TABLE['3_1'].pd, '4_1': TABLE['4_1'].pd, '5_2': TABLE['5_2'].pd, L2a1: TABLE.L2a1.pd, random12: r12 }
  for (const [n, pd] of Object.entries(cases)) {
    const D = K.draw(pd)
    const body = D.edges.map((e) => `<path d="${e.d}" fill="none" stroke="black" stroke-width="1.6" stroke-linecap="round"/>`).join('')
    fs.writeFileSync(path.join(svgDir, `${tag}--${n}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${D.viewBox}" width="300" height="300"><title>${tag} ${n}</title><rect width="100%" height="100%" fill="white"/>${body}</svg>\n`)
  }
}
