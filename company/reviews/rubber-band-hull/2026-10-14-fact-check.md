# Fact-check: rubber-band-hull (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own Andrew monotone chain (strict, scratchpad fc19b2/hull.mjs): 6 vertices (-1,4) (0,0) (6,1) (8,3) (7,7) (2,8). |
| c2 | verified | Own extremes: min x (-1,4), max x (8,3), max y (2,8), min y (0,0), all unique; own atan2 order from (0,0) puts (6,1) 1st and (7,7) 6th; both on the hull. |
| c3 | verified | Own scan with Demo.tsx's rule (pop on cross <= 0, ties nearer first): drops (5,2) -3, (2,2) -5, (3,3) -20, (4,5) -13, one per tap; ends on the 6 hull pins. Note for builder (source text only): (7,7) also shares the 45-degree angle with (2,2) and (3,3). |
| c4 | verified | Graham 1972, Inf. Process. Lett. 1(4) 132-133 and CLRS 3e 33.3 (O(n lg n)) cited from memory, not opened. Independent check: the sort is the only super-linear step; the scan pushes and pops each pin at most once (O(n)), so total is dominated by an O(n log n) sort. |
| c5 | verified | Derivation: (0,0)->(1,0)->(1,-1) is a clockwise (right) turn and cross((0,0),(1,0),(1,-1)) = -1. The cross of the two steps (a-o)x(b-a) equals (a-o)x(b-o), the quantity Demo.tsx computes. CLRS 3e 33.1 from memory. |

**Result:** every claim in this lesson is now verified.
