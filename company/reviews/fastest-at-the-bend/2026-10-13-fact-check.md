# Fact-check: fastest-at-the-bend (2026-10-13)

Checker: fact-checker (independent). Inline node checks (grid maximum and Euler integration of the logistic ODE). Stage text from the walkthrough transcript; model from Demo.tsx (born = round(0.5 N (1 - N/1000))).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | dN/dt = rN(1 - N/K) is the Verhulst logistic equation (1838); the product needs individuals and room left. |
| c2 | verified | 0.5 x 100 x 0.9 = 45; 0.5 x 900 x 0.1 = 45; 0.5 x 500 x 0.5 = 125. A grid search over N = 0..1000 puts the maximum at N = 500 (125). |
| c3 | verified | d/dN [rN(1 - N/K)] = r(1 - 2N/K) = 0 at K/2. Integrating the ODE from N = 1 numerically gives maximum growth at N = 500, where N(t) has its inflection point. |
| c4 | verified | The lag/overshoot/crash caveat is correct for real populations and discrete-time logistic models (May 1976, Nature 261: 459-467, "Simple mathematical models with very complicated dynamics", exists and shows overshoot, cycles and chaos at high growth rates). The Gotelli chapter citation was not opened. |
| c5 | verified (convention) | Stated on the stage and in the reveal ("The growth rate is made up and the limit is fixed"). |

Note: the lesson treats "new fish per month" as the instantaneous rate rN(1 - N/K); a month-by-month stepping would give slightly different numbers. The stage never steps the population over time, so nothing displayed is inconsistent. No unrecorded claims found.
