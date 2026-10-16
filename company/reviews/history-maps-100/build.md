# History maps 100 — draft prototype integration record

Date: 2026-10-16. Builder/integrator: Codex. This is engineering evidence, not an independent learner, cultural or fact-check verdict.

## Result and scope

100 separately addressable History map cases, ten regional groups, 25 pinned snapshot files (100–1994 CE), 500 claims initially unverified. `/history-maps` is the draft browsing index; `/d/<slug>` uses the normal Lesson contract. This is a practice set for existing border-precision concepts, not 100 new concepts. The category manager has not approved its curriculum placement.

Two fixed area anchors are compared across two snapshots. The learner commits a prediction, visits both years and the overlay, and earns a reveal quoting the retained trace. Source NAME labels are compared, not SUBJECTO groupings or sovereign-state counts. Missing coverage and all overlapping labels remain explicit. Modern labels orient nearby points rather than claim historical settlement names. Per-case `map.json` includes nominal/actual coordinates, offsets, complete source matches and feature addresses.

## Sources and reproduction

- Historical Basemaps source commit `da7a4b735ecef70aebdc9c73e409d8a2500d50f3`. Every GeoJSON file, README, LICENSE and physical land file has a SHA-256 pin in `tools/history-maps/sources.json`.
- `node tools/history-maps/generate.mjs <pinned-checkout>` reproduces and checks all 300 generated lesson files. It passed for all 100 cases. Upstream's GPL-3.0 licence is included with the derived paths.
- Mixed polygon winding is corrected without moving coordinates; regression tests cover complements, holes and disconnected islands. At a coastal nominal point, the nearest covered area anchor within 75 km is used only if both snapshots cover it, independent of the answer. Otherwise the gap is retained.
- Answer positions are rotated (29 / 29 / 22 / 20). The source sample has 35 changed relationships, 32 same/same, 21 different/different and 12 with missing coverage. This is a curated sample, not an estimate of world history.

## Engineering validation

- Company check passed after integrating current company work: 1,074 lessons / 5,827 claims, three existing Life Hacks dispute warnings; memory check passed for 99 roles.
- Typecheck and optimized local build passed. All 100 new lesson pages and the regional index are emitted. Existing draft visibility rules govern the index and each direct URL; the index returns 404 when none of these cases is visible.
- Final phone + desktop contract run: **200 / 200 passed**, zero retries, skipped or flaky tests. The QA harness was clean at commit `3b97991d85ba469d611ce91d71d949c728e9ce3c`; prototype base `5dc8d77ba711ac92e0f7e2f5f60bc7b721cf2442`. These are builder integration runs, not `qa-tester` attestations.
- Browser audit: **100 / 100 passed**; maximum stage text **23 words**; smallest map label **10.67 px** at 390×844; no horizontal overflow or page errors; traces survive returning to earlier snapshots; the regional index has 100 links. Light/dark screenshots are attached.
- Strict 390×844 reveal-fit results and machine summaries are in `validation.json`. The final complete pass is **100/100** with zero crop, scrolling, thumbnails or hidden named labels; it covers the final larger SVG labels and compact source keys.
- `node --test tests/history-maps/*.test.mjs`: 3/3 pass. Platform tests: 30 pass / 4 production-build-only checks skipped on the local draft build.
- Full `npm run verify` was attempted. It stops in the **unchanged** dispatch fixture `W-1337 C2` (`tests/dispatch/guards.test.mjs`): expected an empty stash list but Git 2.51.1 retains `autostash`. Running that test alone reproduces the failure. No dispatch guard or test was weakened to obtain a green result. Typecheck, build and map-specific browser QA ran separately.

Host note: the sandbox blocks Chromium's process-singleton Unix socket and Next's network-interface discovery. Local review used Playwright's installed headless shell (`--no-zygote --in-process-gpu`) and an explicitly loopback-bound Next server. Browser tools/harness files and product code were not patched for the host. Parallel browser jobs exhausted the local run once; the final recorded checks ran sequentially.

## Review route and limits

Founder intake: `company/decisions/2026-10-16-founder-history-maps-100-pr.md`. All cases remain **draft**, with no fabricated verification, independent QA, learner, cultural or human-learning evidence. Every new slug carries a publication hold extending History's domain launch hold and the pending sensitive route. Protected paths, budgets, roles, agent definitions and deployment configuration are unchanged by this work.

Stage-A sensitive review is outstanding. These are concrete prototype artifacts on a draft PR, not approved briefs or launch candidates. Before production admission, cm-history and its maps strand must rule on the practice-set scope and case selection; research and cultural reviewers must inspect source provenance, source labels, sampling and the anchor method. Before publication, reviewers must walk the artifact first, write findings before reading this account, and complete independent fact-check, stage-B cultural review and learner review. Existing charter pins and admission into the category's canonical source registry also belong to that owner review.

F-43's budget stop has not been read as a top-up. No company wave or new agent was dispatched. Portfolio-manager owns reconciling follow-up work with that decision. No publication or deployment was requested.

## Next

Board: W-1487 cm-history (scope/admission, in review); W-1488 evaluation-steward (independent route); W-1489 portfolio-manager (F-43); W-1490 principal-engineer-ops (existing verification fixture). The latest company changes were merged after the map runs; map implementation files and the QA contract are unchanged by that merge. Final company/memory checks and typecheck passed on the integrated tree. The final handoff in `company/ops/progress.md` records the board IDs. Do not count this practice set as published lessons or human learning evidence.
