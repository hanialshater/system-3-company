# Build note: rank-the-pairs (builder: demo-builder, sonnet build, EXP-003)

- Retitled to "How good is a scorer before any cutoff?" (the slug is not an answer giveaway but names the method).
- The brief says the learner taps all 25 pairs. QA presses at most 16 controls once each, so cells are not controls; "Check next spam row" (5 pairs) plus "Check all pairs" reach all 25 pairs on the QA path. Milestones: first-row, all-pairs (all five rows checked, by either route).
- Numbers (21.5 of 25 = 0.86) come from score() over the same arrays that draw the grid; counts and results hidden while locked.

## Revision v2
Learner review (2026-10-13) findings:
- Options were 50/86/100, answerable by elimination. Now 64/75/86/94%.
- The "can hide behaviour at your cutoff" warning was told, never shown (no cutoff on stage). Dropped it and claim c4; c3 now says "needs no cutoff" as a plain consequence of comparing pairs, which the grid does show.
- Grid shrinking to a thumbnail in the reveal frame is a kit layout matter; not changed (kit is out of scope).
- Edited claim c3 is back to unverified; c4 removed.
