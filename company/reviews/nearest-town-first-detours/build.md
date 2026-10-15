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
7. Phone fit: crop 0 px, reveal 86 words with the verdict, phoneFit true, namedHidden 0 (Measurement v1 below).

## Measurement v1 (2026-10-14, shared dev server :3530)

- Phone fit (390x844, `tools/reveal-fit.mjs` logic, after the QA path including Reset): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, reveal 86 words including the verdict line. Source: console output of the run (the JSON file was in artifacts/qa-wavej-cs/, which the later QA run cleared); screenshot artifacts/reveal-fit/nearest-town-first-detours.png (looked at). Caveat: the shipped tool timed out on page load on the loaded host (load average 25-45), so I measured with a temporary copy that only raised its goto and render timeouts (deleted afterwards). Stage SVG text 11-16 px in the viewBox, drawn at about 1:1 on a 390 px phone; HTML text at least 0.72rem.
- QA contract (`tests/qa/contract.spec.ts`, QA_ONLY the five wave J cs slugs, --workers=1, with the `--timeout=400000` CLI flag because pages took 45-115 s to load): phone passed, desktop passed. Log: artifacts/qa-wavej-cs-run2.log.

status draft → review (W-996): launch r10, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
