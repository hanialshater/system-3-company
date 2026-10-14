# Build note: newton-doubles-the-digits

builder: algo2-sb · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/newton-doubles-the-digits.md` (+ svg) and brief #70 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (builder's own node script)
Double precision from g = 1: 1, 1.5, 1.4166666666666665, 1.4142156862745097, 1.4142135623746899, 1.4142135623730949, then the identical double. Correct significant digits, comparing g.toPrecision(17) with the true string of √2 (not Math.SQRT2): 1, 1, 3, 6, 12, 15, no change. The 45-digit √2 string in Demo.tsx was cross-checked with an independent BigInt Newton iteration. Answer A (4 updates) holds. Error identity used in claim c3: (g + 2/g)/2 - √2 = (g - √2)² / (2g); (2.12e-6)² / 2.83 = 1.6e-12.

## Built as specced
Rule line; ladder of rungs (32 px rows: "#k", g with the correct prefix bold on a `--good-fill` tint and the rest muted, digits bar 8 px per digit with the count); rung 6 is a muted "no change" row. Magnifier for the selected rung: ticks for g and 2 ÷ g (labelled above), √2 as a ring below the line, the next g as a filled dot ("average"). Positions come from exact decimal expansions of the doubles (toPrecision(45) as BigInt), so rungs 4 and 5 are drawn correctly. 3 controls in DOM order: Update g, Update until it stops changing (60 ms per rung), Look at update slider (disabled until rung 1 exists). Milestone `four-updates` (rung 4 exists); minInteractions 1. QA path: slider two ArrowLeft from 6 lands on 4.

## Choices and deviations
- g is printed to 17 significant digits, not 16. At 16 digits rung 5 reads 1.414213562373095 with its last "5" not bold, which matches √2's rounded digit and would look like a bug; 17 digits (…0949 against …0950) shows why only 15 count, and it is the same string the digits are counted from.
- Magnifier zoom: the spec asks for a power of ten with the g to 2 ÷ g gap spanning 150-300 px. That window is narrower than a factor of ten, so for rungs 1-3 no power of ten fits. Built instead: the gap always spans exactly 240 px and the label gives the true zoom against rung 0, rounded to 2 significant figures: ×1, ×6, ×200, ×240,000, ×3.1 × 10¹¹, ×4.5 × 10¹⁵. The QA-path rung 4 reads "about ×10¹¹" as the spec says; rungs 1-3 do not read the spec's ×10, ×1,000, ×1,000,000.
- Rung 6 in the magnifier draws rung 5's picture with the label "#6: same as #5".
- Added a small "average" label on the dot so the filled dot is named without colour.
- Claim c5 (Babylonian / Heron) is worded as the conventional name; the Babylonian tablet's method is not recorded. Sources not opened.

## Problems found in the brief or spec
The zoom constraint is infeasible as written (see above). Interaction designer may want to amend the spec or accept this.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
