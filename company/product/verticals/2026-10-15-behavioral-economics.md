# Behavioral economics and irrational behavior: case, size, form and checkability

owner: principal-pm-verticals (Selin) · date: 2026-10-15 · status: **proposed** (step 1 of `category-onboarding-playbook.md`). The founder decides the form (category, strand or course) and the slot budget (founder inbox F-21, F-22). head-of-product decides the slot line and the boundary rulings. The domain scout writes the DLR proposal.

**Status, 2026-10-16:** the founder chose a **category** (F-21), and head-of-product's decision (`company/decisions/2026-10-15-behavioral-economics-dlr-decision.md`) supersedes §4 (form), §5 (splits: now the signed boundary table) and §7 (size: a ceiling of 18, not 40; recommendation F-22). §6 now carries the W-902 sourced verdicts. Sections 4, 5 and 7 are kept as the case that was made, not as the plan.
inputs read: the founder's ask (via the chief of staff, 2026-10-15); `plan-to-2000.md` (third pass); `2026-10-14-history-and-next-categories.md`; `company/domains/proposals/2026-10-14-next-categories.md` §1.2 (psychology: "wait"); `content/curriculum/{economics,probability,books,big-ideas}.json`; `company/domains/{economics,books,big-ideas,big-ideas-strategy,books-strategy}.md`; `src/demos/*/*/meta.json` (concept search); `company/ops/token-budget.md` §6; `tools/org/roles.mjs` (SUBAREAS); `src/lib/hq.ts`; `2026-10-15-founder-sensitive-route-and-history-tranches.md`.
evidence status: **no demand evidence.** Release 2026.10.15.1 went out today, but no commit or recall data exists yet. CM demand ratings are estimates. I use no borrowed-mind review as market evidence. Every replication verdict in §6 is my prior, written from memory. **No source was opened from this host.** The fact-checker must source each one before it becomes a claim.

## 1. The case: why predict-and-see can be the best in the world here

Most behavioral-economics teaching (books, talks, videos, textbooks) says "people do X". Our format can say "**you** just did X". The learner makes the choice on the stage (a gamble, a delay, an offer, a guess), and the reveal shows two things. First, what a stated model predicts: expected value, expected utility, exponential discounting, equilibrium. Second, where the learner's own answers break that model. **An inconsistency inside the learner's own answers is a derivation, not a survey result.** No utility function fits both Allais choices, and no exponential discounter reverses a preference as two dates approach. So the strongest part of this subject is also the part we can check best.

The second edge is honesty. Since the replication crisis, a lesson that shows the effect **and** gives its replication verdict in the same 60 seconds has few rivals I know of. I cannot verify competitors from here, so this is a judgement and not evidence.

## 2. Audience and job to be done

- **Adults deciding about money, risk and time** (Economics' audience). The job: "show me the mistake I make, on my own answers, and tell me honestly whether the research holds."
- **Intro economics and psychology students** (AP Microeconomics and AP Psychology both include decision biases. That is from memory, unconfirmed, and the syllabi cannot be opened here). This links the subject to the exam-prep vertical (W-582) later. No new vertical is needed.
- **Product, policy and marketing people** who use "nudges". For them the job is the verdict: which effects survive at scale.

Out of scope: mental health, diagnosis, personality typing (the psychology refuse line in the scout's §1.2), investment advice (the Economics refuse list), and **manipulation how-tos**. Choice architecture is taught from the chooser's side ("spot the decoy"), never as "how to sell with one".

## 3. What already exists: about 30 concepts in 4 categories, 15 lessons on disk

| Category / strand | Concepts already in the map (lessons on disk) |
|---|---|
| **Economics** (mostly no strand set; `ultimatum-game` and `common-value-winners-curse` in markets) | `sunk-cost` (sunk-cost-exit), `ultimatum-game` (lowball-offer-should-pass), `risk-aversion` (square-root-wealth), `public-goods-free-rider` (free-rider-pot), `common-value-winners-curse` (winning-bid-overpays, draft), `forgone-cash-discount` |
| **Probability** | `base-rates`, `gamblers-fallacy`, `hot-hand`, `conjunction-fallacy`, `regression-to-mean`, `winners-curse`, `information-cascade`, `self-selection-bias` (8 lessons) |
| **Books**, psychology strand | `tfs-anchoring` (wheel-number-pulls-guess, draft), `tfs-loss-aversion`, `tfs-planning-fallacy`, `tfs-peak-end`, `nudge-defaults`, `nudge-order-effects`, `irrational-decoy`, `irrational-zero-price`, `influence-reciprocity`, `influence-commitment`, `noise-bias-vs-noise`. *Misbehaving* (endowment) is deck 30 in books-strategy |
| **Big Ideas**, mind and society | `dunning-kruger-artifact` (draft), `cognitive-dissonance`, `hedonic-adaptation`, `most-findings-false`, `costly-signalling`, `moral-hazard`, `principal-agent`, `perverse-incentives` |

**What is new ground** (owned by nobody today): choice under risk beyond risk aversion (the certainty effect and Allais, the reflection effect, probability weighting, gain/loss framing, reference points); time (present bias and preference reversal, commitment devices, automatic escalation); other people (the dictator and trust games, public goods with punishment, the beauty contest and level-k reasoning); mental accounting, money illusion, the endowment effect, calibration of one's own intervals, the disposition effect; and the honest record ("nudges shrink at scale", choice overload as contested). I count **about 25 candidates, of which about 15-18 have no collision**. That is strand-sized. A category with a 60-lesson target would have to take concepts from Books and Probability to fill itself.

## 4. Form: new category, strand of Economics, or course

| Option | For | Against |
|---|---|---|
| **New category** (cm + 3 strands, floor 6) | The founder asked for one. A distinct identity in the feed. Room to grow into psychology later | About 30 of its concepts already live in 4 other categories, so it would start as a boundary dispute. New ground is about 15-18 clean concepts. It adds 4 roles for a pilot of 5: the idle-org failure the CEO office named for History. Review capacity has not grown |
| **Strand of Economics** ("Behavioral Economics & Decisions", `subarea: behavioral`) | "Mechanism lives in the subject": the economics lessons that already exist are re-tagged, not moved across categories. No `DomainId`, kit or new floor is needed. One new role, the strand manager. cm-economics' charter already says "simple models labelled as models", which is exactly the comparison these lessons make | The Economics checking rule ("arithmetic is derivation") has no replication rule, so it must be amended. Markets is "crowding", and Economics already gave 10 slots to History. "Irrational behavior" outside money (conjunction, planning, peak-end) does not fit "Economics & Money", so it stays in its categories and reaches learners through the path below. The subject gets a weaker brand in the feed |
| **Course** (Courses org, one anchor work) | An ordered path with an external spine | The natural anchors (*Thinking, Fast and Slow*, *Misbehaving*, *Nudge*) are Books decks under the copyright rules. An open behavioral-economics textbook has not been found or opened from here. The plan says no second course before NCM learner data |

**Recommendation: a strand of Economics, plus a cross-category path now. It is promoted to a category only on a trigger.**

1. **Strand.** `economics.behavioral`, "Behavioral Economics & Decisions". cm-economics incubates the pilot. The strand manager role is generated when the pilot passes (playbook step 5).
2. **Path, now, zero new lessons.** Personalization builds "Why we decide badly" over the ~15 lessons on disk across economics, probability, Books and Big Ideas. Release 2026.10.15.1 is live, so this path is the cheapest demand test we have.
3. **Promotion trigger to a category** (founder decides, playbook steps 5-8): the strand has 25 published lessons; at least 40 concepts pass the entry rules without taking one from a neighbour; deployed 7-day recall and commit rate are at or above the feed median; the held-claim rate is 25% or lower.

**My objections to my own recommendation.**
- **The founder asked for a category.** A strand may read as saying no. It is not a no. It is the same pilot, with one role instead of four. If the founder wants the category, the alternative in §7 is fully specified, and I would size it the same.
- **Economics' checking rule must change** to add the Big Ideas replication rule (strong form, evidence, where it stops) for empirical claims. cm-economics may object. That goes to head-of-product.
- **cm-economics' load.** Economics is already giving up slots, and markets is crowding. A fourth strand under one lead could get starved. Mitigation: the strand has its own slot line, so it cannot be raided for other strands.
- **The split is untidy.** Anchoring, loss aversion, defaults and the decoy, the subject's most famous effects, stay with Books (§5). A learner who searches "behavioral economics" finds them through the path, not in the strand. I accept that cost to avoid building the same lesson twice.

## 5. Overlaps and how to split each one

**One rule: the strand owns choice under risk, time and other people, where the stage is the learner's own choice compared with a stated model. Probability owns the mathematics of a judgement error. Books owns what a book argues and whether it holds. Big Ideas owns the ideas that change how people see, including the replication failures it has already ranked.** Every brief names its nearest lesson. New pairs need the neighbour CM's written sign-off. Disputes go to head-of-product, as with History.

| Neighbour | Main risk | Split |
|---|---|---|
| **Economics, markets** (cm-economics, cm-economics-markets) | The ultimatum game, winner's curse, sunk cost, risk aversion and public goods are already economics concepts | Re-tag `sunk-cost`, `ultimatum-game`, `risk-aversion`, `public-goods-free-rider` and `common-value-winners-curse` to `behavioral`. The lessons do not change. Markets keeps auctions, game-theory equilibria and market mechanisms. The strand takes the *departure from* the equilibrium |
| **Big Ideas, mind and society** | `cognitive-dissonance`, `hedonic-adaptation`, `most-findings-false` and `dunning-kruger-artifact` are close. So are the replication-failure lessons the Big Ideas charter allows ("taught as failures of the finding") | Big Ideas keeps every concept it has ranked. Big Ideas has first refusal on any replication-failure lesson (ego depletion, priming). The strand may teach "nudges shrink at scale" only with cm-big-ideas' sign-off (`most-findings-false` is its doorway) |
| **Books, psychology** (Kahneman, Thaler, Sunstein, Ariely, Cialdini) | The core of the subject sits in Books decks: anchoring, loss aversion, defaults, decoy, zero price, endowment | Books keeps every concept in `books.json`. The strand does not brief a lesson that tests the same misconception while that book has a deck in the plan. **One exception, proposed:** the endowment effect (`Misbehaving`, deck 30, unbriefed) goes to the strand, and the Books deck names it as its nearest lesson. That needs cm-books' sign-off. Loss aversion: Books keeps "the book argues about 2×", and the strand teaches reference dependence (the same outcome as a gain or a loss) as a separate misconception |
| **Probability** (biases, base rates) | Conjunction, gambler's fallacy, hot hand, base rates, regression and winner's curse are judgement errors with a derivation | Probability keeps all of them. The strand names them as prerequisites and does not re-run their stages. Calibration of the learner's own 90% intervals goes to the strand only if cm-probability agrees (data literacy is its nearest strand) |

## 6. Checkability: what we teach as a claim, and what as contested

Claim types, in order of preference: **(a) derivation** (an expected value, a utility consistency check, a discount-curve reversal, an iterated best response, a winner's-curse simulation); **(b) the learner's own screen** ("your two answers cannot both maximise expected utility"); **(c) a disclosed, seeded simulation** of a crowd. It is labelled a simulation and never presented as "people chose". **(d) A source plus a replication status**, using Big Ideas' shared verdict words (holds up · holds with limits · mixed or contested · untested · did not replicate). Any sentence like "most people choose A" is a type (d) claim, with its sample. I expect a held-claim rate of **30-40%** until a web-capable fact-check runs on every wave, the same as Big Ideas. **Within-learner designs have a cost:** seeing both frames weakens a framing effect. The reveal says so.

Verdicts in the first table are **priors from memory**. Pointers are for the fact-checker only. **The sourced verdicts are in the second table (W-902, 2026-10-15), and where the two differ, the W-902 verdict governs.** Neither table marks any claim verified; the fact-checker opens each source.

| Effect | Prior verdict | Teach as | Pointer to check |
|---|---|---|---|
| Gain/loss framing (Asian disease) | holds up | claim, with the learner's own pair | Many Labs 1 (Klein et al. 2014) |
| Certainty effect, Allais, reflection | holds up | derivation on the learner's answers, plus a sourced line | Ruggeri et al. 2020 (prospect theory replicated across 19 countries) |
| Anchoring | holds up with informative anchors, weaker with random ones | **Books owns it**. Linked only | Many Labs 1; Maniadis et al. 2014 |
| Sunk cost | holds with limits | already taught (economics) | Many Labs 1 |
| Defaults | holds up for behaviour, smaller for outcomes | **Books owns it** | Madrian & Shea 2001; Jachimowicz et al. 2019 meta-analysis |
| Endowment effect (WTA > WTP) | holds with limits (procedure-dependent) | claim plus where it stops | Kahneman, Knetsch & Thaler 1990; Plott & Zeiler 2005 |
| Loss aversion, size about 2 | holds with limits; size contested | reference dependence as the claim, the size as contested | Gal & Rucker 2018; Brown et al. meta-analysis (JEL, 2024) |
| Present bias / hyperbolic discounting | holds with limits: clearer for effort than for money | derivation (the reversal) plus a sourced limit | Andreoni & Sprenger 2012; Augenblick et al. 2015 |
| Commitment and automatic escalation | holds with limits (few sites) | claim plus scope | Ashraf, Karlan & Yin 2006; Thaler & Benartzi 2004 |
| Ultimatum rejections, dictator giving, trust, punishment in public goods | holds up in labs, varies across cultures | claim plus "in labs" | Henrich et al. 2001; Fehr & Gächter 2000; List 2007 (dictator framing) |
| Beauty contest / level-k | holds up | derivation (equilibrium 0) plus a sourced first-round mean | Nagel 1995 |
| Overconfidence in 90% intervals | holds up, domain-dependent | the learner's own intervals | calibration literature (to source) |
| Mental accounting, money illusion | holds with limits | claim plus scope | Hastings & Shapiro 2013; Shafir, Diamond & Tversky 1997 |
| Decoy (asymmetric dominance) | mixed outside the lab | **Books owns it**, verdict "mixed" | Frederick, Lee & Baskin 2014 |
| Nudge effects at scale | mixed: much smaller in nudge units than in papers | contested, with cm-big-ideas' sign-off | DellaVigna & Linos 2022; Maier et al. 2022 |
| Choice overload (the jam study) | mixed: meta-analytic mean near zero | **contested only**, never as a finding | Scheibehenne et al. 2010; Chernev et al. 2015 |
| Scarcity mindset | mixed | contested only, or not at all | O'Donnell et al. 2021 |
| Social priming, money priming | did not replicate | **never as a claim.** Failure lesson only (Big Ideas first) | Doyen et al. 2012; Many Labs 1 |
| Ego depletion | did not replicate | never as a claim. Failure lesson only (Big Ideas first) | Hagger et al. 2016; Vohs et al. 2021 |
| Power posing, honesty pledge at the top of a form | did not replicate / retracted | never | Ranehill et al. 2015; Shu et al. 2012, retracted 2021 |

**Charter rule** (now in `company/domains/behavioral.md`, not Economics' charter: decision objection 3): no finding whose verdict is "mixed" or worse appears in a predict answer. A retracted or fabricated study is a dispute, and the lesson becomes about the correction or is withdrawn (Books rule 6).

### Sourced verdicts (W-902, research-lead, 2026-10-15), added 2026-10-16 (W-1041)

Source: `company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md`. "Opened" = fetched from PMC (OAI-PMH endpoint) and read; "secondary" = reported by an opened paper. **None of the five headline replication reports is in PMC** (Many Labs 1, Hagger et al. 2016, Ruggeri et al. 2020, DellaVigna & Linos 2022, Nagel 1995); three are citable at second hand, always as "as reported by <opened paper>".

| Effect | Prior (table above) | W-902 verdict | Opened source (PMC) | What changes for the portfolio |
|---|---|---|---|---|
| Allais / certainty effect, reflection | holds up | **robust**, attenuated against 1979; experts violate less; reflection "largely lost" in crisis samples | PMC9337702 (Ruggeri 2020 secondary), PMC545552, PMC13576738 | none for pilot 1 (`sure-million-or-long-shot`, c6 cites this row). Reflection, the pilot-4 fallback, carries a population limit |
| Framing (risky choice) | holds up | **robust**: d = 0.69, 88,181 people in 47 countries; varies by nation | PMC8432807 (Many Labs 1 d = 0.60 secondary) | pilot 4 may source its framing line here, as cm-books B1 asks (research, not a book) |
| Endowment effect | with limits | **with limits**: shrinks or vanishes when choice uncertainty is reduced; absent in one baseline and one cultural setting | PMC9200560, PMC6956941, PMC8822236 | the scope debate must be in the reveal (B2 condition 2); it is sourced now |
| Present bias | with limits (effort > money) | **with limits**: money-based reversals much weaker; 61 countries, 54% show an anomaly | PMC10489299, PMC9584811 | none for pilot 2 (`same-week-a-year-apart`, c6 cites this row); the reversal stays a derivation |
| Mental accounting | with limits | **with limits, problem-specific**: 11 of 17 Thaler problems replicated; theatre ticket yes, jacket-calculator no | PMC12445221 | pilot 5 may cite only replicated problems; its stage is the learner's own pair (E6) |
| Beauty contest / level-k | holds up | **robust**: first-round means 36.4 and 39.0-44.6 in two opened samples | PMC5303671, PMC4446529, PMC2685737 | pilot 3 may quote a sample mean as type (d); Nagel 1995 stays held (E8) |
| Overconfidence, 90% intervals | holds up | **robust, format-dependent**: 73.8% hit in one sample; SPIES removed it | PMC5386407, PMC5978695 | #11 teaches from the learner's own ranges (P3); any "most people" line stays held |
| Money illusion | with limits | **with limits, thinly sourced**: two small lab studies, no replication project | PMC2664018, PMC3559431 | moot: #12 dropped on E9; the thin evidence is a second reason |
| Dictator giving | holds up in labs | **with limits**: ~28% given (Engel 2011, secondary), Western undergraduate labs; stakes matter in some populations | PMC11819478, PMC3741194 | "in labs" and "varies across populations" in the same reveal (unchanged) |
| Social and money priming | did not replicate | **failed** for the iconic studies; the field as a whole **contested** (two meta-analyses d ≈ 0.35-0.37) | PMC3261136, PMC4831299, PMC5783538, PMC12421318, PMC8522447 | stays Big Ideas' first refusal (G0(4)); a failure lesson must say "contested" of the field and "did not replicate" of the named studies |
| Ego depletion | did not replicate | **failed**: d = 0.06 in 36 labs (N = 3,531) | PMC12422598, PMC6124090, PMC4971805 | unchanged: never taught here |
| Power posing | did not replicate | **failed** (hormones, felt power) | PMC6585898, PMC11619626 | unchanged: never taught here |
| Nudges at scale | mixed | **with limits (small at scale)**: 1.9 pp, 13% over a 15% base, 73 trials; the journal comparison not opened, so "contested" stays for the comparison | PMC11449432 | the G2 reserve's predict answer (the gap) is still unsourced; it stays unbriefed (G2 condition 3) |

**Not sourced in this pass** (priors only, every line held): anchoring, sunk cost, defaults, loss-aversion size, commitment devices and automatic escalation, decoy, choice overload, scarcity, the honesty-pledge retraction. Two of these are in the fold floor (`commitment-devices`, `automatic-escalation`) with type (d) only claims, so they wait on a second W-902 pass and the fact-checker's (d) statement (decision Amendment 1, A1.1 dated check).

**What I now believe (and how sure).** The pilot's checkable core holds: the five pilot effects each have an opened PMC source with a verdict at "with limits" or better (fairly sure; the fact-checker has not opened them). The risk has moved from the pilot to the floor: four of the 14 floor concepts are type (d) only, and two of those are unsourced (about 70% that a second pass sources at least one; a guess).

## 7. Size inside plan-to-2000, and where the slots come from

**Target: 40 counted lessons in the strand**, which is about 2% of the 2,000. Five exist and are re-tagged; **35 are new**. **Tranche 1: a pilot of 5** (the DLR five, playbook step 11), all type (a) or (b), with no held claims. **Tranche 2: 30**, released when the DLR five pass, the held-claim rate is 25% or lower, a Project Review approves it, and, once there is data, the path's commit rate is at least the feed median.

**Slots:** 35 from the uncommitted N-Q pool (~608 → ~573). Nothing committed in K-M moves, and there is no W-556 exemption. The pilot competes for the next wave whose gate opens. **To keep the total at 2,000:** cs −10 (185 → 175, saturating), life −10 (150 → 140, thinning), geography −5 (95 → 90, blocked on data), Big Ideas' conditional tranche −10 (170 → 160: its mind strand loses the decision-bias ideas it would otherwise have briefed). Economics goes 165 → 200. The alternatives are the founder's: a total of 2,035, or other cuts.

**Budget** (measured 101k tokens per published lesson): tranche 1 ≈ **0.6M** (5 lessons, plus the charter amendment, curriculum and research note). Tranche 2 ≈ **3.0M**. It is a major project under token-budget §6 rule 2 (a new role).

**If the founder chooses a category instead:** the target is still 40, with the same slots and tranches. Add `cm-behavioral` now and 3 strands after the DLR five: risk and reference points; time and self-control; fairness, trust and strategy. `DomainId` and theme go through platform-engineer, and the office goes on HQ floor 6, row 2 (the free space beside the stairs). Even then, the Economics concepts stay in Economics, and Books and Probability keep theirs.

**Kill or pause.** Pause if 3 of the DLR five are rejected as duplicates or the held-claim rate goes over 40%. Fold back into markets 60 days after deploy if 7-day recall is more than 10 points below the feed median and commit rate is below it.

## Board asks (the chief of staff files them)

1. **domain-scout:** DLR proposal for "Behavioral Economics & Decisions" as a strand of Economics, with the category variant noted. Use the template, 8-12 concepts from §3's new ground, and 3 candidate lessons of claim type (a) or (b). Take checkability per §6. Record: `company/rituals/records/<date>-domain-launch-behavioral.md`.
2. **head-of-product:** decide (i) the form (recommend strand; founder F-21), (ii) the four boundary splits in §5, including the endowment exception and loss aversion, (iii) the slot line (pilot 5 plus 30 conditional, from N-Q; founder F-22), and (iv) the Economics charter amendment for the replication rule. Also accept the onboarding playbook as the order of work.
3. **portfolio-manager:** add project `behavioral-econ` to `projects.json`: tranche 1 ≈ 0.6M, tranche 2 ≈ 3.0M on the §7 triggers. Put it on the next Project Review agenda.
4. **chief-of-staff-ceo-office:** draft the org-change record for `cm-economics-behavioral` (reports to cm-economics). Consult head-of-product, cm-economics, cm-books, cm-probability and cm-big-ideas. **Generate only after the DLR five pass.** Also add the playbook's step order to the CEO office's own process doc, which I do not edit.
5. **tools-lead (with hq-engineer):** HQ placement. A strand seats in the Economics office on floor 3, desk 5 of 9, with no new room. For the category variant, plan a floor 6 row 2 office. No code until step 5 generates the role.
6. Also: **personalization-lead**, the "Why we decide badly" path over existing lessons. **cm-economics**, the re-tags and the charter text. **research-lead**, a research note sourcing §6. **cm-books**, sign-off on the endowment exception.

## This would be wrong if

- the DLR scout finds 40 or more clean concepts beyond the neighbours' maps. Then the category is right, and earlier;
- the path's commit and recall come in far above the feed median. Then release tranche 2 early, and consider promotion;
- the fact-checker cannot source the replication record from here. Then the strand narrows to claim types (a) and (b), about 15 lessons.
