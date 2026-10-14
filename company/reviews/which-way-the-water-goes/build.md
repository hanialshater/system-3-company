# Build note: which-way-the-water-goes (v1, demo-builder, 2026-10-14)

Kept from evaluators until they report. Brief: company/domains/briefs/geography.earth-climate.md, Wave J #2.

- Directions re-run against section `ekman` of the check: net flow = wind bearing + 90 degrees north of the equator, - 90 south (N wind → E; W wind → N; E wind → S; south: N wind → W). Demo.tsx computes the same and names the direction with the same compass words.
- Ekman spiral drawn at z/D = 0, 0.6, 1.2, 1.8, 2.4: each layer turned 45 degrees + z/D rad off the wind and shortened by exp(-z/D). The net-flow arrow is not to scale with the layer arrows (the card shows directions only; magnitudes stay in claim c1).
- "Ocean view" always shows the northern basin (it switches the south toggle off), because the key state and the reveal are about 30 N. "South of the equator" pressed from the ocean view returns to the square with the southern wind case.
- Milestones `trades` and `westerlies` count only north of the equator (the reveal says "your trade winds pushed water north").
- Claims c3 and c4 rest on a textbook the builder could not open (left unverified, as the brief says).

## Pre-flight

1. Title and hook: "Which way does the water go?" / "Wind drives the ocean's currents. Which way does it push the water?" No direction named.
2. Options: "East" / "North" / "West". Same precision, none numbered.
3. Locked stage: a square of sea, three dashed wind arrows pointing north with the label "wind", "North of the equator", "N ↑", caption "Idealised deep ocean, steady wind, no coasts." No water arrows.
4. Reveal values: "went east" is seen.q, recorded when milestone `q` fires (wind N, north); "pushed water north" is seen.trades (milestone `trades`); "pushed it south" is seen.westerlies (milestone `westerlies`). "45 degrees" and "90 degrees" are the drawn geometry of every water view.
5. QA path: DOM order Start the wind (q), trades (trades), westerlies (westerlies), South of the equator (south), Ocean view (gyre): 5 presses, 5 milestones = minInteractions. Each preset disables itself while it is the shown state; the south toggle always changes the stage; Ocean view disables itself while shown.
6. Reset: no Reset control (the brief has none); recorded directions are fixed once seen.
7. Phone fit: see the reveal-fit line below.
