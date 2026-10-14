import { knot, layout, draw, crossingChange, simplify, randomKnot, KNOTS, type PD } from '@/kit/knots'
const k = knot('trefoil')
if (k) {
  const L = layout(k.pd)
  const pd: PD = crossingChange(k.pd, 0)
  const pic = draw(pd, { layout: L })
  const s: string = simplify(pd).status
  const n: number = pic.edges.length + Object.keys(KNOTS).length + randomKnot(3).pd.length
  void s; void n
}
// @ts-expect-error wrong argument type must be rejected
draw('not a pd')
