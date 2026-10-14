# Scalability: what is breaking, and your tech options

owner: principal-engineer (Kenji) · for: founder · date: 2026-10-14 (22:30 to 23:10 UTC) · tier: advice (no change made)
Builds on [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md), the [stage-0 review](../reviews/2026-10-14-scale-stage0-review.md) and the [stage-0 note](2026-10-14-edd-003-stage0-feed-and-qa-changed.md). The host and CI COEs (`company/rituals/records/2026-10-14-coe-*.md`) hold the incident detail.

**Short answer.** You are right that it needs fixing, but most of today's pain is not "too many lessons". It is three self-inflicted costs: CI runs about an hour of full QA on every push, a generated file that every branch rewrites, and builders each running a full app dev server on one 4-CPU box. Fix those this week for no money. Then start EDD-003 stage 1: its triggers have fired. Buy compute only if the measurements after the free fixes still say so.

## 1. What is breaking now (measured tonight unless marked)

| What | Now (960 lessons) | At 2,000 (linear est.) | At 10k (est.) |
|---|---|---|---|
| Full `next build` | **14.2 min** (852 s: compile 712 s, TypeScript 65 s, pages 67 s; another session's build at load 6 to 8, `.next/trace-build`) | 30+ min | 1.5 to 2.5 h, past Vercel's 45-min build cap |
| Build output (server + static) | **1.12 GB**, plus 0.45 GB cache, 1.8 GB dev cache | 2.3 GB per worktree | 11.7 GB: one build no longer fits in today's free disk |
| Feed `/` HTML | **309,902 B (over the 300 KB budget again)**; 751 render-blocking stylesheets | ~670 KB | ~3.5 MB |
| Client chunk with every meta | **5.27 MB (1.30 MB gz)** on every page; geo kit duplicated in 2 chunks of 3.6 MB (1.04 MB gz each) | ~11 MB | ~55 MB |
| Full QA | 1,930 tests in 1.8 h at 3 workers (reported to me; I did not find the report file), so about 20 worker-seconds per lesson. CI: 51 min for 945 lessons in one job (COE) | 3.7 h local, ~1.8 h per CI run | 18 h local; one CI job passes GitHub's 6 h job limit: **hard break** |
| CI queue | **267 queued, 19 in progress, the oldest in progress since 10:14** (12.5 h). The judge is down | | |
| Host | 4 CPUs, 15 GB RAM, **11 GB free disk** (10 GB floor). Load 8 tonight with one build; 25 to 60 by day (COE) | | |
| Merge conflicts (replayed all 173 merges since 10-13) | **84 conflicted: 60 on `registry.generated.ts`**, 19 `progress.md`, 13 `board.json`, **only 2 `meta.json`** | grows with parallel branches, not lessons | same |
| `npm run check` | 0.8 s | ~2 s | ~8 s (fine) |
| Repo | 8,965 tracked files, 26.7 MB on GitHub; local `.git` 414 MB, of which 386 MB are never-gc'd loose objects | fine | fine (git breaks near 100k, EDD-003) |

Two of the chief of staff's observations need correcting:
- **"Full QA even when under 50 changed" does not hold for the next deploy.** Since the last deploy (`5e8608d`, 14:43), 232 lesson folders changed, and `tools/qa-changed.mjs` selects **960 of 960**, because `src/kit/types.ts` (the new `history` DomainId, a type-only change) and shell files changed. Changed-only QA would have saved nothing today. The selector also over-selects on type-only edits.
- **meta.json is not a text-conflict problem** (2 of 84). The real risk there is semantic: claim verdicts merged by hand (`a293a45`). The registry is the conflict problem.

Disk is held by build output, not lessons: in the main tree, artifacts are 3.3 GB (2.3 GB of walkthroughs), `.next` plus `.next-dev` 4.8 GB, and 386 MB of loose git objects. The other worktrees hold about 9 GB (`s3c-qa` alone 4.1 GB).

## 2. Options

Gate key. **Amd** = ratified amendment (protected: `tools/company.mjs`, `tests/qa/**`, `src/kit/Lesson.tsx`, **and `.github/workflows/ci.yml`**). **EDD** = design plus engineering review. **F** = your approval.

**Process and tooling (no spend)**

| # | Option | Fixes | Effort | Risk | Reversible | Needs |
|---|---|---|---|---|---|---|
| P1 | Drain CI: cancel the 286 stale runs, after the fixed-base protected-path audit (W-784) | judge down now | 10 min | a cancelled run skips its protected-path diff, which the audit covers | n/a | **F** (the session's token cannot cancel: W-781) |
| P2 | CI per push = constitution, check, typecheck, build, changed-lesson QA. Full QA sharded across jobs nightly and before deploy, `timeout-minutes`, drop duplicate `pull_request` runs (W-775) | queue, the 6 h job limit | 1 day | partial QA misses a cross-lesson break | revert | **Amd** AMD-007 (steward drafting) |
| P3 | `.gitattributes`: registry `merge=ours` then `npm run registry` after each merge (`check` already fails a stale registry); `progress.md merge=union` | up to 79 of 84 conflicts (some overlap) | 1 h | a skipped regenerate is caught by `check` and by the build | delete one line | none (tier 1) |
| P4 | Disk drain (W-525): prune build dirs with no live process, old walkthroughs, `git gc`; refuse a build under 15 GB free | disk floor | half a day | deleting a live dir (the script checks pids) | n/a | **F** only to remove merged worktrees |
| P5 | At most 2 builds or QA runs at once, and one shared built server (`next start`) for evaluators instead of a dev server per builder (W-532, W-526) | load | small | builders wait in a queue, not in a thrashing CPU | yes | none |
| P6 | `qa-changed` ignores type-only imports and hashes compiled output rather than sources | 960 to ~232 selected tonight | half a day | under-selection | yes | steward review (it becomes AMD-007's selector) |

**Compute (rough, verify current prices)**

| # | Option | Cost | Fixes | Security | Needs |
|---|---|---|---|---|---|
| C1 | GitHub Pro on your account | ~$4/mo | concurrent jobs 20 to 40 (public repo minutes are free) | none new | F |
| C2 | Self-hosted runner | $40 to 150/mo (8 to 16 vCPU VM) | runner supply | **poor fit: the repo is public and `ci.yml` runs on `pull_request`, so a fork PR can run code on your box.** Ephemeral runner, push-only, no secrets | F + **Amd** (`runs-on`) |
| C3 | Second or bigger agent host (16 vCPU, 64 GB, 200 GB) | ~$60 to 150/mo budget host, $300 to 500 hyperscaler | load and disk, 4x | a second place holding repo credentials. Git must stay the only sync | F |
| C4 | Vercel Pro | ~$20/mo per member | more than 100 deploys a day; Hobby is non-commercial use | none new | F |

**Architecture**

| # | Option | Fixes | Effort | Risk | Reversible | Needs |
|---|---|---|---|---|---|---|
| A1 | EDD-001 option 4: split the registry into server index and loaders; one geo chunk | -1.30 MB gz metas, -1.04 MB gz geo on every page | 1 to 2 days | low | revert | **Amd** AMD-001 (c2) (W-667) |
| A2 | **EDD-003 stage 1**: each lesson is its own esbuild bundle (spike: 2.4 KB gz median, 0.14 to 0.67 s per lesson), a manifest instead of the registry, a sandboxed frame, QA once per bundle hash | build time and output stop growing with lessons; 751 stylesheets; change-proportional QA; rollback in seconds; builders no longer need a full app dev server | 2 to 4 weeks, staged, lesson by lesson | spike missed warm latency (228 to 687 ms vs 300); touch and a11y in frames; migrating 960 lessons | high (manifest pointer; DemoHost loads either) | EDD (approved with changes), **F** bundler decision, **Amd** for `company.mjs`, `tests/qa`, `ci.yml` |
| A3 | Stay in Next, render lesson pages on demand (ISR) instead of prerendering | static generation (67 s) and about 1 GB of output | 2 days | does not touch the compile (83% of build) or CSS | yes | EDD |
| A4 | Split into one app per domain (multi-zones), or a content database | build size | weeks | multiplies deploys and the shell; audit rebuilt | low | EDD + ADR; **not before 100k** |

**Environment settings**

| # | Option | Fixes | Risk | Needs |
|---|---|---|---|---|
| E1 | A custom network allow-list for named source domains (ourworldindata.org, census.gov, naturalearthdata.com, CRAN, rug.nl, doi.org) for fact-check sessions, not "full" access (W-583) | ~19 held claims per wave; History's 30 data-less concepts | prompt injection from fetched pages; an exfiltration path. Keep it a short list | F |
| E2 | Give agents `actions:write` | lets agents cancel runs | it also lets them dispatch workflows, which is a path to deploys. **I advise against**: you run P1 once and P2 plus W-777 stop the regrowth | F |

## 3. Recommendation and sequence

1. **Tonight or tomorrow, you:** P1 (drain CI), E1 (allow-list). *Worked if:* queued < 20 at the busiest hour on 10-16 (W-481), and the next wave's held-claim count falls.
2. **This week, no spend:** P3 (platform-engineer), P4 and P5 (tools-lead), P6, and AMD-007 for P2 (evaluation-steward, then you ratify). *Worked if:* 0 registry conflicts in the next 50 merges (now 60 in 173); free disk ≥ 20 GB for 48 h; load ≤ 8 (2x CPUs); median per-push CI < 10 runner-min.
3. **Ratify AMD-001 (c2), then A1** (platform-engineer). *Worked if:* first-load JS on `/` drops by ≥ 2.3 MB gz.
4. **Approve the esbuild decision and start A2 (stage 1) now.** Its triggers have fired (about 1,000 lessons, a build over 10 min, full QA over 2 h). Migrate 50 lessons first, behind the dual-path host. *Worked if:* app build ≤ 5 min whatever the lesson count, ≤ 30 s of QA per changed lesson, `/` ≤ 10 stylesheets, warm frame ≤ 300 ms on a phone.
5. **Compute:** C1 now ($4, no downside). C3 only if step 2's load and disk targets still fail with the caps in force (decided under W-531, which I own). Not C2 while the repo is public.

## 4. Objections and risks (including against me)

- **Stage 1 while content is growing fast is a big migration, and the spike missed its warm-latency budget.** The cheaper path is "defer to 2,000" (decision record option D): builds of 30 min and full QA of hours, and the host stays the bottleneck. I still choose stage 1, because nothing else stops build time, CSS and QA growing with the catalog. The hedge is 50 lessons first, with a kill criterion: if warm stays over 300 ms after preloading frames, fall back to same-origin `import()` (EDD-003 A2-a) until auth exists.
- **Changed-only QA can miss a regression one lesson causes in another.** AMD-007 condition (c) wants full QA on every deploy SHA, which is your pain. My proposal: a deploy needs the changed set green plus a full sharded run green within 24 h on a tree that differs only inside lesson folders. That changes what a gate demands, so it is the evaluation steward's call. My objection travels with AMD-007.
- **Not buying compute may be false economy.** At 5x over capacity, agents waited all day (about 1.98M tokens an hour, COE). $100 a month is cheap next to that. My answer: CPUs do not fix a per-push cost bug. Double the CPUs and today's demand still saturates them. Measure after step 2, then buy.
- **`merge=ours` on the registry** leaves a wrong file for one step until it is regenerated. `check` and the build catch it. Untracking the file is cleaner, but it changes what `check`'s freshness rule means, so the steward should agree first.
- **My numbers.** The build time is another session's build at load 6 to 8, so it is high by maybe 1.5x against EDD-003's 7.1 min at 879 on a quieter host. The 1.8 h QA figure is reported, not located. Projections are linear, and the build has grown faster than linear so far. Prices are rough: check them before you approve.
- **Out of my scope:** host ownership (W-533), the CI budget owner (W-779) and the ops review belong to principal-engineer-ops and the chief of staff. The QA contract and gates belong to the evaluation steward.
