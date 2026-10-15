*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): separate-ready-from-blocked
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Move blocked work behind its explicitly required input.)
Screenshots seen: yes (artifacts/walkthroughs/separate-ready-from-blocked/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Independent work"; tapped Run queue (output first: Wait 40m, Prereq 1), Swap first (Wait 35m, Prereq 1), Try target (independent → input → output: Wait 25m, Prereq 0); opened reveal.

1. **Where understanding first broke: the "input" is not something that arrives. It is a 5-minute task in the same queue.** The question is "Which task can run before the input arrives?", which suggests waiting on someone else. On stage, "input" is just another job I can run myself, at any time. Then the obvious best plan is to run the input first: input → independent → output gives total waiting 0 + 5 + 15 = 20 minutes, less than the lesson's target order (25). So the lesson's own metric says the "ready vs blocked" ordering it rewards is not the best one, and I came away unsure what I was supposed to learn.
2. **The board is jargon-heavy.** "15m/60due←input", "Wait", "Late", "Prereq" and a red due line at 60 are all unexplained. I had to guess that "←input" means "needs input first" and that "Prereq 1" counts a broken dependency.
3. **The reveal half-answers.** "An ordering that executes it first violates the dependency" is clear and matches Prereq 1 → 0. But "All jobs are ready except for the stated prerequisites" does not explain why independent work should go before the input.
4. "Try target" is an opaque button name.

Fixes (for the builder):
- Make the input external (arrives at minute 20, not a runnable task), so the choice really is "run independent work while waiting" vs "sit idle".
- Explain the row notation once ("15 min, due at 60, needs input").

Verdict reason: the input is modelled as a task the learner can run first, so the "run ready work while blocked" lesson does not hold on its own stage (input first gives less waiting than the target order).

## After reading the brief (meta.json)

- The objective is "Move blocked work behind its explicitly required input." The Prereq 1 → 0 counter does deliver this narrower objective. But the question and hook frame the input as something that *arrives*, and on stage it is a runnable job, so input-first beats the target order on the lesson's own waiting metric (finding 1).
- The trust-sheet claim mentions "the poster" and "the room booking", which are not on stage (it shows output / independent / input). Route: fact-checker.
- Fix route: demo-builder (external input with an arrival time).
