# Fact-check: sketch-the-counts (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: the stream has 5 cat, 3 dog, 1 eel; counter 2 (cat and dog) reads 8. |
| c2 | Verified: no reading was ever below the truth in the stage's table (rows 1-4, all items) nor in 300 random-hash simulations (0 of 15,000 readings under). |
| c3 | Verified: row 2 sends cat alone to counter 1 (5) and dog/eel to counter 3; min(8,5) = 5. |
| c4 | Verified: the name and structure match Cormode and Muthukrishnan 2005. |
| c5 | Verified (convention): HASH is hand-picked; stage estimates are cat 8,5,5,5 and dog 8,4,3,3 for 1-4 rows, matching the source note. These toy hashes are chosen, so the reveal must not be read as 'each extra row always helps'; row 3 for cat (6) and row 3 for eel (6) show a row can be worse, but the min never rises. The reveal only claims the min is the best guess, which holds. |

Added c6: the reveal's 'never too low and usually close' had no claim for the 'usually close' half. Added by me, so I do not verify it. Reveal text 'min(8, 5) = 5' matches c3. Seeds: the simulation used fixed LCG seeds 1..300 for the random-hash check; the lesson itself is deterministic.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Cormode and Muthukrishnan 2005: estimate never below true count, exceeds it by at most eps*N with probability >= 1-delta. Matches the stage's table: 5 cats / 3 dogs / 1 eel gives 8 at the shared counter and 5 with a second row. Previous simulation (0 under-counts, 97.8% exact) is consistent. |
