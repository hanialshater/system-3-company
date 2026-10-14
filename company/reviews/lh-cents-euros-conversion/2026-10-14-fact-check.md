# Fact check: lh-cents-euros-conversion

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/resource-specs.json plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** 125/100 = 1.25, 125/10 = 12.5 (deliberately wrong); recall x=140 gives B = 14 (the keyed distractor-correct value for the wrong rule), A = 1.4. Hook "125 cents is not EUR 12.50" correct. Keyed Hundredths correct.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json. Convention only; no real-world figure asserted. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: the values in the claim (start and recall) match, the keyed answer is consistent, and the stated full scale equals the max over the slider range. Boilerplate sentence "Geometry follows..." is inert in non-geometry lessons. |
| c3 | verified | Principle follows from the AST and stated limits (re-derived). |
| c4 | verified | Recall answer re-derived in node at the recall input; the keyed option equals the computed value. NOTE: the learning-designer recall patch (company/reviews/lifehacks-200/recall-patch-resources.json) replaces this recall after merge; c4 must be re-checked then. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
