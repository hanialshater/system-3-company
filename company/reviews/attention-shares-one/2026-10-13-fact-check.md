# Fact-check: attention-shares-one (2026-10-13)

Checker: fact-checker (independent of the builder). Method: transcript + Demo.tsx text; model re-run in artifacts/scratch/fc-aiecongeo/attention.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Convention matches KEYS/attend(): unit arrows at 0/90/180, score = cos, softmax. |
| c2 | verified | Recomputed: scores 0.707, 0.707, -0.707; weights 44.58 / 44.58 / 10.84 %. Matches 44.6/44.6/10.8. |
| c3 | verified | Recomputed at 0 deg: 66.52 / 24.47 / 9.00 %. |
| c4 | verified | Weights sum to 1 within 1e-12 at every slider position (0..355 step 5); blend = sum w_i * arrow_i checked numerically. |
| c5 | verified | Vaswani et al. 2017 section 3.2.1, eq. 1 is Attention(Q,K,V)=softmax(QK^T/sqrt(d_k))V. Toy omits scaling as stated. |

No seeds involved (deterministic).

## Notes (not blocking)
- The reveal says that pointing at A gives A "only" 66.5%. True at 0 deg, but over the slider A's share peaks at 70.0% (query at 335 deg), so two thirds is not a ceiling for A. The stage does not claim a ceiling; the wording "still gets only" is fine for the 0 deg case. No fix required.
- Stage text is labelled as a toy; real-system sentence is accurate.

Unrecorded learner-visible facts found: none.
