# Cultural and regional review (pre-build): schelling-on-new-york

- Reviewer: cultural-reviewer (Amira). Date: 2026-10-14 (file name carries the date the task was set).
- Artifact reviewed: the brief only (`company/domains/briefs/geography.people-places.md`, item 1, as updated 2026-10-14), the first lesson (`src/demos/economics/mild-preferences-sharp-divides/Demo.tsx`, `styles.module.css`, `meta.json`) and `company/product/demo-standard.md`. There is no built lesson and no walkthrough yet. This is a brief review; a second review of the built walkthrough is still required before publish.
- Scope note: the locale here is "global, read by US and non-US learners". I did not localize or write any of this; the wording below is the minimum needed to make a ruling exact. The category manager owns the brief and the builder owns the text.
- Confidence: I could fetch no source (egress blocked). Everything I say about HOLC research, Census categories and Brown's series is from memory and is marked "check" for the fact-checker. The rulings do not depend on those facts being exactly right, except where I say so.

## Verdict

**Build may proceed, with conditions.** The topic is teachable and the brief's own hard limits are mostly right. But three of the brief's defaults must change before the builder starts: (1) the stage uses two made-up equal groups, not White and Black non-Hispanic shares (Q1); (2) the words "unhappy", "mild preference" and "divided" leave the learner-facing text (Q4, Q6); (3) the real-city D is not shown next to the model's D as drafted (Q8). The category manager records these rulings in the brief (this review does not edit it) and the builder reads this file first. If the category manager rejects any ruling marked "not acceptable", the verdict flips to "brief must change first" for that item. Nothing here is "do not build".

A second cultural review of the built walkthrough (artifact first, builder notes after) is a condition of publish, not optional. A borrowed-mind or human check on the specific misreading in Q8 is also a condition (see "Conditions").

## Rulings on the 9 questions

### 1. Two real groups (White non-Hispanic, Black non-Hispanic) in a model, leaving out Hispanic and Asian residents?

**Ruling: not acceptable as drafted. Acceptable with these exact changes: neutral "Group A / Group B", equal numbers, no source claim for the shares.**

Why:
- Using the Census pair at 61/39 on a New York grid tells the learner "New York is a White and Black city". About half the city is Hispanic or Asian. A Hispanic or Asian learner, and anyone who knows the city, sees their group deleted from the picture of their own city. That is the error a translator cannot catch.
- "Normalised to two groups" invents a population that exists nowhere. It also turns a toy into a (false) demographic map, which is exactly the reading the brief wants to prevent.
- The 61/39 setup does not settle (29 of 50 seeds not settled by 60 ticks, per the brief). Equal groups settle in 6 to 11 ticks. The cultural reason and the technical reason point the same way.
- Equal groups removes claim 2 entirely. Fewer claims about race means fewer ways to be wrong.

Exact changes:
- Stage, prediction, reveal: "Group A" and "Group B" (or "two groups"), equal in number. Never "White", "Black", "Hispanic", "Asian" on the stage or in the prediction.
- Stage line states plainly: "Two made-up groups, equal in number. Not New York's population." (about 10 words; check it fits the 25-word stage budget).
- Real group names appear only in the final toggle, with the pair, year, source and unit. If they appear, use the source's own category wording (Brown's report names the pair; the Census uses "White alone, not Hispanic or Latino" and "Black or African American alone, not Hispanic or Latino"). Capitalise consistently (Black, White) and never use "Caucasian".
- One clause in the toggle must say that the figure covers one pair of groups and that the city has more groups than this pair.
- Drop claim 2 (shares). Claim 1 (population count) is not needed by the model; if the card says nothing about the total, drop it too. Do not keep it as decoration.

### 2. Is a New York mask right, or does it invite stereotype of boroughs? Hide borough names?

**Ruling: acceptable with these exact changes.**

Why it is acceptable: New York is the most recognisable US city worldwide, so the shape carries the "this is about a real place" idea without any text, and a grid of equal agents does not itself say anything about a borough. Why it needs conditions: a recognisable island that turns into one colour is the picture people will remember and screenshot. "Manhattan is one group" is a stereotype the learner writes themselves.

Exact changes:
- Shape only. No borough names, no borough labels, no borough outlines drawn heavier than the coastline, no per-borough readout, no per-borough D, no per-borough colour. The title may say "New York"; the stage does not label parts of it.
- The made-up-ness is stated on the stage (see Q1). Density is equal everywhere in the model (one agent per land cell, 10% empty) while real density varies by a large factor; this is a second reason the stage must say it is not a map of people.
- Build-time check on the real mask (add to the brief's re-check): run seeds 1 to 50 and record, for each borough-sized region, how often a region ends more than 90% one group. If a recognisable region (Manhattan, Staten Island) ends near-uniform in many seeds, that is an edge effect of narrow strips (the hand-drawn Manhattan is one cell wide; fewer neighbours behave differently), not a result. Either widen the grid so the strip is not one cell, or tell me and I will re-rule. Do not ship a default seed whose frame shows a whole borough as one group.
- Seed shown and disclosed (pattern `disclose-chosen-seeds`). Do not choose a seed for how a particular island looks.
- Screen-reader text describes "a grid shaped like New York City" and the counts; it never says which group is where.

Non-US note: the shape is fine globally. The categories are the problem, not the place (see Q9).

### 3. Is "preferences alone can produce the pattern, which does not show they did" protective enough? Are structural causes named strongly enough, in the right order?

**Ruling: not acceptable as drafted (order and strength). Acceptable with these exact changes.**

Why:
- The draft order is: result (0.8), "preferences alone can produce", then a final clause "Documented causes include...". The model's result gets the emphasis, the structural history is the last, softest clause. In 60 seconds the learner keeps the last-but-one idea, "people's preferences make the divide". The sentence "does not show that they did" is true but it is a negation; learners remember what the card showed, not what it declined to show.
- "Preferences" is the wrong noun for the toy. The agents have a movement rule, not a view of anyone. "Mild preferences push this model" attributes a mind to residents. Say "the model's rule".
- The model is symmetric and free: both groups follow the same rule and can move anywhere. In New York's history households did not have equal choices (lending, covenants, steering, price). A symmetric free-choice model with no mention of this reads as "everyone chose". This is the most important cultural point in the review.
- Honesty runs both ways: the card must not swing to "preferences played no part". Research treats preferences, discrimination and income as interacting (check, fact-checker). Say "does not show" (what the model cannot establish) rather than "did not".

Exact changes (order and content; wording is the builder's within the claim limits):
1. First sentence of the reveal: the unit finding (a random mix already scores about 0.5 on small blocks; a segregation number means nothing without its unit). This is the learning gap and should lead.
2. Second: what the model shows, with the model as subject: "In this model, a simple moving rule sorts the grid to about 0.8." Not "mild preferences push".
3. Third, immediately, in the same paragraph: the limit and the structural history together, in this order: housing and lending discrimination (including the 1938 HOLC maps), then income. "In US cities, households did not all have the same choices: ..." Discrimination before income, because income alone offers an innocent-sounding substitute that displaces it; income and discrimination are entangled, so do not present income as a separate neutral cause (check wording with fact-checker; Rothstein 2017 is the likely source for the link).
4. The limit is not a footnote (the brief says so; I confirm). It sits in the same visible block as the 0.8, not below a scroll or behind a tap.
5. Say "In US cities" or "in the United States" in the structural sentence; see Q9 for why.
6. The reveal is capped at 120 words by demo-standard (the brief says 90). The structural sentence must survive that cap; cut the model detail first, never the structural sentence.
7. Per demo-standard "Show the why you promised": the objective asks the learner to understand that the model leaves out what actually shaped real cities. A told sentence alone will be a revise. Put something on the stage that stands for it, even small: for example a one-line "Left out of this model: money, prices, jobs, history, who was allowed to live where" shown beside the grid after the learner has run it (stage budget 25 words; the line is about 14). If the builder believes the told sentence suffices, that is a decision to record and the evaluators will rule on it. I flag it, I do not rule on the standard.

### 4. Wording: "groups", "segregation", "sorted", "divided", "unhappy" (or "wants to move")

**Ruling by word:**

| Word | Ruling | Exact change |
|---|---|---|
| groups | Acceptable | Use "Group A / Group B" on stage (Q1). In the toggle use the source's category names. |
| segregation | Acceptable with change | It is the technical name of the index; keep it in the toggle and the claim. On the stage use "how unevenly the groups are spread (0 even, 1 fully apart)". Do not use the claim-4 gloss "share that would have to move" on the card: read plainly it sounds like a relocation policy. Keep it in the claim only. |
| sorted | Acceptable | Only with the grid or the model as subject ("the grid sorts"), never people ("people sorted themselves"). |
| divided | Acceptable only for the model's grid; not acceptable for New York or its residents | The first lesson's title ("sharp divides") is fine in a toy. Here, with a real city shape, "divided city" is a moral judgement. Use "sorted" or "separated blocks". |
| unhappy | **Not acceptable** on this card | With a real-city shape and race, "unhappy" says the agent dislikes its neighbours. The first lesson says "happy as a minority" and "unhappy"; keep that lesson as is but do not reuse the word here. Use "would move" / "would stay". The readout "share happy" becomes "share who would stay". |
| wants to move | Acceptable with change | "Would move" is better: "wants" again assigns a motive. The rule line says what triggers a move (under X% like neighbours), which is the honest content. |
| minority | Avoid on this card | In the first lesson it means "outnumbered on its street". Beside a US city and race, a US reader hears it as a racial term. Say "outnumbered on the street" or just give the percentage. |
| residents | Avoid for agents | Say "households" or "squares". Never "Black residents move", "White flight", "neighbourhood changes". The model moves identical agents, not communities. |

### 5. Colours and pattern: two neutral hues plus hatching

**Ruling: acceptable with these exact changes.** The principle (two neutral hues, plus a non-colour cue) is right. Three problems:

- Hatching will not read on this grid: about 404 cells on a phone are roughly 8 to 10 px each. The first lesson already uses shape (a square for A, a circle for B, filled for staying, hollow for would-move, red ring for unsettled; fill `--domain` for A and `--warn` for B). Keep shape as the second cue, not hatching. Do not reuse "hollow" for a group trait, because hollow already means "would move" in lesson one.
- Hue pairs to avoid for the two groups: black and white or dark and light grey; red and blue (reads as US political parties); any brown, tan or beige; yellow (an old racial colour code in the US and parts of Asia); red and green (good/bad and colour-blind failure). The current `--domain` / `--warn` pair appears to avoid these, but I did not check the theme values: the builder confirms the two hues in light and dark themes, and that they differ in lightness as well as hue (colour-blind safe).
- `--warn` literally means "warning". Do not let a group take `--warn` or `--bad` or `--good` in this lesson. Use two neutral accent variables (or a new pair) that mean nothing. The `--bad` red ring for "unsettled by a move" is about the rule and may stay, but must never touch group colours; if it appears next to Group B's colour, reconsider.
- Walls (cells outside the mask) are plain background or muted; empty cells are a third look that matches no group. The D line and the real-D label use the foreground colour, not a group colour.
- Do not name the colours in text ("the orange households"). Name them Group A and Group B with the shape in the legend.

### 6. Is the 30% threshold slider harmless, or does it present a number for how much preference people have?

**Ruling: acceptable with these exact changes.** The slider is what makes the lesson a toy rather than a claim; keep it. Risks: "30% mild" reads as a measurement of tolerance ("people accept up to 70% others"), and the learner can tune it to hit a real D.

Exact changes:
- The rule line says: "A setting in this model, not a measure of anyone." (about 10 words; fits the stage budget with Q1's line only if the builder trims elsewhere, so the budget needs a count.)
- Do not call 30% "mild" in this lesson. "Mild" is lesson one's term for a low threshold relative to a majority; next to a real city it becomes a claim about people. Say "a low setting" or "30%".
- Label the control "Move if fewer than X% of neighbours are like them", not "preference" or "tolerance".
- No default or preset button labelled with a realism cue ("realistic", "like NYC", "typical"). Presets (if any) are numbers only. This matches the brief's hard limit, "do not tune the threshold toward any number"; I add the label constraint so the builder does not breach it in the UI.
- The real D appears only after the learner has finished exploring (the toggle), so there is no target to chase during exploration. Keep that order.

### 7. May the reveal quote the HOLC 1938 maps as a cause, and is "associated with later lending patterns" the right strength?

**Ruling: acceptable with these exact changes. Do not call the maps "a cause". "Associated with" is the right verb strength for the causal claim, but the sentence needs a second clause.**

Why:
- Mapping Inequality documents the maps and their grades. Whether the maps created later lending patterns or recorded and reinforced discrimination that already existed is disputed in the research (from memory: Aaronson, Hartley and Mazumder 2021 find effects at the map boundaries; Fishback and co-authors 2022 find the maps largely reflected existing practice; fact-checker to confirm both before any claim names them). "Associated with" is therefore the honest strength and a stronger verb would be a claim the sources do not support. Do not strengthen it for rhetorical balance.
- Calling HOLC "a cause" also over-weights one federal agency, when FHA underwriting, restrictive covenants, steering, blockbusting and lending practice are part of the record (Rothstein 2017 is a secondary account, not a primary source; claim 10 must name sources one per claim, as the brief already says).
- A non-US learner does not know "HOLC". Spell it once in plain words ("a US government agency's 1938 neighbourhood maps that graded areas for lending risk") and say "redlining" only if it is explained; no acronym alone.
- Do not name any neighbourhood or borough in connection with a HOLC grade on this card. The brief already bars claims about why a specific neighbourhood is as it is; this is the place that line is most likely to be crossed.
- Split claim 10 into at least three claims: (a) the maps graded neighbourhoods and the grade is associated with later lending patterns (name the study); (b) housing and lending discrimination was documented in US cities (name the source); (c) income and wealth differences (name the source). One claim cannot carry three sources.
- Wording change: "Documented causes include" becomes "The documented history includes".

### 8. Does the final toggle (real D with source) help or invite "model matches reality"? Is "different unit, not comparable" enough?

**Ruling: not acceptable as drafted. Acceptable with these exact changes, and only if a learner check passes. If the check fails, drop the number and keep only the unit lesson.**

Why:
- The brief's own check shows the model's D can be anything from 0.38 to 1.00 depending on block size and that a real tract figure of about 0.7 to 0.8 sits inside that range. The learner sees "0.8 in the model" and "about 0.7 to 0.8 in the city" and reads "match". A disclaimer of "different unit" is itself abstract; learners in a 60-second card tend not to hold it. I believe this with moderate confidence; I have no learner data.
- The point of the lesson is that a segregation number depends on its unit. The real D teaches that best if it is shown as a second unit, not as a validation.

Exact changes:
- Show it as a separate fact, not on the same axis, line, colour or panel as the model's D (the brief already bars drawing it on the axis; I extend this to anywhere it is visually adjacent to the model's number).
- Label with everything: source (Brown University, US2010 project, name the report), year, the two groups by the source's names, unit (census tract, about 4,000 residents typically: check), and that it concerns one pair of groups.
- Concrete unit contrast rather than "not comparable": "A tract holds thousands of people. A block in this grid holds a handful of squares." That is more memorable than the disclaimer and is the lesson.
- If the real figure falls near the model's number in the final build, the builder reports it to me and I re-rule. I will probably move to "drop the number".
- Learner check before publish: ask a borrowed-mind reader or learners, after the toggle, "Does this show the model is right about New York?" A "yes" or "mostly" answer from more than a small minority is a fail and the number is dropped. This goes in the board as a condition (see below).
- Year honesty: if no 2020 figure exists, say "2010" on the card; never mix years silently (the brief already says this).

### 9. Is a real-city figure of this kind appropriate for a 60-second consumer card at all, and for which audiences?

**Ruling: acceptable for the model and the unit lesson everywhere. The real-city figure is acceptable with the Q8 conditions, in US-context framing, for general-adult audiences. It is not acceptable to localise to another locale without its own review.**

- US learners: the topic is familiar and charged. Two risks: (a) a screenshot of "preferences alone can produce the pattern" without the limit becomes an argument that segregation is people's choice; mitigate by keeping the limit in the same block as the result (Q3); (b) Black and Hispanic learners seeing a toy that treats their city's segregation as a symmetric free-choice game; mitigate by Q1 and Q3 (item 3).
- Non-US learners: (a) "Hispanic" is a US Census ethnicity category with no counterpart in much of the world, and the White/Black frame is not the universal one; elsewhere housing divides run along ethnicity, religion, caste, nationality or class. The card says "in US cities" and "the US Census" explicitly so the learner does not take American categories as general. (b) Some countries do not collect race data at all (for example France); the card should not imply that measurement is neutral or universal. (c) The brief's own map claim ("no real city is named" in lesson one) is about to change: this lesson names one, so the scope of the lesson-one claim c7 does not carry over. This card needs its own "toy model, not a cause" claim.
- Locale variants: translating "segregation", "Black", "White", "Hispanic", "minority" is not mechanical. Each locale variant needs its own cultural review before localisation is built (my launch-review, per locale). I did not review a locale variant here.
- Age and surfaces: I found no stated audience policy in the product docs (grep for audience, age). I do not rule on minors; the topic is taught in secondary school curricula, but flag it to the head of product if the feed has any younger mode.
- Not a "gotcha" card: the hook must not be an accusation or a rhetorical question about the city's segregation level. The brief's current hook is not yet written; see "Things the brief misses".

## What the brief misses

1. **Implied causation, beyond the reveal.** The prediction text ("Run the Economics rule on a grid shaped like New York's five boroughs") and the stage may imply the model explains the city. The borough count is not needed; "a grid shaped like New York City" is enough. Avoid the word "boroughs" altogether (Q2).
2. **Symmetry hides power.** Both groups follow the same rule and have the same freedom. Named in Q3 item 3; the stage line in Q3 item 7 is how to show it.
3. **Stereotyping by edge artefact.** Narrow strips of land and the hand-drawn mask produce behaviour that looks like a place-specific result (Q2).
4. **Framing of residents.** Households, not residents, communities or neighbourhoods; no group moves "into" or "out of" anything; no verb like "flee" or "invade" in code comments, alt text or event names that could surface (Q4).
5. **Naming of groups.** Census category names verbatim when real groups appear; the "Hispanic" category is an ethnicity that overlaps race; no one-word shorthand ("Whites", "Blacks") (Q1).
6. **Structural causes beyond HOLC.** Lending practices, restrictive covenants, steering, public-housing siting, urban renewal and price are part of the record; the card names discrimination in housing and lending generally and does not imply HOLC was the whole story (Q7). Do not claim more than the sources the fact-checker reads.
7. **Recall card.** The brief has none. It must ask about the unit lesson ("A random mix scores about 0.5 on small blocks: what does that tell you about a segregation number?"), not about causes of segregation, and must carry no real-city figure and no group names. It must stand without the stage.
8. **Prerequisite assumption.** The brief calls lesson one a prerequisite; the feed may show this card first. The card's own rule line and the Q1 stage line must make it self-sufficient on "what these squares are".
9. **Claims that need rewording or splitting.** Claim 8 "Preferences alone can produce a sorted pattern": say "a simple moving rule" (Q3). Claim 10: split by source (Q7). Claim 2: drop (Q1). Claim 1: drop if not used. Claim 9 (judgement) is the right type; keep it marked as judgement and keep it in the reveal, not a tooltip.
10. **Walkthrough check at publish.** Run `npm run walkthrough -- schelling-on-new-york` and read the real frames across several seeds before reading builder notes. My second review will look for: any frame where one borough is one group; any use of banned words (Q4); whether the structural sentence is in the same block as the result; whether the real D sits near the model's D.

## Conditions (what must be true before build and before publish)

Before build (category manager records in the brief, builder reads):
1. Stage uses Group A / Group B, equal numbers, with the "made-up, not New York's population" line (Q1). Claim 2 dropped.
2. No borough names, labels or per-borough outputs; seeds 1 to 50 borough-uniformity check on the real mask (Q2).
3. Banned words and replacements adopted (Q4); colour and shape plan adopted (Q5); rule line says the threshold is a setting (Q6).
4. Reveal order and content as in Q3 and Q7; claim 10 split by source.
5. Real D: separate from the model's number; full labelling; unit contrast sentence (Q8).

Before publish:
6. Second cultural review on the built walkthrough (artifact first).
7. A borrowed-mind or learner probe on the Q8 misreading ("does this show the model is right about New York?"); if it fails, drop the number.
8. Fact-checker verifies every claim; HOLC research strength, Census category wording, Brown value, year, groups and unit are read from the pages, not from memory.
9. Per-locale review before any non-English or non-US variant is built.

## Objections and their answers (for the record)

- Possible objection from the category manager: equal groups lose the "New York" specificity. Answer: the specificity is in the shape and the real-D toggle; the stage claim about shares was the part most likely to be wrong and gave no learning. If the manager still wants real shares, the minimum is all four Census groups, which breaks the two-colour limit; I do not recommend it.
- Possible objection from the builder: shape cues instead of hatching change the Q5 plan. Answer: lesson one already uses shape; this is consistent with the existing engine and accessibility.
- Possible objection from the fact-checker: the HOLC research is contested. Answer: agreed; that is why the strength stays "associated with".

## Routing

- Category manager (cm-geography-people-places): record the nine rulings in the brief; change shares, hook, reveal; split claim 10.
- Demo builder: after brief update; engine needs `share1` and wall mask only if shares are unequal. With equal groups only the wall mask is needed.
- Fact-checker: HOLC research, Census category wording, tract population, Brown values (all from source pages).
- Cultural reviewer: second review of the built walkthrough; per-locale review before localisation.
