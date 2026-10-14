// Size entry (evaluator, owner rnd-lead): a lesson that draws a table knot. Measured by tools/evolve.mjs.
import { KNOTS } from '../../table.mjs'
import { draw } from '../../draw.mjs'
export const run = () => draw(KNOTS['5_2'].pd)
