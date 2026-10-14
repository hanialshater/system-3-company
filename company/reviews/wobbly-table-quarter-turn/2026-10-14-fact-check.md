# Fact-check: wobbly-table-quarter-turn

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Baritompa, Lowen, Polster, Ross, "Mathematical table turning revisited" (arXiv math/0511490, Math. Intelligencer 2007): search results for the arXiv record state the square-table intermediate-value argument shows a square table can be balanced (all four feet on continuous, not-too-wild ground) by turning on the spot, with cliff counterexamples. Node: illustrative gap 4cos(2*theta): 4 mm at 0 deg, 0 at 45 deg, -4 at 90 deg (sign change in a quarter turn). Page itself unreachable here (primary host unreachable from this sandbox (HTTP 403 via proxy / DNS blocked)); abstract-level support only, which is the level the claim asserts. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model in home-models.ts and the formula line shown on the stage (re-run in node, see c1). |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | verified | Keyed answer correct: feet-on-ground (existence result) does not imply a level top; the paper's result is contact, not levelness. |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: all claims verified.
