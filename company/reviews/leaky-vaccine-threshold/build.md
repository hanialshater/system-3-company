# Build note: leaky-vaccine-threshold (demo-builder, 2026-10-13)

- Design: a 20 x 20 toy town filled row by row with vaccinated people (ring + inner dot whose area is the efficacy). A dashed stepped outline marks the coverage needed, (1 - 1/R0) / e; when that passes 100% the outline disappears and a red "Not enough alone" chip shows. The message gives the needed coverage and R at the current coverage.
- Brief answer checked: 0.75 / 0.8 = 0.9375; 70% gives 107%. The option "About 94%" and every reveal number come from needed() and rEff().
- Reveal gate: milestones "efficacy-80" (exactly 80%) and "over-100" (needed coverage above 100%). The "Efficacy 80%" and "Efficacy 70%" chips come first, then the efficacy (50-100%) and coverage (0-100%) sliders. Starts at efficacy 100%, coverage 75% (R = 1). The reveal quotes the lowest efficacy the learner reached.
- Leaky vs all-or-nothing: the stage's R is initial R, which is the same for both types (c3, citing Halloran, Longini & Struchiner 2010; flagged for the fact-checker).
- After screenshots: added a legend (vaccinated, fill = protection; not; needed).
- All claims unverified.
