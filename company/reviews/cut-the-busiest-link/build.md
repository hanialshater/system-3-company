# Build note: cut-the-busiest-link

Builder: wave-i-cs (demo-builder) · 2026-10-14 · from brief cs.algorithms.md #82 (single card, E&K 3.6), board W-398.

- Brief numbers re-run in node (own BFS path-count edge betweenness, unordered pairs, 1/k split): start 5-6 = 12, 3-7 = 12, others <= 5; cut 3-7: 5-6 = 24, 0-5 = 12.5, 4-5 = 8; cut 5-6: 3-7 = 24, 0-3 = 12.5, 3-4 = 8. Demo.tsx loads() is the same computation and draws every label.
- Picture: 10 dots in two loose clusters (group 2 drawn as a triangle with a centre dot so no links cross), 17 links whose width and midpoint number show the shortest paths carried. Tap a link (an invisible 28 px button over its number) to cut it; tap a cut link to restore it. "Cut busiest (5–6)" names the link it will cut (ties broken by edge-list order). After each action every count is recomputed and changed counts blink with a tinted pill. When the network falls apart all links freeze (Reset to start again); if the pieces are the two groups they take two colours with "group of 6 / group of 4".
- Deviation from the brief: tap targets are 28 px, not 44 px; 17 midpoints at 390 px leave 28-37 px between neighbours. Link buttons are in DOM order bridges first (3-7, 5-6), so QA's one-press path reaches the split.
- Milestones first-bridge-cut (one between-group link cut while the network is whole; the other's new count and the inner link that changed most recorded), split (pieces are exactly {0..5} and {6..9}). Trace "First cut 5–6: 3–7 12 → 24, 0–3 5 → 12.5." stays after Reset; after a Reset that undoes the split it adds "Split: groups of 6 and 4."
- Reveal = cm-cs draft with one change: "Your second cut" is "Your last cut" (the learner may cut inner links first). 73 words. Claims c1-c5 unverified; c5 states what the link number means.

## Pre-flight v1
1. **Title and hook.** "Cut one link: what do the others carry?" / "Two friend groups, two links between them. Cut one and watch the shortest paths move." No number, no "doubles".
2. **Options.** "12, the same" / "24" / "6": all numbered; the first carries a gloss, so if anything it is the more precise one and it is wrong.
3. **Locked stage.** The network with all 17 counts, both between-group links at 12 (as the question states), the rest 1-5. No 24 anywhere, no cut, no colouring.
4. **Reveal values.** "24 pairs" and "12 each": the question's start state, 6 × 4 computed (claim c2). "doubled to 24": (b) milestone first-bridge-cut, value recorded; on stage as the trace "First cut 5–6: 3–7 12 → 24, …". "links inside the groups changed too": same trace ("0–3 5 → 12.5"). "two groups, 6 and 4": (b) milestone split, recorded; on stage as the two colours, "group of 6 / group of 4" and the message line.
5. **QA path.** Cut busiest (cuts 5-6: first-bridge-cut), Reset, link 3-7 (cut), link 5-6 (split; all links and Cut busiest freeze, so the rest of the 16 presses are skipped as disabled, and Reset was already pressed second). The split picture is on stage at the reveal. 2 milestones in 4 presses.
6. **Reset.** Reset (pressed second on the QA path) keeps the first-cut trace. Pressed after the split it restores all links; the colours go, and the trace adds "Split: groups of 6 and 4." so the sentence still matches the stage. Reveal on the QA path: "Before the cut, the 24 pairs with one person in each group shared two links, 12 each. After you cut one, all 24 had to squeeze through the other, so its count doubled to 24, and links inside the groups changed too. A list ranked once goes stale after every cut. So the Girvan–Newman method cuts the busiest link, recounts, and repeats. Your last cut split the network into its two groups, 6 and 4."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 cut-the-busiest-link` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 80 words with the verdict (73 reveal). Stage 309 px (picture 186, controls 40, text 51), reveal 226 px, window 594 px. All 17 labels render at 12 px in a 370-unit viewBox (about 11.6 px drawn). Screenshot `artifacts/reveal-fit/cut-the-busiest-link.png`.

Not run: next build, QA, walkthrough. tsc and check pass.

## v2 · 2026-10-16 · demo-builder (B1, board W-1265, batch company/ops/dispatch-requests/2026-10-16-r3-verticals.md#B1)

From `2026-10-16-learner-adult-beginner-r14.md` (verdict revise). Status set back to `draft`, version 2.

| r14 finding | What was done | Result |
|---|---|---|
| 1a. Half paths unexplained (c5's second clause not on stage) | While any count on the stage is fractional, the message reads "Cut 5–6, all recounted. Each pair counts 1, split evenly over its tied shortest paths." (Demo.tsx `fractional()`). c5 reset to unverified with this address. | fixed |
| 1b. Links named by node numbers the picture lacks | Every node carries its number (11 px, with a background halo so it reads on the split colours) | fixed |
| 3. "A list ranked once goes stale" told, not shown | Preferred fix not possible without changing the lesson (node check below). Fallback taken: the sentence is cut from the reveal, which now says "The Girvan–Newman method cuts the busiest link, recounts every link, and repeats." c4 reset to unverified. | departure-for-cm (cm-cs, ask A4) |
| 2. Prediction | Worked; unchanged | none needed |
| Finding 3 follow-up: why inner links change | Not addressed beyond the tie rule on stage; the reveal still says only "links inside the groups changed too" | open for cm-cs |

**Stale-list node check** (port of loads() with the v1/v2 edge list, `<scratch>/gn.mjs`, 2026-10-16). Once-ranked list: 5-6 (12), 3-7 (12), then 0-3, 0-5, 2-3, 1-5 (5), and so on. Recount (Girvan–Newman, ties broken by edge order): cut 1 is 5-6 (12) in both. Cut 2 is 3-7 in both (stale 12, recounted 24). **The first difference is at cut 3, after the network has split:** the recount picks 0-1 (3.5; 0-2 is also 3.5), while the stale list picks 0-3, which now carries 2.5 (the other old 5s now carry 0-5 2.5, 2-3 1.5, 1-5 1.5). After that they keep differing (cut 4: recount 0-5 at 5, stale 0-3 at 2; cut 5: recount 4-5 at 8). Why no network fixes this inside the lesson's arc: the question fixes two between-group links at 12 each. If they are the top two links, the stale list's first two cuts are both bridges, which is the split; the recount cuts the second bridge too (24) unless an inner link carries more than 24, in which case the recount cuts an inner link first and the network does not split into the two groups. If an inner link starts above 12, Girvan–Newman's first cut is inside a group. Either way the predict answer stays 24 but the lesson's ending (cut, recount, the groups fall out) changes, which the stop rule names. So: fallback, no network change. The difference can already be seen on the frozen split stage (0-1 and 0-2 show 3.5; the old 5s show 2.5 and 1.5). Showing it would need a third-cut step after the split; that is cm-cs's call.

Claims: c4 and c5 reset to unverified (visible text changed). c1-c3 unchanged and still verified (no number or wording of theirs changed; nodes only gained labels).

Stage word count: busiest frame is just after the first cut, 18 (message 13, Cut busiest 2, Reset 1, trace 2); split frame 17.

## Pre-flight v2
1. **Title and hook.** Unchanged: "Cut one link: what do the others carry?" / "Two friend groups, two links between them. Cut one and watch the shortest paths move."
2. **Options.** Unchanged: "12, the same" / "24" / "6".
3. **Locked stage.** As v1, plus node numbers 0-9. Both bridges at 12, nothing at 24, no cut, no colours.
4. **Reveal values.** As v1: "24 pairs", "12 each" (start state, c1/c2); "doubled to 24" and "links inside the groups changed" (b) milestone first-bridge-cut, on stage as the trace "First cut 5–6: 3–7 12 → 24, 0–3 5 → 12.5."; "two groups, 6 and 4" (b) milestone split, on stage as the colours and "group of 6 / group of 4".
5. **QA path.** Unchanged: Cut busiest (5-6, first-bridge-cut), Reset, link 3-7, link 5-6 (split, stage freezes). The tie-rule message shows after the first press (12.5, 7.5, 5.5, 4.5, 3.5, 1.5 on stage). Local contract QA passed (below).
6. **Reset.** As v1. Reveal on the QA run: "Before the cut, the 24 pairs with one person in each group shared two links, 12 each. After you cut one, all 24 had to squeeze through the other, so its count doubled to 24, and links inside the groups changed too. The Girvan–Newman method cuts the busiest link, recounts every link, and repeats. Your last cut split the network into its two groups, 6 and 4."
7. **Phone fit.** Same reveal-fit run as calibrated-but-unequal-alarms (port 4111, production build .next-wj3, recorded 2026-10-16T13:01:15Z): **verdict fit, crop 0 px, phoneFit true**, hiddenBelow 0, namedHidden 0, thumb false, 72 words, revealLines 10, stage 309 px (picture 186 at scale 1, controls 40, text 51). Screenshot `artifacts/reveal-fit/cut-the-busiest-link.png`.

Local contract QA: `QA_BASE_URL=http://localhost:4111 QA_ONLY=calibrated-but-unequal-alarms,cut-the-busiest-link npx playwright test tests/qa/contract.spec.ts --workers=2`: 4 passed. Not a QA record.

Departure for cm-cs (ask A4): the told "stale list" sentence is gone, so the reveal no longer states the misconception's second half ("rank once, then cut down the list"); the stage refutes only "loads stay where they were" (12 → 24). Whether to add a post-split third cut (the node check above gives the numbers) or accept the narrower lesson is cm-cs's decision.

Checked by (asked): learner-evaluator r15 re-walk on v2, artifact first; fact-checker on c4, c5.
