# Fact-check: a-birthday-like-mine (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Stated model assumption: 365 equally likely days (DAYS=365). Real birth rates are uneven; effect is small and the claim says it ignores them. |
| c2 | verified | node: 1 - prod(1-i/365) for i<23 = 0.5073; 1-(364/365)^23 = 0.0612. |
| c3 | verified | node: 1-(364/365)^183 = 0.3947. |
| c4 | verified | node: n=253 gives 0.50048; n=252 gives 0.49910; smallest n with >= 0.5 is 253. |
| c5 | verified | 23*22/2 = 253 pairs; 23 comparisons involve you; each matches with probability 1/365. |
| c6 | verified | Same computation as c4; 253 independent comparisons with you give 50.05%. |
