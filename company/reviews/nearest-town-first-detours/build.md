# Build note: nearest-town-first-detours (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets Nearest-first tour, Out to 8 first, Try all 24 orders, Step, Reset (DOM order = QA path).
- Stage: one road (number line) with town pills at −15, −3, 2, 8 and the start 0 (filled). A tour is arcs: rightward hops above the road, leftward hops below, each labelled with its km (13 px); the longest hop of the drawn tour is red and thicker. Readouts Tour (km) and All 24 orders (shortest to longest). Trace "nearest-first 2+5+11+23+15 = 56 · out to 8 first: 46 · all 24: 46 to 56" survives Reset.
- Step adds one nearest-first hop at a time (from any other state it starts the nearest-first tour again); reaching all 5 hops by Step also fires the greedy milestone.
- Numbers: `model.ts`; node 2026-10-14: hops 2, 5, 11, 23, 15 = 56 (no ties); sweep 46; all 24 orders 46 to 56. Brief deviation: the brief says nearest-first "is the longest tour of all 24"; it ties with 7 other orders at 56, so the reveal says "tied for the longest" (claim c3 records this).
- Reveal shortened from the brief's 83-word draft (with the verdict it measured 96 words and crop 1 px): "then had to cross" -> "then crossed", "Driving out to 8 first and sweeping back cost 46" -> "Out to 8 first cost 46", last sentence tightened. Same facts; claims c4 and c5 text updated to the new wording.
- Milestones (3): greedy, sweep, all-orders.
- All claims unverified; c5 (route planners repair greedy tours; Croes 1958, 2-opt) is cuttable if the fact-checker cannot support it.

## Pre-flight

1. Title and hook: "Always the nearest town next?" / "Drive to the closest town you have not visited, every time. Is the trip short?" They ask; no length or verdict given.
2. Options: "Yes", "No, a tour about 5 km shorter exists", "No, a tour about 10 km shorter exists". The two "No" options are worded at the same precision; "Yes" carries no number (it is the misconception).
3. Locked stage: road and five pills only; readouts "–". No arc, no total.
4. Reveal values: 2, 5, 11, 23, 15 and 56 (milestone greedy); 46 (milestone sweep); "tied for the longest" (milestone all-orders, 46 to 56). All in the trace when the reveal opens.
5. QA path: Nearest-first (greedy), Out to 8 first (sweep), Try all 24 (all-orders), Step (1 hop), Reset. All three milestones reached.
6. Reset: reveal after Reset: "Nearest-first took cheap hops of 2, 5 and 11 km, then crossed the whole road, 23 km from 8 to −15, and came back 15: 56 km. Out to 8 first cost 46. Of all 24 orders, nearest-first tied for the longest. / Each greedy hop was cheapest at that moment, but the far towns it put off came due at the end. Route planners use such tours only as a start, then repair them." The arcs are cleared by Reset; the 23 is still on the stage in the trace.
7. Phone fit: see the "Measurement" line below.
