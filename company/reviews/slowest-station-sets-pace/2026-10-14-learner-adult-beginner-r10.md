*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): slowest-station-sets-pace
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a faster machine makes more parts; does not know that a line's output is capped by its slowest step, so speeding up any other step changes nothing except the pile in front of the slow one)
Screenshots seen: yes (artifacts/walkthroughs/slowest-station-sets-pace/sheet.png, recorded 2026-10-14T18:53)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "5"; tapped S1 +2, S2 +2, S3 +2, "All 3 on S3", "Double S1", Reset; opened reveal.

1. **The prediction is genuine for my boundary.** "A faster machine makes more parts" points at 10 or 12; 7 looks like "some gain". 5 needs the bottleneck idea. The walked path guessed right.
2. **The stage shows the cause.** Piles between stations ("5" after S1 at 14/h, "15" after S1 at 24/h) grow in front of the slower station while "FINISHED AN HOUR" stays at 5. The red "slowest" box moves from S3 to S2 after "All 3 on S3", which is the "next constraint" idea seen, not told.
3. **Where the idea I lack first appears: "UPGRADES LEFT 3".** Nothing says what an upgrade is or why there are three, until I tap and see +2. It reads like a game budget. It works once tapped; it is a small speed bump before the first tap.
4. **The doubled case is not on the reveal stage.** After Reset the stage shows 12/9/5/10 with piles 3 and 4; the reveal is about S1 at 24 and "the extra parts just piled up". The trace "S1 at 24: 5/h" keeps the number, but the 15-part pile, the picture of "piling up", is gone.
5. "The Goal builds its story on this" names a book without saying it is a book or whose; in the Books domain that is probably expected, but a beginner may read "the goal" as a phrase.
6. "Does it hold up? ... For whole firms, the evidence is mostly case reports." Good honest limit.
7. Trust link reads "0/6 claims checked" (fact-checker's lane).

Verdict reason: capped output, the growing pile and the moving bottleneck are all seen by my own taps.

Fixes (hypotheses for the builder, not tested):
- Put the Double S1 state (with its 15-part pile) back on the stage when the reveal opens.
- "The Goal (Goldratt's novel)" on first mention.

## After reading build.md (Pre-flight v1)

- The three upgrades come from the brief. The record lines carry both reveal values after Reset, as designed; finding 4 is about the pile picture, not a missing number.
- Fix route: none required for launch.
