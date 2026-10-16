# Retro: 2026-10-16: rounds 3–5 (cap 14, shared review server, two SEV2s)

owner: chief-of-staff · attendees (by report): principal-engineer-ops (COE-A, approvals), principal-engineer (COE-B), evaluation-steward (AMD-011, COE-B review), pattern-librarian (COE reviews), tools-lead (r5 B1–B3), qa-tester (SO-10-1 ×4), fact-checker (SO-10-2 ×5), learner-evaluator (SO-10-3 ×3), demo-builder (6 builds), lane managers r5 (verticals, design, tools, portfolio, AI, CS, Life Hacks, physics, History, behavioral, ops, chemistry, geography, math)
incidents: ev-356e65fbc7 (SEV2, 09:45Z /dev/null; COE-A company/rituals/records/2026-10-16-coe-dev-null-replaced.md), ev-ff2a7438e3 (SEV2, 13:06Z shared-checkout autostash; COE-B company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md)
recorded by: chief-of-staff (this record is written by the owner of the rituals lane, not "as" the attendees; their words are in their reports and COE reviews)

## Numbers for this window (11:35Z–13:55Z, measured from git and the event log)
- 258 commits on main, 39 merges (16 branch merges, the rest integration merges of main-checkout records).
- Event log: 142 dispatch and 165 report events in the window (after the full backfill at ~13:40Z; the log had a 12:24–13:00Z gap that inflated the in-flight count to 16 against 7 real).
- Agents in flight: 3–13 (the founder's "2 tasks" moment was ~13:00Z, before round 5); builders 0–3.
- Branches merged: lh-engine-locked, tools-f5, wj-rev-r3, beh-r4-b1, beh-r4-b2, hist-co2v3 (plus the rounds-3 merges listed in the 13:05Z handoff).
- Review on the shared server (5b2fee7, then 3bf1d34 from ~13:40Z): QA 14 catalog + 15 Life Hacks pass; FC passes 59, 61 ×2, 62 (≈ 85 claims verified, 4 new disputes); learner walks: asthma revise, Wave J v2 ×2 launch.
- Briefs made build-ready (stage word budget lines): chemistry 10, math 9 (+1 over), geography 14 (+1 over), physics 7.

## What went well (keep doing)
- **Manager batches unblocked breadth.** Round 5 asked 14 lanes for batches; each came back in 2–8 minutes with ready items, and non-build work kept 10–13 agents busy while builds were held.
- **Independent checking caught real errors that the builders could not:** the calibrated-score c4 counterexample (FC 62), the AMD-011 probe's two published soft locks, the batch-by-setup key that the stage contradicts, PE-ops reproducing that the git guard misses the path that caused the wipe.
- **The incident gate worked as designed.** PE-ops declared, R2 held builds, both COEs were written by someone outside the area, reviewed, and one was sent back for a single wrong sentence.

## What hurt (with evidence)
1. **My brief text caused the 13:06 wipe.** mgr.txt, mgr3.txt and mgr4.txt (and item.txt) prescribed `git rebase -q --autostash … && git push` in the shared checkout, and mgr3/mgr4 claimed a stash guard that was not live. COE-B traces the mechanism; the template defect is mine.
2. **Single-writer files were written by checkers.** so.txt did not forbid board.json/progress.md; two runs wrote them (6141f65, f054d7e), and one board id collided (W-1370). Fixed in so.txt at ~13:45Z.
3. **The event log under-recorded,** so dispatch-check over-counted and refused a dispatch on a ghost count; I hand-closed 11 entries before tools-lead found the real cause (a backfill window gap).
4. **I queued a fact-check of work already done** (History FC 59 repeated FC 58), because I picked from the standing-order text without checking the claim log.

## What we will change
| Change | Mechanism | Owner | Board id |
|---|---|---|---|
| No state-changing git in the shared checkout | Commit-only line in every brief (in force); Bash refusal + detector (tools r5 B1, merge after C1); shared git-rules block + dispatch lint | chief-of-staff (now), tools-lead, chief-of-staff-ceo-office | W-1337, W-1381, W-1382 |
| Checker briefs forbid single-writer files | so.txt / fc.txt / item.txt carry the line (done) | chief-of-staff | — |
| In-flight count from matched reports, backfill without gaps | tools r5 B2 (merge after C1); full backfill each round, `--key` on hand events | tools-lead, chief-of-staff | W-1350, W-1400 |
| Check the claim log before queuing a standing-order run | Run `company claims --open` and the selector before naming a scope | chief-of-staff | — |

## What we will stop doing
- Writing push or rebase recipes into any brief.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| A retro written by the coordinator is not a retro of the attendees. | chief-of-staff-ceo-office (delegation retro, standing) | Open: this record cites the attendees' own reports and COE reviews and adds no words in their name; a participant-run retro is W-1203's question. |
| Builds held for ~1 h while two COEs were reviewed cost throughput the founder asked for. | chief-of-staff | Answered: the hold is R2 working as designed (PE-ops r5 R3); non-build work kept 10–13 agents busy during it. |
