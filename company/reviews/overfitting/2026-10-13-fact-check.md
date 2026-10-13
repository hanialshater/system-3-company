# Fact-check: overfitting, second check (2026-10-13)

Checker: fact-checker (different checker from the 2026-10-12 record, which verified c1-c5 and added c6-c10 after Demo.tsx v2). Scope: c6-c10. Method: transcript + Demo.tsx; generator copied as a data spec, fit re-implemented with my own normal-equation solver (not the earlier QR script) in artifacts/scratch/fc-aiecongeo/ovf.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | truth(t) = 8 + 20(0.15 + 2.8 t(1-t)) gives 11, 25, 11 C at t = 0, 0.5, 1; the axis is labelled 6am / noon / 6pm in Demo.tsx, so 'a smooth rise and fall' is accurate; noise is Gaussian, sd 0.09 x 20 = 1.8 C nominal (13-point realised sd 1.94). |
| c7 | verified, with a note | 6 bends gives exactly 0 training miss in 100% of 10,500 seeds; least-squares training error cannot rise with degree. The displayed mean absolute miss is not strictly monotone: it rose slightly (e.g. seed 5: 1.56, 1.57, 1.57 for 1-3 bends) in about 55% of seeds. 'Push toward zero' (a trend, not 'fall every time') holds. |
| c8 | verified | makeData draws independent Gaussian noise for each of the 13 readings; the held-out dots have their own draws. |
| c9 | verified | The transcript contains 'simulated data' in the legend, the aria-label and the reveal's 'These dots are simulated'. |
| c10 | verified | Reproduced seed 5: test miss by bends 4.14, 1.52, 1.55, 1.56, 2.97, 2.74, 5.09 (stage: 4.1, 1.5, 5.1). Seeds 1-500: 6 bends worse than the line in 38% (190/500) and worse than the best of 1-3 bends in 91% (455/500), matching the record. Two further independent batches of 5,000 seeds each: 39% and 39%, 93% and 93%; 6 bends loses to each single gentle curve (1, 2 or 3 bends) in 87-91% of seeds. So: the line result is a seed-5 feature (disclosed in the reveal), the 'usually loses to a gentle curve' claim holds generally. |

Seed disclosure (disclose-chosen-seeds): seed 5 is the lesson's draw; the reveal states the line result depends on the draw and what holds in general. Pattern satisfied.

Unrecorded claims: none.
