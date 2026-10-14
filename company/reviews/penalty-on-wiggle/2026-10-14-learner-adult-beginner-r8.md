*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): penalty-on-wiggle
lesson version: v6
boundary: adult-beginner (from meta.json learner: knows a too-flexible curve can overfit its training points and that held-out points check a model; does not know ridge, or that the cure makes the training fit worse)
Screenshots seen: yes (artifacts/walkthroughs/penalty-on-wiggle/sheet.png and 05-reveal.png, build 5, recorded 2026-10-14T11:10)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Larger"; slider right two presses (0.001); tapped "Penalty 10"; tapped "New data" (data set 2); opened reveal.

1. **The idea is on the stage.** Training miss reads "–" while locked, then 0.13 at 0.001 and 0.50 at 10. The purple curve peels off the black dots while the dashed no-penalty curve still threads them. A first-time learner sees "the penalty makes the training miss larger" before the reveal says it.
2. **The r7 blocker is fixed.** The reveal now says "at penalty 0.001 on data set 1 you saw 0.41 against 0.44 with none". That is the value that sat on screen, and the new "Seen held-out (vs none)" line under the controls shows both quoted visits (0.001/set 1 and 10/set 2) at the reveal. The quote passes "The reveal quotes what you saw".
3. **The reveal does not fit with its picture (revise).** In 05-reveal (390x844) the chart is scrolled almost entirely above the card. Only the bottom edge of the dots and the "data set 2" tag are left. Paragraph 2 says "Push to 10 and the curve goes much flatter", but the flat curve it points at is off screen. The reveal is about 123 words, against the 90-word budget for a new version. The told sentence "In 490 of 500 data sets some moderate penalty (the best of five, 0.0001 to 1) beat none on held-out dots" is the obvious candidate to cut or move to the trust sheet. Which sentence goes is the category manager's call.
4. **No answer before the commit: passes.** Title and hook ask a question. The options are plain words, and "0" appears in two of them. The locked stage shows "–" for both misses. The no-penalty held-out 0.44 is visible while locked, but it is not the quantity asked about.
5. **Labels at the reveal (kit, W-287).** What is left of the chart at the reveal is drawn at about 40% scale. "data set 2" is about 4 px and cannot be read. This is the kit's reveal shrink, not a lesson defect.
6. Small, not blocking: the held-out story (moderate wins, 10 loses) is still a second idea that only numbers carry. The stage never draws a held-out curve winning.

Verdict reason: the training-miss idea comes through and the quote is now honest. But at the reveal the picture the reveal points at ("the curve goes much flatter") is off screen, and the text is about 33 words over budget.

## After reading build.md (Pre-flight v6) and the r7 review

- r7 blocker (quoted 0.0001 while the stage showed 0.001): **fixed**. The build shows "0.001" and a Seen line that survives New data, and Pre-flight 4 and 5 match what I saw.
- r7 minor (the chart scrolls off the top at the reveal): **not fixed**, and it is now a rule breach under "The reveal fits with its picture". Pre-flight v6 has no item 7 (phone fit). The builder notes "Not seen in a browser", so no word count or crop was measured. The rendered reveal is about 123 words.
- No disagreement with the builder's account of values or the QA path.

Fix route: demo-builder. Bring the reveal to 90 words or fewer and stage-top crop to 0 at 390x844, with the curve visible. Answer Pre-flight 7 with measured px. If a claimed sentence (c4, the 490/500 line) is cut, ask cm-ai first.
