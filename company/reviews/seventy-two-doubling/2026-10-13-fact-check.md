# Fact-check: seventy-two-doubling, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 At 8% a year compounded yearly, money doubles in about 9 years: 1.08^9... | verified | 1.08^9 = 1.99900; exact ln2/ln1.08 = 9.006 y. |
| c2 With simple interest at 8%, where only the first 100 earns, doubling t... | verified | 100(1+0.08t)=200 -> t=12.5. |
| c3 The exact doubling time at rate r compounded yearly is ln 2 / ln(1 + r... | verified | (1+r)^T = 2 -> T = ln2/ln(1+r). Stage readouts re-derived: 9% -> 8.04 (shown 8.0), 12% -> 6.12 (6.1), 15% -> 4.96 (5.0); simple 100/r = 11.1, 8.3, 6.7 match. |
| c4 72 / rate gives 9 at 8%, 12 at 6% and 6 at 12%, and is within about 0.... | verified | /72/r - exact/ for r = 5..20: max 0.202 (at 20%), 0.193 at 5%; so "within about 0.2" is right (0.202 marginally exceeds 0.2). 72/r = 9 (8%), 12 (6%), 6 (12%). |

Disputed: none. Withdrawn: none.

Recall: 6% -> exact 11.9, 72/6 = 12, 100/6 = 16.7 "about 17"; all correct. Note on the reveal "the bars pull away and hit 200 sooner": the yearly bar is 199.9 at year 9 and 215.9 at year 10, so a year-by-year bar does not literally touch 200 at 9; the stage reads the exact time from the curve. A minor wording point, not an error.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
