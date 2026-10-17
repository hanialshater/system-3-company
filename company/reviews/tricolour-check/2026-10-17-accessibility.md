# tricolour-check v2: accessibility review (W-1620, launch review r8 precondition)

reviewer: accessibility-reviewer · date: 2026-10-17 · tree: main `2a2f78d0` (Demo.tsx, styles.module.css, kit and `src/app/d/` identical to base `a10dedf1`: the step-3 diff prints nothing) · status of lesson: draft

## Verdict: pass with conditions. No lock-out failure found.

A keyboard-only learner can complete predict, explore (all three milestones: trefoil3, loopOne, eightAll) and reveal. Meaning is not carried by colour alone. The conditions are fixes to route, none of which locks a learner out, so the r8 go does not lapse on this record (launch-review r8 ruling 2).

## How it was run

Real Chromium (Playwright 1.56) against `next build --webpack` with a private `NEXT_DIST_DIR`, my own `next start` on port 47311, 390x844, touch on. `npm run walkthrough -- tricolour-check` first (`artifacts/walkthroughs/tricolour-check/transcript.md`, not committed), then `tools/a11y-scan.mjs` (lesson-only fail 0, fix 0, one `manual` colour-alone flag, judged below) and my own probes (`artifacts/a11y-r8/probe.mjs`, `probe2.mjs`, not committed). Three contexts: dark, dark with `prefers-reduced-motion: reduce`, light. Colour-blind runs: CSS `feColorMatrix` filters (Machado 2009, severity 1.0: protanopia, deuteranopia, tritanopia) and greyscale, applied to screenshots of the trefoil, 4₁ with failing crossings, and the reveal; I looked at the greyscale (light trefoil) and deuteranopia (dark 4₁ with failing crossings) images, and generated the rest. **Not done: no real screen reader (NVDA, VoiceOver, TalkBack) was run.** Screen-reader findings are from the Chromium accessibility tree (`ariaSnapshot`) and the markup.

## Findings

### What works (checked)

1. **Keyboard path.** Predict options (`aria-pressed`) and Lock it in are reached by Tab; stage controls are disabled while locked and skipped. In explore, Tab reaches Arc 1 to 3 (44x44), the chips, Check all, Reset and Show me why. Enter on each works; the full path to the reveal was driven by keyboard only.
2. **Names.** Arc buttons: "Arc 1, colour A" (name updates after a tap, and a polite live region says "Arc 1 is now colour B. Crossings OK: 0 of 3."). Chips: "Plain loop", "Trefoil, 3₁", "Figure-eight, 4₁" with `aria-pressed`. The stage `svg` is `role=img` with a state label ("Trefoil, 3 arcs coloured B, C, A; 3 of 3 crossings obey the rule"). Check all announces the census through the same live region.
3. **W-1613 (unlabelled 0x0 disabled controls): not an accessibility finding.** The fourth arc slot is `hidden` and `display: none` while 3₁ or ○ is shown. It is absent from the accessibility tree (`ariaSnapshot` lists three arc buttons only) and is not focusable. It reads as 0x0 and unnamed only to a script that counts `data-qa="control"` nodes. Recommend W-1613 is closed on the accessibility side; QA's contract may still want it.
4. **W-1583 letter rings.** Each arc carries a ring with the letter A, B or C, in `--fg` on `--bg-3`. Under greyscale and deuteranopia the arcs stay identifiable by letter. In light theme the three arc colours are near-identical in luminance (A to B 1.08:1, A to C 1.03:1, B to C 1.11:1), so the letter is the only cue there; it is there and legible (6.4 units, about 17 px). Not a failure; do not remove the letters.
5. **Pass and fail marks do not rely on hue.** A failing crossing has a dashed ring plus a cross; an obeying one a solid ring plus a tick. Distinct in greyscale and deuteranopia. The scan's `manual` colour-alone flag (8 elements) is answered by this. Counter text ("Crossings OK: 1 of 4") repeats it.
6. **Contrast, measured from computed colours.** Dark, against `--bg-3` #1f2430: arcs 6.72, 4.01, 11.74; good 8.13; bad 6.15; muted 6.12; fg 13.72. Light, against #eceff6: arcs 4.50, 4.16, 4.63; good 5.31; bad 5.53; muted 5.07; fg 15.38. All clear 3:1 for graphics and 4.5:1 for text. Stage text is 4.6 units (12.7 px at the 320 px stage, 10 px floor).
7. **Reduced motion.** No animation or transition ran at any point in any of the three contexts (`document.getAnimations()` empty); the global `prefers-reduced-motion` rule also applies. Nothing is autonomous.
8. **Visible focus (dark).** `.hit:focus-visible` is a 3 px ring, `--accent` #7c9cff, 5.95:1 on `--bg-3`.

### Conditions (route; none is a lock-out)

- **T1 (lesson, fix): three controls disable themselves when pressed, so focus drops to `<body>`.** Pressing a chip (the current chip is `disabled`), Check all (`disabled` once the census exists) or Reset (`disabled` when nothing is dirty) leaves `document.activeElement` as `BODY` (observed after chip ○, 3₁, 4₁, Check all and Reset in all three contexts). The next Tab starts at the "S3" link, so a keyboard user re-tabs about five stops to get back. Same class as Books B1 (`company/reviews/books-100/2026-10-16-pr5-accessibility.md`). Fix is `aria-disabled` or moving focus to the control that replaces it. Owner: demo-builder.
- **T2 (kit, fix): focus drops to `<body>` at Lock it in and at the reveal (W-1618), confirmed in all three contexts.** After "Show me why" unmounts, `activeElement` is `BODY`, `scrollY` is 0, and the reveal (`[data-testid=reveal]`) has no role, live region or tabindex, so a screen-reader user is not told it opened. On a 390x844 screen the reveal is visible without scrolling, so a sighted keyboard user is not stranded; a screen-reader user may not find it. The scan reports both as kit-origin `fix`. This is the kit amendment idea already in the open threads (`company/rituals/records/2026-10-14-eng-review-W-135.md`). Owner: platform-engineer, kit amendment (`src/kit/Lesson.tsx` is protected).
- **T3 (app/global, fix): the light-theme focus ring is weak.** `--accent` (#7c9cff) has no light-theme override (`src/app/globals.css` line 8; the light block at line 22 does not redefine it). Against `--bg-3` #eceff6 the ring is 2.26:1, below the 3:1 floor for a focus indicator (WCAG 1.4.11 / 2.4.11), and on a blue arc's letter ring it is 1.99:1 and hard to see (looked at the light focus screenshot). Applies to every lesson, not just this one. Owner: design-lead / platform-engineer (global).
- **T4 (app, fix): "Why trust this?" is 221x23 px and the Map link 30x17 px**, under the 24 px floor (scan `fail`, app origin). Not lesson code; not a lock-out. Owner: platform-engineer.

## Not checked

Screen-reader announcements in a real screen reader; text zoom and 400% reflow; forced-colors mode; any device but 390x844 (QA owns overflow at 360).
