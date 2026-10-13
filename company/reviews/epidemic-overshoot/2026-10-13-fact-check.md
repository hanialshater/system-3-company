# Fact-check: epidemic-overshoot (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l4.mjs (my own SIR, RK4 and Euler, plus fixed-point iteration). Stage text from the walkthrough transcript; model parameters read from Demo.tsx (infectious 5 days, I0 = 0.1%, Euler dt 0.01 day).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | z = 1 - exp(-R0 z) for R0 = 3 iterates to 0.9405 (94%); threshold 1 - 1/3 = 66.7%. Kermack & McKendrick (1927), Proc. R. Soc. A 115: 700-721 is the origin of this final-size relation. |
| c2 | verified | R0 = 3: Euler peak day 19.2 (RK4 19.18), sick at day 19 = 30.1% (peak sick fraction 1 - (1+ln 3)/3 = 30.05%), ever infected 94.07% at day 100 (RK4 94.06%). R0 = 2: 79.7%, R0 = 4: 98.0% (80% and 98%). One detail: the stage shows 65% ever infected at day 19 (Euler: 0.6545); the exact ODE gives 65.6% at day 19, which would round to 66%. At the exact peak (day 19.18) the figure is 66.7%. The difference is under one percentage point and the reveal says "just about the 67% threshold", so I do not dispute. |
| c3 | verified | dI/dt = (beta S - gamma) I = 0 at S = gamma/beta = 1/R0; so cases peak when the ever-infected share passes 1 - 1/R0, and the infectious people at that moment (30%) continue to infect (R_eff < 1 but not 0). |
| c4 | verified (convention) | Stated on the stage and in the reveal. |

Reveal sentence "The higher R0, the less is left uninfected" holds in the numbers above (20%, 6%, 2% left). No unrecorded claims found.
