// Curve extent (sampled cubic Béziers) of every picture draw-a-table-knot can show, vs its viewBox.
import { knot, layout, draw, crossingChange } from "../../../../src/kit/knots/index.mjs";
const VB = { x: -1.5, y: -1, w: 103, h: 105 };
let X0 = 1e9, X1 = -1e9, Y0 = 1e9, Y1 = -1e9, n = 0;
const crossRoom = [];
function sample(d) {
  const t = d.match(/[MC]|-?\d*\.?\d+/g);
  let i = 0, cur = null, cmd = null; const pts = [];
  while (i < t.length) {
    if (t[i] === "M" || t[i] === "C") { cmd = t[i++]; continue; }
    if (cmd === "M") { cur = [+t[i], +t[i + 1]]; pts.push(cur); i += 2; }
    else { const p1 = [+t[i], +t[i + 1]], p2 = [+t[i + 2], +t[i + 3]], p3 = [+t[i + 4], +t[i + 5]]; i += 6;
      for (let s = 1; s <= 50; s++) { const u = s / 50, a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c = 3 * (1 - u) * u * u, e = u ** 3;
        pts.push([a * cur[0] + b * p1[0] + c * p2[0] + e * p3[0], a * cur[1] + b * p1[1] + c * p2[1] + e * p3[1]]); }
      cur = p3; }
  }
  return pts;
}
for (const name of ["6_1", "5_2"]) {
  const pd = knot(name).pd, L = layout(pd);
  const states = [pd, ...pd.map((_, i) => crossingChange(pd, i))];
  for (const q of states) {
    const pic = draw(q, { layout: L, gap: 0.5 }); n++;
    for (const e of pic.edges) for (const [x, y] of sample(e.d)) { X0 = Math.min(X0, x); X1 = Math.max(X1, x); Y0 = Math.min(Y0, y); Y1 = Math.max(Y1, y); }
    for (const c of pic.crossings) crossRoom.push({ name, i: c.i, room: Math.min(c.x - VB.x, VB.x + VB.w - c.x, c.y - VB.y, VB.y + VB.h - c.y) });
  }
}
const minRoom = crossRoom.reduce((a, b) => (b.room < a.room ? b : a));
console.log({ pictures: n, x: [X0.toFixed(1), X1.toFixed(1)], y: [Y0.toFixed(1), Y1.toFixed(1)],
  marginUnits: { left: (X0 - VB.x).toFixed(1), right: (VB.x + VB.w - X1).toFixed(1), top: (Y0 - VB.y).toFixed(1), bottom: (VB.y + VB.h - Y1).toFixed(1) },
  tightestCrossingToEdge: minRoom,
  pxAt: Object.fromEntries([[284, "390x844 explore"], [261.3, "360x740"], [231, "reveal"], [226, "360x640"]].map(([w, k]) => [k, { pxPerUnit: +(w / VB.w).toFixed(2), crossingRoomPx: +(minRoom.room * w / VB.w).toFixed(1) }])) });
