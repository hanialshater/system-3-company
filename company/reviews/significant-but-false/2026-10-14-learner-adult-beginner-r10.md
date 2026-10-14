*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): significant-but-false
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows what "significant at 5%" means for one test, and base rates; does not know that the share of significant results that are false depends on how many tested ideas were true, and can be far above 5%)
Screenshots seen: yes (artifacts/walkthroughs/significant-but-false/sheet.png, recorded 2026-10-14T18:52)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 5%"; tapped "50% true", "1% true", "10% true"; opened reveal.

1. **The prediction is genuine.** "5% of duds pass by fluke" → "About 5% of passes are flukes" is exactly the swap a beginner makes. Options are evenly shaped.
2. **The payoff is on the stage.** 1,000 dots; the true ideas clump in a block, the red flukes scatter across the much bigger dud field. At 10% true "80 real, 45 flukes · 36%"; at 1% "8 real, 50 flukes · 86%"; at 50% "6%". The "Earlier" line keeps all three.
3. **Where the idea I lack first appears: the legend "Filled: works. Ring: passed."** At phone size I could not tell a filled dot with a ring (a real pass) from a filled dot without (a missed real effect). The 80 real passes are only readable from the number. The red flukes, which carry the lesson, are clear.
4. **The reveal answers my actual question.** "The 5% is the fluke rate among duds, and here 900 of the 1,000 ideas are duds" names the exact confusion. It fits on screen with the 10% picture (05-reveal).
5. 50% true giving 6% is useful: it shows when my 5% intuition is nearly right.
6. Trust link reads "4/5 claims checked".

Verdict reason: the swap (5% of duds vs share of passes) is seen in the dots and named in the reveal; the base-rate dependence is seen across three presets.

Fixes (hypotheses for the builder, not tested):
- Make missed real effects visibly different (e.g. faded) so "Ring: passed" is readable at phone size.

## After reading build.md (Pre-flight v1)

- Filled vs hollow carries true vs dud, and the ring carries "passed". At phone size the ring on a filled dot is the hard read (finding 3); the counts carry it. No change to verdict.
- Fix route: none required for launch.
