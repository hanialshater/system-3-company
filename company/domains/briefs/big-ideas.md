# Big Ideas: ranked lesson briefs (cycle 1, first 12)

owner: cm-big-ideas (Dmitri) · drafted 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request, for cm-big-ideas and the strand managers to re-check (board) · curriculum: `content/curriculum/big-ideas.json` · charter: `company/domains/big-ideas.md` · answer checks: `node company/domains/briefs/checks/big-ideas-cycle1-check.mjs` (all 12 pass, 2026-10-14)

Ranked briefs for `tools/claim.mjs next big-ideas`, in the same format as the other briefs files (`### N. slug · concept: <id> · level · demand N`). Strand lists (`big-ideas.<strand>.md`) come after this one.

**Read before building any of these:**
- **The strong form is sourced or flagged** (charter). Every reveal ends with where the idea stops working, and that sentence is a claim.
- **Subject first.** Each brief names the subject lesson that already teaches the mechanism, and says what this lesson adds. Do not re-build the subject lesson.
- **Sources** were not opened from this host. Each is the drafter's citation for the fact-checker to confirm, and "(to confirm)" marks a detail that is uncertain.
- **Why these 12.** Ten are demand 3 and two are demand 2, four per strand. Each idea overturns a default view with a prediction the learner can get wrong and then check on the stage. Ranking: demand, then the size of the shift in view, then how well it shows on a phone, then low overlap.

### 1. two-four-six-rule · concept: falsification-2-4-6 · intro · demand 3
- Strand: mind (cm-big-ideas-mind).
- Learner knows: evidence that fits your idea supports it. / does not know: that tests chosen to fit your idea can't tell it apart from a broader one, and that a test which could prove you wrong tells you more.
- Misconception: Three examples that fit my rule show my rule is right.
- Prediction: "The numbers 2, 4, 6 fit a secret rule. You guess 'add 2 each time' and test 8-10-12, 20-22-24 and 1-3-5: all fit. Will 1-2-10, which breaks 'add 2', fit the secret rule?" options: No, it breaks the pattern / Yes (answer: B). Check (node): the hidden rule is "any three increasing numbers". 1-2-10 fits; 6-4-2 does not; the three +2 triples fit both rules.
- Interaction: three number steppers and a Test button. A log of tested triples, each marked fits / doesn't fit, and a "your guess" label (+2). Milestones: (1) test a triple that breaks +2 and fits; (2) test a triple that doesn't fit (for example a decreasing one).
- Reveal (≤ 90): Your +2 tests all fit, but they fit "any increasing numbers" just as well, so they couldn't tell the two apart. {triple} broke your guess and still fit: that one test taught you more than the rest. Karl Popper argued that a claim is scientific when a test could prove it false. Where it stops: testing cases that fit is often a sensible strategy. It fails here because the true rule is broader than the guess.
- Claims: (1) Wason's task: most participants announced a wrong, too-narrow rule at first (Wason, 1960, "On the failure to eliminate hypotheses in a conceptual task", *Quarterly J. Experimental Psychology* 12(3); counts to confirm). (2) Popper's falsifiability criterion (Popper, 1959, *The Logic of Scientific Discovery*, English ed.; to confirm the section). (3) Limit: a positive test strategy is often rational; it fails when the true rule is broader than the hypothesis (Klayman & Ha, 1987, *Psychological Review* 94(2)).
- Nearest lessons: none found on hypothesis testing (overlap check to confirm). `also`: none.
- Format: Single card (steppers and a log).
- Curriculum: primary `big-ideas:falsification-2-4-6`.
- QA: the steppers must start on a triple that fits, and the first DOM-order presses must be able to reach a breaking-but-fitting triple (for example the third stepper +1 several times gives 2-4-7).

### 2. earth-history-in-a-day · concept: deep-time · intro · demand 3
- Strand: science (cm-big-ideas-science).
- Learner knows: Earth is very old and humans came late. / does not know: how late, which is the last few seconds of a day, and that this scale is what lets slow processes (erosion, drifting continents, evolution) do large things.
- Misconception: Humans have been around for a meaningful part of Earth's history.
- Prediction: "Squeeze Earth's 4.5 billion years into one day, starting at midnight. When do modern humans appear?" options: About 6:00 pm / About 11:30 pm / About 11:59:54 pm (answer: C). Check (node): 300,000 / 4.54 billion × 86,400 s = 5.7 s before midnight (23:59:54). The dinosaurs' end, 66 million years ago, falls at 23:39. Writing, about 5,200 years ago, is 0.1 s before midnight. Early life, about 3.7 billion years ago, is about 04:26.
- Interaction: a 24-hour dial with a time slider and a zoom control (whole day / last hour / last minute). Events light up as the slider passes them. Milestones: (1) find the end of the dinosaurs; (2) zoom to the last minute and find humans.
- Reveal (≤ 90): Humans appeared at {time}, a few seconds before midnight, and all of written history fits in the last tenth of a second. Geologists in the 1700s and 1800s realised that slow processes, given this much time, carve canyons and move continents. Where it stops: the clock shows scale, not how fast change happens. Some changes (an asteroid impact) were sudden.
- Claims: (1) Earth is about 4.54 billion years old (Dalrymple, 2001, "The age of the Earth in the twentieth century: a problem (mostly) solved", *Geological Society, London, Special Publications* 190). (2) The oldest Homo sapiens fossils are about 300,000 years old (Hublin et al., 2017, *Nature* 546). (3) The end-Cretaceous extinction was about 66 million years ago (Renne et al., 2013, *Science* 339(6120)). (4) Writing dates to about 3200 BCE (cuneiform; source for the fact-checker, e.g. a museum or encyclopedia entry). (5) The earliest evidence of life is about 3.5–3.7 billion years old, which is debated (to confirm the source). (6) Deep time as an idea: James Hutton, *Theory of the Earth* (1788). Optional public-domain line; paraphrase is preferred.
- Nearest lessons: geography/fingernail-ocean (plate speed). This lesson adds the timescale that makes slow speeds matter. Prerequisite: `geography:plate-motion-rates`.
- Format: Storyboard / scrub (time slider with zoom).
- Curriculum: primary `big-ideas:deep-time`.

### 3. ten-times-taller-giant · concept: square-cube-giants · intro · demand 3
- Strand: science.
- Learner knows: a bigger animal is stronger. / does not know: that weight grows with the cube of size but bone strength only with the square, so a scaled-up body crushes itself.
- Misconception: A giant built exactly like a person, just 10 times larger, would be just as sturdy.
- Prediction: "Scale a person up 10 times in every direction, same shape and same bone. How much more load does each square centimetre of leg bone carry?" options: The same / 10 times / 100 times / 1,000 times (answer: B). Check (node): weight ×1,000, bone cross-section ×100, stress ×10.
- Interaction: a scale slider (1× to 10×). The figure grows, with three readouts (weight ×k³, bone area ×k², stress ×k) and a stress bar against an illustrative "bone breaks" line. A toggle: "same shape" / "thicker legs" (elephant-like), where bone diameter grows as k^1.5 and stress stays flat. Milestones: (1) reach 10×; (2) the thicker-legs toggle.
- Reveal (≤ 90): At 10× the giant weighed {w}× as much but its bones were only {a}× as thick in cross-section, so each square centimetre carried {s}× the load. Galileo argued in 1638 that giants need disproportionately thick bones. Where it stops: real animals change shape and posture as they grow, which keeps bone stress roughly level across mammals.
- Claims: (1) Galileo's argument (Galileo, 1638, *Two New Sciences*, Second Day; public domain; section to confirm). (2) Weight ∝ k³, cross-section ∝ k² (geometry; prerequisites). (3) Limit: large mammals keep peak bone stress similar mainly through more upright limb posture (Biewener, 1989, *Science* 245(4913), "Scaling body support in mammals"). (4) The breaking line and the thicker-legs exponent are illustrative (stated).
- Nearest lessons: math lessons on area and volume scaling, and life/metabolic-scaling. This lesson adds the load that limits body size. Prerequisites: `math:area-scaling`, `math:volume-scaling`.
- Format: Single card (slider and toggle).
- Curriculum: primary `big-ideas:square-cube-giants`; also `math:volume-scaling`.

### 4. noise-draws-dunning-kruger · concept: dunning-kruger-artifact · core · demand 3
- Strand: mind.
- Learner knows (from pop science): the least skilled are the most overconfident. / does not know: that self-estimates with no link to skill at all already produce the famous chart, so the chart alone can't prove the effect.
- Misconception: The Dunning–Kruger chart shows that incompetent people are uniquely blind to their incompetence.
- Prediction: "1,000 people take a test, then guess their percentile, and their guesses are pure random noise, unrelated to their scores. Grouped by actual score, what does the bottom quarter guess on average?" options: About the 12th percentile, like their scores / About the 50th percentile / About the 88th percentile (answer: B). Check (node, seed 42): actual quartile means are 12.5, 37.5, 62.5 and 87.5; guessed means are 49.2, 50.7, 52.3 and 51.5. With guesses that track skill at 0.3, plus noise and a +15 "better than average" shift, the bottom quarter guesses 53 against 12.5.
- Interaction: a "how much guesses track real skill" slider (0 to 1) and a "better than average shift" toggle (+15). The stage is the classic two-line chart (actual vs perceived by quartile), seeded with the seed disclosed. Milestones: (1) tracking 0, which gives the classic X shape; (2) tracking 1, where the lines meet; (3) the shift on.
- Reveal (≤ 90): With guesses that were pure noise, the bottom quarter still "thought" it was at about the {g}th percentile: the famous pattern from randomness alone. Kruger and Dunning's 1999 chart had this shape. Is the effect real? It is contested: several analyses argue that most of it is a statistical artefact, while others find a smaller real effect. Before you believe a striking chart, ask what noise would draw.
- Claims: (1) In Kruger & Dunning (1999), the bottom-quartile participants estimated themselves well above their actual percentile ("Unskilled and unaware of it", *J. Personality and Social Psychology* 77(6); the figures to confirm). (2) Random-number simulations reproduce the pattern (Nuhfer et al., 2016, *Numeracy* 9(1)). (3) "Mostly a statistical artefact" (Gignac & Zajenkowski, 2020, *Intelligence* 80). (4) Not settled: a rational-inference model with a smaller real effect (Jansen, Rafferty & Griffiths, 2021, *Nature Human Behaviour* 5; to confirm). (5) The simulation is the lesson's model (seed disclosed).
- Nearest lessons: probability/praise-then-slump (regression to the mean). This lesson applies it to a famous claim. Prerequisite: `probability:regression-to-mean`.
- Format: Simulation run (seeded).
- Curriculum: primary `big-ideas:dunning-kruger-artifact`; also `probability:regression-to-mean`.
- Tone: no "stupid people" framing. The subject is the chart, not a type of person.

### 5. efficient-lamps-more-power · concept: jevons-paradox · intro · demand 3
- Strand: society (cm-big-ideas-society).
- Learner knows: more efficient devices save energy. / does not know: that efficiency makes each use cheaper, people use more, and if they use enough more, total consumption rises.
- Misconception: Twice as efficient means half the energy.
- Prediction: "Lamps become twice as efficient, so each hour of light costs half as much. In this town, when light costs half, people use 3 times as much. Total electricity for lighting?" options: Half as much / About the same / 1.5 times as much (answer: C). Check (node): 3 / 2 = 1.5. This is an elasticity of 1.58. At elasticity 0.5 the result is ×0.71, and at 1.5 it is ×1.41, so backfire happens only above 1.
- Interaction: an efficiency control (1×, 2×, 4×) and a "how much more light when it's cheaper" slider (elasticity 0 to 2). Bars for light used, energy per hour and total energy. Milestones: (1) 2× efficiency at the town's response; (2) slide the response below 1, where savings appear.
- Reveal (≤ 90): Light got {e}× more efficient and the town used {q}× more light, so total electricity went to {E}×. William Jevons noticed this with coal in 1865: better steam engines made coal cheaper to use, and Britain burned more. Where it stops: for most household energy today the rebound is partial, so efficiency still saves energy, just less than the label says. Lighting over centuries is a case where use exploded.
- Claims: (1) Jevons (1865), *The Coal Question*, ch. 7 "Of the Economy of Fuel" (public domain; chapter to confirm). (2) Direct rebound for household energy services is usually partial, often below 30% (Sorrell, Dimitropoulos & Sommerville, 2009, *Energy Policy* 37(4)). (3) In the UK, use of lighting rose enormously as its price fell over centuries (Fouquet & Pearson, 2006, *The Energy Journal* 27(1), "Seven centuries of energy services: the price and use of light in the United Kingdom (1300–2000)"). (4) The town's response is the lesson's model (stated).
- Nearest lessons: economics/salt-and-concert-tickets (price elasticity). This lesson adds efficiency as a price cut. Prerequisite: `economics:price-elasticity`.
- Format: Single card (control, slider, bars).
- Curriculum: primary `big-ideas:jevons-paradox`; also `economics:price-elasticity`.
- No policy conclusion. Do not state "efficiency standards don't work".

### 6. one-ten-thousandth-apart · concept: chaos-butterfly · intro · demand 3
- Strand: science.
- Learner knows: an exact rule gives exact predictions. / does not know: that in a chaotic system a tiny difference in the start roughly doubles each step, so precision buys only a few more steps of forecast.
- Misconception: If the rule is known exactly, a tiny measurement error stays tiny.
- Prediction: "Run the same exact rule, x → 4x(1 − x), from 0.3 and from 0.3001. After 30 steps, how far apart are the two runs?" options: Still about 0.0001 apart / About 0.01 apart / As far apart as two random numbers (answer: C). Check (node): the gap first exceeds 0.1 at step 11 and is 0.616 at step 30. Start gaps of 1e-4, 1e-5, 1e-6 and 1e-7 diverge at steps 11, 15, 18 and 21.
- Interaction: Step and Run (30 steps) buttons and a start-gap control (1e-1 to 1e-7). Two traces on one chart, with a readout of "steps until they differ by 0.1". Milestones: (1) run to 30 steps; (2) shrink the gap 1,000×, which buys only a few more steps.
- Reveal (≤ 90): The two runs agreed for about {n} steps, then wandered apart like strangers. Making the start 1,000 times more precise bought only {extra} more steps. Edward Lorenz found this in a weather model in 1963: sensitive dependence on initial conditions. Where it stops: chaos limits forecasting a particular day, not the long-run averages. It is why weather forecasts fade after about two weeks while climate can still be projected.
- Claims: (1) Lorenz (1963), "Deterministic nonperiodic flow", *J. Atmospheric Sciences* 20(2). (2) The logistic map at r = 4 is chaotic (a standard result, e.g. Strogatz, *Nonlinear Dynamics and Chaos*, 2nd ed., ch. 10; to confirm). (3) Midlatitude weather has a practical predictability limit of about two weeks (Zhang et al., 2019, *J. Atmospheric Sciences* 76(4); to confirm). (4) The starting values are the lesson's choice (stated).
- Nearest lessons: none on chaos (overlap check to confirm). `also`: none.
- Format: Simulation run (deterministic; Step plus Run).
- Curriculum: primary `big-ideas:chaos-butterfly`.

### 7. deaths-fall-births-wait · concept: demographic-transition · intro · demand 3
- Strand: society.
- Learner knows: population booms come from high birth rates. / does not know: that booms come mostly from death rates falling first while birth rates stay high, and that the length of that lag decides how big the population gets.
- Misconception: Rapid population growth means families started having more children.
- Prediction: "In a model country, deaths fall from 30 to 10 per 1,000 people over 50 years. Births stay at 40 for a while, then fall to 10 over 50 years. If births start falling 75 years in instead of 25, how much bigger does the final population get?" options: About the same / About 1.5 times bigger / About 4 times bigger (answer: C). Check (node): ×2.71 with a 25-year lag, ×11.89 with a 75-year lag, a ratio of 4.39.
- Interaction: a "births start falling in year" slider (0–100). A chart of birth rate and death rate, with the gap shaded, and a population curve beside it. Milestones: (1) a 25-year lag; (2) a 75-year lag.
- Reveal (≤ 90): The boom came from the shaded gap: deaths fell while births had not yet. With a 75-year lag the population ended {r}× bigger than with 25. Demographers call this the demographic transition, and most countries have gone through some version of it. Where it stops: it is a pattern, not a law. Timing and speed differ a lot between countries, and populations keep growing for years after births fall, because of their young age structure.
- Claims: (1) The demographic transition model (Notestein, 1945, "Population: the long view", in Schultz (ed.), *Food for the World*; to confirm). (2) The world population is projected to peak in the mid-2080s at about 10.3 billion (UN DESA, *World Population Prospects 2024*). (3) Limit: transitions vary in timing and pace, and population momentum continues growth after fertility falls (UN DESA or a demography text; to confirm). (4) The rates are the lesson's model (stated).
- Nearest lessons: life/logistic-growth (S-curves) and geography/population-distribution. This lesson adds births and deaths as two separate rates. Prerequisite: `life:logistic-growth`.
- Format: Single card (slider; two linked charts in one picture).
- Curriculum: primary `big-ideas:demographic-transition`.
- Tone: no ranking of countries or cultures. A model country only.

### 8. same-grey-in-shadow · concept: perception-inference-shadow · intro · demand 3
- Strand: mind.
- Learner knows: we see the colours that are there. / does not know: that the brain estimates surface colour by discounting the lighting, so the same light from the screen can look like two different greys.
- Misconception: If two squares look different, they are different on the screen.
- Prediction: "On a checkerboard, square A is in the light and looks dark; square B is in a shadow and looks light. On the screen, which is darker?" options: A / B / Neither: they are the same (answer: C). Check (node): both squares are drawn from one colour constant (#787878 in the check; the builder uses one CSS variable for both).
- Interaction: a "connect them" toggle that draws a strip of the same grey between A and B, a "remove the shadow" toggle, and a sampler (tap a square to read its value). Milestones: (1) sample both squares; (2) remove the shadow.
- Reveal (≤ 90): Your sampler read {v} on both squares: the same grey on the screen. Your visual system knows that shadows darken surfaces, so it judged B lighter than the light it receives. That is a guess about the world, made before you notice. Hermann von Helmholtz called perception "unconscious inference". Where it stops: in a real scene the guess is usually right, because paper in shadow really is lighter than it looks. The illusion shows the assumption, not a fault.
- Claims: (1) The squares share one value (code; checkable on the stage). (2) Our drawing is original, after Adelson's checker-shadow illusion (Adelson, 1995; described in Adelson, 2000, "Lightness perception and lightness illusions", in Gazzaniga (ed.), *The New Cognitive Neurosciences*, 2nd ed.; to confirm). (3) Helmholtz, *Handbuch der physiologischen Optik* (vol. 3, 1867), unconscious inference (to confirm). (4) Limit: lightness constancy is adaptive in natural scenes (same Adelson chapter; to confirm).
- Nearest lessons: physics/colour-filters (reflected light). This lesson is about perception, not light. `also`: none.
- Format: Before / after toggle (shadow → no shadow; the connecting strip persists into the reveal).
- Curriculum: primary `big-ideas:perception-inference-shadow`.
- Copyright: draw an original scene. Do not trace Adelson's image.
- Theme: the squares' grey must be identical in light and dark mode. Use one variable, not `--fg`.

### 9. colds-clear-without-the-pill · concept: controlled-experiment · intro · demand 3
- Strand: science.
- Learner knows: if people get better after a treatment, it probably worked. / does not know: that many conditions clear up on their own, so without a comparison group a useless treatment looks like a cure.
- Misconception: Most people who took the pill got better, so the pill works.
- Prediction: "100 people with colds take a pill that does nothing. A week later, how many feel better?" options: About 5 / About 30 / Most of them (answer: C). Check (node, seed 3; the lesson's model, about 80% recover within a week): 78 of 100 in the pill group and 82 of 100 in a control group.
- Interaction: "Run the trial" (seeded, seed disclosed), an "add a control group" toggle, and a "true effect of the pill" control (0 / +10 points). Two tile grids (pill, no pill) with recovered tiles filled in. Milestones: (1) run without a control; (2) add the control; (3) set a +10 effect and see the gap appear.
- Reveal (≤ 90): {k} of 100 felt better on a pill that did nothing, because colds clear up anyway. Only the control group showed that the pill added {d} points. A comparison group is how medicine learned to tell treatments from time. James Lind's scurvy trial in 1747 is an early example. Where it stops: a control group is not enough on its own. The groups must also be alike, which is why trials assign people at random.
- Claims: (1) Most colds clear within 7–10 days (Heikkinen & Järvinen, 2003, "The common cold", *Lancet* 361(9351); or a CDC page; to confirm). (2) Lind's 1747 comparison of scurvy treatments (Lind, 1753, *A Treatise of the Scurvy*; public domain; to confirm). (3) The recovery rate and the seed are the lesson's model (stated; seed disclosed). (4) Limit: randomisation is needed so the groups are comparable (any trials text; link to `randomised-assignment`).
- Nearest lessons: probability/praise-then-slump (regression to the mean) and probability lessons on confounding. This lesson adds the control group. Prerequisite: `probability:regression-to-mean`.
- Format: Simulation run (seeded).
- Curriculum: primary `big-ideas:controlled-experiment`; also `probability:regression-to-mean`.
- Health: about evidence, not treatment. No product names, no advice about cold remedies.

### 10. tin-price-tells-everyone · concept: price-signals · intro · demand 3
- Strand: society.
- Learner knows: prices go up when things are scarce. / does not know: that a price rise tells every user to economise, and steers the cuts to the users who can switch most cheaply, without anyone knowing why tin is scarce.
- Misconception: When supply falls, everyone has to cut back by the same share, or a planner has to decide who cuts.
- Prediction: "One tin mine closes and supply falls from 60 to 50 tonnes. Six users each use 10 tonnes, and each has a substitute that costs $12, $15, $20, $30, $50 or $80 a tonne. With a market price, who cuts back?" options: Everyone cuts about a sixth / The user with the cheapest substitute stops using tin / The largest user cuts most (answer: B). Check (node): the price rises from $10 to $12.50; the $12-substitute user switches; demand of 50 equals the supply of 50.
- Interaction: a "close a mine" control, a "price on / price off (ration equally)" toggle, and six user tiles showing their substitute costs and usage. A readout of the total extra cost of substitutes (the price system's switch costs vs equal rationing). Milestones: (1) close the mine with the price on; (2) the price off, which rations equally.
- Reveal (≤ 90): The price rose to ${p} and only the user with the ${c} substitute switched: the one for whom giving up tin cost least. Nobody told her about the mine. Friedrich Hayek argued in 1945 that this is what prices do: they pass on knowledge that no single person has. Where it stops: prices carry only what is traded, so pollution and other side effects stay invisible, and a market with one seller can distort the signal.
- Claims: (1) Hayek (1945), "The use of knowledge in society", *American Economic Review* 35(4) (the tin example). (2) Limit: externalities are not priced (any principles text, e.g. Mankiw, *Principles of Economics*, the externalities chapter; to confirm). (3) The users and costs are the lesson's model (stated).
- Nearest lessons: economics/prices-sort-the-buyers (market clearing) and economics/pay-for-the-harm-you-do (externalities). This lesson is about the price as information. Prerequisite: `economics:market-clearing-prices`.
- Format: Before / after toggle (price off → price on).
- Curriculum: primary `big-ideas:price-signals`; also `economics:market-clearing-prices`.

### 11. quartet-gets-pricier · concept: baumol-cost-disease · core · demand 2
- Strand: society.
- Learner knows: things get pricier because of inflation or greed. / does not know: that services whose productivity can't rise get relatively pricier, because their wages must keep up with sectors whose productivity does.
- Misconception: Haircuts and concerts get more expensive because those trades are getting greedier or less efficient.
- Prediction: "Factories get 3% more productive each year. A string quartet still needs four players and 40 minutes. Wages rise with factory productivity in both. After 50 years, how much has the concert's price risen compared with factory goods?" options: Not at all / About 1.5 times / About 4.4 times (answer: C). Check (node): 1.03^50 = 4.38.
- Interaction: a year slider (0–50) and a factory productivity growth control (1 / 2 / 3%). Two price lines (a factory good, a concert ticket), relative to year 0, and a "concert / goods" ratio readout. Milestones: (1) reach year 50 at 3%; (2) change the growth rate.
- Reveal (≤ 90): After 50 years the concert cost {r}× more relative to factory goods, and the quartet was no worse at its job. Musicians' wages rose with everyone else's, while factories got cheaper per item. William Baumol and William Bowen described this in 1966. It helps explain why education, healthcare and haircuts take a growing share of spending. Where it stops: some services do gain productivity, such as recorded music and online lessons.
- Claims: (1) Baumol & Bowen (1966), *Performing Arts: The Economic Dilemma*. (2) Evidence consistent with cost disease in US industry data (Nordhaus, 2008, "Baumol's diseases: a macroeconomic perspective", *B.E. Journal of Macroeconomics* 8(1)). (3) The rates are the lesson's model (stated).
- Nearest lessons: economics/growth-rate-gap (compounding gaps). This lesson adds two sectors with linked wages. Prerequisite: `economics:growth-rate-gap`.
- Format: Single card (slider and chart).
- Curriculum: primary `big-ideas:baumol-cost-disease`.

### 12. where-sally-looks · concept: false-belief-theory-of-mind · intro · demand 2
- Strand: mind.
- Learner knows: people act on what they know. / does not know: that understanding that someone else can hold a false belief is a skill, and that young children typically answer with where the marble really is.
- Misconception: Even a 3-year-old knows Sally will look where she left the marble.
- Prediction: "Sally puts a marble in a basket and leaves. Anne moves it to a box. Sally comes back. Ask a typical 3-year-old: where will Sally look first?" options: In the basket, where she left it / In the box, where it really is (answer: B). Check: the story's logic gives the basket (node check); the answer about children rests on the meta-analysis (claim 2).
- Interaction: three Step buttons that play the story (put, leave and move, return). An "ask at age" control (3 / 4 / 5), which shows the typical answer at that age as described by the meta-analysis. A marker for where the marble is and a thought bubble for where Sally thinks it is. Milestones: (1) play the story through; (2) ask at age 3 and at age 5.
- Reveal (≤ 90): Sally will look in the basket. You knew that because you held two maps at once: where the marble is, and where she thinks it is. Most 3-year-olds point to the box. By about 5, most get it right. Psychologists call this a theory of mind. Where it stops: younger infants may track others' beliefs in looking studies, but those findings have been hard to replicate.
- Claims: (1) The false-belief task (Wimmer & Perner, 1983, *Cognition* 13(1); the Sally–Anne version by Baron-Cohen, Leslie & Frith, 1985, *Cognition* 21(1)). (2) Across studies, most 3-year-olds fail and most 5-year-olds pass (Wellman, Cross & Watson, 2001, *Child Development* 72(3), meta-analysis; ages to confirm). (3) Limit: infant looking-time studies (Onishi & Baillargeon, 2005, *Science* 308) and replication difficulties (Kulke et al., 2018, *Royal Society Open Science*; to confirm).
- Nearest lessons: none on theory of mind (overlap check to confirm). `also`: none.
- Format: Storyboard / scrub (Step buttons; a natural multi-card sequence later).
- Curriculum: primary `big-ideas:false-belief-theory-of-mind`.
- Tone: no claims about autism or any group of children. The Sally–Anne paper is cited only for the task.

## Next in line (cycle 2, no brief yet)
Demand 3 with no brief: `cumulative-selection` (a target-phrase demo of cumulative vs single-step selection; use our own phrase). Demand 2 candidates by strand: science `germ-theory-pump`, `entropy-arrow-of-time`, `fermi-estimation`; society `ostrom-commons-governed`, `path-dependence-lock-in` (Pólya urn; the QWERTY story is contested, so cite Liebowitz & Margolis), `perverse-incentives`; mind `extraordinary-evidence`, `change-blindness`, `veil-of-ignorance` (the prediction must be about the argument, not an opinion).
