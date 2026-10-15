*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: square-bow-stays-tied
lesson version: v1
boundary: adult beginner (borrowed mind). Knows: Everyday objects have sizes, positions and amounts. Does not know: Opposing knot stages make the balanced reef bow lie flat; the granny bow twists out of line. Impact and moving lace ends can work a bow loose.. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/square-bow-stays-tied/sheet.png, recorded 2026-10-15T10:11:03.263Z, build c0cfd14 served on localhost:3590)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: on the first screen. Both bows are labelled "Matching ?" before I do anything. The controls are named "Second: right-over-left" and "Walk 20 steps", and the status line reads "First: left-over-right - 20mm loops - loss=0.8/0.3mm/step - Model steps=0. Both can fail." That is a debug line, and it gives away the answer: the model *assumes* the matching bow loses 0.8 mm per step and the opposing one 0.3. The "evidence" from walking is the input played back.
2. What the prediction felt like: a guess. The lesson never says what a "wrap" or "stage" is, or what makes wraps "match". The title asks "Which way does your bow lie?", but the question asks which holds better.
3. Whether the reveal answered my question: no. It opens "Not quite: it was 'Opposing wraps'. Not quite." (said twice), gives loop sizes (4 mm vs 14 mm) that come from the assumed loss rates, then says the reef bow "lies flat; the granny bow twists out of line" without linking how the bow lies to why it holds. My question (why does opposing hold better, and how do I tell which I tied?) is left open, and the drawings show a vertical bow vs a horizontal bow with no label saying that is the sign.

Verdict reason: the stage shows a debug-style line (loss=0.8/0.3mm/step) whose assumed rates produce the result, the reveal says "Not quite" twice, and the reveal does not connect "lies flat vs twists" to holding or tell the learner how to read their own bow.

## After reading build.md / meta.json

- No earlier learner review was recorded in evidence.simulatedLearner. The build note's own residual (the shared BowStage picture still draws the matching bow turned 90 deg) matches what I saw: the drawings show orientation, but nothing on the stage tells the learner that orientation is the sign to look for. The W-938 rewording moved the reveal from "along / across the shoe" to "lie flat / twists out of line"; the drawing does not show twisting, it shows a vertical bow.
- The double "Not quite" and the debug-style status line look like engine issues shared with other Life Hacks lessons. Worth a look by QA across the batch.
