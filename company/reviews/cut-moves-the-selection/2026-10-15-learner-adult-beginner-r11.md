*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): cut-moves-the-selection
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Move selected content while observing its removal from the original position.)
Screenshots seen: yes (artifacts/walkthroughs/cut-moves-the-selection/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Removal from source"; tapped Cut B, Paste B; opened reveal.

1. **The prediction is a giveaway.** Hook: "Copy and cut agree only if you ignore what happened to the source." Question: "What differs between cut and copy? Removal from source / The selected letters." The hook answers it, and "the selected letters" is not a plausible belief.
2. **This part works.** Cut B removed B (A, C; Tokens 2), and Paste B put it at the end (A, C, B). I could see B move. Unlike the copy lesson, cut and paste are separate steps here.
3. **Where it first broke: copy is never on stage.** The question is about the difference between cut and copy, but there is no copy button, so the difference is asserted, not shown. I had to remember the other lesson.
4. **"Tokens" and "Local editor" are odd words** for a beginner; "letters" or "items" and "document" would do.
5. **Reveal versus my question.** It says cut removes and places at the destination. A beginner's actual worry is "if I cut and never paste, is it gone?" That is the one practical risk of cut, and it is not mentioned.

Fixes (for the builder):
- Put Copy and Cut side by side on one stage so the difference is visible, or ask a prediction about the risk ("You cut B, then cut D before pasting. What happens to B?").
- Plain words for Tokens/Local editor.

Verdict reason: the prediction is answered by the hook, and the stage never shows copy, so the cut/copy difference the question asks about is not demonstrated.

## After reading the brief (meta.json)

- Objective (move content while observing removal from the original position) is delivered: B visibly leaves and lands at the end. The gap is the comparison with copy that the prediction asks about.
- Misconception field is 'The selected letters', the foil label.
- Fix route: demo-builder.
