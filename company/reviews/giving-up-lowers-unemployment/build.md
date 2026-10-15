# Build note: giving-up-lowers-unemployment

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #62

- Intent: a 10 × 10 grid of people inside a "counted" box (filled = working, red ring = looking); people who stop looking slide (CSS transform transition, 0.35 s, off under reduced motion) to a grey "not looking" box outside it. Rate and jobs are big numbers beside the grid (folded into the picture, not a readout row); "start 10%" sits under the rate. Dots are 12 viewBox units (about 13 px on a 390 px phone) with 4-unit gaps, as the brief asks.
- Controls (DOM order): [4 stop looking] [4 find jobs] presets (each from the base 90 / 10), then a slider "Stop looking" (0 to 10, from the base; moving it clears "find jobs").
- Milestones: "gave-up" (4 stop looking: 6.25%, jobs 90 recorded) and "found" (4 find jobs: 6%, jobs 94 recorded); the record row keeps both lines, so the QA path's final slider state (2 stopped looking, 8.16%) does not hide them.
- "Discouraged workers", ILO and BLS kept out of learner text; the chip says the rule as the lesson's own count.

## Pre-flight v1

1. **Title and hook.** "4 people stop looking. What happens?" / "Nobody finds a job, but 4 people stop searching. What does the unemployment rate do?" Questions; no direction.
2. **Options.** "rises" · "stays at 10%" · "falls". Only the middle option has a number, and it is the wrong one (the base value from the question), so the right option is not the precise one.
3. **Locked stage.** Chip with the counting rule, the 10 × 10 grid at the base (90 filled, 10 rings), "counted" box, empty "not looking" box, rate and jobs "?", "start 10%" (the question's own base). No 6.25, no moved dots.
4. **Reveal values.** "from 10%": the base, printed "start 10%" under the rate. "to 6.25% and jobs stayed at 90": (b) milestone gave-up, record line 1. "fell to 6% and jobs rose to 94": (b) milestone found, record line 2.
5. **QA path.** DOM order: 4 stop looking (gave-up), 4 find jobs (found), Stop looking slider two right presses (0 → 2: 8.16%, jobs 90). Both milestones in 2 presses; both record lines on the stage at the reveal. Probe confirmed every press changed the stage.
6. **Reset.** No Reset control; presets rebuild from the base, records persist. Reveal text from the QA path: "When 4 people gave up, the rate fell from 10% to 6.25% and jobs stayed at 90: the 4 left the count, so the top and the bottom both shrank. When 4 found jobs, the rate fell to 6% and jobs rose to 94. / Two almost equal rates, two different stories. A falling rate alone cannot tell you which happened; the number of jobs can. A toy town of 100."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 giving-up-lowers-unemployment` (shared dev server, 2026-10-14): verdict fit, **stage-top crop 0 px**, hiddenBelow 0, namedHidden 0 (named: rate, jobs, 90), phoneFit true, **75 words** (reveal incl. the kit's verdict line); picture fitted 183/198. Smallest svg label at the reveal 10.2 px or more (own probe: computed font-size × letterbox scale). Note on the run: the dev server was too loaded for the tool's fixed 30 s / 15 s waits, so it was run with a preload (`node --import <scratch>/patient.mjs`) that only raises Playwright's navigation and waitFor timeouts; the measuring code was not changed. A first run gave crop 1-4 px; the stage wrapper's flex gap was cut from 3 px to 1 px (no text or tap target changed).

QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J economics slugs> QA_OUT=artifacts/qa-wavej-economics npx playwright test tests/qa/contract.spec.ts --workers=1` (2026-10-14): phone and desktop pass (10 of 10 for the batch). A first batch run failed winning-bid-overpays on phone only, with React's dev-mode warning "Can't perform a React state update on a component that hasn't mounted yet" (the same warning shows in the shared dev server's log for other lessons while files change); reruns passed. Status left draft; next build and walkthrough not run (shared machine).

status draft → review (W-996): launch r10, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
