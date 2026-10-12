*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Boundary used: remembers basic school arithmetic and everyday life (light switches, adding); has never studied binary numbers or how computers store numbers.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots (phone), QA phone-3-reveal.png. I did not drive the lesson myself.

**Prediction.** "Eight switches, each on or off, worth 128, 64, 32, 16, 8, 4, 2 and 1. Add up the ones that are on. What is the biggest number you can make?" Options 8, 16, 128, 255. Because the values are given, this is an addition question, not a prediction. An adult can add 128+64+... in their head (or sees that "all on" is the biggest), so the guess is either trivial or comes down to whether I bother to add. It does not stake out a belief that exploring could overturn. The hook asks "How far can eight of them count?", which is a better question than the one actually posed. "8" and "16" are only attractive to someone who misreads "eight switches" as the answer, and the walkthrough learner (me, choosing "8") has no reason to hold that.

**Where understanding first broke.** At the stage, before any interaction: the screen shows 8 switches labelled 128 ... 1 with "00000000 in binary" beside "+1" and "All off". I do not know why a switch is "worth" 128 or why the values double. The doubling is never pointed out until the reveal ("Each switch is worth twice the one to its right"). The word "binary" appears as a label with no meaning, and "+1" is unexplained.

**Explore vs the learner's actual question.** My actual question: "why these odd values, and what is this for?" Exploring answered only "what do I get when I flip them", with a live sum line "128 + 64 + 32 + 16 + 8 + 4" and the pattern "11111100 in binary". That is good feedback and I could see 252 -> 255 coming by flipping the last two. The panel's invitation "Then try +1 from 127" was not exercised in the walkthrough and is not explained: why 127, what should I notice? I think it is meant to show the carry (01111111 -> 10000000) but nothing says so. The learner cannot know what question +1 answers. The reveal never refers back to it.

**Reveal: earned or told?** Partly earned. The sum to 255 is shown in the stage as I flip switches, and the reveal text restates it. But the stronger claims are told only: "256 different numbers, and every pattern names exactly one of them" (I never saw two patterns compared or a count of patterns), "always add up to one less than the next switch would be worth: 256 − 1" (a nice idea, no visual), "A ninth switch doubles the count to 512" and "32 of them pass four billion". The step from "all eight on = 255" to "that is binary" is a jump: I was never shown that a number like 5 or 10 is a particular pattern, which is what makes this a counting system rather than a sum.

**Reveal tone.** In the walkthrough path ("Not quite: it was 255", stage showing 252) the reveal can be reached with 252 on screen and I have not yet seen 255 on the stage. The reveal is accurate but I was told the answer rather than shown it. In the QA path the learner reached 255 and the stage then shows "Out of switches: back to 0." with amber outlines, which is a surprising and interesting moment but is not explained in the reveal text ("back to 0" is never discussed).

**Findings as problems**
1. The prediction is arithmetic on supplied numbers, so there is little to be wrong about; the prediction does not expose the misconception it presumably targets.
2. Why the switch values double is never shown or asked; it is the entire mechanism and appears only in the reveal.
3. "+1 from 127" is an instruction with no stated purpose; the learner is not told what to look for, and the reveal does not close it.
4. The word "binary" and the string "00000000 in binary" show up as labels the learner cannot interpret until the last paragraph; even then, the reading of a pattern as a number (5 = 00000101) is not taught.
5. "Out of switches: back to 0" after 255 +1 is a surprise with no explanation; a learner could conclude that the lesson is glitching or that 256 is impossible.
6. Last paragraph ("a byte is 8 switches... 32 of them pass four billion") introduces new terms (byte) in the closing line without a hook, and is told only.
7. Dense reveal: four ideas (255, 256 patterns, 2^n minus 1, doubling) in three paragraphs for a learner who has not yet seen binary written for a small number.

**FATAL:** none found. (No false statements seen, no dead control observed. I did not test +1 myself, so a dead +1 is not excluded.)

## 2. After reading the brief

- Intent: the misconception is "eight switches stand for only about 8 or 16 numbers; binary is a code, not counting". The 8 and 16 options target it, but because the worth of every switch is printed in the question, the misconception has little room to show; my finding 1 stands.
- Intent: learner explains "each switch is worth twice the one to its right" and a ninth switch doubles the count. Experience: both are told in the reveal; doubling was never something I had to notice.
- The brief assumes the learner knows doubling and "computers store 1s and 0s"; I did not, and found "binary" an unexplained label (finding 4). Under the lesson's own boundary this is milder.
- The "+1 from 127" step is probably the intended carry demonstration; the learner is not told so (finding 3).
- No contradiction between my first-section findings and the brief's claims; claims are unverified arithmetic derivations.

Verdict: revise

