# Fact-check: twice-as-hot-not-twice-as-fast (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Re-checked v2: sqrt(600/300) = 1.4142, sqrt(1200/300) = 2 exactly. Demo.tsx shows (v/V0).toFixed(2): 1.41x at 600 K, 2.00x at 1,200 K; 2x mark drawn at 2*V0. |
| c4 | verified | Re-checked v2: 300-273.15 = 26.85 (27), 600 -> 326.85 (327), 1200 -> 926.85 (927); slider label uses t-273, giving 27/327/927. Absolute zero is 0 K by the definition of the kelvin (SI Brochure 9th ed., from memory). Predict text agrees (300 K = 27 C, 600 K = 327 C). |

**Result:** every claim in this lesson is now verified.
