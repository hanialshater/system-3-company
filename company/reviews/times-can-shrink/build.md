# Build note: times-can-shrink

- Builder: wave-i-math (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/math.md #57 (cm-math). Kept from evaluators until they report.
- Stage: 2-by-2 grid; the unit square is dashed and the 0.6-wide strip (0.6 × 1) is a solid outline inside it. The shaded rectangle is 0.6 wide and h tall (slider 0 to 2 in tenths); its label and the "Area" readout show 0.6 × h. Arithmetic is in tenths, so 0.42 prints exactly.
- Departure from the brief: one height slider as in the brief, plus three presets after it ("h = 1.5", "h = 1", "h = 0.7") so the QA path (slider pressed only twice) reaches every key state and ends on the question's case. Presets are disabled at their own value.
- Milestones: `seven` (h = 0.7), `one` (h = 1), `above` (h > 1; the largest such h is recorded). Each leaves a dashed trace line with a label "0.6 × h = area" on the right, kept after the learner moves on; labels are pushed apart so 1 and 1.1 do not overprint.
- Not run (per dispatch): next build, QA, walkthrough. overlap.mjs not run.

## Pre-flight v1

1. Title and hook: "Where does 0.6 × 0.7 land?" / "Two decimals, one product. Does it land above them, between them, or below them?" Lists all three regions evenly; no.
2. Options: "Above 0.7" / "Between 0.6 and 0.7" / "Below 0.6". All are ranges using the question's two numbers; same precision.
3. Locked stage: empty 2-by-2 grid, axis labels 0/1/2 and "0.6", the dashed unit square and the solid 0.6 strip outline, readout "Area ?", height 0, disabled presets. No shaded rectangle, no product, no trace. The strip outline is the reference the brief asks for; it does not mark where 0.42 lands (no h = 0.7 line is drawn before the commit).
4. Reveal values: "0.7" and "0.42" = (b) milestone `seven` (area(7)); "smaller than 0.6 / 0.7" compares the same; "At height 1 the area stayed 0.6" = (b) milestone `one`; "at 1.5 ... to 0.9" = (b) the largest h above 1 recorded by milestone `above`, area from area(h10).
5. QA path: slider 0 → 0.2, "h = 1.5" (above), "h = 1" (one), "h = 0.7" (seven). All three reached; the stage ends at 0.7 (shaded 0.42) and the traces "0.6 × 1.5 = 0.9", "0.6 × 1 = 0.6", "0.6 × 0.7 = 0.42" are drawn.
6. Reset: there is no Reset control. Moving the slider to 0 keeps all three traces and records. Reveal text from the QA run: "You set the height to 0.7, and the shaded area read 0.42: smaller than 0.6 and smaller than 0.7. Multiplying by 0.7 keeps seven tenths of the 0.6 strip, so it shrinks it. / At height 1 the area stayed 0.6; only above 1, at 1.5, did it grow, to 0.9. Times makes bigger only when the other number is bigger than 1."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 times-can-shrink`, dev server, 2026-10-14): crop 0 px, hiddenBelow 0, namedHidden 0 ("area" visible), 68 words with the verdict. Stage 397 px (picture 196, controls 129, text 34), reveal 184 px, window 618 px. Shaded rectangle, strip, all three traces and the Area readout are on screen with the reveal's last line.
