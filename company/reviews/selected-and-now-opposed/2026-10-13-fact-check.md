# Fact-check: selected-and-now-opposed (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | make() generates 1,500 people; stats(-6) gives r = +0.011 for everyone, consistent with independent normals. |
| c2 | verified | Sum of two N(0,1) is N(0,2): 1-Phi(1.5/1.414)=1-Phi(1.06)=0.145; stage: 216/1500 = 14.4%. |
| c3 | verified | node: seed 31 gives r=-0.445 at cut 0 (736, 49.1%) and -0.626 at cut 1.5 (216). Over 300 other seeds of 1,500: cut 0 mean -0.466 (-0.575 to -0.365); cut 1.5 mean -0.678 (-0.785 to -0.512); 200,000 people -0.462 and -0.671. Matches source. |
| c4 | verified | Berkson's paradox; Berkson (1946) Biometrics Bulletin 2(3): 47-53 is the correct citation. Algebraically, x+y>c with independent x,y induces negative correlation. |
| c5 | verified | Standard definition of Pearson r. |
