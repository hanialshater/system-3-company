# Principles audit: System 3 Lessons against system3-meta PRINCIPLES.md (P1-P13)

owner: chief-of-staff-ceo-office (Leonie) · date: 2026-10-25 · decides: founder (each fix that changes the org; gate fixes are the evaluation steward's)
founder ask (2026-10-25, relayed by the coordinating session): "we spent a lot of money to make the org better than V [one strong agent]; I want all companies to follow the principles and to make it unmistakable... This is very very important."
principles: /home/user/system3-meta/PRINCIPLES.md · tool: `node /home/user/system3-meta/src/principles.mjs /home/user/system-3-company`
written with this audit: `company/company.json` (the design record the tool reads) · proposals: `company/ceo-office/2026-10-25-principles-org-proposal.md` (G1-G3)

## Summary

| | Before (no company.json) | After (company.json from the records) |
|---|---|---|
| Followed | 2 (P12, P13) | 6 (P1, P9, P10, P11, P12, P13) |
| Gaps | 6 | 7 (P2, P3, P4, P5, P6, P7, P8) |
| Checked by hand | 5 | 0 |

**The gap count went up because the record is now honest, not because the company got worse.** Before, five principles were unexamined and six were gaps only because nothing was written down. Now every principle has a verdict from the company's own files. Where my verdict is stricter than what the tool would compute from the fields alone (P7: a `sizeReason` is present; P8: a target and a stop rule are present), I recorded my verdict in `principlesRecord`, so the HQ shows the gap. I never recorded a verdict that was looser than the tool's.

The company follows the principles where they are written into code: P6 maker/checker separation is in `claimGates`, and P13 deploy approval is in CLAUDE.md. Its gaps are where the principles describe how work flows:
- lane M is a relay of cold makers (P2, P3);
- the org is larger than its reasons (P7);
- the budget stop has no meter (P8);
- the referee has no held-out part (P6);
- two paths have two owners (P5);
- shared files have no claims (P4).

Of the seven gaps, three need the founder (G1, G2, G3: org changes). Four are routed to their owners as board items: the ledger meter (tools-lead), the held-out audit (evaluation-steward), file claims (tools-lead), and re-owning two items held by a parked role (chief-of-staff). **None needs a protected path, a gate change or an amendment.**

## P1. Proportion: one strong agent by default; an org only for a reason

- **Evidence.**
  - Benchmark 6 ran the single-agent baseline on this company's own work. V had the company's CLAUDE.md, hooks and tools; M had the many-stage flow. Both did the same 3 one-card cs.systems briefs, scored blind.
  - V cost 43% of M ($7.19 against $16.66), took 0.37× the time, had 0 confirmed S1/S2 defects against 1, was accepted 3/3 against 2/3, and won 2 of 3 pairwise (system3-meta `research/bench6/BENCH6.md`).
  - Reasons the evidence does support:
    - **recurs:** 1,646 lessons; lane S plans 100 published lessons per cycle (`company/ops/projects.json`).
    - **too-big-for-one-context:** 14 curricula (`content/curriculum/`) and 8,260 open claims (`npm run company -- status`).
    - **independent-checking:** M6 found real errors in 7 of 10 lessons after the builders' own checks (`research/bench6/PREDICTIONS.md`), and `claimGates` refuses a self-verified claim (`tools/company.mjs`).
    - **long-horizon:** 21 production releases since 10-14 (`company/ops/releases.json`).
- **Verdict: followed, now that it is recorded.** The reasons hold for the catalogue, not for one item. B6 says that at the size of one lesson the single agent wins. So the company may be an org, but **each item's flow should look like V**. That is P2.
- **Fix.** None for P1 itself. `company.json` `baseline` cites B6 and its caveats (n = 3, one model). The next audit should re-weigh the baseline on a lane M item, which B6 did not test.

## P2. Warm makers, not chains of cold stages (looked at hardest)

- **Evidence: the first lane M item, `math/flatten-the-cube-to-a-dot`, 2026-10-25** (the commits and progress.md entries of that day):
  1. `92d9fbdd4`: **category-curator** writes the brief: 3 sub-cards, 7 claims, a numbers script (`company/domains/briefs/checks/math-lane-m-euler-check.mjs`) and the scaffold.
  2. `9f83a79ff`: **interaction-designer**, a cold session, writes a 199-line spec, an SVG mockup and a 307-line mockup renderer that recomputes the counts.
     - It finds a real problem: 12 hand removals take about 66 s against 53 s.
     - It **changes the brief's removal order** and a sub-card title.
  3. `cac18561b`: **category-curator** is dispatched again, cold (W-2043), to re-fit claim c5's source, the brief's picture text and its check script to the spec's new order. This is a back-hop.
  4. `283a3ed50`: **demo-builder**, a third cold session, "copied `FP`, `ORDER` and `REGIONS` from the mockup script" and recomputed the 13 states to match the spec's table.
     - It flags the hook as "the curator's text" (pre-flight 1) rather than fixing it.
     - It is still not the last word on its own stage: W-2043 ran in parallel on the same `meta.json`.
  - So there were **four maker sessions before the first check**. Three different makers held the same item, and each started from documents. The removal order was decided three times, by the curator, the designer and the curator again, and was computed three times, in the brief script, the mockup renderer and the build.
  - The flow is designed that way: "Interaction spec plus mockup before build, **always**" (restructuring proposal §2c, step 2; `poc-map.md` lane 6).
  - B6 names the cost of this shape: the many-stage flow cost 2.3× and took 2.7× as long, with no gain in accuracy, and "a cold builder session per stage lost context (eight-cores' reveal and stage drifted apart)". B8 found the same of the architect's hop (PRINCIPLES.md P2).
  - **Cost:** unmeasured. No ledger line exists after 10-16 (P8), so I cannot say what this item's relay cost.
  - Lane S has two makers in a row (curator brief, then a builder taking 10-20 briefs per run). That is at the default limit, and the builder is warm across its batch.
- **Verdict: gap. Lane M is a relay**, and the tool says so (`relay of makers in: lane-M`). The interaction-designer's finding (the 60-second fit) was real. But a maker can find it inside its own loop: the 60 s budget is in `company/product/demo-standard.md`, and the spec's own method was a time estimate. A separate role does not need to find it before code.
- **What a warm maker looks like here** (proposal G1):
  1. The curator's brief stays: what to teach, the claims, the category's sensitivities.
  2. **One demo-builder session owns the item from the brief to the build.**
     - It writes the interaction spec and mockup as the first part of its own work. The spec is kept as an artifact, so it can be reviewed.
     - It builds from the spec in the same context.
     - It runs its own checks in its loop: `npm run check`, the brief's numbers script (which it may update), the QA contract, `tools/sequence-probe.mjs`, `tools/reveal-fit.mjs`, `tools/a11y-scan.mjs`, and the 60 s time estimate.
     - If the stage forces a claim's source or wording to change, the builder edits the claim text, which leaves it `unverified`, and notes it. There is no hop back to the curator.
  3. **Independent checks, once, at the end:**
     - interaction-designer moves from maker to **checker**: an interaction review of the spec and the built stage, artifact first;
     - qa-tester, with the sequence probe;
     - fact-checker;
     - learner-evaluator;
     - for the first 3 items, design-lead's design review and pedagogy-critic's pairwise.
  4. One revision round by the same builder, from its own build notes. A resumed session would be warmer still, but no record shows the tooling can do it.

  This is two makers in a row, then checks. It meets P2, and no gate changes.
- **Who decides: the founder, not design-lead.**
  - The lane M flow, including the interaction-designer step "always", is part of the founder-approved F-50 design (`company/decisions/2026-10-25-founder-restructuring.md`; proposal §2c).
  - design-lead, as lane M manager, decides "what its workers do next, inside its budget" (AMD-017 draft, L2; proposal §3). That does not include which roles are makers in an approved flow.
  - The change also re-scopes interaction-designer in `tools/org/roles.mjs`, which needs a decision record (`company/ceo-office/org-change-process.md`).
  - So G1 is a proposal to the founder, with design-lead and interaction-designer consulted. Once it is approved, design-lead runs the trial batch.

## P3. Full context, chosen by the worker

- **Evidence.** Every dispatch is a new subagent, so sessions do not persist. Role memories (F-39, `tools/memory.mjs`) and build notes stand in for persistence. Role prompts mostly say where things are: each onboarding doc has a Map and "read only the inputs your task needs". Dispatch briefs name inputs (`company/ceo-office/dispatch-requests.md`). In lane M, three makers each rebuilt the item's context from files (P2 evidence). Lane S builders keep context across a batch of 10-20.
- **Verdict: gap** (recorded in `principlesRecord`). Workers mostly choose what they read, but in lane M the context is split across cold sessions by design.
- **Fix.** G1 removes the split for lane M. For revision rounds, the revision goes to the builder that built the item, starting from its own `build.md` (part of G1).

## P4. Autonomy with claims

- **Evidence.**
  - Work is assigned. Lane managers choose by mailbox (F-42; F-50 §3), and checkers are dispatched only from the quality lane (F-28). This is a **recorded departure**: the corporate archetype ("single-threaded owners decide in their lane", system3-meta `src/onboard.mjs` ARCHETYPES). Its reason is independence: makers must not choose their checkers.
  - Claims exist for dispatches: slot files claimed with O_EXCL (`tools/dispatch-check.mjs`, S3), and the mailbox refuses a second launch (M1).
  - **There is no claim on shared files.** On 10-25, W-2043 (curator) and W-2044 (builder) edited `src/demos/math/flatten-the-cube-to-a-dot/meta.json` in parallel, kept apart only by prose ("meta fields only; Demo.tsx untouched, W-2044 builds in parallel"). Every role writes `board.json` and `progress.md`, although `roles.mjs` names chief-of-staff "the only writer" of both.
- **Verdict: gap** on file claims. The assignment is reasoned.
- **Fix.** A `paths` claim on the dispatch slot: dispatch-check refuses a second live slot claiming an overlapping path (`tools/lib/slots.mjs`, not protected). This is tools-lead's design decision; board item filed. The "only writer" line in `roles.mjs` contradicts CLAUDE.md's "Before you finish". That belongs to G3.

## P5. Contract first, one owner per file or area

- **Evidence.** `company.json` `owns` lists 24 roles' paths, each taken from the role's `inScope` in `tools/org/roles.mjs`. Two paths are claimed twice there:
  - `src/app/hq/**`: tools-lead ("HQ: src/app/hq/** (floor plan, timeline, replay, meeting pages)") and hq-engineer ("src/app/hq/**");
  - `company/ops/events.jsonl`: chief-of-staff ("the only writer of ... events.jsonl") and tools-lead ("company/ops/events.jsonl and tools/events.mjs (append, backfill, query)").

  Less clear, and left out of `owns`:
  - `src/kit/progress.ts` (backend-engineer for sync, analytics-steward for event semantics);
  - `company/experiments/EXP-*.md` (analytics-steward, and personalization-eval for its own registrations);
  - shared logs (board, progress), which are written by all.

  The lesson contract (`src/kit/Lesson.tsx`, protected) and the QA contract (`tests/qa/**`, protected) are real contracts with one owner each.
- **Verdict: gap** (two owners on two paths; computed by the tool).
- **Fix (G3, founder).** hq-engineer owns `src/app/hq/**`, and tools-lead keeps `tools/` and the events tool. Writing `events.jsonl` stays with the chief of staff, and its schema and tool stay with tools-lead, so the two lines name different things. The "only writer of board.json, progress.md" line is reworded to match CLAUDE.md (everyone appends through the CLI; the chief of staff owns the structure). These are `roles.mjs` wording edits and need a decision record.

## P6. An independent referee, with a held-out part

- **Evidence.**
  - The referee is `npm run company -- publish <slug>`. It runs `launchGates` in the protected `tools/company.mjs`: every claim verified by someone other than its builder, a QA record, a learner review of the current version, readiness and holds. It also runs `npm run check` and the protected QA contract. Its owner is evaluation-steward.
  - The checker is never the maker, in code (`claimGates`: "verified by its own builder"). Evaluators see the artifact before the account (pattern `artifact-before-account`).
  - **No part is held out.** Builders can read the gates, the contract and every past review.
  - The founder approved the nearest thing on 10-16: F-41 item 9, "each week a random sample of 50 published lessons is re-walked and fact-checked" (`company/decisions/2026-10-16-founder-throughput-for-10k.md`). AMD-017 leans on it as the safeguard for sampling. **No record shows it has run.** Searching `company/evaluation`, `company/qa` and `company/rituals` for the audit finds none.
- **Verdict: gap** (`heldOut: false`).
- **Fix.** Run the F-41 item 9 audit. It is already approved, and it is not a gate change. Its checklist should be one the builders have not seen: planted cases, or a criteria file builders are not briefed with (`company/evaluation/criteria.json` is the steward's to decide). Board item for evaluation-steward, with analytics-steward. If the steward wants it to block, that becomes an amendment. Ratifying AMD-017's 1-in-5 sampling before this audit runs would remove a check without its safeguard. I flag this for the founder on F-51.

## P7. Few members, the right models (looked at hardest)

- **Evidence.** There are 39 active roles: 38 agents and the founder (`tools/org/roles.mjs`, after PARK). Models: 7 roles run on sonnet (qa-tester, accessibility-reviewer, release-manager, privacy-reviewer, hq-engineer, pattern-librarian, route-reviewer), and 31 inherit. So cheaper models are used for some members.

  **What the evidence supports, role by role** (F-50 §1a runs, `events.jsonl` reports):

  | Group | Roles | Reason that holds |
  |---|---|---|
  | Production flows | category-curator, demo-builder, interaction-designer, qa-tester, fact-checker, learner-evaluator, accessibility-reviewer, pedagogy-critic, route-reviewer, release-manager, design-lead | **recurs** (100 lessons a cycle), **too-big-for-one-context** (14 curricula, as data for one curator pool), **independent-checking** (four distinct gates; a checker is never the maker) |
  | Referee owner | evaluation-steward | P6 (`ALWAYS` in onboarding) |
  | Managers | head-of-product, portfolio-manager, principal-pm-verticals (lane S); design-lead is counted above | priority and lane budgets (P8) |
  | Operator and auditor | chief-of-staff, chief-of-staff-ceo-office | P11 (the router does not produce), independence |
  | Live product | principal-engineer, principal-engineer-ops, platform-engineer, backend-engineer, privacy-reviewer, tools-lead, hq-engineer | **long-horizon**, **recurs**: 21 releases, accounts, learner data, privacy gate (AMD-015) |
  | Learning and metrics | pattern-librarian, analytics-steward | P9, P10 |
  | Research | research-scientist (pool) | requested by both lanes |
  | Personalization, kept | personalization-engineer (maker), personalization-eval (independent check), growth-designer (in-product share and gamification) | a live feed with its own eval |
  | **Not supported** | vp-personalization, applied-scientist-personalization, learning-scientist-personalization, learner-model-engineer, learner-data-engineer | 0 measured tokens (the ledger stopped 10-16), 37 events between them up to 10-20 (`events.jsonl`), no step in any flow, and nothing on disk since 2026-10-20 (`git log -- company/personalization src/lib/learner`). A phase-A feed model with an independent eval is the shape B6 says one warm maker does best |
  | **Not supported past a date** | head-of-strategic-initiatives, vp-marketing | First Light closes at go/no-go on 11-23 (F-50 §4: "keep, sunset") |
  | **Not supported past a decision** | rnd-lead | kept only until F-49 (F-50 §4) |

  That is about 30 roles with reasons, and 8 without. Thirty is still far above 8. The sizeReason that holds is the four gates the constitution keeps separate, a recurring catalogue too broad for one context, and a live product. Breadth is held as data in pools (curator, builder, route-reviewer, research-scientist), not as more roles. That is the lesson of B13 ("breadth bought with headcount").
- **Verdict: gap** (recorded in `principlesRecord`, although `company.json` carries a `sizeReason`). The written reason covers about 30 of the 38 agent roles.
- **Fix (G2, founder).**
  - Park the 5 unsupported personalization roles now. Their scope moves to personalization-engineer (maker), personalization-eval (check) and backend-engineer (learner tables, under the existing migration order). vp-personalization's keep or kill per term moves to head-of-product.
  - Park head-of-strategic-initiatives and vp-marketing at First Light's close.
  - Park rnd-lead if F-49 is declined.
  - The result is 38 → 33 agent roles now and about 30 by 11-23. Every file is kept, and un-parking is one regenerate.
  - My own failure mode, "a reorg every week", stands as objection 1 in the proposal, and so does F-50's objection 6.

## P8. A cost target per item, with a stop rule

- **Evidence.**
  - **Target:** 90k subagent tokens per published tier-S lesson, 150k all-in once the coordinator is measured. Tier R is 300k, and lane M is 300k provisional (`projects.json`; proposal §2b and §2c).
  - **Stop:** a lane fails at 100% of its cycle budget (`tools/lib/ledger.mjs`, kind `lane`; dispatch-check B1). Lane S pauses at 180k per item (2×), and lane M at 450k.
  - **But the meter is off.** Ledger usage ends 2026-10-16T15:27Z, and no ledger line names `lane-single-card` or `lane-multi-card` (`grep -c` gives 0 on `company/ops/ledger.jsonl`). At least 7 role runs went into W-2037 on 10-25 (fact-checker, curator twice, interaction-designer, learner-evaluator, qa-tester, demo-builder: progress.md), and none of them spent anything on record, so the 100% stop cannot fire. The operator's tokens have never been measured (F-50 §1d).
- **Verdict: gap** (recorded in `principlesRecord`). The target and the rule exist on paper, but nothing binds.
- **Fix.** W-2034 (tools-lead: resume the ledger import, and give the operator's sessions a ledger line) is the one fix that turns P8 green. It is also the precondition for judging F-50's P1 and P2 and G1's prediction. It is already priority 1 on the board. It is not protected.

## P9. Shared learning with beliefs

- **Evidence.** There are 27 patterns in `company/knowledge/patterns/`. Each has a `confidence` (`**`, `*` or blank) with the sentence it rests on, `would_be_wrong_if` and `known_failure`. The 10-12 review downgraded stars that had nothing under them, which is reading the record as testimony. Role memories (F-39) carry learned lines with file citations, and they carry no verdicts. **No pattern has changed since 2026-10-16**, although the restructuring and lane M are new evidence: on the relay, and on a rule without a mechanism. The format is not the tool's `knowledge/entries.jsonl` with a numeric `belief`.
- **Verdict: followed** (recorded in `principlesRecord`; the tool cannot read the format), with a staleness note.
- **Fix.** pattern-librarian should consider two candidates from this audit: a "relay of cold makers" known-failure on `artifact-before-account` or a new pattern, and a new case for `a-rule-without-a-mechanism-is-a-wish` (P8's stop with no meter). An `entries.jsonl` index generated from the patterns would let the tool compute P9. That is pattern-librarian's choice; board item.

## P10. Predictions before runs

- **Evidence.** These were committed before their runs:
  - F-50 P1-P3, with wrong-if (restructuring proposal);
  - AMD-017's prediction;
  - launch predictions committed before the deploy that carried the lesson (`company/experiments/EXP-008-launch-predictions-left-or-right.md`, cited in `company/rituals/records/2026-10-17-launch-review-left-or-right-r9.md`).

  The company has no root `milestones.json` for the tool to read.
- **Verdict: followed** (recorded in `principlesRecord`). Judging F-50 P1 and P2 needs the ledger. Its own wrong-if says unmeasured operator tokens count as a failure.
- **Fix.** None beyond W-2034. G1 carries its own predictions.

## P11. The operator does not produce

- **Evidence.** On 10-20 and 10-21 the operator ran copy passes over about 1,230 lessons, 100 history maps and 24 map stories outside any lane (F-50 §1c; F-13 P1 recurring). Since F-50 (10-25), the operator's commits are dispatch events and handoffs. When it had no subagent tool, it stopped W-2037 rather than produce ("The chief of staff does not do production itself": progress.md 10-25).
- **Verdict: followed since 10-25** (recorded in `principlesRecord`). It is one day of evidence against two breaches, and the rule has no mechanism beyond `operating-loop.md` §0.
- **Fix.** None now. The next audit compares the operator's commits since 10-25 with its routing-only scope. If a breach recurs, the mechanism is dispatch-check refusing an operator commit that touches `src/demos/**` (tools-lead).

## P12. Copy, then customise

- **Evidence.** The tool's lint finds no copied role naming a path the company lacks.
- **Verdict: followed.**
- **Fix.** None.

## P13. The human stays in the loop that changes the loops

- **Evidence.**
  - Deploys need the founder's approval every time, with one pre-approved withdrawal (CLAUDE.md, AMD-015).
  - Protected paths change only by ratified amendment (hook plus CI).
  - The founder approves every org change (`org-change-process.md`).
  - Objections travel: F-50 left objections 1, 3, 4, 6 and 10 standing.
- **Verdict: followed.**
- **Fix.** None. Every fix in this audit that changes the org goes to the founder (G1-G3).

## What I also found (org health, outside P1-P13)

- W-2045 and W-2047 are owned by **design-engineer**, which F-50 parked into platform-engineer. dispatch-check S2 refuses parked roles, so both items are stuck: the euclid v2 revision and the probe's settle. This is a handoff wired to a parked role. Board item for chief-of-staff to re-own both, with dated notes.

## Fixes and owners

| # | Fix | Principle | Owner | Needs |
|---|---|---|---|---|
| G1 | Lane M: one warm demo-builder from spec to build; interaction-designer becomes a check | P2, P3 | founder decides; design-lead and interaction-designer consulted | org change (proposal) |
| G2 | Park 5 personalization roles now, 2 First Light roles at 11-23, rnd-lead on F-49 decline | P7 | founder decides; vp-personalization and head-of-product consulted | org change (proposal) |
| G3 | One owner each for `src/app/hq/**` and events; the "only writer" line matches CLAUDE.md | P5, P4 | founder decides; tools-lead, hq-engineer, chief-of-staff consulted | roles.mjs wording (proposal) |
| B1 | Resume the ledger import; the operator's sessions get ledger lines (W-2034, already priority 1) | P8, P10 | tools-lead | none |
| B2 (W-2050) | Run the F-41 item 9 weekly audit of 50 published lessons, with a checklist builders have not seen | P6 | evaluation-steward, analytics-steward | none (an amendment only if it is to block) |
| B3 (W-2051) | A `paths` claim on dispatch slots | P4 | tools-lead | none |
| B4 (W-2052) | Re-own W-2045 and W-2047 from parked design-engineer | org health | chief-of-staff | none |
| B5 (W-2053) | Pattern candidates from this audit; optional `entries.jsonl` index | P9 | pattern-librarian | none |
| B6 (W-2054) | File F-52 (G1-G3) in founder-inbox.json, where only the chief of staff writes | P13 | chief-of-staff | none |

No fix touches `company/constitution/protected-paths.txt`, a gate or the constitution, so **no amendment draft is needed**. B2 becomes one only if the steward wants the audit to block.

## Objections

| # | Objection | Answer or status |
|---|---|---|
| 1 | interaction-designer / design-lead: "The spec step caught the 60 s overrun before any code." | **Answered in part**: the check moves into the maker's loop and the designer's review moves to the end, where it sees the stage as well as the plan. **Standing**: whether a builder's own spec is as good. G1's first 3 items and their design reviews test it. |
| 2 | Myself (failure mode "a reorg every week"): G2 comes the same day F-50 kept personalization to avoid a second reorg. | **Standing.** The founder's 10-25 ask is new direction, and the roles have no measured run. The founder may keep them row by row. |
| 3 | The audit overrides the tool's computed state on P7 and P8 with stricter verdicts. | **Answered**: only stricter, each with its reason in `principlesRecord`. Removing those lines restores the computed state. |

<!-- Sources checked 2026-10-25: system3-meta PRINCIPLES.md, src/principles.mjs, src/onboard.mjs, research/bench6/BENCH6.md and PREDICTIONS.md; tools/org/roles.mjs (roles, parked, inScope, model); company/ops/projects.json; tools/lib/ledger.mjs; company/ops/ledger.jsonl; company/ops/events.jsonl; company/ops/board.json; tools/company.mjs launchGates/claimGates; tools/dispatch-check.mjs; company/knowledge/patterns/; company/ops/progress.md (10-25 entries); git log 92d9fbdd4, 9f83a79ff, cac18561b, 283a3ed50; company/ceo-office/2026-10-25-restructuring-proposal.md; company/decisions/2026-10-25-founder-restructuring.md; company/constitution/amendments/AMD-017-risk-tiers-and-lanes.md; company/constitution/protected-paths.txt. -->
