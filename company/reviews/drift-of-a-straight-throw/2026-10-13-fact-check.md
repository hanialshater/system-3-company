# Fact-check: drift-of-a-straight-throw, 2026-10-13

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | verified | On a frictionless platform spinning like the Earth at 45°N, an object sliding north at 100... | Re-derived in node: f = 2*7.2921e-5*sin45 = 1.0313e-4 /s; 1,000 km at 100 m/s = 1e4 s, ft = 1.031 rad, east = (v/f)(1-cos ft) = 471.5 km (stage shows ~470). Toy is labelled on the stage; the small-angle formula would give 515.6 km, which the lesson does not use. |
| c2 | verified | Over 10 km the same object drifts about 52 m, and over 100 km about 5.2 km. | Node: 10 km -> 0.0516 km (52 m); 100 km -> 5.152 km (5.2 km) at 45N. |
| c3 | verified | The drift grows with the square of the travel time; 100 times the distance gave about 9,00... | Node: 471.5 / 0.0516 = 9,145, shown as 'about 9,000'; pure square law would give 10,000; small-angle x ~ (1/2) f v t^2 so drift scales with t^2 for short runs. |
| c4 | verified | The Coriolis effect is zero at the equator and strongest at the poles. | f = 2 Omega sin(lat) is 0 at the equator and largest at the poles (Holton, Intro to Dynamic Meteorology, ch. 1/2). Node: latitude 0 gives 0 m east; slider shows it. |
| c5 | verified | The Coriolis effect shapes winds and ocean currents over hundreds of kilometres. | Large-scale winds and ocean currents are close to geostrophic balance (Coriolis vs pressure gradient), a standard result (Holton ch. 3; Vallis, Atmospheric and Oceanic Fluid Dynamics). 'Hundreds of kilometres' is the usual synoptic-scale threshold. |
| c6 | verified | 100 m/s is 360 km/h. | 100 m/s x 3.6 = 360 km/h (node). |

## Result (pass 4)
6 verified, 0 disputed, 0 left unverified, 0 added unverified.
