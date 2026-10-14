*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): which-sea-gets-the-rain
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows rivers run downhill to the sea; does not know that a drainage divide, not distance, decides which sea gets the rain, or that a divide near one coast sends most of the land to the far one)
Screenshots seen: yes (artifacts/walkthroughs/which-sea-gets-the-rain/sheet.png, recorded 2026-10-14T18:56)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "The west sea"; tapped "Rain at the dot", "Rain west of the ridge", "Colour land by its sea", Reset; opened reveal.

1. **The prediction is a guess, not a reasoned choice.** The locked stage is a blank white rectangle with a dot, "55 km" and "150 km". There is no relief, no ridge, nothing about slope. With only distances given, "The west sea" is the only reasonable answer, and the right answer ("The east sea") depends on terrain I was not shown. Being told "Not quite" for using the only information on screen feels like a trick, and it teaches "the answer is the surprising one" more than "look at the slope". The lesson's own point (slope, not distance) would land harder if I could have read the slope and been tempted by distance anyway.
2. **After the first tap the stage is good.** Relief appears ("darker = higher"), with a dark band near the west coast; the drop's red path wanders east all the way to the far sea. "Rain west of the ridge" runs a short dashed path west. "Colour land by its sea" splits the island at a "divide" line into 20% / 80%. All three steps are clear at phone size.
3. **Where the idea I lack first appears: "the ridge" (panel and button "Rain west of the ridge").** The word ridge appears in the panel before I have seen any relief; then the relief shows it. Fine once tapped.
4. Reveal stage after Reset keeps the dashed paths and the divide line, and the Seen line keeps "dot → east · west drop → west · 80% east". Good. The 20/80 colouring itself is gone, but the number survives.
5. The reveal answers the question I had after step 1 ("why east?"): "Water follows the slope, and the slope is set by the ridge, not by the nearest coast."
6. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: the explore and reveal are strong, but the prediction cannot be reasoned from what the locked stage shows, so the "wrong" answer is the rational one. Not a block: nothing is false.

Fixes (hypotheses for the builder, not tested):
- Show the relief (darker = higher) on the locked stage, so a learner can see the ridge near the west coast and still feel the pull of "55 km is closer".
- Or add an option such as "Can't tell from distance alone" and make the question about what decides it.

## After reading build.md (Pre-flight v2)

- The builder hid the relief and renamed the second button on the locked stage on purpose, to avoid "answer before the commit". I understand the rule; from my seat it overshoots. Showing slope is not showing the answer: the misconception (nearest coast wins) is still tempting when the ridge is visible but close to the west. As built, the locked stage gives the learner no way to reason, so the prediction measures luck. Verdict stays revise; this is a design trade-off for cm-geography and the learning-designer to weigh against demo-standard's no-answer rule.
- Fix route: cm-geography / learning-designer (predict design), then demo-builder.
