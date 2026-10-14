# Fact check: lh-big-pack-price

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/resource-specs.json plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** A = 3/0.5 = 6, B = 6/0.9 = 6.667 EUR/kg; recall x=7.5 gives 8.333. Keyed A correct. c2 source prints B=6.66666666667 (full precision) while the claim text says 6.667 (display). c5 NIST SP 1181 host unreachable.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json. Convention only; no real-world figure asserted. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: the values in the claim (start and recall) match, the keyed answer is consistent, and the stated full scale equals the max over the slider range. Boilerplate sentence "Geometry follows..." is inert in non-geometry lessons. |
| c3 | verified | Principle follows from the AST and stated limits (re-derived). |
| c4 | verified | Recall answer re-derived in node at the recall input; the keyed option equals the computed value. NOTE: the learning-designer recall patch (company/reviews/lifehacks-200/recall-patch-resources.json) replaces this recall after merge; c4 must be re-checked then. |
| c5 | unverified | Source unreachable: nvlpubs.nist.gov blocked from this environment (403 on CONNECT). Search confirms NIST SP 1181 (2025) is the Unit Pricing Guide and NIST Handbook 130 IV.C requires a consistent unit basis (for example price per 100 g or kg), which corroborates the sentence, but the cited section "Definitions / Unit Pricing and E-Commerce" was not opened. Re-check from a connected host. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
