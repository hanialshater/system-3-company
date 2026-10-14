# Fact-check record: lh-pay-for-used-quantity

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-pay-for-used-quantity/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. Ten-pack cost per used piece = 4/min(used,10): 5 used = 0.80 (principle: correct), 8 used = 0.50 (equals singles). Hook: sticker EUR 0.40/piece < 0.50 yet 0.80 per used piece at 5 used: correct. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. Ten-pack cost per used piece = 4/min(used,10): 5 used = 0.80 (principle: correct), 8 used = 0.50 (equals singles). Hook: sticker EUR 0.40/piece < 0.50 yet 0.80 per used piece at 5 used: correct. |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. Ten-pack cost per used piece = 4/min(used,10): 5 used = 0.80 (principle: correct), 8 used = 0.50 (equals singles). Hook: sticker EUR 0.40/piece < 0.50 yet 0.80 per used piece at 5 used: correct. |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| hook (unrecorded: hook/title, no claim) | verified | Hook "A ten-pack can have a lower sticker price per piece and a higher cost per used piece." and title "Price per item you actually use" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** Ten-pack cost per used piece = 4/min(used,10): 5 used = 0.80 (principle: correct), 8 used = 0.50 (equals singles). Hook: sticker EUR 0.40/piece < 0.50 yet 0.80 per used piece at 5 used: correct.


**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
