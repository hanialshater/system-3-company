# Chance & Randomness briefs (cm-probability-chance)

Ranked briefs for this strand, in the same format as `probability.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next probability` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Networks, Crowds, and Markets, batch 1 (session 2, 2026-10-14)

Source: vertical review `company/rituals/records/2026-10-14-vertical-review-ncm.md` §3, strategy doc `company/product/verticals/networks-crowds-markets.md`. All numbers below were re-run by me in node (mulberry32; scripts were scratch files, rules stated in each Check so a builder can rebuild them). **Section numbers are unconfirmed**: the book site is blocked by the proxy (HTTP 403 on CONNECT), so each § follows the 2010 table of contents as recalled, and the fact-checker confirms them against the free PDF. Dedupe: grepped `src/demos/**/meta.json` and `company/domains/briefs/*.md` for giant component, six degrees, small world, rich-get-richer, preferential attachment, MusicLab, popularity: no hits; `node tools/overlap.mjs` lists no pair in these areas. New concepts were added to `content/curriculum/probability.json` with `"subarea": "chance"` (`giant-component`, `small-world-shortcuts` after it, `rich-get-richer`).

### 1. the-giant-appears · concept: giant-component · core · demand 2 [exploration]
- curriculum.references: easley-kleinberg-2010 ch. 2 §2.2 (§ unconfirmed). Note: §2.2 defines the giant component and shows it in real networks; the random-link threshold at average degree 1 is Erdős–Rényi (1960), not derived in ch. 2. The lesson is a model of random links and says so.
- Learner knows: that people can be linked in pairs, and that "connected" means a chain of links / does not know: that random links make one huge group appear suddenly, not gradually.
- Misconception: Doubling the number of random links roughly doubles the size of the biggest connected group.
- Prediction: "200 people, with 100 random friendships (one friend each, on average). The biggest connected group is 36 people (18%). Add 100 more random friendships. The biggest group is now about:" options A about 36% / B about 55% / C about 75% (answer: C). Check (node, mulberry32, seed 1): G(n,m) on n = 200 with m distinct random pairs added one at a time, same world kept as links are added. Largest component by union-find: 100 links (average degree 1.0) = 36 people (18.0%); 200 links (degree 2.0) = 148 people (74.0%). Other chips on the same world: 50 links (0.5) = 9 (4.5%); 150 links (1.5) = 110 (55.0%). Over seeds 1 to 20: means 3.9%, 16.8%, 59.1%, 79.4% at degree 0.5, 1, 1.5, 2 (at 2.0 the 20 seeds range 72.0% to 85.5%); 94.0% at 3.0 (91.5% to 96.0%). Large-n theory S = 1 - exp(-cS): 58.3% at 1.5, 79.7% at 2.0, 94.1% at 3.0. At n = 1,000 the means are 1.1%, 10.9%, 58.5%, 79.6%, so the knee sharpens with n. The ask's 57% at 1.5 came from a different pairing rule (my G(n,m) gives 59.1%); builder uses the rule above.
- Key state: the learner has stepped the link chips 0.5, 1, 1.5, 2 (average friends) on one fixed world and seen the biggest group, coloured, jump from a handful of dots to most of the crowd, with the share shown as a number.
- Interaction: format: simulation run. 200 dots in a fixed layout, link chips 0.5 / 1 / 1.5 / 2 / 3 (links are added in place, never redrawn), the biggest group coloured and its share printed. Seed shown. No text beyond the question and the share. Chips enabled after the prediction; the 74% is not on stage before it.
- Payoff: Connection does not grow in proportion to links: past about one friend each, the small groups join into one giant group that holds most people. Model of random links, not a claim about any real network.
- Planned claims: (1) in the lesson's seed-1 world, 100 random links give a biggest group of 18% and 200 links give 74% (support: simulation, rule stated in the meta; source: the lesson's code); (2) across 20 seeds the mean is 16.8% at 100 links and 79.4% at 200 (simulation); (3) large-n limit at average degree 2 is 79.7%, solving S = 1 - e^(-2S) (derivation, `Erdős and Rényi 1960, On the evolution of random graphs, Publ. Math. Inst. Hung. Acad. Sci. 5: 17-61`; fact-checker confirms); (4) average degree = 2 x links / people (arithmetic); (5) the book shows giant components in real networks (ch. 2 §2.2; confirm; do not state numbers for real data).
- Format: Simulation run (default, kit support today). Spec needed: no. Illustrations: none.
- Notes: the nearest lesson is `friends-have-more-friends` (sampling on a network, not connectivity); no overlap. Builders keep the dot layout fixed so adding links cannot make the picture jump (the reveal must show the state the learner left).

### 2. few-shortcuts-shrink-the-world · concept: small-world-shortcuts · core · demand 2 [exploration]
- curriculum.references: easley-kleinberg-2010 ch. 20 §20.2 (§ unconfirmed). Prerequisite concept: giant-component (a connected network).
- Learner knows: that people can be linked and that a "step" is one link / does not know: that a handful of random long links cuts the typical distance by half or more while neighbourhoods stay tight.
- Misconception: To shrink distances you must rewire a large part of the network.
- Prediction: "100 people in a ring; each knows the 2 people on each side (200 links). It takes 12.9 steps on average to get from one person to another. Add just 5 random long-distance links. The average becomes about:" options A about 12 steps / B about 7 steps / C about 3 steps (answer: B). Check (node, mulberry32, ring lattice N = 100 with neighbours at ring distance 1 and 2, shortcuts are random extra pairs not already linked, all-pairs BFS): 0 shortcuts = 12.88 steps exactly; seed 1, same world as shortcuts are added: 1 = 10.34, 5 = 6.78, 20 = 4.85. Seeds 1 to 20 means: 1 shortcut 10.80 (range 10.17 to 12.60), 5 = 7.38 (6.38 to 8.29), 20 = 4.69 (4.47 to 4.86). Clustering (share of a person's contacts who know each other, averaged over people), seed 1: 0.500, 0.496, 0.480, 0.435; seeds 1 to 20 means 0.500, 0.496, 0.482, 0.434. A random network of this size and degree has clustering about degree/N = 0.04 (approximation).
- Key state: the learner has pressed the chips 0, 1, 5, 20 on one fixed ring, seen the average steps fall (12.9, 10.3, 6.8, 4.9) while the clustering readout barely moves (0.50 to 0.44).
- Interaction: format: simulation run. Ring of 100 dots on a circle (stage must fit 390 px: dot 6 px), shortcut chips 0 / 1 / 5 / 20 add arcs in place, readouts "average steps" and "clustering" (two numbers, the second with a ghost mark at the random-network level 0.04). Seed shown. The BFS is computed on the stage.
- Payoff: A few long links make the world small without breaking the local circles: distance drops by about 60% while clustering falls by 13%. Model: shortcuts are added, not rewired.
- Planned claims: (1) 12.88 steps with no shortcuts and 6.78 / 4.85 with 5 / 20 in the lesson's seed-1 world (support: simulation, exact BFS, rule stated); (2) over 20 seeds 7.38 and 4.69 (simulation); (3) clustering 0.500 to 0.435 at 20 shortcuts (simulation); (4) the effect is Watts and Strogatz (1998), Nature 393: 440-442; **empirical/model source: needs a human source check** (their model rewires links; this lesson adds them, as in the Newman-Watts variant: say "adds", do not attribute the added-link rule to W-S); (5) ring distance of 12.88 is the exact all-pairs BFS value for N = 100, reach 2 (arithmetic, checked).
- Format: Simulation run (default). Spec needed: no. Illustrations: none.
- Notes: nearest lessons: `handshakes-halve` (counting links), `friends-have-more-friends`; neither is about distance. Ask builder: precompute the shortcut sequence from the seed so chip 5 contains chip 1's link (nested), as I did.

### 3. same-songs-different-hits · concept: rich-get-richer · stretch · demand 2 [exploration]
- curriculum.references: easley-kleinberg-2010 ch. 18 §18.3–18.4 (§ unconfirmed).
- Learner knows: that some songs are better liked than others / does not know: that when people follow what others chose, the same songs end up with very different outcomes in different worlds.
- Misconception: The best song will always rise to the top; a hit is a sign of quality alone.
- Prediction: "8 songs, all about as good (the best only 70% more appealing than the worst). 1,000 people in each of 8 separate worlds pick one, each person more likely to pick songs already picked by others. In the worst of the 8 worlds, the best song finishes:" options A 2nd of 8 / B 4th of 8 / C 7th of 8 (answer: C). Check (node, mulberry32, seeds 1 to 8 for the 8 worlds): appeal = 1.0, 1.1, ..., 1.7 for songs 1 to 8; each of 1,000 listeners in turn picks song i with probability proportional to appeal_i x (1 + downloads_i so far). Seed results, best song's finish: 3, 1, 7, 1, 4, 1, 1, 3, so lowest = 7th (seed 3: 33, 40, 7, 38, 214, 158, 482, 28 downloads). Top song's share of downloads: 34.9, 38.7, 48.2, 46.3, 36.9, 44.5, 42.9, 43.9% (range 35 to 48%). Without copying (probability proportional to appeal only), same seeds: best song finishes 2, 1, 2, 1, 2, 1, 2, 1 (lowest 2nd); top share 14.7 to 17.6%. So seeds 1 to 8 reach 7th with copying and 2nd without. Robustness over 500 blocks of 8 worlds: with copying the best song's lowest finish is 5th or lower in 73% of blocks and 7th or 8th in 38%; without, 4th or higher in 98%. The best song's share has mean 28.1 and sd 19.1 with copying, 15.8 and 1.2 without (2,000 worlds), min 0%. The best song wins a world in about 45% of copy worlds (4 of 8 in seeds 1 to 8) and 4 of 8 without too, so do not use "how many wins" as the prediction.
- Key state: the learner has viewed all 8 worlds with copying on, then toggled copying off, and seen the same 8 songs settle into nearly identical bar charts with the best song 1st or 2nd.
- Interaction: format: simulation run, small multiples. 8 mini bar charts (2 x 4, each about 80 x 70 px, 8 bars, best song's bar in colour), toggle "see what others picked: on / off", seed shown, the rule line visible ("pick chance = appeal x (1 + earlier picks)"). Readout: best song's finish, per world, under each chart. Answer not visible before the prediction (charts empty until unlocked). **Needs an interaction-designer spec** for 8 small multiples at 390 px (S2-20).
- Payoff: When people copy each other, early luck compounds: the same eight songs gave a 35-48% hit in every world, but the best song finished as low as 7th. Without copying it never fell below 2nd. A toy model, not a measurement of any market.
- Planned claims: (1) in the lesson's worlds (seeds 1 to 8, rule stated) the best song's lowest finish is 7th with copying and 2nd without (simulation); (2) the top song takes 35-48% of downloads with copying and 15-18% without (simulation); (3) in the model every song's pick chance depends on its appeal and on the downloads so far (the rule, stated on stage); (4) **empirical, needs a human source check**: Salganik, Dodds and Watts (2006), "Experimental study of inequality and unpredictability in an artificial cultural market", Science 311(5762): 854-856: when participants could see others' downloads, success was more unequal and less predictable, but the best songs rarely did very badly and the worst rarely did very well. Do not quote study sizes or percentages until checked; (5) the book's treatment is ch. 18 §18.3-18.4 (confirm).
- Format: Simulation run with small multiples (needs spec). Illustrations: none.
- Notes: the toy shows unpredictability of a song's finish; it does not reproduce the study (48 songs, many listeners), so the lesson must not say it does. Parameter choice was scanned in node (1.0 to 1.7 appeal and 1,000 listeners give clear contrast; 200 listeners or a wider appeal range blur it because the no-copy world is noisy too). Nearest lesson: `average-that-never-settles` (heavy tails, different mechanism; propose the ch. 18 §18.2 reference for it, not a new brief).

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
  3. Greedy routing is fast only when the long-link exponent equals the dimension (1 for a ring). support: citation (theorem); source: Kleinberg (2000), Nature 406 and STOC; E&K ch. 20 (MIT reading list cites ch. 20). Attribution: fact-checker confirms.
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
