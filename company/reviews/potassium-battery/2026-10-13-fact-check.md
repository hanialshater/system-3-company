# Fact-check: potassium-battery (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx: DOT = 5 mM, MARK = 10 mV, KT at 310.15 K; stage label 'Toy: only K+ leaks, at 37 C. 1 dot = 5 mM.' |
| c2 | verified | Alberts et al., MBoC, Table 11-1 (typical mammalian cell, K+ 140 mM inside, 5 mM outside; BioNumbers 106428 indexes this table). Other tables give 139/4; 'about' holds. |
| c3 | verified | node with CODATA R, F: RT/F = 26.727 mV at 310.15 K; 26.727 ln(5/140) = -89.06 mV; stage MV() shows -89 mV; options -9 / -89 / -890. |
| c4 | verified | Electrochemical equilibrium at the Nernst potential: zero net flux (Hille, Ion Channels of Excitable Membranes, ch. 1). |
| c5 | verified | ln(1) = 0 (node); reveal prints MV(nernst(140)) = 0 mV. |
| c6 | verified | Demo.tsx leak(): v + (e - v)/2. Derivation of 'tiny fraction': a 10 um cell, 1 uF/cm2, 90 mV moves Q = CV = 2.8e-13 C = 2.9e-18 mol, vs 7.3e-14 mol K+ inside (0.14 M x 5.2e-13 L): about 4e-5. Membrane time constant RC is milliseconds. |
