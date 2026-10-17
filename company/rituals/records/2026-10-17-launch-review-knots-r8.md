# Launch Review: 2026-10-17 (r8, knots batch 1): draw-a-table-knot, tricolour-check, unknot-game

chair: head-of-product (Priya) · slot hop-knots-r8 · tree read at `aae6d2d6` (dispatched at `1bf814cf`; the coordinator added unknot-game and EXP-007 mid-run, and I fast-forwarded) · executes: release-manager, board W-1623 (a separate run publishes from this record, and only once its preconditions hold) · attests: qa-tester, fact-checker, learner-evaluator, design-lead (by their records, cited below); cm-math-discrete (loopOne and W-1614 ruling) · preconditions owned by: cm-math-discrete (W-1619), demo-builder (W-1622), accessibility-reviewer (W-1620), analytics-steward (W-1621, unknot-game only) · no deploy

Brief: the first three knot lessons (Knots batch 1, briefs 1 to 3, `company/domains/briefs/math.discrete.md`), all `draft`. They are the first lessons to import `@/kit/knots`. Model for this record: r7 (`company/rituals/records/2026-10-16-launch-review-ncm-gap4.md`). This record is **not** permission to publish a draft: `company publish` does not check status and has no dry run.

## Ruling 1: this review cannot move the lessons to review, so it stays open on its preconditions

Same reading as r7 ruling 1, unchanged: head-of-product has no power over lesson status (`company/roles/head-of-product.md`); the draft → review grant is the demo-builder's (`tools/org/roles.mjs`), and the decision belongs to the strand manager, cm-math-discrete. This review decides on the artifact and the gates and holds each go open.

A go below takes effect only when **all** of its row's preconditions are on disk:
1. cm-math-discrete's decision to move the lesson to review (W-1619): "yes" in the table below or as a ruling on W-1619.
2. `meta.json` reads `"status": "review"` at the version named here (demo-builder, W-1622).
3. An accessibility-reviewer record `company/reviews/<slug>/<date>-a11y.md` on code identical to what ships, with no lock-out failure (W-1620). See ruling 2 for why this is a precondition here and only a cycle condition in r5.
4. A committed analytics row before the publish: **met** for draw-a-table-knot and tricolour-check by `company/experiments/EXP-007-launch-predictions-r8-knots.md` (analytics-steward, committed at 1bf814cf, before any publish or deploy carrying them). **Open** for unknot-game: EXP-007 does not cover it; analytics-steward appends an amendment row (W-1621).

If cm-math-discrete declines, objects or asks for a change first, or the accessibility record names a lock-out, that lesson's go **lapses** (it does not become a no-go). It comes back to this chair after the change has had its QA, fact-check and re-walk.

### Preconditions (owners fill their own cells; nothing else in this record changes when they do)

| Lesson | Version this review is on | Move to review (cm-math-discrete, W-1619): yes / no / after change, where, date | Status `review` (demo-builder, W-1622) | Accessibility record (accessibility-reviewer, W-1620): file, result | Analytics row (analytics-steward) |
|---|---|---|---|---|---|
| math/draw-a-table-knot | v3 | | | | **met**: EXP-007 (B3, B4a, B5, B6, B1/B2 pooled) |
| math/tricolour-check | v2 | | | | **met**: EXP-007 (B4b, B5, B6, B1/B2 pooled) |
| math/unknot-game | v2 | | | | **open**: EXP-007 amendment row, W-1621 |

## Ruling 2: accessibility is a precondition for these three, not a cycle condition

r5 objection 4 and Wave J let lessons go with "an accessibility review within the cycle", because the launch gates do not include it and I may not edit gates. I am not adding a gate. I am making it a condition of **this** go, which is mine to set, for a reason specific to these lessons: their meaning is carried by colour and stroke more than any lesson we have shipped.
- tricolour-check: the whole lesson is about colours. Design gave each arc a letter (W-1583, applied) and failing crossings a dashed ring and a cross (S4 finding 5). Whether a colour-blind or screen-reader learner can do the task has not been checked by the role that owns that question.
- unknot-game: the reveal names "the tinted strand". At the reveal the caption is hidden (S4 D1), so the tint (colour plus a 3-unit stroke) is the only cue for the sentence.
- QA has seen things an accessibility reviewer should weigh: zero-size disabled `data-qa="control"` buttons, one unlabelled (tricolour QA v2 finding 3, W-1613), and focus falling to the page start when the reveal opens (unknot QA v2, W-1618, kit).
- No `company/reviews/{tricolour-check,draw-a-table-knot,unknot-game}/*a11y*` or `*accessibility*` file exists at `aae6d2d6` (searched).

A record that finds problems short of a lock-out does not lapse the go; it is routed. A lock-out lapses it (accessibility-reviewer's own authority, `tools/org/roles.mjs`).

## Readings applied

- **Artifact before account.** I built at `aae6d2d6` and ran `npm run walkthrough -- tricolour-check draw-a-table-knot` (before the fast-forward, same lesson code) and `npm run walkthrough -- unknot-game` (after it), and read each transcript and the reveal frame before any QA, learner, design or build record. What I wrote from the frames, before the records:
  - tricolour-check: predict "Yes" held; the reveal shows 4₁ with "Crossings OK: 4 of 4", four green ticks and "3 of 81 obey: all one colour", beside "The figure-eight (4₁) failed". On first read that pairing is the weak spot: four ticks and "failed" side by side. The learner walk found the same (finding 1) and cm-math-discrete ruled on it (W-1614).
  - draw-a-table-knot: the walk ended on the 5₂ chip, yet the reveal stage shows 6₁ with "Crossings drawn: 6 · Name: 4₁", matching "Your 6₁ still had 6 crossings drawn, but its name became 4₁". The v3 fix (W-1602) is visible.
  - unknot-game: the reveal stage returns to the trefoil with a switch and the tinted strand, matching "the tinted strand lay on top at two crossings in a row". "1 ... for the figure-eight too" is told: the tally beside it reads "Figure-eight 0 of 4" on the walk path.
  - All three fit at the walkthrough's phone size with the trust link on screen; trust links read 8/8, 8/8, 7/7.
- **QA counts only if a qa-tester wrote it on the version that ships** (W-1237 reading, r5). Each lesson has a `company qa-record` filing by qa-tester on 2026-10-17, plus a hand-written exploratory record:
  - tricolour-check: `2026-10-17-qa.md` (filed on f6bbafcc, W-1611), `2026-10-17-qa-v2.md` built from `a10dedf1`, line 35 corrected 2026-10-17 (all three milestones are required, matching cm-math-discrete's ruling).
  - draw-a-table-knot: `2026-10-17-qa.md` (filed on f6bbafcc, W-1611), `2026-10-17-qa-v3.md` built from `b14e8715`, which contains the v3 commit e5712f3a.
  - unknot-game: `2026-10-17-qa.md` (qa-record) and `2026-10-17-qa-v2.md` built from `e337d74c`, which contains the v2 commit 53038b06.
- **Same code check (import-closure method, r6 addendum).** Each lesson loads its `Demo.tsx` and `styles.module.css`; `src/kit/Lesson.tsx`, `controls.tsx`, `milestones.tsx` (and `progress.ts`, `types.ts` behind them); `@/kit/knots` = `src/kit/knots/*.mjs`, `index.d.ts`, `package.json` (not README or `test/`); the page `src/app/d/`; and, for unknot-game, the `.knot-tint` rule in `src/app/globals.css`. Over that closure:
  - `git diff a10dedf1 aae6d2d6` (tricolour-check, QA v2 build): only `meta.json` evidence links. Demo.tsx is unchanged since its build commit 133fc863; styles last changed in 8586a47f (S4 D1/D2), an ancestor of a10dedf1 and of the learner build c27517e5.
  - `git diff b14e8715 aae6d2d6` (draw-a-table-knot, QA v3 and learner v3 build): only `meta.json` evidence links.
  - `git diff e337d74c aae6d2d6` (unknot-game, QA v2 and learner v2 build): only `meta.json` (c6/c7 status, notes, evidence links).
  - `git diff 1bf814cf aae6d2d6` over `src/kit`, `src/app` and the first two lessons: empty.
- **Claims.** `node tools/company.mjs claims --open` lists none for these slugs. Every claim is `verified` by fact-checker:
  - tricolour-check c1-c8, `2026-10-16-fact-check.md` on 5c5c719e. No claim text has changed since (the only meta changes are evidence and `version` 1 → 2), and Demo.tsx is the same file it read.
  - draw-a-table-knot c1-c4, c6-c8 on 2026-10-16; c5 in `2026-10-17-fact-check-c5.md`, on v2 (a10dedf1). v3 (e5712f3a) changed no learner text: it adds the stage restore at the reveal and the `i` field. The reveal template c5 checked is byte-identical. QA v3 compared stage against sentence on 24 paths, all agreeing.
  - unknot-game c1-c7, c6/c7 re-verified in `2026-10-17-fact-check-c6-c7.md` at e337d74c (v2).
- **Learner verdict** (publish-ready `decide()`, run read-only on each slug's learner files with its meta version and git ancestry, at aae6d2d6): all three **ready**: latest = `2026-10-17-learner-walk.md` (tricolour-check, v2), `2026-10-17-learner-walk-v3.md` (draw-a-table-knot, v3), `2026-10-17-learner-walk-v2.md` (unknot-game, v2; v1 walk said revise, closed by v2 per its own table). `node tools/publish-ready.mjs` lists none of them today, because all three are `draft`. `company/ops/publish-holds.json` names none of them.
- **Design.** Each lesson passed S4 with changes, applied, and each short-phone reveal crop is ruled on by design-lead:
  - tricolour-check: `company/design/reviews/2026-10-16-tricolour-check-s4.md`, and `2026-10-17-tricolour-check-v2-reveal.md` (W-1612): 360×740 crop of 77 px accepted, because removing it puts the quoted lines under the 10 px text floor.
  - draw-a-table-knot: `2026-10-17-draw-a-table-knot-v3-reveal.md` (W-1610): crop of 42 to 82 px accepted, and the stage stays live at the reveal on purpose.
  - unknot-game: `2026-10-17-unknot-game-s4.md`: 360×740 reveal crop of 115 px after D2 (from 144 to 164 px); W-1617 records QA's notes on it as record-only.
- **cm-math-discrete** (`company/domains/briefs/rulings/2026-10-17-tricolour-check-loopone.md`): `loopOne` on opening ○ accepted; W-1614 (pass mark never said; two-colour predictors get no why) does not block, and waits for the next version with proposed wording.

## Per-lesson decisions

| Lesson | Newest learner verdict vs meta | QA (qa-tester) | Claims | Design | Decision | One line of reason |
|---|---|---|---|---|---|---|
| math/draw-a-table-knot | launch, v3 (built b14e8715); meta v3 | pass (qa-record + qa-v3, 24 paths stage = sentence) | 8/8 verified | S4 + W-1610 ruling | **go, held open on preconditions 1-3** | The v1 blocker (reveal quoting a state not on screen) is closed. The 6-drawn / 4₁ contradiction is on the stage when the learner reads the sentence. |
| math/tricolour-check | launch, v2 (built c27517e5); meta v2 | pass (qa-record + qa-v2, line 35 corrected) | 8/8 verified | S4 + W-1612 ruling | **go, held open on preconditions 1-3** | Every learner who reaches the reveal has made the three-colouring. The 4₁ "failed beside four ticks" stall is real but repaired within a sentence (learner finding 1). cm-math-discrete put the fix in the next version (objection 1). |
| math/unknot-game | launch, v2 (built e337d74c); meta v2 | pass (qa-record + qa-v2, 9 paths) | 7/7 verified | S4 (crop 115 accepted) | **go, held open on preconditions 1-4** | The v1 blocker (the reveal named a tinted strand that was not on stage) is closed on every path. The figure-eight clause is told and sourced (c6). |

**Go: 3, each held open on its preconditions. No-go: 0.**

**Order.** tricolour-check and unknot-game both list `knot-table-names` (draw-a-table-knot) as a prerequisite (`content/curriculum/math.json`). Publish draw-a-table-knot first when it is ready. If draw-a-table-knot's go lapses, the other two may still publish: each names its knots on its own stage, and tricolour-check's trust sheet carries c8, the 3₁/4₁ table names. The release-manager names the missing prerequisite in the release record.

## Committed predictions (analytics steward, before launch)

Linked, not restated: `company/experiments/EXP-007-launch-predictions-r8-knots.md` (analytics-steward, Grace, 2026-10-17 about 01:40Z at 1bf814cf, before any publish or deploy). It covers tricolour-check v2 and draw-a-table-knot v3. B1 (pooled revisit recall >= 55%, wrong if < 40% on >= 30) and B2 (recall over prediction >= 15 points, wrong if <= 0) carry the learning claim. F1/F2 (first-revisit recall, Surface Value #4) are committed but not measurable on current events. **unknot-game has no row**; its amendment row is precondition 4 (W-1621). Its version rule (a new version needs an amendment row before the deploy) binds W-1614's next version of tricolour-check. Results go under EXP-007 `## Result`, never here.

## Open objections travelling with this launch

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | tricolour-check: the reveal says 4₁ "failed" while the stage shows "Crossings OK: 4 of 4" and four ticks; the pass mark (more than one colour) is never said on screen. A "two colours" predictor gets no why. | learner-evaluator (walk findings 1, 4); chair (walkthrough, before reading it) | **Declined as a hold, kept for the next version.** The learner judged it non-blocking: the bold census line repairs it within a sentence. cm-math-discrete owns the wording and ruled it waits (W-1614, with replacement text). Editing now would reset c5-adjacent claims for a stall the walker repaired. This is the first fix if the lesson is revised. EXP-007 B4b and the descriptive split of wrong predictions will show whether "No" voters are being left behind. |
| 2 | No accessibility review exists for any of the three. | chair (coordinator brief) | **Accepted, made a precondition** (ruling 2, W-1620). |
| 3 | unknot-game has no committed prediction row. | chair (coordinator brief) | **Accepted, made a precondition** (W-1621). |
| 4 | Below 390×844 every reveal crops the top of the stage: 77 px on tricolour-check, 42-82 px on draw-a-table-knot and 115 px on unknot-game at 360×740. On unknot-game, when the last switch is crossing 1 or 2, the two crossings the reveal sentence points at are partly cut (QA v2, W-1617). | qa-tester (all three) | **Declined as a hold.** The standard binds at 390×844, where all three show crop 0. design-lead ruled each crop, and found no fix that keeps the text floor or the hit-circle floor. unknot-game's case is the weakest of the three, because the sentence's referent can be cut; the stage is one swipe up. Whether 360 should bind is my open question W-1593 (r7 objection 5). I am not changing the standard inside a launch. |
| 5 | The stage stays live at the reveal, so a learner can tap it into disagreeing with the sentence (draw-a-table-knot F2, unknot-game, tricolour-check finding 4). | qa-tester | **Declined as a hold.** design-lead ruled it product behaviour across lessons (W-1610 (b)): the stage is right at reveal time, and a later tap is the learner's own experiment. The Seen lines keep the quoted state. |
| 6 | The reveal lock shows only "Try it first"; figure-eight 4 of 4 in unknot-game still locks with no hint. | learner walks (all three); QA | **Routed, as r7 objection 2.** Kit question W-1593 (platform-engineer). Non-blocking: the explore hint names the job. |
| 7 | Told, not shown: the "fewest" half of draw-a-table-knot, "the twist left over falls out" and the figure-eight clause in unknot-game, and tricolour-check's invariance under wiggling (c5). | learner walks (draw finding 6, unknot findings 1 and 5, tricolour finding 3) | **Accepted, non-blocking.** Each is a claim with a published source, labelled told context, and the seen half carries the main argument. Only human learners can show whether the told half sticks (EXP-007 objection 3; EXP-002). |
| 8 | The go rests on simulated walks. | standing caveat | **Stands.** Confidence stays unset. Nothing here claims that anyone learned. |
| 9 | None of the three has a row in the F-46 closeout ledger (`company/product/2026-10-16-closeout-ruling.md`). | chair | **Answered, as r7 objection 9.** They are path-P by evidence; a publish closes them. If a go lapses and is not re-earned before the 10-19 checks, that lesson needs a ledger row. |
| 10 | These are the first lessons to ship `@/kit/knots` to learners. | chair | **Answered.** Engineering readiness is done (W-1521, `company/engineering/readiness/2026-10-16-knots-w407.md`), and the layout timing at 4x CPU throttle was read and closed (W-1587). W-1565 (close W-407 on the board) is bookkeeping for rnd-lead and does not hold a publish. |

## Decision

**go: draw-a-table-knot (v3), tricolour-check (v2), unknot-game (v2). Each takes effect only when its row's preconditions (ruling 1) are met. Until then this review is open.** Signed: head-of-product (Priya), 2026-10-17.

## For the release-manager (the publish run, W-1623)

Run this once per lesson, draw-a-table-knot first, and only for a lesson whose precondition cells are all filled and met. Do not use `publish-ready --publish`.

1. **Preconditions.** cm-math-discrete's cell says "yes" (or a "yes" ruling on W-1619). `meta.json` reads `"status": "review"` and `version` 3 / 2 / 2 as named. If the version differs, the go lapses.
2. **Accessibility.** `company/reviews/<slug>/` holds an accessibility-reviewer record built from code that passes step 3, and it names no lock-out failure. Missing, or a lock-out: do not publish.
3. **Same code.** This must print nothing (use `e337d74c7bf07ef5b6817222027705b3a7bddb45` for unknot-game, `b14e8715f7029fcbe2c778aa12f4417fc3c74a7f` for draw-a-table-knot, `a10dedf1a17efc6c7db599d4e33e95603dd97d2a` for tricolour-check):
   `git diff <base> HEAD -- src/demos/math/<slug>/Demo.tsx src/demos/math/<slug>/styles.module.css src/kit/Lesson.tsx src/kit/controls.tsx src/kit/milestones.tsx src/kit/progress.ts src/kit/types.ts 'src/kit/knots/*.mjs' src/kit/knots/index.d.ts src/kit/knots/package.json src/app/d/`
   For unknot-game, also add `src/app/globals.css` (the `.knot-tint` rule). If the lesson has gained an import, recompute the closure first. Any output: the go lapses.
4. **Claims unchanged.** In `git diff <base> HEAD -- src/demos/math/<slug>/meta.json`, no claim `text`, `predict` or `recall` field and no `version` changed, and every claim is `verified` or `withdrawn`. Otherwise the go lapses.
5. **Learner verdict.** `node tools/publish-ready.mjs` lists the slug as a candidate (it will once the status is `review`). If it does not, the go lapses.
6. **Analytics row.** draw-a-table-knot and tricolour-check: EXP-007 stands (no deploy before its commit). unknot-game: the EXP-007 amendment row (W-1621) is committed. Missing: do not publish unknot-game.
7. **Publish.** `node tools/company.mjs publish <slug>` (the gates run inside it), then `npm run check`, plus a changelog line citing this record, cm-math-discrete's decision and the a11y record. **No deploy**: going live needs the founder's approval of that specific deploy (`company/ops/runbook-deploy.md`).

If any condition fails, do not publish that lesson and come back to the chair (board, owner head-of-product). The lessons are independent apart from the order above.

## Kudos (optional)
- @qa-tester: the corrected line 35 in tricolour QA v2 and the 24-path stage-against-sentence table in draw-a-table-knot QA v3 let me check two rulings without running a new probe.
- @cm-math-discrete: the loopOne ruling read the code and both records and named the QA-path artefact, instead of guessing.
