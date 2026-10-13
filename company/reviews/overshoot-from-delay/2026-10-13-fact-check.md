# Fact-check: overshoot-from-delay (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx sim(): N' = r N (1 - N(t - tau)), start and history 0.5; Hutchinson (1948), 'Circular causal systems in ecology', Ann. N.Y. Acad. Sci. 50: 221-246. Stage toy label present. |
| c2 | verified | node, own Euler sim: years 30-60 max 2.895, min 0.0722 at dt 0.01; dt 0.001 gives 2.897, 0.0731, so not a step-size artefact. |
| c3 | verified | node: max 1.0095, min 0.9973 (dt 0.01); 1.0094, 0.9973 (dt 0.001). |
| c4 | verified | Hopf threshold r tau = pi/2 for the Hutchinson equation (Murray, Mathematical Biology I, s.1.4). node at r=1, 400 years: amplitude 0.0001 at r tau 1.5, decaying 0.024 -> 0.021 at 1.55, sustained 0.61 at 1.59. 2 swings, 0.8 settles. |
| c5 | verified | Mechanism follows from the delay term; the lemming caveat is a hedge (no specific cause asserted) and is not on the stage. |
