# Spec: all-lines-meet-in-one-mother

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/life.genetics-evolution.md`, "## Course: NCM (2026-10-14)" #3 (full text: `company/courses/ncm/briefs.md`, life.genetics-evolution #3) · wireframe: `all-lines-meet-in-one-mother.svg`

**Format: Storyboard / scrub** (lineages traced back), with a 1,000-run tally. A family tree is drawn upward from 50 women today. Each step back gives every surviving line a random mother. Whenever two lines pick the same woman, they **join at a dot** and stay joined. The learner scrubs back and watches 50 lines become ~32 after one generation, ~9 after twelve, and finally one. At that point the stage draws the whole generation of 50 she lived in: one filled "common mother" and 49 hollow contemporaries. That row answers the misconception ("there was once only one woman") with a picture. "Run 1,000 families" puts this run on a histogram of 1,000, so the "about 96" in the reveal is a number the learner saw, not a promise.

## Brief check (re-run in node, 2026-10-14, mulberry32)
Haploid Wright–Fisher, N = 50. Each generation, each distinct line (in index order) draws mother = floor(rand × 50).
- Seeds 7001–8000: **all coalesce; mean 96.03, median 84**, min 18, max 371, 10th–90th percentile 44–169. This reproduces the brief.
- **The exact expectation for this discrete model is 96.97** (Markov chain on the number of lines, transition = occupancy of N bins). 2N(1 − 1/N) = **98** is the continuous-time coalescent approximation. So the CM's edit is right: claim 2 must call 98 an approximation. Recommended wording: "Theory: 2N(1 − 1/N) ≈ 98, an approximation; the exact expectation for this model is about 97." The 1,000-run mean (96) sits within sampling error of 97 (standard error 1.6, run SD 50.5).
- Expected lines left after one generation: 50(1 − (49/50)^50) = 31.8. On average half of the whole wait (50 of 97 generations) is spent with the last **two** lines. This is why the tree is busy near today and sparse at the top.
- **The prediction survives design.** One caution: a single run varies widely (18 to 371). The reveal must quote the learner's own run *and* the 1,000-run mean, never "96" as the learner's result.

Reference stage seed: **7004**: T = 99 generations, lines 50 → 32 (1 back) → 23 (2) → 9 (12) → 3 (50) → 2 (89) → 1 (99). It is chosen because it sits near the mean and fits a 0–120 axis. That is a chosen seed and must be disclosed (`disclose-chosen-seeds`). The 1,000 runs use seeds 7001–8000 as briefed.

## Stage at 390×844 (~330 px at predict, ~530 px in explore)
1. **Rule line** (muted): "50 women per generation; each has a random mother from the one before." (12 words)
2. **Tree** (~350 × 260 px): today's 50 women are a row of dots along the bottom (6.6 px pitch, r = 2.6 px), labelled "today: 50 women". The y axis is generations back, upward, on a **square-root scale** with ticks 0, 5, 20, 50, 100 and a label naming the scale. On a linear axis the first 12 generations, where most merges happen, would fill 1/10 of the height. Each line's x is the mean x of its present-day descendants, so lines never cross and a merge is a visible join. Each join gets a small dot. The first join gets a one-time label, "same mother", during the first two generations.
3. **Common-mother row** (when one line remains): at that generation a row of 50 small dots, one filled and larger, labelled "common mother", and 49 hollow, labelled "+ 49 other women alive".
4. **Readout**: "12 back: 9 lines" (left), "seed 7004" (right, small).
5. **1,000-run strip** (after control 4, ~330 × 50 px): a histogram of the 1,000 coalescence times in 20-generation bins (0–400). A solid tick marks the mean, a dashed `--bad` tick marks "yours". Heading: "1,000 runs: all met. Mean 96".
6. Controls, below.

Stage words at the busiest moment (reveal state): rule line 12 + "today: women" 2 + axis label 4 + "common mother" 2 + "other women alive" 3 + readout 2 + strip heading 4 + "yours" 1 = 30. **This is over budget.** Fixes: drop the axis label to "√ scale" (−3) and shorten "+ 49 other women alive" to "+ 49 others" (−2). That makes 25. The wireframe shows the long labels; the builder uses the short ones.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Slider | "Generations back" | 0–120 in steps of 1 (axis max 120 for seed 7004). Each step draws (or hides) one more generation of the tree and updates the readout. Past the meeting point the single line continues upward. The slider max does not reveal where the lines meet |
| 2 | Control | "Back 10 generations" | slider value + 10 (capped at 120); redraws at once |
| 3 | Control | "Back until one line" | jumps to the coalescence generation (99 for seed 7004). It replays the climb in ≤ 400 ms (instant under reduced motion), then draws the common-mother row. Disabled once there |
| 4 | Control | "Run 1,000 families" | runs seeds 7001–8000 synchronously (≈ 1,000 × 100 draws, well under 50 ms) and draws the strip with "yours" marked. Disabled after |

All 4 controls render at first paint, are disabled while `locked`, and use `.tap` (44 px); the slider has a 44 px thumb hit area and works by arrow keys and taps. There is no reset and no "New family": one disclosed seed keeps QA screenshots fixed, and the 1,000 runs show the spread.

QA path (each control once, in DOM order; the slider gets two arrow presses): slider → 1 → 2 (50 → 32 → 23 lines, "same mother" label) · Back 10 generations (12 back: 9 lines) · Back until one line (99 back: 1 line, common-mother row: milestone `one-line`) · Run 1,000 families (mean 96, yours at 99: milestone `thousand`). Every number in the reveal is on the stage at the end of the path.

## States
- **Predict:** only today's row of 50 dots, the empty axis and "0 back: 50 lines". No lines are drawn, so nothing hints whether they meet.
- **On unlock:** nothing moves until a press. Exploration hint: "Step back and watch lines join where two women share a mother."
- **1–2 back:** 12 shared mothers in the first generation absorb 18 lines (50 → 32); the learner sees a third of the lines vanish into joins. "same mother" labels the first join.
- **12 back:** 9 lines. Joins become rare and the lines run long and straight.
- **One line (99 back):** the last two lines join. The common-mother row shows that she was one of 50 women alive, and the 49 others are drawn.
- **1,000 runs:** the strip shows that every run met, mostly between 40 and 170 generations, and where this run fell.
- **Reveal:** the stage stays as left. The reveal (≈ 75 words): "Every step back, some lines pick the same mother and join; joined lines never split. With only 50 women to choose from, joins continue until one line is left. Your lines met in one woman [T] generations back; 1,000 families averaged [mean]. She was not alone: 49 other women lived beside her, but their lines did not reach today. It is the drift from 'Nobody wins, one colour takes over', run backward." The figures come from the stage. The last sentence cites life/same-genes-different-drift (the brief's nearest lesson and prerequisite), as the brief asks. The ≈ 98 approximation lives in claim 2 and may be added only if the word budget allows. The Mitochondrial Eve sentence (claim 3) is optional and needs the fact-checker's attribution check first.

Milestones (`minInteractions=2`): `one-line`, `thousand`. The gate needs the coalesced tree with her generation drawn (the reveal's picture) and the 1,000-run mean the reveal quotes.

## Shown, not told
The learner makes the lines join by stepping back. The "only one woman" misconception is answered by a row of 49 hollow dots around the common mother, not by a sentence. The "about 96" is the learner's own histogram.

## Colour and access
Lines `--domain` (a single hue). Join dots and the common mother are filled `--fg`; contemporaries are hollow (fill, not hue). The "yours" tick is dashed plus labelled. Stage `aria-label` at the end: "All 50 lines meet in one woman 99 generations back; she lived among 49 other women. 1,000 runs: mean 96 generations."

## Claims this spec adds
- Claim 1 (simulation) gains the stage seed: "The stage's family uses seed 7004, chosen because its meeting time (99) is near the mean; the 1,000 runs use seeds 7001–8000."
- Claim 2 wording per the CM's edit: 98 as an approximation; recommended addition: "exact expectation for this model ≈ 97 (Markov-chain calculation, node)". The fact-checker confirms.
- The reveal's link sentence ("the drift from 'Nobody wins, one colour takes over', run backward") is a claim. Support: derivation (same haploid Wright–Fisher sampling, traced backward); source: the published lesson's claim c1.

## Notes for others
- **Builder:** track line identities, not just counts, so that the joins can be drawn. Use the same draw order as the 1,000-run counter, so that seed 7004 gives T = 99 in both. Layout x = mean descendant x; this needs no extra layout code. Compute the histogram on the client from seeds 7001–8000; do not hard-code it.
- **Brief owner (cm-life-genetics-evolution):** brief unchanged; apply the claim-2 wording above.
- **Visual designer:** the square-root axis needs its label. Check that the common-mother row (50 dots at 6.6 px pitch) reads at 390 px.
- No illustration needed.
