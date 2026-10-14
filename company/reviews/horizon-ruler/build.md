# Build notes: horizon-ruler

## v1 (2026-10-13, wave 2)
- Not a map: a cross-section of the sea surface with an observer and the grazing line of sight. Ground distances are drawn to a 2.2 px/km scale (with a 50 km bar). The curve radius (300 px) and the drawn height are both stretched by the same factor, 6,371 x 2.2 / 300, about 47x. That keeps the tangent geometry exact: the drawn tangent length equals K x sqrt(2 R h). The stage says "Distances true. Curve and height stretched 47×. No refraction."
- Brief answer holds: sqrt(2 x 6,371.0088 km x 1.7 m) = 4.65 km (shown as 4.7). 170 m gives 46.5 km (shown as 47), and the reveal computes the ratio as 10. 828 m gives 102.7 km. All are computed in Demo.tsx from one function.
- Brief claim 2's Mount Fuji figure is not used.
- Key state: the 1.7 m eye height, then 100x higher (170 m), so the learner sees 4.7 km become only 47 km. Milestones: "eyes" and "hundred" (exact chip heights). The chips come first in DOM order. The slider is logarithmic (1 m to 1,000 m) and does not count toward the milestones.
- Locked: the distance label on the sight line and the Horizon readout are hidden. The start height is 30 m.
- Iteration: at the top of the slider the tangent point ran off the bottom of the drawing, and the sea's left edge was slanted. I enlarged the viewBox (H 200 to 228), raised the ground and closed the sea polygon at the left edge.

## v2 (2026-10-14, answering 2026-10-14-learner-curved-earth-knower-r6.md)
- Three milestones now (eyes, 100× higher, Burj Khalifa), each recording its stop on a stage line "Seen: 1.7 m → 4.7 km · 170 m → 47 km · 828 m → 103 km". The reveal quotes those rows in the readout's rounding, so they stay visible however far the slider is moved after (finding 1).
- A dashed radius stub runs from the grazing point toward the centre with a right-angle mark against the sight line, labelled "radius" when there is room; the reveal points at it ("The sight line meets the radius at a right angle there, so by Pythagoras ...") (finding 2). Claim c1 reworded, unverified.
- The distance label is offset perpendicular to the sight line, so the line no longer strikes it; "horizon" now sits above and right of the grazing point, away from the caption (finding 3). Not checked on a phone: I was told not to run a build or QA.
- Not changed: slider top (1,000 m) after the 828 m button; not a rule failure.

## Pre-flight v2
1. Title and hook: "How far away is the horizon?" / "Ships vanish over the horizon long before your eyes give up. So where is that edge?" No option follows.
2. Options: "1.5 km" / "4.7 km" / "15 km". All numbered, one decimal or whole, same style (r6: pass).
3. Locked stage: eye at 30 m, no distance label, readout "?", Seen "nothing yet", 50 km scale bar. Nothing drawn says 4.7.
4. Reveal values: 4.7 km for 1.7 m (b) milestone `eyes`, Seen row; 170 m → 47 km (b) `hundred`; "10 times farther" computed from the two recorded stops; 828 m → 103 km (b) `tower`; refraction "a few per cent" told (claim c4).
5. QA path: the three chips in order (all three milestones), then the slider. All three Seen rows are on the stage at reveal.
6. Reset: no Reset control; the slider cannot clear the Seen rows. Reveal: "4.7 km. Your Seen line: 1.7 m → 4.7 km. Your line of sight grazes the curved sea and then leaves it; the horizon is that grazing point, not the limit of your eyes. The sight line meets the radius at a right angle there, so by Pythagoras the distance is the square root of 2 × Earth's radius × your height. / Square root means slow growth: you saw 170 m → 47 km, 100 times higher but only 10 times farther, and 828 m → 103 km from the tower. Air bends light a little, so real horizons are a few per cent farther." (Composed from the code, not from a run.)

## v3 (2026-10-14): W-250, the reveal can open again

Problem (FC pass 26, non-claim finding): Milestones got `names={["eyes", "hundred"]}` but the lesson set `minInteractions={3}`. `reach("tower")` was ignored (useMilestones drops names not in the list), so interact() fired at most twice and the reveal never unlocked. v2's note said three milestones; the code registered two.
Change: `MILESTONES = STOPS.map((st) => st.key)` (eyes, hundred, tower) is passed as `names`, and `minInteractions={STOPS.length}` (3). Both come from the same list, so they cannot drift apart again.
Reachability: each stop has its own chip, enabled whenever the lesson is unlocked and that stop is not the current height. The start height is 30 m, which is none of the stops, so all three chips are live after the commit. Each chip calls set(st.m) with the exact value, and STOPS.find matches it, so reach(key) fires once per stop. All three milestones the reveal quotes (1.7, 170 and 828 m) can be reached in three taps. No claim text changed; no claim status changed. Version 2 -> 3.
Not run: next build, QA, walkthrough (caller's order). Ran tsc and check.

## Pre-flight v3

1. Title and hook unchanged: "How far away is the horizon?" / "Ships vanish over the horizon long before your eyes give up. So where is that edge?"
2. Options unchanged: "1.5 km" / "4.7 km" / "15 km".
3. Locked stage unchanged: eye at 30 m, no distance label, readout "?", Seen "nothing yet".
4. Reveal values unchanged from v2: 4.7 km (b) `eyes`; 170 m → 47 km (b) `hundred`; 10 times farther computed from those two; 828 m → 103 km (b) `tower` (now registered); refraction told (c4).
5. QA path: the three chips in order (eyes, hundred, tower). These are 3 distinct milestones, which equals minInteractions 3, so the reveal unlocks after the third. All three Seen rows are on the stage.
6. Reset: none. Reveal text identical to v2's pre-flight item 6.

## Pre-flight v4 (demo-builder, 2026-10-14, wave H, r8 curved-earth-knower, W-297)

Fixes: (revise 1) the radius stub (14 to 34 px) and its "radius" label are drawn at every eye height, so the radius the reveal names is always on the stage. The label sits at the stub's end, toward the observer. The reveal now also points at "the tick" (the right-angle mark). (revise 2) the reveal went from 106 to 88 words, as the tool counts them (the verdict line included). Cut: "the horizon is that grazing point, not the limit of your eyes". Shortened: the refraction sentence, now "Air bends light, so real horizons are a little farther." **cm-geography should confirm the cut** (board). (phone fit) The picture labels are now 10 px (were 8.5), and the kit no longer shrinks the picture, so it draws at full size. The caption is two short lines at the bottom left, clear of the tangent point at every height. The three chips fit in one row: the labels are "You: 1.7 m" / "100×: 170 m" / "Tower: 828 m", the horizontal padding is 8 px, and the tap height is unchanged. The Horizon readout tile is gone, because the picture prints the distance on the sight line.
1. Title and hook: unchanged.
2. Options: unchanged ("1.5 km" / "4.7 km" / "15 km").
3. Locked stage: 30 m, the sight line with no distance label, the radius stub with its label, the tick, "horizon", the 50 km bar, the caption, the locked chips and slider, "Seen: nothing yet". No horizon distance is shown.
4. Reveal values: 4.7 km, 170 m → 47 km, 828 m → 103 km, "10 times": (b) the milestones eyes, hundred and tower, recorded in the Seen row.
5. QA path: the chips in DOM order (eyes, hundred, tower), then the slider (933 m). At the reveal the radius, the tick, "horizon" and the Seen row are on screen.
6. Reset: no Reset control. Reveal at the end of the reveal-fit path: "4.7 km. Your Seen line: 1.7 m → 4.7 km. Your sight line grazes the curved sea at the horizon and meets the radius there at a right angle (the tick), so by Pythagoras the distance is the square root of 2 × Earth's radius × your height. / Square root means slow growth: you saw 170 m → 47 km, 100 times higher but only 10 times farther, and 828 m → 103 km from the tower. Air bends light, so real horizons are a little farther."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 horizon-ruler`, dev server): before (v3, current kit), crop 154 px, 106 words. After, **crop 0 px**, hiddenBelow 0, **88 words**, namedHidden 0 ("radius" and "horizon" visible), picture 228 px at scale 1 (no shrink), phoneFit true. Parts: picture 228, controls 85, text 14. Screenshot: artifacts/reveal-fit/horizon-ruler.png, at 933 m, with the radius label drawn.
- meta.json 3 -> 4. Reopened (unverified): c1 (reveal sentence, radius always drawn), c3 (the chip no longer names the Burj Khalifa; the claim drops the name), c4 (shortened). c2 is unchanged. Not run: build, QA, walkthrough.
