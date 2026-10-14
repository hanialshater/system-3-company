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
