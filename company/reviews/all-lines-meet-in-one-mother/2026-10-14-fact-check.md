# Fact-check: all-lines-meet-in-one-mother (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own mulberry32 copy of meetTime(): seeds 7001-8000 all met, mean 96.033 (reveal rounds to 96), median 84, min 18, max 371; seed 7004 meets at 99, with 32, 23, 9, 3, 2 lines at 1, 2, 12, 50, 89 back. The 'thousand' milestone forces the run, so the reveal always quotes the computed mean. |
| c2 | verified | Own exact expectation by value iteration on the lines Markov chain (occupancy transitions, 20,000 sweeps): 96.971, rounds to 97; 2N(1 - 1/N) = 98 for N = 50. |
| c3 | verified | Re-derived: one mother per woman, so joined lines share all earlier ancestors; line count is non-increasing and falls with positive probability whenever k > 1, so it reaches 1 almost surely (all 1,000 seeded runs did). |
| c4 | verified | Re-derived: N = 50 in every generation; at the meeting generation every present-day maternal line passes through the one mother, so none of the other 49 has a maternal line to today. |
| c5 | verified | life/same-genes-different-drift (published, title 'Nobody wins, one colour takes over') is haploid Wright-Fisher: each new individual copies a parent drawn at random from the last generation; this lesson traces the same draw backward. |
| c6 | verified | Stage rule text matches verbatim; N = 50, mother = floor(rng() x 50) per line. |

**Result:** 6 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own value iteration: 96.971 -> 97; 2N(1 - 1/N) = 98. |
| c7 | verified | Own port, seeds 7001-8000: 46.175, 96.033, 197.433 -> 46, 96, 197; same RUN_SEEDS block as the 1,000-run. |

**Result:** every claim open at this pass is now verified.
