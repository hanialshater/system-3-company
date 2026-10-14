# Fact-check: reserve-an-unassigned-slot

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/reserve-an-unassigned-slot/meta.json`, `Demo.tsx`, the `reserve-an-unassigned-slot` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: schedule. Verdict: all verified.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | verified | Re-derived: focus 0-30, admin 30-50, call 50-60 -> hour 0-60 fully booked, 0 overlap, finish 60; target [0,40,60] -> admin 40-60, call 60-70, free interval 30-40 (10 min), finish 70. Correct. The reveal reports overlap and finish only; the free gap is visible in the diagram. Convention fixture; no external source needed (source line says so). |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | verified | Re-derived: focus 0-30, admin 30-50, call 50-60 -> hour 0-60 fully booked, 0 overlap, finish 60; target [0,40,60] -> admin 40-60, call 60-70, free interval 30-40 (10 min), finish 70. Correct. The reveal reports overlap and finish only; the free gap is visible in the diagram. Convention fixture; no external source needed (source line says so). |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
