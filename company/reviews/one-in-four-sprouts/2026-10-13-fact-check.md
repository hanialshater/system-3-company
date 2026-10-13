# Fact-check: one-in-four-sprouts (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l8.ts (copy of the lesson's batch()). Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Pw x Pw: each parent passes P or w with equal chance, so ww has probability 1/2 x 1/2 = 1/4, independently per seed (Mendel's law of segregation). Over 2,000 stage fields the per-seed white rate is 25.04%. |
| c2 | verified | (3/4)^4 = 81/256 = 31.6%; at least one white 175/256 = 68.4%. |
| c3 | verified | P(exactly 1) = 4 x (1/4)(3/4)^3 = 108/256 = 42.2%; P(none) = 31.6% ("about a third"); P(two or more) = 26.2%. |
| c4 | verified | The first field (seed 1) shows 67 families with at least one white, 49 with exactly one, 33 with none; seed 2: 65, 44, 35. Across 2,000 fields: at least one white 59-78 (middle 95%, median 69), exactly one 33-52 (median 42), none 22-41 (median 31). So the claim "vary around the expected 68 and 42" is right. |
| c5 | verified (convention) | Stated in the reveal: complete dominance, independent seeds. |

Non-blocking note for demo-builder: the first field's "exactly one white" count (49) is 7 above the 42% the reveal quotes right afterwards. Both are correct (49 is inside the 33-52 range), but the reveal could say "yours varies; the long-run share is 42%" so the gap is not read as a contradiction. No unrecorded claims found.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c3.

Binomial(4, 1/4): P(1)=0.4219, P(0)=0.3164, P(>=2)=0.2617.
