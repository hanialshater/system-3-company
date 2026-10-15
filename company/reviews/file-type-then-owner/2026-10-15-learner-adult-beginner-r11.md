*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): file-type-then-owner
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Intersect type and owner filters.)
Screenshots seen: yes (artifacts/walkthroughs/file-type-then-owner/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Both conditions"; tapped PDF only, Ana only; opened reveal.

1. **The hook gives the answer.** "Four files; two are PDFs and two are Ana's. Which one matches both?" Then the question asks what adding an owner filter means: "Both conditions / Either condition". The hook already said "matches both".
2. **Where it first broke: the button labelled "Ana only" did not show Ana's files.** Ana has two files (plan.pdf and note.txt). After PDF only, I tapped "Ana only" and got 1 match, plan.pdf. That is correct for "PDF and Ana", but the button says "Ana only", which reads as "show Ana's files". For a moment I thought it was broken. The stacking of filters, which is the lesson, is hidden behind a label that says the opposite.
3. **"Either" is never shown.** The wrong answer (3 files: plan, map, note) is never displayed, so I never see the difference between narrowing and widening.
4. **The fading rows work.** Seeing map.pdf fade when the owner filter was added is the clearest frame.
5. **Reveal versus my question.** "Combining these two filters requires both fields to match... counts the intersection, rather than adding the two result sets." Correct, though "intersection" is maths language. It answers the question for this tool; a beginner would also want to know that most file search boxes work this way (and that some let you choose OR), but that is a nice-to-have.

Fixes (for the builder):
- Label the second control "+ Owner: Ana" (adds to the current filter) and show the active filters as chips.
- Show the "either" result (3 files) somewhere so the two meanings can be compared.
- Remove "matches both" from the hook.

Verdict reason: the hook answers the prediction, and the "Ana only" control actually applies "PDF and Ana", so its label contradicts what the learner sees.

## After reading the brief (meta.json)

- Version v2. Objective: 'Intersect type and owner filters.' The stage does intersect them, but the control labelled 'Ana only' performs 'PDF and Ana' (finding 2).
- Misconception field is 'Either condition', the foil label.
- Fix route: demo-builder (control label, show the either result).
