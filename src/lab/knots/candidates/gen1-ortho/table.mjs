// Knot table: Rolfsen-table PD codes (via SnapPy/spherogram), one base-36 character per edge label. See README.
import { connectedSum, mirror } from './core.mjs'

const T = {}
const K = (name, s, x = {}) => (T[name] = { name, pd: (s.match(/..../g) || []).map((q) => [...q].map((c) => parseInt(c, 36))), c: +name[0] || 0, ...x })
K('0_1', '', { alias: 'unknot', u: 0, a: true })
K('3_1', '631441522536', { alias: 'trefoil', u: 1 })
K('4_1', '8516415228376473', { alias: 'figure-eight', u: 1, a: true })
K('5_1', 'a516617227388394495a', { alias: 'cinquefoil', u: 2 })
K('5_2', '516a172693a239487584', { alias: 'three-twist', u: 1 })
K('6_1', '7c811627b3c23b4a95a45968', { alias: 'stevedore', u: 1 })
K('6_2', 'c81782912a3964734b5ca5b6', { u: 1 })
K('6_3', '9ca11524738239485a6bb6c7', { u: 1, a: true })
K('7_1', 'e7188192293aa3b44b5cc5d66d7e', { u: 3 })
K('7_2', 'eb1ca1b2293a83944758c5d66d7e', { u: 1 })
K('7_3', 'e91a81922738a3b44b5cc5d66d7e', { u: 2 })
K('7_4', 'e81762712c3ba4b34a59c6d58e9d', { u: 2 })
K('7_5', 'e5164152293aa3b46b7cc7d88d9e', { u: 2 })
K('7_6', '9ea11829d3e23d4c74855a6bb6c7', { u: 1 })
K('7_7', '7e811627b2c33a4bd5e459689dac', { u: 1 })
K('10_8', '9ka11a2bb2c33c4dd4e55j6ih7i67h8gf9g8jekf', { c: 10, u: 2 })
K('L2a1', '32411423', { alias: 'hopf', c: 2 })
K('L5a1', '5164152a7283384996a7', { alias: 'whitehead', c: 5 })
K('L6a4', '5164192c72833a4b95a8b6c7', { alias: 'borromean', c: 6, a: true })
K('U10', '1c2d5j6i7h8g93a2bkc1daebe3f4f9g8h5i4j7k6', { alias: 'monster-unknot', c: 0, u: 0, a: true })
T.granny = { name: 'granny', pd: connectedSum(T['3_1'].pd, T['3_1'].pd), c: 6, u: 2 }
T.square = { name: 'square', pd: connectedSum(T['3_1'].pd, mirror(T['3_1'].pd)), c: 6, u: 2, a: true }
export const KNOTS = T
export const knot = (n) => T[n] ?? Object.values(T).find((k) => k.alias == n)
