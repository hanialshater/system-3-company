# Fact-check: binary-search (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c5 | Verified. For ranges of every size 1..2000 at 40 offsets, mid = floor((lo+hi)/2) leaves sides of sizes mid-lo and hi-mid, both <= floor(m/2), and the two sides plus the guess sum to m. |
| c6 | Verified. Exhaustive run over all 2,000 targets gives a worst case of 11 guesses (1,000 gives 10; 10^6 gives 20). Caveat, not a dispute: it assumes a three-way check per step (less / equal / greater), which the recall wording 'checking the middle' implies. |
| c7 | Verified. For m = 1000, mid = 500 leaves 499 below and 500 above; odd m leaves equal sides, even m leaves m/2-1 and m/2. The stage text 'Lower than 500: 501 ruled out, 499 left' matches (transcript). |

c1-c4 were already verified; re-derived the worst-case sequence 500,250,125,62,31,15,7,3,1 (nine wrong guesses, tenth right) and 20 / 30 guesses for 10^6 / 10^9. The reveal never unlocked in the walkthrough, so the reveal text was read from Demo.tsx. No unrecorded claims found.
