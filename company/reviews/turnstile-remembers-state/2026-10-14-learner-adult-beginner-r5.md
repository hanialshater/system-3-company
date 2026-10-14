*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): turnstile-remembers-state
lesson version: v1
boundary: an adult beginner who has used a coin turnstile but never thought of it as a machine with states.
Screenshots seen: yes (artifacts/walkthroughs/turnstile-remembers-state/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the trap is real at my boundary. Three coins suggest "3 people" (the turnstile banks coins), and 2 means realising that the second coin in a row is wasted. The locked stage shows the full two-state diagram with its arrows. A careful learner could trace the answer from it, but that is reasoning, not leakage. PASSED shows "–".
- Explore: each event lights the active state and arrow and gives a one-line caption. Event 3: "Push: locked, so blocked", with a red self-loop on Locked. Event 5: "Coin: already unlocked. No change", with a red self-loop on Unlocked. That second red loop is the moment that kills the "3" answer, and it is on stage. PASSED goes 0 → 1 → 1 → 1 → 1 → 2.
- Where it is thinnest: nothing broke for me. The idea that the machine's only memory is its state is said in the reveal, but the stage has already made it visible (the coin went nowhere).
- Visual: when a self-loop turns red, it covers its own label ("p sh", "co n" in steps 3 and 5). This is cosmetic.
- Reveal: it retells my run with the same event numbers and names the finite-state machine. It answers the question I had (where did the third coin go?).

## 2. Earlier findings (v1 review)

1. The rules are not stated in the question (the diagram is faint): **not fixed**, and still optional. The locked diagram is readable at phone size in this run.
2. The red self-loop covers its label ("p sh", "co n"): **not fixed** (cosmetic).

Note: meta.json still says version 1. I saw no visible change since the v1 review.

## 3. New findings

- None beyond the two carried items. No FATAL. The wasted coin is shown on stage (red self-loop, PASSED unchanged) before the reveal names it.
