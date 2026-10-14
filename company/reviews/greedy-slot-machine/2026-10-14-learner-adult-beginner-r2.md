*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): greedy-slot-machine
lesson version: v2
boundary: adult with school maths; knows slot machines and percentages; no reinforcement-learning vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/greedy-slot-machine/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the stem is now one clear story (A 30%, B 70%, one pull each, then greedy picks the better record). It asks how often greedy gets stuck on A, which matches the hook ("How often does that go wrong?"). The locked bars are empty and the readouts "–". Nothing leaks.
- Explore: run 1 has red greedy bars (40, 29, 23, 30, 41, "stuck on A") against green explorer bars, and the line "first pulls: A lost, B lost". Run 2 has greedy mostly on B. "Watch 100 more" gives "greedy stuck 33 of 102", the quantity the question asked for. Last-100 averages are 57 vs 67.
- Reveal: the 33 of 102 (32%), 57 and 67 were all seen. It answers the hook.

## 2. Earlier findings (v1 review)

1. Stem mixed "you" and "a player": **fixed**.
2. Question and demo pointed at different numbers: **fixed** (both are about greedy being stuck).
3. Lock-in mechanism told: **partly fixed** (the "first pulls" line is on stage; see below).
4. Hook leaked: **fixed** (it now asks "how often").

## 3. New findings

- Minor, but a real confusion for my boundary: run 1's line says "first pulls: **A lost, B lost**", and the reveal explains the lock-in only by "B lost, so B looked like 0%". With both at 0%, why did greedy pick A? A tie-break rule is implied but never stated. One clause ("on a tie it picks A") would close it.
- Minor: the trust link says 4/5 claims checked. One claim on this lesson is not yet verified (fact-checker's lane).
- No FATAL.
