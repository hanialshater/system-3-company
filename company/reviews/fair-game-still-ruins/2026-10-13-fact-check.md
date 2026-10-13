# Fact-check: fair-game-still-ruins (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Gambler's ruin for a fair walk: P = a/(a+b). Feller vol. 1 ch. XIV covers it. Confirmed numerically in node by solving the harmonic recursion h_i=(h_{i-1}+h_{i+1})/2 with h_110=1: h_10=0.090909, h_50=0.454545. |
| c2 | verified | 10/110 = 9.09%; 50/110 = 45.45%; node recursion agrees. |
| c3 | verified | node: stage seeds give 2 of 30, 24 of 330 from $10 and 13 of 30 from $50. Over 60 other seed sets: $10/30 mean 2.3 (0-6), $10/330 mean 29.9 (19-39), $50/30 mean 13.7 (9-18); matches source and expectations 2.7/30/13.6. |
| c4 | verified | A +1/-1 fair step has mean 0. |
| c5 | verified | 90.9% of games from $10 end in ruin (c2); at $50 ruin is still the majority at 54.5%. Stage shows seeded illustration. |
| c6 | verified | Scope statement; real casino games have a house edge, so they are not fair. True. |
