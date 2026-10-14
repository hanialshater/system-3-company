// Size entry (evaluator, owner rnd-lead): "tap crossings to make it the unknot" (research note §2.7).
import { knot } from '../../table.mjs'
import { layout, draw } from '../../draw.mjs'
import { crossingChange } from '../../core.mjs'
import { simplify } from '../../moves.mjs'
export const run = () => { const pd = knot('trefoil').pd, L = layout(pd), q = crossingChange(pd, 0); return { pic: draw(q, { layout: L }), status: simplify(q).status } }
