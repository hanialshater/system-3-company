# Build note: enemies-allow-three-camps

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 7 (as edited at acceptance)

- Intent: six people A-F on a hexagon, all 15 links drawn: friends thick green solid, enemies thin red dashed (dash carries the meaning without colour). Pairs AB, CD, EF are the three camps of the question. Fixed rule line under the picture: "Banned: two friendly links, one hostile."
- Controls in DOM order: Next triangle (highlights the next of the 20 triangles and names its type), Check all 20, then Camps 2 / 3 / 6 (3 is the question's split, active-disabled at start). Readouts: Checked k/20, Banned, All enemies. Milestones: checked-all, other-split (minInteractions 2). QA path reaches both.
- Show the why: doesNotKnow is "allow all-enemy triangles and any number of camps works". On the stage the camps chips change the number of camps while Banned stays 0 and All enemies goes 0 / 8 / 20; the reveal says why (two friends of yours share your camp, so they are friends) and names the all-enemy triangle as what the strict rule forbids.
- Re-run (own code, node 2026-10-14, then the Demo's own tally()): 3 camps: 20 triangles, 0 banned, 12 one-friendly, 8 all-enemy. 2 camps (3+3): 0 banned, 0 all-enemy, 18 one-friendly, 2 all-friend. 6 camps: 0 banned, 20 all-enemy. 5 people: 52 of 1,024 sign patterns weakly balanced, 16 strongly balanced (matches the brief; not used on the stage or in the reveal, so not claimed).
- Prediction text used verbatim from the edited brief (25 words); I kept "Six people in three pairs" because the stage shows the pairs only after unlocking colour-free (dashes vs solid), and the question must stand alone.
- Brief dependency: "build after enemy-of-my-enemy" (batch 1). That lesson is not on this branch, so learner.knows (the strict rule, at most two camps) is not yet taught in the feed; the reveal restates the strict rule in one claimed sentence (c5).
- Not run: build, typecheck, QA, walkthrough. Draft.
