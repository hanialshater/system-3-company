# Fact-check: wet-knit-hang-stretch

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: 600 g -> 300 vs 100 g-equivalent per point (2 vs 6 equal supports). GINETEX natural-drying set including flat drying confirmed by search results on GINETEX's own brochure/newsletter; ginetex.net page itself unreachable (primary host unreachable from this sandbox (HTTP 403 via proxy / DNS blocked)). Model hedged: no stretch predicted. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model in home-models.ts and the formula line shown on the stage (re-run in node, see c1). |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | verified | Recall prompt matches the lesson and the keyed option is correct. |

### Learner-visible factual sentences with no claim

- Title "Hanging concentrates the load" and slug imply that hanging stretches wet knits; no claim records this, and the lesson states it does not predict stretch. Add a claim (or leave the slug as an internal name).

Outcome: all claims verified.
