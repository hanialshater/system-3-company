# Learning design, v3: schelling-on-new-york (2026-10-14)

role: learning-designer · session 2, branch `s2-rebuild` · lesson at commit `1a7bfaac` (v3)
read first (artifact before account): a fresh `npm run walkthrough -- schelling-on-new-york` (phone, option 1), regenerated at 14:35 because the 13:50 artifact predated the v3 commit; `artifacts/walkthroughs/schelling-on-new-york/` (sheet, 01-predict, 02 to 07, 08-reveal, transcript). Then `2026-10-14-build.md` (v3 section), then `company/design/reviews/2026-10-14-design-review-schelling-v3.md` (D4b, D5, D11), spec v3 §9 and §13, and cultural review 2 (for constraints on question wording).
scope: decisions on the brief, question, recall and interaction intent only. I did not edit the lesson, `board.json`, `progress.md` or `events.jsonl`, and I verified no claims. There is no earlier learning-design note for this lesson; this is the first.

## What I saw before reading the account

- **Predict (01).** The question takes 6 lines and the options take 2 rows, so the bottom of the stage is cut off at the fold: the box chips with their scale heading ("Spread in boxes (0 even, 1 apart)"), the `?` chip, S3 and the rule line are all hidden. The learner commits without seeing the rule or the measuring scale on the stage, so the question has to restate the scale in words. That is why the question is long, and the long question is what hides the scale: a loop.
- **Explore (02 to 07).** This works. The rule line, chips, S4 in the water, the one-group readout and the outlines are all visible, and the path shows the payoff in order: the random start is already 0.44 to 0.47, the rule sorts it to 0.76, and the same mix scores 0.24 in 4×4 and 0.14 in 8×8. The 8×8 frame (07) reads "one-group boxes 0%" next to 0.14, which is the cleanest single picture of "the number depends on the box".
- **Reveal (08).** Two settled maps with clumps in different places, captions carrying every quoted number. Paragraph 1 answers "why isn't random 0?" with the learner's own 35%.

## Decision 1. Slider removal (D5): **concur. The lesson still teaches its objective, and the static line serves it better.**

What the learner has to vary to reach the payoff is **the unit** (box chips) and **the mix** (New mix). Neither depends on the threshold:
- **Unit dependence (objective, part 1)** is shown at round 0 by the chips alone (0.44, 0.24, 0.14 on one mix). No rule is involved.
- **"A simple rule sorts the grid to about 0.75" (part 2)** needs one setting, not a range. The brief's objective names the 30% result only.
- **"The model does not show why a real city looks as it does" (part 3, the primary misconception)** is now carried by two mixes settling into clumps in different places. Varying the threshold would add nothing to that and would invite the wrong question. "At what tolerance does New York look like this?" is exactly the reading R6 and the cultural probe forbid.
- **"Mild preferences give sharp divides"** is the prerequisite lesson's payoff (`economics:schelling-segregation`, explored there with a slider). Repeating it here spends the learner's 60 seconds on the wrong lesson.
- The v2 learner review found that moving the slider changed "would stay" with no tick, which confused learners. That confusion is gone.

What is lost: a learner cannot check that the sorting is robust to the setting. That is acceptable for a unit-and-scope lesson, and c6 states the claim at 30% only.

Condition (for the re-probe, spec §13): the boundary learner, who has not seen lesson one, can state the rule from the static line in their own words ("they move if too few neighbours are like them"). If they cannot, the next lever is the line's position or weight (design-lead), not a slider.

Note for the cultural reviewer, not blocking: S3 "A setting, not a measure of anyone." now sits above a line that nothing on the card can set. I read "setting" as "a parameter of the model", and I think it still works. Whether R6 holds with a static line is theirs to confirm (D5).

## Decision 2. D4b stage-budget exception: **concur**, worded "once the grid has moved"

I concur with the exception for exactly two verbatim lines: the rule line (9 words) and S4 (11 words). S1 + S2 + S3 stay at 25 or fewer, and the caps are 34 before the grid moves, 45 after it moves, and 24 at the reveal. S4 appears once the grid has moved (round > 0 on any mix) and stays after Reset and New mix, as cultural pass 4 ruling 5.3 and the build already do.

Reasons, from the learning side:
- S4 carries part 3 of the objective on the stage, and it appears at the moment the misconception forms (the grid has just sorted itself). Shown at predict it would answer a question nobody has asked yet, and it would add 11 words to the frame that is already too tall. "Once the grid has moved" is the right trigger.
- The rule line is the only statement of the mechanism for a learner without lesson one. It must be on the stage and counted, so no later trim can remove it silently.

Answers to the concerns D4b attributed to me (now my own words):
- S4 on the stage, not only in the reveal: held. The reveal no longer repeats the list, so S4 is the only place the list appears.
- The rule only in a label: resolved by D5. It is now a line, and with Decision 3 it is visible at predict too.
- Reveal ≤ 120: met at 120. With Decision 3 the verdict line loses "About" (one token), so the longest reveal is 119.

One condition added: D4b condition (i), no stage scroll with S4 shown, currently **fails at predict** (113 px). Decision 3 fixes it, measured below. Until the builder applies it, the exception's own condition is not met.

## Decision 3. Shorter prediction question and options (fixes the 113 px predict scroll)

**Question (exact):**

> Two equal groups are mixed at random. Before anyone moves, what do the 2 × 2 boxes score?

**Options (exact, order unchanged, answer index 1):** `0 to 0.1` · `0.4 to 0.5` · `0.9 to 1`

- **Length:** 18 whitespace tokens (16 words if "2 × 2" counts as one word, as the spec counts it), down from 45. 87 characters, 2 lines at 390 px.
- **Options:** the same ranges with "About" dropped from all three, so the precision is still the same in every option. Without "About" all three fit on one row.

**Measured, not estimated.** I served the v3 build (`NEXT_DIST_DIR=.next-ld`, port 3197), replaced the question and option text in the page and measured `[data-testid="stage"]` at 390 × 844, isMobile, in both themes. The probe reproduces the builder's 113 px for the current text.

| Variant | Question lines | Option rows | Stage scroll |
|---|---|---|---|
| current (45 tokens, "About …") | 6 | 2 | **113 px** |
| 28-token question, "About …" | 4 | 2 | 72 px |
| 28-token question, short options | 4 | 1 | 22 px |
| 3-line question (any wording tried), short options | 3 | 1 | 2 px |
| **chosen (18 tokens), short options** | **2** | **1** | **0 px** (stage 452 px, 21 px spare) |
| chosen question with "About …" options | 2 | 2 | 31 px |

So the fit needs both changes: a question of 2 lines (about 87 characters or fewer) and options on one row. Variants that added "about" or "roughly" to the question wrapped to 3 lines (2 px of scroll). In the screenshot of the chosen version, the whole stage is visible at predict: S1, the lattice, the R-row, all 7 controls, "Spread in boxes (0 even, 1 apart):" with the `2×2 ?` chip, S3 and the rule line.

**Why it still does each job:**
- **Misconception probe kept.** "Mixed at random" and "before anyone moves" are both kept. These two phrases are what pull a learner toward `0 to 0.1`.
- **Answer hidden.**
  - No option is more precise than the others.
  - Nothing in the question mentions chance or small boxes.
  - The `2×2` chip still reads `?`.
- **Scale kept, on the stage.** The 0-to-1 gloss leaves the question because it is now visible on the stage, directly above the `?` chip ("Spread in boxes (0 even, 1 apart)"). "Score" points at that chip.
- **"The 2 × 2 boxes"** (definite article) points at the drawn lattice, so the learner can still look and count before committing (spec §9, learner review).
- **No "blocks" and no "boroughs".**
- **Cultural constraints kept.**
  - "Equal" stays in the question, where cultural pass 4 accepted moving it when S1 lost it.
  - "Made-up" and "households" are carried by S1 on the stage, which is now fully visible.
  - "Segregated" is not used as an adjective. Cultural review 2 allows "segregation" for the index but never of a group or place, which rules out "how segregated is this mix". The word "segregation" now first appears in the reveal ("A segregation number needs its unit") and in the recall, both already passed.

**Knock-on effects for the builder:**
- The verdict line becomes `Not quite: it was "0.4 to 0.5".` (kit template, 7 tokens), so the longest reveal is 119.
- Fact-checker notes:
  - c4: the card gloss is now only the stage heading; the question no longer says "a segregation index: 0 even, 1 fully apart".
  - c5: the question no longer says "drawn on it".

**Residual, low:** lesson seeds start at 0.42 to 0.53. If the learner's pinned mix P starts above 0.50, the reveal reads "it was 0.4 to 0.5" followed by "Mix N began at 0.5x". "About" used to cover this. Neither hedge fits in 2 lines, and choosing seeds by their D is ruled out (c5). I accept the gap, because the recall and c5 both say "about 0.4 to 0.5". Builder: report in pre-flight how many of the 48 seeds display a 2×2 start above 0.50. If the re-probe flags it, it comes back to me.

## Decision 4. Recall: **confirm, with one change to option 1**

- **Question (unchanged):** `In this model, a random mix scores about 0.4 to 0.5 in 2 × 2 boxes of the grid (at most 4 households each). What does that tell you about a segregation number?`
- **Options:**
  1. `It depends on the unit, so the unit must be stated` (**changed** from "It depends on the unit it is measured on, so the unit must be stated": 14 words to 10)
  2. `The random mix is already half sorted before anyone has moved` (unchanged, 11)
  3. `The number is broken, so it should not be used at all` (unchanged, 11)
- **Answer:** 0
- **Why (unchanged):** `A 2 × 2 box holds at most 4 households, so chance alone leaves many boxes holding only one group. The same mix scores lower in larger boxes. A number without its unit says little.`

Reasons:
- **Option 1 change.** It answers cultural review 2's open advisory: the right option was the longest. It is now the shortest (10 against 11 and 11). The stem no longer contains "unit", so "unit" in option 1 is no longer the stem's own keyword.
- **The stem stands alone days later.** It names the unit ("2 × 2 boxes of the grid") and its size ("at most 4 households"), with no city blocks and no real-city figure. It now echoes the question's "score", and it needs the idea, not the wording.
- **Option 2 is the best distractor.** It is the real misreading of 0.45, so it stays.
- **The why** now matches the reveal ("chance alone left N% one group") and claim c16.
- **Why the recall stays on the unit, not on model scope.** The unit is the idea the learner predicted wrongly and then saw corrected. Retrieving a corrected prediction is the strongest recall we have. The scope misconception is tested at the probe (spec §13 items 1 and 2), not in recall. If the probe's item 1 fails again, I will reconsider a scope recall.
- c12 restates the recall stem and does not quote the options, so c12 is unaffected by this edit.

## Brief fields: corrections for the builder to apply (I was asked not to edit the lesson)

These fields are in my scope, and they drifted from the v3 card:
- `learner.knows[0]`: "this card explains its own squares and rule" → "this card explains its own households and rule".
- `learner.doesNotKnow[0]`: "(a random mix already scores about 0.4 to 0.5 on small blocks)" → "(a random mix already scores about 0.4 to 0.5 in small boxes)".
- `objective` (exact replacement): `The learner can explain that an unevenness index such as D depends on the unit it is measured on (a random mix scores about 0.45 in 2 x 2 boxes and less in larger ones, and a census tract holds thousands of people), that in this toy model a simple moving rule at a fixed 30% setting sorts the grid to about 0.75, with different random mixes clumping in different places, and that the model leaves out money, prices, history and who was allowed to live where, so it does not show why any real city looks as it does.`
  - It drops "jobs", which S4 no longer lists (c13).
  - It says "boxes" instead of "blocks".
  - It names the fixed setting (D5).
  - It adds the two-mixes result that now carries part 3 (c15).
- `predict.question` / `predict.options` as in Decision 3; `recall.options[0]` as in Decision 4.

## Objections and open items that travel

- **Mine, against my own Decision 3:** the question no longer carries the 0-to-1 scale in words, so it now depends on the stage being visible. That holds at 390 × 844 (measured). On a shorter phone the stage scrolls again and the scale is below the fold. The QA viewport is the contract, so I accept this; design-lead may want a smaller viewport checked.
- **Cultural reviewer:**
  - confirm the new question (no "made-up" or "households" in it, and "equal" kept);
  - confirm S3 with a static rule line (Decision 1 note).
- **Re-probe (learner-evaluator, fresh instance):**
  - add "boundary learner restates the rule" (Decision 1);
  - record whether any persona answers the predict without seeing a scale.
- I did not read `2026-10-14-learner-review-v3.md`, which appeared untracked during my session. It is another role's work in progress and these decisions do not rest on it.
