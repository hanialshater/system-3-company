*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): the-middle-voter-decides
lesson version: v2
boundary: knows-majority-vote (same tag as r6). Knows majority votes between two options and a left-right line. Has not met the median voter result.
Screenshots seen: yes (artifacts/walkthroughs/the-middle-voter-decides/sheet.png, 6 frames, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who knows how majority voting works and has never met the median voter idea or thought about positions on a line.

1. **No answer before the commit, visually.** The locked stage shows voters 1, 2, 3, 8, 10 on a 0 to 10 line, a marker at 5 and a disabled rival slider at 4.0. The options are three numbers with parallel labels (third voter / average / centre). Nothing drawn points to 3.
2. **The locked picture's text alternative leaks.** The transcript's locked frame includes the picture description "Testing 5 against rival 4: 2 to 3". A screen-reader learner hears, before committing, that the centre loses. That rules out one option. Sighted learners do not see it (the FOR 5 / FOR RIVAL readouts show "–"). Route to accessibility-reviewer / demo-builder: the alt text should not report a result while locked.
3. **The why is drawn.** When I test a position, a dashed "halfway" line appears between it and the rival, voters turn the colour of the side they vote for, and a row of ✓ / ✗ boxes shows the position against every rival 0 to 10. For 3 the row is all ✓. For 4.8 and 5 the ✗ boxes sit at 2 to 4. Watching 1, 2, 3 flip together to the rival's side as the halfway line passes 3 is the idea: the middle voter decides every split.
4. **The "=" box is unexplained.** In "5 vs each rival" the box at 1 shows "=". From the numbers, voter 3 is equally far from 1 and 5, so it is a tie. The stage never says so, and a beginner may read "=" as "same position".
5. **The reveal quotes what I saw.** "4.8 lost to your rival at 4", "the centre, 5, lost too", "3 won against every rival" all survive in the trace "Seen: 4.8 lost to 4 · 5 lost to 4 · 3 beat every rival", and the ✓ / ✗ row is still on screen at the reveal. Small wording point: "your rival at 4" was the default rival, not one I placed.
6. The reveal is close to the 120-word budget (about 115 words by my count). The last paragraph (the average is pulled by distance, a vote asks only which side) is the best sentence in it, and it is grounded in the 8 and 10 dots I watched.

What the prediction felt like: an honest three-way choice. The average and the centre are both tempting, and I chose 3 on a hunch, so "Your prediction held" was earned by the ✓ row, not by the framing.

Verdict reasoning: the halfway line and the ✓ / ✗ row carry the idea on the stage, and the reveal points at them. Finding 2 is an accessibility leak to route, not a learner-path blocker for sighted users.

## Earlier findings (r6), checked after the findings above were written

1. Main: the average and the centre never visibly lost, and the reveal quoted an unvisited rival at 4: **fixed.** The rival now starts at 4. "Rival 4 wins 3–2. 4.8 loses." and "5 loses" are shown, and the trace records both.
2. Strip boxes unlabelled: **fixed.** Each ✓ / ✗ box now has its rival position (0 to 10) under it.
3. Rival default uninformative: **fixed** (it starts at 4).
4. Hook "Surely the average…" telegraphed: **fixed.** The hook is now "Which spot can beat every rival head-to-head?".
5. Claims 0/6 checked: the trust link now reads 5/7 (fact-checker lane, not judged here).

## Verdict

Launch for the sighted learner path. Route the locked alt-text leak (finding 2) to accessibility-reviewer / demo-builder. Minor: explain the "=" tie box.
