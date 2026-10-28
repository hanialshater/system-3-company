// Mockup renderer and number check for company/design/specs/flatten-the-cube-to-a-dot.md (W-2042, lane M, EDD-006).
// Run from the repo root: node company/design/specs/flatten-the-cube-to-a-dot-mockup.mjs
// Writes flatten-the-cube-to-a-dot.svg beside this file and prints the counts the spec quotes. It throws if the
// spec's removal order ever stops keeping corners - edges + regions at 1, or stops ending on one dot.
// Mockup only, not lesson code: geometry and colours are the spec's, the look is the kit's at sketch fidelity.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const T = {
  dark: { bg: '#0d0f14', bg2: '#161a22', bg3: '#1f2430', fg: '#eef1f7', muted: '#9aa3b5', line: '#2b3140', domain: '#7c9cff', good: '#4fd1a5', warn: '#f6c453', ink: '#0d0f14' },
  light: { bg: '#f6f7fb', bg2: '#ffffff', bg3: '#eceff6', fg: '#141824', muted: '#5d6578', line: '#d9dde8', domain: '#7c9cff', good: '#09704d', warn: '#7d5200', ink: '#0d0f14' },
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const txt = (x, y, s, { size = 13, fill, weight = 400, anchor = 'start', mono = false } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}"${mono ? ' font-variant-numeric="tabular-nums"' : ''}>${esc(s)}</text>`
const facts = []

// ---------- 1. the solid (sub-card 1 and the start of sub-card 2) ----------
// Oblique view, viewBox 0 0 300 170. Front face z = 0, back face z = 1 drawn up and to the right.
const S = 104, OX = 74, OY = 152
const P = ([x, y, z]) => [OX + S * x + 0.45 * S * z, OY - S * y - 0.32 * S * z]
const CUBE = []
for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) CUBE.push([x, y, z])
const cubeEdges = []
for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) {
  const d = CUBE[i].reduce((a, v, k) => a + Math.abs(v - CUBE[j][k]), 0)
  if (d === 1) cubeEdges.push([i, j])
}
const HIDDEN = CUBE.findIndex(([x, y, z]) => x === 0 && y === 0 && z === 1) // back-bottom-left: its 3 edges dashed
const CUT = CUBE.findIndex(([x, y, z]) => x === 1 && y === 1 && z === 0) // front-top-right: the sliced corner
const t = 0.34
function solid({ sliced }) {
  const V = CUBE.map((v, i) => ({ i, p: P(v), cut: i === CUT }))
  const cutPts = []
  const E = []
  for (const [a, b] of cubeEdges) {
    if (sliced && (a === CUT || b === CUT)) {
      const o = a === CUT ? b : a
      const q = CUBE[CUT].map((v, k) => v + (CUBE[o][k] - v) * t)
      cutPts.push(q)
      E.push({ a: P(CUBE[o]), b: P(q), hidden: false })
    } else E.push({ a: P(CUBE[a]), b: P(CUBE[b]), hidden: a === HIDDEN || b === HIDDEN })
  }
  const tri = cutPts.map(P)
  if (sliced) for (let k = 0; k < 3; k++) E.push({ a: tri[k], b: tri[(k + 1) % 3], hidden: false, isNew: true })
  const corners = V.filter((v) => !(sliced && v.cut)).map((v) => ({ p: v.p, hidden: v.i === HIDDEN })).concat(tri.map((p) => ({ p, hidden: false, isNew: true })))
  return { E, corners, tri, nV: corners.length, nE: E.length, nF: sliced ? 7 : 6 }
}
const s0 = solid({ sliced: false }), s1 = solid({ sliced: true })
if (s0.nV - s0.nE + s0.nF !== 2 || s1.nV - s1.nE + s1.nF !== 2) throw new Error('solid counts')
facts.push(`cube ${s0.nV} - ${s0.nE} + ${s0.nF} = ${s0.nV - s0.nE + s0.nF}; sliced ${s1.nV} - ${s1.nE} + ${s1.nF} = ${s1.nV - s1.nE + s1.nF} (claims c1, c2)`)

function solidSvg(sol, th, { topLifted = false } = {}) {
  let s = ''
  if (topLifted) { // the top face lifted and fading (sub-card 2, mid-animation sketch)
    const top = CUBE.map((v, i) => [v, i]).filter(([v]) => v[1] === 1).map(([v]) => P(v)).map(([x, y]) => [x, y - 22])
    const ord = [top[0], top[2], top[3], top[1]]
    s += `<polygon points="${ord.map((p) => p.join(',')).join(' ')}" fill="${th.domain}" fill-opacity="0.22" stroke="${th.domain}" stroke-dasharray="3 3"/>`
  }
  if (sol.tri.length) s += `<polygon points="${sol.tri.map((p) => p.join(',')).join(' ')}" fill="${th.warn}" fill-opacity="0.45"/>`
  for (const e of sol.E) s += `<line x1="${e.a[0]}" y1="${e.a[1]}" x2="${e.b[0]}" y2="${e.b[1]}" stroke="${e.isNew ? th.warn : th.fg}" stroke-width="2" ${e.hidden ? 'stroke-dasharray="4 4" stroke-opacity="0.6"' : ''}/>`
  for (const c of sol.corners) s += `<circle cx="${c.p[0]}" cy="${c.p[1]}" r="3.6" fill="${c.isNew ? th.warn : th.fg}" ${c.hidden ? 'fill-opacity="0.5"' : ''}/>`
  return s
}

// ---------- 2. the flat drawing (sub-cards 2 and 3) ----------
// Vertices 0-3: the top face's rim, now the outer square (cyclic order). 4-7: the bottom face, the inner square.
// Spokes i-(i+4) are the cube's 4 upright edges. Bounded regions: the inner square (bottom face) and 4 trapezoids
// (the side faces). The outside is where the top face was.
const FP = { 0: [60, 8], 1: [240, 8], 2: [240, 166], 3: [60, 166], 4: [116, 52], 5: [184, 52], 6: [184, 122], 7: [116, 122] }
const key = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`)
const ALL_E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
const REGIONS = [{ id: 'bottom', poly: [4, 5, 6, 7] }]
for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; REGIONS.push({ id: `side${i}`, poly: [i, j, j + 4, i + 4] }) }
for (const r of REGIONS) r.edges = new Set(r.poly.map((v, k) => key(v, r.poly[(k + 1) % r.poly.length])))
// The spec's order (section "Removal order"): a corner goes on the 3rd press, so one or two hand presses show both kinds.
const ORDER = [[0, 1], [3, 0], [0, 4], [1, 2], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7], [7, 4]]
if (ORDER.length !== 12 || new Set(ORDER.map(([a, b]) => key(a, b))).size !== 12) throw new Error('order must be the 12 edges once each')
function run() {
  let V = new Set([0, 1, 2, 3, 4, 5, 6, 7]), E = ALL_E.map(([a, b]) => key(a, b)), R = REGIONS.map((r) => r.id)
  const states = [{ V: new Set(V), E: [...E], R: [...R], step: null }]
  for (const [a, b] of ORDER) {
    const k = key(a, b)
    E = E.filter((e) => e !== k)
    const touching = R.filter((id) => REGIONS.find((r) => r.id === id).edges.has(k))
    let kind, gone
    if (touching.length === 1) { kind = 'region'; gone = touching[0]; R = R.filter((id) => id !== gone) }
    else if (touching.length === 0) {
      const deg = (v) => E.filter((e) => e.split('-').map(Number).includes(v)).length
      const loose = [a, b].filter((v) => deg(v) === 0)
      if (!loose.length) throw new Error(`edge ${k} is a bridge with no loose end`)
      kind = 'corner'; gone = loose[0]; V.delete(gone)
    } else throw new Error(`edge ${k} separates two regions: the order must not merge regions`)
    states.push({ V: new Set(V), E: [...E], R: [...R], step: { edge: k, a, b, kind, gone } })
  }
  return states
}
const ST = run()
for (const [n, st] of ST.entries()) {
  const total = st.V.size - st.E.length + st.R.length
  if (total !== 1) throw new Error(`total ${total} after step ${n}`)
  facts.push(`${n === 0 ? 'flat          ' : `remove ${String(n).padStart(2)} ${st.step.edge}`} ${st.step ? st.step.kind.padEnd(6) : '      '} ${st.V.size} - ${st.E.length} + ${st.R.length} = ${total}`)
}
const last = ST[12]
if (last.V.size !== 1 || last.E.length || last.R.length) throw new Error('must end on one dot')
const firstCorner = ST.findIndex((s) => s.step && s.step.kind === 'corner')
facts.push(`regions removed ${ST.filter((s) => s.step?.kind === 'region').length}, corners removed ${ST.filter((s) => s.step?.kind === 'corner').length}; first corner on press ${firstCorner}; the dot left is corner ${[...last.V][0]} (claims c3, c4, c5)`)

function flatSvg(n, th, { tile = true, tileBack = false, flash = true } = {}) {
  const st = ST[n]
  let s = ''
  for (const r of REGIONS) {
    const on = st.R.includes(r.id)
    const justGone = flash && st.step && st.step.kind === 'region' && st.step.gone === r.id
    if (on || justGone) s += `<polygon points="${r.poly.map((v) => FP[v].join(',')).join(' ')}" fill="${justGone ? th.warn : th.domain}" fill-opacity="${justGone ? 0.3 : 0.16}"/>`
  }
  if (flash && st.step) { // the edge just removed, fading (sketch: dashed warn)
    const [a, b] = [FP[st.step.a], FP[st.step.b]]
    s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${th.warn}" stroke-width="2" stroke-dasharray="3 4"/>`
  }
  for (const e of st.E) { const [a, b] = e.split('-').map((v) => FP[v]); s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${th.fg}" stroke-width="2"/>` }
  for (const v of st.V) s += `<circle cx="${FP[v][0]}" cy="${FP[v][1]}" r="${st.V.size === 1 ? 6 : 4}" fill="${th.fg}"/>`
  if (flash && st.step && st.step.kind === 'corner') s += `<circle cx="${FP[st.step.gone][0]}" cy="${FP[st.step.gone][1]}" r="5" fill="none" stroke="${th.warn}" stroke-width="2"/>`
  if (tile) { // the lifted top face, parked top right; at the end it slides beside the dot
    const [x, y] = tileBack ? [FP[[...st.V][0]][0] + 14, FP[[...st.V][0]][1] - 15] : [258, 8]
    s += `<rect x="${x}" y="${y}" width="30" height="30" rx="3" fill="${th.domain}" fill-opacity="0.3" stroke="${th.domain}"/>`
  }
  return s
}

// ---------- 3. kit-like pieces ----------
function chip(x, y, w, label, th, { disabled = false, active = false } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="44" rx="22" fill="${active ? th.domain : th.bg2}" fill-opacity="${active ? 0.25 : 1}" stroke="${active ? th.domain : th.line}" ${disabled && !active ? 'opacity="0.5"' : ''}/>` +
    txt(x + w / 2, y + 27, label, { size: 13, fill: th.fg, anchor: 'middle', weight: active ? 700 : 400 })
}
const TITLES = ['Slice', 'Flatten', 'Shrink']
function trail(x, y, w, th, { current, done, traces, visited }) {
  const cw = (w - 12) / 3
  let s = ''
  for (let i = 0; i < 3; i++) {
    const cx = x + i * (cw + 6)
    const isCur = i === current
    s += `<rect x="${cx}" y="${y}" width="${cw}" height="46" rx="10" fill="${isCur ? th.domain : th.bg2}" fill-opacity="${isCur ? 0.25 : 1}" stroke="${isCur ? th.domain : th.line}" ${!visited.includes(i) ? 'opacity="0.5"' : ''}/>`
    s += txt(cx + cw / 2, y + (done[i] && traces[i] ? 19 : 28), `${i + 1} ${TITLES[i]}${done[i] ? ' ✓' : ''}`, { size: 12.8, fill: th.fg, anchor: 'middle', weight: 700 })
    if (done[i] && traces[i]) s += txt(cx + cw / 2, y + 36, traces[i], { size: 12, fill: th.muted, anchor: 'middle', weight: 600 })
  }
  return s
}
// The equation readout: numbers 20 px bold, keys 11 px under each number.
function equation(cx, y, nums, keys, th, { changed = [] } = {}) {
  const parts = [nums[0], '−', nums[1], '+', nums[2], '=', nums[3]]
  const widths = parts.map((p) => (/\d/.test(String(p)) ? 14 + 12 * String(p).length : 18))
  const W = widths.reduce((a, b) => a + b, 0)
  let x = cx - W / 2, s = '', ni = 0
  parts.forEach((p, k) => {
    const isNum = k % 2 === 0
    const hot = isNum && changed.includes(ni)
    s += txt(x + widths[k] / 2, y, p, { size: 20, weight: 800, fill: hot ? th.warn : th.fg, anchor: 'middle', mono: true })
    if (isNum && ni < 3) s += txt(x + widths[k] / 2, y + 15, keys[ni], { size: 11, fill: th.muted, anchor: 'middle' })
    if (isNum) ni++
    x += widths[k]
  })
  return s
}
function strip(x, y, w, n, th) { // total after each removal: 12 cells, square = a region went, round = a corner went
  let s = txt(x + w / 2, y, 'total after each removal', { size: 11, fill: th.muted, anchor: 'middle' })
  const cw = 20, gap = 4, W = 12 * cw + 11 * gap
  let cx = x + (w - W) / 2
  for (let k = 1; k <= 12; k++) {
    const st = ST[k]
    const on = k <= n
    if (st.step.kind === 'region') s += `<rect x="${cx}" y="${y + 6}" width="${cw}" height="${cw}" rx="3" fill="${on ? th.bg3 : 'none'}" stroke="${on ? th.domain : th.line}" ${on ? '' : 'stroke-dasharray="2 2"'}/>`
    else s += `<circle cx="${cx + cw / 2}" cy="${y + 6 + cw / 2}" r="${cw / 2}" fill="${on ? th.bg3 : 'none'}" stroke="${on ? th.domain : th.line}" ${on ? '' : 'stroke-dasharray="2 2"'}/>`
    if (on) s += txt(cx + cw / 2, y + 6 + 14.5, '1', { size: 12, weight: 800, fill: th.fg, anchor: 'middle', mono: true })
    cx += cw + gap
  }
  return s
}

// ---------- 4. one sub-card frame (content column only) ----------
// Phone: card padding 16 left, 66 right (feed rail), so the column is 390 - 82 = 308 px (globals.css @media 600px).
// Desktop: card-shell max 480, padding 20, column 440 px; pictures capped at 340 px wide and centred.
function frame({ th, W, card, locked = false, state, picMax = 308 }) {
  let y = 0, s = ''
  const traces = ['10−15+7=2', '8−12+5=1', '1−0+0=1']
  s += trail(0, y, W, th, { current: card, done: state.done, traces: state.done.map((d, i) => (d ? traces[i] : '')), visited: state.visited })
  y += 54
  const pw = Math.min(W, picMax), px = (W - pw) / 2, ph = pw * 174 / 300
  s += `<svg x="${px}" y="${y}" width="${pw}" height="${ph}" viewBox="0 0 300 174">`
  if (card === 0) s += solidSvg(state.sliced ? s1 : s0, th)
  else if (card === 1) s += state.flat ? flatSvg(0, th, { flash: false }) : solidSvg(s0, th, { topLifted: false })
  else s += flatSvg(state.n, th, { tileBack: state.n === 12 })
  s += '</svg>'
  y += ph + 26
  if (card === 0) {
    s += state.sliced ? equation(W / 2, y, [10, 15, 7, 2], ['corners', 'edges', 'faces'], th, { changed: [0, 1, 2] }) : equation(W / 2, y, [8, 12, 6, 2], ['corners', 'edges', 'faces'], th)
    y += 40
    s += txt(W / 2, y, state.sliced ? '+2 corners, +3 edges, +1 face' : '', { size: 13, fill: th.warn, anchor: 'middle', weight: 600 })
    y += 14
    s += chip((W - 150) / 2, y, 150, 'Slice a corner', th, { disabled: locked || state.sliced, active: state.sliced })
    y += 52
    s += chip(W - 140, y, 140, 'Next: Flatten →', th, { disabled: locked })
  } else if (card === 1) {
    s += state.flat ? equation(W / 2, y, [8, 12, 5, 1], ['corners', 'edges', 'regions'], th, { changed: [2, 3] }) : equation(W / 2, y, [8, 12, 6, 2], ['corners', 'edges', 'faces'], th)
    y += 40
    s += txt(W / 2, y, state.flat ? 'top face off: 1 short' : '', { size: 13, fill: th.warn, anchor: 'middle', weight: 600 })
    y += 14
    s += chip((W - 170) / 2, y, 170, 'Take the top off', th, { disabled: state.flat, active: state.flat })
    y += 52
    s += chip(W - 140, y, 140, 'Next: Shrink →', th)
  } else {
    const st = ST[state.n]
    const changed = state.n ? [st.step.kind === 'region' ? 2 : 0, 1] : []
    s += equation(W / 2, y, [st.V.size, st.E.length, st.R.length, 1], ['corners', 'edges', 'regions'], th, { changed })
    y += 40
    s += txt(W / 2, y, state.n ? (st.step.kind === 'region' ? '−1 edge, −1 region' : '−1 edge, −1 corner') : '', { size: 13, fill: th.warn, anchor: 'middle', weight: 600 })
    y += 22
    s += strip(0, y, W, state.n, th)
    y += 50
    s += state.n === 12 ? txt(W / 2, y, '+ the top face = 2', { size: 16, weight: 800, fill: th.good, anchor: 'middle' }) : ''
    y += 12
    const end = state.n === 12
    s += chip(W / 2 - 152, y, 148, 'Remove an edge', th, { disabled: state.locked || end })
    s += chip(W / 2 + 4, y, 148, 'Remove the rest', th, { disabled: state.locked || end || state.n === 0, active: state.rest })
    y += 44
  }
  return { s, h: y + (card === 2 ? 0 : 44) }
}

// ---------- 5. the sheet ----------
const th = T.dark
const PW = 308
const frames = [
  { title: '1. Slice, at predict (locked)', note: 'all controls disabled; no change line', card: 0, locked: true, state: { done: [false, false, false], visited: [0], sliced: false } },
  { title: '2. Slice a corner (slice.done)', note: 'new corner, edges, face in warn; trace 1 shows', card: 0, state: { done: [true, false, false], visited: [0], sliced: true } },
  { title: '3. Take the top off (flatten.done)', note: 'after the 700 ms lift and stretch; tile = top face', card: 1, state: { done: [true, true, false], visited: [0, 1], flat: true } },
  { title: '4. Remove an edge, press 1 (shrink.region)', note: 'a side region opens to the outside', card: 2, state: { done: [true, true, false], visited: [0, 1, 2], n: 1 } },
  { title: '5. Press 3: first corner (shrink.corner)', note: 'a loose end goes with its edge', card: 2, state: { done: [true, true, false], visited: [0, 1, 2], n: 3 } },
  { title: '6. Remove the rest, end (shrink.dot)', note: 'one dot, tile beside it, all 12 cells read 1', card: 2, state: { done: [true, true, true], visited: [0, 1, 2], n: 12, rest: true } },
]
let body = '', X = 20, Y = 76, rowH = 0
const G = 36
for (const [k, f] of frames.entries()) {
  const fr = frame({ th, W: PW, card: f.card, locked: f.locked, state: f.state })
  const fw = 390
  if (k === 3) { X = 20; Y += rowH + 70; rowH = 0 }
  body += txt(X, Y - 18, f.title, { size: 14, fill: th.fg, weight: 700 }) + txt(X, Y - 3, f.note, { size: 11, fill: th.muted })
  body += `<rect x="${X}" y="${Y}" width="${fw}" height="${fr.h + 32}" rx="14" fill="${th.bg}" stroke="${th.line}"/>`
  body += `<rect x="${X + 390 - 58}" y="${Y + 16}" width="44" height="${fr.h}" rx="10" fill="${th.bg2}" opacity="0.5"/>` // the feed rail
  body += `<g transform="translate(${X + 16},${Y + 16})">${fr.s}</g>`
  rowH = Math.max(rowH, fr.h + 32)
  X += fw + G
}
Y += rowH + 70
// Row 3: reveal at 390x844 (height estimate) and the desktop column at 1280 wide, light theme.
{
  const lt = T.light
  const fr = frame({ th: lt, W: PW, card: 2, state: { done: [true, true, true], visited: [0, 1, 2], n: 12, rest: true, locked: true } })
  const x = 20
  body += txt(x, Y - 18, '7. Reveal open, 390 × 844, light (layout estimate)', { size: 14, fill: th.fg, weight: 700 }) + txt(x, Y - 3, 'estimate only: builder measures with tools/reveal-fit.mjs', { size: 11, fill: th.muted })
  body += `<rect x="${x}" y="${Y}" width="390" height="844" rx="14" fill="${lt.bg}" stroke="${th.line}"/>`
  let yy = Y + 16
  body += txt(x + 16, yy + 18, 'Flatten the cube to a dot', { size: 18, weight: 800, fill: lt.fg })
  body += txt(x + 16, yy + 40, 'Corners minus edges plus faces is 2 for a cube.', { size: 13, fill: lt.muted })
  body += txt(x + 16, yy + 57, 'Three moves show why it is always 2.', { size: 13, fill: lt.muted })
  yy += 72
  body += `<g transform="translate(${x + 16},${yy})">${fr.s}</g>`
  yy += fr.h + 14
  body += txt(x + 16, yy + 14, 'Your prediction held / Not quite', { size: 14, weight: 700, fill: lt.good })
  yy += 26
  const words = ('Slicing kept the total at 2. Then you took the top face off, flattened the cube and got 1. Each edge you removed took a region or a corner with it, so the total never moved, down to a single dot: 1. Put the top face back: 2. Any convex solid can be flattened and shrunk the same way, so corners − edges + faces is always 2. This is Euler\'s formula.').split(' ')
  let line = '', lines = []
  for (const w of words) { if ((line + ' ' + w).length > 44) { lines.push(line); line = w } else line = line ? line + ' ' + w : w }
  lines.push(line)
  for (const l of lines) { body += txt(x + 16, yy + 16, l, { size: 15, fill: lt.fg }); yy += 22 }
  const bottom = yy - Y
  body += `<line x1="${x}" x2="${x + 390}" y1="${Y + 844}" y2="${Y + 844}" stroke="${th.bad || '#ff7a7a'}" stroke-dasharray="4 4"/>`
  body += txt(x + 390, Y + 860, `estimated content bottom ${Math.round(bottom)} px of 844`, { size: 11, fill: th.muted, anchor: 'end' })
  facts.push(`reveal estimate at 390x844: content bottom ${Math.round(bottom)} px, ${lines.length} reveal lines at 44 chars, stage sub-card ${Math.round(fr.h)} px`)

  const dx = x + 390 + G
  const dfr = frame({ th: lt, W: 440, card: 2, state: { done: [true, true, true], visited: [0, 1, 2], n: 12, rest: true }, picMax: 340 })
  body += txt(dx, Y - 18, '8. Desktop, 1280 wide: card column 440 px, picture capped at 340 px (light)', { size: 14, fill: th.fg, weight: 700 }) + txt(dx, Y - 3, 'same DOM and order; nothing moves beside the picture, so one representation holds', { size: 11, fill: th.muted })
  body += `<rect x="${dx}" y="${Y}" width="480" height="${dfr.h + 40}" rx="20" fill="${lt.bg2}" stroke="${lt.line}"/>`
  body += `<g transform="translate(${dx + 20},${Y + 20})">${dfr.s}</g>`
  // the 'Remove the rest' playback, as a strip of 4 thumbnails
  const tx = dx, ty = Y + dfr.h + 90
  body += txt(tx, ty - 18, '9. Remove the rest after 1 press: playback, 220 ms a removal (reduced motion: the end at once)', { size: 14, fill: th.fg, weight: 700 })
  ;[2, 3, 6, 9, 12].forEach((n, k) => {
    const bx = tx + k * 100
    body += `<rect x="${bx}" y="${ty}" width="92" height="80" rx="8" fill="${th.bg}" stroke="${th.line}"/>`
    body += `<svg x="${bx + 4}" y="${ty + 4}" width="84" height="52" viewBox="0 0 300 174">${flatSvg(n, th, { tileBack: n === 12 })}</svg>`
    const st = ST[n]
    body += txt(bx + 46, ty + 72, `${st.V.size}−${st.E.length}+${st.R.length}=1`, { size: 11, fill: th.fg, anchor: 'middle', weight: 700 })
  })
  Y += 844 + 60
}
const SW = 20 + 3 * 390 + 2 * G + 20
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${Y}" viewBox="0 0 ${SW} ${Y}" font-family="ui-sans-serif, system-ui, sans-serif">` +
  `<rect width="100%" height="100%" fill="#08090c"/>` +
  txt(20, 22, 'flatten-the-cube-to-a-dot: interaction mockup (W-2042). Sketch fidelity; spec: company/design/specs/flatten-the-cube-to-a-dot.md', { size: 13, fill: '#9aa3b5' }) +
  body + '</svg>'
writeFileSync(join(here, 'flatten-the-cube-to-a-dot.svg'), svg)
for (const f of facts) console.log(f)
console.log('wrote company/design/specs/flatten-the-cube-to-a-dot.svg')
