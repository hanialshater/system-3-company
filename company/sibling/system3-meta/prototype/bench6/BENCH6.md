# Benchmark 6 results: Meta (claims checked before build) vs one vanilla agent (2026-10-22)

**The arms.**
- Same 3 cs.systems briefs: eight-cores-not-eight-times, faster-link-same-wait, drivers-stop-switching.
- Same base: `meta/m7` 7d8079c2b.
- Same model, the company's CLAUDE.md and hooks, run in parallel.
- **M:** Meta, spec `s3c-lessons-b6.json` (draft → plan-check → build → test1 → qa → walk → check → learner → launch → gates → ship → merge), branch `meta/b6`.
- **V:** one Agent SDK session (`vanilla-lessons.mjs`), branch `meta/b6v`.

**Scoring.** Blind, per [score.md](score.md). Reviewers saw A=V and B=M, with the key drawn at random and read only after filing:
- fresh walkthroughs;
- 6 independent fact-checks, with every S1/S2 reproduced by a second agent;
- 6 acceptance reviews;
- 3 pairwise judges;
- mechanical gates.

Predictions were committed beforehand in [PREDICTIONS.md](PREDICTIONS.md).

## Results

| | V: vanilla agent | M: Meta |
|---|---|---|
| Published, ship gate | 3/3, 3/3 | 3/3, 3/3 |
| Confirmed S1/S2 defects (blind, reproduced) | **0** (2 filed S2 both reproduced as S3) | **1** (eight-cores c5: an S2) |
| S3 / S4 filed | 3 / 4 | 2 / 3 |
| Acceptance (blind) | **3/3** | 2/3 (eight-cores rejected: the reveal shows the reset 1-core state while the text talks about 8 cores) |
| Pairwise preference | **2** (eight-cores, faster-link) | 1 (drivers-stop-switching) |
| Rule breaches (protected paths, `[deploy]`, push, hook bypass, self-verified claims) | 0 | 0 |
| `company check` delta | 0 | 0 |
| Cost | **$7.19**, plus 10 nested sessions not priced (about 3.4M tokens, about +19%) | $16.66 |
| Wall clock | **36.5 min** | 98 min (about 55 min of it waiting: Next.js QA build retries and a 31-min founder budget wait) |
| Lead time per lesson (median) | **32.7 min** | 48.8 min |
| Sessions | 1 SDK session + 10 `claude -p --agent` sessions it launched itself | 18 |
| Founder asks / operator interventions | 0 / 0 | 1 / 3 |

**The surprise: the vanilla agent built its own harness.**
- It launched nested `claude -p --agent fact-checker|learner-evaluator|head-of-product|release-manager` sessions, using the company's own subagent definitions.
- It briefed them not to read the build notes, and committed their verdicts.
- So its claims were checked by separate contexts, though contexts it launched and briefed itself ("builder-launched", not independent in the protocol's sense). It did not self-verify.
- With the company's CLAUDE.md, one agent orchestrated the company's roles on its own, cheaply and quickly.

## Predictions

| # | Verdict |
|---|---|
| P6-1 V ≤ 50% of M's cost | **held, barely:** 43%, or about 51% counting V's unpriced nested sessions |
| P6-2 M within ±25% of M6's $3.69 a lesson | **wrong:** $5.55 |
| P6-3 V wall clock ≤ 1.25 × M | **held:** V took 0.37 × M |
| P6-4 V's lead time longer than M's | **wrong:** 32.7 against 48.8 min |
| P6-5 V has S1/S2 in ≥ 2 lessons; M in ≤ 1 | **V half wrong** (0 lessons); **M held** (1) |
| P6-6 V self-verifies its claims | **wrong:** it used nested checker sessions |
| P6-7 0 breaches in both arms | **held** |
| P6-8 M 3/3, and V ≥ 2 only by self-verifying | **half:** M 3/3, but V never self-verified |
| P6-9 0 check delta | **held** |
| P6-10 M's claims check finds ≥ 1 problem before build | **held:** 2 draft revises |
| P6-11 M 3/3 accepted, V ≥ 2/3 | **M wrong:** 2/3; **V held:** 3/3 |
| P6-12 pairwise prefers M on ≥ 2 | **wrong:** V 2, M 1 |

## What this says

1. **On one-card lessons, Meta's many-stage flow did not beat a capable single agent.**
   - It cost 2.3× as much and took 2.7× as long.
   - It was not more accurate: 1 confirmed S2 against 0, and acceptance 2/3 against 3/3.
   - The claims check before build did catch problems early (P6-10), but the post-build loops still happened, and a cold builder session per stage lost context (eight-cores' reveal and stage drifted apart).
2. **Independence isn't what separates them here.**
   - V got separate-context checks just by launching subagents.
   - What Meta adds over that is enforcement: code-stamped verdicts, a builder that cannot brief its own checkers, guards, budgets and the record.
   - For lessons this size, that enforcement was not worth 2.3× the cost.
3. **The next harness must win on speed and accuracy, not only on governance.**
   - A warm builder session that does its own checks inside its loop (K26).
   - One external evaluation at the end, batched or sampled (K27).
   - Learning from failures across runs (K28).
   - Benchmark 7 tests this on a harder, noisier task: a text adventure engine whose specs carry errata, ambiguity, requirement drift and seeded randomness, with category-only hidden feedback.

**Caveats:** n = 3 lessons, one model, and the arms ran in parallel on 4 CPUs. V's cost omits its nested sessions. M's time includes environment and founder waits that V handled inside its own loop.
