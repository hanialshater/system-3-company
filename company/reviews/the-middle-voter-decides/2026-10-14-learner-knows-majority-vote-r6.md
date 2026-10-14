*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): the-middle-voter-decides
lesson version: v1
boundary: knows-majority-vote (knows majority votes between two options and a left-right line; has not met the median voter result). From meta.json learner field.
Screenshots seen: yes (artifacts/walkthroughs/the-middle-voter-decides/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Hook: "Surely the average position wins every head-to-head?" The rhetorical "Surely" signals no and points against option 2 (4.8). It is milder than stating the answer, but it still trims the misconception before commit (minor).
- Predict: voters at 1, 2, 3, 8, 10; options 3 / 4.8 (the average) / 5 (the centre). The locked stage shows the line, the voters and a 4.8 marker. No leak beyond the hook.
- Explore: "Test 3" draws a dashed halfway line between 3 and the rival at 6, labels voter 3 "middle voter", and says "3 wins 3–2 against 6". A strip "3 vs each rival" shows all ✓. "4.8 (avg)" also says "**4.8 wins 3–2 against 6**", and "5 (centre)" says "**5 wins 3–2 against 6**". After the slider moves the rival to 6.4: "5 wins 3–2 against 6.4". **Where it loses me (main finding):** on the path the lesson leads me down, the big readout never shows the average or the centre *losing*. The only sign is a row of red ✗ boxes in the "vs each rival" strip, and those boxes have no labels, so I cannot tell which rival each one is. The gate opened after testing 4.8, before I had found a rival that beats it.
- Reveal: "The average, 4.8, lost: a rival at 4 is nearer to voters 1, 2 and 3" quotes a state I never visited. The rival was at 6 and then 6.4 (the W-150 pattern). "Position 3 won against every rival on the strip" was shown (all ✓). "The halfway line shows why" points at a real stage element. The halfway line is the stand-in for the doesNotKnow cause, and it works when I can see it split a losing case.
- The rival slider starts at 6, where all three candidates win. That is the least informative default for this question.

## 2. Earlier findings

No earlier learner review (company/reviews/the-middle-voter-decides/ has a fact-check and build.md only). The boundary is taken from meta.json.

## 3. New findings

1. Main (earn the reveal): gate the reveal on seeing the average lose. For example, a milestone "rival beats 4.8" (rival at 4, "4 wins 3–2 against 4.8", halfway line at 4.4 with 1, 2, 3 on the rival's side), and likewise "centre loses". Or make the strip boxes tappable and labelled with rival positions (0…10), so a ✗ is a visitable state. Then the reveal's "a rival at 4" points at something seen.
2. Moderate: label the strip boxes with the rival position, or show the rival position under each.
3. Minor: start the rival somewhere that beats the average (for example at 4) after the learner tests 4.8, or invite "move the rival left of 4.8".
4. Minor: the hook's "Surely" telegraphs the answer.
5. Route to fact-checker: 0/6 claims checked (DRAFT).
- No FATAL.
