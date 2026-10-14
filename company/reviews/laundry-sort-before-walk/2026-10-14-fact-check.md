# Fact-check: laundry-sort-before-walk

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid). Source: `origin/codex/lifehacks-200` read with `git show`; nothing checked out, built or run from the PR (models re-run in node from a copy of home-models.ts / home-lessons.ts). Lesson text compared with meta.json: claims c1-c5 equal the rendered idea / limit / formula / question / recall text (c5 and recall.why are the custom recall for this lesson). Status changes below are NOT applied to meta.json (lessons not in our tree yet); the machine-readable verdicts are in `company/reviews/lifehacks-200/fact-check-B2.json`, to be applied after the merge.

Model: `trips`. Slider Count 4-12items, default 8.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Per-item trips 2x4xN vs one 8 m trip: N=4,8,12 -> 32,64,96 vs 8. 'Unlimited capacity' is stated. |
| c2 | verified | Scope-limit statement; true of this card/code. |
| c3 | verified | Code: 2*a*(changed?1:p) with a=4. |
| c4 | verified | Prediction question; keyed answer index 1 ('Grouped trip') confirmed against the model output. |
| c5 | verified | Custom recall: round trip 3+3=6 m; 6 trips=36 m; 2 trips=12 m; option 'Correct answer 36 m and 12 m' verified in node. Keyed option 0 is correct. |

### Unrecorded learner-visible sentences
- Reveal line 'Your prediction held. / Not quite. The current <layout> setting gives <value><unit>.' and the stage readouts (input line, result label) are generated from the model; they restate c3 and are correct, but are not recorded as claims.

### Verdict
All claims verified pre-merge; no disputes. Cross-cutting: recall options for this lesson are specific and the keyed answer is correct.
