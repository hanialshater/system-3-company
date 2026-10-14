# Fact-check record: lh-fixed-energy-charge

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-fixed-energy-charge/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. A = 0.2u+10, B = 0.3u. At 40: 18 vs 12; crossover u=100 (stated, correct); at 70: B = 21. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. A = 0.2u+10, B = 0.3u. At 40: 18 vs 12; crossover u=100 (stated, correct); at 70: B = 21. |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. A = 0.2u+10, B = 0.3u. At 40: 18 vs 12; crossover u=100 (stated, correct); at 70: B = 21. |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| c5 | unverified | unverified (source unreachable): www.energy.gov.au and www.energyrating.gov.au did not resolve from this environment. Not guessed. Partial independent corroboration only: kWh = W x h / 1000 is the definition of the kilowatt-hour, and search snippets of the SA Government running-costs page and Energy Rating describe cost = kWh x tariff. The cited section ("Estimate running costs") was not read, so the source attribution stays unverified. Note the claim's own caveat (supports the general calculation, not the invented ratings) is correct. |
| hook (unrecorded: hook/title, no claim) | verified | Hook "A lower per-kWh price can still produce a higher total at small usage." and title "The fixed charge changes the bill" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** A = 0.2u+10, B = 0.3u. At 40: 18 vs 12; crossover u=100 (stated, correct); at 70: B = 21.


**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
