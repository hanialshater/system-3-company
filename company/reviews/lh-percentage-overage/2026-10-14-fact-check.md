# Fact-check: lh-percentage-overage (Ten extra or ten percent extra)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-percentage-overage/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (20 to 120, step 5), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: Compare an order with 10% extra, rounded up, against an order with ten extra tiles. For 40 required tiles, which order is larger? Marked answer: Ten extra (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical inputs; claim text equals the details and assumptions lines the learner sees; no real-world fact asserted. |
| c2 | derivation | disputed | Stage prints ceil((x x 1.1)) but evaluates it in floating point: 50*1.1=55.00000000000001, 100*1.1=110.00000000000001, so the stage shows A=56 at Required=50 (exact 55), A=100 at 90 (exact 99), A=111 at 100 (exact 110) and A=122 at 110 (exact 121); the "Full scale" caption shows 133 where the exact maximum is 132. The claim "results are computed by the printed expressions" is false at those slider stops. FIX (builder, resource-specs.json): formulaA -> ["ceil",["/",["*","x",11],10]] (integer arithmetic, exact at every slider stop). Then recheck A at 50/90/100/110 = 55/99/110/121 and full scale 132. |
| c3 | derivation | disputed | "The formulas match only at that crossover" (one hundred) is false. Exactly, ceil(1.1x)=x+ceil(0.1x), which equals x+10 for every 90<x<=100, so the orders match at 95 and 100 on this slider. With the present float bug the stage instead shows a tie at 90 (A=100,B=100) and none at 100 (A=111,B=110), contradicting the sentence a second way. FIX (principle text; reveal and recall.why copy it): replace the last sentence with "The two orders are equal for requirements from 91 to 100 (95 and 100 on this slider); above 100 the percentage order is larger." Keep "At forty, 10% is four; at one hundred, 10% is ten." (both true). Apply with the c2 formula fix. |
| c4 | derivation | disputed | The recall answer is right (Required=55: B = 55+10 = 65; options 65/61/67, only 65 is B). But the claim text, and the recall.why shown to the learner, embed the false sentence "The formulas match only at that crossover". FIX: same replacement sentence as c3 in recall.why and in this claim text; then re-verify. |

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2 (and are wrong at the float-affected stops, see c2).

Blocking: YES. Disputed claims block publishing until the builder applies the fix above and a re-check passes.
