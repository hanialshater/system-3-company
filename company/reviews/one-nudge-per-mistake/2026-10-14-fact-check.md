# Fact-check: one-nudge-per-mistake (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | checkOne(): wrong if l*score <= 0; shaded polygon is w.x + b >= 0; with w = 0 every score is 0, so (1,1) is nudged first (own trace). Locked caption says the same. |
| c4 | verified | Own trace: (1,1)+ score 0 -> 3 (rise 1+1+1 = 3); (-1,0)- score 0 -> -2 (fall 1+0+1 = 2); both rings go red -> green; a point already right triggers no update. Bishop 2006 section 4.1.7 not opened; matches my knowledge. |
| c5 | verified | Own copy of restOfSweep(): after one 'Check next point', caption reads '(-1,0) −: score 0 → wrong, nudge. Then 3 points right, no change.'; labels nudge 1 (1,1), nudge 2 (-1,0). The stage prints the coordinate with an ASCII hyphen '(-1,0)' where the claim has '(−1,0)': typographic only. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
