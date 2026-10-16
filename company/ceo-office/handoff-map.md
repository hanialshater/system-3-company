# Handoff map: who hands what to whom, and who checks whom

owner: chief-of-staff-ceo-office (Leonie) · as of: 2026-10-13, routing updated 2026-10-16 (§6, founder rule) · status: living document (update after each role evaluation)
evidence: `company/ops/events.jsonl`, `company/ops/board.json`, `company/reviews/`, `company/rituals/records/`, `company/decisions/`, `tools/org/roles.mjs`

Every handoff is labelled with one of three states:

- **wired**: it happens, and the event log or records show it.
- **paper**: it is written in a role doc or the operating loop, but it has never happened.
- **broken**: it is happening, but through the wrong role, or it violates independence.

`tools/org/roles.mjs` defines `handoffs` for only one role (chief-of-staff). Every other handoff exists only as prose in `inputs` and `outputs`. This map is the first place the handoffs are written down in one place.

---

## 1. A lesson, as designed and as it actually runs

### As designed (operating loop, org chart, design-org decision)

```text
cm-<domain> / sub-area manager ── brief (ranked, answer-checked, names a format) ──▶ briefs/<domain>[.<strand>].md
        │                                                                                   │
        │ default format                              non-default / new format / hard        │
        ▼                                             ▼                                     │
   demo-builder ◀── spec + mockup ── interaction-designer ◀── pedagogy note ── learning-designer
   (claim.mjs)                        └─ mockup request ─▶ mockup-artist      ▲ question
        │                                                                     └── researcher (research.md)
        │ lesson code + build.md (hidden from evaluators) + local QA
        ▼
   chief-of-staff: merge, registry, verify (integration only)
        │ walkthrough artifacts only (never build.md)
        ├──▶ qa-tester ............ QA record + exploratory findings
        ├──▶ fact-checker ......... claim status + fact-check record
        ├──▶ learner-evaluator .... learner review (screenshots seen)
        ├──▶ accessibility-rev. ... a11y record
        ├──▶ pedagogy-critic ...... pairwise (A/B, no authorship) → demo-crit
        └──▶ design-lead .......... design review (new formats, layout findings, 10% sample)
        │ findings phrased as problems ──▶ demo-builder (revision, version bump, back to checks)
        ▼
   launch-review (chair: head-of-product; analytics-steward commits predictions)
        ▼
   release-manager: publish, deploy, release record ──▶ learners
```

### As it actually ran for 496 lessons

```text
cm-<domain> (2 runs each; geography via general-purpose) ── brief, no format (0/495 name one)
        ▼
   demo-builder (61 runs) — designs, researches and builds alone; design/specs/ is empty
        ▼
   chief-of-staff — merge, verify, runs QA harness, files "recorded by: qa-tester"
        ├──▶ fact-checker (16 runs)        wired
        ├──▶ learner-evaluator (17 runs)   wired (8 launches without screenshots, caught by the holds file)
        └── a11y, pedagogy-critic, design review, exploratory QA: never
        ▼
   chief-of-staff — launch review "acting for head-of-product", analytics predictions,
                    holds file as the de facto gate, publish-ready --publish
        ▼
   learners (76 published)
```

### Lesson handoffs, one by one

| # | From → To | Artifact | State | Evidence |
|---|---|---|---|---|
| L1 | founder → category leads | domain charter, OP goals | paper | OP drafted by head-of-product (1 run) and never ratified. W-005 still in backlog. |
| L2 | category lead → sub-area manager | strand of the curriculum | paper | 27 strand files are 3-line stubs, and none of the 27 managers has been dispatched |
| L3 | category lead → builder queue | ranked brief | **wired** | 495 briefs; `claim.mjs` hands them out under lock |
| L4 | brief → design (format field) | `format:` per brief | **broken** | The design-org decision requires a format on every brief. Briefs name 0 formats, so routing to design cannot trigger. |
| L5 | learning-designer → interaction-designer | pedagogy note (`reviews/<slug>/design.md`) | paper | 0 design.md files |
| L6 | interaction-designer → mockup-artist | mockup request | paper, **conflicting** | The mockup artist's input is "Design note" (from the learning designer). The learning designer's inputs list "Mockups". The design-org flow sends it from the interaction designer. Pick one source. |
| L7 | design → builder | `design/specs/<slug>.md` + mockups | paper | `design/specs/` is empty; 0 mockups |
| L8 | learning-designer ↔ researcher | question → research.md | paper | 0 research.md. Research was done inside build.md by builders. |
| L9 | builder → operator | branch + build.md + local QA | **wired** | 91 merge events |
| L10 | operator → qa-tester | built app | **broken** | The operator runs the harness and `qa-record`. The record says qa-tester. 0 exploratory runs. W-052 and W-082 unowned in practice. |
| L11 | operator → fact-checker | claims + transcript | **wired** | 2,141/2,141 verified by fact-checker |
| L12 | operator → learner-evaluator | transcript + sheet.png only | **wired**, with leaks | W-021: a reviewer saw meta.json early (disclosed, audit still open). 8 launches written without seeing screenshots. |
| L13 | operator → accessibility-reviewer | built app + walkthrough | paper | 0 a11y records. The launch condition of 2026-10-13 is unmet (W-057). |
| L14 | operator → pedagogy-critic → demo-crit | A/B walkthroughs | paper | 0 pairwise. Demo-crit (W-003) open since 2026-10-12 and overdue in `status`. |
| L15 | learner review → design-lead | contact sheets, layout findings | paper | 0 design reviews. 104/289 reviews say "told, not shown". 71 mention clipped or crowded stages. |
| L16 | reviewers → builder (revision) | findings phrased as problems | **wired** | 70 lessons at v2+. Sonnet revisers ran about 20k tokens/lesson (retro-2). |
| L17 | revision → re-check | version bump | **wired**, lagging | 8 lessons "revised since review (needs re-review)" in metrics; 52 were stale at retro-2 |
| L18 | analytics-steward → launch-review | committed predictions | **broken** | Written by the operator in the steward's name |
| L19 | head-of-product → launch-review | chair, go/no-go | **broken** | Every record says "acting: chief-of-staff" |
| L20 | launch-review → release-manager | go decision | **broken** | The operator publishes (13 publish/unpublish events are operator commits re-labelled by `events.mjs:80–81`). Two bad publishes (retro-2). |
| L21 | release-manager → principal-engineer | tier-2 deploy change for review | **broken** | Deploy eng review "owner: implementation author (Codex) · independent review pending PR" |
| L22 | learners → analytics-steward → category leads | recall data | paper | No deploy, no learners (EXP-002 not run) |

## 2. Who checks whom (independence)

| Work | Done by | Checked by (design) | Checked by (actually) | Independent? |
|---|---|---|---|---|
| Claims in a lesson | demo-builder | fact-checker | fact-checker | **yes** |
| Does the lesson teach (borrowed mind) | demo-builder | learner-evaluator + pedagogy-critic | learner-evaluator only; briefs written by the operator | yes, single witness |
| Does it work in a browser | demo-builder | qa-tester (harness + exploratory) | harness, run by the operator | harness yes; exploratory no one |
| Accessibility | demo-builder, visual-designer | accessibility-reviewer | no one | **no check** |
| Format and layout | demo-builder | design-lead (design review) | no one | **no check** |
| The go decision | head-of-product | launch-review attestations | operator, alone | **no** |
| Publishing | release-manager | gates in `company publish` + launch record | operator executes and decides holds | **no: the operator checks the operator** |
| Merges and integration | chief-of-staff | `npm run verify` (mechanical) | verify | mechanical only |
| Retros and COEs about the operator's own failures | chief-of-staff | COE reviewers (evaluation-steward, principal-engineer) | no one signed | **no** |
| WBR metrics | analytics-steward | head-of-product, founder | operator "acting" | **no** |
| Event attribution and agent metrics | tools-lead | CEO office | written by the operator; tools-lead reports to the operator | **no** (fixed by P3) |
| Gates and harness | evaluation-steward | founder (ratifies amendments) | AMD-001 proposed, unratified | pending |
| Tier-2 engineering | platform-engineer / backend | principal-engineer | EDD-003 open; deploy review pending | pending |
| Life Hacks safety | cm-lifehacks | lifehacks-safety-reviewer (→ evaluation-steward) | not yet | design is sound, team label is wrong (P6) |
| Locale variants | localizer | cultural-reviewer (→ **localization-lead**) | not yet | **no**: the judge reports to the owner of the work (P6) |
| Personalization changes | learner-model-engineer | experiment + privacy-reviewer | not yet | yes, by design |
| Org changes | CEO office designs (founder rule, 2026-10-16); before that the chief-of-staff did | founder approves every new role, agent, org, floor and room | until 2026-10-16: founder request → operator implements, and 2 of the last 4 had no decision record | **partly**; by design from 2026-10-16 (org-change-process.md) |
| CEO office proposals | Leonie | founder decides | (this is the first) | yes, by design: I may not approve my own proposals |

## 3. An org change, as designed and as it actually runs

```text
Designed:  founder request or CEO-office finding
             → CEO office: evaluation + decision-record draft (objections attached)
             → founder decides
             → chief-of-staff edits tools/org/roles.mjs, regenerates roles/ and .claude/agents/, updates HQ
             → decision record accepted, linked from the commit
             → CEO office checks at the next WBR that the role is used (agent metrics) or retires it (offboarding)

Founder rule (2026-10-16, company/decisions/2026-10-16-founder-org-and-dispatch-rule.md, rule 1): a new role, agent,
org, floor or room is never created by the chief of staff. It goes to the CEO office, which designs it, and the founder
approves every one before it exists. The full pipeline is in company/ceo-office/org-change-process.md ("The pipeline end to end").

Actual (before 2026-10-16): founder request → chief-of-staff designs roles, regenerates, builds HQ rooms, writes docs in the
           new roles' names → decision record (sometimes) → nobody dispatches the new roles
```

| # | Handoff | State | Evidence |
|---|---|---|---|
| O1 | founder → operator (request) | wired | founder events 26 |
| O2 | operator → decision record | **broken** for 4 of the last 7 changes | design-org, three-new-teams and three-more-orgs have records. d2b09ae (27 sub-area managers + principal-pm-verticals), c6638e3 (CEO office), 136e889 (illustrator) and 63e7923 (design engineer) have none. The last two were added during this evaluation. |
| O3 | decision → new role's first dispatch | **broken** | 46 roles were created on 2026-10-13: backend/growth/tools 5, Life Hacks/Personalization/International 7, Design 5 (with illustrator and design engineer), sub-area 27, Principal PM 1, CEO office 1. 0 had been dispatched before this run of the CEO office. Their first board items (W-090, W-092, W-100, W-101, W-102) sit in backlog. |
| O4 | new role → owner of its docs | **broken** | formats.md, system.md, international/ and personalization/ READMEs carry owners who have never opened them |
| O5 | unused role → offboarding (retire) | paper | offboarding ritual never run; no role has ever been retired |
| O6 | CEO office → WBR health section | paper (from this week) | WBR template has an Agents section but no owner for "company health" |

## 4. How the new orgs plug in

| Org | Plugs in at | Upstream (gives it work) | Downstream (takes its output) | Independent check on it | Today |
|---|---|---|---|---|---|
| **Design** (design-lead, interaction-designer, visual-designer, mockup-artist, illustrator, design-engineer) | L4–L7 and L15 | category leads (format on brief), learning-designer (pedagogy note), learner reviews (layout findings) | demo-builder (spec + mockup), platform-engineer (kit components `<Compare>`, `<Timeline>`, CSS) | learner-evaluator after build; design-lead may not approve own designs (needs a second designer or pedagogy-critic pairwise) | not plugged in: L4 broken, so nothing reaches it |
| **Life Hacks** (cm-lifehacks, lifehacks-safety-reviewer) | L3, plus a safety check after L12 | principal-pm-verticals (everyday-skills vertical), refuse list | builder queue only after the safety reviewer passes 5 briefs | safety reviewer → evaluation-steward; gate wiring needs amendment | waiting on W-090 (briefs). Watch boundaries with economics personal-finance, life health and chemistry. |
| **Personalization** (personalization-lead, learner-model-engineer) | after L22 (feed ordering, revisit) | founder brief (W-091), backend attempts data, curriculum prerequisites | platform (ordering outside lesson code, SPIKE-001 boundary), growth-designer | experiment registration (analytics-steward) + privacy-reviewer | waiting on founder and backend |
| **International** (localization-lead, localizers, cultural-reviewers) | a branch after L11–L12 per locale: lesson → variant → re-fact-check → cultural review → launch | principal-pm-verticals (which locales), EDD-003 variants-as-data | release-manager (per-locale publish) | fact-checker for region-dependent claims; cultural-reviewer, who should report to the evaluation steward, not the localization lead (P6) | waiting on locale choice; multiplies the review queue |
| **Sub-area managers** (27) | L2 | category lead (strand of curriculum) | builder queue via `claim.mjs` (reads strand files) | fact-checker on answers; overlap tool | dormant: curricula at cap |
| **Principal PM Verticals** | above L1 | founder direction, coverage and overlap, recall data | category leads (portfolio asks), International (locales), Personalization (paths), OP | head-of-product | waiting on founder brief; overlaps domain-scout |
| **Backend / Growth / Company tools** | after L20 (learner state), and the instruments | founder decisions (auth, DB, under-13) | personalization, growth, analytics | principal-engineer (tier 2), privacy-reviewer | backend and growth wait; tools work was done by the operator |
| **CEO office** | beside the operator, not in the flow | metrics, events, records | founder (decisions), WBR (health section), operator (written answers) | founder | starts now |

## 5. Missing or broken handoffs, ranked

1. **L20 launch → release-manager.** The operator publishes. The role forbids it, and both publish incidents were the operator's. → P1
2. **L13 → accessibility-reviewer.** A written launch condition is unmet across 76 published lessons. → P2
3. **Instruments → auditor.** Event attribution by keyword plus "recorded by: qa-tester" make the operator's work look like other roles' work in HQ and in the records. → P3
4. **Gates → evaluation steward → founder.** 13 open items and AMD-001 unratified, so the holds file (operator judgement) is the real gate. → P5
5. **L4 brief format → Design.** The whole Design org's input is missing. → P4
6. **L14 pedagogy-critic / demo-crit.** Overdue since day one; the v2s that would make it possible now exist. → P4
7. **Judges under the owner of the work:** cultural-reviewer → localization-lead; safety reviewer labelled `categories`. → P6
8. **O2/O3 org changes without records or first dispatch.** → P8
9. **D1-D4 dispatch without the lane's manager** (until 2026-10-16 every dispatch was chosen by the operator). → §6, company/ceo-office/dispatch-requests.md

## 6. Dispatch routing (since 2026-10-16: through the lane's manager)

Founder rule 2 (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md): the chief of staff dispatches only after asking the lane's manager. Lanes and POCs: company/ceo-office/poc-map.md. Format, cadence and limits: company/ceo-office/dispatch-requests.md. Record: company/decisions/2026-10-16-poc-map-and-dispatch-requests.md.

```text
board `next` / results / founder ask in a lane
        ▼
chief-of-staff ── one manager run per lane per round (dispatch-check --kind=other) ──▶ lane POC
        ▲                                                                               │
        │                     batch file: company/ops/dispatch-requests/<date>-r<N>-<lane>.md
        │                     (role, order, kind, worktree, tag, budget, inputs, done-when, checked-by, stop-if;
        │                      standing orders for mechanical work, expiring in 7 days or less)
        │                                                                               ▼
        │                     chief-of-staff: mechanical checks → caps (portfolio-manager priority across lanes)
        │                       → Agent calls, event summary `batch=<file>#B<n>` → `## Dispatched` appended
        │                       (refusals written, never rewritten)
        │                                                                               ▼
        └──────────── results go back to the same POC at the next round ◀────────── specialists
```

| # | Handoff | From → To | State (2026-10-16) |
|---|---|---|---|
| D1 | work signal → POC | chief-of-staff → lane POC (manager run) | paper (starts with the next round) |
| D2 | POC → batch | POC → company/ops/dispatch-requests/ | paper |
| D3 | batch → dispatch | chief-of-staff (checks, caps, Agent calls, `batch=` in the event) | paper. Before this rule every dispatch was the operator's choice, which made it **broken** by the rule's standard |
| D4 | result → POC | specialist's report → the lane POC, not a follow-up dispatch | paper. The 8 agents already running report to their POC (poc-map.md, transition table) |
| D5 | checker routing | lane 10 (evaluation-steward) dispatches every checker, including privacy-reviewer and cultural-reviewer, whose lines sit in the builders' orgs | paper. Founder to confirm (F2) |
| D6 | exceptions → founder | batch items marked "for the founder" → founder-inbox.json; one line per lane in the digest | paper |
| D7 | audit | events + batch files → CEO office WBR health section (share of dispatches with `batch=`) | paper. First check at WBR 2026-10-19 |

Not routed through a manager (chief of staff alone, protocol §4): integration, the four single-writer files, emergencies (contain, then principal-engineer-ops), the rituals the loop already assigns, resumes, and standing orders that are still valid.
