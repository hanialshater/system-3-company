# Chance & Randomness briefs (cm-probability-chance)

Ranked briefs for this strand, in the same format as `probability.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next probability` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Course: NCM (2026-10-14)

Accepted from company/courses/ncm/briefs.md (Jonah). Answers re-run in node by cm-probability-chance on 2026-10-14. References name the chapter only.

#### near-and-far-links-find-the-way · concept: probability:decentralized-search · core · demand 3 · rank 2 · format: Simulation run (exponent chips 0/1/2)
- Sections: ch. 20 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: small worlds have short paths (few-shortcuts-shrink-the-world, batch 1) / does not know: that people can *find* short paths using only local knowledge only if long links are spread across distance scales (probability ∝ 1/d on a ring).
- Misconception: Purely random long links are best for finding people, since they reach farthest.
- Prediction (stage text ≤ 25 words): "2,000 people on a ring, each with one long link. Messages go to whoever is closest to the target. Which long links route fastest?" options: A. Uniformly random / B. Chance ∝ 1/distance / C. Chance ∝ 1/distance² (answer: B (about 30 steps vs 38 and 219)).
- Check: Node: 5 seeded networks × 200 random pairs each: `20.3 {"N":2000,"meanGreedySteps":{"q0":38.425,"q1":29.493,"q2":218.797},"ringOnlyMean":500}`.
- Reveal (one line): Random links exist but are useless for aiming; links that are too local never jump. 1/distance gives links at every scale, so each step can halve the distance.
- Planned claims:
  1. In the stage's model (ring of 2,000, one long link each), greedy routing averages about 30 steps with 1/d links, 38 with uniform links and 219 with 1/d² links. support: simulation; source: node, 5 seeds × 200 pairs (cm-probability-chance re-run, 2026-10-14: 29.5, 37.8, 219.1; quote rounded figures, builder re-runs with the lesson's own generator).
  2. Without long links the average is 500 steps. support: derivation; source: ring of 2,000: mean distance N/4.
  3. Greedy routing is fast only when the long-link exponent equals the dimension (1 for a ring). support: citation (theorem); source: Kleinberg (2000), Nature 406 and STOC; E&K ch. 20 (sections unconfirmed; MIT reading list cites ch. 20). Attribution: fact-checker confirms.
  4. Milgram's letter-forwarding studies showed that people can find short chains using only local knowledge. support: citation; source: Travers and Milgram (1969), Sociometry 32(4). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:decentralized-search","also":["cs:graph-shortest-path"],"prerequisites":["probability:random-walk"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":20}],"tags":["small world","search","networks"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: few-shortcuts-shrink-the-world (batch 1) shows short paths *exist*; this one asks whether people can *find* them. cs/a-star-heads-for-goal uses a global map.

#### weak-links-hold-it-together · concept: probability:tie-strength-overlap · core · demand 2 · rank 13 · format: Simulation run (network removal curve) · **needs spec**
- Sections: ch. 3 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: strong ties sit inside groups and weak ties between them (ch. 3) / does not know: that removing the weakest links first shatters a network far faster than removing the strongest first.
- Misconception: Cutting the strongest, closest relationships does the most damage to a network.
- Prediction (stage text ≤ 25 words): "60 people, 6 friend groups. Delete the 20% of links with fewest shared friends, or the 20% with most. Which breaks it apart?" options: A. Fewest shared friends / B. Most shared friends / C. Both about the same (answer: A (largest group about 10–30 of 60 vs 50–60 across seeds)).
- Check: Toy model, mulberry32 seed 33: 6 groups of 10 (links inside with prob 0.5) plus 12 between-group links; tie strength measured by neighbourhood overlap. Node: `3.3 {"edges":133,"startGiant":60,"removed":[13,27,40],"weakFirst":[49,28,10],"strongFirst":[60,60,59],"lowOverlapEdges":32}`.
- Reveal (one line): Links with few shared friends are the bridges between groups; remove them first and the network falls into pieces, while removing close ties leaves it whole.
- Planned claims:
  1. In the stage's model, removing the 20% of links with the lowest overlap leaves a largest connected group of well under half the 60 people; removing the highest-overlap 20% leaves 50–60. support: simulation; source: node, builder pins one seed and quotes its exact figures (rule disclosed on card). cm-probability-chance re-run over 5 seeds with a fresh generator: weak-first 10–29, strong-first 50–60; the exact 28/60 of seed 33 did not reproduce with another generator, so do not quote it unless the builder's code gives it.
  2. Neighbourhood overlap of a link = shared friends ÷ friends of either end (excluding each other). support: definition; source: E&K ch. 3.
  3. A study of a national mobile-phone network found the same pattern: removing weak ties first fragments it much sooner. support: citation; source: Onnela et al. (2007), PNAS 104(18). **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:tie-strength-overlap","also":[],"prerequisites":[],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":3}],"tags":["networks","weak ties","robustness"]}`
- Needs interaction-designer spec: yes.
- Differs from nearest: the-giant-appears (batch 1) adds random links until a giant group forms; this one removes links by strength and watches it break. news-comes-from-acquaintances is one bridge on a hand-drawn graph.

#### the-long-tail-adds-up · concept: probability:long-tail · core · demand 2 · rank 16 · format: Single card (cutoff slider drives live chart)
- Sections: ch. 18 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: a few hits sell a lot / does not know: that under a Zipf law the 99% of items outside the top 1% can still take over a third of all sales.
- Misconception: Outside the hits, sales are negligible.
- Prediction (stage text ≤ 25 words): "100,000 items, sales falling as 1/rank (Zipf). The top 1,000 take what share of all sales?" options: A. About 99% / B. About 62% / C. About 10% (answer: B (61.9%; the other 99,000 take 38%)).
- Check: Node: `18.5 {"top100":0.429,"top1000":0.619,"top10000":0.81}`.
- Reveal (one line): The top 1% sell 62%, but the other 99,000 items, each tiny, add up to 38%: a store that can stock them all gains a lot.
- Planned claims:
  1. With sales proportional to 1/rank over 100,000 items, the top 1,000 take 61.9% of sales and the top 100 take 42.9%. support: derivation; source: node harmonic sums.
  2. The term 'long tail' for niche sales was popularised by Anderson (2004/2006). support: citation; source: C. Anderson, Wired (2004); The Long Tail (2006); E&K ch. 18. Attribution: fact-checker confirms.
  3. The 1/rank sales curve is a model, not data for any store. support: derivation; source: lesson rule.
- curriculum: `{"primary":"probability:long-tail","also":[],"prerequisites":["probability:power-law-scaling"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18}],"tags":["power law","Zipf","long tail"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: power-law-scaling (this course) is about the shape; this lesson sums the tail. No lesson teaches Zipf sums.

#### ten-times-links-hundred-times-rarer · concept: probability:power-law-scaling · core · demand 2 · rank 29 · format: Single card (axis toggle: linear vs log–log)
- Sections: ch. 18 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: most pages have few links, a few have many / does not know: that in a power law with exponent 2, ten times the links makes a page 100 times rarer at every scale, a straight line on log–log axes.
- Misconception: Pages with 1,000 links are so rare they effectively don't exist, as in a bell curve.
- Prediction (stage text ≤ 25 words): "The share of pages with k links falls like 1/k². How much rarer are pages with 1,000 links than pages with 100?" options: A. 10 times / B. 100 times / C. Millions of times (answer: B (100 times)).
- Check: Node: `18.2 {"ratio100vs1000":100,"ratio10vs1000":10000,"logLogSlope":-2}`.
- Reveal (one line): Each tenfold step in links costs the same factor, 100, so on log–log axes the curve is a straight line of slope −2, and huge pages are rare but real.
- Planned claims:
  1. If the share of pages with k links is proportional to 1/k², pages with 1,000 links are 100 times rarer than pages with 100. support: derivation; source: node.
  2. A power law appears as a straight line on log–log axes, with slope equal to minus the exponent. support: derivation; source: log of c·k^−a is log c − a·log k.
  3. Web in-link counts have been measured to follow roughly a power law with exponent near 2.1. support: citation; source: Broder et al. (2000), Computer Networks 33; E&K ch. 18. **Needs a human source check (empirical); keep out of learner text until checked.**
- curriculum: `{"primary":"probability:power-law-scaling","also":["probability:heavy-tails"],"prerequisites":["probability:heavy-tails"],"level":"core","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18}],"tags":["power law","log scale"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: probability/average-that-never-settles (heavy tails, Cauchy) shows an average that won't settle; this one shows the scale-free shape itself. It takes a ch. 18 reference row too.

#### more-copying-bigger-stars · concept: probability:preferential-attachment-exponent · stretch · demand 1 · rank 42 · format: Simulation run (copy-share chips 0/50/90%)
- Sections: ch. 18 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: rich-get-richer from batch 1 (same-songs-different-hits) / does not know: how strongly the share of copying controls the size of the biggest winner.
- Misconception: Copying other people's links changes the biggest page a little, perhaps doubling it.
- Prediction (stage text ≤ 25 words): "10,000 new pages each add one link. Raise copying (link to what another page links to) from 0% to 90%. The biggest page's links?" options: A. About the same / B. About double / C. Hundreds of times more (answer: C (12–18 → about 4,500–6,300 across 3 seeds)).
- Check: Node, seeds 1–3: `18.7 {"copy0":[{"max":12,...},{"max":13,...},{"max":14,...}],"copy50":[{"max":161,...},{"max":309,...},{"max":261,...}],"copy90":[{"max":3440,"top1pctShareOfLinks":0.844,...},{"max":4894,...},{"max":6104,...}]}`. Top 1% of pages hold 7% of links at 0% copying, 26–27% at 50%, 84% at 90%.
- Reveal (one line): Copying links to whatever is already linked sends new links to the rich in proportion to their wealth, and the tail grows from a dozen to thousands.
- Planned claims:
  1. In the stage's model of 10,000 pages, the most-linked page has about 12–18 links with no copying and about 4,500–6,300 with 90% copying (3 seeds). support: simulation; source: node, seeds 1–3 (cm-probability-chance re-run: 12/18/12 and 6277/4536/5121; builder pins the lesson's own generator and quotes its figures).
  2. At 90% copying the top 1% of pages hold about 84–86% of links; with no copying about 7%. support: simulation; source: node.
  3. In this copying model the share of pages with k in-links falls roughly like k^−(1 + 1/c), with c the copying share: exponent 3 at c = 0.5, about 2.1 at c = 0.9. support: citation (analysis); source: E&K ch. 18 advanced section; Kumar et al. (2000). Attribution: fact-checker confirms.
- curriculum: `{"primary":"probability:preferential-attachment-exponent","also":[],"prerequisites":["probability:heavy-tails"],"level":"stretch","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":18}],"tags":["power law","preferential attachment"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: same-songs-different-hits (batch 1) shows unpredictability across worlds; this one shows how copying strength sets the size of the tail.

#### every-scale-equally-likely · concept: probability:distance-scales · stretch · demand 1 · rank 51 · format: Single card (exponent toggle drives bar chart)
- Sections: ch. 20 · domain: probability
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: 1/d long links route fastest (near-and-far-links-find-the-way) / does not know: why: with chance ∝ 1/d, a link is equally likely to land 1–2, 2–4, … or 256–512 away.
- Misconception: With 1/d links most links are very short.
- Prediction (stage text ≤ 25 words): "On a ring of 1,024, links land at distance d with chance ∝ 1/d. More likely: 2–4 away or 256–512 away?" options: A. 2–4 away / B. 256–512 away / C. About equal (answer: C (12.2% vs 10.2%)).
- Check: Node: `20.7 {"ring":1024,"q1_shareByScale_1to2_2to4_etc":[0.147,0.122,0.111,0.106,0.104,0.103,0.102,0.102,0.102],"q0_shareByScale":[0.002,0.004,0.008,0.016,0.031,0.063,0.125,0.25,0.5]}`. Uniform links put 50% in the farthest band.
- Reveal (one line): Each band is twice as wide but each distance half as likely, so every doubling band gets about 10–12%: whatever the distance, a link to halve it is equally likely.
- Planned claims:
  1. With chance ∝ 1/d on a ring of 1,024, each doubling band of distances gets 10–15% of links. support: derivation; source: node sums.
  2. With uniform links, half of all links land in the farthest band (256–512). support: derivation; source: node.
  3. This equal mass per scale is why the 1/d rule gives fast greedy search. support: citation; source: E&K ch. 20 advanced section; Kleinberg (2000). Attribution: fact-checker confirms.
- curriculum: `{"primary":"probability:distance-scales","also":[],"prerequisites":["probability:decentralized-search"],"level":"stretch","strand":"chance","references":[{"work":"easley-kleinberg-2010","chapter":20}],"tags":["small world","log scale"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: Pairs with near-and-far-links-find-the-way (build after it): that lesson shows the speed, this one shows the reason.
