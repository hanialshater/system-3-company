# Fact-check: agenda-needs-an-outcome

Independent claim checks for src/demos/lifehacks/agenda-needs-an-outcome. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Read StudyLesson.tsx (message family) and the spec first. The lesson's checklist is Topic, Outcome, Owner (spec.fields). Of the recall options, only 'Budget: Ravi picks option A or B' supplies an outcome (a choice) and a decision owner (Ravi). 'Discuss the options in depth' names an activity and 'update from the finance team' names a presenter; neither gives an outcome or a decision owner, so on the checklist each fills only the topic field. Non-blocking wording note for the owner: 'the others name only a topic' is loose (they add an activity or a presenter). 'the others name no outcome or decision owner' would be exact. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 4 claims in meta.json that the migration reset or added (meta version 3).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Fixture: one topic field filled, outcome and owner empty in mode A; the stage names no decider, so "The agenda doesn't say" is the only option the page supports. Stipulated data. |
| recall | verified | Reads the three stipulated agenda items: only "picks" names a choice and a decider. Convention, consistent with the lesson. |
| c4 | verified | consequence a/b and fields 1/3 vs 3/3 re-run; words plan/choose/Bo. scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |
| seen | verified | Re-run for predictions 0-2 (optionToMode a,a,a): identical to this text on every path. scripts in the fact-checker scratchpad fc-w740/ (home.mjs, study.mjs, misc.mjs: re-typed copies of engine-v2.ts and the models, cross-run against the real engine, 0 mismatches). |

**Result:** 4 verified, 0 disputed, 0 held (unverified).
