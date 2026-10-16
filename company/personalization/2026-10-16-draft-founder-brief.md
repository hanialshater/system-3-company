# Personalization: draft founder brief (for the founder to correct)

owner: personalization-lead (Mateo) · date: 2026-10-16 · founder inbox: **F-08** (board W-091) · project: first-light (slot pl-brief-draft)
status: **DRAFT FOR THE FOUNDER. This is not a decision.** It is a blank page turned into a page to edit, as the First Light fast path asks (company/initiatives/first-light/2026-10-16-fast-path-to-release.md §4, commit 15c7acc). Nothing here is built, ratified, or a rule. Where it disagrees with what you meant, what you meant wins.

Read for this draft: company/personalization/README.md; the fast path §1.2 (C4), §4, §5; AMD-008 part P (company/constitution/amendments/AMD-008-first-light-surface-value.md, proposed, F-19 open); company/initiatives/first-light/privacy-gate.md rows P2, P3, P6; company/decisions/2026-10-12-feed-is-not-personalised.md; company/decisions/2026-10-15-first-light-release-1-scope.md Ruling 4; EDD-009 §7 (stub); company/reviews/_privacy/2026-10-16-edd-009-s5.md; F-01 in the inbox (decided: 13+ with teen mode).

Your sentence (F-43, 2026-10-16): "I want to reach milestone deploy so I can start personalization or ads." This draft reads that as: personalization starts **after** the accounts-on production deploy, as its own initiative (fast path C4 and §1 "What it does to the charter"). If you meant personalization inside the milestone, say so; then F-08 and F-19 go back on the critical path (fast path, "What would make this file wrong").

## 1. The learner problem

Today every learner gets the same order: subjects round-robin, newest first, due revisits before new lessons, and a plain "not personalised" label (company/decisions/2026-10-12-feed-is-not-personalised.md). That was the honest choice at cold start. With a large catalog it has two costs for a learner who has history:

- **A miss is not followed up.** A learner who predicts wrong and then fails the first revisit gets the next round-robin card, not the lesson that would repair the gap.
- **A success is not built on.** A learner who predicts right and recalls a lesson is not shown the lesson that builds on it, so paths through a subject happen only by chance.

The problem to solve: **the next card should be the one that most helps this learner remember and understand, chosen for a reason we can show them and test.** It is not "keep them on the feed longer". Time-on-feed is out of scope for this team (onboarding doc, out of scope; AMD-008 X1).

The bubble risk is real in the other direction: a feed that only follows up and builds on what a learner already touched narrows them to one subject. The mission line says "without trapping them in a bubble", so the first version must keep a share of the default order (section 2, guard G3).

## 2. The first version (proposal)

**Rule-based next-lesson ordering from predictions and revisit recall, behind an experiment with a default-order holdout.** No learned model (AMD-008 P1 as drafted; a model needs a further amendment).

What it does, in plain words:

1. **Due revisits stay first.** Unchanged from today (AMD-008 F2).
2. **Repair after a miss.** If a learner predicted wrong *and* missed the first revisit of lesson X, the next new card may be a lesson the curriculum marks as a prerequisite of X, or a lesson on the same concept. Reason shown: "You missed X on revisit, so here is Y, which X builds on."
3. **Build after a success.** If a learner predicted right *or* recalled lesson X, the next new card may be a lesson that builds on X in the curriculum graph. Reason shown: "You remembered X, so next is Y, which builds on it."
4. **Stated choices.** Subjects the learner picks and "less of this" filter the default order.
5. **Everything else is the default order.**

These are **kinds** of rule for you to correct, not the rule list. The rule list is published separately, each rule added by a head-of-product decision record (AMD-008 P1), with its reason copy recorded as claims (AMD-008 P3, X2; quality bar Q1.6).

Guards that come with the first version (all from AMD-008 part P as drafted, plus G3 which is mine):

- **G1. Explainable.** Every moved card shows the reason that fired, and that reason must be true against the rule log (P3).
- **G2. Off switch.** One control on the feed turns it off and returns the default order at once; the choice persists. It works without an account (P4).
- **G3. Anti-bubble share (proposal, number is yours).** At most two of every three new cards may be moved by a rule; at least one in three stays in the default round-robin order across subjects. The 1-in-3 figure is a starting guess, not evidence; the experiment may tune it.
- **G4. Behind an experiment.** Each rule ships only with a registered experiment and a holdout arm, and is switched off in the release build without one (P5).
- **G5. Privacy review before build.** No input beyond what privacy-reviewer has passed (gate rows P3.1 to P3.4). This role may not ship a personalization change without both an experiment and a privacy review (onboarding doc, authority).

## 3. The data it needs, and what it must never use

**Needs (all in the AMD-008 P2 permitted list and privacy gate P3.1):**

| Input | Where it lives | Status |
|---|---|---|
| Completion per lesson | `s3c:progress:v1` (browser); server progress after accounts | exists locally; server side with the accounts merge (EDD-008) |
| Prediction made, right or wrong (`predictedCorrectly`) | same | exists locally; EDD-009 §3 deliberately does not read it, so personalization needs its own privacy read (EDD-009 §7) |
| Revisit recall results, due-revisit state | same (`recalls[{at, correct}]`) | exists locally |
| Stated choices: subjects, "less of this", personalization on or off | a `settings` table (privacy-gate.md inventory) | **not built**; ships under its own schema diff (EDD-008 §6.1, EDD-009 §7) |
| Prerequisite and concept graph | `content/curriculum/` (category managers) | **unverified** how many lessons carry prerequisite edges; a coverage count is a pre-learner task (section 6) |
| Persisted events, to measure the experiment | W-706 (backend-engineer, backlog) | **not built**; design and readiness record may start now, no build before the accounts merge (fast path §4). Raw events at most 90 days, then aggregates, no IP (gate P6.3) |
| Accounts, so history follows a learner across devices | EDD-008, release milestone | in build; personalization must also work anonymously and locally (P4, gate P3.3) |

**Must never use** (AMD-008 P2, X1; privacy gate P3.1, P3.2): dwell time, swipes, scroll speed, session length or count, shares; anything about ads (impressions, taps, revenue); demographics, including the age band (teen mode changes what surfaces exist, never what order lessons come in); device; location finer than country; any inferred attribute (interest score, ability score, cohort id) stored per learner. Rule output is computed on demand and not stored per learner; if the rule log is kept for Q1.6, at most 30 days (gate P3.2). Anonymous history is not sent to the server to personalise (gate P3.3). No anonymous server-side id (privacy-gate.md, "Anonymous means local").

## 4. The success measure (to be fixed with analytics-steward before anything starts)

Proposed, for analytics-steward to correct and then freeze in an experiment registration in `company/experiments/` with a prediction committed before data:

- **Primary: Surface Value #4, first spaced-revisit recall,** per learner, over **all** lessons completed in the window, rules arm against default-order holdout. Measured over all lessons, not only the moved ones, so that a rule cannot win by serving easier lessons to the same learner.
- **Guardrail 1: Surface Value #5, prediction-to-reveal completion,** must not fall (AMD-008 P5).
- **Guardrail 2: breadth.** Distinct subjects reached per learner must not fall below the holdout by more than a margin the steward sets (the bubble check, G3).
- **Reported, never a success measure:** engagement (session length, return rate, swipes), labelled as engagement (X1).
- **Kill condition:** a rule is turned off if its arm lowers #4 or #5 against holdout beyond the registered harm threshold; stopping it is a one-line change in a founder-approved deploy (privacy ruling E1 to E3 on early stops, company/reviews/_privacy/2026-10-16-edd-009-s5.md).

I do not know the sample size this needs. With an unknown number of learners after launch, the steward should state the minimum detectable effect before we start, and if it is larger than any plausible effect, say so rather than run an underpowered test.

## 5. Privacy and child-safety constraints (for privacy-reviewer)

Learners may be 13 to 15 (F-01 decided: 13+ with teen mode). Constraints I would hold the design to, for privacy-reviewer to tighten (a stricter ruling wins; AMD-008 objection 7):

1. Inputs are the gate P3.1 list and nothing else; any addition needs a new privacy read before build.
2. The age band never reaches a rule function (same exclusion EDD-009 §3.1 uses for mastery).
3. No profiling: no stored interest or ability score; rule output on demand (P3.2).
4. Anonymous personalization runs in the browser only (P3.3).
5. Turning it off also stops server-side use for ordering (P3.4).
6. The reason copy is readable by a 13-year-old, true, and never shames ("you got this wrong" phrasing is reviewed by pedagogy-critic under Q1.6).
7. No personalised ads, ever, from this team's data: the rule inputs and outputs are not readable by the ad path (AMD-008 A9, F-19 title).
8. The experiment event carries no identifier and no free text, and honours Global Privacy Control and Do Not Track (privacy ruling C1, C2, C8; gate P6.4).

Asks for privacy-reviewer: a read of reading `predictedCorrectly` for ordering (EDD-009 §7 says it needs one); the `settings` schema diff; whether a 30-day rule log is needed at all or a replay from progress is enough.

## 6. What can be built before real learners exist, and what cannot

**Can be done now or before launch, with no learner data:**
- This brief, corrected by you (F-08).
- The rule list text and reason copy, recorded as claims, for a head-of-product decision (P1, P3).
- Rule functions and their tests on seeded histories (learner-model-engineer, EDD-009 part 2): replay equals served order (P1 test), forbidden inputs change nothing (P2 test), off equals default (P4 test), anonymous equals signed-in.
- A coverage count of prerequisite edges in `content/curriculum/` (category managers own the maps); rules 2 and 3 do nothing where edges are missing.
- The experiment registration with the committed prediction and harm threshold (analytics-steward).
- Privacy reads of the inputs and the `settings` diff (privacy-reviewer).
- W-706's design and readiness record (backend-engineer), already listed as a parallel start.

**Cannot be done before real learners:**
- Knowing whether any rule improves recall. Borrowed-mind reviews can judge whether a reason reads true and kind; they cannot measure spaced recall.
- Setting the anti-bubble share (G3) or the harm threshold from evidence rather than a guess.
- Sizing the effect, and so whether the experiment is worth running at our traffic.
- The AMD-008 X3 review of each rule after 30 days of real-learner data.

## 7. Open questions for the founder

1. **Is this what you meant?** The README's first two questions still stand: what adapts (order, level, variant, revisit timing, explanation style) and from which signal. This draft answers "order only, from predictions and recall". Is that too narrow?
2. **Timing:** after the accounts milestone as its own initiative (fast path C4), or inside release 1?
3. **Visibility:** is "why this lesson next" on every moved card, plus one off switch, the right amount of visibility? Do you want "more like this" as well as "less of this"?
4. **Anti-bubble share:** is one card in three from the default order the right floor, or do you want a different number or a different kind of guard?
5. **Default on or off** for a learner with history? (Off by default is safer for honesty; on by default gives the experiment data.)
6. **Teen mode:** same rules for 13 to 15, or personalization off in teen mode until privacy-reviewer and counsel have read it?
7. **Learned model later:** is a model ever in scope, or should rules stay the only kind (P1 asks for an amendment either way)?

## Objections

| # | Objection | Raised by | Answer / status |
|---|---|---|---|
| O1 | "Rule-based" may be narrower than what the founder means by personalization; this draft could anchor him to the smaller idea | personalization team (README; AMD-008 objection 6) | **Open, the founder's.** The draft is labelled a draft and question 1 asks it directly. If he means more, this page is rewritten, not defended |
| O2 | Recall per learner can be gamed by routing learners to easier prerequisites, so "recall went up" may mean "harder lessons were avoided" | personalization-lead (Goodhart line, onboarding doc) | **Partly answered** by measuring over all lessons per learner and by the breadth guardrail. Not fully: difficulty is not measured. Open to analytics-steward when the measure is frozen |
| O3 | With few learners after launch, a holdout experiment may be underpowered and stay inconclusive for weeks | personalization-lead | **Open, analytics-steward's.** Section 4 asks for a minimum detectable effect before start and an honest "not worth running" if it is too large |
| O4 | Moving any card contradicts "the feed is not personalised" and the honest cold-start label | head-of-product (company/decisions/2026-10-12-feed-is-not-personalised.md) | **Accepted into the design:** learners without history keep the cold-start label and order (AMD-008 F4); every moved card says why (G1); the record's own revisit trigger (50 lessons) has passed. Cold-start remains head-of-product's call |
| O5 | The 1-in-3 anti-bubble share is a guess with no evidence | personalization-lead | **Accepted as a guess.** Flagged as such in G3 and question 4; the experiment may tune it |
| O6 | Rules 2 and 3 depend on prerequisite edges that may be sparse in the curriculum maps | personalization-lead (unverified) | **Open.** A coverage count is a pre-learner task (section 6), owned by the category managers' maps |
| O7 | Drafting now spends tokens during the tranche-1 throttle (fast path §3.1) | portfolio-manager (fast path O6) | **Answered by size:** about 0.05M, listed as a parallel start in fast path §4; no code, no rule |
