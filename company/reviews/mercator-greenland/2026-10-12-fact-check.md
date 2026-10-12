# Fact-check: mercator-greenland (2026-10-12)

Reviewer: fact-checker. Inputs: meta.json, walkthrough transcript, Demo.tsx (only to extract text and reproduce
computations), src/kit/geo/index.tsx. Script: `artifacts/scratch/mercator-greenland-check.mjs`
(run from repo root: `node artifacts/scratch/mercator-greenland-check.mjs`).

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 Greenland ~2.17M km2 | verified | CIA Factbook total 2,166,086 km2 (2021 and 2022 archives). Lesson data: 2,189,757 km2 (+1.1%). |
| c2 DR Congo ~2.34M km2 | verified | Factbook total 2,344,858 km2. Lesson data: 2,333,678 km2 (-0.5%). |
| c3 Mercator draws Greenland ~15x Congo | DISPUTED | Reproduces only unclipped (15.39). The lesson's map is clipped, and it shows 10.73x. |
| c4 area factor 1/cos2(lat), >10x at Greenland's latitude | verified | sec2(73 deg) = 11.70; Snyder k = sec(phi). Lesson readout 10.73x is also >10. |
| c5 Mercator conformal; rhumb lines straight | verified | Standard (Snyder ch. 7). Note: "constant compass bearing" means constant bearing from true north. |
| c6 Equal Earth is equal-area | verified | Savric, Patterson and Jenny, IJGIS 33(3), 454-465 (2018), DOI 10.1080/13658816.2018.1504949. Lesson readout is 0.94x at every latitude, as expected. |
| c7 No flat map is both conformal and equal-area | verified | Conformal means h = k and equal-area means h*k*sin(theta) = 1, so k = 1 everywhere, so the map is a local isometry. The sphere has Gaussian curvature 1/R2, not 0, so by Theorema Egregium there is none. |

## Working

### Areas (script output)
- Greenland 2,189,757 km2 and Congo 2,333,678 km2 (geoArea x 6371.0088 km squared); true ratio 0.938.
- By Factbook areas the ratio is 0.924. "About the same; Congo slightly bigger" is true on both.
- Stage text "Greenland 2.19M, Congo 2.33M" matches the recomputation.

### c3: the dispute
Mercator path-area ratio (Greenland / Congo), the lesson's own `makeProjection`:

| Target lat | 0 | 10 | 20 | 30 | 45 | 60 | 73 (default) | real position |
|---|---|---|---|---|---|---|---|---|
| Clipped (as shipped) | 0.94 | 0.97 | 1.07 | 1.26 | 1.93 | 4.07 | 10.73 | 10.73 |
| Unclipped | n/a | n/a | n/a | n/a | n/a | n/a | 15.02 | 15.39 |

(The unclipped row was computed only at 73 deg and at the real position.)

- `clipExtent([[0,0],[320,200]])` with translate y = 124 puts the top edge at about 80 deg N. Greenland reaches
  83.6 deg N, so the top of it is cut off and `path.area` counts only the visible part.
- The walkthrough shows the learner this on one card: the predict question says "about 15 times", the stage
  readout says 10.7x, and the aria label says "drawn 10.7 times". The Trust sheet says 15.4.
- The 15.4 is correct for full, unclipped Greenland, but it is not what this lesson draws. As written ("on the
  Mercator map in this lesson") the claim is false for the lesson. Two sentences carry it: the predict question
  in Demo.tsx line 52 and meta.json c3.
- The number the learner sees (10.7) is itself a correct measurement of the drawn, clipped shape. It is also not
  the "textbook" figure, so the lesson should pick one number and use it everywhere.

### moveToLatitude preserves true area
geoArea of the moved Greenland at targets 0, 10, 20, 30, 45, 60, 73 and 73.15 deg: 2,189,757 km2 in every case
(identical to the unmoved shape to the km2), and the centroid latitude lands exactly on the target. The Equal
Earth ratio stays 0.94 for all targets, which agrees. This supports the sentence "Greenland never changed as you
slid it", recorded as new claim c10 (unverified, since I added it).

### Sources checked
- CIA World Factbook, Greenland and DR Congo area figures: confirmed via archive pages and summary PDFs.
- Equal Earth citation and equal-area property: confirmed via Wikipedia, Esri and John D. Cook (secondary).
  I did not open the paper itself.
- Theorema Egregium / Snyder: textbook-level, derived above rather than only cited. I did not open Snyder.

### Unrecorded claims added as unverified (I may not verify these)
- c8 "Mercator was made for sailors" (reveal text).
- c9 "On most wall maps Greenland rivals Africa" (hook).
- c10 "Greenland never changed as you slid it" (rigid rotation keeps its area; my run supports it).
- c11 Stage footnote areas (Greenland 2.19M, Congo 2.33M km2, computed in the lesson).
- c12 "Greenland is about the size of DR Congo (Congo slightly bigger)" (predict answer and objective).

Another reviewer, not me, must verify these.

## Fixes routed to demo-builder (the builder edits; I do not)
1. **Blocking (c3).** Make the predict question, the stage and c3 agree. Either (a) remove or enlarge the
   `clipExtent` so Greenland is drawn whole (then the real-position ratio is 15.4, though the readout at 73 deg
   would be about 15.0 and the question's "about 15" would hold), or (b) change the question text and c3 to the
   10.7 the stage shows. If (a), re-check that the Mercator map still fits in 320x200. Whichever is chosen, c3 must
   state the number the learner sees.
2. Minor: the reveal says 2.17M and 2.34M (Factbook) while the stage footnote says 2.19M and 2.33M (lesson data).
   Not false, since the footnote is labelled, but the learner sees two different pairs. Consider a sentence saying
   which is which.
3. Minor: the reveal says "more than ten times" for the area inflation; at the shown 73 deg it is 11.7x (sec2),
   a fine statement. No change needed.

Next: demo-builder fixes item 1; the fact-checker then re-checks c3. Independent verifier needed for c8-c12.
