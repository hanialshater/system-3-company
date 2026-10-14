# Build note: dish-runs-out (demo-builder, 2026-10-12)

- Design: one dish; colony AREA is proportional to cell count (2^30 fills the dish), so the colony is a speck for 7 hours and then fills the dish. A food toggle switches to a made-up logistic batch (K = 100 million).
- Reveal gate: interact() fires only on reaching 10 h with food topped up, and on reaching at least 9 h with one batch (minInteractions 2). Cell count stays at 1 until the prediction is locked in.
- Changed after screenshots: the cell readout was cut off below the stage, so I merged it into the step-button row and dropped the separate doublings readout.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.

## v2 (revision 2026-10-13)

- Reveal said "2 doubled 30 times is about 1.07 billion" (garbled; 2 x 2^30 is 2 billion) -> "One cell doubling 30 times is 2^30, about 1.07 billion", computed from FULL.
- 7 h and "last hour / last 20 minutes" were told, never visited -> new buttons "To 7 h" and "To 9 h 40"; the message shows cells and percent of the 10 h count; four milestones (7 h, 9 h 40, 10 h topped up, 10 h one batch) gate the reveal and are all reached on the QA path in DOM order. The reveal quotes 2.1 million, 537 million, 91.5 million from cells().
- No "full" reference -> at 10 h the message says "The dish is full (100%)". Batch size now stated in the batch message ("feeds about 100 million").
- "stopped" -> "levelled off near 100 million" (fact-check note). Hook says "after 10 hours" not "by evening". The unseen "most of the dish filled in the last hour" is dropped.
- Claims c1, c2, c3, c6 rewritten, unverified.

## Revision v3

Input: latest learner review (and fact-check). Reveal derivation was told, batch size came after the click, "0.0%" read oddly. Stage message now counts doublings (e.g. "29 doublings"); the food switch is labelled "One batch (feeds 100 million)"; tiny shares read "under 0.1%"; reveal states 10 h = 30 x 20 min. c2 and c6 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 3, `format` set, edited claims are unverified for the fact-checker.
