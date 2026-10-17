# Ledger check reconstruction: the 45 errors, project by project (2026-10-17)

owner: portfolio-manager (Odette) · date: 2026-10-17 · asked by: the founder, via the external assessment (company/reviews/org/2026-10-17-external-assessment.md §7 "three concrete examples", Appendix B case 2)
status: **reconstruction, not a verdict.** No record was edited to make the check green. Nothing here rules on countFrom or grace; those are the founder's (section 4).
inputs: `node tools/ledger.mjs check` (2026-10-17, ledger rows to 2026-10-16T15:27:53Z); company/ops/ledger.jsonl; every committed version of company/ops/projects.json and company/ops/ledger.jsonl (git history, unshallowed for this run); company/ops/events.jsonl dispatch events; company/rituals/records/2026-10-16-project-review.md (PR1); company/decisions/2026-10-16-founder-first-light-t1-topup-2.md (F-43); company/ops/dispatch-requests/2026-10-16-r6-portfolio.md (§P1.3, the earlier 38-error sort); tools/lib/ledger.mjs.
evidence: the read-only script [recon.mjs](2026-10-17-ledger-check-reconstruction/recon.mjs) and its output [out.json](2026-10-17-ledger-check-reconstruction/out.json). Re-run: `node company/ops/2026-10-17-ledger-check-reconstruction/recon.mjs "$PWD"` (needs full git history).

## 1. What the checker does, and why it cannot judge history

`problems()` in tools/lib/ledger.mjs, for every **tagged** ledger line after `enforceFrom` (2026-10-14T19:00Z), calls `gate(reg, project, { now: l.ts, ledger: lines before l.ts })`. Four things follow:

1. **`reg` is today's register.** A project's status, budget, top-ups and grace in effect *at* `l.ts` are not used. History was `in-flight` with `grandfatheredUntil: 2026-10-16T23:59:59Z` until PR1 was committed (a1aa99c, 2026-10-16T09:07:30Z); today it reads `approved` with no grace, so 10-15 work is judged as if it had been approved and over budget.
2. **Top-ups have no effective date in the code.** `budgetOf()` adds every `budget.topUps[]` entry regardless of its `date`. A top-up recorded today makes yesterday's line pass (the assessment's synthetic fixture shows the same). The reverse also holds: rewrite history and the check goes green. That is why no record was touched.
3. **`l.ts` is the usage (completion) time, not the launch.** A run launched under budget and finishing after the crossing is flagged.
4. **The check assumes the gate saw the full ledger.** It did not: ledger.jsonl was committed on 10-14 (505 rows), then not until 10-16T14:38:58Z (f5597be, W-1231) and 15:28:40Z (051e7f0). Until 14:38Z on 10-16 the gate read **0 tokens** for History and behavioral-econ.

`budget.countFrom` exists in the code (spendAgainstBudget) and in token-budget.md §3, but **no project in projects.json sets it**.

## 2. Method

For each of the 45 flagged lines, recon.mjs evaluates the same gate function five ways:

| Col | Register | `now` | Ledger seen |
|---|---|---|---|
| A | today's (what `check` does) | completion | all lines before completion |
| B | as committed at the line's completion time | completion | all lines before completion |
| C | B, plus `countFrom` = PR1 commit time on approved projects (the History PR1 basis; a hypothesis, not a ruling) | completion | as B |
| D | as committed at the **launch** (first dispatch event with the same agent label) | launch | all lines before launch |
| E | as D | launch | only the **committed** ledger.jsonl at launch (what the gate could actually read) |

Limits: commit time is not decision time (the founder's words come minutes earlier; the PE-ops row in F-38/F-43 says ~15:40Z, its commit says 15:28:50Z). Launch time comes from the agent label in events.jsonl; it matched for all 45. The coordinator's own tokens are outside the ledger (token-budget.md §1). The uncommitted main-checkout imports of 10-16 are not in git, so E may understate what a session on the main checkout saw.

## 3. Results by project

| Project | Errors | Flagged tokens | Class | A | B | C | D | E |
|---|---|---|---|---|---|---|---|---|
| history, 10-15 10:12-10:40Z | 7 | 0.84M | **grace-period artefact** | fail | pass (in-flight, grace to 10-16 23:59) | pass | pass | pass |
| history, 10-16 09:34-14:34Z | 26 | 2.29M | **countFrom question** | fail | fail (all-time 4.0-6.3M of 2.5M) | pass (0-2.28M of 2.5M) | fail | pass |
| behavioral-econ, launched before the crossing | 2 | 0.13M + 1 unmeasured | **launch-vs-completion artefact** | fail | fail | pass | pass (1.53-1.70M of 1.83M) | pass |
| behavioral-econ, launched after the crossing | 9 | 0.69M | **real overspend against the register** (all-time count) | fail | fail | 7 pass, 2 fail | fail | pass |
| lifehacks-engine-v2 | 1 | 31k | **budget-basis question + stale ledger** | fail | fail (3.05M of 3.0M) | pass (2.75M) | fail | pass (2.37M) |

Column E passes for all 45: **no flagged run could have been refused by the gate as it existed when it was launched**, because the spend was not imported. That is a control failure (stale import, F-38's open objection, W-1282), not 45 dispatch decisions to ignore a gate.

### 3.1 History (33)
- **7 on 10-15 (·eafb, ·a282, ·40cf, ·70c8, ·b470, ·95f5, ·7fad): not violations.** History was `in-flight` with grace to 2026-10-16T23:59:59Z in every committed register of that day (2e0b74c, dcacbe2, 0b6a3c1). Established from the records; no ruling needed. The r6 sort (§P1.3) reached the same answer.
- **26 on 10-16 after PR1 (09:34-14:34Z): they turn on one question.** PR1 approved 2.5M with the basis "2.5M from approval; the ~1.45M already spent ... is history under countFrom" (projects.json `history.proposal.basis`). The register never set `countFrom` (the portfolio-manager's own error, r6 objection 1). With countFrom = PR1, History reads **2.28M of 2.5M (91%)** at the last flagged line and none of the 26 is refused. Counting all-time, every one is. F-43 states the founder has **not** answered it ("the gate keeps counting all-time").
- Two of the 26 are one resumed run (·893f: L-tx-47da03aa78 and L-tx-0648be14fd); `dedupeUsage` counts it once in spend, but `problems()` iterates raw lines, so it is flagged twice. A checker bug, small.
- **Economics, whichever count:** tranche 1's scope has measured about 4.5M against 2.5M planned, with 4 lessons published (r6 objection 2). countFrom changes whether the gate was breached, not whether the plan was 1.8x low.

### 3.2 behavioral-econ (11)
- Behavioral was `proposed` (no grace) until PR1 and `approved` at 1.83M after. r6 §P1.2 argued all-time is the right count here because tranche 1 was sized to include the set-up runs. I agree on the records (projects.json `behavioral-econ.proposal.basis` itemizes the set-up runs inside 1.83M), but it is the portfolio-manager's reading, not a ruling.
- All-time spend crossed 1.83M at about 12:40Z on 10-16.
- **2 launched before the crossing** (·ce5f launched 12:33Z at 1.70M; ·900d launched 12:19Z at 1.53M, unmeasured): artefacts of judging at completion.
- **9 launched after it** (·15af, ·fc63, ·b5dc, ·216e, ·1fc3, ·8037, ·c24a, ·33f9, ·12f4; 0.69M): real overspend against the approved register, invisible to the gate because the ledger was not imported. The project's own kill rule fired ("1.83M spent before the five are reviewed"). F-43 already decided: no top-up, STOP, in-flight work finishes.
- Under-counting the other way: two cm-behavioral manager runs (·3ee5 74k, ·2997 175k) are attributed to `catalog` by role-default (r6 A4b), so behavioral's true all-time is about 0.25M higher.

### 3.3 lifehacks-engine-v2 (1)
- L-tx-d93c444be4, "Publish Life Hacks slate (6)", launched 15:13Z, completed 15:14Z, 31k. All-time 3.05M of 3.0M at completion. At launch the committed ledger showed 2.37M (pass). With countFrom = PR1, 2.75M (pass).
- PR1 approved it "rebased to actuals: 3.0M", and the PE cost objection (projects.json `pr1Reopened`, F-34) says 3.0M does not reproduce. Whether 3.0M counts all-time or from PR1 is part of that open item.

## 4. What the records establish, and what needs the founder

**Established from the records (no ruling needed):**
1. The 7 History 10-15 errors are grace-period artefacts of the checker using today's register.
2. The 2 behavioral errors launched below 1.83M are completion-time artefacts.
3. No flagged run could have been refused at launch: the gate read a ledger last committed on 10-14 until 14:38Z on 10-16.
4. Behavioral-econ overspent its approved 1.83M: 2.88M all-time in the report (about 1.05M over), about 1.3M over with the two misattributed manager runs; 0.69M of it in the 9 runs launched after the crossing. Already ruled on in F-43 (no top-up, STOP).

**Needs a founder ruling (each needs the founder and one PE, token-budget.md §4):**
1. **History countFrom** (r6 ask 1(i), W-1450): does History's 2.5M count from PR1 (2026-10-16T09:07Z), as the PR1 basis says? Yes clears 26 errors as not breaches; no makes them 26 post-approval refusals, 2.29M. Either way the register keeps both readings and the ruling's date.
2. **The "tonight's grace" in F-43.** F-43 says History and behavioral "stay at STOP after tonight's grace (23:59Z)". No committed register after PR1 carries a grace for either project. Did the founder grant a grace on 10-16 for work in flight (which would cover all 37 History/behavioral post-PR1 errors), or describe the old pre-approval grace? The record is ambiguous; the founder says which.
3. **lifehacks-engine-v2 basis** (all-time or from PR1), inside F-34's reopened item 4.

**Not for the founder:** the classification itself, and the tools change below.

## 5. Tools change for tools-lead: versioned authorizations

Do not fix the report by editing old register entries. Change what the checker reads.

1. **Versioned authorizations in projects.json.** Per project, an append-only `authorizations: [{ effectiveFrom, status, budgetTokens, countFrom, grandfatheredUntil, approvedBy, record, conditions[] }]`, and `effectiveFrom` on every `budget.topUps[]` entry (F-43's entry, `first-light.budget.topUps[1]`, now carries one as the first instance; today's code ignores it). The current top-level fields stay as the latest view, so nothing else breaks.
2. **`registerAt(reg, ts)`** in tools/lib/ledger.mjs: resolves status, budget, countFrom, grace and only the top-ups with `effectiveFrom <= ts`. `gate()` and `budgetOf()` take it; `problems()` calls `gate(registerAt(reg, l.ts), ...)`. Entries with no `authorizations` fall back to today's fields and the check prints `unversioned` beside any error on them, so an unknown is not shown as a violation.
3. **Judge at launch, not at completion.** Look up the dispatch event for the line's agent label and evaluate at that time with lines completed before it. Keep the completion-time result as a second column.
4. **Two error classes.** "Refused with full information" (column D) and "refusable by the gate as it was" (column E), so a stale-import control failure is not reported as a dispatch violation, and the reverse.
5. **Dedupe in `problems()`** as `spendBy` does, so a resumed run is flagged once.
6. **A fixture test:** a top-up dated after a line must not change that line's verdict (the assessment's fixture, inverted into a test).
7. Wiring `ledger.mjs check` into `npm run check` stays an amendment (tools/company.mjs is protected; W-729). Until then a green `npm run check` says nothing about budgets.

r6 ask A4 (a, b, c) asked for items 2 and 3 and role-default attribution; I find no tools-lead board item for it, so I ask the chief of staff to file one (board items wanted, in the run report).

## 6. What I believe, and how sure

- High confidence on the arithmetic and the classes: the script re-runs the repository's own gate function, and the r6 sort reached the same split on 38 errors with fewer rows imported.
- Medium on launch times: they come from dispatch-event agent labels. A relabelled resume would move a line between D classes.
- The 45 errors are, in substance, **7 artefacts, 2 artefacts, 26 pending one founder answer, 1 pending a basis answer, and 9 real (already ruled on)**. Restated after a ruling, never by editing old entries.
