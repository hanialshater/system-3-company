# Fact-check: count-the-marked-fish (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Lincoln-Petersen: N ~ M*C/R from R/C ~ M/N; standard (Seber 1982, The Estimation of Animal Abundance, exists). |
| c2 | verified | 100*50/5 = 1000. |
| c3 | verified | Stated toy model; closed population, random mixing and no mark loss are the standard assumptions. |
| c4 | verified | node: the Demo's netSample with seeds 11,4,15,2,20 gives 5,4,7,9,3 marked and estimates 1000,1250,714,556,1667. The chosen seed 11 is disclosed in the source. See the added claim about 'cluster near' in the reveal. |
| c5 (added) | unverified | Reveal: 'Nets wobble, so one estimate is a guess; several cluster near the true 1,000.' (recorded for an independent check) |

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | Independent check of the pass-8 concern. The stage's five estimates are 1000, 1250, 714, 556, 1667 (0.56x to 1.67x the truth). My own node run (20,000 nets of 50 drawn without replacement, different seed): only 53.0% within +/-25% of 1,000, mean of estimates 1,252 (Lincoln-Petersen biased upward at R about 5), 74 nets caught no marked fish. 'Several cluster near the true 1,000' is not what the stage shows. Fix (builder): 'several scatter around the true 1,000' (as c4 says), or average them ('their average, 1,037, lands near 1,000'). |
