# Reveal stage crop on phones (W-135 family): shrink the picture instead of scrolling it away

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

## Fix (final, commit 1a879c6)

`useRevealFit` now fits before it scrolls. On the reveal and on every re-fit (400 ms re-check, resize,
rotation, a resize of the stage or reveal) it clears any earlier fit, measures
`over = body.scrollHeight - body.clientHeight`, and shrinks the stage's pictures: outermost
`svg[viewBox]` elements that hold no `[data-qa="control"]`, largest first, each via an inline
`max-height` (and `min-height: 0`, since a lesson min-height would win) down to at most 40% of its
natural height. The viewBox letterboxes the drawing. Shrunk svgs carry `data-reveal-fit` (their natural
height). Then the old scroll runs for whatever is still over, so the reveal stays fully visible.
Controls never scale.

First version (superseded, shipped by snapshot in 740f5a1/01006ec): a `transform: scale(k)` on the
whole stage. It fitted everything but shrank stage controls to 14-22px, so lessons failed the QA
contract's 24px tap-target check after the reveal (39 of the first 124 contract tests on :3490;
session 2 saw it in 7 NCM lessons). Coordinator direction: scale only the picture.

## Measurement (390×844, touch; build 4 on :3480 before, `.next-pf` on :3490 after)

Stage top cropped (px) before → transform version → final picture-only version. Reveal hidden is
0-1px in every case.

| lesson | before | transform (withdrawn) | final | picture natural → fitted |
|---|---|---|---|---|
| bending-frontier | 187 | 0 | 33 | 256 → 102 |
| one-odd-loop-blocks-two-camps | 155 | 0 | 45 | 184 → 74 |
| a-star-heads-for-goal | 351 | 0 | 200 | 252 → 101 |
| every-second-seat-out | 467 | 0 | 275 | 320 → 128 |
| midnight-sun-line | 231 | 0 | 99 | 220 → 88 |
| good-lists-make-good-pages (NCM) | 103 | 0 | 0 | 216 → 110 |

Random 30-lesson sample (29 measurable): before 7 whole / 22 cropped (median 95px, max 400px); final
19 whole / 10 cropped (median 112px, max 319px).

Contract QA (tests/qa/contract.spec.ts, phone + desktop) against the final build: all 29 NCM-tagged
lessons 58/58; the 39 lessons that failed under the transform version plus the 5 named above 88/88.

## What is left (not a kit fix)

Where the stage's controls and text plus the reveal are taller than the card body, no picture shrink
can make room, and the card still scrolls the stage top away. In midnight-sun-line the globe the reveal
names ("the orange gap on the globe") is still off screen. The remaining options are design or lesson
decisions: trim or hide stage controls at the reveal, shorten the reveal, or let the reveal scroll inside
itself (that would relax the W-135 guarantee). Routed to the design lead (board).

## Other notes for the review

- `tools/reveal-fit.mjs` does not measure stage-top crop; its thumbnail flag will flag shrunk pictures.
  Board item for platform-engineer.
- Overlays: HTML positioned over an svg by percentage could drift when the svg letterboxes. None seen in
  the screenshots checked; this is a risk, not a measured defect.
- An inline `min-height` set by a lesson on its svg is cleared when the fit is undone (rare).

## Rollback

Revert 1a879c6 and the useRevealFit part of the snapshot commits (scaleStage/unscale and the stage and
reveal observers in `src/components/DemoCard.tsx`). The globals.css change is a comment only.

## Possible amendment (not required)

If lessons are ever hosted outside DemoCard (EDD-003 sandbox), the fit belongs in the kit's reveal
(`src/kit/Lesson.tsx`, protected) or the spike host must copy `useRevealFit`.
