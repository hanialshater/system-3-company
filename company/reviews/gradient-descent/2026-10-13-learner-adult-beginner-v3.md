*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: gradient-descent
lesson version: v3
boundary: an adult who remembers school arithmetic and science, new to the topic.

## 1. From the artifact

Screenshots seen: predict, step 4 (run at 0.95), reveal (all viewed).

- Prediction: the hook ("Bigger steps should reach the bottom of the valley sooner. Try it.") and the title ("Bigger steps, faster descent?") state a belief and then dare me to test it; the question box then gives the rule ("Each hop = step size x slope") and asks which of 0.05, 0.45, 0.95 ends closest. The locked stage shows a valley with a ball and a slider at 0.25. A learner who reads "should reach the bottom sooner" has been steered to 0.95; 0.45 is a sensible middle choice, so the trap is fair but loud. "Slope" is glossed in brackets ("how steep it is under the ball"), good.
- Where understanding first broke: the line "Next hop = 0.95 x slope 2.79 = 2.65" appears, and I cannot connect it to what the ball just did. After 10 hops at 0.95 the stage says "Overshooting: it zigzags across the valley" and shows dashed arcs crossing the bottom; "FROM BOTTOM 1.39". I see zigzags but not why 2.65 puts the ball on the other side; the distance from the bottom (starting 4.00) is never drawn as a quantity, so "1.39 from the bottom" is a number without a ruler. After I tap "Reset" the chip returns to 4.00 and the run log says "0.05 -> 1.39 . 0.45 -> < 0.001 . 0.95 -> 1.39", a compact comparison, but with an arrow notation I had to decode.
- What was SHOWN: the four 10-hop runs side by side in the log (1.39, under 0.001, 1.39, 10.37) is the lesson: the same distance for a tiny and a huge step, and the best in the middle. The fourth option (1.05, "flew off") is a good extra that the question never offered, so I could not have predicted it, but it is clearly labelled.
- Values in the reveal never on the stage: "multiplies the distance by (1 - 2 x step size): 0.9, -0.9, 0.1", "Fastest is where it is zero: 0.5" and "Past 1 it drops below -1" are told. The step size of 0.5 is never run on the stage (the buttons are 0.05, 0.45, 0.95, 1.05) and the reveal's claim "within 0.04 after two hops" is not what the stage shows (it shows "< 0.001" after 10). The last paragraph (neural networks, "learning rate") is cropped on the phone view and introduces a term the lesson never needed.
- Reveal earned: "bigger is not faster" yes (log of runs). The multiply-by-(1 - 2 x step) rule is the real why and is delivered as a formula.
- Terms before definition: "step size", "slope", "valley" are glossed; "overshooting", "zigzags" are on the stage; "learning rate" arrives at the end.
- Problems: (1) hook and title push the wrong answer hard; (2) distance-from-bottom has no visual ruler; (3) the (1 - 2 x step) rule and the 0.5 optimum are told, never run; (4) "within 0.04 after two hops" does not match any screen.
- No FATAL.

## 2. After reading the brief

- Previous review (v2, revise; 6 findings): slope undefined; reveal unlockable after one hop; the 0.05-vs-0.95 tie had no side-by-side; formula dense; valley picture shrinks in the reveal; the hook not named as the misconception. Now: "slope" is glossed in brackets, a 10-hop log shows all runs side by side, and the "Run 10 at" buttons exist. Mostly fixed for slope and the tie. Still open: the formula (1 - 2 x step) is told and 0.5 is never run, the valley still shrinks in the reveal view, and the hook still pushes the wrong answer.
- The brief's learner does not know gradients or learning rates; the objective (too small crawls, too big overshoots, past a limit flies away) is carried by the run log. The misconception (bigger step is always faster) is hit by option 3 and the hook.
- Claims verified (11/11 on the trust line).

Verdict: revise
