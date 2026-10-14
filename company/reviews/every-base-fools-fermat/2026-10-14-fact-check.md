# Fact-check: every-base-fools-fermat (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node check (fc21b/flt.mjs): a^(p-1) mod p = 1 for every a in 1..p-1 for all primes p < 2000, 0 failures; the theorem itself is Fermat's little theorem (standard proof via a, 2a, ..., (p-1)a permuting the residues). CLRS theorem number from memory, not opened; the sentence does not rest on it. |
| c2 | verified | Own BigInt node check (fc21b/fermat.mjs): 3*11*17 = 561; 320 bases in 1..560 coprime to 561; all 320 give a^560 mod 561 = 1. Matches Demo COPRIME / FERMAT_ONES. |
| c3 | verified | Own brute force (fc21b/fermat.mjs): no composite n in 4..560 has a^(n-1) = 1 mod n for every coprime a; 561 does, so it is the smallest Carmichael number. Carmichael 1910 and OEIS A002997 not opened (oeis.org blocked by proxy); the sentence is verified by the computation, not the citation. |
| c4 | verified | Own node check: 560 = 35 x 2^4; chain for base 2 = 263, 166, 67, 1, 1; 67^2 = 4489 = 8 x 561 + 1. Demo chain() gives the same; the reveal prints the chain up to the first 1 (263, 166, 67, 1), consistent. |
| c5 | verified | Re-derived: x^2 = 1 mod p means p / (x-1)(x+1), so x = 1 or p-1. Own node check: no nontrivial square root of 1 modulo any prime < 2000. CLRS corollary number from memory, not opened; not relied on. |
| c6 | verified | Own node chains: 5: 23,529,463,67,1; 7: 241,298,166,67,1; 10: 439,298,166,67,1; 13: 208,67,1,1,1. Each has a value other than 1 or 560 squaring to 1 (witness), and each gives a^560 = 1 (Fermat). Matches Demo BASES and witnessAt(). |
| c7 | disputed | DISPUTED. Own node check: counting all 320 coprime bases, 10 are strong liars: 1, 50, 101, 103, 256, 305, 458, 460, 511, 560. Demo LIARS excludes base 1 (9) but divides by all 320, so '9 of the 320' is wrong. Fix (builder): either '10 of the 320' or '9 of the 319 bases from 2 to 560' (change LIARS or the denominator in the reveal). The quarter bound (Rabin 1980; Monier 1980) cited from memory, papers not opened; 10/320 is well under 1/4 here. |

**Result:** 1 disputed (c7: strong-liar count is 10 of 320, or 9 of 319); lesson blocked until the builder fixes the count.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | disputed | Number fixed: own BigInt check gives 10 strong liars among the 320 coprime bases (1, 50, 101, 103, 256, 305, 458, 460, 511, 560), matching LIARS. DISPUTED on 'never more than a quarter': counted the lesson's way (of the coprime bases), n = 9 has 2 strong liars (1, 8) of 6 = 1/3; the Rabin-Monier bound is phi(n)/4 for odd composite n > 9 (own scan of odd composites below 4,000: max 1/4 apart from n = 9). The papers were not opened. Fix (builder): 'never more than a quarter for odd numbers above 9', or 'never more than a quarter of the bases from 1 to n - 1' (n = 9: 2 of 8). |

**Result:** 0 verified, 1 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v3 wave E revision. Method: read v3 Demo.tsx (note line, chain boxes, readouts, reveal quoting strongFor; no Reset) before the sources, then re-ran the numbers in my own BigInt script (scratchpad fc24/fer.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | All five chains match; each has the witness 67 (67^2 mod 561 = 1), so the reveal's quoted chain is right for any base the learner ran. |
| c7 | verified | 10 strong liars of 320 coprime bases; 3%. The 'very unlikely' rests on (10/320)^k for 561 only; no unopened paper is relied on. |

**Result:** every claim open at this pass is now verified.
