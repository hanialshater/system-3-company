# Launch Review: 2026-10-25 (r22): math/flatten-the-cube-to-a-dot v2

executes: release-manager (Diego) · chair: head-of-product (**not signed**, see "Decision") · attests by their records: qa-tester, fact-checker, learner-evaluator, design-lead · go: the founder, `company/decisions/2026-10-25-founder-cube-pairwise-after-publish.md` (system3-meta `docs/decisions/2026-10-25-founder-approvals.md` item 4)

Tree read at `2b93dfe60` plus this run's meta.json edit (evidence.simulatedLearner linked, status published).

## Gates (`npm run company -- publish flatten-the-cube-to-a-dot`, 2026-10-25)

The command ran the full `launchGates` (claim floor plus AMD-013 readiness) and **passed** with no failure line.

- [x] All claims verified by someone other than the builder: c1-c9 `verified`, checkedBy fact-checker (`company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md`, passes 1-3; c8 W-2055, c9 W-2064).
- [x] Computer-use QA record, phone and desktop, on v2: `2026-10-25-qa-v2.md` (stamped `lesson version: v2`, result pass). The sequence probe "back" check passes with the committed fixed probe `6b356b804` (readiness `company/engineering/readiness/2026-10-25-w2047-sequence-probe-settle.md`). Re-run by me on a private build of this tree: `tests/qa/contract.spec.ts` (QA_ONLY this lesson and euclid-three-steps) 4/4 pass; `tests/qa/feed.spec.ts` 10/10 pass.
- [x] Borrowed-mind learner review on v2: `2026-10-25-learner-knows-faces-not-euler-v2.md` and `2026-10-25-learner-no-convex-v2.md`, both `Verdict: launch`. Linked in `evidence.simulatedLearner` by this run (they were on disk, not linked).
- [ ] Accessibility review: no accessibility-reviewer record. Not a coded gate. QA v2 ran keyboard and reduced-motion checks (QA observations, not a review).
- [x] Confidence mark matches evidence: confidence is empty (no `**`); no human learners claimed.
- Same-code check: `git diff 3e365688e HEAD -- src/demos/math/flatten-the-cube-to-a-dot/` touches only `meta.json` (claim records and evidence). Demo.tsx and styles.module.css are what QA and both walks saw.
- Design review `2026-10-25-design.md`: revise on v1; D1 and D2 fixed in v2 (W-2056), seen fixed on screen by the v2 learner walk.
- `publish-holds.json` does not name the lesson.

## The pairwise

Lane M step 7 (first 3 items: design review **plus** pairwise against a single-card twin) is a **lane rule** (`company/ops/projects.json` lane-multi-card flow; proposal §2c). It is **not** in `launchGates` in `tools/company.mjs`, which did not ask for it. AMD-017 (e), which would make it a coded gate for tier N, is drafted, not ratified. The founder waived the lane rule for this item only. The pairwise runs after publish: W-2057 (twin `slice-a-corner-off`, demo-builder) then W-2058 (pedagogy-critic, through evaluation-steward). If it prefers the single card, the lesson goes back to lane M for revision or withdrawal (founder decision).

## Committed predictions (analytics steward, before launch)

**None committed.** No EXP file names this lesson. Recorded as a gap, not filled by me (release-manager does not write predictions). Board item to analytics-steward to commit them before the next read of this lesson's numbers.

## Open objections travelling with this launch

| Objection | Owner | Why we proceed anyway |
|---|---|---|
| "This lesson cannot enter a launch record until a pairwise record exists" (lane rule, `2026-10-25-design.md`) | design-lead | The founder overrode the rule for this item only; it stands for items 2 and 3. Pairwise after publish (W-2057, W-2058). |
| "convex" is unglossed in hook (c8) and reveal (c6); a learner may overgeneralise to every solid (`2026-10-25-learner-no-convex-v2.md`) | category-curator (W-2068) | Both walks gave launch; a takeaway risk, not a stop. |
| No head-of-product signature and no committed predictions (lane flow step 8) | head-of-product, analytics-steward | The founder's decision is the go and names the checks it waits on; all of them are met. Gaps routed to the board, not papered over. |
| No accessibility-reviewer record | accessibility-reviewer | Not a gate; the founder's list of checks does not include it. |

## Decision

**Go, on the founder's decision** ("Publish flatten-the-cube-to-a-dot and deploy System 3 Lessons once its own checks pass, without the comparison against a single-card version. That comparison runs after publishing."). Every check the decision names is met: D1/D2 fixed (W-2056), c8 re-checked (W-2055), learner walks on v2, QA with the sequence probe (W-2047), and the launch gates. Head-of-product has not signed this record; the founder's go stands above the chair, and head-of-product may add a countersignature or an objection below.

Countersignature (head-of-product): _not recorded_
