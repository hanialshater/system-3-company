# Build note: penalty-on-wiggle

- Intent: one plot with 8 training dots (filled), 40 held-out dots (hollow) and the ridge curve; a λ slider over 0, 1e-4 … 10; training and held-out miss (RMS) readouts, hidden while locked; "New data" steps the seed.
- Key state: any λ > 0 (milestone "penalty-on"), where the training miss leaves 0.
- The brief asked the builder to reproduce the held-out dip before claiming it: in seeds 1–500 a λ in 1e-4..1 beats λ = 0 on held-out in 490; λ = 10 is worse than the best moderate λ in all 500. The reveal recomputes the 490 with the stage's own functions. Seed 1 is untuned.
- After screenshots: no layout changes needed.

## v2 (claim fix 2026-10-13)

Claim c5 disputed ('nearly flat', 'loses again' unqualified). Reveal now says 'much flatter and usually loses again to no penalty'. Also c4 wording: 'some moderate penalty (the best of five, 0.0001 to 1)', per the checker note that single fixed values win less often. Both unverified.

## Revision v3

Learner review 2026-10-14: the no-penalty baseline was never on screen. Now a dashed ghost curve of the no-penalty fit and an always-visible 'No-penalty held-out' readout sit beside the live ones; the question explains the penalty as 'discourages wild bends' and glosses coefficients. Claim text unchanged.

## Revision 2026-10-14 (wave D r5, demo-builder)

v4. Review: title/hook leaked "training miss goes up"; "Smaller" impossible; too-much-penalty side told. Changes: neutral title/hook; options Larger / Stays 0 / Larger on some data; new "Penalty 10" control; gate needs a moderate penalty AND a visit to 10; reveal quotes the best moderate penalty and the penalty-10 held-out miss the learner actually saw. Claims reopened: c5; new c6. Not seen in a browser (no build/QA run this wave).

## Pre-flight v6

r7 finding: the reveal quoted "penalty 0.0001" (one arrow press, never sat on screen) while the stage showed 0.001, and the data set 1 values were gone from the stage by the reveal. Fix: `mod` now records the last moderate stop, not the best one, and a "Seen held-out (vs none)" line under the readouts shows the recorded moderate and λ 10 values; it survives "New data". When the quoted moderate penalty lost, the reveal adds "(that one did not win)". Claim c6 reopened.

1. **Title and hook.** "What a penalty does to the fit" / "A curve hits every training dot. Add a penalty for wild bends: what happens to its miss?" No direction given; "stays 0" is not ruled out.
2. **Options.** "Larger" / "Stays exactly 0" / "Larger on some data, 0 on others". Plain words; "0" appears in two, so none is uniquely precise.
3. **Locked stage.** Dots, the no-penalty curve, "Training miss –", "Held-out miss –", "No-penalty held-out 0.44" (not the asked quantity), slider at "0 (none)". The Seen line is hidden while locked. Nothing matches "Larger".
4. **Reveal values.** Training miss at current λ: (a) current state, same toFixed(2) as the readout. Moderate penalty, data set, held-out vs none: (b) recorded at the last moderate stop on the path (milestone "penalty-on"), shown in the Seen line. "In N of 500": computed from the model at reveal time (claim c4). λ 10 data set and held-out vs none: (b) recorded at milestone "too-much", shown in the Seen line. Fallback if no moderate stop: (a) best moderate on the current data set.
5. **QA path.** Slider two presses → 0.0001, then 0.001 (penalty-on; mod = 0.001, set 1, 0.41 vs 0.44); "Penalty 10" (too-much; big = set 1, 0.72 vs 0.44); "New data" at λ 10 → set 2, big = 0.64 vs 0.58. Both milestones reached in 3 presses. Seen line on the stage when the reveal opens: "λ 0.001, set 1: 0.41 vs 0.44. λ 10, set 2: 0.64 vs 0.58."
6. **Reset.** No Reset control in this lesson; "New data" is the only state-changer that could erase things, and the recorded values survive it. Reveal from that run (node re-run of the MODEL block): "...On your data at penalty 10 the training miss is 0.72. Worse on training, by design. The held-out dots tell the other story: at penalty 0.001 on data set 1 you saw 0.41 against 0.44 with none. In 490 of 500 data sets ... on data set 2 you saw held-out 0.64 at 10 against 0.58 with none, so too much penalty lost again. A worse fit to training can be a better model."

Not seen in a browser (no build/QA this wave).
