# Content hub prototype: feasibility results

owner: rnd-engineer · date: 2026-10-24 · status: implementation ready for independent review
tracking: [issue #18](https://github.com/hanialshater/system-3-company/issues/18), W-2026 (review), W-2027 (R&D acceptance), W-2028 (architecture)

## Result

The standalone prototype implements real Git-per-space repositories, scope/HEAD-guarded source writes, durable queued builds, transitive exact dependency pins, TypeScript type checking and ESM compilation, compiled test execution, immutable filesystem artifacts, SQLite publication pointers and a browser loader. Production routes, lessons and protected files are unchanged. No deployment was performed.

Predictions were recorded in local commit `8dec8024` before executing the prototype; the tested base is `60eaf60ac461e502094cc3cdf6f784bb00ccd784`. See [brief.md](brief.md) and the separate prediction parent commit on the PR. No independent reviewer or manager approval is claimed.

- **7/7 integration tests passed:** real Git/build/rollback scenario, atomic scope/stale-write rejection, failed tests plus publication compare-and-swap and ownership, pin immutability, transitive inputs and undeclared imports, restart/outbox reconciliation, artifact tampering. [Raw output](evidence/integration-tests.txt).
- **5/5 browser flow checks passed:** edit/commit/build/publish/render, compiler-failure preservation, rollback, immutable reads without builds and control authorization, responsive sandboxed interaction. Chromium desktop 1280×1000 and phone 390×844, no page errors and no horizontal phone overflow. [Report](evidence/browser.json). Screenshots are reproducible with the browser script under `artifacts/content-hub/`.
- **Deterministic fixture sequence:** five compiler invocations versus fourteen for a rebuild-all baseline across the same writes; one alpha edit queued only alpha, documentation queued none, identical inputs reused the original artifact across different commits, and an explicit package-pin upgrade left beta unchanged. [Scenario evidence](evidence/scenario.json). The baseline is a calculated operation count, not an independently timed competitor.
- **Repository checks:** `npm run check` reports 811 errors and four warnings. An isolated checkout of the unchanged base reproduces exactly the same diagnostic lines. `npm run verify` passes deployment tests (19/19), then stops at two publication-readiness tests (32/34 pass). The identical two named failures reproduce on the base with `npm run test:publish`; the remaining aggregate stages were not reached. No full-verify success is claimed.

## What changed because of it

Feasibility supports proceeding to R&D review of the Git/write/build/publication separation. Keep the implementation incubating in `src/lab/content-hub/`; no production migration follows automatically. W-2027 asks rnd-lead for independent acceptance and whether another bounded spike is justified. W-2028 asks principal-engineer to compare this write path with EDD-003 and SPIKE-001, especially React/kit integration and the existing editorial gates.

## Limits and next experiment

Follow-up completed: [real-catalogue results](catalogue-results.md) and [Next.js integration proposal](nextjs-architecture.md). These extend the evidence; they do not change the scope of the original DOM-only prototype described above.

This result does not establish million-demo capacity. Planning currently scans committed snapshots; the next scale experiment should compare an indexed change/dependency graph against the current scanner using measured writes, queue wait, Git operations, build reuse, storage and read latency. Register its workload and acceptance thresholds before running it.

Production still needs tenant authorization, distributed Git/storage and worker leases, hostile-code build isolation, a separate registrable artifact domain, real object-store/CDN adapters, SDK security/support policy, editorial acceptance integration and an SSR decision. Current compilation targets a synthetic DOM SDK with local pinned packages and static imports, not arbitrary existing React lessons or remote npm installation. See [prototype README](../../../src/lab/content-hub/README.md) for all boundaries and run commands.
