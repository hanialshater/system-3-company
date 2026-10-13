# Fact-check: temperature-reshapes (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; probs() and draw20() re-run in artifacts/scratch/fc-aiecongeo/tmp.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Scores 2,1,0 for mat, sofa, moon, as in WORDS. |
| c2 | verified | q_i = exp(z_i/T) / sum_j exp(z_j/T) is eq. 1 of Hinton, Vinyals & Dean 2015 (arXiv:1503.02531); probs() matches. |
| c3 | verified | Top-word chance 98.2 / 86.7 / 66.5 / 50.6 / 41.9 % at T = 0.25 / 0.5 / 1 / 2 / 4. |
| c4 | verified | Ratio mat:sofa 2.718 at T=1 and 7.389 at T=0.5 = 2.718^2 (squares); T=1000 gives 0.3337 / 0.3333 / 0.3330. |
| c5 | verified | Smallest chance on the stage is moon at T=0.25: 0.033% (shown '<0.1%'), still above zero. |
| c6 | verified | draw20 samples by the CDF; over 20,000 trials per temperature the mean counts equal 20p (e.g. T=0.5: 17.34 / 2.34 / 0.31 vs expected 17.34 / 2.35 / 0.32). Seed 31 stream is untuned; no claim in the reveal depends on its counts. |
| c7 | verified | Holtzman et al. 2020 (ICLR, arXiv:1904.09751) section 3.3 'Sampling with Temperature' divides logits by t before the softmax (confirmed from a web summary of the paper; I could not download the PDF from this environment). Single source for the sentence about real models; it is a standard fact, also true of Hinton 2015's distillation temperature. |

## Added (unverified)
- c8: 'A hot model is not more inventive' (interpretive generalisation to real models).
