# Fact-check: selfish-routes-cost-a-third-more (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node check: B = 60x < 60 for every x < 1 (all 5% stops), equal at x = 1. Stage note text matches. |
| c2 | verified | Own grid over 0..100%: average 60 - 60x + 60x^2, minimum 45 at x = 50%, B = 30 there; 60/45 = 1.333. Average >= 45 > 30 everywhere. |
| c3 | verified | Re-derived: adding a driver raises 60x for all on B; the joiner compares only own time. E&K (2010) ch. 8 (Modeling Network Traffic using Game Theory) placement from memory, confident; not opened. |
| c4 | disputed | DISPUTED (wording of the class). Roughgarden & Tardos ('How bad is selfish routing?', FOCS 2000 / J. ACM 2002) prove the 4/3 bound for linear (affine) latencies a*x + b; confirmed by web search snippet only, paper PDF blocked. But the sentence says 'delays that grow in proportion to traffic', and road A (constant 60) is not proportional; with purely proportional delays a*x, equilibrium equals optimum (marginal cost 2ax is proportional to delay), so the example would not be in the stated class. Fix (builder, reveal and claim): 'With delays that are a fixed time plus a part proportional to traffic, that is the worst it can ever be.' |
| c5 | verified | Demo A_MIN = 60, timeB(pct) = 60*pct/100; predict question states the same. |

**Result:** 1 disputed (c4: "grow in proportion to traffic" names the wrong class; the 4/3 bound is for affine delays, fixed plus proportional). Lesson blocked until the wording is fixed.
