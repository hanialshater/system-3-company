*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r4): gradient-descent
lesson version: v4
boundary: adult who remembers school arithmetic and science, new to the topic.
Screenshots seen: yes (artifacts/walkthroughs/gradient-descent/sheet.png, plus a probe running only 0.05/0.45/0.95)
Verdict: launch

## 1. From the artifact

- Predict: the title "Which step size wins?" and the hook "Which step size ends nearest the bottom?" are now neutral and match the question. The locked stage shows the valley, the ball, "from bottom 4.00" and "0/10". Nothing leaks.
- Explore: each "Run 10 at" button runs 10 hops with dashed arcs. A distance bar under the valley (purple, red when it grows) now gives "from bottom" a ruler. The log accumulates: 0.05: 1.39 · 0.45: < 0.001 · 0.50: 0 · 0.95: 1.39 · 1.05: 10.37. The per-hop factor ("Distance × 0.90 / 0.10 / 0.00 / −0.90 per hop") is on stage. The probe showed the gate stays locked after only the three option sizes, so 0.50 must be run too.
- Reveal: 1.39, < 0.001, 0 and 1.39 were seen. The (1 − 2 × step) factors 0.9/0.1/0/−0.9 were each shown on stage as "Distance × ...". The old "within 0.04 after two hops" mismatch is gone.

## 2. Earlier findings (v3 review)

1. Hook/title pushed the wrong answer: **fixed**.
2. No ruler for distance from the bottom: **fixed** (distance bar).
3. The (1 − 2 × step) rule and 0.5 optimum were told, 0.5 never run: **fixed** (0.50 is a required button; factors are on stage).
4. "Within 0.04 after two hops" mismatch: **fixed**.
5. Learning-rate paragraph cropped: **fixed** (visible at reveal).

## 3. New findings

- Minor: "Past 1 it drops below −1, so every hop lands farther out" covers 1.05, which is available but not required by the gate.
- Minor: the 0.05 caption "each hop covers under 40% of the distance left" is true but odd when the stage shows ×0.90 (10% per hop). "Each hop covers only 10%" would be clearer.
- Minor: 75 s chip (product-owner item).
- No FATAL.
