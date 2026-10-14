# Fact-check: lh-voucher-minimum (The voucher has a minimum)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-voucher-minimum/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (10 to 40, step 1), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: A fictional voucher subtracts €5 only when the basket is at least €30. At €28, how do the totals compare? Marked answer: Equal (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical inputs; claim text equals the details and assumptions lines the learner sees; no real-world fact asserted. |
| c2 | derivation | verified | Re-derived in node against an independent integer/decimal oracle at every slider stop (10 to 40, step 1): both formulas equal at 3-decimal display. Start values in the claim text match. |
| c3 | derivation | verified | Claim text is identical to the principle shown at reveal. Each sentence re-derived by hand and in node; no hidden assumption. Every stop 10-40 checked: discount 0 below EUR 30, EUR 5 from EUR 30 (floor(min(1,x/30))). |
| c4 | derivation | verified | Recall answer re-derived in node; marked option is the only correct one among three distinct options; claim text matches the learner-visible question and why. |

Notes: Every stop 10-40 checked: discount 0 below EUR 30, EUR 5 from EUR 30 (floor(min(1,x/30))).

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2.

Blocking: no dispute.
