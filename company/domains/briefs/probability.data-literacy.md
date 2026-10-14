# Data Literacy & Graphs briefs (cm-probability-data-literacy)

Ranked briefs for this strand, in the same format as `probability.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next probability` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Round 3: spare capacity (cm-probability, 2026-10-14)

Written by cm-probability (domain lead); continues the ranking in `probability.chance.md` § Round 3 (briefs 1–3 there). Numbers recomputed in node by cm-probability on 2026-10-14. The reveal draft is ≤ 90 words and must pass the phone-fit rule in `company/product/demo-standard.md` (390×844: stage top and the reveal's last line on screen, everything the reveal names visible).

### 4. small-gap-big-extremes · concept: tail-ratios · core · demand 3 · format: Single card (cutoff slider over two bell curves)
- Audience: anyone who reads "group B is slightly higher on average" headlines / Learner knows: averages, that values spread around them in a bell shape (averages-turn-bell-shaped) / does not know: that a small difference in averages becomes a large ratio far out in the tails.
- Misconception: If two groups' averages differ only a little, the very high values will come from both groups about equally.
- Prediction (stage text ≤ 25 words): "Two seed batches, same spread (10 cm). Batch B averages 5 cm taller. Of plants over 130 cm, what share are from B?" options: A. About 50% / B. About 65% / C. About 80% (answer: C (82%)).
- What the stage shows: two overlapping normal curves (A: mean 100 cm, B: mean 105 cm, sd 10 cm), equal-sized batches, drawn exactly (no sampling noise). A vertical cutoff line with a slider (100–140 cm, steps of 10); the areas right of the cutoff are filled in each batch's colour and a single readout shows "B's share above the cutoff" and the ratio. The locked stage shows the curves and a cutoff at 100 cm, with no readout. Milestones: (1) cutoff at 130 cm; (2) cutoff at 140 cm. Above 120 cm the tail areas are tiny on a linear axis: the designer may add a magnified inset of the tail or label the areas by count per 100,000 plants (one representation on a phone; no second chart).
- Check: normal tail areas, sd 10: cutoff 100: A 50.0%, B 69.1%, B's share 58%; 110: 15.9% vs 30.9%, 66%; 120: 2.28% vs 6.68%, 75%; 130: 0.135% vs 0.621%, ratio 4.6, B's share 82.1%; 140: 0.0032% vs 0.0233%, ratio 7.3, 88%. Seeded cross-check mulberry32(11), 100,000 per batch, above 130: A 122, B 667 (85%, sampling noise on small counts, which is why the stage draws exact curves).
- Reveal draft (70 words): "At the averages the two batches overlap almost completely: B is only 5 cm taller. But above your cutoff of {c} cm, B makes up {s}% of the plants, about {r} to 1. Further out, A's curve falls away faster than B's, so the ratio keeps growing: about 7 to 1 above 140 cm. A small gap between averages says little about the middle and a lot about the extremes."
- Payoff: the shaded tails are the cause on the stage: the learner drags the cutoff and watches the ratio climb while the averages stay 5 cm apart.
- Planned claims:
  1. For two normal distributions with sd 10 and means 100 and 105, the share above 130 is 0.135% and 0.621%; B makes up 82% of values above 130 (ratio 4.6). support: derivation; source: standard normal tail Q(3) = 0.00135, Q(2.5) = 0.00621 (any normal table), computed in node.
  2. Above 140 the ratio is about 7 to 1 (B's share 88%). support: derivation; source: Q(4) = 3.17e-5, Q(3.5) = 2.33e-4.
  3. The batches are a model with equal spreads and exact bell shapes; real data with different spreads or shapes can give different tail ratios. support: derivation; source: lesson rule (stated on the card).
- Content boundary: the lesson uses plants. Do not extend the example to human groups in learner text; real group comparisons depend on spreads and shapes the model fixes.
- curriculum (new concept, added to the map today): `{"primary":"probability:tail-ratios","also":["probability:central-limit"],"prerequisites":[],"level":"core","strand":"data-literacy","references":[],"tags":["normal distribution","tails","averages"]}`
- Needs interaction-designer spec: no (if the tail inset turns out to need a second chart, it goes to the interaction designer first).
- Differs from nearest: same-average-different-ride (variance-risk) holds the mean fixed and changes the spread; average-that-never-settles is about heavy tails; math/one-boss-moves-the-mean is mean vs median. This one holds the spread fixed and shifts the mean, then reads the extremes.

## Round 4 (Wave J): demand 2 (cm-probability, 2026-10-14)

Continues the Round 4 ranking in `probability.md` § Round 4 (briefs 56-61 there, including the data-literacy demand-3 briefs 60 `where-the-axis-starts` and 61 `four-hundred-or-thirty`; read its rules paragraph: preset buttons only, question's case pressed last, ≤ 90-word reveal that fits at 390×844, labels ≥ 10 px). Numbers reproduced by `node company/domains/briefs/checks/probability-round4-check.mjs`.

### 66. what-a-half-correlation-buys · concept: correlation-strength · core · demand 2 · format: Single card (r presets over one scatter with two error bands)
- Audience: anyone who reads "strongly linked" or "r = 0.5" in a study / Learner knows: a scatter plot and a best-fit line (same-line-four-pictures) / does not know: how little a moderate correlation narrows predictions for one case: the error left is √(1 − r²) of the spread.
- Misconception: A correlation of 0.5 gets you about halfway to perfect prediction.
- Prediction (≤ 25 words): "Two test scores correlate at r = 0.5. Using the first to predict the second, how much smaller is your typical error than guessing the average?" options: A. About half / B. About a quarter / C. About an eighth (answer: C (13%)).
- What the stage shows: 200 seeded points (mulberry32(68), disclosed) built as y = r·x + √(1 − r²)·z from fixed x and z, so the cloud morphs between presets; the best-fit line; a grey band ±1 spread around the average (no information) and a coloured band ±1 typical error around the line. Readout: "typical error {x}% smaller" and "r² = {q}". Preset buttons in DOM order: **r = 0**, **r = 0.8**, **r = 0.5** (the question's case last). Readouts use the model's r, not the sample r (sample r at 0.5 is stated in the build note, disclosed). Locked stage: the cloud at r = 0 with the grey band only. Milestones: (1) r = 0.8; (2) r = 0.5.
- Check: error shrink = 1 − √(1 − r²): r = 0: 0%; 0.5: 13.4%; 0.8: 40.0%; 0.95: 68.8%. r² = 25% at 0.5, 64% at 0.8.
- Reveal draft (70 words, counted by whitespace): "At r = 0.5 the coloured band is only {x}% narrower than the grey one: the typical miss shrinks to 0.87 of the spread. What is left over is √(1 − r²), so predictions only sharpen when r gets large: at r = 0.8 the band was {y}% narrower. A correlation of 0.5 is a real link and matters over many people, but for one person the guess stays wide."
- Payoff: the two bands, one inside the other, are the cause on the stage: the learner sees how little the coloured band narrows at 0.5.
- Planned claims:
  1. For a linear relation with correlation r, the typical prediction error (residual standard deviation) is √(1 − r²) times the spread of the predicted variable; at r = 0.5 that is 0.87, 13% smaller. support: derivation; source: least-squares regression, residual variance = (1 − r²)·var(y).
  2. At r = 0.8 the error is 40% smaller. support: derivation; source: same.
  3. The points are seeded simulated data (seed disclosed) from a model with exact correlation r. support: simulation; source: lesson code.
- curriculum (new concept): `{"primary":"probability:correlation-strength","also":["ai:linear-regression-fit"],"prerequisites":[],"level":"core","strand":"data-literacy","references":[],"tags":["correlation","prediction","r squared","scatter plot"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: same-line-four-pictures (one r, four very different shapes); two-random-walks-agree (correlation by chance); ai's linear-regression-fit lesson (fitting the line). None shows how much a given r narrows a prediction.

### 67. two-axes-one-crossing · concept: dual-axis-charts · intro · demand 2 · format: Single card (right-axis presets on one two-line chart)
- Audience: anyone who sees business or news charts with two y-axes / Learner knows: reading a line chart; that axes can be cut (where-the-axis-starts) / does not know: that with two independent axes, where lines cross or how closely they track is chosen by whoever sets the axes.
- Misconception: Where two lines on a dual-axis chart cross, something happened in the data.
- Prediction (≤ 25 words): "Sales (left axis) and ad spend (right axis) cross between years 3 and 4. What does the crossing tell you?" options: A. Ad spend overtook sales there / B. Ad spend began growing faster there / C. Nothing about the data (answer: C).
- What the stage shows: one chart, years 1–6. Sales 100, 102, …, 110 on a fixed left axis 100–110; ad spend 10, 18, …, 50 on the right axis. Axis labels and ticks ≥ 10 px, each line in its own colour and dash, each axis labelled in the same colour and dash style. Readout: "lines cross at year {t}" or "lines lie on top of each other". Preset buttons in DOM order: **Right axis 0–100**, **Right axis 10–50**, **Right axis 0–60** (the question's case last). Locked stage: the 0–60 chart (the question's object; the readout hidden). Milestones: (1) 0–100 (cross near year 1.8); (2) 10–50 (same line); (3) 0–60 (year 3.5).
- Check: sales height (t − 1)/5; ad height (10 + 8(t − 1) − lo)/(hi − lo). Crossing: 0–60: year 3.5; 10–50: identical at every year; 0–100: year 1.83. Growth over the six years: sales 10%, ad spend 400%.
- Reveal draft (62 words, counted by whitespace): "The numbers never changed: sales rose from 100 to 110, ad spend from 10 to 50. With the right axis at 0–60 the lines cross at year 3.5; at 10–50 they lie on top of each other; at 0–100 they cross near year {t}. Whoever picks the two axes picks the crossing. Compare the numbers instead: ad spend grew 400%, sales 10%."
- Payoff: the right axis's tick labels moving while the data stay fixed is the cause on the stage.
- Planned claims:
  1. With the axes above, the lines cross at year 3.5 (right axis 0–60), coincide at 10–50, and cross at year 1.83 (0–100). support: derivation; source: solving the two height equations (check script, brief 67).
  2. Sales grew 10% and ad spend 400% over the six years. support: derivation; source: arithmetic.
  3. The company and figures are invented. support: derivation; source: lesson rule.
- curriculum (new concept): `{"primary":"probability:dual-axis-charts","also":["probability:truncated-axis"],"prerequisites":["probability:truncated-axis"],"level":"intro","strand":"data-literacy","references":[],"tags":["charts","axes","misleading graphs","dual axis"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: where-the-axis-starts (brief 60: one axis cut, bar heights); two-random-walks-agree (lines that track by chance). Here the data are fixed and only the second axis moves.

### 68. start-from-the-freak-year · concept: cherry-picked-window · intro · demand 2 · format: Single card (start-year presets over one 30-point series)
- Audience: anyone who reads "no growth since year X" / Learner knows: reading a trend from a line chart / does not know: that a rise measured from a chosen start year inherits that year's noise, so starting at a freak high can hide a steady trend.
- Misconception: The trend in a chart is a fact about the data, whatever year you measure it from.
- Prediction (≤ 25 words): "A shop's yearly sales over 30 years rise about 1 a year; year 10 was a freak boom. Measured from year 10, the rise per year looks:" options: A. About the same (1 a year) / B. About half (0.5 a year) / C. About a quarter (0.25 a year) (answer: C (0.22)).
- What the stage shows: 30 dots (years 1–30) from a fixed series (below), a straight line from the chosen start year to year 30, the start dot ringed, and readout "rise per year from year {s}: {v}". Axis labels ≥ 10 px. Preset buttons in DOM order: **From year 20**, **From year 1**, **From year 10** (the question's case last). The previous line stays as a faint trace. Locked stage: dots only. Milestones: (1) from year 1 (0.90 a year); (2) from year 10 (0.22 a year).
- Check: series y_t = t + uniform(−2, 2) noise from mulberry32(70), plus 12 in year 10: [2.1, 1.1, 2.3, 3.9, 6.9, 7.4, 5.2, 8.8, 9.5, 23.9, 12.7, 13.7, 12.1, 12.1, 14.3, 17.2, 15.3, 18.3, 18, 20, 21.8, 20.6, 24.3, 22.8, 26.4, 24.2, 26, 28.5, 30.9, 28.2]. Rise per year to year 30: from year 1: 0.90; from year 10: 0.22; from year 20: 0.82. The builder hard-codes this list (seed and generator disclosed) so the numbers match.
- Reveal draft (59 words, counted by whitespace): "From year 1 the line rises {a} a year; started at the freak year 10 it rises only {b}, about a quarter as fast, from the same 30 points. A rise measured between two years carries the noise of its start year, and a start at a peak hides the trend. Ask why a chart starts where it does."
- Payoff: the ringed start dot sitting high above its neighbours is the cause on the stage.
- Planned claims:
  1. For the card's series, the rise per year to year 30 is 0.90 from year 1, 0.22 from year 10 and 0.82 from year 20. support: derivation; source: arithmetic on the listed series (check script, brief 68).
  2. The series is generated (trend 1 a year, seeded noise, one freak year) and is not real data. support: simulation; source: lesson code, seed disclosed.
- Content boundary: no real-world series (climate, prices, crime) in learner text.
- curriculum (new concept): `{"primary":"probability:cherry-picked-window","also":["probability:spurious-trends"],"prerequisites":[],"level":"intro","strand":"data-literacy","references":[],"tags":["trends","cherry-picking","charts","noise"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: two-random-walks-agree (trend appears between unrelated noisy series); praise-then-slump (an extreme value drifts back). Here a real trend is hidden by choosing the start point; no lesson teaches window choice.
