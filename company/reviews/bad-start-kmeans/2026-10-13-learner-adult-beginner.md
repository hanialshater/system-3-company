*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bad-start-kmeans
lesson version: vNN
boundary: an adult with school-level maths and science, new to the topic (knows "average" and "nearest"; has never seen k-means or any clustering algorithm). Screenshots seen (sheet.png, all 6 frames).

## 1. From the artifact

- Prediction: the stem describes the algorithm ("assign each point to the nearest centre, move each centre to its group's mean"), enough for a patient adult to simulate by hand with four points. {0, 4} and {6, 10} is the natural "two obvious clumps" answer. The hook ("Can the starting guess change the answer?") leaks: it tells the learner the answer is yes.
- The locked stage shows four grey points on a number line and two triangles at 0 and 4. Fine.
- Where understanding first broke, and this is the main finding: the explore step does not show the claim. One tap of "Step" jumps straight to "Settled: another step changes nothing" with groups {0} {4, 6, 10} and squared distance 18.7; the learner never sees the intermediate move of the second centre to 6.67 that the reveal describes ("the first step gave 4, 6 and 10 to the centre at 4, which moved to 6.67"), since the stage shows only the settled picture. Then the panel says "move the starting centres and try again". The buttons nudge one unit at a time: starts at 1 and 4, then 1 and 3, then back to 1 and 4 all read {0} {4, 6, 10}. A learner following the instructions concludes the start does not matter, the opposite of the lesson. The start that finds the better answer (2 and 8) is stated only in the reveal; it is not reachable in the few taps the panel suggests.
- "TOTAL SQ. DISTANCE" is on the stage with values 18.7, 41.0, 60.0 and never defined; 41.0 and 60.0 are at "After 0 steps" while 18.7 is settled, so a learner reads them as three different outcomes. The reveal's "{0, 4} and {6, 10} costs only 16" is never shown on the stage, and it is the point of "settled but not best".
- What was SHOWN: the picture of lines from points to triangle is clear, and "Settled" is stated. The bad outcome is visible.
- AI claims: "That is why k-means is usually run from several starts" is told as fact about real practice; it is true (random restarts are standard) but nothing here shows it; the tone is a general statement from one 4-point toy.
- Reveal earned: the answer {0} {4, 6, 10} yes; "start decides the end" not, in the path a learner would take.
- Problems: (1) explore path shows the start not mattering; (2) the good start (2 and 8) and cost 16 never shown; (3) total squared distance undefined; (4) the intermediate step skipped; (5) the hook leaks.
- No FATAL, but this is a strong revise.
