# Domain Launch Review: the next category, and a second course

author: domain-scout (Kofi) · date: 2026-10-14 · status: **proposed** · decides: head-of-product (enter / incubate / wait), founder chooses (board W-685)
inputs: `company/decisions/2026-10-14-founder-history-category.md`, `company/decisions/2026-10-14-w556-wave-gate.md`, `company/product/verticals/plan-to-2000.md` (section 4: "one new vertical, not three"), `company/product/verticals/networks-crowds-markets.md`, `content/works.json`, `company/domains/books-strategy.md`, the three stub proposals (`astronomy.md`, `linguistics.md`, `music-theory.md`), a text search of 945 `src/demos/*/*/meta.json` (title + misconception + objective), and package reachability probes run from this host on 2026-10-14.

## Honest limits
- **Demand is an estimate everywhere.** No lesson has met a real learner and nothing is deployed. Demand below is my judgement of how many people want the subject, labelled "estimate". It is not evidence.
- **Overlap counts are regex hits on titles, misconceptions and objectives.** They over-count (a "word" or "orbit" hit can be about something else) and under-count (a lesson can teach the idea in other words). I read the slugs. Treat counts as "roughly".
- **No source page can be opened from here** (W-556 Ask 2). Anything marked "needs sources" stays `unverified` until a web-capable fact-check session exists.
- The refuse list lives in `lifehacks` safety records (no medical, dosage or diagnosis advice; no chemical mixing; no electrical work instructions) and in the plan-to-2000 decline of "Parents". I apply it to every candidate.

## Reachable data and libraries (probed, not assumed)
| Probe | Result |
|---|---|
| npm `astronomy-engine` 2.1.19 (MIT): ephemerides for Sun, Moon, planets, eclipses, seasons, rise and set | reachable |
| npm `tonal` 6.5.1 (MIT): notes, intervals, chords, scales | reachable |
| npm `cmu-pronouncing-dictionary` 3.0.0 (ISC): words to phonemes | reachable |
| npm `an-array-of-english-words` 2.0.0, `stopword` 3.1.5 | reachable |
| npm `simple-statistics` 7.12.1 (ISC), `jstat` 1.9.6, `vega-datasets` 3.2.1 (BSD-3, 43 MB) | reachable |
| PyPI `skyfield` 1.55 (MIT), `astroquery`, `nltk` 3.10.3, `statsmodels` 0.15.0, `pronouncing` | reachable (pip metadata only; I did not install) |
| GitHub raw: `astronexus/HYG-Database` `hyg/CURRENT/hygdata_v41.csv` (star catalogue) | HTTP 200 |
| GitHub raw: `vincentarelbundock/Rdatasets` `datasets/mtcars.csv`, `airquality.csv`, `sleep.csv`, `ToothGrowth.csv`, `survival/lung.csv` | HTTP 200 |
| GitHub raw: `mwaskom/seaborn-data` `penguins.csv`; `vega/vega-datasets` `cars.json`, `gapminder.json`, `stocks.csv` | HTTP 200 (vega `stars.json` is 404) |
| Not in `node_modules` yet: all of the above except `d3-geo`, `d3-array`, `world-atlas`. Adding any needs a decision record (CLAUDE.md). Build checks can run offline in a scratch directory instead, as the geography Wave J checks do. | |
| Kit: `src/kit/geo` (d3-geo, 110m land and countries), `src/kit/knots`, `sequence.tsx` (CardSequence), simulation runs. **No audio code anywhere in `src/`.** | verified by grep |

## 1. Categories

### 1.1 Astronomy and space
**Fit.** Strong. The sky is a place where intuition is confidently wrong and a stage can show the answer.
1. Seasons: predict "closest to the Sun means summer?" The stage tilts the orbit, and the reveal is that Earth is nearest the Sun in early January (tilt, not distance).
2. Tidal locking: predict which face of the Moon we see. The stage spins the Moon at 0, 1 and 2 turns per orbit, and the reveal is that one turn per orbit gives one face.
3. Phases: predict the Moon's shape when the Sun is behind you. The stage drags the Moon around the orbit, and the reveal is that phases are our viewing angle, not Earth's shadow.
4. Scale: predict where Earth sits if the Sun is a marble (slider along a scrolling strip), and the reveal is how far the nearest star is.
5. Why planets loop backwards (retrograde): predict the path of Mars against the stars. The stage overtakes it on an inside track, and the reveal is that it is a viewpoint effect.

**Checkability: high.** Derivation: Kepler's third law, tilt geometry, phase angles, light-travel time, angular size. Simulation: orbits and ephemerides. `astronomy-engine` reproduces dates of solstices, eclipses and perihelion. The HYG catalogue gives star distances and magnitudes for scale and brightness lessons. Needs sources: planetary radii and masses, the age of the universe, exoplanet counts and anything about "latest discoveries". Rule: teach only what a computation shows, and keep constants as named inputs with a source, as physics does.

**Overlap: medium, mostly adjacent.** Search found about 11 hits: physics `higher-orbit-slower`, `moon-hammer-feather`, `throw-it-fast-enough`, `flour-on-the-moon`; geography `closer-in-winter`, `why-the-poles-get-less-sun`, `iss-never-over-moscow`, `high-satellite-view`, `two-bulges` (tides), `land-hemisphere`. So seasons, orbital speed and tides are already taught. New ground: phases, tidal locking, retrograde motion, star distance and scale, eclipses, brightness and magnitude, redshift. The charter needs a boundary with physics (orbit mechanics) and geography (Earth-Sun geometry).

**Safety: low.** Nothing medical or personal. Risks are factual drift (counts of moons, exoplanets) and astrology-adjacent confusion, which a lesson can state plainly. No refuse-list item.

**Demand (estimate): medium-high.** Broad popular interest and school curricula. Likely strongest with curious adults and students aged 11-16.

**Build and review cost: low-medium.** Fits existing engines: simulation runs and a phone-sized sky stage need a small SVG orbit stage, which can be hand-drawn per lesson under the rule of two. The geo kit's orthographic projection can serve for "view from space" lessons. CardSequence for the phases and eclipse sequences. Review: fact-check by recomputation; no human-specialist review needed.

**Kill criteria.** Pause if 5 of the first 8 are rejected as duplicates of physics or geography lessons (the boundary is wrong). Kill if, 60 days after deploy, 7-day recall is more than 10 points below the feed median. Hold if fewer than 6 concepts of demand 2 or higher survive an overlap check against physics and geography.

### 1.2 Psychology and the mind
**Fit.** Good on paper: we can predict our own errors. Weak on the stage, since most results are about people, not objects.
1. Anchoring: predict your estimate after seeing a random number, and the stage shows a spread of simulated crowd guesses (needs the study as source).
2. Change blindness: predict whether you will spot the change, and the stage runs the flicker (the reveal is the learner's own miss).
3. Regression to the mean: predict next score after a record-high one. This is statistics, not psychology.
4. Forgetting curve and spacing: predict how much you keep after a day. `spaced-beats-cram` already carries a held recall claim.
5. Bystander effect: predict help rate by group size. A published result, not derivable.

**Checkability: low.** The few derivable items (regression to the mean, base rates, noise, Bayes) already belong to probability. Everything else is an empirical study that needs a source, a replication check and care, because many famous results failed to replicate (priming, ego depletion, the Stanford prison account). Nothing is bundled in an npm or PyPI package that settles it. We would hold most claims until web fact-checking exists.

**Overlap: high.** About 10 hits, mostly false positives, but the real ones matter: `noise-draws-dunning-kruger` (Big Ideas, mind strand), `spaced-beats-cram` (Life Hacks), `base-rates`, `the-doctor-picks-the-patients`, and the Books category's planned Kahneman, Thaler, Ariely, Cialdini, Dweck, Duhigg and Clear decks (books-strategy.md, Wave B list: `mindset-praise-effort`, `nudge-order-effects`, `influence-reciprocity`, and others). Big Ideas has a **mind** strand (`big-ideas.mind.md`). A Psychology category would sit on top of those two.

**Safety: high.** Refuse-list adjacent. A lesson that names a disorder, a therapy or a "sign that you have X" is diagnosis. Risk of pathologising, of self-diagnosis, and of misrepresenting contested findings. It needs a safety reviewer role that does not exist (plan-to-2000 declined "Parents" for the same reason). Scope would have to be cognition and decision quirks only: no mental health, no development, no personality typing.

**Demand (estimate): high** as a subject, but the part we can safely check is already served by Big Ideas and Books.

**Build and review cost: high review, low build.** Simple cards, but every claim needs a source and a replication note, and the safety reviewer is missing.

**Kill criteria.** Do not start before the safety reviewer role exists and web fact-checking is allowed. If started, pause when more than a third of claims are held at the first review, or when any lesson draws a refuse-list finding.

### 1.3 Music and sound
**Fit.** Good for the maths of music; the point of music is hearing, and we cannot play it.
1. Octave: predict the frequency of the note an octave above 220 Hz, and the stage doubles a string length.
2. Why a 3:2 interval sounds consonant: predict when two waves line up again, and the stage draws both waves and where they coincide.
3. Equal temperament: predict whether 12 perfect fifths return to the starting note. The stage stacks them, and the reveal is the 23.5 cent gap (the Pythagorean comma).
4. Beats: predict the beat rate of 440 and 444 Hz, which is 4 per second (derivation).
5. Rhythm as subdivision: predict how many 16th notes fit in a bar of 7/8 (counting).

**Checkability: medium-high for ratios, low for taste.** Derivation: frequency ratios, string and pipe harmonics, beats, equal temperament, cents. `tonal` computes intervals and chords. Needs sources: history of tuning and any statement about what "sounds sad" or what cultures prefer. Rule from the stub: aesthetic claims are framed as convention or left out.

**Overlap: medium.** Physics already has `ambulance-pitch-drop`, `two-ripples-cancel`, `sound-in-the-jar`, `push-the-swing-in-time`, `press-the-string` (the string and pitch idea), and `alias-wave-wagon-wheel` in cs. Probability's `same-songs-different-hits` is a popularity lesson, not music. The wave and pitch core is taught. New ground: intervals, scales, chords, temperament, rhythm, and the math of notation.

**Safety: low.** Only hearing-damage advice (loud volumes) comes near health; leave it out or keep to a plain fact.

**Demand (estimate): medium.** Many learners play instruments. Few expect music theory in a 60-second feed.

**Build and review cost: high.** **The kit has no audio.** The most memorable lessons (consonance, beats) need sound, and autoplay rules on phones, headphone assumptions and accessibility (deaf learners) all need a design decision and a kit change (`src/kit/` is protected). Without audio, lessons are waveform pictures, which is half the subject. Review cost is low once built.

**Kill criteria.** Do not start before an audio decision record exists. If started as a silent, waveform-only strand, pause if fewer than 5 of the first 8 can be understood without sound in design review.

### 1.4 Language and linguistics
**Fit.** Good, and the stage is text, which is cheap on a phone.
1. Zipf: predict how often the 10th most common word appears relative to the 1st, and the stage plots rank against count on a real text.
2. Spelling: predict how many English spellings of the sound "ee" there are (a count from a word list).
3. Sound change as a chain: predict the later form after applying regular rules in order. The order changes the answer, which is a derivation.
4. Why translation is not one-to-one: predict the number of words for something in two languages (needs sources).
5. Ambiguity: predict the number of parses of a headline. The stage brackets it each way.

**Checkability: medium.** Derivation and simulation: word frequencies in an open text, minimal pairs and phoneme counts from `cmu-pronouncing-dictionary`, rule-ordering, parse counts, entropy of letters. Needs sources: how many languages exist, language families, etymologies, claims about when a language began, and anything about how children acquire language. Etymology is the common trap (folk etymologies are everywhere). A corpus has to be bundled: public domain texts are reachable through `nltk_data` on GitHub (not probed) and word lists through npm. Licensing needs a look.

**Overlap: medium, concentrated in AI and CS.** About 26 hits, mostly tokens and text processing in AI (`next-word-tally`, `word-in-pieces`, `meaning-without-the-word`, `king-queen-arrow`) and CS (`trie-word-length-not-count`, `same-letters-same-key`). Those teach the machine side. Human language itself (phonology, morphology, syntax, change) is untouched. Boundary: AI owns "how a model treats words"; linguistics owns "how people's language works".

**Safety: low-medium.** Dialect, accent, writing systems and "language and identity" touch politics and religion. Rule it like History's sensitive topics: a review route before build for anything about which language or dialect is "correct" or about a people. Slurs and examples need a rule.

**Demand (estimate): medium.** Strong with language learners and the curious. Probably lower than astronomy.

**Build and review cost: low-medium.** Text stages fit the kit. Some lessons use simulation runs (Zipf from random typing). Review needs a data check and a sensitivity read.

**Kill criteria.** Pause if more than a third of the first 8 need an etymology or history claim that stays held. Kill if the corpus licence cannot be settled.

### 1.5 Engineering and how things work
**Fit.** Very good for mechanisms: predict what a lever, gear train or circuit does.
1. Gear train: predict which way the last gear turns and how fast. The stage runs the train.
2. Bridge truss: predict which members are in tension. The stage loads the truss, and the reveal is that it is a calculation of forces (statics).
3. Heat pump: predict whether a fridge cools the kitchen (it warms it, an energy balance).
4. Feedback control: predict whether a thermostat with delay oscillates, as `overshoot-from-delay` already does.
5. Why tall thin things buckle: predict which of two columns fails first (a formula, a derivation).

**Checkability: high** for mechanics, circuits and thermodynamics (derivations and simulations; `simple-statistics`-style libraries are not needed). Needs sources: any real-world figure (a bridge's span, a battery's capacity, an incident), safety codes, and any history of invention.

**Overlap: high.** About 25 hits; physics owns about 10 of them (`dam-depth-not-width`, `coaster-track-shape`, `toaster-trips-breaker`, `add-a-parallel-bulb`, `brick-on-its-side`, `snowshoe-pressure`, `crate-wont-budge`). Chemistry owns the thermodynamics and gas ones, and Life Hacks has household machines. A lot of "how things work" is physics with a different label. This would split the audience of an active category rather than create a new one, and invite duplicates.

**Safety: medium-high.** Electrical and mains work, structural loads, pressure vessels, vehicles, medical devices. The Life Hacks refuse list forbids electrical work instructions. Lessons must teach why, never how to build or repair. Any lesson that reads as a recipe is a refuse-list risk, and it needs the same safety read Life Hacks gets.

**Demand (estimate): medium-high.** Wide curiosity, but a substantial share is already met by physics.

**Build and review cost: low-medium.** Fits simulation runs and CardSequence; stage drawing is hand-built per mechanism. Review cost is moderate because of the safety read.

**Kill criteria.** Pause if 4 of the first 8 are near-duplicates of a physics lesson. Kill if any lesson is found to give build-or-repair instructions.

### 1.6 Health and the body
**Fit.** Good: bodies are full of wrong intuitions.
1. Heartbeat: predict how many times a heart beats in a day (arithmetic).
2. Screening: predict the chance a positive test means disease. That is `base-rates`, already built.
3. Dose and effect: predict the effect of doubling a dose. This is medical advice territory.
4. Sleep debt: predict how much you recover after one long night (an empirical claim).
5. Why a fever helps or does not (contested, needs sources and medical review).

**Checkability: low-medium.** Arithmetic and statistics are derivable (screening, risk, rates, vaccine thresholds: all already built). Physiology facts need sources, and the safe-to-teach subset is small. `Rdatasets` has `sleep`, `ToothGrowth` and `survival/lung`, which fit statistics lessons, not claims about patients.

**Overlap: high.** About 17 hits, 13 of them in Life Sciences health-epidemiology (`herd-immunity`, `vaccinate-at-the-peak`, `antibiotic-already-there`, `epidemic-overshoot`, `waves-return`, `hemoglobin-s-curve`, `leaky-vaccine-threshold`, and others), plus `base-rates` and `the-doctor-picks-the-patients` in probability and `asthma-looks-safe` in AI. The population-level and statistics side is covered. What is left is personal medicine, which is the refuse list.

**Safety: highest.** Dosage, diagnosis, treatment, diet and exercise advice, and mental health are on the refuse list. A reader can act on a lesson that is wrong. No medical reviewer role exists. The plan already declined "Parents" (child health) for this reason. Recommend: **do not open this category.** Anything safe (the physiology of how a body works, with no advice) can be added to Life Sciences as ordinary concepts.

**Demand (estimate): very high** as a subject. That is the reason to be careful: demand pulls toward the content we cannot safely give.

**Build and review cost: low build, very high review.** Needs a medical reviewer we do not have.

**Kill criteria.** Not started. Reopen only with a medical or clinical reviewer role and founder direction, as with Parents.

### 1.7 Category ranking and why
| Rank | Category | Fit | Checkable here | Overlap | Safety | Demand (est.) | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | **Astronomy and space** | strong | high (`astronomy-engine`, HYG) | medium | low | medium-high | **Recommend next** |
| 2 | **Language and linguistics** | good | medium (`cmu-pronouncing-dictionary`, corpora) | medium | low-medium | medium | **Recommend as the reserve** |
| 3 | Engineering and how things work | very good | high | high (physics) | medium-high | medium-high | Wait: fold the unmet mechanisms into physics first |
| 4 | Music and sound | good (silent) | medium-high | medium | low | medium | Wait: needs an audio decision |
| 5 | Psychology and the mind | weak on stage | low | high (Big Ideas, Books) | high | high | Wait: no safety reviewer, little checkable |
| 6 | Health and the body | good | low-medium | high (Life Sciences) | highest | very high | Decline for now |

## 2. A second course for the Courses org

The model is NCM: one anchor work, a chapter-by-chapter path, `curriculum.references`, a coverage command. NCM's anchor is a free PDF with 24 chapters. Facts from NCM that constrain this choice: the **NCM section numbers were written without the book to hand and still wait on a web check** (W-420), and plan-to-2000 says a second course comes only "if NCM's learner results are good". There is no learner data, so **every option below is premature on the plan's own terms**. The proposal is to choose the anchor now so a brief can be written cheaply later, not to start building.

### 2.1 Thinking in Systems (Meadows, 2008)
**Fit.** Strong for the core chapters. 1. Stocks and flows: predict the water level of a bathtub with the drain and tap changing. 2. Balancing loop with delay: predict whether a shower tap setting overshoots. 3. Reinforcing loop: predict when a doubling account passes a limit. 4. Limits to growth: predict when a growing population hits its carrying limit and whether it oscillates. 5. Policy resistance: predict the result when two actors push the same stock opposite ways.
**Checkability: high for the mechanics** (every stock-and-flow lesson is an ODE or a difference equation we can simulate and re-run), **low for the book's narrative claims** (fisheries, Sahel, cases in the book need sources). The book is not free, so the chapter list and section numbers are unconfirmed, as NCM's were.
**Overlap: medium-high with ourselves.** `works.json` lists it as a **Books** deck (Wave B has `meadows-stock-and-flow`, brief 24 `late-hot-water-overshoots`; books-strategy.md notes Big Ideas owns emergence). Existing lessons: `life/overshoot-from-delay`, `life/thermostat-leftover`, `life/three-day-doubling`, `life/stale-case-counts`, `lifehacks/lh-lead-time-stock`, `lifehacks/keep-the-error-feedback`. The regex search for feedback, stock and delay terms gave 15 hits. A course would mostly organise lessons we already hold, as NCM does.
**Build and review cost: low** on simulations and a slider-drives-chart format, which exists. **Demand (estimate): medium**; it has a loyal reading audience of designers, managers and policy students.
**Risk:** in-copyright text: quote almost nothing, keep every claim a derivation. Chapters are conceptual, so "one chapter, one result" fits less cleanly than NCM (about 6 chapters of 8 yield a predictable result).
**Kill criteria.** Same as NCM: pause if 4 of the first 8 built lessons fail the 60-second fit; kill 60 days after deploy if recall is more than 10 points below the feed median and path completion is under 15%.

### 2.2 An intro statistics text
**Fit.** Good: simulation is the natural proof. 1. Sampling: predict how much a poll of 100 swings. 2. Confidence interval: predict how many of 100 intervals miss the truth. 3. Simpson's paradox: predict which group wins. 4. p-hacking: predict the false-positive rate after 20 looks. 5. Correlation with an outlier: predict r.
**Checkability: very high.** Everything is simulation and derivation. `simple-statistics` and `jstat` (npm), `statsmodels` (PyPI), and real data on GitHub raw: `mtcars`, `airquality`, `sleep`, `ToothGrowth`, `penguins`. A free, openly licensed text (for example OpenIntro Statistics) is the likely anchor, and its chapter list is **unconfirmed from here**.
**Overlap: very high.** Probability has a statistics strand with `which-coin-is-it`, `stop-when-it-looks-significant`, `how-surprising-is-sixty`, `significant-but-false`, `same-line-four-pictures`, `base-rates`, and others. W-556 Ask 1 already asks for an **exam-prep pilot on intro statistics (AP Statistics)**, which maps the same ground to a syllabus. Two verticals on one subject would split the same lessons and the same CM.
**Build and review cost: lowest** (strand mostly built). **Demand (estimate): high** (required in many degrees).
**Verdict:** do not make this a separate course. Fold it into the exam-prep pilot, with an open textbook as a second reference list if the founder approves Ask 1.

### 2.3 Game theory
**Fit.** Strong. 1. Dominant strategy: predict the outcome of a prisoner's dilemma. 2. Mixed strategy: predict the penalty kicker's best mix. 3. Repeated play: predict whether tit-for-tat survives. 4. Auction: predict the winning bid. 5. Bargaining: predict the split.
**Checkability: very high** (payoff matrices, equilibria, simulation of repeated play). No dataset needed.
**Overlap: the highest of the three.** Economics already has about 9 game lessons: `two-suspects-payoff`, `no-best-move-one-stable-pair`, `honest-bid-loses-in-gsp`, `same-revenue-any-rule`, `outside-option-sets-the-split`, `bid-what-its-worth`, `rising-price-stops-at-second`, `shade-your-sealed-bid`, `pay-for-the-harm-you-do`. Life has `strategy-builder` (repeated play), and NCM chapters 6 to 9 cover games and auctions. There is no obvious single anchor book (Axelrod is a Books deck). This would be a re-labelling of NCM's second half.
**Verdict:** not a new course. It is already a path inside NCM and economics-markets.

### 2.4 Course ranking
| Rank | Course | Why | When |
|---|---|---|---|
| 1 | **Thinking in Systems** | Only option with a real gap (a "systems" path) and a shared anchor we already list; simulations check it; copyright means derivation-only claims | Choose the anchor now; no building before NCM data and the W-556 gate |
| 2 | Intro statistics | Highest checkability but it is the exam-prep pilot (Ask 1) | Decide with Ask 1, not separately |
| 3 | Game theory | Already inside NCM and economics | Make it a path, not a course |

## 3. Recommendation
Respect "one new vertical at a time" and W-556: the History category is the one in progress, the review queue is 319 against a gate of 160, and new categories add no review capacity.
1. **Next category: Astronomy and space, as incubating.** It is the only candidate with high checkability from this host, low safety risk and a free reviewer route (recomputation). It gets at most two lessons while incubating, run by an existing category manager (physics) or the scout, per `company/domains/README.md`. It starts when History's first batch has passed review, not before.
2. **Reserve: Language and linguistics.** Safe, mostly checkable, and its overlap with AI and CS is a boundary, not a duplication.
3. **Do not start Engineering, Music, Psychology or Health.** Engineering becomes extra physics concepts. Music waits on an audio decision (kit change, protected path). Psychology and Health wait on a safety reviewer.
4. **Second course:** pick Thinking in Systems as the anchor, write nothing but the vertical doc, and wait for NCM learner data.

## 4. Objections I expect, and my answers
- *"The founder liked all of them."* True. This ranks the order of entry, not whether to enter. Nothing here declines a subject permanently except Health, which is the refuse list's call.
- *"Astronomy overlaps physics and geography."* About eight lessons already touch it. I count new ground in phases, locking, retrogrades, scale, eclipses and brightness, and I set pause criteria on duplicates.
- *"Psychology has the highest demand."* Probably, which is an estimate. The part we can check is already in Big Ideas and Books, and the rest needs a reviewer role that does not exist.
- *"A second course now is premature."* Agreed. The recommendation is to name the anchor, not to build.

## 5. What I am unsure of
- Demand ranks are my judgement. Moderate confidence on the order of 1 and 2, low on 3 and 4.
- Overlap counts come from keyword search and a reading of slugs, not a read of every lesson.
- I did not install any package. I probed that each one exists and is reachable, and I did not check licences beyond the registry's label.
- The Meadows chapter list and any statistics textbook's chapter list are unconfirmed.

## Decision
Pending Domain Launch Review (head-of-product) and the founder's choice (board W-685).
