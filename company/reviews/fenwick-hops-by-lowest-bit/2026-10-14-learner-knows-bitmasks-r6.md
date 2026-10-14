*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): fenwick-hops-by-lowest-bit
lesson version: v1
boundary: knows-bitmasks (from meta.json learner.knows: bit masks and two's complement; does not know that x & −x gives a hop that makes prefix sums and updates both take about log n cells).
Screenshots seen: yes (artifacts/walkthroughs/fenwick-hops-by-lowest-bit/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "Add up 13 numbers in how many reads?" with 13 / 3 / 1 is a good question. The locked stage draws the tree as stacked bars (cell 16 spans everything, 8 spans 1–8, and so on) above the 16 numbers, with cell 13 boxed. It does not give away 3, though a learner who reads the bars carefully could find it. "13" is the honest naive guess.
- Explore, read side (works): "Read cell 13, hop down" shows "Cell 13 = 1101 covers 13–13. Hop to 12 = 1100." and boxes 12. "Hop to 0" fills bars 13, 12 and 8 green over the numbers 1–13: "Cells 13, 12, 8 cover 1–13: sum 61", CELLS READ 3. The tiling of 1–13 by three bars is visible.
- Gap: "Hop to 0" jumps 12 → 8 → 0 in one press, so the second hop's binary (1100 → 1000) is never shown. The reveal's "one per 1 bit ... clears one 1 bit per read" rests on a single binary line. A step button that keeps going one hop at a time would show each 1 bit being cleared.
- Explore, update side (does not work): "Change position 1: hop up" was pressed once: "Position 1 is inside cell 1. Hop up: 1 + 1 = 2", CELLS TO UPDATE 1. The gate was already open. The reveal then says hopping up by 1, 2, 4, 8, 16 "reaches every cell holding a changed number: 5 cells. A plain running-total table would rewrite all 16." I never saw 5, never saw 16, and never saw a plain running-total table. The hook's tension ("slow to change ... makes both quick") resolves only in told text.
- Bug: after "Hop to 0" the step button reads "Read cell , hop down" (blank cell number) and is disabled.
- Minor: "Sum 1–15" and "Sum 1–7" only reset the stage to a new target. They are fine, but nothing makes the learner run them.
- Reveal: the read half points at what was seen (13, 12, 8; ranges 13, 9–12, 1–8; sum 61). The update half and "about log2 n" are told.

Told vs shown check (brief): doesNotKnow is "a hop that makes prefix sums **and updates** both take about log n cells". The objective asks the learner to explain that "an update hops up by it (1, 2, 4, 8, 16: 5 cells)". The update half is told only. Under "Show the why you promised" that is a revise. The misconception ("changing one value only needs one cell touched", read as "a running table is cheap to change") is the update side too, so the wrong belief the lesson targets is never challenged on stage.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- **Revise:** the update path (1 → 2 → 4 → 8 → 16, 5 cells, against 16 rewrites for a plain running-total table) must be walked on stage and gated, and the reveal should point at it. The cheapest version on the existing picture: let "Change position 1: hop up" step to 16, outline each touched bar in red, and show a "plain table: 16" readout next to CELLS TO UPDATE.
- Moderate: show the binary on every down hop (13 = 1101 → 12 = 1100 → 8 = 1000 → 0), either by stepping or by listing all three in the "Hop to 0" caption.
- Minor: the blank "Read cell , hop down" label.
- No FATAL.
