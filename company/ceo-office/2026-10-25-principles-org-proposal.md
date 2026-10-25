# Org changes the principles audit needs: lane M warm maker (G1), park 8 roles (G2), one owner per path (G3)

owner: chief-of-staff-ceo-office (Leonie) · decides: founder · date: 2026-10-25 · status: **proposed; nothing applied**
rests on: company/ceo-office/2026-10-25-principles-audit.md (P2, P3, P5, P7) · system3-meta PRINCIPLES.md · system3-meta research/bench6/BENCH6.md
founder inbox: F-52 (to be filed by chief-of-staff, the only writer of founder-inbox.json; text in section 5) · board: see section 6
process: company/ceo-office/org-change-process.md (consult, founder approves, then generate)

Each card can be approved alone. None touches a protected path, a gate or the constitution.

## G1. Lane M: one warm maker per item (P2, P3)

**Today** (F-50 §2c; poc-map lane 6): category-curator (brief) → interaction-designer (spec plus mockup, "always") → demo-builder (build) → checks. That is three cold makers in a row. On the first item it became four, because the curator was dispatched again (W-2043) to re-fit its brief to the spec. See audit P2.

**Proposed:**

| # | Step | Role | Kind |
|---|---|---|---|
| 1 | Brief: 2-4 sub-cards, claims, category sensitivities, numbers script | category-curator | maker |
| 2 | **One session owns the item.** It writes the interaction spec and mockup (kept at `company/design/specs/<slug>.md`), then builds in CardSequence. In its own loop it runs `npm run check`, the brief's numbers script (which it may update), the QA contract, `tools/sequence-probe.mjs`, `tools/reveal-fit.mjs`, `tools/a11y-scan.mjs` and the 60 s time estimate. If a claim's source or wording must change, it edits it, leaving it `unverified`, and notes it in build.md | demo-builder | maker |
| 3 | Interaction review of the spec and the built stage, artifact first | interaction-designer | **check** (was maker) |
| 4 | QA plus sequence probe | qa-tester | check |
| 5 | Fact-check | fact-checker | check |
| 6 | Learner walk (every item for the first 10) | learner-evaluator | check |
| 7 | First 3 items: design review; pairwise against the single-card twin | design-lead; pedagogy-critic | check |
| 8 | One revision round, from its own build.md | the same demo-builder | maker |
| 9 | Batch launch record; publish; deploy | head-of-product; release-manager; founder | owner |

**What changes in files** (after approval only):
- `company/ceo-office/poc-map.md` lane 6: "spec plus mockup before every build" becomes "builder's own spec, reviewed by interaction-designer".
- `tools/org/roles.mjs`:
  - interaction-designer: add "interaction review of lane M items after build". The pre-build spec stays in scope for lane S formats and for design-lead's first-3 reference items when design-lead asks for it.
  - demo-builder: add "lane M: writes its own interaction spec before building".
- A supersede line in `company/decisions/2026-10-25-founder-restructuring.md`.
- Gates: none. `tools/company.mjs` and AMD-017 are untouched.

**Who decides:** the founder. The flow is part of the founder-approved F-50 design, and the change re-scopes two roles. design-lead, as lane M manager, runs the trial once it is approved. Lane manager authority covers what workers do next inside the lane budget. It does not cover which roles are makers in an approved flow (AMD-017 draft L2; proposal §3).

**Predictions** (committed 2026-10-25, before any G1 item runs):

| # | Prediction | Wrong if |
|---|---|---|
| G1-1 | Each of the next 3 lane M items reaches its first independent check after **at most 2 maker sessions**, with no back-hop to the curator | any item needs 3 or more maker sessions before its first check |
| G1-2 | The interaction review and design-lead's review find **no more interaction faults** per item than on flatten-the-cube-to-a-dot (relay) | 2 of 3 items get an interaction "revise" that a pre-build spec review would have caught (the time budget, phone fit, milestone timing) |
| G1-3 | Once the ledger import resumes (W-2034), tokens per published lane M item are **at most 0.7×** those of the relay item measured the same way | above 0.9×, or the ledger has not resumed by the third item, which counts as unjudged, not as a pass |

**Undo:** revert the poc-map and roles.mjs commits and regenerate.

## G2. Park the roles the size reason does not cover (P7)

The audit (P7 table) finds reasons for about 30 of the 38 agent roles. It finds none for these 8:

| Role | Evidence | Proposed | Scope goes to |
|---|---|---|---|
| vp-personalization | 13 events up to 10-20; tokens unmeasured; no flow step | park now | keep or kill per term → head-of-product; objective and phases → personalization-engineer's brief, set by head-of-product |
| applied-scientist-personalization | 3 events | park now | personalization-engineer (maker); research-scientist on request |
| learning-scientist-personalization | 7 events | park now | personalization-engineer; lesson dims as data |
| learner-model-engineer | 11 events; owns `src/lib/learner/**` | park now | personalization-engineer (`src/lib/learner/**` moves with it) |
| learner-data-engineer | 3 events; owns `src/app/api/settings/**`, `src/lib/server/personalization/**` | park now | backend-engineer (it already sets the migration order); privacy-reviewer's pass unchanged |
| head-of-strategic-initiatives | F-50 §4 "keep, sunset" | park at First Light close (11-23) | portfolio-manager |
| vp-marketing | 3 runs; First Light narrative | park at First Light close unless the go decision needs it | head-of-product |
| rnd-lead | kept until F-49 (F-50 §4) | park if F-49 is declined | principal-engineer |

personalization-eval stays as the independent check: the org's two-way independence rule (2026-10-16 proposal) keeps the judge away from the maker. growth-designer stays for the in-product share and gamification surface.

**Result:** 38 → 33 agent roles now, about 30 by 11-23. Every file is kept: parking is an entry in PARK, and un-parking is one regenerate (`tools/org/roles.mjs`).

**Consult** (org-change-process step 2): vp-personalization (its org), head-of-product (receives decisions), backend-engineer and privacy-reviewer (learner tables), principal-engineer (kit and data), head-of-strategic-initiatives and vp-marketing (their sunset).

**Prediction:** in the 14 days after G2, personalization's open board items still move. Wrong if fewer than half of its `next` items on the day of the change have moved by day 14, which would mean the parked roles held work that one maker cannot carry.

## G3. One owner per path, and the "only writer" line (P5, P4)

- `src/app/hq/**`: hq-engineer owns it. tools-lead's inScope line becomes "HQ data adapters and tools; HQ pages through hq-engineer".
- `company/ops/events.jsonl`: chief-of-staff remains its writer. tools-lead's line becomes "the event schema and tools/events.mjs".
- chief-of-staff's line "the only writer of board.json, progress.md, events.jsonl and founder-inbox.json" is reworded to match CLAUDE.md "Before you finish" and practice: every role appends board items and handoffs through the CLI, and the chief of staff owns the files' structure and is the only writer of events and the founder inbox.
- Consult: tools-lead, hq-engineer, chief-of-staff.

## 4. Objections

| # | Objection (expected from) | Answer or status |
|---|---|---|
| 1 | Myself: "a reorg every week". G2 is proposed the same day F-50 kept personalization whole (F-50 objection 6). | **Standing.** The founder's 10-25 ask on the principles is new direction, and the roles have no measured run. The founder may approve G2 row by row, or not at all. |
| 2 | interaction-designer / design-lead: "The pre-build spec caught the 60 s overrun (66 s against 53 s) before any code." | **Answered in part.** The same estimate runs in the builder's loop, and the review moves to the end, where it sees the stage as well as the plan. **Standing** until G1-2 is judged on 3 items. |
| 3 | vp-personalization: "The feed, the learner model and the data are three disciplines; one maker cannot hold them." | **Standing.** If personalization's next phase shows a maker running out of context, that is the too-big-for-one-context reason, and the roles un-park with it recorded. |
| 4 | demo-builder: "Writing the spec adds to a build session already near its limit." | **Answered in part.** Lane M items are 3 sub-cards, and B10 held 668k tokens coherently (PRINCIPLES.md P3). Watch G1-3. |

## 5. F-52 text for the founder inbox (chief-of-staff files it)

```json
{ "id": "F-52", "title": "Principles audit (system3-meta PRINCIPLES.md): lane M warm maker (G1), park 8 roles (G2), one owner per path (G3)", "category": "approval", "priority": 1, "status": "open",
  "blocks": "P2, P5 and P7 turning green in the principles audit; lane M's next 2 items (W-2037)",
  "links": ["company/ceo-office/2026-10-25-principles-audit.md", "company/ceo-office/2026-10-25-principles-org-proposal.md", "company/company.json"],
  "options": ["A: approve G1, G2 and G3 (recommended)", "B: G1 and G3 only; keep personalization whole until its M1", "C: none; record the reasons in company.json and the next audit re-checks"],
  "recommendation": "A, row by row if you want. No protected path, gate or amendment is involved.",
  "note": "Prepared by chief-of-staff-ceo-office 2026-10-25; nothing applied. Audit now: 6 followed, 7 gaps, 0 by hand (was 2, 6, 5). Also on F-51: ratifying AMD-017's 1-in-5 learner sampling before the F-41 item 9 weekly audit runs removes a check without its safeguard (audit P6)." }
```

## 6. Routed without the founder (board)

See the audit's "Fixes and owners": B1 tools-lead (W-2034 priority), B2 evaluation-steward (W-2050), B3 tools-lead (W-2051), B4 chief-of-staff (W-2052), B5 pattern-librarian (W-2053), B6 chief-of-staff (W-2054, file F-52).
