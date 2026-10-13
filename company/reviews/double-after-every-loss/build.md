# Build note: double-after-every-loss (demo-builder, 2026-10-13)
- Title kept ("Double after every loss" names the system, not the answer).
- Stage: one line chart of running profit over seeded rounds (mulberry32 seed 777, untuned); busts are red dots. The round rule is defined on stage.
- Controls in DOM order: "Play 1 round", "Play 10 rounds", "Play until a bust". QA path: 1 + 10 rounds, then the first bust at round 33 (32 wins, total -$31).
- Gate: 1 milestone, "bust". Reveal quotes the learner's own wins, busts and total from state, then the exact 63/64 x $1 - 1/64 x $63 = $0.
- Considered and dropped a "Play 1,000 rounds" button: with this seed the average after 1,033 rounds is -$0.55, at the 2.5% tail over seeds (SD of a 1,000-round average is about $0.25), so it would push learners towards the "-$0.98" option. The exact arithmetic carries the average instead.
