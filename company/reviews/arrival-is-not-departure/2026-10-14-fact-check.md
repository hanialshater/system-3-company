# Fact-check: arrival-is-not-departure

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook arithmetic: arrival 40 minus 20-minute trip = 40-20 = 20. Rows: travel 30-50 initially overlaps visit 40-55 by 10; target [20,40,55] gives 0 overlap and first task ends at 40 (spill 0) - node via calendarResult. |
| c2 | verified | Start = arrival minus duration is correct; the real-traffic hedge is present. |
| c3 | verified | Matches calendarResult/observation sentence (overlap minutes, finish minute, spill vs minute 40). |
| c4 | verified | Keyed "Minute 20" correct. |

### Learner-visible factual sentences with no claim

- None found beyond the computed readouts, which claim c3 (the formula/model) covers.

Outcome: all claims verified.
