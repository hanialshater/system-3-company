# Build note: pendulum-period

## v2 (revision)

demo-builder · 2026-10-13 · inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: a changed weight on the 1 m string has swung one full back-and-forth (t ≥ ghost period) beside the 100 g ghost. Gate: `useMilestones(["heavy-kept-up"])`.

| Finding | What I did |
|---|---|
| Learner 1 FATAL (unlocks on a slider move, never released) | Gated on the key state above. Moving sliders, Release or Step no longer unlock anything by themselves. |
| Learner 2 (both sliders changed together, confound) | One variable at a time: changing the weight puts the string back to 1 m, changing the string puts the weight back to 100 g, with a caption saying so. String slider comes first in reading order so the QA path (string, weight, release) ends on a changed weight at 1 m and swings it. Trade-off: String sits left of Weight. |
| Learner 3 (mass cancels only told) | While a heavy bob is in step, the caption reads "300 g: pulled 3× harder, 3× harder to speed up. Still in step." New claim c11 (unverified). |
| Learner 4 (ghost hidden behind bob) | Ghost bob is drawn larger than the 100 g bob, with a stronger dashed outline, on top. |
| Learner 5 (reveal numbers only told) | Reveal numbers computed from the stage's period function; reveal names the weight and string the learner actually swung. |
| Learner 6 (unit formatting) | One formatter for slider and bob label. |
| Fact-check 1 ("Galileo saw") | Now "Galileo reported the same with lead and cork pendulums" (matches c6). |
| Fact-check 2 (mass independence true by construction, ideal) | Stage chip "Ideal pendulum · no air · released at 20°"; predict says "An ideal 1 m pendulum"; reveal footer says mass cancels in the equation itself and real bobs differ slightly through air drag. New claim c10 (unverified). |
| Fact-check 3 ("swing" vs back-and-forth) | Predict, idle caption and reveal all say "back-and-forth". |
| Fact-check 4 (release angle unstated) | In the stage chip (20°). |
| Fact-check 5 (recall rider not a point mass) | Recall "why" now starts "Treat swing and rider as a pendulum". c9 text unchanged. |

QA: contract passes phone + desktop (local, 2026-10-13).
