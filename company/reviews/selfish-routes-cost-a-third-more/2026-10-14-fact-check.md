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

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Reveal wording now 'a fixed time plus a part proportional to traffic' (affine). Bound re-derived: Wardrop equilibrium f satisfies sum l(f)f <= sum l(f)f*; for l = ax + b, l(f)f* <= l(f*)f* + a f^2/4 <= l(f*)f* + l(f)f/4, so C(f) <= (4/3) C(f*). Example: 60/45 = 4/3, so it attains the bound. Roughgarden-Tardos not opened; not relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
