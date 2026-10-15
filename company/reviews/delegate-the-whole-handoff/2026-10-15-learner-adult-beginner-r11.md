*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): delegate-the-whole-handoff
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Include coordination as a prerequisite instead of ignoring it.)
Screenshots seen: yes (artifacts/walkthroughs/delegate-the-whole-handoff/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Handoff"; tapped Run queue, Swap first, Try target; opened reveal.

1. **The prediction is a giveaway.** Hook: "The helper saves work only after receiving the input." Question: "What must precede the helper task here? Handoff / Unrelated editing." The hook says it, and the stage label "helper 10m/60due←handoff" says it again.
2. **Where it first broke: there is only one person.** Delegation means someone else does the helper task while I do mine. But the chart is one row of jobs on one timeline: the helper's 10 minutes sit in my queue, one after another with my editing. The reveal even says "This single-resource model". So the lesson about delegating has no second person, and handing off saves nothing visible. I could not see what delegating bought me.
3. **The run-queue order "runs" an impossible job.** In the first order the helper starts at minute 0 before the handoff exists, and the stage just counts "Prereq 1". A job that cannot start is drawn as if it ran.
4. **Wait totals look like the benefit.** 35, 40, then 20 with the handoff first. I read "handing off first saves 15 minutes of waiting", but the drop comes from putting the 5-minute job first, not from delegation. The lesson does not say what Wait counts.
5. **Reveal versus my question.** My question is "what does a whole handoff include, and what goes wrong if I hand over half of it?" (the title says "whole handoff"). The reveal says the handoff "releases the helper's input" and disclaims any claim about speedups. Nothing about what a complete handoff contains.

Fixes (for the builder):
- Give the helper their own lane so the parallel time is visible, and show the helper sitting idle when the handoff is late or incomplete.
- Ask about what is missing from a partial handoff, which is the life-skill question; drop the generic Wait/Late/Prereq counters if they do not carry the point.

Verdict reason: the lesson models delegation with a single worker, so the helper's work never runs in parallel and the benefit of a complete handoff is never shown; the prediction is answered by the hook.

## After reading the brief (meta.json)

- Objective: 'Include coordination as a prerequisite instead of ignoring it.' The handoff is shown as a prerequisite, so the narrow objective is delivered; but the title and hook promise delegation, which needs a second worker the model does not have (finding 2).
- Misconception field is 'Unrelated editing', the foil label.
- Fix route: demo-builder.
