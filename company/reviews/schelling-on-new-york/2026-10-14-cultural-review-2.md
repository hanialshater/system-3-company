# Cultural and regional review 2 (built lesson): schelling-on-new-york

- Reviewer: cultural-reviewer (Amira). Date: 2026-10-14. Second review; the first is `2026-10-14-cultural-review.md` (R1 to R10).
- Method: artifact first. I built to `.next-cr`, served on port 3191 and ran `npm run walkthrough -- schelling-on-new-york` (phone viewport, option 1). I read the transcript, `sheet.png`, `03-step-2.png` and `11-reveal.png`. I read `Demo.tsx`, `engine.ts`, `styles.module.css` and `meta.json` directly. I wrote my own seed scan (`scan.mjs` in the session scratchpad, using `engine.ts` and the region labels in `nyc-mask-40.json`) rather than trusting `check.mjs`. I wrote Part 1 below before opening `2026-10-14-build.md` or `nyc-mask-40.md`.
- Not checked: dark theme in a browser (I read the colour values only); a screen reader (I read the aria text in the transcript and the code); any human or borrowed-mind reader. Confidence in the findings below is high for what I list as seen or computed, and moderate for everything about how a learner reads a sentence.

# Part 1. Findings from the artifact (before builder notes)

## Verdict on the artifact alone

**Publishable after named fixes.** The structure I asked for is built and mostly right. The default and the first two seeds are clean, no banned word appears, there are no borough names, and the structural sentence sits in the same block as the result with discrimination before income. Two things block publish: (1) the slider range lets a learner reach a frame where Manhattan, Staten Island or the Bronx is more than 90% one group (R2), and (2) stage and reveal text break the product word budgets while the reveal sentence that carries R3 and R7 reads badly. Details follow.

## Checks you asked for

| Check | Result | Evidence |
|---|---|---|
| A recognisable region is one group in any frame | **Fail above 30%; clean at 30% and below** | My scan: for the lesson's 48 seeds (1 to 50 without 3 and 36) at every setting 0 to 50 in steps of 5, a region (Manhattan, Staten Island, Bronx, Brooklyn, Queens, from the labels in the mask JSON, at least 10 agents) more than 90% one group in the last frame: 35%: seeds 7 (Manhattan 94), 26 (Bronx 91). 40%: 23 (Manhattan 95), 31 (Manhattan 97), 33 (Bronx 92). 45% and 50% (identical): 4 (Manhattan 92), 33 (Manhattan 98), 38 (Staten Island 96), 40 (Manhattan 95). Mid-run frames add seed 21 at 45 and 50. Nothing at 0 to 30% in any frame of any seed. Seeds 1 and 2: no region over 90% at any tick at any setting. Default (seed 1, 30%, tick 0 and tick 7): clean; Staten Island and the Manhattan strip are visibly mixed in `03-step-2.png`. |
| Excluded seeds 3 and 36 | Reproduced: at 30% seed 3 ends with the Bronx 93% one group and seed 36 with the Bronx 92%. | Same scan. The exclusion is code (`SEEDS` in Demo.tsx) and is disclosed in claim c5 on the trust sheet. Acceptable as a stopgap at 30% (see the ruling on (a)). |
| Banned words (R4) | **Clean** | grep over Demo.tsx, engine.ts, styles.module.css, meta.json for unhappy, happy, mild, divid, minority, resident, flee, flight, invade, prefer, toler, wants, realistic, typical, white, black, hispanic, asian: no learner-facing hit. The only hits are in code comments and source strings: "mild-preferences-sharp-divides" (a file path in comments and in the c8 source) and "preferences" in a comment/source note that quotes my review. `warn` and `bad` appear only in a CSS comment saying they are not used. Learner text uses "would stay", "households", "squares", "neighbours", "simple moving rule", "made-up groups". |
| Structural sentence beside the result (R3), discrimination before income | **Pass on placement and order; fail on readability** | In `11-reveal.png` the result ("sorted the grid to 0.76"), the limit, the "In US cities, households did not all have the same choices" sentence and the history are one paragraph, visible without a tap, no scroll below the paragraph. Order is discrimination (including the 1938 maps), then income and wealth. The unit finding leads the reveal. See finding F1 for the wording problems. |
| HOLC wording (R7) | **Mostly pass** | Agency is not named by acronym, the maps are "a US government agency's 1938 maps grading neighbourhoods for lending risk", the verb is "associated with", no neighbourhood is named beside a grade, and "research is mixed on whether they created or recorded it" is present. Problems in F1: "it" has no clear referent and "recorded it" reads as if the maps recorded the later lending. |
| Group colours and shapes (R5) | **Pass on what I could check** | Group A is a dark teal square, group B a violet circle (`--ga` #005f54 light / #5ed6c4 dark, `--gb` #9466ee / #9b6cf0). No `--warn`, `--bad` or `--good`; no red, green, yellow, brown, grey or black/white; they differ in lightness as well as hue in the light theme (visible in the frames). Shape is the second cue; the legend swatches are drawn in the stage line. Colours are not named in text. The dark theme I judged by values only; I did not view it. The red "unsettled" ring from lesson one is not used here. |
| Slider label (R6) | **Pass** | "Move if fewer than 30% of neighbours are like them", no "mild", "tolerance" or "preference"; "A setting in this model, not a measure of anyone." above it; no presets, no realism cue. Range 0 to 50 in steps of 5; see (a). |
| Borough names, labels, outlines (R2), incl. alt and screen-reader text | **Pass, one note** | The grid is a land bitmask drawn as row runs, with no outlines or labels. The only lattice lines are the block grid, clipped to land. The `role="img"` label reads "A grid shaped like New York City. Tick 7: 518 squares in two equal groups, 100% would stay; spread on 2 by 2 blocks 0.76." It never says which group is where. No per-region readout anywhere. Note: the trust sheet (claim c11, and engine comments) says "official borough boundaries" as the name of the source dataset. That is a source title, not a label on the grid; I accept it, and ask only that the claim text read "city boundaries" if the builder is touching it anyway (not a condition). |
| Recall card (R10) | **Pass, one advisory** | `meta.json` recall: "A random mix scores about 0.5 on small blocks. What does that tell you about a segregation number?" It asks about the unit, carries no real-city figure and no group names, and stands without the stage. Advisory: option 1 (the right one) is the longest and the only one that names "unit", the stem's own keyword; lengthen the distractors toward the same precision. Option 2, "already half sorted", is a good real misreading. |
| Does the card explain itself without lesson one | **Yes, with two small gaps** | The stage line says what the squares are (two made-up groups, equal, not the city's population). The rule line says what makes a square move. The prediction defines the unit ("blocks of 2 × 2 cells (0 even, 1 fully apart)"). Gaps: "neighbours" is never defined (the eight squares around; the lesson does not say so), and "would stay N%" is never defined (share of squares the rule would leave in place). Both are inferable. Not conditions; the builder may fix them if words allow, but they come last in the budget order. |

## Findings

**F1. The R3/R7 sentence in the reveal reads badly. Required fix (wording only).** Verbatim:

> "In this model, a simple moving rule sorted the grid to 0.76. Lacking what the stage lists, it does not show why any real city looks as it does. In US cities, households did not all have the same choices: the documented history includes housing and lending discrimination, among it a US government agency's 1938 maps grading neighbourhoods for lending risk, associated with later lending (research is mixed on whether they created or recorded it), then income and wealth gaps it widened."

- "Lacking what the stage lists" is the wrong way round and reads like a code comment. A learner has to hunt for a list on the stage. The point to keep is "this model has no money, prices, history or rules about who could live where", which is the stage line's content.
- "among it" is ungrammatical ("among them"/"including"), and "it" is the subject of three different things.
- "associated with later lending" lacks a noun ("later lending patterns", as in claim c10a).
- "recorded it" can be read as the maps recording the later lending, which is nonsense and is the opposite of what the research dispute is about (maps created the pattern, or recorded practice that already existed).
- "then income and wealth gaps it widened": "it" is ambiguous (the maps, the discrimination, the lending). Read the likeliest way it says the maps widened income gaps, a stronger claim than c10a or c10b support. Either say "discrimination ... widened" and give it a source that carries that, or split it, as I said in R3 (income is entangled with discrimination, not a separate neutral cause, and the sentence must not claim more than the sources do).
- Do not fix this by deleting the "research is mixed" clause or by moving income before discrimination. Fix by wording. I do not write the line (localizer/builder owns text); the constraints are: model as subject for the result; one plain limit sentence ("This model has no money, prices, history or rules about who could live where, so it does not show why any real city looks as it does."); "In US cities" before the history; discrimination (maps named in plain words, "associated with later lending patterns", "research is mixed on whether the maps created those patterns or recorded practice already there"), then income and wealth, with the causal link stated only as strongly as the source.

**F2. Reveal length is at the cap and the stage is far over it.** Reveal: 115 words (123 with the "Not quite" line) against 120. The stage is 77 whitespace tokens in the locked state and 99 after a run in the transcript (this includes the alt text), against 25. Ruling in Part 2 (b).

**F3. A seed above 30% can show the stereotype (R2).** Reproduced; ruling in Part 2 (a). At 30% and below, none.

**F4. Not a defect, but worth saying.** The stage line "Two made-up groups, A and B, equal in number. Not New York's population." is exactly the wording I asked for and does its job; the "Left out of this model" line appears after the first finished run and is visible when the reveal opens, which is what I asked for in R3 item 7. I could not tell from the walkthrough whether the learner understands "who was allowed to live where" as being about discrimination; that needs a human reader.

# Part 2. Rulings on the builder's open questions (written after reading `2026-10-14-build.md` and `nyc-mask-40.md`)

Reading the notes changed no finding in Part 1. My scan reproduced the builder's per-setting seed list exactly (it also found seed 21 as a mid-run frame at 45 to 50). The one thing the notes added is the builder's stated reason for not removing seeds; I answer that in (a).

## (a) Slider: cap at 30%, or keep the range and disclose?

**Ruling: cap the slider at 30%. Do not keep the range, and do not disclose instead.** Range becomes 0 to 30 in steps of 5.

- The R2 harm is a screenshot of Manhattan (or Staten Island, or the Bronx) as one colour on a real-city outline. It is the picture I said the learner writes the stereotype from. It is reachable in about two taps: New York cycles seeds 1, 2, 4, so at 45 to 50% the third mix is seed 4, Manhattan 92% one group. At 35 to 40% it takes a few more mixes. Frequency is low (2 to 4 of 48 seeds), but the cost is a stereotype on a card about housing discrimination, and it is the exact outcome R2 said not to ship.
- Disclosure does not fix it. It needs words, and the stage is already over budget (see (b)). It also does not stop the screenshot; the label travels less far than the picture. R2 said to disclose the seed and not choose seeds for how an island looks; it did not say "a result you cannot undo is fine if labelled".
- I reject the builder's alternative of hiding the bad seeds per setting too. That would make "New mix" skip different seeds at different thresholds, invisibly, and would still leave transient frames (seed 21). It is seed choice by how an island looks, only done silently.
- What is lost: the 35 to 50% range shows a stronger sort. The lesson's gap is the unit and the model's limit, not how strong the rule can be. Capping removes none of the three milestones. 30% is the setting the reveal pins and quotes anyway.
- Consistency: the builder already excludes seeds 3 and 36 at 30% for the same edge artefact. That stays, and stays disclosed in c5; it is the minimum needed at the cap, not a precedent for more exclusion. It is a seed choice made against a bad outcome and disclosed, not for a good-looking one. I accept it.
- The 30% slider ends at its maximum on load. Check with the QA contract (sliders move two steps in one direction; the walkthrough moves left at max).
- Update c6 (it says the range is 0 to 50%) to the new range and the reason (the settled frame at 35% and above can leave one region over 90% one group). Remove the "any setting 0 to 50" sentence from the build note's decision 5 when it is next edited.
- If the product owner wants the 35 to 50% range back, the way is a wider grid or a mask where Manhattan is not a one-to-two-cell strip. The mask note says widening up to N = 44 does not help. So that is a new lesson design, and I would re-review it.

## (b) Stage word budget

**Ruling: not acceptable as shipped. The content of my rulings is fixed; their wording was never fixed, and the budget is not mine to waive.**

- Counting the builder's way (no button labels or numerals), the stage is 35 words before a run and 50 after, against a product standard of "Stage text <= 25 words at any moment". That is double, not a rounding error. I wrote lines of about 10, 10 and 14 words in R1, R6 and R3 item 7 and said then that "the budget needs a count"; the sum, 38, is on me and on the builder's literal reading of "verbatim". Those were examples ("the wording is the builder's within the claim limits"; "for example a one-line..."). Only the meaning is binding: (1) the groups are made-up and not the city's population; (2) the threshold is a setting, not a measure of anyone; (3) after a run, the stage says what is left out, naming money, prices, history and who could live where.
- Exact trims I accept as meeting the rulings (builder or learning-designer may choose their own, if the meaning above survives):
  1. Made-up line: "Made-up groups, [A swatch] A and [B swatch] B, equal in number. Not New York's population." (about 11, was 13). Or fewer: "Made-up, equal groups. Not New York's population." with the swatches as a legend of two letters.
  2. The "How unevenly spread (0 even, 1 fully apart):" gloss (8 words) leaves the stage. The question that defined the unit is gone in explore, so shorten, do not delete: "Spread (0 even, 1 apart):" (5).
  3. Rule line: fold the setting disclaimer into the slider label's own line so it is one visible line: "A setting, not a measure of anyone." (7, was 10). Keep the label "Move if fewer than X% of neighbours are like them" exactly.
  4. Left-out line: "Not modelled: money, prices, jobs, history, who could live where." (10, was 15; the builder counted 15, my sentence was 14).
  5. Keep "Tick", "would stay %" and the seed (the seed is the disclosure). They are the readouts, not prose.
- That brings the builder's counting to about 25 before a run and about 35 after. After a run it is still 10 over. I do not rule it acceptable. It is a decision for the owner of the standard (learning-designer, with design-lead). My ask to them, so the decision is made with my constraint in front of it: if they grant a recorded exception, grant it for the after-run left-out line only, because that line is the "show the why" element I asked for in R3 item 7 and the reveal points at it. Do not grant it for the made-up line (R1) or for the setting line (R6), and do not drop the left-out line to meet the budget. If they refuse the exception, the fallback I accept is moving the setting line into the slider's own label so the visible words are the label plus "A setting, not a measure of anyone" and nothing else on the rule.
- The reveal is also at the cap (115 words; 118 or 123 with the kit's verdict line). F1's rewrite adds words. Per R3 item 6: cut model detail first, never the structural sentence. The first reveal sentence's start values ("Your random start scored 0.47 on 2×2 blocks, 0.12 on 8×8") are already on the stage, so that is the first thing to cut or shorten. Target: 120 or fewer including the verdict line.
- Also in the reveal: say "census tract" once ("A census tract holds thousands of people"), since the word "tract" means nothing to a non-US reader. One word.

## (c) R8: dropping the real-city figure because the source is unreachable

**Ruling: accepted. I would have ruled the same with the source in hand, given the unlearned risk, and I say so for the record.**

- R8 said: acceptable only if a learner check passes, and if it fails or cannot be run, drop the number and keep the unit lesson. A number whose value, year, group pair and unit nobody has read from the page cannot carry the labelling R8 demanded (source, year, source's own category names, unit, "one pair of groups"). A figure from memory, on a card about race and housing, is the worst way to be wrong. Dropping is the safer reading of my own condition. The builder did not weaken anything: no toggle, no real group names, no Brown citation, and no claim 3.
- What stands: the card no longer names any real group or figure, so R1's "real names only in the toggle" is moot, and my Q8 misreading ("model matches the city") cannot happen through a number. The unit lesson is intact: the block buttons show the same grid scoring 1.00, 0.44, 0.24 and 0.14, which is more memorable than a sentence.
- What it leaves, to be handled and not waved through:
  1. The tract/block contrast (c15) is now the only link to real data and its tract size is from memory ("builder: from memory, not opened"). The fact-checker must read the Census glossary. If "thousands of people" is not confirmed, the sentence goes and the block buttons carry the point alone.
  2. The R8 learner probe has nothing to test, so replace it with the probe that matters now: after the reveal, ask readers "Does this show why New York looks as it does?" A "yes" or "mostly" from more than a small minority means the F1 sentence is not working and must be rewritten before publish. This is condition 3 below.
  3. If a later version restores the real figure, R8 (a) to (e) apply in full and I re-review. Record that on the brief (category manager), so the next builder does not restore it from the older brief text.
- Objection I considered and rejected: "a lesson called Schelling on New York with no New York number is hollow." The learning gap is the unit; the city's shape carries the "real place" idea, as I said in R2. The number's absence costs the lesson its hook-by-surprise, not its objective.

## Required fixes, in the order to do them

Before publish (each is cultural; no fix needs a change to the objective):

1. **Cap the slider at 30%** (range 0 to 30, step 5), update c6 and any text that says 0 to 50. Re-run the seed scan for seeds 1 to 50 minus 3 and 36 to confirm no region over 90% at any setting and any tick in the new range. (Owner: demo-builder.)
2. **Rewrite the reveal's limit-and-history sentence (F1)** so "it" has referents, "among it" is fixed, "later lending patterns" has its noun, the maps/recorded ambiguity is gone, and the income-and-wealth link claims no more than c10a to c10c's sources. Keep: in-paragraph with the result, "In US cities", discrimination before income, "associated with", "research is mixed". Add the word "census" before "tract". Keep the reveal at or under 120 words including the verdict line. (Owner: demo-builder; the claims move with the text. The fact-checker re-reads c10c and c10b; I do not write the line.)
3. **Stage word budget (b):** trim wording to the meanings above, then have the learning-designer record a decision on the remaining after-run overrun, with my constraint that only the left-out line may be exempt. (Owner: demo-builder for the trim; learning-designer for the decision.)
4. **Fact-checker reads every claim from its source page** (all 14 claims are `unverified`; the build note lists the requests). Cultural claims c9 to c11 and c15 cannot publish on memory. If c10c's Furman Center report does not carry "income differences between groups", the card's income clause needs another source or it goes. (Owner: fact-checker.)
5. **A human or borrowed-mind probe**, after the reveal: "Does this show why New York looks as it does?" and "What was left out of the model?" (Owner: learning-designer, via the board. A "yes" or "mostly" from more than a small minority means F1 failed.)

Advisory, no condition: lengthen the recall's wrong options to the precision of the right one; define "neighbours" and "would stay" in a few words if the budget allows; claim c11 "official borough boundaries" could read "city boundaries"; add a neutral colour token pair (visual-designer, already open item 5 in the build note); the audience/age flag for head-of-product stays open.

Non-US and locale variants: unchanged from the first review. The card says "In US cities" and names no category; it is safe to feed globally in English. A translation or any locale variant needs its own review (launch-review per locale) and I did not review one.

## Objections and what happened to them

- Builder objection (note, R2 item): "I did not remove those seeds, because that would be choosing seeds for how an island looks." Answer: right instinct against the wrong remedy. The cap removes the reachable frames without picking seeds; the existing exclusion of 3 and 36 stays and stays disclosed. Not "noted": ruling (a).
- Builder objection (open item 1): the rulings and the budget conflict and "the rulings are binding". Answer: the rulings are binding in meaning, not in word count; the trims are in (b). The residual overrun goes to the standard's owner.
- Builder objection (decision 7): "the structural history is told, not shown; evaluators rule." My ruling: acceptable as told, because the model cannot show it and the left-out line on the stage stands for it (as I asked in R3 item 7), provided the F1 rewrite and the probe in fix 5. I do not rule on the demo-standard's "show the why" for the evaluators.

## Overall verdict

**Publishable after named fixes (1 to 5 above).** Not "block": the default, the first two seeds and every setting at or below 30% are clean, no banned word survives, the structural sentence is in the same block as the result in the right order, and the R8 drop is the right call. Fixes 1 and 2 are mine to hold the publish on; fix 3 depends on a decision I do not own; fixes 4 and 5 belong to other roles and are conditions I am recording, not checks I can do.

# Pass 3 (v2). Re-rule on the rebuilt lesson

- Reviewer: cultural-reviewer (Amira). Date: 2026-10-14. Session 2.
- Method: artifact first. I built to `.next-cr`, served on port 3191 (after killing my own stale server from pass 1, which had been serving the old build) and ran `npm run walkthrough -- schelling-on-new-york` (phone, option 1). I read the transcript, `03-step-2.png` and `11-reveal.png`, then `Demo.tsx` (MAX, SEEDS), a banned-word grep over Demo.tsx, engine.ts, styles.module.css and meta.json, and the builder's `check.mjs` output. I wrote these findings before opening the v2 section of `2026-10-14-build.md`. My own word counts of the rendered text matched the builder's (reveal 120 with the longest verdict line; stage 24 before a run and 34 after, without the slider label).
- Not checked: dark theme in a browser; a screen reader; any human reader; I did not rewrite my pass-1 seed scan and relied on `check.mjs`, whose 35 to 50% rows reproduce my pass-1 numbers exactly (2, 3, 4, 4 region-seeds), so I trust its 0 to 30% sweep.

## Verdict: PUBLISHABLE after the remaining named conditions. Fixes 1 and 2 are met. Fix 3's trim is met; its decision is still open.

## (1) Fixes 1 to 3

| Fix | Result | Evidence |
|---|---|---|
| 1. Slider capped at 30% | **Met** | `MAX = 30`, `min 0`, `step 5` in Demo.tsx. Walkthrough: the slider loads at 30 and the label moved to 20 on one left move. `check.mjs`: all 1,865 frames of 48 seeds at 0 to 30%, no region (at least 10 agents) over 90% one group, worst 0.86; settled sweep rows 35% and above still show the problem (2, 3, 4, 4), so the cap is doing the work. c6 now states the range and the reason. Seeds 3 and 36 stay excluded and disclosed in c5, as ruled. |
| 2. Reveal sentence rewritten | **Met** | Rendered: "In this model, a moving rule sorted the grid to 0.76. Without money or history, the model does not show why any real city looks as it does. In US cities, households did not all have the same choices: the documented history includes housing and lending discrimination, widening wealth gaps, and late-1930s government maps grading neighbourhoods for lending risk. The grades are associated with later home values and ownership; research is mixed on whether the maps caused this or recorded earlier practice." The referents are clear ("the maps", "The grades", "this"). "among it", "it widened", "recorded it" and "Lacking what the stage lists" are gone. The limit is one plain sentence. The history sits in the same paragraph as the result, after "In US cities", discrimination first. "census tract" is present. 120 words with the longest verdict line, at the cap and not over. |
| 3. Stage trimmed | **Trim met; decision open** | Rendered stage: "Made-up equal groups, A and B. Not New York's population." / "Spread (0 even, 1 apart):" / "A setting, not a measure of anyone." / slider label unchanged / after a run "Not modelled: money, prices, jobs, history, who could live where." All three required meanings survive. Count: 24 before a run and 34 after (without the slider label; 33 and 43 with it) against the product standard of 25. No decision from the learning-designer is on disk (`company/decisions` has none for this). Still open, owner learning-designer with design-lead; my constraint stands: an exception may cover only the "Not modelled" line. |

## (2) New history wording against R3 and R7

- **c10a "late-1930s government maps grading neighbourhoods for lending risk" (Mapping Inequality). Pass.** No acronym, no neighbourhood named beside a grade, "US" given by the sentence's opening. "Late-1930s" is the safer word given that survey dates differ by city.
- **c10d "associated with later home values and ownership" (Aaronson et al. 2021). Accept the builder's wording over my "lending patterns".** I withdraw my suggested noun. R7 required "associated with", no neighbourhood named, and no claim the card cannot source. Home values and ownership are what the paper measures; "lending patterns" would have put a mechanism the source infers, not measures, in a learner's head. "Associated with" understates an authors' causal claim; that is the safe direction and is disclosed in the claim's source. "Lending" still appears once, in what the maps graded ("for lending risk"), which is the maps' own purpose, not an outcome claim.
- **c10e "research is mixed on whether the maps caused this or recorded earlier practice" (Fishback et al. 2024). Pass on R7**, which asked for the dispute to be visible and not buried. One precision point for the fact-checker, not a cultural fix: "this" on the card means home values and ownership, while Fishback et al. mainly address lending and earlier federal exclusion. The fact-checker should confirm the paper speaks to the maps' role in later neighbourhood outcomes, or the claim text should say what it measures. If it does not, fix the wording (for example "whether the maps created or recorded earlier practice"), without removing the clause. The clause stays either way.
- Advisory: the sentence lists the maps as a third item beside discrimination and wealth gaps, but the maps are a case of the discrimination. Fine as it reads; do not spend words on it.

## (3) Wealth without income against R3

**Ruling: acceptable. R3 is amended: the order is "discrimination, then the money gap that followed", and wealth alone meets it.** R3 asked for "discrimination, then income" so that a learner does not read income as a neutral, separate cause of where people live. What mattered was (a) discrimination first and (b) money framed as downstream of it, not a rival explanation. The card has both: "housing and lending discrimination, widening wealth gaps". Home equity is the channel Rothstein's book argues, so wealth is the better-sourced word and c10b is a one-source claim. Dropping income also removes the weakest link (the Furman Center tables did not carry it).
- Condition: the fact-checker must still find the Rothstein page for the wealth and home-equity argument (c10b is unverified). If it cannot be found, replace the source (for example a Federal Reserve wealth-gap source tied to housing), not the order.
- If income is ever restored, it needs a source that ties discrimination to income, and it comes after discrimination. Do not restore it as a bare "income gaps" clause.
- Residual risk, unchanged and for the learner probe: "Without money or history, the model does not show why..." plus a wealth clause could read as "money explains it". The sentence puts discrimination first and calls the wealth gap "widening", so I judge the risk low, but only a reader can show it.

## (4) New banned words and one-group regions

- Banned-word grep (R4) over learner-facing text: clean. The only hits are "prefers-reduced-motion" and "prefers-color-scheme" in code, a file path comment ("mild-preferences-sharp-divides") and "segregation" in the reveal, the recall question and tags. "Segregation" is not on the banned list and is the concept name; it is used for the index ("A segregation number needs its unit"), never of a group or place. New words in this version: "grades", "households", "ownership", "wealth", "discrimination", "government". None is banned or loaded.
- Region frames: none reachable at 0 to 30% (above). No borough name, label or outline anywhere; alt text reads "A grid shaped like New York City. Tick 7: 518 squares in two equal groups, 100% would stay; spread on 2 by 2 blocks 0.76." No group is named anywhere on the card. In `03-step-2.png` the Staten Island and Manhattan areas are mixed.

## Required before publish (carried forward and new)

1. **Stage after-run overrun: a recorded decision** from the learning-designer with design-lead, exception limited to the "Not modelled" line (carried from fix 3). Owner: learning-designer.
2. **Fact-checker re-reads c10a, c10b, c10d, c10e** from the pages: the Rothstein page for wealth and home equity, and that Fishback et al. speaks to the maps' effect on later neighbourhood outcomes and not only lending (see (2)). Cultural claims c10a to c10e cannot publish on memory. Owner: fact-checker. If c10e's referent fails, the builder fixes the wording and I do not need to re-review for a one-word change.
3. **Learner probe** after the reveal ("Does this show why New York looks as it does?" and "What was left out of the model?"). Also ask whether "wealth gaps" reads as an alternative to discrimination. Owner: learning-designer (carried from fix 5).

No further wording, seed or slider change is required from the builder. Advisory, unchanged: "neighbours" and "would stay" are undefined; neutral colour tokens.

## Objections and what happened to them

- Builder, v2 open item: "R3 asked for income; the clause went because no reachable source carries it." Answer: accepted, with R3 amended in (3) and the conditions above. Not noted.
- Builder, v2 decision: "Lending wording: I did not use 'later lending patterns'." Answer: right, and my suggestion was wrong; I withdraw it in (2).

# Pass 4 (v3 spec, pre-build). Rulings on `company/design/specs/schelling-on-new-york-v3.md`

- Reviewer: cultural-reviewer (Amira). Date: 2026-10-14. Session 2.
- Method: I read the v3 spec (all of it), the failed learner review, my R1 to R10 and passes 1 to 3. There is no v3 build, mockup or walkthrough, so every ruling below is on spec text and on my own earlier artifact reads. I did not re-run `engine.ts`, so I take the spec's numbers (35%, 70%, 0.49 and so on) as the spec author's, to be checked by the fact-checker. I did not open the HOLC area-description data. A ruling here is wording and picture-reading risk, not verification.
- Not checked: any mockup, dark theme, screen reader, any human or borrowed-mind reader. Confidence is moderate to high on the wording rulings (they follow R1 to R10) and moderate on the picture-reading rulings (risk 3, the pair), because only a reader can show how a picture reads.

## Verdict: GO to build, with the changes below. Nothing here is a block.

The v3 diagnosis is right (the failure is the picture, not the words) and "two mixes, two maps" is the first fix I have seen that answers the probe with the picture instead of a longer disclaimer. Seven rulings, then the new-string check, then the carried conditions.

## Rulings

### 1. Risk 3: one-colour outlines on a sorted city. GO, with six conditions.

What is reasonable in the spec: the outline is on a k x k box of the grid, in a neutral stroke, and it is a per-box test, not a per-region one. It is not a borough outline, a per-borough readout or a per-region colour (R2), and the box lattice is not geography. At the random start it is exactly the evidence the lesson needs ("40% of the small boxes are one group by luck").

The risk is real at the other end. Settled at 30%, 70% to 75% of 2 x 2 boxes carry an outline. Drawn carelessly, the outlines merge into a "zone" picture of the city: territories, which is the R2 picture the probe failed on. So the outline must stay a box test and never become a region. Conditions:

1. **Per box only, never merged.** Each outlined box is its own separate square. No joining of neighbours into a contour, no outer boundary around a run of outlined boxes, no fill, tint, shading or opacity change inside a box. Outline only.
2. **Weight.** No heavier than the lattice lines plus a small step (1 px to 1.5 px at the 246 px floor, 2 px at most), and never visually heavier than anything that suggests land edges. Neutral `--fg` at reduced strength; never `--ga`, `--gb`, `--warn`, `--bad`, `--good` (R5, the spec already says this).
3. **Clipped to land**, like the lattice (pass 1 note): no box edge drawn across water, so the outlines do not reproduce a coastline-plus-zone picture.
4. **Not on the reveal pair.** The spec already says no overlay or outlines at 110 px. Keep that as a rule, not a default: outlines never appear in the reveal frames.
5. **No label, legend or caption that names what an outlined box "is".** The readout "one-group boxes 75%" counts boxes. Nothing says "areas", "zones", "neighbourhoods" or "territories".
6. **Probe it.** Add to the section 13 probe (see ruling 7): no persona describes the outlines as areas, neighbourhoods, zones or "the sorted parts of the city". If one does, the fix is to drop the outlines once round > 0 (keep the readout), not to add text.

Fallback if the mockup shows the outlines merging visually on a settled map: outline only at round 0 and at the moment the learner changes box size, and show the readout alone after a run. That still carries "chance leaves boxes one colour" (the start is where the evidence is) and removes the settled-map risk. I will accept it without re-review.

### 2. Risk 4: wording changes. GO on all four, one small change, one advisory.

| String | Ruling | Why, against the rulings |
|---|---|---|
| "each A or B is one household" | **GO** | R4 names "households" as the word for an agent; it answers the learner review's "what is a square?". It states what a mark is in the model, so it claims nothing about the city. |
| "Made-up model: ... Not New York's people." replacing "Made-up equal groups, A and B. Not New York's population." | **GO** | R1's binding meaning is "made-up, not the city's population". "Not New York's people" says the same in plainer words, and "people" reads better for a low-reading-stamina phone user (P5) than "population". "Equal" has moved to the question; I accept that because the stage prose budget is the constraint and R1 fixed the meaning, not the words (pass 2 (b)). Advisory: the stage has no word "groups" now. If the visual designer can fit "A or B" with a swatch, fine; do not add it back at the cost of "Not New York's people". |
| "who was allowed to live where" (S4, was "could") | **GO. I withdraw my own pass-2 trim.** | In pass 2 (b) item 4 I wrote "who could live where" as a trim. The learner review found "could" reads as affordability, which is the wrong reading for R3 (income as an innocent substitute for discrimination). "Was allowed" is my R3 item 7 original wording. The past tense matches the reveal's "documented history". Accuracy: the engine lets any household move anywhere and the line says this is not modelled, so it is true as a statement about what is left out. |
| "this model does not show why real cities look as they do" (was "any real city looks as it does") | **GO** | Same meaning as c9, "model" is still the subject (R3 item 2), and the plural moves the sentence a step away from New York as the target, which helps the probe. "In US cities" still follows in the same paragraph (R3 item 5). |

Other strings I checked against R1 to R10 and passes 1 to 3:

- Hook "Measure a random mix on New York's outline. What can the number tell you, and what not?" Pass. "Outline" is the right word (R2 asks for shape only, no labels). The hook accuses nobody and points to no answer (R9).
- Question "Two made-up groups of households, equal in number ...". Pass. "Segregation index" in a predict question is acceptable: R4 restricts the stage and the claim gloss "share that would have to move", and pass 3 already accepted "segregation" in the reveal and recall.
- Readout "Round", "would move N%", "mix N". Pass. "Would move" is the R4 word. "Mix N" is the seed disclosure R2 asked for.
- S2 "Spread in boxes (0 even, 1 apart):" and S3 "A setting, not a measure of anyone." Pass (R6; S3 is verbatim from pass 2).
- Reveal paragraph 2 (structural sentence and grades sentence verbatim from v2). Pass; see ruling 6 for the one change.
- Banned words (R4): none in the new strings. "Sorted" has the rule as subject; "clumps" has the grid or mixes as subject; "households" throughout; no "residents" except inside claim c10f's claim text, which is a source description, not card text.
- **Small change: "one-colour" becomes "one-group"** in the readout label ("one-group boxes 40%"), in the reveal ("chance alone left 35% one group") and in the recall proposal. Reason: R5 makes shape the second cue so that colour is never the only identity of a group; "one colour" makes colour the only identity in the one place the learner is told what to measure, and it fails for the colour-blind reader and in any theme where the hues come close. "Group" is the R4 word. Token count is unchanged (2 tokens either way). If the accessibility reviewer prefers "one-colour", they may overrule me; I do not block on it.
- **Advisory: alt text.** The `aria-label` on the map and on the pair should say "made-up households" ("Two settled grids of made-up households, shaped like New York City ..."). The alt text is the one place a screen-reader user meets S1's meaning. The label must still never say which group is where (R2); the spec's text already respects that.

### 3. Dropping "jobs" from the "Not modelled" line. GO.

My pass-2 (b) binding meaning was "money, prices, history and who could live where", with "jobs" only in my example line. Dropping it is within the rulings. One watch item, not a condition: with "jobs" gone, two of four items are money words (money, prices). That strengthens the "money, I guess" reading the learner review recorded for P3. The item that carries the cultural point, "who was allowed to live where", is last in the line, which is the right place. The probe in ruling 7 therefore counts whether readers name that item.

### 4. "Two mixes, two maps" reveal. GO, with changes.

Why I accept it: it puts the "this is not New York" evidence in the picture a skimmer actually keeps. The result that the learner sees is "clumps in different places", and that contradicts "this explains why the city looks as it does" without a sentence. The numbers (0.49, 0.41 to 0.59) belong to the fact-checker (c16).

Changes:

1. **Identical frames.** The spec frames P in `--domain` and leaves Q unframed. Both maps are equal evidence, and singling one out reads as "the real one" or "the right one". Use the same neutral frame on both, and check that no frame colour is, or is close to, a group colour (R5). (`--domain` is lesson one's group A fill; this lesson's A is `--ga` teal. Do not let the frame sit near either.)
2. **Do not pick P and Q by how they look.** The spec pins them by what the learner did, not by appearance, which is right. Keep it that way. Both come from the lesson's SEEDS list, which I scanned in pass 3 (no region over 90% one group at 0 to 30%), so no pair can show a whole borough as one group. The builder confirms in `check.mjs` that the 30% sweep covers every mix a pair can contain, including mix N when "New mix" cycles past the current list.
3. **Keep S1 and S4 in the same container as the pair** so that a crop of the pair carries "Made-up model ... Not New York's people" and "Not modelled ..." (the spec's reveal layout does; keep it through any design-lead rearrangement).
4. **Watch for the "random is the explanation" misreading.** "Clumps in different places" can be taken as "where segregation falls is chance", which would be a wrong and unkind reading of a history of deliberate exclusion (P4's likely reaction). The sentence that follows ("In US cities, households did not all have the same choices ...") is what answers it. Keep the two sentences in one paragraph and in this order. This is a probe item (ruling 7), not a text change.
5. The pair above the text (spec risk 1) and the 110 px frame size (risk 2) are design-lead and accessibility calls; I have no cultural objection to either. At 3 px per cell, hue and lightness must carry the groups; if the accessibility reviewer cannot pass that, a larger cell is the fix, not a framing text.

### 5. Moving the framing lines into the map's water area. GO, with four conditions.

Right idea: it is R2's screenshot risk handled by position, which is stronger than my pass-1 position (the label travels less far than the picture). The top-left corner is wall cells in the mask, so nothing the lesson draws is covered. Conditions:

1. **Caption, not annotation.** Plain text in the corner. No arrows, leader lines, brackets or highlight shapes that point from the text to any part of the grid, and S4 must never be placed near the sorted clumps as if it labelled them. "Not modelled:" stays as the opening words.
2. **The corner is genuinely empty.** The text never overlaps a land cell or a lattice line at any scale including the 246 px floor. If it does not fit, use the spec's fallback (S4 full width directly under the map, above the readout row). S1 may stay in the corner alone.
3. **S4 appears from the first round that moves anyone, not only "after the first finished run".** The spec's trigger (a finished run) leaves a hole: Step to round 5 and a sorted-looking city can be screenshotted without S4. R3 item 7 asked for the line beside the grid after the learner has run it; "has run it" includes Step. Show S4 once round > 0 on any mix, and keep it after Reset and New mix (records only grow). No layout shift: reserve the line's space from the start, or place it where it cannot move other things. This adds no words at round 0, so the predict and first-explore counts are unchanged; the after-run overrun applies from round 1 instead of from a finished run, so the learning-designer's pending decision must be worded for "once the grid has moved". This overrun exception stays limited to S4 (pass 2 (b)).
4. **Accessibility of the overlay.** If the map has `role="img"`, its children are hidden from assistive tech. Put S1 and S4 outside the `role="img"` element (positioned over it), so they are read. This is the accessibility reviewer's to confirm; I note it because these two lines carry R1 and R3.

### 6. New claim c10f and its place beside R7. GO on the claim, with a card change and four source rules.

How it sits with R7 and the "research is mixed" clause: there is no conflict, and it makes the clause clearer. c10f is about what the maps recorded (race counted in the grades). c10d ("associated with later home values and ownership") and c10e ("research is mixed on whether the maps caused this or recorded earlier practice") are about the maps' effect. Whichever side of the dispute is right, race was counted. Nothing in c10f calls the maps "a cause" (R7), names a neighbourhood beside a grade (R7), or strengthens "associated with". Keep "associated with" and "research is mixed" exactly as they are; c10f must not be used to justify strengthening either.

Problems and rulings:

1. **The card does not say what c10f says.** The card names "housing and lending discrimination" and "maps grading neighbourhoods for lending risk", but nowhere says what the discrimination was based on. A card that has deliberately kept all race words off the stage (R1) can still say the word once in the history, and this is the one place it should. Without it, a reader (P2, P5, a non-US reader) can take "discrimination" as discrimination by income, which is the substitute R3 was written to prevent, and c10f's claim text is stronger than anything the learner sees. **Change: add "by race" (2 tokens) after "housing and lending discrimination"**, so the phrase reads "housing and lending discrimination by race". The spec rejected a longer version (about 4 words) for the 120-word cap; this one is two tokens. The cap stays: per R3 item 6, find the two tokens in model detail first (for example in paragraph 1) and never in the structural sentence or the grades sentence. The builder reports the cut. c10b's claim text moves with the phrase (it is Rothstein's subject). I re-read the new phrase here; no further cultural review is needed for exactly these two tokens. If the cap truly cannot absorb them, tell me and I will rule between "by race" and the "widening wealth gaps" clause; the answer will not be to drop "by race" silently. Why not "partly by residents' race" in the grades clause: it is longer and it only covers the maps; the broader phrase covers the maps (an instance of the discrimination, as I noted in pass 3).
2. **Claim wording must not outrun the forms.** "Counted residents' race against a neighbourhood" is acceptable only if the fact-checker's count shows race named among the reasons in a substantial number of forms. Say "in many area descriptions" or give the count; do not state it as true of every form or every grade. Also write it as what the forms recorded, not as an inference about what the lenders did.
3. **Trust sheet: describe the period terms, do not quote them** (the spec's own recommendation; I agree). The sheet is learner-visible and the forms use racial terms that are offensive now. Write "the forms' own racial terms" and cite field names and counts (`detrimental_influences`, `infiltration_of`, `clarifying_remarks`, N forms). If the fact-checker must quote to verify, quote only in the non-learner-facing fact-check file.
4. **No neighbourhood names, no NYC form examples by name**, in the claim, the source note or the trust sheet (R7). The note may say the data include New York City forms without naming any area.

### 7. Section 13 as the probe for publishing. GO, with additions. Necessary, not sufficient.

It is the right test. It repeats the probe that failed, with the same six personas and the same boundary, and it adds the two checks I had no way to ask for before (the image kept by P2 and P5; the reveal quoting only what was seen). Its limit: a simulated-learner probe finds problems and does not show anyone learned (the learner review says so itself). I accept a borrowed-mind pass as the pre-publish check I recorded in passes 1 to 3, because no human reader is available. Additions:

1. **A hedge counts as yes.** "Partly", "somewhat", "in a way", "it shows how neighbourhoods could split" all count as yes for criterion 1. (The boundary learner's v2 answer was "partly"; the criterion says "no" and must be read that strictly.)
2. **Cultural items added to the blocking list:**
   - (i) no persona calls the outlines areas, zones or neighbourhoods (ruling 1);
   - (ii) P4 and the boundary learner do not read "clumps in different places" as "segregation happens by chance" (ruling 4);
   - (iii) at least 3 of 6 personas, including P1 and P4, name "who was allowed to live where" (or discrimination in housing or lending) as left out, so that a reader who names only money does not count toward criterion 2's "at least two";
   - (iv) P1 and P4 can say what the discrimination was based on (race) once "by race" is on the card; record the others' answers.
3. **Independence.** Give the evaluator the personas, the questions and the walkthrough, and not the pass criteria, the persona expected answers in 13 ("P2 and P5 must answer no") or the spec's reasoning. Per CLAUDE.md the evaluator sees the artifact before the account; the spec text priming P2 and P5 to answer "no" would defeat the point. Use a fresh evaluator instance, one that did not write the v2 probe.
4. **P2 and P5 "from the image alone":** the evaluator reports for each of them the last frame they relied on and the exact words they relied on, in the transcript. A pass that cites S1 or S4 text is still a pass; a pass that cannot cite any frame is "not shown".
5. **Stop rule.** If criterion 1 fails a second time, do not add text. The spec's own next lever (the outline itself, a change to the brief) is the right one, owned by the category manager. I support it and will rule on any neutral-grid version.
6. **Order of runs.** Run it on a build that has passed `npm run check` and the QA path, with the fact-checker's c10b (Rothstein page) still open as a separate publish blocker. The probe does not clear c10b.

## Carried conditions for publish (unchanged unless named above)

1. Stage after-run overrun: a recorded decision from the learning-designer with the design-lead, limited to S4, and now worded for "once the grid has moved" (ruling 5, item 3). Open.
2. Fact-checker reads c10a, c10b, c10d, c10e, c10f, c15, c16, c17 from the sources. c10b needs the Rothstein page; if none is found, replace the source, not the order (pass 3). Cultural claims do not publish on memory.
3. The probe in ruling 7 passes.
4. Seeds 3 and 36 remain excluded and disclosed (c5). The slider stays capped at 30.
5. Non-US and locale variants: unchanged. The card says "In US cities" and "by race" sits inside that sentence. Any locale variant needs its own review; I did not review one.

## Open questions I do not own (routed, not ruled)

- Pair above the text vs "below the text" (spec risk 1): design-lead.
- Reveal cap 90 vs 120 (spec risk 6): head-of-product and design-lead. My "by race" addition assumes 120.
- Title "Schelling on New York" priming the reading (spec risk 9): category manager. I have no cultural objection to the title, but I support asking.
- Hue and lightness at 3 px per cell: accessibility reviewer.
- Spec risk 8 ("New mix" changes behaviour by state): builder and learner probe. No cultural issue.

## Objections and what happened to them

- Spec author (section 12): "making race explicit on the card costs about 4 words the reveal does not have; it is a cultural ruling and a content change, not an interaction one." Answer: you were right to raise it and not do it yourself. I rule it in, in the shortest form (2 tokens, "by race"), because c10f's claim says race and the learner never sees the word; section 6, item 1. Not "noted".
- Spec author (risk 3): "the outlines may read as highlighted territories." Answer: ruling 1 gives six conditions and a fallback, and the probe tests it.
- Spec author (S4 trigger): "appears after the first finished run (R3 item 7)." Answer: R3 item 7 meant after the learner has run it; Step is running it. Changed to "once the grid has moved", ruling 5, item 3.
- Learner review, last item ("could" reads as affordability): upheld; I withdraw my pass-2 trim, ruling 2.
- Learner review, top issue 1 (the strongest image is the explanation it disowns): this spec's answer is the pair; ruling 4 accepts it with changes, and ruling 7 holds publish on a re-run, not on my reading of the spec.

## Summary for the builder

GO to build. Make these changes to the v3 spec's text and picture as you implement:

1. Outlines: per box, never merged, thin neutral stroke, clipped to land, not on the reveal pair, no area-words; fallback in ruling 1.
2. "one-colour" becomes "one-group" in the readout, the reveal and the recall (accessibility may overrule).
3. Reveal pair: identical neutral frames, with no `--domain` framing on P.
4. S1 and S4 stay as specced. S4 appears once the grid has moved (round > 0), not only after a finished run; both sit outside any `role="img"` element; no leader lines.
5. Reveal paragraph 2: add "by race" after "housing and lending discrimination" and find the two tokens in model detail. Keep "associated with" and "research is mixed" exactly. c10b moves with the phrase.
6. c10f: claim says "in many area descriptions" or a count; the trust sheet describes the racial terms and does not quote them; no neighbourhood names.
7. Alt text for the map and the pair: add "made-up households".
8. Section 13 probe: add the cultural items and the independence rule in ruling 7 before it is run.
