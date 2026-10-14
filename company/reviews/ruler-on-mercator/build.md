# Build notes: ruler-on-mercator

## v1 (2026-10-12, wave 1)
- Design change from the brief: a 1,000 km bar is about 8 px on a phone-width world Mercator, so the bar is 2,000 km on a map spanning 120° of longitude; options became 1,000 / 2,000 / 4,000 km. The answer is still "half" (sec 60 = 2).
- The readout inverts the projection at the bar's ends and measures along the parallel; at 60°N it reads 1,000 km. A green dashed bar shows a true 2,000 km at the current latitude.
- Reveal unlocks at 60°N.
- Looked at 60°N on a phone: the yellow and green bars are distinct and readable; no change needed.

## v2 (2026-10-14, answering 2026-10-14-learner-scale-bar-knower-r6.md)
- The 60°N milestone now records the readouts' text onto a stage line "Seen: 60°N → 1,000 km on the ground, stretch 2.00×", and the reveal quotes it.
- "About 2.9 at 70°" is gone (finding 1). If the bar has moved off 60°N, the reveal quotes the learner's current Map stretch readout instead; otherwise it says only that the stretch grows northward. Claim c3 reworded, unverified.
- The bars are labelled on the map in 10 px bold: "same bar" beside the yellow bar and "true 2,000 km here" in green under (or, at the equator, over) the dashed bar (finding 2).
- The map now runs from 68°N (was 72°N), 262 px tall (was 300), and the slider stops at 65°N, so the stage is shorter and the 60°N bars sit higher in a smaller frame (finding 3). Not checked on a phone: I was told not to run a build or QA.

## Pre-flight v2
1. Title and hook: "A ruler on a world map" / "Maps come with a scale bar. Slide one north on a world map and measure again." Neutral (r6: pass).
2. Options: "1,000 km" / "2,000 km" / "4,000 km". All numbered, same precision.
3. Locked stage: yellow bar at the equator, 2,000 km, stretch 1.00×, green bar equal to yellow, labels "same bar" and "true 2,000 km here", buttons Equator/30°N/60°N, Seen "nothing yet". Nothing says 1,000.
4. Reveal values: 1,000 km and 2.00× at 60°N (b) milestone (the question's own case), recorded on the Seen line; "twice as long" (b) the green bar at 60°N; the current stretch (a) the learner's live readout, quoted only when the bar is not at 60°N.
5. QA path: slider two presses (2°N), Equator, 30°N, 60°N (milestone). The bar is at 60°N and the Seen line is on the stage when the reveal opens.
6. Reset: the Equator button is the nearest thing to a reset; pressing it last leaves the Seen line and the reveal adds "(where your bar is now, the equator, it reads 1.00×)". Reveal on the QA path: "1,000 km. Your Seen line: at 60°N the bar spanned 1,000 km with a map stretch of 2.00×. The bar never changed on the screen, but the map there is stretched twice as much as at the equator, so the same bar covers half the ground. The green bar, a true 2,000 km there, was twice as long. / The stretch grows the farther north you go. It is the same north–south as east–west, which is why shapes look right while sizes do not. A single scale bar on a world map is only true along one line." (Composed from the code, not from a run.)

## Pre-flight v3 (demo-builder, 2026-10-14, wave H, learner r8 / W-315)

Changes: reveal cut from 97 (more on the Equator-last path) to 69 body words on every path: the shapes sentence cut (c4 withdrawn, the reviewer's candidate), the Equator-last clause "(where your bar is now ...)" cut, the bold lead folded into the Seen sentence, last sentence now "The stretch grows toward the poles, so one scale bar is true along only one line." (c3, c5 reopened). A dashed "equator" line and label are drawn on the map (c6), so "as at the equator" points at the picture. At the reveal the legend line steps aside (it repeats the map's own labels) and the strip south of the equator is not drawn; near the equator the green bar and its label move above the yellow bar so they stay on the map. The slider Row and the chips (now a Row) opt in to the fold. The yellow bar is drawn #f5c518 on a dark edge (r8 minor: it rendered dark gold).

1. Title and hook: unchanged.
2. Options: unchanged ("1,000 km", "2,000 km", "4,000 km").
3. Locked stage: as before plus the equator line (it is where the bar sits; it marks no answer). Legend still shown before the reveal.
4. Reveal values: 60°N, 1,000 km, 2.00× (b) the Seen record of the 60°N milestone; 2,000 km is the question's constant; "twice as long" is the green bar drawn on the map.
5. QA path: slider two steps, Equator, 30°N, 60°N; milestone reached; at the reveal the bar, "same bar", the green "true 2,000 km here", readouts and Seen line are on screen.
6. Reset: none. Reveal (69 words, same on every path): "Your Seen line: at 60°N the bar spanned 1,000 km, map stretch 2.00×. The bar never changed on the screen, but the map there is stretched twice as much as at the equator, so the same bar covers half the ground. The green bar, a true 2,000 km there, was twice as long. The stretch grows toward the poles, so one scale bar is true along only one line."
7. Phone fit (reveal-fit, localhost:3530, 2026-10-14): crop 179 px → 0 px; hiddenBelow 0; namedHidden 1 → 0; phoneFit true; reveal 100 → 72 words as measured (verdict included). Stage 487 → about 392 px; the fold fires ("Show controls"). The map height at the reveal does not depend on the bar's latitude, so the Equator-last path should fit the same way (not measured; reveal-fit walks the 60°N-last path). Screenshot: artifacts/reveal-fit/ruler-on-mercator.png.
