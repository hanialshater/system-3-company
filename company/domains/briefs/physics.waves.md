# Waves, Sound & Light briefs (cm-physics-waves)

Ranked briefs for this strand, in the same format as `physics.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next physics` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Round 3 (2026-10-14, cm-physics)

New demand-3 concept `wave-speed-medium` added to `content/curriculum/physics.json`. Cross-file rank 4 of 4 (see `physics.electricity.md` round 3). Numbers re-run in `artifacts/scratch/cm-physics-r3/check.mjs`. No human-learner data exists.

### 1. shake-faster-same-speed · concept: wave-speed-medium · core · demand 3 · format: Single card
- Learner knows: waves travel along a rope or a slinky; shaking harder makes bigger waves. / does not know: that wave speed on a rope is set by its tension and mass per length (v = sqrt(T/μ)), and that shaking faster only shortens the wavelength (λ = v / f).
- Misconception: Shaking the rope faster makes the waves travel faster.
- Prediction (stage text ≤ 25 words): "You shake the rope's end twice as often. Compared with before, each crest now reaches the far end..." options: A. Twice as fast / B. In the same time / C. Half as fast (answer: B).
- Check: rope 4 m, μ = 0.1 kg/m, tension T = 0.4 N gives v = 2 m/s. Re-run: at f = 0.5, 1, 2 Hz the crest arrives in 2.0 s; λ = 4, 2, 1 m. T = 1.6 N (4×) gives v = 4 m/s and arrival in 1.0 s at any frequency.
- What the stage shows: one horizontal rope with a hand at the left; one crest tinted so the learner can follow it, a stopwatch readout of its arrival time and a ruler bar showing crest spacing. Control 1: shake-rate chips (0.5 / 1 / 2 shakes per second). Control 2: tension chips (normal / 4× tighter). Control 3: Send (replays the crest's trip in ≤ 400 ms of wall time but reports simulated seconds). The cause (tension, the rope itself) is a control on the same stage, so the reveal can point at it.
- Key state (milestones): (1) arrival time at 1 Hz, (2) arrival time at 2 Hz (same 2.0 s, spacing 2 m then 1 m), (3) arrival at 4× tension (1.0 s). Record values at each milestone; keep a Seen row ("1/s: 2.0 s, 2 m apart · 2/s: 2.0 s, 1 m apart · tight: 1.0 s").
- Reveal payoff (draft, 72 words): "At 1 shake a second and at 2 a second, your crest took the same 2.0 s to cross the 4 m rope: 2 m/s both times. Shaking faster only packed the crests closer: 2 m apart, then 1 m. Speed is set by the rope, not your hand: when you made the rope four times tighter the crest arrived in 1.0 s, twice as fast. Wavelength equals speed divided by frequency."
- Phone fit: one rope band plus a single Seen row; stage-top crop 0 px at 390×844 with the reveal open and the tinted crest spacing visible.
- Planned claims:
  1. The speed of a transverse wave on a stretched string is v = sqrt(T/μ), independent of frequency (ideal flexible string, small amplitude). support: derivation (wave equation from Newton's second law on a string element); source: any introductory waves text (e.g. Halliday, Resnick and Walker, chapter on waves) and check.mjs.
  2. Wavelength λ = v / f: 2 m at 1 Hz and 1 m at 2 Hz for v = 2 m/s. support: derivation; source: check.mjs.
  3. Four times the tension doubles the speed: sqrt(1.6/0.1) = 4 m/s, so the 4 m crossing takes 1.0 s. support: arithmetic; source: check.mjs.
  4. Idealisations stated: no damping, no dispersion, rope values illustrative.
- curriculum: `{"primary":"physics:wave-speed-medium","also":[],"prerequisites":[],"level":"core","strand":"waves","tags":["waves","wavelength","frequency"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: press-the-string (standing-wave-pitch) teaches that string length sets pitch through standing waves; two-ripples-cancel is superposition; count-the-thunder (sound-vs-light-delay) compares two media's speeds but does not separate speed from frequency. None shows that frequency changes wavelength, not speed.

## Round 4 (2026-10-14, cm-physics)

Wave J briefs for this strand are in `physics.md` round 4 (#56–#70; strand named on each brief), so the claim queue hands out demand-3 concepts first across all strands.
