*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r6 wave): karatsuba-three-not-four
lesson version: v2
boundary: learner who knows splitting a problem and combining (merge-sort-payoff) and long multiplication from school; has never seen Karatsuba or the (a+b)(c+d) trick.
Screenshots seen: yes (artifacts/walkthroughs/karatsuba-three-not-four/sheet.png, 5 frames, plus 04-step-3.png at full size)
Verdict: revise

## 1. From the artifact

- Predict: the stem is about 55 words of dense terms ("half-size products at each level", "down to 1-digit pieces", "where no half-sum carries (schoolbook: 64)"). I had to read it three times. Once parsed, it is close to arithmetic: 64 = 4 × 4 × 4 is given, and 3 per level suggests 3 × 3 × 3. The options 16 / 27 / 48 are fair guesses ("a quarter fewer" gives 48; "16" is what you get from halving twice). The locked stage is mostly empty, and the table header is cut off at its bottom edge (frame 01). Nothing leaks.
- Explore: "Split one level" shows four boxes (a·c, a·d, b·c, b·d) against three (a·c, b·d, (a+b)(c+d)), and the table fills in 4 / 3. "Split down to 1 digit" adds the 11×11 / 22×22 / 44×44 boxes, an 8×8 dot square against three 3×3 dot squares, and 16 / 9 and 64 / 27. Both sides end in "= 123,456,787,654,321". The dot square against the three small squares is the strongest picture: I see 27 against 64 without reading.
- Where understanding first broke: the third box. "(a+b)(c+d) 2222×2222" appears and I have no idea why multiplying the sums replaces a·d and b·c. That is the whole trick. The control that answers it, "Check the middle", is not needed to unlock the reveal ("Show me why" lit up after "Split down to 1 digit", frame 03). When I did press it (frame 04), the line it writes, "a·d + b·c = 2,468,642 = (a+b)(c+d) − a·c − b·d = 2,468,642", is above the visible top of the stage. Only a sliver of it shows over "11111111 × 11111111". On a phone I pressed it and saw only the button turn "on" and a teal outline on the third box.
- Reveal: "64 ... 27" and "4·4·4 against 3·3·3" match the table. "The trick is the third box: (a+b)(c+d) minus a·c and b·d leaves a·d + b·c" is told. The stage line that would have shown it was off screen, and the gate let me skip it. "59,049 against 1,048,576" and "n^1.58" are reveal-scale numbers, which is fine.
- Legibility: the first row of boxes reads "1111×1111" at about 6 px on the phone and runs past its box edges (frame 04: "1111×11111111×1111..." with no gaps). Three representations are stacked: boxes, dots and a table. The dots and the table carry the count, and the boxes carry the trick.

## 2. Earlier findings

There is no earlier learner review. The boundary is taken from meta.json's learner field.

## 3. After reading the brief

- The objective asks the learner to *explain that (a+b)(c+d) − ac − bd gives the cross terms*. Under "Show the why you promised" that must be stood for on stage, and the reveal must point at it. The stand-in exists ("Check the middle"), but it is (1) not on the required path and (2) rendered outside the visible stage on a phone. As experienced, the cause is told. **Revise** on this, and it is the top finding.
- doesNotKnow ("3 products instead of 4") is shown well by the boxes and the dots.
- The stem's "no half-sum carries" assumes the learner knows why carries would matter. It reads as a disclaimer, and it adds load before the commit.
- The trust sheet reads 0/7 checked (DRAFT). That is a fact-checker gate.
- No FATAL.
