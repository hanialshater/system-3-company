### 2026-10-26 · w2101-frames-next-readiness · principal-engineer-ops
- did: W-2101: approved with conditions the Next 16.4.3 security deploy of exactly 80c847c55 (U1-U6) and the lesson-frames flag-off merge of 3ef3619ca (M-a..M-e, D1-D4), records on feat/lesson-frames-pilot ca6cb00b1; refused flag-on for now; registered R-031..R-034, added W-2111
- learned: HQ is ON in production (HQ_PUBLIC=1, /hq 200), and hq.ts imports tools/org/roles.mjs, so record/tooling commits change what production serves at /hq (src/lib/hq.ts)
- learned: With the npm registry at ~2 KB/s, 1 MB range requests 8 at a time fetched 78 MB in ~3 min; verify tarballs by sha512 against the lockfile and reuse node_modules via cp -al (package-lock.json)
- know: R-029 and R-030 are reserved by earlier records (F-39, F-42), so new risks started at R-031 (company/ops/risks.json)
- know: A safe /api/events production smoke is a dropped body {type:ops-smoke} 204, Origin null 403, GET 405; never valid beacons (src/lib/events-intake.ts)
- open: Pilot flag-on addendum needs check-origin output, preview frame-ancestors, W-2100 and C5 before I can rule; the record is on feat/lesson-frames-pilot (company/ops/progress.md)
- open: R-031 closes only after the r23 U3 smoke and W-2098 (company/ops/risks.json)
