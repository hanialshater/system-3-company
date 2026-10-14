# ADR-007: The manifest is the registry; rollback is a pointer change

status: proposed (accepting it needs the evaluation steward's amendment to the registry and launch gates, W-087)
date: 2026-10-14
deciders: principal-engineer, evaluation-steward (gates), tools-lead (CLI)
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) · [SPIKE-001](../spikes/SPIKE-001-frontend-sandbox.md) rollback drill

## Context
`registry.generated.ts` imports every meta and lazily imports every component. It grows with
the catalog, ships metadata to every page (EDD-001) and is what the gates read.

## Decision
A generated manifest maps each slug to its version, bundle and frame hashes, kit major, status and
slim card fields. Publishing and rollback change only the manifest. **Every manifest change is a
git commit**, so the repository records what learners were served (see the founder decision on
memory). Bundles and kit builds are never deleted while any manifest version, live or archived,
names them.

## Consequences (good and bad)
- Good: rollback of one lesson took 1–12 ms in the drill, with no rebuild; production latency is the manifest's cache TTL.
- Good: the feed index is a projection of the manifest, which fits stage 0's slim index.
- Bad: the gates must read the manifest, which changes where they look (amendment). A QA pass must be bound to the hash being published.
- Bad: during migration the host must resolve a slug either to a compiled component or a bundle.

## Alternatives rejected and why
- Keep the registry and add hashes to it: still one module that grows with the catalog.
- A database as the registry: moves the memory out of git before any trigger says so.
