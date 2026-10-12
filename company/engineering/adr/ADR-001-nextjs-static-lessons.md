# ADR-001: Next.js with statically generated lesson pages and a generated registry

status: accepted
date: 2026-10-12
deciders: platform-engineer, principal-engineer (retroactive record of the founding decision)

## Context
Lessons are small React components with a JSON record each. Hundreds are planned. Vercel is the target host.

## Decision
Next.js App Router (16.x). Each lesson is `src/demos/<domain>/<slug>/{Demo.tsx, meta.json}`. A
generated registry (`npm run registry`) imports every meta and lazily imports every component.
`/d/<slug>` is statically generated, and the feed mounts only the cards near the viewport.

## Consequences
- Good: adding a lesson is two files plus a regeneration; one page per lesson; no server state.
- Bad: the registry imports every `meta.json` into any module that imports it. At hundreds of lessons this may put every claims ledger into the feed's client bundle (see EDD-001).
- Bad: the generator lives in `tools/company.mjs`, which is protected because it holds the gates, so changing the registry shape needs an amendment.

## Alternatives rejected
A Vite SPA (weaker per-lesson pages); plain HTML per lesson (no shared contract).
