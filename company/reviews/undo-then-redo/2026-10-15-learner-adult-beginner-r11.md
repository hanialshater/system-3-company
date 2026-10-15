*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): undo-then-redo
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Restore a prior local edit and then reapply it.)
Screenshots seen: yes (artifacts/walkthroughs/undo-then-redo/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Undo"; tapped Undo edit (A X C became A B C), then Redo edit (back to A X C); opened reveal.

1. **The prediction is a definition.** "Which command returns to the prior edit state?" with "Undo" and "Redo": anyone who has used a phone knows. "Prior edit state" is also stiffer wording than the idea needs.
2. **Where understanding first broke: the ending undoes the lesson's title.** The title is "Undo the accidental edit". X looks like the accidental edit (B was replaced by X). Undo fixes it (A B C), then the walkthrough's second step, Redo, puts the accident back. The reveal then says "Your prediction held. The local editor now contains A · X · C", so the lesson ends with the accidental edit restored and calls it success.
3. **"Tokens 3" is meaningless here.** The count never changes and does not relate to undo or redo.
4. **The useful surprise is missing.** What beginners actually lose work to is that making a new edit after undo usually throws away the redo history. The reveal hints at it ("apps differ in which operations and histories support these commands") without showing it.
5. Undo and redo buttons both look disabled/grey in most frames; I could not tell which was active.

Fixes (for the builder):
- End on the undone state, or ask "you undid by mistake: what brings X back?" so redo has a reason.
- Add the new-edit-after-undo case so the lesson has a real prediction.
- Drop the "Tokens" readout or replace it with a visible history (B to X, with a marker for where you are).

Verdict reason: the prediction is a definition, and the lesson ends by restoring the accidental edit under "Your prediction held", so the learner gets no answer worth having.

## After reading meta.json

- Objective "restore a prior local edit and then reapply it" explains the ending: the brief wants the learner to undo and then redo. But the title calls X "the accidental edit", so the brief's ending restores the accident (finding 2). The title and the objective disagree; one must change.
- Misconception "Redo" (picking redo to go back) is not a belief most adults hold.
- Fix route: demo-builder (ending, title, history display); Life Hacks category manager for the premise.
