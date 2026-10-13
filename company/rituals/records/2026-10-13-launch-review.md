# Launch Review: 2026-10-13: first five lessons

chair: head-of-product (acting: chief-of-staff) · executes: release-manager · attests: qa-tester, fact-checker, learner-evaluator, analytics-steward

Lessons: minus-times-minus (math), scoops-in-three-cups (probability), release-the-spinning-ball (physics), odd-numbers-make-squares (math, v2), exponential-growth (math, v2).

## Gates
- [x] `company publish` passed for all five: claims verified by someone other than the builder, QA record present.
- [x] Computer-use QA: integrated run of 2026-10-13, 426/426 passed (phone + desktop), so records were filed for 208 lessons with `company qa-record`.
- [x] Borrowed-mind learner review with verdict **launch**, and the review names the current version. This is checked by hand because the gate does not read verdicts or versions yet (AMD-001 part d, proposed).
- [ ] Accessibility review: none held for these five. **Condition** (see below).
- [x] Confidence mark: none claimed (no human learners), so no `**` mark.

## Committed predictions (analytics steward, before launch)
| Metric | Prediction | Period | would_be_wrong_if |
|---|---|---|---|
| First revisit recall rate | ≥ 50% correct on the day-1 recall card | 2 weeks | < 35% across ≥ 30 first revisits |
| Reveal reached | ≥ 70% of starts reach the reveal | 2 weeks | < 50% across ≥ 50 starts |

No learner traffic exists until deploy (local only), so these predictions cannot be tested yet.

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| The gate passed 30 lessons as "ready" when only these 5 have a launch verdict. Publishing by hand-check is fragile. | evaluation-steward | Each of the five was checked by hand against the verdict and version; AMD-001(d) fixes the gate once the founder ratifies it. |
| No accessibility review yet. | accessibility-reviewer | Go with conditions: a review within the next cycle, and any lesson that fails it is unpublished. |
| QA's press-once path shapes lesson design (Goodhart). | evaluation-steward | Recorded as AMD-001 evidence; the learner review checks the pedagogy separately. |

## Decision
**Go with conditions.** An accessibility review of all 5 within the next cycle (board). Signed: chief-of-staff, acting for head-of-product.

## Second batch (same day): 12 probability lessons

armour-where-no-holes, at-least-one-boy, collect-all-six-faces, five-heads-then-what, one-in-a-million-daily, one-in-a-million-match, praise-then-slump, same-average-different-ride, small-hospital-big-swings, twenty-harmless-tests, which-coin-is-it, why-seven-wins.

- `company publish` passed for all of them: claims verified (fact-checks of 2026-10-12 and 2026-10-13), QA record from the integrated 426/426 run, learner review linked as evidence.
- Learner verdict is **launch** and names the current version (v1) for each, checked by hand (AMD-001 part d is still proposed).
- **Held back:** friends-have-more-friends. Its review said launch, but fact-check pass 2 found that verified claim c3 ("wherever friend counts differ") is false for disconnected networks. A lesson with a known-false sentence is not published, whatever the gate says (W-060).
- **Caveat on the evidence:** the reviewer's screenshot spot-check was partial (all three phases for 2 lessons, one or two images each for the rest). The transcripts were read in full. The objections travel with the launch: at-least-one-boy's grid counts look unequal next to "equally common", and twenty-harmless-tests leaves its tiles tappable after the batch run. Neither blocks; both are on the revision list.
- Accessibility review condition as above (W-057 now covers 17 lessons).

Decision: **go with conditions.** Signed: chief-of-staff, acting for head-of-product.
