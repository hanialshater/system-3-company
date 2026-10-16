# Behavioral Economics and Irrational Behavior: category charter

owner: cm-behavioral (Rasmus) · reports to: head-of-product · strands: none (no `subarea`; strand managers only if the DLR five pass and the founder raises the target past about 30) · status: **incubating** · pilot: the DLR five · ceiling: **18 counted lessons** (head-of-product's recommendation to the founder, F-22 open) · curriculum: `content/curriculum/behavioral.json` · sign-off requests: `company/domains/behavioral-signoffs.md` · briefs: `company/domains/briefs/behavioral.md` (the DLR five, all written 2026-10-15; see "Brief gate") · checks: `company/domains/briefs/checks/behavioral-<concept id>.mjs`, one per pilot (`allais-certainty-effect`, `present-bias-reversal`, `beauty-contest-level-k`, `gain-loss-framing`, `mental-accounting`) · research note: `company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md` (research-lead, W-902)

decisions: `company/decisions/2026-10-15-founder-behavioral-economics-category.md` (F-21, whether); `company/decisions/2026-10-15-behavioral-economics-dlr-decision.md` (head-of-product: incubate, pilot, ceiling, boundary rulings, step-9 gate); `company/decisions/2026-10-15-behavioral-economics-org.md` (this role). inputs: the DLR (`company/domains/proposals/2026-10-15-behavioral-economics-dlr.md`), Selin's case (`company/product/verticals/2026-10-15-behavioral-economics.md`), playbook steps 7 and 9 (`company/product/verticals/category-onboarding-playbook.md`).

**Domain id.** `behavioral`, merged by platform-engineer (W-981; `content/domains.json`, status incubating). `npm run check` now validates this charter and `content/curriculum/behavioral.json`, and `tools/claim.mjs` reads the briefs file, so every brief carries a hold in `company/ops/brief-skips.json` until its build gates open ("Brief gate").

Drafted 2026-10-15 by cm-behavioral (playbook step 7, and the checking section for step 9). Three sections are **copied, not authored here**, and change only by a head-of-product record: the boundary table's rulings (decision §3), the stop rules (decision §1), and the replication rule's tiers (DLR, as the org record wrote them into this role's scope). The fact-checker's statement section is the fact-checker's alone.

## Audience
- **Adults deciding about money, risk and time.** The job: "show me the mistake I make, on my own answers, and tell me honestly whether the research holds."
- **Intro economics and psychology students.** That decision-bias units appear in intro courses is an assumption from memory; no syllabus was opened from this host.
- **Product, policy and marketing people** who use "nudge" language. For them the job is the replication verdict, taught from the chooser's side ("spot it"), never as a persuasion how-to.

No demand evidence exists for any of them. Every demand rating in the curriculum is an estimate (`demandEstimate: true`).

## What a lesson here is
The category owns **choice under risk, time and other people, where the stage is the learner's own choice compared with a stated model** (expected value, expected utility, exponential discounting, equilibrium). The learner chooses on the stage (a gamble, a delay, an offer, a guess). The reveal shows what the stated model predicts and where the learner's own answers depart from it.

- **The strongest claim is about the learner's own answers.** "No utility function fits both of your choices" is a derivation (type a) about the learner's input (type b), not a survey result.
- **A departure is not called "wrong".** The reveal says what the model cannot hold, not that the learner is irrational.
- **Sentences about other people are type (d).** "Most people choose A" needs a source, a sample and a verdict, or it is held and does not publish.
- **The within-learner cost is said.** Seeing both frames or both pairs weakens the effect, and the reveal says so where it applies.
- **Neighbour mechanisms are linked, not re-run.** Every brief names its nearest lesson in any category and links neighbour concepts as prerequisites.

## What we refuse to publish (refuse list)
- **Failed effects as claims.** Social and money priming, ego depletion, power posing, the honesty-pledge-at-the-top-of-a-form result. Failure lessons about those corrections are Big Ideas' first refusal, and Big Ideas keeps them (G0 condition 4). No reveal here names a failed effect, not even as a contrast ("unlike ego depletion, this one holds"); it links a Big Ideas lesson instead.
- **Contested effects as a predict answer.** A contested effect is taught as contested, in words, with what each side finds.
- **Unsourced sentences about other people.** Held as `unverified`; a lesson that needs one to teach stays a draft.
- **Manipulation how-tos.** Choice architecture is taught from the chooser's side, never as "how to sell with one".
- **Mental health, diagnosis and personality typing.**
- **Investment advice** (the Economics refuse list applies).
- **A neighbour's concept,** under any name. If a learner would give the same wrong predict answer for the same reason as in a neighbour's lesson, it is the neighbour's lesson.

## Boundaries with other categories
**The rule (head-of-product, decision §3):** this category owns choice under risk, time and other people **where the stage is the learner's own choice compared with a stated model**. **Two lessons collide if a learner would give the same wrong predict answer for the same reason in both.** A collision is settled for the neighbour that already has the concept in its curriculum. **Nothing moves out of a neighbour; nothing is re-tagged.** Disputes go to head-of-product in writing.

**Verdict words** are shared with Books, Big Ideas and History (`company/domains/big-ideas-strategy.md` §8.2): **holds up · holds with limits · mixed or contested · untested · did not replicate**.

**Sign-off status (copied 2026-10-15 from `company/domains/behavioral-signoffs.md`).** All four neighbours answered on 2026-10-15. The rulings' columns below are head-of-product's (decision §3). Where a neighbour's answer struck or re-worded a cell, the change is marked in that cell and comes from the sign-off line named. Every line's verdict and conditions are in the next table, and they bind the brief: if a brief breaks a condition, that signature lapses and the line returns to the sign-off file. A brief is not written before its row (and, where named, its close-call line) is signed.

| Neighbour | It keeps | This category takes | Close calls and what decides them | Signs | Status |
|---|---|---|---|---|---|
| **Economics** | Every concept in `economics.json`, including `sunk-cost`, `ultimatum-game`, `risk-aversion`, `public-goods-free-rider`, `common-value-winners-curse`, `forgone-cash-discount`, `present-value`, `inflation`, `real-interest-rate`, `iterated-dominance`, `nash-equilibrium`; all discounting, equilibrium and nominal-to-real arithmetic | The departure from a stated model on the learner's own answers: Allais, reflection, probability weighting, present-bias reversal, fungibility across envelopes, dictator giving, the gap between equilibrium and the best guess. ~~money illusion~~ *(struck, E0/E9)*. No reveal re-states a verified claim from an Economics lesson as its own; it links that lesson (E0) | **#10 beauty contest**: the iterated-dominance ladder belongs to markets; shown only as a linked prerequisite step; the stage is the guess against a crowd (pilot 3 tests it). *Renamed (E8): "Against a crowd that stops early, the equilibrium guess loses"; comparison draft signed with changes 2026-10-15 (d5508ca): the crowd rule is given as shares and guesses, and every reveal number comes from the seeded script with the learner's guess in the average.* **#8 mental accounting**: high duplicate risk with `sunk-cost` / `forgone-cash-discount`; pilot 5; signed on a brief draft cm-economics can compare. *(E6: signed with changes 2026-10-15 on the comparison draft (d5508ca): "her grocery costs are met from her regular pay", never "already covered"; no budget line or two-goods trade-off on the stage.)* **#9 dictator**: no retaliation on the stage; anything with a responder is `ultimatum-game`. **#12 money illusion**: dropped first if cm-economics objects. *(E9: objected; dropped 2026-10-15.)* **#7 commitment devices**: self-binding only; strategic commitment stays in Economics. The Economics charter is not amended | **cm-economics** (Marco); cm-economics-markets consulted on #10 through the records (E8 note) | **signed with changes** (E0); 10 lines signed (E1-E8, E10 with conditions; E6 and E8 on their comparison drafts, 2026-10-15), **E9 objected** |
| **Probability** | Every judgement-error concept (`base-rates`, `gamblers-fallacy`, `hot-hand`, `conjunction-fallacy`, `regression-to-mean`, `winners-curse`, `information-cascade`, `self-selection-bias`) and the mathematics: `expected-value`, `variance-risk`, `lottery-odds`, `confidence-intervals`; *the lines on lottery odds and intervals also cover `truly-large-numbers` and `relative-vs-absolute-risk` (P0)* | The felt weight of a stated probability (#3), and choices made with the probability given: *#1 uses **expected utility** (any increasing u) as its stated model, not expected value (P0 condition 1); #2 may state an EV on the cards*. A probability or EV may be stated and used on screen; no predict question asks the learner to compute or estimate one (P0) | **#11 interval overconfidence** enters only with cm-probability's written agreement; dropped if refused. *(P3: enters and stays.)* **#3 probability weighting** never re-computes a fair price as its reveal | **cm-probability** (Bea) | **signed with changes** (P0); P1-P3 signed with changes |
| **Books** | Every concept in `books.json`: anchoring, `tfs-loss-aversion` ("the book argues about 2×"), `tfs-planning-fallacy`, `tfs-peak-end`, defaults, order effects, decoy, zero price, `influence-reciprocity`, `influence-commitment`, `noise-bias-vs-noise`. No lesson here tests the same misconception as a Books deck in the plan | Reference dependence as its own misconception: **the same outcome in two frames** (#4), not the size of loss aversion | **#4 gain-loss framing** needs cm-books' written sign-off before its brief; fallback `reflection-effect`. **Endowment-effect exception (#5)**: proposed, the category teaches WTA versus WTP and the *Misbehaving* deck (books-strategy deck 30; ranked `keep-the-mug`, proposed concept `misbehaving-endowment`, rank 35) names it as its nearest lesson. **Books keeps it until cm-books signs.** Not in the pilot, not in any tranche's committed part. If refused, Books keeps it and the ceiling drops to 17 (also W-903). *(B2: exception granted; tranche 2 only; Books dropped `keep-the-mug` from rank 35 and takes the idea back if this lesson is struck or never briefed. Ceiling unchanged on this row.)* | **cm-books** (Hester) | **signed** (B0); B1-B4, B6 signed with changes; B5 informed |
| **Big Ideas** | Every concept it has ranked (`dunning-kruger-artifact`, `cognitive-dissonance`, `hedonic-adaptation`, `most-findings-false`, `moral-hazard`, `principal-agent`, `perverse-incentives`, `costly-signalling`) and **first refusal on every replication-failure lesson** (social and money priming, ego depletion, power posing, the honesty-pledge retraction) | *(Wording fixed on G0 condition 2:)* Teaches **as a claim** only effects whose verdict is *holds up* or *holds with limits*, with the verdict in the same reveal, in the shared verdict words; teaches a *mixed or contested* effect only as contested, and only in a reserve signed under G2 or G3; never teaches a failed effect. A verdict word appears in a reveal only when its verdict line is sourced (G0 condition 3). *Big Ideas' keep-list is every concept in `big-ideas.json` and every idea ranked in big-ideas-strategy §2.3, including `veil-of-ignorance`, `newcombs-problem` and `risk-compensation` (G0 condition 1)* | **"Nudges shrink at scale"** stays a reserve and enters only with cm-big-ideas' written sign-off. *(G2: signed with changes.)* A failed effect is never taught here as a claim. *No reveal sets two named normative decision rules against each other (maximin against best average, dominance against expected payoff) (G0)* | **cm-big-ideas** (Dmitri) | **signed with changes** (G0, G1); G2, G3 signed with changes; G4 informed |

**Outside the four (informed, not signatories):** cm-math (`math:transitive-preferences`, the money pump, near #1 and #6) and cm-ai (`ai:calibration`, models, near #11). Their notes are welcome in the sign-off file; they do not gate a brief.

**Nearest existing concept per counted concept** is recorded in the curriculum (`nearest`), and every brief repeats it with how the lesson differs.

### Line-by-line verdicts and conditions (copied from the sign-off file, 2026-10-15)
Abridged faithfully; the sign-off file holds each neighbour's full wording and "what would change it", and that wording governs if the two differ.
| Line | Concept | Signer | Verdict | Conditions the brief must meet |
|---|---|---|---|---|
| E0 | Economics row | cm-economics | signed with changes | Strike money illusion from "This category takes" (done). No reveal re-states a verified Economics claim; link the lesson |
| E1 | #1 allais-certainty-effect | cm-economics | signed | The reveal computes no certainty equivalent; link `square-root-wealth` |
| E2 | #2 reflection-effect | cm-economics | signed | No utility-curve arithmetic as the reveal |
| E3 | #3 probability-weighting | cm-economics | signed with changes | Lottery or small-probability gamble on the stage, not the insurance price; wherever insurance appears, the reveal states the risk-aversion account too and links `insurance-fair-price` |
| E4 | #6 present-bias-reversal | cm-economics | signed | Exponential discounting named as the stated model (a simplification); no present value at a market rate; link `wait-or-take-now`; the predict answer is not a present value |
| E5 | #7 commitment-devices | cm-economics | signed | No second player on the stage |
| E6 | #8 mental-accounting | cm-economics | **signed with changes** (on the comparison draft, 2026-10-15, d5508ca) | (1) a stage with no past payment; (2) a predict whose wrong answer's reason is not "money already spent should count"; (3) a type (b) reveal on the inconsistency of two answers, not "ignore sunk costs"; (4) no hidden-rate or cash-discount arithmetic, no "true cost includes what you give up"; (5) nearest `sunk-cost-exit` and how it differs. **Changes:** (1) "her groceries are already covered" becomes, on the stage and in option B, wording that cannot read as prepaid, e.g. "her grocery costs are met from her regular pay"; (2) no budget line or trade-off between two goods on the stage (cm-economics' unbuilt `budget-constraint`; link it if anything). Objects to a brief that mentions money already spent, paid in advance or lost, or says "ignore what you've spent" |
| E7 | #9 dictator-giving | cm-economics | signed with changes | The learner is the dictator and nobody can reject or reply; the predict asks neither what a rational responder does nor what a proposer offers under threat of rejection; no dictator-versus-ultimatum comparison as a claim (link `lowball-offer-should-pass`). Note on type (d) only: answered (the learner's own gift against the stated self-interest model is type b) |
| E8 | #10 beauty-contest-level-k | cm-economics (markets consulted through the records) | signed with changes; comparison draft **signed with changes** 2026-10-15 (d5508ca) | (1) Rename (done); (2) the predict names the disclosed simulated crowd, and its options are not the 33 / 22 / 0 ladder under common knowledge of rationality; (3) the ceilings are not derived on the stage, one linked step to `two-thirds-of-the-average`; (4) the Nagel 1995 line stays held. **Changes on the draft:** (1) the crowd rule gives each group's share and guess ("40% guess near 33"), may label "one step" / "two steps" with a link, and never explains why one step gives 33; (2) every reveal number comes from the seeded check script and includes the learner's guess in the average (the draft's "about 36 / about 24" did not; the stated mix gives about 35 and a target about 23). Objects to a stage that derives 33 or 22 from 50, a crowd described as real players, or options that put the ladder back |
| E9 | #12 money-illusion | cm-economics | **objected** | Collides with published `real-rate-illusion` (same wrong answer, same reason; nominal-to-real arithmetic is Economics'). **Dropped 2026-10-15** |
| E10 | reserves costly-punishment, disposition-effect, automatic-escalation | cm-economics | signed with changes | Punishment stage only, free riding not re-taught (link `free-rider-pot`); disposition: no sell/hold advice, no real securities, no `sunk-cost-exit` reveal, needs a data source; escalation: no compounding or start-early arithmetic (link `start-early-race`, `fee-drag-gap`) |
| P0 | Probability row | cm-probability | signed with changes | (1) #1's model is expected utility (fixed in the row); (2) the lines also cover `truly-large-numbers` and `relative-vs-absolute-risk`; (3) a probability or EV may be stated and used, never asked for in a predict question |
| P1 | #1 allais-certainty-effect | cm-probability | signed with changes | The reveal is the inconsistency across the pair, never "A is wrong because B has the higher EV"; EV only as a linked prerequisite and a number on the cards; no compute-the-EV step; no spread-of-outcomes or run-of-plays stage |
| P2 | #3 probability-weighting | cm-probability | signed with changes | No fair price as the reveal; the predict asks for a choice or price at a stated probability, never a waiting time or ticket count; no "one in a million never happens" frame; no relative-risk wording; any "people overweight small chances" sentence is type (d), held |
| P3 | #11 interval-overconfidence | cm-probability | signed with changes: **enters and stays** | "Your 90% ranges", never "confidence intervals"; no polling or sampling stage; the reveal says a statistical procedure's interval does hit at its stated rate (link `probability:confidence-intervals`); conditional on the score with a computed binomial claim, and 9 or 10 is not called overconfident; each true answer is its own sourced claim; any "most people hit about half" is type (d), held |
| B0 | Books row | cm-books | signed | No "about 2×" ratio, no mixed 50/50 bet |
| B1 | #4 gain-loss-framing | cm-books | signed with changes | No loss-aversion ratio, no mixed 50/50 bet, `books:tfs-loss-aversion` as prerequisite only; source the framing result to the research (Tversky & Kahneman 1981; Many Labs 1), never as a book-argues claim. Books will not brief the disease-problem idea |
| B2 | #5 endowment-effect | cm-books | signed with changes (**W-903 exception granted**) | A research lesson, no "*Misbehaving* argues" claim (works reference optional); the reveal carries the scope debate as its verdict (pointer Plott & Zeiler 2005); tranche 2 only. If struck or never briefed, tell cm-books in writing |
| B3 | #6 present-bias-reversal | cm-books | signed with changes | No task-duration underestimates; no delay of gratification as a predictor of life outcomes (Books' planned `wait-for-two-marshmallows`) |
| B4 | #7 commitment-devices | cm-books | signed with changes | Binds by cost or a removed option, never a public pledge, consistency with an earlier yes or someone else's request; title and predict do not use "commitment" alone |
| B5 | #11 interval-overconfidence | cm-books | informed | none |
| B6 | reserves automatic-escalation, disposition-effect | cm-books | signed with changes | Escalation: no opt-in/opt-out contrast and no default-effect size; disposition: no ratio from brief 12, never investment advice |
| G0 | Big Ideas row | cm-big-ideas | signed with changes | (1) Keep-list is all of `big-ideas.json` and strategy §2.3; no stage sets two normative rules against each other; (2) row wording fixed; (3) a verdict word only when its verdict line is sourced; until then no verdict word and no sentence about other people, types (a) and (b) only; (4) Big Ideas keeps the failure lessons; no reveal names a failed effect, even as a contrast |
| G1 | replication rule (every brief) | cm-big-ideas | signed with changes | (1) An *untested* row, *unverified* kept separate (done); (2) the verdict is a type (d) sentence and counts toward the one held sentence, and the other is cut with fallback wording written in the brief (done); (3) a retraction is a correction lesson and G0(4) ground |
| G2 | reserve nudges-at-scale | cm-big-ideas | signed with changes | The predict asks the at-scale size of one named class of nudge against its published size (type d, held); no share-of-findings-true question, no base-rate × power tree, no selection simulation or best-of-many stage (link `most-findings-false`, `probability:winners-curse`); explanations named as contested, each side sourced or both cut; unbriefed if the gap cannot be sourced; no default-effect size. *Open: P4 (cm-probability)* |
| G3 | reserves choice-overload, scarcity-mindset | cm-big-ideas | signed with changes; Big Ideas does not claim either | The predict is never "did this finding hold up?"; the predict answer is uncontested; "contested" needs its own sourced line, each side sourced or both cut; a *did not replicate* verdict sends it to Big Ideas' first refusal; scarcity: no income-group comparison as a claim, the sensitive route, no wellbeing or money advice. *Open: B7 (cm-books) for choice-overload* |
| G4 | #11 interval-overconfidence | cm-big-ideas | informed (not gating) | Asked: no actual-against-perceived chart by quartile; no "the less you know, the more overconfident"; no Dunning-Kruger name as support |

## How claims get checked here (checking section, playbook step 9)
Drafted by cm-behavioral. The fact-checker agrees or refuses in writing, type by type, in the statement section below. The CM does not write that statement, and the fact-checker is shown this section and the W-902 note, not the briefs or any builder reasoning (decision §4).

### Claim types, in order of preference
| Type | What it is | Example | Route to verification | Support in meta.json |
|---|---|---|---|---|
| **(a) Derivation** | An expected-utility consistency check, a discount-curve reversal, an iterated best response, a nominal-to-real conversion | "With u(0)=0, A over B means 0.11·u(1M) > 0.10·u(5M), and C over D means the same inequality" | A script `company/domains/briefs/checks/behavioral-<id>.mjs` that the fact-checker re-runs. Needs no outside source. The DLR's hand arithmetic is not a claim until a script re-runs it | `derivation`, naming the script |
| **(b) The learner's own screen** | A statement about the learner's own inputs, true by derivation | "Your two answers cannot both maximise expected utility" | The type (a) script, plus the walkthrough (`npm run walkthrough -- <slug>`) showing the sentence is conditional on what the learner chose, for every combination | `derivation` (the condition stated in the claim text) |
| **(c) Disclosed, seeded simulation** | A simulated crowd, labelled as a simulation with seed and rule shown, never "people chose" | "In this simulated crowd (seed 7; each player takes one or two steps), guessing 0 loses" | A `checks` script that re-runs the simulation from the stated seed and rule and prints the numbers on the stage; the walkthrough shows the label | `simulation` or `derivation`, naming the script and seed |
| **(d) Source plus replication verdict** | Any sentence about other people or about the research: "most people choose A", "smaller in the field", "clearer for effort than for money" | "Reversals are clearer for effort than for money" | A W-902 research-note line giving the source, the sample, and a verdict in the shared words, opened from a reachable host | `source`, with the note line; **held** (`unverified`) until the fact-checker opens it |

### Replication rule (binding on every brief and every claim)
| Status of the effect | How it may appear |
|---|---|
| **Robust** (*holds up*) | Taught as a claim, with its source and sample |
| **Known limits** (*holds with limits*) | Taught as a claim **with the limits in the same reveal** |
| **Contested** (*mixed or contested*) | Taught **as contested**, in words, and **never as a predict answer**. The reveal states what each side finds |
| **Untested** (*untested*: a sourced verdict that no test exists) | Taught **as untested**, in words, and **never as a predict answer** *(added 2026-10-15 on G1 condition 1)* |
| **Failed** (*did not replicate*, or retracted) | **Never taught as a claim.** Covered only in a failure lesson about the correction, and Big Ideas has first refusal (G0 condition 4: Big Ideas keeps them and does not release them) |
| **Unverified** (not yet sourced) | Recorded in `meta.json` as `unverified` and held. It does not publish. A lesson whose only support for an empirical sentence is unverified drops the sentence or stays a draft. *Unverified is a status of our sourcing, never shown to the learner as a verdict; it is not untested and not contested (G1)* |

*Note on the tiers:* the first four tiers and *unverified* are copied as the org record wrote them. The *untested* row is added on cm-big-ideas' G1 signature and does not change any copied tier. Head-of-product confirmed it (Amendment 1, A1.3).

Further rules: (1) a retracted or fabricated study is a dispute: the lesson becomes a correction lesson, which is Big Ideas' first-refusal ground (G1 condition 3), or is withdrawn. (2) The within-learner design weakens framing effects, and the reveal says so. (3) A verdict is a claim and needs its own source; the priors in Selin's case §6 and the DLR are **from memory and are not verdicts**. (4) At most one held type (d) sentence per reveal, and **a verdict is a type (d) sentence that counts toward it** (G1 condition 2); every other type (d) sentence is marked "cut if not checkable", its **fallback wording is written in the brief**, and the lesson must teach without them (Big Ideas D4; big-ideas-strategy §5). (5) A verdict word appears in a reveal only when its verdict line is sourced; until then the reveal has no verdict word and no sentence about other people (G0 condition 3).

### Reachability (from the DLR, tested 2026-10-15 by domain-scout; not re-tested here)
| Claim type | Route | Reachable from this host? |
|---|---|---|
| (a), (b) | Our scripts and arithmetic | Yes; no source needed |
| (c) | A seeded `checks` script | Yes; `cran.r-project.org` answered for reference docs only |
| (d) studies and meta-analyses | `pmc.ncbi.nlm.nih.gov` | Host answered; **no named paper confirmed to be in PMC**. E-utilities returned nothing |
| (d) publisher pages | `doi.org` → publishers | **Blocked** (redirect only). `osf.io` refused (Many Labs data) |
| (d) replication code and data | `raw.githubusercontent.com` | Stated working; not tested by the scout |
| (d) real series (money illusion examples) | `ourworldindata.org` | Host answered on 2026-10-15 (the History charter recorded it blocked on 2026-10-14; treat as unconfirmed) |

Consequence: a type (d) line can be verified only if its paper or data are on a reachable host. Where W-902 cannot source a verdict, the claim is held and the effect is taught only as type (a) or (b). Expected held-claim rate until a web-capable check runs: 30-40% (the pause line is 40%).

### Claim types the pilot needs
| Pilot | Concept | Types | Type (d) lines (held until sourced) |
|---|---|---|---|
| 1 | `allais-certainty-effect` | a, b | one held line, sample and limit ("4,098 people in 19 countries ... weaker than first reported"): Ruggeri et al. 2020 as reported by Cicerale et al. 2022, PMC9337702 (W-902: robust, attenuated); "how often people choose A and D" is **cut** (G1 condition 2). Brief 1 |
| 2 | `present-bias-reversal` | a, b | one held line, the limit: clearer for effort than for money (W-902: with limits; Augenblick et al. 2015 as reported by Cohen et al. 2020, PMC10489299). Brief 2 |
| 3 | `beauty-contest-level-k` | a, b, c | one held line, a first-round mean with its sample (W-902: robust; Pantelis & Kennedy 2017, PMC5303671); Nagel 1995 stays held and unused (E8 condition 4); the lesson works without it. Brief 3 |
| 4 | `gain-loss-framing` (fallback `reflection-effect` not needed: B1 signed) | a, b (d held) | one held line, the framing result with sample and its limit, varied by country (W-902: robust; Rachev et al. 2021, PMC8432807; Many Labs 1 only as reported there). Brief 4 |
| 5 | `mental-accounting` | a, b (d held) | one held line, the limit: 11 of 17 classic problems held in one US online re-run (W-902: with limits; Li & Feldman 2025, PMC12445221); no single problem named, and not the lost-ticket problem (E6). "Most people" is not used. Brief 5 |

The stated model for #1 is **expected utility** (any increasing u), not expected value (P0 condition 1).

Sources are W-902's (opened by research-lead, not by this role and not yet by the fact-checker). Every type (d) line stays held until the fact-checker's dated (d) statement covers it.

### Fact-checker's step-9 statement
*Reserved for the fact-checker (W-975). Gate as the charter set it: until a statement exists, no brief is written. If (a), (b) and (c) are agreed but not (d), pilots 1-3 may be briefed with every type (d) line held and left out of the published lesson (decision §4.4). If (c) is refused, pilot 3 becomes an (a)-only stage or is replaced by `reflection-effect`.*

**Statement, 2026-10-15, fact-checker (W-975). PARTIAL: types (a)-(c) only.** No W-902 sourcing note exists yet. I checked `company/research/notes/` (it holds only `2026-10-13-teachable-knot-theory.md`) and `company/knowledge/`, and found no 2026-10-15 behavioral note. The charter allows a partial statement in this case. I have written no claim in this category, and none exists yet.

Hosts tested from this host on 2026-10-15 with `curl` (no proxy workaround):

| Host | Result |
|---|---|
| `pmc.ncbi.nlm.nih.gov` (home page and `/search/?term=`) | 200; search returns PMC ids. I have **not** confirmed that any named pilot paper is in PMC |
| `eutils.ncbi.nlm.nih.gov` (E-utilities) | blocked (proxy CONNECT 403) |
| `ourworldindata.org` | 200 |
| `cran.r-project.org` | 200 |
| `raw.githubusercontent.com` | 200 (fetched a known file) |
| `pypi.org` | 200 |
| `doi.org` | 302 to `www.nature.com`, which is blocked (403). Every DOI that redirects to a `www` publisher is a dead end |
| `www.nature.com`, `www.aeaweb.org`, `journals.plos.org`, `www.jstor.org`, `api.crossref.org` | blocked (403) |
| `osf.io` | blocked (403) |
| `github.com` (web) | 400; use `raw.githubusercontent.com` |
| local `node` (v22.22.0) | runs; a seeded PRNG (mulberry32, seed 7) gave the same 1,000 draws twice |

| Type | Verdict | Why |
|---|---|---|
| **(a) Derivation** | **Can verify** | Needs no outside source. I re-run `company/domains/briefs/checks/behavioral-<id>.mjs` with local node and compare every printed number with the stage text. Conditions: the script must be committed by someone other than me, must print each number the learner sees, and must not fetch from the network. Hand arithmetic in the DLR or a brief is not support. |
| **(b) The learner's own screen** | **Can verify** | Same as (a), plus the walkthrough transcript (`npm run walkthrough -- <slug>`), which I read before any builder notes. Conditions: the script enumerates every answer combination the controls allow, and the transcript shows the sentence is conditional on the learner's choice. If a combination is missing from the script or the walkthrough, the claim is disputed. |
| **(c) Labelled seeded simulation** | **Can verify** | Seeded PRNGs reproduce exactly under local node (tested above). Conditions: the seed and rule appear on the stage and in the claim. The script uses a PRNG it defines itself, not `Math.random`, so results do not drift with the engine. It reproduces the stage numbers from that seed. The walkthrough shows the label "simulated", and no sentence says "people". CRAN is needed for reference docs only, not for verification. |
| **(d) Source plus replication verdict** | **No statement yet; held by default** | No W-902 note exists, so I have no lines to open. Each type (d) line stays `unverified` and does not publish, as the replication rule requires. |

Provisional reachability for the named type (d) pointers. These are pointers, not opened sources, so they are not verdicts:
- Reachable routes: PMC (open-access copies only, opened by PMC id or by a URL on `pmc.ncbi.nlm.nih.gov`), `raw.githubusercontent.com` (replication code and data), `ourworldindata.org` (real series for money illusion), CRAN, and PyPI (package docs and data).
- Blocked routes: every `doi.org` link that redirects to a `www` publisher (Nature Human Behaviour, AER, QJE, PLOS and JSTOR were all tested or seen to redirect), E-utilities, Crossref, and `osf.io` (Many Labs data).
- Ruggeri et al. 2020 (Nat Hum Behav) can be reached only if W-902 finds a PMC copy or a GitHub data mirror. Andreoni & Sprenger 2012 (AER), Augenblick et al. 2015 (QJE) and Nagel 1995 (AER) have no reachable route I know of, unless a PMC or GitHub copy turns up. Many Labs 1 is on OSF (blocked) and can be reached only through a GitHub mirror.
- **Expected held fraction for type (d) from this host: at least 75% of type (d) lines.** My estimate is 4 or 5 of the 5 pilot pointers until W-902 names a reachable copy. That is above the charter's 30-40% estimate and above the 40% pause line, so pilots 1-4 should plan to teach without their type (d) lines.

**What would change this:** a dated W-902 note giving, for each line, a URL on a reachable host. I will then add a dated (d) statement below this one, line by line.

## Incubation status
- **Status:** incubating (decision §1). The template's "incubate ≤ 2 lessons" does not apply: for this founder-decided category, incubation allows up to 5 lessons, and they are **the DLR five**.
- **Pilot (tranche 1), in head-of-product's order:** 1 `allais-certainty-effect`, 2 `present-bias-reversal`, 3 `beauty-contest-level-k`, 4 `gain-loss-framing` (fallback `reflection-effect` if cm-books refuses), 5 `mental-accounting`. They pass every normal gate, with no W-556 exemption, and may count toward launch (step 11).
- **No sixth lesson** is briefed before the Domain Launch Review reconvenes on the five.
- **Ceiling: 18 counted lessons** (5 pilot + up to 13 conditional), a recommendation to the founder (F-22). 18 is a ceiling, not a target: if sign-offs strike close calls, tranche 2 shrinks with them. If the endowment exception is refused, the ceiling is 17. *(2026-10-15: the exception was granted, B2, but #12 was dropped, so the map holds 11 counted concepts. The ceiling of 18 cannot be reached from counted concepts alone. Whether it changes is head-of-product's and the founder's call, at F-22 and W-997.)*
- **Tranche 2 (up to 13)** not before Wave N cycle-planning, and only when: the DLR five passed; held-claim rate ≤ 25%; a Project Review; learner data (commit and 7-day recall) at or above the feed median; and every concept briefed has its neighbour sign-off.
- **Beyond 18:** 0 funded; only through a new founder item after a scout pass of unscouted fields (W-977).
- **Budget:** tranche 1 is 1.83M (portfolio-manager, W-898/W-905); not this role's.

### Brief gate (what each pilot brief waits for)
| Pilot | Boundary row(s) that must be signed | Step-9 types that must be covered | Other | Status 2026-10-15 |
|---|---|---|---|---|
| 1 Allais | Economics, Probability | a, b | W-902 note line for any type (d) sentence (or the sentence is cut) | **briefed 2026-10-15** (E0, E1, P0, P1 signed; a, b verifiable; one (d) line held) |
| 2 Present bias | Economics (and Books for `tfs-planning-fallacy` as nearest) | a, b | same | **briefed 2026-10-15** (E0, E4, B0, B3 signed; a, b verifiable; one (d) line held) |
| 3 Beauty contest | Economics, including the #10 line (cm-economics-markets consulted) | a, b, c | same; and cm-economics' answer to the E8 comparison draft | **briefed 2026-10-15** (E0, E8 and its draft signed with changes; a, b, c verifiable; one (d) line held) |
| 4 Framing | Books, including the #4 line | a, b (d held) | fallback `reflection-effect` needs the Economics row (E2 signed) | **briefed 2026-10-15** (B0, B1 signed; a, b verifiable; one (d) line held; a non-gating note to cm-books on the predict's wording, brief 4) |
| 5 Mental accounting | Economics, including the #8 line, signed on a brief draft | a, b | — | **briefed 2026-10-15** (E0, E6 signed with changes on its draft; a, b verifiable; one (d) line held) |

Briefed is not buildable. All five briefs are held in `company/ops/brief-skips.json` until Project Review 1 (2026-10-16) approves tranche 1 and the W-556 queue gate opens (decision Amendment 1, A1.2); briefs 1-2 go first.

## Pause, fold and retirement (copied from head-of-product's ruling, decision §1; not renegotiated)
Decision §1, verbatim: "**Stop rules adopted as written in the DLR** (not to be renegotiated at the review): pause if 3 of the five are rejected as duplicates, if the held-claim rate exceeds 40%, or if 1.83M is spent before the five are reviewed; **fold** if fewer than 12 collision-free concepts remain after the neighbours sign; fold or narrow if the replication verdicts cannot be sourced from reachable hosts; fold into Economics 60 days after deploy if 7-day recall is more than 10 points below the feed median and commit rate is below it."

As written in the DLR ("What would make us retire the domain"), which §1 adopts:
- **Pause** if 3 of the DLR five are rejected as duplicates of a neighbour, or the held-claim rate goes over 40%, or 1.83M is spent before the DLR five are reviewed.
- **Fold into Economics as a strand** (or the nearest category) 60 days after deploy if 7-day recall is more than 10 points below the feed median **and** commit rate is below the median. Lessons keep their files and records (`status: retired`).
- **Fold** also if, after the neighbours sign, fewer than 12 collision-free concepts remain.
- **Fold or narrow** if the research note finds that the verdicts cannot be sourced from reachable hosts and the category would be limited to type a and b claims. Then the strand variant (about 15 lessons) is the right size.
- **Withdraw a lesson** whose underlying study is retracted or found fabricated, and in any case a lesson that teaches a failed effect (priming, ego depletion, power posing) as a claim.
- Tranche 2 (30 lessons) is not released on a pass of the DLR five alone. It needs a held-claim rate of 25% or lower, a Project Review, learner data at or above the feed median, and a size ruling that shows where 30 more clean concepts come from. *(Head-of-product's §2 later sets tranche 2 at up to 13, under the 18 ceiling; the conditions stand.)*

**Two counts (head-of-product, decision Amendment 1, A1.1, 2026-10-15).** *Counted concepts* are the briefing queue (11; Portfolio rules, unchanged). The *fold floor* is what the fold rule counts.

**Fold-floor rule (A1.1, copied, not renegotiated):** "the fold floor counts a concept, counted or reserve, when (1) every neighbour line on it is `signed` or `signed with changes`, with none open, and (2) its effect is not one the charter can only teach *as contested* (reserve note "contested", or a *mixed or contested* verdict). If fewer than 12 such concepts remain, the category folds (decision §1)."

**Fold floor, 2026-10-15: 14 (≥ 12: the category continues). Margin 2: any 3 strikes among the 14 fold the category.** Recount on the day the fact-checker's W-975 type (d) line is written.

| | Concepts | n |
|---|---|---|
| Counted, every line signed | allais-certainty-effect, reflection-effect, probability-weighting, gain-loss-framing, endowment-effect, present-bias-reversal, commitment-devices, mental-accounting (E6), dictator-giving, beauty-contest-level-k (E8), interval-overconfidence | 11 |
| Reserves, every line signed, not contested | automatic-escalation (E10, B6), costly-punishment (E10), disposition-effect (E10, B6) | 3 |
| **Fold floor** | | **14** |
| Not in the floor: contested reserves (count toward the 18 ceiling only) | scarcity-mindset (signed), nudges-at-scale (P4 open), choice-overload (B7 open) | 3 |

A strike is a duplicate rejection at the DLR, a sign-off withdrawn, or a concept dropped at step 9. **The dated (d) recount (A1.1):** four of the 14 are type (d) only (`endowment-effect`, `commitment-devices`, `automatic-escalation`, `disposition-effect`). If W-975's (d) statement refuses (d), or the verdicts prove unreachable from this host, those four cannot be built and the floor is 10. Then the DLR's separate **fold-or-narrow** rule applies (§1, the strand variant of about 15 lessons), and cm-behavioral brings the recount to head-of-product the same day. W-902 has since named opened PMC sources for the endowment effect and most pilot lines; commitment devices, automatic escalation and disposition effect were **not in its pass**, so on 2026-10-15's evidence those three had no opened source.

**Recount on sourcing, 2026-10-16 (cm-behavioral, W-1304; evidence `company/research/notes/2026-10-16-w1063-commitment-escalation-disposition.md`, 508fada).** The sentence above is **no longer true**: research-scientist opened PMC sources for all three. Verdicts as the note gives them (not yet spot-opened by the fact-checker): `commitment-devices` **with limits** (a minority take it up; strict commitments can fail; few sites); `automatic-escalation` **with limits** (headline 3.5% to 13.6% is second-hand only; one opened primary, Choi et al. 2017, shows a reversal at another firm); `disposition-effect` **robust** as a pattern, with limits on whether it is a mistake. None is contested, and every neighbour line on them is signed (E5, E10, B4, B6), so **the fold floor stays 14 on sourcing, margin 2**. It is still not final: the four type (d)-only concepts still wait on the W-975 (d) statement, including whether "as reported by" attributions are enough. If secondary attributions are refused, each of the three keeps opened primary sources a lesson could rest on (the note lists them), but the anchor numbers (SEED, SMarT, Odean's PGR/PLR) could not be used; that removes numbers, not concepts, so the floor would still be 14. If (d) is refused outright, the floor is 10 and the fold-or-narrow rule applies, as above. Nothing here is briefed (no sixth brief before the DLR reconvenes).
- **Escalation and B6 ("no opt-in/opt-out contrast and no default-effect size"): yes, it can be written without stating either.** The three secondary sources disagree on how people joined SMarT (default, opt-in, "enrolling"), so a future brief states **neither**: the stage is the learner's own choice to pre-commit a share of future raises against a stated model, and any type (d) line names "one US programme, as reported by" an opened paper, with Choi et al. 2017's reversal as the limit in the same reveal. No sentence says how anyone was enrolled, and no default-effect size appears. This is a constraint for that brief, recorded now so the reserve's B6 line stays signed as written.
- head-of-product is informed (A1.1 asks for the recount the day the floor changes; on sourcing it did not change).

History of the count: 12 counted before the sign-offs; 11 after #12 `money-illusion` was dropped on E9 (decision §3, "dropped first"); W-997 asked whether reserves count, and A1.1 answered it (open item 9, closed).

## Portfolio rules
- **One lesson per concept.** No concept gets a second lesson inside the ceiling.
- **Order:** the pilot order above; after the DLR, demand (estimate until learner data exist), then how cleanly the stage is the learner's own choice against a model, then verification cost (types a-c rank above d), then the review route.
- **Demand** in the curriculum is the scout's estimate (reserves: cm-behavioral's estimate). Confirmed or changed at the first cycle planning with learner data, not reviews (simulated reviews are not learning evidence).
- **Reserves** (`"reserve": true` in the curriculum) are not counted and not briefed until a counted concept is struck and a reserve's own boundary line is signed.
- **No `subarea`.** No strands at this size.
- **Every brief names**: its nearest lesson in any category and how it differs; neighbour prerequisites linked, not re-run; its claim types; its type (d) lines with "held" or "cut if not checkable"; a format from `company/design/formats.md`; `also` and `references` metadata (`company/product/lesson-metadata.md`).

## Open items
| # | Item | Owner | Status |
|---|---|---|---|
| 1 | Four boundary sign-offs | cm-economics, cm-probability, cm-books, cm-big-ideas (requested in `behavioral-signoffs.md`; board W-976, W-903) | **answered 2026-10-15**; E6 and the E8 draft signed with changes (d5508ca); still open: P4 and B7 (reserve lines, not gating a pilot) |
| 2 | Step-9 statement | fact-checker (W-975) | partial 2026-10-15: (a)-(c) can verify; **(d) now waits on the fact-checker alone** (W-902 is written), including whether "as reported by" attributions are enough. The fold-floor recount follows it |
| 3 | Replication note, PMC lookup first | research-lead (W-902) | **written 2026-10-15** (`company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md`); not in its pass: commitment devices, automatic escalation, disposition effect, choice overload, scarcity, nudges' academic comparison. **2026-10-16:** commitment devices, automatic escalation and disposition effect sourced (W-1063, 508fada); item-level sweep for the two pilot c6 lines found neither reachable as worded (07e7303), and both stay cut (briefs file, W-1293). Still not in a pass: choice overload, scarcity, nudges' academic comparison |
| 4 | `DomainId`, `content/domains.json`, colour | platform-engineer (W-981) | **closed**: `behavioral` merged (7c3a8ba) |
| 5 | Slot line 18 vs 40 | founder (F-22) | open |
| 6 | Money illusion is Economics ground (anticipated objection, org record #2) | cm-economics | **closed 2026-10-15**: objected (E9); #12 dropped |
| 7 | Endowment is a *Misbehaving* concept (org record #3; decision objection 10) | cm-books | **closed 2026-10-15**: exception granted (B2), tranche 2 only |
| 8 | Confirm the *untested* tier added on G1 in the org record (the role's replication-rule scope lists five statuses) | head-of-product | **closed**: confirmed (Amendment 1, A1.3). The org record and `tools/org/roles.mjs` scope are chief-of-staff-ceo-office's (W-899) |
| 9 | Fold rule: do signed reserves count toward the 12? | head-of-product (W-997) | **closed**: yes, if every line is signed and the effect is not contested (Amendment 1, A1.1). Floor 14, margin 2; recount when W-975's (d) line lands ("Pause, fold and retirement") |
