# Fact-check: scale-on-a-slope alt1 (2026-10-16, lane B)

- Checker: fact-checker, lane B (F-46 closeout). Worktree base cdee168c. FC wj64 recorded alt1; I did not, so I may rule on it.
- Read: Demo.tsx lines 40-174 (stage, alt string, arrows).
- Result: **alt1 disputed** (blocks). c4 is still disputed from wj64; Demo.tsx has not changed it.

## Finding

- Demo.tsx line 109 uses one alt sentence for every angle: "{Flat ground | A N degree ramp}. The person's weight arrow splits into a part into the ramp and a part along the ramp. The scale reads N kilograms."
- At 0° the stage draws no along-the-ramp arrow (line 157, `th !== 0`), and the along component is W sin 0 = 0. There is no ramp.
- So a screen-reader learner is told the weight splits in two on flat ground. The sighted stage does not show this, and it is false.

## Fix (demo-builder, Demo.tsx alt string)

- At th === 0: "Flat ground. The person's whole weight presses straight down into the scale. The scale reads 70.0 kilograms."
- Keep the current sentence for 30° and 60°.
- Advisory, same round: the visible label "into the ramp" (line 155) is also drawn at 0°, where there is no ramp. At 0° the label could read "into the scale".
- Then reset alt1 to unverified.
