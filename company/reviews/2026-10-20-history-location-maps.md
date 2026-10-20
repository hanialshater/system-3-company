# History location maps — implementation verification

owner: platform-engineer
date: 2026-10-20
change tier: 1 (shared presentational component; self-check)

Story: open a city-history lesson from the feed or a direct URL → its stage shows a local map → predict, read records, compare and reveal remain available.

All 100 city-history lessons now include the same accessible locator component. The 17 original history data lessons retain their existing figures. There are no runtime map services, new dependencies, accounts/API changes, protected-path edits, or changes to historical record text or models. Each changed lesson's version is bumped once and includes an unverified, addressed map-provenance claim. Status is unchanged.

Checks completed before release:
- 102 locator coverage, geometry, label-bounds, asset and provenance tests pass.
- All 88 existing history model test files pass.
- TypeScript and a production Next.js build pass.
- A six-map contact sheet was visually inspected, including small islands, nearby points, ancient sites and Sydney/Wellington across the 180° extent edge.
- All 100 maps load at phone size, with no horizontal overflow or JavaScript errors. All 16 sampled phone/desktop interaction contract tests pass. The final integrated production build passes.

Limits: implementer verification is not an independent learner verdict or fact-check. Repo check has 811 errors on both the clean r17 base and the changed tree (the initial base had 792); zero added. Full verify stops on two existing publication-readiness failures. No unrelated gate is changed or lesson promoted.

Reproduction:
- node tools/generate-history-maps.mjs /path/to/pinned/ne_50m_land.geojson
- node --test tests/history/locators.test.mjs
- node --import ./tests/lifehacks/register.mjs --test src/demos/history/history-*/model.test.ts

Rollback: revert the history locator commit; no database or environment rollback is needed.
