# Fact-check: buffer-for-a-late-finish

## Pass LH-1 (pre-merge, read-only)

Date: 2026-10-14. Checker: fact-checker (Ingrid), batch B3. Source of text: origin/codex/lifehacks-200 (read via git show, not checked out). I did not write these claims. Learner-visible text read from src/lib/lifehacks/{home-lessons,home-models,studyCatalog,studyModels}.ts and src/components/lifehacks/{HomeLesson,StudyLesson}.tsx; arithmetic re-run in node (types stripped, same code as the PR). Web: openstax.org, fieggen.com, arxiv.org, rei.com, ginetex.net, ncbi.nlm.nih.gov and wikipedia.org returned DNS/403 from this sandbox; only web-search snippets were available, used only to corroborate, never to mark a source claim verified outright.

Verdicts are for the PR head fetched 2026-10-14; they apply to meta.json after the merge (machine file: company/reviews/lifehacks-200/fact-check-B3.json).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Target [0,25,45]: draft 0-20, call 25-40, notes 45-55 leaves 5-minute gaps, so a 5-minute overrun of draft or call overlaps nothing (node). Note: the stage never shows a task running late, only the gap; the claim is true as arithmetic. |
| c2 | verified | A gap absorbs delay up to its length; hedged as a stated allowance. |
| c3 | verified | Matches calendarResult and the reveal sentence (0 overlap, ends minute 55 after the buffer; 0 overlap, ends 45 before). |
| c4 | verified | Keyed "A five-minute gap" correct. |

### Learner-visible factual sentences with no claim

- Hook "One task runs five minutes late" describes an event the stage never simulates; reveal does not mention it. Not false, but unshown.

Outcome: all claims verified.
