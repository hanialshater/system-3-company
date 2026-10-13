# Fact-check: pesticide-paradox (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l9.mjs (own RK4 with dt = 0.005, 600 and 2,000 months). Stage text from the walkthrough transcript; the equations dx/dt = x - xy - e x, dy/dt = xy - y - e y read from Demo.tsx (slider 0-60% in steps of 10).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | For Lotka-Volterra, averaging d(ln x)/dt = a - by - e over a cycle gives mean y = (a - e)/b; averaging d(ln y)/dt = cx - d - e gives mean x = (d + e)/c. With a = b = c = d = 1: x* = 1 + e, y* = 1 - e, which my integration reproduces (2,000-month averages 1.100/0.900 at e = 0.1, 1.200/0.800 at 0.2, 1.400/0.600 at 0.4, 1.600/0.400 at 0.6). |
| c2 | verified | 600-month averages from (1.5, 1): 1.199/0.800 at e = 0.2 (stage displays 1,200 and 800), 1.399/0.600 at 0.4. 1.000/1.000 at e = 0. |
| c3 | verified | Predators break even when cxy = (d + e)y, i.e. x = (d + e)/c, so a higher predator death rate needs a higher pest level; the time-average equals that level. Matches c1. |
| c4 | verified | Volterra (1926), Nature 118: 558-560, explained U. D'Ancona's observation that selachians (predatory fish) made up a larger share of the Adriatic catch after the reduction of fishing in World War I, with exactly this argument (equal extra mortality raises the prey average and lowers the predator average). |
| c5 | verified (convention) | Strength 20% = e 0.2 per month, the same extra per-capita death rate on both species; stated as "toy model" in the reveal. |

The reveal's "the spray hurts [predators] more" is the qualitative reading of the averages: pests +20%, predators -20% at strength 20%. No unrecorded claims found.
