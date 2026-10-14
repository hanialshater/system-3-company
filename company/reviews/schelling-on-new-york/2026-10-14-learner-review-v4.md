# Learner review (borrowed mind), v4: schelling-on-new-york

Date: 2026-10-14 · Role: learner-evaluator (Sam) · Session 2, branch s2-rebuild
Boundary learner: a general adult with no economics or sociology background who has not seen any other lesson.
Artifact: `artifacts/walkthroughs/schelling-on-new-york/` (recorded 2026-10-14T15:02Z). This is newer than every lesson file (latest is Demo.tsx/styles at 14:59), so I did not re-run it. I read transcript.md, sheet.png, and single frames 01, 02, 05 and 08. I also read the `hook` and `recall` fields of meta.json.
Not read: build notes, specs, design files or other reviews.
**Independence caveat:** the transcript's appendix prints the trust sheet, which contains claim notes with builder and fact-checker remarks. I read it while reading the transcript. The findings below come from the card and stage. I flag the one place where the appendix could have coloured my reading (F6).

This is a source of criticisms and hypotheses. It is not evidence that anyone learned anything.

## Personas (stated before looking)

1. **Feed skimmer:** reads the title and bold text, taps the first option, swipes on quickly.
2. **Low-reading-stamina phone user:** reads one line per block and skips paragraphs.
3. **"People prefer their own kind" believer:** comes looking for confirmation.
4. **Knows US housing history:** redlining, covenants, FHA, white flight.
5. **New Yorker:** knows real neighbourhoods and expects New York content.
6. **Numerate sceptic:** asks what the index is, what the baseline is, and whether the argument follows.
7. (extra) **Non-US adult:** knows New York only by name.

## What the learner meets

- **Predict:** a New York-shaped grid of squares and dots, with a fine lattice of lines over it. The text reads "Spread in boxes (0 even, 1 apart)" and a 2×2 chip shows "?". The question: "Two equal groups are mixed at random. Before anyone moves, what do the 2 × 2 boxes score?" The options are 0 to 0.1, 0.4 to 0.5 and 0.9 to 1. This confronts a real intuition ("random = mixed = 0"), and that is a strong choice.
- **Explore:** on the first tap, the 2×2 chip shows "start 0.47". The prediction is contradicted at once, which is good. Then 4×4 shows 0.27 and 8×8 shows 0.12. Run settles at 2×2 0.76 and 8×8 0.34. New mix gives similar numbers but different clumps. "Not modelled: money, prices, history, who was allowed to live where" appears once the grid has moved. The panel text never changes from "You said 0 to 0.1. First measure…".
- **Reveal:** two settled maps side by side, then two paragraphs (about 140 words). Paragraph 1 says small boxes are uneven by chance, 8×8 evens this out, and census tracts are where chance adds little. Paragraph 2 starts in bold: "This model does not show why real cities look as they do". It then covers housing and lending **discrimination by race**, the 1930s lending-risk maps and wealth gaps, and says research is mixed on whether the maps caused this.

## Where the learner first needs an idea they don't have

**The prediction question (first break).** "What do the 2 × 2 boxes score?" needs two things the learner doesn't have:
- what a "box" is (nothing labels the lattice);
- how many boxes become one "score". "Spread" on the stage and "score" in the question are different words, and nothing says the number is one figure for the whole city.

The boundary learner guesses from the word "random", which is the intended misconception, so this gap works in the lesson's favour at predict. **It costs at reveal:** "uneven boxes raise the score" has to be taken on trust, because the learner never learns how box unevenness turns into one number. They can repeat "small boxes are uneven by chance" but not why that gives about 0.45 rather than 0.1 or 0.9.

**Second break: the jump between the reveal's two paragraphs.**
- Paragraph 1 is about measurement: box size, and census tracts. "census tracts" is glossed, which is good.
- Paragraph 2 is about causes. The only bridge is "your mixes clumped in different places". The boundary learner gets "the rule can't say *which* neighbourhood", but not why that means it can't explain *how segregated* a city is. The card asserts more than this evidence carries (see the sceptic).

**Third break: the Run result is never interpreted.** The learner watched a 30% rule push 2×2 from 0.47 to 0.76. No sentence says what that shows. The hook promised "what can it tell you, and what not". The reveal answers "what not" and gives a measurement point, but never says what the rule *can* tell you. The boundary learner leaves unsure why they pressed Run.

## Per-persona answers after the reveal

Key: (a) shows why NY looks as it does? (b) what was left out? (c) outlined boxes read as territories or zones? (d) clumps or numbers read as "segregation is just chance"? (e) discrimination based on? (f) why a random mix doesn't score 0 (g) can they restate the moving rule from the card alone?

### 1. Feed skimmer
- (a) **No**, provided they reach the reveal. The bold "This model does not show why real cities look as they do" is the most visible line. The risk is a skimmer who swipes during explore: they take away only "Schelling on New York" plus a NYC map sorting itself, which reads as yes.
- (b) "Money, prices, history…". The grey corner note is readable but small; "discrimination by race" is bold.
- (c) No. To them the lines are a background grid.
- (d) **At risk.** Reading bold plus the headline "Not quite: it was 0.4 to 0.5", they can come away with "random mixing already looks segregated", so the numbers are mostly chance. The rebuttal "where chance adds little" is unbolded at the end of paragraph 1.
- (e) Race (bold).
- (f) Cannot say.
- (g) Yes. The rule line is short and bold.

### 2. Low-reading-stamina phone user
- (a) **No.** They read the bold line.
- (b) The stage note lists money, prices, history and who was allowed where. They likely recall "money, history".
- (c) No. The lines look like graph paper.
- (d) Mild risk, as for the skimmer. They will not read to "where chance adds little".
- (e) Race.
- (f) Only if they read sentence 1 of the reveal: "most 2×2 boxes are uneven". That sentence opens with an awkward dangling phrase ("Holding at most 4 households, most 2×2 boxes…"), which costs this reader.
- (g) Yes.

The reveal is about 140 words in two dense paragraphs. This persona gets the bold claim and loses most of the support for it.

### 3. "People prefer their own kind" believer
- (a) **Partly (counts as yes).** They watched "Move if fewer than 30% of neighbours are like them" take the city from 0.47 to 0.76 and read it as confirmation that "even mild preference sorts a city". The reveal adds discrimination as a further cause ("households did not all have the same choices"). It never says the preference mechanism is absent or minor in real cities. So the believer's position after the reveal is "preferences plus discrimination". "Model rule, not anyone's measure" does not dislodge this: "measure" reads as "measurement", not "a measure of anyone's attitudes".
- (b) "Money, prices, history" plus discrimination. They accept these as additions, not replacements.
- (c) No.
- (d) No. They read the clumps as preference, not chance, which is the opposite misreading.
- (e) Race.
- (f) "Small boxes are uneven." Likely gets it.
- (g) Yes. They restate it eagerly and add "people like to be near their own".

### 4. Knows US housing history
- (a) **No.** Agrees that the model leaves out the cause they know. Possible pushback: "white-flight tipping was real, so the model captures part of that". The card's symmetric rule (both groups use the same rule) does not engage with this, so their "no" may be "no, but it misses the asymmetric version that partly does".
- (b) They name it fully: discrimination, covenants, lending, and also asymmetry between groups, unequal group sizes and density.
- (c) No as a learner on the stage. Hypothesis: after reading "government maps grading neighbourhoods", they may look back at outlined boxes on a city map and think of the grading maps. The reveal maps carry no outlines, which weakens this.
- (d) No.
- (e) Race. They accept the "research is mixed" hedge as fair.
- (f) Yes.
- (g) Yes, and they also ask where the movers go.

### 5. New Yorker
- (a) **No.** The settled clumps match no real neighbourhood, and the card says the mixes clumped in different places. Frustration: the lesson is "on New York" yet says nothing about New York. The history is about "US cities", and the outline is decoration. Expect "why my city?".
- (b) Money, prices, history, who was allowed where. They also add rents, housing stock, immigration and transit.
- (c) **Some risk.** On the 8×8 settled frame (05-step-4), long lines cross Brooklyn and Queens, with stubs along the coast. Someone who knows the city can read these as district, zoning or borough lines. Nothing on the stage ties a line to a single-colour box: the "□ one-group boxes" legend icon is a closed square, but the drawn lines are mostly open segments.
- (d) No.
- (e) Race.
- (f) Yes.
- (g) Yes.

### 6. Numerate sceptic
- (a) **No**, but they challenge the card's argument:
  - "clumped in different places" shows only that the model can't predict *location*. It does not show that the model can't explain the *level* of segregation.
  - The run raised 2×2 from 0.47 to 0.76, and the card never compares that to anything real.
  - So "does not show why" is asserted, not demonstrated.
- (b) The stage list, plus: what counts as a neighbour, where movers go, equal group sizes, uniform density and only two groups.
- (c) No. To them the lines are an aggregation grid. They notice the coast-cut partial boxes and wonder how those are counted.
- (d) No. They take the measurement point correctly (unit dependence).
- (e) Race.
- (f) Yes, and they want the formula: "how does one-group share turn into 0.47?". The card never gives it.
- (g) Restates the rule, but notes that "neighbours" is undefined.

### 7. Non-US adult (extra)
- (a) No.
- (b) As the stage lists.
- (c) No.
- (d) Slight risk, as for the skimmer.
- (e) Race, though "lending-risk maps" means little without context.
- (f) Partly.
- (g) Yes.

### Boundary learner (general adult, no econ/soc)
- (a) **No.** They repeat the bold sentence. Their reason is thin: "the clumps landed in different places each time".
- (b) "Money, prices, history, who was allowed to live where", and discrimination by race.
- (c) No, mostly. The lines read as a grid on the map. The predict frame's dense lattice is noise to them, and they do not link outlines to "one-group boxes".
- (d) **Mostly no, with some risk.** Paragraph 1's "a random mix already scores 0.4–0.5" plus "your mixes clumped in different places" could combine into "where people end up is luck". "Where chance adds little" and the bold discrimination clause counter this, if read.
- (e) Race.
- (f) "Small boxes hold only a few households, so by chance many are all one kind, and that pushes the number up." They can say this but cannot say why it gives about 0.45 (see first break).
- (g) Yes: "a household moves if fewer than 30% of its neighbours are its own kind". They cannot say what a neighbour is or where movers go. "Model rule, not anyone's measure" confuses them ("measure of what?").

## Count for (a)

**1 of the 6 required personas answers yes or partly: the believer.** The skimmer is the borderline second case: yes or partly if they leave before the reveal, no if they read the bold line. The boundary learner and the extra persona answer no.

## Recall card

> "In this model, a random mix scores about 0.4 to 0.5 in 2 × 2 boxes of the grid (at most 4 households each). What does that tell you about a segregation number?"

- **It stands alone.** The question restates the setup, and the answer ("depends on the unit, so the unit must be stated") needs no memory of the screens.
- **Two cautions:**
  - The lesson never said "unit" or "segregation number". It said "boxes" and "spread/score". The mapping is easy but new.
  - Option A can be found by test-taking logic: B is the tempting literal reading and C is the extreme. So a correct answer is weak evidence that the idea stuck.
- **What it leaves out:** it checks only the measurement half of the reveal. Nothing checks the "model ≠ cause" half, which is the half the believer gets wrong.

## Smaller findings

- **F1.** The explore panel text stays at "You said 0 to 0.1. First measure…" through every action. The learner gets no mid-explore acknowledgement that 0.47 contradicted their guess.
- **F2.** The reveal pair shows mix 2 on the left and mix 1 on the right, with uneven captions: only mix 2 shows the 8×8 figure.
- **F3.** The "35% held one group" in the reveal is the mix-2 2×2 figure. The learner never saw a 2×2 one-group figure during explore, only 4×4 (14%) and 8×8 (6%, 0%). It appears only in the small reveal caption.
- **F4.** The "75S" chip and "9/21 claims checked" are visible to learners. 9/21 may lower trust for the sceptic. I did not look into what this means for this lesson; I am noting it only.
- **F5.** "Model rule, not anyone's measure" is ambiguous for this boundary: "measure" reads as measurement.
- **F6 (possible contamination).** My reading of "the card asserts more than the clumps-in-different-places evidence carries" may have been sharpened by the trust-sheet notes in the transcript appendix. The sceptic's objection stands on the card text alone.

## Launch-blocking?

I am not blocking. The strongest finding for the owner is the believer's "partly". The reveal states what the model leaves out but never says what the moving rule's result does *not* license. It also never says what the Run *did* show, so the hook's "what can it tell you" goes unanswered. Both belong to the learning designer and builder; this review does not prescribe fixes.
