# Operational readiness: lh-home-template-tp1-tp2

change: Home template (Life Hacks): TP-1 selected-state fix on the v1 stages; TP-2 on the v2 stage (both columns filled after the prediction, comparison reveal tokens, slider hidden when it changes nothing, plain-number option); wave W2 lessons moved to engine 2
change-tier: 2
paths: src/components/lifehacks/HomeLesson.tsx, src/components/lifehacks/HomeLesson.module.css, src/lib/lifehacks/engine-v2.ts, src/lib/lifehacks/home-models.ts, src/lib/lifehacks/home-lessons.ts, src/demos/lifehacks/*/meta.json (W2 lessons only)
author: demo-builder
approved-by: principal-engineer-ops
approved: 2026-10-15
approved-scope: commits d995f70 (TP-1) and bd11754 (TP-2) only. Wave W2 (b5ee4ca, the meta.json and home-lessons.ts paths above) is NOT covered by this approval
board: W-1066, W-1068, W-598, W-1070
risks: none
links: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md (TP-1, TP-2, TP-8, wave W2); company/design/specs/lifehacks-engines-v2.md sections 1-3; branch lh-home

Tier 2 because the Home engine renders 69 lessons (paths.json: src/components/lifehacks/** and src/lib/lifehacks/** are shared-engine). Not approved: principal-engineer-ops approves or refuses below before this ships. The author does not approve it.

## The check

1. **What can fail.** (a) A v1 Home lesson whose control in effect now looks selected could fail QA rule 3 if a control no longer changes the stage: it does not, because the pressed control stays aria-disabled exactly as before (only class, aria-pressed and a check mark were added). (b) A v2 lesson's slider hides when it should not: `homeSliderMatters` samples every slider step in both columns, so it hides only a slider that changes no cell; none of the 5 batch D lessons hides. (c) A wave lesson's reveal reads wrong at a slider value I did not try. Worst case: a learner sees a wrong number in a reveal. Learners would see it; no data is touched.
2. **How we would know.** `npm run test:lifehacks` (engines-v2 tests compute every v2 column and reveal at min, initial and max), the QA contract per lesson (`QA_ONLY=…`), and the r12 learner walk per wave. No production meter: these lessons are at `review`, not published.
3. **How to roll back.** `git revert` of the commits on lh-home (TP-1, TP-2, W2 are separate commits), a few minutes, no data loss, no founder needed until a deploy.
4. **Capacity.** None at run time: pure client rendering, no new requests. Build time unchanged (same lesson count). One local build dir (.next-lhh) during QA, deleted after.
5. **Security.** No new routes, parameters, scripts or secrets.
6. **Data.** Writes nothing. No learner data.
7. **Risks.** No register change proposed.

## Approval (written by principal-engineer-ops)

- Decision: **approved, with conditions, for d995f70 and bd11754 only.** Wave W2 (b5ee4ca) is out of scope. At b5ee4ca, `npm run test:lifehacks` gives 62/64: the inventory ratchet fails (test 6, "exactly the 14 batch D lessons are on engine 2", and test 14, the v1 default-options count of 54 against 64). The evaluation steward is fixing that ratchet. W2 needs its own approval (a separate record, or an addendum here) once the suite is green at its commit. Don't read this header as covering it.
- What I checked, before reading the record:
  - Both diffs. TP-1 adds `HomeMode` in HomeLesson.tsx, used on the generic, wobble, bow and cord stages. It adds `aria-pressed`, the `.mode`/`active` classes and an `aria-hidden` check mark, and it keeps `StageControl inactive`, so focus is kept per W-557. The opacity override `.inactive.mode:global(.active)[aria-disabled="true"] { opacity: 1 }` already exists in a11y.module.css, so the selected control renders at full opacity. a11y.tsx (shared with Study and Resource) is not touched.
  - TP-2 touches only the v2 stage and engine-v2.ts. The one visible change for today's 5 v2 lessons is (a), both columns shown after the prediction. `homeSliderMatters`, `homeDifference`, `plainNumbers` and the `{diff}`/`{ratio}`/`{amountX<i>}` tokens have no user at bd11754. All 5 v2 lessons keep their slider (I recomputed this; each call costs under 1 ms after warm-up, so it is fine to call on every render).
  - `npm run test:lifehacks` at bd11754, in a clean detached worktree: 64/64. I did not re-run the builder's QA contract (44/44, phone and desktop), tsc or check. Those are testimony. I accept them because of the blast radius below, not because I saw them.
- Why the blast radius is acceptable:
  - 69 lessons render through this engine, but TP-1 changes only the styling and ARIA of the v1 stage buttons. State, readouts, claims and lesson files are unchanged. TP-2 changes visible behaviour on 5 lessons, and only the early display of numbers.
  - Every affected lesson is at `review`, not published, so no learner sees this until a founder-approved deploy.
  - No data, routes, requests or event shapes change.
  - Rollback is `git revert d995f70` and/or `git revert bd11754` on lh-home. The two commits are independent: TP-2's only dependence is the `a11y` import that TP-1 adds, and it does not use that import. A revert takes minutes and loses no data. After a deploy, a revert also needs a new founder-approved deploy, or a Vercel rollback to the previous production deployment.
- Conditions, each with a board id. None of them gates this ship. Each must close before the work named in it.
  1. **W-598 (qa-tester): do not close W-598 as fully fixed on the strength of TP-1.** TP-1 fixes the visual half, and it adds `aria-pressed`. But the control in effect still carries `aria-disabled="true"`, as engines-v2 spec R1 requires, so a screen reader still announces it as "pressed, dimmed/unavailable". That is the second half of the defect written in W-598's slate item ("reads as disabled to sight and screen readers"). This is an objection to the spec, not to the build. It goes to accessibility-reviewer: board item to be added by the caller, owner accessibility-reviewer: "R1: should a pressed mode button carry aria-disabled? Decide before the Life Hacks launch slate ships."
  2. **W-1070 / W-1066 (demo-builder): unit tests before first use.** Add tests in tests/lifehacks for `homeDifference` (sign, opposite-sign values, zero smaller), `plainNumbers` formatting and `homeSliderMatters` before any lesson that uses `{diff}`, `{ratio}`, `plainNumbers` or a hidden slider is approved. That is W2 and later waves. Today's 64 tests do not exercise any of them.
  3. **W-1068 (qa-tester):** the selected-state check is still a proposal (spec section 297: "a pressed control must not have opacity < 1"), and `tests/qa/` is protected. Until the evaluation steward amends the QA contract, the selected state has no automated meter. It is checked only by eye in the r12 walk.
- What would make me revoke it:
  - Any v1 Home lesson in which a control that changed the stage before TP-1 no longer does (QA rule 3).
  - A v2 lesson in which the slider is hidden but a cell changes.
  - A reveal that shows a raw `{token}`.
  - `test:lifehacks` failing at either commit.
  - Either commit being merged together with b5ee4ca before W2 has its own approval.
- Objections raised, and what happened to each:
  - (a) *"risks: none"* is an understatement. The 69-lesson blast radius is the risk. It is accepted above, with a rollback written down, and no register entry is needed because nothing is published.
  - (b) *The record's change/paths lines include W2.* This is answered by the `approved-scope` header line: W2 is excluded.
  - (c) *aria-disabled on the pressed mode button.* Routed to accessibility-reviewer (condition 1). It does not block, because TP-1 is strictly better than what it replaces: it adds aria-pressed and removes the dimming, and it matches the spec as written.
  - (d) *CordStage's "Test 0.3m / Test 3m" now carry `aria-pressed`*, although the spec (line 79) calls them "seen" buttons that "only need the check mark". Both can read "pressed" at once. This is minor and has no learner-visible effect beyond the screen-reader wording. It goes with condition 1 to accessibility-reviewer, and demo-builder fixes it in the same pass if the reviewer agrees.
