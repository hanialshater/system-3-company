# Fact-check: spacer-protects-clearance

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Node: opening 30 -> nominal 30-28=2, bounded (30-1)-(28+1)=0; bounded is below nominal by 2 for every opening 27-35. Matches claim. |
| c2 | verified | Scope limit; true of the card and its code, asserts nothing beyond the model. |
| c3 | verified | Matches model in home-models.ts and the formula line shown on the stage (re-run in node, see c1). |
| c4 | verified | Prediction prompt matches the learner-visible question; the keyed answer is correct at the stated default values. |
| c5 | verified | Recall prompt matches the lesson and the keyed option is correct. |

### Learner-visible factual sentences with no claim

- Title "A fit with no margin is fragile" is a general engineering assertion with no claim; add a convention claim or soften.

Outcome: all claims verified.
