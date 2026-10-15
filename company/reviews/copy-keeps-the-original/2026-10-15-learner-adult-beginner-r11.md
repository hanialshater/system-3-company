*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): copy-keeps-the-original
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish copy from move using visible source and destination.)
Screenshots seen: yes (artifacts/walkthroughs/copy-keeps-the-original/sheet.png, recorded 2026-10-15T21:33)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Original source"; tapped Copy B, Paste again; opened reveal.

1. **The prediction is a giveaway.** Title "Copy keeps the original", hook "without moving the source", question "What does copy preserve? Original source / Only destination". All three say the answer.
2. **Where it first broke: "Copy B" also pastes.** Tapping Copy B added a second B to the document immediately. On a real computer, copying alone changes nothing you can see; you need to paste. A real beginner (the person this would help) would learn the wrong thing: that copy puts a duplicate in the document. "Paste again" then implies the first paste was hidden inside Copy.
3. **Nothing contrasts with cut.** The lesson's point is "the source stays". I never see what the alternative (source disappears) looks like here, so "stays" has nothing to stand against.
4. **Reveal versus my question.** It says copy leaves the source and creates destination content, and then "This fixture models that command; operating-system clipboard rules are outside it". The clipboard is exactly what a beginner is confused about (where does the copy wait?). Excluding it removes the useful part.

Fixes (for the builder):
- Split Copy and Paste into separate steps and show a clipboard slot holding B between them.
- Ask a question with a real wrong answer, e.g. "You copy B, then paste twice. How many Bs?" or "You copy B and then delete the original. Can you still paste?"

Verdict reason: "Copy B" both copies and pastes, which models copying wrongly for a beginner, and the prediction is answered by the title.

## After reading the brief (meta.json)

- Objective: 'Distinguish copy from move using visible source and destination.' There is no move on this stage, so the distinction is not available here (the cut lesson is separate). The Copy-button-also-pastes issue (finding 2) is not addressed in the brief.
- Misconception field is 'Only destination', the foil label.
- Fix route: demo-builder.
