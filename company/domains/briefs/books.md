# Book Summaries: ranked lesson briefs (cycle 1, first 12)

owner: cm-books (Hester) · drafted 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request, for cm-books and the strand managers to re-check (board) · curriculum: `content/curriculum/books.json` · charter: `company/domains/books.md` · answer checks: `node company/domains/briefs/checks/books-cycle1-check.mjs` (all 12 pass, 2026-10-14)

Ranked briefs for `tools/claim.mjs next books`, in the same format as the other briefs files (`### N. slug · concept: <id> · level · demand N`). Strand lists (`books.<strand>.md`) come after this one.

**Read before building any of these:**
- **Copyright** (charter): summarise in your own words. Quote at most one short line, with attribution, and none of these briefs needs a quote except #10 (Brooks's law, optional). Draw only original stages and models.
- **Two kinds of claim** (charter): "the book argues X", cited to the book's chapter, and "does X hold up", cited to research. Chapters below are marked **(unconfirmed)**. They come from the drafter's knowledge of the books, not from a copy, and the fact-checker confirms each one against the book before verifying it. A builder writes them into `meta.json` exactly as marked.
- **Format.** Every brief is a single card (or simulation run) **today**. The founder's target is the multi-card sequence. It needs the kit stepper that the design engineer is building, plus design-lead approval of a reference lesson. Each brief has a "Multi-card later" line saying how it splits, so the rebuild needs no new brief. Do not hand-build a stepper.
- **Sources** were not opened from this host. Every planned source is the drafter's citation for the fact-checker to confirm. Where a detail is uncertain, it says "(to confirm)".
- **Why these 12.** They are demand 3, one per book, from 11 books across all three strands: business 6, psychology 4, science-history 2. Each was picked because its idea can be shown on the stage, not only told, and because the evidence on whether it holds up is substantial either way. Science-history is light this cycle because its demand-3 ideas (continental axes, the straight-line instinct, calibrated forecasts) need map or data work. They lead cycle 2.

### 1. slowest-station-sets-pace · concept: goal-bottleneck-sets-pace · intro · demand 3
- Strand: business (cm-books-business). Book: *The Goal* (Goldratt & Cox, 1984), work `goldratt-the-goal-1984`.
- Learner knows: a faster machine makes more parts. / does not know: that a line's output is capped by its slowest step, so speeding up any other step changes nothing except the pile in front of the slow one.
- Misconception: Doubling the speed of any station raises the line's output.
- Prediction: "A four-station line can do 12, 9, 5 and 10 parts an hour. You double the fastest station to 24. How many finished parts an hour now?" options: 5 / 7 / 10 / 12 (answer: A, 5). Check (node): min(12, 9, 5, 10) = 5, and min(24, 9, 5, 10) = 5. Three +2 upgrades on station 3 give 5 → 7 → 9 → 11, and then station 2 (9/h) becomes the bottleneck, so output is 9.
- Interaction: four stations in a row. Tap a station to add +2 parts/h (3 upgrades to spend; Reset). The stage shows a throughput readout, a parts-waiting pile in front of each station that grows when the station is starved or swamped, and the bottleneck outlined. Milestones: (1) upgrade a non-bottleneck station, so throughput stays at 5 and a pile grows; (2) upgrade the bottleneck, so throughput rises; (3) the bottleneck moves to another station.
- Reveal (own words, ≤ 90): Output stayed at {throughput} while you sped up station {n}: parts just piled up in front of the slow station. The line runs at the pace of its slowest step. *The Goal* makes this its central lesson: find the constraint, improve it, then look for the next one. You saw that too: after your upgrades the bottleneck moved to station {m}. Does it hold up? For a simple line in steady state, yes: it is standard operations maths.
- Claims a learner will see, with planned sources: (1) The book argues that a system's output is set by its constraint (bottleneck), and that improving non-constraints does not raise output. *The Goal*, the scout-hike chapters (around ch. 13–14, **unconfirmed**). (2) In steady state, a serial line's throughput equals its slowest station's capacity. Hopp & Spearman, *Factory Physics*, 3rd ed. (2008), ch. 7 "Basic Factory Dynamics" (bottleneck rate; chapter to confirm). (3) The station rates are the lesson's model (stated on the stage). (4) Optional, in the reveal only if it fits: evidence that the Theory of Constraints works in real firms is mostly case reports (Mabin & Balderstone, 2003, *Int. J. Operations & Production Management* 23(6), a review of TOC applications; to confirm).
- Nearest lessons: economics/kitchen-crowding (diminishing returns) and lifehacks/batch-by-setup. Neither has a serial line or a bottleneck. Concept `also`: none.
- Format: Single card (tap stations; readout).
- Multi-card later: card 1 the line, card 2 the pile in front of the bottleneck, card 3 the bottleneck moving.
- Curriculum: primary `books:goal-bottleneck-sets-pace`; references `[{ "work": "goldratt-the-goal-1984", "note": "scout hike (Herbie); chapter unconfirmed" }]`.
- Copyright: The Goal is a novel. Describe the idea, not its characters' dialogue. No quote is needed.

### 2. one-percent-a-day · concept: habits-one-percent · intro · demand 3
- Strand: psychology (cm-books-psychology). Book: *Atomic Habits* (Clear, 2018), work `clear-atomic-habits-2018`.
- Learner knows: small improvements add up. / does not know: (a) that 1% a day compounds to about 37.8×, not 4.65×; (b) that measured skill gains usually slow down with practice, so a constant 1% a day is arithmetic, not what learning data show.
- Misconception: 1% a day for a year is 365% better; or, once told it is 37×, that real skills improve that way.
- Prediction: "Get 1% better every day, each day building on the last. After one year, how much better are you?" options: About 4.7 times / About 37.8 times / About 365 times (answer: B). Check (node): 1.01^365 = 37.78; linear 1 + 3.65 = 4.65; 0.99^365 = 0.0255.
- Interaction: a daily-gain slider (0.1% to 2%) and a curve toggle: "compound every day (the book's arithmetic)" / "practice curve (illustrative power law, speed ∝ sessions^0.4)". The stage plots skill over 365 days with a "times better" readout. Milestones: (1) the compounded curve at 1% reaches 37.8; (2) switch to the practice curve (about 10.6× after a year, and about 37% of that gain is reached by day 30). The exponent is labelled illustrative.
- Reveal (≤ 90): At 1% a day the compounded curve reached {x}×, not 4.7×. Gains on gains add up fast, and that arithmetic is what *Atomic Habits* uses to argue that tiny habits matter. Does it hold up as a picture of learning? Mostly not: when skill is measured, gains are fast at first and then slow, as your practice curve showed. Small habits can still matter. They just don't compound at a fixed rate.
- Claims: (1) The book argues that improving 1% each day compounds to about 37 times better in a year. *Atomic Habits*, ch. 1 "The Surprising Power of Atomic Habits" (**unconfirmed**). (2) 1.01^365 ≈ 37.8 (arithmetic, on the stage). (3) Practice data usually show diminishing gains: the power law of practice (Newell & Rosenbloom, 1981, "Mechanisms of skill acquisition and the law of practice", in Anderson (ed.), *Cognitive Skills and Their Acquisition*). Heathcote, Brown & Mewhort (2000), *Psychonomic Bulletin & Review* 7(2), find exponential fits better for individuals. Either way, gains slow down. (4) The practice curve's exponent is illustrative (stated).
- Nearest lessons: economics/compound-interest and economics/growth-rate-gap (compounding money). This lesson is about whether a habit compounds. Prerequisite: `economics:compound-interest`.
- Format: Single card (slider and toggle; one chart).
- Multi-card later: card 1 linear vs compound, card 2 the practice curve, card 3 the verdict.
- Curriculum: primary `books:habits-one-percent`; also `economics:compound-interest`; references `[{ "work": "clear-atomic-habits-2018", "chapter": 1, "note": "chapter unconfirmed" }]`.

### 3. born-in-january-picked-first · concept: outliers-relative-age · intro · demand 3
- Strand: psychology. Book: *Outliers* (Gladwell, 2008), work `gladwell-outliers-2008`.
- Learner knows: older children in a class are a bit bigger. / does not know: that picking the "best" from a one-year age band, with a fixed cutoff date, selects for birth month, and that extra coaching then widens the gap.
- Misconception: A birth month can't matter much when every child in the band is "the same age".
- Prediction: "A league picks the tallest 10% of 9-year-olds. The age cutoff is 1 January. About what share of the picks were born January to March?" options: About 25% / About 45% / About 75% (answer: B). Check (node, the lesson's model): height = base + 0.5 cm per month of age within the band + Normal(0, 5.5 cm); picking the top 10% gives Jan–Mar 43.9% and Oct–Dec 10.1%.
- Interaction: a cutoff-month selector (Jan / Apr / Jul / Oct) and a "pick the top 10% / top 50%" toggle. A birth-month histogram of the picks updates. Milestones: (1) the 1 January case; (2) move the cutoff and watch the peak move with it; (3) top 50%, where the skew shrinks.
- Reveal (≤ 90): {q1}% of the picks were born in the first three months after the cutoff, where a fair split would give 25%. When you moved the cutoff, the peak moved with it, so it is the calendar doing the picking, not talent. *Outliers* argues that this is how Canadian hockey's elite came to skew toward early-year birthdays. Does it hold up? Yes: the relative age effect is one of sport science's best-replicated findings.
- Claims: (1) The book argues that early-year births dominate elite Canadian junior hockey because of the 1 January cutoff and the extra coaching that follows selection. *Outliers*, ch. 1 "The Matthew Effect" (**unconfirmed**). (2) The book draws on Barnsley, Thompson & Barnsley (1985), "Hockey success and birthdate: the relative age effect", *CAHPER Journal* 51(8) (to confirm). (3) Holds up: a meta-analysis across sports finds a consistent over-representation of relatively older players (Cobley, Baker, Wattie & McKenna, 2009, *Sports Medicine* 39(3), "Annual age-grouping and athlete development"). (4) The heights and growth rate are the lesson's model (stated on the stage).
- Nearest lessons: probability/small-gap-big-extremes (tail ratios: a small mean gap gives big ratios at the top). This lesson adds the cutoff and the selection. `also`: `probability:tail-ratios`.
- Format: Simulation run (deterministic; no seed needed with the analytic model).
- Multi-card later: card 1 the cutoff, card 2 selection, card 3 coaching widens it.
- Curriculum: primary `books:outliers-relative-age`; also `probability:tail-ratios`; references `[{ "work": "gladwell-outliers-2008", "chapter": 1, "note": "chapter unconfirmed" }]`.

### 4. wheel-number-pulls-guess · concept: tfs-anchoring · intro · demand 3
- Strand: psychology. Book: *Thinking, Fast and Slow* (Kahneman, 2011), work `kahneman-thinking-fast-slow-2011`.
- Learner knows: a random number is irrelevant to a factual question. / does not know: that seeing one first pulls estimates toward it, and by a lot.
- Misconception: An obviously random number can't move a considered estimate.
- Prediction: "Two groups spin a wheel that lands on 10 or on 65, then estimate the percentage of African nations in the UN. How do the groups' typical answers compare?" options: About the same / A few points apart / About 20 points apart (answer: C). Check (published; the fact-checker confirms): medians 25 and 45 (Tversky & Kahneman, 1974). The stage's model (node): private beliefs with median 35, each estimate moving 60% of the way from the anchor toward the belief, gives 25 and 47.
- Interaction: an anchor slider (0–100) and a "show anchor / hide anchor" toggle. A crowd of 30 dots starts at the anchor and slides toward each person's own belief, stopping 60% of the way. A median readout. Milestones: (1) anchor 10; (2) anchor 65; (3) hide the anchor, so the dots sit at their beliefs.
- Reveal (≤ 90): With the wheel at 10 the crowd's median was {lo}. At 65 it was {hi}. The number told them nothing, yet every guess started there and stopped adjusting too soon. *Thinking, Fast and Slow* calls this anchoring. Does it hold up? Yes: it is one of the most reliably replicated effects in judgment research. Why it happens is still debated. Insufficient adjustment, shown here, is one account.
- Claims: (1) The book argues that an arbitrary number shown first pulls estimates toward it. *Thinking, Fast and Slow*, ch. 11 "Anchors" (**unconfirmed**). (2) In the wheel study the median estimates were 25 (anchor 10) and 45 (anchor 65). Tversky & Kahneman (1974), "Judgment under uncertainty: heuristics and biases", *Science* 185(4157). (3) Holds up: anchoring replicated with large effects in Many Labs 1 (Klein et al., 2014, *Social Psychology* 45(3)). (4) Mechanism contested: insufficient adjustment vs selective accessibility (Mussweiler & Strack, 1999, *J. Experimental Social Psychology* 35(2); to confirm). (5) The crowd model is illustrative (stated on the stage).
- Nearest lessons: none on anchoring (`node tools/overlap.mjs` to confirm). `also`: none.
- Format: Single card (slider and toggle).
- Multi-card later: card 1 the wheel, card 2 the slide-and-stop, card 3 the replication.
- Curriculum: primary `books:tfs-anchoring`; references `[{ "work": "kahneman-thinking-fast-slow-2011", "chapter": 11, "note": "Anchors; chapter unconfirmed" }]`.

### 5. twenty-steps-at-99 · concept: checklist-steps-compound · intro · demand 3
- Strand: business. Book: *The Checklist Manifesto* (Gawande, 2009), work `gawande-checklist-manifesto-2009`.
- Learner knows: skilled people rarely make mistakes. / does not know: that across many steps, rare misses multiply into frequent failures, and that catching misses is what a checklist does.
- Misconception: If each step is 99% reliable, the whole job is about 99% reliable.
- Prediction: "A procedure has 20 steps. A skilled team gets each one right 99% of the time. How often is every step right?" options: About 99% / About 90% / About 82% / About 50% (answer: C). Check (node): 0.99^20 = 0.818; with a checklist that catches 9 in 10 misses, 0.999^20 = 0.980; 100 steps at 99%: 0.366.
- Interaction: a steps slider (5–100), a per-step reliability slider (95%–99.9%) and a checklist toggle (illustrative: it catches 9 in 10 misses). A row of step tiles, misses shown in red, and a readout of "every step right". Milestones: (1) 20 steps at 99%; (2) checklist on; (3) 100 steps.
- Reveal (≤ 90): At 20 steps and 99% each, only {p}% of runs got every step right. Small misses multiply. *The Checklist Manifesto* argues that experts fail through missed steps more than through ignorance, and that a short checklist catches them. Does it hold up? Partly: a WHO trial in eight hospitals cut surgical deaths, but a province-wide mandate in Ontario found no clear effect. Checklists work when teams use them, not when they are only required.
- Claims: (1) The book argues that in complex work, failures come from missed steps and that simple checklists reduce them. *The Checklist Manifesto*, ch. 2 "The Checklist" (**unconfirmed**). (2) 0.99^20 ≈ 82% (arithmetic). (3) WHO Surgical Safety Checklist, 8 hospitals: deaths 1.5% → 0.8% (Haynes et al., 2009, *NEJM* 360(5)). (4) Ontario, after mandatory adoption: no significant reduction in deaths or complications (Urbach et al., 2014, *NEJM* 370(11)). (5) The 9-in-10 catch rate is the lesson's model (stated).
- Nearest lessons: none on compounded reliability (overlap check to confirm). `also`: none.
- Format: Single card (two sliders and a toggle).
- Multi-card later: card 1 one step, card 2 twenty steps, card 3 the trials.
- Curriculum: primary `books:checklist-steps-compound`; references `[{ "work": "gawande-checklist-manifesto-2009", "chapter": 2, "note": "chapter unconfirmed" }]`.
- Safety: this is about process, not medical advice. No treatment claims on the stage.

### 6. good-call-bad-result · concept: bets-resulting · intro · demand 3
- Strand: business. Book: *Thinking in Bets* (Duke, 2018), work `duke-thinking-in-bets-2018`.
- Learner knows: good decisions usually lead to good results. / does not know: how often a better choice still loses in a single try, so judging by one outcome punishes good decisions.
- Misconception: If it went badly, it was a bad decision.
- Prediction: "20 managers pick a plan that wins 70% of the time; 20 pick one that wins 50%. Each gets one try. Of all the managers whose plan failed, about how many picked the better plan?" options: None of them / About 1 in 10 / About 4 in 10 / About 8 in 10 (answer: C). Check (node): expected failures 6 and 10, so 6/16 = 37.5%. 100 seeded seasons (mulberry32, seed 7) give 36.2%.
- Interaction: "Run one season" and "Run 100 seasons" (seeded, seed disclosed). The 40 managers are shown as tiles (better plan / worse plan) and turn red on failure. A readout of "failures that picked the better plan". Milestones: (1) one season; (2) 100 seasons.
- Reveal (≤ 90): Of the failures you saw, {share}% had picked the better plan. Fire everyone who failed, and you fire good decisions too. *Thinking in Bets* calls judging a choice by its result "resulting", and argues that decisions are bets made under uncertainty. Does it hold up? Psychologists have documented this outcome bias since the 1980s: the same choice is rated worse when it turns out badly.
- Claims: (1) The book argues that judging decisions by outcomes ("resulting") confuses luck with decision quality. *Thinking in Bets*, ch. 1 "Life Is Poker, Not Chess" (**unconfirmed**). (2) Outcome bias: identical decisions are rated worse after bad outcomes (Baron & Hershey, 1988, *J. Personality and Social Psychology* 54(4)). (3) The 70%/50% plans and the seed are the lesson's model (stated; seed disclosed per `disclose-chosen-seeds`).
- Nearest lessons: probability/coin-gap-keeps-growing (law of large numbers). This lesson is about judging people. `also`: `probability:law-of-large-numbers`.
- Format: Simulation run.
- Multi-card later: card 1 one manager, card 2 one season, card 3 a hundred seasons.
- Curriculum: primary `books:bets-resulting`; references `[{ "work": "duke-thinking-in-bets-2018", "chapter": 1, "note": "chapter unconfirmed" }]`.
- Do not state as fact the book's opening sports anecdote. If it is used, it is a "book argues" claim.

### 7. turkey-day-one-thousand · concept: swan-turkey · intro · demand 3
- Strand: science-history (cm-books-science-history). Book: *The Black Swan* (Taleb, 2007), work `taleb-black-swan-2007`.
- Learner knows: more evidence means more confidence. / does not know: that confidence built from a past that never contained the rare event is highest just before it.
- Misconception: A thousand safe days make the next day safer.
- Prediction: "A turkey is fed every day and, each day, grows more sure it is safe. On which day is it most confident?" options: Day 1 / Around day 500 / Day 1,000, the day before the holiday (answer: C). Check (node): with Laplace's rule, P(safe tomorrow) = (n+1)/(n+2), which is 0.667 on day 1, 0.998 on day 500 and 0.999 on day 1,000. It rises every day.
- Interaction: a day slider (1–1,001) and a Step button. A confidence curve and a "safe days seen" counter. Step past day 1,000 and the curve breaks: an event the data never contained. Milestones: (1) reach day 1,000; (2) step to 1,001.
- Reveal (≤ 90): The turkey's confidence peaked at {conf} on day 1,000, the day before. Every safe day was real evidence, and none of it was about the one day that mattered. *The Black Swan* uses this to argue that the past can't warn you about an event it never contained. Does it hold up? It is a logical point, not a finding: the old problem of induction, which Bertrand Russell told with a chicken in 1912.
- Claims: (1) The book argues, with the turkey example, that rare high-impact events are invisible in past data. *The Black Swan*, ch. 4 "One Thousand and One Days, or How Not to Be a Sucker" (**unconfirmed**). (2) The example adapts Russell's chicken. Russell (1912), *The Problems of Philosophy*, ch. 6 "On Induction" (public domain; confirm the wording in our own words only). (3) Laplace's rule of succession is the lesson's model of the turkey's confidence (stated).
- Nearest lessons: probability/heavy-tails and chemistry/half-life ("Are the survivors next in line?"). Neither covers induction. `also`: none.
- Format: Storyboard / scrub (day slider plus Step).
- Multi-card later: card 1 the feeding days, card 2 the confidence curve, card 3 day 1,001.
- Curriculum: primary `books:swan-turkey`; references `[{ "work": "taleb-black-swan-2007", "chapter": 4, "note": "chapter unconfirmed" }]`.
- Tone: keep the turkey's fate off-stage (a curve break and a calendar mark), not a drawing of slaughter.

### 8. total-signups-hide-the-slide · concept: lean-vanity-metrics · intro · demand 3
- Strand: business. Book: *The Lean Startup* (Ries, 2011), work `ries-lean-startup-2011`.
- Learner knows: a rising chart is good news. / does not know: that a cumulative total rises whatever happens, so it can't tell you whether each month is getting better or worse.
- Misconception: Total customers going up every month means the product is improving.
- Prediction: "A startup's total customers rose every month for six months, with the same number of visitors each month. What happened to the share of each month's visitors who became customers?" options: It rose / It stayed the same / It fell / The total can't tell you (answer: D). Check (node): 1,000 visitors a month converting at 10, 9, 8, 7, 6 and 5% gives 100, 90, 80, 70, 60 and 50 new customers; cumulative 100, 190, 270, 340, 400, 450, rising every month while conversion fell.
- Interaction: a chart toggle (cumulative total / each month's cohort) and a "this month's change" control that sets each new cohort's conversion (better / same / worse). The cumulative line rises in all three cases. Milestones: (1) cohort view; (2) set "worse" and see the cumulative still rise.
- Reveal (≤ 90): Your total kept climbing even when each month converted worse: {conv}% by month six. A running total can't fall, so it can't tell you whether anything is working. *The Lean Startup* calls numbers like this vanity metrics and argues for cohorts and experiments instead. Does it hold up? The arithmetic is certain. One randomised trial with 116 startups found that teams taught to test ideas this way earned more.
- Claims: (1) The book argues that cumulative totals are vanity metrics and that cohort analysis shows real progress. *The Lean Startup*, ch. 7 "Measure" (**unconfirmed**). (2) The numbers are the lesson's model (stated). (3) An RCT of 116 Italian startups: training in a scientific, test-your-hypotheses approach led to more pivots and higher revenue (Camuffo, Cordova, Gambardella & Spina, 2020, *Management Science* 66(2); to confirm).
- Nearest lessons: probability/data-literacy strand (axis and chart lessons; overlap check to confirm). This lesson is about cumulative versus per-period numbers. `also`: none.
- Format: Before / after toggle (cumulative → cohort; the cohort view persists into the reveal).
- Multi-card later: card 1 total, card 2 cohorts, card 3 the trial.
- Curriculum: primary `books:lean-vanity-metrics`; references `[{ "work": "ries-lean-startup-2011", "chapter": 7, "note": "chapter unconfirmed" }]`.
- Options are worded at the same precision. "The total can't tell you" is an answer the learner can hold. It is not a trick.

### 9. four-income-levels · concept: fact-gap-instinct · intro · demand 3
- Strand: science-history. Book: *Factfulness* (Rosling, Rosling & Rosling Rönnlund, 2018), work `rosling-factfulness-2018`.
- Learner knows: the world has rich and poor countries. / does not know: that most people live in between, so "developed vs developing" hides the majority.
- Misconception: The world splits into two camps, a poor majority and a rich minority.
- Prediction: "Split the world's 7 billion people (2017) into four income levels, from under $2 a day to over $32. Where do most people live?" options: Level 1, the poorest / Levels 2 and 3, the middle / Level 4, the richest (answer: B). Check (node): the book's figures of about 1, 3, 2 and 1 billion give 5 of 7, or 71%, in levels 2–3.
- Interaction: a toggle between "two boxes" (developing / developed) and "four levels". Seven person icons, one per billion, move into place. Tap a level to see its daily-income range and count. Milestones: (1) four levels; (2) tap level 2 and level 3.
- Reveal (≤ 90): {mid} of the 7 billion icons sat in the middle two levels. In two boxes they vanished into "developing". *Factfulness* calls this the gap instinct: we picture two groups with a gap between them when most people are in the gap. Does it hold up? World Bank data show the same middle-heavy picture. Critics argue the poverty lines are set too low, which changes the counts but not the shape.
- Claims: (1) The book argues that the "rich vs poor" split is a misconception and that most people live at middle income levels. *Factfulness*, ch. 1 "The Gap Instinct" (**unconfirmed**). (2) The book's four levels and their 2017 populations (about 1, 3, 2 and 1 billion; thresholds $2, $8 and $32 a day). Same chapter (**unconfirmed**; the fact-checker confirms the figures against the book). (3) Extreme poverty was about 9% of the world in 2019 (World Bank, Poverty and Inequality Platform, $2.15/day 2017 PPP; to confirm). (4) Contested: higher poverty lines give larger poor counts (Hickel, 2016, "The true extent of global poverty and hunger", *Third World Quarterly* 37(5); to confirm).
- Nearest lessons: geography/population-distribution and probability/small-gap-big-extremes. This lesson is about how a category hides a distribution. `also`: none.
- Format: Before / after toggle (two boxes → four levels).
- Multi-card later: card 1 two boxes, card 2 four levels, card 3 the debate.
- Curriculum: primary `books:fact-gap-instinct`; references `[{ "work": "rosling-factfulness-2018", "chapter": 1, "note": "chapter unconfirmed" }]`.
- International: income thresholds are PPP dollars. Localizers keep them in dollars, with a note.

### 10. more-people-later-project · concept: mmm-brooks-law · intro · demand 3
- Strand: business. Book: *The Mythical Man-Month* (Brooks, 1975), work `brooks-mythical-man-month-1975`.
- Learner knows: more people finish work faster. / does not know: that newcomers cost veterans' time while they learn, and that each extra person adds talking overhead, so late in a project help arrives too slowly to pay back.
- Misconception: Doubling the team always gets a late project done sooner.
- Prediction: "Four people have 3 months of work left. You add 4 more, who need 2 months to learn the project, each taking up half a veteran's time. When does it finish?" options: Sooner than 3 months / About 3 months / Later than 3 months (answer: C). Check (node, the lesson's model): each person's output is 1 − 0.04 × (n − 1). This gives 3.53 months with 3 months left, and 9.03 instead of 12 with 12 months left. Break-even is near 4.4 months left.
- Interaction: an "add people" control (0, 2, 4, 6) and a "months of work left" slider (1–12). A Gantt bar shows the planned and actual finish, with the training months shaded, and a readout of the talking pairs, n(n−1)/2. Milestones: (1) add 4 with 3 months left, which finishes later; (2) slide to 12 months left, which finishes sooner.
- Reveal (≤ 90): With 3 months left, adding 4 people pushed the finish to {f} months: training ate the veterans' time, and 8 people have {pairs} pairs to keep in sync. With 12 months left, the same help paid off. *The Mythical Man-Month* states this as Brooks's law. Does it hold up? As a rule of thumb for late projects, often yes. Brooks himself later called it a simplification: it depends on how late you are and how well the work splits.
- Claims: (1) The book argues that adding people to a late software project makes it later, because of training and communication costs. *The Mythical Man-Month*, ch. 2 "The Mythical Man-Month" (**unconfirmed**). Optional quote: Brooks's law in its one-line form, attributed, with the exact wording confirmed by the fact-checker. (2) Talking pairs, n(n−1)/2 (arithmetic). (3) Brooks later called the law an oversimplification. 20th anniversary ed. (1995), ch. 18 or 19 (**unconfirmed**; wording to confirm, paraphrase only). (4) The productivity model is illustrative (stated).
- Nearest lessons: economics/kitchen-crowding (diminishing returns). This lesson adds the ramp-up cost and the timing. `also`: `economics:diminishing-returns`, if the fact-checker agrees the concept fits.
- Format: Single card (Gantt bar, two controls).
- Multi-card later: card 1 pairs grow, card 2 ramp-up, card 3 the timing.
- Curriculum: primary `books:mmm-brooks-law`; references `[{ "work": "brooks-mythical-man-month-1975", "chapter": 2, "note": "chapter unconfirmed" }]`.

### 11. cheap-upstart-catches-up · concept: innovators-overshoot-crossing · intro · demand 3
- Strand: business. Book: *The Innovator's Dilemma* (Christensen, 1997), work `christensen-innovators-dilemma-1997`.
- Learner knows: better products win. / does not know: that a product far behind but improving faster crosses what customers need, while the leader overshoots it.
- Misconception: A newcomer that starts far behind can't catch up in time to matter.
- Prediction: "Customers need 100 units of performance, and that need grows 10% a year. A cheap newcomer starts at 20 and improves 50% a year. When does it meet the need?" options: Never: it starts too far behind / In about 5 years / In about 15 years (answer: B). Check (node): 20 × 1.5^t = 100 × 1.1^t gives t = ln 5 / ln(1.5/1.1) = 5.19 years. The incumbent (150, +30% a year) is at 3.46× the need by year 5.
- Interaction: a year slider (0–10), a log-scale toggle, and the newcomer's yearly improvement (30 / 50 / 70%). Three lines: need, incumbent and newcomer. The "good enough" crossing point is marked once reached. Milestones: (1) reach the crossing; (2) log scale, where the lines become straight.
- Reveal (≤ 90): The newcomer met the need in year {t}, while the leader was already {k}× past what customers could use. *The Innovator's Dilemma* argues that great firms lose this way: by serving their best customers well while a cheaper product gets good enough. Does it hold up? It is contested: a 2015 check of the theory's own cited cases found few that fit all of its conditions.
- Claims: (1) The book argues that established firms fail when a cheaper technology, improving faster, becomes good enough for mainstream customers. *The Innovator's Dilemma*, Introduction and ch. 1 "How Can Great Firms Fail? Insights from the Hard Disk Drive Industry" (**unconfirmed**). (2) Contested: of 77 cases cited as disruption, few matched all four of the theory's elements (King & Baatartogtokh, 2015, *MIT Sloan Management Review* 57(1), "How useful is the theory of disruptive innovation?"; the count to confirm). (3) The growth rates are the lesson's model (stated).
- Nearest lessons: economics/growth-rate-gap. This lesson adds the need line and overshoot. Prerequisite: `economics:growth-rate-gap`.
- Format: Single card (chart with slider and toggle).
- Multi-card later: card 1 overshoot, card 2 the newcomer, card 3 the debate.
- Curriculum: primary `books:innovators-overshoot-crossing`; also `economics:growth-rate-gap`; references `[{ "work": "christensen-innovators-dilemma-1997", "chapter": 1, "note": "chapter unconfirmed" }]`.

### 12. lose-100-win-what · concept: tfs-loss-aversion · intro · demand 3
- Strand: psychology. Book: *Thinking, Fast and Slow*, work `kahneman-thinking-fast-slow-2011` (the book's second idea in this cycle is allowed because it is a different idea, and the book will have at most 2 lessons in review).
- Learner knows: a fair coin flip for equal stakes is fair. / does not know: that most people refuse it, and want to win about twice what they might lose.
- Misconception: People accept a bet once the prize is a bit bigger than the loss.
- Prediction: "Tails, you lose $100. What is the smallest heads prize that most people need before they accept the flip?" options: $100 / $120 / About $200 / $500 (answer: C). Check (node, the lesson's crowd): 20 people with loss-aversion ratios from 1.1 to 4.0 (median 2.0); 1 of 20 accepts at $120 and 11 of 20 at $200.
- Interaction: a prize slider ($100–$500). A crowd of 20 tiles, each accepting or refusing according to its own ratio. A value curve that bends more steeply for losses, with a toggle between "equal weights" and "losses count double". Milestones: (1) the prize at $120; (2) the prize at $200; (3) the toggle.
- Reveal (≤ 90): At ${x}, {k} of 20 accepted. Most needed a prize near twice the loss. *Thinking, Fast and Slow* argues that losses loom larger than gains, a core part of prospect theory. Does it hold up? The average ratio of about 2 holds up in large reviews, but it varies a lot by stakes and setting, and for small everyday amounts it is often weaker.
- Claims: (1) The book argues that losses weigh more than equal gains, and that people typically demand roughly twice the potential loss in a 50/50 bet. *Thinking, Fast and Slow*, ch. 26 "Prospect Theory" (**unconfirmed**). (2) A meta-analysis of hundreds of loss-aversion estimates puts the mean near 2 (Brown, Imai, Vieider & Camerer, 2024, *J. Economic Literature* 62(2), "Meta-analysis of empirical estimates of loss aversion"; the value to confirm). (3) Contested scope: Gal & Rucker (2018), *J. Consumer Psychology* 28(3), "The loss of loss aversion". (4) The crowd's ratios are the lesson's model (stated).
- Nearest lessons: probability/capped-doubling-game (expected value). This lesson is about why people refuse a positive-value bet. Prerequisite: `probability:expected-value`.
- Format: Single card (slider, crowd, curve).
- Multi-card later: card 1 the bet, card 2 the crowd, card 3 the curve and the evidence.
- Curriculum: primary `books:tfs-loss-aversion`; references `[{ "work": "kahneman-thinking-fast-slow-2011", "chapter": 26, "note": "Prospect Theory; chapter unconfirmed" }]`.
- No investment framing ("so you should…"). The lesson is about how people choose.

## Next in line (cycle 2, no brief yet)
Demand 3 concepts with no brief: `ggs-continental-axes` (map work; geography's map kit), `fact-straight-line` (UN projections), `signal-calibrated-weather` (calibration chart; prerequisite `ai:calibration`), `goal-dependent-fluctuations` (dice game; simulation run), `zero-power-law-returns`, `yes-batna` (overlap with economics `outside-option-sets-the-split` to settle first), `money-time-in-compounding`, `nudge-defaults`, `irrational-decoy` (the "holds up" claim must cite the replication evidence carefully), `influence-social-proof`, `noise-bias-vs-noise`, `outliers-ten-thousand-hours`.
