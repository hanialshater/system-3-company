// Laurent polynomials with integer coefficients, stored as {exponent: coefficient}, no zero terms.
export const poly = (o = {}) => { const r = {}; for (const k in o) if (o[k]) r[+k] = o[k]; return r }
export const padd = (p, q, s = 1) => { const r = { ...p }; for (const k in q) r[k] = (r[k] || 0) + s * q[k]; return poly(r) }
export const pmul = (p, q) => { const r = {}; for (const a in p) for (const b in q) { const k = +a + +b; r[k] = (r[k] || 0) + p[a] * q[b] } return poly(r) }
export const pinv = (p) => { const r = {}; for (const k in p) r[-k] = p[k]; return r }
const terms = (p) => Object.keys(p).map(Number).sort((a, b) => a - b)
export const peq = (p, q) => pstr(p) == pstr(q)

export function pstr(p, v = 't') {
  let s = ''
  for (const e of terms(p)) {
    const c = p[e], a = Math.abs(c), x = e == 1 ? v : `${v}^${e % 1 ? `(${e * 2}/2)` : e}`
    s += (s ? (c < 0 ? ' - ' : ' + ') : c < 0 ? '-' : '') + (e ? (a == 1 ? '' : a) + x : a)
  }
  return s || '0'
}

export function pparse(s, v = 't') {
  const r = {}
  for (const m of s.replace(/\s+/g, '').matchAll(new RegExp(`([+-]?)(\\d*)(${v}(?:\\^\\(?(-?\\d+)(?:/(2))?\\)?)?)?`, 'g'))) {
    if (!m[0]) continue
    const e = m[3] ? (m[4] ? +m[4] / (m[5] ? 2 : 1) : 1) : 0
    r[e] = (r[e] || 0) + (m[1] == '-' ? -1 : 1) * (m[2] ? +m[2] : 1)
  }
  return poly(r)
}

export const peval = (p, t) => terms(p).reduce((s, e) => s + p[e] * t ** e, 0)
