# Design ruling: left-or-right v2, two departures from S4

design-lead (Ines) · 2026-10-17 · on main at aae6d2d6 (lesson v2, demo-builder run lor-v2-fix). Build `.next-dl-v2d`, served on 3647, Chromium. Probe: `2026-10-17-left-or-right-v2-departures/together-probe.mjs` (run from the repo root, `BASE=http://localhost:<port>`, optional CSS override as the first argument). Screenshots: `artifacts/design-v2d-lor/` (not tracked; the D3 one is copied beside this record).

Inputs: my S4 record `2026-10-17-left-or-right-s4.md` (D1, D2), the builder's "v2 fix round" in `company/reviews/left-or-right/build.md` and its probe log `v2-w1606-probe.log`, QA finding 1 in `company/reviews/left-or-right/2026-10-16-qa.md`. I did not design or build this lesson, so this is not a self-review.

**Rulings: (1) accepted. (2) accepted in a narrower form (D3 below): cut the margin above the Turn over · Mirror row only, not above the chip row.**

## (1) D2 as unmounting instead of `display: none`: accepted

- What D2 was for: no Turn over · Mirror row at the reveal, so the figure-eight ending fits at 390×844. The builder unmounts the row (`ctx.phase !== "reveal"`). The learner sees and hears the same thing: `display: none` also takes the buttons out of the layout and the accessibility tree.
- Measured on main: at the reveal, after Turn over > Mirror and after Turn over > Mirror > Figure-eight > Mirror, **0** Turn over or Mirror buttons are in the DOM, and the chip row (Trefoil, Figure-eight) stays. The builder's reveal numbers (390×844: crop 0 on all three endings, 35 px spare on the figure-eight ending) are the numbers my S4 override predicted.
- Nothing is lost by unmounting. The toggle state lives in the Demo, not in the buttons, and the reveal is terminal.
- I do not want the CSS form back. I named a CSS rule in D2 as a way to do it, not as a requirement. Unmounting is the tricolour-check precedent that D2 cited.
- Not a design question: `reveal-fit --strict` counts a `display: none` button whose label matches a reveal word as named-but-hidden. That is arguably a false positive, but it is a tool's gate. I do not rule on it, and the lesson no longer triggers it.

## (2) The 3 px at 360×640: accepted in a narrower form (D3)

**Measured on main** (every predict option, fresh and after Turn over; `need` = from the readout top to the Turn over/Mirror bottom; `window` = the stage's visible height):

| Viewport | Picture | Need | Window | Together | Strand to row |
|---|---|---|---|---|---|
| 390×844 | 320 | 413 / 434 (opt 2) | 483 / 504 | yes | 63 / 73 px |
| 360×740 | 217 | 309 | 379 | yes | 44 px |
| 360×640 | 190 (floor) | **282** | **279** | **no** | 39 px |

At 360×640, scrolling the stage just enough to show the controls (13 px) puts the readout top at 171 against the window top at 174. This is the builder's measure, reproduced.

**Overrides tried:**

| Override | 360×640 need / window | Readout whole when controls show | 360×740 picture | Gap between the two control rows |
|---|---|---|---|---|
| Builder's form: every `.wrapAll > .row` margin-top 0 | 278 / 279 | yes (scroll 9, readout top 175 vs 174) | 225 | **2 px** |
| D3: only the row after the picture, margin-top 0 | 278 / 279 | yes (scroll 9, readout top 175 vs 174) | 221 | 6 px (unchanged) |

- Both forms close the shortfall with 1 px spare, on all 3 options, in light and dark.
- The builder's global form also cuts the gap between the two 44 px control rows to 2 px. The chip row is not part of the readout-and-controls span, so that cut buys nothing at 360×640. It only packs the two rows of buttons together. **D3 keeps the chip row's margin.**
- What D3 costs: the picture box now touches the row (2 px, the wrapAll gap). The lowest drawn strand is still 35 px above the buttons at 360×640, 41 px at 360×740 and 63 to 73 px at 390, because the card keeps its own empty margin (strands reach 43 of 58 half-height units). The mid-flip growth (at most 7 % of the drawn height) stays inside that margin. Screenshot: `2026-10-17-left-or-right-v2-departures/360x640-scrolled-light-fix.png` (D3 as an override). In it the readout, the seen line, the knot and both buttons are on screen together, and nothing looks crowded.
- Side effect, accepted: at 360×740 the picture grows from 217 to 221 px. At 390×844 it stays at its 320 cap. The reveal is unchanged, because `.wrapAll.atReveal > .row` is already margin-top 0 and the row is unmounted there.

**D3** (for demo-builder, in `src/demos/math/left-or-right/styles.module.css`): add
`.wrapAll > .picArea + :global(.row) { margin-top: 0; }`
Keep `.wrapAll > :global(.row) { margin-top: 4px; … }` for the chip row. Then re-run `v2-w1606-probe.mjs`: 360×640 should read need 278, window 279, together true. Also re-run `reveal-fit --strict` at 390×844 and the QA contract. Record the numbers in build.md. I do not need to see it again unless a number misses.

**Not a gate.** 1 px of spare depends on the kit's chrome at 360×640, and a real device's fonts may differ. If a future kit or copy change brings back a pixel or two, the readout-and-controls span at 360×640 stays an accepted short-phone limit, as in S4. Do not shrink the 190 px floor or the 44 px targets to win it back.

## What I believe, and how sure

- Unmounting is equivalent to D2 for the learner: **sure** (DOM count 0 on both endings; same layout as the S4 override).
- D3 makes the readout and both toggles visible together at 360×640 on every option: **sure** in Chromium (measured as an override on main). Real devices: **fairly sure**, given the 1 px margin.
- D3 does not hurt legibility at any size: **fairly sure** (strand-to-row 35 px or more; one screenshot viewed, at 360×640).

## Objections, and what happened to each

- **Builder: "say if you want the CSS form back; the measure would then need a ruling on the heuristic."** I do not want it back. The heuristic ruling is not needed, and it is not mine.
- **Builder: "a 4 px cut of the row's margin-top would close it."** Accepted for the Turn over · Mirror row only. The chip row keeps its 4 px, because cutting it gains nothing at 360×640 and leaves 2 px between two rows of buttons.

## Next moves

| Move | Owner |
|---|---|
| Apply D3; re-run v2-w1606-probe, reveal-fit --strict 390×844, QA contract; record numbers in build.md | demo-builder |
| (Optional) Whether `reveal-fit --strict` should skip `display: none` controls when it matches named controls | qa-tester / tools owner |
