# Fact-check: thermostat-leftover (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived: with P control u = g(r - T) and leak d, steady error = d/(1+g) (here 5/(1+g)); never zero for finite g. Standard result in Astrom & Murray, Feedback Systems (steady-state error of proportional control is discussed in the PID-control chapter; the 'ch. 1 and 3' chapter numbers in the source look imprecise, builder may tidy the citation; the result is unaffected). |
| c2 | verified | node: Euler run dt 0.02, 250 steps gives 32.000, 35.999999, 36.5, 36.75 for gains 0,4,9,19, matching closed form (32+37g)/(1+g). |
| c3 | verified | Stated toy-model scope; true that real thermoregulation is not simple proportional control. |
