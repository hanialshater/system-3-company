# Fact-check: towel-over-two-bars

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: 70x140 cm both faces = 1.96 m2; touching 50% -> 0.98 m2, separated 1.96 m2. Geometric-model statement; the 50% fraction is stated on the stage as an assumption. OpenStax 13.6 (evaporation inhibited by humidity) corroborated via a mirror in search results; the openstax.org page itself was unreachable (primary host unreachable from this sandbox (HTTP 403 via proxy / DNS blocked)). The claim does not depend on it. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model in home-models.ts and the formula line shown on the stage (re-run in node, see c1). |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | verified | Recall prompt matches the lesson and the keyed option is correct. |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: all claims verified.
