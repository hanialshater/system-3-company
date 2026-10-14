*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): friends-split-more-than-chance
lesson version: v2
boundary: adult-beginner (same as r6). Knows groups and proportions. Does not know that the yardstick for "friends sort by group" is the cross-group share that random pairing would give (about 2pq).
Screenshots seen: yes (artifacts/walkthroughs/friends-split-more-than-chance/sheet.png, 7 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Hook "One friendship in five crosses groups. Without a yardstick, that number tells you nothing." sets the tension. Options "About 33% / About 46% / About 20%" share one form. 33% (by people, 10 of 30) and 20% (the real class) are real traps. The locked stage shows the real network with 9 yellow crossings and an empty histogram with the "real class: 9" marker. Faint pointer: the histogram's axis already runs 10 to 30, which hints where random classes will land, but it names no option.
- **The why is on the stage.** "Count possible pairs" draws all 200 cross pairs as yellow lines, with "each of the 10 with each of the 20 = 200 of 435" and "(46%)". That is the pairs-not-people yardstick, drawn. "Draw a random class" (26 of 45, 58%) and "Draw 1,000 more" build a hump around 20 crossings, far right of the red real-class line, with AVERAGE CROSSING 46% and WITH 9 OR FEWER 0.
- **Reveal** quotes 1,001 classes, 46%, 200 of 435, 20%, none with 9 or fewer, fewest 11. After "Start over" all of these still read true, because the summary line "Your run: 1,001 classes, avg 46%, 0 with 9 or fewer, fewest 11" survives the reset. It ends on the idea (the gap, not the 20% alone, is the evidence). About 105 words.
- Minor (quotes what you saw): after Start over the readouts show RANDOM CLASSES 0 and AVERAGE CROSSING "–", and the histogram is empty, right above a reveal that says "Your 1,001 random classes". The small summary line is the only trace of the run, and the hump, the strongest picture in the lesson, is gone when the reveal opens.
- Minor: "435" (all possible pairs of 30 people) is given, not built. For this boundary "of 435" is a number to take on trust.
- Minor: "The exact chance is about 1 in 4,000" and "2 × 2/3 × 1/3, about 44%" are told context. They are consistent with what I saw (0 of 1,001) but add two new numbers.
- Minor (a11y lane): after "Count possible pairs" the picture's alt text reads "200 of 45 friendships cross groups", which is wrong (200 is possible pairs, not friendships). Route to the accessibility reviewer.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| 1. FATAL: after Start over the reveal said "Your 0 random classes ... 0%" and "the fewest was 45" | fixed: the reveal quotes the recorded run (1,001 classes, 46%, fewest 11) after Start over |
| 2. Pairs yardstick told, not shown | fixed: "Count possible pairs" draws the 200 cross pairs with 10 × 20 = 200 of 435 |
| 3. Reveal stage scrolls the network off and shows reset readouts | not fixed (minor; the summary line now carries the values) |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
