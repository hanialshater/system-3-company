# Fact-check: throw-it-fast-enough (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: sqrt(g R)=7906 m/s; circular speed at the 10 km peak 7899 m/s, so the 7.9 km/s stop (7900) just clears it (flights at 7897+ do not land in the model). |
| c2 | verified | Re-ran src/demos/physics/throw-it-fast-enough/model.ts: lands 36, 212, 686, 1269, 2245, 3209 km; 7.9 km/s loops in 84.6 min (about 85). |
| c3 | verified | node: sagitta 8000^2/(2R)=5.02 m; 0.5*9.81*1=4.9 m. |
| c4 | verified | Stage chip 'No air. 10 km peak. Heights x40.' and muted line. |
| c5 | verified | node: sqrt(GM/6771 km)=7.67 km/s; NASA quotes 17,500 mph (about 7.8 km/s, rounded up), so 'about 7.7' is right. Wording 'because gravity is weaker at that height' is a simplified reason (the orbit is larger and g falls faster than r grows). |
