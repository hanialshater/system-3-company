# Fact-check: rolled-or-folded-volume

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Source: `origin/codex/lifehacks-200` read with `git show`; nothing checked out, built or run from the PR (models re-run in node from a copy of home-models.ts / home-lessons.ts). Lesson text compared with meta.json: claims c1-c5 equal the rendered idea / limit / formula / question / recall text. Status changes below are NOT applied to meta.json (lessons not in our tree yet); the machine-readable verdicts are in `company/reviews/lifehacks-200/fact-check-B2.json`, to be applied after the merge.

Model: `conserve`. Slider Count 8-20shirts, default 12.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Volume conserved: 30x20x0.2=120 cm3 per sheet; 12 -> 1440. |
| c2 | verified | Scope-limit statement; true of this card/code. |
| c3 | disputed | Arithmetic is right (N x 120) but the slider unit is 'shirts' (renders '12shirts') while the claim and Each=30x20x0.2cm describe a sheet. A shirt is not a 120 cm3 sheet. Fix: set spec.unit to ' sheets' (and label 'Sheets'), or state in the stage that each shirt is modelled as one 30x20x0.2 cm sheet. |
| c4 | verified | Prediction question; keyed answer index 2 ('Same outcome') confirmed against the model output. |
| c5 | verified | Question carries no factual assertion. The keyed answer is 'Check the mechanism and its stated constraints', which does not answer this question (see cross-cutting note); recall pattern is a learner-evaluator/builder matter. |

### Unrecorded learner-visible sentences
- Reveal line 'Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.' and the stage readouts (input line, result label) are generated from the model; they restate c3 and are correct, but are not recorded as claims.

### Verdict
DISPUTED: see the disputed row; publishing blocked until the builder applies the fix and a second pass re-checks. Cross-cutting: recall options for this lesson are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set whose keyed answer (option 0) does not answer the recall question; route to the builder and learner-evaluator (PR record blocker 5).
