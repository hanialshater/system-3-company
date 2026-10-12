# Fact-check: compound-interest (2026-10-12)

Checker: fact-checker. Script: `artifacts/scratch/fc-compound-interest.mjs` (year-by-year multiplication loop; compared with the closed form, max difference 7e-12).

## Per-claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 balance = deposit × (1 + rate)^t | verified | Loop equals closed form for t = 0..40. |
| c2 $1,967 after 10 y (gain $967), $14,974 after 40 y | verified | 1967.15, gain 967.15, 14,974.46. |
| c3 simple interest gives $3,800 after 40 y | verified | 1000 + 40 × 70 = 3,800. (It is the total balance, not the interest; see fix 1.) |
| c8 straight-line extension of first decade gives about $4,900 | verified | 1000 + 4 × 967.15 = 4,868.61, rounds to $4,900 at hundreds. |
| c4 years 31-40 add $7,362, about 7.6 times $967 | verified | 14,974.46 − 7,612.26 = 7,362.20; ratio 7.612. Decade gains: 967, 1,903, 3,743, 7,362. |
| c5 interest on interest $11,174, about three quarters of $14,974 | verified | 14,974.46 − 3,800 = 11,174.46; share 0.746. |
| c6 roughly doubles every 10 years | verified | 1.07^10 = 1.967; exact doubling time 10.245 y. |
| c7 labelled as a model | verified | Reveal states "A model: a steady 7% with no fees, taxes or inflation. Real returns wobble." Matches Demo.tsx. The trust sheet adds yearly compounding and no withdrawals; the reveal omits those two, but the question says the interest stays in. |

All walkthrough readouts also re-computed and match: 13 y $2,410 / added $1,185 / interest on interest $500; 23 y $4,741 / $2,331 / $2,131; 26 y $5,807 / $2,855 / $2,987; 36 y $11,424 / $5,617 / $7,904; 39 y $13,995 / $6,881 / $10,265; 40 y $14,974 / $7,362 / $11,174; 10 y $267 interest on interest.

Disputed: none. Withdrawn: none. Model labelling: present, but only at the bottom of the reveal.

## Learner-visible statements not previously recorded
None found. Hook, predict question, options, reveal and readouts are covered by c2, c3, c4, c5, c6, c7, c8.

## Fixes routed to demo-builder (phrased as problems)

1. "Plain 7% of $1,000 a year gives $3,800" can be read as total interest; it is the total balance (interest is $2,800). The next sentence's "The rest, about $11,174" depends on the balance reading, so a careful learner can stumble.
2. The model label arrives only after the learner has committed and read the reveal; the predict stage presents 7% a year as a plain fact. Low priority, since it is labelled.

## Result
8 verified, 0 disputed, 0 added unverified.
