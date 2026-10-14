# Fact-check record: lh-count-sheets-not-rolls

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-count-sheets-not-rolls/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. A = 6/(6x120) = 0.00833; B = 5/(4x240) = 0.00521; at 270, B = 0.00463. Crossover at 150 sheets/roll (slider 100-300 straddles it). |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. A = 6/(6x120) = 0.00833; B = 5/(4x240) = 0.00521; at 270, B = 0.00463. Crossover at 150 sheets/roll (slider 100-300 straddles it). |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. A = 6/(6x120) = 0.00833; B = 5/(4x240) = 0.00521; at 270, B = 0.00463. Crossover at 150 sheets/roll (slider 100-300 straddles it). |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| c5 | unverified | unverified (source unreachable): nvlpubs.nist.gov returned a proxy 403 from this environment and www.nist.gov did not resolve; a web search confirmed that NIST SP 1181 (2025 ed.), DOI 10.6028/NIST.SP.1181e2025, exists and is a unit-pricing best-practice guide covering e-commerce, but its Definitions section and its consistent-units text could not be read. The sentence is plausible and general, but I did not read the cited section. Re-check from a connected host. |
| hook (unrecorded: hook/title, no claim) | verified | Hook "Six rolls or four rolls? The count inside each roll changes the arithmetic." and title "Count sheets, not just rolls" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** A = 6/(6x120) = 0.00833; B = 5/(4x240) = 0.00521; at 270, B = 0.00463. Crossover at 150 sheets/roll (slider 100-300 straddles it).

**Advisories (not claim failures):** Advisory (presentation, not factual): display rounds to 3 decimals, so A shows 0.008 and B shows 0.005 at both 240 and 270; the recall answer (0.005) equals the value already seen at the start, and the true 0.00463 is shown as 0.005. Consider showing cents per sheet or per 100 sheets.

**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
