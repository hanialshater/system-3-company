# Fact-check: mercator-greenland (2026-10-14)

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own d3-geo run with the lesson's geoMercator: projected area / true area of a small cell, relative to the equator, is 1.136, 1.717, 4.061, 12.04, 34.88 at 20, 40, 60, 73, 80°, matching 1/cos² of the cell centre to 3 decimals. The reveal states only the direction ("more the farther from the equator"), which holds. |
| c13 | verified | Construction: longitude linear in ln tan(45° + lat/2) is the definition of a rhumb line on Mercator; per-sample great-circle bearings stay 37.2-37.9° (one bearing up to the chord effect). Own d3-geo run on the lesson projections: rendered Mercator path deviates from its chord by at most 0.001 px (straight); on Equal Earth the same points bow 2.8 px off the chord of a 137 px line, so it is bent. Advisory, not a dispute: a 2.8 px (2%) bow on a dashed line may not read as "bent" on a phone; QA or a learner review should confirm it is visible. |

**Result:** 2 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read v5 Demo.tsx first. Own d3-geo 3.1.1 run on the lesson's projection: geoMercator().scale(320/2π).translate([160,160]).clipExtent([[0,0],[320,200]]), kit/geo countries-110m. Greenland / DR Congo path area = 15.39, the same with and without the clip. The top edge is about 85.05°N and Greenland's maximum latitude in the data is 83.65°N, so Greenland is drawn whole. Math.round gives the question's 15; toFixed(1) gives the readout and Seen '15.4×'. As a control, the sphere ratio is 0.938 and Equal Earth gives 0.94. |
| c13 | verified | Own d3-geo run on the v5 frames: the RHUMB points (lon linear in ln tan(45° + lat/2), the rhumb-line construction) render on Mercator at most 0.001 px off their chord (straight). The clipExtent cuts the south end at about 40.2°S but does not bend it. On geoEqualEarth().fitSize([320,158]) they bow 2.825 px off a 136.6 px chord, so the line is bent. Advisory carried from pass 26, not a dispute: a 2% bow on a dashed line may be hard to see on a phone. Visibility is for QA or the learner evaluator, not a fact issue. Snyder (1987) was not opened; the verdict rests on construction and the run. |

**Result:** 2 verified, 0 disputed, 0 held unverified.
