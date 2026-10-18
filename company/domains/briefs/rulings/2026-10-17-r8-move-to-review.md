# Ruling: r8 knots batch 1, move draft -> review (W-1624), and W-1586

cm-math-discrete · 2026-10-17 · tree `2a2f78d0` · record `company/rituals/records/2026-10-17-launch-review-knots-r8.md`

## Same-code check (the record's step 3 command, run at 2a2f78d0)
`git diff <base> HEAD --stat` over each lesson's `Demo.tsx` and `styles.module.css`, the kit files, `src/kit/knots` (no README/test), `src/app/d/` (plus `src/app/globals.css` for unknot-game): empty for all three.
- draw-a-table-knot, base `b14e8715`: empty.
- tricolour-check, base `a10dedf1`: empty.
- unknot-game, base `e337d74c`: empty.
`meta.json` since each base: no claim `text`, `predict`, `recall` or `version` line changed. Meta now reads version 3 / 2 / 2, status draft, all claims verified (8, 8, 7).

## Decisions
| Lesson | Move to review |
|---|---|
| math/draw-a-table-knot v3 | **yes** |
| math/tricolour-check v2 | **yes** |
| math/unknot-game v2 | **yes** |

Reason, strand side: briefs 1 to 3 are in prerequisite order (draw-a-table-knot first), the answers were checked in node when they went on the list (`company/domains/briefs/checks/knots-check.mjs`), and no strand overlap is open. The yes is for status review only. It is not a publish: preconditions 2 to 4 of r8 ruling 1 (status flip, accessibility record, unknot-game analytics row) are other owners'. My yes lapses if Demo.tsx, styles, or a claim text changes before the flip (version differs from 3 / 2 / 2). The tricolour-check W-1614 wording stays for the next version (`2026-10-17-tricolour-check-loopone.md`). Not run by me: the lessons themselves; I read code diffs and records only.

Side question on the board item: `meta.owner.categoryManager` reads `cm-math` in all three. cm-math is the parent role; the strand manager is cm-math-discrete. No change needed for the gate; the demo-builder may set it at the next version if the field is meant to name the strand manager.

## W-1586 (draw-a-table-knot reveal word count): answer, close it
Stale, and answered. The item (93 to 94 words on the wrong path, budget 90) was resolved on 2026-10-16 by my cut of the script from 80 to 67 words (wrong path 80 to 81 with the 13-word verdict). The later W-1591 opener ("Your switch made a new knot.") and the W-1602/6₁-names sentence took it to 81 (6₁ to 4₁) and 82 (to 0₁); by hand count of `Reveal` in `Demo.tsx` at 2a2f78d0 the body is 68 and 69. The 84 in the board's note is slightly above my count, but any of these is under the 90 budget (77 script + 13 verdict). The strict reveal-fit needs a running server; I did not run it. Build notes record 81 words, crop 0 at 390x844 (`company/reviews/draw-a-table-knot/build.md`), and QA v3 and design W-1610 accepted the fit. No cut is owed. I do not edit `board.json`: whoever moves W-1586 to done can cite this file.
