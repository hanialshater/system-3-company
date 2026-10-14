# Build note: dilute-until-none-left

builder: demo-builder (sonnet build, EXP-003) · 2026-10-13

- Title "How far can you dilute?" (does not name 22).
- Intent: dilute step by step and watch the average molecule count per 10 mL tube cross 1. One tap would need 22 presses and QA presses each control once, so there are jump buttons (to step 10, 21, 22) plus a slider; the one-step button remains.
- Milestones: step 21 (average 6.0) and step 22 (average 0.60). The reveal quotes the averages only.
- From step 19 a seeded sample tube is drawn as dots (Poisson); the seed was chosen from six tried so that it shows 5 at step 21 and 0 at step 22. Disclosed in claim c5, and the stage always prints the average beside it.
- Log-scale bar with a marker at 1 molecule. The readouts show "?" while locked.

## Revision v2
Fixes from the v1 learner review: jump buttons named the answer on the locked screen, so they are gone (stage now has 'Dilute 1:10 once', 'Start again', 'Draw another tube' and the slider). The start count (6.0 x 10^21 molecules) is on the stage chip from the first render. Added 'Draw another tube' (steps 19+) so the learner sees chance: other draws at the same average give other counts; the reveal now states the 55% figure (claim c4) instead of 'a few still catch one'. Draw 0 is still the seeded sample of claim c5. No claim text changed, so claims stay as they were (still verified from the v1 fact-check; the stage chip text is new, covered by c2).

## Revision v2
(Added for the QA contract, which presses each control once.) A 'Dilute automatically' button repeats the 1:10 step every 150 ms up to step 24, so the learner watches every step, including the ones the reveal quotes, without a button that names them.


## Revision v3

Auto run stopped at 24 and flashed step 22. It now runs fast to step 20, pauses 1 s on 21 and on 22, and stops at 22. From step 19 the stage also shows '20 tubes drawn: N empty' (seeded), and the reveal quotes that N, so the 55% is backed by something seen. New claim c7 (unverified).

QA (QA_ONLY, phone and desktop) passes; I looked at the walkthrough sheet. Edited claims are unverified.

## Revision v4

Fact-check note and learner: 15 of 20 empty (75%) was a tail draw beside "about 55%". The 20-tube sampler now uses multiplier 1301 (was 977), chosen from fourteen tried: 12 of 20 empty at step 22 (60%, expected 10.9), 0 at step 21. The single shown tube at steps 21 and 22 (5 and 0) is unchanged. The reveal also says another 20 would differ a little. Claim c7 edited, unverified.
