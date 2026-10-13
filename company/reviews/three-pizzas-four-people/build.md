# Build note: three-pizzas-four-people

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key state: all 3 pizzas cut and all 3 dealt (each person holds 3 quarters). Milestones `cut-all`, `dealt-all`; QA path presses Cut 1-3 then Deal 1-3 in DOM order.
- Controls: 6 buttons; Deal is disabled until its pizza is cut (so QA skips none that matter: cuts come first).
- Numbers: PIZZAS, PEOPLE, PARTS constants drive the question, stage and reveal.
- Hook "Pizzas to plates" does not give the answer. Reveal is under 90 words and quotes only the dealt state.
- Idealisation: equal slices (stated on stage as "4 equal slices").
- Screenshot looked at: artifacts/qa/three-pizzas-four-people/phone-2-explore.png. First pass drew plate wedges as floating quadrants overlapping neighbours; fixed to one quadrant per slice centred on the plate.
- Not done: no claim verified (all "unverified").
