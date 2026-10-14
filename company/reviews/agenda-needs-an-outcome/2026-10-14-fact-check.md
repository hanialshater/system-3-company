# Fact-check: agenda-needs-an-outcome

Independent claim checks for src/demos/lifehacks/agenda-needs-an-outcome. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Read StudyLesson.tsx (message family) and the spec first. The lesson's checklist is Topic, Outcome, Owner (spec.fields). Of the recall options, only 'Budget: Ravi picks option A or B' supplies an outcome (a choice) and a decision owner (Ravi). 'Discuss the options in depth' names an activity and 'update from the finance team' names a presenter; neither gives an outcome or a decision owner, so on the checklist each fills only the topic field. Non-blocking wording note for the owner: 'the others name only a topic' is loose (they add an activity or a presenter). 'the others name no outcome or decision owner' would be exact. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
