# Fact-check record: lh-offcuts-not-one-piece

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-offcuts-not-one-piece/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. Separate: floor(90/60)x60 + floor(50/60)x60 = 60; pooled floor(140/60)x60 = 120. At 75 cm: pooled 75 (also separate 75). Hook (90 and 50 cannot supply two 60 cm lengths) correct: 90 gives one, 50 gives none. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. Separate: floor(90/60)x60 + floor(50/60)x60 = 60; pooled floor(140/60)x60 = 120. At 75 cm: pooled 75 (also separate 75). Hook (90 and 50 cannot supply two 60 cm lengths) correct: 90 gives one, 50 gives none. |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. Separate: floor(90/60)x60 + floor(50/60)x60 = 60; pooled floor(140/60)x60 = 120. At 75 cm: pooled 75 (also separate 75). Hook (90 and 50 cannot supply two 60 cm lengths) correct: 90 gives one, 50 gives none. |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| hook (unrecorded: hook/title, no claim) | verified | Hook "A 90cm piece and a 50cm piece cannot supply two unjoined 60cm lengths." and title "Two offcuts are not one long piece" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** Separate: floor(90/60)x60 + floor(50/60)x60 = 60; pooled floor(140/60)x60 = 120. At 75 cm: pooled 75 (also separate 75). Hook (90 and 50 cannot supply two 60 cm lengths) correct: 90 gives one, 50 gives none.

**Advisories (not claim failures):** Advisory: at the recall input (75) separate and pooled coincide, so it does not show the gap; distractors 76/77 are arbitrary.

**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
