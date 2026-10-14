// Size entry (evaluator, owner rnd-lead): "random knot: is it the unknot?" game.
import { randomKnot } from '../../random.mjs'
import { draw } from '../../draw.mjs'
import { simplify } from '../../moves.mjs'
import { identify } from '../../identify.mjs'
export const run = (seed = 3) => { const { pd } = randomKnot(seed); return { pic: draw(pd), status: simplify(pd).status, names: identify(pd) } }
