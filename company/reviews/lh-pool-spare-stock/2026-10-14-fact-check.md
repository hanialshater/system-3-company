# Fact-check: lh-pool-spare-stock (A spare elsewhere changes the gap)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-pool-spare-stock/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (1 to 20, step 1), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: There are two usable local units and five uncommitted units elsewhere that can be transferred at zero modeled cost. For ten required units, which external order is smaller? Marked answer: Pooled (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical inputs; claim text equals the details and assumptions lines the learner sees; no real-world fact asserted. |
| c2 | derivation | verified | Re-derived in node against an independent integer/decimal oracle at every slider stop (1 to 20, step 1): both formulas equal at 3-decimal display. Start values in the claim text match. |
| c3 | derivation | verified | Claim text is identical to the principle shown at reveal. Each sentence re-derived by hand and in node; no hidden assumption. |
| c4 | derivation | verified | Recall answer re-derived in node; marked option is the only correct one among three distinct options; claim text matches the learner-visible question and why. |

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2.

Blocking: no dispute.
