# Fact-check: two-batteries-side-by-side alt1 (2026-10-16, lane B)

- Checker: fact-checker, lane B (F-46 closeout). Worktree base cdee168c. FC wj64 recorded alt1; I did not, so I may rule on it.
- Read: Demo.tsx reveal (lines 100-120) and the alt string (line 165), then claims c2 and c4.
- Result: **alt1 disputed** (blocks). I agree with the finding in wj64's note.

## Finding

- Series-state picture text: "The bulb glows four times as bright".
- The model gives four times the power (c2: 0.45 W to 1.8 W at 5 Ω). The reveal says this correctly: "four times the power".
- Brightness is not power. A filament's light output is not proportional to electrical power, and c4 says the glow is schematic (its radius grows with power).
- So the alt text makes a stronger claim than the sighted stage and reveal do, with no support.

## Fix (demo-builder, Demo.tsx line 165)

- Series state: "The bulb glows brighter, taking four times the power;" in place of "The bulb glows four times as bright;".
- Then reset alt1 to unverified, with c2 as its support.
