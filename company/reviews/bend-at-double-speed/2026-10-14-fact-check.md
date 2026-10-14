# Fact-check: bend-at-double-speed, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Going round a bend takes a sideways push that grows with the speed squ... | verified | m v^2 / r <= mu m g gives r_min = v^2/(mu g); mass cancels, r_min grows with v^2. |
| c6 At 54 km/h the tightest safe bend is 50 m, at 81 km/h 112.5 m and at 1... | verified | Own node: mu = 225/(9.81 x 50); r_min = 50.0 m at 54 km/h, 112.5 m at 81, 200.0 m at 108. |

Result: 2 verified, 0 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node: mu = 15^2 / (9.81 x 50) = 0.4587; r_min = v^2/(mu g) = 50.0 m (54 km/h), 112.5 m (81), 200.0 m (108), 312.5 m (135). Demo.tsx 'Tightest safe bend so far' lists seen speeds; reveal mentions 81 only if seen. Non-blocking: header comment describes the radius slider as 50..400 step 50 but code is 50..350 step 75 (code comment only). |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
