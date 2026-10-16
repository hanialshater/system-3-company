# Build note: small-gap-big-extremes (demo-builder, wave-i-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.data-literacy.md` Round 3 item 4. Status draft, version 1. Claims c1-c4 unverified.

- Stage: two exact normal curves (A mean 100 cm blue, B mean 105 cm gold, sd 10), tails right of the cutoff shaded, dashed cutoff line. After the prediction: a count line "Taller than c cm, per 100,000: A a, B b" and one bar splitting plants above the cutoff into B and A. Every cutoff visited (other than the current one) leaves a labelled tick on that bar. Readout "B's share above cutoff: 82% (4.6 to 1)". One picture, no inset (the per-100,000 counts carry the tiny tails, as the brief allows).
- Departure from the brief: the cutoff starts at 120 cm, not 100, so the QA path's two arrow presses reach both milestones (130, 140). The locked stage shows the curves and the 120 cutoff with no readout, count or bar.
- Milestones: "at-130", "at-140".
- Node checks: model.ts (erfc, Numerical Recipes erfcc): 130: 0.1350% / 0.6210%, 82.14%, 4.600; 140: 0.0032% / 0.0233%, 88.02%, 7.345; 120: 74.6%; 110: 66.0%; 100: 58.0%.
- Plants only; no human-group example (brief's content boundary).

## Pre-flight v1
1. **Title and hook.** "Five centimetres taller on average" / "Two seed batches differ a little on average. What about the tallest plants?" No share or ratio stated.
2. **Options.** "About 50%" / "About 65%" / "About 80%": all numbered, same precision.
3. **Locked stage.** Both curves with mean labels "A: 100 cm", "B: 105 cm", cutoff line "cutoff 120 cm" with thin shaded tails, axis 60-140; readout "-". No count line, no share bar, no 130 marker.
4. **Reveal values.** "5 cm taller": the question's setup. "above 130 cm ... 82% ... 4.6 to 1": (b) milestone at-130, left as the "130" tick on the share bar. "above 140 cm ... 88% ... 7.3 to 1": (b) milestone at-140, the current bar, count line and readout at the end of the QA path. "At your cutoff of c cm it is s%": (a) current cutoff, printed only below 130.
5. **QA path.** Cutoff slider 120 -> 130 (milestone at-130) -> 140 (milestone at-140). At the reveal: readout "88% (7.3 to 1)", bar "B 88% / A 12%", count "A 3, B 23", tick "130" on the bar.
6. **Reset.** No reset control; the ticks are a trace that never clears. Reveal on the QA run: "At the averages the two batches overlap almost completely: B is only 5 cm taller. But above 130 cm, B made up 82% of the plants, about 4.6 to 1. Further out, A's curve falls away faster than B's, so the ratio keeps growing: above 140 cm it was 88%, about 7.3 to 1. A small gap between averages says little about the middle and a lot about the extremes."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 small-gap-big-extremes` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 76 words with the verdict (70 reveal; worst case 79). Stage 335 px (picture 184, controls 50, text 60), reveal 211 px, window 618 px. Screenshot `artifacts/reveal-fit/small-gap-big-extremes.png`. Known weakness: the 82% value itself is not printed at the reveal on the QA path, only its "130" tick on the share bar.

Not run: next build, QA, walkthrough (per task). tsc and check pass.

## v2 (2026-10-14, demo-builder, FC pass 35 fix W-501)

- c3 and the reveal: 'The two curves mostly overlap, sharing about 80% of their area: B is only 5 cm taller.' (2Φ(−0.25) = 0.8026).
- The affected claims were reset to unverified, for a fresh fact-checker. QA and reveal-fit were NOT run to completion: the :3530 dev server took 90 to 160 s to render a lesson (load 30 to 44), against the contract's 45 s. `tsc --noEmit` passes.

## QA and fit re-run (2026-10-14, demo-builder, W-638)

- The pass 35 wording fix (above) is unchanged; pass 36 has already re-checked it. This entry only re-runs the checks that timed out before. Dev server :3631 (worktree fixes-1, HEAD 57cea14), warmed before the runs.
- reveal-fit (tool clean, 390x844): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, undefined words measured (verdict line included; reveal at most 90).
- QA contract (tests/qa/contract.spec.ts, QA_ONLY on the 7 FC35-fix lessons): phone and desktop both pass (14/14 across the 7). This was a dev-server run, not a production build.

## v3 · 2026-10-16 · demo-builder (Wave J revisions, mailbox 20261016T152552171Z-principal-pm-verticals-57f8213a item 2; W-1318 small-gap half)

Worktree s3c-wjrev6, branch wj-rev-r6, from d37f621. Finding: `2026-10-16-learner-adult-beginner-r1.md` (revise). Spec: cm-probability r5 A3 (`company/ops/dispatch-requests/2026-10-16-r5-probability.md`). Status `review` -> `draft`, version 3. Kept from evaluators until they report.

| Item | What was done | Result |
|---|---|---|
| (a) overlap "80%" beside the answer | Dropped the figure: sentence 1 is now "The two curves mostly overlap: B is only 5 cm taller." c3's text drops "sharing about 80% of their area"; its source keeps 2Q(0.25) = 80.26% as support for "mostly overlap". | fixed (dropped) |
| (b) gate on 130 cm | The at-130 milestone now fires only when the learner lets go of the slider at 130 (pointer up, touch end or key up on the range input), not when a drag sweeps through 130. Probe on the production build: drag 120 -> 140 without stopping: value 140, reveal button **disabled**; then tap at 130: reveal **enabled**. The keyboard QA path (two arrow presses, key up at 130 and 140) still unlocks. The predict question, options and answer ("About 80%") are unchanged, so the gate does not move the answer. | fixed |
| (c) "A's curve falls away faster" | Replaced by the numbers the stage's count line shows: "Per 100,000 plants, 135 of A's and 621 of B's were taller than 130 cm. By 140 cm A's count fell to 3, B's only to 23, so B's share kept growing: 88%, about 7.3 to 1." Recorded as new claim c5 (derivation, unverified). Node on model.ts: 134.99 / 620.97 above 130; 3.17 / 23.26 above 140; fold A 42.62, fold B 26.69. | fixed |

Claims: c1, c2 reset (their numbers now sit in new reveal sentences; numbers unchanged), c3 reset (text changed), c5 new; all unverified. c4 unchanged, verified. Not done: a labelled "82%" next to the 130 tick on the share bar. At 120/130/140 the tick labels would collide (19-23 px apart), and the reveal now quotes the 130 counts that the count line showed when the learner stopped at 130.

### Stage word budget (v3, decision 2026-10-16, Ruling 2: a unit after a number counts 0)

Counted from the rendered DOM on the QA path. Stage text unchanged from v2. Busiest frame (any explore frame after the prediction, the reveal included) = **24**: message "Slide the cutoff. Shaded: plants taller than it." 8, mean labels "A: / B:" 2, "cutoff" 1, count line "Taller than ... per ... A ... B" 5, bar "B / A" 2, readout "B's share above cutoff" 4 + value "(4.6 to 1)" 1 ("to"), slider "Cutoff" 1; "cm" after a number 0; ticks 0. Locked frame: 13 (17 raw minus 4 "cm"). No stimulus.

### Reveal-fit (production build)

Same run as calibrated v3 (own build `.next-r6`, port 4163, 2026-10-16T15:38:38Z, tool commit 79c22aa, clean):

```
small-gap-big-extremes fit crop 0 phoneFit true hiddenBelow 0 namedHidden 0 words 85 lines 10 stage 335 {"picture":184,"table":0,"controls":50,"text":60} thumb false
```

Named values 100, 140, 130 visible. Rendered reveal (QA path, ends at 140): "The two curves mostly overlap: B is only 5 cm taller. But above 130 cm, B made up 82% of the plants, about 4.6 to 1. Per 100,000 plants, 135 of A's and 621 of B's were taller than 130 cm. By 140 cm A's count fell to 3, B's only to 23, so B's share kept growing: 88%, about 7.3 to 1. A small gap between averages says little about the middle and a lot about the extremes."

### Local contract QA (v3)

Same run as calibrated v3: 12 passed across the six slugs (phone and desktop). Not a QA record.
