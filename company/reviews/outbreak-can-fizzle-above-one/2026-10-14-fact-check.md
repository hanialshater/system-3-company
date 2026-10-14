# Fact-check: outbreak-can-fizzle-above-one (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own fixed-point iteration of q = e^{R(q-1)} from q = 0 (scratchpad fc21/outbreak.mjs): R = 1.5 gives 0.4172. Reveal '41.7%' matches. |
| c2 | verified | Same iteration: R = 2 0.2032, R = 3 0.0595, R = 0.9 converges to 1. Reveal 'about 20%', 'about 6%', 'below 1 every chain ends' match (for R <= 1 the PGF fixed point in [0,1] is 1). |
| c3 | verified | Own mulberry32 + Knuth Poisson mirror of Demo.tsx outbreak(), seed 218 + 10R, CAP 2,000: R = 1.5 after 1 run 0 died, after 100 37, after 101 38, after 1,000 418; R = 0.9 1000/1000, R = 2 237, R = 3 48. Reveal quotes the learner's own tally (mainDied/nMain). |
| c4 | verified | e^-1.5 (1 + 1.5) = 0.5578. Own run: first case infected 0 or 1 in 49 of 101 and 547 of 1,000 at R = 1.5. Stage readout uses o.first <= 1. |
| c5 | verified | Follows from c1-c2 (q = 0.417 > 0 at R = 1.5). Chapter placement checked from my own knowledge, book host blocked and not opened: Easley & Kleinberg (2010) ch. 21 is 'Epidemics', with the branching-process model and R0 in its opening sections; placement confident. |
| c6 | verified | Lloyd-Smith et al. (2005) Nature 438(7066):355-359, doi 10.1038/nature04153: abstract (seen via web search result; nature.com and PubMed blocked) says models with individual variation predict 'disease extinction more likely and outbreaks rarer but more explosive'. Own check: negative-binomial offspring, R = 1.5, extinction q = 0.457 (k = 10), 0.667 (k = 1), 0.768 (k = 0.5), 0.932 (k = 0.1), all above the Poisson 0.417. |
| c7 | verified | Demo.tsx seedFor = 218 + round(10R), one stream per R in streams map; loop runs while total <= 2,000, so a chain passing 2,000 counts as taking off; stage line 'Seed N. Over 2,000 cases counts as taking off.' |

**Result:** 7 verified, 0 disputed, 0 withdrawn.
