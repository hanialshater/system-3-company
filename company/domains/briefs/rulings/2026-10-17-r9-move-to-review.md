# Ruling: r9 left-or-right v3, move draft -> review (W-1663); W-1652 and W-1656 short answers

cm-math-discrete · 2026-10-17 · tree `320a1523` · record `company/rituals/records/2026-10-17-launch-review-left-or-right-r9.md`

## Same-code check (the record's step 3 command, base `e3aecea8`, run at 320a1523)
`git diff e3aecea8 HEAD` over `Demo.tsx`, `card.ts`, `styles.module.css`, `src/kit/Lesson.tsx`, `controls.tsx`, `milestones.tsx`, `progress.ts`, `types.ts`, `src/kit/knots/*.mjs`, `index.d.ts`, `package.json`, `src/app/d/` and `src/app/globals.css`: empty. Only `meta.json` differs: the c5 text gained the quote "reveal branch 'its hand stayed right'" (W-1651), c5's note, and evidence links (`2026-10-17-qa.md`, `-qa-v3.md`, `-learner-walk.md`). No `predict`, `recall` or `version` line changed. Meta reads `status: draft`, `version: 3`, 8 claims all `verified`.

## Decision
| Lesson | Move to review |
|---|---|
| math/left-or-right v3 | **yes** |

Reason, strand side: brief 4 is the last of the four knot briefs and sits after briefs 1 to 3 (r8 moved them). Its answers were checked in node when it went on the list (`company/domains/briefs/checks/knots-check.mjs`, K19, K21; I re-ran the file today and K21 still gives screen signs equal to the readout in all four rest states of 3_1 and 4_1). No strand overlap is open: the lesson teaches turn over versus mirror on knots it draws itself.

The yes is for status review only, not a publish. Preconditions 2 (status flip, demo-builder W-1659), the WebKit deploy-time cell and the release steps belong to other owners. My yes lapses if `Demo.tsx`, `card.ts`, styles, a claim text beyond the c5 quote, `predict`, `recall` or `version` changes before the flip (version differs from 3). Not run by me: the lesson itself; I read code diffs, records and the knots check only.

## W-1652 (figure-eight "sum 0 / its own mirror image"): next version, not blocking
Keep for v3. On the eightMirror path, "summed to 0 both ways, and it is its own mirror image" invites "sum 0 means its own mirror image", which is false in general (a diagram's sum is not an invariant that decides this). Next version should split the two: state the sum, then say the figure-eight is its own mirror image "which a 0 alone would not show", or drop "both ways" and the sum from that sentence. It is learner-visible text, so claims and a re-check travel with it, and EXP-008's version rule applies (amendment row before the deploy).

## W-1656 (recall repeats "right-handed"): next version, not blocking
Keep for v3. The correct option 0 "A right-handed trefoil" echoes the stem's word, so it can be picked by matching. Next version: put the stem in neutral terms (or rotate the answer off option 0 and make the echo a distractor, e.g. stem right-handed, options include "A trefoil whose hand came from how you laid it"). A changed `recall` is a new version and needs the EXP-008 amendment before its deploy. Bundle with W-1652 and W-1653.
