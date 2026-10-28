# Real-catalogue content hub test

owner: rnd-engineer · date: 2026-10-24 · board: W-2172 · status: ready for independent review
tracking: GitHub #18 / draft PR #20

## Scope and result

The default branch contains **1,645 real demos across 14 domains**, all present in source revision `60eaf60a`. All were copied into an isolated Git repository and independently bundled through a lab-only React/kit compiler adapter. An additional **1,000 labelled source copies** produced a separate 2,645-record workload. Those copies are not incoming authored demos and provide no additional independent compatibility coverage.

The [plan](catalogue-plan.md) was committed locally in `c286f350` before executing the experiment. Its numerical results and raw-report hashes are in [catalogue-summary.json](evidence/catalogue-summary.json); reproducible raw output lives under `artifacts/content-hub-catalogue/`.

| Measurement | Observed |
|---|---:|
| Real demo artifact builds | 1,645 / 1,645 successful |
| Full independent-artifact compilation, concurrency 4 | 185.84 seconds |
| Shared React/kit runtime build, separately measured | 4.15 seconds |
| One changed-demo artifact compilation, runtime already available | 36.6 ms |
| Warm successful-key lookups, all 1,645 demos | 40.5 ms; no compilation |
| Initial source dependency index | 801 ms |
| Index at 2,645 records | 813 ms |
| Source import commit / scoped commit / 1,000-copy commit | 395 / 29 / 198 ms |
| Git status at 8,995 tracked files | 95.6 ms |
| Sum of real lesson bundles, excluding common runtime/frame assets | 35.84 MB raw / 12.29 MB gzip |

This is a full **artifact build baseline**, not a measured monolithic Next.js build. The single-demo measurement comes from one isolated source revision, not a p95 latency or a claim that every demo builds in 37 ms. Local timings are single observations on this worker, without production queue/network/remote-storage costs. Warm lookup timings do not mean the source import, Git writes, tests or browser loading are free.

## Change selection and cache checks

- One isolated entry edit selected **1** demo; ten isolated entry edits selected **10**; a documentation path selected **0**.
- A `src/kit/controls.tsx` source edit selected **1,643** transitive consumers. A dependency index cannot eliminate genuine shared changes. Production must publish a new pinned kit version and upgrade demos deliberately; an existing artifact remains pinned to the old runtime.
- Indexed selections exactly matched independently recomputed keys for the edit fixtures. Restoring source inputs restored the original key. The scoped source edit was committed in the scratch Git repository and compiled; its comment-only change can optimize to the same output bytes, so this measures source invalidation/rebuild, not a changed learner behavior.
- All 1,000 source-copy records matched already successful input keys. This validates deduplication for repeated inputs and growth of the source/index; it does **not** measure compilation cost for 1,000 novel programs.
- The original prototype's seven integration cases plus a new dependency-index case passed (**8/8**). The new case covers barrel/transitive imports, CSS, JSON, unrelated demos and copied-source cache identities. [Raw output](evidence/catalogue-tests.txt).

## Runtime and dependency validation

Before compilation results, one demo per domain was selected and frozen in `sample-selection.json`. All **28/28 phone/desktop browser checks** passed: sandboxed artifact rendering, visible lesson contract, prediction-to-explore transition and no horizontal overflow. [Per-demo results](evidence/catalogue-browser.json). The browser uses emitted artifacts from a separate origin with the existing pinned React/kit frame runtime, not the Next.js generated loaders.

An independent webpack resolver comparison found no missing indexed source files for the **14/14 selected entries**. [Audit](evidence/catalogue-graph-audit.json). Webpack also watches directories; the audit distinguishes those from source files. Adding/removing modules and changing imports require refreshing the index and resolver-directory information; this static experiment is not a complete incremental filesystem watcher or production cache-correctness proof for all possible imports.

Full catalogue TypeScript checking passes. `npm run check` still reports exactly the baseline's 811 errors and four warnings; the diagnostic lines match the isolated unchanged base. `npm run verify` still stops at the same two publication-readiness failures after deployment tests pass, so later aggregate stages are not claimed as passed. No protected QA file was edited and no editorial publication gate was bypassed.

## Architecture decision supported

Proceed to independent R&D and architecture review, not rollout. The main compatibility obstacle expected from the original DOM-only compiler can be addressed using the existing React/kit artifact path and a lab adapter that bundles local shared components. No existing lesson source needed migration for this test.

The real Next.js integration still needs request-time/cached catalogue resolution and runtime artifact loading. Today `DemoHost.tsx` uses generated component imports, while `/d/[slug]` statically enumerates lessons with `dynamicParams = false`; new demo URLs would still need a rebuild until those are changed. See [nextjs-architecture.md](nextjs-architecture.md).

This benchmark did not connect the new React compiler adapter to the original DOM prototype's production-like write API, replace real app routes, run every demo's full interactive QA, validate million-demo throughput, provide hostile-code build isolation, or deploy anything. R&D acceptance remains W-2170 and production architecture review remains W-2171. When the actual incoming 1,000 demos are available, rerun this same harness against their authored source instead of the copies.
