*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): selection-not-focus
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish choosing a target from bringing a panel into focus.)
Screenshots seen: yes (artifacts/walkthroughs/selection-not-focus/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Selection"; tapped Focus right, Select B; opened reveal.

1. **Where understanding first broke: which mark is focus and which is selection?** There are two unlabelled marks: a thick black border and a brown underline. At the start, left:A has both. After "Focus right", the underline moves to right:B and the thick border stays on left:A. After "Select B", right:B has both. I had to reverse-engineer that underline = focus and border = selection. Only the focus has a readout ("Focus right"). There is no "Selection: A/B" readout, so the state the lesson calls decisive is the unlabelled one.
2. **No command is ever run.** The question is "Which identifies the item the command will affect?", but there is no command button. I never see a command hit the selected item while focus is elsewhere, which is the moment that would teach it. The interesting state (focus right, selection still A) exists after step 1 and passes without comment.
3. **The reveal does not answer my question.** "Focus is right; selection is B" describes the end state, where both point at B. Ending where focus and selection agree hides the difference the title promises ("Focus and selection differ").
4. "left:A / right:B" labels and "The fixture records focus and selection separately" are developer-speak for a beginner.

Fixes (for the builder):
- Label both marks (Focus / Selected) and add a "Selected: A" readout.
- Add a "Delete" or "Bold" command and let the learner run it while focus and selection differ.

Verdict reason: selection is shown only by an unlabelled border and no command is ever run, so the learner never sees which item a command affects when focus and selection differ.

## After reading the brief (meta.json)

- The objective is "Distinguish choosing a target from bringing a panel into focus." The two states exist in the fixture, but selection is not labelled and no command shows the consequence (findings 1–2).
- Fix route: demo-builder.
