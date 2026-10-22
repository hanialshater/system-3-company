# Build note: regions-from-circle-points

builder: demo-builder (Meta M6, order O-7) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md, Wave J, brief 3 (check D3) · design: company/reviews/regions-from-circle-points/design.md

- Intent: SVG picture (circle, lines, crossing dots, two-tone pieces via one evenodd path of circular segments), an HTML trace table, five chips and Reset. Counts come from the drawing: crossings by segment intersection, pieces by Euler's formula (E − V + 1 with distinct crossing points), as in check D3; not from the formula the reveal teaches. They agree with 1 + C(n,2) + C(n,4) for 1–6 points.
- Deviations from the brief, for cm-math:
  1. Predict question: scene plus the condition "unevenly so no three lines meet at one spot" (evenly spaced gives 30, claim c4; without the condition A is defensible).
  2. The one-line readout "6 points · 15 lines · 15 crossings · 31 pieces" became a 4-row trace table (same four words) that keeps every column seen, so the counts the reveal quotes survive Reset.
  3. Circle radius 136 in a 300 viewBox, drawn about 270 px wide: the stage is about 288 px wide at 390 (side rail), so the brief's 145 px radius cannot fit. Closest crossings are 0.209 radius apart, about 25 px.
  4. At the reveal, if the learner reset to 1 point, the picture shows the 6-point drawing and Reset is disabled (as four-cards-one-rule re-shows its backs).
  5. Reveal adds "(16 pieces)" after "5 points" (from the kept count); 70 words in the text.
  6. Chips are not folded at the reveal: reveal-fit counted "5 points" / "6 points" as named labels hidden by the fold.
- Stage words at the busiest frame: table row heads 4 (points, lines, crossings, pieces) + chips 5 + Reset 1 = 10, as the brief counts. Numerals and "?" 0.
- Title and hook are mine: "How many pieces with six points?" / "Points on a circle, every pair joined: 1, 2, 4, 8, 16 pieces. What comes next?"

## Pre-flight v2

Revise from fact-check 2026-10-22 (c2 disputed: "the count was never doubling" is false as written, since 1, 2, 4, 8, 16 do double).

1. Title, hook, options, locked stage, QA path, milestones and Reset: unchanged from v1 (no code path changed; only one reveal sentence).
2. Reveal paragraph 2 now reads: "Lines come from pairs of points and crossings from groups of four, so the rule was never doubling: it only matched doubling up to 5 points. Five matching cases are evidence, not a proof." The statement is about the rule, not the counts, and agrees with paragraph 1 ("Doubling held up to 5 points").
3. meta.json c2 text carries the same wording ("the rule was never doubling: it only matched doubling up to 5 points"). Values unchanged: 1 + 15 + 15 = 31 from the kept 6-point counts.
4. Claims: c2 changed; c1, c3, c4 were verified in this order, so all four are back to `unverified` with no checkedBy/checkedOn (fact-checker notes removed with them). meta.version 1 → 2.
5. Phone fit: reveal grows from 69 to about 75 words (≤ 90). Not re-measured by me with reveal-fit; code's qa stage runs it on v2.

## Pre-flight v1

1. Title and hook: "How many pieces with six points?" / "Points on a circle, every pair joined: 1, 2, 4, 8, 16 pieces. What comes next?" Neither gives 31; the hook states only the brief's given cases.
2. Options: "30" / "31" / "32": all bare numbers, same precision.
3. Locked stage: one point on the circle, whole disc one tone; table column 1 (1, 0, 0, 1), columns 2–6 "?" except the points row (1–6); chips enabled only after the prediction, Reset disabled. Nothing shows 31 or 30.
4. Reveal values: "5 points (16 pieces)" = kept count for 5 (milestone `five`); "6 points gave 31", "1 + 15 + 15 = 31" = kept count for 6 (milestone `six`); "not 32" = 2 × the kept 16. All in the table's columns 5 and 6, which never clear.
5. QA path: 2 points, 3 points, 4 points, 5 points (five), 6 points (six), Reset: `five` at press 4, `six` at press 5 (the brief's QA path is the chips in order; 6 points is the fifth chip, so the second milestone cannot come by press 4). Each press changes the picture and the table.
6. Reset: after the five chips and Reset, the reveal read: "Doubling held up to 5 points (16 pieces), then 6 points gave 31, not 32. Every piece is made by a line or a crossing: pieces = 1 + lines + crossings. With 6 points that is 1 + 15 + 15 = 31. | Lines come from pairs of points and crossings from groups of four, so the count was never doubling. Five matching cases are evidence, not a proof." Stage beside it: the 6-point drawing (15 lines, 15 red crossings, 31 two-tone pieces), table 1/2/4/8/16/31 with column 6 highlighted. Matches.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3107 regions-from-circle-points --shots` on a production build of this worktree: verdict fit, crop 0 px, hidden 0, thumb 0, namedHidden 0, phoneFit 1, pass 1; reveal 69 words by the tool's count. Screenshot artifacts/reveal-fit/regions-from-circle-points.png (git-ignored): picture, full table, chips and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Text sizes: table 0.85rem = 13.6 px; chips kit size; no text inside the SVG. Chips and Reset ≥ 44 px tall.
- `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). `npm run registry` regenerated the two generated files in this worktree.
- Bug found and fixed before hand-in: the shading arcs first used a fixed large-arc flag, so SVG drew some arcs around the mirrored centre (curved bands inside the disc); the flag now follows the real angular span.
- Official QA is code's qa stage; not run by me.
