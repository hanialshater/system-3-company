*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): no-best-move-one-stable-pair
lesson version: v1
boundary: adult-beginner. Knows dominant strategies and how to read a payoff table; does not know that a pair of mutual best replies can pin down the outcome when no move is dominant (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/no-best-move-one-stable-pair/sheet.png, all 11 frames)
Verdict: launch

## 1. From the artifact

- Hook and predict: "Neither player has a move that wins against everything. Can we still predict the game?" is a good tension. The question is a find-it puzzle over a fully visible 3×3 payoff grid, and the locked stage leaks nothing beyond the payoffs, which the question needs. Watch-out: (M, L) also holds the largest numbers (4, 2), so a learner can pick it for "biggest payoffs" and be right for the wrong reason. The reveal does answer with the best-reply reason.
- Explore: tapping a cell marks it ✗ or ✓. The stage outlines Row's best reply (solid) and Column's best reply (dashed) in that line and writes the switch ("Row switches to M (4 > 3). Column switches to C (3 > 1)."). At (M, L): "Nobody switches: 4 is Row's best in L, 2 is Column's best in M." The counters (CELLS CHECKED, STABLE FOUND) track it. The stability test is something the learner does, cell by cell, and sees the result of. This is the idea, shown.
- The legend "Solid: Row's best reply · dashed: Column's best reply" is understandable after one tap, but the gray outline on the tapped cell is a third style that the legend does not name. Minor.
- The hook's claim that "no move is best against every reply" is never checked on stage. The outlines move to different rows and columns as you tap, which hints at it, but nothing says "Row's best reply changes with Column's move". It is context, told once in the stem and once in the reveal.
- Reveal: "In the 8 other cells you checked, someone gained by switching" matches this run, where all 9 were checked. But "Show me why" unlocked at 4 of 9 (frame 05). If the reveal text does not adapt, a learner who reveals at 4 reads "8 other cells you checked" when they checked 3. I could not test that path from this walkthrough. It should be confirmed.
- Minor: "Why trust this? (0/5 claims checked)" (fact-checker item, DRAFT).

## 2. Earlier findings

No earlier learner review in company/reviews/no-best-move-one-stable-pair/. The boundary is taken from meta.json.

## 3. After reading the brief

- The doesNotKnow item, that mutual best replies pin down the outcome, is what the learner does on stage: each tap tests both sides and the ✓ appears only at (M, L). The reveal points at the 4 and the 2 the learner saw. That meets "Show the why you promised".
- The early-reveal concern in section 1 is resolved. I checked the reveal sentence in Demo.tsx, and it uses the learner's own count of unstable cells seen (`{unstableSeen} other cells you checked`), so it stays true at 4 of 9.
- For this boundary, which knows dominant strategies, "no move is best against everything" is fair context to state in the stem.
- Minors: (M, L) can be picked for "biggest numbers", the tapped-cell outline is not in the legend, 0/5 claims checked. No FATAL.
