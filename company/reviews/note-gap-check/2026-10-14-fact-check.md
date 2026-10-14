# Fact-check: note-gap-check

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/note-gap-check/meta.json`, `Demo.tsx`, the `note-gap-check` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: recall. Verdict: all verified.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | verified | Recall check re-run: room/day/code = B4/Friday/627; position-match logic correct. Design claim about the fixture, derived from the rules; the cited Roediger & Karpicke (2006) reference was checked (Psychol Sci 17(3):249-255; prose passages, delayed tests at 2 days and 1 week favour testing, 5-minute test favours restudy; confirmed via PubMed and publisher listings in search results) but does not itself support this claim. Source is context only. |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | verified | Recall check re-run: room/day/code = B4/Friday/627; position-match logic correct. Design claim about the fixture, derived from the rules; the cited Roediger & Karpicke (2006) reference was checked (Psychol Sci 17(3):249-255; prose passages, delayed tests at 2 days and 1 week favour testing, 5-minute test favours restudy; confirmed via PubMed and publisher listings in search results) but does not itself support this claim. Source is context only. |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
