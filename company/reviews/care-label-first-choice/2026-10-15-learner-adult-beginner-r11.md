*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): care-label-first-choice
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The example garment’s instruction is flat dry. Selecting a convenient line-dry arrangement does not override that instruction; the task is to choose a compatible method before optimising space.)
Screenshots seen: yes (artifacts/walkthroughs/care-label-first-choice/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Hang every item" (wrong); tapped Respect flat-dry text; slid Count to 5; opened reveal.

1. **The prediction contains its answer.** "Which layout follows the shown flat-dry instruction? Hang every item / Respect flat-dry text / Same outcome." The correct option literally says "respect" the instruction. The question is reading comprehension.
2. **Where it first broke: nothing about speed or space is shown.** The title is "The label beats the fastest layout", but no layout is shown to be faster. There is no drying time, no line length, no space counter. "Compatible items" just equals the Count slider (3, then 5). Hanging never showed a number at all (it stayed "?" before I switched), so I never saw hanging score 0.
3. **The toggle highlight looks inverted.** After I tapped "Respect flat-dry text", the white raised button was "Hang every item".
4. **Reveal versus my question.** My real question is "what goes wrong if I hang a flat-dry jumper?" (it stretches out of shape). The reveal says hanging "does not override that instruction" and "read the real label", which is true but tells me nothing I did not know before. The slider adds nothing.

Fixes (for the builder):
- Show the consequence: a hung knit stretching, versus flat. Show the trade-off the title promises (hanging is faster/takes less floor space, but the label wins).
- Make the prediction about something uncertain, e.g. "This jumper says dry flat. On a hanger it will: be fine / stretch / shrink".

Verdict reason: the prediction is answered by its own option wording and the stage never shows the speed trade-off or the cost of ignoring the label.

## After reading the brief (meta.json)

- Objective text matches the reveal word for word. The 'before optimising space' half has no stage support: nothing on stage measures space or speed (finding 2). Misconception field is the generic template sentence.
- Fix route: demo-builder.
