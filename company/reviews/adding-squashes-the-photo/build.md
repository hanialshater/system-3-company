# Build note: adding-squashes-the-photo

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 2

- Intent: the 4 by 6 photo (portrait, a face drawn in a unit box and stretched with the frame, so a changed ratio visibly distorts it), anchored at its bottom-left corner, 17 px per unit (8 by 12 = 204 px tall). Each chip draws the enlarged frame over it with its face and a corner dot (green on the dashed ray, red off) and its ratio next to the corner. Readout: "6 by 8 · long ÷ short = 1.33".
- Chips in brief order: "+2 each side", "×1.5 each side", "+4 each side", "×2 each side", Reset.
- Locked frame: the 4 by 6 photo and "4 by 6 photo" only. The dashed ray is hidden until the commit, because it passes through (6, 9) and would act as a pre-drawn target.
- Milestones (minInteractions 2): "added-off" (first adding chip recorded: d, w, h), "times-on" (×1.5, 6 by 9, the question's case).
- Trace: every frame tried stays as a faint dashed outline with its corner dot and ratio, so Reset (back to the bare 4 by 6) keeps the evidence.
- Reveal change from the draft: "and the face went wide" is cut, because after Reset only the outlines remain (faces are not kept in the ghosts), so the reveal would describe something no longer on the stage. Category manager may want it back if Reset is dropped.
- Title and hook are mine: "Bigger photo, same face?" / "Enlarge a 4 by 6 photo without stretching the face. What must the long side be?"

## Pre-flight v1

1. Title and hook: as above. They name the given 4 by 6, not 8, 9 or 12.
2. Options: "8" / "9" / "12": all bare numbers.
3. Locked stage: the 4 by 6 photo with its face, a baseline, "4 by 6 photo". No ray, no ratio, no target frame.
4. Reveal values: d, w by h and the ratio h ÷ w (milestone "added-off", recorded on the first adding chip; ghost outline with its ratio label); 6 by 9 and 1.5 (milestone "times-on"; ghost labelled 1.5 on the ray).
5. QA path: +2 (added-off), ×1.5 (times-on), +4, ×2, Reset: both milestones in 2 presses; all four frames remain as ghosts.
6. Reset: reveal reads "Adding 2 to each side gave 6 by 8: the corner left the dashed line, because 8 ÷ 6 is 1.33, not 1.5. Multiplying each side by 1.5 gave 6 by 9, and the corner stayed on the line. ..."; the ghosts at 6 by 8 (red, 1.33) and 6 by 9 (green, 1.5) are on the stage.
7. Phone fit: see the measurement section below.
