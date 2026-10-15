*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): duplicate-before-experiment
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish original and duplicate in a local experiment.)
Screenshots seen: yes (artifacts/walkthroughs/duplicate-before-experiment/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Edit a duplicate"; tapped Duplicate, Edit copy; opened reveal.

1. **The prediction is a giveaway.** "Which preserves a separate original here? Edit a duplicate / Overwrite only original." "Overwrite" announces that the original is lost. No belief at stake.
2. **Where it first broke: nothing goes wrong, so nothing is learned.** Duplicate makes "copy:A", Edit copy makes "copy:B", original stays "original:A". I never see the bad path (editing the original, then wanting it back), which is the whole reason for the habit. Without the regret, this is a demonstration that the Duplicate button works.
3. **Labels.** "original:A", "copy:B", "Tokens 2", "Local editor": the lesson is about experimenting on a photo, spreadsheet or document, but the stage is two letters in boxes. "Tokens" is programmer language.
4. **Reveal versus my question.** "A duplicate in one location is not a resilient backup" is a useful, honest addition. But my question (when should I duplicate first; how do I get back if I did not?) is not touched. "These are the displayed results of the two named commands" is filler.

Fixes (for the builder):
- Add the failure path: let the learner edit the original, then ask "Can you get A back?"
- Use one concrete object (a spreadsheet with a formula, a photo with a filter) instead of A/B tokens.
- Ask something uncertain, e.g. "You duplicate, then edit the original by mistake. Which is untouched?"

Verdict reason: the prediction is answered by its wording and the explore never shows the loss that duplicating prevents, so the habit has no visible reason.

## After reading the brief (meta.json)

- Objective: 'Distinguish original and duplicate in a local experiment.' Delivered narrowly (labels original:A/copy:B). The reason for the habit (recovering from a bad edit) is not in the objective or the stage.
- Misconception field is 'Overwrite only original', the foil label.
- Fix route: demo-builder.
