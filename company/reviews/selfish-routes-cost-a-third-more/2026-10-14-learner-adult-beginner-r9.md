*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): selfish-routes-cost-a-third-more
lesson version: v5
boundary: adult-beginner (from meta.json learner: knows drivers pick the faster road and a road gets slower as more drivers use it; does not know that the selfish equilibrium can be worse on average than a planner's split, by up to 4/3 with roads whose delay grows in proportion to traffic)
Screenshots seen: yes (artifacts/walkthroughs/selfish-routes-cost-a-third-more/sheet.png and 05-reveal.png, recorded 2026-10-14T15:13)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "No, 60 is best"; slid "Drivers on road B" to 90%; tapped "All on B (selfish)", then "Try every split"; opened reveal.

1. **The prediction is good.** "No, 60 is best" is what this mind believes: everyone already picks the faster road. 45 / 30 are equally precise. The locked stage shows the selfish point at 60 and no curve.
2. **The payoff is shown.** The traced U-shaped curve with its minimum at 45 min at 50%, and LOWEST SEEN "45 min at 50%", make "a planner beats selfish drivers" visible. The reveal quotes both.
3. **Where the idea I lack first appears: the "why" line.** "Lowest split, 50 of 100 on B: 5 more join, saving 135 min; the 50 on B lose 150." It carries the whole mechanism (the cost you put on others is a cost you do not feel), and it is a single dense line of numbers. None of it is drawn, and I cannot check 135 or 150 from the chart. At 90% the same line ("saving 15 min; … lose 270") appears with the prefix "Lowest split", which made me think 90% was being called the lowest. The reveal points at this line ("The line under the chart is why"). It is visible, but I had to reread it three times.
4. **The reveal overgeneralises the ratio (revise).** "So selfish routing costs 60 / 45 = 4/3 of the best: a third more." I read that as a law: selfish routing always costs a third more. The learner field's gap is "up to 4/3" for roads like these. Nothing on the stage or in the reveal says 4/3 is a ceiling, or that other networks lose less. A learner leaves with "a third more, always", which is a new misconception, though not a false sentence about this network. Either the "at most" needs one claimed sentence, or "costs" needs tying to this pair of roads. Which sentence changes is the category manager's call.
5. **The reveal fits with its picture.** In 05-reveal the chart top, the traced curve with 45 min marked, the chips, the "why" line and the last reveal line are on screen. 87 words, close to the 90 budget, so any added sentence needs a cut elsewhere.
6. The trust link reads "2/6 claims checked" (fact-checker's lane).

Verdict reason: the stage teaches "selfish can be worse". The reveal's closing line turns one network's 4/3 into what reads as a general rule, and the gap's "up to" is missing.

## After reading build.md (Pre-flight v5) and the r8 review

- Pre-flight v5 says the worst-case sentence ("… that is the worst it can ever be") was cut and c4 was withdrawn, to bring the reveal from about 129 to 87 words for r8's budget finding. That cut is the cause of my finding 4: the gap's "up to 4/3" left the learner text, and "So selfish routing costs 60 / 45 = 4/3" was kept as the closing line, so it now reads as general.
- The fit and word fixes worked (crop 0, 87 words), but the cut removed a sentence the brief's doesNotKnow needs.
- Fix route: cm-cs decides which sentence carries "at most 4/3 for roads like these" within 90 words. One option is to tie the closing line to this network and let the bound replace a clause. demo-builder implements it, and the fact-checker re-checks the claim. The cost-line prefix "Lowest split" (finding 3) is a minor for demo-builder.
