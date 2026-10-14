// Size entry (evaluator, owner rnd-lead): "is this trefoil tricolourable?" (research note §2.2).
import { KNOTS } from '../../table.mjs'
import { draw } from '../../draw.mjs'
import { arcs, colouringOk, colourings } from '../../invariants.mjs'
export const run = () => { const pd = KNOTS['3_1'].pd, A = arcs(pd); return { pic: draw(pd), arcs: A.count, ok: colouringOk(pd, Array(A.count).fill(0).map((_, i) => i % 3)), n: colourings(KNOTS['4_1'].pd, 3) } }
