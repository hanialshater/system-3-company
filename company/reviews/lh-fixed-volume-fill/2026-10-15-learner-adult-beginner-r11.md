*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-fixed-volume-fill
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Distinguish fixed-volume filling from fixed-duration water use.)
Screenshots seen: yes (artifacts/walkthroughs/lh-fixed-volume-fill/sheet.png, recorded 2026-10-15T21:33, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "5L/min"; tapped Test A, Test B; slid Bucket 10 to 12L; opened reveal.

1. **Where understanding first broke: the title and the question are about different things.** The title says "Fill time is not water saved", which suggests the misconception is "a slower flow saves water". The question asks which fill time is longer, and the hook already says "A slower flow takes longer to fill the same bucket". So the prediction is answered before I make it, and the water-saving belief is never asked about.
2. **What the prediction felt like.** No stakes: slower takes longer.
3. **The picture works.** The clock faces filling to a quarter and a half against the same bucket are clear.
4. **Does the reveal answer my question?** The question I actually had, from the title, was "so does a slower tap save water or not?" The reveal says "both cases deliver the same bucket volume", which is the answer, but it is one clause and not tied back to the title's claim.

Fixes (for the builder):
- Ask the water question: "Filling the same 10L bucket, which flow uses less water?" with "2.5L/min" as the trap and "Equal" as the answer.
- Make the hook a question that does not give the answer.

Verdict reason: the hook gives the answer to a question no beginner gets wrong, and the misconception the title names (slower flow saves water) is never tested.

## After reading the brief (meta.json)

- Objective: distinguish fixed-volume filling from fixed-duration water use. Confirms finding 1: the objective is about water use, but the prediction asks about time; the fixed-duration case is never shown.
- Fix route: demo-builder (question about water used, hook).
