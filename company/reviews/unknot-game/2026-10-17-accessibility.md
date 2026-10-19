# unknot-game v2: accessibility review (W-1620, launch review r8 precondition)

reviewer: accessibility-reviewer · date: 2026-10-17 · tree: main `2a2f78d0` (Demo.tsx, styles.module.css, `src/app/globals.css`, kit and `src/app/d/` identical to base `e337d74c`: the step-3 diff prints nothing) · status of lesson: draft

## Verdict: pass with conditions. No lock-out failure found.

Keyboard-only completion works. The question r8 ruling 2 asked, "is the tinted strand perceivable without colour?", has two answers: **for a sighted learner, yes** (the tint differs in luminance and width as well as hue); **for a learner who does not see the picture, no**, and the reveal sentence points at it. That second gap is condition U1. It is a gap in the sentence's referent, not a barrier to doing the task, so it does not lapse the go.

## How it was run

As in the tricolour-check record: real Chromium against `next build --webpack` with a private `NEXT_DIST_DIR`, own `next start` on 47311, 390x844, `npm run walkthrough -- unknot-game` first, `tools/a11y-scan.mjs` (lesson-only fail 0, fix 0), own probes (`artifacts/a11y-r8/probe.mjs`, `probe2.mjs`, not committed). Dark, dark with reduced motion, light. Colour-blind runs: protanopia, deuteranopia, tritanopia and greyscale on the tint screenshot and the reveal; I looked at greyscale (dark and light reveal) and protanopia (light, explore) and generated the rest. **No real screen reader was run**; screen-reader findings are from the accessibility tree and markup.

## The tinted strand

- Tint: `.knot-tint` (`src/app/globals.css` 219-222) takes `--domain`: dark rgb(124,156,255) (#7c9cff), light #576db3. Plain strands are `--fg` (dark #eef1f7, light #141824).
- Cues besides hue: luminance and width. Dark: tint 5.95:1 on `--bg-3` vs plain 13.72:1, so tint to plain is 2.30:1. Light: tint 4.30:1 vs plain 15.38:1, tint to plain 3.58:1. Width is 3 units against 2, which is 9.1 px against 6.0 px at the explore scale (3.02 px per unit) and about 7.6 against 5.1 px at the reveal (2.55 px per unit, from the CSS cap of 270 px).
- Greyscale screenshots of the reveal (dark and light) show the tinted strand as a clearly wider, lighter-grey (dark) or mid-grey (light) segment of the lower right strand, distinct from the plain strands. Under protanopia (light) it is a wide blue strand against near-black. So the tint is perceivable without colour for a sighted learner; in dark the luminance step is modest (2.30:1) and the width does part of the work.
- Weak spot: the caption that names the tint ("On top twice: it slides off") is hidden at the reveal (design S4 D1), so at the reveal the strand itself is the only cue.
- Non-visual: the `svg` label is "Trefoil drawing, 3 crossings, crossing 1 switched" and says nothing of a tint. The caption is in the DOM during explore but is `display: none` at the reveal, so it is also out of the accessibility tree there. At the reveal a screen-reader learner reads "the tinted strand lay on top at two crossings in a row" with nothing to tell them which strand, or which crossings.

## What works (checked)

1. **Keyboard path.** Tab reaches Crossing 1 to 3 (44x44, `aria-pressed`, names "Crossing N: switch"), Reset, the chip buttons and Show me why; Enter switches. All three crossings switched by keyboard unlocks "Show me why"; the reveal opens by keyboard. Disabled controls are skipped.
2. **Status.** A `role=status` live region says "Plain loop" or "Still a knot" after each switch.
3. **Focus ring, dark:** 2 px `--accent`, offset 2 px, 5.95:1 on `--bg-3`.
4. **Contrast, measured.** `--fg` 13.72 (dark) and 15.38 (light) on `--bg-3`. Tally marks carry state in shape (tick against open circle) and in the "N of M" text.
5. **Reduced motion.** The only transition (`.strand` stroke and width, 150 ms) is switched off under `prefers-reduced-motion: reduce` by the lesson's own rule and by the global rule; no animation was running in any context.
6. **Hit rings.** The 44 px crossing buttons have a 1 px `--line` border; the switched one gets a 2 px `--fg` border and `aria-pressed`. The border is a low-contrast decoration, not the only cue (the strand itself redraws).

## Conditions (route; none is a lock-out)

- **U1 (lesson, fix): give the tint a non-visual referent.** Put a short text equivalent where a screen reader reads it at the reveal and after a switch, for example in the `svg` `aria-label` or a visually-hidden line that is not `display: none` at the reveal, naming the strand ("the strand between crossings X and Y is on top at both"). Wording is for demo-builder with cm-math-discrete (any new text is a claim to record in `meta.json`). Owner: demo-builder.
- **U2 (lesson, fix; inferred from markup, not probed here): Reset and the chip buttons disable themselves when pressed.** `disabled={locked || sw === null}` on Reset and `disabled={locked || chip === id}` on the chips mean focus drops to `<body>` when you press them, as I observed on the two sibling lessons. Owner: demo-builder.
- **U3 (kit, fix): focus drops to `<body>` at Lock it in and at the reveal (W-1618), confirmed.** After "Show me why" unmounts, `activeElement` is `BODY`; the reveal has no role, live region or tabindex, so it is not announced. QA v2 found the same (W-1618). Owner: platform-engineer, kit amendment.
- **U4 (kit, fix): chip and Reset buttons are 35 px tall** (Reset 64x35, Trefoil 69x35, Figure-eight 110x35): above the 24 px floor, below 44. Owner: platform-engineer (`src/kit/controls.tsx` is protected).
- **U5 (app/global, fix): the light-theme focus ring is 2.26:1 on `--bg-3`** because `--accent` has no light override (`src/app/globals.css` line 8). All lessons. Owner: design-lead / platform-engineer.
- **U6 (app, fix): "Why trust this?" 220x23 px and the Map link 30x17 px** are under the 24 px floor (scan `fail`, app origin). Owner: platform-engineer.

## Not checked

A real screen reader; text zoom and 400% reflow; forced-colors mode; viewports other than 390x844; the figure-eight chip (I drove the trefoil path only).
