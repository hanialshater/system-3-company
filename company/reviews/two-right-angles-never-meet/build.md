# Build note: two-right-angles-never-meet

- Builder: wave-i-math (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/math.md #56 (cm-math). Kept from evaluators until they report.
- Stage: fixed base (1 base = 80 px) with a square left corner and vertical left side; the learner turns the right corner B from 60° to 90°. Sides meet tan(B) bases up; top corner 90° − B. From about 64° the meeting point is off the card (arrowheads on both sides); at 90° the sides stand parallel and the readout says "never". "Sides meet" and "top corner" readouts are drawn inside the picture (folded in to fit the phone).
- Departure from the brief: the brief says "one dial". QA presses a slider only twice (60 → 62), so I added two presets after it, "Set 89°" and "Set 90°", which reach the key states. Each is disabled while already at its value, so no press is dead.
- Milestones: `near` (B in 85..89°; the largest such B is recorded) and `ninety` (B = 90°). Each leaves a dashed trace with a label ("89° → 57.3 up", "90° → never") that stays after the learner moves on, so the reveal's numbers stay on the stage.
- Rounding: the readout, trace and reveal share fmtH (2 decimals under 10, 1 under 100), so the reveal says "57.3 bases up" where the brief said "57".
- overlap.mjs was not run (brief asked for it before build; it is a cm-math check, not in this dispatch).
- Not run (per dispatch): next build, QA, walkthrough.

## Pre-flight v1

1. Title and hook: "Two right angles in one triangle?" / "Put two square corners on one base. What would the third corner have to look like?" Neither says whether it is possible; no.
2. Options: "Yes, if it is tall enough" / "Yes, if its base is short enough" / "No, never". None numbered, all short clauses at the same precision.
3. Locked stage: a 60° right-corner triangle with a square left corner, labels "90°", "60°", "1 base", "top ?", readouts "sides meet ?" and "top corner ?", caption "On a flat page.", disabled "Set 89°" / "Set 90°". Nothing marks parallel sides or "never"; the 90° preset is the question's own case, not the answer.
4. Reveal values: "180°", "0°" (fixed facts, c1; not stage states). "at 89°" = (b) the largest B recorded by milestone `near`; "57.3 bases up" and "1° tip" = (b) fmtH(tan(near)) and 90 − near from the same record; "at 90° they stood parallel" = (b) milestone `ninety`.
5. QA path: slider 60 → 62 (two arrows), "Set 89°" (near), "Set 90°" (ninety). Both milestones reached; at the reveal the stage is at 90° (parallel, "never") and the 89° dashed trace with "89° → 57.3 up" is still drawn.
6. Reset: there is no Reset control. Moving the slider back to 60° keeps both traces and both records. Reveal text from the QA run: "Suppose a triangle had two right angles. Those two corners already use all 180°, leaving 0° for the third. / You watched it happen: at 89° the sides met 57.3 bases up with a 1° tip; at 90° they stood parallel and never met. / The assumption leads to an impossible triangle, so it is false. That is proof by contradiction: assume it, follow it, hit a wall."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 two-right-angles-never-meet`, dev server, 2026-10-14): first build crop 21 px (readouts on their own wrapped row); after folding both readouts into the picture: crop 0 px, hiddenBelow 0, namedHidden 0 ("never" visible), 72 words with the verdict. Stage 357 px (picture 200, controls 85, text 34), reveal 232 px, window 618 px. Both traces, both sides and the "never" readout are on screen with the reveal's last line.
