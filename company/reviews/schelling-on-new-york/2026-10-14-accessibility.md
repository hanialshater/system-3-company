# Accessibility review: schelling-on-new-york v3 (build-time design review)

Reviewer: accessibility-reviewer, session 2, 2026-10-14. Built from `src/demos/geography/schelling-on-new-york/` as it stands on branch s2-rebuild.
Method: dev server (NEXT_DIST_DIR=.next-a11y, port 3199); Playwright at 390x844 (DPR 2 and 1), 320x568, 360x640 and 1280x800; light and dark `prefers-color-scheme`; `prefers-reduced-motion: reduce`; colour-blind simulation by feColorMatrix filter (deuteranopia, protanopia, tritanopia, greyscale) over the reveal pair; contrast computed from the token values (WCAG relative luminance); keyboard path driven by Tab/Enter only. This was written before reading the design review or the build note (see "After reading" at the end).
Screenshots (scratch, not committed): scratchpad `a11y/*.png`.

## Verdict
No item locks a learner out, so nothing here blocks launch under my authority. Two items FAIL and should be fixed before launch (focus loss, label-in-name). Four items PASS WITH ADVISORY.

| # | Item | Result |
|---|---|---|
| 1 | Group A vs B at the reveal's ~3px cells | PASS with advisory |
| 2 | One-group outline weight and legibility | PASS with advisory |
| 3 | Text contrast incl. captions over water | PASS |
| 4 | Keyboard operation of the 7 controls, visible focus | FAIL (focus loss); focus ring PASS |
| 5 | Screen-reader text | FAIL (control names) / PASS with advisory (picture alt) |
| 6 | Reduced motion | PASS |
| 7 | Tap targets >= 44px | PASS |

## 1. Groups at reveal cell size: PASS with advisory
Measured pair SVG: 262.5 px wide on a 390 px phone = 3.09 px per cell (the design rule says 3.16 px; the phone is a little under it), 3.56 px at 1280 px desktop. A mark is 0.74 cell (square) or 0.84 cell (circle), so 2.3 to 2.6 CSS px.
Computed contrast (WCAG), mark vs the land fill it sits on, and A vs B:

| theme | A on land | B on land | A vs B |
|---|---|---|---|
| dark (A #5ed6c4, B #9b6cf0, land #0d0f14) | 10.85 | 5.29 | 2.05 |
| light (A #005f54, B #9466ee, land #fff) | 7.60 | 3.89 | 1.95 |

Both groups clear 3:1 against land in both themes. A vs B differs in hue and in lightness, but the lightness gap alone is about 2:1.
Colour-blind simulation (A vs B contrast, hue difference visible in the screenshots): deuteranopia dark 1.76 / light 2.47; protanopia 2.14 / 1.97; tritanopia 2.27 / 1.68. In every simulation the two groups still read as two different colours (grey vs blue in deuteranopia/protanopia, light) and the clumps are easy to see at DPR 2.
Advisory: in greyscale at DPR 1 the two groups are close to indistinguishable, because the 2:1 lightness gap is small and 2.5 px squares vs circles do not resolve (`light-dpr1-gray.png`). That is the one learner (monochrome display or achromatopsia, low-density screen) for whom the reveal fails. Not a lock-out: the reveal text and captions carry the numbers.
Fix (optional, cheap): widen the lightness gap to at least 3:1 in light theme, by darkening `--ga` to about `#004a41` (A/B rises to roughly 2.6 with the current B; B on land stays 3.89). In dark theme lower `--gb` luminance to `#8559e0` (B on land 4.0, A/B about 2.6). Re-run the sim after. Do not rely on shape at the reveal; it is not resolvable at DPR 1.

## 2. One-group outline: PASS with advisory
Stroke `--fg` at 0.6 opacity, 1.25 px, inset so it sits in the gutter between boxes, never filled, never merged. In the screenshots at 2x2, 4x4 and 8x8, light and dark, it does not read as territories: each box is its own closed square, and no region fill appears.
Contrast: over land, the 60% blended stroke is 6.5:1 dark and 4.6:1 light (pass 3:1). Where the stroke crosses a mark it drops to roughly 1.5 to 2:1 (dark-on-dark-teal in light theme, light-on-light-teal in dark), but the stroke is mostly in the gutter, so the box remains legible.
Advisory 1: the outline and the lattice are nearly the same grey and differ by 0.25 px of weight (1.25 vs 1). On the light theme the closed squares are told from lattice lines mostly by their closure, which a learner with low vision may miss. Fix: stroke-width 1.5px (the top of the cultural ruling's 1 to 1.5 px range) at opacity 0.8 on `.outline`, and raise the inset constant from 1.6 to 1.75 so it still clears the lattice. Do not go to 2 px (cultural ruling 1.2 caps it) and do not dash it (reads as selection).
Advisory 2: no non-visual equivalent of the outlines other than the "one-group boxes NN%" number (which is in the alt and the live header). That is enough.

## 3. Text contrast: PASS
Stage background is `--bg-3` (dark #1f2430, light #eceff6). Captions over the water area sit on that.

| text | colour | on | dark | light |
|---|---|---|---|---|
| S1 caption, header, lines, rule | `--muted` | `--bg-3` | 6.12 | 5.07 |
| S4 caption | `--fg` | `--bg-3` | about 14 | about 15 |
| bold values, box values | `--fg` | `--bg-3` | pass | pass |
| lattice (muted) vs land | | | 7.56 | 5.84 |

All at least 4.5:1. The captions fit in the water at the smallest map size (246 px): corner box 102 x 149.9 px against a 150 px limit, so text does not touch land at 320x568 or 360x640.
Advisory: that fit has 0.1 px of slack and all caption text is fixed 12 px. Anyone who forces a larger minimum font size will push S4 over the land (marks, not text, lose). Fix: let `.corner` overflow-safe by dropping `max-height` and giving `.s1, .s4` `font-size: clamp(11px, 3.1cqw, 12px)` with `container-type: inline-size` on `.map`, or move S4 below the map when it would not fit. 12 px px-units also ignore the user's browser font setting; use `0.75rem`.

## 4. Keyboard: FAIL (focus loss); focus visibility PASS
Tab order reached all 7 stage controls in reading order (Step, Run, New mix, Reset, 2x2, 4x4, 8x8) and Enter activates each. The default browser focus ring is not removed anywhere (`outline` is not overridden in the app or lesson CSS) and is a visible two-tone ring on both themes (`dark-focus-box.png`).
FAIL, measured: focus is destroyed after use.
- Pressing Run on the last round: the run ends, Run and Step become `disabled`, and `document.activeElement` becomes BODY. Keyboard user must Tab from the top of the page again.
- Pressing a box size (2x2, 4x4, 8x8): the pressed button becomes `disabled` (`disabled={locked || q === k}`), activeElement becomes BODY. Same cost, and it happens on every box change, which is the lesson's main action.
- Pressing Step to the last round does the same.
Fix, in `Demo.tsx` (the builder applies it):
1. Box buttons: remove `q === k` from `disabled`; keep `aria-pressed={q === k}`; make `onClick={() => q !== k && box(q)}`. The `.control.active` style already marks the pressed one.
2. Step and Run: replace `disabled={locked || tt >= last}` with `aria-disabled` plus an `onClick` guard, and add `.control[aria-disabled="true"] { opacity: .5; cursor: default }` in `styles.module.css`; or call `newMixRef.current?.focus()` when the run finishes. Check the computer-use QA contract still treats these as inert before choosing (it uses `isDisabled`).
Everything else on the path works: predict options and commit by keyboard, reveal button reachable.

## 5. Screen-reader text
Picture alt (explore): "A grid shaped like New York City with made-up households, mix N. Round R: 518 households in two equal made-up groups, W% would move; spread in K by K boxes D; one-group boxes P%." Says "made-up households", gives the numbers. PASS with advisory below.
Reveal alt: "Two settled grids of made-up households, shaped like New York City, mix P and mix Q, same rule at 30%: the clumps are in different places. Mix P in 2 by 2 boxes: a at the start, b settled. Mix Q: c to d." PASS with advisory.
Captions (S1, S4, header, rule, line) are real `<p>` or `<div>` outside `role="img"`, so they are read. PASS. The inline legend swatches are `aria-hidden`, so S1 reads "each A or B is one household", with no shapes named, which is correct for a non-visual reader.
Advisory (what the alt does not say): it never says which group is where, and does not name the groups at all (the learner is told A and B only in S1 and the visual marks). A screen-reader learner cannot get the reveal's point, that the clumps landed in different places, except as an assertion. The numbers are equivalent (spread and one-group share), so the claim is checkable. Add one sentence to each alt only if it can be true for every seed, otherwise leave it as is: for example "Group A and group B settle into clumps of one group; the boundaries differ between the two grids." Do not name boroughs (cultural review territory).
FAIL (label in name, WCAG 2.5.3) for the box buttons: visible text is "2x2 0.44->0.76", accessible name is the `aria-label` "Boxes of 2 by 2 cells". Voice-control users saying "click 2x2" can match no name starting with that, and screen-reader users never hear the spread value on the button (it is only in the alt for the current box). Fix: `aria-label={`${q}×${q} boxes${val.trim() ? `, spread ${val.replace("→", " to ")}` : ""}`}`, or delete the `aria-label` and give the `<small>` a visually-hidden prefix.
Advisory: `.head` is `aria-live="polite"` and changes up to 8 times in 360 ms during Run. Add `aria-atomic="true"` and consider announcing only when the round settles (e.g. a separate live region with "Settled at round R"), or the learner hears a burst of numbers.

## 6. Reduced motion: PASS
`animate()` checks `matchMedia("(prefers-reduced-motion: reduce)")` at press time and jumps to the final frame (`setT(to)`). Global CSS also zeroes animation and transition. Verified at 390x844 with `reducedMotion: reduce`: Run lands on the settled frame immediately. With motion allowed it is at most 8 jumps of 45 ms: no flashing.

## 7. Tap targets: PASS
All 7 controls measured at 44 px high; widths Step 53.1, Run 48.4, New mix 80.5, Reset 60.4, box buttons 76 each. Gaps are 4 and 6 px. Same at 320x568 and 1280x800.
Advisory (layout, not target size): on 360x640 and 320x568 the stage scrolls by 207 and 348 px because the map cannot shrink below 246 px; the controls are below the fold of the stage and need an inner scroll. Not a failure, but nested scrolling is hard with a switch or screen magnifier. If the builder wants to help: reduce the map floor on small heights, or flow S1/S4 beside the controls.

## Fix list for the builder (all in the lesson files, I did not edit them)
1. Keep focus: no `disabled` on the pressed box button; Step and Run use `aria-disabled` (item 4).
2. Box button accessible name contains its visible text (item 5).
3. `.head` live region atomic and calmer (item 5, advisory).
4. Optional: widen A/B lightness gap (item 1), outline to 1.5px at 0.8 with the inset change (item 2), rem units for captions (item 3).
Next owner: builder for 1 to 3; visual-designer for the colour and weight choices in 4.

## After reading (design review and build note v3, read after the findings above were written)
- Design review D2.4 sends "groups at small cell size" to me with a default fix: more lightness separation between A and B, not a third hue, pattern or labels. My item 1 agrees: the measured A/B gap is 1.95 to 2.05:1, shapes do not resolve at DPR 1, so widen the lightness gap. D2's acceptance (cells at least 2.9 CSS px) is met on a 390 px phone (3.09) and desktop (3.56). The design review accepts B near 2.5:1 on white land if I do; I do, B is 3.89 now.
- Design review D7 asked for a 2 px outline; the build chose 1.25 px at 0.6 and recorded why (build note, D7; open item 5 asks me to rule). Ruling: keep it under 2 px, since the cultural ruling caps it at 1.5; move to 1.5 px at 0.8 (item 2). The outline is accepted as not reading as territories.
- D8 asked for 12 px minimum and the 246 px floor: met. D11 asked for 44 px controls: met (item 7). The build note does not mention focus loss on disabled-while-pressed buttons or the box button label-in-name issue; both are new findings.
