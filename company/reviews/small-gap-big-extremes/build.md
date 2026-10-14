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
