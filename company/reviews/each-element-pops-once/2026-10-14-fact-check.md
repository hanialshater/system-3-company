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

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | (off-by-one, the same as c6 had). Own run() (fc25/pops.mjs): on 9 8 ... 1 the stack costs 8 comparisons: numbers 2-9 make 1 each and the first number meets an empty stack and makes 0. The sentence says 'each new number is compared once with the top', which gives 9, not the 8 it states in the same sentence. Fix (builder): 'each later number is compared once with the top, which is bigger, and pushed (the first meets an empty stack)', matching the reveal's 'each later number'. |
| c6 | disputed | The v3 mechanics hold: own state-machine port (fc25/pops.mjs) of next/rest/pick, motion on and reduced motion. Counts: on 8..1 9 the 9 makes 8 comparisons, all pops; on 9..1 numbers 2-9 make 1 comparison each, 0 pops. Stack sizes: Next number x9 (motion) 8,8,7,...,0 then [9]; reduced motion, presses 9-18 give 8 (arrival), 7,...,0, then [9]; sawEmpty is set on both paths and is not set by a reduced-motion jump (All the rest, chip after a finished list, or All the rest mid-pops). Two problems remain. (1) The claim text says 'when the 9 is stepped or replayed the stack empties one box at a time', but under reduced motion a replay jumps in one frame (replay(): reducedMotion() -> setK(N)). Fix: 'when the 9 is stepped, or replayed with motion on'. (2) Stage pointer: the reveal says 'On 8 … 1 9, look at the 9's row: 8 solid ticks marked "8 pops"', in the present tense, and the stage stays visible beside the reveal. Reachable path: chip '8 … 1 9', All the rest (pops-seen), then chip '9 8 … 1' (finished, so it replays list 0: descending-done). The reveal then opens with list 0 on stage, where the 9's row is the first row with 0 stack ticks. Fix (builder): past tense tied to the record ('the 9's row showed 8 solid ticks marked "8 pops"'), or put list 1 back on stage when the reveal opens. |

**Result:** 0 verified, 2 disputed, 0 held unverified, 0 withdrawn. Disputes block publishing; the fixes are in the Basis column (owner demo-builder, board item added).

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run() (fc26-b0/pops.mjs) on 9 8 ... 1: per-number stack comparisons 0,1,1,1,1,1,1,1,1 = 8, 0 pops; the text now says each later number, the first meets an empty stack, matching both the count and the reveal. |
| c6 | verified | Own run(): on 8 ... 1 9 the 9 makes 8 comparisons, all 8 pops (stack empty after the eighth, no ninth test); ticks t < popped.length are filled (pop), the rest hollow with stroke 1.8 (stop); label '8 pops'. Own port of next(): presses 1-8 place 8..1, press 9 arrival (stack 8 boxes, pk 0), presses 10-17 pop one box each (7..0, label 1 pop..8 pops), press 18 pushes 9; next() has no motion branch, so reduced motion steps the same way. play() frames for the 9: q = 0..8 then push, each q frame held POP_MS = 260 ms. replay() under reduced motion calls setK(N) (jump), sawEmpty unchanged. On 9 ... 1 numbers 2-9 make 1 comparison, 0 pops (hollow tick). 'Down to the 9' = the stack reaches 0 boxes, then [9] is pushed. |

**Result:** 2 verified, 0 disputed, 0 held unverified, 0 withdrawn.
