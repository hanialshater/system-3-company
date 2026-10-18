# Learner review: schelling-on-new-york (general adult, no lesson one)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

- Date: 2026-10-14 · reviewer: learner-evaluator (borrowed mind) · branch s2-rebuild
- Artifact: fresh `npm run walkthrough -- schelling-on-new-york` (dev server, port 3193), phone viewport,
  choice option 1 ("About 0 to 0.1"). Read `transcript.md`, `sheet.png`, and frames `01-predict.png` and
  `11-reveal.png` at full size. Screenshots seen.
- Recall card: not in the walkthrough. I read only the learner-facing `recall` field of meta.json (what the
  feed shows) before writing; no other part of meta.json, and no design, build or review file.
- **Knowledge boundary:** a general adult. Reads a phone feed and is comfortable with a 0-to-1 scale
  and percentages. Has no economics or sociology background. Has never heard of Schelling, the
  index of dissimilarity, or census tracts as a unit. Has **not** seen lesson one
  (mild-preferences-sharp-divides), so has never seen agents that move under a "like me" rule.
  Knows New York as a real city where "block" means a city block.

## Verdict on the cultural review's required probe: **FAIL**

On my reading, 3 of 6 plausible readers would answer (a) "yes", "mostly" or "kind of". That is
half the readers, not a small minority.

### Personas (stated before answering)

| # | Persona | How they read the card |
|---|---|---|
| P1 | Careful reader: reads every word of the reveal | Reads both paragraphs of the reveal |
| P2 | Feed skimmer: reads the headline and first line, watches the map | Reads "Not quite..." and the first sentence, then scrolls |
| P3 | Already believes "people just prefer their own kind" | Reads the reveal and hears the caveats as boilerplate |
| P4 | Knows the history (a reader of news on redlining; possibly a Black or Latino New Yorker) | Reads closely and looks for what is missing |
| P5 | Second-language or low-reading-stamina phone user | Gives up partway through the 95-word second paragraph |
| P6 | Numerate sceptic (an engineer or analyst) | Reads it as a lesson about measurement |

### (a) "Does this show why New York looks as it does?"

- **The learner (my boundary), answering honestly:** "Not really... though it does show how
  neighbourhoods could split up by themselves. It says money and history matter too." That is
  a **"partly"**. The image I keep is the New York-shaped map sorting into green and purple
  clumps. The sentence saying the model does not explain the city is something I read; it is
  not something I saw.
- P1: **No.** Quotes "the model does not show why any real city looks as it does."
- P2: **Mostly / yes.** The last thing they watched was the New York outline sorting into
  clumps, under a title that says "...on New York". The disclaimer is sentence 2 of paragraph 2.
- P3: **Mostly.** "People sort themselves, plus some history." The animation confirms what
  they already believed. "Without money or history" reads to them as "there are other factors
  too", not "this is not the explanation".
- P4: **No**, and possibly irritated that a sorting-by-preference animation on New York's
  outline comes first and the history comes in a dense afterword.
- P5: **Yes.** "It shows how the neighbourhoods in New York got separated." They did not reach
  the end of the reveal or could not parse it.
- P6: **No.** "It's about measurement units. The city shape is decoration."

Result: "no" from P1, P4 and P6; "yes" or "mostly" from P2, P3 and P5, plus a "partly" from the
boundary learner. **Fail.**

Why the probe fails, as the learner experiences it:
1. **The most vivid thing in the lesson is the explanation it disowns.** Title "Schelling on New
   York", hook "New York's shape", a recognisable outline, then Run, and the city sorts into
   blobs. Everything that says "this is not why" is text: small grey stage lines ("Not New York's
   population", "A setting, not a measure of anyone", "Not modelled: ...") and one clause in the
   reveal.
2. **In the reveal the disclaimer comes after the model's result, in the same breath:** "a moving
   rule sorted the grid to 0.76. Without money or history, the model does not show...". A skimmer
   keeps "a moving rule sorted the grid" and drops the rest.
3. **"Without money or history" can be read as "apart from money and history"**, which means
   "this is part of the explanation". P3 reads it this way.
4. **The reveal frame shows the sorted map** (seed 1, tick 7, big single-colour regions), not the
   random start, which is where the lesson's actual point (unit dependence) lives.

### (b) "What was left out?"

- **The learner:** "Money and history. Discrimination in housing and loans. Some 1930s maps." This
  answer is reachable, because the stage line "Not modelled: money, prices, jobs, history, who
  could live where" and the reveal both list these things.
- P1, P4: list money, discrimination and lending maps. P4 adds unequal group sizes, many groups
  rather than two, density, immigration, public housing and zoning.
- P2, P5: "Not sure" or "nothing". They did not reach the list. The stage line appears only after
  a full run, in the smallest type on the card.
- P3: "Money, I guess", treated as a secondary factor.
- P6: "Real units. The real data. What a tract-level number would be."
- Not named anywhere a learner sees: the real groups are not equal in size and there are more
  than two; density is not even; the grid is not a map of people. The stage says "Not New York's
  population", but nothing says what *is* different about the population.

(b) is answered adequately by readers who reach the end. It is not answered by the readers who
also fail (a), so the two failures concentrate in the same people.

## Where the learner first needs an idea they don't have

In order of appearance:

1. **Predict question: "how unevenly are they spread, measured on blocks of 2 × 2 cells (0 even,
   1 fully apart)".** **This is the first real break.** I can picture "fully apart". I cannot
   picture how a single number comes out of many small blocks, and the blocks are never drawn on
   the map. In a New York lesson, **"blocks" reads as city blocks**, so "2 × 2 blocks" sounds like
   four street blocks, not four grid squares.
2. **"would stay 80%" at Tick 0, next to "seed 1".** "Stay" where? Nothing has moved, and nobody
   has told me the squares move. Because I have not seen lesson one, the idea of squares that move
   under a rule exists only in the slider label at the bottom ("Move if fewer than 30% of
   neighbours are like them"). "Tick" and "seed" are unexplained jargon. I ignored them.
3. **"neighbours".** Which squares count: the 4 touching sides, all 8 around, or empty ones too?
   I could not tell. It did not stop me, but I could not predict what Run would do.
4. **1 × 1 reads 1.00 at the random start.** The scale says 1 means "fully apart", and I am looking
   at a well-mixed map. Nothing on the stage explains this. I concluded the measure was broken
   (recall option 3) or that the mix was "already sorted" (recall option 2). The reveal never
   mentions 1 × 1.
5. **Reveal: "A segregation number needs its unit."** This is the first time the word
   *segregation* appears. Until then the number was "spread". The bridge from "spread" to "a
   segregation number" is not made.
6. **Reveal: "A census tract holds thousands of people; a 2×2 block here, at most 4 squares."**
   - I do not know what a census tract is. I only get that it is big.
   - I do not know what a square is: a person? a household? The stage never says.
   - The comparison mixes **head count with area**. The map covers all of New York in about 40
     columns, so a 2 × 2 block of squares covers a large part of a borough, which looks
     geographically *bigger* than a neighbourhood. If I know New York at all, "the tract is the
     bigger unit" contradicts what I see.
   - The point I am meant to take ("so on real data the number would mean something different")
     is left for me to infer.
7. **D**: never shown to the learner (it appears only in the trust sheet). Not a break.

## Can the prediction be answered honestly before exploring?

**Yes on visibility. Weak on reasoning.**
- Before Lock it in, the stage shows only the random map. The spread readouts and controls are
  not visible (the transcript shows "2×2 ?"). The answer is not visible. Pass.
- The honest lay answer is "random means mixed, so about 0". That is the misconception the lesson
  wants to surface. Good.
- But the learner has no way to *reason* toward 0.4 to 0.5. It is a guess against an
  unexplained measure. A test-wise reader can game it: the hook "What can the number say, and
  what can't it?" signals a surprise, so the middle option is attractive.
- **The reveal does not explain why a random mix scores 0.47.** It says "Not quite: it was 0.4 to
  0.5" and moves on to units. The words "chance alone makes blocks uneven" appear **only in the
  recall card's explanation**, days later. So the reveal does not answer the question this learner
  actually had after getting it wrong: "why isn't a random mix 0?"

## Does the recall card stand on its own?

**Partly.**
- "In this model, a random mix scores about 0.4 to 0.5 on 2 × 2 blocks. What does that tell you
  about a segregation number?" Days later, "this model" and "2 × 2 blocks" (of what?) depend on
  remembering the stage. That is acceptable for a recall card, but there is no cue (such as
  "the New York-shaped grid") to anchor it.
- **It can be answered by elimination without understanding.** Option 1 is the long, qualified,
  textbook-sounding answer. Option 3 ("broken... not used at all") is a strawman. Option 2 ("already
  half sorted") is the only live distractor, and it is a good one: it is exactly what my learner
  believed after seeing 1 × 1 = 1.00.
- Its explanation ("chance alone makes blocks uneven") **teaches something the reveal never
  said**. The recall card is doing the reveal's job.
- It stays on unit dependence, does not mention New York, and makes no real-city claim. That is
  good for the cultural probe.

## Other things the learner hit

- **The reveal swaps the stage without saying so.** My last screen was seed 2, Tick 0, slider at
  20%, 8 × 8 = 0.14. The reveal says "Your start: 0.47 on 2×2 blocks, 0.12 on 8×8" and shows seed
  1, Tick 7, 30%. I measured 8 × 8 only on seed 2 (0.14), so "your start ... 0.12" is a number I
  never saw. It made me doubt the reveal. The "seed" readout is the only clue, and I ignored it
  as jargon (item 2 above).
- **Moving the slider changed "would stay" (79% to 93%) with no tick.** That is consistent with the
  model, but unexplained to someone who doesn't yet know what "stay" means.
- **The second reveal paragraph is about 95 words of dense prose** on a phone ("late-1930s
  government maps grading neighbourhoods for lending risk... research is mixed on whether the maps
  caused this or recorded earlier practice"). It is careful and hedged, but P5 does not get
  through it, and P2 does not try.
- The hook has a grammar slip: "What can the number say, and what can't it?"

## Top 3 issues (problems, not fixes)

1. **Cultural probe fails (blocking, per the cultural review's publish condition).** Half of the
   plausible readers come away thinking the lesson shows, at least partly, why New York looks as
   it does. The sorting animation on New York's outline is the strongest image, and the
   disclaimer is text that follows the result and reads to some as "other factors too".
2. **The reveal does not answer the learner's real question ("why isn't random 0?").** "Chance
   alone in tiny blocks" appears only in the recall card. Without it, "a segregation number needs
   its unit" is an assertion. The 1 × 1 = 1.00 readout pushes learners toward the "broken" and
   "already sorted" misconceptions, and nothing on the stage or in the reveal addresses them.
3. **The unit comparison is not understandable within this boundary.** "Blocks" collides with New
   York city blocks. "Squares" are never said to be people or households. "Census tract" is
   unknown. Comparing head count with area contradicts the map, where a 2 × 2 block looks bigger
   than a neighbourhood.

Also notable: someone who has not seen lesson one meets the moving rule only as a slider label,
and "would stay", "Tick" and "seed" go unexplained. The reveal silently switches seeds, so it
quotes a value (0.12) the learner never saw.

---

## After reading the brief

I read meta.json's brief fields only (learner, misconception, objective, recall, curriculum), not
the claims notes, build.md or any other review.

- **Boundary choice.** The lesson's own boundary assumes lesson one (the Schelling mechanism) as a
  prerequisite (`economics:schelling-segregation`), though it says the card "explains its own
  squares and rule". This review used a harder boundary on purpose, as briefed. In this
  walkthrough the card explains its rule only through a slider label. "Squares" are never named
  as anything, and "would stay", "Tick" and "seed" are not explained. So the card's
  self-sufficiency claim does not hold for a reader without lesson one.
- **Misconception 1** ("if a simple model reproduces a city's pattern, that is why the city looks
  that way") is what the probe tests. In my reading the lesson's strongest image reinforces it
  for half of the personas. Under the reviews rules, a misconception the lesson reinforces is a
  fatal flaw. I am treating it as **blocking** until a re-walkthrough shows otherwise.
- **Misconception 2** (random means about 0) is well surfaced by the prediction. But the
  objective's mechanism ("chance alone makes small blocks uneven") reaches the learner only in
  the recall card's explanation, not in the reveal.
- **Objective vs experience.** The objective has three parts: unit dependence, the toy model
  sorting to about 0.75, and what the model leaves out. My learner could repeat "the number needs
  its unit" and "money and history were left out". They could not *explain* unit dependence,
  because the census-tract comparison did not land (Top issue 3). For "leaves out... so it does
  not show why", see the probe.
- The objective says "who was allowed to live where". The stage says "who could live where". The
  "could" wording is weaker: a lay reader can take it as affordability rather than exclusion.
