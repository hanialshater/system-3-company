# Fact-check: random-dots-cluster (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | batch() draws two uniform mulberry32 numbers per dot, independent. |
| c2 | verified | node: pCrowded(40) = 0.55503. Independent Monte Carlo (400,000 Math.random batches): 0.5541. |
| c3 | verified | node: pCrowded(25)=0.1823, pCrowded(30)=0.2931; Monte Carlo 0.1830 and 0.2921. |
| c4 | verified | node: seed 9000 first 111 batches give 60 ringed (54%); 300 other seed sets: mean 61.9, range 48-77 (source: 61.4, 47-74). Consistent. |
| c5 | verified | Follows from c2 (55.5% of random batches contain a 3+ square). No real-world claim. |
