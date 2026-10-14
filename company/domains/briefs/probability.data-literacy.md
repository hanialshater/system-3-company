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
