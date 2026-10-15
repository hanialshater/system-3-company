# Behavioral Economics and Irrational Behavior: category charter

owner: cm-behavioral (Rasmus) · reports to: head-of-product · strands: none (no `subarea`; strand managers only if the DLR five pass and the founder raises the target past about 30) · status: **incubating** · pilot: the DLR five · ceiling: **18 counted lessons** (head-of-product's recommendation to the founder, F-22 open) · curriculum: `content/curriculum/behavioral.json` · sign-off requests: `company/domains/behavioral-signoffs.md` · briefs: `company/domains/briefs/behavioral.md` (not written yet; see "Brief gate") · checks: `company/domains/briefs/checks/behavioral-*.mjs` (none yet) · research note: research-lead, W-902 (not written yet)

decisions: `company/decisions/2026-10-15-founder-behavioral-economics-category.md` (F-21, whether); `company/decisions/2026-10-15-behavioral-economics-dlr-decision.md` (head-of-product: incubate, pilot, ceiling, boundary rulings, step-9 gate); `company/decisions/2026-10-15-behavioral-economics-org.md` (this role). inputs: the DLR (`company/domains/proposals/2026-10-15-behavioral-economics-dlr.md`), Selin's case (`company/product/verticals/2026-10-15-behavioral-economics.md`), playbook steps 7 and 9 (`company/product/verticals/category-onboarding-playbook.md`).

**Domain id.** `behavioral` is a **proposal**. platform-engineer decides the `DomainId`, the `content/domains.json` entry and the theme colour (playbook step 8, W-981). Until then this charter and `content/curriculum/behavioral.json` are not read by `npm run check` (it validates only domains listed in `content/domains.json`). If the id changes, this file, the curriculum file and the sign-off file are renamed with it in the same commit.

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
- **Failed effects as claims.** Social and money priming, ego depletion, power posing, the honesty-pledge-at-the-top-of-a-form result. Failure lessons about those corrections are Big Ideas' first refusal.
- **Contested effects as a predict answer.** A contested effect is taught as contested, in words, with what each side finds.
- **Unsourced sentences about other people.** Held as `unverified`; a lesson that needs one to teach stays a draft.
- **Manipulation how-tos.** Choice architecture is taught from the chooser's side, never as "how to sell with one".
- **Mental health, diagnosis and personality typing.**
- **Investment advice** (the Economics refuse list applies).
- **A neighbour's concept,** under any name. If a learner would give the same wrong predict answer for the same reason as in a neighbour's lesson, it is the neighbour's lesson.

## Boundaries with other categories
**The rule (head-of-product, decision §3):** this category owns choice under risk, time and other people **where the stage is the learner's own choice compared with a stated model**. **Two lessons collide if a learner would give the same wrong predict answer for the same reason in both.** A collision is settled for the neighbour that already has the concept in its curriculum. **Nothing moves out of a neighbour; nothing is re-tagged.** Disputes go to head-of-product in writing.

**Verdict words** are shared with Books, Big Ideas and History (`company/domains/big-ideas-strategy.md` §8.2): **holds up · holds with limits · mixed or contested · untested · did not replicate**.

**Sign-off status.** Every row below is **pending**. No neighbour has signed as of 2026-10-15. Each neighbour signs or objects in writing in `company/domains/behavioral-signoffs.md` (its own section); this table's Status column is updated from there. A brief is not written before its row (and, where named, its close-call line) is signed.

| Neighbour | It keeps | This category takes | Close calls and what decides them | Signs | Status |
|---|---|---|---|---|---|
| **Economics** | Every concept in `economics.json`, including `sunk-cost`, `ultimatum-game`, `risk-aversion`, `public-goods-free-rider`, `common-value-winners-curse`, `forgone-cash-discount`, `present-value`, `inflation`, `real-interest-rate`, `iterated-dominance`, `nash-equilibrium`; all discounting, equilibrium and nominal-to-real arithmetic | The departure from a stated model on the learner's own answers: Allais, reflection, probability weighting, present-bias reversal, fungibility across envelopes, dictator giving, the gap between equilibrium and the best guess, money illusion | **#10 beauty contest**: the iterated-dominance ladder belongs to markets; shown only as a linked prerequisite step; the stage is the guess against a crowd (pilot 3 tests it). **#8 mental accounting**: high duplicate risk with `sunk-cost` / `forgone-cash-discount`; pilot 5; signed on a brief draft cm-economics can compare. **#9 dictator**: no retaliation on the stage; anything with a responder is `ultimatum-game`. **#12 money illusion**: dropped first if cm-economics objects. **#7 commitment devices**: self-binding only; strategic commitment stays in Economics. The Economics charter is not amended | **cm-economics** (Marco); cm-economics-markets consulted on #10 | **pending** |
| **Probability** | Every judgement-error concept (`base-rates`, `gamblers-fallacy`, `hot-hand`, `conjunction-fallacy`, `regression-to-mean`, `winners-curse`, `information-cascade`, `self-selection-bias`) and the mathematics: `expected-value`, `variance-risk`, `lottery-odds`, `confidence-intervals` | The felt weight of a stated probability (#3), and choices that use expected value as the stated model (#1, #2) | **#11 interval overconfidence** enters only with cm-probability's written agreement; dropped if refused. **#3 probability weighting** never re-computes a fair price as its reveal | **cm-probability** (Bea) | **pending** |
| **Books** | Every concept in `books.json`: anchoring, `tfs-loss-aversion` ("the book argues about 2×"), `tfs-planning-fallacy`, `tfs-peak-end`, defaults, order effects, decoy, zero price, `influence-reciprocity`, `influence-commitment`, `noise-bias-vs-noise`. No lesson here tests the same misconception as a Books deck in the plan | Reference dependence as its own misconception: **the same outcome in two frames** (#4), not the size of loss aversion | **#4 gain-loss framing** needs cm-books' written sign-off before its brief; fallback `reflection-effect`. **Endowment-effect exception (#5)**: proposed, the category teaches WTA versus WTP and the *Misbehaving* deck (books-strategy deck 30; ranked `keep-the-mug`, proposed concept `misbehaving-endowment`, rank 35) names it as its nearest lesson. **Books keeps it until cm-books signs.** Not in the pilot, not in any tranche's committed part. If refused, Books keeps it and the ceiling drops to 17 (also W-903) | **cm-books** (Hester) | **pending** |
| **Big Ideas** | Every concept it has ranked (`dunning-kruger-artifact`, `cognitive-dissonance`, `hedonic-adaptation`, `most-findings-false`, `moral-hazard`, `principal-agent`, `perverse-incentives`, `costly-signalling`) and **first refusal on every replication-failure lesson** (social and money priming, ego depletion, power posing, the honesty-pledge retraction) | Effects whose verdict is *holds up* or *holds with limits*, taught with the verdict in the same reveal, in the shared verdict words | **"Nudges shrink at scale"** stays a reserve and enters only with cm-big-ideas' written sign-off. A failed effect is never taught here as a claim | **cm-big-ideas** (Dmitri) | **pending** |

**Outside the four (informed, not signatories):** cm-math (`math:transitive-preferences`, the money pump, near #1 and #6) and cm-ai (`ai:calibration`, models, near #11). Their notes are welcome in the sign-off file; they do not gate a brief.

**Nearest existing concept per counted concept** is recorded in the curriculum (`nearest`), and every brief repeats it with how the lesson differs.

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
| **Failed** (*did not replicate*, or retracted) | **Never taught as a claim.** Covered only in a failure lesson about the correction, and Big Ideas has first refusal |
| **Unverified** (not yet sourced) | Recorded in `meta.json` as `unverified` and held. It does not publish. A lesson whose only support for an empirical sentence is unverified drops the sentence or stays a draft |

Further rules: (1) a retracted or fabricated study is a dispute: the lesson becomes about the correction or is withdrawn. (2) The within-learner design weakens framing effects, and the reveal says so. (3) A verdict is a claim and needs its own source; the priors in Selin's case §6 and the DLR are **from memory and are not verdicts**. (4) At most one held type (d) sentence per reveal; every other type (d) sentence is marked "cut if not checkable", and the lesson must teach without them (Big Ideas D4).

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
| 1 | `allais-certainty-effect` | a, b | how often people choose A and D (pointer: Ruggeri et al. 2020) |
| 2 | `present-bias-reversal` | a, b | the limit: clearer for effort than for money (pointers: Andreoni & Sprenger 2012; Augenblick et al. 2015) |
| 3 | `beauty-contest-level-k` | a, c | a first-round mean (pointer: Nagel 1995); the lesson works without it |
| 4 | `gain-loss-framing` (fallback `reflection-effect`) | b (d held) | the framing result (pointer: Many Labs 1) |
| 5 | `mental-accounting` | b (a for the two-answer check) | none needed; "most people" is not used |

Pointers are for research-lead and the fact-checker only. None was opened here.

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
- **Ceiling: 18 counted lessons** (5 pilot + up to 13 conditional), a recommendation to the founder (F-22). 18 is a ceiling, not a target: if sign-offs strike close calls, tranche 2 shrinks with them. If the endowment exception is refused, the ceiling is 17.
- **Tranche 2 (up to 13)** not before Wave N cycle-planning, and only when: the DLR five passed; held-claim rate ≤ 25%; a Project Review; learner data (commit and 7-day recall) at or above the feed median; and every concept briefed has its neighbour sign-off.
- **Beyond 18:** 0 funded; only through a new founder item after a scout pass of unscouted fields (W-977).
- **Budget:** tranche 1 is 1.83M (portfolio-manager, W-898/W-905); not this role's.

### Brief gate (what each pilot brief waits for)
| Pilot | Boundary row(s) that must be signed | Step-9 types that must be covered | Other | Status 2026-10-15 |
|---|---|---|---|---|
| 1 Allais | Economics, Probability | a, b | W-902 note line for any type (d) sentence (or the sentence is cut) | **blocked** |
| 2 Present bias | Economics (and Books for `tfs-planning-fallacy` as nearest) | a, b | same | **blocked** |
| 3 Beauty contest | Economics, including the #10 line (cm-economics-markets consulted) | a, c | same | **blocked** |
| 4 Framing | Books, including the #4 line | b (d held) | fallback `reflection-effect` needs the Economics row | **blocked** |
| 5 Mental accounting | Economics, including the #8 line, signed on a brief draft | a, b | — | **blocked** |

The brief draft cm-economics asked for on #8 is a comparison draft for the signer, not a brief: it is not put on the board for a builder.

## Pause, fold and retirement (copied from head-of-product's ruling, decision §1; not renegotiated)
Decision §1, verbatim: "**Stop rules adopted as written in the DLR** (not to be renegotiated at the review): pause if 3 of the five are rejected as duplicates, if the held-claim rate exceeds 40%, or if 1.83M is spent before the five are reviewed; **fold** if fewer than 12 collision-free concepts remain after the neighbours sign; fold or narrow if the replication verdicts cannot be sourced from reachable hosts; fold into Economics 60 days after deploy if 7-day recall is more than 10 points below the feed median and commit rate is below it."

As written in the DLR ("What would make us retire the domain"), which §1 adopts:
- **Pause** if 3 of the DLR five are rejected as duplicates of a neighbour, or the held-claim rate goes over 40%, or 1.83M is spent before the DLR five are reviewed.
- **Fold into Economics as a strand** (or the nearest category) 60 days after deploy if 7-day recall is more than 10 points below the feed median **and** commit rate is below the median. Lessons keep their files and records (`status: retired`).
- **Fold** also if, after the neighbours sign, fewer than 12 collision-free concepts remain.
- **Fold or narrow** if the research note finds that the verdicts cannot be sourced from reachable hosts and the category would be limited to type a and b claims. Then the strand variant (about 15 lessons) is the right size.
- **Withdraw a lesson** whose underlying study is retracted or found fabricated, and in any case a lesson that teaches a failed effect (priming, ego depletion, power posing) as a claim.
- Tranche 2 (30 lessons) is not released on a pass of the DLR five alone. It needs a held-claim rate of 25% or lower, a Project Review, learner data at or above the feed median, and a size ruling that shows where 30 more clean concepts come from. *(Head-of-product's §2 later sets tranche 2 at up to 13, under the 18 ceiling; the conditions stand.)*

**The fold count today:** 12 counted concepts, of which 5 are close calls (#7, #8, #9, #10, #12) and 1 is a pending exception (#5), plus 6 reserves. Striking any counted concept takes the counted list below 12. Whether the fold rule's "12 collision-free concepts" counts signed reserves (the DLR's "about 16-18 collision-free" did) is **not settled in the ruling**; this role does not interpret it. Asked of head-of-product in `behavioral-signoffs.md` (section "head-of-product"). This is the main risk to the category, and the sign-offs decide it.

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
| 1 | Four boundary sign-offs | cm-economics, cm-probability, cm-books, cm-big-ideas (requested in `behavioral-signoffs.md`; board W-976, W-903) | pending |
| 2 | Step-9 statement | fact-checker (W-975) | pending; needs this section and the W-902 note |
| 3 | Replication note, PMC lookup first | research-lead (W-902) | backlog |
| 4 | `DomainId`, `content/domains.json`, colour | platform-engineer (W-981) | backlog; `behavioral` proposed |
| 5 | Slot line 18 vs 40 | founder (F-22) | open |
| 6 | Money illusion is Economics ground (anticipated objection, org record #2) | cm-economics | open: dropped first if he objects |
| 7 | Endowment is a *Misbehaving* concept (org record #3; decision objection 10) | cm-books | open: hers to sign; if refused, ceiling 17 |
