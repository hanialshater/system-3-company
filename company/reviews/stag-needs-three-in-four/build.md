# Build note: stag-needs-three-in-four

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #8

- Intent: belief slider drives a live chart: stag's expected payoff 4p (rising line) and hare's flat 3; region from 75% tinted; a dashed cursor with dots on both lines. The crossing is the stand-in for "enough trust".
- Starts at 100% (stag clearly better) so the learner lowers it. Milestones: "doubt" (below 75%) and "threshold" (exactly 75%, shown as "either (tie)"). Presets in DOM order: 50% sure, 75% sure, 100% sure (disabled at start), then the slider (step 5%).
- Lines and readouts hidden while locked so the crossing doesn't leak the answer.
- Equilibria (both stag, both hare) told in one claimed sentence (c2): context outside the doesNotKnow. Rousseau naming claimed as a source claim for the fact-checker.
- Not run here: build, tsc, QA.
