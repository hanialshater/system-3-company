// Mockup renderer for company/design/specs/unknot-game.md and company/design/specs/left-or-right.md (W-1568; design-review
// changes U-1, U-2, L-1 to L-6 folded in by W-1584: company/design/reviews/2026-10-16-knots-specs-review.md).
// Run from the repo root: node company/design/specs/knots-batch1-mockups.mjs
// Writes unknot-game.svg and left-or-right.svg beside this file, and prints the facts the specs quote.
// Mockup only, not lesson code. Every knot picture is the shipped kit's draw() of a table knot, its mirror, or a
// crossingChange of the knot, on the entry's stored layout, default size and margin. Scaling and padding are done by
// the nested <svg> viewBox (-8 -8 116 116, K13). turnOver(pd) is used for numbers only and never drawn. The flip frames
// are drawn as SVG transforms of those cleared drawings (horizontal squeeze by |cos θ|, and the back face authored
// already reflected: principal-engineer ruling C1, company/engineering/reviews/2026-10-16-knots-left-or-right-card.md).
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as K from '../../../src/kit/knots/index.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const T = {
  dark: { name: 'dark', bg: '#0d0f14', bg2: '#161a22', bg3: '#1f2430', fg: '#eef1f7', muted: '#9aa3b5', line: '#2b3140', domain: '#7c9cff', good: '#4fd1a5', goodFill: '#4fd1a5', tint: '#7c9cff', chipInk: '#0d0f14' },
  light: { name: 'light', bg: '#f6f7fb', bg2: '#ffffff', bg3: '#eceff6', fg: '#141824', muted: '#5d6578', line: '#d9dde8', domain: '#7c9cff', good: '#09704d', goodFill: '#4fd1a5', tint: '#576db3', chipInk: '#0d0f14' },
}
const STROKE = 2, TINT = 3 // view-box units of 100, butt caps (design-lead S2 and the unknot-game tint condition: company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md)
const VB = [-8, -8, 116, 116]
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const text = (x, y, s, { size = 13, fill, weight = 400, anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`

const entries = {}
for (const n of ['3_1', '4_1']) { const pd = K.knot(n).pd; entries[n] = { pd, L: K.layout(pd) } }
const drawOf = (pd, L) => K.draw(pd, { layout: L, gap: 0.5 }) // S1: gap 0.5, default size and margin: never pass size, margin or relax
const facts = []

// ---------- unknot-game ----------
// The tint: first R2 in moves() of the switched diagram; its two edges are one bigon. The edge in slot 1 or 3 (over) of
// the PD tuple at both of the R2's crossings is the strand on top twice; it gets the tint. Read only: apply() is never called.
function tintFor(n, i) {
  const q = K.crossingChange(entries[n].pd, i)
  const r2 = K.moves(q).filter((m) => m.type === 'R2')
  if (!r2.length) return null
  const m = r2[0]
  const role = (e) => m.crossings.map((c) => { const k = q[c].indexOf(e); return k === 1 || k === 3 ? 'O' : 'U' }).join('')
  const over = m.edges.find((e) => role(e) === 'OO'), under = m.edges.find((e) => role(e) === 'UU')
  return { q, m, over, under, includesTapped: m.crossings.includes(i), status: K.simplify(q).status }
}
for (const n of ['3_1', '4_1']) for (let i = 0; i < entries[n].pd.length; i++) {
  const t = tintFor(n, i)
  facts.push(`unknot-game ${n} switch ${i}: status=${t.status} firstR2 crossings=${JSON.stringify(t.m.crossings)} edges=${JSON.stringify(t.m.edges)} over=${t.over} under=${t.under} includesTapped=${t.includesTapped}`)
}

function knotSvg({ x, y, w, n, switched = null, th, tint = true, showButtons = true, locked = false }) {
  const { pd, L } = entries[n]
  const q = switched == null ? pd : K.crossingChange(pd, switched)
  const d = drawOf(q, L)
  const t = switched != null && tint ? tintFor(n, switched) : null
  let s = `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="${VB.join(' ')}">`
  // the tinted strand: the R2 edge that is over at both crossings, drawn in the tint colour and 3 units wide; every other edge --fg, 2 units
  for (const e of d.edges) {
    const on = t && e.label === t.over
    s += `<path d="${e.d}" fill="none" stroke="${on ? th.tint : th.fg}" stroke-width="${on ? TINT : STROKE}" stroke-linecap="butt"/>`
  }
  if (showButtons) {
    const r = 22 * 116 / w // 44 px hit circle in view-box units
    for (const c of d.crossings) {
      const on = c.i === switched
      s += `<circle cx="${c.x}" cy="${c.y}" r="${r.toFixed(2)}" fill="none" stroke="${on ? th.fg : th.line}" stroke-width="${on ? 0.7 : 0.45}" ${locked ? 'stroke-dasharray="1.2 1.2"' : ''}/>`
    }
  }
  return s + '</svg>'
}

function tallyRow(x, y, label, filled, total, th) {
  let s = text(x, y, label, { size: 12, fill: th.fg })
  for (let i = 0; i < total; i++) {
    const cx = x + 96 + i * 18, on = filled.includes(i)
    s += on ? `<circle cx="${cx}" cy="${y - 4}" r="6" fill="${th.goodFill}"/><path d="M${cx - 3} ${y - 4} l2 2.4 l4 -4.8" fill="none" stroke="${th.chipInk}" stroke-width="1.6"/>`
      : `<circle cx="${cx}" cy="${y - 4}" r="5.5" fill="none" stroke="${th.muted}" stroke-width="1.4"/>`
  }
  return s + text(x + 96 + 4 * 18 + 4, y, `${filled.length} of ${total}`, { size: 12, fill: th.fg, weight: 700 })
}
// U-1: the current chip is disabled (QA and keyboard) but drawn selected (kit .control.active, opacity 1), never greyed.
// Only a disabled control that is not selected (Reset with nothing switched, everything during predict) is greyed.
function button(x, y, w, label, th, { kind = 'control', on = false, disabled = false } = {}) {
  const sel = kind === 'chip' && on
  const active = kind === 'control' && on // a pressed toggle: kit .control.active (domain border, 25 % domain fill)
  const mix = (a, b, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * t + parseInt(b.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('')
  const fill = sel ? th.domain : active ? mix(th.domain, th.bg2, 0.25) : th.bg2
  const ink = sel ? th.chipInk : th.fg
  return `<rect x="${x}" y="${y}" width="${w}" height="44" rx="22" fill="${fill}" stroke="${active ? th.domain : th.line}" ${disabled && !sel ? 'opacity="0.55"' : ''}/>` +
    text(x + w / 2, y + 27, label, { size: 13, fill: ink, anchor: 'middle', weight: kind === 'chip' && on ? 700 : 400 })
}

function unknotFrame({ ox, oy, title, note, n, switched, tally, th, locked = false, resetOn }) {
  const W = 390, H = 640
  let s = `<g transform="translate(${ox},${oy})">`
  s += text(0, -26, title, { size: 14, fill: '#141824', weight: 700 }) + text(0, -10, note, { size: 11, fill: '#5d6578' })
  s += `<rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="${th.bg3}" stroke="${th.line}"/>`
  const st = switched == null ? 'minimal' : K.simplify(K.crossingChange(entries[n].pd, switched)).status
  // readout (role=status, aria-live=polite)
  if (st === 'unknot') s += `<circle cx="26" cy="30" r="9" fill="${th.goodFill}"/><path d="M21.5 30 l3 3.4 l6 -7" fill="none" stroke="${th.chipInk}" stroke-width="2"/>` + text(42, 35, 'Plain loop', { size: 15, fill: th.fg, weight: 700 })
  else s += text(16, 35, 'Still a knot', { size: 15, fill: th.fg, weight: 700 })
  s += knotSvg({ x: 35, y: 60, w: 320, n, switched, th, locked })
  // caption, space reserved always
  if (st === 'unknot') s += `<rect x="16" y="420" width="18" height="8" rx="4" fill="${th.tint}"/>` + text(42, 428, 'On top twice: it slides off', { size: 13, fill: th.fg })
  // tally (hidden in predict)
  if (!locked) {
    s += text(16, 462, 'Freed by one switch', { size: 12, fill: th.muted })
    s += tallyRow(16, 488, 'Trefoil', tally['3_1'], 3, th)
    s += tallyRow(16, 512, 'Figure-eight', tally['4_1'], 4, th)
  }
  s += button(16, 560, 100, 'Reset', th, { disabled: locked || !resetOn })
  s += button(130, 560, 110, 'Trefoil', th, { kind: 'chip', on: n === '3_1', disabled: locked })
  s += button(250, 560, 124, 'Figure-eight', th, { kind: 'chip', on: n === '4_1', disabled: locked })
  return s + '</g>'
}

{
  const frames = [
    { title: '1. Predict (locked)', note: 'buttons dashed and disabled; tally and caption hidden', n: '3_1', switched: null, tally: { '3_1': [], '4_1': [] }, locked: true },
    { title: '2. First tap: crossing 1', note: 'firstFree; tint on the over-at-both edge of the first R2', n: '3_1', switched: 0, tally: { '3_1': [0], '4_1': [] }, resetOn: true },
    { title: '3. Third tap: crossing 3', note: 'crossing 2 restored first; allThree', n: '3_1', switched: 2, tally: { '3_1': [0, 1, 2], '4_1': [] }, resetOn: true },
    { title: '4. Figure-eight, top-left crossing', note: 'optional; 1 R2 per switch on 4_1', n: '4_1', switched: 1, tally: { '3_1': [0, 1, 2], '4_1': [1] }, resetOn: true },
    { title: '5. End of QA path (reveal opens here)', note: 'Reset, then Figure-eight chip; tally kept', n: '4_1', switched: null, tally: { '3_1': [0, 1, 2], '4_1': [] }, resetOn: false },
  ]
  const rows = [['dark', [0, 1, 2, 3, 4]], ['light', [1, 2, 3, 4]]]
  let body = '', y = 60
  for (const [tn, idx] of rows) {
    body += text(0, y - 40, `Theme: ${tn}`, { size: 16, fill: '#141824', weight: 700 })
    idx.forEach((k, j) => { body += unknotFrame({ ...frames[k], ox: j * 420, oy: y, th: T[tn] }) })
    y += 720
  }
  // detail: the three single switches on 3_1 and the four on 4_1, tint only (light theme, small)
  body += text(0, y - 40, 'Every single switch (light theme): the tinted strand always ends at the tapped crossing (outlined)', { size: 16, fill: '#141824', weight: 700 })
  let x = 0
  for (const n of ['3_1', '4_1']) for (let i = 0; i < entries[n].pd.length; i++) {
    body += `<rect x="${x}" y="${y}" width="200" height="200" rx="12" fill="${T.light.bg2}" stroke="${T.light.line}"/>` + knotSvg({ x: x + 10, y: y + 10, w: 180, n, switched: i, th: T.light })
    body += text(x, y + 218, `${n === '3_1' ? 'Trefoil' : 'Figure-eight'} crossing ${i + 1}`, { size: 11, fill: '#5d6578' })
    x += 215
  }
  y += 250
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -10 2140 ${y + 10}" font-family="system-ui, sans-serif"><rect x="-20" y="-10" width="2140" height="${y + 20}" fill="#fff"/><!-- Mockup for company/design/specs/unknot-game.md. Rendered by knots-batch1-mockups.mjs with the shipped kit. Not a visual design: tokens are the visual designer's. -->${body}</svg>`
  writeFileSync(join(here, 'unknot-game.svg'), svg)
}

// ---------- left-or-right ----------
// Marks are drawn outside the transformed picture, at the on-screen position of their crossing: on a ring of radius 13
// around it (L-1; was 10), at the angle where the badge is farthest from every strand (32 angles, ties to the lowest),
// centre inside -3..103. Placement is computed on screen coordinates, so it is redone for each rest state.
// Gap printed = badge-centre clearance - badge radius 4.6 - badge ring half-width 0.25 - strand half-width 1; floor 2.0.
const RING_R = 13, BADGE_R = 4.6, BADGE_RING = 0.5, GAP_FLOOR = 2.0
const sampleEdge = (d) => {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number) // "Mx yCx1 y1 x2 y2 x y": one cubic per edge
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n, pts = []
  for (let i = 0; i <= 200; i++) {
    const t = i / 200, u = 1 - t
    pts.push([u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3, u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3])
  }
  return pts
}
const markClear = []
function marks(cr, signsArr, mapX, mapY, th, edges, where) {
  const strand = edges.flatMap((e) => sampleEdge(e.d)).map(([x, y]) => [mapX(x, y), mapY(x, y)])
  let s = ''
  cr.forEach((c, k) => {
    const X = mapX(c.x, c.y), Y = mapY(c.x, c.y)
    let best = null
    for (let a = 0; a < 32; a++) {
      const bx = X + RING_R * Math.cos(a * Math.PI / 16), by = Y + RING_R * Math.sin(a * Math.PI / 16)
      if (bx < -3 || bx > 103 || by < -3 || by > 103) continue
      const clear = Math.min(...strand.map(([x, y]) => Math.hypot(x - bx, y - by)))
      if (!best || clear > best.clear) best = { bx, by, clear }
    }
    const { bx, by } = best
    markClear.push({ gap: best.clear - BADGE_R - BADGE_RING / 2 - STROKE / 2, where: `${where} crossing ${k} at (${X.toFixed(1)}, ${Y.toFixed(1)})` })
    const plus = signsArr[k] > 0
    s += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${BADGE_R}" fill="${th.bg2}" stroke="${th.fg}" stroke-width="${BADGE_RING}"/>`
    s += `<text x="${bx.toFixed(1)}" y="${(by + 2.4).toFixed(1)}" font-size="7" font-weight="700" text-anchor="middle" fill="${th.fg}">${plus ? '+' : '−'}</text>`
  })
  return s
}
// one picture: face content (front = draw(pd or mirror), back = draw(mirror of the front content) authored reflected),
// at card angle theta (degrees, orthographic squeeze), optional in-plane rotation (version A "Turn it round") and
// optional outer scaleX(-1) (version B2 Mirror).
function lrPicture({ x, y, w, n, mirrored = false, theta = 0, rot = 0, outerMirror = false, th, showMarks = true, opacity = 1 }) {
  const { pd, L } = entries[n]
  const frontPd = mirrored ? K.mirror(pd) : pd
  const backPd = K.mirror(frontPd) // the back face content: the front's mirror, authored reflected (C1)
  const back = theta > 90
  const c = Math.cos(theta * Math.PI / 180)
  const d = drawOf(back ? backPd : frontPd, L)
  // composed x map for the visible face, about the box centre 50: front x' = 50 + (x-50)c ; back authored reflected (100-x), then rotated: 50 + (50-x)... with c<0 gives 50 + (x-50)|c|... keep exact: back x' = 50 + ((100 - x) - 50) * (-c)
  const faceX = back ? (px) => 50 + ((100 - px) - 50) * (-c) : (px) => 50 + (px - 50) * c
  const outX = (px) => (outerMirror ? 100 - px : px)
  const rotX = (px, py) => (rot ? 100 - px : px), rotY = (px, py) => (rot ? 100 - py : py)
  const mapX = (px, py) => rotX(outX(faceX(px)), py), mapY = (px, py) => rotY(outX(faceX(px)), py)
  // the same thing as SVG transforms (what the browser composes): outer rotate(180) about centre, outer scaleX(-1), card squeeze, back face's own reflection
  const tRot = rot ? 'rotate(180 50 50)' : ''
  const tOut = outerMirror ? 'translate(100 0) scale(-1 1)' : ''
  const sq = Math.max(Math.abs(c), 0.001)
  const tCard = `translate(50 0) scale(${sq.toFixed(4)} 1) translate(-50 0)`
  const tBack = back ? 'translate(100 0) scale(-1 1)' : ''
  let s = `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="${VB.join(' ')}"><g opacity="${opacity}" transform="${tRot} ${tOut} ${tCard} ${tBack}">`
  for (const e of d.edges) s += `<path d="${e.d}" fill="none" stroke="${th.fg}" stroke-width="${STROKE}" stroke-linecap="butt"/>`
  s += '</g>'
  // logical diagram on screen (C2): front: frontPd; turned: turnOver(frontPd); outer mirror reflects again (signs negate)
  let sg = back ? K.signs(K.turnOver(frontPd)) : K.signs(frontPd)
  if (outerMirror) sg = sg.map((v) => -v)
  if (showMarks && (theta === 0 || theta === 180)) s += marks(d.crossings, sg, mapX, mapY, th, d.edges, `${n}${mirrored ? ' B1-mirrored' : ''}${outerMirror ? ' mirrored' : ''}${theta === 180 ? ' turned' : ' front'}${rot ? ' rotated' : ''}`)
  return { svg: s + '</svg>', signs: sg, sum: sg.reduce((a, b) => a + b, 0) }
}
// C1 check in numbers: after the flip, an off-centre crossing's x equals 100 - its front x (view-box units).
for (const n of ['3_1', '4_1']) {
  const { pd, L } = entries[n]
  const f = drawOf(pd, L).crossings[0], b = drawOf(K.mirror(pd), L).crossings[0]
  const backScreenX = 50 + ((100 - b.x) - 50) * 1 // theta = 180, -cos = 1
  facts.push(`left-or-right ${n} C1: crossing 0 front x=${f.x.toFixed(1)} -> turned-over screen x=${backScreenX.toFixed(1)} (100 - front = ${(100 - f.x).toFixed(1)})`)
  facts.push(`left-or-right ${n} signs: front ${JSON.stringify(K.signs(pd))} turnOver ${JSON.stringify(K.signs(K.turnOver(pd)))} mirror ${JSON.stringify(K.signs(K.mirror(pd)))} turnOver(mirror) ${JSON.stringify(K.signs(K.turnOver(K.mirror(pd))))}`)
}

function lrCard({ ox, oy, title, note, n, th, version, mirrored = false, theta = 0, rot = 0, outerMirror = false, caption = null, seen = null, flipLabel, turnedOn = false, mirrorOn = false, dip = 1, keepSum = null }) {
  const W = 390, H = 600
  const p = lrPicture({ x: 35, y: 84, w: 320, n, mirrored, theta, rot, outerMirror, th, opacity: dip, showMarks: dip === 1 })
  let s = `<g transform="translate(${ox},${oy})">`
  s += text(0, -26, title, { size: 14, fill: '#141824', weight: 700 }) + text(0, -10, note, { size: 11, fill: '#5d6578' })
  s += `<rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="${th.bg3}" stroke="${th.line}"/>`
  // L-4: the readout never blanks. Mid-flip it keeps the last rest value (for Turn over it is the same value, K4),
  // so the sum shown mid-flip is the front's, which p.sum equals at every angle.
  const sum = keepSum ?? p.sum // mid-dip the readout keeps the last rest value (L-4)
  const sumTxt = `Sum ${sum > 0 ? '+' : sum < 0 ? '−' : ''}${Math.abs(sum)}`
  const hand = sum < 0 ? 'Left-handed' : sum > 0 ? 'Right-handed' : ''
  s += text(16, 34, sumTxt, { size: 15, fill: th.fg, weight: 700 }) + text(110, 34, hand, { size: 15, fill: th.fg })
  if (seen) s += text(16, 58, seen, { size: 12, fill: th.muted })
  s += p.svg
  if (caption) s += text(16, 452, caption, { size: 13, fill: th.fg })
  // L-6: Turn over and Mirror are toggles with aria-pressed; drawn in the kit's active style while pressed
  const labels = version === 'A' ? ['Turned over?', 'Mirror'] : [flipLabel || 'Turn over', 'Mirror']
  const pressed = version === 'A' ? [!!caption, mirrored] : [turnedOn, mirrorOn]
  let bx = 16
  const bw = [150, 150]
  labels.forEach((l, k) => { s += button(bx, 480, bw[k], l, th, { on: pressed[k] }); bx += bw[k] + 8 })
  s += button(16, 536, 170, 'Trefoil', th, { kind: 'chip', on: n === '3_1', disabled: n === '3_1' }) + button(194, 536, 180, 'Figure-eight', th, { kind: 'chip', on: n === '4_1', disabled: n === '4_1' })
  return s + '</g>'
}

{
  let body = '', y = 70
  const row = (label, cards, th) => {
    body += text(0, y - 46, label, { size: 16, fill: '#141824', weight: 700 })
    cards.forEach((c, j) => { body += lrCard({ ...c, ox: j * 420, oy: y, th }) })
    y += 690
  }
  const capA = 'Turned over in your hands: same knot, same marks.' // version A only (fallback, W-1581 ruling 5)
  const S1 = 'Trefoil: turned over −3', S2 = 'Trefoil: turned over −3 · mirror +3' // seen line, W-1581 ruling 4
  for (const tn of ['dark', 'light']) {
    const th = T[tn]
    row(`B2 (the build): the QA path, each control once · ${tn}`, [
      { title: '1. Trefoil, after predict', note: 'front; seen line empty (space reserved)', n: '3_1', version: 'B' },
      { title: '2. Turn over, at rest', note: 'turned: marks −,−,−, unchanged; seen line written', n: '3_1', version: 'B', theta: 180, seen: S1, turnedOn: true },
      { title: '3. Mirror, mid-dip (100 ms)', note: 'L-2: wrapper at opacity 0, transform set now; readout kept (L-4)', n: '3_1', version: 'B', theta: 180, seen: S1, turnedOn: true, mirrorOn: true, dip: 0, keepSum: -3 },
      { title: '4. Mirror, at rest', note: 'mirrored + turned: marks +,+,+; seen line extended', n: '3_1', version: 'B', theta: 180, outerMirror: true, seen: S2, turnedOn: true, mirrorOn: true },
      { title: '5. Figure-eight chip (reveal opens)', note: 'front, unmirrored, Sum 0, no name; seen line kept', n: '4_1', version: 'B', seen: S2 },
    ], th)
    for (const n of ['3_1', '4_1']) {
      row(`B2 Turn over frames, ${n === '3_1' ? 'trefoil' : 'figure-eight'} (orthographic; marks hidden mid-flip, readout kept) · ${tn}`, [
        { title: 'B 0° front', note: 'draw(pd), stored layout', n, version: 'B', seen: n === '3_1' ? null : S2 },
        { title: 'B 60°', note: 'marks hidden (L-3); readout kept (L-4)', n, version: 'B', theta: 60, turnedOn: true, seen: n === '3_1' ? null : S2 },
        { title: 'B 90° (edge-on)', note: 'a line; no diagram', n, version: 'B', theta: 89.5, turnedOn: true, seen: n === '3_1' ? null : S2 },
        { title: 'B 120°', note: 'back face, authored reflected (PE-C1)', n, version: 'B', theta: 120, turnedOn: true, seen: n === '3_1' ? null : S2 },
        { title: 'B 180° turned over', note: 'reflected mirror drawing = turned over; marks = signs(turnOver)', n, version: 'B', theta: 180, seen: n === '3_1' ? S1 : S2, turnedOn: true },
      ], th)
    }
    row(`B2 figure-eight, all four rest states (badge ring 13; tightest badge is crossing 0, the right-hand beak) · ${tn}`, [
      { title: 'front', note: 'signs −,+,−,+', n: '4_1', version: 'B', seen: S2 },
      { title: 'turned', note: 'beak at x 3.6', n: '4_1', version: 'B', theta: 180, seen: S2, turnedOn: true },
      { title: 'mirrored (eightMirror)', note: 'signs +,−,+,−; Sum 0', n: '4_1', version: 'B', outerMirror: true, seen: S2, mirrorOn: true },
      { title: 'mirrored + turned', note: 'beak at x 96.4; gap 2.43 units (floor 2.0)', n: '4_1', version: 'B', theta: 180, outerMirror: true, seen: S2, turnedOn: true, mirrorOn: true },
    ], th)
    row(`Not the build: fallbacks and the forbidden frame · ${tn}`, [
      { title: 'B1 fallback: Mirror in place, front', note: 'faces swap content; only if the B2 wrapper check fails', n: '3_1', version: 'B', mirrored: true, seen: S2, mirrorOn: true },
      { title: 'B1 fallback: in place, turned over', note: 'turnOver(mirror(pd)) on screen: signs +', n: '3_1', version: 'B', mirrored: true, theta: 180, seen: S2, turnedOn: true, mirrorOn: true },
      { title: 'A fallback: Turned over?', note: 'caption only; picture and marks unchanged', n: '3_1', version: 'A', caption: capA, seen: S1 },
      { title: 'A fallback: Mirror', note: 'every gap moves to the other strand; curve fixed', n: '3_1', version: 'A', mirrored: true, seen: S2 },
      { title: 'NEVER: back face counter-rotated', note: 'draw(mirror(pd)) as authored = mirror knot labelled turned over (K17 false)', n: '3_1', version: 'B', mirrored: true, seen: 'WRONG: this is the mirror' },
    ], th)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -10 2140 ${y}" font-family="system-ui, sans-serif"><rect x="-20" y="-10" width="2140" height="${y + 10}" fill="#fff"/><!-- Mockup for company/design/specs/left-or-right.md. Rendered by knots-batch1-mockups.mjs with the shipped kit. Not a visual design. -->${body}</svg>`
  writeFileSync(join(here, 'left-or-right.svg'), svg)
}
{
  const worst = markClear.reduce((a, b) => (b.gap < a.gap ? b : a))
  facts.push(`left-or-right marks (ring radius ${RING_R}): smallest badge-edge to strand-edge gap over all drawn rest states = ${worst.gap.toFixed(2)} units = ${(worst.gap * 290 / 116).toFixed(1)} px at 290, ${(worst.gap * 260 / 116).toFixed(1)} px at 260 (${worst.where}); floor ${GAP_FLOOR}: ${worst.gap >= GAP_FLOOR ? 'PASS' : 'FAIL'}`)
}
for (const f of facts) console.log(f)
