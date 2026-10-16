# Report: mailbox 20261016T152552171Z-principal-pm-verticals-57f8213a (demo-builder, Wave J revisions)

Branch `wj-rev-r6` in worktree /home/user/s3c-wjrev6, from d37f621. Build commit **169e88d**. This report and the memory entry are in the commit after it. Nothing was pushed, deployed or published, and no claim was marked verified.

## Lessons changed (node -e on the six meta.json files)
- calibrated-but-unequal-alarms: v3, draft
- small-gap-big-extremes: v3, draft
- tug-of-war-scale: v3, draft
- cut-the-busiest-link: v2, review
- which-sea-gets-the-rain: v3, review
- winning-bid-overpays: v2, review

## Per item
1. **calibrated v3 (W-1379, W-1368, W-1367): fixed, using the pre-approved fallback.** The ruled 17-word sentence cropped by 16 px on reveal-fit (91 words). The fallback "Otherwise no high/low score that makes mistakes is honest with matching errors." gives crop 0 and 86 words. c4 is rewritten with support `derivation`; recall uses cm-ai's text; c7 is new; the trace now says "Earlier at"; the hook and predict say "honest"; the answer is unchanged. `grep -c "high/low score"` = 1. Claims c3, c4 and c7 are unverified; c1, c2, c5 and c6 are untouched and still verified. I found no differing cm-ai c4 ruling (ai-cm-rulings.md r6 matches A2).
2. **small-gap v3 (W-1318, small-gap half): fixed.** (a) The overlap "80%" is dropped from the reveal, and c3's text no longer has it. (b) The at-130 milestone fires only when the slider is released at 130 (pointerup, touchend or keyup). A probe showed that a drag from 120 to 140 leaves the reveal locked, and a tap at 130 unlocks it; the keyboard QA path still unlocks. The predict answer is unchanged. (c) "falls away faster" is replaced by per-100,000 counts (135/621 above 130, 3/23 above 140), recorded as new claim c5. c1, c2 and c3 are reset. One idea I did not do: a "82%" label on the 130 tick, because the tick labels would collide.
3. **cut-the-busiest-link: flipped to review.** All of c1-c5 are verified, and the newest learner review (r15) is on v2, which matches meta.
4. **tug-of-war-scale v3 (r11 finding 3): fixed.** cm-physics had recorded no wording for this finding, so I used the brief's fix. Paragraph 1 now reads: "...read 100 N, not 200 or 0. The two pulls do cancel: that is why the scale stays still. But a scale at rest reads the one pull passing through it: the tension its two ends share." c1's old sentence is gone and c1 is reset. c5 is new, for the cancel sentence. My first draft was 100 words, so I merged the c1 sentence into paragraph 1. That brought it to 88 words without dropping any claim caption. c2, c3 and c4 are still verified. The predict answer is unchanged.
5. **which-sea-gets-the-rain: flipped to review.** All of c1-c5 are verified, and the newest learner review (r11) is on v3.
6. **winning-bid-overpays: flipped to review.** All of c1-c4 are verified, and the newest learner review (r11) is on v2. I did not touch the AVG GUESS note.

## Stage counts (busiest frame; rendered DOM; Ruling 2 units count 0)
- calibrated: 25 (B at 50 with trace). Unchanged from v2.
- small-gap: 24. Stage text unchanged.
- tug-of-war: 24 (wall frame). Stage text unchanged.

## Reveal-fit (own production build `.next-r6`, port 4163, 2026-10-16T15:38:38Z, tool 79c22aa clean)
Summary `{"fit":3,"cropped":0,"namedHidden":0,"phoneFit":3,"pass":3}`. Word counts: calibrated 86, small-gap 85, tug 88. All have crop 0 and phoneFit true. The full lines are in each lesson's build.md under "## v3".

## QA
Local contract QA on the own production build covered all six slugs, phone and desktop: **12 passed**. This is not a QA record. `npm run check` passed (969 lessons, 0 errors, 5 warnings, all of them pre-existing lifehacks ones).

## Open items (owner)
- Fact-checks of the reset and new claims (evaluation-steward, lane 10): calibrated c3, c4 and c7; small-gap c1, c2, c3 and c5; tug-of-war c1 and c5.
- Learner re-walks on the three v3 lessons (lane 10). These include calibrated r16 and the W-1367 real-drag QA under r6-ai A1c.
- Merging wj-rev-r6 into main (principal-pm-verticals / chief-of-staff). The board moves for W-1379, W-1368, W-1367, W-1318 and W-1328 belong to the chief of staff.

## Confidence
High that the six statuses, the gate and the fits are as stated, because each was measured on my own production build. Medium on the reveal wording: these are learner-facing rewrites, and no evaluator has walked them yet. The tug "not 200 or 0" paragraph is the one most worth a re-walk.
