*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): cut-the-rod-for-more
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows that smaller answers combine into bigger ones and how to add prices; does not know that the best price of a rod needs the best price of every shorter rod; has never met rod cutting as dynamic programming)
Screenshots seen: yes (artifacts/walkthroughs/cut-the-rod-for-more/sheet.png)
Verdict: revise

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "$9, sell it whole"; tapped "Fill best(1)"; tapped "Fill the rest"; opened reveal.

1. **The title points to the answer (revise).** "Cut the rod for more money" states that cutting earns more. The hook then asks "Can cutting it ever pay more?", but the title has already answered it, which rules out "$9, sell it whole" before the commit. That is the phrase case in "No answer before the commit". The hook alone is a fair question; the title is the leak.
2. **The idea is on the stage.** The length-4 row fills as two green "2 · $5" pieces, $10, against "WHOLE ROD $9", and the four cut lines (cut 1: $1 + $8, cut 2: $5 + $5 = $10 keep, ...) show the comparison. A first-time learner sees that cutting wins, and by how much.
3. **The reuse (the why) is shown thinly.** "Fill the rest" jumps from best(1) to the full table in one tap, so the learner never watches best(2) or best(3) get built and then reused. The reuse does appear: in "cut 1: $1 + $8", the $8 is the best(3) row above. But nothing on the stage links the two (no highlight from the row to the term). A beginner can read the cut list as four sums and miss that each one takes a filled row. "Each shorter rod is solved once and reused" is then mostly told. Minor to moderate.
4. **"Best-priced piece (length 3, $8)" in the reveal is unclear.** Best price per unit of length ($8/3 vs $5/2) is never shown on the stage, so "best-priced" reads as "most expensive" or as nothing. It is the greedy-trap point and it lands only for a reader who does the division.
5. **Reveal quotes what was seen:** $1, $5, $8, $10 and $5 + $5 vs $9 are all on the final stage. The length-8 example ($22 vs $20) is told context, one sentence. Under 120 words.
6. Options: "$9, sell it whole" is worded more fully than "$10" and "$13", but it is a wrong option, so it does not point to the answer.

## After reading the brief and the r6 review

r6 (v1) findings:
1. QA path never reached the reveal (one relabelling button, then Start over): **fixed**. "Fill the rest" now reaches best(4) and the reveal opened on the recorded path.
2. Hook "Can cutting it ever pay more?" leans toward "yes": **not fixed**, and it is stronger than r6 said. The title "Cut the rod for more money" asserts the answer. Under the 2026-10-14 "No answer before the commit" rule this is a revise.
3. The reused value in each cut line is not linked to its row: **not fixed**. Now worse on the recorded path, because "Fill the rest" skips building best(2) and best(3) one at a time.
4. Stage text near 25 words at best(4): **not fixed**, minor.

Verdict reason: the stage shows that cutting wins, but the title gives that away before the commit, and the reuse (the brief's doesNotKnow) is mostly told. Fix route: demo-builder.
