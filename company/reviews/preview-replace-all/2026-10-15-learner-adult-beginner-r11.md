*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): preview-replace-all
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Inspect every exact-match replacement before applying it.)
Screenshots seen: yes (artifacts/walkthroughs/preview-replace-all/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "All affected matches"; tapped Preview matches, Apply replacement; opened reveal.

1. **Where understanding first broke: there is no match I "did not mean to touch".** The hook is "a broad replacement can change matches you did not mean to touch". The document is red / blue / red, and both reds are equally fine to change. The preview (both reds in orange) is clear, but it shows me nothing I would want to stop, so I never learn why previewing matters.
2. **The prediction is obvious.** "All affected matches" against "Only first match", for something called a preview of replace-all. I chose it without thinking.
3. **The reveal does not answer my question.** It says "it does not determine whether the replacement was appropriate", which is honest, but the lesson never shows a case where it was not appropriate. The question I came with ("how would I catch a bad match?") is unanswered.
4. Good: the preview frame highlights both matches before anything changes, and Apply turns exactly those into green.

Fixes (for the builder):
- Add one unintended match in the fixture (a word containing the target, or the same word used another way), so the preview catches something.
- Let the learner skip a match after previewing, or at least name the bad match in the reveal.

Verdict reason: the fixture has no unintended match, so the preview never catches anything, and the hook's danger is never shown.

## After reading the brief (meta.json)

- The objective is "Inspect every exact-match replacement before applying it." Inspection is shown. The trust-sheet claim mentions an unintended match ("the title in 'Dr Smith'") that is not on stage. That example is what the stage needs (finding 1).
- Fix route: demo-builder (add the unintended match); fact-checker to check that the claim matches what is shown.
