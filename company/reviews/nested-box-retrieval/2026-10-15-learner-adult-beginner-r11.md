*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): nested-box-retrieval
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Nesting can share empty envelope space while adding objects that must be removed to reach an inner target. Separate storage trades a larger footprint for immediate access in this drawing.)
Screenshots seen: yes (artifacts/walkthroughs/nested-box-retrieval/sheet.png, recorded 2026-10-15T21:37:24.218Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Deep nesting" (wrong); tapped "Separate boxes"; slid Count 5 to 7; opened reveal.

1. **Where understanding first broke: the "deep nesting" picture is not nested.** The predict frame shows five rectangles in a 2-2-1 grid with an arrow, which looks like a stack or shelf, not boxes inside boxes. "Inner target" and "blockers" are not explained; I worked out "blockers" means boxes you must remove first. The tapped layout button does not look selected: after I tapped the second layout, the stage highlighted the first one (white, bold) and greyed the one I chose, so I was not sure which layout the readout described.
2. **What the prediction felt like.** Mostly given away: "which layout gives the inner target fewer blockers?" Separate boxes have no inner target by definition.
3. **The nesting count is never shown.** The walk showed only "Separate boxes: 0 blockers" at 5 and 7 boxes. The number that would teach me (with deep nesting, 4 boxes must come out to reach the fifth) never appears, so sliding the count changes nothing I can see.
4. **Whether the reveal answered my question.** "Nesting can share empty envelope space while adding objects that must be removed" is the idea, but "envelope space" is jargon; "nesting saves space but buries the inside box" is what I would understand. "The current separate boxes setting gives 0" is robotic.

Verdict reason: the nested layout is not drawn as nesting and its blocker count is never shown; draw boxes inside boxes, show both counts, and ask how many boxes come out to reach the innermost.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, so the boundary is under-specified (category manager). I used the boundary "everyday objects have sizes, positions and amounts".
- The selected-state styling (tapped layout shown unselected) recurs across this layout template (lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, mug-handle-packing, nested-box-retrieval): likely one kit or template fix; worth a QA check.
- Fix route: demo-builder (draw nesting; show the nested blocker count).
