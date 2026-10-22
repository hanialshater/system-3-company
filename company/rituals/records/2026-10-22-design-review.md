# Design Review: 2026-10-22

> Held through System 3 Meta (order O-8): code scaffolded this record; its chair fills it, a second attendee confirms it, and code commits it.
> Chaired by head-of-product, standing in for design-lead (the company's chair of this ritual, not an agent of this run).

owner: design-lead · room: design-studio · trigger: `company/rituals/triggers.json` "design-review"

## Method, and what this record can and cannot claim

- **Scope.** The 13 lessons published through System 3 Meta on 2026-10-22, each with a launch-review record in company/rituals/records/2026-10-22-launch-review-<slug>.md (all `go`): ant-on-a-cube v2, four-cards-one-rule v1, friends-of-friends-overlap v3, new-friend-loosens-the-circle v1, not-every-circle-is-red v1, one-link-back-grows-the-core v1, one-metre-more-rope v2, pick-two-or-pick-four v1, push-the-frame-over v3, regions-from-circle-points v2, slice-a-corner-off v2, three-sticks-one-triangle v1 and two-corners-off-the-board v1 (versions from each src/demos/*/<slug>/meta.json). Twelve are math and one is CS. With 13 lessons, the "10% sample" is the whole set.
- **New formats.** None. Twelve lessons are `single-card` (✅ in company/design/formats.md:11). ant-on-a-cube is `before-after` (src/demos/math/ant-on-a-cube/meta.json:110), which is 🟡 by hand (formats.md:16) and not new. No lesson uses Multi-card sequence or Book deck (both still 🔴, formats.md:17-18).
- **No artifact was seen.** No artifacts/walkthroughs/<slug>/ directory exists in this worktree, in /home/user/s3c-wt/m7-int, or anywhere under /home/user (searched 2026-10-22). So this record does **not** follow the artifact-first method of company/rituals/records/2026-10-14-design-review.md. Its findings come second hand, from the independent learner reviews (company/reviews/<slug>/2026-10-22-learner-*.md, all `Verdict: launch`) and the QA records (company/reviews/<slug>/2026-10-22-qa.md, all `result: pass`), which were written from those walkthroughs. I read no build.md or design.md. I measured nothing: there are no pixel numbers here, and nothing is judged by eye.
- **Kit state.** Read in src/app/globals.css:93-96: `.stage` is still `overflow: auto … justify-content: safe center`. Finding 1 of the 2026-10-14 review is therefore unchanged in the kit, despite r19's "Calm lesson card: no in-card scrollbars" (08b8b361, the last commit to touch globals.css).

## Top findings

1. **The reveal shows a picture that Reset emptied: recurs in 1 of 13** (formats.md:24, "No reset that empties it"). slice-a-corner-off v2: after Reset, the stage and the reveal show the whole cube, while the reveal says "Slicing a corner off your cube …". Only the chips keep the sums (learner review, note 4). It is a recurrence of 2026-10-14 finding 2, whose pattern check W-833 (pattern-librarian) is still `backlog` and whose fix item W-832 is in `review` (company/ops/board.json). Four lessons get this right and show the way: ant-on-a-cube keeps the dashed bent path after Reset (note 6); pick-two-or-pick-four keeps the milestone state 15/15, 20 at the reveal (note 7); regions-from-circle-points keeps every table column (note 6); not-every-circle-is-red keeps its kept columns (note 4).
2. **Told, not shown: the misconception's case is not on the natural path, 1 of 13.** two-corners-off-the-board v1: the panel says "Try both boards, then ask for another try". Followed in order, "Another try" lands on the one-row board, which tiles anyway, so the impossible board never resists a second attempt, yet the reveal rests on that (learner review, note 3, which the learner called its strongest).
3. **Asserted, not shown, in the reveal: 1 of 13.** ant-on-a-cube v2 says "no route over other faces is shorter", but no other pair of faces is ever drawn. It also names "front and right faces" while the stage labels no face (learner review, notes 4-5). Minor, because the claim is in the trust sheet.
4. **Unkeyed glyphs and wordless headers: 1 of 13.** not-every-circle-is-red v1 shows an "=" mark beside the statements on the locked predict stage, with no key, and the kept-column headers are icons with no word (learner review, notes 1 and 4).
5. **Kit stage centring is unchanged** (globals.css:95). Its measure-first ask W-827 (platform-engineer) has been in `backlog` since the 2026-10-14 review. None of the 13 learner reviews reports a cut control row or a crop: pick-two-or-pick-four and regions-from-circle-points both say the reveal fits at phone width, and all 13 QA records pass. So on this set the centring cost no learner a step, but no measurement backs that.
6. **Clean on design: 8 of 13.** For four-cards-one-rule, friends-of-friends-overlap, new-friend-loosens-the-circle, one-link-back-grows-the-core, push-the-frame-over, three-sticks-one-triangle, regions-from-circle-points and pick-two-or-pick-four, the learner reviews record that the picture shows the mechanism before the reveal names it. one-metre-more-rope has only a cosmetic note: the corner icon is the same for ball, wheel and Earth (note 6).

## Board asks (for the chief of staff to file; I do not edit company/ops/board.json)

1. "slice-a-corner-off: keep the sliced cube on stage after Reset into the reveal (formats.md:24); 2026-10-22-design-review.md finding 1" (owner: demo-builder, next version, not blocking)
2. "two-corners-off-the-board: put 'Another try' on the opposite-corners board, or order the path so the impossible board is retried; 2026-10-22-design-review.md finding 2" (owner: demo-builder, next version, not blocking)
3. "Raise W-833 (pattern check: Reset never empties the quoted picture) from backlog: recurred in slice-a-corner-off on 2026-10-22" (owner: portfolio-manager)
4. "W-827 still backlog: measure top-anchored .stage vs safe center (globals.css:95) with tools/reveal-fit.mjs" (owner: platform-engineer)
5. "Keep walkthrough artifacts for published Meta lessons until the next design review, or record where they are kept" (owner: chief-of-staff, for code's walk stage)

## Decision

- No design revise for any of the 13 Meta-published lessons. Findings 1 to 4 are fixes for the next version, through board asks 1 and 2, and none is a block: every learner review is `launch` and every QA record is `pass`.
- formats.md stays as it is: no new format was used, Before / after stays 🟡 by hand (ant-on-a-cube keeps its "after" into the reveal, so the row's rule holds), and Multi-card sequence and Book deck stay 🔴.
- "Reset never empties the quoted picture" (formats.md:24) is reaffirmed as the top recurring design defect. Its pattern check W-833 should leave backlog (board ask 3).
- Kit stage centring stays until W-827 measures it. No unmeasured change is asked for.
- The next design review needs walkthrough artifacts on disk (board ask 5). Until then it cannot be artifact-first.


## Objections

<!-- every objection raised, each with its answer ("Answer: …") or "carried" (it travels with the decision), never "noted"; write "none raised" if so -->

- head-of-product chaired this design-review in place of design-lead, who is not an agent of this run: carried, for design-lead to confirm or redo.
- head-of-product (chair): this review is not artifact-first, because no walkthrough artifact exists on disk, so its findings are second hand from the learner and QA records. Carried: the next design review re-judges these 13 on fresh walkthroughs (board ask 5).
- head-of-product (chair): I chaired the launch reviews that sent all 13 lessons `go` (2026-10-22-launch-review-*.md), so I am judging the design of lessons I already launched. Carried, together with the stand-in objection above: design-lead to confirm or redo.
- head-of-product (chair): the trigger counted 100 review events since the 2026-10-14 review, but this record covers only the 13 Meta lessons. The other lessons reviewed since 2026-10-14, including the r15 to r17 copy passes and the r19 card redesign (08b8b361), had no design pass here. Carried: the next design review samples 10% of them.
- chief-of-staff (attendee, check): the order's trigger was "100 review event(s) since last … ; a new incident", but the record does not name the incident or say whether it has a design cause. Carried: the next design review (or design-lead, confirming this one) names it and rules on it.
- chief-of-staff (attendee, check): the 2026-10-14 review's open layout and told-not-shown lessons (cluster-stops-the-cascade W-573, metal-feels-colder W-575, two-locks-wait-forever W-567, each-element-pops-once W-642) had their "r10 check" lines left unconfirmed; this record does not re-judge them. Carried, with board ask 5: the next artifact-first review confirms them on fresh walkthroughs.
- chief-of-staff (attendee, check): board asks 1 to 5 are addressed to the chief of staff to file, but in this run the chief of staff writes no company/ops/board.json (code mirrors orders there). Carried: to the run's handoff entry (**Next**), so the asks are not lost when this record ships.
