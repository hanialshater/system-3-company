# Build note: cards-do-remember (demo-builder, 2026-10-13)
- Retitled "Ten reds dealt. What comes next?" ("Cards do remember" states the answer). Slug kept.
- Stage: 52 tiles (two rows red, two black); dealt reds go hollow. No randomness: the setup forces the first 10 cards red and says so on stage.
- Controls in DOM order: "Deal 1 red", "Deal to 10 reds", "Put cards back" (toggle, enabled after ten). Gate: 2 milestones, "ten-reds" and "put-back". "Next card red" readout hidden while locked.
- Numbers from left() in model.ts: 16/42 = 38%, 26/52 = 50%; options 50% / 38% / 62% computed.
- Brief claim (c) said C(26,10)/C(52,10) is about 0.0014; recomputed it is 0.00034 (1 in 2,978). Not shown to learners; recorded in c6's source. Flag for cm-probability.
