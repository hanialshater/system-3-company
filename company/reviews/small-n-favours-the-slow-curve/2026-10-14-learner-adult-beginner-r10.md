*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): small-n-favours-the-slow-curve
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows n² grows faster than n log n, and that merge sort splits and merges; does not know that constant factors decide which is cheaper for small inputs, so there is a crossover below which the slower-growing method loses)
Screenshots seen: yes (artifacts/walkthroughs/small-n-favours-the-slow-curve/sheet.png, recorded 2026-10-14T18:53)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Insertion sort"; tapped n = 20, 43, 44, 100, Reset; opened reveal.

1. **The prediction is genuine for my boundary.** Knowing "n² grows faster" pulls toward merge sort; the formulas are on screen, so a learner who does 8·400 = 3,200 can get it, but 64·20·log₂20 needs a log most beginners cannot do in their head. Good tension. The walked path guessed right.
2. **The payoff is seen.** n = 20: 3,200 v 5,532 (insertion outlined); 43 v 44 flips by a hair; 100: 80,000 v 42,521. The trace grid keeps all four.
3. **Where the idea I lack first appears: "The 64 in front of merge sort's cost" (reveal).** The lesson's claim is that constants decide small cases, but I never get to change a constant; 8 and 64 are fixed givens. So "constant factors" is told, and only the consequence (a crossover) is seen. For my boundary that is enough to accept, not to feel.
4. **The preset names give away the crossover.** "n = 43" and "n = 44" sit side by side before I press anything, which tells me the flip is there. It removes the "where does it cross?" search that would make the crossover mine.
5. **The bars rescale per size.** Each pair is drawn against its own larger value (n = 43 both look full; n = 100 insertion is full). Fine for "who is cheaper", but a learner may read the full-width 80,000 bar as the same as the full-width 5,532 bar.
6. Reveal stage is blank after Reset (bars "n = –"); the trace grid carries every number the reveal names.
7. Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the crossover and its location are seen; the cause (constants) is told but stated against formulas on screen.

Fixes (hypotheses for the builder, not tested):
- Replace the 43/44 presets with a size slider (or label them after first use), so the crossover is found.
- Put the n = 20 case back on the bars when the reveal opens.

## After reading build.md (Pre-flight v1)

- 43 and 44 are milestones because the reveal quotes them; that is why they are presets. Finding 4 is a trade-off the builder made for quotability; a slider would need the reveal to quote whatever crossover the learner found. Hypothesis for cm-cs.
- Fix route: none required for launch.
