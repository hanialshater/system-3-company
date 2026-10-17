# Build note: left-or-right (B2, the two-sided card)

Builder: demo-builder (demo-builder-w1542), 2026-10-16. Board W-1542. Status **draft**; all 8 claims **unverified**; `evidence.qa` empty (a qa-tester adds the record on this branch before merge).
Inputs: spec `company/design/specs/left-or-right.md` (+ `.svg`), L-1 to L-6 and W-1581 folded in; brief `company/domains/briefs/math.discrete.md` Knots batch 1 #4 (K4, K17, K19, K21 rerun: `node company/domains/briefs/checks/knots-check.mjs`); PE ruling `company/engineering/reviews/2026-10-16-knots-left-or-right-card.md` C1 to C4; design-lead records `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` and `2026-10-16-knots-specs-review.md`.

Kept from evaluators until they report.

## What was built
- Files: `src/demos/math/left-or-right/{Demo.tsx, card.ts, card.test.mjs, styles.module.css, meta.json}`. `card.ts` is pure geometry (no kit import): rest states, readout diagram, `geoSigns`, badge placement. Demo.tsx and the unit test both run it on the kit's drawings.
- Stage, top to bottom: readout "Sum −3 · Left-handed" (`role=status`, `aria-live=polite`; the name column is always reserved); seen line (only grows, never cleared); the card plus the marks overlay; Turn over · Mirror; Trefoil · Figure-eight (current chip `active`, disabled, `aria-pressed`). **No Reset** (W-1581 ruling 3).
- DOM tree: picture area (size container) > `role=img` picture (per-state `aria-label`) > room (8 % padding, L-5) > box > **mirror wrapper** (`scaleX(-1)` from script, `transition-property: opacity` only, 100 ms, **`perspective: 1200px`**) > **card** (`preserve-3d`, `rotateY` 0/180, 300 ms ease-in-out) > front face `draw(pd)` and back face (`rotateY(180deg)`) whose content is `<g transform="translate(100 0) scale(-1 1)">draw(mirror(pd))</g>` (**PE-C1**). The marks overlay is a sibling of the wrapper and is never transformed.
- **Departure from the spec tree, for the design lead:** the spec draws a separate perspective holder above the mirror wrapper. `perspective` only reaches the card's own parent through a flat (non-preserve-3d) wrapper, and making the wrapper preserve-3d would flatten whenever its opacity dips. So the perspective sits on the wrapper itself, which is "the card's parent" as L-5's words say. The browser check below confirms the composition.
- Kit rules: imports only from `@/kit/knots`; `layout(knot(n).pd)` once per chip in a `useMemo`, shared by both faces; `draw(..., { layout: L, gap: 0.5 })`; never size, margin or relax; `turnOver` only inside `signs(logicalPd(...))` for the readout. Stroke 2, butt caps, `var(--fg)`. All controls are at least 44 px.
- `-webkit-backface-visibility`: the build's CSS minifier **drops the prefix** from the module CSS (checked in `.next-*/static/chunks/*.css`), so it is also set inline on both face SVGs, where it survives.
- Motion: Turn over sets `rotateY`, and a second press reverses it from the current angle. Mirror runs the L-2 dip: opacity 1 → 0 over 100 ms, then the transform is swapped at 0 (on `transitionend`, timer fallback 150 ms), then 0 → 1 over 100 ms (rest on `transitionend`, timer fallback 100 ms, so 250 ms from the press with no events). The marks hide at the press (100 ms) and fade in at rest (150 ms); flip fallback 350 ms. The readout and the marks update only at rest; presses retarget and controls are never disabled mid-transition. A chip change remounts the wrapper (keyed by chip), so it does not animate.
- Reduced motion: instant end state (the reflected back face), a 1 s "Turned over" label, marks back at once.
- Milestones `turned` (3₁ at rest, turned, unmirrored) and `mirrored` (3₁ at rest, mirrored on either face); `minInteractions = 2`. `eightMirror` (4₁ at rest, mirrored) is recorded for the reveal branch and is not a milestone. Seen line: "Trefoil: turned over −3 · mirror +3" (always in that order).

## Builder obligations
1. **C1 rendered-page check** (`company/reviews/left-or-right/c1-check.mjs`; record `c1-chromium-2026-10-16.json`). On all 4 rest states of both knots it reads the screen x of a probe circle at crossing 0 inside each face (`getBoundingClientRect`, so the browser composes every transform). It also strokes the front face red and the back face blue (test-only CSS) and counts the picture's pixels to prove which face paints.
   - **Chromium (Playwright 1.56, chromium 141), 390×844: 0 failures.** 3₁: front 82.00 (front face only), turned 18.00 (back only), mirrored+turned 82.00 (back only), mirrored 18.00 (front only). 4₁: 96.40 / 3.60 / 96.40 / 3.60, with the same faces. In px: turned x 66.1 = width 294.8 − front 228.7 (3₁); 29.5 = 294.8 − 265.3 (4₁).
   - **WebKit: NOT RUN.** `playwright install webkit` is refused by the egress proxy (403, hosts `cdn.playwright.dev` and `playwright.download.prss.microsoft.com` not allowed). No WebKit or webkit2gtk is on the host. Firefox is not installed either. The script takes `ENGINE=webkit` unchanged. **This is open (board item for qa-tester).** The `-webkit-` prefix is inline (above), but nothing here proves Safari composes it.
2. **K21 signs test** (`node --test src/demos/math/left-or-right/card.test.mjs`, 5/5 pass). Signs are read from each rest state's drawn lines on screen and equal the readout on all 8 states. Readouts equal the K19/K21 table. There is a negative control: an unreflected back face reads as the mirror. Crossing-0 numbers are 82.0/18.0 and 96.4/3.6.
3. **L-1 badge test** (same file): ring 13, 28 badges, every badge edge to strand edge ≥ 2.0. The minimum is **2.43 units at 4₁ crossing 0** (turned / mirrored+turned), matching the spec and the design lead's `badge-probe.mjs 13`. Every badge is more than 30 units from any other crossing.
4. **Motion** (c1-check, Chromium):
   - Dip, frame by frame: 1 transform change, made at opacity 0.000; wrapper `transition-property: opacity`; readout never blank (44 frames), on both knots.
   - Flip, real time: marks hidden 111 ms after the press and on all 11 frames between 45° and 179.5°; card at rest at 311 ms, marks back from 362 ms; readout unchanged on every frame.
   - **Timer fallback with every `transitionend` blocked:** Turn over marks fully back at 512 ms (limit 300+50+150 = 500); Mirror 411 ms (limit 400). Both are within one animation frame of the limit: the opacity of the first frame after the 150 ms fade ends is what gets sampled. An earlier build had Mirror's second fallback at 150 ms (458 ms total); it is now 100 ms.
   - Paused frames (Playwright clock plus Web Animations API) at 10°, 42°, 65°, 90°, 115°, 138° and 170°: the turning faces' boxes stay inside the kit's `.stage` on both knots (L-5).
   - Mid-flip frames for the design lead (S4): `artifacts/c1-w1542/chromium-{3_1,4_1}-flip-{050..250}ms.png`, regenerated by the script. I looked at the 4₁ 100 ms and 125 ms frames and the 3₁ 200 ms frame: squeezed faces, marks hidden, readout kept.

## Phone fit and sizes (S4 departures for the design lead)
- reveal-fit `--strict` (`reveal-fit-2026-10-16.json`): **fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 79 words** (body plus the kit's "Not quite" line), 9 lines.
- To get there, at the reveal only: the picture is 240 px; L-5's 8 % room is dropped; row and stack gaps are 0. No text or tap target was made smaller.
  - Why dropping the room is safe at the reveal: the kit's stage is `overflow: visible` there, and the strands reach at most 43 of the card's 58 half-height units, so the 15 % mid-flip growth (49.5) stays inside the card box.
  - The first fit run had a crop of 60 px, with the readout and seen line under the card header. The next had 10 px.
- Explore: the picture fills the stage height left over (size container): **277 px at 390×844** (spec: 320; 320 does not fit the height with two control rows and the 8 % room), 295 px with a short explore hint, 257 at 1280×800. At 360×740 it is 220→201 px (min 190); at 375×667 it is 190 px and the stage scrolls about 100 px. Predict at 390×844: about 203 px, everything visible.
- Stage words (text-node probe, busiest frame): 11, plus "Turned over" under reduced motion = 13 (≤ 25).

## Pre-flight v1
1. **Title and hook.** "Can a knot match its mirror?" / "Hold a rope trefoil up to a mirror. Can you ever make the rope match its reflection?" Both are questions; neither says never, chiral or turned over.
2. **Options.** "Yes, wiggle it" / "No, never" / "Only by picking it up and turning it over" (the brief's). None are numbered. The longest is the misconception distractor, not the answer.
3. **Locked stage.** 3₁ front, badges −,−,−, "Sum −3 Left-handed", seen line empty, toggles and the other chip greyed, Trefoil shown selected. Nothing names the answer; "Left-handed" is in the question too.
4. **Reveal values.** "every mark minus": milestone `turned` (seen line "turned over −3"). "every mark plus": milestone `mirrored` (seen line "mirror +3"). Figure-eight sentence: default text unless `eightMirror` fired (recorded state). Nothing is hard-coded off-path.
5. **QA path.** Turn over → `turned`; Mirror → `mirrored` (on the turned card); Trefoil skipped (disabled); Figure-eight → 4₁ front, Sum 0. Both milestones are reached, and the seen line keeps both at the reveal.
6. **Reset.** Not applicable: no Reset (W-1581 ruling 3; the specs review says crit records this as not applicable, not a miss). Reveal text from the reveal-fit run: "Not quite: it was “No, never”. Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left. Mirroring turned every mark plus, and no wiggling gets back: the trefoil is not its own mirror image, as Max Dehn proved in 1914. The figure-eight is different: it is its own mirror image. So a trefoil comes in a left and a right version, and turning one over never swaps them."
7. **Phone fit.** 79 words, crop 0 (above).

## Local QA (builder's pass, not the qa-tester's record)
- `NEXT_DIST_DIR=.next-w1542 QA_PORT=3543 QA_OUT=artifacts/qa-w1542 QA_ONLY=left-or-right npx playwright test tests/qa/contract.spec.ts`: **phone and desktop passed (2/2)**.
- Screenshots viewed: phone predict/explore/reveal, desktop explore, the fit-probe set at 390×844 (predict, turned, mirrored+turned, reveal), a reduced-motion turned frame, and the mid-flip frames above.
- `npm run check` passed; `npx tsc --noEmit` exit 0; `npm run build` exit 0.

## Claims (all unverified)
c1 trefoil chiral, Dehn 1914; c2 figure-eight amphichiral; c3 trefoil marks per state and seen-line numbers (K4, K21); c4 figure-eight marks; c5 handedness convention ("Left-handed" = negative sum, library convention); c6 turning over is a motion; c7 the card's turned picture is turned over, not mirrored (PE §1, K17, K21, card.test, c1-check); c8 stage labels. `owner.categoryManager` is `cm-math` (company check requires the domain manager; the brief's owner is cm-math-discrete).

## Open
- WebKit run of `c1-check.mjs` (blocked here by the proxy): qa-tester, or anyone with WebKit.
- Design lead S4: built sheet, mid-flip on 4₁, the 277 px explore picture (spec 320), the perspective on the wrapper, and the reveal without room.
- Fact-check c1 to c8.
