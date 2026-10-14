# Build note: pesticide-paradox (demo-builder, 2026-10-12)

- Design: a time series of pests and predators (RK4 Lotka-Volterra, a=b=c=d=1), with a dashed long-run pest average and a ghost line for the no-spray average. Averages are computed numerically over 600 months.
- Reveal gate: spray strength of at least 20%. Wording change: the slider is a 'strength' (extra death rate per month), not '% killed', because at 60% the share actually killed is about 45%.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.

## v2 (revision 2026-10-13)

- Title and hook gave the answer ("The spray that grows pests", "Could it leave more pests?") -> "A spray that hits both sides" / "What happens to the pests?".
- Break-even was told, not shown -> the question now states the mechanism (pests breed freely, predators grow only by eating them); the stage adds a dashed predator average beside the pest average and says "the pest average is where predators break even".
- The "average with no spray" label overlapped the curves -> shortened to "pests, no spray", moved to the left end with a halo.
- Reveal quoted 20% numbers whatever the slider said -> reveal computes the numbers for the strength the learner set (>= 20%, the milestone "sprayed"), from the same run() as the stage. Reveal is about 70 words.
- Volterra / Adriatic aside removed from the reveal; claim c4 marked withdrawn (not shown any more). c2 and c3 reworded, unverified.

## Revision v3

Input: latest learner review (and fact-check). "Break even" undefined, one spray level, reveal on reset stage, label overlap. Caption explains predators hold steady where food covers losses; presets Spray 20% / 40% and a milestone for each; reveal quotes both levels and the stage shows the strongest level in the reveal; "no spray" label moved into the key. c2, c3 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 3, `format` set, edited claims are unverified for the fact-checker.
