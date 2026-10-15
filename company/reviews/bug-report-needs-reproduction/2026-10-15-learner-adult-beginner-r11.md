*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): bug-report-needs-reproduction
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Specify input, expected output and actual output in a bug report.)
Screenshots seen: yes (artifacts/walkthroughs/bug-report-needs-reproduction/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Input expected actual"; tapped Add Expected, Add Actual; opened reveal.

1. **The prediction is a giveaway.** "Which report supports a reproduction attempt? Input expected actual / It broke." The hook already says "It broke" lacks the input. Nobody picks "It broke".
2. **Where it first broke: the explore does nothing I could get wrong.** Two buttons fill in Expected 4 and Actual 5. Fields go 1/3, 2/3, 3/3. There is no attempt to reproduce anything, no "It broke" report to compare against, and no moment where a missing field stops me. I watched a form fill itself.
3. **"x=2, expected 4, actual 5" is abstract.** For a non-programmer, a real example (I clicked Save with an empty title; expected a warning; got a blank page) would make "input" meaningful.
4. **Reveal versus my question.** It restates the checklist and adds a correct caveat (reproducing is not root cause). It does not show why Expected matters (without it, 5 might be right). That is the interesting part, and it is missing.

Fixes (for the builder):
- Let the learner try to reproduce from an incomplete report and fail, e.g. a report missing Expected where you cannot tell whether 5 is wrong.
- Make the foil plausible (e.g. "Input and actual only") so the prediction is a real choice.

Verdict reason: the prediction is answered by the hook, and the explore is a form that fills itself, so no belief is tested and the role of each field is never shown.

## After reading the brief (meta.json)

- Misconception field is 'It broke', the foil label. Objective (specify input, expected, actual) is shown as a list but the reason each field is needed is not (finding 2/4).
- Fix route: demo-builder.
