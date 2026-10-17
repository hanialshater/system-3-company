# draw-a-table-knot v3: accessibility review (W-1620, launch review r8 precondition)

reviewer: accessibility-reviewer · date: 2026-10-17 · tree: main `2a2f78d0` (Demo.tsx, styles.module.css, kit and `src/app/d/` identical to base `b14e8715`: the step-3 diff prints nothing) · status of lesson: draft

## Verdict: pass with conditions. No lock-out failure found.

The lesson carries no meaning in colour: the outcome is a count and a name in text ("Crossings drawn: 6 · Name: 4₁"), in a polite live region. Keyboard completion works. The conditions below are fixes, none a lock-out.

## How it was run

As in the other two r8 records: real Chromium against `next build --webpack` with a private `NEXT_DIST_DIR`, own `next start` on 47311, 390x844, `npm run walkthrough -- draw-a-table-knot` first, `tools/a11y-scan.mjs` (lesson-only fail 0, fix 0), own probes (`artifacts/a11y-r8/`, not committed). Dark, dark with reduced motion, light. Colour-blind runs: protanopia, deuteranopia, tritanopia, greyscale on the ring screenshot and the reveal; I looked at the tritanopia dark ring image and generated the rest. **No real screen reader was run**; screen-reader findings are from the accessibility tree and markup.

## What works (checked)

1. **Keyboard path.** Tab reaches Crossing 1 to 6 (44x44, `aria-pressed`), the chips and Reset; Enter switches; "Show me why" unlocks after one switch and opens by keyboard. Names: "Crossing 1" becomes "Crossing 1, switched" when pressed.
2. **Result is text and live.** `p[aria-live=polite]` reads "Crossings drawn: 6 · Name: 4₁" (plus ", plain loop" for 0₁) after each switch; the `svg` label repeats it ("Knot drawing with 6 crossings, name 4₁"); the "Seen on …" line keeps the quoted state after the reveal opens.
3. **Switched crossing marker.** A ring in `--domain` (dark 5.95:1, light 3.42:1 on `--bg-3`) around the switched crossing. It is one cue of three: the drawing itself changes, the name changes, and the button is `aria-pressed`. It is a shape against `--fg` strands, visible in the tritanopia image I looked at.
4. **Contrast.** Strands `--fg` 13.72 (dark) and 15.38 (light) on `--bg-3`; the "Seen" line colour is `--domain` in dark and a 45% darkened mix in light (7.96:1 per the stylesheet comment; not re-measured).
5. **Reduced motion.** No animation or transition exists in this lesson; none ran in any context.
6. **Focus ring (dark):** 3 px `--accent`, 5.95:1.

## Conditions (route; none is a lock-out)

- **D1 (lesson, fix): chip names are bare subscript glyphs.** The chips are named "5₂" and "6₁" (Unicode subscripts, which some screen readers read as "5 2" or "5 subscript 2"), carry no `aria-pressed` (the current chip is only `disabled`), and are 41x35 and 40x35 px. Tricolour-check's chips (aria-label "Trefoil, 3₁", `aria-pressed`) are the pattern to copy. The name in the live region has the same subscript issue. Owner: demo-builder.
- **D2 (lesson, fix): pressing a chip or Reset drops focus to `<body>`** (observed for both: the pressed control disables itself). The next Tab starts at the "S3" link. Same class as Books B1. Owner: demo-builder.
- **D3 (kit, fix): focus drops to `<body>` at Lock it in and at the reveal (W-1618), confirmed.** The reveal has no role, live region or tabindex and is not announced; it is visible without scrolling at 390x844. Owner: platform-engineer, kit amendment.
- **D4 (kit, fix): chips and Reset are 35 px tall** (above the 24 px floor, below 44). Owner: platform-engineer.
- **D5 (app/global, fix): light-theme focus ring 2.26:1 on `--bg-3`** because `--accent` has no light override (`src/app/globals.css` line 8). All lessons. Owner: design-lead / platform-engineer.
- **D6 (app, fix): "Why trust this?" 221x23 px and the Map link 30x17 px** are under the 24 px floor (scan `fail`, app origin). Owner: platform-engineer.
- **D7 (note): "Crossing 3" carries no spatial description.** A learner who cannot see the picture can still run the experiment and read the result in the live line, so this is not a lock-out. Whether to describe the layout is a design and pedagogy question; I am not ruling on it.

## Not checked

A real screen reader; text zoom and 400% reflow; forced-colors mode; viewports other than 390x844.
