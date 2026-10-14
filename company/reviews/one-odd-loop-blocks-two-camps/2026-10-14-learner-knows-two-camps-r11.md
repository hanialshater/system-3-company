# Learner review r11: one-odd-loop-blocks-two-camps

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v5
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: knows-two-camps (same mind as r6/r7). Knows "two camps = friends inside, enemies across"; does not know that a network with missing links splits into two camps exactly when every loop has an even number of enemy links.
artifact: walkthrough against a release build on :3590 (I started it). transcript.md read first, then sheet.png. Screenshots seen: all 7 frames.
path walked: chose Yes; Big ring; Right loop; Left loop; Try all 64 splits; Enemy on C-D; reveal.

## Findings (written before reading meta.json)

- **Prediction:** the hexagon with two red dashes looks balanced, so "Yes" is the natural pick for this mind. The cross link A-D is the trap, and it is drawn plainly. Good tension.
- **The loop walks carry the idea:** each loop button highlights the loop, marks camps as filled vs dotted rings, and the caption counts enemy links and says where the walk returns ("back at A in the other camp: clash"; A gets a red dotted ring). I checked: right loop A-B-C-D has only A-B red, left loop A-D-E-F has only D-E red. Both odd, as stated.
- **Brute force closes the argument:** "0 of 64 splits work. Best try still breaks 1 link (thick)" turns the parity walk into a fact I can trust, and the running log line under the buttons keeps all results visible.
- **The contrast case works:** moving the enemy to C-D gives "2 of 64 work: one split, names swapped", and the picture shows the two camps. The "names swapped" note pre-empts the "why 2, not 1?" question.
- **Weak spot (not a blocker):** after "Enemy on C-D", only "left loop 0" is logged; the right loop (now 2) and big ring are not re-walked on this path, so "every loop was even" is partly told.
- **Weak spot:** the final rule ("exactly when every loop has an even number") is told as a general law from one passing and one failing case. For this boundary it reads as believable, not shown.
- Reveal fits with the shrunken stage above it.

## After reading the brief

Objective (each enemy link switches camp; an odd loop returns you in the wrong camp; every loop, not only the biggest, must be even) is what the walks show. The misconception "the big loop looks fine, so it splits" is the exact first step of the path and is broken by the right and left loops. No false claim, dead control or reinforced misconception seen.
