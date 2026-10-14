# Learner review v3: schelling-on-new-york (general adult, no economics or sociology)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

- Date: 2026-10-14 · reviewer: learner-evaluator (session 2, branch s2-rebuild)
- Boundary: a general adult with no economics or sociology background. Has never seen another lesson in this feed. Does not know who Schelling was, what a segregation index or a census tract is, or anything about US housing history beyond general news.
- Artifact: `npm run walkthrough -- schelling-on-new-york` (Pixel 7 phone, choice 1 "About 0 to 0.1", recorded 2026-10-14T14:35Z), plus `sheet.png` and frames 01, 03, 06 and 08 opened singly. Screenshots seen. I also measured the predict screen on an iPhone SE viewport (320x568) with a throwaway Playwright script against the same build.
- Independence: I did not read build.md, the design file, specs or earlier reviews (including `2026-10-14-learner-review.md`). Disclosure: the walkthrough transcript ends with the "Why trust this?" sheet, and its claim notes include builder and reviewer reasoning. I read that appendix as part of the transcript. My findings below come from the learner-facing card. From meta.json I read only the `recall` and `hook` fields.

## Personas (stated before looking)

| # | Persona |
|---|---|
| P0 | **Boundary learner**: careful, reads every line once, no background |
| P1 | **Feed skimmer**: about 3 s per card; reads the headline, the bold text and the first clause |
| P2 | **Phone user with low reading stamina**: small phone, reads the first sentence of each paragraph |
| P3 | **Already believes "people prefer their own kind"** and takes that to explain city maps |
| P4 | **Knows US housing history**: redlining, the 1930s lending maps, FHA, covenants |
| P5 | **New Yorker** who knows the neighbourhoods and will try to match the map to them |
| P6 | **Numerate skeptic**: wants to know how the number is computed and what it should be by chance |

## What the learner sees, in order

1. **Hook**: "Measure a random mix on New York's outline. What can the number tell you, and what not?" The title is "Schelling on New York", and Schelling is never explained anywhere on the card.
2. **Predict**: The question asks how unevenly two equal made-up groups, placed at random, are spread "over the 2 × 2 boxes drawn on it (a segregation index: 0 even, 1 fully apart)". The options are 0 to 0.1, 0.4 to 0.5 and 0.9 to 1. On Pixel 7 the stage is clipped just below the button row. The rule line ("Move if fewer than 30%...") and the box chips are cut off, but "would move 20%" is visible, so the learner sees a moving count before seeing any rule.
3. **Explore**: "Run the rule at 30%, press New mix, then measure the same grid in bigger boxes." Step and Run sort the grid into clumps, and grey outlines appear on many 2×2 boxes. "New mix" showed mix 2 already at Round 12 (settled, 0.44→0.76), so the learner never saw the new random start until they pressed Reset. Measuring at 4×4 and 8×8 at round 0 gives 0.24 and 0.14.
4. **Reveal**: "Not quite: it was 0.4 to 0.5." Then about 150 words in two paragraphs. The first gives the box-size point and the census tract. The second says the model does not show why real cities look as they do, and gives the US history (discrimination by race, wealth gaps, the late-1930s lending-risk maps, research mixed on cause). Two settled mixes are shown side by side, with "Not modelled: money, prices, history, who was allowed to live where."

## Where the learner first needs an idea they don't have

**In the predict question, before any interaction.** "How unevenly are they spread over the 2 × 2 boxes drawn on it" needs two ideas the boundary learner lacks:
- **Evenness across units.** You compare each box's mix with the city-wide mix. The parenthesis gives only the endpoints.
- **The boxes.** "Drawn on it" points at the map, but at predict no 2×2 grid is visibly drawn. Only some faint, unexplained outlines appear around some cells, and the box chips are clipped off the stage on Pixel 7.

The second break comes at the reveal: "A segregation number needs its unit; a census tract holds thousands of people." The learner does not know what a census tract is or that real segregation figures are computed over tracts. So the sentence that should carry the lesson to real numbers lands as an unexplained aside.

The title word "Schelling" is a smaller break: an unknown proper noun that is never paid off.

## Can the prediction be answered before exploring, without seeing the answer?

**It can be answered as a gut call, not reasoned.** The answer is hidden: the 2×2 chip shows "?", and on Pixel 7 the chips are clipped off at predict anyway. Nothing on the predict screen leaks the value. But the boundary learner has no way to reason toward 0.4 to 0.5. "Random means mixed means about 0" is the natural guess, and the lesson is built on that guess being wrong. That is a legitimate commitment, but it makes the reveal a gotcha unless the "why" is clear, and the "why" is the weakest part (issue 1). Test-wise learners may simply pick the middle option.

## Does the phone predict screen need scrolling?

- **Pixel 7 (412x839): no page scroll.** "Lock it in" ends at y=787, and the page height equals the viewport. The stage itself is clipped mid-button-row, so the rule and the box chips are hidden.
- **iPhone SE (320x568): yes.** The stage collapses to a sliver about 40 px high, so the map is effectively invisible at predict. The third option is cut in half, and "Lock it in" (bottom at y=604) sits below the fold inside an inner scroll region (document height 568). I did not test whether that inner region scrolls smoothly by touch. Screenshot: none kept; it was a scratch file.

## Does the recall card stand alone?

**Mostly yes.** It restates the number (0.4 to 0.5), the unit (2 × 2 boxes, at most 4 households each) and the claim. Its "why" text explains the mechanism ("chance alone leaves many boxes holding only one group") more clearly than the reveal does.

Weaknesses:
- "In this model" points back to a model the recall does not describe. "A random mix" partly covers this.
- The right answer can be found by test-wiseness: it is the longest, most hedged option, and option 3 is an absolute ("should not be used at all").
- Option 2 ("already half sorted before anyone has moved") is a good distractor because it is the live misreading.
- The recall tests only the unit idea, not the "model does not explain the city" idea. I note this; I am not judging whether it should.

## Per-persona answers after the reveal

Key: (a) Does this show why New York looks as it does? A hedge counts as yes. (b) What was left out of this model? (c) Do the outlined boxes look like marked territories or zones? (d) Do the clumps read as "segregation is just chance"? (e) What was the discrimination based on? (f) Why doesn't a random mix score 0?

### P0 boundary learner
- (a) **Probably "No, the model doesn't, it says so."** There is a real risk of "partly: the history part explains it", which counts as yes. The paragraph that says "does not show why" goes straight on to name what does, and a careful reader can merge the two.
- (b) Reads it off the stage: money, prices, history, who was allowed to live where. Would not think of equal density everywhere or of only two groups.
- (c) Mostly reads them as "the boxes the question meant", but does not know why only some boxes are outlined. No legend ties outline to "one-group box", and the readout "one-group boxes 75%" is near but unlinked. At 4×4 the outlines break into line fragments and crosshairs that look like borders. Mild zone reading.
- (d) **Partly.** "Chance alone left 35% one group" plus "a random mix scores 0.44" leads to "some of what segregation numbers show is just chance". The census-tract sentence is meant to stop this from carrying over to real figures, but it never says that at tract scale chance contributes little. So the boundary learner is likely to carry "segregation numbers are partly chance" into real cities.
- (e) "Race" for the housing and lending discrimination: it is stated once, mid-paragraph. For the maps: "lending risk", i.e. financial. The learner does not learn that race was among the stated reasons for grades.
- (f) Can parrot "the boxes are tiny, at most 4 households, so many are all one group by chance". Cannot say why a one-group box pushes the score up, or why 4 households rarely split 2-2. The reveal gives the fact, not the mechanism.

### P1 feed skimmer
- (a) **Yes / partly.** The takeaway is the image: a simple rule making clumps on New York's outline, under a title that names New York. The disclaimer is mid-paragraph 2 and is not read.
- (b) Possibly "money, prices...": that caption is short and sits under the reveal pair. Otherwise nothing.
- (c) Barely notices them. If noticed, they look like patches each group holds.
- (d) **Yes, high risk.** The headline plus first clause ("it was 0.4 to 0.5... chance alone left 35% one group") gives "even random gives segregation, so it's partly chance".
- (e) Does not know; never reached "by race".
- (f) Cannot say.

### P2 low-stamina phone user
- (a) Probably **No**. The first sentence of paragraph 2 contains "this model does not show why real cities look as they do", which is well placed for this reader. On a small phone they saw almost no map at predict, which weakens the image's pull.
- (b) Money, prices, history, who was allowed to live where (from the caption).
- (c) On a small screen the outlines are visual noise. No zone reading, but no meaning either.
- (d) Moderate risk: they read paragraph 1's first sentence, which is about chance, and stop.
- (e) Likely misses "by race": it is on the fourth line of paragraph 2. Answers "don't know" or "money".
- (f) Cannot say. Paragraph 1 is numbers and fragments ("8×8: 0.14.") that this reader skips.

### P3 believes "people prefer their own kind"
- (a) **Yes / partly.** The rule is literally a preference ("Move if fewer than 30% of neighbours are like them"), and it clumps New York's outline. That confirms what they came in with. "A setting, not a measure of anyone" is too cryptic to counter it. "This model does not show why..." reads as a hedge. "Research is mixed on whether the maps caused this" gives them a ready reason to discount the history.
- (b) "Money and history, sure, but preference is the main thing."
- (c) **Yes:** outlined one-group boxes read as each group's own turf.
- (d) No. They read the clumps as preference, not chance. That is arguably the worse misreading, and it is the one the lesson most needs to defuse.
- (e) "Race, the card says, but that was the 1930s."
- (f) Does not care; "small boxes".

### P4 knows US housing history
- (a) **No.** Approves that the card says so, and recognises the unnamed redlining maps.
- (b) Reads the list, then adds covenants, steering, blockbusting, public-housing siting, FHA underwriting, immigration, and density differences.
- (c) **Moderate risk:** square outlines on a New York map, in a lesson that then mentions "government maps grading neighbourhoods", can be read as an echo of the graded zones. Nothing says the outlines are a measurement device.
- (d) No, but expects others to read it that way.
- (e) Race. Objects that "grading neighbourhoods for lending risk" sounds race-neutral when the forms recorded race. Notes that "In US cities" never says New York had such a map, although the lesson is about New York. Reads "research is mixed" as possibly minimising.
- (f) Understands the small-unit effect if they know the index; otherwise like P0.

### P5 New Yorker
- (a) **No.** The clumps match no real neighbourhood, and the two side-by-side mixes put the groups in different boroughs (Staten Island is purple in one and green in the other). The pair does real work here.
- (b) Immigration waves, prices, housing projects, and especially that every cell holds one household. Manhattan is not denser here, and the card never says so.
- (c) **Yes, moderately:** on a borough map, outlined squares and the 4×4 line fragments look like districts, zoning lots or community boards.
- (d) No.
- (e) Race.
- (f) No firm answer: "the boxes are small?"

### P6 numerate skeptic
- (a) No.
- (b) Asks what a neighbour is (8 surrounding cells?), where movers go, why 10% of cells are empty, why only two equal groups and why equal density everywhere. None of this is on the card.
- (c) Infers outline = one-group box from the readout. Not a zone reading.
- (d) No. Wants the chance baseline at tract scale, which the card points at but does not give.
- (e) Race.
- (f) **Gets it:** with at most 4 households, terms cannot cancel unless the box splits exactly 2-2. Complains that the card defines the index only by its endpoints, so "0 even" primes the wrong answer for any finite random mix.

### Tally
- (a) Yes/partly from P1 and P3, at risk for P0, no from P2, P4, P5 and P6.
- (c) A territory or zone reading for P3, P4 and P5, mild for P0.
- (d) Chance reading for P1, partly for P0 and P2.
- (e) "Race" reaches careful readers. Skimmers get either nothing or "lending risk" as the basis for the maps.
- (f) Only P6 can explain it; P0 can parrot it.

## Top issues

1. **The reason a random mix scores about 0.45 is asserted, not shown (question f).** The reveal says "at most 4 households each; chance alone left 35% one group" but never links one-group boxes to the score, or explains why a tiny box rarely holds an even split. The learner leaves with a surprising fact and no mechanism. The recall's "why" does this better than the reveal.
2. **The bridge to real numbers is unexplained jargon.** "A census tract holds thousands of people" relies on two things the boundary learner doesn't know: what a tract is, and that real segregation figures use tracts. It never states the consequence (at that scale chance adds little). The result is the misreading in (d), "segregation numbers are partly chance", carried into real cities.
3. **The preference rule outshines the disclaimer for P1 and P3.** The vivid part of the card is a 30% "like them" rule clumping New York's outline. The counter-message is text: a cryptic "A setting, not a measure of anyone", and a mid-paragraph "does not show why". For a reader who already believes "people prefer their own kind", the stage confirms it. This is a candidate misconception the lesson reinforces. I am not blocking on it; it should be tested with real learners (see next move).
4. **The explore steps blur the predict question.** The predict asks about the random start, but explore says to run the rule first. "Measure the same grid in bigger boxes" doesn't say whether that means the start or the settled grid. "New mix" showed a new mix already settled at Round 12, so the learner sees a new random start only if they think to press Reset. The 4×4 and 8×8 values the reveal quotes as start values depend on that.
5. **Unlegended outlines.** Nothing says outline = one-group box. At 2×2 settled they tile most of the map. At 4×4 they become broken lines and crosshairs that look like district borders. On a New York map followed by "government maps grading neighbourhoods", some readers will see zones (P4, P5).
6. **Small-phone predict layout (iPhone SE 320x568).** The map collapses to a sliver, the third option is cut, and "Lock it in" sits below an inner scroll. On Pixel 7 it fits, but the stage clips the rule line and box chips, so "would move 20%" appears without the rule that explains it.
7. **The basis of the discrimination is half-delivered (question e).** "By race" appears once, mid-paragraph. The maps are described only as grading "for lending risk", which reads as financial, so skimmers and some careful readers come away thinking the grades were economic.
8. **Load and jargon.** The reveal runs to about 150 words plus a dense number caption ("mix 2 · 2×2 0.44→0.76 one-group 35%→70% 8×8 0.14→0.31"). "8×8: 0.14." is a sentence fragment. "Mix N", "Round", "would move" and "Schelling" are all unexplained. The badge says 75 s.

Things that work:
- "Made-up model... Not New York's people" is clear.
- The "Not modelled" caption makes (b) answerable for nearly everyone.
- The side-by-side pair of two mixes is the strongest anti-"this is New York" device on the card (P5).
- The recall distractor "already half sorted" targets the right misreading.

## Verdict

**Revise.** No block. I found no false statement and no dead control. Issue 3 is a candidate "reinforced misconception"; it needs human learners (especially P3-type) before anyone can call it fatal. How sure I am:
- Issues 1, 2 and 6: high.
- Issues 4 and 5: medium. Whether New mix auto-runs or the walkthrough pressed Run is not certain from the transcript.
- Issue 3: medium. It is a hypothesis about a persona.

## After reading the brief

Not done. I did not read build.md, the design file or the spec in this pass.

## Next move

- learning-designer / demo-builder: weigh issues 1 to 5 and 7. Fixing them is not my role.
- qa-tester: check the 320x568 predict layout and what New mix does (issues 4 and 6).
- evaluation-steward: a human-learner test with "people prefer their own kind" readers for issue 3.
