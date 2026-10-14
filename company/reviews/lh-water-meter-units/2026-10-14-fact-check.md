# Fact-check: lh-water-meter-units (Litres and cubic metres)

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B8 of PR #2 (origin/codex/lifehacks-200; untrusted contributor content, read via git show only, nothing checked out, built or run). Method: the claims in src/demos/lifehacks/lh-water-meter-units/meta.json compared with the learner-visible text from src/lib/lifehacks/resource-specs.json (title, question, options, details, assumptions, principle, recall) and the stage and reveal templates in src/components/lifehacks/ResourceLesson.tsx and src/lib/lifehacks/resource-model.ts. I did not read the contributor's review records. Arithmetic re-derived in node with an independent oracle over the whole slider range (1000 to 3000, step 100), plus the prediction answer and the recall answer. Verdicts are to be applied to meta.json after the merge.

Question as shown: A converts litres to cubic metres by dividing by 1,000. B incorrectly keeps the same numeric digits. For 1,500L, which result has the correct cubic-metre unit? Marked answer: Converted (re-derived at the start value, correct).

| Claim | Support | Verdict | Note |
|---|---|---|---|
| c1 | convention | verified | Declared hypothetical, plus the real conversion 1000 L = 1 m3: exact by definition (litre = dm3 = 0.001 m3; corroborated by secondary sources RSC and UKMA via search; the BIPM brochure itself was not opened). Verified. Recommend the builder cite a primary source for the conversion rather than "convention". |
| c2 | derivation | verified | Re-derived in node against an independent integer/decimal oracle at every slider stop (1000 to 3000, step 100): both formulas equal at 3-decimal display. Start values in the claim text match. |
| c3 | derivation | verified | Claim text is identical to the principle shown at reveal. Each sentence re-derived by hand and in node; no hidden assumption. |
| c4 | derivation | verified | Computation right (B keeps the digits: 1,800 "m3" for 1,800 L; options 1,800/1.8/1,802). Wording risk for the builder, not a factual dispute: the claim text says "Correct: 1,800m3" for the deliberately wrong B, which a learner could read as 1,800 L = 1,800 m3. Suggest the option read "1,800m3 (digits kept)" or the claim text say "B shows". |

Unrecorded learner-visible factual sentences: none of substance. The "Full scale: ..." caption and the reveal's "At the prediction's ..., A gives ... and B gives ..." sentence come from the same model and are covered by c2.

Blocking: no dispute.
