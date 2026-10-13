# Fact-check: light-in-the-cylinder, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | With a light at the Earth's centre and a cylinder touching the equator, latitude φ lands t... | Node: tan 80 = 5.671, tan 60 = 1.732; the ray through (cos p, sin p) from the centre meets x = 1 at y = tan p (central cylindrical projection). |
| c2 | verified | Measured along the globe's curve, 80°N is 1.40 radii from the equator. | Node: 80 deg = 1.3963 rad = 1.40 radii of arc on a unit globe. |
| c3 | verified | With a flat sheet on the North Pole the stretch moves to the equator: latitude φ lands cot... | Node: cot 80 = 0.176 (0.18), cot 10 = 5.67; ray meets y = 1 at x = cot p (polar gnomonic); at the equator it is parallel to the sheet and never lands. Stage slider tops out at 80N and 0N reads 'never' for the sheet. |
| c4 | disputed | Paper that touches the globe along one line is true there and stretches everything away fr... | Stated as a general rule about paper touching the globe along one line: 'true there and stretches everything away from it'. That holds for this light (central cylindrical) projection only. Other tangent cylinders do not stretch everything: the Lambert cylindrical equal-area compresses north-south distances away from the equator (meridian scale cos^2 lat) while stretching east-west ones, and the polar sheet touches at a point, not along a line (Snyder, Map Projections: A Working Manual, USGS PP 1395). The claim's own source note admits it is true of 'these two light projections'. Fix: 'With a light at the centre, paper touching the globe along one line is true there and stretches everything away from it.' |
| c5 | verified | A projection is a rule for putting each point of the globe on paper. | Standard definition: a map projection is a systematic rule for transferring points of the globe to a plane (Snyder 1987, ch. 1). The reveal does not claim atlases use this projection. |

## Result (pass 4)
4 verified, 1 disputed, 0 left unverified, 0 added unverified.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c4.

c4: central cylindrical projection y = tan(phi) so dy/dphi = sec^2(phi): 1 at the equator, unbounded to the pole; true along the touching line. The sentence is about the paper touching along one line (cylinder); the tangent-plane (polar) case touches at a point, which the reveal generalises loosely. Verified as reworded ('With a light at the centre').
