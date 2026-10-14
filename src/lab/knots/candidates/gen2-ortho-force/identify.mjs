// Identification: every table entry whose invariants match after simplification ([] = none).
import { KNOTS } from './table.mjs'
import { jones, alexander } from './invariants.mjs'
import { components } from './core.mjs'
import { pstr, pinv } from './poly.mjs'
import { simplify } from './moves.mjs'

let sig
const key = (pd) => [components(pd), pstr(alexander(pd)), pstr(jones(pd))]
export function identify(pd) {
  sig ||= Object.values(KNOTS).filter((k) => k.name != 'U10').map((k) => [k, key(k.pd)])
  const [c, a, j] = key(simplify(pd).pd), r = []
  for (const [k, [kc, ka, kj]] of sig) if (kc == c && ka == a) {
    if (kj == j) r.push({ name: k.name, mirror: false })
    else if (pstr(pinv(jones(k.pd))) == j) r.push({ name: k.name, mirror: true })
  }
  return r
}
