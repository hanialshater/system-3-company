# Operational readiness: <slug>

owner: principal-engineer-ops (template and tier-2 approval) · co-designed with: principal-engineer (change tiers are defined in company/engineering/README.md, review pending: EDD-007) · filled by: the engineer making the change
decision: company/decisions/2026-10-14-founder-risk-in-ops-review.md, Amendment 1 ("operational excellence is a company-wide responsibility on all engineers")
record: `company/engineering/readiness/<date>-<slug>.md`, one per change, committed **before** the change ships. Mechanism: EDD-007 (proposed).

## Which tier, and what it needs

The tier is the **change tier** from company/engineering/README.md (0 routine, 1 shared and reversible, 2 critical). It is not the service tier in tiers.json (T1-T3). Where they meet, the stricter wins: a change to a T1 service or D1 data store counts as change tier 2 here.

| Change tier | Examples | Readiness needed | Who signs |
|---|---|---|---|
| **0: routine** | One lesson's own files, copy, briefs, review records, docs | **Nothing.** Do not write a record. Ceremony on tier-0 work is a defect. | — |
| **1: shared, reversible** | Feed UI, catalog page, CLI commands outside the gates, shared CSS, walkthrough and QA tools, HQ, ops tools | A **self-check**: sections 1-7 below, a few lines each, by the engineer. No approval. | `self-check: <role>` |
| **2: critical** | `src/kit/`, the lesson contract, data shapes (meta.json schema, registry), build and deploy config (`vercel.json`, `.github/workflows/`, `next.config.*`, `package.json` dependencies), an engine or template used by more than 10 lessons, performance at scale, protected paths | The full check, and **approval by principal-engineer-ops** before it ships | `approved-by: principal-engineer-ops` |
| **2, whatever its size** | Anything that touches **deploy** (the path to production, Vercel config, `deploy.yml`), the **event API** (`src/app/api/**`, `src/lib/events*`), **auth**, or **learner data** (any store, schema or retention) | As tier 2 | as tier 2 |

Tier 2 still needs everything company/engineering/README.md asks for (an EDD, an engineering review, an ADR if it is hard to reverse, an amendment for a protected path). Readiness does not replace them. It adds the operating questions they do not ask. One file can serve both: link the EDD and the review, and do not copy them.

**Approval is never self-approval.** A change in principal-engineer-ops' own area (ops-health, risks, tiers, incident tooling) is approved by principal-engineer.

## Record header (machine-read; keep these lines exactly)

```
change: <one line: what changes>
change-tier: 1 | 2
paths: <comma-separated globs this change touches>
author: <role>
self-check: <role>            (tier 1)
approved-by: principal-engineer-ops   (tier 2; added by the approver, never by the author)
approved: <YYYY-MM-DD>        (tier 2)
board: <W-n>
risks: <R-nnn adds | R-nnn closes | R-nnn rescored | none>
links: <EDD, eng review, PR or commit>
```

## The check (tier 1: a few lines each; tier 2: all of it, with evidence)

1. **What can fail.** The two or three most likely failures, and the worst one. Who sees it: learners, agents, or only us?
2. **How we would know.** The meter or alert that goes red, and where (ops-health, `company status`, CI, the post-deploy smoke, HQ). "Someone would notice" is not an answer. If there is no meter, say so, and that is a risk entry.
3. **How to roll back.** The exact steps and how long they take: `git revert <sha>`, a Vercel rollback (runbook-deploy.md), a flag. Does rollback lose data? Can it be done without the founder?
4. **Capacity.** What it costs the shared resources: CPU and memory on the host (a build, a dev server, a long-running process?), disk (build dirs, caches, worktrees), CI minutes per push, the Vercel quota (100 deploys a day), and the usage budget (agent runs). Use numbers, measured where you can. "Every shared resource needs an allocator before it needs a cleanup."
5. **Security.** New routes, query parameters, iframes, third-party scripts, secrets, permissions, what a URL alone can do. Anything a stranger can reach in production.
6. **Data.** What it writes, where, who can read it, how long it is kept, and whether a learner can be identified. Tier 2 for any learner data, with privacy-reviewer consulted.
7. **Risks.** Which entries in company/ops/risks.json this change adds, closes or re-scores, with the evidence. A change that closes a risk says which mechanism now works (`reality: in-place`). principal-engineer-ops writes the register; the record proposes.

## Approval (tier 2; written by principal-engineer-ops)

- Decision: approved / approved with conditions / refused
- Conditions, each with a board id:
- What would make me revoke it (an observable, not a feeling):
- Objections raised, and what happened to each:

Then add `approved-by: principal-engineer-ops` and `approved:` to the header. A refusal says what would change the answer.
