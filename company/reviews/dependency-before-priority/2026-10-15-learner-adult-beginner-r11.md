*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): dependency-before-priority
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish task priority from prerequisite readiness.)
Screenshots seen: yes (artifacts/walkthroughs/dependency-before-priority/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Draft before review"; tapped Run queue, Swap first; opened reveal.

1. **The prediction is a giveaway.** "Which order respects the stated dependency? Draft before review / Review before draft." You cannot review what has not been drafted. No adult picks the other option.
2. **Where it first broke: there is no priority on stage.** The title is "Priority cannot bypass input", and the reveal ends "A high priority label changes neither that prerequisite...". But no job on the stage is labelled high priority or important. The tension the title promises (the urgent thing is tempting to start first) is never set up, so the lesson is just "do step 1 before step 2".
3. **The correct order looks worse on the counter.** Review-first: Wait 40m, Prereq 1. Draft-first: Wait 50m, Prereq 0. A beginner can read that as "breaking the rule saves 10 minutes". The stage also draws review running at minute 0 with no draft, as if it happened.
4. **Reveal versus my question.** It restates that review needs the draft. It does not answer "then what should I do when the boss says the review is top priority?" (start the draft now; tell them review waits on it).

Fixes (for the builder):
- Mark one job "high priority" and make the prediction "Which runs first?" with the high-priority, blocked job as the tempting answer.
- Do not draw impossible jobs as running; grey them out as "blocked" instead. Define or drop Wait.

Verdict reason: the title's idea (priority versus dependency) has no priority on stage, the prediction is common sense, and the correct order shows a worse Wait than the rule-breaking one without explanation.

## After reading the brief (meta.json)

- Objective: 'Distinguish task priority from prerequisite readiness.' No priority appears on stage, so only readiness is shown (finding 2).
- Fix route: demo-builder.
