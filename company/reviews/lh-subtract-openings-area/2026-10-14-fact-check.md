# Fact-check: lh-subtract-openings-area (Subtract the opening once)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-subtract-openings-area/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (1 to 8, step 1), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: An ideal panel is 3m high and 4m wide, with one 2m² opening that needs no covering. Which area corresponds to the remaining surface? Marked answer: Net surface (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical inputs; claim text equals the details and assumptions lines the learner sees; no real-world fact asserted. |
| c2 | derivation | disputed | Arithmetic is right (3x-2 and 3x at every width 1-8). But "Geometry follows the declared dimension relationships" fails at the slider minimum: the picture draws the 2 m2 opening as a fixed 2 m x 1 m cut-out (28 x 22 px at 14 px/m by 22 px/m) while the panel is Width x 14 px wide, so at Width=1 m the opening (2 m wide) is wider than the panel (1 m), and at 2 m it spans the whole panel. FIX (builder): raise variable.min in resource-specs.json from 1 to 3 (the opening then lies inside the panel at every stop; start 4 and recall 7 unchanged), or draw the opening to fit. |
| c3 | derivation | verified | Claim text is identical to the principle shown at reveal. Each sentence re-derived by hand and in node; no hidden assumption. |
| c4 | derivation | verified | Recall answer re-derived in node; marked option is the only correct one among three distinct options; claim text matches the learner-visible question and why. |

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2.

Blocking: YES. Disputed claims block publishing until the builder applies the fix above and a re-check passes.
