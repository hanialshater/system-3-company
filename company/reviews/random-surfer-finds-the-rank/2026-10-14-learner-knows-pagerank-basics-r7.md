*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): random-surfer-finds-the-rank
lesson version: v3
boundary: knows-pagerank-basics (same tag as r6). Knows PageRank passes rank along links and that a random walk moves by chance. Does not know that PageRank equals the share of time a random clicker who sometimes jumps spends on each page.
Screenshots seen: yes (artifacts/walkthroughs/random-surfer-finds-the-rank/sheet.png, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who has heard "PageRank counts links, weighted by who links" and has never watched a random surfer or thought about where its flow comes from.

1. **No answer before the commit.** The locked stage shows the graph (C→A, A→B, B→C, D→C, E→C) with in-link counts and dashes for all shares. Options are three verbal ratios at the same precision. The hook ("Does the page with 3 in-links get 3 times the visits?") sets up the wrong intuition honestly, and does not answer it.
2. **The why is drawn.** After +1,000 and 100,000 clicks, arrow width shows the share of clicks. C→A is one of the fattest arrows (28.1%). D→C and E→C are hairlines (2.5%). I can see that C's three in-links are mostly worthless (D and E are reached only by jumping), and that A's single in-link carries everything C has. That is the cause of "almost the same", on the stage.
3. **Arrow labels collide around A and B.** In the 1,001 and 100,000 frames, the A→B label shows as "6.7%" / "6.5%" because A's share bar covers it, and "100.0%" overlaps "0.0%" at click 1. The 28.3% / 25.5% labels crowd around C. These are the numbers the reveal tells me to read. On a phone they are hard to match to arrows.
4. **"Look at the arrows" after Reset points at blank arrows.** The walkthrough ends with Reset. On the reveal the graph is back to thin, unlabelled arrows, and it is scrolled so A and the C→A arrow are off-screen. The numbers survive in the trace line "Your 100,000 run: A 31.2%, C 33.2%. Arrows C→A 28.1%, D→C 2.5%, E→C 2.5%", so the reveal still quotes what I saw. But the instruction "Look at the arrows" no longer has a picture behind it. A learner who reset would have to remember the widths.
5. **"Click 1: jumped to A" from a surfer that starts on A** reads oddly as a first move (it landed where it already was). It is harmless, since the seed is disclosed, but the 1-click step teaches nothing about following a link.
6. The reveal's last line (PageRank defined, "Computed directly: A 0.312, C 0.332") is claimed context and matches the simulation to the stage's rounding.

What the prediction felt like: "About a third" was the natural pick from the hook, and the reveal answered exactly the question I had ("then where do C's three links go?"), with arrows I had seen.

Verdict reasoning: the idea (in-links count by the traffic behind them) is on the stage before Reset. Findings 3 and 4 weaken the reading of it but do not hide it.

## Earlier findings (r6), checked after the findings above were written

1. Blocking: the title gave away "Almost the same": **fixed.** The title is now "Where does the clicker spend its time?", which is neutral.
2. Blocking: the busy-page cause was told only: **fixed.** Arrow width is now the share of clicks, so C→A shows heavy and D→C / E→C show thin, and the reveal points at them with the learner's numbers.
3. Reveal stage reset and cropped: **partly fixed.** A trace line now keeps the 100,000-run values on stage, but the drawn arrows are blank after Reset and A is still off-screen at the reveal (finding 4 above).
4. First single click was a jump: **not fixed** (finding 5 above, minor).
5. "1 in" label over B crossed by the arrow: **fixed for B.** New label collisions appear around A's arrows once widths are drawn (finding 3 above).

## Verdict

Launch. The cause is now drawn and nothing leaks before the commit. Polish, not blockers: keep the arrow widths (or the 100,000 state) under the reveal, and move the arrow labels clear of the share bars.
