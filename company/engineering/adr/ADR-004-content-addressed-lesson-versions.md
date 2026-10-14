# ADR-004: Lessons are immutable, content-addressed versions

status: proposed (accepting it needs the evaluation steward's amendment, W-087)
date: 2026-10-14
deciders: principal-engineer (proposer), evaluation-steward (gate meaning)
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) · [review](../../rituals/records/2026-10-13-eng-review-lesson-storage.md) · [SPIKE-001](../spikes/SPIKE-001-frontend-sandbox.md)

## Context
QA, claim checks and reviews cite a lesson by folder today. When the folder changes, nothing says
which version a record was about. Stage 1 publishes bundles by hash, so publish and evidence need
the same address.

## Decision
A lesson version is `<slug>@<sha256>` of its canonical source tree (code, meta, CSS, local
modules). Its bundle hash is derived from that build and recorded next to it. Every QA, claim
check, learner, fact-check and pairwise record cites the version. A version is never edited; a
change is a new version.

## Consequences (good and bad)
- Good: "QA passed" means "this exact bundle passed". Rollback names a version that still exists.
- Good: SPIKE-001 showed deterministic builds (two clean builds, identical hashes) and that a kit change leaves lesson bundle hashes unchanged.
- Bad: a bundler change or upgrade changes every bundle hash, which forces re-QA unless the steward accepts a sampled re-check. So the bundler is pinned exactly.
- Bad: claim carry-over needs a rule. The reviewer position: a claim carries over only if its text, support and source hash is unchanged, and for claims about what the stage shows, only if the bundle hash is unchanged too. The steward decides.

## Alternatives rejected and why
- Folder plus git commit as the address: works while there is one repo, breaks at stage 2 (shards) and does not name what learners were served.
- Semver per lesson: human-assigned, so two different builds can share a number.
