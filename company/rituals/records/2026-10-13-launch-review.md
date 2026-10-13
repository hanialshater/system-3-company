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
