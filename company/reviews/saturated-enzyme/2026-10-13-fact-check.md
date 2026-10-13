# Fact-check: saturated-enzyme (2026-10-13)

Checker: fact-checker (independent). Inline node arithmetic plus a mass-action ODE check of the steady-state occupancy. Stage text from the walkthrough transcript; Demo.tsx read (busy share = S/(1+S), speed gain = busy(S)/busy(S/2) - 1).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | v = Vmax S/(Km + S) is the Michaelis-Menten equation (Michaelis & Menten 1913; Lehninger). Under steady state, the occupied enzyme fraction is S/(Km + S), so "Km is the substrate concentration at which half the enzymes are busy" is exact; checked by integrating E + S <-> ES -> E + P with k1 = 1, k-1 = 0.5, kcat = 0.5 (Km = 1): occupancy 0.50, 0.67, 0.91, 0.95 at S = 1, 2, 10, 20. |
| c2 | verified | 10/11 = 90.9% (91 of 100), 20/21 = 95.2% (95 of 100); ratio 1.0476, about 5% faster. |
| c3 | verified | 1/2 -> 2/3: ratio 1.333, 33% faster (50 -> 67 of 100). |
| c4 | verified (convention) | The 100 stations, one molecule each at a time, with busy share S/(1+S), and a pool drawn as "more substrate" not a count, as the reveal says ("the stations are a simplification"). |

Note: occupancy S/(Km+S) uses free substrate concentration equal to total substrate, which holds when substrate is far in excess of enzyme (the usual Michaelis-Menten condition); the lesson presents it as a simplified model. No unrecorded claims found.
