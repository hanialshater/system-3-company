# Build note: one-odd-loop-blocks-two-camps

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 8 (as edited at acceptance)

- Graph as the brief: ring A-F (A top, clockwise; brief nodes 0-5) plus cross link A-D (brief chord 0-3) drawn vertically, so the two small loops read as "Right loop" A-B-C-D and "Left loop" A-D-E-F. Enemies A-B and D-E (brief 0-1, 3-4). Friends green solid, enemies red dashed.
- Controls in DOM order: Big ring, Right loop, Left loop (each highlights its loop with a wide band; readout "Loop's enemy links: k, odd/even"), Try all 64 splits (brute force; colours people by the best labelling and thickens its broken links; readout "Splits that work"), Move enemy D-E to C-D (toggle, label flips to "Move it back to D-E"). Milestones: odd-loop (a small loop viewed as given), tried-all (brute force as given), minInteractions 2. Moving back re-awards them, so a learner who moves first cannot get stuck.
- Show the why: the cause (an odd loop) is on the stage as the highlighted loop with its count, and the best attempt's single broken link is the cross link A-D. The reveal says what walking round an odd loop does and points back at the counts. The reveal reads the lifted `moved` state, so it quotes the moved result only if the learner moved the link.
- Re-run (own code, node 2026-10-14, then the Demo's tryAll()): as given, ring 2, right loop 1, left loop 1; 0 of 64 labellings valid; minimum 1 broken link (the chord). Moved to C-D: loops 2, 2, 0; 2 of 64 valid ({A,D,E,F} vs {B,C} and its swap). Matches the edited brief.
- Not run: build, typecheck, QA, walkthrough. Draft.
