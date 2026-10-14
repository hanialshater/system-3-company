# Fact-check: the-loser-flips-the-winner (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own count: A 3x2 + 0 = 6, B 3x1 + 2x2 = 7, C 0 + 2x1 = 2; log line 'With C: B wins 7-6 (C 2)'. |
| c2 | verified | Own count without C (1/0): A 3, B 2; log 'Without C: A wins 3-2'. |
| c3 | verified | Own gaps A-B per ballot: with C +1, +1, +1, -2, -2 (C between B and A on ballots 4-5), without C +1, +1, +1, -1, -1; B's 4 beats A's 3, then A's 3 beats B's 2. |
| c4 | verified | Learner sentence 'Points voting like this can let a last-placed option pick the winner' is an existence claim proved by the stage's own example (c1-c3): no voter's A-B order changes, yet the A-B outcome flips when last-placed C is removed, which is a violation of IIA by its definition. E&K ch. 23 and Borda (1781) not opened; not relied on. |
| c5 | verified | Rule text on stage and ballotPoints(): n-1 points for 1st down to 0 among candidates still running. |

**Result:** 5 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node port of ballotPoints/gapAB/leadSums: the row reads exactly "Lead sums with C: B 2 + 2 = 4, A 1 + 1 + 1 = 3. Without C: A 1 + 1 + 1 = 3, B 1 + 1 = 2."; totals with C A 6, B 7, C 2 (margin 1 = 4 - 3), without C A 3, B 2 (margin 1 = 3 - 2). The row is rendered whenever gaps is true, and gaps is never cleared. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
