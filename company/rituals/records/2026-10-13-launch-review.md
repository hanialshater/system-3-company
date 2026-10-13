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

## Third batch (same day): 8 chemistry lessons

drunkards-reach, lower-the-hill, same-heat-different-rise, squeeze-the-brown-gas, the-two-drop-cliff, water-follows-the-crowd, who-runs-out-first, why-gas-spreads.

- `company publish` passed for all eight. Their learner verdict is **launch** on the current version (v1), checked by hand.
- **Held back as stale:** summit-kettle and the-tagged-molecule. Their launch verdicts were written for v1, but the claim-fix builder has since revised them to v2, so their changed claims are unverified and they need re-review.
- **Waiting on a QA record:** heat-in-no-rise, most-collisions-bounce, one-ml-of-steam and steel-wool-gains-weight. They are wave 3 lessons, built after the integrated run, and are in the current QA batch.
- **Objection that travels:** the reviewer says the first rounds of screenshot reads failed, so several early verdicts rest mainly on the transcript. It also reports reveal text clipped at the card bottom in three lessons, none of which is in this batch. Platform-engineer board item.

Decision: **go with conditions** (accessibility review, W-057). Signed: chief-of-staff, acting for head-of-product.

## Fourth batch (same day): 4 chemistry lessons

heat-in-no-rise, most-collisions-bounce, one-ml-of-steam and steel-wool-gains-weight were published through `tools/publish-ready.mjs --publish`. Each has a launch verdict on the current version and passed every gate. Their QA records come from the 80-lesson QA run, on a build that contained them.

**Incident, recorded here because it touched launch evidence:** that run went against a stale build (268 lessons, from 06:23). My rebuild had been killed by my own `pkill -f`. The 20 newest math and economics lessons therefore 404'd and were recorded as QA "fail". Those 20 records are false and were deleted, not committed. The lessons are being re-run on a fresh 298-lesson build. Mechanism: before any QA or walkthrough run, the checklist now checks that the build contains every lesson (count the HTML pages under `.next-*/server/app/d/` and compare with the lesson count).

## Fifth batch (same day): 18 life lessons

cell-too-big, cut-the-island, epidemic-overshoot, falling-yet-adding, fastest-at-the-bend, few-survivors, five-day-generations, immunity-eats-r, isolate-by-day-three, leaky-vaccine-threshold, mouse-vs-elephant, pockets-below-threshold, same-genes-different-drift, slow-across-a-room, stale-case-counts, ten-percent-up, three-day-doubling and who-has-grandchildren. Each has a launch verdict on v1 and passed every gate; their claims were verified in fact-check pass 2.

**Objection that travels:** about 12 of the reviewer's 29 life lessons have a hook or answer option that leans on the answer, and several reveals are clipped at the card edge (W-061). Neither was rated blocking for the 18 published lessons.

**Incident:** friends-have-more-friends was published with v1, the version whose c3 is known false, and unpublished within minutes. Cause: I lifted its hold in the same command as the merge of its v2 revision. The merge silently failed, because a worktree branch is listed as `+ name` and my `tr` left the `+`, while the hold release still ran. Fix: holds are lifted only after the merged version is confirmed in meta.json, in a separate step. The hold is restored until v2 is re-reviewed.

The 30 lessons left without a QA record all passed (60/60) on the fresh 298-lesson build.

Decision: **go with conditions** (W-057 accessibility, W-061 clipping). Signed: chief-of-staff, acting for head-of-product.
