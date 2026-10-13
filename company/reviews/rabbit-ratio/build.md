# Build note: rabbit-ratio (demo-builder, 2026-10-13)

- Intent: pick a start (1, 1 / 1, 3 / 3, 1); each ratio term / previous term is a dot on a 0-4 line, one row per step, so the trail zigzags in as you read down. Earlier starts stay as grey trails on the same chart (one representation). A "Ratios shown" slider (1-12) steps the run back and forth; the latest ratio is a readout.
- Key state (two milestones): two different starts viewed with at least 8 ratios shown. The slider starts at 12 (all ratios), so picking two starts reaches it; QA path: the three start buttons, then the slider (12 -> 10).
- Numbers: every dot, the caption's terms and the readout come from run(); the 1.618 option is PHI.toFixed(3). The three starts are chosen to begin far apart (disclosed in c2); there is no randomness, so no seed.
- Deviation from brief: "step the sequence" is the slider, not a step button, because QA presses each control once; the slider starting full is a choice for the QA path.
- After screenshots: the zigzag and the shared landing column read well on phone; no change.
- All numbers recomputed with node; all claims unverified, for the fact-checker. No claim about the golden ratio in nature or art (brief note).

## v2 (claim fix 2026-10-13)

Claim c4 disputed ('closer each time' fails at step 2 for start 3, 1). Reveal now: 'overshoots, then undershoots, and after the first step or two the gap shrinks each time.' Claim rewritten; unverified.
