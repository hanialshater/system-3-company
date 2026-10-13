# Build notes: gradient-descent

## v2 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md. No FATAL was raised.

Key states (milestones, `minInteractions` = 2): `tiny-run` (a finished 10-hop run at step size ≤ 0.1) and `big-run` (a finished 10-hop run at ≥ 0.95, which zigzags or flies off).

| Finding | What I did |
|---|---|
| FC1 "Close to the bottom in a few hops" shown at 0.2 with 2.40 left | Removed. Messages now describe the hop just taken: "Heading down; each hop is shorter than the last." until the ball is within 0.05, then "Now within 0.05 of the bottom." c9 rewritten to the new text (unverified). |
| FC2 c3 source 1.395 vs stage 1.39 | Source now prints 1.3947 and says the stage shows 1.39. c3 back to unverified because its source changed. |
| FC3 c5 quote nobody read | Dropped the verbatim quote from c5's source and kept the section pointers. c5 back to unverified. |
| L1 "slope" undefined | The question glosses it ("how steep it is under the ball"), and a live line shows "Next hop = 0.05 × slope 8.00 = 0.40". New claim c10 (unverified). |
| L2 reveal after one hop | Gated on a tiny run and a too-big run (above). |
| L3 no side-by-side for the 0.05 / 0.95 tie | One-tap "Run 10 at 0.05 / 0.45 / 0.95 / 1.05" buttons, plus a record of every finished run ("10-hop runs: 0.05 → 1.39 · 0.95 → 1.39 …"). This also fixes the "nine nudges on a phone" complaint. |
| L4 algebra dense; best step never named | The reveal gives the factor for each size the learner tried (0.9, −0.9, 0.1) and names 0.5 as the fastest. c8 updated (unverified). |
| L5 the picture shrinks on reveal | Not fixed: the kit's reveal panel takes the space (`.reveal` max-height in globals.css), and on a phone the Step row is cut off at the stage edge. I added `overflow-y: auto` to the stage wrapper, but the reveal screenshot still clips it, so the stage edge is doing the clipping. Needs a kit layout change by platform-engineer. |
| L6 hook states the misconception | Kept on purpose: the hook is the tension. The reveal now says it outright ("Bigger is not faster"). |

The reveal is written from the runs the learner finished: it quotes their tiny and big step sizes and distances, and says "exactly as far as 0.05" only when both 0.05 and 0.95 were run.

Trade-off for the QA contract: the default step is 0.25 so that every preset button changes the stage. The contract presses the slider (0.25 → 0.35), then the presets 0.05 (tiny-run), 0.45, 0.95 (big-run), 1.05, then Reset, so the gate opens on its path. Step and Run 10 no longer count as interactions unless they finish a run that reaches a milestone.
