# Fact-check: sieve-crossing-out (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 25 survivors, all prime, equal to the 25 primes up to 100. |
| c2 | verified | If n=ab, a<=sqrt n<=10. |
| c3 | verified | node: 22..99 multiples of 11 all have factor 2,3,5 or 7; 11*11=121>100. |
| c4 | verified | Nicomachus, Introduction to Arithmetic I.13 is the ancient source ascribing the sieve to Eratosthenes (standard attribution). |

Stage check: Advisory (wording, not a claim failure): the reveal's last line 'Four sweeps clear a hundred numbers' is loose; the sweeps strike 74 of the 99 numbers from 2 to 100 and leave 25 primes.
