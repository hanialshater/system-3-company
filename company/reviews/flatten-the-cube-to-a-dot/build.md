# Build notes: flatten-the-cube-to-a-dot

demo-builder · 2026-10-25 · board W-2044 (lane M, under W-2037) · version 1 · status draft (not moved to review: design review W-2037 comes first)

Built from `company/design/specs/flatten-the-cube-to-a-dot.md` (W-2042) in `CardSequence`/`SubCard`, as euclid-three-steps does.
`FP`, `ORDER` and `REGIONS` are copied from `company/design/specs/flatten-the-cube-to-a-dot-mockup.mjs`. The 13 states (start plus 12 removals) are recomputed in `Demo.tsx` with the script's own rule and match the spec's table.
Cube vertex i is flat vertex i (0-3 the top face's rim, 4-7 the bottom face), so the flatten animation moves each dot to its own place.

## What is where
- **Slice:** one chip. The readout switches at the press; the corner dot fades out and the triangle grows over 300 ms. Trace `10−15+7=2` appears once the animation is done.
- **Flatten:** one chip. The milestone fires at the press. The top face lifts 22 units and shrinks into the tile (250 ms), then the corners move to the flat drawing (450 ms). The key "faces" becomes "regions" at the end of the stretch. Trace `8−12+5=1` appears after the 700 ms.
- **Shrink:** `Remove an edge` and `Remove the rest`. "Remove the rest" is disabled until one removal is done. Both are disabled while a playback runs.
  - "Remove the rest" commits all 12 removals and reaches the milestones at the press, then presents them every 220 ms.
  - Each removal flashes `--warn` for 120 ms and fades for 200 ms (CSS, 320 ms).
  - Under reduced motion, or once the phase is `reveal`, the presentation jumps to the committed state, so the reveal always sees the dot.
  - The strip has 12 cells: rounded squares where a region went, circles where a corner went. The end line is "+ the top face = 2", and the tile slides beside the dot over 250 ms.
- **Readout:** `role="status"`, `aria-live="polite"`, with the full sentence as screen-reader text and the visual line `aria-hidden`. A number that changed with the last press is `--warn`.
- There is no Reset (spec). Nothing gates "Next: Shrink" on flattening, as in euclid. A learner who skips the flatten sees card 3's flat drawing without having made it. The reveal still needs all 5 milestones.

## Recount from the drawn solid (claims stay unverified)
- **c1:** the drawn cube has 8 dots, 12 lines and 6 faces. The sliced one has 7 + 3 dots, 9 + 3 + 3 lines and 6 + 1 faces, so 10 − 15 + 7 = 2.
- **c2:** the slice removes the CUT corner (vertex 2, front-top-right) and adds 3 corners and 3 edges, plus one triangle face.
- **c3:** the flat drawing has 8 dots, 12 lines and 5 bounded regions, so 8 − 12 + 5 = 1.
- **c4 and c5:** in the order on the stage, 5 removals take a region (presses 1, 2, 4, 6, 9) and 7 take a corner (3, 5, 7, 8, 10, 11, 12). The total is 1 after each, and the last dot is corner 4.
- **c5 source:** it still cites the brief's old order. This is W-2043 (category-curator); the claim text is unchanged.

## Pre-flight v1
1. **Title and hook.** "Flatten the cube to a dot" / "Corners minus edges plus faces is 2 for a cube. Three moves show why it is always 2."
   - The hook says "always 2", which leans towards "still 2".
   - The hook and title are the curator's (brief), so it is not the builder's call. Flagged for the design review and category manager.
2. **Options.** "less than 2" / "still 2" / "more than 2": the same precision, all numbered alike.
3. **Locked stage.** The cube, `8 − 12 + 6 = 2` (also in the question) and an empty change line. Nothing sliced is drawn, and the chip and Next are disabled.
4. **Reveal values.** Every value is milestone-gated on a one-way path:
   - "kept the total at 2": slice.done, trace 1.
   - "got 1": flatten.done, trace 2.
   - "took a region or a corner": shrink.region and shrink.corner, shown in the strip shapes.
   - "single dot: 1": shrink.dot, readout `1 − 0 + 0 = 1`.
   - "back: 2": shrink.dot, end line.
5. **QA path.** There are 9 controls: trail ×3 (disabled), Slice a corner, Next, Take the top off, Next, Remove an edge, Remove the rest.
   - The path reaches all 5 milestones; the probe walk passes at both widths.
   - Each quoted state is on the stage at the reveal (screenshots below).
6. **Reset.** There is none; every chip is one-way.
7. **Phone fit.** `tools/reveal-fit.mjs` at 390×844 (artifacts/reveal-fit/flatten-the-cube-to-a-dot.json): **fit**, stage-top crop **0 px**, hidden below **0 px**, stage 419 px, picture 167 px, 76 reveal words.
   - "namedHidden 1: faces" is the heuristic matching the reveal's formula word "faces" to the readout key on the hidden cards 1 and 2. Card 3's key is "regions". The reveal points at nothing labelled "faces", so phoneFit reads 0 for that reason only.
   - The spec's fix order was not needed.

## Word budget (busiest frame, Shrink at the end)
21 words: trail 3, chips 6, keys 3, change line 2, strip label 4, end line 3 (25 allowed).

## Probe (`node tools/sequence-probe.mjs`, release build, 390×844 and 1280×800)
- **Pass:** walk, overflow, crop, tap (44 px minimum), revealCard and errors, at both sizes.
- **Fail: back, at both sizes.** The probe fingerprints a card about 300 ms after a press.
  - The spec's motion is longer than that: the flatten is 700 ms and "Remove the rest" plays for 2.4 s.
  - So the card's SVG attributes are still moving when the walk leaves.
  - The same probe with `reducedMotion: "reduce"` (a scratch copy, deleted, not evidence) passed back at both sizes: "state kept".
  - Filed as a probe item on the board.
- **Fail: four-cards (390 only).** With a hypothetical 4th step and a trace, the steps wrap to 87 px. This is W-601's call, and the lesson has 3 cards.
- **n/a: warnings** (not a dev server).

## Screenshots
artifacts/flat-shots/ (gitignored; regenerate from a build): states after slice, mid-flatten, flat, shrink press 3 (flash), playback, end and reveal, at phone and desktop.
The `/d/` page renders dark under both colour schemes, so light-theme values (`--warn` #7d5200) were not seen on the stage.

## v2 (2026-10-25, W-2056 + W-2063): one revision round

demo-builder · from the design review (`2026-10-25-design.md` D1, D2, O3) and the v1 learner walk (`2026-10-25-learner-knows-faces-not-euler.md`, folded in as W-2063). Version 1 → 2 (stage text and behaviour changed; also covers fb76d7c13's hook change). Status stays draft.

### What changed
- **D1, skip-flatten dead end.** Until `flat` is true, card 3 shows card 2's starting cube (`FlattenPicture` k = 0), `8 − 12 + 6 = 2` with key "faces", the change line **"Take the top off first"**, an empty strip label and end line, and both removal chips disabled. Next is not gated; no control index moved.
- **D2 + W-2063 (c), singular for 1.** The readout's screen-reader sentence and its visible keys say "1 corner", "1 edge", "1 region" (the walk saw "1 corners / 1 regions" on the stage, so the visible keys change too, against D2's "keys stay plural"; the coordinator's W-2063 instruction). The picture's aria-label uses the same rule.
- **W-2063 (a), card 2.** Once the 700 ms flatten is done, the "Take the top off" chip becomes **"Replay the flatten"** and plays it again from the cube (the same control, so the QA path and every control index stay as in v1; disabled during the motion and under reduced motion, where it reads "Take the top off" as before). The trace stays after a replay. A muted line under the change line: **"The 5 regions are the cube's other 5 faces."** (new claim **c9**, `unverified`).
- **W-2063 (b), card 1.** The change line keeps "+2 corners, +3 edges, +1 face"; a muted line under it says **"1 corner gone, 3 new: +2 corners"** (one line at 390; "1 corner becomes 3: +2 corners, …" in one line wrapped at 390, so I split it). c2's text is unchanged; the new line restates c2 ("removes 1 corner and adds 3"). Fact-checker re-check of c9 and that line is on the board.

### Pre-flight deltas
- Busiest frame still Shrink at the end: 21 words. Card 2 after the flatten: trail 3 + readout keys 3 + change line 5 + note 8 + chip 3 + Next 2 = 24 (25 allowed). Card 3 inert: keys 3, cue 5, chips 6, trail 3 = 17.
- Locked stage and the reveal: unchanged.

### Maker's loop (own build `.next-w2056`, `next start`)
- `v2-maker-probe.mjs` (this folder, output `v2-maker-probe.out`): **22/22 PASS** at 390×844 and 1280×800, normal motion. Paths: skip (Next, Next before any milestone: card 3 inert, reveal locked), skip then back by the trail to flatten and slice (card 3 goes live; reveal unlocks only when all five milestones are in), hurry (Next pressed inside the 700 ms flatten: card 3 live at once), reveal 100 ms into the 2.4 s playback (stage snaps to the dot, end line and trace present), Replay (picture moves at 150 ms, ends identical), card 1 lines, settled back navigation (cards 1-3 identical after returning), and the readout text after every one of 12 hand presses (sr and visible keys: no "1 corners", no "5 corner").
- **Settle rule, learned here (for W-2047):** "two readings ~200 ms apart match" calls the card settled mid-playback, because two reads can fall inside one 220 ms removal step. My probe uses a 500 ms gap (longer than any one motion step here), 6 s ceiling.
- `tools/sequence-probe.mjs` (`v2-sequence-probe.out`): 12 PASS, 3 FAIL, 2 n/a, the same as v1: back ×2 (W-2047, probe samples at 300 ms; my settled check passes), four-cards at 390 (W-601, hypothetical 4th step). An intermediate v2 with a separate Replay chip broke the walk (an extra control shifted the index-based QA path past its starting count); that is why Replay reuses the chip.
- `tools/reveal-fit.mjs` 390×844: **fit**, crop 0, hidden 0, stage 419, picture 167 px, 76 words; namedHidden 1 ("corners | faces": card 3's end keys now read "corner"; the reveal's "corners − edges + faces" sentence matches only the hidden cards). 1280×800: fit, crop 0, but **thumb**: the main picture is fitted at the reveal (165/197, `data-reveal-fit`) so the heuristic falls to the next svg, the 284×20 strip, drawn at 0.68 of the width it could take. The strip and the fitting are unchanged from v1, so this is not new in v2; I read it as the heuristic picking a decorative strip, not a squeezed picture (screenshot desktop reveal in artifacts/sequence-probe/). Flagged for qa-tester, not fixed.
- QA contract (QA_ONLY, against `.next-w2056`): 2/2.
- Walkthrough rebuilt from this build: `artifacts/walkthroughs/flatten-the-cube-to-a-dot/` shows the new hook (fb76d7c13) and v2.
