# Fact-check: three-day-doubling (2026-10-13)

Checker: fact-checker (independent). Inline node arithmetic. Stage text from the walkthrough transcript; Demo.tsx read (cases = 100 x 2^(day/3); lit dots = floor(cases/100), 32 x 32 = 1,024 dots).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 30/3 = 10 doublings; 100 x 1,024 = 102,400 (about 100,000). |
| c2 | verified | Day 27: 51,200; day 30: 102,400, so the last 3 days add 51,200; days 0-27 add 51,100. "About as many" holds (within 0.2%). |
| c3 | verified | Day 24: 25,600; day 30 / day 24 = 4. Six days is two doublings. |
| c4 | verified (convention) | The stage lights floor(cases/100) of 1,024 dots, so day 30 lights all 1,024 and day 0 lights 1; stated on the stage ("Each lit dot is 100 cases"). |
| c5 | verified | Outbreaks do not double indefinitely: susceptibles are depleted and contact patterns change (Kermack & McKendrick 1927; Anderson & May 1991); the reveal says so. |

No unrecorded claims found.
