# Fact-check: cut-the-rod-for-more (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo PRICE = [1,5,8,9], shown in the predict stem and stage note. CLRS Figure 14.1 prices from memory (1 5 8 9 10 17 17 20 24 30), not opened; the prices are a lesson convention either way. |
| c2 | verified | node rod.mjs, Demo solve(): 1 5 8 10, cut 2+2. Own enumeration of the 8 ordered cuttings of 4: 4 7 7 9 7 10 9 9; only 2+2 = 10. |
| c3 | verified | Derivation: every cutting has some first piece k, and the rest is a cutting of n-k worth at most best(n-k), achieved by its best cutting; so best(n) = max_k p(k) + best(n-k). Matches Demo solve() and the choice list. CLRS 14.1 from memory, not opened. |
| c4 | verified | Demo TABLE = solve(PRICE) computed once; choices(n) reads TABLE[n-k] for k = 1..n, all already filled because the learner fills in order. |
| c5 | verified | node: Demo solve on 1 5 8 9 10 17 17 20 gives best 1 5 8 10 13 17 18 22, pieces 2 + 6; own brute force over all 128 compositions of 8 also gives 22. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node port of solve(): best(1..4) = 1, 5, 8, 10, pieces 2+2; brute force over all cuttings agrees; length-4 cut list reads 1+best(3) $9, 2+best(2) $10, 3+best(1) $9 (= $8 + $1), whole $9. Length 3 ($8) is the most expensive of the cut pieces offered ($1, $5, $8). Reveal values are constants of the table, true after Start over too. |
| c3 | verified | Stage strings re-generated in node: note "best(n) = largest of: first piece + best of the rest"; lines "k + best(n - k): $p + $r = $t" and "whole n: $p + $0 = $p". |
| c4 | verified | Rows fill in order (Fill / Fill the rest), so every "k + best(m)" line at length n reads a row m < n that is already filled; TABLE is computed once. Outline: reused = n - first only when the kept cut is not whole, which is row 2 at length 4 (lengths 1-3 keep the whole piece, no outline). "1 + best(3)" is the first line of the length-4 list, on stage at best-4 (needed for the reveal); after Start over the reveal's past tense holds. |

**Result:** 3 verified, 0 disputed, 0 held unverified.
