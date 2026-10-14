# Fact-check: never-flag-99 (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own enumeration of score() for 0-50: n=20 gives 8 caught, 12 false alarms, 0.986. First setting below 99.0% is 11 if the learner slides one step at a time; the reveal quotes seen, which matches the claim text. |
| c4 | verified | accuracy = (990 + caught - false alarms)/1000, so it is above 99.0% exactly when caught > false alarms; checked for every slider value 0-50. |

**Result:** all claims in this pass verified; no disputes.
