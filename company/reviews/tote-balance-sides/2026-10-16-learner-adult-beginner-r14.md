*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: tote-balance-sides
lesson version: v2
boundary: adult beginner. Packs bags, owns a drawer of cords and a sock pile, does school arithmetic (add, subtract, multiply). Has no physics of moments, no combinatorics (has never seen n(n-1)/2), and has never seen these household hacks framed as counts.
Screenshots seen: yes (artifacts/walkthroughs/tote-balance-sides/sheet.png, recorded 2026-10-16T11:17:28Z, lhw3 at 99d6f2d, production build, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Walked from the transcript cut at the trust-sheet appendix (steward ruling R1) and sheet.png. Path: option 1, A, B, slider.

1. **Where understanding first broke.** At the balance-point row. The table says "−10 cm · left of the handle", but the picture shows the tilted bag with its dot hanging right under the handle. I had to read the reveal ("the bag tilts until that point is under the handle") to see that the number describes the bag before it tilts. "−" and "left" say the same thing twice. Where the 10 cm comes from (how far each side's load sits from the centre) is never shown.
2. **What the prediction felt like.** Good tension. "No: the total didn't change" is a belief people really hold, and the arithmetic (3 − 1 = 2, 1 + 1 = 2) is within reach. Getting it wrong felt like being shown something, not tricked.
3. **Did the reveal answer my question?** Yes: the total stays the same, the balance moves, and moving 1 kg evens it out. One wobble: after the slider (5 kg left), "Evened out" is 3 kg each side, which means moving 2 kg. The reveal's first line quotes 3 kg each side, and its mechanism line then goes back to "move 1 kg across ... both sides hold 2 kg". The two cases sit side by side without a word linking them.

Verdict reason: no finding blocks a first-time learner. Notes: the balance-point number and the tilted picture disagree until the reveal; after the slider moves, the reveal mixes the 5/1 and 3/1 cases.

## After reading build.md / meta.json

- c3 gives the hidden geometry: loads at −20 and +20 cm from the handle. The learner never sees the 20 cm, so "−10 cm" has nothing to anchor it.
- c1 (the mechanism sentence, "Move 1 kg across and both sides hold 2 kg") is **unverified** in meta.json, and the trust link reads 6/7. It is the sentence that goes back to the 3/1 case after the slider moves. That is for the fact-checker; it does not change my verdict.
- The r11 point ("Left mass 3.2kg" beside a 0 cm centre) is fixed: I saw equal boxes and equal labels.
