*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r9, batch B): odds-average-the-bettors
lesson version: v4 (meta.json version 4)
boundary: odds-graduate. Knows odds and probability (odds-three-to-one); does not know that when bettors split their money in proportion to their beliefs, the market's implied chance is the wealth-weighted average belief (meta.json learner field, same tag as r6-r8).
Screenshots seen: yes (artifacts/walkthroughs/odds-average-the-bettors/sheet.png, 6 frames, fresh release-build walkthrough 2026-10-14 15:22; 06-reveal.png checked)
Phone fit (tools/reveal-fit.mjs, 390x844, http://localhost:3561): crop 0 px, hidden below 0 px, 84 reveal words, named labels hidden 0, phoneFit true.
Verdict: launch

## 1. From the artifact (written before reading build.md)

Path walked: chose "60%"; Equal money; Bettor 2 richer; Start; Bettor 2 money slider to $200; opened reveal.

- **Where the idea first runs out:** the question's "Each splits all their money by belief". This boundary knows what 80% means but has not seen a bettor put 80% of $300 on A and 20% on B. Before the commit that phrase is all there is, so "60%" (the simple average, my pick) is the natural guess, which is the wanted wrong answer. After the commit the pool bar shows it: "1 $240 | 2 $40 | 1 $60 | 2 $60", left of the line on A.
- **No answer before the commit: pass.** 60% / 70% / 80%, bare numbers; locked track empty, "Seen: nothing yet", no average readout.
- **Show the why: pass.** Solid "odds" line and dashed "simple average" line on one bar. Equal money puts them together (60%); Bettor 2 richer slides the solid line to 50% while the dashed stays at 60%. That is the weighting, pictured, and the reveal points at exactly these two lines.
- **Reveal quotes what you saw: pass.** 70% ($240 + $40 = $280 of $400), 60% with equal money, 50% with bettor 2 richer are all in the Seen rows, which are now on screen with the reveal (r8's top finding fixed).
- **Glance problem (minor):** on a path that moves the slider after Start, the live label "odds 64%" is the largest number in the picture while the reveal opens on "the odds said 70%". The Seen row "start: ... 70%" sits right under it in about 10-11 px grey text (measured from 06-reveal.png). A learner who follows the panel's instruction ("then go back to the start") ends at 70% and sees no conflict.
- **Reveal fits with its picture: pass** (crop 0, bar, both lines and all Seen rows on screen). **Text budget: pass** (84 words, was 113).
- **Stage text budget: still over.** Chip, legend and two Seen lines are about 45 words at once. The Seen rows are what make the reveal honest; they are also the smallest text on the card.

## 2. Earlier findings (r8, v3)

1. Top: reveal opened with the bar, lines and Seen rows off screen: **fixed**.
2. Reveal 113 words: **fixed** (84).
3. Stage text about 55 words: **partly fixed** (about 45).
4. Labels at the reveal: bar labels legible at 390 px; Seen rows small but readable.

## 3. Verdict

launch. The weighting is on the bar and the reveal points at it while it is on screen. Should fix: live "odds" label can disagree with the reveal's 70% after slider play; Seen rows are the smallest print (about 10-11 px) and carry the proof. No FATAL.

## 4. After reading build.md

Pre-flight v4 item 7 (crop 0, 84 words, both Seen lines on screen) matches the release build. The QA path ends on a slider move, which is why the live label (64%) differs from the reveal's 70% at the reveal; build.md does not mention it. Findings and verdict unchanged.
