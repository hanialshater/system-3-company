# Build note: four-in-a-row-two-thirds

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #15 (NCM)

- Intent: the line A–B–C–D, a split bar under each deal with the fallback part hatched, and a strip of B's share by round with 2/3 ghosted. The B–C link is dashed and labelled "fallback". It is the cause the brief asks the stage to show: each inner person's outside option feeds the other's.
- Rule on the card: each round, every pair covers both fallbacks, then halves the rest. Round 0 has no fallbacks (50/50). B's fallback = 1 − C's share. Iteration: 0.5, 0.75, 0.625, 0.6875, 0.6563 … within $0.001 of 2/3 at round 9. I re-ran it in node, and Demo.tsx computes it.
- Round-by-round updating is a teaching device for the fixed point and is labelled a model. The balanced outcome itself is the fixed point; claim c2's source says so.
- Milestones: "stepped" (Next round, first in DOM) and "settled" (Run until settled, second). Reset is disabled at round 0, so pressing it always changes something.
- Kept out of learner text: brief claim 3 (laboratory results on 4-paths), which is flagged for a human source check.
- The reveal quotes the iteration values the learner saw. The 3-path comparison is one claimed sentence (c4).
- Not run (per dispatch): next build, QA, walkthrough, tsc. Typecheck and QA are still owed before review.

## Pre-flight v3

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-ncm-learner-r6.md`

Changes: the dashed "⅔" target line is gone; the strip has neutral ticks 0.50 / 0.75 / 1.00. Options are worded at one precision ("About $0.50" / "About $0.67" / "About $0.90"). Two trace rows under the chart print every round reached ("B gets: .500 .750 .625 .688 ...", "B's fallback: .000 .500 .250 .375 ..."); Reset does not clear them. The chip now shows where the fallback comes from each round ("B's fallback = $1 − C's last share $0.750 = $0.250"). "hatched = fallback" moved below the bar labels so it no longer overprints them. The reveal quotes the trace rows and uses the stage's rounding ($0.667 / $0.333 at round 9).

1. **Title and hook.** "In a line of four, who holds the power?" / "The centre of three takes nearly all. In a line of four, how much do the inner two get?" No share is named for the line of four. No.
2. **Options.** "About $0.50" / "About $0.67" / "About $0.90". Same wording, two decimals each. Yes.
3. **Locked stage.** Chip "Each pair covers both fallbacks, then halves the rest"; the four nodes with "?" above them; the dashed B–C "fallback" link; no split bars; the empty strip with ticks 0.50 / 0.75 / 1.00 and the title "B's share by round"; readouts Round ? / B's fallback ? / B gets ?. No ⅔ line and no trace rows. Nothing matches "About $0.67".
4. **Reveal values.** "$0.750, then $0.625, then $0.688": (b) rounds 1-3, which the milestone settled passes through (maxSeen ≥ 9), printed in the "B gets" trace row. "settled at $0.667 by round 9", "A kept $0.333": (b) milestone settled (Run until settled goes to round 9), in the trace row and the round-9 readouts. "When C got $0.750 in round 1, B's fallback fell to $0.250 in round 2": (b) both in the trace rows (C's share equals B's; claim c7). "line of three ... nearly all": told context, claim c4.
5. **QA path.** DOM order: Next round (stepped, round 1), Run until settled (settled, round 9), Reset (round 0): 2 of 2. When the reveal opens after Reset both trace rows still list rounds 0-9 and the strip still draws the line to round 9.
6. **Reset.** Reset sets the round to 0 but not maxSeen, so the trace rows and strip stay. Expected reveal after the QA path: "The trace rows show B's share swing: $0.750, then $0.625, then $0.688, closing in until it settled at $0.667 (two thirds) by round 9. A kept $0.333. / B's fallback is $1 minus C's share the round before, and C's share is always B's. When C got $0.750 in round 1, B's fallback fell to $0.250 in round 2. C's fallback is B, so C is never desperate either. Each inner person's outside option feeds the other's, and the swings shrink to the split where B's share = 1 − half of C's: two thirds. / In a line of three, the centre's partners have no other deal, so the centre can take nearly all. Power depends on the whole network, not on counting partners. / A model: ..." (Read from the code; this batch does not run QA. The reveal is near the 120-word budget.)

## Pre-flight v4 (demo-builder, 2026-10-14, wave G, r7 ncm-learner)

Fixes: (top, text budget) the reveal's second paragraph is cut to the round-1/round-2 fallback example and "Each inner person's outside option feeds the other's"; dropped "C's fallback is B, so C is never desperate either" and "the swings shrink to the split where B's share = 1 − half of C's: two thirds" (told, and the trace already shows the settling). The reveal is now about 110 words including the model line (counted by hand). (minor) the strip's right-hand tick labels are right-aligned at x 318 and the strip ends at x 290, so "1.00" / "0.75" no longer clip at 320. Not changed: after Reset the bars read $0.500 while the trace rows and strip keep rounds 0-9 (r7 called it acceptable).
1. Title and hook: "In a line of four, who holds the power?" / "The centre of three takes nearly all. In a line of four, how much do the inner two get?" No share named.
2. Options: "About $0.50" / "About $0.67" / "About $0.90". Same precision.
3. Locked stage: chip "Each pair covers both fallbacks, then halves the rest", "?" nodes, dashed B–C link, empty strip with ticks 0.50 / 0.75 / 1.00. Nothing matches $0.67.
4. Reveal values: $0.750, $0.625, $0.688, $0.667 by round 9, A $0.333: (b) milestone settled, in the "B gets" trace row. $0.750 in round 1, $0.250 in round 2: (b) trace rows. Line of three: told (c4).
5. QA path: Next round (stepped), Run until settled (settled), Reset. Trace rows and strip line survive Reset and are on stage at the reveal.
6. Reset: reveal after the QA path: "The trace rows show B's share swing: $0.750, then $0.625, then $0.688, closing in until it settled at $0.667 (two thirds) by round 9. A kept $0.333. / B's fallback is $1 minus C's share the round before, and C's share is always B's: when C got $0.750 in round 1, B's fallback fell to $0.250 in round 2. Each inner person's outside option feeds the other's. / In a line of three, the centre's partners have no other deal, so the centre can take nearly all. Power depends on the whole network, not on counting partners. / A model: the "balanced outcome" rule, not a forecast of any real negotiation."
- meta.json 3 -> 4; no claim text changed (c7's text already matches the shortened sentence). Not run: build, QA, walkthrough, tsc.
