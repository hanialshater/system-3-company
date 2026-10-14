# Fact-check: side-of-the-square (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | sqrt(50) = 7.0711; reveal prints ROOT.toFixed(2) = 7.07; dashed outline drawn at side ROOT. Not an integer (49 < 50 < 64). |
| c5 | verified | 25^2 = 625; 625/50 = 12.5; caption for 25 m reads "625 m²: too big (12.5× the target)"; reveal says halving does not find the side. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | area(12.5) = 156.25; 156.25 / 50 = 3.125, toFixed(1) = '3.1' (checked in node); caption '(3.1× the target)'; reveal sentence prints area(TARGET / 4). |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
