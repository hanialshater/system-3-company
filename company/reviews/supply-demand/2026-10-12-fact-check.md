# Fact-check: supply-demand (2026-10-12)

Checker: fact-checker. Script: `artifacts/scratch/fc-supply-demand.mjs` (tabulates want, bake, sold over $2-$10, searches for the price that maximises sold, and replays the price-step button).

## Per-claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 illustrative linear model, demand 100 − 10p, supply 10p − 20, $2 to $10 | verified | Matches Demo.tsx. Both lines reach 0 at the edges of the range (D(10) = 0, S(2) = 0). Declared made-up on the reveal and in the trust sheet. |
| c2 cross at $6, 40 loaves | verified | 100 − 10p = 10p − 20, p = 6, q = 40. |
| c3 sold = smaller of want and baked | verified (convention) | Short-side rule; consistent with the Demo and with the table (at $7.50: want 25, baked 55, sold 25). Mankiw ch. 6 pinpoint not re-read (book unreachable). |
| c4 $4 cap: want 60, bake 20, sold 20, 40 short | verified | 60, 20, 20, 40; half of 40 as the reveal says. |
| c5 sold is largest at the crossing price | verified | Search over $2-$10 in $0.01 steps: argmax $6, q = 40. Sold(p) = min of a falling and a rising line. |
| c6 shortage pushes price up, surplus down | verified | Standard adjustment story; the Demo's step button replays it ($4 to $6 in four steps, $10 to $6 in eight). |
| c7 real caps bring queues, black markets, lower quality | verified (substance) | Mainstream: searched course slides on Mankiw ch. 6 list shortage, search time/lines and black market under rent control. "Lower quality" and the exact ch. 6 text were not retrieved; the print copy should be checked for the pinpoint. |

Disputed: none. Withdrawn: none.

## Model labelling
Present: reveal ("A model: straight lines, made-up numbers, nothing else changing. Real caps can also bring ...") and trust-sheet c1. Absent on the predict and explore stages, which present "Bread sells for $6 and 40 loaves sell a day" as plain fact and show no model word.

## Learner-visible statements not previously recorded (added as unverified)

- c8 "A lower price pulls buyers in and pushes sellers out." (general sentence in the reveal)
- c9 Surplus statements on the stage: above $6 the extra loaves "go unsold" (at $7.50: 25 wanted, 55 baked, 30 unsold).

Also noted: the reveal sentence "The most loaves change hands at $6, where the two lines cross" is recorded as c5 only "in this model"; the learner-facing sentence is not qualified inside that sentence (the model label is in the paragraph below).

## Fixes routed to demo-builder (phrased as problems)

1. The predict and explore stages show no sign that this is a toy model; the label appears only after the answer. A learner could carry "a cap at $4 halves bread" away as a real-world number.
2. The reveal sentence "The most loaves change hands at $6" reads as a fact about markets; it is true of this model (and holds in the ordinary textbook case) but should carry "In this model".
3. The "Let price move" button, used while the cap is on, moves the price above the cap with no mention that the cap has been lifted; the learner sees $4 become $4.50 under a "Cap at $4" button.

## Result
7 verified, 0 disputed, 2 added unverified.
