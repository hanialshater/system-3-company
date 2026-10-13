*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: greedy-slot-machine
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (knows slot machines and percent; has no reinforcement-learning vocabulary). Screenshots seen (sheet.png, all 4 frames).

## 1. From the artifact

- Prediction: the stem is tangled: "you don't know which is which, and you are stuck on A. A player who pulls a random machine 10% of the time, and otherwise the better-looking one, has found B." The learner is "you", stuck on A, and also a player who has found B; two characters in one sentence. The hook ("Can it lock you into the worse machine?") leaks that yes, it can. Option 30 is the "stuck" answer, 90 the "found B, perfect" answer, 68 the correct figure, which needs 0.9 x 70 + 0.1 x 50.
- The locked stage shows two empty bar groups, Greedy and 10% explorer, with dashed 30 and 70 lines. Fine.
- Where understanding first broke: the question versus the demo. The question asks what the explorer wins (68). The learner who picked 30 then sees red greedy bars (40, 29, 23, 30, 41, "stuck on A") and green explorer bars (47, 70, 67, 63, 75). The visible story is "greedy got stuck", which the question did not ask about; the learner's "30" is a correct number for greedy, and the reveal opens "Not quite: it was 68", which feels unfair to a learner who sees 30 on the stage.
- Told not shown: the mechanism ("greedy's single early pull on B lost, so B looked like 0% and it never tried B again"). The stage shows bars per 100 pulls, not the pulls. "Across 2,000 runs, 30%", "its last 100 pulls averaged 58", and "costs about 2 wins per 100 when greedy is lucky and saves about 40 when it is not" are told; the learner saw 2 runs. Run 2 shows greedy mostly on B (69, 73, 64, 72, 68), a good surprise ("not always stuck"), but the first bar of the explorer in run 1 (47) is unexplained (it is still exploring).
- AI claim: the lesson is about a toy of two machines with known payoffs. The reveal speaks of "greedy" as a general property; it never says real systems (recommenders, agents) behave this way. Tone is bounded to the toy.
- Reveal earned: 68 yes (explorer bars sit around 62 to 77), the lock-in idea shown once.
- Problems: (1) the stem mixes "you" and "a player"; (2) question and demo point at different numbers; (3) the lock-in mechanism is told; (4) hook leaks.
- No FATAL.

## 2. After reading the brief

- The brief's objective is that a greedy learner can be fooled by an unlucky early result and never revisit the better option, while exploring costs little. The stage shows greedy stuck in run 1 and fine in run 2, which supports "can be fooled, not always". The prediction question, however, is about the explorer's win rate (68), a different quantity from the lesson's point, and the early-pull mechanism is only told.
- Claims verified (5/5).

Verdict: revise
