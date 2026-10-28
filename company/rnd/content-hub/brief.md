# Content hub: Git per space and compile on write

owner: rnd-lead · implementation: rnd-engineer · date: 2026-10-24
board: W-2169 (prototype), W-2170 (R&D review), W-2171 (architecture review)
status: prototype authorized by founder; implementation in progress; production adoption unapproved

## Founder request

> Git per space and scoped changes
>
> Could you track this under r&d team and build a prototype?

The discussion additionally requires executable demo code, tests, pinned dependencies and compilation on writes; reads load already-built artifacts on demand. Git remains mandatory. This is a bounded feasibility prototype, not approval to migrate existing lessons or deploy.

## User and decision

Demo builders and the platform team need independent edits and builds without adding every demo to the host application. Decide whether Git-per-space plus independently published artifacts is a useful continuation of [EDD-003](../../engineering/edd/EDD-003-lesson-storage-at-scale.md) and [SPIKE-001](../../engineering/spikes/SPIKE-001-frontend-sandbox.md). The existing spike already covers React/kit browser isolation; this prototype targets source writes, impact calculation and publication state.

## Hypothesis

Scoped source writes can preserve Git provenance while testing and compiling only affected demos; immutable artifacts and per-demo publication pointers can keep serving previous successful revisions after failed builds.

## Committed prediction

Before running the prototype: editing one of two unrelated demos builds only that demo; documentation edits build neither; restoring identical build inputs reuses the previous artifact despite a different commit. A failing demo test or compiler error cannot change its publication pointer. Publishing an older successful build rolls back without compilation. Two spaces cannot share publication pointers. Updating a dependency pin changes only affected demo inputs.

would_be_wrong_if: any unrelated edit rebuilds an unchanged demo; a failed build changes a live pointer; a read starts a build; an out-of-scope/stale write commits; a demo can publish an artifact belonging to another demo or space.

## Design

- Baseline: build every demo after each write. Treatment: content-based input comparison per demo, including its dependency closure and compiler/SDK identity. Count build/test executions; record wall times as local feasibility evidence only.
- One local Git repository per space. Scoped writes require an expected HEAD and validate the complete patch before mutation.
- SQLite metadata and durable queue; filesystem object storage emulates object-store/CDN delivery. No new npm dependencies. Existing TypeScript performs type checking and emits a browser ESM module graph with resolved dependency imports.
- Versioned local package sources model pinned dependencies; package revisions are immutable through the write API. New package versions do not automatically move demo pins.
- Save commits and enqueues work. A separate worker tests/compiles committed snapshots. Publishing is explicit and per-demo, with provenance retained even on cache hits.
- Standalone loopback host loads compiled ESM artifacts on demand in sandboxed frames. No production routes, lesson sources, credentials or protected paths change.
- Stop after one implementation and its regression/scenario run. No evolution generations, cloud provisioning, deployment or full-catalogue migration.

## Acceptance and boundaries

Automated integration checks exercise real temporary Git repositories, compiler, test subprocesses, SQLite state, artifact bytes and HTTP reads. Include failure recovery, stale publication protection, pinning, scope/path checks, rollback and restart. Self-tests establish feasibility, not independent acceptance. R&D lead owns W-2170; principal engineer owns W-2171 before any production proposal.

This prototype does not establish million-demo throughput, production authentication, a distributed Git farm, build isolation for hostile code, distributed leases, real CDN/object-store integration or SSR execution. Test subprocesses execute trusted fixtures and are not a security sandbox. Production work must preserve System 3 editorial and publication gates.
