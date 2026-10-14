# Computer Systems & Networks briefs (cm-cs-systems)

Ranked briefs for this strand, in the same format as `cs.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next cs` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Course: NCM (2026-10-14)

Accepted by cm-cs-systems: answer re-run in node (grid search: share 0.5 on B, average 45, ratio 1.333); prediction is a real surprise (the 30 option tempts); no duplicate of new-road-slower-trip (Braess, adds a road) or web-bow-tie-reach.

#### 1. selfish-routes-cost-a-third-more · concept: cs:price-of-anarchy · core · demand 2 · rank 11 · format: Single card (split slider drives live chart)
- Sections: ch. 8 · domain: cs
- Audience: students in a networks course and curious adults (vertical audience). Learner knows: drivers pick the faster road (traffic equilibrium) / does not know: that the selfish equilibrium can be worse on average than a planner's split, by up to 4/3 with roads whose delay grows in proportion to traffic.
- Misconception: If every driver picks the fastest route, the average trip is as short as it can be.
- Prediction (stage text ≤ 25 words): "Road A always takes 60 min. Road B takes 60 min × its share of drivers. Selfish drivers average 60. Can a planner beat that?" options: A. No, 60 is best / B. Yes, to 45 / C. Yes, to 30 (answer: B (half on each: 45 min)).
- Check: Node: `8.3 {"equilibriumAvg":60,"optimumShareOnVariable":0.5,"optimumAvg":45,"ratio":1.333}`.
- Reveal (one line): Everyone piles onto B because it is never slower than A, which makes it 60 min; sending half to A cuts B to 30 and the average to 45.
- Planned claims:
  1. With everyone on road B the trip takes 60 minutes on both roads, and no driver gains by switching. support: derivation; source: node.
  2. Splitting drivers half and half gives an average of 45 minutes, the minimum. support: derivation; source: node grid search.
  3. With delays that grow in proportion to traffic, the selfish equilibrium's total travel time is at most 4/3 of the best possible. support: citation (theorem); source: E&K ch. 8; Roughgarden and Tardos (2002), J. ACM 49(2); Pigou (1920) example. Attribution: fact-checker confirms.
- curriculum: `{"primary":"cs:price-of-anarchy","also":["economics:externality"],"prerequisites":["cs:weighted-shortest-path"],"level":"core","strand":"systems","references":[{"work":"easley-kleinberg-2010","chapter":8}],"tags":["traffic","equilibrium","price of anarchy"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: new-road-slower-trip (batch 1, Braess) adds a road and everyone gets slower; this one has no new road and asks how far selfish routing is from the best split.
