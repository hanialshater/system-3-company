# Build note: keep-one-of-a-stream (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #77 and spec company/design/specs/keep-one-of-a-stream.md (+ .svg).

## What was built
- Four item cards (arrived solid, waiting dashed, kept has a thick outline and a "kept" tag). Exact bars under each (computed 1/i, fraction printed). Item 1's chain "1 × 1/2 × 2/3 × 3/4" builds under the bars. A draw line explains the latest seeded draw; "seed 1" shown. "Run 1,000 streams" adds a tally tick on each bar and the count under it.
- Controls in DOM order (3, as spec): Next item · Rest of the stream (120 ms per item) · Run 1,000 streams.
- Milestones (minInteractions 2): stream-end, thousand. The reveal quotes the TALLY constant the stage shows.

## Checks run
- Node and the Demo's own constants: exact chances [1/2,1/2], [1/3 x3], [1/4 x4]; seed 1 draws 0.627 (stay 1), 0.003 (3 replaces), 0.527 (stay 3); tallies 236, 250, 257, 257.

## Seed choice (disclosed in claim c5)
- Seed 1 is the first seed tried. The spec's placeholder seed 7 gives 257, 247, 249, 247 (chi-square 0.27), flatter than typical, so I did not use it. Seed 1's chi-square is 1.18; the median over seeds 1-200 is 2.41, so seed 1 is a little flatter than median but not hand-picked.

## Choices to challenge
- Tally counts are drawn under the bars, not above, because the exact-fraction label sits at the same height as the tick.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-fair-shuffle-r6.md)
- Top finding (the trade-off told, not shown): under every arrived bar the stage now draws its two factors, gets in × stays ("1/3 × 3/4" for item 3 after 4), labelled "Under bars: gets in × stays". The reveal points at item 3's pair. New claim c7.
- Unknown length told, not shown: a 5th card slot ("5th?") and a control "A 5th item arrives" (enabled at item 4). The same rule takes every bar to 1/5; a dashed mark keeps the 1/4 level each bar held at item 4. Milestone "fifth" (minInteractions 3).
- "Run 1,000 streams" runs at the current length (4 or 5) and the reveal quotes the tally drawn on stage.
- Leak found in pre-flight: title and hook said "fairly" / "a fair item"; both replaced (see 1 below).
- Minor: the rule line adds "Bars: chance each is kept."
- Cards narrowed to 60 px with 8 px gaps to fit five columns in the 340 viewBox.

## Pre-flight v2
1. Title and hook: v1's "Keep one, fairly, without looking ahead" / "Pick a fair item ..." told the learner the rule is fair, which gives 1/4 for 4 items. v2: "Keep one item, never look ahead" / "You can hold one item and can't see how long the stream is. Who ends up kept?" Neither says the rule is fair or names a chance.
2. Options: "1/2" · "1/4" · "1/8". All fractions at the same precision.
3. Locked stage: item 1 kept with a full bar labelled "1", items 2-4 and "5th?" dashed and empty, "Item 1 stays: 1", "Item 1 arrives and is kept.", seed 1. Nothing shows 1/4.
4. Reveal values: 1/2, 2/3, 3/4 and 1/4 (milestone stream-end; still visible as the chain line "Item 1 stays: 1 × 1/2 × 2/3 × 3/4 × 4/5" and the dashed 1/4 marks); item 3's "1/3" and "3/{k}" (current state, the factor drawn under item 3's bar: "1/3 × 3/5" after the 5th item, and the reveal says 3/5); the tally (current state, TALLY[k] drawn under the bars); 1/5 (milestone fifth, the bar labels).
5. QA path: Next item (k = 2), Rest of the stream (k = 4 after about 240 ms; stream-end), A 5th item arrives (fifth), Run 1,000 streams (thousand). Four presses reach all 3 milestones. The question's case (4 items) is stream-end, and its 1/4 level stays on stage as the dashes.
6. Reset: there is no Reset control and nothing clears k or the run. Reveal from that run: "Item 1 had to survive three draws: 1/2, then 2/3, then 3/4. Multiply them: 1/4. Under the bars, item 3 got in with 1/3 and stays with 3/5: each later item had a smaller chance to get in, but fewer draws left to survive. Every bar reached 1/4 at item 4 (the dashes). / Your 1,000 streams of 5 kept the items 195, 197, 191, 214, 203 times. / Then a 5th item came, and the same rule took every bar to 1/5. It held one item in memory and never needed to know the length."
