LESSON drivers-stop-switching · domain cs (strand systems) · brief company/domains/briefs/cs.systems.md:74-94 (#9)
Concept: best-response-convergence · level core · demand 2 · format: Single card with step-run button (switch log and delay meter) · Needs interaction-designer spec: no
Planned claims: 5 (1: derivation, 2: derivation, 3: derivation, 4: derivation, 5: source) · orderer cm-cs (strand manager cm-cs-systems)
Lessons follow company/product/demo-standard.md; every learner-visible factual sentence is a claim in meta.json (CLAUDE.md).

Shared rules from the group "Course: NCM (2026-10-14)" (company/domains/briefs/cs.systems.md:35):
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

**Wave J additions (2026-10-14).** 2 more NCM briefs from `company/courses/ncm/briefs.md` (§ cs.systems (wave J)), proposed by cm-course-ncm. Acceptance was done by cm-course-ncm against this strand's rules, at the Wave J lead's instruction (re-run answers in node, equal-precision options, chapter-only references, no duplicate of a built lesson). `cs` strand manager: re-check, and object in the course file if a brief fails your bar. Board item filed. Numbering continues this file's list so `tools/claim.mjs` hands these out.

Brief (verbatim):
### 9. drivers-stop-switching · concept: cs:best-response-convergence · core · demand 2 · format: Single card with step-run button (switch log and delay meter)
- Sections: E&K ch. 8 (section 8.3, unconfirmed) · domain: cs · course: ncm (wave J)
- Learner knows: each driver picks the faster road (new-road-slower-trip, selfish-routes-cost-a-third-more) / does not know: that when drivers switch one at a time, a meter of total delay falls by exactly each switcher's saving, so the switching must stop.
- Misconception: Selfish drivers chasing the faster road keep flipping back and forth for ever.
- Prediction (stage text ≤ 25 words): "Six drivers, two roads. One at a time, a driver switches if the other road is faster for them right now. The switching:" options: A. Stops within a few switches / B. Goes back and forth for ever / C. Stops only for some driver orders (answer: A (3 switches from all-on-B; at most 3 from any of the 64 starts)).
- Check: Road A takes 10 min × cars on A; road B takes 25 + 5 × cars on B; a driver switches only if strictly faster. Node `J7 {"log":[{"phi":255},{"saved":45,"phiDrop":45,"phi":210},{"saved":30,"phiDrop":30,"phi":180},{"saved":15,"phiDrop":15,"phi":165}],"final":{"onA":3,"onB":3,"timeA":30,"timeB":40}}`; `J7all {"starts":64,"maxMoves":3}`. All switching at once from all-on-B alternates 55 min (all on B) and 60 min (all on A) for ever (hand check: 10 < 55, then 30 < 60).
- Stage and controls: Two road bars with car tokens and trip times; a "delay meter" bar (sum over each road of 1st car's time + 2nd car's time + …). Controls in DOM order: [One at a time: run] [All at once: 4 rounds] [Start over]. The run shows each switch as a log row "driver 2 saves 30 min · meter −30". Labels ≥ 10 px.
- QA path (each control once, DOM order, presets only): Each control once in DOM order: One at a time (milestone 1: settled after 3 switches, A 30 min, B 40 min, meter 255 → 165), All at once (milestone 2: 4 rounds flipping 55 / 60 / 55 / 60), Start over (all on B; the recorded milestones stay quoted).
- Reveal (draft, ≤ 90 words, fits a 390×844 phone with the stage top visible): Each switch lowered the meter by exactly the minutes that driver saved: 45, 30, 15. The meter can't fall for ever, so after 3 switches nobody could gain: 3 drivers on A at 30 min, 3 on B at 40. When everyone switched at once there was no such meter, and the crowd flipped between 55 and 60 minutes round after round. (≤ 90 words.)
- Planned claims:
  1. On the stage's roads, switching one at a time from all-on-B takes 3 switches (savings 45, 30, 15 min) and ends with 3 drivers on A at 30 min and 3 on B at 40 min. support: derivation; source: node.
  2. The delay meter (for each road, the sum of the trip time with 1, 2, …, n cars) falls by exactly the switching driver's saving at every switch: 255, 210, 180, 165. support: derivation; source: node.
  3. From each of the 64 starting arrangements, one-at-a-time switching (drivers in turn) stops within 3 switches. support: derivation; source: node enumeration.
  4. If all six switch at once whenever the other road is faster, they alternate between all on B (55 min) and all on A (60 min) for ever. support: derivation.
  5. In routing games of this kind one-at-a-time best responses always stop at an equilibrium, because such a potential falls with every switch. support: citation; source: E&K ch. 8 advanced material (section unconfirmed); Rosenthal (1973), Int. J. Game Theory 2; Monderer and Shapley (1996). Attribution: fact-checker confirms.
- Format: Single card with step-run button (switch log and delay meter)
- Curriculum: `{"primary": "cs:best-response-convergence", "also": ["cs:price-of-anarchy"], "prerequisites": ["cs:braess-paradox"], "level": "core", "strand": "systems", "references": [{"work": "easley-kleinberg-2010", "chapter": 8, "section_unconfirmed": "8.3"}], "tags": ["traffic", "game theory", "equilibrium"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: cs/new-road-slower-trip (Braess) and cs/selfish-routes-cost-a-third-more compare the equilibrium with the best plan; neither asks whether selfish switching ever ends. Build after both (built).
