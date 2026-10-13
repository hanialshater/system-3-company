# Fact-check: base-rates, claims c6-c9 (2026-10-13)

Checker: fact-checker (independent of the 2026-10-12 checker who added c7 and c8). Script: artifacts/scratch/fc-problife/a4.mjs. Stage and reveal read from artifacts/walkthroughs/base-rates/transcript.md.

| Claim | Result | Basis |
|---|---|---|
| c6 | verified | Casscells, Schoenberger & Graboys (1978), NEJM 299(18): 999-1001 exists; 60 participants (students, house officers, staff at Harvard Medical School teaching hospitals); most common answer 95% (reported as 45% of respondents, consistent with 27/60); 11/60 gave about 2%. I could not find a source stating "27" directly; 45% x 60 = 27. Re-computed: 0.001/(0.001+0.999 x 0.05) = 1.96% with sensitivity 1; 1.94% with 0.99. The reveal says "if the test catches every case", which is the right condition. Only the 95% share rests on a secondary source. |
| c7 | verified | Positive predictive value at 1 in 1,000 / 1 in 100 / 1 in 10 with 99% sensitivity and 1% false-positive rate: 0.0902, 0.5000, 0.9167 (about 9%, 50%, 92%). |
| c8 | verified | 1 in 10,000: per 10,000 people 0.99 true positives and 99.99 false positives; PPV 0.0098, about 1 in 100 (more exactly 1 in 101). The recall card's option "About 1 in 100" is correct. |
| c9 | verified | The Demo's rounding reproduces the transcript: 1 sick / 10 false = 11 positives; 10 / 10 = 20; 99 / 9 = 108. At 1 in 10 one sick person tests negative (100 sick, 99 flagged), consistent with the 99% sensitivity. |

c1-c5 were verified earlier and are not re-opened. No unrecorded claims found.
