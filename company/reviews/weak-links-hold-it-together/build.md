# Build note: weak-links-hold-it-together

builder: demo-builder (ncm-specs) · 2026-10-14 · v1 draft · brief: company/domains/briefs/probability.chance.md, Course: NCM · spec: company/design/specs/weak-links-hold-it-together.md (+ .svg)

- Intent, as specced: one network of 60 (six rings of 10 on a hexagon), link width = overlap, cut links stay as dashed red ghosts, largest piece filled (ties for largest all filled), readouts "Largest group: n of 60" and "bridges cut: n of 12", a removal curve under the network (weak solid red, strong dashed, end labels in a right gutter, nudged apart), and a seed line. Controls in DOM order: slider "Links cut" 0–40% in 10% steps (label shows "20% (30 of 149)"), toggle "Cutting: strongest first ⇄ weakest first", "New network". Start: strongest first, 0%, seed 1.
- Model as briefed (6 × 10, p = 0.5 inside, 12 distinct bridges, overlap = shared ÷ either-end friends excluding each other), mulberry32(seed). Cut count = round(share × links). Curves show every level from 0 up to the highest visited in each order (cut sets are nested, so this is the record of that order's cuts).
- **The spec's three build conditions, applied:**
  1. Ties broken by a seeded random key: tie key stream mulberry32(seed + 1000), one key per link in generation order.
  2. Seeds only from networks that start in one piece: SEEDS is computed in Demo.tsx as the first five seeds from 1 that start connected → 1, 3, 5, 6, 7 (2 and 4 start disconnected: largest 50 and 59).
  3. Seed list, selection rule and tie rule are disclosed in claim c1's source. The spec's rule also asks for weak-first 20% ≤ 30; all five meet it, so the filter excluded nothing on result.
- **Pinned figures from my own code** (transpile-only harness on Demo.tsx, 2026-10-14), largest group at 0/10/20/30/40%, weakest | strongest first: seed 1 (149 links) 60/28/10/10/10 | 60/60/60/59/59; seed 3 (134) 60/56/20/10/10 | 60/60/60/57/55; seed 5 (151) 60/59/10/10/10 | 60/60/60/59/58; seed 6 (148) 60/30/10/10/9 | 60/60/60/58/58; seed 7 (131) 60/40/10/10/9 | 60/60/60/59/56. Bridges cut at 20% weakest first: 12, 10, 12, 12, 12; strongest first: 0 everywhere. Over seeds 1–500 (same code): 450 connected; weak-first 20% median 10, p90 20, max 48 (433 of 450 ≤ 30); strong-first 20% min 51. These reproduce the spec's reference table exactly. The brief's seed-33 figures are not quoted.
- Reveal quotes the current seed at max(level, 20%): k links, strong-first largest, weak-first largest, bridges cut. QA path: slider 10% → 20% (strong-20, 60 of 60) · toggle (weak-20: 10, 12 of 12) · New network (seed 3: 20, 10 of 12).
- Onnela et al. (brief claim 3) is kept out of learner text and out of claims, as the brief and spec require until a human source check clears it.
- Open for cm-probability (already routed by the spec): the question says "fewest shared friends" while the model ranks by the overlap ratio (spec checked the results agree). I kept the brief's question text unchanged.
- Format "simulation-run"; interactions choice-before-reveal, slider-drives-live-chart, toggle-before-after, milestone-gate. Reference: E&K chapter 3 only. Claims c1–c5 unverified.
- Not run, per the batch instruction: next build, typecheck, QA, walkthrough.

## Revision v2 (wave E, disputed c4, 2026-10-14)

Fact-check pass 23 disputed c4's direction. "A link with few shared friends usually runs between groups" is false in these networks: most zero-overlap links sit inside groups. The converse is true. Fixes:
- Reveal sentence now reads: "Here the links between groups all have few shared friends, so cutting the weakest first removes them and breaks the network apart. Close ties sit inside groups, and the groups hold together without them."
- c4 now rests on the stage's networks only (support: simulation). It no longer leans on Easley and Kleinberg ch. 3, which no checker has opened. c4 is unverified.
- The order toggle "Cutting: weakest first / strongest first" relabelled itself. It is now two chips, "Strongest first" and "Weakest first", each active and disabled when chosen, in that DOM order, so the QA path does not change. The controls grid is three columns.
- Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Which cuts break a friend network?" / "Cut the closest friendships or the loosest ones. Which leaves the network in pieces?" Both are questions and neither favours an option.
2. Options: "Fewest shared friends", "Most shared friends", "Both about the same". None numbered, same wording style.
3. Locked stage: the uncut network of seed 1, with links drawn thicker for more overlap; "Largest group: 60 of 60", "bridges cut: 0 of 12", an empty curve, the rule line, and the slider at "0% (0 of 149)". Nothing marks which links go first. Link thickness is the definition of strength, not the answer.
4. Reveal values: network number and seed, the cut count k, strongest-first largest, weakest-first largest, between-group links cut: all (a), computed from the learner's current network at 20% (L = max(level, 2)). Both 20% states are milestones (strong-20, weak-20). Both curves for the current network are drawn to the visited level, with end labels.
5. QA path: slider ArrowRight x2 (strongest first, 20%: strong-20), Strongest first (disabled), Weakest first (weak-20), New network (network 2, seed 3, still weakest first at 20%). Both milestones reached; the question's own case (20% each way) is both of them. At the reveal the stage shows network 2 at 20% weakest first: largest 20, bridges cut 10 of 12, and both curve end labels.
6. Reset: there is no Reset. "New network" changes the network, and the reveal follows the current one, which the stage and both curves show. Reveal on the QA path: "In network 2 (seed 3), cutting the 27 closest ties left 60 of 60 in one piece. Cutting the 27 loosest left a largest group of 20: 10 of the 12 links between groups were among them. / Here the links between groups all have few shared friends, so cutting the weakest first removes them and breaks the network apart. Close ties sit inside groups, and the groups hold together without them."
