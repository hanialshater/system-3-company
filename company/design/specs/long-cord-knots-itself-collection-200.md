# long-cord-knots-itself: interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff

Format: existing **Simulation run**, specifically seeded draws from published approximate probabilities, not simulated cord physics. Keep the prepared prediction's standard experiment: 30 cm box, 1 revolution/s, 10 s; 3 m strings knot about half the time in that setup. Do not generalise that probability to any cord or bag.

## One representation

Use a responsive 360 × 230 SVG with a plain string in a box above a compact 20-slot outcome tray. Knot/no-knot outcomes use a small crossing symbol versus an open loop, not colour alone. A free-end passage through a loop is shown as a diagrammatic mechanism inset inside the same box. When clipped, the endpoints join and the cord may still bunch; do not show magically straight storage or connect it to powered equipment.

Keep two stored trial trays in the same lower band: Short and Long, each a tally and 20 marked outcomes. A clipped trial replaces the current box view, while those free-end tallies persist. This is one trial representation reused for two conditions, not an unrelated probability chart.

## Controls in DOM order

Initial condition: length 0.3 m; free ends; no trial yet. All controls exist while locked.

| Order | Visible label | Action and observable response |
| --- | --- | --- |
| 1 | Once | Draw one trial at the current length and update the current tray |
| 2 | 20 short | Choose 0.3 m, free ends, run/store a fresh 20-trial batch |
| 3 | Length slider | Range 0.3…4 m, step 0.1; change the drawn string length and current probability |
| 4 | 20 long | Choose 3 m, free ends, run/store a fresh 20-trial batch |
| 5 | Clip ends / Free ends | Toggle joined endpoints; the current box changes, free-end snapshots stay |
| 6 | 20 times | Draw/store 20 trials for the current condition; in clipped mode show zero new true knots |

The named batch controls clearly choose a length and run it; aria-labels may say “Set 0.3 metres and tumble 20 times” and “Set 3 metres and tumble 20 times”. They are real trial actions, not hidden answer setters. Each batch is synchronous or settles within 450 ms. A repeated run uses the next deterministic random draws and an observable batch/trial count, even when its tally happens to be identical.

The normal QA path is Once at 0.3 m → 20 short → slider nudges to 0.5 m → 20 long at 3 m → Clip ends → 20 times clipped. Required free-end tallies remain visible after clipping; a closed trial does not erase the evidence for the prediction.

## Probabilities, milestones and disclosure

Milestones: `short-20`, `long-20`; `minInteractions=2`. Each means 20 *actual sampled trials* in the named free-end condition. One trial, clipping alone or changing length does not earn a milestone. Record length, count, knotted count and seed for each batch.

Use `mulberry32` with a disclosed fixed integer seed. The household builder acknowledged seed 17 and model parameters of 0 observed knots below 0.46 m and 55% at 3 m in the 0.30 m box, 1 rev/s, 10 s setup, pointing to Raymer & Smith Table 1. This acknowledgment is not independent verification. The fact-checker must validate the inputs against full text; any interpolation between tested lengths is an explicit approximation claim, not a newly measured result. Disclose any seed selection made to produce the expected visual story. No speed or tumbling-duration control is in this brief.

The clipped condition is a mathematical model: an already unknotted closed loop cannot acquire a new true knot without passing through itself. It can still tangle/bunch. Do not attribute clipped-string testing to Raymer & Smith. Illustrate a closed loop, not a clamp squeezing the middle of an open cord.

## Stage copy budget

Suggested worst-state vocabulary, 24 words:

> Sampled model; seed 17. 30cm box, 1turn/s, 10s. Once 20 short Length 3m 20 long Clip ends 20 times Knots: short 0/20; long 10/20.

The sample tallies are layout placeholders, not required outcomes. Use the actual run. Prefer compact unit notation to extra explanatory prose; accessible descriptions can expand it to standard units. If a Current tally is added, replace another label rather than exceeding the budget. All answer tallies/probabilities show `?` while locked.

## Proposed reveal body

> Your 20 short trials made {shortKnots} knots; your 20 long trials made {longKnots}. This samples one experiment's setup: a 30 cm box, one turn per second, ten seconds. Longer strings in that setup knotted around half the time, not every time.
>
> A free end can pass through a coil. Joining the ends closes that route to a new true knot, although the cord can still bunch up. The clipped case is knot theory, not the published experiment.

Keep this body plus the kit's answer verdict under 90 words; trim the repeated setup if the actual option text is long. Omit “floppier string/longer tumbling knots more” because this stage does not let learners test those conditions. Claim the actual tally as a run observation and the probabilities as sourced approximate inputs; never label the generated tray measured experimental data.

Mockup request: plain string box, free-end passage diagram, persistent two-condition trays, visibly joined endpoints in clipped mode. No powered cable, whipping real cord, or physics-animation claim.
