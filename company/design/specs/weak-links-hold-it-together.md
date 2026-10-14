# Spec: weak-links-hold-it-together

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/probability.chance.md`, "## Course: NCM (2026-10-14)", weak-links-hold-it-together · wireframe: `weak-links-hold-it-together.svg`

**Format: Simulation run** (a seeded network and a removal curve). One network of 60 people in six visible friend groups. Link thickness shows strength (neighbourhood overlap). The learner cuts a share of links in one order, then switches to the other order at the same share. Cut links stay on the stage as dashed ghosts, so the learner can see *which* links went. A counter, "bridges cut: n of 12", names the cause: the weakest links are the ones running between groups. A small removal curve records each order at every level the learner visits. "New network" cycles a short, disclosed list of seeds, so one network is not the whole evidence.

## Brief check (re-run in node, 2026-10-14, mulberry32)
Model as briefed: 6 groups of 10, each within-group pair linked with probability 0.5, plus 12 distinct random between-group links. Overlap = shared friends ÷ (friends of either end, excluding each other). Largest connected group after cutting the lowest- or highest-overlap 20%.
- **The brief's seed-33 figures do not reproduce** (the CM noted this too). My generator gives seed 33: 134 links; weak-first at 10/20/30% → 55/44/10; strong-first → 60/59/59. The builder's own code decides the quoted figures.
- **Ties decide the 20% result.** 18–36 links have overlap 0, which is more than the 12 bridges. With ties broken by link index (within-group links first), weak-first at 20% leaves 30 or more of 60 in 12% of networks, up to 57. With ties broken by a seeded random key, it leaves ≤ 30 in 96% of networks (median 10, 90th percentile 20, max 48; 450 connected networks out of seeds 1–500). Strong-first at 20% never goes below 51.
- **10% of random networks start disconnected** (largest group < 60). Those seeds must not be used.
- Ranking by raw shared-friend count (the question's wording) instead of the overlap ratio gives the same picture: median 10, 96% ≤ 30, strong-first ≥ 51.
- At 30% cut the result is robust under any tie rule: weak-first ≤ 41 in every network (≤ 20 with random ties). Strong-first ≥ 48.
- **Verdict: the prediction survives design at 20%, with three conditions.** (1) Ties are broken by a seeded random key, disclosed. (2) Seeds are taken from networks that start connected. (3) The seed list is disclosed with the rule used to choose it (`disclose-chosen-seeds`). If the brief owner wants a result that needs no tie rule, 30% is the robust number. That is a brief edit, routed to cm-probability-chance, not made here.

Reference seeds from my generator (random-key ties, key stream `mulberry32(seed + 1000)`; the builder re-runs on their own code):

| seed | links | weak-first 0/10/20/30/40% | strong-first 0/10/20/30/40% |
|---|---|---|---|
| 1 | 149 | 60 / 28 / 10 / 10 / 10 | 60 / 60 / 60 / 59 / 59 |
| 3 | 134 | 60 / 56 / 20 / 10 / 10 | 60 / 60 / 60 / 57 / 55 |
| 5 | 151 | 60 / 59 / 10 / 10 / 10 | 60 / 60 / 60 / 59 / 58 |
| 6 | 148 | 60 / 30 / 10 / 10 / 9 | 60 / 60 / 60 / 58 / 58 |
| 7 | 131 | 60 / 40 / 10 / 10 / 9 | 60 / 60 / 60 / 59 / 56 |

Suggested rule for the five-seed list: "the first five seeds from 1 whose network starts connected and whose weak-first 20% cut leaves ≤ 30" (on my generator that gives 1, 3, 5, 6, 7; seeds 2 and 4 are skipped because they start disconnected; disclose that). That rule picks networks at the typical result (median 10), not better-than-typical ones.

## Stage at 390×844 (~380 px at predict, ~500 px in explore)
1. **Rule line** (muted): "Link strength = share of friends the two have in common." (10 words)
2. **Network** (~366 × 290 px): six groups as rings of 10 nodes (node r = 4.5 px, ring r ≈ 34 px), with the ring centres on a hexagon (r ≈ 105 px). Within-group links are thin `--muted`. Line width scales with overlap (0.6 px at 0 up to ~2.8 px at 1). Between-group links are long, so the bridges read as bridges without a label. **Cut links stay as dashed `--bad` ghosts.** Nodes in the largest connected piece are filled `--domain`; when several pieces tie for largest, all of them are filled. Every other node is hollow. Optional, the builder's call: a faint hull and a size label on each piece of ≥ 2 people.
3. **Readouts** (one row): "Largest group: 60 of 60" (left) · "bridges cut: 0 of 12" (right, turning `--bad` when > 0).
4. **Removal curve** (~366 × 100 px): x = links cut 0–40% (ticks every 10%), y = largest group 0–60. A solid `--bad` line for "weakest first" and a dashed `--fg` line for "strongest first". Each order draws a point for every level visited in that order, joined from 0%. End labels sit at each line's last point: "weakest first 10" and "strongest first 60". They do not overlap, because the lines separate from 10% on. At 0% both lines start at 60, and the labels are not at that point.
5. Seed line (small, right): "network 1 of 5 · seed 1".
6. Controls, below.

Stage words at the busiest moment: rule line 10 + readouts 7 + end labels 4 + seed line 4 = 25 (numbers not counted). If the visual designer needs room, the seed line drops "network 1 of 5".

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Slider | "Links cut: 0% (0 of 149)" | 0–40% in steps of 10% (5 positions). Each step cuts (or restores) the next ~10% of links in the current order, at once (no animation needed; ≤ 300 ms fade allowed). Redraws the ghosts, fills and readouts, and adds the point to the current order's curve |
| 2 | Control toggle (`aria-pressed`) | "Cutting: strongest first" ⇄ "Cutting: weakest first" | re-applies the same cut share in the other order: the restored links come back solid and the new ghosts appear. The other order's curve fills in for every level from 0 up to the current one, so both curves reach the same share |
| 3 | Control | "New network" | moves to the next of the five disclosed seeds and keeps the cut share and order. Both curves are recomputed for the levels already visited. The seed line updates |

Start: order "strongest first" (the misconception's pick), 0% cut, seed 1. All 3 controls render at first paint, are disabled while `locked`, and use `.tap` (44 px). The slider thumb has a 44 px hit area and works by tap and arrow keys; dragging is not required. There is no reset: the slider back to 0% is the reset, and nothing else empties the stage.

QA path (each control once, in DOM order; the slider gets two arrow presses): slider → 10% → 20% (strongest first, 30 of 149 links cut: largest group 60 of 60, bridges cut 0 of 12: milestone `strong-20`) · toggle (weakest first at 20%: largest group 10, bridges cut 12 of 12, ghosts on every long link: milestone `weak-20`) · New network (seed 3 at weakest-first 20%: largest group 20; curves redrawn). Every value the reveal quotes is on the stage after the path.

## States
- **Predict:** the full network, every node filled, no ghosts, curve axes empty, readouts "60 of 60 · 0 of 12". The question's 20% shows only in the question; the slider reads 0%.
- **On unlock:** nothing moves until a press. Exploration hint: "Cut 20% of links, then switch which links go first."
- **Strongest first, 10–20%:** ghosts appear **inside** the groups, on the thick links. The network stays in one piece (60), and the strong curve stays flat at 60.
- **Weakest first, 20%:** ghosts on all 12 long bridges plus some thin within-group links. The groups come apart (largest 10 on the reference seeds), and "bridges cut: 12 of 12" turns red. The weak curve drops 60 → ~28 → 10.
- **New network:** a different network that tells the same story. If the learner moves the slider again, both curves extend to the new level.
- **Reveal:** the stage stays as left. The reveal quotes the stage: "Cutting the [k] closest ties left [s] of 60 still connected. Cutting the [k] loosest left a largest group of [w]: [b] of the 12 links between groups were among them. A link with few shared friends usually runs between groups, so cutting those first breaks the network apart; close ties sit inside groups, and the groups hold together without them." [k], [s], [w] and [b] are read from the stage's current seed. The Onnela et al. sentence (claim 3) stays out until the human source check clears it.

Milestones (`minInteractions=2`): `strong-20` (strongest first at ≥ 20% cut), `weak-20` (weakest first at ≥ 20% cut). Either order works. The gate needs the weak-first state with bridges cut, which is what the reveal explains.

## Shown, not told
The learner sees which links died: thick links inside groups under "strongest first", long between-group links under "weakest first". The bridge counter, "12 of 12", turns "weak ties are bridges" into a number they produced. The reveal names the pattern their ghosts already draw.

## One representation
The network is the picture and the curve is its record. The curve only gains a point when the learner acts, and it sits directly under the network, so nothing needs watching while something moves elsewhere. If design review finds the two compete on a phone, cut the curve to two numbers next to the readouts. Keep the network.

## Colour and access
Ghosts are dashed and `--bad` (pattern, not only colour). Largest-piece nodes are filled and the rest hollow (fill, not hue). Curves: weak solid, strong dashed, each with a text end label. Stage `aria-label`: "Weakest first, 20% cut: largest group 10 of 60; 12 of 12 between-group links cut."

## Claims this spec adds
- The five-seed list and its selection rule must be disclosed in claim 1's support line (`disclose-chosen-seeds`), together with the tie-break rule ("links with equal overlap are cut in a seeded random order").
- If the stage shows "bridges cut: n of 12", the builder records "In the stage's network, the 12 between-group links are among the [k] lowest-overlap links" as a simulation claim with the seed.

## Notes for others
- **Builder:** the model must be the brief's (groups of 10, p = 0.5, 12 bridges), with the tie rule above. Compute everything from the seed; do not hard-code curves. 60 nodes and ~150 links render as SVG without trouble.
- **Brief owner (cm-probability-chance):** two items, on the board. (a) The question says "fewest shared friends", but the model ranks by overlap (a ratio). The results are the same (checked), but the wording should match: either "the smallest share of friends in common" or rank by count and change claim 2. (b) Optional: 30% instead of 20% gives a result that needs no tie rule. The brief's "Check" line pins seed-33 figures that I could not reproduce; replace it with the builder's figures.
- No illustration needed.
