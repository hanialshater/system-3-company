# Fact-check: patrol-feedback-loop (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; run() re-implemented in artifacts/scratch/fc-aiecongeo/pfl.mjs. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rule matches run(): start 6/5, patrol goes to the district with >= records (A on ties), only it logs one incident. Labelled 'simplified' on the stage. |
| c2 | verified | 20 patrols all to A: 26 vs 5, 26/31 = 83.87%. Holds for any starting lead of 1 or more (checked 2..29 vs 1..a-1). |
| c3 | verified | Turns, A first: 10 patrols each, 16 vs 15, 51.61%. |
| c4 | verified | Lum & Isaac 2016, Significance 13(5):14-19 and Ensign et al. 2018, PMLR 81 (FAT* 2018) both analyse the feedback loop in predictive policing; two distinct studies by different authors. Both are simulation/analysis, not measurement of a deployed system; the reveal says 'Studies ... describe the same runaway loop', which is what they do. |

Stage check: 'B's 5 never grew, though its true rate was the same all along' true by construction and stated as the toy's premise in the question. Unrecorded claims: none.
