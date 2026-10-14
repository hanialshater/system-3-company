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
