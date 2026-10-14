# Fact-check: wheel-needs-four-colours (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own backtracker (fc21/wh.mjs) and an order-free exhaustive search over all k^6 colourings: chromatic number of the 5-wheel is 4; backtrack(4) gives C,1..5 = 1,2,3,2,3,4. |
| c2 | verified | Odd-cycle argument checked; the same exhaustive search shows the 5-cycle has no 2-colouring. |
| c3 | verified | Same search order as Demo.tsx: k = 3 -> 6 dead ends, 27 placements, first dead end region 5 with C..4 = red, blue, yellow, blue, yellow. |
| c4 | verified | 4-wheel: backtrack(3) succeeds (1,2,3,2,3), exhaustive chromatic number 3. |
| c5 | verified | Karp 1972 (chromatic number among the 21) and CLRS ch. 34 not opened; both match my knowledge. Garey, Johnson and Stockmeyer, 'Some simplified NP-complete graph problems', Theoretical Computer Science 1 (1976) 237-267, planar 3-colourability NP-complete: corroborated by web search (Academia record, TAMU lecture notes). 'No fast method is known' is an accurate reading of NP-hardness. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | disputed | Numbers hold: own node backtrack(4,3) and backtrack(4,4) both give red, blue, yellow, blue, yellow (3 used). But a reachable branch makes the reveal false: with 4 colours and Ring of 4 chosen while colouring by hand, paint C red, 1 blue, 2 yellow, 3 purple, 4 yellow (valid, 4 used). after() stores seen['4-4'] = {ok, used 4}; a later Run backtracking on that ring reaches ring-of-four (used 3) but setSeen keeps the first ok record. The reveal then says 'On the ring of four the two colours alternated all the way round: done with 4 colours' and the runs line '4 ring: done, 4 used'. Fix (builder): record only colourings using <= 3 colours for the ring-of-four record (or keep the smallest 'used' per key), so the quoted run is the one that reached the milestone. |
| c6 | verified | Own node backtrack(5,4): C, 1..5 = red, blue, yellow, blue, yellow, purple, 0 dead ends, 4 used; backtrack(5,3): 6 dead ends, stuck at region 5. Any valid colouring of the 5-wheel uses 4, so the s54 record is 4 on every branch. |

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node port (fc25/wheel.mjs): backtrack(4,3) and backtrack(4,4) both give C,1..4 = red, blue, yellow, blue, yellow, 0 dead ends, 3 used. v3 record rule checked: a 4-colour hand colouring then a 3-colour run keeps used 3; the reverse order keeps 3 too; best4 is the fewest-used ok record across 4-3 and 4-4, and the reveal quotes it only when used <= 3 (the ring-of-four milestone also needs u <= 3). The pass 24 path (hand 4 colours, then Run backtracking) now reveals 'done with 3 colours', and an even ring with C fixed alternates two colours, so the sentence is true on every branch. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
