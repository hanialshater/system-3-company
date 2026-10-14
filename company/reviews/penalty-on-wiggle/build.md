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

## Pre-flight v7

builder: demo-builder (wave H revisions, batch 4) · 2026-10-14 · answers r8 learner review `2026-10-14-learner-adult-beginner-r8.md` (W-299)

Changes: reveal 126 → 87 words (tool count). Cut "In 490 of 500 data sets some moderate penalty (the best of five, 0.0001 to 1) beat none on held-out dots" (c4 withdrawn; the "usually loses" clause in c5 now carries its own support); paragraph 1 merged ("..., worse by design"); paragraph 2 says "set N" like the Seen line and "vs" for "against". Stage compaction: "Held-out miss" and "No-penalty held-out" are one readout "Held-out (no penalty)" reading "0.64 (0.58)"; "Penalty 10" and "New data" have their own row (the old mixed row wrapped to three lines); the plot is 28 units shorter (viewBox 320×168, y scale 32/unit); "data set N" label 9 → 11 px. cm-ai still has to approve cutting the c4 sentence (board). Not changed: r8 point 6 (held-out story carried by numbers only).

1. **Title and hook.** Unchanged: "What a penalty does to the fit" / "A curve hits every training dot. Add a penalty for wild bends: what happens to its miss?"
2. **Options.** Unchanged: "Larger" / "Stays exactly 0" / "Larger on some data, 0 on others".
3. **Locked stage.** Dots, no-penalty curve, "Training miss –", "Held-out (no penalty) – (0.44)", slider "0 (none)". Seen line hidden. Nothing matches "Larger".
4. **Reveal values.** Training miss: (a) current state, as the readout. Moderate penalty/set/held-out vs none: (b) last moderate stop (milestone penalty-on), Seen line. λ 10 set/held-out vs none: (b) milestone too-much, Seen line. Fallback with no moderate stop: (a) best moderate on the current data set.
5. **QA path.** Unchanged: slider two presses (0.001, set 1: 0.41 vs 0.44) → Penalty 10 → New data (set 2: 0.64 vs 0.58). The flat purple curve, the dashed no-penalty curve and the Seen line are on screen at the reveal.
6. **Reset.** No Reset control; the records survive New data. Reveal after the QA path: "With no penalty the curve hit every training dot: miss 0. The penalty charges for big coefficients, so the curve stops threading the dots: at penalty 10 your training miss is 0.72, worse by design. / Held-out dots tell the other story: at 0.001 on set 1 you saw 0.41 vs 0.44 with none. At 10 the curve goes much flatter, and on set 2 held-out was 0.64 vs 0.58: too much penalty lost again. A worse fit to training can be a better model."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 penalty-on-wiggle` (390×844): crop 186 px → **0 px**, hiddenBelow 0, namedHidden 0 ("penalty 10", "training miss" visible); 87 words; stage 367 px, reveal 226 px, window 618 px; plot fitted 162/168 px by the kit. The curve the reveal calls "much flatter" is on screen.
