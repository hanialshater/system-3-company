# EXP-001: Does our review process catch a planted false claim?

owner: evaluation-steward · status: designed, not run · date: 2026-10-12

## Hypothesis
Copies of one model reviewing with shared context are one witness. Isolation (artifact before
account) and claim addresses make a planted error less likely to survive. This adapts the book's
own unrun test to our process.

## Committed prediction
Plant one false claim in a lesson's stage text **and** in its build.md justification (for example
"each comparison places two cards"). Run the review under four conditions with the same model and
budget. Measure the share of 10 runs in which the false claim reaches a `verified` or `publish`
recommendation.

| Condition | Reviewers | Context |
|---|---|---|
| A | fact-checker + learner-evaluator, one model | read build.md first |
| B | same | artifact first; build.md only after their first findings |
| C | B, plus one reviewer on a different developer's model | artifact first |
| D | B, plus the claim exists in meta.json with an address and a derivation the fact-checker must re-run | artifact first |

Prediction: survival A > B > C, and D close to C at lower cost.

would_be_wrong_if: B survives as often as A (isolation bought nothing here); or D no better than B (claim addresses bought nothing).

## Design
10 runs per condition; 3 lessons from different domains; planted claims chosen by the founder,
not by the evaluation steward (the steward designs the harness and so must not know the plant).

## Result
(not run)

## What changed because of it
