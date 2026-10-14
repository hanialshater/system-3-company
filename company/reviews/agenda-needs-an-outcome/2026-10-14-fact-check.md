# Fact-check: agenda-needs-an-outcome

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | disputed | Hook says "Three discussion topics still do not name the decision needed", but the stage (message family) shows one topic ("plan"), then outcome ("choose") and owner ("Bo"); there are not three topics anywhere, so the learner is told a fixture fact the stage contradicts. FIX: reword hook and claim c1 to "A topic alone does not name the decision needed." (or add the three topics to the stage). |
| c2 | verified | Checklist convention stated as such; no effectiveness claim. |
| c3 | verified | Message model: count of fields = step+1 of 3, matches reveal sentence. |
| c4 | verified | Recall question/answer correct ("Choose plan plus owner" states outcome and owner). |

### Learner-visible factual sentences with no claim

- Stage caption "Exercise checklist" fine; no other unclaimed factual sentence.

Outcome: DISPUTED, blocks publishing until fixed.
