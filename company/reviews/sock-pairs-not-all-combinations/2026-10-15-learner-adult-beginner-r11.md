*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): sock-pairs-not-all-combinations
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Without partner marks, every unordered pair is a candidate. Unique partner marks reduce the pictured task to one match per marked pair. The combinatorial growth explains the appeal of distinctive patterns.)
Screenshots seen: yes (artifacts/walkthroughs/sock-pairs-not-all-combinations/sheet.png, recorded 2026-10-15T21:33, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "All possible pairs"; tapped Marked partners; slid Count from 6 to 10; opened reveal.

1. **Where understanding first broke: the big number never appears.** The title promises "six socks are not six possible pairs", so the payoff is that six unmarked socks make 15 possible pairs (and ten make 45). I only ever saw the marked-partners count (3, then 5). The "All possible pairs" count stayed "?" and was never shown. The lesson's surprise is missing from the stage.
2. **The reveal mentions "combinatorial growth" without showing it.** "Combinatorial" is beyond my boundary, and the growth (15 to 45 while marked pairs go 3 to 5) is exactly what the slider could show if both numbers were on screen.
3. **The prediction is easy.** "Marked partners checks fewer pairs" is obvious. Asking "how many pairs could six socks make?" would create a real prediction (most people say 3 or 6).
4. **Layout:** on the reveal screen the top row of socks is cut off at the top of the stage.
5. **The selected button looks reversed.**

Fixes (for the builder):
- Show both counts side by side (15 vs 3; 45 vs 5) and let the slider move both.
- Put the prediction on the number of possible pairs, not on which method is smaller.
- Replace "combinatorial growth" with plain words ("the number of pairs grows much faster than the number of socks").

Verdict reason: the lesson's whole point (six socks make 15 possible pairs) is never shown on stage, so the reveal answers a question nobody had.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which matches finding 1: the prediction has no real trap.
- Fix route: demo-builder (show both options' results side by side, fix the selected-button look, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
