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
