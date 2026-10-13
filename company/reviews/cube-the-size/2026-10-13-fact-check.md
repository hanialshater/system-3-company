# Fact-check: cube-the-size, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A 6-inch cube is filled exactly by 3 × 3 × 3 = 27 cubes of 2 inches.... | verified | 6/2 = 3; 27 small cubes. Constants SMALL_IN=2, TARGET_K=3. |
| c2 Each small cube of the same material weighs 1 kg, so the 6-inch cube w... | verified | Same material, weight proportional to volume: 27 x 1 kg. |
| c3 Making a solid 3 times as wide, as deep and as tall multiplies its vol... | verified | Volume ratio k^3, area ratio k^2; reveal sentence (3 counts one direction, 9 counts two) is accurate. |
| c4 Each layer of the k-times-wide cube holds k × k small cubes, and there... | verified | k layers of k x k; caption in Demo.tsx computes it from k. |

Result: 4 verified, 0 disputed, 0 added unverified.
