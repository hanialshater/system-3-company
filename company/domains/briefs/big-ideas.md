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
- **W-537 re-check (cm-big-ideas, 2026-10-14): PASS with the changes below; these lines override the ones above where they differ.** Numbers in the cycle-1 check script ("W-537 re-check" block).
  - Duplicate search (titles, hooks, misconceptions, objectives of all 941 lessons, plus `tools/overlap.mjs`, Books briefs and works): no lesson on sensitive dependence. Nearest: cs/hailstone-27-climbs (a simple rule runs long; not sensitivity to the start) and ai/line-stops-at-the-edge (extrapolation). Books: none.
  - Strong form, flagged: the popular "a butterfly's wings cause a tornado" is a metaphor, not a finding. The lesson never states it. Verdict (shared words): **holds up** for the map on the stage (derivation).
  - Transfer (≥ 3 domains): weather forecasting, a double pendulum or billiard break, population models (the logistic map comes from ecology).
  - Presets in DOM order (replaces the gap control): "Run 30 steps" (gap 0.0001; milestone `run`, records "differ by 0.1 at step 11") / "1,000× more precise: run" (gap 0.0000001; milestone `precise`, records step 21) / "Average 1,000 steps" (milestone `average`; shows both runs' averages, 0.51 and 0.48) / "Step 1" / Reset. Reveal unlocks after `run` and `precise`.
  - **Where it stops is shown, not told** (strategy D4 a): the two runs disagree at every step, but their long-run averages agree at about 0.5. Support: derivation.
  - Reveal (replaces the draft above; 80 words): "The two runs agreed for {n} steps, then wandered apart like strangers. Making the start 1,000 times more precise bought only {extra} more steps: the gap roughly doubles each step. Edward Lorenz found this in a weather model in 1963. Where it stops: each step was unpredictable, but the long-run averages matched, about {avg} for both. Chaos limits forecasting a particular day, not the average. That is why a forecast fades after days while long-run averages can still be estimated."
  - Held citations: **one**, Lorenz 1963 (claim 1). Cut if not checkable; fallback: "Weather models behave the same way" is also held, so the fallback drops the sentence and the reveal keeps "Mathematicians call this sensitive dependence on initial conditions" (a definition, support: convention). The "about two weeks" figure (claim 3) is removed from the learner path; the forecast sentence carries no number.
  - Transfer recall (answer in the check script): "A forecast's error doubles every day. If today's measurements were 100 times more precise, how much longer would the forecast stay useful?" options: About 7 more days / About 100 times as long / No longer at all (answer: A; log2 100 = 6.6).
  - Exemption criteria (decision Ruling 2): 1 yes (derivation, node check); 2 yes (one held, fallback written); 3 yes (not ⚑, not a sensitive class); 4 yes (Simulation run, catalogued, no CardSequence); 5 yes (W-538 on main in 6340d33; this re-check).
  - Review route: standard (fact-checker, learner-evaluator).
  - Multi-card later: card 1 the two runs, card 2 more precision, card 3 the averages.

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
- **W-537 re-check (cm-big-ideas, 2026-10-14): PASS with the changes below; these lines override the ones above where they differ.** Numbers in the cycle-1 check script ("W-537 re-check" block).
  - Duplicate search (all 941 lessons' titles, hooks, misconceptions and objectives; `tools/overlap.mjs`; Books briefs and works): no lesson on lightness perception or illusions. The "shadow" hits are geometry (math/shadow-height, geography/eratosthenes-shadow, geography/light-in-the-cylinder). physics/light-at-double-distance is about the light itself, not what we see. Books: none.
  - Strong form, flagged: the popular "your eyes can't be trusted" is not what the illusion shows. The lesson says the brain applies an assumption that is usually right. Verdict (shared words): **holds up** for what is on the screen (code is the source).
  - Transfer (≥ 3 domains): photography and white balance, reading an X-ray or a shaded map, colour disputes about a photo (the dress, not named on the card).
  - Presets in DOM order: "Sample A" / "Sample B" (milestone `sampled` after both; the readout shows the value as text, so the answer does not rest on sight alone) / "Connect them" (the strip of the same grey) / "Remove the shadow" (milestone `noshadow`) / Reset. Reveal unlocks after `sampled` and `noshadow`.
  - **Where it stops, by derivation:** light reaching the eye = lighting × how much the surface reflects. A surface in shadow that sends the same light really is lighter, so in a real scene the guess is usually right. Support: derivation (the recall's arithmetic), not the Adelson chapter.
  - Held citations: **one**, Helmholtz's "unconscious inference" (claim 3; 1867, public domain, class P). Cut if not checkable; fallback: "Psychologists call this kind of guess an inference" (no name). The Adelson credit (claim 2) is a caption line, not reveal text: "After a well-known checker-shadow illusion. Our own drawing." If Adelson 1995 is confirmed, the caption may name him. The Adelson limit citation (claim 4) leaves the learner path: the derivation carries the limit.
  - Transfer recall (answer in the check script): "Two sheets of paper send exactly the same light to your camera. One is in shade, one is in sun. Which sheet is whiter?" options: The one in shade / The one in sun / They must be the same (answer: A).
  - Exemption criteria (decision Ruling 2): 1 yes (the answer is on the learner's screen, node check of one constant); 2 yes (one held, fallback written); 3 yes (not ⚑, not a sensitive class); 4 yes (Before / after toggle, catalogued, no CardSequence); 5 yes (W-538 on main in 6340d33; this re-check).
  - Review route: standard, plus a note to the accessibility-reviewer at walkthrough (a visual illusion; the sampler text is the non-visual path).
  - Multi-card later: card 1 the illusion, card 2 the sampler, card 3 the shadow removed.

### 9. colds-clear-without-the-pill · concept: controlled-experiment · intro · demand 3
- Strand: science.
- Learner knows: if people get better after a treatment, it probably worked. / does not know: that many conditions clear up on their own, so without a comparison group a useless treatment looks like a cure.
- Misconception: Most people who took the pill got better, so the pill works.
- Prediction: "100 people with colds take a pill that does nothing. A week later, how many feel better?" options: About 5 / About 30 / Most of them (answer: C). Check (node, seed 3; the lesson's model, about 80% recover within a week): 78 of 100 in the pill group and 82 of 100 in a control group.
- Interaction: "Run the trial" (seeded, seed disclosed), an "add a control group" toggle, and a "true effect of the pill" control (0 / +10 points). Two tile grids (pill, no pill) with recovered tiles filled in. Milestones: (1) run without a control; (2) add the control; (3) set a +10 effect and see the gap appear.
- Reveal (≤ 90): {k} of 100 felt better on a pill that did nothing, because colds clear up anyway. Only the control group showed that the pill added {d} points. A comparison group is how medicine learned to tell treatments from time. James Lind's scurvy trial in 1747 is an early example. Where it stops: a control group is not enough on its own. The groups must also be alike, which is why trials assign people at random.
- Claims: (1) Most colds clear within 7–10 days (Heikkinen & Järvinen, 2003, "The common cold", *Lancet* 361(9351); or a CDC page; to confirm). (2) Lind's 1747 comparison of scurvy treatments (Lind, 1753, *A Treatise of the Scurvy*; public domain; to confirm). (3) The recovery rate and the seed are the lesson's model (stated; seed disclosed). (4) Limit: randomisation is needed so the groups are comparable (any trials text; link to `probability:random-assignment`, lesson probability/the-doctor-picks-the-patients).
- Nearest lessons: probability/praise-then-slump (regression to the mean) and probability lessons on confounding. This lesson adds the control group. Prerequisite: `probability:regression-to-mean`.
- Format: Simulation run (seeded).
- Curriculum: primary `big-ideas:controlled-experiment`; also `probability:regression-to-mean`.
- Health: about evidence, not treatment. No product names, no advice about cold remedies.
- **W-537 re-check (cm-big-ideas, 2026-10-14): FAIL, duplicate. Do not build.** The text search found probability/sixteen-of-twenty-got-better (draft, concept `probability:control-groups`, probability brief 57): "16 of 20 got better. Did the pill work?", misconception "If most people who took a treatment got better, the treatment worked", the same cold-that-clears-anyway case, the same week, a no-effect pill, and a comparison group that shows it. That is the same mechanism on the same case (strategy 8.1; 2.4 precedent: randomised-assignment was removed for probability/the-doctor-picks-the-patients). Concept ids missed it (D6 again). `big-ideas:controlled-experiment` is removed from the map (strategy 2.4). The skip line stays, with this reason. The DLR-five slot it held goes back to head-of-product for a swap (board); my proposal is brief 14, mars-loops-backwards (derivation, uncontested, standard route).

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

## W-537 re-check of the cycle-1 briefs (cm-big-ideas, 2026-10-14)

Tests, per brief: (a) strategy fit (`company/domains/big-ideas-strategy.md` §1 bar, §5 at most one held citation in the reveal with a written fallback, §6 route, transfer recall); (b) a text search of every lesson's title, hook, misconception and objective across `src/demos/` (941 lessons), plus `node tools/overlap.mjs` and the Books briefs and works; (c) the strong form sourced or flagged, plus where it stops. Check scripts re-run: both pass. Briefs 6 and 8 pass with changes written into the briefs; 9 fails (duplicate). The skip lines for 5, 7, 10, 11 and 12 stay on W-556 regardless; the findings below are what each needs before its line comes off.

| # | Slug | Duplicate search | Strategy and strong form | Result |
|---|---|---|---|---|
| 1 | two-four-six-rule (draft) | none (probability/second-positive-test is Bayes, not hypothesis tests) | reveal carries 2 held sentences (Popper, Klayman & Ha) against the one-held rule; no fallback; transfer recall is good | revise the draft (board, demo-builder) |
| 2 | earth-history-in-a-day (draft) | none (geography/fingernail-ocean is the doorway) | 6 of 8 claims held (target ≤ 15%); the recall reuses the stage's own event (writing), so it is not a transfer recall | revise the draft (board); stays out of the DLR five |
| 3 | ten-times-taller-giant (draft) | none (math/cube-the-size is volume only; life/mouse-vs-elephant is metabolism) | one held (Biewener limit) plus Galileo (P); fallback not written; transfer recall (statue) is good | small revision (board) |
| 4 | noise-draws-dunning-kruger (draft) | none | ⚑: 3 held sentences in the reveal; verdict must use the shared word "mixed or contested"; no research-lead map yet (W-622); both-names-or-neither fallback not written | revise after W-622 (board); out of the DLR five (D8) |
| 5 | efficient-lamps-more-power | none | 2 held in the reveal (Sorrell, Fouquet & Pearson): one needs a fallback; no transfer recall; policy-adjacent, keep "no policy conclusion" | changes before release |
| 6 | one-ten-thousandth-apart | none | limit now shown (averages); one held | **PASS** (brief updated) |
| 7 | deaths-fall-births-wait | none; Books fact-straight-line pair honoured (BI owns the lag model) | sensitive class (demography): unclaimed until W-626; no transfer recall; the option says "about 4 times" and the check gives 4.39 (consistent) | held (W-556, W-626) |
| 8 | same-grey-in-shadow | none | limit now by derivation; one held (P) | **PASS** (brief updated) |
| 9 | colds-clear-without-the-pill | **duplicate of probability/sixteen-of-twenty-got-better** | — | **FAIL**; concept removed from the map |
| 10 | tin-price-tells-everyone | none (economics/prices-sort-the-buyers is market clearing) | 2 held (Hayek, externalities text); the "price vs rationing" cost readout reads as a policy verdict, so the stage must say it is the model's switch cost only; economic-policy route (W-626) | changes before release |
| 11 | quartet-gets-pricier | none (economics/growth-rate-gap is the doorway) | 2 held (Baumol & Bowen; "helps explain healthcare and education" via Nordhaus): cut the second or give it a fallback; the health-and-education share is disputed, so "helps explain" must stay hedged | changes before release |
| 12 | where-sally-looks | none | ⚑; the predict answer about 3-year-olds rests on a held meta-analysis, which breaks "the lesson teaches with D claims alone" (§5): it moves down the list or the predict is re-written about the story's logic | re-rank at Wave K cycle planning |

All 12 cycle-1 briefs predate the strategy's "transfer recall in the check script" and "preset buttons in DOM order" guards. 6 and 8 now meet them; the others get them when their lines come off.

## Next in line (cycle 2, no brief yet)

*Superseded 2026-10-14 by `company/domains/big-ideas-strategy.md` section 2 (the ranked list) and "## Strategy wave 1" below. `path-dependence-lock-in` was removed from the map (probability/same-songs-different-hits teaches it); `cumulative-selection` is brief 13.*
Demand 3 with no brief: `cumulative-selection` (a target-phrase demo of cumulative vs single-step selection; use our own phrase). Demand 2 candidates by strand: science `germ-theory-pump`, `entropy-arrow-of-time`, `fermi-estimation`; society `ostrom-commons-governed`, `path-dependence-lock-in` (Pólya urn; the QWERTY story is contested, so cite Liebowitz & Margolis), `perverse-incentives`; mind `extraordinary-evidence`, `change-blindness`, `veil-of-ignorance` (the prediction must be about the argument, not an opinion).

## Strategy wave 1

owner: cm-big-ideas (Dmitri) · written 2026-10-14 from `company/domains/big-ideas-strategy.md` (sections 2 and 4; ranks 13-24 of its list) · numbers: `node company/domains/briefs/checks/big-ideas-strategy-wave1-check.mjs` (all pass, 2026-10-14) · reveal drafts counted by script (each ≤ 90 words)

**Gate.** These are Wave K briefs under `company/decisions/2026-10-14-w556-wave-gate.md`. Each has a line in `company/ops/brief-skips.json` ("Wave K gate (W-556)"), so `tools/claim.mjs` will not hand them out until the chief of staff records the gate as open **and** Big Ideas has 5 lessons through Domain Launch Review (strategy section 4). Do not `take` them by name before then.

**Rules every brief below follows** (strategy sections 3 and 5):
- **Preset buttons, in DOM order.** Every milestone, including the question's own case, is reached by pressing each listed preset once, in the order given. Sliders are not used for milestones. Reset is always last.
- **Labels ≥ 10 px** at 390 px wide for every meaning-carrying label at predict and every element the reveal points at (decoration only may be 8 px and `aria-hidden`).
- **Claims are split by support**: *derivation* (checked in the script above), *model* (a choice we made, labelled on the stage), *citation, held* (a source this host cannot open, W-583: the fact-checker confirms it or the sentence is cut). The reveal carries **at most one** held citation; every other held sentence is marked "cut if not checkable", and the lesson still teaches without it.
- **Where it stops** is a claim, and where possible a preset shows it on the stage rather than telling it.
- **Stage text.** Word counts cover the question and any caption at predict, plus preset labels where they carry meaning; the builder confirms the total is ≤ 25 in pre-flight.
- **Transfer recall.** The recall question uses a different case from the stage, so it tests the idea, not the picture. Its answer is in the check script.
- **Review route** is named per brief (strategy section 6).

### 13. typing-keeps-the-best · concept: cumulative-selection · intro · demand 3
- Format: Simulation run
- Strand: science (cm-big-ideas-science)
- Audience and knowledge boundary: learner knows: natural selection keeps what works (life/natural-selection) / does not know: that keeping each small improvement turns an impossible one-shot jump into a short climb, so a many-part result does not need one huge stroke of luck.
- Misconception: Something with many parts that fit together can only arise by one enormous stroke of luck, because the chance of it all appearing at once is tiny.
- Prediction (stage text, 25 words): "Random typing hits this 18-letter phrase once in about 6×10^25 tries. Instead, keep the best of 100 slightly mistyped copies each round. Rounds to match?" options: A) Fewer than 1,000 / B) About a million / C) More than a trillion trillion (answer: A). The locked stage shows the target row "SMALL STEPS ADD UP" and an empty row of 18 tiles; no counts.
- Check (node): 27^18 = 5.81e25. Seed 7: best of 1,000 random strings matches 4 of 18; keep-the-best (100 copies, 5% miscopy per letter) matches in 77 rounds; keep-a-random-copy for the same 77 rounds ends at 0 of 18. Seeds 1-200: median 44 rounds, maximum 100.
- What the stage shows: the target row, the current row of 18 letter tiles (matching tiles filled), a small trace of letters matched per round (both runs, one chart), one readout "Round 77 · 18 of 18". Preset buttons in DOM order: "1,000 random tries", "Keep the best: run", "Keep a random copy: run", "Step 1 round", Reset (5). Runs compute first, then replay in ≤ 400 ms.
- Labels: tiles 18 px wide with 12 px letters; readout 12 px; chart axis labels 10 px.
- Key state (milestones): random-tried (best 4 recorded), best-kept (77 rounds recorded), random-kept (0 of 18 recorded). Reveal unlocks after random-tried and best-kept.
- Reveal payoff (draft, 78 words): "A thousand random tries matched at best {b} of 18 letters. Keeping the best copy each round matched all 18 in {n} rounds, while keeping a random copy got nowhere. Each round only had to find one small improvement, and selection kept it. Richard Dawkins used a program like this in 1986 to show how cumulative selection builds complex results. Where it stops: nature has no target phrase. Each small step must help survival on its own, now."
- Planned claims:
  1. One random 18-character string over 27 symbols matches a given phrase with probability 1 in 27^18, about 5.8 × 10^25. support: derivation.
  2. In the lesson's model (seed 7 disclosed; 100 copies a round; 5% miscopy per letter) keep-the-best matched in 77 rounds; over seeds 1-200 the median was 44 and the maximum 100; keep-a-random-copy ended at 0 of 18. support: derivation (simulation in the check). Model labelled on the stage.
  3. Dawkins described a cumulative-selection program with a target phrase, and said the target is unlike real evolution. support: citation, held; source: Dawkins (1986), *The Blind Watchmaker*, ch. 3 (to confirm). Cut if not checkable; the reveal then says "A program like this shows…".
  4. Limit: natural selection has no long-term target; each change must be favoured in its own generation. support: citation, held; source: the same chapter, or a textbook (Futuyma & Kirkpatrick, *Evolution*, 4th ed., ch. on adaptation; to confirm). Fallback wording if not checkable: "Our target phrase is the model's device" (support: model).
- Curriculum: primary `big-ideas:cumulative-selection`; also `life:natural-selection`; references none; tags evolution, search, improbability.
- Differs from nearest: life/natural-selection and life/one-percent-edge show a heritable edge compounding in one trait's share. This shows why step-by-step keeping beats one-shot chance for a result with many parts. No population genetics.
- Transfer and recall: also applies to engineering by iteration and to training a model step by step. Recall: "A faulty lock clicks whenever any one of its 6 dials (10 digits each) is right. About how many tries to open it?" (answer: at most 60, against a million blind).
- Review route: standard (fact-checker, learner-evaluator). Cultural reviewer for wording only: the lesson makes no claim about religion or design in general.
- Multi-card later: card 1 random typing, card 2 keep the best, card 3 keep a random copy.

### 14. mars-loops-backwards · concept: heliocentric-retrograde · core · demand 2
- Format: Storyboard / scrub
- Strand: science (cm-big-ideas-science)
- Audience and knowledge boundary: learner knows: planets orbit the Sun, and outer ones are slower (physics/higher-orbit-slower) / does not know: that Mars's backward loop in our sky comes from Earth overtaking it on the inside track, so a change of viewpoint turns a complicated path into a simple one.
- Misconception: When a planet appears to reverse in the sky, it really changes direction, or needs extra machinery to explain.
- Prediction (stage text, 23 words): "Night by night, Mars drifts east against the stars. Next month it is opposite the Sun in our sky. Over six months, Mars:" options: A) keeps drifting east the whole time / B) goes west for about 2 months, then east again / C) goes west for about 6 months (answer: B). The locked stage shows the orbit diagram with Earth and Mars placed, and an empty sky band.
- Check (node): circular, coplanar model orbits (Earth 1 AU, 365.25 d; Mars 1.5237 AU, 686.98 d): Mars moves west for 73 days around opposition; the loop recurs every 780 days; from the Sun, Mars's angle only increases.
- What the stage shows: a top-down diagram (Sun, two orbit circles, Earth, Mars) with the Earth-to-Mars sightline extended to an outer sky band, where Mars leaves a dot every 10 days. Preset buttons in DOM order: "Next 6 months from Earth" (dots run east, back west, then east; records 73 days), "Same 6 months from the Sun" (sightline from the Sun; dots march east), "Step 10 days", Reset (4). The Earth-view dots stay as outlines when the Sun view is drawn.
- Labels: "Sun", "Earth", "Mars", "east →" and the readout "west for 73 days" at ≥ 10 px; dots 6 px (decoration plus one labelled turn-around point).
- Key state (milestones): earth-view (73 days recorded), sun-view (no reversal recorded). Reveal unlocks after both.
- Reveal payoff (draft, 77 words): "From Earth, Mars went west for {d} days, then east again. From the Sun, it never turned back. The loop is our own motion: Earth, on the faster inside track, overtook Mars, so Mars seemed to slide backwards, like a slower car you pass on a motorway. Earth-centred models needed circles on circles to draw this loop; a Sun-centred view needs none. Where it stops: our orbits are circles. Real orbits are ellipses, so real loops vary."
- Planned claims:
  1. In the lesson's circular model, Mars moves west for 73 days around opposition and the loop recurs every 780 days. support: derivation (check script); the model is labelled "circular orbits".
  2. Mars's mean distance is 1.5237 AU and its orbital period 686.98 days. support: citation, held (standard constants; NASA Mars fact sheet; to confirm).
  3. Ptolemy's Earth-centred model used epicycles to reproduce retrograde motion; a Sun-centred model explains it by Earth's own motion. support: citation, held; source: Kuhn (1957), *The Copernican Revolution*, ch. 2 and 5 (to confirm). The reveal names no single discoverer (charter: no "great man" history; Aristarchus proposed a Sun-centred system long before Copernicus).
  4. Limit: planetary orbits are ellipses (Kepler, 1609, *Astronomia Nova*; public domain), so real retrograde loops differ in length and shape. support: citation, held. Cut if not checkable: "Our orbits are simplified circles" (support: model).
- Curriculum: primary `big-ideas:heliocentric-retrograde`; prerequisite `physics:kepler-orbit-speed`; also none; tags astronomy, frames of reference.
- Differs from nearest: physics/higher-orbit-slower explains why outer orbits are slower. This uses that to show that apparent motion depends on the viewpoint. geography/iss-never-over-moscow is about a ground track, not a sky track.
- Transfer and recall: also applies to motion seen from a moving car or train, and to data shown against a moving baseline. Recall: "Jupiter is slower than Mars. Seen from Earth, does Jupiter also loop backwards sometimes?" (answer: yes, when Earth passes it; 121 days every 399 in the circular model).
- Review route: standard.
- Multi-card later: card 1 the Earth view, card 2 the Sun view.

### 15. how-many-witnesses · concept: extraordinary-evidence · core · demand 2
- Format: Single card
- Strand: mind (cm-big-ideas-mind)
- Audience and knowledge boundary: learner knows: a rare condition plus one accurate test can still mean "probably not" (probability/base-rates) / does not know: that the evidence a claim needs grows with how unlikely it was, that each independent piece multiplies the odds, and that pieces copied from one source count once.
- Misconception: A reliable witness is enough to believe anything they report.
- Prediction (stage text, 25 words): "Prior: 1 in a million. Each witness is 99% reliable; none spoke to another. How many must agree before it's more likely true than not?" options: A) 1 / B) 4 / C) 100 (answer: B). Stage caption at predict (counted in the 25): none beyond the question; "99% reliable" is defined on the stage after unlock: "says yes 99% of the time if true, 1% if false".
- Check (node): likelihood ratio 99 per witness. Posterior after 1, 2, 3, 4 witnesses: 0.0099%, 0.97%, 49.2%, 99.0%. Four witnesses who copied one source: 0.0099%. An everyday 1-in-10 claim with one witness: 91.7%.
- What the stage shows: a vertical log ladder (1 in a million, 1 in 1,000, 1 in 10, 50%, 99%) with a marker that leaves a tick per witness, and a row of witness icons (copied witnesses drawn joined to one source). Preset buttons in DOM order: "1 witness", "4 witnesses", "4 who copied one source", "Everyday claim: 1 in 10, 1 witness", Reset (5). One readout: "4 witnesses · 99.0% likely".
- Labels: ladder labels and tick values 10 px; readout 12 px.
- Key state (milestones): four-independent (ticks 0.0099 / 0.97 / 49.2 / 99.0 recorded), copied (0.0099 recorded), everyday (91.7 recorded). Reveal unlocks after four-independent and copied.
- Reveal payoff (draft, 73 words): "Each independent witness multiplied the odds by 99. From one in a million, three left the claim at {p3}%, just short of even; the fourth took it to {p4}%. One witness made an everyday 1-in-10 claim {pe}% likely. David Hume made this argument about miracles: the rarer the claim, the more evidence it needs. Where it stops: four witnesses who copied one source counted as one. Evidence multiplies only when it is independent."
- Planned claims:
  1. With prior odds 1 : 999,999 and a likelihood ratio of 99 per witness, the claim reaches 0.0099%, 0.97%, 49.2% and 99.0% after 1 to 4 witnesses. support: derivation (Bayes' rule in odds form).
  2. A witness who repeats another's source adds a likelihood ratio of 1, so four copies leave 0.0099%. support: derivation. The "copied" set-up is the lesson's model.
  3. One 99% witness makes a 1-in-10 claim 91.7% likely. support: derivation.
  4. Hume argued that testimony for a miracle must be weighed against the improbability of the event. support: citation, held; source: Hume (1748), *An Enquiry Concerning Human Understanding*, section 10 "Of Miracles" (public domain; to confirm the passage). Cut if not checkable; the reveal then says "the rarer the claim, the more evidence it needs" without a name.
- Curriculum: primary `big-ideas:extraordinary-evidence` (existing prerequisites `probability:bayesian-updating`, `probability:base-rates`); also `probability:information-cascade`; tags evidence, Bayes, testimony.
- Differs from nearest: probability/base-rates (one test, one rare disease), probability/which-coin-is-it (odds double per head) and probability/two-said-blue (copying in a cascade). This adds the claim-level idea: required evidence scales with the prior, and only independent evidence multiplies. It is a doorway to all three.
- Transfer and recall: also applies to fraud alerts, surprising lab results and rumours. Recall: "Five news sites report a surprising story, all citing the same single post. How much evidence is that?" (answer: about as much as the one post).
- Review route: research-lead (statement of Hume's argument) and cultural reviewer (religion: the lesson makes no claim that any miracle did or did not happen).
- Multi-card later: card 1 independent witnesses, card 2 copied witnesses.

### 16. top-fifth-of-the-top-fifth · concept: pareto-80-20 · intro · demand 2
- Format: Single card
- Strand: society (cm-big-ideas-society)
- Audience and knowledge boundary: learner knows: the saying "20% of causes give 80% of effects" / does not know: that 80/20 is one setting of a heavy tail, that the same tail repeats inside the top (the top 4% take 64%), and that other tails give 45/20 or 20/20.
- Misconception: 80/20 is a law that holds for most things, and the concentration stops at the top 20%.
- Prediction (stage text, 22 words): "Across 1,000 books, the best-selling 20% take 80% of sales. Under the same rule, the top 4% of books take what share?" options: A) About 16% / B) About 32% / C) About 64% (answer: C). Stage caption after unlock: "Rule: a Pareto tail".
- Check (node): the top fraction p of a Pareto tail with index α holds p^(1 − 1/α). 80/20 gives α = 1.161. Top 4%: 64.0%; top 0.8%: 51.2%. Gentler tail α = 2: top 20% hold 44.7%, top 4% hold 20.0%. Everyone equal: 20%.
- What the stage shows: two 100% bars side by side, "books" and "sales", with the selected top slice shaded on both and joined by a band; readout "Top 4% of books → 64% of sales". Preset buttons in DOM order: "Top 20%", "Top 4%", "Gentler tail: top 20%", "Everyone equal: top 20%", Reset (5).
- Labels: slice labels 11 px; bar titles 12 px.
- Key state (milestones): top4 (64.0 recorded), other-tail (44.7 recorded). Reveal unlocks after both.
- Reveal payoff (draft, 76 words): "Under the 80/20 rule, the top 4% of books took {s}% of sales: the top fifth of the top fifth repeated the pattern. That nesting is what a heavy tail does. But 80/20 is one setting. A gentler tail gave the top fifth only {g}%, and equal sales give 20%. The name comes from Vilfredo Pareto's lopsided land figures. Where it stops: many real distributions are not this kind of tail, so measure before assuming 80/20."
- Planned claims:
  1. For a Pareto tail with index α the top fraction p holds p^(1 − 1/α); α = 1.161 gives 80/20, 64.0% for the top 4% and 51.2% for the top 0.8%; α = 2 gives 44.7% for the top 20%. support: derivation.
  2. The book sales follow the lesson's model tail (stated on the stage). support: model.
  3. The name: Pareto reported highly unequal land and income distributions, and the quality engineer Joseph Juran later named the "Pareto principle". support: citation, held; sources: Pareto (1896-97), *Cours d'économie politique*; Juran (1951), *Quality Control Handbook* (to confirm). Cut if not checkable.
  4. Limit: many claimed power laws in data do not pass statistical tests. support: citation, held; source: Clauset, Shalizi & Newman (2009), "Power-law distributions in empirical data", *SIAM Review* 51(4): 661-703. Fallback if not checkable: "80/20 is one setting of one model" (support: derivation).
- Curriculum: primary `big-ideas:pareto-80-20` (existing prerequisite `probability:power-law-scaling`); also `probability:heavy-tails`; tags inequality of outcomes, heavy tails.
- Differs from nearest: probability/ten-times-links-hundred-times-rarer (the slope on a log-log plot) and probability/average-that-never-settles (unstable means). This is about the share the top holds, its nesting and the rule's limits. Books money-tails-drive-everything and zero-power-law-returns teach those books' claims about investment returns; per the shared boundary (strategy section 8) this lesson uses no investment or wealth stage.
- Transfer and recall: also applies to bugs and crashes, complaints, citations and city sizes. Recall: "Under the same 80/20 tail, what share of crashes do the top 4% of bugs cause?" (answer: about 64%).
- Review route: standard. No income or wealth figures on the stage (sensitive; section 6).
- Multi-card later: card 1 top 20%, card 2 top 4%, card 3 other tails.

### 17. raisins-see-no-centre · concept: expanding-universe · core · demand 2
- Format: Before / after toggle
- Strand: science (cm-big-ideas-science)
- Audience and knowledge boundary: learner knows: "the universe is expanding" / does not know: that uniform stretching makes every observer see the others recede at a speed proportional to distance, so seeing everything fly away does not put you at the centre.
- Misconception: If every galaxy is flying away from us, we must be near the centre of the expansion.
- Prediction (stage text, 24 words): "Every distance doubles in an hour. Seen from raisin A, B (1 cm away) moves off 1 cm per hour. C, 3 cm away?" options: A) 1 cm per hour / B) 3 cm per hour / C) 9 cm per hour (answer: B). The locked stage shows the raisin grid with A, B and C labelled and no arrows.
- Check (node): on a 5 × 5 grid 1 cm apart, doubling every distance moves a raisin d cm away by d cm in the hour; from A, B recedes 1 cm/h and C 3 cm/h; seen from C (or any raisin) every raisin recedes at its distance in cm/h.
- What the stage shows: a loaf outline with a 5 × 5 raisin grid; a ring marks the observer; after a rise, an arrow from each raisin (length proportional to its speed seen from the observer). Before/after: the 1 cm grid as outlines under the 2 cm grid. Preset buttons in DOM order: "Rise 1 hour, watch from A", "Watch from C", "Watch from a corner raisin", Reset (4).
- Labels: raisin letters A, B, C 11 px; speeds on B and C only, 10 px.
- Key state (milestones): from-A (1 and 3 cm/h recorded), from-other (C or corner: same pattern recorded). Reveal unlocks after both.
- Reveal payoff (draft, 76 words): "From A, B moved off {b} cm per hour and C {c}: speed grew with distance. From C the pattern was the same, every raisin rushing away, faster the farther. No raisin is the centre. Georges Lemaître and Edwin Hubble found this pattern for galaxies in 1927 and 1929. Where it stops: a loaf has an edge and a middle. As far as we can tell, the universe has neither, and galaxies themselves do not stretch."
- Planned claims:
  1. Doubling every distance in an hour moves a raisin d cm away by d cm, seen from any raisin. support: derivation.
  2. The loaf and grid are the lesson's model. support: model.
  3. Lemaître (1927) and Hubble (1929) reported that galaxies recede at speeds proportional to distance; the IAU recommended the name "Hubble-Lemaître law" in 2018. support: citation, held; sources: Lemaître (1927), *Annales de la Société Scientifique de Bruxelles* A47: 49-59; Hubble (1929), *PNAS* 15(3): 168-173; IAU Resolution B4 (2018) (to confirm). Naming both avoids single-discoverer credit. Cut if not checkable.
  4. Limit: the standard cosmological model has no centre or edge, and gravitationally bound systems such as galaxies do not expand. support: citation, held; source: a cosmology text, e.g. Ryden, *Introduction to Cosmology*, 2nd ed., ch. 2 (to confirm). Fallback if not checkable: "a loaf has an edge and a middle; the model does not say whether the universe has" (support: model).
- Curriculum: primary `big-ideas:expanding-universe`; also none; tags cosmology, proportional scaling.
- Differs from nearest: no cosmology lesson exists (keyword search 2026-10-14). math/double-the-size is area scaling, not motion.
- Transfer and recall: also applies to proportional growth anywhere (prices, maps zoomed in). Recall: "Every price rises 10% this year. A $5 item rises 50 cents. How much does a $50 item rise?" (answer: $5).
- Review route: standard.
- Multi-card later: card 1 from A, card 2 from C.

### 18. cost-falls-per-doubling · concept: wrights-law · core · demand 2
- Format: Single card
- Strand: society (cm-big-ideas-society); history-and-technology tag (strategy section 2)
- Audience and knowledge boundary: learner knows: technology gets cheaper over time / does not know: that for many products cost falls by a roughly fixed share each time the total ever made doubles, so cost tracks how much has been made, not the calendar.
- Misconception: Technology gets cheaper mainly because time passes or a breakthrough arrives; making more of the same thing barely changes its cost.
- Prediction (stage text, 22 words): "A product gets 20% cheaper each time the total ever made doubles. The total made grows 1,000-fold. Its cost is now about:" options: A) four-fifths / B) a half / C) a tenth / D) a thousandth (answer: C).
- Check (node): 1,000-fold is 9.97 doublings; 0.8^9.97 = 10.8%. 10-fold: 47.7%. Learning rate 10%: 35.0%. With a materials floor of 15% that never falls: 24.2%.
- What the stage shows: a log-log chart (x: total made, 1× to 1,000×; y: cost, 100% to 1%) with the cost line and a marker; readout "1,000× made · 10.8% of the start". Preset buttons in DOM order: "Make 10× as many", "Make 1,000× as many", "Learning rate 10%", "Add a materials floor", Reset (5). Each earlier line stays drawn faintly.
- Labels: axis ticks (1×, 10×, 100×, 1,000×; 100%, 10%, 1%) at 10 px; readout 12 px.
- Key state (milestones): thousand (10.8 recorded), floor (24.2 recorded). Reveal unlocks after both.
- Reveal payoff (draft, 75 words): "Making 1,000 times as many meant almost ten doublings, and each cut the cost by a fifth: {c}% of the start. Cost followed how much had been made, not the calendar. Theodore Wright reported this pattern for aircraft in 1936, and similar curves fit many technologies. Where it stops: with a floor, such as materials that never get cheaper, the curve flattened at {f}%. The rule describes a pattern; it does not explain the cause."
- Planned claims:
  1. 1,000-fold growth is 9.97 doublings; at 20% per doubling cost falls to 10.8%; 10-fold gives 47.7%; a 10% rate gives 35.0%; a 15% floor gives 24.2%. support: derivation.
  2. The rate and the floor are the lesson's model. support: model.
  3. Wright reported that aircraft unit cost fell by a roughly constant share with each doubling of cumulative output. support: citation, held; source: Wright (1936), "Factors affecting the cost of airplanes", *Journal of the Aeronautical Sciences* 3(4): 122-128.
  4. Limit and spread: across many technologies, cost-versus-cumulative-production curves fit historical data about as well as cost-versus-time curves; the fit does not identify a cause. support: citation, held; source: Nagy, Farmer, Bui & Trancik (2013), "Statistical basis for predicting technological progress", *PLOS ONE* 8(2): e52669. Cut "similar curves fit many technologies" if not checkable.
- Curriculum (new concept): `{"id":"wrights-law","name":"Wright's law: cost falls with each doubling of what has been made","level":"core","demand":2,"prerequisites":["math:exponential-growth"],"subarea":"society"}`; also none; tags technology, learning curves, history-tech.
- Differs from nearest: math/exponential-growth and math/seventy-two-doubling are growth per period; economics/widget-marginal-cost is the cost of one more unit at one moment. This is cost against cumulative output over years. No Books overlap.
- Transfer and recall: also applies to solar panels, batteries and practice. Recall: "Batteries get 18% cheaper each time total production doubles. Production doubles three times. Cost now?" (answer: about half, 55%).
- Review route: standard. No policy conclusion (no "subsidies work").
- Multi-card later: card 1 the line, card 2 the floor.

### 19. most-positives-could-be-false · concept: most-findings-false · core · demand 2
- Format: Single card
- Strand: mind (cm-big-ideas-mind)
- Audience and knowledge boundary: learner knows: a positive test for a rare disease can still mean "probably not" (probability/base-rates) / does not know: that the share of a field's positive findings that are true depends on how many tested ideas were true to begin with and on the studies' power, so a 5% false-positive rate can still leave about half the findings false.
- Misconception: A finding that passed a 5% significance test is about 95% likely to be true.
- Prediction (stage text, 25 words): "1,000 ideas tested; 100 are true. Tests catch half of true effects and falsely flag 5% of false ones. What share of flagged is true?" options: A) About 95% / B) About 50% / C) About 5% (answer: B). The locked stage shows the empty tree (1,000 → true / false → flagged / not).
- Check (node): 100 true × 50% = 50 flagged; 900 false × 5% = 45 flagged; 50 / 95 = 52.6%. Power 80%: 80 / 125 = 64.0%. 1 in 100 true (power 50%): 5 / 54.5 = 9.2%.
- What the stage shows: a natural-frequency tree (1,000 → 100 true / 900 false → flagged and not flagged in each), with the two flagged boxes joined into one "flagged" box where the true part is shaded; readout "50 of 95 flagged are true: 52.6%". Preset buttons in DOM order: "1 in 10 true, power 50%", "Power 80%", "1 in 100 true", Reset (4).
- Labels: tree counts 11 px; box titles 10 px.
- Key state (milestones): question-case (52.6 recorded), power (64.0 recorded), rare (9.2 recorded). Reveal unlocks after question-case and one of the others.
- Reveal payoff (draft, 78 words): "Of the {f} flagged ideas, only {t} were true: {p}%. The 5% error rate fell on 900 false ideas, so false alarms nearly matched real finds. With power at 80% the share rose to {p80}%; with true ideas rarer, 1 in 100, it fell to {pr}%. John Ioannidis argued in 2005 that by this arithmetic most published findings could be false. Where it stops: the real share depends on each field's base rate and power, and estimates disagree."
- Planned claims:
  1. Counts and shares: 50 and 45 flagged, 52.6%; power 80%: 64.0%; base rate 1 in 100: 9.2%. support: derivation.
  2. The base rate and power are the lesson's model. support: model.
  3. Ioannidis argued that, given typical priors, power and bias, most published research findings are false. support: citation, held; source: Ioannidis (2005), "Why most published research findings are false", *PLoS Medicine* 2(8): e124.
  4. Limit: estimates of the false-discovery share in real literatures differ widely; one estimate for top medical journals was about 14%, and it was disputed. support: citation, held; source: Jager & Leek (2014), *Biostatistics* 15(1): 1-12, with the discussion papers in the same issue (to confirm). Cut "and estimates disagree" if not checkable, keeping "depends on each field's base rate and power" (support: derivation).
- Curriculum (new concept): `{"id":"most-findings-false","name":"Why many published findings can be false: base rate and power","level":"core","demand":2,"prerequisites":["probability:base-rates","probability:multiple-comparisons"],"subarea":"mind"}`; also none; tags evidence, replication, science.
- Differs from nearest: probability/base-rates (one patient, one test) and probability/twenty-harmless-tests (many tests on one data set). This applies base rates to a field's literature and adds power as the second dial.
- Transfer and recall: also applies to screening programmes, fraud flags and hiring tests. Recall: "In a field where half the tested ideas are true, power is 80% and false flags 5%, what share of flagged ideas is true?" (answer: about 94%).
- Review route: research-lead (claims about the reliability of science; no "science is broken" framing). Not a contested-topic reveal beyond the named estimate dispute.
- Multi-card later: card 1 the tree, card 2 the two dials.

### 20. five-rough-guesses · concept: fermi-estimation · intro · demand 2
- Format: Simulation run
- Strand: science (cm-big-ideas-science)
- Audience and knowledge boundary: learner knows: guesses have errors / does not know: that when several rough, independent guesses are multiplied, the errors partly cancel, so the product is usually within about 2× even when each step could be 2× off, and that a shared bias does not cancel.
- Misconception: Five guesses that could each be 2× off give a useless answer, up to 32× off.
- Prediction (stage text, 25 words): "You estimate five numbers, each off by up to 2×, high or low at random, and multiply them. Typically, how far off is the answer?" options: A) About 2× / B) About 10× / C) About 32× (answer: A).
- Check (node, seed 11): 1,000 products, each factor off by a random factor in [½, 2] (uniform on a log scale): median error ×1.91; 54.6% within 2×; worst ×13.7; normal approximation ×1.83; worst possible ×32. Every guess 1.5× high: median ×7.5 (1.5^5 = 7.59).
- What the stage shows: five factor bars on a log scale (½ to 2) and a product bar (1/32 to 32), plus a histogram of the 1,000 errors on a log axis with the "within 2×" band shaded; readout "median ×1.91 · 54.6% within 2×". Preset buttons in DOM order: "Make 1 estimate", "Make 1,000 estimates", "Every guess leans 1.5× high", Reset (4). Seed 11 is shown on the stage.
- Labels: axis ticks (½, 1, 2; ×1, ×2, ×10, ×32) 10 px; readout 12 px.
- Key state (milestones): thousand (1.91 and 54.6 recorded), biased (7.5 recorded). Reveal unlocks after both.
- Reveal payoff (draft, 73 words): "Across 1,000 estimates the typical answer was off by ×{m}, and {w}% landed within 2×. The worst case, ×32, needs all five errors to point the same way, which almost never happened: highs and lows cancelled. That is why rough step-by-step estimates, the kind Enrico Fermi was known for, work. Where it stops: when every guess leaned 1.5× high, nothing cancelled and the typical error grew to ×{b}. Cancelling needs independent, unbiased errors."
- Planned claims:
  1. Seed 11, 1,000 runs: median ×1.91, 54.6% within 2×, worst ×13.7; worst possible ×32; with a shared 1.5× bias the median is ×7.5. support: derivation (simulation in the check; seed disclosed on the stage and in meta.json).
  2. Error model: each factor off by a factor uniform on a log scale between ½ and 2. support: model.
  3. Fermi was known for quick order-of-magnitude estimates, for example of the Trinity test's yield from falling paper. support: citation, held; source: Fermi (1945), "My observations during the explosion at Trinity on July 16, 1945" (US National Archives; to confirm). Cut if not checkable; the reveal then says "That is why rough step-by-step estimates work."
- Curriculum: primary `big-ideas:fermi-estimation`; also `probability:central-limit`; tags estimation, errors, logarithms.
- Differs from nearest: probability/averages-turn-bell-shaped (the central limit for sums and averages) and probability/coin-gap-keeps-growing (the law of large numbers). This is about multiplying estimates, errors on a log scale, and the bias limit. lifehacks/estimate-a-range is about planning buffers, not products of guesses.
- Transfer and recall: also applies to market sizing and carbon footprints, and it explains why a model with one shared bias goes wrong. Recall: "Ten guesses, each off by up to 2× at random, multiplied together. Is the typical error nearer 2.5× or 1,000×?" (answer: about 2.3×).
- Review route: standard.
- Multi-card later: card 1 one estimate, card 2 a thousand, card 3 bias.

### 21. same-veil-two-choices · concept: veil-of-ignorance · intro · demand 2
- Format: Single card
- Strand: mind (cm-big-ideas-mind)
- Audience and knowledge boundary: learner knows: "choose the rules as if you didn't know who you'd be" / does not know: that the veil alone does not settle the choice. The answer depends on the decision rule (Rawls: protect the worst place; Harsanyi: best average), and groups in experiments chose neither pure rule.
- Misconception: Behind the veil of ignorance, any rational person would choose the most equal society.
- Prediction (stage text, 17 words): "Rawls and Harsanyi choose behind the veil, landing in one of four places at random. Same society?" options: A) Yes: both pick A, the equal one / B) Yes: both pick B, the highest average / C) No: one picks A, the other B (answer: C). The rules are given by the preset labels, visible but disabled at predict: "Rawls: worst place", "Harsanyi: average", "Floor, then average" (8 words; 25 in total). The locked stage shows the three societies' bars with values; no outline marks a choice.
- Check (node): A = 10, 10, 10, 10 (mean 10, worst 10); B = 4, 16, 16, 24 (mean 15, worst 4); C = 8, 12, 14, 18 (mean 13, worst 8). Best worst place: A. Best average: B. Floor of 8, then best average: C.
- What the stage shows: three small panels (A, B, C), each with four income bars labelled with their values, the mean and the worst place. Preset buttons in DOM order: "Rawls: worst place" (best worst place), "Harsanyi: average" (best average), "Floor, then average" (floor of 8, then best average), Reset (4). The chosen panel gets a thick outline and a label naming the rule; earlier choices keep a thin outline.
- Labels: bar values 10 px; panel titles 12 px; three panels of 110 px fit 390 px with gaps.
- Key state (milestones): rawls (A recorded), harsanyi (B recorded), floor (C recorded). Reveal unlocks after rawls and harsanyi.
- Reveal payoff (draft, 79 words): "From the same veil, Rawls's rule chose {r}, protecting the worst place, and Harsanyi's chose {h}, the best average. The veil makes the chooser impartial; it does not say how much risk to accept, and that is where they part. In laboratory experiments, most groups chose a third option: a floor for everyone, then the best average, like society C. Where it stops: this is an argument about how to choose rules, not proof of which society is fair."
- Planned claims:
  1. Applying "best worst place" to A, B, C picks A; "best average" picks B; "floor of 8, then best average" picks C. support: derivation.
  2. The three societies are the lesson's model (no real countries). support: model.
  3. Rawls argued that parties in the original position would use maximin reasoning; Harsanyi argued an impartial chooser would maximise average expected utility. support: citation, held; sources: Rawls (1971), *A Theory of Justice*, section 26; Harsanyi (1975), "Can the maximin principle serve as a basis for morality?", *American Political Science Review* 69(2): 594-606.
  4. In laboratory experiments most groups chose a floor constraint with the highest average. support: citation, held; source: Frohlich, Oppenheimer & Eavey (1987), "Laboratory results on Rawls's distributive justice", *British Journal of Political Science* 17(1): 1-21 (to confirm title and venue). Cut if not checkable; the floor preset then stays as a third rule without the experiment sentence.
- Curriculum: primary `big-ideas:veil-of-ignorance` (existing prerequisite `probability:expected-value`); also none; tags justice, decision under risk, named positions.
- Differs from nearest: probability/capped-doubling-game (expected value of one game). This sets two decision rules against each other under the same uncertainty. No lesson on justice exists.
- Transfer and recall: also applies to rules written before you know your position (drafts, cake-cutting, insurance). Recall: "Society D has places 9, 9, 30, 30. Which rule prefers D to A (10, 10, 10, 10)?" (answer: best average, Harsanyi; the worst-place rule keeps A).
- Review route: **cultural reviewer and research-lead before build** (political philosophy, section 6). Refused: any sentence saying which society is fair, any real country, party or tax policy.
- Multi-card later: card 1 Rawls, card 2 Harsanyi, card 3 the experiment's floor.

### 22. network-value-not-squared · concept: metcalfe-oversold · core · demand 2
- Format: Single card
- Strand: society (cm-big-ideas-society); history-and-technology tag
- Audience and knowledge boundary: learner knows: networks get more valuable as they grow (economics/below-critical-mass) / does not know: that "value grows with the square of users" counts every possible link as equally valuable, and that if contacts matter unequally, value grows much more slowly.
- Misconception: A network ten times bigger is worth about a hundred times more, because possible connections grow with the square.
- Prediction (stage text, 25 words): "A network grows from 100 to 1,000 members. Each member values their k-th most useful contact at 1/k of their best. Total value grows about:" options: A) 10× / B) 15× / C) 100× (answer: B).
- Check (node): possible links n(n − 1)/2 grow ×100.9; total value n × H(n − 1) with 1/k contacts grows ×14.5; n log n gives ×15; equal value per member gives ×10.
- What the stage shows: one member's contact values as a sorted bar row (1, ½, ⅓, …; past 20 bars drawn as texture), a running "value per member" readout, and two bars comparing growth: "possible links ×100.9" and "value ×14.5". Preset buttons in DOM order: "100 members", "1,000 members", "Every contact worth the same", "Only your best contact counts", Reset (5).
- Labels: comparison bar labels 11 px; first five contact bars labelled 1, ½, ⅓, ¼, ⅕ at 10 px; the rest are `aria-hidden` texture.
- Key state (milestones): thousand (14.5 recorded), equal-contacts (100.9 recorded). Reveal unlocks after both.
- Reveal payoff (draft, 75 words): "Going from 100 to 1,000 members multiplied possible links by {l} but value by only {v}, because each extra contact was worth less than the last. Counting every link as equal, Metcalfe's law, gave the hundredfold. Network effects are real; how fast they grow is contested. Andrew Odlyzko and colleagues argued for about this slower rate, while Robert Metcalfe fitted the square to Facebook's data. Where it stops: both are rules of thumb, not laws."
- Planned claims:
  1. 100 → 1,000 members: possible links ×100.9; value with 1/k contacts ×14.5; n log n ×15; equal value per member ×10. support: derivation.
  2. The 1/k contact values are the lesson's model. support: model.
  3. Briscoe, Odlyzko and Tilly argued network value grows about as n log n, not n². support: citation, held; source: Briscoe, Odlyzko & Tilly (2006), "Metcalfe's law is wrong", *IEEE Spectrum* 43(7): 34-39.
  4. Metcalfe fitted n² to Facebook's revenue and users. support: citation, held; source: Metcalfe (2013), "Metcalfe's law after 40 years of Ethernet", *IEEE Computer* 46(12): 26-31. Contested: the reveal names both sides with a source each (charter). If only one can be checked, cut both names and keep "how fast is contested" with the checked source.
- Curriculum (new concept): `{"id":"metcalfe-oversold","name":"Metcalfe's law: why network value rarely grows with the square","level":"core","demand":2,"prerequisites":["economics:network-effects-tipping"],"subarea":"society"}`; also none; tags networks, technology, contested, history-tech.
- Differs from nearest: economics/below-critical-mass shows whether a network survives (a tipping point). This shows how value scales once it does. No Books overlap.
- Transfer and recall: also applies to marketplaces, phone networks and citation networks. Recall: "A chat app grows from 1,000 to 10,000 users and contacts are worth 1/k. Does value grow nearer 13× or 100×?" (answer: about 13×).
- Review route: research-lead (contested claim, both sides).
- Multi-card later: card 1 one member's contacts, card 2 the comparison.

### 23. old-books-outlast-new · concept: lindy-effect · core · demand 2
- Format: Single card
- Strand: society (cm-big-ideas-society); history-and-technology tag
- Audience and knowledge boundary: learner knows: old things wear out (and, from chemistry/half-life, that some things have no memory of age) / does not know: that when lifetimes are heavy-tailed, the longer something has lasted the longer it is expected to last, while things that age, like people, show the reverse.
- Misconception: Something that has been around a long time is nearer its end than something new.
- Prediction (stage text, 21 words): "Book lifetimes follow a heavy-tailed rule. One book has lasted 10 years, another 100. Expected years left: old book versus new?" options: A) Fewer: it is older / B) About the same / C) About 10 times more (answer: C).
- Check (node): Pareto lifetimes, α = 2, minimum 1 year: expected years left = age, so 10 and 100. Constant risk (mean life 10): 10 years left at any age. People, lifespans normal with mean 80 and s.d. 10 (the lesson's model): 70.0 years left at 10, 8.0 at 80.
- What the stage shows: a survival curve (share still going against years, log axis 1 to 1,000) with markers at the chosen ages and a "years left" bracket; the curve shape changes per preset. Preset buttons in DOM order: "Book, 10 years in print", "Book, 100 years in print", "Atoms: constant risk", "People: age 10 and age 80", Reset (5).
- Labels: axis ticks 10 px; bracket labels 11 px.
- Key state (milestones): hundred (10 and 100 recorded), people (70.0 and 8.0 recorded); atoms optional. Reveal unlocks after hundred and people.
- Reveal payoff (draft, 78 words): "In this model the 10-year book had {a} years left and the 100-year book {b}: having lasted was evidence of staying power. This is the Lindy effect, which Benoit Mandelbrot gave a mathematical form. Atoms with a constant risk had the same time left at any age. Where it stops: it holds only for heavy-tailed lifetimes. People age, so a 10-year-old had {p10} years left and an 80-year-old {p80}. Whether real books follow the rule is largely untested."
- Planned claims:
  1. For Pareto lifetimes with α = 2 the expected time left equals the age (10 → 10, 100 → 100); constant risk gives the same time left at every age; the normal lifespan model gives 70.0 and 8.0. support: derivation.
  2. All three lifetime shapes are the lesson's models; the lifespan model is not a life table. support: model.
  3. Mandelbrot gave the idea (named after Lindy's delicatessen) a power-law form. support: citation, held; sources: Mandelbrot (1982), *The Fractal Geometry of Nature* (chapter to confirm); the name from Goldman (1964), "Lindy's law", *The New Republic* (to confirm). Cut if not checkable.
  4. Verdict "largely untested": no systematic test of the Lindy effect for books or technologies is known to us. support: citation, held (verdict "untested", charter). The fact-checker confirms that none is found, or cites the one that is and the sentence changes.
- Curriculum: primary `big-ideas:lindy-effect` (existing prerequisite `probability:heavy-tails`); demand raised 1 → 2 on 2026-10-14 (strategy section 2); also `chemistry:half-life`; tags survival, heavy tails, history-tech.
- Differs from nearest: probability/average-that-never-settles (heavy-tailed averages) and chemistry/half-life (survivors have no memory). This is the time left given the age, set against both of those. Books swan-turkey (Taleb) is a different idea (induction), so there is no overlap.
- Transfer and recall: also applies to programming languages, institutions and ideas. Recall: "One programming language has been in use for 40 years, another for 4. Under a Lindy rule, which has more expected years left?" (answer: the 40-year one, about 40 against 4).
- Review route: standard.
- Multi-card later: card 1 books, card 2 atoms, card 3 people.

### 24. one-box-or-two · concept: newcombs-problem · core · demand 2
- Format: Single card
- Strand: mind (cm-big-ideas-mind)
- Audience and knowledge boundary: learner knows: pick the option that pays more (probability/capped-doubling-game, economics/two-suspects-payoff) / does not know: that two standard rules, maximise expected payoff and never take an option that is worse in every case (dominance), give opposite answers here, and that the switch needs a predictor only just better than chance.
- Misconception: In a clearly stated choice, careful reasoning always gives one right answer.
- Prediction (stage text, 23 words): caption "A: $1,000. B: $1M if the predictor foresaw 'only B'." plus the question "How accurate must it be for 'only B' to pay more on average?" options: A) Over 99% / B) Over 90% / C) Just over 50% (answer: C).
- Check (node): one box pays p × $1,000,000 on average; both pay (1 − p) × $1,000,000 + $1,000. Break-even p = 50.05%. At 90%: $900,000 against $101,000. At 50%: $500,000 against $501,000. Whatever is already in B, both boxes pay $1,000 more.
- What the stage shows: two boxes with their amounts, two expected-payoff bars ("only B", "both") and a "break-even 50.05%" readout; the dominance preset adds a 2 × 2 table (B full / B empty × only B / both) with the $1,000 difference shaded in both rows. Preset buttons in DOM order: "Predictor 90% right", "Predictor 50% right", "What's already in B?", Reset (4).
- Labels: table cells 11 px; bar values 10 px.
- Key state (milestones): ninety (both payoffs recorded), fifty (both recorded), dominance (table shown). Reveal unlocks after all three (the break-even, the question's case, is on the readout from the first preset).
- Reveal payoff (draft, 76 words): "On average, taking only B paid more once the predictor beat {be}%: at 90% it paid {e1} against {e2}. Yet the table shows that whatever is already in B, taking both adds $1,000. Both rules are standard: maximise expected payoff, and never pick an option worse in every case. Here they disagree, and philosophers still split. Robert Nozick published the puzzle in 1969. Where it stops: the clash needs a predictor whose guess tracks your choice."
- Planned claims:
  1. Expected payoffs and the break-even of 50.05%; at 90%, $900,000 against $101,000; at 50%, $500,000 against $501,000. support: derivation.
  2. Dominance: for either content of box B, both boxes pay $1,000 more. support: derivation.
  3. The predictor's symmetric accuracy is the lesson's model. support: model.
  4. Nozick published the problem in 1969 and attributed it to the physicist William Newcomb. support: citation, held; source: Nozick (1969), "Newcomb's problem and two principles of choice", in Rescher (ed.), *Essays in Honor of Carl G. Hempel*, 114-146.
  5. Philosophers remain divided between one box and two. support: citation, held; source: Bourget & Chalmers (2023), "Philosophers on philosophy: the 2020 PhilPapers Survey", *Philosophers' Imprint* 23 (figures to confirm). Cut "and philosophers still split" if not checkable; the derivations carry the lesson.
- Curriculum: primary `big-ideas:newcombs-problem`; level stretch → core and demand 1 → 2 on 2026-10-14 (strategy section 2); also `economics:prisoners-dilemma`; tags decision theory, named positions.
- Differs from nearest: probability/capped-doubling-game (expected value) and economics/two-suspects-payoff (dominance in the prisoner's dilemma). This sets the two rules against each other. Taught as an argument with named positions; no "right answer" (charter).
- Transfer and recall: also applies to "my one vote changes nothing" arguments and to commitments. Recall: "Box A has $10; box B has $100 if the predictor foresaw 'only B'. What accuracy makes 'only B' pay more on average?" (answer: over 55%).
- Review route: research-lead (named positions fairly stated).
- Multi-card later: card 1 expected payoff, card 2 dominance.
