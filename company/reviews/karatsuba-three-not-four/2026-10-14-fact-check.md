# Fact-check: karatsuba-three-not-four (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | own node re-implementation of school()/kara() (scratchpad fc22/kara.mjs): leaves 64 and 27, both products equal BigInt 11111111^2; 12345678 x 87654321 gives 33 with Karatsuba, as stated. Stage reveal prints COUNTS[DEPTH]. |
| c2 | verified | same script: nodes per depth 1,4,16,64 / 1,3,9,27; largest factor length per depth 8,4,2,1, matching the table rows '4-digit', '2-digit', '1-digit'. |
| c3 | verified | BigInt: 11111111^2 = 123456787654321; both trees recombine to it; stage prints fmt(value) = 123,456,787,654,321. |
| c4 | verified | node: 1111*1111 + 1111*1111 = 2,468,642; 2222^2 - 2*1,234,321 = 4,937,284 - 2,468,642 = 2,468,642. Stage 'Check the middle' line prints CROSS and VIA from the top split. |
| c5 | disputed | 3^10 = 59,049 and 4^10 = 1,048,576 are right as an idealised count, but the reveal says 'for 1,024-digit numbers it is 59,049 products', with no 'size model' or 'about'. The lesson's own kara() run on real 1,024-digit inputs (scratchpad fc22/kara.mjs) needs 85,589 / 86,129 / 86,475 one-digit products (three random pairs) and 94,243 for the 1,024-digit repunit, because half-sums carry; schoolbook gives exactly 1,048,576. Fix (builder): say 'in the ideal count with no carries, 3^10 = 59,049 against 4^10 = 1,048,576', or give the real figure ('about 86,000 against 1,048,576'). |
| c6 | verified | T(n) = 3T(n/2) + O(n) gives Theta(n^log2 3), log2 3 = 1.58496 (node); re-derived, so the learner sentence does not rest on an unopened source. Karatsuba & Ofman, Doklady Akad. Nauk SSSR 145(2):293-294 (1962) confirmed bibliographically via search (mathnet.ru record); paper and CLRS not opened. |
| c7 | verified | algebra re-derived: xy = ac*10^2h + (ad+bc)*10^h + bd; (a+b)(c+d) - ac - bd = ad + bc. Matches the kids lists in school() and kara() and the box labels. |

**Result:** 1 claim disputed; the lesson cannot publish until the builder fixes the sentence and the claim is re-checked.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Reveal now says 'the ideal no-carry count is 59,049 products against 1,048,576 (3^10 against 4^10)': 1,024 = 2^10, T(n) = 3T(n/2) with T(1) = 1 gives 3^10 = 59,049, schoolbook 4^10 = 1,048,576. The pass-22 objection (real inputs carry) is met by 'ideal no-carry'. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: the claim reopened by the v3 wave E revision. Method: read v3 Demo.tsx (check box both lines, reveal, no Reset) before the source, then recomputed in node BigInt.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Halves 1111 each; 2,468,642 both ways (4,937,284 - 1,234,321 - 1,234,321). Identity holds on 10,000 random quadruples. Stage lines and reveal print the same values. |

**Result:** every claim open at this pass is now verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node BigInt port of split/school/kara (scratchpad fc26-b0/kara.mjs) on 11141313 x 13111224: schoolbook 64 leaves, Karatsuba 27, all leaves 1-digit, both trees recombine to X*Y. Example choice checked against its stated criteria: every digit is 1-4, the top-split halves 1114, 1313, 1311, 1224 are four distinct values, no Karatsuba leaf exceeds 1 digit. The builder search script itself (g3a0cd_kar.py) was not re-run; the example is disclosed as chosen. Stem and reveal print COUNTS[DEPTH]; no Reset; reduced motion jumps Split down to 1 digit to depth 3, same counts. |
| c2 | verified | Same script: nodes per depth 1/1, 4/3, 16/9, 64/27; largest factor length per depth 8, 4, 2, 1, so table rows read 4-digit, 2-digit, 1-digit with 4/3, 16/9, 64/27. |
| c3 | verified | BigInt 11141313n * 13111224n = 146076250397112n; fmt gives 146,076,250,397,112; school() and kara() values both equal it; stage prints fmt(col.tree.value) under both columns at depth 3. |
| c4 | verified | Own BigInt from split(X, Y), h = 4: a 1114, b 1313, c 1311, d 1224; a*d 1,363,536, b*c 1,721,343, sum 3,084,879; (a+b)(c+d) = 2427*2535 = 6,152,445, a*c 1,460,454, b*d 1,607,112, difference 3,084,879. Check lines print fmt(AD) + fmt(BC) = fmt(CROSS) and fmt(SUMS) - fmt(AC) - fmt(BD) = fmt(VIA); the reveal quotes the same constants; the Check button disables after one press, nothing clears it. |
| c5 | verified | 1,024 = 2^10; with no half-sum carry every split gives 3 half-size products, T(n) = 3T(n/2), T(1) = 1, so 3^10 = 59,049; schoolbook 4^10 = 1,048,576 (node). Reveal wording 'if no half-sum like a+b gains a digit' states the same no-carry condition that pass 23 accepted. |

**Result:** 5 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: cs/karatsuba-three-not-four v5. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own BigInt port of split/school/kara: 11141313 × 13111224 gives 64 schoolbook leaves and 27 Karatsuba leaves, all with ≤ 1-digit factors; both trees recombine to X·Y. v5 reveal 'Schoolbook needed 64 one-digit products; Karatsuba 27: 4·4·4 against 3·3·3' prints COUNTS[DEPTH]; reveal needs one-digit-leaves, so lvl = DEPTH. Reduced motion: Split to 1 digit jumps to DEPTH, same counts. Example disclosed as chosen. |
| c2 | verified | Own port: nodes per depth 1\|1, 4\|3, 16\|9, 64\|27; largest factor length per depth 8, 4, 2, 1. v5 table columns read 4-digit / 2-digit / 1-digit (DIGITS[1..3]) with rows Schoolbook 4 16 64 and Karatsuba 3 9 27, '?' until lvl > i. |
| c3 | verified | BigInt 11141313n * 13111224n = 146076250397112n; fmt gives 146,076,250,397,112. Top box appends ' = 146,076,250,397,112 (both)' only when lvl ≥ DEPTH and S.value === K.value; own port confirms both trees' values are equal. |
| c4 | verified | Own BigInt from split(X, Y), h = 4: a 1114, b 1313, c 1311, d 1224; a·d + b·c = 3,084,879; (a+b)(c+d) = 6,152,445; a·c 1,460,454; b·d 1,607,112; 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879. The identity (a+b)(c+d) = ac + ad + bc + bd is algebra. v5 check lines and reveal print exactly these constants; Check middle disables after one press and is required (middle-checked). |
| c6 | verified | Re-derived, not from the unopened sources: T(n) = 3T(n/2) + O(n) gives Θ(n^log2 3), log2 3 = 1.58496 (node); schoolbook T(n) = 4T(n/2) + O(n) gives Θ(n^2). Reveal 'about n^1.58 instead of n^2' accurate. Karatsuba & Ofman 1962 and CLRS not opened; the claim does not depend on them. Nit (builder): support could be 'derivation'. |
