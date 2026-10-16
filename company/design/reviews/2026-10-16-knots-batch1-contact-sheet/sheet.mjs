// Contact sheet and picture measures for knots batch 1 (company/domains/briefs/math.discrete.md, briefs 1 to 4).
// design-lead, 2026-10-16. Record: company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md
//
// Run: node company/design/reviews/2026-10-16-knots-batch1-contact-sheet/sheet.mjs
// Writes SVG sheets and metrics.json next to this file. No dependencies beyond the kit.
//
// Principal-engineer conditions (EDD-011 Part 1, company/engineering/reviews/2026-10-16-knots-w407-reread.md):
// every picture is draw(pd, { layout: L }) with L = layout(entry.pd) at the default relax, default size (100) and
// margin (8); padding and scale only through the viewBox "-8 -8 116 116". Nothing here passes size, margin or relax.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { knot, layout, draw, mirror, crossingChange, turnOver, signs, moves, arcs, simplify, identify } from '../../../../src/kit/knots/index.mjs'

const OUT = dirname(fileURLToPath(import.meta.url))
const VB = [-8, -8, 116, 116]
// Picture widths in CSS px. A 360 or 390 viewport loses 70 px to the feed chrome before the stage SVG
// (src/app/globals.css: .slot-screen padding 10, .card-shell border 1 + padding 14, .stage padding 10, each side),
// so the picture is 290 or 320 px wide. 360 and 390 are the full-viewport figures the briefs' K13 used.
// 260 is a short phone where .stage-svg max-height 46dvh binds (about 565 px of dynamic viewport).
const WIDTHS = { 'v360-card': 290, 'v390-card': 320, 'v360-full': 360, 'v390-full': 390, 'short-phone': 260 }
const HIT_R = 22 // px, a 44 px hit circle (brief 1 to 4)
const SW = [1.6, 2.0, 2.5] // candidate stroke widths in drawing units (viewBox side 116)

// ---------- geometry ----------
const parse = (d) => d.match(/-?\d+(\.\d+)?/g).map(Number)
const cubic = (d, n = 400) => {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = parse(d), out = []
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t
    out.push([u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3, u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3])
  }
  return out
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])
const segHit = (p, q, r, s) => {
  const d = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0])
  if (Math.abs(d) < 1e-12) return null
  const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / d, u = ((r[0] - p[0]) * (q[1] - p[1]) - (r[1] - p[1]) * (q[0] - p[0])) / d
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])] : null
}
const segDist = (p, a, b) => {
  const vx = b[0] - a[0], vy = b[1] - a[1], L = vx * vx + vy * vy, t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / L)) : 0
  return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy)
}
const polyDist = (p, P) => { let m = Infinity; for (let i = 0; i + 1 < P.length; i++) m = Math.min(m, segDist(p, P[i], P[i + 1])); return m }

// ---------- measures (all in drawing units; px = units * W / 116) ----------
function measure(D) {
  const C = D.crossings.map((c) => [c.x, c.y]), E = D.edges.map((e) => ({ ...e, P: cubic(e.d) }))
  const start = (e) => e.P[0], end = (e) => e.P[e.P.length - 1]
  // Is edge e drawn to the centre of crossing c at its start (or end)? Over-strand ends reach the centre; under ends are cut.
  const atCentre = (e, c, which) => dist(which ? end(e) : start(e), C[c]) < 0.2
  // 1. Every intersection between drawn strands. The only expected touches are the two over-strand halves meeting
  //    at a crossing centre. Anything else is either an extra crossing, or an under-strand that reaches its over-strand.
  const hits = []
  for (let i = 0; i < E.length; i++) for (let j = i; j < E.length; j++) {
    const A = E[i].P, B = E[j].P
    for (let a = 0; a + 1 < A.length; a++) for (let b = i == j ? a + 2 : 0; b + 1 < B.length; b++) {
      const h = segHit(A[a], A[a + 1], B[b], B[b + 1]); if (!h) continue
      const near = C.map((c, k) => [dist(h, c), k]).sort((x, y) => x[0] - y[0])[0]
      if (near[0] < 0.5 && i != j) continue // over-strand join at a crossing centre
      if (i != j && hits.some((x) => x.pair == `${i}-${j}` && dist(x.at, h) < 0.5)) continue
      hits.push({ pair: `${i}-${j}`, edges: [E[i].label, E[j].label], at: h.map((v) => +v.toFixed(2)), nearestCrossing: near[1], distToCrossing: +near[0].toFixed(2) })
    }
  }
  // 2. Gaps: for each crossing, how far each cut under-strand end stops from the over-strand's centre line.
  const gaps = C.map((c, k) => {
    const over = E.filter((e) => (e.from == k && atCentre(e, k, 0)) || (e.to == k && atCentre(e, k, 1)))
    const ends = []
    for (const e of E) {
      if (e.from == k && !atCentre(e, k, 0)) ends.push(start(e))
      if (e.to == k && !atCentre(e, k, 1)) ends.push(end(e))
    }
    const d = ends.map((p) => Math.min(...over.map((o) => polyDist(p, o.P))))
    return { crossing: k, overEdges: over.map((o) => o.label), underEnds: ends.length, centreLineGap: +Math.min(...d).toFixed(2) }
  })
  // 3. A third strand near a crossing: the closest approach of any strand not incident to crossing k to its centre.
  const third = C.map((c, k) => +Math.min(...E.filter((e) => e.from != k && e.to != k).map((e) => polyDist(c, e.P))).toFixed(2))
  // 4. Clearance between strands away from crossings (narrowest face, centre line to centre line), on different
  //    edges. Points within 6 units (6 % of size, as the kit's textbook test) of any crossing are skipped, and so are
  //    points within 12 units of a crossing both edges meet at (two arms leaving one crossing are measured in 4b).
  let clear = Infinity, clearAt = null
  const ends = (e) => [e.from, e.to]
  for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) {
    const shared = ends(E[i]).filter((c) => ends(E[j]).includes(c))
    const ok = (p) => C.every((c) => dist(p, c) > 6) && shared.every((c) => dist(p, C[c]) > 12)
    const Pi = E[i].P.filter((p, k) => k % 2 == 0 && ok(p)), Pj = E[j].P.filter((p, k) => k % 2 == 0 && ok(p))
    for (const p of Pi) for (const q of Pj) { const d = dist(p, q); if (d < clear) { clear = d; clearAt = [E[i].label, E[j].label, p.map((v) => +v.toFixed(1))] } }
  }
  // 4b. Arm angles: at each crossing, where the four arms cross a circle of radius r around the centre, the smallest
  //     angle between two neighbouring arms. 90 is a clean X; a small angle means two arms leave almost together and
  //     the crossing reads as a cusp or a touch, not an X. r = 6 and 10 units (about 15 and 25 px at 290 px).
  const armAngle = (k, r) => {
    const ang = []
    for (const e of E) for (const [w, P] of [[e.from, e.P], [e.to, [...e.P].reverse()]]) {
      if (w != k) continue
      const p = P.find((q) => dist(q, C[k]) >= r); if (p) ang.push(Math.atan2(p[1] - C[k][1], p[0] - C[k][0]))
    }
    ang.sort((a, b) => a - b)
    let m = Infinity; for (let i = 0; i < ang.length; i++) { const d = i + 1 < ang.length ? ang[i + 1] - ang[i] : ang[0] + 2 * Math.PI - ang[i]; m = Math.min(m, d) }
    return ang.length == 4 ? +(m * 180 / Math.PI).toFixed(1) : null
  }
  const arms = C.map((c, k) => ({ crossing: k, r6: armAngle(k, 6), r10: armAngle(k, 10) }))
  // 5. Hit circles: room from each crossing to the viewBox edge, and the closest pair of crossings.
  const room = Math.min(...C.flatMap(([x, y]) => [x - VB[0], y - VB[1], VB[0] + VB[2] - x, VB[1] + VB[3] - y]))
  let pair = Infinity; for (let i = 0; i < C.length; i++) for (let j = i + 1; j < C.length; j++) pair = Math.min(pair, dist(C[i], C[j]))
  // 6. Curve extent (the strands, not the handles) inside the 0..100 box.
  const pts = E.flatMap((e) => e.P), xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1])
  return {
    crossings: C.length, edges: E.length,
    unexpectedIntersections: hits.length, hits,
    hiddenWithin3: hits.filter((h) => h.distToCrossing <= 3).length,
    minCentreLineGap: Math.min(...gaps.map((g) => g.centreLineGap)), gaps,
    minThirdStrandToCrossing: Math.min(...third), third,
    minClearance: +clear.toFixed(2), clearAt,
    minArmAngle6: Math.min(...arms.map((a) => a.r6)), minArmAngle10: Math.min(...arms.map((a) => a.r10)), arms,
    roomToViewBoxEdge: +room.toFixed(2), closestCrossingPair: +pair.toFixed(2),
    extent: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)].map((v) => +v.toFixed(1)),
  }
}
const px = (u, W) => +(u * W / VB[2]).toFixed(1)
function phone(m) {
  const o = {}
  for (const [k, W] of Object.entries(WIDTHS)) o[k] = {
    W, roomPx: px(m.roomToViewBoxEdge, W), hitClipped: px(m.roomToViewBoxEdge, W) < HIT_R,
    pairPx: px(m.closestCrossingPair, W), hitOverlap: px(m.closestCrossingPair, W) < 2 * HIT_R,
    // Visible gap: from the end of the under-stroke (butt cap) to the edge of the over-stroke.
    gapPx: Object.fromEntries(SW.map((s) => [s, px(m.minCentreLineGap - s / 2, W)])),
    gapPxRoundCap: Object.fromEntries(SW.map((s) => [s, px(m.minCentreLineGap - s, W)])),
    // Visible clearance between strands away from crossings: background between the two strokes.
    clearPx: Object.fromEntries(SW.map((s) => [s, px(m.minClearance - s, W)])),
  }
  return o
}

// ---------- detector self-test (it must see what it claims to see) ----------
{
  // (i) The re-read's known false crossing: draw(knot('4_1').pd, { size: 360 }) shows 1 extra crossing (F2).
  const bad = measure(draw(knot('4_1').pd, { size: 360 }))
  if (bad.unexpectedIntersections < 1) throw new Error('self-test: detector missed the size-360 false crossing on 4_1')
  // (ii) A planted crossing 2 units (2 %) from a real crossing, inside the kit test's 3-unit blind zone.
  const D = draw(knot('3_1').pd), c = D.crossings[1]
  // The over-strand edge that starts at this crossing's centre; plant a short cross-stroke at 2 units along it.
  const e = D.edges.find((x) => x.from == c.i && dist(cubic(x.d)[0], [c.x, c.y]) < 0.2), P = cubic(e.d)
  const k = P.findIndex((p) => dist(p, [c.x, c.y]) >= 2), [p, q] = [P[k], P[k + 1]], L = dist(p, q), nx = -(q[1] - p[1]) / L * 4, ny = (q[0] - p[0]) / L * 4
  const planted = { ...D, edges: [...D.edges, { label: 99, component: 0, from: -1, to: -1, d: `M${p[0] - nx} ${p[1] - ny}C${p[0] - nx / 3} ${p[1] - ny / 3} ${p[0] + nx / 3} ${p[1] + ny / 3} ${p[0] + nx} ${p[1] + ny}` }] }
  const pm = measure(planted)
  if (pm.hiddenWithin3 < 1) throw new Error('self-test: detector missed a crossing planted 2 units from a real one')
  // (iii) A closed gap: gap 0.05 leaves the under-strand touching the over-strand.
  const closed = measure(draw(knot('3_1').pd, { gap: 0.05 }))
  if (closed.minCentreLineGap > 1) throw new Error('self-test: gap measure missed a closed gap')
  var selfTest = { size360_4_1_extra: bad.unexpectedIntersections, planted_within3: pm.hiddenWithin3, planted_hits: pm.hits.map((h) => h.distToCrossing), gap005_centreLine: closed.minCentreLineGap, unusedEdge: e.label }
}

// ---------- pictures (exactly what the briefs draw) ----------
const pics = []
const add = (brief, id, title, pd, L, extra = {}) => {
  const D = draw(pd, { layout: L }) // default size 100, margin 8, gap; stored layout
  if (D.size != 100 || D.viewBox != '0 0 100 100') throw new Error('not the default frame')
  const m = measure(D)
  pics.push({ brief, id, title, D, pd, m, phone: phone(m), ...extra })
}
// Brief 1: draw(knot(n).pd) with no layout override = the default layout.
for (const n of ['5_2', '6_1']) { const pd = knot(n).pd; add(1, n, `${n} default`, pd, layout(pd)) }
// Brief 2: tricolour states on 3_1 and 4_1 (stored layout; colour per kit arc, T1).
const A = { '3_1': arcs(knot('3_1').pd), '4_1': arcs(knot('4_1').pd) }
const valid = (n, col) => A[n].crossings.every(([o, i, j]) => { const s = new Set([col[o], col[i], col[j]]); return s.size == 1 || s.size == 3 })
for (const n of ['3_1', '4_1']) {
  const pd = knot(n).pd, L = layout(pd), k = A[n].count, states = []
  for (let m = 0; m < 3 ** k; m++) { const col = [...Array(k)].map((_, i) => Math.floor(m / 3 ** i) % 3); states.push({ col, ok: valid(n, col), used: new Set(col).size }) }
  const pick = n == '3_1'
    ? [['start: all one colour', [0, 0, 0]], ['one tap: two colours (fails)', [1, 0, 0]], ['valid: all three', states.find((s) => s.ok && s.used == 3).col]]
    : [['start: all one colour', [0, 0, 0, 0]], ['two colours (fails)', [1, 0, 0, 0]], ['three colours (fails)', [0, 1, 2, 0]], ['every arc tapped once', [1, 1, 1, 1]]]
  for (const [lab, col] of pick) add(2, `${n}-tri-${col.join('')}`, `${n} ${lab}`, pd, L, { colours: col, ok: valid(n, col), okCrossings: A[n].crossings.filter(([o, i, j]) => { const s = new Set([col[o], col[i], col[j]]); return s.size != 2 }).length })
  pics.at(-1).tricolourCensus = { assignments: states.length, valid: states.filter((s) => s.ok).length, validMulti: states.filter((s) => s.ok && s.used > 1).length }
}
// Brief 3: every crossing-change subset on the entry's stored layout.
for (const n of ['3_1', '4_1']) {
  const pd = knot(n).pd, L = layout(pd), c = pd.length
  for (let m = 0; m < 1 << c; m++) {
    let q = pd; const on = []; for (let i = 0; i < c; i++) if (m >> i & 1) { q = crossingChange(q, i); on.push(i) }
    add(3, `${n}-cc-${on.join('') || 'none'}`, `${n} switched {${on.join(',')}}`, q, L, { status: simplify(q).status, name: identify(q).map((x) => x.name + (x.mirror ? '*' : '')).join('/') })
  }
}
// Brief 4: the knot and its mirror on the entry's stored layout.
for (const n of ['3_1', '4_1']) { const pd = knot(n).pd, L = layout(pd); add(4, n, `${n}`, pd, L); add(4, `${n}-mirror`, `${n} mirror`, mirror(pd), L) }

// ---------- learning-designer notes (company/reviews/<slug>/design.md, 2026-10-16) ----------
// Note 1 (draw-a-table-knot): one switch at a time on 5_2 and 6_1, stored layout.
for (const n of ['5_2', '6_1']) {
  const pd = knot(n).pd, L = layout(pd)
  for (let c = 0; c < pd.length; c++) { const q = crossingChange(pd, c); add('1n', `${n}-sw${c}`, `${n} switch ${c}`, q, L, { name: identify(q).map((x) => x.name).join('/') }) }
}
// Note 2 (tricolour-check): the staggered cycle's QA path on 3_1, press arc 1 then arc 2 -> (B,C,A).
{ const pd = knot('3_1').pd, L = layout(pd); for (const col of [[1, 0, 0], [1, 2, 0]]) add('2n', `3_1-tri-${col.join('')}`, `3_1 QA path ${col.join('')}`, pd, L, { colours: col, ok: valid('3_1', col) }) }
// Note 3 (unknot-game): after each single switch, tint the two edges of the first R2 in moves() (read only).
for (const n of ['3_1', '4_1']) {
  const pd = knot(n).pd, L = layout(pd)
  for (let c = 0; c < pd.length; c++) {
    const q = crossingChange(pd, c), r2 = moves(q).find((m) => m.type == 'R2')
    add('3n', `${n}-sw${c}-tint`, `${n} switch ${c}, tint R2 ${r2.edges}`, q, L, { status: simplify(q).status, tint: r2.edges })
  }
}
// Note 4 (left-or-right, W-1566): the two-sided card. Front draw(pd), back draw(mirror(pd)), same stored layout.
// A card at angle t shows the front scaled by cos t (t < 90) or the back reflected and scaled by |cos t| (t > 90).
// Also the two hazards for reference: a one-sided flip (front reflected) and the scaleX(-1) "Mirror" option.
for (const n of ['3_1', '4_1']) {
  const pd = knot(n).pd, L = layout(pd)
  add('4c', `${n}-card-0`, `${n} card 0°: front`, pd, L, { sx: 1 })
  add('4c', `${n}-card-60`, `${n} card 60°: front`, pd, L, { sx: Math.cos(Math.PI / 3) })
  add('4c', `${n}-card-120`, `${n} card 120°: back`, mirror(pd), L, { sx: Math.cos(2 * Math.PI / 3) })
  add('4c', `${n}-card-180`, `${n} card 180°: back = turned over`, mirror(pd), L, { sx: -1 })
  add('4h', `${n}-oneside-180`, `${n} one-sided flip 180° (= mirror knot)`, pd, L, { sx: -1 })
}
// Geometric check: crossing signs read off the picture as the learner sees it (after the CSS reflection), against the
// kit's signs of the diagram the picture is meant to show. Calibrated on the unreflected front.
function pictureSigns(D, sx) {
  const X = (p) => [50 + sx * (p[0] - 50), p[1]]
  return D.crossings.map((c) => {
    const inc = D.edges.filter((e) => e.to == c.i).map((e) => { const P = cubic(e.d).map(X), a = P[P.length - 8], b = P[P.length - 1]; return { over: dist(cubic(e.d)[cubic(e.d).length - 1], [c.x, c.y]) < 0.2, v: [b[0] - a[0], b[1] - a[1]] } })
    const o = inc.find((e) => e.over).v, u = inc.find((e) => !e.over).v
    return Math.sign(u[0] * o[1] - u[1] * o[0])
  })
}
const cardCheck = {}
for (const n of ['3_1', '4_1']) {
  const pd = knot(n).pd, L = layout(pd), F = draw(pd, { layout: L }), B = draw(mirror(pd), { layout: L })
  const cal = pictureSigns(F, 1).map((s, i) => s * signs(pd)[i]), fix = (a) => a.map((s, i) => s * cal[i])
  cardCheck[n] = {
    calibration: cal,
    front: { picture: fix(pictureSigns(F, 1)), kit: signs(pd) },
    back180: { picture: fix(pictureSigns(B, -1)), kitTurnOver: signs(turnOver(pd)), kitMirror: signs(mirror(pd)) },
    oneSidedFlip180: { picture: fix(pictureSigns(F, -1)), kitMirror: signs(mirror(pd)) },
  }
}

// Gap probe: `gap` is free under the conditions (README rule 2(a) scope). The perpendicular gap (cut end to the
// over-strand's centre line) at the narrowest crossing, for the default 0.35 and two larger values, on every picture
// the briefs draw (each knot, mirror and every crossing-change subset on the stored layout).
const gapProbe = {}
for (const n of ['3_1', '4_1', '5_2', '6_1']) {
  const pd = knot(n).pd, L = layout(pd), c = pd.length
  for (const g of [0.35, 0.45, 0.5]) {
    let lo = Infinity, extra = 0
    for (let m = 0; m < 1 << c; m++) { let q = pd; for (let i = 0; i < c; i++) if (m >> i & 1) q = crossingChange(q, i); const r = measure(draw(q, { layout: L, gap: g })); lo = Math.min(lo, r.minCentreLineGap); extra += r.unexpectedIntersections }
    gapProbe[`${n} gap ${g}`] = { minCentreLineGap: +lo.toFixed(2), visiblePx290_sw2: px(lo - 1, 290), visiblePx260_sw2: px(lo - 1, 260), extraOverAllSubsets: extra }
  }
}
// Arc lengths (brief 2 taps along an arc, >= 44 px): drawn length of each arc in px at 290.
const arcLen = {}
for (const n of ['3_1', '4_1']) {
  const D = draw(knot(n).pd, { layout: layout(knot(n).pd) }), len = (P) => P.slice(1).reduce((a, p, i) => a + dist(p, P[i]), 0)
  arcLen[n] = A[n].edges.map((es) => px(es.reduce((a, l) => a + len(cubic(D.edges.find((e) => e.label == l).d)), 0), 290))
}

// ---------- SVG ----------
// Arc colours (proposal for brief 2, T3): Okabe-Ito-derived, one set per theme, each >= 3:1 on --bg-3; plus a number label.
const THEMES = {
  dark: { bg: '#1f2430', card: '#161a22', fg: '#eef1f7', muted: '#9aa3b5', arcs: ['#E69F00', '#56B4E9', '#E87FBF'] },
  light: { bg: '#eceff6', card: '#ffffff', fg: '#141824', muted: '#5d6578', arcs: ['#A65E00', '#0068A8', '#B0337A'] },
}
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] }
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2) }
const contrastTable = Object.fromEntries(Object.entries(THEMES).map(([t, T]) => [t, { fg: contrast(T.fg, T.bg), arcs: T.arcs.map((c) => contrast(c, T.bg)) }]))

function picture(p, T, W, { sw = 2, hits = false } = {}) {
  const arcOf = {}
  if (p.colours) { const n = p.id.slice(0, 3); A[n].edges.forEach((es, k) => es.forEach((l) => (arcOf[l] = k))) }
  const stroke = (e) => (p.colours ? T.arcs[p.colours[arcOf[e.label]]] : p.tint?.includes(e.label) ? T.arcs[1] : T.fg)
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="${VB.join(' ')}">`
  s += `<rect x="${VB[0]}" y="${VB[1]}" width="${VB[2]}" height="${VB[3]}" fill="${T.bg}"/>`
  if (hits) for (const c of p.D.crossings) s += `<circle cx="${c.x}" cy="${c.y}" r="${(HIT_R * VB[2] / W).toFixed(2)}" fill="none" stroke="${T.muted}" stroke-width="0.4" stroke-dasharray="1.2 1.2"/>`
  if (p.sx != null) s += `<g transform="translate(50 0) scale(${p.sx.toFixed(3)} 1) translate(-50 0)">`
  for (const e of p.D.edges) s += `<path d="${e.d}" fill="none" stroke="${stroke(e)}" stroke-width="${sw}" stroke-linecap="butt"/>`
  if (p.sx != null) s += '</g>'
  if (p.colours) {
    // T3 label at each arc's middle: the middle sample of the arc's longest edge.
    const n = p.id.slice(0, 3)
    A[n].edges.forEach((es, k) => {
      const e = es.map((l) => p.D.edges.find((x) => x.label == l)).map((x) => ({ x, P: cubic(x.d, 40) })).sort((a, b) => b.P.length - a.P.length)[0]
      const [x, y] = e.P[20]
      s += `<circle cx="${x}" cy="${y}" r="4.6" fill="${T.bg}" stroke="${T.arcs[p.colours[k]]}" stroke-width="1"/><text x="${x}" y="${y + 2.2}" font-size="6.2" text-anchor="middle" font-family="sans-serif" font-weight="700" fill="${T.fg}">${k + 1}</text>`
    })
  }
  return s + '</svg>'
}
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;')
function sheet(name, list, opts = {}) {
  const rows = []
  for (const [wk, W] of [['v360-card', 290], ['v390-card', 320]]) for (const t of ['dark', 'light']) rows.push({ wk, W, t })
  const pad = 12, cap = 34, colW = Math.max(...rows.map((r) => r.W)) + pad
  const width = pad + list.length * colW, height = pad + rows.reduce((a, r) => a + r.W + cap + pad, 0)
  let y = pad, body = ''
  for (const r of rows) {
    const T = THEMES[r.t]
    list.forEach((p, i) => {
      const x = pad + i * colW, m = p.phone[r.wk]
      body += `<rect x="${x - 4}" y="${y - 4}" width="${r.W + 8}" height="${r.W + cap + 4}" fill="${T.card}"/>`
      body += `<g transform="translate(${x},${y})">${picture(p, T, r.W, opts).replace('<svg ', '<svg x="0" y="0" ')}</g>`
      body += `<text x="${x}" y="${y + r.W + 14}" font-family="sans-serif" font-size="12" fill="${T.fg}">${esc(p.title)}${p.status ? ' · ' + p.status + (p.name ? ' ' + p.name : '') : ''}${p.colours ? (p.ok ? ' · rule OK' : ' · rule fails') : ''}</text>`
      body += `<text x="${x}" y="${y + r.W + 28}" font-family="sans-serif" font-size="10" fill="${T.muted}">${r.W}px (${r.wk}, ${r.t}) · gap ${m.gapPx[2]}px · clear ${m.clearPx[2]}px · edge ${m.roomPx}px · extra ${p.m.unexpectedIntersections}</text>`
    })
    y += r.W + cap + pad
  }
  writeFileSync(join(OUT, name), `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#888"/>${body}</svg>\n`)
}
sheet('brief1-draw-a-table-knot.svg', pics.filter((p) => p.brief == 1), { hits: true })
sheet('brief2-tricolour-3_1.svg', pics.filter((p) => p.brief == 2 && p.id.startsWith('3_1')))
sheet('brief2-tricolour-4_1.svg', pics.filter((p) => p.brief == 2 && p.id.startsWith('4_1')))
sheet('brief3-unknot-game-3_1.svg', pics.filter((p) => p.brief == 3 && p.id.startsWith('3_1')), { hits: true })
sheet('brief3-unknot-game-4_1.svg', pics.filter((p) => p.brief == 3 && p.id.startsWith('4_1')), { hits: true })
sheet('brief4-left-or-right.svg', pics.filter((p) => p.brief == 4), { hits: true })
sheet('note1-draw-a-table-knot-switches.svg', pics.filter((p) => p.brief == '1n'), { hits: true })
sheet('note2-tricolour-qa-path.svg', pics.filter((p) => p.brief == '2n'))
sheet('note3-unknot-game-tint.svg', pics.filter((p) => p.brief == '3n'))
sheet('note4-left-or-right-card.svg', pics.filter((p) => p.brief == '4c' || p.brief == '4h'))

// ---------- metrics ----------
const metrics = {
  generated: 'node company/design/reviews/2026-10-16-knots-batch1-contact-sheet/sheet.mjs',
  conditions: 'draw(pd, { layout: layout(entry.pd) }) at default size 100, margin 8, gap, relax; viewBox -8 -8 116 116',
  selfTest, cardCheck, gapProbe, arcLengthPx290: arcLen, widths: WIDTHS, hitRadiusPx: HIT_R, strokeWidthsUnits: SW, contrast: contrastTable,
  pictures: pics.map(({ brief, id, title, m, phone, status, name, colours, ok, okCrossings, tricolourCensus, tint, sx }) => ({ brief, id, title, status, name, colours, ok, okCrossings, tricolourCensus, tint, sx, ...m, phone })),
}
writeFileSync(join(OUT, 'metrics.json'), JSON.stringify(metrics, null, 1) + '\n')

// ---------- summary ----------
const f = (v) => String(v).padStart(6)
console.log('self-test', JSON.stringify(selfTest))
console.log('brief id                 X  int  ≤3%  gapCL  3rd   clear  arm6  arm10  room  pair | 290: gap@2 clear@2 edge pair | 260: gap@2 edge pair')
for (const p of pics) {
  const a = p.phone['v360-card'], b = p.phone['short-phone']
  console.log(`${p.brief}  ${p.id.padEnd(20)} ${p.m.crossings} ${f(p.m.unexpectedIntersections)} ${f(p.m.hiddenWithin3)} ${f(p.m.minCentreLineGap)} ${f(p.m.minThirdStrandToCrossing)} ${f(p.m.minClearance)} ${f(p.m.minArmAngle6)} ${f(p.m.minArmAngle10)} ${f(p.m.roomToViewBoxEdge)} ${f(p.m.closestCrossingPair)} | ${f(a.gapPx[2])} ${f(a.clearPx[2])} ${f(a.roomPx)} ${f(a.pairPx)} | ${f(b.gapPx[2])} ${f(b.roomPx)} ${f(b.pairPx)}`)
}
console.log('gap probe', JSON.stringify(gapProbe, null, 0))
console.log('arc lengths px@290', JSON.stringify(arcLen))
console.log('card check', JSON.stringify(cardCheck))
console.log('contrast on --bg-3', JSON.stringify(contrastTable))
