# Fact-check: batch-by-setup

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Tags A,B,A cost: initial order A1,B1,A2 has 2 switches (4 min); grouped A1,A2,B1 has 1 (2 min) - node via queueResult. Cost of two minutes is stated in the hook. |
| c2 | verified | Correct and hedged (does not estimate real concentration cost). |
| c3 | verified | Matches queueResult (waiting 21 vs 12 minutes, switches 2 vs 1). |
| c4 | verified | Keyed "Group equal tags" correct. |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: all claims verified.
