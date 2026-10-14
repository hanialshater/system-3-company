# Fact-check: lids-match-by-size

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Source: `origin/codex/lifehacks-200` read with `git show`; nothing checked out, built or run from the PR (models re-run in node from a copy of home-models.ts / home-lessons.ts). Lesson text compared with meta.json: claims c1-c5 equal the rendered idea / limit / formula / question / recall text. Status changes below are NOT applied to meta.json (lessons not in our tree yet); the machine-readable verdicts are in `company/reviews/lifehacks-200/fact-check-B2.json`, to be applied after the merge.

Model: `diameter-match`. Slider Opening diameter 14-24cm, default 18.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Mismatch=/opening-20/ for the colour lid; 0 for the matching-diameter lid (p=14,18,24 -> 6,2,4 vs 0). |
| c2 | verified | Scope-limit statement; true of this card/code. |
| c3 | verified | Matches code. Advisory: at opening=20 the colour-choice mismatch is also 0, so the 'colour fails' story is false at that one slider value (not a factual error). |
| c4 | verified | Prediction question; keyed answer index 1 ('Match diameter') confirmed against the model output. |
| c5 | verified | Question carries no factual assertion. The keyed answer is 'Check the mechanism and its stated constraints', which does not answer this question (see cross-cutting note); recall pattern is a learner-evaluator/builder matter. |

### Unrecorded learner-visible sentences
- Reveal line 'Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.' and the stage readouts (input line, result label) are generated from the model; they restate c3 and are correct, but are not recorded as claims.

### Verdict
All claims verified pre-merge; no disputes. Cross-cutting: recall options for this lesson are the generic 'Check the mechanism and its stated constraints / Assume the layout always works / Ignore the stated inputs' set whose keyed answer (option 0) does not answer the recall question; route to the builder and learner-evaluator (PR record blocker 5).
