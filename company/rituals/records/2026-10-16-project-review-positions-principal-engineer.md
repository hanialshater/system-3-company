# Project Review 1: written position, principal-engineer

member: principal-engineer (Kenji), PE seat · filed: 2026-10-16 (deadline 2026-10-17 23:59 UTC) · board W-1158 · batch company/ops/dispatch-requests/2026-10-16-r2-engineering.md#B1
record: [2026-10-16-project-review.md](2026-10-16-project-review.md). This file sits next to the record and does not edit it. The record's "Written positions" pointer and its objections table carry the three objections below.

**Inputs read:** the record; the agenda (company/ceo-office/2026-10-14-project-review-1-agenda.md, items 0 to 8 and sections A and B); the pre-mortems; company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md; `node tools/ledger.mjs report` on 2026-10-16 (58.9M measured over 480 runs). **The ledger's event usage ends at 2026-10-15T09:02Z**, so no line's spend since the forum can be read.
**Reproduction:** I re-added every tranche table in the agenda, and each sums to its stated figure: first-light T1 3.59M and T2 8.17M; behavioral-econ 1.83M; history 2.52M; scale-stage-1 0.56M + 1.89M = 2.45M.
**Interest:** I own item 5, so my line on it is the owner's and does not count towards quorum for that item (template, "Quorum").

| # | Item | Position | Evidence | PE evidence objection? |
|---|---|---|---|---|
| 0a | Delegation from PR2 | go with changes | Make "changes no kit, contract or deploy path" mechanical. A tranche qualifies only if none of its work touches a tier-2 path in the EDD-007 path map (`paths.json`) or a protected path. Then the forum never has to judge it. | no |
| 0b | Internal unit | go | Nothing measured relates `subagent_tokens` to the plan limit (agenda 0b). principal-engineer-ops owns the conversion. | no |
| 0c | Thresholds | go with changes | The record says "shared engine" and the agenda says "an engine used by more than 10 lessons". Use the agenda's wording, because it is countable. Read "kit, contract, deploy path" as the tier-2 rows of `paths.json`, as in 0a. | no |
| 0d | Capacity = throughput and review | go | This matches the full-scope note §3. Tokens do not bind. What binds is PE reviews (about 11 in 10-26 to 11-09), privacy-reviewer runs (about 9) and builder slots (about 33 runs in 10-28 to 11-06). | no |
| 7 | first-light | **go on tranche 1 (3.59M); object to tranche 2's figure and stop rule** | T1 reproduces from the agenda (3.59M). T2 as approved is not credible. My full-scope re-estimate (short answer 6 and §2) puts **engineering T2 alone at about 8.5M** (8.2M to 8.6M, before the 1.25x to 1.5x run-count error), against 8.17M for **all** of T2. With cadence (1.49M) and the quality line (about 9.2M, 6.3M minimum), **T2 comes to about 19.2M (16.3M at the quality minimum), against the stop rule's 10.2M ceiling.** On these figures, the rule trips at the 10-23 checkpoint whatever happens in week 1. The record's objection row ("holds its dates at about 25%") is superseded. Go/no-go is about 50% if the 11-06 cuts are honoured, launch about 45%, and full scope shipping about 3% (note §4). **Change asked:** re-base T2 and the 10.2M ceiling from the full-scope note at or before the 10-23 checkpoint, or record now that First Light is expected back at the forum with cuts on 10-23, in the note's §5 cut order. | **yes, cost (T2 and the stop rule only).** Tranche 1 is not contested, and its work need not pause. |
| 8 | behavioral-econ | go | 1.83M reproduces from the agenda's ten set-up rows. The only engineering piece is the DomainId (59k measured), and it passed review (company/engineering/reviews/2026-10-15-W-981-behavioral-domainid-review.md). | no |
| 1 | history | go | 2.5M reproduces (1.22M + 1.12M + 0.18M = 2.52M). The tranche has no engineering work. The binding cost is the review queue (W-556), which is not mine. | no |
| 5 | scale-stage-1 (the owner's line) | **go with changes; object to the return lines and the checkpoint (feasibility)** | See "Item 5 in detail" below. In short: re-size to 1.89M. Two of the four A2 return lines are already met before A2 starts. The warm-frame fallback trigger cannot be measured on this host. | **yes, feasibility (the return measure and the checkpoint).** The re-size is a reduction and asks for nothing. |
| 4 | lifehacks-engine-v2 | **object (evidence)** | On engineering grounds this is a go: the W3 shared-engine change passed review (r2 engineering batch, "since last round"). **The figure, though, cannot be reproduced.** The agenda's 3.0M bought "engines plus batch D (14) migrated and reviewed". The record keeps 3.0M and moves the scope to fix waves W1 to W9 and their reviews. Neither the agenda nor the ledger has a cost for that scope. The fix plan (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md) carries no token figure. The ledger shows 0k because usage ends at 10-15 09:02Z, before the waves were built, so the kill rule "3M spent before W1 to W9 are reviewed" cannot be read today (cm-lifehacks raised the same point in company/ops/dispatch-requests/2026-10-16-r2-lifehacks.md). **What is missing:** a per-wave cost for the rebased scope, and the line's spend after `node tools/events.mjs backfill` and `node tools/ledger.mjs import`. I do not ask for a stop in the meantime: cm-lifehacks' 2.0M suspension guard already bounds the work. | **yes, evidence on cost** (the figure does not reproduce) |
| 6 | wave-j (half, 7.5M) | go | 7.5M is half of the agenda's 15M (144 x 101k). The 1.4M spent matches the ledger. The unit has since been re-measured at 122k (agenda A), which puts all 144 lessons at about 17.6M. That matters for releasing the second half. It is not an objection to this half. No engineering work. | no |
| 2 | marketing (internal, 1.0M) | go | No engineering work. Anything that touches a deploy path or the event API comes to me as tier 2 when it happens. | no |
| 3 | books-decks (returned) | go (I agree with the return) | F1 and F2 are founder decisions. No engineering blocker. | no |

## Item 5 in detail: scale-stage-1

**Budget.** A1 is done (0d76ae1, AMD-001 (c2)). It was charged outside this line (the ledger shows scale-stage-1 at 0k), so A1's 0.56M is no longer needed. **Re-size to 1.89M, the A2 pilot alone, with the checkpoint at about 1.0M (25 lessons migrated).** The old checkpoint was 1.2M for "A1 merged and 25 lessons migrated", and A1 has already merged.

**Are the four A2 return lines measurable on this host?** (4 CPUs, shared, and no phone.)

| Return line | Measurable here? | Today | What it means for A2 |
|---|---|---|---|
| App build ≤ 5 min | **Yes.** Use `time next build`, median of 3 at low load, because wall time on a shared host is noise (pre-mortem row 3). | **Already met after A1.** The production build took 84 s. CPU time fell from 3m35 to 2m22, and wall time on the shared host was 2m27 to 3m19 (company/engineering/readiness/2026-10-15-amd001-c2-split.md). | It cannot show anything A2 did. |
| QA ≤ 30 s per changed lesson | **Yes** for app lessons: Playwright wall time with `QA_ONLY` from `tools/qa-changed.mjs`. **For bundled lessons, only after the W-087 amendment**, because the contract (tests/qa, protected) must run inside the frame. | Lesson-only changes already cost about 20 worker-seconds a lesson (company/engineering/notes/2026-10-14-scalability-options-for-founder.md, a reported figure). | A2's real return is that a kit or shell change stops re-selecting every lesson. |
| `/` ≤ 10 stylesheets | **Yes**, and it is deterministic: count `<link rel=stylesheet>` in the served HTML. | **Already met.** A1 took it from 751 to 1 (same readiness record). | It is a guardrail now, not a return. |
| Warm frame ≤ 300 ms on a phone | **No.** There is no real device (W-085 is held). SPIKE-001 used only Chromium Pixel 7 emulation, and it says the after-snap time "must be measured on a device", because Chrome pauses painting in off-screen cross-origin frames. | The spike measured 228 to 687 ms under emulation, on remount, not after a snap. | **The pilot's fallback trigger (warm > 300 ms after preloading) cannot be read here.** |

So, as written, the checkpoint cannot tell whether A2 worked. Two lines pass whatever happens, and the deciding line cannot be read on this host.

**Lines I propose instead** (for the forum; as owner I would accept them):
- (a) **Build:** the app's `next build` (median of 3) changes by less than 5% when the 50 lessons move out, and each lesson bundle builds in under 1 s. This tests "whatever the lesson count".
- (b) **QA:** a kit change re-QAs only the bundles whose hash changed, at ≤ 30 s per changed bundle. This is measured after W-087 is ratified.
- (c) **Stylesheets:** `/` stays ≤ 10 with frames. This is a guardrail.
- (d) **Warm frame:** the checkpoint reads an **emulated proxy**, labelled as one: Pixel 7 emulation, 4x CPU throttle, median of 7, with the active ±1 frames pre-created. A real-device read (W-085) is a precondition for tranche 2, before any lesson past the 50 moves. If it is not available by then, tranche 2 does not start.

**Until the forum answers,** A2 design work continues (the bundler ADR and the pilot plan, batch B3, which defines these measures). No A2 build run is dispatched.

## What would make this position wrong
- A backfilled ledger shows lifehacks-engine-v2's spend and a per-wave cost on disk that reproduces 3.0M. Then item 4 becomes a go.
- The portfolio-manager shows that the 8.17M T2 already contains the quality line. Then item 7's gap is about 8.5M + 1.49M against 8.17M, which is smaller but still over.
- A real phone becomes available to this host, or a founder-approved preview can be read from one. Then line (d) is measured directly.

## Revision 2026-10-16 (item 5, after the A2 pilot design review)

Source: [company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md](../../engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md), "F1 and my Project Review 1 item-5 position". Platform-engineer's finding F1 (EDD-003 addendum §10) says the build trigger (10 min) and the QA trigger (2 h) for stage 1 no longer fire after A1. The direction of my item-5 position does not change: it is still a reduction and still "go with changes". Three parts of it do change:
- **Release 1.2M now, with 1.89M as the ceiling.** The remaining 0.69M is held until both the R9 checkpoint record and a real-device warm read (W-085) exist, and it is not released on a date.
- **The checkpoint is 1.2M**, which is the costed run plan R0 to R9. This replaces my uncosted 1.0M.
- **The case for stage 1 now rests on** the full re-QA after a kit change (55 min) and on the 1,000-lesson trigger. Line (b) must therefore report the kit-change re-QA scope (review condition P-1). Line (d): I accept holding at the checkpoint without a phone read, in place of reading the emulated proxy there.
The item-5 objection (feasibility) stays open until the forum takes these lines.
