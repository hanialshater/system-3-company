*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): half-of-humanity
lesson version: v2
boundary: big-country-knower (from meta.json learner: knows China and India are very populous and roughly where the large countries are; does not know how few countries make up half the world's people, or that land area and population are very different maps)
Screenshots seen: yes (artifacts/walkthroughs/half-of-humanity/sheet.png and 17-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "7"; tapped all 15 country chips in order (India ... DR Congo); opened reveal.

1. **The count is shown.** The "half of humanity" bar crosses its tick at the 7th chip (Brazil: 48.8% → 51.4%) and turns green. The "Seen: half crossed at 7 countries" line records it. For a big-country knower who would guess 3 (China, India, USA), the bar at 39.4% after three is the break.
2. **No answer before the commit: passes.** The options 7, 3 and 15 are all bare numbers. The locked stage shows 0 countries and a grey map, and the half tick on the bar is a target, not a count.
3. **The reveal does not fit with its picture (revise).** In 17-reveal the whole Equal Earth map is above the card. Only the bottom of the bar and the chips remain. Paragraph 2 points at the map ("On this equal-area map, where drawn size is real size, your 7 cover 25% of the land") and at Russia's land jump, which is the second half of the brief's gap (land area and population are different maps). The thing that shows it is off screen. The reveal is about 94 words (budget 90). The 15-chip block (four rows) plus three readouts sit between the map and the reveal.
4. **The quoted state is a trace, not the current state.** At the reveal the stage shows 15 countries, 64.2%, land 43%. The 7-country, 25% land state is only in the Seen line. That is allowed, but with the map back on screen it would show 15 countries lit, not "your 7". Worth knowing when choosing what stays on screen.
5. The land-vs-people idea is carried by numbers (25% land, Russia 25% → 38% land for 1.8 points of people). During explore the map does show Russia's big blue patch arriving at chip 9. Good, but only during explore.

Verdict reason: the count idea is shown, but the map the second paragraph points at is entirely off screen at the reveal.

## After reading build.md (Pre-flight v2) and the r6 review

- r6 findings were answered in v2: the Seen line records the crossing and Russia, and they match the stage.
- Pre-flight has no item 7. At the reveal the map is completely off screen, and paragraph 2 names it ("On this equal-area map"). The reveal is about 94 words.
- c1 (UN 2024 populations) still has an open human source check (W-048). It is not mine, but it is a publish risk.

Fix route: demo-builder, with cm-geography for which sentence goes. Put the map on screen at the reveal (stage-top crop 0 at 390x844), for example by folding the 15 chips into fewer rows or letting the learner tap the map, and bring the reveal to 90 words or fewer.
