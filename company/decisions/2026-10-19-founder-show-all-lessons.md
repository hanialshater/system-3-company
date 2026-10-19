# Founder decision: show every lesson with its publication status

date: 2026-10-19
owner: head-of-product (visibility policy); platform-engineer (catalog and lesson host)
Recorded by: chief-of-staff
status: decided by the founder in this chat; implementation pending validation and release

## Direction and reason

“Instead of not showing unpublished, we can just tag them on the app, I want to show all”.

All registered lessons are discoverable in the feed and map and openable by direct URL, including drafts, lessons in review and retired lessons. Every unpublished lesson carries its actual status: “Draft · Unpublished”, “In review · Unpublished” or “Retired · Unpublished”. The existing published-first feed ordering remains.

This supersedes the earlier public-serving exclusions in the 2026-10-15 founder-show-review decision and the published-only catalog requirement for this surface. Legacy SHOW_DRAFTS/SHOW_REVIEW flags no longer hide lessons. It changes visibility, not publication: no lesson meta status, claim verification, review evidence or publish gate is changed. Unknown lesson slugs still return 404, and the public metadata allow-list remains enforced.

## Objections and disposition

- Showing a draft could be read as an assertion that it passed publication checks. Founder chooses visibility instead of exclusion; explicit unpublished/status tags distinguish the states. No quality acceptance is inferred.
- Retired lessons were previously inaccessible. “Show all” is implemented literally and labels them retired; this does not return them to published status.
- Existing production-serving tests assert draft 404s. The unprotected platform tests are updated to assert all-status availability, original metadata statuses and visible tags. Internal working records must still stay out of public payloads and chunks. No protected test or gate is edited.
- Building all pages increases output. This is checked with a production build; no catalog payload field is added beyond existing status.

The implementation is prepared for the remote default branch. This record does not authorize a new production deployment; the shared handbook still requires the founder's approval for that specific release.

## Implementation and validation

Implemented for 1,283 registered lessons in this checkout (720 published, 234 review, 329 draft; no retired records currently present). Catalog map includes lessons without a mapped curriculum concept. W-1976 tracks review/release. All metadata statuses remain unchanged.

- Platform suite: 37 passed, 4 production-built-output checks skipped because no complete build is available.
- Repository check: passed, with existing disputed-claim/readiness warnings.
- Seven changed source files: zero syntax diagnostics.
- Production bundle compilation succeeded in 90 seconds. Full local build failed in its TypeScript phase on the existing HQ `People.tsx` / `people.ts` casing conflict (TS1192/TS1149). Those HQ files were not edited. No built-output or browser-QA pass is claimed.
- Full verify attempted and stopped on 3 publication-tool fixture tests; no publication tool or protected QA contract was changed.
- No new deployment was triggered.
