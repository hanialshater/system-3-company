# Fact-check: elastic-loop-release (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c3 | verified | VERIFIED. home-lessons.ts formula = claim. homeColumn at every slider value 15-35: A 'Hair tie: on the cord', 'Hair ties on the cord 1 · still looped'; B 'off the end', '0 · free'. The pass-54/61 dispute ('crossings 1 / 0') is cleared: the stage now names what it counts. 'Nothing is cut' matches B (slide); no stretch is modelled. A closed loop round a cord with a free end can always be slid off it (the cord is an open arc), so the count is right. |
| c4 | verified | VERIFIED. Title and hook = meta.json; question, options, answer 1 = spec. Key 'Sliding it off the end' holds (see c3). 'Picking the knot apart' is false: there is no knot. Advisory, non-blocking (cm-lifehacks): 'Cutting it' also frees the cord in a literal sense; the reveal says 'nothing is cut', so the key is defensible, but 'What frees it without cutting anything?' would make it unique. |
| seen | verified | VERIFIED. homeRevealLine at the start value 20 (and every value 15-35, slider hidden: homeSliderMatters false) = the quoted sentence exactly: 'Pick at it: there is no knot to undo, so the hair tie stays on the cord. Hair ties on the cord: 1 (still looped). Slide it off: it slides off the end, and nothing is cut. Hair ties on the cord: 0 (free).' |

## Notes

- c4 advisory (cm-lifehacks, non-blocking): 'Cutting it' also frees the cord in a literal sense; 'What frees it without cutting anything?' would make the key unique.
- No claim here states a safety instruction. The W-1094 safety re-look named in the builder's reset note belongs to lifehacks-safety-reviewer.
