# Build notes: shrinking-degree

## v1 (2026-10-12, wave 1)
- Arithmetic only: 111.195 km x cos(lat); 55.6 km at 60°N, 19.3 at 80°N. Brief answer (56 km) holds. The readout uses the along-parallel length, not geoDistance's chord.
- Reveal unlocks when the box reaches 60°N (slider or chip).
- Iteration 1: the box polygon had to be clockwise in (lon, lat), or d3 fills the whole globe minus the box.
- Iteration 2 (after looking at the phone screenshot): at a fixed globe view the 60°N box was too small to see narrowing, and the Oslo/Helsinki labels overlapped. The globe now tilts to follow the box and is zoomed 1.4x, a dashed copy of the box stays at the equator for comparison, and Oslo's label sits to the left.

## v2 (2026-10-14, answering 2026-10-14-learner-degrees-knower-r6.md)
- Hook rewritten to "Carry one degree of longitude from the equator up to Oslo. How wide is it there?" It no longer says a fixed distance is only how it "sounds" (finding 1).
- Stopping at 60°N (the milestone) and at 80°N records the readout's text onto a stage line "Seen: 1° of longitude at 60°N = 55.6 km · 1° of longitude at 80°N = 19.3 km". The reveal quotes the line at the readout's one decimal: 55.6 km, 111.2 km at the equator, 19.3 km (only if 80°N was seen), and the current readout if the box is elsewhere (findings 2, 3).
- "Zero at the pole" is removed: the slider stops at 80°N (finding 3). Claim c2 reworded, unverified.
- A third readout, "Box width, 10° of longitude", shows 10 × the per-degree width, so the 10° box and the 1° readout connect (finding 4). New claim c7, unverified.
- The reveal points at the converging lines on the globe ("The thin lines running up the globe are lines of longitude, and they all meet at the poles"), and the caption names them.

## Pre-flight v2
1. Title and hook: "How wide is a degree?" / "Carry one degree of longitude from the equator up to Oslo. How wide is it there?" Neither rules out an option.
2. Options: "111 km" / "56 km" / "28 km". All numbered, same precision.
3. Locked stage: box at the equator, 1° of longitude 111.2 km, 1° of latitude 111 km, box width 1,112 km, Seen "nothing yet". These match the trap option 111, not 56.
4. Reveal values: 56 km (answer, rounding of the recorded 55.6); 55.6 km at 60°N (b) milestone, recorded; 111.2 km at the equator (a) the same formula the locked readout showed at 0°, and the Equator button is on the QA path; 19.3 km at 80°N (b) recorded, quoted only if reached; current width (a) live readout, quoted only off 60/80; 111 km per degree of latitude (a) a readout always on the stage.
5. QA path: slider two presses (2°N), Equator, 60°N (milestone, records), 80°N (records). Both rows on the Seen line at reveal; the box is at 80°N.
6. Reset: the Equator button is the nearest reset; it does not clear the Seen line. Reveal on the QA path: "About 56 km. Your Seen line: at 60°N one degree of longitude read 55.6 km, half of the 111.2 km at the equator. The box narrowed as it went north, while its north–south size on the ground stayed the same. / The thin lines running up the globe are lines of longitude, and they all meet at the poles, so the gap between them shrinks with latitude: you saw 19.3 km at 80°N. A degree of latitude stays 111 km. So "one degree" east–west is not a fixed distance." (Composed from the code, not from a run.)

## Pre-flight v3 (demo-builder, 2026-10-14, W-243, answering FC pass 26 c2)

Fix: the readouts print sphere values (55.6, 19.3, 111.2 km) but nothing on stage said the globe is a sphere, and c4 gives the real equator degree as 111.3 km. I chose to name the model rather than round, so the one-decimal readouts that show the shrink stay. The caption now reads "A globe, treated as a sphere of radius 6,371 km. Box: 10° by 10°. ..." and the reveal reads "Your Seen line, on this sphere of radius 6,371 km: at 60°N ...". The 6,371 is computed by R_LABEL = Math.round(EARTH_RADIUS_KM), so it cannot drift from the arithmetic. c2 is reworded to "On the lesson's globe, a sphere of radius 6,371 km, ..." and set to unverified. c4 (real Earth, 111.3 km) is unchanged. c2 now describes only the sphere and c4 only the real Earth, so the lesson no longer gives one quantity two values.
1. Title and hook: unchanged.
2. Options: unchanged ("111 km" / "56 km" / "28 km").
3. Locked stage: as in v2, plus the caption names the sphere. It does not hint at 56.
4. Reveal values: as in v2. The added "6,371 km" is (a), the same caption that is always on stage.
5. QA path: unchanged from v2.
6. Reset: unchanged. QA-path reveal: "About 56 km. Your Seen line, on this sphere of radius 6,371 km: at 60°N one degree of longitude read 55.6 km, half of the 111.2 km at the equator. ..." (rest as v2; composed from the code, not from a run).
- meta.json 2 -> 3. Not run: build, QA, walkthrough. Note: the Demo.tsx edit was swept into commit 2e26574 ("Fact-check pass 26 batch 2") by a concurrent session while I was working; the content is mine.
