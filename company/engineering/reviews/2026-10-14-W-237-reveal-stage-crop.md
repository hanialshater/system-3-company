# Engineering Review: 2026-10-14: W-237 reveal stage crop (picture fit before scroll, commit 1a879c6)

owner: principal-engineer · tier: **2** · attendees: principal-engineer (reviewer), platform-engineer (author, by note)

- EDD: `company/engineering/notes/2026-10-14-reveal-stage-crop.md` (EDD-lite and rollback plan, accepted as the EDD) · ADR: none needed (one-revert change) · Amendment: none (`src/kit/Lesson.tsx` and `tests/qa/` untouched)
- Diff reviewed: `git show 1a879c6` (`useRevealFit` in `src/components/DemoCard.tsx`; a comment in `src/app/globals.css`). Read in full at HEAD, including the stage/reveal ResizeObserver added by the snapshot commits.
- [x] The problem is real and measured (stage-top crop 103-467 px in the six named lessons; 22/29 cropped in a sample)
- [x] At least two options were considered, including doing nothing: whole-stage transform (withdrawn, broke 24px), picture-only fit (this), and the design options routed to W-259
- [x] Blast radius: every lesson's reveal, in the feed and on `/d/<slug>`. Measured below: **433 of 593 measurable lessons** have a picture shrunk at 390×844.
- [x] Rollback is one revert (1a879c6 plus the useRevealFit part of 740f5a1/01006ec, as the note says)
- [ ] `npm run verify` passed on the integrated tree: **not yet**. The author ran the contract on 73 lessons. Integrated build 5 is running now (coordinator); its result belongs in this record.
- [x] Measurements committed before implementation, and checked after (the note's table; my probe reproduces its numbers exactly)
- [n/a] Security, privacy and licenses (no dependencies, no events)

## How I checked

Diff read first, then a measurement, because the four questions asked (text size, floor, overlays, tap
targets) are about what the fit does to real lessons, not about the code alone. No build (build 5 was
running). Probe: `company/engineering/reviews/2026-10-14-W-237-probe.mjs`, run on the pre-fix build 4
(:3480) at 390×844 touch over all 638 lessons, QA-contract path to the reveal, then a verbatim copy of
1a879c6's fit applied in the page. Raw results: `company/engineering/reviews/2026-10-14-W-237-probe.json`.
Fidelity check: the remaining overflow it computes for the five named lessons is 33/45/275/99/0 px, the
same as the note's "final" column. 45 lessons could not be measured (reveal not unlocked on the contract path).

| measure (390×844, 593 measured lessons) | result |
|---|---|
| card body overflows at the reveal | 456 |
| at least one picture shrunk | 433 |
| shrunk lessons that now fit stage + reveal fully | 261 |
| shrunk lessons that hit the 40% floor | 182 (median k over shrunk lessons 0.49) |
| smallest svg `<text>` rendered below 9 px after the fit | **347** (below 7 px: 280) |
| smallest svg text, median: natural → fitted | 10 px → **4.9 px** |
| shrinks that freed 0 px | 11 (7 are `position: absolute` overlays; 2 of them `preserveAspectRatio="none"`) |
| shrunk svgs holding pointer-like elements not tagged `data-qa="control"` | 3 lessons |

## Findings (problems, not fixes)

**Correctness (resize, re-entering the reveal, Reset, reduced motion, no viewBox): sound.**

- **Resize and rotation.** Every fit starts from `unscale` and re-measures natural heights, so a width change
  fits the new layout rather than the old one. A height-only resize after the learner has scrolled is skipped
  by design (W-139), which leaves the previous fit in place. That is acceptable.
- **Re-entering the reveal and Reset.** Leaving the reveal phase runs `unscale`. Re-entering resets `userScrolled`
  and fits again. A 400 ms timer that fires after Reset is stopped by the `revealed` guard. A lesson that remounts its
  svg gets fresh elements with no inline styles. Minor: the stage/reveal ResizeObserver keeps observing detached
  nodes after a remount until the card unmounts (a small leak, not a defect).
- **Reduced motion.** The fit sets a style and `scrollTop`. Nothing animates. `scroll-behavior` is auto everywhere
  (the only rule is the reduced-motion one), so `expectedTop` matches and no false `userScrolled` is set.
- **SVGs without viewBox** are excluded by the selector. That is correct: without a viewBox, `max-height` would crop
  the drawing, not scale it.
- **The fit never scrolls back up.** If a later re-fit needs less scroll than an earlier one, the old `scrollTop` stays.
  The browser's clamp covers this when the reveal is the last thing in the body. Low risk, not measured.
- **Lesson inline `max-height`/`min-height` on an svg would be erased by `unscale`.** Today no lesson sets one (grep: 0).

**Layout loops and thrash: no loop.**

- Each fit is unscale, measure, shrink, all in one task, and it is deterministic from the natural layout. The first fit
  resizes the stage, so the stage ResizeObserver fires once. The re-fit gives the same final size, so no further
  notification. It converges in two passes. Changes happen in rAF, not inside the RO callback, so there is no
  "ResizeObserver loop" error.
- Cost: 2 + n forced layouts per fit (n = candidate pictures, usually 1). On a stage that animates its size during the
  reveal, this runs every frame. That is cheap but not free. In the feed, up to three cards run it. Acceptable, not measured.

**Accessibility: the 24px rule holds as the contract measures it. Text does not.**

- **SVG text goes below readable size in most lessons (the main defect).** A uniform letterbox scale shrinks every label
  with the picture. In 347 of 433 shrunk lessons, the smallest label ends up below 9 px. The median is 4.9 px, and the
  five named lessons go from 10-12 px to 4.0-4.9 px. The reveal often names those labels, so "on screen but unreadable"
  replaces "off screen". This is worse in one way: before, the learner could scroll up to read the label. Now nothing
  the learner can do brings it back except pinch-zoom. It also conflicts with the rule the head of product adopted
  today in `company/product/demo-standard.md` ("The reveal fits with its picture": "Never fix it by shrinking text or
  tap targets"). The kit does at scale what that rule forbids builders to do by hand.
- **24px tap targets.** `[data-qa="control"]` elements are never scaled, so the contract passes. The contract sees only
  tagged controls, though. In three lessons the probe found pointer-like elements (`cursor: pointer`, `tabindex` or
  `role="button"`) inside a shrunk svg: the-tagged-molecule, wheel-needs-four-colours and three-students-two-rooms. If those
  are live after the reveal, their targets shrink and no gate notices. Not confirmed by hand.
- **Overlays.** 7 shrinks hit `position: absolute` svgs (cheapest-is-not-shortest, in-order-is-sorted, fib-call-explosion,
  huffman-by-merging, heapify-from-the-bottom ×2, paths-by-adding). Out of flow, they free no space. The svg still shrinks,
  so the lines no longer meet the HTML nodes laid over them. The two `preserveAspectRatio="none"` overlays squash rather
  than letterbox (cheapest-is-not-shortest 200 → 168 px, in-order-is-sorted 190 → 173 px). The note called this "a risk,
  not a measured defect". It is now measured. 4 more in-flow shrinks also freed nothing (for example, the picture sits in a
  row its sibling sets the height of).

**Is 40% a defensible floor? Not as a single number.**

- 40% was carried over from the withdrawn transform version (`REVEAL_SCALE_FLOOR`). Nothing in the note justifies it on its
  own terms. It is the binding limit in 182 lessons, including 4 of the 5 named ones.
- For a **text-free** picture (52 of the shrunk lessons), 40% is defensible: a shape at 128 px is still recognisable,
  and what the reveal names is a shape. For a **labelled** picture, the right floor is text size, not a ratio. My estimate from
  the probe data: a floor that keeps every svg label at 9 px or more still fits about 60 lessons fully (an 8 px floor fits
  about 93), against 261 now. That is the honest cost of readable labels. The rest is the per-lesson work the W-259 decision
  already routes (W-264 to W-267).

## Decision

**Approve with changes.** No revert now, because the mechanism is right for in-flow, text-free pictures and the code is
correct and loop-free. Changes 1 and 2 **block release**: if they are not in the build that ships, revert 1a879c6 (and the
useRevealFit part of 740f5a1/01006ec) for that build, as the note's rollback describes. Changes 3 and 4 do not block.

1. **Legibility floor (blocking).** Per picture, floor = `max(0.4, 9 / smallest rendered <text> px)` (no shrink at all if
   that is ≥ 1; text-free pictures keep 0.4). 9 px is my starting number. The accessibility reviewer may raise it, and the
   head of product decides whether demo-standard's "never shrink text" allows any shrink of labelled pictures. If it does not,
   the floor for labelled pictures is 1.
2. **Undo a shrink that frees nothing, and skip distorting pictures (blocking).** After each shrink, if `over` dropped by less
   than 1 px, remove that svg's inline styles. Skip `preserveAspectRatio="none"` and `position: absolute | fixed` svgs outright.
3. **Untagged interactive svgs.** Skip svgs that contain `[tabindex]`, `[role="button"]` or `[role="slider"]`, and check the three
   lessons named above by hand (are those elements live after the reveal?). If so, tag them `data-qa="control"`.
4. **Re-measure after 1-3** with the probe (or W-242's reveal-fit, once it reports crop and text size), and put the before/after
   numbers into the change note. This replaces the note's 6-lesson table as the evidence for the change.

Objections that travel with it:

| Objection | Raised by | Status |
|---|---|---|
| A legibility floor gives back most of the gain: about 60 lessons fit fully instead of 261. | principal-engineer (anticipated for platform-engineer) | **Accepted as the cost.** A visible label at 4.9 px does not meet the W-259 rule ("what the reveal names is visible"). The remaining crop goes through the per-lesson route that the design lead already decided (W-264 to W-267). |
| 9 px is not a company standard; no file sets a minimum text size. | principal-engineer | **Open, routed.** The accessibility reviewer sets the number. Until then, 9 px is the floor in change 1. |
| Merged and in integrated build 5 before review. | principal-engineer | **Accepted.** Same pattern as W-135: the note is good enough to act as the EDD. Release is conditional on changes 1-2 or the revert. |
| `npm run verify` not run on the integrated tree. | principal-engineer | **Open.** Build 5 (coordinator) is that run. Paste its summary here. |

## Follow-ups (board)

- **W-287**, platform-engineer: changes 1-2 (blocking release).
- **W-288**, platform-engineer: changes 3-4.
- **W-289**, accessibility-reviewer: minimum svg text size at the reveal.
- W-237 moved to done (this review). The objection is also recorded in `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.
- The stale W-237 board text still describes the withdrawn transform version. This record supersedes it.

## Kudos (optional)

- @platform-engineer: the change note gave a cause, a before/after table and a rollback plan. That made the review a measurement instead of an archaeology dig, and the probe could be checked against its numbers.
