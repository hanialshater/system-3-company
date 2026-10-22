# Build note: three-sticks-one-triangle

builder: demo-builder (Meta M4, order O-2) · 2026-10-22 · v1 · brief: company/domains/briefs/math.geometry.md, Wave J, brief 3 (check G3) · design: company/reviews/three-sticks-one-triangle/design.md

- Intent: base 6 cm drawn 300 px wide (50 px per cm), sticks hinged at its ends, gap computed live in `geometry()` from the angles (Demo.tsx). 3, 4, 6 and 2, 4, 6 take the angles where their ends meet (law of cosines). Values: 45° → 2.6 cm, 0° → 1.0 cm, 60° → 3.6 cm; 3, 4, 6 apex height 1.78 cm; 2, 4, 6 height 0.
- Controls in brief order: "Lay them flat", "Raise them", "Sticks 3, 4, 6", "Sticks 2, 4, 6", Reset. Shown state's chip active and disabled; Reset disabled at the start state.
- Deviations from the brief, for cm-math:
  1. "Lay them flat" / "Raise them" act on the 2, 3, 6 set only (pressed on another set they bring 2, 3, 6 back). The brief does not say what they do on other sets.
  2. Predict question adds "tilting them any way you like" (the condition the answer depends on) and a second-person opening (copy-style.md).
  3. Stage words: chip traces add "height 0" (1 word; "✓ 1.0 cm", "✓ 3.6 cm", "✓ △" are 0 by Ruling 2). Busiest frame: readout "gap 3.6 cm" 2 + stick labels 3 + chips 8 + trace 1 = 14 by the brief's spaced count (≤ 25; brief: 13).
  4. Reveal: the "raising" and "2 + 4 = 6" clauses show only if the learner pressed those chips (both are on the QA path); "raising them only widened it" gains "to 3.6 cm" so it points at the trace. "1 cm" is printed "1.0 cm" (stage rounding). 81 words by the tool, ≤ 90.
- Title and hook are mine: "Can any three sticks make a triangle?" / "Sticks of 2, 3 and 6 cm. Tilt the short ones however you like. Do the ends ever meet?"

## Pre-flight v1

1. Title and hook: "Can any three sticks make a triangle?" / "Sticks of 2, 3 and 6 cm. Tilt the short ones however you like. Do the ends ever meet?" Both are questions; neither says yes, flat or never.
2. Options: "Yes, tilted the right way" / "Only lying flat" / "No, never": all words, none numbered, same precision.
3. Locked stage: 2, 3, 6 at 45°, dashed gap, "gap 2.6 cm", labels "2 cm", "3 cm", "6 cm", chips without traces. One tilt with a gap does not say "never" (it is the brief's start frame); nothing marks an answer.
4. Reveal values: "1.0 cm gap" = gap recorded when `flatGap` fires (trace "✓ 1.0 cm"); "5 cm", "6 cm", "2 and 3 cm" = the set's stick lengths, on the stage; "3.6 cm" = gap recorded at the first "Raise them" (trace "✓ 3.6 cm"), shown only if pressed; "3 + 4 = 7 … closed" = milestone `closed` (trace "✓ △"); "2 + 4 = 6 met only lying flat" = shown only if "Sticks 2, 4, 6" was pressed (trace "✓ height 0").
5. QA path: Lay them flat (flatGap), Raise them, Sticks 3, 4, 6 (closed), Sticks 2, 4, 6, Reset: both milestones by press 3; every quoted state stays on the chips' traces after Reset.
6. Reset: after the five presses the reveal read: "Even lying flat along the 6 cm stick, the 2 and 3 cm sticks reached only 5 cm and left a 1.0 cm gap; raising them only widened it, to 3.6 cm. | The two shorter sides must add to more than the longest. 3 + 4 = 7 beats 6, and that set closed; 2 + 4 = 6 met only lying flat. A straight line is the shortest way between two points, so the detour must be longer." Matches the traces.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3102 three-sticks-one-triangle` on a production build of this worktree: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 81 words (tool count, verdict line included); picture 169 px, controls 99 px. Screenshot artifacts/reveal-fit/three-sticks-one-triangle.png (git-ignored): the sticks, the gap, all chips with traces and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Labels measured in the browser at 390×844 (stage scale 0.847): stick labels 10.2 px, readout 11.9 px. Targets min-height 44 px.
- `npm run check`: nothing for this slug. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). `npm run registry` regenerated the two index files.
- Official QA is code's qa stage; not run by me.
