# Operational readiness: historical Books HQ room alias

change: Map four historical Books event-room tokens to existing HQ display rooms at read time
change-tier: 1
paths: src/lib/hq-floors.ts, company/ops/changelog.md
author: platform-engineer
self-check: platform-engineer
board: W-1464
risks: none
links: company/engineering/reviews/2026-10-16-books-100-event-room-repair.md

1. **What can fail.** A mistaken alias could misplace old dispatches in HQ.
   The finite ruling authorizes categories/cm-books, leadership/product,
   quality/constitution and design/design-studio for ten historical events.
   The design token is a grouped display marker, not the learning-designer's
   canonical home; the source comment preserves studio as that role's home.
   Future events must use canonical role rooms. No room or log record changes.
2. **How we would know.** The unchanged full HQ suite checks every event room
   and alias target against the drawn plan. The existing `loadEvents` read path
   applies aliases; raw reads/detail lookups remain unchanged. No new monitor.
3. **Rollback.** Revert this commit; no data migration or loss. The historical
   invalid-room test then fails again until a read-time mapping is supplied.
   Repository rollback is routine; any production deploy still needs founder
   authorization under the existing release process.
4. **Capacity.** Four extra string lookup entries, no new process or runtime loop.
   This worker runs only the full HQ suite and company check in its assigned
   worktree with the existing node_modules link. Root owns the integrated
   typecheck/build/verification; no server or full build starts here.
5. **Security.** No intake API, route, schema, dependency, permission, script or
   secret changes. The alias only affects the internal HQ timeline display.
6. **Data.** No event is edited, deleted or appended by this worker. The original
   ten dispatch lines remain intact. The coordinator owns the ten correction
   notes and their `corrects` references; aliases add no learner data behavior.
7. **Risks.** No risk-register change proposed. The compatibility-token ambiguity
   is bounded by the historical-event comment and the principal-engineer ruling.
   Books renderer/payload/model files and their frozen identity remain unchanged.

## Validation

- Initial unchanged `npm run test:hq` with only the first alias: **64/65 passed,
  exit 1**, then a complete read-only scan found the finite additional tokens.
  Implementation paused until principal-engineer's written finite addendum
  authorized all four aliases and ruled on grouped design/learning display.
- Final unchanged full `npm run test:hq` after all four authorized aliases:
  **65/65 passed, zero skips, exit 0**, approximately 6.75 seconds.
- Complete canonical-log room scan: **zero unmapped events**, zero missing
  alias destinations; five aliases total including preserved research-room.
- `npm run check`: **passed**, 1,074 lessons / 5,797 claims / three inherited
  disputed Life Hacks warnings; all 99 role memories within 50KB.
- `git diff --check`: passed. No diff in raw events or any Books payload,
  renderer or model path. No test file was changed, filtered or skipped.

Final diff review by an independent engineer and required integrated
typecheck/build/verification remain with the coordinator.
