# Fact-check: saturated-enzyme (2026-10-13)

Checker: fact-checker (independent). Inline node arithmetic plus a mass-action ODE check of the steady-state occupancy. Stage text from the walkthrough transcript; Demo.tsx read (busy share = S/(1+S), speed gain = busy(S)/busy(S/2) - 1).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | v = Vmax S/(Km + S) is the Michaelis-Menten equation (Michaelis & Menten 1913; Lehninger). Under steady state, the occupied enzyme fraction is S/(Km + S), so "Km is the substrate concentration at which half the enzymes are busy" is exact; checked by integrating E + S <-> ES -> E + P with k1 = 1, k-1 = 0.5, kcat = 0.5 (Km = 1): occupancy 0.50, 0.67, 0.91, 0.95 at S = 1, 2, 10, 20. |
| c2 | verified | 10/11 = 90.9% (91 of 100), 20/21 = 95.2% (95 of 100); ratio 1.0476, about 5% faster. |
| c3 | verified | 1/2 -> 2/3: ratio 1.333, 33% faster (50 -> 67 of 100). |
| c4 | verified (convention) | The 100 stations, one molecule each at a time, with busy share S/(1+S), and a pool drawn as "more substrate" not a count, as the reveal says ("the stations are a simplification"). |

Note: occupancy S/(Km+S) uses free substrate concentration equal to total substrate, which holds when substrate is far in excess of enzyme (the usual Michaelis-Menten condition); the lesson presents it as a simplified model. No unrecorded claims found.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c1, c2, c3.

10/11 = 91%, 20/21 = 95%, ratio 1.0476; 1/2 -> 2/3 ratio 1.333. Michaelis-Menten form standard.

## Pass 7

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Numbers re-derived in node from the lesson's own constants or model.ts.

| Claim | Result | Basis |
|---|---|---|
| c2 | verified | node: 10/11=0.909, 20/21=0.952, ratio 1.0476 exact; Demo.tsx count() rounds to 91 and 95, 95/91=1.044; text states both. |
| c3 | verified | node: (2/3)/(1/2)=1.333; counts 50 and 67; 67/50=1.34 as the stage shows. |
