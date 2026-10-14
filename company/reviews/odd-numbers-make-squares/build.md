# Build note: odd-numbers-make-squares

## v2 (revision)

demo-builder · 2026-10-13 · inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: at least 5 × 5 built (five L's). Gate: `useMilestones(["five-by-five"])`, reached whenever n ≥ 5 by tap or by player.

| Finding | What I did |
|---|---|
| Learner 1 FATAL (reveal after one tap) | Gated on reaching 5 × 5. Added "Keep going" (adds one L every 0.6 s, Pause to stop) beside "+ next" and Undo, so the QA path reaches 5 × 5. Trade-off: a play button; "+ next" is still the step control, and each L still lands one at a time. Reveal opens with "You built up to N × N". |
| Learner 2 (question gives answer away; title states it) | Question no longer shows worked squares: "Add the odd numbers in order: 1 + 3 + 5 + 7 + … up to 19. What do the running totals do?" Options: "No pattern: you have to add them up" (the misconception), "Every total is a perfect square", "Every total is an odd number". Title: "What do the odd numbers build?". |
| Learner 3 (n + n + 1 only in prose) | Caption now counts the L: "The 7 new dots = 3 + 3 + 1 (corner) wrap 3 × 3 into 4 × 4." The corner dot is drawn with a heavy outline. |
| Learner 4 (100 odd numbers leap) | Reworded to "The same L's, a hundred of them, make 100 × 100". Still told; c3 unchanged. |
| Learner 5 (weak decoys) | Replaced; see 2. |
| Learner 6 (equation wraps on phone) | Long sums show "1 + 3 + … + 17 + 19 = 100 = 10 × 10". Removed the "Odd numbers" readout to keep one row. |
| Fact-check 1 ("A 9 × 9 square needs 19") | Now "Wrapping a 9 × 9 square takes 9 + 9 + 1 = 19 and makes 10 × 10." c4 text updated, stays unverified. |
| Fact-check 2 (hook fine) | Hook untouched. |
| Fact-check 3 (Nelsen p. 71) | Not changed: no book access. |

QA: contract passes phone + desktop (local, 2026-10-13).

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- newest term: domain darkened in light mode; "= n x n" now uses the text-safe --good.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

