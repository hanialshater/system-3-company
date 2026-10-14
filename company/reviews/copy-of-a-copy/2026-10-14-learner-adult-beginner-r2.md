*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): copy-of-a-copy
lesson version: v2
boundary: adult with school maths; has read "AI trained on AI output degrades"; can use a calculator for powers.
Screenshots seen: yes (artifacts/walkthroughs/copy-of-a-copy/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the question is clear, the hook neutral and the stage labelled "TOY". Zebra (1 of 50, red) is the 2% word. Nothing leaks.
- Explore: one generation loses "sun". +10 generations takes it to 4 of 10 words left at generation 11, with cat, dog, sun, hat, owl and zebra "gone". "Run 10 generations of 500 words" now actually runs to generation 10, with 10 of 10 left. The gate opens after the 500 run.
- Reveal: it names my run's lost words and generation, which matches the stage. 0.98^50 = 36.4% is arithmetic, told, which is fine for this question. The 500-word result (10 of 10 at gen 10) was seen. The earlier unseen "2,000 seeded runs" figure is gone.

## 2. Earlier findings (v1 review)

1. 500-draw run never ran: **fixed**.
2. 0.98^50 told: **not fixed**, acceptable (it's the derivation, not a stage state).
3. "Next model cannot produce it" worded as a general fact: **fixed** ("In this toy, ...").
4. 2,000-run figure unseen: **fixed** (removed).

## 3. New findings

- Minor: the 500-word run lost nothing in 10 generations, yet the reveal says bigger samples "slow the losing, they do not undo it". On my path I saw no slower losing, just none. A beginner may conclude that 500 words prevents loss. Consider running the 500 case longer, or showing a shrinking bar like "hat 4".
- Minor: the 50-word run is at gen 11 and the 500-word run at gen 10, an uneven comparison.
- No FATAL.
