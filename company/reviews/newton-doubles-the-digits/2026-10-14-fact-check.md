# Fact-check: newton-doubles-the-digits (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node (fc21/newton.mjs) with the 45-digit sqrt(2) string, itself checked by a BigInt Newton root: digits 1, 1, 3, 6, 12, 15, 15 for g0..g6. Note for builder (not blocking): the reveal quotes updates 1-4 as '1, 3, 6, then 12', while this claim text includes g0 ('1, 1, 3, 6, then 12'); both are true, consider matching the claim text to the reveal. |
| c2 | verified | Own check: g = 1.5 is 0.0858 high, 2/g = 1.3333 is 0.0809 low; the expansion 2/(√2 + e) = √2 - e + e²/√2 - ... holds. |
| c3 | verified | Identity (g + 2/g)/2 - √2 = (g - √2)²/(2g) checked numerically: predicted next errors 8.58e-2, 2.45e-3, 2.12e-6, 1.59e-12 equal the actual ones. |
| c4 | verified | Own run: g5 = 1.4142135623730949, 15 digits, error -1.25e-16 (< 2^-52 ≈ 2.2e-16 spacing); g6 === g5. Caveat recorded: the nearest double to √2 (Math.SQRT2 = 1.4142135623730951) scores 16 by the lesson's own count, and is not itself a fixed point; '15 digits, the limit' is read as the usual ~15 reliable digits of a double (DBL_DIG = 15). Acceptable; builder may prefer 'about the limit'. |
| c5 | disputed | Newton = averaging rule: verified by derivation. The historical half is not checked: the learner sentence says the rule is 'the ancient Babylonian one', but the builder's own source says how YBC 7289 was computed is not recorded, and the Fowler & Robson (1998, Historia Math. 25:366-378) abstract, seen via web search only, reconstructs a geometric method rather than confirming this rule. Heron's Metrica not opened. Fix (builder): 'the rule known as the Babylonian (or Heron's) method', or cite an opened source for Babylonian use. |

**Result:** 4 verified, 1 disputed, 0 withdrawn.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own run, sqrt(2) reference from my own BigInt Newton root: digits 1, 1, 3, 6, 12, 15, 15 for g0-g6; the reveal prints DIGITS[1..4] = 1, 3, 6, 12, matching the claim text. |
| c5 | held (unverified) | HELD, not verified. Newton half re-derived: g - (g^2 - 2)/(2g) = (g + 2/g)/2. The naming half ('known as the Babylonian (or Heron's) method') is a historical-naming fact that only an outside source can establish, and every host was unreachable (wikipedia, mathpages, arxiv: DNS failure); only search-result summaries agree. Per the pass-23 rule I do not verify on a source I cannot open. To clear: a human opens any reference (e.g. Wikipedia 'Methods of computing square roots') or the builder drops the naming clause. |

**Result:** 1 verified, 0 disputed, 1 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | With the naming clause dropped, only the derivation remains: Newton's step for f(g) = g^2 - 2 is g - (g^2 - 2)/(2g) = (g + 2/g)/2, the same as Demo.tsx line 24, next = (g + 2/g)/2. Checked symbolically and numerically (g = 1 -> 1.5 -> 1.41666...). |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
