# Fact-check: stop-when-it-looks-significant (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Standard z-test with normal approximation, BAND = 1.96; the |H-T|/sqrt(n) form equals |z|. |
| c2 | verified | Independent dynamic programme in node (absorb at first n in 10..100 with |d|/sqrt(n) > 1.96): 0.28541 = 28.5%. |
| c3 | verified | node: exact binomial P(|2H-100|/10 > 1.96) = 0.05689 (5.7%). |
| c4 | verified | node: seed 6000 gives 23 flagged by peeking and 5 by end-only among 100 coins; first 20: 6 and 0. Over 300 other seed sets: peeking mean 28.3 (15-40), end-only 5.8 (0-13), matching source and the exact 28.5% / 5.7%. |
| c5 | verified | Follows from c2/c3. Armitage, McPherson & Rowe (1969) 'Repeated significance tests on accumulating data', JRSS A 132(2): 235-244 exists and shows the false-positive rate rises with the number of looks (their table: roughly 14% at 5 looks, 25% at 20, 32% at 50 looks at the nominal 5% level, consistent with 28.5% here). |
