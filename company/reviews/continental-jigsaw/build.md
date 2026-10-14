# Build notes: continental-jigsaw

## v1 (2026-10-12, wave 1)
- Bullard rotation (pole 44 N 30.6 W, +57°) reproduced with Rodrigues' formula: Brazil's tip lands at 7.27 E, 4.98 N (61 km from Nigeria's outline); 3 of 1,551 samples overlap Africa (artifacts/scratch/w1-jigsaw.mjs). Brief answer (Gulf of Guinea) holds. Note -57° sends it into the Pacific; the sign matters.
- South America = 12 countries plus French Guiana extracted from the 1:110m "France" multipolygon. Grey today-shapes stay as a ghost.
- Slider plus "Close it all the way"; the reveal unlocks only at >= 98% closed. The three option regions are labelled equally on the locked stage.
- Iteration: the first framing cut off South America's west coast and the "Horn of Africa" label; recentred the globe and right-anchored that label.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Moved South America is now a translucent fill with a strong outline, so gaps and overlaps against Africa can be judged.
- Region labels get a marker dot and the Horn of Africa label sits at the horn (51 E, 11.5 N), not over central Africa.
- Reveal: no pole coordinates, no "rigid", no 130 million years (claim c6 withdrawn). Caption drops "orthographic". Question says "turn", not "slide".
- Still open: claim c1 (Bullard 1965 parameters) needs a human source check; unchanged by this revision apart from wording.

## Pre-flight v3

Revision for disputed claim c1 (fact-check 2026-10-14, passes 21 and 23). c1 named the turn as "the fit Bullard, Everett and Smith published in 1965", but nobody could open Table 1 of the paper, and secondary sources disagree on the pole.
Changes:
- **c1.** The reveal no longer attributes the turn to the paper: "You turned South America as one solid piece, 57° about a single point in the North Atlantic, and its coast closed against Africa's with only small gaps and overlaps, as you saw in the outline." c1 now says only what the stage does (support: simulation). The pole and angle stay as model parameters, and the code comment says they were recalled.
- **c4.** "Their fit used the edge of the continental shelf" lost its antecedent and now reads "published fits use the edge of the continental shelf". c4 is set unverified.
- **Options.** "The Gulf of Guinea, West Africa" was worded more precisely than the other two options and is now "The Gulf of Guinea".
- **Reveal stage.** In the reveal the stage shows the closed fit, so "Back to today" pressed last no longer leaves an open ocean under "as you saw".

1. **Title and hook.** "The Atlantic jigsaw" / "South America and Africa look like they fit. Close the ocean and test it." No: neither names a region.
2. **Options.** "Southern Africa", "The Horn of Africa", "The Gulf of Guinea": each is a single place name, and none has a number.
3. **Locked stage.** The globe with today's coasts, all three option regions labelled the same way (a dot plus a name), South America in place, and the red dot on the bulge. The Gulf of Guinea gets no highlight.
4. **Reveal values.** Gulf of Guinea near Nigeria and Cameroon: (b) the fitted milestone (slider at 98% or more, or "Close it all the way"). The red dot is drawn there in the reveal frame. 57° and one point: model parameters, and the fit the learner made. Small gaps and overlaps: (b) the same milestone, with the closed outline drawn in the reveal frame.
5. **QA path.** Slider (two arrow presses, 2%) -> Close it all the way (fitted, the one milestone) -> Back to today. The milestone is reached, and the reveal frame redraws the closed fit.
6. **Reset.** After "Back to today", the reveal phase still draws South America at 100% with the dot in the Gulf of Guinea. Reveal: "It tucks into the Gulf of Guinea, under West Africa's coast near Nigeria and Cameroon. You turned South America as one solid piece, 57° about a single point in the North Atlantic, and its coast closed against Africa's with only small gaps and overlaps, as you saw in the outline. / The fit here is rough: published fits use the edge of the continental shelf, not today's beaches, and these outlines are coarse. Still, two coasts this far apart rarely match by chance. It is evidence the continents were once joined."

## Pre-flight v4 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

W-233, c4 (disputed). "Published fits use the edge of the continental shelf" rested only on Bullard et al. 1965, which nobody here could open, and it is probably wrong: the 500-fathom contour lies on the slope, not at the shelf edge.
- The clause is gone from the reveal, which now reads "The fit here is rough: these outlines are coarse. Still, ...". The c4 claim is deleted from meta.json, and the other claim ids are unchanged.
- No mechanics changed, so the every-control path is the same as Pre-flight v3. Not run: build, QA, walkthrough.

## Pre-flight v5 (demo-builder, 2026-10-14, wave G, r7 adult-beginner)

Fixes: (main 1, show the why) the stage now stands for "one solid piece turned about a point": after the commit an arrow at the top edge marks the pivot ("pivot just above (44°N)"; it projects at y ≈ -6 in this view, so a "+" is drawn only if it were inside the frame), the red dot leaves a dashed trail that arcs around it, the slider and a "Turned" readout show degrees (0° to 57°) instead of %, and a "Size on the globe" readout (d3 geoArea × R², 17.9 million km²) stays fixed while the shape looks bigger; the caption says "The globe squashes shapes near its edge." (main 2) when the reveal opens after a fit, the slider itself is set back to 100% (57°), so the readouts, the slider and "Back to today" agree with the drawn fit; the old reveal-only override is gone. (minor) "as you saw in the outline" is dropped, since no gap or overlap is marked. Not changed: Horn of Africa label position; the phone scroll on reveal (kit fix in progress).
1. Title and hook: "The Atlantic jigsaw" / "South America and Africa look like they fit. Close the ocean and test it." No region named.
2. Options: "Southern Africa", "The Horn of Africa", "The Gulf of Guinea". One place name each, no numbers.
3. Locked stage: globe with today's coasts, the three regions labelled alike, the red dot on the bulge, readouts "Turned 0°" and "Size on the globe 17.9 million km²", the caption. No pivot arrow or trail while locked; nothing marks the Gulf of Guinea.
4. Reveal values: Gulf of Guinea: (b) milestone fitted; the dot is there because the slider is reset to 57° on reveal. 57°: (b) same, the Turned readout. "the pivot ... trail is an arc around it": (a) drawn from the current turn. 17.9 million km²: (a) computed from the shape (constant under rotation, same rounding as the readout).
5. QA path: slider two presses (2%, 1°), Close it all the way (57°, fitted), Back to today (0°). On reveal SyncOnReveal sets 100%: Turned 57°, trail arc, dot in the Gulf of Guinea, Back to today enabled.
6. Reset: Back to today pressed last; reveal: "It tucks into the Gulf of Guinea, under West Africa's coast near Nigeria and Cameroon. You turned South America as one solid piece, 57° about the pivot in the North Atlantic: the red dot's trail is an arc around it. It looked bigger as it moved toward the middle of the globe, but its size stayed 17.9 million km² the whole way. Its coast closed against Africa's with small gaps and overlaps. / The fit here is rough: these outlines are coarse. Still, two coasts this far apart rarely match by chance. It is evidence the continents were once joined."
- meta.json 4 -> 5; c1 text changed (unverified); new claim c8 (size readout and globe squash, unverified). Not run: build, QA, walkthrough, tsc.
