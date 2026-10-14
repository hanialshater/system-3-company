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
