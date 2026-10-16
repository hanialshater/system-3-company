# Design review (S4): draw-a-table-knot, first built knot lesson (W-1588)

design-lead (Ines) · 2026-10-16 · worktree branch `worktree-agent-a76b2c379103ddb27` (from `ccr-4c6c7654-ew9ko1` at 5b5341c6)

**Verdict: pass with changes** (D1 to D3 below, all CSS in `src/demos/math/draw-a-table-knot/styles.module.css`). Both of the builder's departures are accepted, and so is the tightened viewBox.

**Authority.** Condition S4 of my contact-sheet record, `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md`: the design review of the built lesson checks its walkthrough sheet at phone size against S1 to S3, and any departure from S1 to S3 comes back to me. This record rules on pictures and layout only. What to teach and the reveal's words belong to cm-math-discrete and the learning designer.

## What I looked at, in this order (artifact first)

1. **The build.** `NEXT_DIST_DIR=.next-dl1588 npm run build`, served on port 3588 (`tools/serve.sh`). Dispatch preflight: `tools/dispatch-check.mjs --kind=build` passed (0 builders in flight).
2. **The walkthrough.** `npm run walkthrough -- draw-a-table-knot` (phone, option 1): `artifacts/walkthroughs/draw-a-table-knot/sheet.png` and its 9 frames. I wrote the findings below from the sheet before I opened `build.md`.
3. **The reveal fit.** `node tools/reveal-fit.mjs --strict` at 390×844, 360×740 and 360×640.
4. **My own probes, kept beside this record** in `2026-10-16-draw-a-table-knot-s4/`:
   - `fit-probe.mjs`: stage overflow and reveal fit for every predict option and both reveal variants. It takes an optional CSS override, which is how D3 was tested before I wrote it.
   - `bbox.mjs`: the curve extent of all 13 pictures against the viewBox.
   - `contrast.mjs`: WCAG ratios.
5. **Then the builder's account,** `company/reviews/draw-a-table-knot/build.md` (S1 to S4 section, phone-fit notes).

## Measured fit

**Reveal at 390×844** (the standard's size), from `reveal-fit --strict`:
- verdict **fit**, crop 0 px, hidden 0 px, phoneFit true, pass 1;
- **80 words** with the kit's verdict line. The cut to 67 holds: the reveal is 90 or fewer words.

**Every reveal variant at 390×844** (`fit-probe.mjs`, 3 predict options × the last switch giving 4₁ or 0₁):

| Measure | Result |
|---|---|
| Stage-top crop | 0 px in all 6 |
| Words | 70 to 81 |
| Room left below the last line | 27 to 68 px. The tightest is the 0₁ variant after a wrong answer. |

**Shorter phones** (not the standard's size; recorded for the next holder):

| Viewport | reveal-fit verdict | Stage-top crop | Words |
|---|---|---|---|
| 360×740 | fit | 62 px (21 to 102 across variants) | 80 |
| 360×640 | fit | 162 px | 80 |

At both sizes the stage top is cropped. Neither size fails the standard, which binds at 390×844.

**Explore, stage overflow at the longest readout** ("Name: 0₁, plain loop"):

| Viewport | Board | Readout | Stage overflow | Chip row hidden |
|---|---|---|---|---|
| 390×844 | 284 px (2.76 px/unit) | 1 line | 0 px | 0 px |
| 360×740 | 261 px (2.54 px/unit) | 2 lines | 31 to 51 px | 20 to 41 px |
| 360×640 | 226 px (2.19 px/unit) | 2 lines | 95 to 115 px | 84 to 105 px |

This confirms the builder's 360×740 finding. At 360×740 the chip row is cut. At 360×640 the readout itself is partly below the stage fold.

## Findings from the sheet

1. **The knots read as knots at every frame.** The gaps at `gap: 0.5` are clearly wider than the stroke. There is no beak, since 4₁ is never drawn here: a switch changes the name but keeps 6₁'s or 5₂'s layout.
   - The switched states keep the outline (U2): only the gap moves.
   - The 6₁ clasp pair at the bottom is the closest pair, and it reads as two crossings.
2. **The ring (departure a) works.** It answers "which one did I switch?", which the moved gap alone answers weakly at a glance.
   - It is drawn **under** the strands, at r 9 units (25 px at 390), well clear of the gap (the gap ends are about 2.7 units from the centre).
   - Its stroke is 1.2 units, against the strand's 2, so it does not read as a seventh strand.
   - In **light mode** it is the pastel `--domain` `#7c9cff` on `--bg-3` `#eceff6`: **2.26:1**, under the 3:1 that graphics need (`company/design/system.md`, Contrast). In dark mode it is 5.95:1. See D1.
3. **The "Seen on 6₁: 6 drawn, name 4₁" line is pastel text** (`color: var(--domain)`): **2.26:1 in light mode**, against the 4.5:1 that text needs.
   - `system.md` says never to use `--domain` as text in light mode.
   - This line is also the reveal's on-stage trace: when the QA path ends on 5₂, it is the only place the quoted 6₁ → 4₁ is still visible at the reveal (demo-standard "The reveal quotes what you saw"). So it must be legible. See D2.
4. **The reveal picture (departure b), 231 px, is right.**
   - At 2.24 px per unit it is exactly the smallest scale my contact sheet measured clean (260 / 116).
   - The 6₁ gaps stay at about 7.3 px and 5₂'s at about 8.7 px, so it reads.
   - The hit circles are disabled at the reveal, so S3 room no longer matters there.
   - The tightest variant leaves only 27 px spare, so a larger reveal picture would cost the 0₁ variant its fit. I do not ask for one.
   - Hiding the gesture caption at the reveal is also fine: the reveal does not point at it.
5. **Observation, not a design change.** On the QA path the stage at the reveal shows 5₂ unswitched ("Crossings drawn: 5 · Name: 5₂") while the reveal talks about 6₁ becoming 4₁. The Seen line carries the quoted state, so the rule is met, provided D2 makes the line readable. Whether a learner connects the two is a question for the learner review, not a ruling of mine.

## Rulings

- **(a) The switched-crossing ring: accepted, with D1.** Keep r 9 units, stroke 1.2, drawn before the strands, and no ring when nothing is switched.
- **(b) The picture at 231 px at the reveal: accepted, with the cap in D3.** The cap stops the picture from growing at the reveal on short phones.
- **The tightened viewBox `-1.5 -1 103 105`: accepted.** It is what S1 allows.
  - I re-measured it with `bbox.mjs`: across all 13 pictures (both knots, plus all 11 single switches), the curves span x 6.9 to 93.1 and y 7.2 to 95.7. That leaves 8.2 to 8.4 units of margin on every side. The builder's figures hold.
  - The tightest crossing-to-edge room is 9.9 units (5₂, crossing 3), which is 27 px at the explore scale.
  - The hit targets are HTML buttons laid over the SVG and are not clipped by the viewBox. `fit-probe.mjs` finds no hit button over the readout or the chip row at any size.
- **The short-phone issue (360×740): fix it, with D3.** The builder recorded it as a kit-scroll case. It is not the standard's size, but a 360×740-class phone is common, and a cut chip row hides the 5₂ chip, which half of the lesson needs. The fix is one CSS line, and I tested it.
- **At 360×640 the stage still scrolls** by 74 to 94 px after D3. **Accepted.**
  - The picture can't get smaller without breaking the hit circles: the clasp pair would overlap below about 1.76 px per unit.
  - The standard binds at 390×844, and horizontal overflow is 0.
  - No content change is asked for.

## Changes required (D1 to D3)

**D1. Ring colour in light mode.**
- Add:
  `@media (prefers-color-scheme: light) { .ring { stroke: color-mix(in srgb, var(--domain) 80%, #000); } }`
- This gives `#637dcc`: 3.42:1 on `--bg-3`, and 4.5:1 apart from the `--fg` strands, so it stays distinct from them.
- Dark mode stays as it is.

**D2. Seen line colour in light mode.**
- Add:
  `@media (prefers-color-scheme: light) { .seen { color: color-mix(in srgb, var(--domain) 45%, #000); } }`
- This is the documented ink mix in `system.md`: `#384673`, 7.96:1.
- Dark mode stays as it is (5.95:1).
- Do not change its size or weight.

**D3. A height-aware board width, with the reveal picture capped at it.**
- Replace the two width rules with:
  - `.board { width: min(100%, clamp(206px, calc((100dvh - 525px) * 103 / 105), 284px)); }`
  - `.atReveal .board { width: min(100%, 231px, clamp(206px, calc((100dvh - 525px) * 103 / 105), 284px)); }`
- Tested as an override (`fit-probe.mjs`, all 3 options, 0₁ readout):

| Viewport | Board | Stage overflow | Notes |
|---|---|---|---|
| 390×844 | 284 px, unchanged | 0 px | Reveal unchanged: crop 0, 27 to 68 px to spare |
| 360×740 | 211 px (2.05 px/unit) | 0 px (was 31 to 51) | Chip row fully on screen; reveal crop down by 20 px |
| 360×640 | 206 px | 74 to 94 px (was 95 to 115) | |

- No hit button overlaps text at any size.
- At 2.05 px per unit, the closest crossing pair is 51 px apart (no overlap of the 44 px circles), and the 6₁ gaps are about 6.7 px. That is above the 6.1 px I cleared for 4₁ in the contact sheet.
- If the kit's chrome changes, the 525 px constant can drift. The check is `fit-probe.mjs`: overflow must be 0 at 360×740, and nothing may change at 390×844.

After D1 to D3, the builder re-runs:
- the walkthrough;
- `reveal-fit --strict` at 390×844 (must stay fit, crop 0);
- `fit-probe.mjs` (0 overflow at 360×740).

The builder records the numbers in `build.md`. I do not need to see it again for D1 to D3 unless a number misses. Any other departure from S1 to S3 comes back to me.

## What I believe, and how sure

- At 390×844 the lesson meets S1 to S3 and the reveal fits, in every variant: **sure** (measured on the build, 6 variants).
- The ring helps, and is right once D1 is applied: **fairly sure**. I have seen it in both themes; it is untested with learners.
- D3 fixes 360×740 without costing 390×844: **sure** for this build's chrome (tested as an override); the formula is chrome-dependent.
- D2 is required, not cosmetic: **sure** (2.26:1 text, measured from the tokens).

## Objections, and what happened to each

- **The builder: "360×740 is a kit-scroll case; recorded, not fixed."** Partly overruled: D3 fixes it at no cost to 390×844. At 360×640 I agree, and it stays a scroll.
- **"A larger picture at the reveal would read better" (my own first instinct from the 390×844 frame, which had 48 px spare).** Dropped: the 0₁ variant has only 27 px spare.

## Next moves

| Move | Owner |
|---|---|
| Apply D1 to D3 and re-run the three checks above | demo-builder (board W-1590) |
| Learner review: does a learner who ends on 5₂ connect the reveal to the Seen line (finding 5)? | learner-review |
| Fact-check of claims c1 to c8 (0/8 checked) | fact-checker (already in the lesson's gates) |
