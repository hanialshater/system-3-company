# Decision: one category manager for Behavioral Economics and Irrational Behavior (cm-behavioral, Rasmus), no strand managers

owner: chief-of-staff-ceo-office (Leonie), org design. The founder decided the category (F-21); head-of-product decided incubation, the pilot of 5 and the ceiling of 18.
date: 2026-10-15
status: **generated, consultations synthesised from records and awaiting confirmation.** The founder decided *whether* (a category). This record answers *how* (one role, its scope, its line, its seat). Each consulted role still has to confirm or amend its answer below (see "Board asks"). The founder ratifies the design and decides any objection still open.
class: org
route: founder (F-21) → principal-pm-verticals (step 1) → domain-scout (step 2) → head-of-product (step 3) → chief-of-staff-ceo-office (step 5, this record)
board: W-899 (this record), W-900 (HQ placement, tools-lead), W-902 (research note, research-lead)
recorded by: chief-of-staff-ceo-office
pattern: company/ceo-office/org-change-process.md; company/product/verticals/category-onboarding-playbook.md step 5; `2026-10-14-history-category.md` (and what went wrong there, objections 4 and 7)
inputs: `2026-10-15-founder-behavioral-economics-category.md`; `2026-10-15-behavioral-economics-dlr-decision.md` (Priya); `company/product/verticals/2026-10-15-behavioral-economics.md` (Selin); `company/domains/proposals/2026-10-15-behavioral-economics-dlr.md` (Kofi); the four neighbour charters; `company/roles/fact-checker.md`.

## The role

| Role id | Name | Title | Reports to | Team | Domain (proposed) | HQ |
|---|---|---|---|---|---|---|
| **cm-behavioral** | **Rasmus** | Category Manager (category lead), Behavioral Economics and Irrational Behavior | **head-of-product** | categories | `behavioral` | floor 6, row 2 (the free space beside the stairs down, right of `to-floor-3-from-6` at x ≈ 410, y 262, one 186×236 office), W-900 |

**Reporting line.** Every category manager in `tools/org/roles.mjs` is built by `cm(...)`, which sets `reportsTo: "head-of-product"`. There is no category-management lead role. principal-pm-verticals also reports to head-of-product and owns cross-category strategy, not the CMs. So cm-behavioral reports to head-of-product, like cm-history, cm-books and cm-big-ideas. principal-pm-verticals was the interim owner (projects.json `behavioral-econ`, DLR decision §3) and hands the category over with this record.

**Name.** Rasmus: not used in `tools/org/people.mjs`, the POOL or STRAND lists, or the sibling press roster.

**Domain id.** The role's paths use `behavioral` so that the role id keeps the `cm-<domain>` convention that HQ and its tests rely on (`tests/hq/floors.test.mjs`: `cm-${d}`). That is a **proposal**. platform-engineer chooses the `DomainId` at playbook step 8. If it differs, the role's paths change with it in the same commit. The project id stays `behavioral-econ` (portfolio-manager's file), and the plan-to-2000 row stays `behavioral-econ` (principal-pm-verticals' file). Project ids do not have to match domain ids (`first-light`).

## Scope

**In scope** (the CM's own artifacts; generated into `company/roles/cm-behavioral.md`):
1. **The charter**, `company/domains/behavioral.md`: audience, refuse list, the boundary table, the checking section, and the pause, fold and retirement rules copied from head-of-product's ruling (section 1), not renegotiated. It includes **the replication rule**:
   - **robust** (holds up): taught as claims, with source and sample;
   - **known limits** (holds with limits): taught as claims **with their limits in the same reveal**;
   - **contested** (mixed): taught **as contested**, in words, never as a predict answer;
   - **failed** (did not replicate, or retracted): **never taught as claims**. Failure lessons are Big Ideas' first refusal;
   - **unverified**: held in `meta.json`, does not publish.
2. **The curriculum map**, `content/curriculum/behavioral.json`: the 12 counted concepts and about 6 reserves from the DLR, with demand marked as estimates, prerequisites linking to the neighbours' lessons, and no `subarea` (no strands).
3. **The briefs**, `company/domains/briefs/behavioral.md`: the DLR five in head-of-product's order (1-3 after the fact-checker's statement, 4 after cm-books signs, 5 after cm-economics signs). No sixth brief before the DLR reconvenes. Check scripts `company/domains/briefs/checks/behavioral-*.mjs` cover derivations and simulations.
4. **The four neighbour sign-offs**: cm-economics, cm-probability, cm-books and cm-big-ideas each sign or object to their row in the charter's boundary section, in writing. Disputes go to head-of-product. cm-math and cm-ai are informed.
5. **The fact-checker's step-9 statement**: the CM drafts the checking section (types a to d and the route per type) and asks the fact-checker for a dated statement, type by type: "can verify / cannot verify, and why". The CM never drafts that statement.

**Out of scope** (what each neighbour keeps, from head-of-product's section 3, and what other roles own):
- **Economics** keeps every concept in `economics.json` (including `sunk-cost`, `ultimatum-game`, `risk-aversion`, `public-goods-free-rider`, `common-value-winners-curse`, `forgone-cash-discount`, `present-value`, `iterated-dominance`, `nash-equilibrium`) and all discounting, equilibrium and nominal-to-real arithmetic.
- **Probability** keeps every judgement-error concept (`base-rates`, `gamblers-fallacy`, `hot-hand`, `conjunction-fallacy`, `regression-to-mean`, `winners-curse`, `information-cascade`, `self-selection-bias`) and the mathematics (`expected-value`, `variance-risk`, `lottery-odds`, `confidence-intervals`).
- **Books** keeps every concept in `books.json`: anchoring, loss-aversion size ("the book argues about 2×"), planning fallacy, peak-end, defaults, order effects, decoy, zero price, reciprocity, commitment, bias versus noise. The **endowment effect** stays with Books until cm-books signs the exception.
- **Big Ideas** keeps every concept it has ranked, and **first refusal on every replication-failure lesson** (priming, ego depletion, power posing, the honesty-pledge retraction).
- Nothing moves out of a neighbour and nothing is re-tagged.
- Not the CM's: `DomainId`, `content/domains.json`, theme colour (platform-engineer, step 8); HQ (tools-lead and hq-engineer, step 6); sourcing replication verdicts (research-lead, W-902); verifying claims (fact-checker); the slot line (head-of-product, founder F-22) and the budget (portfolio-manager); strand managers (this office, see below).

**What it takes from existing roles:** nothing from the neighbours. From principal-pm-verticals it takes the interim ownership of the category (the charter and sign-off work in the DLR decision's routing).

## Why one CM and no strand managers

At a ceiling of 18 counted lessons, three strand managers would hold about 6 each, and 5 of the 18 are in the pilot. That is the idle-org failure mode this office named for History (three strand managers idle until W-742). Head-of-product recommended one CM (objection 4 of her record), and the playbook's step 5 says strand managers come only after the DLR five pass. **Strand managers will be proposed** only if the DLR five pass **and** the founder raises the target past about 30 (Selin's three strands are on file: risk and reference points; time and self-control; fairness, trust and strategy). Until then, `SUBAREAS`, `DOMAIN_NAMES` and `STRAND_RULES` get no `behavioral` entry. They exist only for strands.

## Independence

With no strand managers, the CM both writes and answer-checks its own briefs. That is the normal CM pattern, not the History breach (where this office drafted the briefs and the CM re-checked them). The independent checks are the fact-checker on claims, the step-9 statement on claim types, and the neighbours' sign-offs on boundaries. None of these is written by the CM. This office drafted **no** charter, curriculum, brief, `DomainId` or HQ code (History objections 4, 7 and 8 not repeated).

## What changed, and where

- `tools/org/roles.mjs`: a `cm("cm-behavioral", "behavioral", …)` base, extended with the replication rule, boundary and step-9 scope, the neighbours' concepts as out of scope, and three may-nots (no brief before its row is signed and the statement covers its types; no sixth lesson before the DLR; no failed effect as a claim, no contested effect as a predict answer).
- `tools/org/people.mjs`: `"cm-behavioral": "Rasmus"`.
- Generated (`node tools/org/generate.mjs`): `company/roles/cm-behavioral.md`, `.claude/agents/cm-behavioral.md`, `company/roles/README.md`.
- An `org-change` event.
- Not done here, by design: the `DomainId` and `content/domains.json` (platform-engineer), the curriculum and the charter (cm-behavioral), HQ (W-900). Until W-900 lands, HQ has no office for the role, and HQ's tests stay green because they read `content/domains.json`, which does not yet list the category.

## Consulted

The answers below are **my synthesis** of each role's position from its written records. **Each one is marked for confirmation**: the role confirms, amends or objects on the board item filed for it. Objections travel with this record.

### head-of-product (Priya), whose org the role sits in: agree (synthesis, for confirmation)
- **From:** `2026-10-15-behavioral-economics-dlr-decision.md` (objection 4, routing line "W-899: create `cm-behavioral`, one CM"; sections 1, 3 and 4).
- **Answer:** one CM now, no strand managers unless the target goes past about 30. The org is the CEO office's decision. The CM reports to her, as every CM does.
- **Changes taken:** the pilot order, the "no sixth lesson" rule and the step-9 gate are written into the role's may-nots; the stop rules are copied, not renegotiated.
- **Objection carried:** none on the org. Her open item is F-22 (18 versus 40). If the founder keeps 40, the strand question reopens at the DLR five, not before.

### principal-pm-verticals (Selin), interim owner: agree with changes (synthesis, for confirmation)
- **From:** `company/product/verticals/2026-10-15-behavioral-economics.md` (the category variant: "add `cm-behavioral` now and 3 strands after the DLR five"; floor 6 row 2); the playbook (step 5; History gap 6, idle strand managers).
- **Answer:** agrees with one CM now. She sized the category variant at 40 with three strands later. At 18 she would accept no strands, consistent with her own idle-org objection (§3 options table).
- **Changes:** (1) hand over interim ownership explicitly. Taken: this record says so, and projects.json's owner line should change (portfolio-manager's file, board ask). (2) Keep her three strand names on file for a later re-size. Taken (above).
- **Objection carried:** her F-21 objection (about 30 concepts sit with neighbours; only 15-18 are clean) is the reason for the boundary may-nots. *Status: held to the sign-offs.*
- **Note:** board W-899's title still describes the strand variant (`cm-economics-behavioral` reporting to cm-economics, "generate only after the DLR five pass"). The founder chose the category (F-21: "the CEO office creates one category manager after step 3"), and the playbook generates the CM at step 5. The title is stale. It is not a conflict.

### cm-economics (Marco): agree with changes (synthesis, for confirmation)
- **From:** `company/domains/economics.md`; head-of-product's Economics row (close calls #7, #8, #9, #10, #12); the DLR Overlap table.
- **Answer:** no objection to a separate CM, because nothing leaves `economics.json` and the Economics charter is not amended.
- **Changes:** (1) his concepts are named in the role's out of scope, not just "the neighbour's map". Taken. (2) #8 mental accounting and #10 beauty contest are the two worst collisions. He signs them only on a brief draft he can compare with `sunk-cost`, `forgone-cash-discount` and `iterated-dominance`. Taken as the sign-off route (lesson 5 waits for him; lesson 3's ladder appears only as a linked prerequisite).
- **Objection (anticipated):** #12 money illusion is Economics ground (`inflation`, `real-interest-rate`). *Status: open; head-of-product already rules it "dropped first if cm-economics objects".*

### cm-books (Hester): agree, with one open exception (synthesis, for confirmation)
- **From:** `company/domains/books.md` and `books-strategy.md` (deck 2 anchoring and loss aversion; deck 13 defaults; deck 30 *Misbehaving*, endowment, rank 35 `keep-the-mug`); head-of-product's Books row and objection 10.
- **Answer:** no objection to the role. Books keeps every concept in `books.json`. Loss-aversion size and defaults stay as decks.
- **Changes:** the endowment effect is out of the role's scope until she signs (taken: written into out of scope). #4 gain-loss framing waits for her sign-off, with `reflection-effect` as the fallback (taken: lesson 4's gate).
- **Objection (anticipated, carried from head-of-product's objection 10):** endowment is a ranked *Misbehaving* concept (`misbehaving-endowment`, rank 35). *Status: open, hers to decide in the charter's boundary section. If refused, the ceiling is 17.*

### cm-probability (Bea): agree (synthesis, for confirmation)
- **From:** `company/domains/probability.md`; head-of-product's Probability row.
- **Answer:** every judgement-error concept and the mathematics stay in Probability. The role's out-of-scope line names them.
- **Changes:** #11 interval overconfidence enters only with her written agreement (unchanged from the ruling); probability weighting never re-computes a fair price as its reveal.
- **Objection:** none expected. #11 is hers to refuse, and is dropped if refused. *Status: open until she signs.*

### cm-big-ideas (Dmitri): agree with changes (synthesis, for confirmation)
- **From:** `company/domains/big-ideas.md` (replication status on every psychology idea; strong forms of power posing and ego depletion refused except as failures); `big-ideas-strategy.md`; head-of-product's Big Ideas row.
- **Answer:** agrees, provided the replication rule uses Big Ideas' verdict words and failure lessons stay his first refusal.
- **Changes:** (1) the replication rule's tiers map to the shared verdict words (holds up, holds with limits, mixed or contested, did not replicate). Taken in the role's scope. (2) "Failed never as claims" is a may-not, not just guidance. Taken. (3) "Nudges shrink at scale" stays a reserve until he signs. Taken through the boundary may-not.
- **Objection:** none on the org. *Status: confirmation owed.*

### fact-checker (step-9 statement): agree with the route; no statement yet (synthesis, for confirmation)
- **From:** `company/roles/fact-checker.md` ("may not verify a claim you wrote"; "re-deriving derivations, re-running simulations, checking sources"); the DLR's reachability table (PMC reachable; publisher redirects and osf.io blocked); head-of-product section 4.
- **Answer:** the role's scope respects its independence: the CM drafts the checking section, and the fact-checker writes only its own dated statement, after reading the charter section and the W-902 note, not the briefs.
- **What it can say now (synthesis, not its statement):** types (a) derivation and (b) the learner's own screen are verifiable by re-running scripts and reading the walkthrough; (c) disclosed seeded simulation is verifiable if the seed and rule are in a checks script; (d) source plus verdict is verifiable only where the paper or its data are on a reachable host.
- **Objection carried:** expected held-claim rate 30-40% for type (d) until a web-capable check runs. *Status: held to the step-9 statement and the 40% pause rule.* This synthesis **is not** the step-9 statement and does not open the gate.

### chief-of-staff-ceo-office (Leonie, drafter): health findings
- (a) One role, not four: the idle-org failure mode is avoided at this size. At the next role evaluation, cm-behavioral must show use (charter drafted, sign-offs asked) or it is a finding.
- (b) Handoffs wired: CM → four neighbours (sign-offs), CM → fact-checker (statement), research-lead → CM (W-902), platform-engineer and tools-lead after this record (steps 8 and 6). The CM's paths depend on the `DomainId` choice, which is the one loose wire.
- (c) No self-checking: this office wrote no content. The CM does not write the fact-checker's statement.
- (d) I do not approve this record. The founder decides org changes.

### Not consulted, informed
- **principal-engineer (Kenji):** this record touches no kit code. Step 8 (`DomainId`) goes to platform-engineer, with his review if `src/kit/**` changes.
- **evaluation-steward (Hilde):** no gate changes. The step-9 statement is a charter section, not a constitutional gate.
- **chief-of-staff (Ada):** no change to dispatching. She files the board asks.
- **cm-math, cm-ai:** informed as non-signatory neighbours (`transitive-preferences`, `calibration`).

## Objections (all of them, with status)

| # | From | Objection | Status |
|---|---|---|---|
| 1 | principal-pm-verticals (F-21) | About 30 concepts sit with neighbours; a category must not take lessons from them | held: written into out of scope and the boundary may-not; the sign-offs decide |
| 2 | cm-economics (synthesis) | Money illusion is Economics ground | open: dropped first if he objects (head-of-product's ruling) |
| 3 | cm-books (synthesis; head-of-product objection 10) | The endowment effect is a *Misbehaving* concept | open: hers to sign; if refused, ceiling 17 |
| 4 | fact-checker (synthesis) | Type (d) claims mostly unreachable: 30-40% held | held to the step-9 statement and the 40% pause rule |
| 5 | Leonie | The role's paths assume a `DomainId` that platform-engineer has not chosen | open: paths change with step 8 in the same commit |
| 6 | founder's record (size 40) | One CM may be too small if the founder keeps 40 | open, held to F-22: strands are proposed after the DLR five if the target goes past about 30 |

## Board asks (for the chief of staff to file; this record does not edit board.json)

1. **head-of-product, principal-pm-verticals, cm-economics, cm-books, cm-probability, cm-big-ideas, fact-checker:** confirm or amend your consultation answer in this record (`## Consulted`).
2. **tools-lead / hq-engineer (W-900):** floor 6, row 2 office for `cm-behavioral` beside the stairs; `tools/events.mjs` ROOM_BY_ROLE; `src/app/hq/people.ts` home; `tests/hq/floors.test.mjs` floor-6 list; colour. Can start now that the role id exists.
3. **platform-engineer (step 8):** `DomainId` (proposed `behavioral`), `content/domains.json` status `incubating`, theme colour. If the id is not `behavioral`, tell this office so the role's paths change with it.
4. **cm-behavioral (step 7 and 9):** draft the charter (with the replication rule, boundary table, checking section and the stop rules), the curriculum map; ask the four neighbours for sign-offs and the fact-checker for its statement.
5. **portfolio-manager:** change `behavioral-econ`'s owner in projects.json from principal-pm-verticals to cm-behavioral.
6. **chief-of-staff:** retitle W-899 (it describes the strand variant) and close it after the confirmations are filed.

## Would be wrong if
- The neighbours sign all close calls and the scout pass finds 20+ clean concepts. Then one CM is too small, and strands should be proposed at the DLR five.
- The CM is idle for a cycle because W-902 or the step-9 statement stalls. Then the role was created too early, and the playbook's step 5 should wait for step 9.
