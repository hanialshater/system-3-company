# Domain Launch Review: 2026-10-15: Behavioral Economics and Irrational Behavior (category)

owner: domain-scout (Kofi) · decides: head-of-product (W-897) · ratifies in OP: founder
task: W-896 · playbook step 2 (`company/product/verticals/category-onboarding-playbook.md`)
form: **category**, as the founder decided (F-21, `company/decisions/2026-10-15-founder-behavioral-economics-category.md`). This review does not reopen the form. Where the strand variant would change an answer, it says so.
inputs: `company/product/verticals/2026-10-15-behavioral-economics.md` (Selin; §5 splits, §6 verdicts); budget pack Item 8 (`company/ceo-office/2026-10-14-project-review-1-agenda.md`, Addendum 2026-10-15); `content/curriculum/{economics,probability,books,big-ideas}.json`, read in full as id lists on 2026-10-15; `content/curriculum/{math,ai}.json` by grep only.

**Evidence status, stated first.**
- **No demand evidence exists.** Every demand rating below is my estimate on a 1 (low) to 3 (high) scale, the same as the curricula. None is measured.
- **No replication verdict has been sourced.** The verdicts are Selin's priors from memory. I checked only that hosts answer (below). I opened no paper. Nothing here is a verified claim.
- The derivations in the three candidate lessons are my own arithmetic, done by hand while writing. The CM must have them re-run in a `briefs/checks/` script before they become claims.

## Proposal

### Audience and why they would care
- **Adults deciding about money, risk and time.** The job: "show me the mistake I make, on my own answers, and tell me honestly whether the research holds." The stage is the learner's own choice. The reveal shows that no single consistent model fits both of their answers. That is a derivation, not a survey.
- **Intro economics and psychology students.** I assume decision-bias units appear in intro courses. I cannot open a syllabus from here, so that is unconfirmed.
- **Product, policy and marketing people** who use "nudge" language. For them the job is the replication verdict, taught from the chooser's side ("spot it"), never as a persuasion how-to.
- Why a stand-alone group, in the founder's terms: the subject joins economics and psychology, and our format is unusually well matched to it (the learner is the subject). The honest record of what replicated is the second edge. Both are judgements, and I cannot check competitors from here.

### 8-12 concepts with demand (draft curriculum)
Twelve concepts. All have no concept id in the four neighbouring curricula. "Near" names the closest existing concept; the full table is under Overlap. Demand is my estimate. The claim type is from the Checkability section (a derivation, b learner's own screen, c disclosed simulation, d source plus replication status).

| # | id (draft) | Concept | Demand | Claim type | Nearest existing | Prereq |
|---|---|---|---|---|---|---|
| 1 | `allais-certainty-effect` | A sure thing and a 1% risk of nothing: no utility function fits both of your choices | 3 | a, b | economics:risk-aversion; probability:expected-value | probability:expected-value |
| 2 | `reflection-effect` | Cautious about gains, a gambler about losses, on the same numbers | 2 | b, d | economics:risk-aversion | #1 |
| 3 | `probability-weighting` | Why a 1% chance feels bigger than 1% (lottery and insurance) | 2 | a, d | economics:insurance-expected-cost; probability:lottery-odds | #1 |
| 4 | `gain-loss-framing` | The same outcome stated as lives saved or lives lost | 3 | b, d | books:tfs-loss-aversion | #2 |
| 5 | `endowment-effect` | Your price to sell versus your price to buy, for the same mug | 3 | d | books: *Misbehaving* (deck 30, unbriefed); books:tfs-loss-aversion | #4 |
| 6 | `present-bias-reversal` | Patient about next year, impatient about today, with the delay unchanged | 3 | a, b, d | economics:present-value; books:tfs-planning-fallacy | economics:present-value |
| 7 | `commitment-devices` | Why people tie their own hands, and when it works | 2 | d | books:influence-commitment; economics:first-mover-commitment | #6 |
| 8 | `mental-accounting` | Money in different mental envelopes is still the same money | 2 | b, d | economics:sunk-cost, opportunity-cost, forgone-cash-discount | economics:opportunity-cost |
| 9 | `dictator-giving` | What people give when nobody can retaliate, and what shifts it | 2 | d | economics:ultimatum-game, nash-bargaining | economics:ultimatum-game |
| 10 | `beauty-contest-level-k` | Guess two thirds of the average: how many steps ahead do you think? | 3 | a, c, d | economics:iterated-dominance, nash-equilibrium (markets) | economics:iterated-dominance |
| 11 | `interval-overconfidence` | Your "90% sure" ranges, scored against the answers | 2 | b, d | probability:confidence-intervals (not the same thing); ai:calibration (models); books:signal-calibrated-weather; big-ideas:dunning-kruger-artifact | probability:confidence-intervals |
| 12 | `money-illusion` | Same real change, different feeling when the number is nominal | 2 | b, d | economics:inflation, real-interest-rate, percent-points | economics:inflation |

**Reserve list (not counted):** automatic escalation of saving (few sites), costly punishment in public goods (near `public-goods-free-rider`), the disposition effect (needs a data source), "nudges shrink at scale" (contested; only with cm-big-ideas' sign-off), choice overload (contested only, never a predict answer), scarcity mindset (contested or dropped).

**What this list says about the size target.** I found 12 counted concepts and about 6 reserves, so **about 16-18 collision-free concepts** in all. That matches Selin's "about 15-18". It is well short of the 40 counted lessons the founder's decision keeps. Five lessons exist for the category only if the Economics lessons are moved, and the founder's record says a category must not take lessons from its neighbours. So the 40 target cannot be met from clean ground today. Closing the gap needs one of: more concepts from fields I have not yet scouted (negotiation and bargaining anomalies, behavioural finance, savings and health decisions), a boundary ruling that moves neighbour concepts, or a lower target. I have not tried to pad the list. That is for head-of-product (W-897) and F-22.

### Three candidate lessons (concept → misconception → interaction)
All three can be built with claim type a or b only, with no survey claim in a predict answer. The arithmetic is mine and is unchecked by a script.

**1. `allais-certainty-effect`**
- **Concept.** Under expected utility, preferring a sure $1M over a gamble in one pair forces a particular choice in a second pair.
- **Misconception.** "Choosing the safe option in one question and the gamble in another is just being sensible about each. My answers cannot be wrong, because they are my tastes."
- **Interaction.** Predict: the learner picks in two pairs. Pair 1: A = $1M for sure; B = 89% $1M, 10% $5M, 1% nothing. Pair 2: C = 11% $1M (else nothing); D = 10% $5M (else nothing). Explore: a slider sets how much the learner values $5M relative to $1M, and shows which options each setting favours in each pair. Reveal. With u(0)=0, A over B means 0.11·u(1M) > 0.10·u(5M), and C over D means exactly the same inequality. So choosing A with D, or B with C, cannot be fitted by any utility function. The slider never finds a value that gives that pair. The reveal says what it does not show: it does not say the choice is "wrong", only that the model cannot hold both. A sourced line on how often people choose A and D is a type d claim and is **held** until sourced (Ruggeri et al. 2020 is Selin's pointer).

**2. `present-bias-reversal`**
- **Concept.** An exponential discounter who prefers $110 in 53 weeks over $100 in 52 weeks must also prefer $110 in one week over $100 today. A preference flip as the dates approach is the sign of a different discount curve.
- **Misconception.** "A one-week wait costs the same whenever it happens, so my answers will not depend on how far away the dates are."
- **Interaction.** Predict: the learner picks in two pairs, $100 today versus $110 in a week, and $100 in 52 weeks versus $110 in 53 weeks. Explore: a "slide both dates out" control, with the learner's choice replayed at each distance. Reveal. For any constant weekly factor δ, each pair reduces to whether 110δ exceeds 100, because the 52 weeks of waiting multiplies both sides. A learner who takes the money today but waits at 52 weeks has reversed, and no constant δ explains it. The limit goes in the reveal, as a type d claim, **held** until sourced: reversals are clearer for effort than for money (Andreoni & Sprenger 2012 and Augenblick et al. 2015 are Selin's pointers). The lesson names the within-learner cost: seeing both pairs makes some people line them up on purpose.

**3. `beauty-contest-level-k`**
- **Concept.** In "guess two thirds of the average, closest wins", the equilibrium is 0 but the best guess depends on how many steps ahead the others think.
- **Misconception.** "The rational answer is 0, so I should guess 0." (Or the reverse: "People are random, so the average is 50.")
- **Interaction.** Predict: the learner guesses 0 to 100. Explore: a ladder. If everyone guesses at most 100, then no guess above 66.67 can win; if everyone knows that, the cap is 44.4; and so on to 0. The learner moves a "how many steps do others take" control and watches the winning guess move. A **disclosed, seeded simulation** of a crowd (type c) shows that a crowd who each take one or two steps makes guessing 0 lose. It is labelled a simulation and never shown as "what people chose". Reveal: the winning guess is about two thirds of what others guess, not the equilibrium. A sourced first-round mean (Nagel 1995 is Selin's pointer) is type d and **held** until sourced; the lesson works without it.

### Pilot of 5 (the DLR five)
Tranche 1 (Item 8: 1.83M, of which the pilot is about 610k at 122k a lesson). The five, in build order, and what each tests:

| # | Lesson | Claim type | Tests |
|---|---|---|---|
| 1 | `allais-certainty-effect` | a, b (type d line held) | the cleanest derivation; does the category's core format work |
| 2 | `present-bias-reversal` | a, b (type d limit held) | time cluster; a replication limit taught inside a derivation |
| 3 | `beauty-contest-level-k` | a, c | the strategy cluster; a simulation claim, and a collision test against Economics markets |
| 4 | `gain-loss-framing` | b (type d held) | the boundary test with Books (`tfs-loss-aversion`); needs cm-books' sign-off before a brief |
| 5 | `mental-accounting` | b | the boundary test with Economics (`sunk-cost`, `forgone-cash-discount`); the two-answer consistency check (the same loss as cash or as a ticket) is a derivation; "most people" is not used |

Chosen on purpose: lessons 1-3 and 5 contain no predict answer that depends on a survey. I left the endowment effect (type d only, and needs the Books exception) out of the pilot. If lesson 4's Books sign-off is refused, the fallback is `reflection-effect`, which has no Books neighbour. **The DLR five may count toward launch**, as the playbook allows (step 11).

### Checkability
A domain where nothing can be checked cannot publish. Here most of the subject can be checked, because the strongest lessons are internal-consistency derivations. The empirical claims need a source and a replication status, and that is the part I could not do from this host.

**Claim types, in order of preference** (after Selin §6):
- **(a) Derivation.** An expected-utility consistency check, a discount-curve reversal, an iterated best response, a nominal-to-real conversion. Verified by a script in `company/domains/briefs/checks/<id>-*.mjs`. Needs no outside source. I would put 7 of the 12 concepts here at least in part.
- **(b) The learner's own screen.** "Your two answers cannot both maximise expected utility." True by derivation about the learner's input. No claim about other people.
- **(c) A disclosed, seeded simulation of a crowd.** Labelled as a simulation, with seed and rule shown, never as "people chose".
- **(d) A source plus a replication status.** Any sentence like "most people choose A", "this effect is smaller in the field", or "this is stronger for effort than for money". It needs a source, a sample, and one of Big Ideas' shared verdict words: *holds up · holds with limits · mixed or contested · untested · did not replicate*.

**Replication rule (proposed for the charter, to be adopted by the CM and agreed by the fact-checker).**

| Status of the effect | How it may appear |
|---|---|
| **Robust** (holds up) | Taught as a claim, with its source and sample. Example priors: gain/loss framing, certainty effect and Allais, the beauty-contest first-round mean. |
| **Known limits** (holds with limits) | Taught as a claim **with the limits in the same reveal**. Example priors: endowment effect (procedure-dependent), present bias (clearer for effort than for money), loss-aversion size, mental accounting, commitment devices, dictator giving (lab, varies by culture). |
| **Contested** (mixed) | Taught **as contested**, in words, and never as a predict answer. Example priors: nudges at scale, choice overload, decoy outside the lab, scarcity. The reveal states what each side finds. Needs cm-big-ideas' sign-off for "nudges at scale". |
| **Failed** (did not replicate, or retracted) | **Never taught as a claim.** Social and money priming, ego depletion, power posing and the honesty-pledge-at-the-top-of-a-form result are covered only in a failure lesson about the correction, and Big Ideas has first refusal on those. |
| **Unverified** (not yet sourced) | Recorded in `meta.json` as `unverified` and held. It does not publish. A lesson whose only support for an empirical sentence is unverified must drop the sentence or stay a draft. |

Two further rules. (1) A retracted or fabricated study is a dispute: the lesson is about the correction or is withdrawn. (2) The within-learner design weakens framing effects (the learner sees both frames), and the reveal says so.

**Sources each claim type can be checked against, and what is reachable from this host.** I tested hosts on 2026-10-15 with `curl` through the proxy. Reaching a host is not the same as being able to read the paper I need.

| Claim type | Route | Host | Reachable from here? |
|---|---|---|---|
| (a), (b) | Our own script and arithmetic | none | Yes. Not a source problem |
| (c) | Seeded simulation in a `checks` script; R or JS reference implementation | `cran.r-project.org` for package docs | Host answered (HTTP 200 on the index and a package page). I found nothing there specific to this subject yet; it helps reproduction only |
| (d) peer-reviewed studies and meta-analyses | Full text or abstract, then the verdict | `pmc.ncbi.nlm.nih.gov` | Host answered: an article page and a search page returned HTTP 200. **I did not confirm that any paper named below is in PMC.** Many economics journals are not. The E-utilities API (`eutils.ncbi.nlm.nih.gov`) returned nothing to me, so I do not rely on it |
| (d) publisher pages | `doi.org` redirects to publishers | publisher hosts | **Blocked.** `doi.org` answered with a redirect only. As the task states, publisher redirects are blocked. `osf.io` was refused by the proxy, so Many Labs data hosted there is not reachable |
| (d) code and data for a replication | Files for analysis scripts | `raw.githubusercontent.com` | Stated working by the requester. I did not test it. Reachable only if the authors put the code on GitHub |
| (d) real-world numbers (inflation, income, prices) for `money-illusion` examples | Series with a stated source | `ourworldindata.org` | Host answered (HTTP 200). The page content I need is not yet matched to a lesson |

**Consequence, stated plainly.** A type d claim can be verified from here only if its paper or a summary of it is in PMC, or its data are on a reachable host. For the most famous replication reports (Many Labs 1, the Hagger ego-depletion project, DellaVigna and Linos, Ruggeri et al.), I do not know which are in PMC. The research note (W-902) must start by looking each one up in PMC. Where a verdict cannot be sourced from a reachable host, the claim is held, and the effect may only be taught as type a or b (a derivation about the learner's own answers, with no sentence about other people). That narrows the category to about 15 lessons, which is Selin's fallback. **Fact-checker agreement in writing (playbook step 9) is required before any pilot brief, and I do not have it.** Expected held-claim rate: 30-40% until a web-capable fact-check runs, as in Big Ideas.

### Category manager
- **A new role, `cm-behavioral`**, one category manager. Not created here. It is created by the CEO office after head-of-product's slot decision (W-897 → W-899), as the founder's record says.
- Strand managers come only after the DLR five pass. Selin's three strands, if the category grows: risk and reference points (#1-5); time and self-control (#6-8); fairness, trust and strategy (#9-10, plus #11-12 as a fourth or folded in).
- Until the role exists, the owner is principal-pm-verticals (Item 8). The CM's first duty is to get the four neighbour sign-offs (playbook step 7) before any brief. It must not write briefs and also re-check them (History objection 4).
- **Alternative if head-of-product declines a new slot:** cm-economics incubates, as Selin's strand variant. I am not recommending it. The founder chose a category.

### Overlap with existing domains
**One rule (Selin §5):** this category owns choice under risk, time and other people where the stage is the learner's own choice compared with a stated model. Probability owns the mathematics of a judgement error. Books owns what a book argues and whether it holds. Big Ideas owns the ideas that change how people see, and the replication failures it has already ranked. Economics keeps its simple models and its markets. **Nothing moves out of a neighbour.** The five Economics concepts Selin proposed re-tagging (`sunk-cost`, `ultimatum-game`, `risk-aversion`, `public-goods-free-rider`, `common-value-winners-curse`) stay in Economics under the category decision. They are listed as near-collisions, and the category links to them as prerequisites. That means the "re-tag" saving in the strand variant does not exist for a category.

**Near-collisions and who keeps each** (a proposal for head-of-product, W-897, and for the neighbours' written sign-off):

| Our concept | Near-collision | Keeps it | The difference we rely on |
|---|---|---|---|
| #1 Allais | `economics:risk-aversion` (square-root wealth); `probability:expected-value`, `variance-risk` | Economics and Probability keep theirs | Theirs fit one utility function. Ours shows that none fits two choices |
| #2 Reflection | `economics:risk-aversion` | Economics keeps risk aversion | We take the sign flip for losses |
| #3 Probability weighting | `economics:insurance-expected-cost`; `probability:lottery-odds` | Economics, Probability | They compute the fair price. We take the felt weight |
| #4 Framing | `books:tfs-loss-aversion` | **Books keeps "loss aversion, size about 2"**; we take the same outcome in two frames | Needs cm-books' written sign-off. Fallback in the pilot: `reflection-effect` |
| #5 Endowment | `books:tfs-loss-aversion`; *Misbehaving* deck 30 | **Exception proposed by Selin:** we take it, and the Books deck names it as nearest | Needs cm-books' sign-off. Not in the pilot |
| #6 Present bias | `economics:present-value`; `books:tfs-planning-fallacy`, `habits-*` | Economics keeps discounting arithmetic; Books keeps habit and planning | We take the reversal |
| #7 Commitment devices | `books:influence-commitment` (Cialdini); `economics:first-mover-commitment` | Books keeps consistency pressure; Economics keeps strategic commitment | We take self-binding. A close call; the sign-offs decide |
| #8 Mental accounting | `economics:sunk-cost`, `opportunity-cost`, `forgone-cash-discount` | Economics keeps all three | We take the fungibility check across envelopes. **A high duplicate risk**: pilot lesson 5 tests it |
| #9 Dictator | `economics:ultimatum-game`, `nash-bargaining`, `public-goods-free-rider` | Economics (markets) keeps them | We take giving with no threat of retaliation. Close |
| #10 Beauty contest | `economics:iterated-dominance`, `nash-equilibrium` (markets) | Markets keeps the equilibrium derivation | We take the gap between equilibrium and the best guess. **A high duplicate risk**: the derivation is the same ladder. Pilot lesson 3 tests it |
| #11 Interval overconfidence | `ai:calibration` (models); `books:signal-calibrated-weather`; `big-ideas:dunning-kruger-artifact`; `probability:confidence-intervals` | Each keeps its own | Needs cm-probability's agreement (Selin §5). Drop if refused |
| #12 Money illusion | `economics:inflation`, `real-interest-rate`, `percent-stacking`, `price-index` | Economics keeps the arithmetic | We take the felt difference. The weakest case; drop first if Economics objects |
| Reserve: nudges at scale | `big-ideas:most-findings-false`, `books:nudge-*` | Big Ideas has first refusal on replication failures | Only with cm-big-ideas' sign-off |

**Neighbours outside the four.** `math:transitive-preferences` (money pump) is near #1 and #6; `ai:calibration` is near #11. Both cm-math and cm-ai should be told, though neither is a signatory under the founder's list.

**Honest risk.** Of 12 concepts, 5 sit on a close call (#7, #8, #9, #10, #12). If the neighbours' sign-offs strike those, the clean count falls to about 7 plus reserves. The pilot (lessons 3 and 5) is designed to find this out cheaply.

## Decision
**Recommendation: incubate** (status `incubating`), with the pilot of 5, as one of enter / incubate / wait. head-of-product decides; I am not activating anything.

Why not enter: there is no demand evidence, no replication verdict has been sourced, the fact-checker has not agreed, and the four boundary sign-offs do not exist. Why not wait: the founder has decided the category, the format fits the subject unusually well, the first three lessons need no outside source, and the cheapest test of the boundary risk is to build them. The set-up money (Item 8: 1.83M) is mostly not the lessons, so the risk is bounded by the stop rule below.

Conditions I ask head-of-product to set with the decision:
1. **The pilot is 5, not "at most 2".** The template's incubate limit (at most 2 lessons) does not fit the playbook's pilot (the playbook itself notes this mismatch for History). A ruling is needed.
2. **No brief before the neighbours sign the boundary table** (playbook step 7), and no pilot brief before the fact-checker has written "I can verify these" (step 9).
3. **The research note (W-902) opens with a PMC lookup** of each source behind a type d claim, and records which are unreachable.
4. **The size question is open.** About 16-18 clean concepts against a 40-lesson target. Rule on this at W-897 and F-22, not after the pilot.
5. The pilot lessons 1-3 may start once conditions 2 and 3 hold. Lessons 4 and 5 wait for their sign-offs.

How sure I am: fairly sure of the concept list being collision-free by id, and of the three derivations (the arithmetic is simple). Not sure of demand (an estimate), of replication verdicts (priors), or of whether the category reaches 40 (I think it does not, from clean ground).

## What would make us retire the domain
Applies the vertical's kill rule and the playbook default. Written here so it is not renegotiated at the review.
- **Pause** if 3 of the DLR five are rejected as duplicates of a neighbour, or the held-claim rate goes over 40%, or 1.83M is spent before the DLR five are reviewed.
- **Fold into Economics as a strand** (or the nearest category) 60 days after deploy if 7-day recall is more than 10 points below the feed median **and** commit rate is below the median. Lessons keep their files and records (`status: retired`).
- **Fold** also if, after the neighbours sign, fewer than 12 collision-free concepts remain. I add this rule because the category stands on a small clean base, and a category with no concepts to teach is a strand in all but name.
- **Fold or narrow** if the research note finds that the verdicts cannot be sourced from reachable hosts and the category would be limited to type a and b claims. Then the strand variant (about 15 lessons) is the right size.
- **Withdraw a lesson** whose underlying study is retracted or found fabricated, and in any case a lesson that teaches a failed effect (priming, ego depletion, power posing) as a claim.
- Tranche 2 (30 lessons) is not released on a pass of the DLR five alone. It needs a held-claim rate of 25% or lower, a Project Review, learner data at or above the feed median, and a size ruling that shows where 30 more clean concepts come from.

## Routing (I did not do these)
- head-of-product: W-897 (form already decided, slots, the four boundary rulings, the incubate-with-5 ruling, the 40-versus-16-18 question).
- research-lead: W-902 (PMC lookup first).
- cm-books, cm-probability, cm-big-ideas, cm-economics: written sign-off on the boundary table once the CM exists (step 7). cm-math and cm-ai: informed of `transitive-preferences` and `calibration`.
- fact-checker: written statement of which pilot claim types it can verify (step 9).
- chief-of-staff-ceo-office: create `cm-behavioral` only after W-897 (W-899). I created no role, `DomainId`, curriculum file or HQ room.
