*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-indivisible-shares
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Preserve the remainder after dividing indivisible resources equally.)
Screenshots seen: yes (artifacts/walkthroughs/lh-indivisible-shares/sheet.png, recorded 2026-10-15T21:34, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Distributed"; tapped Test A, Test B; slid Objects 10 to 12; opened reveal.

1. **Where understanding first broke: the options.** The hook is a good question ("where does the tenth go?"), but the prediction asks "which count is larger?" with options "Distributed", "Available", "Equal". I had to work out that "Available" means the ten I started with and "Distributed" means what was handed out. Once decoded, it is obvious you cannot hand out more than you have, so the only real choice is between "Available" and "Equal".
2. **"floor" is outside my boundary.** "(3×floor((10÷3)))" and the reveal's "Floor division" are words I do not know. "3 each, 3 people" would say it.
3. **The picture is two buckets filling.** It does not show three people or one item left over, which is the thing the hook asks about.
4. **The slider is the best moment.** At 12 the two counts become equal, so I can see the leftover appears only when the count does not split evenly.
5. **Does the reveal answer my question?** Yes in words: ten gives three each and one aside, and the remainder stays in the inventory. The hook's question is answered.

Fixes (for the builder):
- Ask the hook's question directly: "10 among 3, equal whole shares: how many are left over?" (0, 1, 3.33...).
- Replace "floor" with "whole shares"; draw three piles and one aside.

Verdict reason: the options are labels I had to decode and the working uses "floor", so the prediction is about vocabulary rather than about the leftover.

## After reading the brief (meta.json)

- Objective: preserve the remainder after equal division. The reveal says it; the prediction's opaque labels and "floor" get in the way (findings 1-2).
- Fix route: demo-builder (question, wording, picture).
