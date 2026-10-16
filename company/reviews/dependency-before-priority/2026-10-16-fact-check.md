# Fact-check: dependency-before-priority

Independent claim checks for src/demos/lifehacks/dependency-before-priority. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook and question are both 'Which runs first?'; options 'The draft it needs' / 'The high-priority review', answer 0. The locked stage already shows 'review 10 min · due 60 · needs draft · high priority'. Note for demo-builder (not a fact issue): hook and question are the same sentence. |
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): review→draft→send 1 job run before its input (review needs draft), waiting 40; draft→review→send 0, waiting 50, reveal adds '10 more minutes of waiting ... the goal here is running each job after the job it needs'. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run: durations review 10, draft 20, send 5; dependencies review←draft, send←review; priority tag on review. Review first: breaches 1, waiting 0+10+30 = 40. Draft first (Swap first and Try target both give draft→review→send): breaches 0, waiting 0+20+30 = 50. 10 more, 50 against 40. Matches. |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.dependency-before-priority.c1: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/dependency-before-priority/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
