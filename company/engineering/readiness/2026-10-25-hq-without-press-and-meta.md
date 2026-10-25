# Operational readiness: hq-without-press-and-meta

change: HQ floor 8 (System 3 Press) removed and a city-hq door added; company/sibling/ removed; city adapters moved to tools/hq/; unused Meta kernel adapters deleted
change-tier: 1
paths: src/lib/hq.ts, src/lib/hq-floors.ts, src/app/hq/HQ.tsx, src/app/hq/Office.tsx, src/app/hq/page.tsx, src/app/hq/hq.module.css, tools/hq/**, tests/hq/city-door.test.mjs, company/sibling/** (deleted), src/lib/hq-press.ts, src/app/hq/Press.tsx, tests/hq/press.test.mjs (deleted)
author: tools-lead
self-check: tools-lead
board: none (founder request 2026-10-25, through chief-of-staff)
risks: none
links: d5ed24fa4 (this change); b3138bd43 (a parallel commit that swept this change's staged renames and deletions in from the shared index)

1. **What can fail.** The city build (Meta's hq/build.mjs) can no longer find this company if it still points at the old `company/sibling/system3-meta/adapters/s3c/hq-city.json`; the HQ page can break if a removed import is left behind (it was, for one commit: b3138bd43 carried the deletions without the edits, so src/lib/hq.ts imported a deleted file until d5ed24fa4). Only we see the HQ; learners never do (HQ is off in production unless HQ_PUBLIC=1).
2. **How we would know.** `npm run typecheck` and `npm run test:hq` (tests/hq/city-door.test.mjs: no floor 8, the door, the adapters resolve from tools/hq). For the city: `node $META/hq/build.mjs --city=hq-city.json --snapshot=system-3-company --out=<dir>` from tools/hq/ (run 2026-10-25: floors 1-7, the city-hq room, 34 roles, 8,208 events, 607 docs, 26 knowledge entries).
3. **How to roll back.** `git revert d5ed24fa4 b3138bd43` restores floor 8, company/sibling/ and the old adapter paths (b3138bd43 also carries a lesson decision record; revert only its sibling and HQ paths with `git checkout b3138bd43~1 -- <paths>`). Minutes; no data lost; no founder needed (no deploy).
4. **Capacity.** None added. The host disk was at 99% during this run (other sessions' .next-* build dirs): a full `npm run build` needs about 600 MB with its cache and `npm run qa` failed with ENOSPC on the baseline too.
5. **Security.** One new outbound link (https://system3-city-hq.vercel.app, target=_blank, rel=noreferrer) on the HQ page. No route, parameter or script.
6. **Data.** None written. The adapters are read-only, as before.
7. **Risks.** None added or closed.
