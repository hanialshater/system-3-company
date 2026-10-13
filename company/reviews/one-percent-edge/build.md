# Build note: one-percent-edge (demo-builder, 2026-10-13)

- Design: a ring of 100 dots (filled = new type) with the share and generation in the centre. Controls: "+10 generations", "Run to half", edge chips (5%, 10%, 1%), "Start over". Deterministic recursion p' = p(1+s)/(1+sp) from 1%.
- Brief check reproduced: 5% edge reaches half at generation 95 (94 = 49.8%, 95 = 51.0%). 10%: 49; 1%: 462. Question option "About 95" is computed from the stage's HALF[5].
- Brief asked for 200 dots; 200 overlap on a phone-sized ring, so 100 (1 dot = 1%).
- Gate: milestones "half-at-5" (Run to half at 5%) and "other-edge" (half-time seen at 10% or 1%; switching edge while at half shows that edge's half-time). QA path: +10 (gen 10, 1.6%), Run to half (95, and the stage says gen 48 was 9.5%), Edge 10% (49), Edge 1% (462), Start over. Every number in the reveal is on that path; the 10%/1% sentence only lists edges the learner tried.
- Model label on the stage while locked: "Toy: huge population, no sex."
- After screenshots: shortened the reveal so it fits under the stage on a phone.
- Claims c1-c5 unverified.
