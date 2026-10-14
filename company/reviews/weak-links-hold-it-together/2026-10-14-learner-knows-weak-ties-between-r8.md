*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): weak-links-hold-it-together
lesson version: v3
boundary: knows-weak-ties-between (from meta.json learner: knows strong ties sit inside groups and weak ties between them; does not know that removing the weakest links first shatters a network far faster than removing the strongest first)
Screenshots seen: yes (artifacts/walkthroughs/weak-links-hold-it-together/sheet.png and 05-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Fewest shared friends"; slider right two presses (20%, strongest first: 60 of 60, 0 of 12 bridges); tapped "Weakest first" (10 of 60, 12 of 12 bridges); tapped "New network" (network 2: 20 of 60, 10 of 12 bridges); opened reveal.

1. **The why is on the stage.** "bridges cut: 12 of 12" in red, the dashed red between-group links, and the groups falling into separate clusters show that the weak links are the bridges. The small line chart (strongest first stays at 60, weakest first drops) puts both orders on one picture.
2. **No answer before the commit: passes.** The options are three plain phrases. The locked stage shows one connected network at 0% cut, and its chart is empty.
3. **The reveal quotes the stage, with one wrinkle.** "In network 2, cutting 20% (27 links) closest first left 60 of 60". On this path the learner never ran "Strongest first" on network 2. The value is computed for the current network and shown on the stage ("strongest first 60" in the chart and the "At 20% cut" line), which the rule allows. But "you saw" phrasing would be wrong here, and it is not used. Fine.
4. **Small crop at the reveal (revise).** In 05-reveal the stage caption "Link strength = share of friends the two have in common." has its first line cut off above the card. That is about one line, so the crop is not 0. The reveal is about 71 words, within budget. The crop comes from the stage's height (caption, network, chart, readout, 'At 20% cut' line, slider, buttons). The fix is small: a one-line caption, or fold the caption into the chart.
5. **Labels at the reveal (kit, W-287).** The chart labels "strongest first 60" and "weakest first 20" and its axis ticks are about 3 to 4 px at the reveal. The same numbers are readable in the HTML readouts. Kit finding.
6. "far faster" in the brief: the stage shows a single 20% point plus a short chart. The chart does show the gap growing, but it is tiny. With the W-287 floor it would be readable.

Verdict reason: the lesson teaches from the stage and the reveal is short. The only defect is the about one-line stage-top crop at 390x844.

## After reading build.md (Pre-flight v3) and the r7 review

- r7 top finding (the bridges count shown before the commit): **fixed**. The locked frame has no bridges readout. The seed has also left the stage. Pre-flight 4 and 5 match what I saw ("network 2 ... 60 of 60 · 20 of 60, 10 of 12").
- Pre-flight has no item 7, and the build note says "Not seen in a browser". The reveal is 71 words. The only defect is the about one-line caption crop at the stage top.
- W-183 (cm-probability: "fewest shared friends" vs overlap ratio) and W-217 (c4 dispute) are still open. I did not re-judge them.

Fix route: demo-builder. Get stage-top crop to 0 at 390x844 (for example, a one-line caption "Link strength = shared friends", or the caption moved into the chart), measured after W-287 restores label size. Answer Pre-flight 7.
