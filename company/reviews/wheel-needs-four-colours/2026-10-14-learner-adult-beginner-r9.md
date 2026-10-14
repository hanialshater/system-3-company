*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): wheel-needs-four-colours
lesson version: v4
boundary: adult-beginner (from meta.json learner: knows backtracking tries a choice and undoes it on a dead end; does not know that a hub linked to an odd ring of regions cannot be coloured with three colours)
Screenshots seen: yes (artifacts/walkthroughs/wheel-needs-four-colours/sheet.png and 15-reveal.png, recorded 2026-10-14T15:15)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "2"; tapped "Run backtracking" (ring of 5, 3 colours: dead end), "4 colours" (done, 4 used), "Ring of 4" (done, 3 used); then hand-picked regions C, 1–4 and colours red, blue, yellow, purple; Undo; opened reveal.

1. **The prediction works.** The hook ("Surely three colours keep every neighbour different?") baits 3, the misconception, without pointing to 4. The locked wheel is uncoloured.
2. **The payoff is shown.** In the ring-of-5 run, region 5 is outlined red and left white ("region 5: no colour left"), with its neighbours visibly holding red (centre), blue (1) and yellow (4). Ring of 4 alternates blue/yellow all the way round. The odd/even contrast is the gap in the brief, and both halves are on the stage.
3. **Where the idea I lack first appears:** "6 dead ends". Backtracking ran instantly, so I never saw a dead end being undone, only the final stuck state. My boundary knows backtracking, so the count is believable, but it is a number I was told rather than watched.
4. **Manual colouring loses its feedback on a phone.** In steps 3–8 the colour buttons are half cut off at the bottom of the stage. In steps 9–12, once the page scrolls to reach them, the caption that reports a clash ("… clashes with region 3") is cut off at the top. On the optional hand-colouring path I could not see my button and its feedback at once. This does not affect the reveal path.
5. **The reveal fits with its picture.** In 15-reveal the stage returns to "Your run, ring of 5, 3 colours: region 5 touches all 3", with region 5 outlined. The run log ("5 ring, 3 colours: dead end · 5 ring, 4: done, 4 used · 4 ring: done, 3 used") and the last reveal line are on screen. 67 words.
6. The trust link reads "1/6 claims checked" (fact-checker's lane).

Verdict reason: the stuck region and the even ring are both drawn, and the reveal reads them back. The phone crop affects only the optional hand-colouring.

## After reading build.md (Pre-flight v4) and the r8 review

- r8's finding 4 (the reveal argued from a picture not on screen) is fixed: the reveal restores the recorded ring-of-5 dead end, and the release frame shows it.
- Finding 4 (hand-colouring buttons and feedback not on screen together) is not mentioned in the note. It affects explore only, so it is a minor for demo-builder.
- Fix route: none required for launch.
