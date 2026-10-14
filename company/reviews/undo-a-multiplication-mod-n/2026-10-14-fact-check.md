# Fact-check: undo-a-multiplication-mod-n (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node undo.mjs: 7x mod 26 over x=0..25 hits all 26 residues, only x=15 gives 1; 105 = 4 x 26 + 1. Matches predict key (option 15) and reveal. |
| c2 | verified | node, Demo euclid(26,7) copied: remainders 26 7 5 2 1 0, quotients 3 1 2 2; stage rows j=1..4 print exactly these four equations. |
| c3 | verified | node, Demo BACK loop copied: coefficients (1,-2), (-2,3), (3,-11); 78 - 77 = 1. Row text 'swap in 2 = 7 - 1 x 5', 'swap in 5 = 26 - 3 x 7' matches. |
| c4 | verified | Derivation: 3 x 26 = 0 mod 26, so -11 x 7 = 1 mod 26; ((-11 % 26) + 26) % 26 = 15 = Demo X. |
| c5 | verified | node: 77 % 26 = 25, 133 % 26 = 3 (133 = 5 x 26 + 3). Reveal branches on prediction 0 and 2 only. |
| c6 | verified | Verdict rests on the derivation (both directions re-done; existence when gcd = 1 is exactly what extended Euclid constructs, as on the stage). CLRS 4e 31.2/31.4 cited from memory, not opened. |
| c7 | verified | node: a in 1..25 with gcd(a,26)=1 -> 12 (odd numbers except 13); 13x mod 26 takes only 0 and 13. Matches Demo INVERTIBLE. |
| c8 | verified | Rivest-Shamir-Adleman paper and CLRS not opened (hosts blocked). Web-search results (CACM 21(2):120-126, 1978; lecture notes e.g. Rosulek ch. 13, Grenet RSA slides) state d = e^-1 mod phi(n), computed by extended Euclid. Verified on those secondary sources; the learner sentence is general and does not quote the paper. |

**Result:** 8 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | v2 Demo: back-substitution gives (3, -11); 3 x 26 - 11 x 7 = 1; ((-11 % 26) + 26) % 26 = 15; 7 x 15 = 105 = 4 x 26 + 1. Reveal prints COEF_A = -11, X = 15, floor(105/26) = 4. All 4 milestones (incl. bezout, read-15) are required before the reveal. |
| c5 | verified | node: 77 % 26 = 25, 133 % 26 = 3. Reveal branches on prediction 0 (11) and 2 (19) only. Ring label 'your 7 x 11 = 77 -> 25' shows when on x7 and x has been read off; the x13 view's summary row shows the same text once read. |
| c6 | verified | Rests on the derivation, not on CLRS (not opened): b x 7 = 1 (mod 26) from reducing 1 = a x 26 + b x 7; conversely 7b - 1 = k x 26 means any common divisor of 7 and 26 divides 1; extended Euclid constructs a, b when gcd = 1. Reveal: 'An undo exists exactly when the gcd is 1'. |
| c7 | verified | node: a in 1..25 with gcd(a, 26) = 1 -> 12 (odd numbers except 13) = Demo INVERTIBLE; reveal '12 of the 25 non-zero hours'. |
| c9 | verified | Own copy of hits(): x7 over x = 0..25 gives 26 distinct hours; x13 gives {0, 13}. Captions 'lands on all 26 hours' / 'lands on only 0 and 13' match. |
| c10 | verified | Own euclid(26, 13): r = [26, 13, 0], q = [2]: one row '26 = 2 x 13 + 0', gcd 13. Any a x 26 + b x 13 is a multiple of 13, so never 1. Stage note 'gcd = 13, not 1: no way to write 1. x13 has no undo.' and readout 'Undo x13: none' after the no-undo milestone. |

**Result:** 6 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
