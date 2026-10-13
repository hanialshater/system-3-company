# Fact-check: insertion-by-hand (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: ported the stage's settle/slide logic; 54321 takes 10 slides. |
| c2 | Verified: 12345 takes 0. |
| c3 | Verified: over 2,000 random permutations (length 2..31) slides == inversions in every case, as well as for the four stage hands (10, 4, 1, 0). |
| c4 | Verified: 5 x 4 / 2 = 10 pairs, all inverted when reversed; 12354 has one inversion. |
| c5 | Verified: the stage logic gives 4,950 slides for 100 reversed cards and 0 for 100 sorted. |
| c6 | Verified: 499,500 for 1,000 reversed; a sorted 1,000 with two neighbours swapped gives 1 slide and 1 inversion. |

Deterministic, no seeds. Wording note: the recall says insertion sort's 'work' is far less for the near-sorted list; that is true of slides (the lesson's unit), though the algorithm still compares each card once (about n comparisons), so 'work' should stay tied to slides. Not disputed. No unrecorded claims.
