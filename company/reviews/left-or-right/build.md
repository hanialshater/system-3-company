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

## v2 fix round (2026-10-17): S4 D1-D2, W-1606, W-1608

Builder: demo-builder (run lor-v2-fix). Inputs: `company/design/reviews/2026-10-17-left-or-right-s4.md` (D1, D2), QA record `2026-10-16-qa.md` (findings 1, 2 = W-1606), fact-check `2026-10-17-fact-check.md` (c5 = W-1608). `meta.version` 1 → 2 (layout, stage controls at the reveal and the unlock path changed what a learner sees). Status stays draft.

### Changes
- **D1** (`styles.module.css`): `.room` padding 0; `.picArea` min-height 190px; `.pic` width `max(190px, min(100cqw, 320px, 100cqh))`; the now-empty `.atReveal .room` rule removed. Floor, `perspective: 1200px` and every `overflow: visible` kept.
- **D2** (`Demo.tsx`): the Turn over · Mirror row is **not rendered** at the reveal (`ctx.phase !== "reveal"`); the chip row stays. **Departure from D2's letter:** D2 named a CSS rule (`display: none`). With that rule applied, `reveal-fit --strict` at 390×844 failed phoneFit with `namedHidden 1, off screen: mirror`: its named-label heuristic matched the hidden Mirror button's text to the reveal's word "mirror" (from "mirror image"). The learner sees the same thing either way (display:none also removes the button from the accessibility tree), and unmounting is the precedent D2 itself cites (tricolour-check, enemy-of-my-enemy W-574). So I unmounted the row; strict then passes. Design lead: say if you want the CSS form back; the measure would then need a ruling on the heuristic.
- **W-1606 (2)** (`Demo.tsx` `settle()`): milestone `turned` now fires on any trefoil rest state with the card turned over (plain turned or mirrored-and-turned). The seen line's "turned over" segment is still written only from the plain turned state, so it never quotes a −3 the learner did not see. `keyState` in meta.json updated to say so.
- **W-1608** (`meta.json`): c5's rule sentence now reads "a crossing mark is plus (right-handed) when the over-strand passes from left to right as seen travelling along the under-strand"; source re-pointed to PMC2853108 / PMC5582600 (the kit README's reversed sentence is named as off-lane). c1 source → PMC5582600 + PMC9948535 (+ Dehn 1914); c6 source → PMC5582600 (+ PMC8199745). **c1, c5, c6 reset to unverified** (checkedBy/checkedOn removed, a note records the earlier status). No learner-visible word changed. c2, c3, c4, c7, c8 untouched (still verified).

### Measurements (build `.next-lor2`, Chromium, served on 3631)
- `node tools/reveal-fit.mjs --strict` (records beside this note):
  - 390×844: **fit, crop 0, namedHidden 0, phoneFit true**, 79 words, picture 240 px (`reveal-fit-2026-10-17-v2-390x844.json`).
  - 360×740: fit, **crop 96**, namedHidden 0, phoneFit false, 79 words (`reveal-fit-2026-10-17-v2-360x740.json`). Exactly what S4 predicted after D2 (was 140); S4 accepted short phones.
- Design lead's `fit-probe.mjs`, no override, 3 options: explore 390×844 **picture 320 px** (2.76 px/unit), overflow 0, second row hidden 0; 360×740 217 px, overflow 0; 360×640 190 px, overflow 63, last row 50 px below. Reveal 390×844: QA path and stay-on-trefoil crop 0, 56 px spare; **mirrored figure-eight branch crop 0, 35 px spare**, 81-84 words; 360×740 crop 96 on all endings; 360×640 crop 196. Every number equals the S4 record's D1/D2 table.
- `c1-check.mjs` (ENGINE=chromium, BASE=…:3631): **0 failures, 61 checks** on the 320 px card. Crossing 0 screen x: 3₁ turned 71.7 = 320.0 − 248.3; 4₁ turned 32.0 = 320.0 − 288.0; face colour counts, dip, flip, paused-frame clipping and fallbacks all pass (Turn over fallback back at 510 ms against 500, Mirror 409 against 400: one frame, as in v1). Record: `c1-chromium-2026-10-17-v2.json`.
- `node --test src/demos/math/left-or-right/card.test.mjs`: 5/5 (geometry is in view-box units, unchanged by the card size).
- `v2-w1606-probe.mjs` (log `v2-w1606-probe.log`):
  - **W-1606 (1), readout and Turn over/Mirror on screen together:** 390×844 yes (span 434 px in a 504 px window); 360×740 yes (309 in 379). **360×640 still no, by 3 px**: readout top to control bottom is 282 px, the stage window 279 px. Fresh: readout on, controls 13 px below. After the tap scrolls the stage 13 px: controls on, readout top at 171 against the window top 174. D1 cut the shortfall from 43 px (QA) to 3 px but did not remove it. Not changed here (the design lead accepted this size); a 4 px cut of the row's `margin-top` would close it, a layout call for the design lead.
  - **W-1606 (2):** Mirror then Turn over → "Show me why", enabled, seen "Trefoil: mirror +3", readout "Sum +3 Right-handed". Contract order → enabled, seen "Trefoil: turned over −3 · mirror +3". Turn over alone or Mirror alone → still "Try it first" (two milestones needed).
- QA contract (`QA_BASE_URL=http://localhost:3631 QA_ONLY=left-or-right npx playwright test tests/qa/contract.spec.ts`): **2/2** (phone, desktop). Screenshots viewed: explore 390×844 (320 px card, both rows) and the mirrored-figure-eight reveal at 390×844 (stage top, chip row and last reveal line all on screen).
- `npm run check` passed; `npx tsc --noEmit` exit 0; `npm run build` exit 0 (tsconfig.json rewrite by `next build` reverted).

### Open (for other roles)
- **cm-math-discrete:** on the new Mirror-then-Turn-over path the learner unlocks the reveal having seen the trefoil turned over only while mirrored (+3 stays +3), never the plain turned −3. Reveal paragraph 1 still opens "Turning the trefoil over left every mark minus", which is true of the table trefoil but not what that learner saw, and the seen line then shows only "mirror +3". The words are yours: keep, or add a branch such as "Turning it over kept every mark" when the plain turned state was never reached. Builder can wire a flag if asked.
- **fact-checker:** re-verify c5 (new rule sentence), c1 and c6 (new source fields).
- **design-lead:** the D2 departure above (unmount instead of display:none), and the 3 px at 360×640.
- **qa-tester:** a record on v2; WebKit `c1-check.mjs` still open.

## v3 round (2026-10-17): W-1619 reveal opener branch, design-lead D3

Builder: demo-builder (run w1619-lor-v3). Inputs: cm-math-discrete ruling `company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md`, design-lead ruling `company/design/reviews/2026-10-17-left-or-right-v2-departures.md` (D3). Status stays draft.

**Version 2 → 3.** The ruling says the change joins v2 if v2 has not shipped. `company/product/demo-standard.md` "The lesson version" says a change to reveal text bumps the version in the same commit, and records already name v2 (fact-check `2026-10-17-fact-check-v2.md`, verifying c1/c5/c6 against v2's reveal); D3 also changes the explore picture at 360×740 (217 → 221 px). Not shipping is not one of the standard's exceptions, so I bumped. This is not a bump to settle which record applies: the reveal a v2 record read is no longer the only reveal.

### Changes
- **W-1619** (`Demo.tsx`): `Reveal` now takes `seen`. When `seen.turned === undefined` (the seen line has no "turned over" segment, i.e. `turned` fired only from mirrored-and-turned), paragraph 1 sentence 1 is "Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right." Otherwise the standard sentence, unchanged. Everything after it unchanged on both paths.
- **D3** (`styles.module.css`): `.wrapAll > .picArea + :global(.row) { margin-top: 0; }`. The chip row keeps its 4 px.
- **Claims** (`meta.json`): c3 adds the quote 'Turning the mirrored trefoil over left every mark plus'; c6 adds the whole branch sentence to its quote list. **c3 and c6 reset to unverified** (checkedBy/checkedOn removed; the note names the ruling and keeps the previous note). c1, c2, c4, c5, c7, c8 untouched and still verified. **Departure from the ruling's item 1:** it asked to add 'its hand stayed right' to c5's quote; c5 was verified on v2 after the ruling was written, and my dispatch says c5 stays verified, so I left c5's text alone rather than edit a verified claim. The new 'its hand stayed right' is quoted in c6 (whole sentence) and rests on c5's convention (above 0 = right-handed, stage 'Right-handed'). Fact-checker / cm-math-discrete: say if c5's quote list must carry it (that would reset c5).
- **Probe** (`v3-opener-probe.mjs`, new): the ruling's three paths, opener text and the reveal's phone fit, using `tools/reveal-fit.mjs`'s own `measure()` read from the committed file (reveal-fit itself only drives the QA contract path, which is Turn over then Mirror). Exit 1 on a wrong opener.

### Measurements (build `.next-lor3`, Chromium, served on 3657)
- `v3-opener-probe.mjs` (predict option 2 "No, never", so no "Not quite" line):
  - 390×844: Mirror→Turn over **branch**, seen "Trefoil: mirror +3", fit, **crop 0, hiddenBelow 0, namedHidden 0, phoneFit true**, 77 words, 10 lines. Turn over→Mirror **standard**, fit, crop 0, phoneFit true, 76 words, 9 lines. Mirror, Turn over, Mirror, Turn over **standard**, seen "Trefoil: turned over −3 · mirror +3", crop 0, phoneFit true, 76 words, 9 lines. The branch adds one line (as the ruling expected) and still fits.
  - 360×740: all three paths fit, **crop 96**, hiddenBelow 0 (branch 11 lines, standard 11 lines). Same crop as v2's accepted figure; the branch is no worse.
- `node tools/reveal-fit.mjs --strict` (QA path, standard opener; tool clean, commit bc747077):
  - 390×844: **fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 79 words** (with "Not quite"), 9 lines, picture 240 px; exit 0 (`reveal-fit-2026-10-17-v3-390x844.json`).
  - 360×740: fit, crop 96, phoneFit false, exit 1 (`reveal-fit-2026-10-17-v3-360x740.json`); unchanged from v2, accepted in S4.
- `v2-w1606-probe.mjs` re-run (log `v3-w1606-probe.log`): 360×640 **need 278, window 279; after the controls scroll (9 px) readout top 175 vs window 174, together true** (fresh, before scrolling, controls are 9 px below: together false, as the lead's table shows for the unscrolled view). 390×844 and 360×740 together true as before. Unlock paths unchanged.
- Design lead's `together-probe.mjs`, no override, light and dark (`v3-together-probe-light.log`, `-dark.log`): every option at every size together true (0 false); 360×640 need 278 / window 279, scroll 9, readout whole; 360×740 picture **221 px**; row gap 6 px; strand-to-row 35 / 41 / 61-71 px; reveal toggle buttons in DOM 0 on both endings. Every number equals the D3 row of the ruling.
- QA contract (`QA_BASE_URL=http://localhost:3657 QA_ONLY=left-or-right npx playwright test tests/qa/contract.spec.ts`): **2/2** (phone, desktop).
- `npm run check` passed (3 warnings, other lessons); `npx tsc --noEmit` exit 0; `npm run build` exit 0 (tsconfig.json rewrite reverted). Screenshot viewed: branch reveal at 390×844, the mirrored trefoil (+,+,+, Right-handed, seen "Trefoil: mirror +3") above the branch opener, last line on screen.

### Open (for other roles)
- **fact-checker:** re-verify c3 and c6 (new quoted branch sentence; signs mirrored-then-turned +,+,+ already derived), and say whether c5 needs the 'its hand stayed right' quote.
- **qa-tester:** a record on v3 (v2 had none; the 2026-10-16 record is v1).
- **learner walk:** owed on v3.

## 2026-10-17 W-1651 (meta.json only): c5 adds the quote 'its hand stayed right' and resets to unverified per company/reviews/left-or-right/2026-10-17-fact-check-v3.md; no learner-visible change, so no version bump (stays v3); optional c3 seen-line quote not added. Open: a fact-checker other than the v3 run re-verifies c5.
