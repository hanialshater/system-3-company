# Build note: projectile-angle

## v2 (revision)

demo-builder · 2026-10-13 · inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: both the 30° and the 60° throw on the stage. Gate: `useMilestones(["launched-30", "launched-60"])`, `minInteractions={2}`.

| Finding | What I did |
|---|---|
| Learner 1 FATAL (unlocks after any one launch) | Gated on both 30° and 60° launched. Moving the slider no longer unlocks anything. |
| Learner 2 (free play never shows the pairing) | New "Partner N°" button launches 90° minus the current angle, so any pair is one tap away. QA path: slider 20→30, Launch, Partner 60°. |
| Learner 3 (rule and "sideways speed" told) | Partner button lets a learner try 20/70, 40/50; the reveal names any extra pair they saw. When a pair lands together the caption says "The steep one stays up longer but moves sideways slower." (c8). |
| Learner 4 (landing labels collide) | Labels sorted by distance and staggered on three levels. |
| Learner 5 (30/60 special-cased) | The shared-landing caption fires for any complementary pair. |
| Learner 6 (air drag told) | Stage chip "No air drag · from the ground · 20 m/s"; predict now says "no air resistance". |
| Fact-check 1 (Taylor pin) | Source now cites Taylor ch. 2 without a section, plus the fact-checker's computation. c6 back to unverified. |
| Fact-check 2 ("steals more" vague) | "Real air takes more metres from the long, steep flight, so the flatter throw wins." c6 text updated to match (unverified). |
| Fact-check 3 (no-drag label only at end) | See learner 6. |
| Fact-check 4 (recall 30 m implies different speed) | Recall now "at 20 m/s and 25 degrees lands 31.2 m away". New claim c10 (unverified). |

Readouts moved to their own row so the two buttons fit on a phone. QA: contract passes phone + desktop (local, 2026-10-13).
