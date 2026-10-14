# Build note: square-a-plus-b (demo-builder, 2026-10-13)

- Intent: a 13 x 13 square on a unit grid, cut at a on both sides into a², two a·b strips (yellow) and b². The "Cut at" slider moves the cut; "Only a² + b²" blanks the two strips, which is what the wrong formula keeps.
- Key state (two milestones): the cut at 10 + 3, and the strips seen as missing. The slider starts at 8 + 5 (chosen: two arrow steps from the key split, so QA's two presses reach it); the toggle comes second in DOM order.
- Numbers: question options, captions and reveal come from N = 13 and KEY_A = 10; area labels are hidden while locked.
- Deviation from brief: the "draggable split" is a slider (QA cannot drag); the "Only a² + b²" toggle is an addition so the forgotten term is something the learner does, not only reads.
- After screenshots: the blanked strips read as uncovered white with red numbers; fine on phone. No change.
- All numbers recomputed with node; all claims unverified, for the fact-checker.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Question now asks the misconception directly: 'Someone says (10+3)^2 = 10^2 + 3^2 = 109. By how much is it off?' (30 / 60 / 100). Reveal opens with 'By 60'. c3 reopened. The reveal thumbnail size is the kit's reveal layout; not changed.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
