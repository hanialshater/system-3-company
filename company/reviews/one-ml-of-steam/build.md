# Build note: one-ml-of-steam
- Key state: all the water boiled, piston at about 1,630 mL (milestone 'all-steam'). QA path: 'Boil it all' is the first control; the slider (step 10%) then moves it back two steps.
- Physics: free piston at 1 atm, so V = (1 - f) x 1 mL + f x 1,629 mL (ideal gas, 0.9584 g/mL at 100 °C). The option '1,630 mL' and the reveal are computed from STEAM_ML; real steam about 2% less is in the reveal and claim c2.
- Height is a log scale of volume (labelled); the gas scatter uses mulberry32(7) for layout only.
- Design change: brief said 'drag the piston'; the learner instead controls how much has boiled, because at 1 atm and 100 °C the volume is set by the boiled share, not freely chosen.
