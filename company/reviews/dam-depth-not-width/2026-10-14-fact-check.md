# Fact-check: dam-depth-not-width (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 1000 x 9.81 x 10 = 98,100 Pa = 98.1 kPa; Demo pKpa has no width term. Edge case: widthsAt10 adds a width only when the width slider moves at 10 m, so a width reached at another depth then returned to 10 m is not logged; the log never shows anything false and the reveal names only logged widths. |
| c2 | verified | Derivation: column weight rho g h A over area A gives rho g h, independent of how many columns stand beside it. OpenStax UP1 14.1 not opened (host blocked); web search shows the OpenStax ch. 14 summary and its LibreTexts mirror derive p = rho g h from the column weight. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.
