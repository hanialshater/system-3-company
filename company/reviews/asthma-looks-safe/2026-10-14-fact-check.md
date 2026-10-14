# Fact-check: asthma-looks-safe (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (MODEL block, both rules, Model's view toggle, message line in every branch, record rows, locked state, reveal, predict; hook and recall), then claim text and support, then source fields. No Reset control and no animation in this lesson. Re-ran counts in node. No source host could be opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: ASTHMA_DIE_ICU has 2 of 50 (pc 4%), OTHERS_DIE (o mod 25 in {3,16}) has 12 of 150 (8%), total 14. Stage message before 'Model's view': 'Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%.' (0.2*100, 0.08*100, 0.04*100 print as 20, 8, 4 exactly). Counts are exact expected deaths: 0.04*50 = 2, 0.08*150 = 12. |
| c2 | disputed | Substance right: the stage's view of the old records gives asthma 4% < others 8%, and the reveal says the model 'ranked asthma as the safest group'. DISPUTED on the quote: the claim text quotes 'Model learned from the old records: asthma 4% risk, others 8%. Asthma = lowest risk.', which is not on the stage. Demo.tsx v1 prints "Model's view of the old records: asthma 4% risk, others 8%. Safest: asthma." The ledger, which the learner reads under 'Why trust this?', quotes a sentence that does not exist. Fix (builder): make the quoted string match the stage, or drop the quote. |
| c3 | verified | Own node: under 'Model decides care' the asthma deaths are ASTHMA_DIE_WARD, 10 of 50 = 20% (0.2*50 = 10); OTHERS_DIE is the same set under both rules, 12 of 150. Reveal prints MODEL.asthma = 10 of 50. The 2 ICU deaths (dots 7, 32) are inside the 10, so no dot switches from dead to alive. |
| c4 | verified | Convention: tag 'Toy pneumonia patients' is always on the stage; deaths come from constant arrays (ASTHMA_DIE_WARD, ASTHMA_DIE_ICU, OTHERS_DIE by modulus), with no RNG or seed anywhere in Demo.tsx. |
| c5 | verified | Derivation inside the toy: the old-records ranking (asthma 4%, others 8%) is an accurate description of past outcomes, yet acting on it moves asthma deaths from 2 to 10 because the records carried the effect of ICU care. That is the distinction the sentence states. Interpretive, consistent with the stage; no external fact. |
| c6 | unverified | RECORDED (unrecorded claim found): meta.json hook, first sentence, shown on the card before the stage. Read as real-world testimony (it comes before the toy is introduced). This is the known pneumonia-risk finding (Cooper et al. 1997 data; Caruana et al. 2015, KDD), but I could not open either. Builder: either cite an opened source, or mark the hook as the toy ('In these toy records, asthma patients die less'). |

**Result:** 4 verified, 1 disputed (c2, the claim quotes a stage string that does not exist), 1 recorded and held unverified (new c6, the hook, a real-world claim with no openable source).
