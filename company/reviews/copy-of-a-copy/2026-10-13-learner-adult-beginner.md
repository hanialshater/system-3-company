*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: copy-of-a-copy
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (has read "AI trained on AI output degrades"; knows chance as percent; can raise a number to a power with a calculator). Screenshots seen (sheet.png, all 6 frames).

## 1. From the artifact

- Prediction: a real guess. The stem is clear (a word is 2% of the data, next model trained on 50 words sampled from it, chance it never appears). About 2% is the per-draw confusion, 98% the "rare means gone" belief, 36% needs 0.98 to the 50th power. The hook ("Can a rare word survive?") is neutral. The locked stage says "TOY: WORD COUNTS ONLY · NO REAL MODEL" and shows ten words with counts; zebra is 1 of 50, which is the 2% word.
- Where understanding first broke: the 500-sample step. The panel says "try 500 words per generation". Tapping "Draw 500 per generation" resets to generation 0 and 500 words; the next tap, New run, again shows generation 0. At no point did I see 500-word generations run. The reveal's "Bigger samples (500) slow this but never undo it" is told, not shown, because the learner is never led to step the 500 run. A learner reads "10 of 10 words left" at generation 0 and sees nothing happen.
- What was SHOWN is strong: Next generation, then +10 generations: bars of cat, dog, sun, hat, owl, zebra turn to "gone" and the survivors grow (26 for "ran", 19 for "sat"). "Words left 4 of 10". Watching the rare words disappear is vivid and unforced.
- The reveal maths: "0.98^50 = 36.4%" is given directly; the stage cannot show it (the learner saw only one run). "In 2,000 seeded runs it vanished after one generation 37.3% of the time" is an unseen simulation the learner must trust. 36% vs 37.3% sits fine.
- AI claims: "Once a count is zero the next model cannot produce it" is true of this counting toy; for a real model it is not strictly true (new data, smoothing), and the reveal states it flatly before the real-world line. The last line cites Shumailov et al. 2024 as rare cases vanishing first when real models train on model output; it is attributed, and the stage label says no real model. Mixed: toy property worded as fact.
- Reveal earned: 36% partly (one run does not show 36%; the arithmetic is told); the "losses pile up" idea yes.
- Problems: (1) 500-draw run not shown; (2) 0.98^50 told; (3) "next model cannot produce it" worded as general fact; (4) 2,000-run figure unverifiable on stage.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows models learn word frequencies and that outputs can end up in training data. The objective (a loop can only lose rare items, never regain them) is shown by the vanishing bars. The 500-draw comparison is not experienced as the panel intends: the toggle resets to generation 0 and never runs.
- Claims verified (5/5), including the Shumailov et al. citation; the toy-vs-real wording issue is separate from claim status.

Verdict: revise
