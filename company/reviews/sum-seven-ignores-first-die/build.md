# Build note: sum-seven-ignores-first-die (demo-builder, 2026-10-13)
- Intent: 6 x 6 grid (rows: first die). Target chips (Total 7 / 8) fill the target cells; first-die chips (?, 1-6) keep one row. Readouts: chance before the clue (k/36) and after (k/6). "Independent" is defined on the stage. No randomness.
- Gate: 2 milestones, any first-die clue on total 7 and any on total 8. Clue chips come first in DOM order with target 7 selected, so QA sweeps 1..6 under 7 (including the question's 3), then switches to total 8 with clue 6 (5/36 -> 1/6).
- The reveal quotes the question's first die (3) if the learner tried it under that total, else the last one they tried.
- Iteration after screenshots: chips narrowed and label shortened so the 7 first-die chips fit one row on a phone.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. The banner no longer announces independence: it reports the chance before and after the clue and whether it moved (so it is right for total 8 too). Title no longer leaks. Claims unchanged.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
