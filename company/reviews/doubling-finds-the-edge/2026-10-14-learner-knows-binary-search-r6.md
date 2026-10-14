*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): doubling-finds-the-edge
lesson version: v1
boundary: knows binary search halves a sorted list of known length (lesson binary-search); does not know a list of unknown length can be searched by doubling a probe first (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/doubling-finds-the-edge/sheet.png)
Verdict: revise

## 1. From the artifact
- Hook: "Binary search starts from both ends. What if the list has no end you can see?" is a real tension, but it assumes I know what binary search is. Title is 34 characters.
- Predict: the stem spells out the whole procedure and asks for a count. Options 500 / 100 / 20 against a 1,001 scan. A learner who does not feel doubling yet can honestly pick 500 or 100, so the guess is real. The locked stage shows an axis 0–1024 with a "target" marker near 1000, which only repeats the stem. Nothing leaks the count.
- Explore: "Double the probe" puts a dot at 1; "Double until past" lays down 1, 2, 4 ... 1024. The dots pile up at the left and spread out, and the shaded band 513–1023 appears with the readout "Position 1024 holds 3079 > 3007". That picture (few probes cover a long way) is the cause, and I can see it. Halving drops green dots under the line (768, 896, 960, 992, 1008, 1000) and the band narrows. The comparisons counter reaches 17 next to "scan would need 1,001". Step buttons and run-to-end buttons are both there.
- Reveal: "11 doublings ... 513–1023 ... 6 halvings ... 17 comparisons" matches what I saw. It then says halving "costs about as many again" (about 10), but I saw only 6. The target happened to land on a midpoint early. The 17 vs about 20 fits "about", but "as many again" is not what I saw.
- The reveal sits over a stage reset by "Start over" (0 comparisons, empty axis), and it does not say the numbers come from before the reset. Minor.
- Reveal uses "log2(position)" without a gloss. For someone with only school arithmetic, "the number of doublings to reach it" would be what the stage showed.
- Minor: at step 4 the stage text (sentence plus the doubled/halved lists) is near or over the 25-word budget as monospace numbers.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json. At this boundary, the hook's "binary search" is known, so that note does not apply.

## 3. Show the why you promised

The objective asks the learner to explain two parts: (a) doubling finds a gap holding the target in about log2(position) steps, and (b) halving that gap costs about as many again.

- (a) is shown. The doubling dots crowd at the left and spread out, and 11 probes reach 1024. The reveal points at "11 times by doubling, from 1 to 1024".
- (b) is told, and the stage contradicts it. On the only path the stage offers (a fixed target at 1000), halving took 6 comparisons, not about 11, because 1000 sits near a midpoint. A learner at this boundary can count 11 and 6 and see that the "as many again" sentence does not match. So part of the objective rests on a told sentence that the stage argues against.

## 4. New findings

- Blocking (top finding): the reveal's "halving that gap costs about as many again" does not match the 6 halvings the learner saw. Either the stage must show why it is about as many again (for example, label the band "511 wide, about 2^9: up to 9 halvings", or let the learner pick a target that is not near a midpoint), or the reveal must point at the band's width and say this target got lucky. Fixing it is the builder's job.
- Should fix: say the reveal's numbers come from before "Start over", or keep the finished state on stage.
- Minor: gloss "log2(position)" as "the number of doublings, here 11".
- Minor: stage text at step 4 is near the 25-word budget.
- No FATAL.
