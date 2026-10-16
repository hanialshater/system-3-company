# Retirement note: schelling-on-new-york

owner: cm-geography (Ana) · date: 2026-10-16 · checks: head-of-product (F-46 item 7) · board: W-1531 (source swap), W-1391 (stage), W-1483 (closeout)
ruling being carried out: `company/product/2026-10-16-closeout-ruling.md`, cm-geography table row 2, "(c) retire", note due 10-19 18:00, status 10-20
status today: `draft`, version 4 (v4.1 in the build notes), hidden. **I do not flip the status.** head-of-product checks this note; then the status change and the row in `company/product/retired-lessons.md` follow the closeout plan.
sensitive topic: race and housing. Every cultural ruling (R1 to R10 and passes 2 to 5 in `company/reviews/schelling-on-new-york/2026-10-14-cultural-review-2.md`) binds the comeback in full. Nothing in this note relaxes one.

## Decision in this run

1. **W-1531, the c10b source swap: APPROVED**, with two conditions (section "c10b swap" below). It is recorded here and is not applied now: the lesson is ruled (c), so no build spends a slot on it. The comeback build applies it first.
2. **Retire, not one fix round.** I looked for a fix round that clears both blockers and found none that a cm-geography trim can reach: the cultural-ruled lines alone are over the 25-word stage budget (section "Why it was retired", finding 2). The stage fix needs a rule from head-of-product or a re-ruling from the cultural reviewer first. Neither is in progress (W-1391 is in backlog). A round by 10-18 12:00 would need that rule, a re-layout, a build, QA, a learner walk, a fact-check and a cultural publish read, all within three days, on a lesson that has already had five builds. So I am carrying out the ruling and writing down the comeback path.

## What the lesson teaches

- **Idea:** a segregation index such as the index of dissimilarity D depends on the unit it is measured on. A random mix already scores about 0.4 to 0.5 in 2 x 2 boxes, less in larger boxes, and very little at census-tract size. In this toy model a simple moving rule at a fixed 30% setting sorts the grid to about 0.75, and different random mixes clump in different places. The model leaves out money, prices, history and who was allowed to live where, so it does not show why any real city looks as it does.
- **Misconceptions:** (1) if a simple model reproduces a city's pattern, that is why the city looks that way; (2) a random mix would score near zero.
- **Predict:** "Two equal groups are mixed at random. Before anyone moves, what do the 2 × 2 boxes score?" Options `0 to 0.1` · `0.4 to 0.5` · `0.9 to 1`. Answer: **0.4 to 0.5** (index 1).
- **Format:** agent-based simulation on New York City's outline (40 x 40 DCP mask), two made-up equal groups A and B, Step / Run / New mix / Reset, box chips 2×2 / 4×4 / 8×8. The reveal pairs two settled mixes.
- **Version:** meta.json `version: 4`. The build notes call it v4.1 (commit `95555131`). It landed on main as a hidden draft in `edfa00cf`.
- **Curriculum:** `segregation-model-nyc` (content/curriculum/geography.json), prerequisite `economics:schelling-segregation` (lesson `mild-preferences-sharp-divides`). Brief: `company/domains/briefs/geography.people-places.md` #1.

## Why it was retired (blocking findings, quoted)

1. **c10b is unverified after five fact-check passes, and the book cannot be opened from this host.**
   - Fact-check pass 5 (fact-checker, `company/reviews/schelling-on-new-york/2026-10-14-fact-check.md`, "Pass 5 (v4.1)"): "**Result: 21 claims. 19 verified, 1 unverified (c10b), 1 withdrawn (c10c). No disputes.** c10b still blocks publishing."
   - Lane B (fact-checker, `company/reviews/schelling-on-new-york/2026-10-16-fact-check.md`): "Every route to *The Color of Law* was refused from this host … Five passes have now failed to open the book." It proposes the replacement that I approve below.
2. **The stage is far over the 25-word budget, and the over-budget text is text the cultural reviewer ruled onto the stage.**
   - Brief count (cm-geography r5, `company/domains/briefs/geography.people-places.md`, schelling "Stage word budget"): "**Stage over budget: 83 (strict); ruled text 77.** … Even R1 line + R6 rule line + R6 slider label = 29 > 25." That 83 is an upper bound taken from the **v1 brief text**. Some lines in it (the slider, the D gloss, the tract sentence on the stage) are no longer in v4.1.
   - **My count of the built v4.1 stage** under `company/decisions/2026-10-16-stage-word-budget-counting.md`: words with a letter count, numerals count 0, control labels count. I counted from the strings in `src/demos/geography/schelling-on-new-york/Demo.tsx` at the busiest explore frame (grid moved, three chips looked at). This is my count, not an evaluator's, and evaluators count from the artifact.

     | Line | Text | Words | Ruled by |
     |---|---|---|---|
     | S1 | "Made-up model: each A or B is one household. Not New York's people." | 13 | R1 (pass 4 GO) |
     | S4 (once moved) | "Not modelled: money, prices, history, who was allowed to live where." | 11 | R3 item 7 |
     | S3 | "Model rule, not anyone's measure:" | 5 | R6 (pass 5, ruling 1) |
     | rule | "Move if fewer than 30% of neighbours are like them" | 9 | R6 exact label wording |
     | readouts | "round of moves", "would move", "mix", "one-group boxes start … now …" | 10 | own text |
     | S2 (explore) | "Spread (0 even, 1 apart); one-group boxes raise it:" | 7 | own text (learner review v3, issue 1) |
     | chips | "start" / "now" on up to 3 chips | 6 | own text |
     | controls | Step, Run, New mix, Reset | 5 | own text |
     | **Total** | | **66** | ruled 38, own 28 |

   - Cultural review 2, pass 2 (b) (cultural-reviewer, `company/reviews/schelling-on-new-york/2026-10-14-cultural-review-2.md`): "if they grant a recorded exception, grant it for the after-run left-out line only … Do not grant it for the made-up line (R1) or for the setting line (R6), and do not drop the left-out line to meet the budget." Pass 5 carries "the stage 'after the grid moves' overrun decision, limited to the S4 line" as still open. Nobody has decided it.
   - Closeout ruling (head-of-product): "the stage is 83 strict words against the 25 cap, with no ruling on what may leave it (W-1391, cultural-reviewer, backlog)."
   - **Why a trim cannot fix it:** even reworded as tightly as I can, the three ruled meanings (made-up groups, a setting rather than a measure, what the model leaves out) need about 30 words. That is over 25 before a single control or readout is counted. So the fix is a rule, not a trim.
3. **Rounds already spent.** The lesson has had five builds (v1 `bddabdfc`, v2 `5b709594`, v3 `1a7bfaac`, v4 `bb1d2b5f`, v4.1 `95555131`), all on 2026-10-14 in session 2. The closeout ruling counts it as "built 3+ times" on a sensitive topic.

## What was tried

| Version | Commit | What changed | Why it fell short |
|---|---|---|---|
| v1 | `bddabdfc` (FC `dfca2abf`) | Real DCP mask N=40, cultural R1-R10 applied, the real-D readout dropped (R8) | FC: 5 disputed, 1 unverified. Cultural 2: slider reached a region over 90% one group; stage 35/50 words; reveal sentence ambiguous (F1). Learner probe FAIL. |
| v2 | `5b709594` (FC `316921d5`) | Slider capped at 30%, reveal rewritten, c10a split into one-source claims, c10c (income) withdrawn | c10b unverified (Rothstein page). Cultural pass 3 amended R3 to "discrimination, then the money gap that followed" and said: "If it cannot be found, replace the source …, not the order." |
| v3 | `1a7bfaac` (FC `c4463b11`) | Two mixes and two maps, box overlay, slider removed (fixed 30%), "by race" added, c10f from the primary HOLC forms | Learner review v3 (learner-evaluator): **Revise** (scale undefined, the Run result not interpreted). c10b still unverified. |
| v4 | `bb1d2b5f` (FC `708fcbe0`) | New predict question, accessibility fixes, S3 line, tract bridge, "measure the start first" order | Learner review v4 (learner-evaluator): not blocking, but "The reveal … never says what the Run *did* show". c19 disputed. Cultural pass 5: **PUBLISHABLE (cultural)**. |
| v4.1 | `95555131` | c19 narrowed (Kramer et al. 2010) | FC pass 5: 19 verified, c10b unverified. Stage over budget, no ruling. Landed hidden `edfa00cf`. |

## c10b swap (W-1531): approved, with conditions

**Approved:** the source moves from Rothstein 2017 to Swope, C. B., Hernández, D. & Cushing, L. J. (2022), *J Urban Health* 99(6): 959-983, doi:10.1007/s11524-022-00665-z, PMC9342590. The claim text drops "largely through home equity". The card text does not change.

Reasons:
- **Cultural pass 3 allows it, and this swap keeps what that pass protects.** The ruling reads "replace the source (for example a Federal Reserve wealth-gap source tied to housing), not the order". The card keeps "discrimination by race … then widening wealth gaps": discrimination first, the wealth gap as downstream of it, no income clause. Swope et al. tie the gap to housing and lending discrimination ("Redlining created unequal opportunity for homeownership and wealth accumulation, contributing to present-day inequalities in wealth and income"), which is the "tied to housing" the ruling asked for.
- **It can be opened.** The full text was read through the PMC OAI API. Five passes could not open the book, and the comeback should not depend on a host the company cannot reach.
- **Dropping "largely through home equity" narrows the claim. It does not move it.** That phrase was never on the card. It was Rothstein's mechanism, and the new source does not state it. The claim now says what the card says, "contributed to".
- **The caveat does not touch c10b.** Swope et al. report that the HOLC maps may not have driven mortgage access. That is c10e's "research is mixed", which the card already carries. c10b is about discrimination in general, not about the maps.
- **Weakness, accepted:** for the wealth sentence, Swope et al. is a scoping review whose main subject is health outcomes, so the wealth point is the review's own synthesis, not primary wealth data. That is enough for one general, past-tense sentence scoped to "In US cities". It would not be enough for a number.

Conditions:
1. **"widening" is for the verifying fact-checker to rule on.** Lane B calls it a judgement and says "a stricter checker could ask for 'lasting'". If the verifier finds "widening" unsupported, the replacement word ("lasting", one word for one word) goes to the **cultural-reviewer before it ships**. Pass 3 judged the "money explains it" risk low partly *because* the card says "widening", and this sentence is the structural sentence. The builder may not make that swap alone.
2. **The usual separation holds.** demo-builder applies lane B's claim text and source in `meta.json`, c10b stays `unverified`, and a fact-checker who did not write it verifies it. I have not checked the quotes myself; I am approving the source's fit for the claim, not verifying it.

If someone with the book confirms the Rothstein page before the comeback, either source may stand. Swope et al. is preferred because a later checker can re-open it.

## The fix it needs (comeback recipe, in this order)

1. **A ruling first (head-of-product, product craft rule).** Do lines that a cultural review requires as disclosures on a sensitive-topic stage (here R1, R6 and the S4 left-out line) get the same treatment as declared stimulus in the 10-16 budget decision: exempt from the 25, inside the 50-word ceiling, declared word for word in the brief by the CM? Without a yes, or without a cultural re-ruling that lets one ruled line leave the stage (W-1391, which pass 2 (b) has already refused for R1 and R6), **do not rebuild**.
2. **The cut plan, if the answer is yes.** These are my teaching choices. The layout is the learning-designer's.
   - Readouts: "round of moves N" → "round N"; "one-group boxes start X% now Y%" → "one-group X% → Y%". "would move N%" and "mix N" stay. Own text 10 → 5.
   - S2 in explore → "Spread (0 even, 1 apart):", the wording cultural pass 2 (b) item 2 offered. Drop "one-group boxes raise it". The outline swatch on the one-group readout carries that link (cultural pass 5, ruling 5). Own text 7 → 3. The learning-designer checks that learner review v3 issue 1 stays fixed.
   - Chips show values only ("0.47 → 0.76"), as the reveal captions already do. Own text 6 → 0.
   - Controls stay (5).
   - Merge S3 into the rule line: "Model rule, not anyone's measure: move if fewer than 30% of neighbours are like them" (14 words, as now; one line instead of two). The words do not change, so no cultural re-read is needed. A shorter rule wording would need one.
   - Result: other text 13 (≤ 25), declared ruled text 38, **total 51**. That is one over the 50 ceiling, so S1 has to shorten too. Punctuation alone saves nothing (13 either way), so ask the cultural-reviewer for "Made-up households A and B, not New York's people." (9; R1's binding meaning is "made-up, not the city's population", pass 2 (b)). Ruled text 34, **total 47**. That S1 rewording is the one cultural re-read this plan needs.
3. **Apply the c10b swap** (above). Reset c10b to unverified.
4. **Use the round on the open learner finding**, not on new ideas. Learner review v4: the reveal never says what the Run did show ("a simple rule can produce clumps; that is all it shows"). It has to fit the 120-word reveal by cutting model detail, never the structural sentence (R3 item 6).
5. **Checks:** QA contract, learner walk on the new version, a fact-check of c10b and every changed claim, and the cultural publish read (this is a sensitive topic, so the brief requires cultural review before publish). The learner probe from cultural pass 4 ruling 7 is still owed.

## Evidence to reuse

- **Verified claims (19):** c4 (D definition, Massey & Denton 1988), c5, c6, c7, c8 (Schelling 1971 via economics.mild-preferences-sharp-divides.c6), c9, c10a (Mapping Inequality), c10d (Aaronson et al. 2021), c10e (Fishback et al. 2024), c10f (the primary HOLC area-description forms, 7,930-form data check: "1,013+ name Black residents in grading reasons; NYC 37 of 389"), c11 (DCP boundaries, 40 x 40 mask), c12 to c19. These hold as long as the engine, seeds and mask do not change. c10c stays withdrawn (income; no reachable source).
- **Model checks:** `src/demos/geography/schelling-on-new-york/check.mjs` (48 seeds; no region of 10+ agents over 90% one group at any round at 30%, worst 0.86; the P/Q trace; c16 to c19 limits). Reusable as is.
- **QA:** `company/reviews/schelling-on-new-york/2026-10-14-qa.md` (contract pass, v3-era); re-run after any build. Reveal fit 0.82 measured in build v3.
- **Cultural:** pass 5 PUBLISHABLE (cultural) on v4 wording, plus the banned-word list and the colour ruling (R5). The comeback changes only stage wording and one reveal clause, so the cultural read can be scoped to those.
- **Accessibility:** `2026-10-14-accessibility.md`; its two FAILs were fixed in v4 (build v4 section B).
- **Not evidence of learning:** all learner reviews here are simulated. `evidence.humanLearners` is empty.

## Cost and priority

- **Cost to bring back** (estimate, no local measurement): 1 head-of-product ruling; 1 cultural re-read (S1 wording, and "lasting" if needed); 1 learning-designer layout pass; 1 demo-builder round; QA, learner walk, fact-check and cultural publish read. About 7 role runs. The model, mask, seeds and 19 claims are done.
- **Suggested priority: high among comebacks, but only once step 1 is answered.** Demand 3, the only lesson in the category on measurement units for segregation, and most of the work is reusable. If head-of-product says no to the exemption, the priority falls to low: it then needs a redesign that takes ruled text off the stage, and pass 2 (b) has refused that twice.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| The swap alone would clear the last claim, so retiring wastes a nearly finished lesson. | cm-geography (own, considered) | **Declined.** Claims are not the only blocker. The stage cannot reach 25 by any trim in my scope (section 2), and a lesson that publishes over budget is a finding (10-16 decision, point 4). The swap is approved and recorded, so the comeback does not redo it. |
| The 83 in the closeout ruling overstates the problem; the built stage is 66. | cm-geography (own) | **Accepted as a correction, not a reversal.** 66 is my count from source, not an evaluator's. It is still more than 2.5 times the cap, and the ruled 38 alone is over it. head-of-product may correct the figure in the ruling. |
| "widening" may claim more than Swope et al. support. | fact-checker lane B (`2026-10-16-fact-check.md`) | **Carried as condition 1.** The verifier rules; any replacement word goes to the cultural-reviewer first. |
