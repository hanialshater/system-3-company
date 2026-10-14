# Build note: pay-for-the-harm-you-do

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md, Course NCM #2

- Intent: one SVG. Top: Y and Z's value without X ($65, fixed) and with X; the dashed gap with a bracket is "harm = X pays". Bottom: X's profit for every bid $0 to $10, current bid highlighted, honest $7 labelled. The gap and the flat-topped profit chart are the stage's stand-ins for the doesNotKnow (pay the harm, so honest is best).
- Start at bid $0 (X out: both bars equal, harm $0), so the learner makes the gap appear.
- Milestones: "honest" (bid $7) and "shaded" (bid $1 to $5). Presets in DOM order: Bid $7, Bid $3, Bid $10, then the slider, so QA reaches both milestones.
- Rules disclosed on the chip and in the reveal: Y bids $6, Z bids $1 (honest), ties go to X, a $0 bid takes no slot. Without the tie rule bid $6 is ambiguous; with it the profit row is [0,30,30,30,30,30,35,35,35,35,35], matching the brief.
- Numbers re-run in node (payments X 35, Y 5, Z 0; others 65 vs 30). Claim 3 says "no bid beats" (per the brief's edit), not "unique best".
- Readouts and bars hidden while locked. Not run here: build, tsc, QA (caller's instruction).
