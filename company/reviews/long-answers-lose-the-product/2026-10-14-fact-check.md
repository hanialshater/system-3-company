# Fact-check: long-answers-lose-the-product (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (+1 token, All tokens, Per token toggle, slider 1-10 in both step and full modes, the message line, the winner marker, reveal with and without rec/cross; hook and recall), then claim text and support, then source fields. No Reset or animation. Re-ran numbers in node. Opened source for c5: Hugging Face transformers, main branch, fetched 2026-10-14 from raw.githubusercontent.com (src/transformers/generation/configuration_utils.py lines 229-233 and default at line 626; generation/utils.py beam update dividing log-prob by length**length_penalty). Scholarly hosts (arXiv etc.) unreachable.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: 0.5^2 = 0.25 -> pc '25%'; 0.85^10 = 0.19687 -> '19.7%'. The reveal uses rec, which check() sets only when L = 10 is complete; the question-case milestone requires that, so the reveal always reads 25% against 19.7%. |
| c2 | verified | Own node over n = 1..10: 0.85^n > 0.25 for n <= 8 (0.85^8 = 27.2%), false from 9 (23.2%) and 10 (19.7%); CROSS = 8. The reveal's 'At n tokens L won with x%' uses the last completed n <= 8, every one of which beats 25%; 'past 8 it always loses' holds since 0.85^n decreases. |
| c3 | verified | Derivation: whole(p, k) = p^k and every token chance is in (0,1), so each extra factor lowers the product; the stage shows this as the bar shrinks with each +1 token. 'Tends to' is the right strength: a longer answer with higher per-token odds can still win (n <= 8 here). |
| c4 | verified | Derivation: the geometric mean of k equal chances p is p, so per token L = 85% and S = 50% for every slider length 1-10; the stage prints 'per token: 85%' and '50%' with L marked more probable. |
| c5 | verified | Opened source: Hugging Face transformers (main, fetched 2026-10-14), GenerationConfig.length_penalty: 'applied as an exponent to the sequence length, which in turn is used to divide the score of the sequence. Since the score is the log likelihood of the sequence (i.e. negative), length_penalty > 0.0 promotes longer sequences'; default 1.0 (line 626), and the beam update divides log-probs by length**length_penalty, i.e. the per-token mean log-prob (log of the geometric mean). So a widely used real decoder applies this correction, and its docs state the reason (unnormalised log-likelihood favours short sequences). That exact search for the most probable output favours short outputs follows from c3. The NMT papers in the source field were not opened and are not the basis. |

**Result:** all five verified (c5 on opened decoder source code). No disputes.
