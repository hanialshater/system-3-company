*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): cut-the-rod-for-more
lesson version: v1
boundary (from meta.json learner): knows that smaller answers combine into bigger ones (ways-to-make-ten) and how to add prices; does not know that the best price of a rod needs the best price of every shorter rod, and has never met rod cutting as dynamic programming.
Screenshots seen: yes (artifacts/walkthroughs/cut-the-rod-for-more/sheet.png, plus a probe sheet that pressed Fill best(1) to Fill best(4) in order and opened the reveal)
Verdict: launch

## 1. From the artifact

- Walkthrough path: on the QA path, which presses each control once in DOM order, the reveal **never unlocked**. "Fill best(1)" is one button that relabels itself to best(2), best(3) and best(4). The next control in DOM order is "Start over", which wipes the table. A learner will keep tapping the same button, so this is not a learner blocker. It does mean the recorded walkthrough and computer-use QA never reach the key state or the reveal. Routed as a QA-path issue (see below).
- Hook and predict: "Can cutting it ever pay more?" leans a little toward "yes", which hints that $9 is wrong. The options are good: $13 (a 2 + 3 that overshoots the length) and $10 are both tempting. The locked stage shows the price list and four empty rows with "?". Nothing leaks.
- Explore (probe): each fill shows the rule "best(n) = largest of: first piece + best of the rest" and one line per first cut, with the winner marked "← keep". At length 4 the stage shows "cut 1: $1 + $8 = $9", "cut 2: $5 + $5 = $10 ← keep", "cut 3: $8 + $1 = $9" and "cut 4: $9 + $0 = $9". It also shows the bar for length 4 split into two green "2 · $5" pieces, with BEST(4) $10 next to WHOLE ROD $9. Both misconceptions (sell it whole; cut off the best-priced piece once, $8 + $1) are shown losing on stage.
- The why (the best price needs every shorter best): it is on stage as numbers. The "best of the rest" in each cut line is a value from a row above ($8 is best(3), $1 is best(1)). The link is not drawn: no row lights up when its value is reused. A beginner has to match $8 to the length-3 row on their own. That works with four rows, but it is the weakest point.
- Reveal: it quotes only values the learner saw ($1, $5, $8, $10; $5 + $5 beats $9 and $8 + $1). The length-8 / $22 example is told, but it is extension beyond the four rows, as the standard's "big numbers go in the reveal" allows. It ends on the idea ("each shorter rod is solved once and reused").
- Text budget: at best(4) the stage holds the rule line plus four cut lines, which is near or over 25 words. It is still readable on the phone.
- No FATAL.

## 2. After reading the brief

No earlier learner review exists (folder has only a fact-check), so there are no earlier findings to track.

- doesNotKnow 1 (the best price needs every shorter rod's best): shown as the cut lines that reuse the rows above, and the reveal points at it. It meets the told-vs-shown rule. It would be stronger if each cut line lit up the row it borrows "best of the rest" from.
- doesNotKnow 2 (DP as a name) is never named, which is fine for 60 s.
- Misconception: both halves are shown losing on stage.
- QA-path issue for demo-builder / qa-tester: one relabelling button plus "Start over" next in DOM order means the walkthrough and QA reach only best(1). Consider four buttons (best(1) to best(4)), or a "Start over" placed after the fill button that stays disabled until All filled, so the recorded path reaches $10.
