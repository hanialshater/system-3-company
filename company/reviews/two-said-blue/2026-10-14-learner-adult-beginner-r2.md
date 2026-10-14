# Learner review r2: two-said-blue (revised version)

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round 2
borrowed mind: adult comfortable with "2 in 3" and percentages, never heard of information cascades or herding
method: transcript.md, sheet.png; Demo.tsx reveal branch read. Simulated learner, not evidence of learning.
screenshots seen: yes (sheet.png)

## Part 1: findings from the artifact, before meta.json / earlier review / build.md

**Idea the learner lacks:** once the crowd's earlier picks lead by two, later people ignore their own clue, so their information is lost and the crowd can lock onto the wrong colour.

**Answer visible before predicting.** Strong. Title "A crowd copies its way wrong" says the crowd goes wrong; hook "Do their separate clues still add up?" says no. That removes "almost never". "About half" feels too extreme given clues are 2 in 3, leaving "1 in 5". The script chose option 0, which is the correct answer, and it is the sort of answer one reaches by elimination from the title. The reveal then says "Your prediction held" and the lesson has no wrong-branch run to check. The reveal text is the same for any choice, except the header.

**Predict question.** ~65 words with four rules in one paragraph ("in turn", "see all earlier picks", "leads by 2 or more they copy it, otherwise own clue"). Hard on a phone but it is the model. The locked stage's controls are cropped at the bottom ("Run 1 / 100 / 10,000" clipped, 01-predict). The "urn is mostly blue or mostly red" is never given a number; the learner does not know how lopsided.

**Where understanding first broke.** Steps 1 to 3: tapping "Clue right 60/80/2 in 3" changes a readout and nothing else (stage says "No run yet"). Three taps produce no visible consequence; this is the dead stretch. Step 4: Run 1 shows 100 blue picks; the learner sees a crowd get it right and wonders what the lesson is about. Step 5: Run 100 gives 18 wrong of 101. "CROWDS RUN 101" appears because run 1 plus run 100; fine but odd. Step 6: Run 10,000: crowd wrong 2,009 (19.9%); the dot picture shows a single run, which is an almost all-red crowd. That is the strongest image: nearly everyone wrong. Step 7: Pool: 62 blue of 100 clues on the same crowd that picked 1 blue of 100. That contrast is the lesson, shown. Nice.

**Told vs shown.** "Once two picks lead, one clue can no longer change the next pick" is told. What stands for it on stage: a ring marking the first "lead of 2" pick. The legend says "lead of 2 first seen" but in the run pictures the ring is on one dot only; the learner never sees a person with a red clue choosing blue (or vice versa) because the stage shows picks, not the clue behind each pick. In Pool view the clue row is shown separately from picks; you must compare two screens in memory. "Two wrong clues at the start (11.1%) is only the quickest way in" is told arithmetic with no stage counterpart; "exact: 20.0%" is jargon the learner never asked for.

**Reveal quotes reached states?** Numbers come from the learner's own tally of the most-run accuracy. In the scripted run those are 10,101 crowds at 2 in 3; fine. If the learner ran only 60% or 80% crowds, the reveal reports that accuracy, but the 60/80 comparison (the natural second question: does a better clue fix it?) never gets an answer from the reveal.

**Individuals vs crowd.** Missing anchor: a single person is wrong 1 in 3. The crowd is wrong 1 in 5. The learner could read "20% wrong" as good news. The reveal compares only to the plain vote (0.02%).

## Part 2 follows below.

# Part 2: after meta.json, the earlier review, and build.md (read only after Part 1)

meta: doesNotKnow = a copied pick is not an independent clue; the crowd stops adding information after two matching picks. Objective asks the learner to say the crowd locks onto the wrong colour about 1 in 5 *because* after a lead of 2 nobody's own clue changes the pick, and a plain vote is wrong about 1 in 5,000.

## Previous findings (earlier review) checked
- Rule withheld at predict: **fixed**; the question now states the copy rule.
- Reveal gap 1 in 9 vs 19.9%: **fixed**; reveal now says two wrong clues (11.1%) are "only the quickest way in" and the total is higher. It is still told arithmetic (no stage stand-in) but it is context.
- Jargon "seeds", "10,101": **fixed**; "exact: 20.0%" is new minor jargon.
- Dead chips (steps 1 to 3): **partly fixed** by the "Clues right" readout; the stage still says "No run yet", so three taps change one number only.
- Pooled before meaning: **fixed** ("ties excluded" added); "Pool the clues" label is now explained by "Each person's clue, counted as a vote."
- Answer visible: earlier review found none; now the title "copies its way wrong" and hook "do their separate clues still add up?" give it away, and the correct option is now first (the script's choice). The reorder undid the middle-option pattern but the title does the leak.

## Told vs shown
Cause in the brief: "after a lead of 2 nobody's own clue changes the pick". On stage: the ring marks the first lead of 2; the Pool toggle shows clues (62 blue of 100) against the picks of the same crowd (1 blue of 100). That pair is a real stand-in for "picks are not the clues". But the reveal never points at it: it states the cause as a told sentence ("Once two picks lead, one clue can no longer change the next pick"). Also the stage never shows a single person holding a red clue and picking blue.
Missing anchor: a lone person is wrong 1 in 3, so 1 in 5 reads like good news; the reveal's contrast is with the plain vote only.

## Verdict for the current version: **revise**
Screenshots seen. Small: the stand-in exists, the reveal does not point at it, and the title gives the answer away.
Top remaining finding: have the reveal name what the learner saw on the Pool toggle (clues mostly blue, picks nearly all red) and, ideally, mark the first person whose clue was overridden; add the single-person 1 in 3 anchor.
Next move: demo-builder (reveal text and marker), learning-designer on the title.
