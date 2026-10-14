# Build note: few-shortcuts-shrink-the-world (demo-builder, 2026-10-14)

Session 2 (Networks, Crowds, and Markets), batch 1. Format: simulation run. Brief: `company/domains/briefs/probability.chance.md`, batch-1 item 2. Network rules: `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` section 2.6 (texture graph, 100 nodes).

- Intent: a ring of 100 dots (r 3, edges 1 px `--line`), shortcuts as 1.5 px accent chords with larger accent-filled endpoint dots, so the shortcut is not colour alone (chord line plus bigger dot). No names, no taps on nodes. The learner reads two numbers: average steps and clustering. Clustering also has a bar with a ghost tick at the random-network level 0.04.
- Controls: chips 0 / 1 / 5 / 20 (the current one is active and disabled, so the QA path never presses a no-op). Chips add arcs in place from one nested sequence (mulberry32 seed 1), seed shown on the stage.
- Computation: exact all-pairs BFS and clustering in `model.ts`, recomputed on the stage (not cached numbers). Rule: pick two people uniformly, skip if equal or already linked (ring or earlier shortcut), repeat. This reproduced every figure in the brief's Check (12.88, 10.34, 6.78, 4.85; clustering 0.500, 0.496, 0.480, 0.435; 20-seed means 7.38 and 4.69) on the first try, so seed 1 was not tuned.
- Gate: three milestones, chips 1, 5, 20 each pressed once, so every state the reveal quotes (0, 5, 20) has been on screen. The reveal quotes values by recomputing them, and the QA path ends on 20 shortcuts.
- Locked: chips disabled before the prediction; the stage shows only the 0-shortcut ring (12.9 is in the question anyway), no shortcut figures.
- Section unconfirmed: the brief says ch. 20 section 20.2 is unconfirmed (book site blocked). meta.json has chapter 20 and section "20.2" with a note. The fact-checker should confirm against the free PDF.
- Claim c4 (Watts and Strogatz 1998, Nature 393: 440-442; Newman-Watts added-link variant) keeps the brief's flag: NEEDS A HUMAN SOURCE CHECK. The lesson says links are added "(Watts and Strogatz rewired them)" and attributes only the effect.
- Claim c6 (random network clustering about 0.04 = degree / N) is an approximation, not simulated.
- All claims are `unverified`. I did not use tools/claim.mjs (session-2 slug).
- Deviations from the brief: none. The brief's "ghost mark at 0.04" is a tick on a bar under the clustering number plus a small legend line "Random network 0.04".
- Stage words: Shortcuts, Average steps, Clustering, Random network 0.04, "Lines across the ring are shortcuts.", centre label, seed: about 20 words.
