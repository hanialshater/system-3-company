# Build notes: horizon-ruler

## v1 (2026-10-13, wave 2)
- Not a map: a cross-section of the sea surface with an observer and the grazing line of sight. Ground distances are drawn to a 2.2 px/km scale (with a 50 km bar). The curve radius (300 px) and the drawn height are both stretched by the same factor, 6,371 x 2.2 / 300, about 47x. That keeps the tangent geometry exact: the drawn tangent length equals K x sqrt(2 R h). The stage says "Distances true. Curve and height stretched 47×. No refraction."
- Brief answer holds: sqrt(2 x 6,371.0088 km x 1.7 m) = 4.65 km (shown as 4.7). 170 m gives 46.5 km (shown as 47), and the reveal computes the ratio as 10. 828 m gives 102.7 km. All are computed in Demo.tsx from one function.
- Brief claim 2's Mount Fuji figure is not used.
- Key state: the 1.7 m eye height, then 100x higher (170 m), so the learner sees 4.7 km become only 47 km. Milestones: "eyes" and "hundred" (exact chip heights). The chips come first in DOM order. The slider is logarithmic (1 m to 1,000 m) and does not count toward the milestones.
- Locked: the distance label on the sight line and the Horizon readout are hidden. The start height is 30 m.
- Iteration: at the top of the slider the tangent point ran off the bottom of the drawing, and the sea's left edge was slanted. I enlarged the viewBox (H 200 to 228), raised the ground and closed the sea polygon at the left edge.
