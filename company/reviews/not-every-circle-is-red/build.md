# Build note: not-every-circle-is-red

builder: demo-builder (Meta M6, order O-6) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md, Wave J, brief 2 (check D2) · design: company/reviews/not-every-circle-is-red/design.md

- Intent: four circle buttons (fixed-size inline SVG, hatched fill for blue plus the "R"/"B" letter, so not colour alone), an HTML table of the brief's four sentences with ✓/✗ marks and "=" for rows matching row 1 now, two kept columns for the milestone states, Reset. Row truth comes from `SENTENCES[].holds` in Demo.tsx (not a table of values).
- Deviations from the brief, for cm-math:
  1. Predict question set in a scene: "You have four circles, each painted red or blue. A friend looks at them and says: "Not every circle is red." Which sentence means exactly the same, whatever the colours?" (copy-style; options unchanged).
  2. Two kept columns (headed by 10 px state dots, no words) record the one-blue and all-blue states, so after Reset the states the reveal quotes are still on the stage (demo-standard "The reveal quotes what you saw").
  3. The circle and dot SVGs carry width/height, not a viewBox: they are fixed-size icons, and with a viewBox `tools/reveal-fit.mjs` took the 56 px circle as the stage's main picture and flagged it "thumb" (drawn at 0.2 of stage width). Nothing was shrunk.
  4. Interactions tag: `toggle` (taps toggle a circle), plus choice-before-reveal and milestone-gate.
- Stage words at the busiest frame: circle letters 4 + sentences 18 + Reset 1 = 23 (≤ 25, as the brief counts). Marks, "=" and dots are glyphs (0).
- Title and hook are mine: "What does "not every" really say?" / ""Not every circle is red." Which other sentence says exactly the same thing?"

## Pre-flight v1

1. Title and hook: "What does "not every" really say?" / ""Not every circle is red." Which other sentence says exactly the same thing?" Neither names or leans to an option.
2. Options: "No circle is red" / "Some circle is not red" / "Some circle is red": all plain sentences of the same form, none numbered.
3. Locked stage: four red "R" circles; table now-column for all red: row 1 ✗, row 2 ✗ =, row 3 ✗ =, row 4 ✓; kept columns empty; Reset disabled. Both A and B carry "=", so nothing singles out B.
4. Reveal values: "With one circle blue … 'Not every' turned true while 'No circle is red' stayed false" = kept column 1 (milestone `one-blue`, recorded when it fires: ✓ / ✗). "'Some circle is not red' matched it in every state you made" = true in every state by definition (claim c1); on the stage its mark equals row 1's in the now column and both kept columns. "Opposite of 'none are' is 'at least one is'" = kept column 2 (milestone `all-blue`: row 2 ✓, row 4 ✗) and the now column (row 2 ✗, row 4 ✓). No hard-coded state.
5. QA path: circle 1 (one-blue), circle 2, circle 3, circle 4 (all-blue), Reset: both milestones by press 4. Both kept columns stay filled when the reveal opens.
6. Reset: after circles 1–4 and Reset, the reveal read: "With one circle blue, 'Not every circle is red' turned true while 'No circle is red' stayed false, so they do not mean the same. 'Some circle is not red' matched it in every state you made. | One exception is enough to deny 'every'. The opposite of 'all are' is 'at least one is not', and the opposite of 'none are' is 'at least one is'." Stage beside it: all red now, kept columns one-blue (✓ ✗ ✓ ✓) and all-blue (✓ ✓ ✓ ✗). Matches.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3106 not-every-circle-is-red --shots` on a production build of this worktree: verdict fit, crop 0 px, hidden 0, thumb 0, namedHidden 0, phoneFit 1, pass 1; reveal 75 words (tool count, verdict line included). Screenshot artifacts/reveal-fit/not-every-circle-is-red.png (git-ignored): circles, the whole table with both kept columns, Reset and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Text sizes: sentences 0.85rem = 13.6 px, marks 16 px, circle letters 13 px, kept-state dots 10 px diameter. Circle buttons 64 px, Reset 44 px.
- `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). `npm run registry` regenerated the two generated files in this worktree (the build check asked for it).
- Official QA is code's qa stage; not run by me.
