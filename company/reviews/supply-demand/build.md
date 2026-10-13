# Build notes: supply-demand

## v2 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md. No FATAL was raised.

Key state (milestone, `minInteractions` = 1): `capped` (the learner pressed "Cap at $4").

| Finding | What I did |
|---|---|
| FC1 / L: no sign of a toy model before the answer | The question opens "In a toy town…", and the chart carries "Toy town: made-up numbers". The full caveat stays in the reveal. |
| FC2 "The most loaves change hands at $6" reads as a market fact | Now "In this model … the most loaves change hands at $6". c8 also gets "In this model" (unverified). |
| FC3 / L3 cap silently dropped | The cap is now a state of its own. When it is on, a red "price cap $4" line is drawn, the slider stops at $4 ("Price per loaf (cap: $4 at most)"), the cap button reads "Lift the cap", and the price button is disabled while the cap holds the shortage ("40 loaves short, and the cap stops the price rising."). Only "Lift the cap" removes it. New claim c10 (unverified). |
| L1 title gives the answer | Title is now "Make bread cheaper by law?". Hook: "A town caps the price of bread so more people can afford it. How many loaves sell then?" (no "what could go wrong"). |
| L2 reveal before the cap | Gated on pressing the cap. |
| L4 what a point on a line means | Line labels now read "buyers want" and "bakers bake". |
| L5 shortage / surplus never named on stage | Gap labels now read "shortage: 40" / "surplus: 30". New claim c11 (unverified). |
| L6 "Let price move" is vague | Now "Shortage: price rises $0.50" or "Surplus: price falls $0.50". |
| L7 buttons clipped in the reveal state | Not fixed: the kit's reveal panel takes the space. I added `overflow-y: auto` to the stage wrapper; the reveal screenshot still shows the bottom row cut by the stage edge. Routed to platform-engineer (same as gradient-descent). |
| L8 risk of "price caps never help" | The muted line now ends "It shows one cost of a cap, not whether a cap is worth it." |

Trade-off for the QA contract: the contract presses the slider ($6 → $7, a surplus), then "Cap at $4" (milestone), then finds the price button disabled because the cap holds. So the gate opens on its path. Pressing the cap always sets the price to $4, even from below $4, so that the key state is the same every time.
