# Fact-check: brick-on-its-side (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Amontons' laws of dry friction: f=mu*N, independent of apparent area; real-contact-area explanation (Bowden and Tabor) is standard. |
| c2 | verified | node: 0.4*9.81*[1,2,3,4]=3.92, 7.85, 11.77, 15.70 N; stage prints 7.8 (toFixed rounds 7.848 to 7.8). |
| c3 | verified | node: 24*12=288, 24*4=96, 12*4=48; 96/288=1/3. |
| c4 | verified | Constant velocity means zero net force. |
| c5 | verified | Amontons' rule fails for rubber/soft materials where adhesion depends on area (standard tribology). |

Stage check: Reveal's sentence 'Less area means more pressure on each bit of it, and the two effects cancel' is the standard simplified account of Amontons; not wrong, simplified.
