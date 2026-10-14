# Fact-check: each-element-pops-once (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran run(): scan 36 = 8+7+...+1; no answers. |
| c2 | verified | Re-ran run(): stack 8 comparisons, 0 pops. |
| c3 | verified | Re-ran run() on 8 7 6 5 4 3 2 1 9: scan 36, stack 15 (7 + 8), 8 pops, answers 9 x8 then none. |
| c4 | verified | Derivation checked; brute-force next-greater equals stack answers on all 5040 orders of 1..7. |
| c5 | verified | comparisons <= pops + (n-1) checked on all 5040 orders of 1..7 (max 11 for n = 7 < 2n); '9 pushes and 9 pops' is a valid (loose) bound. CLRS 4e ch. 16 amortized analysis cited from memory; not needed for the sentence. |

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | disputed | DISPUTED. The counts hold (own run(): on 8..1 9 the 9 makes 8 comparisons, 8 pops; on 9..1 numbers 2-9 make 1 comparison each and pop nothing). But 'the stack empties one box at a time down to the 9' holds only on the replay path (All the rest, or a chip after a finished list), not with reduced motion. Reachable counter-path: choose '8 ... 1 9' first and press Next number 9 times. On the 9th press pk = null, so the stack jumps from 8 boxes to [9] in one frame, and pops-seen still fires. The reveal then says 'while the stack emptied box by box down to the 9', which that learner never saw. Fix (builder): either step the pops frame by frame on Next number too, or make the reveal clause depend on a recorded 'saw the pops replayed' flag (and handle reduced motion). Nit: on 9..1 the first number meets an empty stack (0 comparisons), so 'each number's single comparison' should say 'each later number'. |

**Result:** 0 verified, 1 disputed, 0 held (unverified), 0 withdrawn.
