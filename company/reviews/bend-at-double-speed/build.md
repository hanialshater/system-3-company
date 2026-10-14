# Build note: bend-at-double-speed

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key states: speed at 108 km/h ("fast"), then a bend of at least the grip limit ("cleared"). Speed slider starts 54 (step 27) and radius slider 100 (step 50) so two arrow presses each reach 108 km/h and 200 m on the QA path.
- mu = 15^2 / (9.81 x 50) = 0.459 comes from the question's premise; r_min = v^2 / (mu g) = 50 m at 54 km/h, 200 m at 108 (node). The question's third option (400 m) is computed as 4 x 50 x 2 in the code, a distractor only.
- Model chip on stage: "Flat dry bend, grip mu = 0.46" (label-the-model pattern).
- Top view: road arc of radius r, dashed grip-limit arc, car skid line when r < r_min. Scale 0.36 px/m so 400 m still fits.
- Screenshots looked at: QA phone-2-explore (108 km/h, 200 m, Grips) and my own skid case (108 km/h, 100 m, Skids). First pass drew the bend too small and the chip over the arc; scaled up and moved the chip to the bottom right.

## Revision v2 (wave C)

Radius slider starts at 50 m so question and stage match; tightest safe bend shows 50 m at 54 km/h. Three milestones (81 km/h, 108 km/h, cleared) so 50 / 112.5 / 200 m are all seen; radius step 75 so two presses reach 200. m v^2/r replaced by plain words. c1 reworded, c6 added, unverified.
