# Build note: pay-for-the-harm-you-do

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md, Course NCM #2

- Intent: one SVG. Top: Y and Z's value without X ($65, fixed) and with X; the dashed gap with a bracket is "harm = X pays". Bottom: X's profit for every bid $0 to $10, current bid highlighted, honest $7 labelled. The gap and the flat-topped profit chart are the stage's stand-ins for the doesNotKnow (pay the harm, so honest is best).
- Start at bid $0 (X out: both bars equal, harm $0), so the learner makes the gap appear.
- Milestones: "honest" (bid $7) and "shaded" (bid $1 to $5). Presets in DOM order: Bid $7, Bid $3, Bid $10, then the slider, so QA reaches both milestones.
- Rules disclosed on the chip and in the reveal: Y bids $6, Z bids $1 (honest), ties go to X, a $0 bid takes no slot. Without the tie rule bid $6 is ambiguous; with it the profit row is [0,30,30,30,30,30,35,35,35,35,35], matching the brief.
- Numbers re-run in node (payments X 35, Y 5, Z 0; others 65 vs 30). Claim 3 says "no bid beats" (per the brief's edit), not "unique best".
- Readouts and bars hidden while locked. Not run here: build, tsc, QA (caller's instruction).

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-second-price-r6.md`

Changes: a sums line under the bars writes the totals the bracket rests on, computed from the same slot orders the bars draw ("Without X: Y $60 + Z $5 = $65 · With X: Y $30 + Z $0 = $30" at the honest bid), so the $35 is a subtraction the learner can do. The bracket caption is clamped inside the frame (it clipped at Bid $3). The chip now says Y and Z bid their values. The reveal points at the sums line.

1. **Title and hook.** "Pay for the harm you do" / "Two ad slots, three bidders. If the winner doesn't pay their own bid, what do they pay?" The title restates the rule the question already gives ("paying the harm caused"); neither names an amount. No.
2. **Options.** "$70" / "$35" / "$60". All whole-dollar amounts. Yes.
3. **Locked stage.** Chip "Model: Y and Z bid their values, $6 and $1; ties go to X"; the two empty bar tracks labelled "without X" / "with X"; the empty "X keeps, for each bid" chart with bid labels 0-10 and "$7 honest"; readouts "?"; no sums line, no bracket. Nothing matches "$35".
4. **Reveal values.** "$65", "$30", "Z gets nothing", "The gap you saw, $35": (b) milestone honest (Bid $7 is the first control); after the QA path the bid is $8, which shows the same sums and the same $35 bracket. "not the $70": the question's own numbers (7 x 10). "bids of $6 to $10 tied at $35", "$1 to $5 ... $30": the keep chart draws every bid once unlocked; milestone shaded (Bid $3) highlights a $30 bar. "Y pays $5 and Z $0", "VCG ... dominant strategy": told context, claims c2 and c4.
5. **QA path.** DOM order: Bid $7 (honest), Bid $3 (shaded), Bid $10, slider (two ArrowLeft from 10: $9, $8): 2 of 2 in the first two presses. At the reveal the bid is $8: top slot, bracket "harm = X pays $35", sums line "... = $65 · ... = $30", keep chart with the flat $35 top.
6. **Reset.** There is no Reset. Expected reveal after the QA path: "The line under the bars: without X, Y and Z get $65. With X on top, Y drops to the second slot and gets $30, and Z gets nothing. The gap you saw, $35, is X's price, not the $70 X's own bid would charge. / No bid beat the honest $7: bids of $6 to $10 tied at $35, while $1 to $5 dropped X to the second slot and $30. X's bid only picks the slot; the others set the price. / By the same rule Y pays $5 and Z $0. This is the VCG mechanism: honest bidding is a dominant strategy. / A simplified model: ..." (Read from the code; this batch does not run QA.)
