### 2026-10-25 · 2026-10-25-pipeline-lifecycle · tools-lead
- did: Pipeline: lifecycle blocks per lane in projects.json, tools/hq/lifecycle.mjs (state, since, waitingOn from records via readiness()), dashboard pipeline field, city page copied, W-2070 to hq-engineer
- learned: 675 of 721 published lessons fail readiness on their current version; most were bumped by the 10-20 copy pass and deployed in r16 unchecked, so published items are judged by the version that has check records (tools/hq/lifecycle.mjs)
- learned: git -G on '"version"' matches nested lines; anchor to the top-level two-space key or every lesson looks re-versioned (tools/hq/lifecycle.mjs)
- know: State ids are rules in lifecycle.mjs; owners edit titles, owners and checks in the lanes' lifecycle blocks (company/ops/projects.json)
- know: The repo moves under you: the cube went checks to published while this run worked; real-data tests assert against records, fixtures hold the dated scenario (tools/hq/lifecycle.test.mjs)
- open: hq-engineer in-app Pipeline view W-2070 (company/ops/board.json)
- open: F-53 renames category-curator to cm-<domain> in flows; the brief owner follows it, recheck after it lands (company/company.json)
