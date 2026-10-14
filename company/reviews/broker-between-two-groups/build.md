# Build note: broker-between-two-groups

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 6

- Graph exactly as the brief: complete group of 6 (Hana and her 5 friends) as a hexagon on the left, complete group of 4 as a square on the right, Bo in the gap linked to 2 of Hana's friends (the two right-hand hexagon corners) and 2 of the other group (the two left-hand square corners), not to Hana. 11 people, 25 links.
- Controls in DOM order: Hana, Bo (highlight that person's friends and links; dashed red lines join friend pairs who are strangers; readouts Friends / Stranger pairs / On paths of), Next path (traces one shortest path for the next of the 24 cross-group pairs, Hana's first, caption "Path k of 24 between the groups: through Bo"). Milestones: saw-hana, saw-bo, traced-a-path (minInteractions 3). The selected person's chip is active-disabled so no press is dead.
- Show the why: the cause (Bo's friends are strangers to each other; every cross path needs him) is drawn: the 4 dashed stranger pairs and the traced path through Bo. The reveal points at both.
- Re-run (own code, node 2026-10-14, then the Demo's own functions): degrees 5,6,6,5,5,5,4,4,3,3,4; stranger pairs Hana 0, Bo 4; betweenness Hana 0, Bo 24, Hana's friends 1 and 2 = 10 each, the other group's 6 and 7 = 7 each; all 24 cross pairs have every shortest path through Bo. Matches the brief (24, 0, next highest 10).
- Finding for the brief: Hana is not the person with the most friends on this stage. Bo's two friends in Hana's group have 6 (Hana 5). That is forced by the brief's edges and actually helps against the misconception, so the reveal uses it ("the two people with the most friends (6 each) score only 10"); the "score" is fractional betweenness (20 pairs x 1/2), claimed as c3.
- Not run: build, typecheck, QA, walkthrough. Draft.
- The brief asks to keep this graph different from cs/cut-the-busiest-link; that lesson is not on this branch, so I could not compare.
