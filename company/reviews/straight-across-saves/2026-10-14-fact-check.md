# Fact-check: straight-across-saves (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | DISPUTED. The theorem half is fine ((a+b)^2 = c^2 + 2ab > c^2 for a,b > 0). But the stage caption says 'e^2 + n^2 = X, and its square root is S' with S = Math.round(hypot): at the starting position (100, 200) it reads '...= 50,000, and its square root is 224', yet sqrt(50,000) = 223.6. Same at (100,100) 141 vs 141.42 and most other cells; only Pythagorean cells like (300,400) are exact. Fix (builder): caption 'its square root is about S' (or use = only when exact), and match the claim text. |
| c4 | verified | Convention, true of the model: Demo.tsx uses Euclidean distance on a plane (Math.hypot) with no obstacles; the reveal says 'Flat ground assumed.' Source wording note: 'Flat ground' appears only in the reveal, not on the stage, and 'nothing in the way' is implied, not stated. |

**Result:** disputed: c3 (blocks publishing until the builder fixes and a fact-checker re-checks).

## Pass 20

Checker: fact-checker (did not write these claims). Re-check of the builder rewording: claim read against Demo.tsx (stage text and reveal), numbers re-run in own node scripts, Demo.tsx parsed with the TypeScript parser (no syntax errors). No build run.

| Claim | Result | Basis |
|---|---|---|
| c3 | verified | Caption at Demo.tsx line 75 adds 'about ' unless S*S equals e^2+n^2. Own node: (100,200) 50,000 -> 'about 224' (223.61); (300,400) 250,000 -> '500' exact; (100,100) 'about 141'. Theorem half re-derived: (a+b)^2 = c^2 + 2ab > c^2 for a,b > 0. |
