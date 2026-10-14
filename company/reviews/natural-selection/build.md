# Build note: natural-selection

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: generation 100 or later at the question's 10% edge (`gen-100-at-10`). `minInteractions = 1`.

| Finding | What I did |
|---|---|
| Learner 1 (borderline FATAL): the reveal was reachable at generation 14 | Gated on generation 100 at 10%. Added a "Go to 100" control, and a strip under the bark that draws the share-dark path from generation 0 to now. A jump still shows the flat start and the take-off. In the reveal phase the stage shows generation 100 at 10%, which is the state the reveal describes. |
| 2: no bridge from ×1.1 and 14,000 to 99 in 100 | Reveal: "The start was 1 dark to 99 pale. Every generation that ratio grows 1.1× ... grown 1.1^100 ≈ 14,000×: about 139 dark to 1 pale." The numbers come from `darkShare()`. c8 extended to match (unverified). |
| 3: "10% more young" against a stage that always has 100 beetles | Stage label: "Model: 100 beetles stand for a huge population. Each generation is all new." New claim c12. |
| 4: "none changed colour" is asserted, not shown | Partly done. The caption still asserts it. The strip and the gate make the population-level change visible, but parent-to-young links are not drawn: that needs a second representation, which the phone cannot fit. Left open for the designer. |
| 5: the DARK readout and caption are clipped on the phone | The readout now sits in the button row, under the slider. In the phone screenshots it is fully visible in explore. The reveal still scrolls inside the kit card (kit layout, not mine). |
| 6: the edge slider invites driving it up | Replaced with chips: +1%, +5%, +10%, +20%. "Try a 1% edge" is now one tap. If the learner saw 1% at generation 100, the reveal says "You saw a 1% edge only reach about 3%". |
| 7: why dark beetles leave more young is never said | Question: "birds spot pale beetles more easily, so dark ones leave 10% more young." New claim c11 (convention: an invented scenario modelled on the peppered moth). |
| Fact-check F1: c4 source arithmetic | Corrected to odds 0.0273, p = 0.0266. The claim text is unchanged, so the status is kept. |
| Fact-check F2: c5 cites the wrong chapter | Chapter number dropped from the source. The text is unchanged, so the status is kept. |
| Fact-check F3: the moth sits next to the 10% edge | The reveal says "Real case, as illustration only". |
| Fact-check F4: non-overlapping generations | Added to c1's text and source. c1 goes back to unverified. |

QA-path trade-off: the contract slides generations to 2, presses +1 and +10 (to 13), then "Go to 100" (milestone), then the edge chips and Start over. A real learner can take the slow path by sliding or tapping +10, or the one-tap path. The one-tap path skips watching each step, so the strip carries that history instead.

## Revision v3

Input: latest learner review (and fact-check). Odds ratio appeared only in the reveal. Stage message now shows dark-to-pale ratio ("1 to 99" ... "139 to 1") and the multiplier. c8 reworded, unverified. I dropped the repeated "None changed colour" caption because it overlapped the slider (the model line and reveal still say it).
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 3, `format` set, edited claims are unverified for the fact-checker.
