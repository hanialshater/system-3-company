# Fact-check record: lh-count-before-dispatch

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-count-before-dispatch/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. Counted remaining = (record-2)-3 = record-5; recorded remaining = record-3. At 10: 5 vs 7; at 13: B=10. Hook (record 10, shelf 8, ship 3) consistent. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. Counted remaining = (record-2)-3 = record-5; recorded remaining = record-3. At 10: 5 vs 7; at 13: B=10. Hook (record 10, shelf 8, ship 3) consistent. |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. Counted remaining = (record-2)-3 = record-5; recorded remaining = record-3. At 10: 5 vs 7; at 13: B=10. Hook (record 10, shelf 8, ship 3) consistent. |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| hook (unrecorded: hook/title, no claim) | verified | Hook "The record says ten, the shelf has eight. Which count remains after shipping three?" and title "A count correction travels forward" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** Counted remaining = (record-2)-3 = record-5; recorded remaining = record-3. At 10: 5 vs 7; at 13: B=10. Hook (record 10, shelf 8, ship 3) consistent.


**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
