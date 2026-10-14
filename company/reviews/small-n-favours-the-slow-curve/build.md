# Build note: small-n-favours-the-slow-curve (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets n = 20, 43, 44, 100, then Reset (DOM order = QA path).
- Stage: two horizontal bars (insertion 8·n², merge 64·n·log₂n) scaled so the larger cost at the chosen n fills the track; step counts at the bar ends (13 px); the cheaper bar is filled and outlined. "n = N" at the top right. Caption: "Steps from a cost model, not timings. Outlined: fewer steps." A 2 x 2 trace (each visited n, its winner, both costs) survives Reset; Reset clears the bars only.
- Numbers: `model.ts`; node 2026-10-14: 20 -> 3,200 / 5,532; 43 -> 14,792 / 14,933; 44 -> 15,488 / 15,374; 100 -> 80,000 / 42,521; insertion cheaper for n = 2..43, merge for 44..1,000.
- Milestones (4): n20 (question's case), n43, n44, n100.
- Fix after the first 390x844 shot: the one-line trace cells overflowed ("14,792 v 14,93..."); the trace is now two lines per cell.
- All claims unverified; c4 (CLRS Problem 2-1, "fast merge sorts hand short pieces to insertion sort") needs the fact-checker.

## Pre-flight

1. Title and hook: "Twenty items: which sort is cheaper?" / "Two step-count formulas, one short list. Pick the cheaper sort." No winner named.
2. Options: "Insertion sort", "Merge sort", "They tie". None numbered.
3. Locked stage: two empty bars with their formulas, "n = –", empty trace. Nothing outlined.
4. Reveal values: 3,200 and 5,532 (milestone n20), "won at 43, lost at 44" (milestones n43, n44), 80,000 and 42,521 (milestone n100). All in the trace when the reveal opens.
5. QA path: n = 20, 43, 44, 100 reach all four milestones; Reset last clears the bars, the trace keeps all four.
6. Reset: reveal after Reset: "At 20 items insertion sort cost 3,200 steps and merge sort 5,532. The 64 in front of merge sort's cost outweighs its slower growth while n is small. Insertion sort still won at 43 and lost at 44, and at 100 it cost 80,000 against 42,521. / Growth rate tells you who wins eventually, not who wins at your size. That is why fast merge sorts hand short pieces to insertion sort." Every number is in the trace.
7. Phone fit: see the "Measurement" line below.
