# ADR-005: Lessons build independently against a versioned kit

status: proposed (depends on the founder's bundler decision, [2026-10-14-lesson-bundler-and-memory.md](../../decisions/2026-10-14-lesson-bundler-and-memory.md))
date: 2026-10-14
deciders: principal-engineer, platform-engineer
source: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) · [SPIKE-001](../spikes/SPIKE-001-frontend-sandbox.md)
supersedes, once accepted: the compiled-registry part of [ADR-001](ADR-001-nextjs-static-lessons.md) for runtime loading

## Context
One Next.js build compiles all lessons: 7.1 min and 1.2 GB at 879 lessons (build 7), 0.48 s per
lesson, growing faster than linear. Every kit change rebuilds and re-tests every lesson.

## Decision
Each lesson builds alone into one ES module, with `react`, `react/jsx-runtime` and
`@/kit/*` left external. They resolve through an import map with SRI to a kit build named
`kit@<major>`. Each lesson version records the kit major it was built against. A kit minor must
keep behaviour; a kit major means lessons migrate one at a time, each migration a new version.
The geo kit is a separate bundle, with atlases as separate hashed assets.

## Consequences (good and bad)
- Good (SPIKE-001): 348/348 lessons built with no import outside the contract; p99 3.4 KB gzip per lesson; kit 61.8 KB gzip once; one geo kit copy of 71 KB instead of three of about 420 KB.
- Good: a change costs one lesson build (0.14–1.6 s) and one lesson QA.
- Bad: a full rebuild costs more than one app build (225 s for 348 lessons under load, against 73 s). It is acceptable only if total CI minutes per week fall; that is the stage-1 exit measurement.
- Bad: several kit majors may be live at once, and each needs its contract tests.

## Alternatives rejected and why
- Keep one app build: see ADR-003 alternatives.
- `tsc` only: cannot resolve local imports or CSS modules (SPIKE-001).
- One bundle per lesson with React inlined: about 60 KB per lesson instead of 3 KB.
