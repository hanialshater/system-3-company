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
