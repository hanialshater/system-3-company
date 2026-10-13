# Fact-check: triangle-three-right-angles, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | The triangle from the North Pole to 0°,0° to 90°E on the equator has three right angles, s... | Node: cornerAngle at 90E gives 90, 90, 90 (sum 270.000); meridians meet the equator at right angles. |
| c2 | verified | On a sphere a triangle's angles add to 180° plus the spherical excess, and the excess in r... | Girard's theorem: spherical excess (radians) x R^2 = area. Node: at 15,30,60,90,135E geoArea x R^2 = (sum-180) rad x R^2 to 3 d.p. (10.626, 21.253, 42.505, 63.758, 95.637 M km2). |
| c3 | verified | With the corner at 90°E the triangle's area is π/2 × R², about 63.8 million km², one-eight... | Node: (pi/2) R^2 = 63.758 M km2 with R = 6371.0088; 4 pi R^2 = 510.066 M km2; ratio exactly 1/8 = 12.5%. |
| c4 | verified | The 180° rule holds only on a flat surface; on a sphere the sides bulge outward and the an... | Follows from Girard (excess = area/R^2 > 0). 'Holds only on a flat surface' is read as zero-curvature geometry; on negatively curved surfaces the sum is less than 180, which the lesson does not discuss. 'Bulge outward' is a picture of how great-circle sides look on a globe view. Non-blocking. |
| c5 | verified | Tiny triangles have almost no excess, which is why a triangle on paper shows 180°. | Node: a 1 km2 triangle has excess 1/R^2 rad = 0.0000014 deg; stage's smallest triangle (15E) has 15 deg, so the claim is an extrapolation from the formula, stated as such. |

## Result (pass 4)
5 verified, 0 disputed, 0 left unverified, 0 added unverified.
