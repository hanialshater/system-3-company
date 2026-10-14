*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): hailstone-27-climbs
lesson version: v5
boundary: knows-repeated-rules (from meta.json learner: knows a rule can be applied repeatedly; does not know that tiny rules make wildly different run lengths, and nobody has proved they all stop)
Screenshots seen: yes (artifacts/walkthroughs/hailstone-27-climbs/sheet.png and 09-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Under 30"; Step (value 82); Run to 1 (111 steps, peak 9,232); slider left to 109; tapped 26, 27, 28, 97; opened reveal.

1. **The surprise lands on the stage.** The locked y-axis tops out at 100. "Run to 1" rescales it to 10,000 and draws a 9,232 spike. For someone who expected "under 30", that is the moment. The table fills 26: 10, 28: 18 next to 27: 111. "Wildly different run lengths" is shown, not told.
2. **The r7 point about 97 is fixed.** The stage line "97 meets 27's path at value 94 (its step 13), ringed" appears, and a red ring sits on the chart. The reveal quotes that line ("as your stage line says").
3. **No answer before the commit: passes.** The options are three ranges at the same precision. The locked axis (0 to 100) does not hint at 111, if anything it hints at under 100. The hook ("How long can it run?") hints at "long", but not at a number.
4. **The reveal does not fit with its picture (revise).** In 09-reveal the chart is shrunk and still cropped. The rule line ("Even: halve it...") and the "Start 97 · step 118" status are above the card, and so is the top of the 9,232 spike. The reveal is about 100 words (budget 90), and a five-row stage table plus two control rows sit under the chart. The reveal names "the value 94 (its step 13)" and the ring. The ring is a few pixels on a shrunk chart and is hard to find.
5. **Labels at the reveal (kit, W-287).** The axis numbers ("5,000", "40", "steps") are about 3 to 4 px at the reveal. That is a kit finding, not a lesson revise.
6. The "nobody has proved" half is told in one sentence ("the Collatz conjecture is still open"). The "?" cells that only running fills are a fair stand-in for "you can only find out by running". I would accept that as the shown part.

Verdict reason: the teaching works on the stage, but at the reveal the stage top is cropped and the text is over budget. Trim about 10 words and make the reveal-time stage fit (crop 0).

## After reading build.md (Pre-flight v5) and the r7 review

- r7 top finding (94 named but never shown): **fixed**. There is a stage line and a ring, and v5 also makes "ringed" true only when the ring is drawn. It matches 08-step-7 and 09-reveal.
- Pre-flight has no item 7 (phone fit). The build note says "Not run: build, QA, walkthrough". At the reveal the stage top is cropped (rule line, status line and spike top off screen), and the reveal is about 100 words.

Fix route: demo-builder. Trim the reveal to 90 words or fewer, and make stage-top crop 0 at 390x844 with the ring and the 9,232 peak on screen. Answer Pre-flight 7 with measured px.
