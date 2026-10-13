# Fact-check: gradient-descent, second check (2026-10-13)

Checker: fact-checker, a different checker from the 2026-10-12 record (which verified c1, c2, c4, c6 and added c7, c8, c10 and c9 is from v2). Scope here: the claims still open. Method: transcript + Demo.tsx; independent re-implementation in artifacts/scratch/fc-aiecongeo/gd.mjs, which also replays message() over the whole slider grid (0.05..1.05 step 0.05) at 1, 2, 3, 5 and 10 hops. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | |1-2eta|^10 * 4 = 1.3947 for 0.05 and 0.95 (identical); 0.45 gives 0.0400 after two hops. |
| c5 | verified | Goodfellow et al. s11.4.1 ('if you have time to tune only one hyperparameter, tune the learning rate') and Bengio 2012 call it the most important hyperparameter. Two distinct sources. I did not re-open the books during this run; the quotes are from memory of both texts, so a human spot check of the section numbers is cheap insurance. |
| c7 | verified | eta=1: positions 4, -4, 4, -4, ... |
| c8 | verified | eta=0.5 lands on 0 in one hop; best on the slider grid is 0.5 (distance 0). |
| c9 | verified | Over eta 0.20..0.45 every hop is shorter than the one before at all 10 hops; the 'within 0.05' branch fires only when the displayed distance < 0.05. |
| c10 | verified | hop1 at 0.05 = 0.05*8 = 0.40; factors 0.9, -0.9, 0.1. |

## Added (unverified)
- c11: the 'Crawling: the hops are tiny' message (eta < 0.2). At eta 0.15 hops are 30% of the distance; wording concern.

Stage check: reveal's 'Bigger is not faster', 'Past 1 it drops below -1' and the 0.05/0.95 tie are exact. The model is the stage's own f(x)=x^2 and is labelled as 'this valley'.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c11 | disputed | The message 'Crawling: the hops are tiny.' fires for step sizes below 0.2 (factor above 0.6). At 0.15-0.19 the first hop is 1.2-1.5 of a 4.0 distance (30-38%), not tiny. Code behaviour is as stated; the displayed wording is not. Fix: 'Slow: each hop covers only a small share of the distance' or lower the threshold. |
