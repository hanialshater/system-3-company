# Reveal stage crop on phones (W-135 family): scale the stage instead of scrolling it away

owner: platform-engineer · date: 2026-10-14 · tier: 2 (proposed; it changes every lesson's reveal
layout). Review: W-237 (principal-engineer). This note is the EDD-lite and rollback plan.
Protected files: none touched (`src/kit/Lesson.tsx` unchanged).

## Symptom

At 390×844, once the reveal shows, the card body has scrolled and the top of the stage is above the
card's top edge. Reveal text that points at labels near the top of the stage ("look at the line under
the table", "the fields under the chart") then points at nothing. Session 2 reported it in almost every
NCM batch-1 lesson; wave E reviews in bending-frontier, one-odd-loop-blocks-two-camps,
every-second-seat-out, a-star-heads-for-goal, midnight-sun-line.

## Cause

The W-135 trade-off, written down at the time ("when the reveal is long, the top of the stage scrolls
off above"). At the reveal the stage is content-sized (2026-10-13 rule `.lesson[data-phase="reveal"]
.stage { flex: none }`) and its picture takes its natural height (W-135 rule `.stage .stage-svg
{ flex: none; height: auto }`), so stage + reveal is 100-470px taller than the card body.
`useRevealFit` in `src/components/DemoCard.tsx` then scrolls the card body by exactly that amount to
put the reveal's bottom on screen, and that scroll is the crop. No `scrollIntoView` is involved (no
lesson or kit code calls it). The CSS rule only makes the overflow bigger; the scroll causes the crop.
`tools/reveal-fit.mjs` did not see it: it checks only that the reveal is visible, not the stage top.

## Fix

`useRevealFit` now fits before it scrolls. On the reveal (and on every re-fit: the 400 ms re-check,
resize, rotation, and now a resize of the stage or reveal) it clears any earlier scale, measures
`over = body.scrollHeight - body.clientHeight`, and if over > 1 it scales the stage by
`k = max(0.4, (h - over - 4) / h)` with `transform: scale(k)` from top centre and
`margin-bottom: -(1-k)·h px` to give back the layout space. `data-reveal-scale` on the stage records k.
Then the old scroll runs, and only matters for stages that would need k < 0.4.
A transform, not `zoom` or shrinking the svg: pointer hit-testing, `getScreenCTM` and HTML overlays
positioned over a picture stay correct. Leaving the reveal phase removes the scale.

## Measurement (390×844, touch; build 4 on :3480 before, `.next-pf` on :3490 after)

Stage top cropped (px above the card body) / reveal hidden (px):

| lesson | before | after | scale |
|---|---|---|---|
| bending-frontier | 187 / 0 | 0 / 0 | 0.59 |
| one-odd-loop-blocks-two-camps | 155 / 1 | 0 / 0 | 0.67 |
| a-star-heads-for-goal | 351 / 0 | 0 / 0 | 0.44 |
| every-second-seat-out | 467 / 0 | 0 / 0 | 0.46 |
| midnight-sun-line | 231 / 1 | 0 / 0 | 0.55 |
| good-lists-make-good-pages (NCM) | 103 / 1 | 0 / 0 | 0.74 |

Random 30-lesson sample (29 measurable): before 22 cropped (median 95px, max 400px), 7 whole;
after 28 whole, 1 at the 0.4 floor still crops 79px (keeping-the-bad-gene). Scale: 7 unscaled,
median 0.80, 4 of 29 under 0.6.

## Trade-offs and open questions for the review

1. **Small text at low scale.** At k ≈ 0.45 stage text is drawn at about 6px (a-star-heads-for-goal).
   Nothing is cropped but labels are hard to read. Stages that need k < 0.6 are too tall for a phone
   reveal; that is a lesson-design fix (trim controls at the reveal), for builders and the design lead.
2. **Tap targets.** Stage controls stay live at the reveal and shrink with k (below 44px). Explore is
   unaffected.
3. **reveal-fit's thumbnail flag.** `tools/reveal-fit.mjs` compares the drawn picture with the
   unscaled stage width, so every scaled stage now reads "thumb" (the 6 lessons above: before pass,
   after fit+thumb). W-135's "no thumbnail" bar and "whole stage visible" now pull against each other;
   the tool should count stage-top crop and report scale instead. Not changed here.
4. **Floor 0.4** is a judgment call. The other option is a floor near 0.6 plus a scroll, which brings
   back a smaller crop.

## Rollback

Revert the `useRevealFit` change in `src/components/DemoCard.tsx` (scaleStage/unscale and the stage
and reveal observers). The globals.css change is a comment only.

## Possible amendment (not required)

If lessons are ever hosted outside DemoCard (EDD-003 sandbox), the fit belongs in the kit's reveal
(`src/kit/Lesson.tsx`, protected) or the spike host must copy `useRevealFit`.
